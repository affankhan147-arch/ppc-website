import type { PageEnhancement } from "./pageEnhancements";

// Keller content-gap fix (Batch 22). Keller already has 2 of 10 services
// covered directly in pageEnhancements.ts (24-hour-emergency-plumber,
// emergency-drain-cleaning) - the literal entries there win over the
// separate keller/ entries in cityServiceEnhancementsDFWAdditional2.ts
// (same multi-file pattern seen for several recent cities, confirmed via
// findstr across all src/data/*.ts before writing). Facts below extend the
// winning content to the other 8 previously-thin services, with no new
// statistics invented. Facts reused:
// - Notably hard water, 15 to 25 grains per gallon
// - A documented outdoor-kitchen and appliance boom that has pushed gas
//   line capacity to its limits in thousands of Keller homes
// - Hidden Lakes, an established 1990s-2010s neighborhood
// - Marshall Ridge, a newer 2008-2020 neighborhood
// - Clay-soil-related slab settling
// Differentiated from other cities by anchoring on Keller's documented gas
// line capacity strain (unique to Keller/Southlake) alongside its notably
// harder water than Bedford's 107 PPM framing.

export const kellerExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "keller/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in Keller",
    decisionIntro:
      "A main sewer line clog in Keller's established Hidden Lakes neighborhood (1990s-2010s) often relates to documented clay-soil-related slab settling affecting line grade, while mineral scale from the city's notably hard water can also narrow line diameter over time regardless of neighborhood.",
    decisionItems: [
      "Mention whether your home is in an established neighborhood like Hidden Lakes or a newer area like Marshall Ridge",
      "Homes in Hidden Lakes should consider clay-soil-related slab settling as a contributing factor",
      "Mineral scale buildup from Keller's notably hard water can narrow line diameter over years",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a Keller Plumber Checks First",
    providerItems: [
      "Clay-soil-related slab settling effects on line grade in established neighborhoods",
      "Mineral scale buildup from Keller's notably hard water (15-25 grains per gallon)",
      "Construction-era-appropriate assessment for Hidden Lakes versus Marshall Ridge homes",
      "Camera inspection findings before recommending repair",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "keller/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Keller",
    decisionIntro:
      "Keller's notably hard water, 15 to 25 grains per gallon, accelerates mineral scale buildup inside water heaters, and homes that have added an outdoor kitchen or pool heater as part of the city's documented appliance boom should also flag whether gas line capacity is a factor.",
    decisionItems: [
      "Reduced hot water output often points to mineral scale buildup from Keller's notably hard water",
      "Homes that recently added an outdoor kitchen or pool heater should mention this, since Keller has documented gas line capacity strain from this trend",
      "Periodic water heater flushing can help limit scale buildup",
      "Mention whether your home is in Hidden Lakes or Marshall Ridge when requesting service",
    ],
    providerTitle: "What a Keller Plumber Checks First",
    providerItems: [
      "Mineral scale buildup from the city's notably hard water",
      "Gas line capacity if a recent outdoor appliance addition may be involved",
      "Tank age and condition appropriate to Hidden Lakes or Marshall Ridge construction eras",
      "Venting and ignition condition appropriate to the unit type",
    ],
    safetyTitle: "Water Heater Safety",
    safetyItems: [
      "Shut off gas or electric supply if you smell gas or see sparking",
      "Don't attempt to relight a tankless unit's ignition system yourself",
      "Watch for scalding water from a malfunctioning thermostat",
    ],
  },
  "keller/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Keller",
    decisionIntro:
      "In Keller, mineral scale from the city's notably hard water can cause a toilet fill valve or shutoff to stick or respond slowly during an overflow, an issue that shows up across both established Hidden Lakes homes and newer Marshall Ridge construction.",
    decisionItems: [
      "Mention whether the shutoff valve felt stuck or slow to close, a common effect of Keller's hard water scale",
      "Homes in Hidden Lakes (1990s-2010s) should also consider fixture age",
      "Newer Marshall Ridge (2008-2020) homes should rule out installation issues on recently placed fixtures",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What a Keller Plumber Checks First",
    providerItems: [
      "Mineral scale effects on shutoff valve and fill valve function",
      "Fixture age appropriate to Hidden Lakes or Marshall Ridge construction eras",
      "Installation quality on newer fixtures",
      "Whether the issue is isolated to the fixture or a broader line problem",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the blockage is cleared",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "keller/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Keller",
    decisionIntro:
      "Homes that have added a gas-fed outdoor kitchen or pool heater as part of Keller's documented appliance boom should treat any nearby pipe failure as potentially connected to gas line capacity strain, while clay-soil-related slab settling remains a separate factor for any home regardless of recent additions.",
    decisionItems: [
      "Homes with a recently added outdoor kitchen or pool heater should mention this immediately",
      "Ask whether the provider checks gas line capacity if a gas-fed appliance addition is nearby",
      "Clay-soil-related slab settling can independently contribute to pipe stress in established neighborhoods like Hidden Lakes",
      "Mention your home's neighborhood when requesting service",
    ],
    providerTitle: "What a Keller Plumber Checks First",
    providerItems: [
      "Gas line capacity if a recent outdoor appliance addition is nearby the failure",
      "Clay-soil-related slab settling effects in established neighborhoods",
      "Mineral scale contribution to pipe stress from the city's notably hard water",
      "Water shutoff and immediate damage mitigation",
    ],
    safetyTitle: "Burst Pipe Safety",
    safetyItems: [
      "Shut off the main water supply immediately",
      "Turn off electricity to any affected areas near standing water",
      "Document damage with photos before cleanup for insurance claims",
    ],
  },
  "keller/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Keller Homeowners",
    decisionIntro:
      "Sewer backups in Keller's established Hidden Lakes neighborhood are a documented pattern tied to clay-soil-related slab settling affecting line grade, while mineral scale buildup from the city's notably hard water is a separate, genuine factor across any Keller neighborhood.",
    decisionItems: [
      "Homes in Hidden Lakes should consider clay-soil-related slab settling first",
      "Any Keller home should also consider mineral scale buildup given the city's notably hard water",
      "A backup that returns quickly after clearing suggests a deeper issue needing a different approach",
      "Ask whether hydro jetting is appropriate for a recurring blockage",
    ],
    providerTitle: "What a Keller Plumber Checks First",
    providerItems: [
      "Clay-soil-related slab settling effects on line grade in established neighborhoods",
      "Mineral scale buildup from the city's notably hard water",
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
  "keller/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Keller",
    decisionIntro:
      "Keller's notably hard water affects commercial water heaters and fixtures just as it does residential ones, and commercial properties with outdoor amenities such as restaurant patios or gas-fed equipment should also consider the city's documented gas line capacity strain.",
    decisionItems: [
      "Mention whether your property has outdoor gas-fed equipment or amenities, given Keller's documented gas line capacity strain",
      "Ask whether the provider addresses mineral scale buildup in commercial water heaters and fixtures",
      "Older commercial buildings should have aging supply and drain lines assessed periodically",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a Keller Commercial Plumber Checks First",
    providerItems: [
      "Gas line capacity for properties with outdoor gas-fed equipment or amenities",
      "Mineral scale buildup in commercial water heaters and fixtures from the city's notably hard water",
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
  "keller/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Keller Homeowners",
    decisionIntro:
      "Because Keller has documented gas line capacity strain from its outdoor-kitchen and appliance boom, plus notably hard water affecting fixtures citywide, a same-day plumber visit often starts by identifying whether a recent gas appliance addition or hard-water scale is involved.",
    decisionItems: [
      "Mention any recently added outdoor kitchen, pool heater, or other gas appliance",
      "Note whether your home is in Hidden Lakes or Marshall Ridge",
      "Ask about gas line capacity assessment if a new appliance addition may be connected",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a Keller Plumber Confirms Before Arrival",
    providerItems: [
      "Recent gas appliance additions and possible capacity strain",
      "Home neighborhood and construction era",
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
  "keller/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Keller",
    decisionIntro:
      "In Keller, sink and shower drain backups are commonly tied to mineral scale buildup from the city's notably hard water narrowing pipes over time, a pattern documented across both established Hidden Lakes homes and newer Marshall Ridge construction.",
    decisionItems: [
      "Mineral scale buildup from Keller's notably hard water is a common factor regardless of home age",
      "Homes in Hidden Lakes should also consider general age-related fixture drain wear",
      "Newer Marshall Ridge homes should rule out leftover construction debris first",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a Keller Plumber Checks First",
    providerItems: [
      "Mineral scale buildup from the city's notably hard water",
      "Aging fixture drain material in Hidden Lakes-era homes",
      "Construction debris in drains of recently built Marshall Ridge homes",
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
