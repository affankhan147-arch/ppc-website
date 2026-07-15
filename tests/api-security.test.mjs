import assert from "node:assert/strict";
import test from "node:test";
import {
  checkRateLimit,
  clientIdentifier,
  noStoreHeaders,
  validateApiRequest
} from "../src/lib/apiSecurity.ts";

test("rejects an unsupported HTTP method", () => {
  const request = new Request("https://plumbinghands.com/api/partner-application", { method: "PUT" });
  const result = validateApiRequest(request, { methods: ["POST"] });
  assert.deepEqual(result, { ok: false, status: 405, error: "Method not allowed." });
});

test("rejects unsupported content types for POST requests", () => {
  const request = new Request("https://plumbinghands.com/api/partner-application", {
    method: "POST",
    headers: { "content-type": "text/plain" },
    body: "not allowed"
  });
  const result = validateApiRequest(request, { methods: ["POST"], contentTypes: ["application/json", "application/x-www-form-urlencoded", "multipart/form-data"] });
  assert.equal(result.ok, false);
  assert.equal(result.status, 415);
});

test("rejects declared request bodies larger than the configured limit", () => {
  const request = new Request("https://plumbinghands.com/api/partner-application", {
    method: "POST",
    headers: { "content-type": "application/json", "content-length": "70000" },
    body: "{}"
  });
  const result = validateApiRequest(request, { methods: ["POST"], contentTypes: ["application/json"], maxBytes: 65536 });
  assert.equal(result.ok, false);
  assert.equal(result.status, 413);
});

test("rejects a foreign browser origin", () => {
  const request = new Request("https://plumbinghands.com/api/partner-application", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://evil.example" },
    body: "{}"
  });
  const result = validateApiRequest(request, { methods: ["POST"], contentTypes: ["application/json"], trustedOrigins: ["https://plumbinghands.com", "https://www.plumbinghands.com"] });
  assert.equal(result.ok, false);
  assert.equal(result.status, 403);
});

test("accepts an allowed same-site request", () => {
  const request = new Request("https://plumbinghands.com/api/partner-application", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://plumbinghands.com", "content-length": "2" },
    body: "{}"
  });
  assert.deepEqual(validateApiRequest(request, { methods: ["POST"], contentTypes: ["application/json"], maxBytes: 65536, trustedOrigins: ["https://plumbinghands.com"] }), { ok: true });
});

test("rate limiter blocks requests beyond the limit and reports retry timing", () => {
  const key = `security-test-${Date.now()}`;
  assert.equal(checkRateLimit(key, { limit: 2, windowMs: 60000 }, 1000).allowed, true);
  assert.equal(checkRateLimit(key, { limit: 2, windowMs: 60000 }, 1001).allowed, true);
  const blocked = checkRateLimit(key, { limit: 2, windowMs: 60000 }, 1002);
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.retryAfterSeconds >= 1);
});

test("client identifier prefers platform forwarding and never returns a blank key", () => {
  const request = new Request("https://plumbinghands.com/api/call-event", { headers: { "x-forwarded-for": "203.0.113.8, 10.0.0.1" } });
  assert.equal(clientIdentifier(request), "203.0.113.8");
  assert.equal(clientIdentifier(new Request("https://plumbinghands.com/api/call-event")), "unknown");
});

test("no-store headers prevent API response caching and sniffing", () => {
  assert.equal(noStoreHeaders["cache-control"], "no-store, max-age=0");
  assert.equal(noStoreHeaders["x-content-type-options"], "nosniff");
});
