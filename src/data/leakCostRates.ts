// Real published residential rates used by the DFW Leak Cost Calculator.
// Every figure below is copied from the city's own published rate schedule.

export type RateTier = { upToGallons: number | null; perThousand: number };

export type CityRates = {
  slug: string;
  name: string;
  effectiveLabel: string;
  waterTiers: RateTier[];
  sewerPerThousand: number;
  sewerRule: string;
  winterMonths: string;
  sourceLabel: string;
  sourceUrl: string;
};

const GALLONS_PER_CCF = 748;
const perCcfToPerThousand = (perCcf: number) => Math.round((perCcf / GALLONS_PER_CCF) * 1000 * 100) / 100;

export const leakCostCities: CityRates[] = [
  {
    slug: "dallas",
    name: "Dallas",
    effectiveLabel: "FY26 rates (effective October 1, 2025)",
    waterTiers: [
      { upToGallons: 4000, perThousand: 2.17 },
      { upToGallons: 10000, perThousand: 4.81 },
      { upToGallons: 20000, perThousand: 7.98 },
      { upToGallons: 30000, perThousand: 11.4 },
      { upToGallons: null, perThousand: 13.2 }
    ],
    sewerPerThousand: 6.19,
    sewerRule:
      "Dallas bills residential sewer on the average of water billed in December, January, February, and March (40,000 gallons maximum) or the actual month's water use, whichever is less.",
    winterMonths: "December through March",
    sourceLabel: "Dallas Water Utilities FY26 Monthly Rate Sheet",
    sourceUrl: "https://dallascityhall.com/departments/waterutilities/dch%20documents/monthly_rate_sheet.pdf"
  },
  {
    slug: "fort-worth",
    name: "Fort Worth",
    effectiveLabel: "Rates approved August 25, 2026, effective January 1, 2027",
    waterTiers: [
      { upToGallons: 6 * GALLONS_PER_CCF, perThousand: perCcfToPerThousand(2.28) },
      { upToGallons: 12 * GALLONS_PER_CCF, perThousand: perCcfToPerThousand(3.19) },
      { upToGallons: 24 * GALLONS_PER_CCF, perThousand: perCcfToPerThousand(4.35) },
      { upToGallons: null, perThousand: perCcfToPerThousand(5.6) }
    ],
    sewerPerThousand: perCcfToPerThousand(4.33),
    sewerRule:
      "Fort Worth averages household water use in December, January, and February to set the monthly wastewater volume on your account, starting with the April bill and applying through the following year.",
    winterMonths: "December through February",
    sourceLabel: "City of Fort Worth Water and Wastewater Rates",
    sourceUrl: "https://www.fortworthtexas.gov/departments/water/rates"
  }
];

export type LeakPreset = { id: string; label: string; gallonsPerDay: number; source: string };

// EPA WaterSense figures, converted from their published yearly/weekly totals to gallons per day.
export const leakPresets: LeakPreset[] = [
  { id: "shower", label: "Showerhead dripping 10 drips per minute", gallonsPerDay: 1.4, source: "EPA: more than 500 gallons per year" },
  { id: "faucet", label: "Faucet dripping once per second", gallonsPerDay: 8.2, source: "EPA: more than 3,000 gallons per year" },
  { id: "average", label: "Typical household leaks (EPA average)", gallonsPerDay: 25.5, source: "EPA: more than 9,300 gallons per year per household" },
  { id: "serious", label: "Serious leak (50 gallons a day)", gallonsPerDay: 50, source: "EPA: 9% of homes have leaks wasting 50+ gallons per day" }
];

export function waterCharge(city: CityRates, gallons: number): number {
  let remaining = gallons;
  let prevCap = 0;
  let total = 0;
  for (const tier of city.waterTiers) {
    const cap = tier.upToGallons ?? Infinity;
    const inTier = Math.max(0, Math.min(remaining, cap - prevCap));
    total += (inTier / 1000) * tier.perThousand;
    remaining -= inTier;
    prevCap = cap;
    if (remaining <= 0) break;
  }
  return total;
}
