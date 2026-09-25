import type { PageEnhancement } from "./pageEnhancements";

// Allen content-gap fix (Batch 26). Allen already has 2 of 10 services
// covered directly in pageEnhancements.ts (24-hour-emergency-plumber,
// emergency-drain-cleaning) - the literal entries there win over the
// separate allen/ entries in cityServiceEnhancementsDFWAdditional3.ts
// (same multi-file pattern seen for several recent cities, confirmed via
// findstr across all src/data/*.ts before writing). Facts below extend the
// winning content to the other 8 previously-thin services, with no new
// statistics invented. Facts reused:
// - Allen has a documented split between older homes with original
//   galvanized plumbing and larger newer construction with documented
//   higher hot water demand, commonly requesting tankless water heater
//   capacity
// - Local building codes and permit requirements relevant to older-home
//   repairs
// - Clay-soil-related slab leak risk common to the broader DFW area
// - Non-invasive leak detection methods for locating hidden pipe issues
// Differentiated from other cities by anchoring on Allen's unique
// galvanized-older-home-versus-tankless-newer-home dichotomy.

export const allenExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "allen/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in Allen",
    decisionIntro:
      "A main sewer line clog in Allen's older homes often relates to original drain line material and condition, while the city's clay-soil-related slab settling, common to the broader DFW area, can also contribute to line shift regardless of construction era.",
    decisionItems: [
      "Mention your home's approximate construction era, since Allen has a genuine split between older and newer construction",
      "Older homes should consider original drain line material and condition first",
      "Clay-soil-related line shift is a relevant factor for any Allen property",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What an Allen Plumber Checks First",
    providerItems: [
      "Original drain line material and condition in older Allen neighborhoods",
      "Clay-soil-related line shift common to the broader DFW area",
      "Whether current permits and local building code requirements apply",
      "Camera inspection findings before recommending repair",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "allen/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Allen",
    decisionIntro:
      "Allen's larger, newer homes have documented higher hot water demand than older construction, making tankless water heater capacity a genuinely relevant factor if you're experiencing shortages, while older homes should also consider original tank age and galvanized connection condition.",
    decisionItems: [
      "Larger, newer homes experiencing hot water shortages should ask whether tankless capacity has been assessed",
      "Older homes should mention their construction era, since original tank age matters",
      "Ask whether the provider is familiar with sizing tankless units to actual household demand",
      "Describe whether the affected unit is original to the home",
    ],
    providerTitle: "What an Allen Plumber Checks First",
    providerItems: [
      "Tankless water heater capacity and sizing for larger, newer construction",
      "Original tank age and galvanized connection condition in older homes",
      "Whether current household demand matches existing unit capacity",
      "Venting and ignition condition appropriate to the unit type",
    ],
    safetyTitle: "Water Heater Safety",
    safetyItems: [
      "Shut off gas or electric supply if you smell gas or see sparking",
      "Don't attempt to relight a tankless unit's ignition system yourself",
      "Watch for scalding water from a malfunctioning thermostat",
    ],
  },
  "allen/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Allen",
    decisionIntro:
      "In Allen's older homes, a galvanized shutoff valve can be slow to respond during a toilet overflow, sometimes preceded by discolored water signaling corrosion, while larger newer homes are more likely dealing with an installation issue on a recently placed fixture.",
    decisionItems: [
      "Older homes should check galvanized shutoff valve condition",
      "Discolored water near the toilet supply line can indicate advanced galvanized pipe corrosion",
      "Newer construction homes should rule out installation issues on recently placed fixtures",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What an Allen Plumber Checks First",
    providerItems: [
      "Galvanized shutoff valve condition in older homes",
      "Signs of galvanized pipe corrosion near the fixture",
      "Installation quality on newer construction fixtures",
      "Whether the issue is isolated to the fixture or a broader line problem",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the blockage is cleared",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "allen/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Allen",
    decisionIntro:
      "Allen's older homes with original galvanized plumbing are prone to corrosion-driven bursts, often preceded by discolored water, while the city's clay-soil-related slab stress, common to the broader DFW area, can compound aging pipe issues regardless of construction era.",
    decisionItems: [
      "Older homes should suspect galvanized pipe corrosion first",
      "Discolored water in the weeks before a leak is a common warning sign",
      "Clay-soil-related slab stress is a relevant factor for any Allen property",
      "Mention your home's approximate construction era when requesting service",
    ],
    providerTitle: "What an Allen Plumber Checks First",
    providerItems: [
      "Original galvanized pipe corrosion in older Allen homes",
      "Prior discoloration or pressure complaints as corrosion indicators",
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
  "allen/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Allen Homeowners",
    decisionIntro:
      "Sewer backups in Allen's older homes often relate to original drain line material deterioration, and non-invasive leak detection methods can help confirm hidden pipe issues behind walls or under slabs before any invasive work begins.",
    decisionItems: [
      "Older homes should consider original drain line material deterioration first",
      "Ask whether non-invasive leak detection is available if a hidden issue is suspected",
      "A backup that returns quickly after clearing suggests a deeper issue needing a different approach",
      "Ask whether hydro jetting is appropriate for a recurring blockage",
    ],
    providerTitle: "What an Allen Plumber Checks First",
    providerItems: [
      "Original drain line material and condition in older Allen neighborhoods",
      "Non-invasive leak detection methods for hidden pipe issues",
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
  "allen/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Allen",
    decisionIntro:
      "Allen's older commercial buildings may share the same galvanized-era plumbing patterns as the city's older homes, while newer commercial buildouts should confirm current permits and local building code requirements apply to any needed repair.",
    decisionItems: [
      "Older commercial buildings should have aging supply and drain lines assessed periodically",
      "Newer commercial buildouts may have warranty coverage worth checking",
      "Ask whether the provider is familiar with Allen's local building codes and permit requirements",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What an Allen Commercial Plumber Checks First",
    providerItems: [
      "Aging supply and drain line condition in older commercial buildings",
      "Contractor warranty status for newer commercial buildouts",
      "Current permits and local building code requirements",
      "Backflow prevention and code compliance appropriate to the building's age",
    ],
    safetyTitle: "Commercial Plumbing Safety",
    safetyItems: [
      "Shut off water to the affected fixture or area to limit damage",
      "Post appropriate signage to keep customers or employees away from hazards",
      "Document the issue for property management or insurance records",
    ],
  },
  "allen/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Allen Homeowners",
    decisionIntro:
      "Because Allen has a genuine split between older homes with original galvanized plumbing and larger newer construction with higher hot water demand, a same-day plumber visit often starts by identifying your home's construction era so the right diagnostic approach is ready.",
    decisionItems: [
      "Mention your home's approximate construction era when requesting service",
      "Larger newer homes should flag any hot water demand or tankless capacity concerns",
      "Older homes should note if original galvanized plumbing is suspected",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What an Allen Plumber Confirms Before Arrival",
    providerItems: [
      "Home construction era and likely plumbing materials",
      "Tankless water heater sizing needs for newer, larger homes",
      "Whether current permits or local building codes apply to older-home repairs",
      "Severity level to prioritize same-day dispatch appropriately",
    ],
    safetyTitle: "While You Wait",
    safetyItems: [
      "Shut off water to the affected fixture if safe to do so",
      "Keep documentation and photos ready for any insurance claim",
      "Avoid using the affected fixture until the plumber arrives",
    ],
  },
  "allen/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Allen",
    decisionIntro:
      "In Allen's older homes, sink and shower drain backups often relate to aging fixture drain material and original construction-era piping, while newer, larger homes more commonly see leftover construction debris as the driving factor.",
    decisionItems: [
      "Older homes should consider aging fixture drain material and original piping",
      "Newer construction homes should rule out leftover construction debris first",
      "Grease and soap buildup are common causes across all home eras",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What an Allen Plumber Checks First",
    providerItems: [
      "Aging fixture drain material in older Allen homes",
      "Original construction-era piping condition",
      "Construction debris in drains of recently built or renovated homes",
      "Whether the issue is isolated to one fixture or affects multiple drains",
    ],
    safetyTitle: "Drain Backup Safety",
    safetyItems: [
      "Avoid chemical drain cleaners, which can worsen buildup and damage older pipe materials",
      "Stop using the affected fixture until the clog is cleared",
      "Watch for water damage under sinks or around shower bases",
    ],
  },
};
