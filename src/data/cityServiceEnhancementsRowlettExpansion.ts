import type { PageEnhancement } from "./pageEnhancements";

// Rowlett content-gap fix (Batch 28). Rowlett has 2 of 10 services covered
// in cityServiceEnhancementsDFWAdditional4.ts (24-hour-emergency-plumber,
// emergency-drain-cleaning) - confirmed via findstr across all
// src/data/*.ts that these are the ONLY entries for rowlett/ (no
// duplicate/competing entries elsewhere, unlike the last several cities).
// Facts below extend that content to the other 8 previously-thin
// services, with no new statistics invented. Facts reused:
// - Rowlett lies on the eastern shore of Lake Ray Hubbard, with older
//   neighborhoods near the lake and newer development around communities
//   like Lake Park
// - Expansive clay soil and regional hard water common across DFW
// - Older copper or galvanized supply lines versus newer PEX systems in
//   growth areas
// - Discolored water or pressure changes can indicate aging pipe
//   corrosion
// - Heavy rain can affect drainage and groundwater levels near the lake
// - Older neighborhoods with mature trees have original cast iron sewer
//   lines prone to root intrusion
// Differentiated from Rockwall's PEX/builder-warranty framing and The
// Colony's elevation/grading framing by anchoring Rowlett on its
// combination of copper/galvanized-vs-PEX construction eras plus root
// intrusion from mature trees in older lakeside sections.

export const rowlettExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "rowlett/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in Rowlett",
    decisionIntro:
      "A main sewer line clog in Rowlett's older lakeside neighborhoods with mature trees often relates to root intrusion into original cast iron sewer lines, while the area's expansive clay soil can contribute to line shift regardless of neighborhood.",
    decisionItems: [
      "Mention whether your home is in an older area with mature landscaping near the lake or a newer development like Lake Park",
      "Older neighborhoods should consider root intrusion into cast iron sewer lines first",
      "Note if the clog started after heavy rain, which can affect drainage near the lake",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a Rowlett Plumber Checks First",
    providerItems: [
      "Root intrusion likelihood given mature tree growth in older neighborhoods",
      "Cast iron sewer line condition typical of Rowlett's older lakeside sections",
      "Clay-soil-related line shift given the area's expansive soil",
      "Camera inspection findings before recommending repair",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "rowlett/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Rowlett",
    decisionIntro:
      "Rowlett's regional hard water contributes to mineral scale buildup in water heaters, and homes with original copper or galvanized supply lines should also factor in overall system age, while newer PEX-era homes near communities like Lake Park should check builder warranty coverage first.",
    decisionItems: [
      "Reduced hot water output often points to mineral scale buildup from the region's hard water",
      "Homes with original copper or galvanized supply lines should mention this, since system age matters",
      "Newer PEX-era homes should confirm builder warranty terms before assuming standard repair applies",
      "Describe whether the affected unit is original to the home",
    ],
    providerTitle: "What a Rowlett Plumber Checks First",
    providerItems: [
      "Mineral scale buildup from the region's hard water",
      "Tank age and connection condition for homes with original copper or galvanized lines",
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
  "rowlett/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Rowlett",
    decisionIntro:
      "In Rowlett's older homes with original copper or galvanized supply lines, discolored water can signal advanced pipe corrosion affecting a shutoff valve's response during an overflow, while newer PEX-era homes are more likely dealing with an installation issue.",
    decisionItems: [
      "Homes with original copper or galvanized lines should check shutoff valve condition",
      "Discolored water near the toilet supply line can indicate advanced pipe corrosion",
      "Newer PEX-era homes should rule out installation issues on recently placed fixtures",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What a Rowlett Plumber Checks First",
    providerItems: [
      "Shutoff valve condition on original copper or galvanized supply lines",
      "Signs of pipe corrosion near the fixture",
      "Installation quality on newer PEX-era fixtures",
      "Whether the issue is isolated to the fixture or a broader line problem",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the blockage is cleared",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "rowlett/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Rowlett",
    decisionIntro:
      "Homes with original copper or galvanized supply lines in Rowlett's older neighborhoods are prone to corrosion-driven bursts, often preceded by discolored water, while heavy rain near Lake Ray Hubbard can affect groundwater and drainage around the failure site.",
    decisionItems: [
      "Homes with original copper or galvanized lines should suspect corrosion first",
      "Discolored water in the weeks before a leak is a common warning sign",
      "Note if the burst occurred after heavy rain, which can affect groundwater near the lake",
      "Mention whether your home is older lakeside or newer PEX-era construction",
    ],
    providerTitle: "What a Rowlett Plumber Checks First",
    providerItems: [
      "Original copper or galvanized pipe corrosion in older homes",
      "Prior discoloration or pressure complaints as corrosion indicators",
      "Groundwater and drainage conditions near Lake Ray Hubbard after heavy rain",
      "Water shutoff and immediate damage mitigation",
    ],
    safetyTitle: "Burst Pipe Safety",
    safetyItems: [
      "Shut off the main water supply immediately",
      "Turn off electricity to any affected areas near standing water",
      "Document damage with photos before cleanup for insurance claims",
    ],
  },
  "rowlett/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Rowlett Homeowners",
    decisionIntro:
      "Sewer backups in Rowlett's older neighborhoods with mature trees are a documented pattern tied to root intrusion into cast iron sewer lines, while heavy rain near Lake Ray Hubbard can be a separate, genuine contributing factor for lake-adjacent properties.",
    decisionItems: [
      "Homes in older, tree-heavy neighborhoods should consider root intrusion first",
      "Note if the backup followed heavy rain, relevant for lake-adjacent properties",
      "A backup that returns quickly after clearing suggests root intrusion needing a different approach",
      "Ask whether hydro jetting is appropriate for a recurring blockage",
    ],
    providerTitle: "What a Rowlett Plumber Checks First",
    providerItems: [
      "Root intrusion likelihood given mature tree growth in older neighborhoods",
      "Cast iron sewer line condition typical of older Rowlett sections",
      "Groundwater effects near Lake Ray Hubbard following heavy rain",
      "Whether the blockage pattern suggests a fixture-level or main-line issue",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Avoid using water in the home until the backup is cleared",
      "Stay away from contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "rowlett/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Rowlett",
    decisionIntro:
      "Rowlett's older commercial buildings may share the same copper or galvanized plumbing patterns as the city's older homes, while newer commercial buildouts near communities like Lake Park should confirm contractor warranty coverage.",
    decisionItems: [
      "Older commercial buildings should have aging supply and drain lines assessed periodically",
      "Newer commercial buildouts may have warranty coverage worth checking",
      "Ask whether the provider addresses mineral scale buildup from the region's hard water",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a Rowlett Commercial Plumber Checks First",
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
  "rowlett/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Rowlett Homeowners",
    decisionIntro:
      "Because Rowlett spans older lakeside neighborhoods with original copper or galvanized plumbing and newer PEX-era developments like Lake Park, a same-day plumber visit often starts by identifying your home's construction era so the right diagnostic approach is ready.",
    decisionItems: [
      "Mention whether your home is older lakeside or newer PEX-era construction",
      "Note whether your property is near mature trees, relevant for root intrusion risk",
      "Ask about builder warranty coverage if in a newer development",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a Rowlett Plumber Confirms Before Arrival",
    providerItems: [
      "Home construction era and likely plumbing materials",
      "Proximity to mature trees for root intrusion risk",
      "Builder warranty status for newer PEX-era homes",
      "Severity level to prioritize same-day dispatch appropriately",
    ],
    safetyTitle: "While You Wait",
    safetyItems: [
      "Shut off water to the affected fixture if safe to do so",
      "Keep documentation and photos ready for any insurance claim",
      "Avoid using the affected fixture until the plumber arrives",
    ],
  },
  "rowlett/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Rowlett",
    decisionIntro:
      "In Rowlett, sink and shower drain backups are commonly tied to mineral scale buildup from the region's hard water narrowing pipes over time, especially in older homes with original copper or galvanized lines, while newer PEX-era homes more often see leftover debris.",
    decisionItems: [
      "Homes with original copper or galvanized lines should consider mineral scale buildup and aging fixture drain material",
      "Newer PEX-era homes should rule out leftover construction debris first",
      "Grease and soap buildup are common causes across all home eras",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a Rowlett Plumber Checks First",
    providerItems: [
      "Mineral scale buildup in older home drain lines",
      "Aging fixture drain material in homes with original copper or galvanized plumbing",
      "Construction debris in drains of recently built PEX-era homes",
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
