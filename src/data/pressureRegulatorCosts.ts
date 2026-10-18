// Real, sourced cost data for the water pressure regulator (PRV) replacement cost calculator.
// Every figure traces to a cited source - do not add a number here without one.
//
// Primary cost source: Angi, "How Much Does Water Pressure Regulator Replacement
// Cost? [2026 Data]" (updated Apr 6, 2026) - nationwide average $400, typical
// range $200-$700. By installation size: 3/4-inch residential (single-family)
// $200-$400; 1-inch residential (larger home/multi-unit) $300-$600;
// commercial/large-capacity $600-$1,200. By regulator type (unit price only,
// not installed): spring-loaded/direct-acting $50-$150; manually adjustable
// $100-$250; pilot-controlled $150-$400; smart/digital $250-$600. Labor:
// $75-$200/hr, a straightforward replacement of an accessible unit takes
// 1-2 hours. Accessibility work (behind walls, under floors, crawl space)
// adds $100-$300 for removal and restoration. Permits (where required):
// $25-$100. Post-installation inspection (where required): $50-$150. Repair
// alternative: $75-$200, though the source suggests replacement once repair
// cost approaches 50% of a new unit's installed cost.
//
// Independent cross-check: HomeAdvisor, "How Much Does It Cost to Replace a
// Water Pressure Regulator?" (updated Jun 19, 2026) - confirms the same
// nationwide average ($400), the same typical range ($200-$700), and the
// same by-size and by-type breakdowns listed above (smaller jobs can run as
// low as ~$50; complex jobs can reach ~$1,200). Labor rate and 1-2 hour
// standard job time also match. After-hours/emergency surcharge: HomeAdvisor
// gives $100-$300 in its body text (its own summary table says $150-$300 -
// the two disagree slightly, so only the more conservative, more frequently
// stated $100-$300 figure is used here).
//
// Symptom/diagnosis content (why a PRV fails and what it looks like) is not
// re-cited here - it links to this site's own already-published, separately
// sourced blog posts: "High Water Pressure in Your Dallas Home" (a PRV that
// fails open) and "Sudden Low Water Pressure in Your Dallas Home" (a PRV that
// fails closed, among other causes).

export type RegulatorSizeId = "three-quarter" | "one-inch" | "commercial";

export type RegulatorSize = {
  id: RegulatorSizeId;
  label: string;
  shortLabel: string;
  installedLow: number;
  installedHigh: number;
  note: string;
};

export const regulatorSizes: RegulatorSize[] = [
  {
    id: "three-quarter",
    label: "3/4-inch (standard single-family home)",
    shortLabel: "3/4-inch residential",
    installedLow: 200,
    installedHigh: 400,
    note: "The most common size for a typical DFW single-family home's main water line."
  },
  {
    id: "one-inch",
    label: "1-inch (larger home or multi-unit property)",
    shortLabel: "1-inch residential",
    installedLow: 300,
    installedHigh: 600,
    note: "Used for larger homes, homes with higher fixture counts, or small multi-unit properties with a bigger main line."
  },
  {
    id: "commercial",
    label: "Commercial / large-capacity",
    shortLabel: "Commercial",
    installedLow: 600,
    installedHigh: 1200,
    note: "Larger-diameter valves and higher-flow-rate units used for commercial buildings or multi-unit complexes."
  }
];

export function getRegulatorSize(id: RegulatorSizeId): RegulatorSize {
  return regulatorSizes.find((s) => s.id === id) ?? regulatorSizes[0];
}

export type RegulatorTypeId = "spring-loaded" | "adjustable" | "pilot-controlled" | "smart";

export type RegulatorType = {
  id: RegulatorTypeId;
  label: string;
  unitLow: number;
  unitHigh: number;
};

// Unit (part) price only - informational context, not stacked onto the installed
// size-based range above, the same way the water service line calculator shows
// material cost as context rather than a second multiplier.
export const regulatorTypes: RegulatorType[] = [
  { id: "spring-loaded", label: "Spring-loaded / direct-acting (most common, lowest cost)", unitLow: 50, unitHigh: 150 },
  { id: "adjustable", label: "Manually adjustable", unitLow: 100, unitHigh: 250 },
  { id: "pilot-controlled", label: "Pilot-controlled", unitLow: 150, unitHigh: 400 },
  { id: "smart", label: "Smart / digital (leak alerts, remote monitoring)", unitLow: 250, unitHigh: 600 }
];

export function getRegulatorType(id: RegulatorTypeId): RegulatorType {
  return regulatorTypes.find((t) => t.id === id) ?? regulatorTypes[0];
}

export const accessibilityAddOn = { low: 100, high: 300 };
export const permitRange = { low: 25, high: 100 };
export const inspectionRange = { low: 50, high: 150 };
export const repairRange = { low: 75, high: 200 };
export const laborRate = { low: 75, high: 200 };

export const sourceNote =
  "Sources: Angi, \"How Much Does Water Pressure Regulator Replacement Cost? [2026 Data]\" (updated Apr 6, 2026 - installed cost by size, unit cost by regulator type, labor rate, accessibility/permit/inspection add-ons, repair alternative); HomeAdvisor, \"How Much Does It Cost to Replace a Water Pressure Regulator?\" (updated Jun 19, 2026 - independent cross-check confirming the same nationwide average, range, and by-size/by-type breakdowns).";
