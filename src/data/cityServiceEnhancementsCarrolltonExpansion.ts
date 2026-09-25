import type { PageEnhancement } from "./pageEnhancements";

// Carrollton content-gap fix (Batch 14). Carrollton already has 2 of 10
// services covered directly in pageEnhancements.ts (24-hour-emergency-
// plumber, emergency-drain-cleaning) - facts below extend that existing
// content to the other 8 previously-thin services, with no new statistics
// invented. Facts reused from the existing entries:
// - Carrollton was built rapidly in the 1970s and early 1980s by large tract
//   developers, giving much of the city a consistent construction era with
//   shared plumbing material patterns (galvanized or early PVC supply,
//   cast-iron or clay sewer lines) now aging into a similar risk window
//   citywide, rather than an older-core-vs-newer-suburb split
// - Some newer infill or remodeled properties have updated plumbing not
//   reflected in the home's original age
// - Clay-soil-related slab leak risk consistent with the broader North
//   Dallas County area
// - Root intrusion is a factor in established neighborhoods with mature
//   landscaping; hydro jetting can help with recurring blockages

export const carrolltonExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "carrollton/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in Carrollton",
    decisionIntro:
      "Because much of Carrollton was built during the same 1970s-early 1980s tract-development wave, cast-iron and clay sewer lines across the city are aging into a similar deterioration and root-intrusion risk window at once, unless your home is in a newer infill or remodeled property with updated lines.",
    decisionItems: [
      "Mention your home's approximate build era and whether it's part of the original tract development",
      "Original tract-era homes should consider cast-iron or clay pipe deterioration and root intrusion first",
      "Infill or remodeled properties should mention any known plumbing updates",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a Carrollton Plumber Checks First",
    providerItems: [
      "Cast-iron or clay pipe deterioration typical of the city's tract-development era",
      "Root intrusion likelihood in established neighborhoods with mature landscaping",
      "Whether an infill or remodeled property has updated sewer lines",
      "Camera inspection findings before recommending repair",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "carrollton/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Carrollton",
    decisionIntro:
      "Because so much of Carrollton was built during the same concentrated tract-development period, original water heaters across the city tend to reach the end of their service life around the same time, making age-related failure a common pattern unless your home has been remodeled with a newer unit.",
    decisionItems: [
      "Mention your home's approximate build era and whether the water heater has been replaced since",
      "Original tract-era homes should consider the unit's overall age as the likely factor",
      "Remodeled or infill properties should mention any known water heater updates",
      "Reduced hot water output or inconsistent temperature often points to an aging tank",
    ],
    providerTitle: "What a Carrollton Plumber Checks First",
    providerItems: [
      "Tank age and corrosion typical of the city's original construction era",
      "Whether the unit has already been replaced in a remodeled home",
      "Sediment buildup common in aging tank units",
      "Venting and ignition condition appropriate to the unit type",
    ],
    safetyTitle: "Water Heater Safety",
    safetyItems: [
      "Shut off gas or electric supply if you smell gas or see sparking",
      "Don't attempt to relight a tankless unit's ignition system yourself",
      "Watch for scalding water from a malfunctioning thermostat",
    ],
  },
  "carrollton/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Carrollton",
    decisionIntro:
      "In Carrollton's original tract-development homes, supply lines and shutoff valves connected to older toilets are aging at a similar rate citywide, while infill or remodeled properties more commonly have newer fixtures with different failure patterns.",
    decisionItems: [
      "Mention whether your home is original to the tract-development era or has been remodeled",
      "Original-era homes should check supply line and shutoff valve condition",
      "Remodeled or newer fixtures should be checked for installation quality",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What a Carrollton Plumber Checks First",
    providerItems: [
      "Shutoff valve condition on original tract-era supply lines",
      "Installation quality on remodeled or newer fixtures",
      "Whether the issue is isolated to the fixture or a broader line problem",
      "Home build era to anticipate likely materials",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the blockage is cleared",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "carrollton/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Carrollton",
    decisionIntro:
      "Because Carrollton's original tract-development housing shares a concentrated 1970s-early 1980s construction era, galvanized or early PVC supply lines across the city are reaching a similar age-related failure window at the same time, unless your home has been remodeled with updated plumbing.",
    decisionItems: [
      "Original tract-era homes should suspect galvanized or early PVC pipe corrosion first",
      "Remodeled or infill properties should mention any known plumbing updates",
      "Clay-soil-related slab stress can compound aging pipe issues in this construction era",
      "Mention your home's approximate build era when requesting service",
    ],
    providerTitle: "What a Carrollton Plumber Checks First",
    providerItems: [
      "Original galvanized or early PVC pipe condition typical of the tract-development era",
      "Whether the home has already been re-piped in a remodel",
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
  "carrollton/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Carrollton Homeowners",
    decisionIntro:
      "Sewer backups in Carrollton's original tract-development homes often relate to cast-iron or clay pipe deterioration reaching a similar age citywide, sometimes combined with root intrusion in established neighborhoods with mature landscaping, while remodeled properties are less likely to see material-related backups.",
    decisionItems: [
      "Recurring backups in original tract-era homes should consider material deterioration and root intrusion first",
      "A backup that returns quickly after clearing suggests a deeper material issue worth camera inspection",
      "Remodeled or infill properties should mention any known sewer line updates",
      "Ask whether hydro jetting is appropriate for a recurring blockage",
    ],
    providerTitle: "What a Carrollton Plumber Checks First",
    providerItems: [
      "Cast-iron or clay pipe deterioration typical of the tract-development era",
      "Root intrusion likelihood in established neighborhoods with mature landscaping",
      "Whether hydro jetting or standard snaking is the better approach",
      "Whether the property has already been re-piped in a remodel",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Avoid using water in the home until the backup is cleared",
      "Stay away from contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "carrollton/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Carrollton",
    decisionIntro:
      "Many of Carrollton's commercial strip centers and office buildings date to the same 1970s-early 1980s tract-development wave as its housing stock, meaning aging supply and drain infrastructure is a shared risk across much of the city's older commercial space, while newer redevelopment areas see different, warranty-related needs.",
    decisionItems: [
      "Older commercial buildings from the tract-development era should have supply and drain lines assessed periodically",
      "Newer redevelopment or infill commercial buildouts may have warranty coverage worth checking",
      "High-traffic retail restrooms see more frequent fixture-level issues from volume alone",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a Carrollton Commercial Plumber Checks First",
    providerItems: [
      "Aging supply and drain line condition typical of the city's original commercial construction era",
      "Contractor warranty status for newer redevelopment commercial buildouts",
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
  "carrollton/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Carrollton Homeowners",
    decisionIntro:
      "Because so much of Carrollton shares the same 1970s-early 1980s construction era, a same-day plumber visit often starts by confirming whether your home is original to that tract-development period or has been remodeled with updated plumbing, since that single detail predicts most of what's likely to be found.",
    decisionItems: [
      "Mention your home's approximate build era and whether it's part of the original tract development",
      "Note any known plumbing updates from a prior remodel",
      "Original-era homeowners should consider a proactive pipe material check if not already updated",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a Carrollton Plumber Confirms Before Arrival",
    providerItems: [
      "Home build era and likely original plumbing materials",
      "Whether a prior remodel included plumbing updates",
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
  "carrollton/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Carrollton",
    decisionIntro:
      "In Carrollton's original tract-development homes, sink and shower drain backups often relate to aging fixture drain materials reaching a similar age citywide, while remodeled or infill properties more commonly see grease, soap, or construction debris typical of recent work.",
    decisionItems: [
      "Original tract-era homes should consider aging fixture drain material as a factor",
      "Remodeled homes finished within the last few years should rule out leftover construction debris first",
      "Grease and soap buildup are common causes in both original and remodeled kitchens",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a Carrollton Plumber Checks First",
    providerItems: [
      "Aging fixture drain material typical of the tract-development era",
      "Construction debris in drains of recently remodeled or renovated homes",
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
