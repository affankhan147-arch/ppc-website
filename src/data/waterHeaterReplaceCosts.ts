// Real, sourced cost and lifespan data for the water heater repair-vs-replace
// calculator. Every figure traces to a cited source - do not add a number
// here without one. Repair/replace dollar figures: Angi, "How Much Does
// Water Heater Replacement Cost?" and "Cost to Repair a Hot Water Heater"
// (both 2026 data). Lifespan figures and the 50%-rule / age thresholds:
// Rheem Manufacturing, "Water Heater Lifespan: When to Repair vs. Replace",
// consistent with the A.O. Smith guidance already cited on
// /guides/dfw-water-heater-lifespan.

export type RepairOption = {
  id: string;
  label: string;
  lowCost: number;
  highCost: number;
  alwaysReplace?: boolean;
  note: string;
};

export const repairOptions: RepairOption[] = [
  { id: "thermostat", label: "Thermostat replacement", lowCost: 150, highCost: 200, note: "Angi 2026 data: about $150-$200 installed." },
  { id: "heating-element", label: "Heating element replacement", lowCost: 200, highCost: 300, note: "Angi 2026 data: about $200-$300 installed." },
  { id: "anode-rod", label: "Anode rod replacement", lowCost: 100, highCost: 200, note: "Angi 2026 data: about $100-$200 installed." },
  { id: "pilot-light", label: "Pilot light / igniter service", lowCost: 50, highCost: 150, note: "Angi 2026 data: about $50-$150 for a service call." },
  { id: "trp-valve", label: "Pressure relief (T&P) valve replacement", lowCost: 100, highCost: 200, note: "Angi 2026 data: up to about $200 installed." },
  { id: "gas-control-valve", label: "Gas control valve replacement", lowCost: 300, highCost: 400, note: "Angi 2026 data: about $350 on average." },
  { id: "flush", label: "Tank flush / sediment cleaning", lowCost: 150, highCost: 250, note: "Angi 2026 data: about $200 on average." },
  {
    id: "tank-leak",
    label: "The tank itself is leaking or visibly corroded",
    lowCost: 0,
    highCost: 0,
    alwaysReplace: true,
    note: "A leak from the tank body (not a fitting) means the tank itself is compromised and is not repairable."
  },
  { id: "custom", label: "Other repair - I already have a quote", lowCost: 0, highCost: 0, note: "Enter the quoted repair cost." }
];

export type UnitTypeId = "tank" | "tankless";

export type UnitType = {
  id: UnitTypeId;
  label: string;
  expectedLifespanLow: number;
  expectedLifespanHigh: number;
  replaceLow: number;
  replaceHigh: number;
  source: string;
};

export const unitTypes: UnitType[] = [
  {
    id: "tank",
    label: "Tank (conventional storage) water heater",
    expectedLifespanLow: 8,
    expectedLifespanHigh: 12,
    replaceLow: 882,
    replaceHigh: 1826,
    source: "Angi, \"How Much Does Water Heater Replacement Cost?\" (2026 data)"
  },
  {
    id: "tankless",
    label: "Tankless (on-demand) water heater",
    expectedLifespanLow: 15,
    expectedLifespanHigh: 20,
    replaceLow: 1400,
    replaceHigh: 3900,
    source: "Angi, \"How Much Does a Tankless Water Heater Cost?\" (2026 data)"
  }
];

export function getUnitType(id: UnitTypeId): UnitType {
  return unitTypes.find((u) => u.id === id) ?? unitTypes[0];
}

export function getRepairOption(id: string): RepairOption {
  return repairOptions.find((r) => r.id === id) ?? repairOptions[0];
}

export const FIFTY_PERCENT_RULE_SOURCE = "Rheem Manufacturing, \"Water Heater Lifespan: When to Repair vs. Replace\"";
