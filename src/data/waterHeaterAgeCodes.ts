// Real, sourced serial-number date-code rules for water heater age lookup.
// Scope is deliberately limited to the two numeric-digit brand families that
// independent published sources agree on precisely (no letter-cipher tables,
// which sources disagree on in detail) - do not add a brand here without a
// checked source for its exact digit positions.
// Sources: Water Heater Hub, "Water Heater Age Lookup" (waterheaterhub.com/water-heater-age-lookup/)
// and Fast Water Heater Co., "Find Your Water Tank Age Based on the Brand"
// (fastwaterheater.com/blog/find-your-water-tank-age-based-on-the-brand/).

export type BrandFamilyId = "rheem-family" | "smith-family";

export type BrandFamily = {
  id: BrandFamilyId;
  label: string;
  brands: string[];
  format: "month-year" | "year-week";
  example: string;
  note: string;
};

export const brandFamilies: BrandFamily[] = [
  {
    id: "rheem-family",
    label: "Rheem, Ruud, Richmond, or GE",
    brands: ["Rheem", "Ruud", "Richmond", "GE (Rheem-made)"],
    format: "month-year",
    example: "Serial starting 0724... = manufactured July 2024",
    note:
      "On most Rheem-family units, the first 2 digits of the serial number are the month (01-12) and the next 2 digits are the year. Strip any letter prefix first (e.g. \"RH\", \"RN\") - only the digits that follow are the date code."
  },
  {
    id: "smith-family",
    label: "A.O. Smith, State, American, Reliance, or Whirlpool",
    brands: ["A.O. Smith", "State Industries", "American Water Heater", "Reliance", "Whirlpool (Smith-made)"],
    format: "year-week",
    example: "Serial starting 2410... = week 10 of 2024",
    note:
      "On most units from A.O. Smith and the brands it manufactures (State, American, Reliance, and modern Whirlpool-branded units), the first 2 digits of the serial number are the year and the next 2 digits are the week of that year (01-53)."
  }
];

export function getBrandFamily(id: BrandFamilyId): BrandFamily {
  return brandFamilies.find((f) => f.id === id) ?? brandFamilies[0];
}

// Two-digit year is ambiguous (could be 19xx or 20xx). Both source articles
// note this and say to read it in context. We resolve it the same way: a
// two-digit value at or below the current two-digit year is treated as
// 2000s, anything higher as 1900s - correct for any unit sold since serial
// date-coding became standard (this format has been used since at least the
// 1980s-90s per both sources) and always safely on the "too old to matter"
// side of the repair-vs-replace decision for the rare true edge case.
export function resolveFourDigitYear(twoDigitYear: number, currentYear: number): number {
  const currentTwoDigit = currentYear % 100;
  const century = twoDigitYear <= currentTwoDigit ? 2000 : 1900;
  return century + twoDigitYear;
}

// Brands intentionally NOT auto-decoded here: their published date-code
// rules use letter ciphers (e.g. Bradford White's two-letter year+month
// code) where independent sources checked this session disagree on the
// exact letter-to-year mapping. Rather than risk telling a homeowner the
// wrong age, these are pointed to their own manufacturer lookup instead.
export const manualLookupBrands = [
  { brand: "Bradford White", url: "https://www.bradfordwhite.com/resources/how-old-is-my-water-heater" },
  { brand: "Rinnai (tankless)", url: "https://www.rinnai.us/support" },
  { brand: "Navien (tankless)", url: "https://www.navieninc.com/support" },
  { brand: "Noritz (tankless)", url: "https://www.noritz.com/support" },
  { brand: "Bosch (tankless)", url: "https://www.bosch-thermotechnology.com/us/en/homeowner/support/" }
];
