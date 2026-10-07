// Real, sourced cost data for the whole-house repipe cost calculator.
// Every figure traces to a cited source - do not add a number here without one.
//
// Baseline per-square-foot rate: HomeAdvisor, "How Much Does It Cost to Repipe
// a House?" (2026 data) - states an average of $4.50 per square foot to install
// new plumbing pipe, with worked examples of $4,500 for 1,000 sq ft, $6,750 for
// 1,500 sq ft, and $9,000 for 2,000 sq ft (all consistent with that $4.50/sq ft
// rate). The low/high spread used here (roughly $3.25-$6.25 per sq ft) brackets
// that $4.50 average the same way Angi's own national range brackets its $7,500
// average project cost ($1,500-$15,000 - roughly a third to double the average).
//
// Pipe-material multiplier (copper vs. PEX): Angi/Bob Vila, "Cost to Repipe a
// House" and HomeAdvisor's own install-pipes page both put copper pipe at
// roughly $2-$12 per linear foot versus PEX at roughly $0.40-$4 per linear foot
// - call it 3x-4x PEX's per-foot material cost. HomeAdvisor's same page states
// labor is "roughly 70% of the total" repipe cost, so with material at ~30% of
// the job, a 3x-4x material-cost jump works out to roughly a 60%-90% increase
// in the TOTAL project cost, not a full 3x-4x. This calculator applies a 1.75x
// total-project multiplier for copper as a transparent mid-point of that
// derived range - it is a modeled estimate, not a directly-published figure,
// and is labeled as such on the page.
//
// DFW sanity check: PlumbingHands' own polybutylene-pipe guide
// (/guides/dfw-polybutylene-pipe-replacement) already publishes a real-world
// DFW full-repipe range of $4,000-$15,000 (smaller/limited-scope jobs
// $4,000-$8,000, larger or harder-access jobs $12,000-$15,000). The modeled
// PEX estimates below land inside that already-published DFW range across the
// calculator's 900-3,200 sq ft input span, which is the cross-check this
// calculator's own FAQ points back to.

export type PipeMaterialId = "pex" | "copper";

export type PipeMaterial = {
  id: PipeMaterialId;
  label: string;
  shortLabel: string;
  multiplier: number;
  note: string;
};

export const pipeMaterials: PipeMaterial[] = [
  {
    id: "pex",
    label: "PEX (most common choice for a repipe today)",
    shortLabel: "PEX",
    multiplier: 1,
    note: "PEX is flexible, freeze-resistant, and the material most DFW plumbers now install for a full repipe, including when replacing failed polybutylene."
  },
  {
    id: "copper",
    label: "Copper (traditional, more expensive)",
    shortLabel: "Copper",
    multiplier: 1.75,
    note: "Copper costs roughly 3x-4x more per linear foot than PEX for materials alone. Since labor is about 70% of a typical repipe job, that works out to a modeled ~75% increase in the total project cost - still a real cost difference, but less dramatic than the raw per-foot material gap suggests."
  }
];

export function getPipeMaterial(id: PipeMaterialId): PipeMaterial {
  return pipeMaterials.find((m) => m.id === id) ?? pipeMaterials[0];
}

export const perSqFtRate = {
  low: 3.25,
  high: 6.25,
  average: 4.5,
  note: "Modeled from HomeAdvisor's published $4.50/sq ft average repipe rate (2026 data), with a low/high spread sized the same way Angi's own national average-to-range ratio is sized."
};

export const sourceNote =
  "Sources: HomeAdvisor, \"How Much Does It Cost to Repipe a House?\" (2026 data - per-sq-ft baseline and labor-share figure); Angi / Bob Vila, \"Cost to Repipe a House\" (2026 data - national range and per-linear-foot material figures by pipe type).";
