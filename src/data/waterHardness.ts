// Real, cited water hardness data for DFW-area cities, matching the sourced
// figures published in /guides/dfw-plumbing-data (municipal water utility
// reports and regional water-treatment provider field testing, 2023-2024).
// Do not add a city here without a real, citable source - this data feeds
// a public embeddable widget, so it must stay accurate.

export type WaterHardnessEntry = {
  slug: string;
  name: string;
  rangeLabel: string;
  classification: string;
};

export const waterHardnessData: WaterHardnessEntry[] = [
  { slug: "forney", name: "Forney, TX", rangeLabel: "13-17", classification: "Very Hard" },
  { slug: "rockwall", name: "Rockwall, TX", rangeLabel: "12-16", classification: "Very Hard" },
  { slug: "frisco", name: "Frisco, TX", rangeLabel: "10-14", classification: "Very Hard" },
  { slug: "mckinney", name: "McKinney, TX", rangeLabel: "10-14", classification: "Very Hard" },
  { slug: "plano", name: "Plano, TX", rangeLabel: "9-13", classification: "Hard to Very Hard" },
  { slug: "allen", name: "Allen, TX", rangeLabel: "9-13", classification: "Hard to Very Hard" },
  { slug: "dallas", name: "Dallas, TX", rangeLabel: "7-11", classification: "Hard to Very Hard" },
  { slug: "fort-worth", name: "Fort Worth, TX", rangeLabel: "7-10", classification: "Hard" }
];

export const regionalAverageHardness: WaterHardnessEntry = {
  slug: "dfw-regional",
  name: "DFW Metro (Regional Avg)",
  rangeLabel: "7-14",
  classification: "Hard to Very Hard"
};

export function getWaterHardnessEntry(slug: string): WaterHardnessEntry | undefined {
  if (slug === regionalAverageHardness.slug) return regionalAverageHardness;
  return waterHardnessData.find((entry) => entry.slug === slug);
}
