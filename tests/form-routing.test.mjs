import assert from "node:assert/strict";
import test from "node:test";
import { deliverToWebhook } from "../src/lib/formDelivery.ts";
import {
  handleLeadSubmission,
  handlePartnerApplicationSubmission
} from "../src/lib/formRouteHandlers.ts";

const originalEnv = { ...process.env };
const originalFetch = globalThis.fetch;

function restoreEnvironment() {
  process.env = { ...originalEnv };
  globalThis.fetch = originalFetch;
}

test("fails honestly when a destination is not configured", async () => {
  delete process.env.LEAD_WEBHOOK_URL;
  const result = await deliverToWebhook("LEAD_WEBHOOK_URL", {});
  assert.deepEqual(result, { ok: false, reason: "not-configured" });
});

test("keeps customer and partner destinations separate", async () => {
  process.env.NODE_ENV = "test";
  process.env.LEAD_WEBHOOK_URL = "http://customer.test/submit";
  process.env.PARTNER_WEBHOOK_URL = "http://partner.test/submit";
  const calls = [];
  const fetcher = async (url, init) => {
    calls.push({ url, body: JSON.parse(init.body) });
    return new Response(null, { status: 204 });
  };

  assert.deepEqual(
    await deliverToWebhook("LEAD_WEBHOOK_URL", { type: "customer" }, fetcher),
    { ok: true }
  );
  assert.deepEqual(
    await deliverToWebhook("PARTNER_WEBHOOK_URL", { type: "partner" }, fetcher),
    { ok: true }
  );
  assert.deepEqual(calls, [
    { url: "http://customer.test/submit", body: { type: "customer" } },
    { url: "http://partner.test/submit", body: { type: "partner" } }
  ]);
});

test("reports a rejected webhook delivery", async () => {
  restoreEnvironment();
  process.env.NODE_ENV = "test";
  process.env.LEAD_WEBHOOK_URL = "http://customer.test/submit";
  const result = await deliverToWebhook(
    "LEAD_WEBHOOK_URL",
    {},
    async () => new Response(null, { status: 500 })
  );
  assert.deepEqual(result, { ok: false, reason: "delivery-failed" });
});

test("rejects invalid production webhook URLs", async () => {
  restoreEnvironment();
  process.env.NODE_ENV = "production";
  process.env.LEAD_WEBHOOK_URL = "http://customer.test/submit";

  const result = await deliverToWebhook("LEAD_WEBHOOK_URL", {});
  assert.deepEqual(result, { ok: false, reason: "invalid-url" });
});

test("adds bearer authorization only when configured", async () => {
  restoreEnvironment();
  process.env.NODE_ENV = "test";
  process.env.LEAD_WEBHOOK_URL = "http://customer.test/submit";
  process.env.FORM_ROUTING_BEARER_TOKEN = "routing-secret";
  const calls = [];
  const fetcher = async (url, init) => {
    calls.push({ url, headers: init.headers });
    return new Response(null, { status: 204 });
  };

  assert.deepEqual(await deliverToWebhook("LEAD_WEBHOOK_URL", {}, fetcher), { ok: true });
  assert.equal(calls[0].headers.authorization, "Bearer routing-secret");
});

test("lead route returns 400 for invalid input", async () => {
  restoreEnvironment();
  const result = await handleLeadSubmission(
    { service: "Emergency plumbing" },
    async () => {
      throw new Error("invalid input must not be delivered");
    }
  );

  assert.equal(result.status, 400);
  assert.equal(result.body.ok, false);
});

test("lead route returns an honest 503 when delivery is not configured", async () => {
  restoreEnvironment();
  const result = await handleLeadSubmission(
    {
      name: "Test Customer",
      phone: "5550101000",
      service: "Emergency plumbing",
      city: "Dallas",
      urgency: "urgent-today"
    },
    async () => ({ ok: false, reason: "not-configured" })
  );

  assert.equal(result.status, 503);
  assert.equal(result.body.ok, false);
  assert.match(String(result.body.error), /not configured/i);
});

test("partner honeypot filters without calling the webhook", async () => {
  restoreEnvironment();
  const result = await handlePartnerApplicationSubmission(
    {
      businessName: "Test Partner Plumbing",
      contactName: "Test Partner",
      phone: "5550102000",
      email: "partner@example.com",
      primaryServiceAreas: "Dallas",
      servicesOffered: "Emergency plumbing",
      operatingHours: "Weekdays",
      emergencyCapacity: "limited",
      customerTypes: "residential-commercial",
      insuranceStatus: "prefer-discuss",
      preferredContactMethod: "email",
      consent: "on",
      formStartedAt: String(Date.now() - 10000),
      submissionId: crypto.randomUUID(),
      companyFax: "bot-filled"
    },
    async () => {
      throw new Error("honeypot submissions must not be delivered");
    }
  );

  assert.equal(result.status, 200);
  assert.equal(result.body.ok, true);
  assert.equal(result.body.requestId, "partner_filtered");
});

test("routes successful customer and partner submissions to separate payload types", async () => {
  restoreEnvironment();
  const calls = [];
  const logs = [];
  const logger = {
    info: (event, payload) => logs.push({ event, payload }),
    error: () => {}
  };
  const deliver = async (environmentVariable, payload) => {
    calls.push({ environmentVariable, payload });
    return { ok: true };
  };

  const leadResult = await handleLeadSubmission(
    {
      name: "Test Customer",
      phone: "5550101000",
      service: "Emergency plumbing",
      city: "Dallas",
      urgency: "urgent-today"
    },
    deliver,
    logger
  );
  const partnerResult = await handlePartnerApplicationSubmission(
    {
      businessName: "Test Partner Plumbing",
      contactName: "Test Partner",
      phone: "5550102000",
      email: "partner@example.com",
      primaryServiceAreas: "Dallas",
      servicesOffered: "Emergency plumbing",
      operatingHours: "Weekdays",
      emergencyCapacity: "limited",
      customerTypes: "residential-commercial",
      insuranceStatus: "prefer-discuss",
      preferredContactMethod: "email",
      consent: "on",
      formStartedAt: String(Date.now() - 10000),
      submissionId: crypto.randomUUID()
    },
    deliver,
    logger
  );

  assert.equal(leadResult.status, 200);
  assert.equal(partnerResult.status, 200);
  assert.deepEqual(calls.map((call) => [call.environmentVariable, call.payload.type]), [
    ["LEAD_WEBHOOK_URL", "customer-service-request"],
    ["PARTNER_WEBHOOK_URL", "provider-partner-application"]
  ]);
  assert.deepEqual(logs.map((log) => log.event), [
    "service_request_delivered",
    "partner_application_delivered"
  ]);
  assert.equal(logs[0].payload.phoneHint, "last4:1000");
  assert.equal(logs[1].payload.emailDomain, "example.com");
  assert.ok(!JSON.stringify(logs).includes("5550101000"));
  assert.ok(!JSON.stringify(logs).includes("5550102000"));
  assert.ok(!JSON.stringify(logs).includes("partner@example.com"));
});


test("rejects private-network webhook destinations in production", async () => {
  restoreEnvironment();
  process.env.NODE_ENV = "production";
  process.env.PARTNER_WEBHOOK_URL = "https://127.0.0.1/private-hook";
  let called = false;
  const result = await deliverToWebhook("PARTNER_WEBHOOK_URL", {}, async () => {
    called = true;
    return new Response(null, { status: 204 });
  });
  assert.deepEqual(result, { ok: false, reason: "invalid-url" });
  assert.equal(called, false);
});

function validTimedPartner(overrides = {}) {
  return {
    businessName: "Security Test Plumbing",
    contactName: "Security Tester",
    phone: "5550102000",
    email: "security@example.com",
    primaryServiceAreas: "Dallas",
    servicesOffered: "Emergency plumbing",
    operatingHours: "Weekdays",
    emergencyCapacity: "limited",
    customerTypes: "residential-commercial",
    insuranceStatus: "prefer-discuss",
    preferredContactMethod: "email",
    consent: "on",
    formStartedAt: String(Date.now() - 10000),
    submissionId: crypto.randomUUID(),
    ...overrides
  };
}

test("silently filters implausibly fast partner submissions", async () => {
  let deliveries = 0;
  const result = await handlePartnerApplicationSubmission(
    validTimedPartner({ formStartedAt: String(Date.now()) }),
    async () => {
      deliveries += 1;
      return { ok: true };
    }
  );
  assert.equal(result.status, 200);
  assert.equal(result.body.requestId, "partner_filtered");
  assert.equal(deliveries, 0);
});

test("silently filters duplicate partner submission identifiers", async () => {
  const submissionId = crypto.randomUUID();
  let deliveries = 0;
  const deliver = async () => {
    deliveries += 1;
    return { ok: true };
  };
  const first = await handlePartnerApplicationSubmission(validTimedPartner({ submissionId }), deliver);
  const second = await handlePartnerApplicationSubmission(validTimedPartner({ submissionId }), deliver);
  assert.equal(first.status, 200);
  assert.equal(second.status, 200);
  assert.equal(second.body.requestId, "partner_filtered");
  assert.equal(deliveries, 1);
});
