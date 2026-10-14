// Real, sourced cost data for the garbage disposal repair-or-replace cost
// calculator (PlumbingHands Method-10 Priority 17).
//
// REPLACEMENT figures: HomeAdvisor, "How Much Does It Cost to Replace a
// Garbage Disposal?" (fetched directly 2026-10-14) - overall average/range,
// cost by horsepower/household-size tier (HomeAdvisor's own three bands -
// it does not break out each individual HP size separately), and labor
// rate per hour. These are HomeAdvisor's current, directly-fetched figures.
//
// REPAIR figure: only the OVERALL range/average that a secondary source
// (Bob Vila, "Garbage Disposal Repair Cost") explicitly attributes to
// HomeAdvisor is used here ($70-$400, average ~$250). That same article's
// finer by-problem breakdown table (e.g. "$65-$125 for a flywheel") carries
// no cited source and the article itself is dated September 2023, so per
// this project's standing data-reliability rule (drop a figure that does
// not trace to a current, named primary source rather than publish it),
// those per-problem dollar figures are deliberately NOT published here.
// The tool shows one general repair range only, disclosed as such.
//
// Lifespan (5-10 years) and the "replacement usually wins once a unit is
// older or has a cracked housing/burned-out motor" guidance: HomeAdvisor's
// own replacement-cost page states a five-to-10-year typical lifespan and
// that replacement often beats major repair near the end of that range.

export type DisposalProblem =
  | "jammed-or-clogged"
  | "leaking"
  | "wont-turn-on"
  | "cracked-or-burned-out"
  | "estimate-only";

export const disposalProblems: { id: DisposalProblem; label: string }[] = [
  { id: "jammed-or-clogged", label: "Jammed, clogged, or humming but not spinning" },
  { id: "leaking", label: "Leaking at the sink flange, seal, or hose connection" },
  { id: "wont-turn-on", label: "Won't turn on at all (no hum, no response)" },
  { id: "cracked-or-burned-out", label: "Cracked housing or burned-out motor" },
  { id: "estimate-only", label: "No problem yet - just planning a replacement" }
];

export type HorsepowerTier = {
  id: "light" | "moderate" | "heavy";
  label: string;
  hpRange: string;
  maxPeople: number;
  installedLow: number;
  installedHigh: number;
};

// HomeAdvisor's own household-size-based horsepower bands (fetched directly
// 2026-10-14). HomeAdvisor groups ranges this way rather than pricing each
// individual HP size (1/3, 1/2, 3/4, 1 HP) separately.
export const horsepowerTiers: HorsepowerTier[] = [
  { id: "light", label: "1/3-1/2 HP (light use)", hpRange: "1/3-1/2 HP", maxPeople: 2, installedLow: 50, installedHigh: 225 },
  { id: "moderate", label: "5/8-3/4 HP (moderate use)", hpRange: "5/8-3/4 HP", maxPeople: 4, installedLow: 120, installedHigh: 310 },
  { id: "heavy", label: "1-1 1/4 HP (heavy use)", hpRange: "1-1 1/4 HP", maxPeople: 99, installedLow: 200, installedHigh: 400 }
];

export function recommendTier(people: number): HorsepowerTier {
  return horsepowerTiers.find((t) => people <= t.maxPeople) ?? horsepowerTiers[horsepowerTiers.length - 1];
}

// Overall figures, HomeAdvisor direct (replacement) and HomeAdvisor-via-Bob-Vila (repair overall only).
export const overallReplacement = { low: 200, high: 625, average: 550 };
export const overallRepair = { low: 70, high: 400, average: 250 };
export const laborPerHour = { low: 50, high: 100 };
export const typicalLifespanYears = { low: 5, high: 10 };
export const replaceAgeThresholdYears = 8;
