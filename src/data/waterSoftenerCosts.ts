// Real, sourced cost data for the water softener cost & sizing calculator.
// Installed-cost-by-type and equipment-cost-by-grain-capacity figures:
// HomeAdvisor, "How Much Does a Water Softener System Cost to Install?"
// (2025/2026 data, fetched directly this session). DFW water hardness
// figures reuse this site's own already-published, cited municipal data
// from src/data/waterHardness.ts (do not duplicate hardness numbers here).
//
// Sizing note: the grain-capacity recommendation below uses a commonly
// published water-treatment-industry rule of thumb (daily grain load x 7
// days x 1.25 reserve), NOT a government or manufacturer-mandated figure.
// The page discloses this openly and lets the user adjust the
// gallons-per-person-per-day assumption rather than presenting it as a
// hard fact.

export type SoftenerTypeId = "single-tank" | "double-tank" | "salt-free";

export type SoftenerType = {
  id: SoftenerTypeId;
  label: string;
  shortLabel: string;
  lowInstalled: number;
  highInstalled: number;
  note: string;
};

export const softenerTypes: SoftenerType[] = [
  {
    id: "single-tank",
    label: "Single-tank salt-based (ion exchange)",
    shortLabel: "Single-tank salt-based",
    lowInstalled: 500,
    highInstalled: 1700,
    note: "The most common residential setup. Water stops softening for a few minutes during regeneration (usually scheduled overnight)."
  },
  {
    id: "double-tank",
    label: "Double-tank salt-based (ion exchange)",
    shortLabel: "Double-tank salt-based",
    lowInstalled: 1000,
    highInstalled: 5000,
    note: "A second resin tank keeps softened water available during regeneration - worth it for larger households that notice the hard-water gap."
  },
  {
    id: "salt-free",
    label: "Salt-free (potassium-based or descaler)",
    shortLabel: "Salt-free",
    lowInstalled: 800,
    highInstalled: 4000,
    note: "Conditions rather than removes hardness minerals - no salt, no regeneration cycle, but typically less effective at DFW's higher hardness levels and costs more to run (potassium costs more than salt)."
  }
];

export function getSoftenerType(id: SoftenerTypeId): SoftenerType {
  return softenerTypes.find((t) => t.id === id) ?? softenerTypes[0];
}

export type GrainCapacityTier = {
  grains: number;
  maxGpgAtFourPeople: number;
  equipmentLow: number;
  equipmentHigh: number;
};

// Equipment-only cost (excludes labor/materials/disposal), HomeAdvisor 2025/2026 data.
export const grainCapacityTiers: GrainCapacityTier[] = [
  { grains: 24000, maxGpgAtFourPeople: 3500, equipmentLow: 300, equipmentHigh: 500 },
  { grains: 32000, maxGpgAtFourPeople: 4500, equipmentLow: 400, equipmentHigh: 1000 },
  { grains: 48000, maxGpgAtFourPeople: 6850, equipmentLow: 600, equipmentHigh: 1200 },
  { grains: 64000, maxGpgAtFourPeople: 9150, equipmentLow: 800, equipmentHigh: 1500 },
  { grains: 80000, maxGpgAtFourPeople: 11500, equipmentLow: 1500, equipmentHigh: 1800 }
];

export function recommendGrainCapacity(dailyGrainLoad: number): GrainCapacityTier {
  // Target = daily grain load x 7 days x 1.25 reserve buffer (industry rule of thumb).
  const target = dailyGrainLoad * 7 * 1.25;
  return (
    grainCapacityTiers.find((tier) => tier.grains >= target) ??
    grainCapacityTiers[grainCapacityTiers.length - 1]
  );
}

export const defaultGallonsPerPersonPerDay = 70;
