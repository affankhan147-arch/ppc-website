import type { PageEnhancement } from "./pageEnhancements";

// Mesquite content-gap fix (Batch 17). Mesquite already has 2 of 10 services
// covered directly in pageEnhancements.ts (24-hour-emergency-plumber,
// emergency-drain-cleaning) - the literal entries there win over the
// separate mesquite/ entries in cityServiceEnhancementsDFWAdditional.ts
// (same pattern confirmed for Grand Prairie in the prior batch). Facts below
// extend the winning pageEnhancements.ts content to the other 8
// previously-thin services, with no new statistics invented. Facts reused:
// - Significant residential construction between 1978 and 1995 - the exact
//   window when polybutylene supply pipe was in heavy use; Mesquite's
//   chlorinated municipal water specifically degrades polybutylene from the
//   inside out over time, and it often fails without much warning
// - Polybutylene is almost always gray in DFW-area homes, distinct from PEX
//   (typically red, blue, or white)
// - Confirmed polybutylene can affect insurance premiums or coverage
// - Older neighborhoods like Town East Estates (developed 1960s onward) have
//   original cast-iron sewer lines now well past typical service life, with
//   root intrusion and material deterioration both factors
// - Moderate water hardness from NTMWD affects fixtures and water heaters
// - Some areas have had recent city sewer main rehabilitation work

export const mesquiteExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "mesquite/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in Mesquite",
    decisionIntro:
      "A main sewer line clog in Mesquite's older neighborhoods like Town East Estates often relates to cast-iron pipe deterioration and root intrusion now that these lines are well past typical service life, while areas with recent city sewer main rehabilitation work may have different, more recent context worth mentioning.",
    decisionItems: [
      "Mention whether your home is in an older established neighborhood like Town East Estates",
      "Older neighborhoods should consider cast-iron pipe deterioration and root intrusion first",
      "Ask whether your area has had recent city sewer main rehabilitation work",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a Mesquite Plumber Checks First",
    providerItems: [
      "Cast-iron sewer line condition in older established neighborhoods",
      "Root intrusion likelihood given decades of mature tree growth",
      "Whether recent city sewer main rehabilitation work affects the current issue",
      "Camera inspection findings before recommending repair",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "mesquite/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Mesquite",
    decisionIntro:
      "In Mesquite homes built between 1978 and 1995, water heater supply connections may involve polybutylene fittings worth checking alongside the unit itself, and the city's moderate NTMWD water hardness contributes to mineral scale buildup that shortens tank lifespan across all home ages.",
    decisionItems: [
      "Homes from 1978-1995 should have supply fittings near the water heater checked for polybutylene material",
      "Moderate water hardness contributes to scale buildup regardless of home age",
      "Reduced hot water output often points to mineral scale buildup or an aging tank",
      "Mention your home's approximate build year when requesting service",
    ],
    providerTitle: "What a Mesquite Plumber Checks First",
    providerItems: [
      "Polybutylene-era supply fitting condition near the water heater",
      "Mineral scale buildup from NTMWD's moderate water hardness",
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
  "mesquite/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Mesquite",
    decisionIntro:
      "In Mesquite homes from the 1978-1995 construction window, chlorinated municipal water can degrade polybutylene supply line and shutoff valve fittings from the inside out, sometimes causing sudden failures at the toilet connection with little warning.",
    decisionItems: [
      "Homes from 1978-1995 should have the toilet's supply line fitting checked for polybutylene material - almost always gray, distinct from red, blue, or white PEX",
      "A sudden shutoff valve failure with little warning is a known polybutylene-era risk in Mesquite",
      "Older cast-iron-era homes should check original supply line condition",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What a Mesquite Plumber Checks First",
    providerItems: [
      "Polybutylene supply line and shutoff valve condition in homes from the relevant era",
      "Chlorinated-water-related degradation specific to Mesquite's municipal supply",
      "Whether the issue is isolated to the fixture or a broader line problem",
      "Home build year to anticipate likely materials",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the blockage is cleared",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "mesquite/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Mesquite",
    decisionIntro:
      "Mesquite homes built between 1978 and 1995 fall squarely in the window when polybutylene supply pipe was in heavy use, and the city's chlorinated municipal water specifically degrades polybutylene from the inside out over time, often leading to a burst with little warning.",
    decisionItems: [
      "Homes from 1978-1995 should suspect polybutylene pipe failure first, even without prior warning signs",
      "Polybutylene is almost always gray, distinct from red, blue, or white PEX",
      "Confirmed polybutylene can affect insurance premiums or coverage, worth confirming with your provider",
      "Older or newer homes outside this window should mention their actual build year",
    ],
    providerTitle: "What a Mesquite Plumber Checks First",
    providerItems: [
      "Polybutylene pipe material and failure point identification",
      "Whether a full or partial re-pipe makes sense given confirmed polybutylene presence",
      "Cast-iron or newer pipe material for homes outside the 1978-1995 window",
      "Water shutoff and immediate damage mitigation",
    ],
    safetyTitle: "Burst Pipe Safety",
    safetyItems: [
      "Shut off the main water supply immediately",
      "Turn off electricity to any affected areas near standing water",
      "Document damage with photos before cleanup for insurance claims",
    ],
  },
  "mesquite/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Mesquite Homeowners",
    decisionIntro:
      "Recurring sewer backups in Mesquite's older neighborhoods like Town East Estates often point to cast-iron pipe deterioration and root intrusion from decades of mature tree growth, while areas with recent city sewer main rehabilitation work may have different context worth checking.",
    decisionItems: [
      "Recurring backups in older neighborhoods should consider cast-iron deterioration or root intrusion first",
      "A backup that returns quickly after clearing suggests a deeper material issue worth camera inspection",
      "Ask whether your area has had recent city sewer main rehabilitation work",
      "Ask whether hydro jetting is appropriate for a recurring blockage",
    ],
    providerTitle: "What a Mesquite Plumber Checks First",
    providerItems: [
      "Cast-iron sewer line deterioration in older established neighborhoods",
      "Root intrusion likelihood given mature tree growth",
      "Whether hydro jetting or standard snaking is the better approach",
      "Recent city sewer main rehabilitation context for the area",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Avoid using water in the home until the backup is cleared",
      "Stay away from contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "mesquite/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Mesquite",
    decisionIntro:
      "Mesquite's older commercial buildings, some dating to the same 1978-1995 construction window as the city's polybutylene-era housing, may share similar aging supply line risks, while established neighborhoods like Town East Estates surround commercial areas with correspondingly aging cast-iron drain infrastructure.",
    decisionItems: [
      "Older commercial buildings should have supply line material checked given the era's known polybutylene issues",
      "Commercial properties near older established neighborhoods should have drain infrastructure assessed periodically",
      "Newer commercial buildouts may have warranty coverage worth checking",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a Mesquite Commercial Plumber Checks First",
    providerItems: [
      "Supply line material and age in older commercial buildings",
      "Cast-iron drain infrastructure condition near established neighborhoods",
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
  "mesquite/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Mesquite Homeowners",
    decisionIntro:
      "Because Mesquite's 1978-1995 construction window carries a specific polybutylene risk profile distinct from both older cast-iron-era homes and newer construction, a same-day plumber visit often starts by confirming your home's build year so the right material expectations and parts are ready.",
    decisionItems: [
      "Mention your home's approximate build year, especially if it falls in the 1978-1995 range",
      "Note whether you're in an older established neighborhood like Town East Estates",
      "Ask about pipe material identification if you're unsure whether your home has polybutylene",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a Mesquite Plumber Confirms Before Arrival",
    providerItems: [
      "Home build year and likely pipe material",
      "Whether a re-pipe consultation may be worthwhile alongside the immediate repair",
      "Insurance documentation needs if polybutylene is confirmed",
      "Severity level to prioritize same-day dispatch appropriately",
    ],
    safetyTitle: "While You Wait",
    safetyItems: [
      "Shut off water to the affected fixture if safe to do so",
      "Keep documentation and photos ready for any insurance claim",
      "Avoid using the affected fixture until the plumber arrives",
    ],
  },
  "mesquite/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Mesquite",
    decisionIntro:
      "In Mesquite's older established neighborhoods like Town East Estates, sink and shower drain backups often relate to aging cast-iron fixture drains, while homes from the 1978-1995 polybutylene window may have degraded supply-side fittings near fixtures worth checking as well.",
    decisionItems: [
      "Older established-neighborhood homes should consider aging cast-iron fixture drain material as a factor",
      "Homes from 1978-1995 should have supply-side fittings near fixtures checked",
      "Grease and soap buildup are common causes across all home eras",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a Mesquite Plumber Checks First",
    providerItems: [
      "Aging cast-iron fixture drain material in older established neighborhoods",
      "Polybutylene-era supply fitting condition near fixtures",
      "Grease and soap buildup in kitchen lines regardless of home era",
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
