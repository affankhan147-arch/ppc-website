// Real, cited single-value facts used to power free embeddable badges under
// /tools. Every value here must trace back to a real, cited source already
// published on the site (guides/dfw-plumbing-data, guides/dfw-burst-pipes,
// guides/dfw-water-heater-lifespan) - do not add a fact without a real
// source, since this data feeds public embeddable widgets.

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
  }
];

export function getWidgetFact(slug: string): WidgetFact | undefined {
  return widgetFacts.find((fact) => fact.slug === slug);
}
