// Outbound citation links to official / authoritative sources, shown in the
// "Official sources" section on content pages. These point AWAY from this site
// (they are not backlinks). Every URL below was checked live on 2026-10-19
// (status 200 and matching page title) before being added - none is guessed
// from a domain pattern. City sites that could not be confirmed from a live
// check (Rockwall, Wylie) are left out on purpose rather than guessed.

export type SourceLink = { label: string; href: string; note?: string };

export const sources = {
  tsbpe: {
    label: "Texas State Board of Plumbing Examiners (TSBPE)",
    href: "https://tsbpe.texas.gov/",
    note: "The state agency that licenses plumbers in Texas and handles complaints about plumbing work."
  },
  tsbpeLookup: {
    label: "TSBPE license search",
    href: "https://vo.licensing.hpc.texas.gov/datamart/selSearchType.do",
    note: "Check that the plumber who shows up holds a current Texas license before you approve work."
  },
  epaLeaks: {
    label: "EPA WaterSense: Fix a Leak Week",
    href: "https://www.epa.gov/watersense/fix-leak-week",
    note: "How much water household leaks waste and simple ways to find a running toilet or dripping fixture."
  },
  tdiWaterDamage: {
    label: "Texas Department of Insurance: water damage and your policy",
    href: "https://tdi.texas.gov/blog/water-damage.html",
    note: "What home and renters policies usually cover after sudden water damage, and what they usually exclude."
  },
  tdiBurstPipes: {
    label: "Texas Department of Insurance: burst pipes and water damage",
    href: "https://www.tdi.texas.gov/blog/does-insurance-cover-water-damage-caused-by-burst-pipes.html",
    note: "When a burst or leaking pipe is usually covered, and the steps to take before filing a claim."
  },
  nwsFreeze: {
    label: "National Weather Service Fort Worth: DFW normals and extremes",
    href: "https://www.weather.gov/fwd/dfw_records_normals",
    note: "Official freeze and temperature records for Dallas-Fort Worth, useful when planning pipe protection."
  },
  rheemWaterHeater: {
    label: "Rheem: water heater lifespan, repair or replace",
    href: "https://www.rheem.com/water-heating/articles/water-heater-lifespan-when-to-repair-vs-replace/",
    note: "Manufacturer guidance on typical tank and tankless lifespans and when replacement makes more sense."
  },
  dallasWater: {
    label: "Dallas Water Utilities",
    href: "https://dallascityhall.com/departments/waterutilities/Pages/default.aspx",
    note: "Water service, billing and main-break reporting for Dallas customers."
  },
  fortWorthWater: {
    label: "Fort Worth Water Department",
    href: "https://www.fortworthtexas.gov/departments/water",
    note: "Water service, rates and outage information for Fort Worth customers."
  },
  googlePartnerSites: {
    label: "Google: how Google uses information from sites that use its services",
    href: "https://policies.google.com/technologies/partner-sites",
    note: "What Google Analytics collects when a site uses it, and how Google handles that data."
  },
  gaOptOut: {
    label: "Google Analytics opt-out browser add-on",
    href: "https://tools.google.com/dlpage/gaoptout",
    note: "A free browser add-on that stops Google Analytics from collecting your visits on any site."
  },
  ftcEndorsement: {
    label: "FTC Endorsement Guides: what people are asking",
    href: "https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking",
    note: "The Federal Trade Commission's plain-language rules on disclosing paid relationships online."
  }
} satisfies Record<string, SourceLink>;

export type SourceKey = keyof typeof sources;

// Official city government websites, checked live 2026-10-19.
const cityOfficialSites: Record<string, string> = {
  dallas: "https://dallascityhall.com/",
  "fort-worth": "https://www.fortworthtexas.gov/",
  arlington: "https://www.arlingtontx.gov/",
  plano: "https://www.plano.gov/",
  irving: "https://www.irvingtx.gov/",
  garland: "https://www.garlandtx.gov/",
  frisco: "https://www.friscotexas.gov/",
  mckinney: "https://www.mckinneytexas.org/",
  denton: "https://www.cityofdenton.com/",
  lewisville: "https://www.cityoflewisville.com/",
  carrollton: "https://www.cityofcarrollton.com/",
  richardson: "https://www.cor.net/",
  "grand-prairie": "https://www.gptx.org/",
  mesquite: "https://www.cityofmesquite.com/",
  grapevine: "https://www.grapevinetexas.gov/",
  euless: "https://www.eulesstx.gov/",
  bedford: "https://bedfordtx.gov/",
  hurst: "https://www.hursttx.gov/",
  keller: "https://www.cityofkeller.com/",
  southlake: "https://www.cityofsouthlake.com/",
  "flower-mound": "https://www.flowermound.gov/",
  "the-colony": "https://www.thecolonytx.gov/",
  allen: "https://www.cityofallen.org/",
  rowlett: "https://www.rowletttx.gov/",
  mansfield: "https://www.mansfieldtexas.gov/",
  "cedar-hill": "https://www.cedarhilltx.com/",
  desoto: "https://www.desototexas.gov/",
  duncanville: "https://www.duncanvilletx.gov/",
  houston: "https://www.houstontx.gov/",
  austin: "https://www.austintexas.gov/",
  "san-antonio": "https://www.sa.gov/"
};

export function getCitySiteSource(citySlug: string, cityName: string): SourceLink | undefined {
  if (citySlug === "dallas") return sources.dallasWater;
  if (citySlug === "fort-worth") return sources.fortWorthWater;
  const href = cityOfficialSites[citySlug];
  if (!href) return undefined;
  return {
    label: `City of ${cityName} official website`,
    href,
    note: `Water service contacts, outage notices and permit rules for ${cityName} residents.`
  };
}

const serviceSourceKeys: Record<string, SourceKey[]> = {
  "24-hour-emergency-plumber": ["tsbpeLookup", "tdiWaterDamage", "epaLeaks"],
  "emergency-drain-cleaning": ["tsbpeLookup", "tdiWaterDamage"],
  "main-sewer-line-clog": ["tsbpeLookup", "tdiWaterDamage"],
  "toilet-overflow-emergency": ["tsbpeLookup", "epaLeaks", "tdiWaterDamage"],
  "burst-pipe-emergency": ["tdiBurstPipes", "tsbpeLookup", "nwsFreeze"],
  "water-heater-emergency": ["rheemWaterHeater", "tsbpeLookup"],
  "sewer-backup-help": ["tdiWaterDamage", "tsbpeLookup"],
  "commercial-emergency-plumbing": ["tsbpeLookup", "epaLeaks"],
  "same-day-plumber-connection": ["tsbpeLookup", "epaLeaks"],
  "sink-and-shower-drain-backup": ["tsbpeLookup", "epaLeaks"]
};

const topicRules: { pattern: RegExp; keys: SourceKey[] }[] = [
  { pattern: /water heater|pilot|anode|tankless|tank |scald|expansion tank|hot water/i, keys: ["rheemWaterHeater"] },
  { pattern: /insurance|claim|cover|policy|restoration/i, keys: ["tdiWaterDamage", "tdiBurstPipes"] },
  { pattern: /burst|frozen|freeze|winter|pipe/i, keys: ["tdiBurstPipes", "nwsFreeze"] },
  { pattern: /leak|meter|bill|drip|running toilet|water pressure|stain/i, keys: ["epaLeaks"] },
  { pattern: /sewer|drain|clog|backup|backing up|toilet|grease|smell/i, keys: ["tdiWaterDamage"] },
  { pattern: /license|plumber|hire|cost|price|quote|book|approve/i, keys: ["tsbpeLookup"] }
];

function unique(keys: SourceKey[]): SourceLink[] {
  return [...new Set(keys)].map((key) => sources[key]);
}

export function getServiceSources(serviceSlug?: string): SourceLink[] {
  return unique(serviceSourceKeys[serviceSlug ?? ""] ?? ["tsbpeLookup", "epaLeaks"]);
}

// Picks up to `max` sources that match the page topic; always includes the
// TSBPE license search so every plumbing page points readers to the licensing board.
export function getTopicSources(topic: string, serviceSlug?: string, max = 3): SourceLink[] {
  const keys: SourceKey[] = [];
  for (const rule of topicRules) if (rule.pattern.test(topic)) keys.push(...rule.keys);
  if (serviceSlug && serviceSourceKeys[serviceSlug]) keys.push(...serviceSourceKeys[serviceSlug]);
  keys.push("tsbpeLookup");
  const list = unique(keys);
  const lookup = list.find((s) => s.href === sources.tsbpeLookup.href)!;
  const rest = list.filter((s) => s !== lookup).slice(0, max - 1);
  return [...rest, lookup];
}

export function getCitySources(citySlug: string, cityName: string, serviceSlug?: string): SourceLink[] {
  const city = getCitySiteSource(citySlug, cityName);
  const service = serviceSlug ? getServiceSources(serviceSlug) : [sources.tsbpeLookup, sources.tdiWaterDamage];
  return [...(city ? [city] : []), ...service].slice(0, 3);
}

// Heading for a sources section that also names the page topic.
export function sourcesHeading(topic: string, prefix = "Official sources for") {
  const t = topic.trim();
  return /[?:]/.test(t) ? `${prefix} “${t}”` : `${prefix} ${t}`;
}
