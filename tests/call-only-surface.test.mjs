import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

function filesBelow(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? filesBelow(path) : [path];
  });
}

test("customer conversion surface is call-only", () => {
  assert.equal(existsSync("src/app/api/lead/route.ts"), false, "unused public /api/lead route must be removed");
  const customerSource = filesBelow("src")
    .filter((path) => !path.includes(join("src", "app", "api", "lead")))
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");
  assert.equal(customerSource.includes("/api/lead"), false, "customer-facing source must not submit to /api/lead");
});

test("partner applications and call events remain available", () => {
  assert.equal(existsSync("src/app/api/partner-application/route.ts"), true);
  assert.equal(existsSync("src/app/api/call-event/route.ts"), true);
});
