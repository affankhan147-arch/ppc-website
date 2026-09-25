import type { PageEnhancement } from "./pageEnhancements";

// Richardson content-gap fix (Batch 15). Richardson already has 2 of 10
// services covered directly in pageEnhancements.ts (24-hour-emergency-
// plumber, emergency-drain-cleaning) - facts below extend that existing
// content to the other 8 previously-thin services, with no new statistics
// invented. Facts reused from the existing entries:
// - Residential development peaked between the 1960s and 1980s (median home
//   age around 45 years), meaning most homes were originally plumbed with
//   galvanized steel supply lines now well past typical service life;
//   discolored (orange/brown) water signals advanced corrosion
// - The Telecom Corridor area has a notably higher density of apartments
//   and multi-family housing than neighboring cities, where shared drain
//   lines behave differently than a standalone home's plumbing
// - NTMWD municipal water is on the harder side for the region, causing
//   mineral scale buildup that narrows pipes and accelerates fixture wear
// - Clay-soil-related slab leak risk given seasonal foundation movement

export const richardsonExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "richardson/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in Richardson",
    decisionIntro:
      "In Richardson's older single-family neighborhoods, a main sewer line clog often relates to aging cast-iron or clay lines reaching the end of typical service life alongside the city's galvanized-era housing stock, while properties near the Telecom Corridor's denser multi-family developments more often involve a shared line affecting more than one unit.",
    decisionItems: [
      "Mention whether your property is a single-family home or a multi-family unit near the Telecom Corridor",
      "Older single-family homes should consider aging sewer line material as a factor",
      "Multi-family properties should note whether neighboring units are also affected",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a Richardson Plumber Checks First",
    providerItems: [
      "Aging cast-iron or clay sewer line condition in older single-family homes",
      "Shared-line issues common in Telecom Corridor multi-family properties",
      "Mineral scale buildup from NTMWD's harder water narrowing pipe diameter",
      "Camera inspection findings before recommending repair",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "richardson/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Richardson",
    decisionIntro:
      "NTMWD's harder water accelerates mineral scale buildup inside Richardson water heaters, shortening tank lifespan across the city, and this compounds with the fact that much of Richardson's housing stock is now around 45 years old, meaning many original units are already near or past typical service life.",
    decisionItems: [
      "Reduced hot water output often points to mineral scale buildup from NTMWD's harder water",
      "Homes near the median 45-year age should consider the unit's overall age as a factor",
      "Periodic water heater flushing can help extend fixture life given local water hardness",
      "Mention your home's approximate age and water heater history when requesting service",
    ],
    providerTitle: "What a Richardson Plumber Checks First",
    providerItems: [
      "Mineral scale buildup from NTMWD's harder municipal water",
      "Tank age and corrosion given the city's older median home age",
      "Whether periodic flushing has been part of the unit's maintenance history",
      "Venting and ignition condition appropriate to the unit type",
    ],
    safetyTitle: "Water Heater Safety",
    safetyItems: [
      "Shut off gas or electric supply if you smell gas or see sparking",
      "Don't attempt to relight a tankless unit's ignition system yourself",
      "Watch for scalding water from a malfunctioning thermostat",
    ],
  },
  "richardson/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Richardson",
    decisionIntro:
      "In Richardson's older homes with original galvanized supply lines, toilet overflow issues can relate to aging shutoff valves that are slow to respond, while properties near the Telecom Corridor's multi-family developments may see overflow issues tied to shared plumbing systems affecting more than one unit.",
    decisionItems: [
      "Older homes should check shutoff valve condition on original galvanized supply lines",
      "Multi-family Telecom Corridor properties should note whether other units are affected",
      "Discolored water near the toilet supply line can indicate advanced galvanized pipe corrosion",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What a Richardson Plumber Checks First",
    providerItems: [
      "Shutoff valve condition on older galvanized supply lines",
      "Shared-line issues in multi-family Telecom Corridor properties",
      "Signs of galvanized pipe corrosion near the fixture",
      "Whether the issue is isolated to the fixture or a broader line problem",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the blockage is cleared",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "richardson/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Richardson",
    decisionIntro:
      "With a median home age around 45 years, most of Richardson's original galvanized steel supply lines are well past typical service life, and advanced corrosion, sometimes visible first as discolored orange or brown water, is a common precursor to a burst pipe here.",
    decisionItems: [
      "Discolored water in the weeks before a leak is a common warning sign of advanced galvanized corrosion",
      "Homes near the median 45-year age should suspect galvanized pipe failure first",
      "Newer or already re-piped homes should mention any known plumbing updates",
      "Document damage promptly for insurance purposes regardless of pipe age",
    ],
    providerTitle: "What a Richardson Plumber Checks First",
    providerItems: [
      "Galvanized steel pipe corrosion given the city's older median home age",
      "Whether a full or partial re-pipe makes sense given current pipe condition",
      "Prior discoloration or pressure complaints as corrosion indicators",
      "Water shutoff and immediate damage mitigation",
    ],
    safetyTitle: "Burst Pipe Safety",
    safetyItems: [
      "Shut off the main water supply immediately",
      "Turn off electricity to any affected areas near standing water",
      "Document damage with photos before cleanup for insurance claims",
    ],
  },
  "richardson/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Richardson Homeowners",
    decisionIntro:
      "Sewer backups in Richardson's older single-family neighborhoods often relate to aging sewer line material reaching the end of typical service life, while multi-family properties near the Telecom Corridor more commonly involve a shared line affecting several units, and NTMWD's harder water can contribute to mineral scale in either case.",
    decisionItems: [
      "Recurring backups in older single-family homes should consider aging line material first",
      "Multi-family Telecom Corridor properties should note whether other units are affected",
      "Mineral scale buildup from NTMWD's harder water can narrow pipes over time",
      "A camera inspection identifies the exact cause before repairs are proposed",
    ],
    providerTitle: "What a Richardson Plumber Checks First",
    providerItems: [
      "Aging sewer line material in older single-family homes",
      "Shared-line issues in multi-family Telecom Corridor properties",
      "Mineral scale buildup from NTMWD's harder water",
      "Whether descaling or hydro jetting is appropriate for the blockage",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Avoid using water in the home until the backup is cleared",
      "Stay away from contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "richardson/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Richardson",
    decisionIntro:
      "Richardson's Telecom Corridor office district has a denser concentration of commercial buildings than its surrounding residential neighborhoods, meaning fixture wear from high daily traffic and NTMWD's harder water contributing to scale buildup are common factors, alongside aging infrastructure in the city's older commercial buildings.",
    decisionItems: [
      "Telecom Corridor office buildings should have fixtures checked for high-traffic wear",
      "Older commercial buildings should have aging supply and drain lines assessed periodically",
      "NTMWD's harder water can affect commercial water heaters and fixtures over time",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a Richardson Commercial Plumber Checks First",
    providerItems: [
      "Fixture-level wear from high daily traffic in Telecom Corridor office buildings",
      "Aging supply and drain line condition in older commercial buildings",
      "Mineral scale buildup in commercial water heaters and fixtures",
      "Backflow prevention and code compliance appropriate to the building's age",
    ],
    safetyTitle: "Commercial Plumbing Safety",
    safetyItems: [
      "Shut off water to the affected fixture or area to limit damage",
      "Post appropriate signage to keep customers or employees away from hazards",
      "Document the issue for property management or insurance records",
    ],
  },
  "richardson/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Richardson Homeowners",
    decisionIntro:
      "Because Richardson mixes older single-family homes with original galvanized plumbing and denser multi-family properties near the Telecom Corridor, a same-day plumber visit often starts by identifying which type of property you have so the right diagnostic approach is ready.",
    decisionItems: [
      "Mention whether your property is an older single-family home or a multi-family unit near the Telecom Corridor",
      "Note your home's approximate age if known, especially if near the median 45 years",
      "Multi-family property residents should mention if neighbors report similar issues",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a Richardson Plumber Confirms Before Arrival",
    providerItems: [
      "Property type (single-family or multi-family) and approximate age",
      "Whether a re-pipe consultation may be worthwhile alongside the immediate repair",
      "Shared-line considerations for multi-family properties",
      "Severity level to prioritize same-day dispatch appropriately",
    ],
    safetyTitle: "While You Wait",
    safetyItems: [
      "Shut off water to the affected fixture if safe to do so",
      "Keep documentation and photos ready for any insurance claim",
      "Avoid using the affected fixture until the plumber arrives",
    ],
  },
  "richardson/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Richardson",
    decisionIntro:
      "In Richardson, sink and shower drain backups are commonly tied to mineral scale buildup from NTMWD's harder water narrowing pipes over time, especially in older homes, while multi-family properties near the Telecom Corridor may see shared-line issues affecting multiple units.",
    decisionItems: [
      "Older homes should consider mineral scale buildup as a factor in slow or blocked drains",
      "Multi-family properties should note whether neighboring units report similar issues",
      "Grease and soap buildup are common causes across property types",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a Richardson Plumber Checks First",
    providerItems: [
      "Mineral scale buildup in older home drain lines from NTMWD's harder water",
      "Shared-line issues in multi-family Telecom Corridor properties",
      "Grease and soap buildup in kitchen lines regardless of property type",
      "Whether the issue is isolated to one fixture or affects multiple drains",
    ],
    safetyTitle: "Drain Backup Safety",
    safetyItems: [
      "Avoid chemical drain cleaners, which can worsen mineral buildup and damage fittings",
      "Stop using the affected fixture until the clog is cleared",
      "Watch for water damage under sinks or around shower bases",
    ],
  },
};
