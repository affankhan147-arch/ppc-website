import assert from "node:assert/strict";
import test from "node:test";
import { getOperationalStatus } from "../src/lib/operationalStatus.ts";

test("reports owner-action-required without exposing destination values", () => {
  const status = getOperationalStatus({
    NEXT_PUBLIC_SITE_URL: "https://plumbinghands.com",
    NEXT_PUBLIC_TRACKED_PHONE_E164: "+1XXXXXXXXXX"
  });

  assert.equal(status.site, "https://plumbinghands.com");
  assert.equal(status.delivery.customerLead.status, "owner-action-required");
  assert.equal(status.delivery.partnerApplication.status, "owner-action-required");
  assert.equal(status.phoneCta.status, "contact-form-placeholder");
  assert.equal(status.analytics.eventCollection, "server-log-enabled");
  assert.equal(status.indexing.sitemapUrl, "https://plumbinghands.com/sitemap.xml");
  assert.equal(JSON.stringify(status).includes("WEBHOOK"), false);
  assert.equal(JSON.stringify(status).includes("https://example.com/hook"), false);
});

test("reports configured surfaces as booleans and modes only", () => {
  const status = getOperationalStatus({
    NEXT_PUBLIC_SITE_URL: "https://plumbinghands.com",
    NEXT_PUBLIC_TRACKED_PHONE_E164: "+12145550199",
    LEAD_WEBHOOK_URL: "https://example.com/customer",
    PARTNER_WEBHOOK_URL: "https://example.com/partner",
    NEXT_PUBLIC_GA4_ID: "G-TEST",
    NEXT_PUBLIC_SEARCH_CONSOLE_TOKEN: "google-token",
    NEXT_PUBLIC_BING_WEBMASTER_TOKEN: "bing-token"
  });

  assert.equal(status.delivery.customerLead.status, "configured");
  assert.equal(status.delivery.partnerApplication.status, "configured");
  assert.equal(status.phoneCta.status, "tel");
  assert.equal(status.analytics.ga4Configured, true);
  assert.equal(status.indexing.googleVerificationConfigured, true);
  assert.equal(status.indexing.bingVerificationConfigured, true);
  assert.equal(JSON.stringify(status).includes("https://example.com/customer"), false);
  assert.equal(JSON.stringify(status).includes("G-TEST"), false);
});
