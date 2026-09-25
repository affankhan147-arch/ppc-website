import type { PageEnhancement } from "./pageEnhancements";

// Cedar Hill content-gap fix (Batch 30). Cedar Hill has 2 of 10 services
// covered in cityServiceEnhancementsDFWAdditional4.ts
// (24-hour-emergency-plumber, emergency-drain-cleaning) - confirmed via
// findstr across all src/data/*.ts that this is the only source. Facts
// below extend that content to the other 8 previously-thin services, with
// no new statistics invented. Facts reused:
// - Cedar Hill sits on a ridge in southern Dallas County, with
//   distinctive topography and a mix of older construction and newer
//   master-planned communities like Lake Ridge (a 3,400-acre development
//   on Joe Pool Lake) and Bear Creek
// - The city's elevation changes affect drainage and foundation movement
// - Expansive clay soil
// - Foundation cracks or door/window sticking can indicate soil movement
// - Older homes have original copper or galvanized supply lines and cast
//   iron sewer lines prone to root intrusion from mature trees
// Differentiated from other cities by anchoring Cedar Hill on its unique
// ridge-elevation-driven drainage and foundation-movement angle, plus its
// two named communities (Lake Ridge and Bear Creek).

export const cedarHillExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "cedar-hill/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in Cedar Hill",
    decisionIntro:
      "A main sewer line clog in Cedar Hill's older neighborhoods often relates to root intrusion into original cast iron sewer lines, while the city's ridge elevation and proximity to Joe Pool Lake can affect drainage patterns depending on which part of town your home is in.",
    decisionItems: [
      "Mention whether your home is on the ridge or near Joe Pool Lake, since drainage patterns differ",
      "Older neighborhoods should consider root intrusion into cast iron sewer lines first",
      "Note any foundation cracks or door/window sticking that could indicate soil movement",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a Cedar Hill Plumber Checks First",
    providerItems: [
      "Root intrusion likelihood given mature tree growth in older neighborhoods",
      "Cast iron sewer line condition typical of older Cedar Hill homes",
      "Drainage patterns related to the city's elevation changes and proximity to Joe Pool Lake",
      "Camera inspection findings before recommending repair",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "cedar-hill/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Cedar Hill",
    decisionIntro:
      "Cedar Hill's regional hard water contributes to mineral scale buildup in water heaters, and older homes with original copper or galvanized connections should also factor in overall unit age, while newer homes in communities like Lake Ridge or Bear Creek should confirm builder warranty coverage first.",
    decisionItems: [
      "Reduced hot water output often points to mineral scale buildup from the region's hard water",
      "Older homes with original connections should mention this, since unit age matters",
      "Newer community homeowners should confirm builder warranty terms before assuming standard repair applies",
      "Describe whether the affected unit is original to the home",
    ],
    providerTitle: "What a Cedar Hill Plumber Checks First",
    providerItems: [
      "Mineral scale buildup from the region's hard water",
      "Tank age and connection condition for homes with original copper or galvanized lines",
      "Builder warranty status for newer Lake Ridge or Bear Creek construction",
      "Venting and ignition condition appropriate to the unit type",
    ],
    safetyTitle: "Water Heater Safety",
    safetyItems: [
      "Shut off gas or electric supply if you smell gas or see sparking",
      "Don't attempt to relight a tankless unit's ignition system yourself",
      "Watch for scalding water from a malfunctioning thermostat",
    ],
  },
  "cedar-hill/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Cedar Hill",
    decisionIntro:
      "In Cedar Hill's older homes, a galvanized or copper shutoff valve can be slow to respond during a toilet overflow, while any home showing foundation cracks or door/window sticking should treat that as a sign the property's soil movement may also be affecting nearby fixtures.",
    decisionItems: [
      "Older homes should check galvanized or copper shutoff valve condition",
      "Note any foundation cracks or door/window sticking, which can indicate soil movement",
      "Newer construction homes should rule out installation issues on recently placed fixtures",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What a Cedar Hill Plumber Checks First",
    providerItems: [
      "Shutoff valve condition on original copper or galvanized supply lines",
      "Signs of soil-movement-related pipe stress near the fixture",
      "Installation quality on newer construction fixtures",
      "Whether the issue is isolated to the fixture or a broader line problem",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the blockage is cleared",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "cedar-hill/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Cedar Hill",
    decisionIntro:
      "Cedar Hill's expansive clay soil and ridge-driven elevation changes can stress and shift pipes, sometimes signaled by foundation cracks or door/window sticking before a burst, while older homes with original copper or galvanized lines are also prone to corrosion-driven failures.",
    decisionItems: [
      "Note any foundation cracks or door/window sticking noticed before the burst",
      "Older homes should suspect galvanized or copper pipe corrosion",
      "Mention whether your home is on the ridge or near Joe Pool Lake",
      "Mention your home's approximate construction era when requesting service",
    ],
    providerTitle: "What a Cedar Hill Plumber Checks First",
    providerItems: [
      "Clay-soil-related pipe stress given the city's ridge elevation and expansive soil",
      "Original galvanized or copper pipe corrosion in older homes",
      "Foundation movement indicators like cracks or door/window sticking",
      "Water shutoff and immediate damage mitigation",
    ],
    safetyTitle: "Burst Pipe Safety",
    safetyItems: [
      "Shut off the main water supply immediately",
      "Turn off electricity to any affected areas near standing water",
      "Document damage with photos before cleanup for insurance claims",
    ],
  },
  "cedar-hill/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Cedar Hill Homeowners",
    decisionIntro:
      "Sewer backups in Cedar Hill's older neighborhoods are a documented pattern tied to root intrusion into cast iron sewer lines, while the city's ridge elevation and proximity to Joe Pool Lake can be a separate factor affecting how drainage behaves in certain neighborhoods.",
    decisionItems: [
      "Homes in older, tree-heavy neighborhoods should consider root intrusion first",
      "Mention whether your home is on the ridge or near Joe Pool Lake",
      "A backup that returns quickly after clearing suggests root intrusion needing a different approach",
      "Ask whether hydro jetting is appropriate for a recurring blockage",
    ],
    providerTitle: "What a Cedar Hill Plumber Checks First",
    providerItems: [
      "Root intrusion likelihood given mature tree growth in older neighborhoods",
      "Cast iron sewer line condition typical of older Cedar Hill homes",
      "Drainage patterns related to the city's elevation changes and proximity to Joe Pool Lake",
      "Whether the blockage pattern suggests a fixture-level or main-line issue",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Avoid using water in the home until the backup is cleared",
      "Stay away from contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "cedar-hill/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Cedar Hill",
    decisionIntro:
      "Cedar Hill's older commercial buildings may share the same copper or galvanized plumbing patterns as the city's older homes, while newer commercial buildouts in communities like Lake Ridge should confirm contractor warranty coverage and account for the area's clay-soil movement.",
    decisionItems: [
      "Older commercial buildings should have aging supply and drain lines assessed periodically",
      "Newer commercial buildouts may have warranty coverage worth checking",
      "Note any foundation cracks or shifting that could indicate soil movement",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a Cedar Hill Commercial Plumber Checks First",
    providerItems: [
      "Aging supply and drain line condition in older commercial buildings",
      "Contractor warranty status for newer commercial buildouts",
      "Clay-soil-related foundation movement affecting plumbing",
      "Backflow prevention and code compliance appropriate to the building's age",
    ],
    safetyTitle: "Commercial Plumbing Safety",
    safetyItems: [
      "Shut off water to the affected fixture or area to limit damage",
      "Post appropriate signage to keep customers or employees away from hazards",
      "Document the issue for property management or insurance records",
    ],
  },
  "cedar-hill/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Cedar Hill Homeowners",
    decisionIntro:
      "Because Cedar Hill spans older ridge-area construction and newer master-planned communities like Lake Ridge and Bear Creek, a same-day plumber visit often starts by identifying which part of the city your home is in so the right diagnostic approach is ready.",
    decisionItems: [
      "Mention whether your home is on the ridge, near Joe Pool Lake, or in a newer community",
      "Note any foundation cracks or door/window sticking observed recently",
      "Ask about builder warranty coverage if in a newer community",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a Cedar Hill Plumber Confirms Before Arrival",
    providerItems: [
      "Neighborhood location and proximity to Joe Pool Lake or the ridge",
      "Signs of foundation movement affecting the property",
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
  "cedar-hill/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Cedar Hill",
    decisionIntro:
      "In Cedar Hill, sink and shower drain backups are commonly tied to mineral scale buildup from the region's hard water narrowing pipes over time, especially in older homes with original piping, while newer community homes more often see leftover construction debris.",
    decisionItems: [
      "Older homes should consider mineral scale buildup and aging fixture drain material",
      "Newer community homes should rule out leftover construction debris first",
      "Grease and soap buildup are common causes across all home eras",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a Cedar Hill Plumber Checks First",
    providerItems: [
      "Mineral scale buildup in older home drain lines",
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
