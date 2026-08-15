// Real, cited single-value facts used to power free embeddable badges under
// /tools. Every value here must trace back to a real, cited source already
// published on the site (the research guides under /guides, or a cited
// blog post) - do not add a fact without a real source, since this data
// feeds public embeddable widgets.

export type WidgetFact = {
  slug: string;
  label: string;
  value: string;
  sourceNote: string;
  linkPath: string;
};

export const widgetFacts: WidgetFact[] = [
  {
    slug: "dfw-winter-freeze-risk",
    label: "Winter Freeze Risk",
    value: "DFW Metro: 18+ major events since 2000",
    sourceNote: "National Weather Service Fort Worth/Dallas office historical winter weather event records.",
    linkPath: "/guides/dfw-burst-pipes"
  },
  {
    slug: "dfw-population-growth",
    label: "DFW Population Growth",
    value: "+2.2%/yr metro average",
    sourceNote: "Federal Reserve Bank of Dallas regional economic indicators (2025).",
    linkPath: "/guides/dfw-plumbing-data"
  },
  {
    slug: "tank-water-heater-lifespan",
    label: "Tank Water Heater Lifespan",
    value: "8-12 years typical",
    sourceNote: "A.O. Smith / Hotwater.com manufacturer guidance.",
    linkPath: "/guides/dfw-water-heater-lifespan"
  },
  {
    slug: "tankless-water-heater-lifespan",
    label: "Tankless Water Heater Lifespan",
    value: "15-20 years typical",
    sourceNote: "A.O. Smith / Hotwater.com manufacturer guidance.",
    linkPath: "/guides/dfw-water-heater-lifespan"
  },
  {
    slug: "dfw-slab-leak-risk",
    label: "Slab Leak Risk Factor",
    value: "Expansive clay soil - primary driver of DFW foundation failures",
    sourceNote: "ASCE research on expansive soil damage; Wray (1989) Dallas County foundation failure survey.",
    linkPath: "/guides/dfw-slab-leaks"
  },
  {
    slug: "polybutylene-pipe-era",
    label: "Polybutylene Pipe Era",
    value: "Installed 1978-1995 - still common in older DFW homes",
    sourceNote: "Cox v. Shell class-action settlement (1995); polybutylene production history.",
    linkPath: "/guides/dfw-polybutylene-pipe-replacement"
  },
  {
    slug: "polybutylene-repipe-cost",
    label: "PB Pipe Re-Pipe Cost",
    value: "$4,000-$15,000 typical range in DFW",
    sourceNote: "Typical DFW full re-pipe cost range published in our polybutylene pipe guide.",
    linkPath: "/guides/dfw-polybutylene-pipe-replacement"
  },
  {
    slug: "dfw-sewer-lateral-responsibility",
    label: "Sewer Lateral Responsibility",
    value: "Property line to house: almost always the homeowner's",
    sourceNote: "City of Dallas wastewater code; Fort Worth and Arlington Water Utilities policy language.",
    linkPath: "/guides/dfw-sewer-root-intrusion"
  },
  {
    slug: "gas-leak-safe-distance",
    label: "Gas Leak Safe Distance",
    value: "Evacuate 100-350 ft - never investigate a leak yourself",
    sourceNote: "University safety office and gas utility emergency protocol guidance.",
    linkPath: "/guides/dfw-gas-line-safety"
  },
  {
    slug: "tx-plumber-license-verify",
    label: "Verify a TX Plumber License",
    value: "Free via TSBPE - online search or (512) 936-5200",
    sourceNote: "Texas State Board of Plumbing Examiners (TSBPE) public license search tool.",
    linkPath: "/blog/how-to-verify-a-texas-plumbers-license"
  }
];

export function getWidgetFact(slug: string): WidgetFact | undefined {
  return widgetFacts.find((fact) => fact.slug === slug);
}
