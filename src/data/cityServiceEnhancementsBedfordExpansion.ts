import type { PageEnhancement } from "./pageEnhancements";

// Bedford content-gap fix (Batch 20). Bedford already has 2 of 10 services
// covered directly in pageEnhancements.ts (24-hour-emergency-plumber,
// emergency-drain-cleaning) - the literal entries there win over the
// separate bedford/ entries in cityServiceEnhancementsDFWAdditional2.ts
// (same multi-file pattern seen for several recent cities). Facts below
// extend the winning content to the other 8 previously-thin services, with
// no new statistics invented. Facts reused:
// - Municipal water measures around 107 PPM (6.3 grains per gallon)
//   hardness
// - HEB tri-city area position with established 1960s-70s core development
//   alongside 1980s neighborhoods like Mayfair Hills, each with distinct
//   cast-iron and galvanized piping patterns
// - Tree-heavy lot areas are a documented pattern for root intrusion into
//   sewer lines in mature Bedford neighborhoods
// - Cast-iron sewer lines and galvanized water lines, particularly in
//   1980s neighborhoods like Mayfair Hills, are prone to corrosion and
//   root intrusion
// - Blackland Prairie clay soil across the HEB area contributes to slab
//   leak risk

export const bedfordExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "bedford/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in Bedford",
    decisionIntro:
      "A main sewer line clog in Bedford's tree-heavy neighborhoods, particularly 1980s-era areas like Mayfair Hills, often relates to root intrusion into aging cast-iron lines, while the HEB area's expansive Blackland Prairie clay soil can also contribute to line shift regardless of neighborhood.",
    decisionItems: [
      "Mention whether your property is in a tree-heavy neighborhood",
      "Homes in areas like Mayfair Hills should consider root intrusion into cast-iron lines first",
      "Mention your home's construction era, since Bedford spans 1960s-70s core development through newer areas",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a Bedford Plumber Checks First",
    providerItems: [
      "Root intrusion likelihood given Bedford's documented tree-heavy-lot pattern",
      "Cast-iron sewer line condition typical of the 1960s-80s construction eras",
      "Clay-soil-related line shift regardless of neighborhood",
      "Camera inspection findings before recommending repair",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "bedford/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Bedford",
    decisionIntro:
      "Bedford's moderate water hardness, around 107 PPM, contributes to mineral scale buildup that shortens water heater lifespan, and homes from the city's 1960s-70s core development or 1980s neighborhoods like Mayfair Hills may also be dealing with a unit nearing the end of its service life.",
    decisionItems: [
      "Reduced hot water output often points to mineral scale buildup from Bedford's water hardness",
      "Homes from the 1960s-80s construction era should consider the unit's overall age as a factor",
      "Periodic water heater flushing can help limit scale buildup",
      "Mention your home's approximate construction era when requesting service",
    ],
    providerTitle: "What a Bedford Plumber Checks First",
    providerItems: [
      "Mineral scale buildup from the city's moderate water hardness",
      "Tank age and corrosion in homes from the 1960s-80s era",
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
  "bedford/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Bedford",
    decisionIntro:
      "In Bedford's 1960s-70s core homes and 1980s neighborhoods like Mayfair Hills, aging galvanized supply lines and shutoff valves can be slower to respond during a toilet overflow, with discolored water often signaling advanced corrosion before a failure.",
    decisionItems: [
      "Homes from the 1960s-80s era should check galvanized supply line and shutoff valve condition",
      "Discolored water near the toilet supply line can indicate advanced galvanized pipe corrosion",
      "Newer construction homes should rule out installation issues on recently placed fixtures",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What a Bedford Plumber Checks First",
    providerItems: [
      "Shutoff valve condition on 1960s-80s era galvanized supply lines",
      "Signs of galvanized pipe corrosion near the fixture",
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
  "bedford/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Bedford",
    decisionIntro:
      "Bedford's 1960s-70s core homes and 1980s neighborhoods like Mayfair Hills commonly have original galvanized piping prone to corrosion-driven bursts, sometimes preceded by discolored water, while the HEB area's expansive Blackland Prairie clay soil adds slab-stress risk regardless of construction era.",
    decisionItems: [
      "Homes from the 1960s-80s era should suspect galvanized pipe corrosion first",
      "Discolored water in the weeks before a leak is a common warning sign",
      "Clay-soil-related slab stress can compound aging pipe issues",
      "Mention your home's approximate construction era when requesting service",
    ],
    providerTitle: "What a Bedford Plumber Checks First",
    providerItems: [
      "Original galvanized pipe corrosion typical of the 1960s-80s construction eras",
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
  "bedford/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Bedford Homeowners",
    decisionIntro:
      "Sewer backups in Bedford's tree-heavy neighborhoods, particularly 1980s-era areas like Mayfair Hills, are a documented pattern tied to root intrusion into aging cast-iron sewer lines, a common and genuine factor alongside typical age-related material deterioration.",
    decisionItems: [
      "Recurring backups in tree-heavy neighborhoods should consider root intrusion first",
      "Homes from the 1960s-80s era should also consider cast-iron pipe deterioration",
      "A backup that returns quickly after clearing suggests root intrusion needing a different approach",
      "Ask whether hydro jetting is appropriate for a recurring blockage",
    ],
    providerTitle: "What a Bedford Plumber Checks First",
    providerItems: [
      "Root intrusion likelihood given Bedford's documented tree-heavy-lot pattern",
      "Cast-iron sewer line condition typical of the 1960s-80s construction eras",
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
  "bedford/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Bedford",
    decisionIntro:
      "Bedford's older commercial buildings from its 1960s-70s core development period may share the same galvanized and cast-iron patterns as the city's housing stock, while Bedford's moderate water hardness affects commercial fixtures and water heaters across newer buildouts as well.",
    decisionItems: [
      "Older commercial buildings should have aging supply and drain lines assessed periodically",
      "Newer commercial buildouts may have warranty coverage worth checking",
      "Bedford's moderate water hardness can affect commercial water heaters and fixtures regardless of building age",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a Bedford Commercial Plumber Checks First",
    providerItems: [
      "Aging supply and drain line condition in older commercial buildings",
      "Contractor warranty status for newer commercial buildouts",
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
  "bedford/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Bedford Homeowners",
    decisionIntro:
      "Because Bedford spans 1960s-70s core development, 1980s neighborhoods like Mayfair Hills, and newer construction, a same-day plumber visit often starts by identifying your home's construction era and whether it's in a tree-heavy lot area so the right diagnostic approach is ready.",
    decisionItems: [
      "Mention your home's approximate construction era when requesting service",
      "Note whether your property is in a tree-heavy lot area",
      "Ask about pipe material identification if you're unsure of your home's plumbing materials",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a Bedford Plumber Confirms Before Arrival",
    providerItems: [
      "Home construction era and likely plumbing materials",
      "Tree-heavy lot considerations for root intrusion risk",
      "Whether a re-pipe consultation may be worthwhile alongside the immediate repair",
      "Severity level to prioritize same-day dispatch appropriately",
    ],
    safetyTitle: "While You Wait",
    safetyItems: [
      "Shut off water to the affected fixture if safe to do so",
      "Keep documentation and photos ready for any insurance claim",
      "Avoid using the affected fixture until the plumber arrives",
    ],
  },
  "bedford/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Bedford",
    decisionIntro:
      "In Bedford, sink and shower drain backups are commonly tied to mineral scale buildup from the city's moderate water hardness narrowing pipes over time, especially in older homes from the 1960s-80s era, while newer construction more often sees leftover debris.",
    decisionItems: [
      "Homes from the 1960s-80s era should consider mineral scale buildup and aging fixture drain material",
      "Newer construction homes should rule out leftover construction debris first",
      "Grease and soap buildup are common causes across all home eras",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a Bedford Plumber Checks First",
    providerItems: [
      "Mineral scale buildup in older home drain lines",
      "Aging fixture drain material in 1960s-80s era homes",
      "Construction debris in drains of recently built or renovated homes",
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
