import assert from "node:assert/strict";
import test from "node:test";
import nextConfig from "../next.config.mjs";

test("applies required browser security headers to every route", async () => {
  assert.equal(typeof nextConfig.headers, "function", "nextConfig.headers must be defined");
  const rules = await nextConfig.headers();
  const globalRule = rules.find((rule) => rule.source === "/(.*)");
  assert.ok(globalRule, "a global /(.*) header rule is required");
  const headers = new Map(globalRule.headers.map(({ key, value }) => [key.toLowerCase(), value]));
  for (const name of [
    "strict-transport-security",
    "x-content-type-options",
    "x-frame-options",
    "referrer-policy",
    "permissions-policy",
    "content-security-policy-report-only"
  ]) {
    assert.ok(headers.has(name), `${name} must be configured`);
    assert.ok(headers.get(name).trim().length > 0, `${name} must not be empty`);
  }
  assert.equal(headers.get("x-content-type-options"), "nosniff");
  assert.equal(headers.get("x-frame-options"), "DENY");
  assert.match(headers.get("strict-transport-security"), /max-age=63072000/);
  assert.match(headers.get("content-security-policy-report-only"), /default-src 'self'/);
  assert.match(headers.get("permissions-policy"), /camera=\(\)/);
});
