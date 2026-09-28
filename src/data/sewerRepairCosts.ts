// Real, sourced cost data for the sewer line repair cost calculator
// (trenchless vs. traditional excavation). Every figure traces to a cited
// source - do not add a number here without one. Per-linear-foot and
// total-cost figures: Angi, "How Much Does Sewer Line Replacement Cost?"
// and "How Much Does Trenchless Sewer Line Piping Cost?" (both 2026 data).

export type RepairMethodId = "cipp-lining" | "pipe-bursting" | "traditional";

export type RepairMethod = {
  id: RepairMethodId;
  label: string;
  shortLabel: string;
  lowPerFoot: number;
  highPerFoot: number;
  minDisruption: boolean;
  note: string;
  source: string;
};

export const repairMethods: RepairMethod[] = [
  {
    id: "cipp-lining",
    label: "Trenchless - pipe lining (CIPP)",
    shortLabel: "CIPP lining",
    lowPerFoot: 135,
    highPerFoot: 150,
    minDisruption: true,
    note: "A resin-impregnated liner is inserted into the existing pipe and cured in place, creating a new seamless pipe inside the old one. Not an option if the old pipe has fully collapsed or has bellies (sags) - a camera inspection confirms whether lining is viable.",
    source: "Angi, \"How Much Does Trenchless Sewer Line Piping Cost?\" (2026 data)"
  },
  {
    id: "pipe-bursting",
    label: "Trenchless - pipe bursting",
    shortLabel: "Pipe bursting",
    lowPerFoot: 150,
    highPerFoot: 190,
    minDisruption: true,
    note: "A bursting head breaks apart the old pipe outward while simultaneously pulling a new pipe into place. Used when the old pipe's diameter needs to increase or lining isn't viable, but still needs small access pits at each end.",
    source: "Angi, \"How Much Does Trenchless Sewer Line Piping Cost?\" (2026 data)"
  },
  {
    id: "traditional",
    label: "Traditional excavation (dig-and-replace)",
    shortLabel: "Traditional dig",
    lowPerFoot: 50,
    highPerFoot: 250,
    minDisruption: false,
    note: "The yard is trenched along the full pipe run and the old pipe is dug out and replaced. Usually the only option once a pipe section has fully collapsed, and required for severe root-damaged sections a liner can't bridge.",
    source: "Angi, \"How Much Does Sewer Line Replacement Cost?\" (2026 data)"
  }
];

export function getRepairMethod(id: RepairMethodId): RepairMethod {
  return repairMethods.find((m) => m.id === id) ?? repairMethods[0];
}

export const cameraInspection = { low: 175, high: 350, note: "Angi 2026 data: a diagnostic sewer camera inspection typically runs $175-$350 and is what confirms whether trenchless lining is even viable for your pipe's condition." };

export const permitFee = { low: 0, high: 1000, note: "Angi 2026 data: many DFW municipalities require a permit for sewer lateral work, which can add up to $1,000 depending on the city and scope." };

export const treeRootObstacle = { low: 60, high: 250, note: "Angi 2026 data: excavating around tree roots or other obstacles (common in DFW's mature-tree older neighborhoods) runs $60-$250 per hour of extra labor and is the most common reason a quote comes in above the base per-foot range." };
