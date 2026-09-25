import type { PageEnhancement } from "./pageEnhancements";

// The Colony content-gap fix (Batch 25). The Colony already has 2 of 10
// services covered directly in pageEnhancements.ts (24-hour-emergency-plumber,
// emergency-drain-cleaning) - the literal entries there win over the
// separate the-colony/ entries in cityServiceEnhancementsDFWAdditional3.ts
// (same multi-file pattern seen for several recent cities, confirmed via
// findstr across all src/data/*.ts before writing). Facts below extend the
// winning content to the other 8 previously-thin services, with no new
// statistics invented. Facts reused:
// - The Colony sits on the southern shore of Lake Lewisville with 23
//   miles of shoreline, spanning older lakeside neighborhoods and newer
//   development on its expanding edges
// - Consistently hard, Denton County-wide water
// - Clay-soil-related slab leak risk common to the broader DFW area
// - Property elevation and grading relative to Lake Lewisville affects
//   drainage and backup severity for lake-adjacent homes, with heavy rain
//   or lake level changes as contributing factors
// Differentiated from other cities by anchoring on The Colony's unique
// lake-proximity/elevation/drainage angle and its older-lakeside-versus-
// newer-subdivision dichotomy.

export const theColonyExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "the-colony/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in The Colony",
    decisionIntro:
      "A main sewer line clog in The Colony's older lakeside neighborhoods often relates to aging line condition, while properties closer to Lake Lewisville's shoreline should also consider elevation and grading relative to the lake as a contributing factor.",
    decisionItems: [
      "Mention whether your home is closer to the lakefront (often older construction) or in a newer subdivision",
      "Note your property's elevation and grading relative to Lake Lewisville if you're lake-adjacent",
      "Ask whether recent heavy rain or high lake levels preceded the clog",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a The Colony Plumber Checks First",
    providerItems: [
      "Older lakeside home line condition versus newer subdivision systems",
      "Property elevation and grading relative to Lake Lewisville for lake-adjacent homes",
      "Whether recent rain or lake level changes may have contributed",
      "Camera inspection findings before recommending repair",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "the-colony/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in The Colony",
    decisionIntro:
      "The Colony's consistently hard, Denton County-wide water contributes to mineral scale buildup in water heaters, and homes in the city's older lakeside neighborhoods should also factor in the unit's overall age compared to newer subdivision construction.",
    decisionItems: [
      "Reduced hot water output often points to mineral scale buildup from The Colony's consistently hard water",
      "Mention whether your home is in an older lakeside area or a newer subdivision",
      "Periodic water heater flushing can help limit scale buildup",
      "Describe whether the affected unit is original to the home",
    ],
    providerTitle: "What a The Colony Plumber Checks First",
    providerItems: [
      "Mineral scale buildup from the area's consistently hard water",
      "Tank age and condition in older lakeside homes versus newer subdivisions",
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
  "the-colony/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in The Colony",
    decisionIntro:
      "In The Colony's older lakeside homes, aging shutoff valves can be slower to respond during a toilet overflow, while mineral scale from the area's consistently hard water can affect fixtures regardless of whether a home is near the lake or in a newer subdivision.",
    decisionItems: [
      "Homes in older lakeside areas should check shutoff valve condition",
      "Mention whether the shutoff valve felt stuck or slow to close, a possible sign of hard-water scale",
      "Newer subdivision homes should rule out installation issues on recently placed fixtures",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What a The Colony Plumber Checks First",
    providerItems: [
      "Shutoff valve condition in older lakeside homes",
      "Mineral scale effects on shutoff valve and fill valve function",
      "Installation quality on newer subdivision fixtures",
      "Whether the issue is isolated to the fixture or a broader line problem",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the blockage is cleared",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "the-colony/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in The Colony",
    decisionIntro:
      "The Colony's older lakeside homes more commonly see aging-pipe-related bursts, while properties near Lake Lewisville's shoreline should also consider whether elevation and grading relative to the lake contributed to water pooling around the failure.",
    decisionItems: [
      "Homes in older lakeside areas should suspect aging pipe condition first",
      "Note your property's elevation and grading relative to Lake Lewisville if you're lake-adjacent",
      "Clay-soil-related slab stress is a relevant factor common to the broader DFW area",
      "Mention whether your home is older lakeside or newer subdivision construction",
    ],
    providerTitle: "What a The Colony Plumber Checks First",
    providerItems: [
      "Aging pipe condition typical of older lakeside homes",
      "Property elevation and grading relative to Lake Lewisville for lake-adjacent homes",
      "Clay-soil-related slab stress contributing to the failure",
      "Water shutoff and immediate damage mitigation",
    ],
    safetyTitle: "Burst Pipe Safety",
    safetyItems: [
      "Shut off the main water supply immediately",
      "Turn off electricity to any affected areas near standing water",
      "Document damage with photos before cleanup for insurance claims",
    ],
  },
  "the-colony/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for The Colony Homeowners",
    decisionIntro:
      "Sewer backups in The Colony's lake-adjacent properties are often connected to elevation and grading relative to Lake Lewisville, particularly after heavy rain or high lake levels, while older lakeside homes should also consider aging line condition as a separate factor.",
    decisionItems: [
      "Mention how close your property is to the lakefront and note recent rain or lake level changes",
      "Homes in older lakeside areas should also consider aging line condition",
      "A backup that returns quickly after clearing suggests a deeper issue needing a different approach",
      "Ask whether the provider checks exterior grading and drainage flow as part of the assessment",
    ],
    providerTitle: "What a The Colony Plumber Checks First",
    providerItems: [
      "Property elevation and grading relative to Lake Lewisville for lake-adjacent homes",
      "Whether recent rain or lake level changes may have contributed",
      "Aging line condition in older lakeside neighborhoods",
      "Whether the blockage pattern suggests a fixture-level or main-line issue",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Avoid using water in the home until the backup is cleared",
      "Stay away from contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "the-colony/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in The Colony",
    decisionIntro:
      "The Colony's commercial properties near Lake Lewisville's shoreline should factor in elevation and drainage grading the same way lake-adjacent homes do, while The Colony's consistently hard water affects commercial water heaters and fixtures regardless of location.",
    decisionItems: [
      "Mention whether your property is near the lakefront and note its elevation relative to the water",
      "Ask whether the provider addresses mineral scale buildup in commercial water heaters and fixtures",
      "Older commercial buildings should have aging supply and drain lines assessed periodically",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a The Colony Commercial Plumber Checks First",
    providerItems: [
      "Property elevation and drainage grading for lake-adjacent commercial properties",
      "Mineral scale buildup in commercial water heaters and fixtures from the area's hard water",
      "Aging supply and drain line condition in older commercial buildings",
      "Backflow prevention and code compliance appropriate to the building's age",
    ],
    safetyTitle: "Commercial Plumbing Safety",
    safetyItems: [
      "Shut off water to the affected fixture or area to limit damage",
      "Post appropriate signage to keep customers or employees away from hazards",
      "Document the issue for property management or insurance records",
    ],
  },
  "the-colony/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for The Colony Homeowners",
    decisionIntro:
      "Because The Colony spans older lakeside neighborhoods and newer subdivisions on its expanding edges, a same-day plumber visit often starts by identifying whether your home is lake-adjacent and its construction era so the right diagnostic approach is ready.",
    decisionItems: [
      "Mention whether your home is closer to the lakefront or in a newer subdivision",
      "Note your property's elevation relative to Lake Lewisville if lake-adjacent",
      "Ask about mineral scale considerations given the area's consistently hard water",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a The Colony Plumber Confirms Before Arrival",
    providerItems: [
      "Whether the home is older lakeside or newer subdivision construction",
      "Property elevation and grading relative to Lake Lewisville, if relevant",
      "Hard-water scale considerations for the affected fixture",
      "Severity level to prioritize same-day dispatch appropriately",
    ],
    safetyTitle: "While You Wait",
    safetyItems: [
      "Shut off water to the affected fixture if safe to do so",
      "Keep documentation and photos ready for any insurance claim",
      "Avoid using the affected fixture until the plumber arrives",
    ],
  },
  "the-colony/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in The Colony",
    decisionIntro:
      "In The Colony, sink and shower drain backups are commonly tied to mineral scale buildup from the area's consistently hard water, while older lakeside homes should also consider aging fixture drain material compared to newer subdivision construction.",
    decisionItems: [
      "Mineral scale buildup from The Colony's consistently hard water is a common factor regardless of home age",
      "Homes in older lakeside areas should also consider aging fixture drain material",
      "Newer subdivision homes should rule out leftover construction debris first",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a The Colony Plumber Checks First",
    providerItems: [
      "Mineral scale buildup from the area's consistently hard water",
      "Aging fixture drain material in older lakeside homes",
      "Construction debris in drains of recently built subdivision homes",
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
