import type { PageEnhancement } from "./pageEnhancements";

// Wylie content-gap fix (Batch 33 - FINAL BATCH of the 33-suburb content
// gap fix project). Wylie has 2 of 10 services covered in
// cityServiceEnhancementsDFWAdditional5.ts (24-hour-emergency-plumber,
// emergency-drain-cleaning) - confirmed via findstr across all
// src/data/*.ts that this is the only source. Facts below extend that
// content to the other 8 previously-thin services, with no new statistics
// invented. Facts reused:
// - Wylie is a rapidly growing Collin County suburb, with housing stock
//   split between older 1980s-90s construction and newer development near
//   Lake Lavon
// - Water hardness runs about 10-14 grains per gallon
// - Expansive clay soil common to the area affects foundation and pipe
//   stability
// - Older neighborhoods have original copper or galvanized supply lines
//   and cast iron sewer lines, while newer lake-area developments have
//   PEX supply systems and modern PVC drain lines
// - Lake Lavon proximity can affect drainage and water quality profiles
// Differentiated from other lake-adjacent cities (Rowlett/Rockwall on Lake
// Ray Hubbard, The Colony on Lake Lewisville) by anchoring Wylie on Lake
// Lavon specifically, its Collin County location, its 10-14 GPG hardness
// figure, and its copper/galvanized-vs-PEX-and-PVC construction-era split.

export const wylieExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "wylie/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in Wylie",
    decisionIntro:
      "A main sewer line clog in Wylie's older neighborhoods often relates to root intrusion into original cast iron sewer lines, while newer developments near Lake Lavon with modern PVC systems are less prone to these issues but should still be checked for installation-related causes.",
    decisionItems: [
      "Mention whether your home is in an older neighborhood or a newer development near Lake Lavon",
      "Older neighborhoods should consider root intrusion into cast iron sewer lines first",
      "Newer PVC-line homes should rule out an installation-related cause",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a Wylie Plumber Checks First",
    providerItems: [
      "Root intrusion likelihood given mature tree growth in older neighborhoods",
      "Cast iron sewer line condition typical of older Wylie neighborhoods",
      "PVC line condition and installation quality in newer Lake Lavon-area developments",
      "Camera inspection findings before recommending repair",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "wylie/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Wylie",
    decisionIntro:
      "Wylie's water hardness, running about 10-14 grains per gallon, contributes to mineral scale buildup in water heaters, and older 1980s-90s homes with original copper or galvanized connections should also factor in unit age, while newer Lake Lavon-area homes should check builder warranty coverage.",
    decisionItems: [
      "Reduced hot water output often points to mineral scale buildup from Wylie's hard water",
      "Older 1980s-90s homes should mention their construction era, since connection age matters",
      "Newer Lake Lavon-area homeowners should confirm builder warranty terms before assuming standard repair applies",
      "Describe whether the affected unit is original to the home",
    ],
    providerTitle: "What a Wylie Plumber Checks First",
    providerItems: [
      "Mineral scale buildup from the area's water hardness (10-14 grains per gallon)",
      "Tank age and connection condition in older 1980s-90s homes",
      "Builder warranty status for newer Lake Lavon-area construction",
      "Venting and ignition condition appropriate to the unit type",
    ],
    safetyTitle: "Water Heater Safety",
    safetyItems: [
      "Shut off gas or electric supply if you smell gas or see sparking",
      "Don't attempt to relight a tankless unit's ignition system yourself",
      "Watch for scalding water from a malfunctioning thermostat",
    ],
  },
  "wylie/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Wylie",
    decisionIntro:
      "In Wylie's older 1980s-90s homes, an original copper or galvanized shutoff valve can be slow to respond during a toilet overflow, sometimes preceded by discolored water, while newer developments near Lake Lavon with PEX supply lines are more likely dealing with an installation issue.",
    decisionItems: [
      "Older 1980s-90s homes should check galvanized or copper shutoff valve condition",
      "Discolored water near the toilet supply line can indicate advanced pipe corrosion",
      "Newer Lake Lavon-area homes should rule out installation issues on recently placed fixtures",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What a Wylie Plumber Checks First",
    providerItems: [
      "Shutoff valve condition on original copper or galvanized supply lines",
      "Signs of pipe corrosion near the fixture",
      "Installation quality on newer PEX-system fixtures",
      "Whether the issue is isolated to the fixture or a broader line problem",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the blockage is cleared",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "wylie/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Wylie",
    decisionIntro:
      "Wylie's older 1980s-90s homes with original copper or galvanized lines are prone to corrosion-driven bursts, often preceded by discolored water, while the area's expansive clay soil can stress pipes regardless of construction era or proximity to Lake Lavon.",
    decisionItems: [
      "Older 1980s-90s homes should suspect galvanized or copper pipe corrosion first",
      "Discolored water in the weeks before a leak is a common warning sign",
      "Clay-soil-related pipe stress is a relevant factor for any Wylie property",
      "Mention whether your home is older construction or a newer Lake Lavon-area development",
    ],
    providerTitle: "What a Wylie Plumber Checks First",
    providerItems: [
      "Original copper or galvanized pipe corrosion in older 1980s-90s homes",
      "Prior discoloration or pressure complaints as corrosion indicators",
      "Clay-soil-related pipe stress contributing to the failure",
      "Water shutoff and immediate damage mitigation",
    ],
    safetyTitle: "Burst Pipe Safety",
    safetyItems: [
      "Shut off the main water supply immediately",
      "Turn off electricity to any affected areas near standing water",
      "Document damage with photos before cleanup for insurance claims",
    ],
  },
  "wylie/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Wylie Homeowners",
    decisionIntro:
      "Sewer backups in Wylie's older neighborhoods are a documented pattern tied to root intrusion into original cast iron sewer lines, while newer developments near Lake Lavon with modern PVC systems are less prone to these issues but can still see installation-related backups.",
    decisionItems: [
      "Homes in older, tree-heavy neighborhoods should consider root intrusion first",
      "Newer Lake Lavon-area homes should ask whether an installation issue could be the cause",
      "A backup that returns quickly after clearing suggests root intrusion needing a different approach",
      "Ask whether hydro jetting is appropriate for a recurring blockage",
    ],
    providerTitle: "What a Wylie Plumber Checks First",
    providerItems: [
      "Root intrusion likelihood given mature tree growth in older neighborhoods",
      "Cast iron sewer line condition typical of older Wylie neighborhoods",
      "PVC line condition and installation quality in newer developments",
      "Whether the blockage pattern suggests a fixture-level or main-line issue",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Avoid using water in the home until the backup is cleared",
      "Stay away from contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "wylie/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Wylie",
    decisionIntro:
      "Wylie's older commercial buildings may share the same copper or galvanized plumbing patterns as the city's older homes, while newer commercial buildouts near Lake Lavon should confirm contractor warranty coverage and account for the area's water hardness.",
    decisionItems: [
      "Older commercial buildings should have aging supply and drain lines assessed periodically",
      "Newer commercial buildouts may have warranty coverage worth checking",
      "Ask whether the provider addresses mineral scale buildup from the region's hard water",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a Wylie Commercial Plumber Checks First",
    providerItems: [
      "Aging supply and drain line condition in older commercial buildings",
      "Contractor warranty status for newer commercial buildouts",
      "Mineral scale buildup in commercial water heaters and fixtures (10-14 grains per gallon)",
      "Backflow prevention and code compliance appropriate to the building's age",
    ],
    safetyTitle: "Commercial Plumbing Safety",
    safetyItems: [
      "Shut off water to the affected fixture or area to limit damage",
      "Post appropriate signage to keep customers or employees away from hazards",
      "Document the issue for property management or insurance records",
    ],
  },
  "wylie/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Wylie Homeowners",
    decisionIntro:
      "Because Wylie spans older 1980s-90s construction and newer development near Lake Lavon, a same-day plumber visit often starts by identifying your home's construction era and proximity to the lake so the right diagnostic approach is ready.",
    decisionItems: [
      "Mention whether your home is older construction or a newer Lake Lavon-area development",
      "Note whether your property is near mature trees, relevant for root intrusion risk",
      "Ask about builder warranty coverage if in a newer development",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a Wylie Plumber Confirms Before Arrival",
    providerItems: [
      "Home construction era and likely plumbing materials",
      "Proximity to Lake Lavon and mature trees for related risk factors",
      "Builder warranty status for newer development homes",
      "Severity level to prioritize same-day dispatch appropriately",
    ],
    safetyTitle: "While You Wait",
    safetyItems: [
      "Shut off water to the affected fixture if safe to do so",
      "Keep documentation and photos ready for any insurance claim",
      "Avoid using the affected fixture until the plumber arrives",
    ],
  },
  "wylie/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Wylie",
    decisionIntro:
      "In Wylie, sink and shower drain backups are commonly tied to mineral scale buildup from the area's hard water (10-14 grains per gallon) narrowing pipes over time, especially in older 1980s-90s homes, while newer Lake Lavon-area homes more often see leftover construction debris.",
    decisionItems: [
      "Older 1980s-90s homes should consider mineral scale buildup and aging fixture drain material",
      "Newer Lake Lavon-area homes should rule out leftover construction debris first",
      "Grease and soap buildup are common causes across all home eras",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a Wylie Plumber Checks First",
    providerItems: [
      "Mineral scale buildup from the area's hard water",
      "Aging fixture drain material in older 1980s-90s homes",
      "Construction debris in drains of recently built Lake Lavon-area homes",
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
