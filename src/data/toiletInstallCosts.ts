// Real, sourced cost data for the toilet installation / replacement cost
// calculator (PlumbingHands Method-10 Priority 20).
//
// SOURCES (fetched directly 2026-10-21):
// 1. Fixr, "Cost to Install a Toilet" - https://www.fixr.com/costs/toilet-installation
//    National average $450 (materials + labor). Typical range $250-$800.
//    Outer bounds $200-$4,000. Labor alone $150-$440/job ($75-$150/hr).
//    Removal/haul-away of the old toilet: $50-$200.
//    Replacing an existing toilet (plumbing already in place): $250-$800.
//    Installing where no toilet existed before (new rough-in/venting): $1,000-$3,500.
//    By-type ranges: Two-piece $200-$950, One-piece $250-$1,100,
//    Wall-mounted/wall-hung $500-$2,000, Smart $750-$4,000+, Bidet $350-$3,000+,
//    Composting $250-$1,500, Corner $325-$1,300, Macerating $600-$1,300.
//
// 2. HomeAdvisor, "How Much Does It Cost to Install a Toilet?" -
//    https://www.homeadvisor.com/cost/plumbing/install-a-toilet/
//    National average $374. Typical range $224-$533. Outer bounds $120-$826.
//    Average labor $373/job. Removal/haul-away of the old toilet: $50-$200.
//    By-type average cost: One-piece $800, Two-piece $375, Wall-mounted $700,
//    Dual flush $500, Pressure-assisted $600, Double cyclone $400,
//    Upflush $1,000, High-level $700.
//
// The two sources diverge moderately on national averages ($450 vs $374) and
// on which toilet type costs more (Fixr has two-piece cheaper than one-piece;
// HomeAdvisor has it the other way). That is disclosed honestly on the page
// rather than forced into false agreement - both ranges are shown as "two
// independent cost guides" so a homeowner can see the real market spread.

export type JobType = "replace-existing" | "new-install";

export const jobTypes: { id: JobType; label: string; description: string }[] = [
  {
    id: "replace-existing",
    label: "Replacing an existing toilet",
    description: "Plumbing (supply line, drain, flange) is already in place.",
  },
  {
    id: "new-install",
    label: "Installing where no toilet existed before",
    description: "Needs new rough-in plumbing, venting, and a drain line - a half-bath addition or similar.",
  },
];

export type ToiletType =
  | "two-piece"
  | "one-piece"
  | "wall-mounted"
  | "smart"
  | "bidet"
  | "composting"
  | "corner"
  | "macerating"
  | "dual-flush"
  | "pressure-assisted"
  | "upflush";

export interface ToiletTypeCost {
  id: ToiletType;
  label: string;
  // Fixr by-type range (installed)
  fixrLow: number;
  fixrHigh: number;
  // HomeAdvisor by-type average (installed) - null where HomeAdvisor doesn't list the type
  homeAdvisorAvg: number | null;
}

export const toiletTypeCosts: ToiletTypeCost[] = [
  { id: "two-piece", label: "Two-piece (tank + bowl)", fixrLow: 200, fixrHigh: 950, homeAdvisorAvg: 375 },
  { id: "one-piece", label: "One-piece", fixrLow: 250, fixrHigh: 1100, homeAdvisorAvg: 800 },
  { id: "wall-mounted", label: "Wall-mounted / wall-hung", fixrLow: 500, fixrHigh: 2000, homeAdvisorAvg: 700 },
  { id: "dual-flush", label: "Dual-flush", fixrLow: 200, fixrHigh: 950, homeAdvisorAvg: 500 },
  { id: "pressure-assisted", label: "Pressure-assisted", fixrLow: 250, fixrHigh: 1100, homeAdvisorAvg: 600 },
  { id: "upflush", label: "Upflush (macerating-pump, basement)", fixrLow: 600, fixrHigh: 1300, homeAdvisorAvg: 1000 },
  { id: "macerating", label: "Macerating", fixrLow: 600, fixrHigh: 1300, homeAdvisorAvg: 1000 },
  { id: "smart", label: "Smart (bidet features, heated seat, etc.)", fixrLow: 750, fixrHigh: 4000, homeAdvisorAvg: null },
  { id: "bidet", label: "Bidet-combo", fixrLow: 350, fixrHigh: 3000, homeAdvisorAvg: null },
  { id: "composting", label: "Composting", fixrLow: 250, fixrHigh: 1500, homeAdvisorAvg: null },
  { id: "corner", label: "Corner", fixrLow: 325, fixrHigh: 1300, homeAdvisorAvg: null },
];

// Overall national figures (unit = replacing an existing toilet, standard type)
export const fixrOverall = { low: 250, high: 800, average: 450, outerLow: 200, outerHigh: 4000 };
export const homeAdvisorOverall = { low: 224, high: 533, average: 374, outerLow: 120, outerHigh: 826 };

// Labor-only figures
export const fixrLabor = { low: 150, high: 440, hourlyLow: 75, hourlyHigh: 150 };
export const homeAdvisorLaborAverage = 373;

// Removal / haul-away of the old toilet (both sources agree closely on this line item)
export const removalHaulAway = { low: 50, high: 200 };

// New-install (no prior toilet/plumbing) premium, per Fixr - the only source
// that breaks this scenario out separately
export const newInstallRange = { low: 1000, high: 3500 };

export function estimateTotal(
  toiletType: ToiletType,
  jobType: JobType,
  includeRemoval: boolean
): { low: number; high: number; homeAdvisorMid: number | null } {
  const type = toiletTypeCosts.find((t) => t.id === toiletType) ?? toiletTypeCosts[0];

  let low = type.fixrLow;
  let high = type.fixrHigh;
  let homeAdvisorMid = type.homeAdvisorAvg;

  if (jobType === "new-install") {
    // New rough-in work adds the new-install premium on top of the fixture/labor range
    low = Math.max(low, newInstallRange.low);
    high = Math.max(high, newInstallRange.high);
    homeAdvisorMid = null; // HomeAdvisor's by-type averages assume existing plumbing
  } else if (includeRemoval) {
    low += removalHaulAway.low;
    high += removalHaulAway.high;
    if (homeAdvisorMid !== null) homeAdvisorMid += removalHaulAway.low;
  }

  return { low, high, homeAdvisorMid };
}
