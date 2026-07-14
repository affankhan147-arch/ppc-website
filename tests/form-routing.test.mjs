import assert from "node:assert/strict";
import test from "node:test";
import { deliverToWebhook } from "../src/lib/formDelivery.ts";

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
  process.env.NODE_ENV = "test";
  process.env.LEAD_WEBHOOK_URL = "http://customer.test/submit";
  const result = await deliverToWebhook(
    "LEAD_WEBHOOK_URL",
    {},
    async () => new Response(null, { status: 500 })
  );
  assert.deepEqual(result, { ok: false, reason: "delivery-failed" });
});
