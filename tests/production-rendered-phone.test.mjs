import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const visibleNumber = "1 844-397-8298";
const telephoneUri = "tel:+18443978298";
const baseUrl = "https://plumbinghands.com";

async function fetchLivePage(path) {
  const response = await fetch(`${baseUrl}${path}`);
  assert.equal(response.status, 200, `Expected ${path} to return HTTP 200 from the live site.`);
  const html = await response.text();
  return { path, html };
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertPageContainsPhoneContract({ path, html }, label) {
  assert.ok(html.includes(visibleNumber), `${label} (${path}) must visibly expose ${visibleNumber}.`);
  assert.ok(html.includes(telephoneUri), `${label} (${path}) must contain ${telephoneUri}.`);
}

function assertCallButtonHref(html, location) {
  const locationPattern = escapeRegExp(location);
  const hrefPattern = escapeRegExp(telephoneUri);
  assert.match(
    html,
    new RegExp(`<a\\b(?=[^>]*href="${hrefPattern}")(?=[^>]*data-cta-location="${locationPattern}")`, "i"),
    `Expected ${location} call action to use href="${telephoneUri}".`
  );
}

function assertFooterHref(html) {
  assert.match(
    html,
    new RegExp(`<a\\b(?=[^>]*href="${escapeRegExp(telephoneUri)}")(?=[^>]*data-phone-location="footer")`, "i"),
    `Expected footer call action to use href="${telephoneUri}".`
  );
}

test("homepage source excludes corrupted media and defensive public copy", () => {
  const sourceFiles = [
    "src/app/page.tsx",
    "src/app/globals.css",
    "src/components/Header.tsx",
    "src/components/LeadForm.tsx",
    "src/components/Footer.tsx"
  ].map((path) => readFileSync(join(rootDir, path), "utf8")).join("\n");

  for (const forbidden of [
    "/images/photography/home-emergency-plumber.png",
    "/images/photography/plumbing-diagnostic.png",
    "/images/photography/homeowner-consultation.png",
    "Local pages without fake local-office claims.",
    "Availability depends on location, timing, and provider coverage.",
    "Confirm pricing, credentials, and arrival details directly with the provider.",
    "Illustrative service photography. People and vehicles shown are not represented as a specific PlumbingHands provider, employee, or customer.",
    "Transparent by design",
    "Illustrative service photography; people shown are not identified as PlumbingHands employees or customers."
  ]) {
    assert.equal(sourceFiles.includes(forbidden), false, `Public source must not contain: ${forbidden}`);
  }

  for (const required of [
    "Plumbing Service in Dallas-Fort Worth",
    "emergency plumbing service across DFW",
    "/images/hero/hero-emergency-plumber-repair.jpg"
  ]) {
    assert.ok(sourceFiles.includes(required), `Homepage source must contain: ${required}`);
  }
});

test("home production HTML exposes the DID in header, mobile call button, and footer", async () => {
  const page = await fetchLivePage("/");
  assert.ok(page.html.includes("Urgent Plumbing Help When Every Minute Matters."), "Home must render the current hero headline.");

  assertPageContainsPhoneContract(page, "home");
  assert.ok(page.html.includes("Plumbing Service in Dallas-Fort Worth"), "Home must use the approved Dallas-Fort Worth service wording.");
  assert.ok(page.html.includes("emergency plumbing service across DFW"), "Home must use service-focused DFW copy.");
  assertCallButtonHref(page.html, "header");
  assertCallButtonHref(page.html, "mobile-sticky-call-bar");
  assertFooterHref(page.html);
});

test("contact production HTML exposes the DID and contact call action", async () => {
  const page = await fetchLivePage("/contact");
  assert.ok(page.html.includes("Request urgent plumbing help"), "Contact page must render its expected heading.");

  assertPageContainsPhoneContract(page, "contact");
  assertCallButtonHref(page.html, "header");
  assertCallButtonHref(page.html, "contact-top");
  assertCallButtonHref(page.html, "mobile-sticky-call-bar");
  assertFooterHref(page.html);
});