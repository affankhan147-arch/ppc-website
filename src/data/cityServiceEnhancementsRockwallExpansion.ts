import type { PageEnhancement } from "./pageEnhancements";

// Rockwall content-gap fix (Batch 27). Rockwall already has 2 of 10
// services covered directly in pageEnhancements.ts (24-hour-emergency-plumber,
// emergency-drain-cleaning) - the literal entries there win over the
// separate rockwall/ entries in cityServiceEnhancementsDFWAdditional3.ts
// (same multi-file pattern seen for several recent cities, confirmed via
// findstr across all src/data/*.ts before writing). Facts below extend the
// winning content to the other 8 previously-thin services, with no new
// statistics invented. Facts reused:
// - Rockwall County is one of the fastest-growing counties in Texas
// - Newer master-planned communities near Lake Ray Hubbard bring modern
//   PEX plumbing, distinct from established neighborhoods closer to
//   central Rockwall
// - Builder warranty coverage is relevant for newer master-planned
//   community construction
// - Clay-soil-related slab leak risk common to the broader DFW area
// Differentiated from The Colony's Lake Lewisville elevation/drainage
// angle by anchoring on Rockwall's PEX-modern-construction-versus-
// established-central-Rockwall dichotomy and builder warranty context.

export const rockwallExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "rockwall/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in Rockwall",
    decisionIntro:
      "A main sewer line clog in established central Rockwall neighborhoods often relates to older line material and age, while newer master-planned communities near Lake Ray Hubbard with modern PEX plumbing more often point to an installation issue if a clog occurs.",
    decisionItems: [
      "Mention whether your home is in a newer master-planned community or an established central Rockwall neighborhood",
      "Established central Rockwall homes should consider older line material and age first",
      "Newer community homeowners should confirm builder warranty coverage before assuming standard repair applies",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a Rockwall Plumber Checks First",
    providerItems: [
      "Older line material and condition in established central Rockwall neighborhoods",
      "Modern PEX plumbing installation quality in newer master-planned communities",
      "Clay-soil-related line shift common to the broader DFW area",
      "Camera inspection findings before recommending repair",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "rockwall/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Rockwall",
    decisionIntro:
      "In Rockwall's newer master-planned communities near Lake Ray Hubbard, a water heater issue may fall under builder warranty coverage worth checking first, while established central Rockwall homes should factor in the unit's overall age given typical service life.",
    decisionItems: [
      "Newer community homeowners should confirm builder warranty coverage before assuming standard repair applies",
      "Established central Rockwall homes should mention the unit's approximate age",
      "Ask whether the provider is familiar with newer subdivision installation standards if in a new community",
      "Describe whether the affected unit is original to the home",
    ],
    providerTitle: "What a Rockwall Plumber Checks First",
    providerItems: [
      "Builder warranty status for units in newer master-planned communities",
      "Tank age and condition in established central Rockwall homes",
      "Whether the issue suggests a new-construction installation defect",
      "Venting and ignition condition appropriate to the unit type",
    ],
    safetyTitle: "Water Heater Safety",
    safetyItems: [
      "Shut off gas or electric supply if you smell gas or see sparking",
      "Don't attempt to relight a tankless unit's ignition system yourself",
      "Watch for scalding water from a malfunctioning thermostat",
    ],
  },
  "rockwall/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Rockwall",
    decisionIntro:
      "In Rockwall's newer master-planned communities, a toilet overflow may point to an installation defect worth flagging to the builder, while established central Rockwall homes are more likely dealing with an aging shutoff valve that's slower to respond.",
    decisionItems: [
      "Newer community homeowners should note if this could be an installation defect",
      "Established central Rockwall homes should check shutoff valve condition and age",
      "Ask whether builder warranty applies before assuming standard repair costs",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What a Rockwall Plumber Checks First",
    providerItems: [
      "Whether the issue suggests a new-construction installation defect in newer communities",
      "Shutoff valve age and condition in established central Rockwall homes",
      "Builder warranty status if applicable",
      "Whether the issue is isolated to the fixture or a broader line problem",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the blockage is cleared",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "rockwall/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Rockwall",
    decisionIntro:
      "A burst pipe in one of Rockwall's newer master-planned communities near Lake Ray Hubbard may point to a PEX installation issue worth flagging to the builder, while established central Rockwall homes should also consider the area's clay-soil-related slab stress.",
    decisionItems: [
      "Newer community homeowners should note if this could be a PEX installation issue and check builder warranty",
      "Established central Rockwall homes should mention their home's approximate age",
      "Clay-soil-related slab stress is a relevant factor common to the broader DFW area",
      "Mention whether your home is a newer community or established central Rockwall construction",
    ],
    providerTitle: "What a Rockwall Plumber Checks First",
    providerItems: [
      "PEX plumbing installation quality in newer master-planned communities",
      "Aging pipe condition in established central Rockwall homes",
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
  "rockwall/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Rockwall Homeowners",
    decisionIntro:
      "Sewer backups in Rockwall's established central neighborhoods often relate to older line age and condition, while newer master-planned communities near Lake Ray Hubbard should first confirm whether builder warranty covers an installation-related issue.",
    decisionItems: [
      "Established central Rockwall homes should consider older line age and condition first",
      "Newer community homeowners should confirm builder warranty coverage",
      "A backup that returns quickly after clearing suggests a deeper issue needing a different approach",
      "Ask whether hydro jetting is appropriate for a recurring blockage",
    ],
    providerTitle: "What a Rockwall Plumber Checks First",
    providerItems: [
      "Older line age and condition in established central Rockwall neighborhoods",
      "Whether the issue suggests a new-construction installation defect",
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
  "rockwall/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Rockwall",
    decisionIntro:
      "Rockwall's rapid growth has produced new commercial buildouts near Lake Ray Hubbard alongside older established commercial buildings closer to central Rockwall, each needing a genuinely different assessment approach.",
    decisionItems: [
      "Mention whether your property is a newer buildout or an established central Rockwall commercial building",
      "Newer buildouts should confirm contractor or builder warranty coverage",
      "Older commercial buildings should have aging supply and drain lines assessed periodically",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a Rockwall Commercial Plumber Checks First",
    providerItems: [
      "Contractor warranty status for newer commercial buildouts",
      "Aging supply and drain line condition in older commercial buildings",
      "Whether the issue suggests a new-construction installation defect",
      "Backflow prevention and code compliance appropriate to the building's age",
    ],
    safetyTitle: "Commercial Plumbing Safety",
    safetyItems: [
      "Shut off water to the affected fixture or area to limit damage",
      "Post appropriate signage to keep customers or employees away from hazards",
      "Document the issue for property management or insurance records",
    ],
  },
  "rockwall/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Rockwall Homeowners",
    decisionIntro:
      "Because Rockwall spans newer master-planned communities near Lake Ray Hubbard and established central Rockwall neighborhoods, a same-day plumber visit often starts by identifying which part of the county your home is in so the right diagnostic approach is ready.",
    decisionItems: [
      "Mention whether your home is in a newer master-planned community or established central Rockwall",
      "Newer community homeowners should have builder warranty information ready if available",
      "Established homes should note the property's approximate age",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a Rockwall Plumber Confirms Before Arrival",
    providerItems: [
      "Neighborhood and whether newer master-planned or established construction",
      "Builder warranty status for newer community homes",
      "Home age for established central Rockwall properties",
      "Severity level to prioritize same-day dispatch appropriately",
    ],
    safetyTitle: "While You Wait",
    safetyItems: [
      "Shut off water to the affected fixture if safe to do so",
      "Keep documentation and photos ready for any insurance claim",
      "Avoid using the affected fixture until the plumber arrives",
    ],
  },
  "rockwall/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Rockwall",
    decisionIntro:
      "In Rockwall's established central neighborhoods, sink and shower drain backups often relate to older fixture drain material, while newer master-planned communities near Lake Ray Hubbard more commonly see leftover construction debris as the driving factor.",
    decisionItems: [
      "Established central Rockwall homes should consider older fixture drain material",
      "Newer community homes should rule out leftover construction debris first",
      "Grease and soap buildup are common causes across all home eras",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a Rockwall Plumber Checks First",
    providerItems: [
      "Aging fixture drain material in established central Rockwall homes",
      "Construction debris in drains of newer master-planned community homes",
      "Whether builder warranty applies for a newer-home installation issue",
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
