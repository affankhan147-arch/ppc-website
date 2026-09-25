import type { PageEnhancement } from "./pageEnhancements";

// Denton content-gap fix (Batch 12 - first priority-2 DFW suburb). Denton
// already has 2 of 10 services covered directly in pageEnhancements.ts
// (24-hour-emergency-plumber, emergency-drain-cleaning) - facts below extend
// that existing content to the other 8 previously-thin services, with no new
// statistics invented. Facts reused from the existing entries:
// - University town (UNT, Texas Woman's University) with high-turnover
//   rental housing
// - Oak-Hickory Historic District and other central Denton neighborhoods
//   (built 1890s-1950s) commonly have original galvanized piping and clay
//   or cast-iron sewer lines
// - Newer developments like Robson Ranch and Rayzor Ranch have harder water
//   contributing to scale buildup
// - Denton's expansive clay soil contributes to slab leak risk, root
//   intrusion, and soil-shift-related issues regardless of construction era

export const dentonExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "denton/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in Denton",
    decisionIntro:
      "A main sewer line clog near Denton's historic downtown square often involves original clay or cast-iron laterals prone to root intrusion, while newer developments like Robson Ranch and Rayzor Ranch typically run PVC lines where construction debris or clay-soil-related joint shift is more likely.",
    decisionItems: [
      "Mention whether your home is in an older central Denton neighborhood or a newer development",
      "Older homes near downtown should consider root intrusion from mature trees",
      "Newer development homes should consider construction debris or soil-shift-related joint issues",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a Denton Plumber Checks First",
    providerItems: [
      "Root intrusion in older clay or cast-iron laterals near downtown",
      "Construction debris or soil movement in newer development mains",
      "Clay-soil-related joint shift regardless of neighborhood",
      "Cleanout access appropriate to the property's era",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "denton/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Denton",
    decisionIntro:
      "Older homes near Denton's historic downtown square with original plumbing are more likely dealing with an aging tank water heater nearing the end of its service life, while newer developments like Robson Ranch have harder water that accelerates scale buildup in both tank and tankless units.",
    decisionItems: [
      "Older homes near downtown should consider the water heater's overall age first",
      "Newer development homes should consider mineral scale buildup from harder water",
      "Rental properties should check maintenance history between tenant turnovers",
      "Mention your home's approximate age and neighborhood when requesting service",
    ],
    providerTitle: "What a Denton Plumber Checks First",
    providerItems: [
      "Tank age and corrosion in older downtown-area homes",
      "Mineral scale buildup in newer developments with harder water",
      "Rental property maintenance history where applicable",
      "Venting and ignition condition appropriate to the unit type",
    ],
    safetyTitle: "Water Heater Safety",
    safetyItems: [
      "Shut off gas or electric supply if you smell gas or see sparking",
      "Don't attempt to relight a tankless unit's ignition system yourself",
      "Watch for scalding water from a malfunctioning thermostat",
    ],
  },
  "denton/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Denton",
    decisionIntro:
      "In Denton's high-turnover student rental properties near UNT and TWU, toilet overflow issues can stem from deferred maintenance between tenants, while older homes near downtown may have original supply lines and shutoff valves slower to respond during an overflow.",
    decisionItems: [
      "Rental property landlords should mention maintenance history between tenant turnovers",
      "Older downtown-area homes should check supply line and shutoff valve condition",
      "Newer development homes should rule out installation issues on recently placed fixtures",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What a Denton Plumber Checks First",
    providerItems: [
      "Deferred maintenance signs in high-turnover rental properties",
      "Shutoff valve condition on older downtown-area supply lines",
      "Installation quality on newer development fixtures",
      "Whether the issue is isolated to the fixture or a broader line problem",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the blockage is cleared",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "denton/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Denton",
    decisionIntro:
      "Homes built before 1980 near Denton's historic downtown square commonly still have original galvanized piping prone to corrosion-driven bursts, while newer developments like Robson Ranch and Rayzor Ranch more often see PEX fitting failures tied to Denton's expansive clay soil shifting underneath slab foundations.",
    decisionItems: [
      "Older downtown-area homes should suspect galvanized pipe corrosion first",
      "Newer development homes should suspect a PEX fitting or joint failure from soil shift",
      "Mention any known history of foundation movement or repair on your property",
      "Document damage promptly for insurance purposes regardless of neighborhood",
    ],
    providerTitle: "What a Denton Plumber Checks First",
    providerItems: [
      "Original galvanized pipe corrosion in homes built before 1980",
      "PEX manifold and fitting integrity in newer developments",
      "Clay-soil-related foundation shift contributing to the failure",
      "Water shutoff and immediate damage mitigation",
    ],
    safetyTitle: "Burst Pipe Safety",
    safetyItems: [
      "Shut off the main water supply immediately",
      "Turn off electricity to any affected areas near standing water",
      "Document damage with photos before cleanup for insurance claims",
    ],
  },
  "denton/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Denton Homeowners",
    decisionIntro:
      "Sewer backups near Denton's historic downtown often trace back to root intrusion in older clay or cast-iron laterals, while backups in newer developments like Robson Ranch and Rayzor Ranch more commonly stem from clay-soil movement or construction debris in PVC lines.",
    decisionItems: [
      "Recurring backups in older downtown-area homes should consider root intrusion first",
      "Backups in newer developments may relate to soil-shift-related line stress or debris",
      "Rental properties should document backup history between tenant turnovers",
      "A camera inspection identifies the exact cause before repairs are proposed",
    ],
    providerTitle: "What a Denton Plumber Checks First",
    providerItems: [
      "Root intrusion in older clay or cast-iron laterals near downtown",
      "Soil-shift-related line stress or debris in newer developments",
      "Rental property considerations where applicable",
      "Cleanout access appropriate to the property's era",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Avoid using water in the home until the backup is cleared",
      "Stay away from contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "denton/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Denton",
    decisionIntro:
      "Denton's mix of historic downtown-square businesses, university-driven retail and restaurants serving UNT and TWU, and newer commercial development near Rayzor Ranch means commercial plumbing emergencies here range from aging-infrastructure failures to fixture wear from high student foot traffic.",
    decisionItems: [
      "Historic downtown-square businesses should have aging supply and drain lines assessed periodically",
      "University-area restaurants and retail see high fixture traffic tied to the academic calendar",
      "Newer commercial buildouts near Rayzor Ranch may have warranty coverage worth checking",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a Denton Commercial Plumber Checks First",
    providerItems: [
      "Aging supply and drain line condition in historic downtown-square buildings",
      "Fixture-level wear from high student and university-area foot traffic",
      "Contractor warranty status for newer commercial buildouts",
      "Backflow prevention and code compliance appropriate to the building's age",
    ],
    safetyTitle: "Commercial Plumbing Safety",
    safetyItems: [
      "Shut off water to the affected fixture or area to limit damage",
      "Post appropriate signage to keep customers or employees away from hazards",
      "Document the issue for property management or insurance records",
    ],
  },
  "denton/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Denton Homeowners",
    decisionIntro:
      "Because Denton mixes historic downtown homes, high-turnover student rentals, and newer developments, a same-day plumber visit often starts by identifying which category your property falls into so the right diagnostic approach and parts are ready.",
    decisionItems: [
      "Landlords should mention rental status and any known maintenance history between tenants",
      "Older downtown-area homeowners should mention known original galvanized piping if known",
      "Newer development homeowners should check builder warranty documentation before scheduling",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a Denton Plumber Confirms Before Arrival",
    providerItems: [
      "Property type (owner-occupied, rental, or student housing) and maintenance history",
      "Neighborhood era and likely plumbing materials",
      "Whether the issue may fall under an existing builder or manufacturer warranty",
      "Severity level to prioritize same-day dispatch appropriately",
    ],
    safetyTitle: "While You Wait",
    safetyItems: [
      "Shut off water to the affected fixture if safe to do so",
      "Keep documentation and photos ready for any warranty claim",
      "Avoid using the affected fixture until the plumber arrives",
    ],
  },
  "denton/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Denton",
    decisionIntro:
      "In older Denton homes near the historic downtown square, sink and shower drain backups can relate to aging galvanized fixture drains, while newer developments like Robson Ranch more commonly see mineral scale buildup from harder water alongside construction debris typical of recent builds.",
    decisionItems: [
      "Older downtown-area homes should consider aging fixture drain material as a factor",
      "Newer development homes should consider mineral scale buildup from harder water",
      "Homes finished within the last few years should also rule out leftover construction debris",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a Denton Plumber Checks First",
    providerItems: [
      "Aging fixture drain material in older downtown-area homes",
      "Mineral scale buildup in newer developments with harder water",
      "Construction debris in drains of recently built or renovated homes",
      "Whether the issue is isolated to one fixture or affects multiple drains",
    ],
    safetyTitle: "Drain Backup Safety",
    safetyItems: [
      "Avoid chemical drain cleaners, which can damage older galvanized pipes and newer fittings alike",
      "Stop using the affected fixture until the clog is cleared",
      "Watch for water damage under sinks or around shower bases",
    ],
  },
};
