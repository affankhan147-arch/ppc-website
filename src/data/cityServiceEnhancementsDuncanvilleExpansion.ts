import type { PageEnhancement } from "./pageEnhancements";

// Duncanville content-gap fix (Batch 32). Duncanville has 2 of 10 services
// covered in cityServiceEnhancementsDFWAdditional5.ts
// (24-hour-emergency-plumber, emergency-drain-cleaning) - confirmed via
// findstr across all src/data/*.ts that this is the only source. Facts
// below extend that content to the other 8 previously-thin services, with
// no new statistics invented. Facts reused:
// - Duncanville's housing stock is predominantly 1970s-80s construction
// - Original copper or galvanized supply lines are now 40-50 years old,
//   a common age range for pinhole leaks and corrosion to begin appearing
// - Expansive clay soil
// - Water hardness averages around 12-15 grains per gallon
// - A full or partial re-pipe may be worth considering given the age of
//   existing lines
// - Older, tree-heavy neighborhoods have original cast iron sewer lines
//   prone to root intrusion
// Differentiated from DeSoto's broader 1970s-1999/general-pinhole framing
// by anchoring Duncanville specifically on its 1970s-80s era, the
// "40-50 years old" age framing, its 12-15 GPG water hardness figure, and
// re-pipe consideration.

export const duncanvilleExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "duncanville/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in Duncanville",
    decisionIntro:
      "A main sewer line clog in Duncanville's older, tree-heavy neighborhoods from the 1970s-80s often relates to root intrusion into original cast iron sewer lines, while the area's expansive clay soil can also contribute to line shift.",
    decisionItems: [
      "Mention if your home is in an older, tree-heavy neighborhood, since root intrusion is a common cause here",
      "Note your home's approximate construction era, given Duncanville's predominantly 1970s-80s housing stock",
      "Ask whether camera inspection is included to distinguish root intrusion from a simple blockage",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a Duncanville Plumber Checks First",
    providerItems: [
      "Root intrusion likelihood given mature tree growth in older neighborhoods",
      "Cast iron sewer line condition typical of 1970s-80s construction",
      "Clay-soil-related line shift given the area's expansive soil",
      "Camera inspection findings before recommending repair",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "duncanville/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Duncanville",
    decisionIntro:
      "Duncanville's water hardness, averaging around 12-15 grains per gallon, contributes to mineral scale buildup in water heaters, and since original copper or galvanized supply lines in the city's predominantly 1970s-80s homes are now 40-50 years old, connection age is a genuine factor too.",
    decisionItems: [
      "Reduced hot water output often points to mineral scale buildup from Duncanville's hard water",
      "Mention your home's approximate construction era, since original 1970s-80s connections are now 40-50 years old",
      "Consider whether a water softener has been part of the home's maintenance history",
      "Describe whether the affected unit is original to the home",
    ],
    providerTitle: "What a Duncanville Plumber Checks First",
    providerItems: [
      "Mineral scale buildup from the area's water hardness (12-15 grains per gallon)",
      "Tank age and connection condition on 40-50-year-old original supply lines",
      "Whether a water softener would help extend fixture and unit life",
      "Venting and ignition condition appropriate to the unit type",
    ],
    safetyTitle: "Water Heater Safety",
    safetyItems: [
      "Shut off gas or electric supply if you smell gas or see sparking",
      "Don't attempt to relight a tankless unit's ignition system yourself",
      "Watch for scalding water from a malfunctioning thermostat",
    ],
  },
  "duncanville/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Duncanville",
    decisionIntro:
      "In Duncanville's predominantly 1970s-80s homes, an original copper or galvanized shutoff valve now 40-50 years old can be slow to respond during a toilet overflow, sometimes preceded by discolored water signaling corrosion.",
    decisionItems: [
      "Mention your home's approximate construction era, since original supply lines are now 40-50 years old",
      "Discolored water near the toilet supply line can indicate advanced galvanized pipe corrosion",
      "Describe whether the failure was a slow drip or a sudden failure, since these can have different causes",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What a Duncanville Plumber Checks First",
    providerItems: [
      "Shutoff valve condition on 40-50-year-old original supply lines",
      "Signs of galvanized pipe corrosion near the fixture",
      "Whether the failure suggests a slow drip or sudden break",
      "Whether the issue is isolated to the fixture or a broader line problem",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the blockage is cleared",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "duncanville/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Duncanville",
    decisionIntro:
      "Duncanville's predominantly 1970s-80s homes have original copper or galvanized supply lines now 40-50 years old, a common age range for pinhole leaks and full corrosion-driven bursts, often preceded by discolored water and compounded by the area's expansive clay soil.",
    decisionItems: [
      "Mention your home's approximate construction era, since original lines are now 40-50 years old",
      "Discolored water in the weeks before a leak is a common corrosion warning sign",
      "Ask whether a full or partial re-pipe may be worth considering given the age of existing lines",
      "Describe whether the failure was a slow drip or a sudden failure",
    ],
    providerTitle: "What a Duncanville Plumber Checks First",
    providerItems: [
      "Pinhole leak risk on 40-50-year-old original copper or galvanized lines",
      "Prior discoloration or pressure complaints as corrosion indicators",
      "Clay-soil-related pipe stress contributing to the failure",
      "Water shutoff and immediate damage mitigation",
    ],
    safetyTitle: "Burst Pipe Safety",
    safetyItems: [
      "Shut off the main water supply immediately",
      "Turn off electricity to any affected areas near standing water",
      "Document damage with photos before cleanup for insurance claims",
    ],
  },
  "duncanville/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Duncanville Homeowners",
    decisionIntro:
      "Sewer backups in Duncanville's older, tree-heavy 1970s-80s neighborhoods are a documented pattern tied to root intrusion into original cast iron sewer lines reaching an age where material deterioration becomes common.",
    decisionItems: [
      "Mention if your home is in an older, tree-heavy neighborhood, since root intrusion is common here",
      "A backup that returns quickly after clearing suggests root intrusion needing a different approach",
      "Ask whether hydro jetting is appropriate for a recurring blockage",
      "Describe whether the backup is a first-time or recurring issue",
    ],
    providerTitle: "What a Duncanville Plumber Checks First",
    providerItems: [
      "Root intrusion likelihood given mature tree growth in older neighborhoods",
      "Cast iron sewer line condition typical of 1970s-80s construction",
      "Whether hydro jetting or standard snaking is the better approach",
      "Whether the blockage pattern suggests a fixture-level or main-line issue",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Avoid using water in the home until the backup is cleared",
      "Stay away from contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "duncanville/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Duncanville",
    decisionIntro:
      "Duncanville's older commercial buildings from the same 1970s-80s construction window as much of the city's housing stock likely have original copper or galvanized plumbing now 40-50 years old, making pinhole leak risk a relevant factor to flag.",
    decisionItems: [
      "Mention the building's approximate construction era when requesting service",
      "Ask whether the provider checks for pinhole leaks specifically in aging copper lines",
      "Older commercial buildings should have aging supply and drain lines assessed periodically",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a Duncanville Commercial Plumber Checks First",
    providerItems: [
      "Original supply line material and pinhole leak risk on 40-50-year-old lines",
      "Aging supply and drain line condition in older commercial buildings",
      "Mineral scale buildup in commercial water heaters and fixtures from the area's hard water",
      "Backflow prevention and code compliance appropriate to the building's age",
    ],
    safetyTitle: "Commercial Plumbing Safety",
    safetyItems: [
      "Shut off water to the affected fixture or area to limit damage",
      "Post appropriate signage to keep customers or employees away from hazards",
      "Document the issue for property management or insurance records",
    ],
  },
  "duncanville/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Duncanville Homeowners",
    decisionIntro:
      "Because Duncanville's housing stock is predominantly 1970s-80s construction with original supply lines now 40-50 years old, a same-day plumber visit often starts by identifying your home's construction era and whether pinhole leak risk is a factor.",
    decisionItems: [
      "Mention your home's approximate construction era when requesting service",
      "Note whether you've noticed discoloration or pressure changes",
      "Describe whether the issue is a slow drip or sudden failure",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a Duncanville Plumber Confirms Before Arrival",
    providerItems: [
      "Home construction era and likely original plumbing materials",
      "Pinhole leak risk on 40-50-year-old supply lines",
      "Whether the issue is a slow drip or sudden failure",
      "Severity level to prioritize same-day dispatch appropriately",
    ],
    safetyTitle: "While You Wait",
    safetyItems: [
      "Shut off water to the affected fixture if safe to do so",
      "Keep documentation and photos ready for any insurance claim",
      "Avoid using the affected fixture until the plumber arrives",
    ],
  },
  "duncanville/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Duncanville",
    decisionIntro:
      "In Duncanville, sink and shower drain backups are commonly tied to mineral scale buildup from the area's hard water (12-15 grains per gallon) narrowing pipes over time, especially in homes with original 1970s-80s fixtures now 40-50 years old.",
    decisionItems: [
      "Consider mineral scale buildup from Duncanville's hard water as a likely factor",
      "Mention your home's approximate construction era, since original fixtures are now 40-50 years old",
      "Grease and soap buildup are common causes across all home eras",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a Duncanville Plumber Checks First",
    providerItems: [
      "Mineral scale buildup from the area's hard water",
      "Aging fixture drain material on 40-50-year-old original plumbing",
      "Whether the blockage pattern suggests recent debris or long-term buildup",
      "Whether the issue is isolated to one fixture or affects multiple drains",
    ],
    safetyTitle: "Drain Backup Safety",
    safetyItems: [
      "Avoid chemical drain cleaners, which can worsen mineral buildup and damage older pipe materials",
      "Stop using the affected fixture until the clog is cleared",
      "Watch for water damage under sinks or around shower bases",
    ],
  },
};
