import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const home = await readFile(new URL("src/app/page.tsx", root), "utf8");
const header = await readFile(new URL("src/components/Header.tsx", root), "utf8");
const footer = await readFile(new URL("src/components/Footer.tsx", root), "utf8");
const css = await readFile(new URL("src/app/globals.css", root), "utf8");

test("premium homepage uses the approved original photography", async () => {
  const assets = [
    "home-emergency-plumber.png",
    "plumbing-diagnostic.png",
    "homeowner-consultation.png",
    "service-van.webp",
    "provider-crew.webp",
    "drain-cleaning.webp",
    "sewer-inspection.webp",
    "water-heater-inspection.webp",
    "toilet-repair.webp"
  ];

  for (const asset of assets) {
    await access(new URL(`public/images/photography/${asset}`, root));
    assert.match(`${home}\n${css}`, new RegExp(`/images/photography/${asset.replace(".", "\\.")}`));
  }
});

test("service photography is unique and uses stable cover frames", () => {
  const serviceBlock = home.slice(home.indexOf("const servicePhotography"), home.indexOf("const capitalizeFirst"));
  const sources = [...serviceBlock.matchAll(/src: "([^"]+)"/g)].map((match) => match[1]);
  assert.equal(sources.length, 6);
  assert.equal(new Set(sources).size, 6);
  assert.doesNotMatch(home, /<Image src=\{servicePhotography/);
  assert.match(home, /className="media-cover diagnostic-photo"/);
  assert.match(home, /className="service-photo"/);
});

test("redesign includes premium trust and conversion structure", () => {
  assert.match(home, /What needs attention right now\?/);
  assert.match(home, /A clearer way to request plumbing help/);
  assert.match(home, /Illustrative service photography/);
  assert.match(home, /servicePhotography/);
  assert.match(home, /capitalizeFirst/);
  assert.match(header, /DFW plumbing help/);
  assert.match(footer, /Plumbing guidance for stressful moments/);
  assert.match(css, /--ink:/);
  assert.match(css, /\.trust-ribbon/);
  assert.match(css, /h1::first-letter/);
  assert.match(css, /margin-top: 1\.25rem/);
});
