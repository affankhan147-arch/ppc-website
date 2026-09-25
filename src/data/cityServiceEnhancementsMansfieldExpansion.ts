import type { PageEnhancement } from "./pageEnhancements";

// Mansfield content-gap fix (Batch 29). Mansfield has 2 of 10 services
// covered in cityServiceEnhancementsDFWAdditional4.ts
// (24-hour-emergency-plumber, emergency-drain-cleaning) - confirmed via
// findstr across all src/data/*.ts that this is the only source (the lone
// pageEnhancements.ts hit is just a cost-guide link reference, not a
// competing entry). Facts below extend that content to the other 8
// previously-thin services, with no new statistics invented. Facts
// reused:
// - Mansfield's housing stock spans older 1970s-80s homes near the
//   historic downtown and newer master-planned communities like Walnut
//   Creek Valley, M3 Ranch, and South Pointe
// - Expansive clay soil and regional hard water consistent across the
//   city
// - Older copper/galvanized systems versus newer PEX construction in
//   communities like M3 Ranch and South Pointe
// - Discolored water can indicate advanced pipe corrosion
// - Heavy rain can affect clay-soil movement
// - Older neighborhoods with mature trees have original cast iron sewer
//   lines prone to root intrusion
// Differentiated from Rowlett's lake-groundwater framing by anchoring
// Mansfield on its specific 1970s-80s historic-downtown era, its three
// named newer communities, and clay-soil movement from heavy rain (not
// lake-driven groundwater).

export const mansfieldExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "mansfield/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in Mansfield",
    decisionIntro:
      "A main sewer line clog in Mansfield's older 1970s-80s homes near the historic downtown often relates to root intrusion into original cast iron sewer lines, while the area's expansive clay soil can shift lines after heavy rain regardless of neighborhood.",
    decisionItems: [
      "Mention your home's approximate construction era, since older downtown-area homes and newer communities like M3 Ranch have different typical piping",
      "Older homes near the historic downtown should consider root intrusion into cast iron sewer lines first",
      "Note whether the clog started after recent heavy rain, which can affect clay-soil movement",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a Mansfield Plumber Checks First",
    providerItems: [
      "Root intrusion likelihood given mature tree growth in older downtown-area neighborhoods",
      "Cast iron sewer line condition typical of 1970s-80s construction",
      "Clay-soil-related line shift given the area's expansive soil, especially after heavy rain",
      "Camera inspection findings before recommending repair",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "mansfield/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Mansfield",
    decisionIntro:
      "Mansfield's regional hard water contributes to mineral scale buildup in water heaters, and homes near the historic downtown with original copper or galvanized systems should also factor in overall unit age, while newer PEX-era homes in communities like M3 Ranch or South Pointe should check builder warranty coverage first.",
    decisionItems: [
      "Reduced hot water output often points to mineral scale buildup from the region's hard water",
      "Homes near the historic downtown with original systems should mention this, since unit age matters",
      "Newer community homeowners should confirm builder warranty terms before assuming standard repair applies",
      "Describe whether the affected unit is original to the home",
    ],
    providerTitle: "What a Mansfield Plumber Checks First",
    providerItems: [
      "Mineral scale buildup from the region's hard water",
      "Tank age and connection condition for homes with original copper or galvanized systems",
      "Builder warranty status for newer PEX-era construction",
      "Venting and ignition condition appropriate to the unit type",
    ],
    safetyTitle: "Water Heater Safety",
    safetyItems: [
      "Shut off gas or electric supply if you smell gas or see sparking",
      "Don't attempt to relight a tankless unit's ignition system yourself",
      "Watch for scalding water from a malfunctioning thermostat",
    ],
  },
  "mansfield/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Mansfield",
    decisionIntro:
      "In Mansfield's older homes near the historic downtown, discolored water can signal advanced pipe corrosion affecting a shutoff valve's response during an overflow, while newer PEX-era homes in communities like Walnut Creek Valley are more likely dealing with an installation issue.",
    decisionItems: [
      "Homes near the historic downtown with original copper or galvanized systems should check shutoff valve condition",
      "Discolored water near the toilet supply line can indicate advanced pipe corrosion",
      "Newer community homes should rule out installation issues on recently placed fixtures",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What a Mansfield Plumber Checks First",
    providerItems: [
      "Shutoff valve condition on original copper or galvanized systems",
      "Signs of pipe corrosion near the fixture",
      "Installation quality on newer community fixtures",
      "Whether the issue is isolated to the fixture or a broader line problem",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the blockage is cleared",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "mansfield/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Mansfield",
    decisionIntro:
      "Homes near Mansfield's historic downtown with original copper or galvanized systems are prone to corrosion-driven bursts, often preceded by discolored water, while the area's expansive clay soil can shift and stress pipes after heavy rain regardless of construction era.",
    decisionItems: [
      "Homes near the historic downtown with original systems should suspect corrosion first",
      "Discolored water in the weeks before a leak is a common warning sign",
      "Note if the burst occurred after heavy rain, which can affect clay-soil movement",
      "Mention whether your home is older downtown-area or newer community construction",
    ],
    providerTitle: "What a Mansfield Plumber Checks First",
    providerItems: [
      "Original copper or galvanized pipe corrosion near the historic downtown",
      "Prior discoloration or pressure complaints as corrosion indicators",
      "Clay-soil-related pipe stress, especially after heavy rain",
      "Water shutoff and immediate damage mitigation",
    ],
    safetyTitle: "Burst Pipe Safety",
    safetyItems: [
      "Shut off the main water supply immediately",
      "Turn off electricity to any affected areas near standing water",
      "Document damage with photos before cleanup for insurance claims",
    ],
  },
  "mansfield/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Mansfield Homeowners",
    decisionIntro:
      "Sewer backups in Mansfield's older neighborhoods near the historic downtown are a documented pattern tied to root intrusion into cast iron sewer lines, while clay-soil movement after heavy rain can be a separate, genuine contributing factor across the city.",
    decisionItems: [
      "Homes in older, tree-heavy neighborhoods should consider root intrusion first",
      "Note if the backup followed heavy rain, relevant given the area's clay soil",
      "A backup that returns quickly after clearing suggests root intrusion needing a different approach",
      "Ask whether hydro jetting is appropriate for a recurring blockage",
    ],
    providerTitle: "What a Mansfield Plumber Checks First",
    providerItems: [
      "Root intrusion likelihood given mature tree growth in older neighborhoods",
      "Cast iron sewer line condition typical of older Mansfield sections",
      "Clay-soil-related line movement following heavy rain",
      "Whether the blockage pattern suggests a fixture-level or main-line issue",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Avoid using water in the home until the backup is cleared",
      "Stay away from contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "mansfield/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Mansfield",
    decisionIntro:
      "Mansfield's older commercial buildings near the historic downtown may share the same copper or galvanized plumbing patterns as the city's older homes, while newer commercial buildouts in communities like South Pointe should confirm contractor warranty coverage.",
    decisionItems: [
      "Older commercial buildings near the historic downtown should have aging supply and drain lines assessed periodically",
      "Newer commercial buildouts may have warranty coverage worth checking",
      "Ask whether the provider addresses mineral scale buildup from the region's hard water",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a Mansfield Commercial Plumber Checks First",
    providerItems: [
      "Aging supply and drain line condition in older downtown-area commercial buildings",
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
  "mansfield/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Mansfield Homeowners",
    decisionIntro:
      "Because Mansfield spans older 1970s-80s homes near the historic downtown and newer master-planned communities like Walnut Creek Valley, M3 Ranch, and South Pointe, a same-day plumber visit often starts by identifying your home's construction era so the right diagnostic approach is ready.",
    decisionItems: [
      "Mention your home's approximate construction era and neighborhood when requesting service",
      "Note whether your property is near mature trees, relevant for root intrusion risk",
      "Ask about builder warranty coverage if in a newer community",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a Mansfield Plumber Confirms Before Arrival",
    providerItems: [
      "Home construction era and likely plumbing materials",
      "Proximity to mature trees for root intrusion risk",
      "Builder warranty status for newer community homes",
      "Severity level to prioritize same-day dispatch appropriately",
    ],
    safetyTitle: "While You Wait",
    safetyItems: [
      "Shut off water to the affected fixture if safe to do so",
      "Keep documentation and photos ready for any insurance claim",
      "Avoid using the affected fixture until the plumber arrives",
    ],
  },
  "mansfield/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Mansfield",
    decisionIntro:
      "In Mansfield, sink and shower drain backups are commonly tied to mineral scale buildup from the region's hard water narrowing pipes over time, especially in older homes near the historic downtown, while newer community homes more often see leftover construction debris.",
    decisionItems: [
      "Homes near the historic downtown should consider mineral scale buildup and aging fixture drain material",
      "Newer community homes should rule out leftover construction debris first",
      "Grease and soap buildup are common causes across all home eras",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a Mansfield Plumber Checks First",
    providerItems: [
      "Mineral scale buildup in older downtown-area drain lines",
      "Aging fixture drain material in homes with original copper or galvanized plumbing",
      "Construction debris in drains of recently built community homes",
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
