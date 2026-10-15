// Real, sourced cost data for the water service line replacement cost calculator.
// Every figure traces to a cited source - do not add a number here without one.
//
// Primary cost source: HomeAdvisor, "How Much Does Main Water Line Replacement
// Cost in 2026?" (updated June 19, 2026) - national average $1,702, typical
// range $646-$2,834, full project range roughly $200-$5,000. Per-linear-foot
// INSTALLED cost (labor + material combined): typical $50-$150/ft, up to
// roughly $250/ft in high-cost urban areas or for deep lines. By method:
// open-trench (traditional dig) $50-$250/ft; trenchless $75-$150/ft. A
// private service line running from the street/meter to the house can add up
// to $2,500 on top of the base figures above. Spot repair (a single failure
// point rather than a full line replacement): $350-$1,700. Permits: $100-$500;
// inspection: $150-$500 (varies by city - many DFW cities don't charge
// separately for inspection on this type of work).
//
// Per-linear-foot MATERIAL-ONLY cost by pipe type (same HomeAdvisor page) -
// shown as informational context, not stacked onto the installed total above,
// since the installed per-foot figures already include labor and a typical
// material cost: PVC $0.50-$5/ft; PEX $0.40-$2/ft; copper $2-$10/ft; cast
// iron $2-$10/ft. These bracket where a job is likely to land within the
// installed range above - lower-cost materials (PVC, PEX) tend toward the
// low end, copper and cast iron toward the high end - but this calculator
// does not compute a separate multiplier from them, since HomeAdvisor does
// not publish a direct material-to-installed-cost conversion the way it does
// for the whole-house repipe job (see repipeCosts.ts for that derivation).
//
// Responsibility source (who pays - homeowner or city): Texas Administrative
// Code, Title 16, Part 2, Chapter 24, Subchapter F, Section 24.163(a)(2) -
// the utility installs and owns the service pipe from its main to the meter;
// the customer/property owner must furnish, lay, and "keep the service line
// in good repair" from the discharge side of the meter onward (or from the
// utility's cutoff valve, or the property line, if there's no meter on the
// property). Confirmed consistent with Dallas Water Utilities' own published
// guidance, which states property owners are responsible for maintaining the
// "private portion of the service line... from the meter" onward, while the
// utility maintains the public side and the meter itself.

export type ServiceLineMethodId = "trenched" | "trenchless";

export type ServiceLineMethod = {
  id: ServiceLineMethodId;
  label: string;
  shortLabel: string;
  perFootLow: number;
  perFootHigh: number;
  note: string;
};

export const serviceLineMethods: ServiceLineMethod[] = [
  {
    id: "trenched",
    label: "Open-trench (traditional dig, the most common method)",
    shortLabel: "Open-trench",
    perFootLow: 50,
    perFootHigh: 250,
    note: "A continuous trench is dug along the full line route. It's the most common method and usually the cheapest per foot unless the yard has a lot of landscaping, a driveway, or hardscape to restore afterward."
  },
  {
    id: "trenchless",
    label: "Trenchless (pipe bursting or directional boring)",
    shortLabel: "Trenchless",
    perFootLow: 75,
    perFootHigh: 150,
    note: "A new line is pulled through or bursts the old one using small access pits instead of a continuous trench. It typically costs more per foot than open-trench for a short, obstruction-free run, but can cost less overall once driveway, sidewalk, or mature-landscaping restoration is factored in."
  }
];

export function getServiceLineMethod(id: ServiceLineMethodId): ServiceLineMethod {
  return serviceLineMethods.find((m) => m.id === id) ?? serviceLineMethods[0];
}

export type PipeMaterialId = "pex" | "pvc" | "copper" | "cast-iron";

export type ServiceLineMaterial = {
  id: PipeMaterialId;
  label: string;
  perFootMaterialLow: number;
  perFootMaterialHigh: number;
  tendsToward: "low" | "mid" | "high";
};

export const serviceLineMaterials: ServiceLineMaterial[] = [
  { id: "pex", label: "PEX", perFootMaterialLow: 0.4, perFootMaterialHigh: 2, tendsToward: "low" },
  { id: "pvc", label: "PVC", perFootMaterialLow: 0.5, perFootMaterialHigh: 5, tendsToward: "low" },
  { id: "copper", label: "Copper", perFootMaterialLow: 2, perFootMaterialHigh: 10, tendsToward: "high" },
  { id: "cast-iron", label: "Cast iron", perFootMaterialLow: 2, perFootMaterialHigh: 10, tendsToward: "high" }
];

export function getServiceLineMaterial(id: PipeMaterialId): ServiceLineMaterial {
  return serviceLineMaterials.find((m) => m.id === id) ?? serviceLineMaterials[0];
}

export const distanceAddOn = {
  max: 2500,
  note: "A private service line running from the street or meter to the house can add up to $2,500 on top of the per-foot figures above, depending on how far the house sits from the connection point."
};

export const spotRepairRange = { low: 350, high: 1700 };
export const permitRange = { low: 100, high: 500 };
export const inspectionRange = { low: 150, high: 500 };

export const responsibilityNote =
  "Under Texas Administrative Code Title 16, Section 24.163(a)(2), the utility installs and owns the service pipe only from its main up to the meter. From the discharge side of the meter onward - the portion running to your house - is the customer's property and the customer's responsibility to install, repair, and maintain. Dallas Water Utilities' own published guidance confirms the same split: the city maintains the public side and the meter, while the property owner is responsible for the private portion of the line from the meter onward. This pattern is standard across Texas municipal water utilities, though it's worth confirming the exact property-line or easement boundary with your own city before assuming where your responsibility starts.";

export const sourceNote =
  "Sources: HomeAdvisor, \"How Much Does Main Water Line Replacement Cost in 2026?\" (updated June 19, 2026 - per-linear-foot installed cost by method, per-linear-foot material cost by pipe type, spot-repair and permit/inspection ranges); Texas Administrative Code, Title 16, Part 2, Chapter 24, Subchapter F, Section 24.163(a)(2) (utility-vs-customer service line responsibility, statewide rule); Dallas Water Utilities' published lead-and-copper service line guidance (confirms the same utility/customer split at the meter).";
