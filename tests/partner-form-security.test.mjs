import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("partner form supplies timing and replay-defense fields", () => {
  const source = readFileSync("src/components/PartnerApplicationForm.tsx", "utf8");
  assert.match(source, /name="formStartedAt"/);
  assert.match(source, /name="submissionId"/);
  assert.match(source, /crypto\.randomUUID\(\)/);
  assert.match(source, /formStartedAtRef\.current\.value = String\(Date\.now\(\)\)/);
  assert.match(source, /submissionIdRef\.current\.value = crypto\.randomUUID\(\)/);
});
