// Real, sourced cost data for the water filtration system selector & cost
// calculator. Installed-cost-by-type, cost-by-filtration-stage, and overall
// average/range figures: HomeAdvisor, "How Much Do Home Water Filtration
// Systems Cost?" (2025/2026 data, fetched and re-verified twice this
// session - both passes returned identical figures). A secondary source
// (Bob Vila, citing "Angi and HomeAdvisor") gave a different overall
// average ($2,078 vs. HomeAdvisor's own $2,275) and a narrower range
// ($1,000-$4,000) that did not match HomeAdvisor's self-consistent figures
// across two fetches - that conflicting secondary figure was dropped per
// this project's standing data-reliability rule (see Round 58/62 notes in
// the backlog doc). Only HomeAdvisor's own, internally-consistent numbers
// are published below.
//
// DFW disinfectant-by-city facts: Dallas Water Utilities' own official water
// quality page (confirmed chloramine, fetched directly this session) and
// the North Texas Municipal Water District's own annual-chlorine-maintenance
// page (via a member city's official site, confirmed chloramine normally,
// temporary free-chlorine switch each Feb-Apr, fetched directly this
// session). NTMWD serves Plano, Allen, McKinney, Frisco, Rockwall, and
// Forney among this site's hardness-data cities. Fort Worth's disinfectant
// type was NOT independently confirmed via an official source this session
// - the page says so honestly rather than guessing, and points readers to
// Fort Worth Water's own published water quality report instead.

export type FiltrationSystemId =
  | "carbon"
  | "sediment"
  | "reverse-osmosis"
  | "uv"
  | "multi-stage";

export type FiltrationSystem = {
  id: FiltrationSystemId;
  label: string;
  lowInstalled: number;
  highInstalled: number;
  bestFor: string;
  note: string;
};

export const filtrationSystems: FiltrationSystem[] = [
  {
    id: "carbon",
    label: "Whole-house activated carbon filter",
    lowInstalled: 800,
    highInstalled: 1500,
    bestFor: "Chlorine or chloramine taste and odor",
    note: "Carbon adsorbs chlorine/chloramine byproducts and many organic odor compounds. It does not soften hard water or remove dissolved minerals - pair it with a softener if scale is also a concern."
  },
  {
    id: "sediment",
    label: "Whole-house sediment / well-water filter",
    lowInstalled: 1000,
    highInstalled: 4000,
    bestFor: "Cloudy water, grit, or iron/rust staining",
    note: "Mechanically traps particulate - sand, rust, scale fragments - before it reaches fixtures and appliances. HomeAdvisor's published range for this category is the same as its \"well-water filter\" line item, since the task (removing particulate) is the same for municipal and well sources."
  },
  {
    id: "reverse-osmosis",
    label: "Reverse osmosis (RO) system",
    lowInstalled: 1000,
    highInstalled: 4800,
    bestFor: "Drinking-water purity - lead, PFAS, nitrates, bacteria reduction",
    note: "Most residential RO systems are installed at a single point of use (usually the kitchen sink), not whole-house - a true whole-house RO setup sits at the top end of this range and needs a larger storage tank and periodic membrane replacement."
  },
  {
    id: "uv",
    label: "Ultraviolet (UV) purification unit",
    lowInstalled: 500,
    highInstalled: 1500,
    bestFor: "Bacteria/pathogen disinfection (common on well water)",
    note: "UV neutralizes bacteria and viruses using light, with no chemicals added - it doesn't remove minerals, chlorine taste, or sediment, so it's usually paired with a sediment or carbon stage ahead of it."
  },
  {
    id: "multi-stage",
    label: "Multi-stage whole-house system (several concerns at once)",
    lowInstalled: 500,
    highInstalled: 1200,
    bestFor: "More than one concern - taste, sediment, and general protection together",
    note: "HomeAdvisor's own published range for a 3-4 stage whole-house system; a 5-stage system (adds RO-level purification) can run $300-$2,300 depending on components."
  }
];

export function getFiltrationSystem(id: FiltrationSystemId): FiltrationSystem {
  return filtrationSystems.find((s) => s.id === id) ?? filtrationSystems[0];
}

export const filtrationStageCosts = [
  { stages: 1, lowInstalled: 300, highInstalled: 1000 },
  { stages: 2, lowInstalled: 400, highInstalled: 1200 },
  { stages: 3, lowInstalled: 500, highInstalled: 1200 },
  { stages: 4, lowInstalled: 800, highInstalled: 1200 },
  { stages: 5, lowInstalled: 300, highInstalled: 2300 }
];

export const overallFiltrationCost = {
  average: 2275,
  typicalLow: 1129,
  typicalHigh: 3541,
  overallLow: 200,
  overallHigh: 6000
};

export const filtrationLaborAndMaintenance = {
  laborLow: 300,
  laborHigh: 500,
  waterTestingLow: 30,
  waterTestingHigh: 500,
  annualMaintenanceLow: 50,
  annualMaintenanceHigh: 300,
  repairLow: 50,
  repairHigh: 800
};

export type DisinfectantNote = {
  citySlugs: string[];
  disinfectant: "chloramine-confirmed" | "unconfirmed";
  note: string;
};

// citySlugs match src/data/waterHardness.ts slugs so the same city picker
// can drive both the softener and filtration tools.
export const disinfectantNotes: DisinfectantNote[] = [
  {
    citySlugs: ["dallas"],
    disinfectant: "chloramine-confirmed",
    note: "Dallas Water Utilities uses chloramine (chlorine plus ammonia) as its disinfectant, per its own published water quality information - chosen specifically to limit chlorine byproducts. A whole-house carbon filter is the standard way to reduce the taste it can leave behind."
  },
  {
    citySlugs: ["plano", "allen", "mckinney", "frisco", "rockwall", "forney"],
    disinfectant: "chloramine-confirmed",
    note: "This city is served by the North Texas Municipal Water District (NTMWD), which uses chloramine most of the year but temporarily switches to free chlorine for about a month each spring (typically late February through early April) as a required maintenance flush - expect a stronger chlorine taste/smell during that window specifically, not a sign anything is wrong."
  },
  {
    citySlugs: ["fort-worth"],
    disinfectant: "unconfirmed",
    note: "We were not able to independently confirm Fort Worth Water's current disinfectant type (chlorine vs. chloramine) from an official source this session - check Fort Worth Water's own published Consumer Confidence Report for the current year before assuming either answer."
  }
];

export function getDisinfectantNote(citySlug: string): DisinfectantNote | undefined {
  return disinfectantNotes.find((n) => n.citySlugs.includes(citySlug));
}
