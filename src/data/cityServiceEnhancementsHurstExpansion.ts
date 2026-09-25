import type { PageEnhancement } from "./pageEnhancements";

// Hurst content-gap fix (Batch 21). Hurst already has 2 of 10 services
// covered directly in pageEnhancements.ts (24-hour-emergency-plumber,
// emergency-drain-cleaning) - the literal entries there win over the
// separate hurst/ entries in cityServiceEnhancementsDFWAdditional2.ts
// (same multi-file pattern seen for several recent cities, confirmed via
// findstr across all src/data/*.ts before writing). Facts below extend the
// winning content to the other 8 previously-thin services, with no new
// statistics invented. Facts reused:
// - 1960s-70s original Hurst development with galvanized supply lines and
//   cast iron drain stacks
// - A distinct 1980s-90s construction boom that specifically introduced
//   polybutylene supply lines
// - A commercial corridor along Pipeline Road and Precinct Line Road with
//   documented higher drain volume and grease-trap-related buildup
// - HEB-area expansive clay soil contributing to slab leak risk
// Differentiated from Bedford's batch (root intrusion / Mayfair Hills /
// 107 PPM hardness framing) by anchoring on Hurst's distinct 1980s-90s
// polybutylene risk window and its named commercial corridor.

export const hurstExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "hurst/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in Hurst",
    decisionIntro:
      "A main sewer line clog in Hurst often traces back to the original 1960s-70s cast iron drain stacks, while properties along the Pipeline Road or Precinct Line Road commercial corridor should also consider higher drain volume as a contributing factor.",
    decisionItems: [
      "Mention whether your property is residential or part of the Pipeline Road or Precinct Line Road commercial corridor",
      "Homes from the 1960s-70s original development should consider cast iron drain stack condition first",
      "Commercial properties should ask whether grease trap buildup could be a contributing factor",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a Hurst Plumber Checks First",
    providerItems: [
      "Cast iron drain stack condition typical of the 1960s-70s original development",
      "Grease trap and higher-volume wear patterns for commercial-corridor properties",
      "Clay-soil-related line shift given the HEB area's expansive soil",
      "Camera inspection findings before recommending repair",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home or building until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "hurst/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Hurst",
    decisionIntro:
      "Hurst homes from the 1980s-90s construction boom era should factor in overall plumbing system age alongside the water heater itself, since that same window introduced polybutylene supply lines that can complicate a water heater emergency if the supply line is also affected.",
    decisionItems: [
      "Homes from the 1980s-90s construction boom should mention this era, since supply line material matters here",
      "Homes from the 1960s-70s original development should consider tank age and galvanized connections",
      "A sudden loss of hot water alongside a supply line issue should be treated as connected, not separate problems",
      "Mention your home's approximate construction era when requesting service",
    ],
    providerTitle: "What a Hurst Plumber Checks First",
    providerItems: [
      "Tank age and condition relative to the home's construction era",
      "Polybutylene supply line presence for homes from the 1980s-90s boom",
      "Galvanized connection condition for 1960s-70s original development homes",
      "Venting and ignition condition appropriate to the unit type",
    ],
    safetyTitle: "Water Heater Safety",
    safetyItems: [
      "Shut off gas or electric supply if you smell gas or see sparking",
      "Don't attempt to relight a tankless unit's ignition system yourself",
      "Watch for scalding water from a malfunctioning thermostat",
    ],
  },
  "hurst/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Hurst",
    decisionIntro:
      "In Hurst homes from the 1980s-90s construction boom, a polybutylene supply line can fail suddenly at the toilet shutoff without warning, while 1960s-70s original development homes are more likely dealing with a galvanized shutoff valve that's slow to respond.",
    decisionItems: [
      "Homes from the 1980s-90s boom era should suspect polybutylene supply line failure at the shutoff",
      "Homes from the 1960s-70s original development should check galvanized shutoff valve condition",
      "A shutoff valve that won't close fully during an overflow needs immediate attention",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What a Hurst Plumber Checks First",
    providerItems: [
      "Polybutylene supply line condition for homes from the 1980s-90s construction boom",
      "Galvanized shutoff valve condition for 1960s-70s original development homes",
      "Whether the issue is isolated to the fixture or a broader line problem",
      "Immediate shutoff valve replacement needs",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the blockage is cleared",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "hurst/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Hurst",
    decisionIntro:
      "Hurst's 1980s-90s construction boom specifically introduced polybutylene supply lines, which can burst suddenly without warning, while the city's 1960s-70s original development homes more commonly see galvanized pipe corrosion as the cause, often preceded by discolored water.",
    decisionItems: [
      "Homes from the 1980s-90s boom era should suspect polybutylene supply line failure first",
      "Homes from the 1960s-70s original development should suspect galvanized pipe corrosion",
      "Discolored water in the weeks before a leak is a common corrosion warning sign",
      "Mention your home's approximate construction era when requesting service",
    ],
    providerTitle: "What a Hurst Plumber Checks First",
    providerItems: [
      "Polybutylene supply line condition for homes from the 1980s-90s construction boom",
      "Galvanized pipe corrosion typical of the 1960s-70s original development",
      "Clay-soil-related slab stress given the HEB area's expansive soil",
      "Water shutoff and immediate damage mitigation",
    ],
    safetyTitle: "Burst Pipe Safety",
    safetyItems: [
      "Shut off the main water supply immediately",
      "Turn off electricity to any affected areas near standing water",
      "Document damage with photos before cleanup for insurance claims",
    ],
  },
  "hurst/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Hurst Homeowners",
    decisionIntro:
      "Sewer backups in Hurst's 1960s-70s original development homes often relate to aging cast iron drain stack deterioration, while properties along the Pipeline Road or Precinct Line Road commercial corridor should also consider higher drain volume and grease-related buildup.",
    decisionItems: [
      "Homes from the 1960s-70s original development should consider cast iron drain stack deterioration first",
      "Commercial-corridor properties should ask whether grease trap buildup is a contributing factor",
      "A backup that returns quickly after clearing suggests a deeper line issue needing a different approach",
      "Ask whether hydro jetting is appropriate for a recurring blockage",
    ],
    providerTitle: "What a Hurst Plumber Checks First",
    providerItems: [
      "Cast iron drain stack condition typical of the 1960s-70s original development",
      "Grease trap condition and higher-volume wear for Pipeline Road and Precinct Line Road corridor properties",
      "Whether hydro jetting or standard snaking is the better approach",
      "Whether the blockage pattern suggests a fixture-level or main-line issue",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Avoid using water in the home or building until the backup is cleared",
      "Stay away from contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "hurst/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Hurst",
    decisionIntro:
      "Hurst's commercial corridor along Pipeline Road and Precinct Line Road sees meaningfully higher drain volume than a typical property, and grease trap condition is a genuinely relevant factor here alongside standard commercial plumbing concerns.",
    decisionItems: [
      "Mention whether your property is along the Pipeline Road or Precinct Line Road commercial corridor",
      "Ask whether grease trap condition has been checked recently, a common contributing factor along this corridor",
      "Older commercial buildings should have aging supply and drain lines assessed periodically",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a Hurst Commercial Plumber Checks First",
    providerItems: [
      "Grease trap condition and cleaning history for Pipeline Road corridor properties",
      "Higher-volume drain wear patterns typical of the busy commercial corridor",
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
  "hurst/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Hurst Homeowners",
    decisionIntro:
      "Because Hurst spans a 1960s-70s original development era and a distinct 1980s-90s construction boom that introduced polybutylene supply lines, a same-day plumber visit often starts by identifying your home's construction era so the right diagnostic approach is ready.",
    decisionItems: [
      "Mention your home's approximate construction era when requesting service",
      "Homes from the 1980s-90s boom should flag possible polybutylene supply lines",
      "Note whether your property is residential or part of the Pipeline Road commercial corridor",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a Hurst Plumber Confirms Before Arrival",
    providerItems: [
      "Home or building construction era and likely plumbing materials",
      "Polybutylene identification needs for 1980s-90s boom-era homes",
      "Commercial-corridor considerations for Pipeline Road or Precinct Line Road properties",
      "Severity level to prioritize same-day dispatch appropriately",
    ],
    safetyTitle: "While You Wait",
    safetyItems: [
      "Shut off water to the affected fixture if safe to do so",
      "Keep documentation and photos ready for any insurance claim",
      "Avoid using the affected fixture until the plumber arrives",
    ],
  },
  "hurst/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Hurst",
    decisionIntro:
      "In Hurst's 1960s-70s original development homes, sink and shower drain backups often relate to aging cast iron drain material, while properties along the Pipeline Road commercial corridor more commonly see grease-related buildup as the driving factor.",
    decisionItems: [
      "Homes from the 1960s-70s original development should consider aging cast iron drain material",
      "Commercial-corridor properties should rule out grease-related buildup first",
      "Homes from the 1980s-90s boom era should also consider general age-related fixture drain wear",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a Hurst Plumber Checks First",
    providerItems: [
      "Cast iron drain material condition in 1960s-70s original development homes",
      "Grease-related buildup for Pipeline Road and Precinct Line Road corridor properties",
      "Fixture drain wear in 1980s-90s boom-era homes",
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
