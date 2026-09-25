import type { PageEnhancement } from "./pageEnhancements";

// Euless content-gap fix (Batch 19). Euless already has 2 of 10 services
// covered directly in pageEnhancements.ts (24-hour-emergency-plumber,
// emergency-drain-cleaning) - the literal entries there win over the
// separate euless/ entries in cityServiceEnhancementsDFWAdditional.ts (same
// multi-file pattern as Grand Prairie, Mesquite, and Grapevine). Facts below
// extend the winning content to the other 8 previously-thin services, with
// no new statistics invented. Facts reused:
// - Euless sits at the geographic center of the Metroplex within the HEB
//   (Hurst-Euless-Bedford) tri-city area
// - Established neighborhoods like Bear Creek have 1960s-70s galvanized
//   piping, while newer developments like Dominion at Bear Creek have PEX
// - Highly expansive Blackland Prairie clay soil across the HEB area
// - Moderate water hardness affects fixtures across all construction eras
// - A notable concentration of 1980s-era multi-family and apartment
//   properties like Enclave at Bear Creek means shared-line drain issues
//   affecting multiple units are a genuinely relevant consideration

export const eulessExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "euless/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in Euless",
    decisionIntro:
      "A main sewer line clog in established Euless neighborhoods like Bear Creek often relates to aging cast-iron or galvanized-era lines, while 1980s-era multi-family properties like Enclave at Bear Creek more commonly involve a shared line affecting multiple units, and newer developments typically see construction debris or clay-soil-related joint shift.",
    decisionItems: [
      "Mention whether your property is an established single-family home, a 1980s-era multi-family building, or a newer development",
      "Established neighborhood homes should consider aging pipe material first",
      "Multi-family properties should note whether other units are affected",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a Euless Plumber Checks First",
    providerItems: [
      "Aging cast-iron or galvanized-era pipe condition in established neighborhoods",
      "Shared-line issues in 1980s-era multi-family properties",
      "Construction debris or clay-soil-related joint shift in newer developments",
      "Camera inspection findings before recommending repair",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "euless/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Euless",
    decisionIntro:
      "In established Euless neighborhoods like Bear Creek, water heaters are more likely dealing with age-related failure given the 1960s-70s construction era, while moderate water hardness across the HEB tri-city area contributes to mineral scale buildup that shortens tank lifespan regardless of home age.",
    decisionItems: [
      "Established neighborhood homes should consider the water heater's overall age first",
      "Moderate water hardness contributes to scale buildup across all construction eras",
      "Newer development homes should check for tankless error codes if applicable",
      "Mention your home's approximate construction era when requesting service",
    ],
    providerTitle: "What a Euless Plumber Checks First",
    providerItems: [
      "Tank age and corrosion in established neighborhood homes",
      "Mineral scale buildup from moderate water hardness across the HEB area",
      "Tankless error codes in newer construction where applicable",
      "Venting and ignition condition appropriate to the unit type",
    ],
    safetyTitle: "Water Heater Safety",
    safetyItems: [
      "Shut off gas or electric supply if you smell gas or see sparking",
      "Don't attempt to relight a tankless unit's ignition system yourself",
      "Watch for scalding water from a malfunctioning thermostat",
    ],
  },
  "euless/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Euless",
    decisionIntro:
      "In established Euless neighborhoods like Bear Creek, original galvanized supply lines and shutoff valves can be slower to respond during a toilet overflow, while 1980s-era multi-family properties may see overflow issues tied to shared plumbing systems affecting more than one unit.",
    decisionItems: [
      "Established neighborhood homes should check galvanized supply line and shutoff valve condition",
      "Multi-family properties should note whether other units are affected",
      "Discolored water near the toilet supply line can indicate advanced galvanized pipe corrosion",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What a Euless Plumber Checks First",
    providerItems: [
      "Shutoff valve condition on established-neighborhood galvanized supply lines",
      "Shared-line issues in 1980s-era multi-family properties",
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
  "euless/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Euless",
    decisionIntro:
      "In established Euless neighborhoods like Bear Creek, original galvanized piping from the 1960s-70s is prone to corrosion-driven bursts, while newer developments like Dominion at Bear Creek more often see PEX fitting failures tied to the HEB tri-city area's expansive Blackland Prairie clay soil.",
    decisionItems: [
      "Established neighborhood homes should suspect galvanized pipe corrosion first",
      "Newer development homes should suspect a PEX fitting or joint failure from clay-soil movement",
      "Mention any known history of foundation movement or repair on your property",
      "Document damage promptly for insurance purposes regardless of neighborhood",
    ],
    providerTitle: "What a Euless Plumber Checks First",
    providerItems: [
      "Original galvanized pipe corrosion in established neighborhoods like Bear Creek",
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
  "euless/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Euless Homeowners",
    decisionIntro:
      "Sewer backups in Euless's 1980s-era multi-family properties like Enclave at Bear Creek often involve a shared line affecting multiple units, while established single-family neighborhoods like Bear Creek face aging cast-iron or galvanized-era pipe deterioration.",
    decisionItems: [
      "Multi-family property residents should note whether other units are affected",
      "Established single-family neighborhood homes should consider aging pipe deterioration first",
      "Renters should notify property management alongside any repair request",
      "A camera inspection identifies the exact cause before repairs are proposed",
    ],
    providerTitle: "What a Euless Plumber Checks First",
    providerItems: [
      "Shared-line issues in 1980s-era multi-family properties",
      "Aging cast-iron or galvanized-era pipe deterioration in established neighborhoods",
      "Whether neighboring units report similar issues, pointing to a shared-line cause",
      "Standard single-family blockage assessment where applicable",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Avoid using water in the home until the backup is cleared",
      "Stay away from contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "euless/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Euless",
    decisionIntro:
      "Euless's position at the center of the HEB tri-city area means commercial properties range from older established buildings with aging supply and drain infrastructure to newer development, with moderate water hardness affecting fixtures and water heaters across the board.",
    decisionItems: [
      "Older commercial buildings should have aging supply and drain lines assessed periodically",
      "Newer commercial buildouts may have warranty coverage worth checking",
      "Moderate water hardness can affect commercial water heaters and fixtures regardless of building age",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a Euless Commercial Plumber Checks First",
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
  "euless/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Euless Homeowners",
    decisionIntro:
      "Because Euless mixes established galvanized-era neighborhoods, 1980s-era multi-family properties, and newer PEX-plumbed development, a same-day plumber visit often starts by identifying which category your property falls into so the right diagnostic approach is ready.",
    decisionItems: [
      "Mention whether your property is an established neighborhood home, a multi-family unit, or a newer development",
      "Multi-family residents should mention if neighbors report similar issues",
      "Established neighborhood homeowners should mention known galvanized piping if known",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a Euless Plumber Confirms Before Arrival",
    providerItems: [
      "Property type and construction era",
      "Shared-line considerations for multi-family properties",
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
  "euless/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Euless",
    decisionIntro:
      "In established Euless neighborhoods like Bear Creek, sink and shower drain backups often relate to aging fixture drain materials, while moderate water hardness across the HEB area contributes to mineral scale buildup narrowing pipes over time regardless of construction era.",
    decisionItems: [
      "Established neighborhood homes should consider aging fixture drain material as a factor",
      "All homes should consider mineral scale buildup given the area's moderate water hardness",
      "Newer development homes should also rule out leftover construction debris",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a Euless Plumber Checks First",
    providerItems: [
      "Aging fixture drain material in established neighborhoods",
      "Mineral scale buildup from moderate water hardness across all home eras",
      "Construction debris in drains of recently built or renovated homes",
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
