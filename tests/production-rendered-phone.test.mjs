import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const builtAppDir = join(rootDir, ".next", "server", "app");
const visibleNumber = "1 844-397-8298";
const telephoneUri = "tel:+18443978298";

function collectHtmlFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) return collectHtmlFiles(fullPath);
    return entry.isFile() && entry.name.endsWith(".html") ? [fullPath] : [];
  });
}

function builtHtmlFiles() {
  assert.ok(
    existsSync(builtAppDir),
    "Expected built production HTML under .next/server/app. Run npm run build before this test."
  );
  const files = collectHtmlFiles(builtAppDir);
  assert.ok(files.length > 0, "Expected Next production build to emit HTML files.");
  return files.map((file) => ({
    file,
    relativePath: relative(builtAppDir, file),
    html: readFileSync(file, "utf8")
  }));
}

function findRenderedPage(label, predicate) {
  const match = builtHtmlFiles().find(({ html }) => predicate(html));
  assert.ok(match, `Expected to find rendered production HTML for ${label}.`);
  return match;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertPageContainsPhoneContract({ relativePath, html }, label) {
  assert.ok(html.includes(visibleNumber), `${label} (${relativePath}) must visibly expose ${visibleNumber}.`);
  assert.ok(html.includes(telephoneUri), `${label} (${relativePath}) must contain ${telephoneUri}.`);
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

test("homepage source excludes corrupted media and internal defensive copy", () => {
  const sourceFiles = [
    "src/app/page.tsx",
    "src/app/globals.css",
    "src/components/Header.tsx"
  ].map((path) => readFileSync(join(rootDir, path), "utf8")).join("\n");

  for (const forbidden of [
    "/images/photography/home-emergency-plumber.png",
    "/images/photography/plumbing-diagnostic.png",
    "/images/photography/homeowner-consultation.png",
    "Illustrative service photography",
    "people shown are not identified",
    "fake local-office claims",
    "Dallas–Fort Worth plumbing connection",
    "Dallas–Fort Worth provider connection"
  ]) {
    assert.equal(sourceFiles.includes(forbidden), false, `Homepage source must not contain: ${forbidden}`);
  }

  for (const required of [
    "Dallas–Fort Worth emergency plumbing service",
    "Emergency Plumbing Service Across DFW.",
    "/images/photography/provider-crew.webp",
    "/images/hero/burst-pipe-emergency.svg"
  ]) {
    assert.ok(sourceFiles.includes(required), `Homepage source must contain: ${required}`);
  }
});

test("home production HTML exposes the DID in header, mobile call button, and footer", () => {
  const page = findRenderedPage(
    "home",
    (html) => html.includes("Urgent Plumbing Help When Every Minute Matters.") && html.includes('data-cta-location="header"')
  );

  assertPageContainsPhoneContract(page, "home");
  assert.ok(page.html.includes("Emergency Plumbing Service Across DFW."), "Home must use service-focused DFW copy.");
  assertCallButtonHref(page.html, "header");
  assertCallButtonHref(page.html, "mobile-sticky-call-bar");
  assertFooterHref(page.html);
});

test("contact production HTML exposes the DID and contact call action", () => {
  const page = findRenderedPage(
    "contact",
    (html) => html.includes("Request urgent plumbing help") && html.includes('data-cta-location="contact-top"')
  );

  assertPageContainsPhoneContract(page, "contact");
  assertCallButtonHref(page.html, "header");
  assertCallButtonHref(page.html, "contact-top");
  assertCallButtonHref(page.html, "mobile-sticky-call-bar");
  assertFooterHref(page.html);
});
