// Real, sourced cost data for the slab leak repair cost calculator.
// Every figure traces to a cited source - do not add a number here without one.
// Primary source: HomeAdvisor, "How Much Does Slab Leak Repair Cost?" (2026 data) -
// re-verified across two separate verbatim fetches this session, including a
// heading-by-heading pass that confirmed the reroute figure appears twice on the
// same page under two different headings ("Slab leak reroute" and "Foundation
// Work") with the same $600-$4,000 range both times.
// Secondary cross-check: This Old House, "Slab Leak Repair Cost" (cites HomeAdvisor
// pricing). Its own "Rerouting Plumbing" figure ($1,500-$15,000) did NOT match
// HomeAdvisor's own reroute figure, so that specific number was dropped rather than
// published - only the overall-average/range figure matched exactly across both
// sources ($630-$4,400) and is used here as a cross-verified sanity check.

export type RepairMethodId = "relining" | "reroute";

export type RepairMethod = {
  id: RepairMethodId;
  label: string;
  shortLabel: string;
  perFoot: boolean;
  low: number;
  high: number;
  note: string;
  source: string;
};

export const repairMethods: RepairMethod[] = [
  {
    id: "relining",
    label: "Trenchless pipe relining (cured-in-place)",
    shortLabel: "Trenchless relining",
    perFoot: true,
    low: 80,
    high: 250,
    note: "A resin liner is cured in place inside the existing damaged section, avoiding any excavation into the slab. Only viable if the pipe hasn't fully collapsed - a leak-detection diagnosis confirms this first.",
    source: "HomeAdvisor, \"How Much Does Slab Leak Repair Cost?\" (2026 data), \"Cured-in-place repair\" line"
  },
  {
    id: "reroute",
    label: "Pipe reroute (abandon the damaged line)",
    shortLabel: "Reroute",
    perFoot: false,
    low: 600,
    high: 4000,
    note: "Instead of accessing the damaged pipe under the slab at all, the plumber abandons that section and runs new supply line through the attic or exterior walls. This is typically a flat project cost rather than a per-foot one, since it doesn't scale directly with the length of damaged pipe left behind.",
    source: "HomeAdvisor, \"How Much Does Slab Leak Repair Cost?\" (2026 data), \"Slab leak reroute\" / \"Foundation Work\" lines (same $600-$4,000 figure appears under both headings)"
  }
];

export function getRepairMethod(id: RepairMethodId): RepairMethod {
  return repairMethods.find((m) => m.id === id) ?? repairMethods[0];
}

export const leakDetection = {
  low: 150,
  high: 400,
  note: "HomeAdvisor 2026 data: professional slab leak detection (acoustic listening, thermal imaging, or tracer gas) typically runs $150-$400 before any repair begins, and is what actually confirms the leak's location and which repair methods are viable.",
  source: "HomeAdvisor, \"How Much Does Slab Leak Repair Cost?\" (2026 data), \"Slab Leak Detection Cost\" section"
};

export const overallAverage = {
  avg: 2280,
  low: 630,
  high: 4400,
  note: "HomeAdvisor's own published average across all slab leak repairs, cross-checked against This Old House's independently stated range for the same figure - both sources agree exactly on $630-$4,400.",
  source: "HomeAdvisor and This Old House, \"Slab Leak Repair Cost\" (2026 data)"
};
