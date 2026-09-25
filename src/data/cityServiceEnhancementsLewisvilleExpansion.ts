import type { PageEnhancement } from "./pageEnhancements";

// Lewisville content-gap fix (Batch 13). Lewisville already has 2 of 10
// services covered directly in pageEnhancements.ts (24-hour-emergency-
// plumber, emergency-drain-cleaning) - facts below extend that existing
// content to the other 8 previously-thin services, with no new statistics
// invented. Facts reused from the existing entries:
// - Housing stock spans the 1970s through today; homes from the late 1970s
//   through mid-1990s frequently have polybutylene supply lines (gray
//   plastic pipe prone to age-related failure, often without warning)
// - Older neighborhoods like Valley Ridge and Vista Ridge versus newer
//   areas like Castle Hills
// - Denton County's expansive clay soil contributes to slab leak risk
// - Moderate water hardness affects fixtures
// - Root intrusion is common in older neighborhoods with mature trees;
//   recurring blockages may need hydro jetting rather than standard snaking

export const lewisvilleExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "lewisville/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in Lewisville",
    decisionIntro:
      "A main sewer line clog in older Lewisville neighborhoods like Valley Ridge and Vista Ridge is often tied to root intrusion from mature trees, sometimes combined with Denton County's expansive clay soil causing line separation, while newer areas like Castle Hills more commonly see construction debris in PVC mains.",
    decisionItems: [
      "Mention whether your home is in an older established neighborhood or a newer area like Castle Hills",
      "Older neighborhoods with mature trees should consider root intrusion first",
      "Newer development homes with a recent backup should consider construction debris",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a Lewisville Plumber Checks First",
    providerItems: [
      "Root intrusion in older neighborhood laterals near mature trees",
      "Clay-soil-related line separation regardless of neighborhood",
      "Construction debris in newer development mains",
      "Camera inspection findings before recommending repair",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "lewisville/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Lewisville",
    decisionIntro:
      "In Lewisville, homes from the polybutylene era (late 1970s through the mid-1990s) may have aging supply fittings connecting to the water heater worth checking alongside the unit itself, and the city's moderate water hardness contributes to mineral scale buildup that shortens tank lifespan across all home ages.",
    decisionItems: [
      "Homes from the polybutylene era should have supply fittings near the water heater checked, not just the unit",
      "Moderate water hardness contributes to scale buildup regardless of home age",
      "Newer homes with tankless units should check for error codes tied to scale buildup",
      "Mention your home's approximate build decade when requesting service",
    ],
    providerTitle: "What a Lewisville Plumber Checks First",
    providerItems: [
      "Polybutylene-era supply fitting condition near the water heater",
      "Mineral scale buildup in tank or tankless units",
      "Tank age and corrosion in older homes",
      "Venting and ignition condition appropriate to the unit type",
    ],
    safetyTitle: "Water Heater Safety",
    safetyItems: [
      "Shut off gas or electric supply if you smell gas or see sparking",
      "Don't attempt to relight a tankless unit's ignition system yourself",
      "Watch for scalding water from a malfunctioning thermostat",
    ],
  },
  "lewisville/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Lewisville",
    decisionIntro:
      "In Lewisville homes from the polybutylene era, supply line and shutoff valve fittings connected to the toilet can fail without much warning, while newer homes in areas like Castle Hills more commonly see fixture-level issues typical of recent construction.",
    decisionItems: [
      "Homes from the late 1970s through mid-1990s should have the toilet's supply line fitting checked for polybutylene material",
      "A sudden shutoff valve failure with little warning is a known polybutylene-era risk",
      "Newer construction homes should rule out installation issues on recently placed fixtures",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What a Lewisville Plumber Checks First",
    providerItems: [
      "Polybutylene supply line and shutoff valve condition in homes from the relevant era",
      "Installation quality on newer fixtures",
      "Whether the issue is isolated to the fixture or a broader line problem",
      "Home build decade to anticipate likely materials",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the blockage is cleared",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "lewisville/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Lewisville",
    decisionIntro:
      "Lewisville homes built from the late 1970s through the mid-1990s frequently have polybutylene supply lines, a gray plastic pipe known for age-related failures that can burst without much warning, while newer homes are more likely to see a PEX fitting failure or clay-soil-related slab stress.",
    decisionItems: [
      "Homes from the polybutylene era should suspect pipe material failure first, even without prior warning signs",
      "Newer homes should suspect a PEX fitting failure or clay-soil-related slab stress",
      "A sudden pressure loss in a suspected polybutylene home should be treated as urgent",
      "Mention your home's approximate build decade when requesting service",
    ],
    providerTitle: "What a Lewisville Plumber Checks First",
    providerItems: [
      "Polybutylene pipe material and failure point identification",
      "Whether a full or partial re-pipe makes more sense than a spot repair",
      "PEX fitting integrity in newer homes",
      "Water shutoff and immediate damage mitigation",
    ],
    safetyTitle: "Burst Pipe Safety",
    safetyItems: [
      "Shut off the main water supply immediately",
      "Turn off electricity to any affected areas near standing water",
      "Document damage with photos before cleanup for insurance claims",
    ],
  },
  "lewisville/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Lewisville Homeowners",
    decisionIntro:
      "Recurring sewer backups in older Lewisville neighborhoods often point to root intrusion from mature trees, sometimes worsened by clay-soil-related line separation, and recurring cases may benefit from hydro jetting rather than standard snaking alone.",
    decisionItems: [
      "Recurring backups in older neighborhoods should consider root intrusion first",
      "A backup that returns quickly after clearing suggests root intrusion needing a different approach",
      "Newer development backups more often relate to construction debris",
      "Ask whether hydro jetting is appropriate for a recurring blockage",
    ],
    providerTitle: "What a Lewisville Plumber Checks First",
    providerItems: [
      "Root intrusion likelihood given mature tree growth in established neighborhoods",
      "Clay-soil-related line separation contributing to the backup",
      "Whether hydro jetting or standard snaking is the better approach",
      "Construction debris in newer development lines",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Avoid using water in the home until the backup is cleared",
      "Stay away from contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "lewisville/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Lewisville",
    decisionIntro:
      "Lewisville's older commercial buildings, some dating to the same era as the city's polybutylene-era housing stock, may share similar aging supply line risks, while newer commercial development in areas like Castle Hills more commonly involves buildings still within contractor warranty.",
    decisionItems: [
      "Older commercial buildings should have supply line material checked given the era's known polybutylene issues",
      "Newer commercial buildouts near Castle Hills may have warranty coverage worth checking",
      "High-traffic retail restrooms see more frequent fixture-level issues from volume alone",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a Lewisville Commercial Plumber Checks First",
    providerItems: [
      "Supply line material and age in older commercial buildings",
      "Contractor warranty status for newer commercial buildouts",
      "Fixture-level wear from high daily traffic volume",
      "Backflow prevention and code compliance appropriate to the building's age",
    ],
    safetyTitle: "Commercial Plumbing Safety",
    safetyItems: [
      "Shut off water to the affected fixture or area to limit damage",
      "Post appropriate signage to keep customers or employees away from hazards",
      "Document the issue for property management or insurance records",
    ],
  },
  "lewisville/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Lewisville Homeowners",
    decisionIntro:
      "Because Lewisville's housing spans decades with a distinct polybutylene-era band from the late 1970s through the mid-1990s, a same-day plumber visit often starts by identifying your home's build decade so the right pipe-material expectations and parts are ready.",
    decisionItems: [
      "Mention your home's approximate build decade, especially if it falls in the late 1970s-mid 1990s range",
      "Note whether you're in an older neighborhood like Valley Ridge or Vista Ridge or a newer area like Castle Hills",
      "Ask about pipe material identification if you're unsure whether your home has polybutylene",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a Lewisville Plumber Confirms Before Arrival",
    providerItems: [
      "Home build decade and likely pipe material",
      "Whether a re-pipe consultation may be worthwhile alongside the immediate repair",
      "Neighborhood and construction era",
      "Severity level to prioritize same-day dispatch appropriately",
    ],
    safetyTitle: "While You Wait",
    safetyItems: [
      "Shut off water to the affected fixture if safe to do so",
      "Keep documentation and photos ready for any insurance claim",
      "Avoid using the affected fixture until the plumber arrives",
    ],
  },
  "lewisville/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Lewisville",
    decisionIntro:
      "In Lewisville, sink and shower drain backups can relate to mineral scale buildup from the city's moderate water hardness narrowing pipes over time, especially in older homes, while newer construction in areas like Castle Hills more often sees grease or leftover construction debris.",
    decisionItems: [
      "Older homes should consider mineral scale buildup as a factor in slow or blocked drains",
      "Homes finished within the last few years should rule out leftover construction debris first",
      "Grease and soap buildup are common causes in both older and newer kitchens",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a Lewisville Plumber Checks First",
    providerItems: [
      "Mineral scale buildup in older home drain lines",
      "Construction debris in drains of recently built or renovated homes",
      "Grease and soap buildup in kitchen lines regardless of home age",
      "Whether the issue is isolated to one fixture or affects multiple drains",
    ],
    safetyTitle: "Drain Backup Safety",
    safetyItems: [
      "Avoid chemical drain cleaners, which can damage aging pipe materials and newer fittings alike",
      "Stop using the affected fixture until the clog is cleared",
      "Watch for water damage under sinks or around shower bases",
    ],
  },
};
