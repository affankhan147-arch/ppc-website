import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const enhancementSource = await readFile(
  new URL("../src/data/pageEnhancements.ts", import.meta.url),
  "utf8"
);

test("emergency plumber near me guide has a dedicated Phase 4 enhancement", () => {
  const slug = "emergency-plumber-near-me-open-now-what-to-do-before-help-arrives";
  assert.match(enhancementSource, new RegExp(`\\"${slug}\\": \\{`));
  const enhancementStart = enhancementSource.indexOf(`"${slug}": {`);
  const nextEnhancement = enhancementSource.indexOf(
    '  "water-shutoff-valve-will-not-close-during-a-leak": {',
    enhancementStart
  );
  const targetEnhancement = enhancementSource.slice(enhancementStart, nextEnhancement);

  const requiredDestinations = [
    "/services/24-hour-emergency-plumber",
    "/services/emergency-drain-cleaning",
    "/services/main-sewer-line-clog",
    "/services/toilet-overflow-emergency",
    "/services/water-heater-emergency",
    "/cities/dallas",
    "/cost-guides/emergency-plumbing-cost-dfw"
  ];

  for (const href of requiredDestinations) {
    assert.match(targetEnhancement, new RegExp(`href: \\"${href}\\"`));
  }
});

test("Dallas overnight toilet overflow guide has a dedicated Phase 4 enhancement", () => {
  const slug = "toilet-overflowing-at-night-in-dallas-fast-steps-for-homeowners";
  const enhancementStart = enhancementSource.indexOf(`"${slug}": {`);
  assert.notEqual(enhancementStart, -1);

  const nextEnhancement = enhancementSource.indexOf(
    '  "water-shutoff-valve-will-not-close-during-a-leak": {',
    enhancementStart
  );
  const targetEnhancement = enhancementSource.slice(enhancementStart, nextEnhancement);
  const requiredDestinations = [
    "/services/toilet-overflow-emergency",
    "/problems/toilet-overflowing-will-not-stop",
    "/services/emergency-drain-cleaning",
    "/services/sewer-backup-help",
    "/cities/dallas",
    "/cost-guides/emergency-plumbing-cost-dfw"
  ];

  for (const href of requiredDestinations) {
    assert.match(targetEnhancement, new RegExp(`href: \\"${href}\\"`));
  }
});

test("Dallas main sewer clog guide has a dedicated Phase 4 enhancement", () => {
  const slug = "main-sewer-line-clogged-in-dallas-warning-signs-and-fast-options";
  const enhancementStart = enhancementSource.indexOf(`"${slug}": {`);
  assert.notEqual(enhancementStart, -1);

  const nextEnhancement = enhancementSource.indexOf(
    '  "water-shutoff-valve-will-not-close-during-a-leak": {',
    enhancementStart
  );
  const targetEnhancement = enhancementSource.slice(enhancementStart, nextEnhancement);
  const requiredDestinations = [
    "/services/main-sewer-line-clog",
    "/services/sewer-backup-help",
    "/services/emergency-drain-cleaning",
    "/problems/water-backing-up-in-shower-and-toilet",
    "/problems/outdoor-cleanout-overflowing",
    "/cities/dallas",
    "/cost-guides/sewer-line-clog-cost-guide"
  ];

  for (const href of requiredDestinations) {
    assert.match(targetEnhancement, new RegExp(`href: \\"${href}\\"`));
  }
});
