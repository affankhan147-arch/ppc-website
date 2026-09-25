import type { PageEnhancement } from "./pageEnhancements";

// Southlake content-gap fix (Batch 23). Southlake already has 2 of 10
// services covered directly in pageEnhancements.ts (24-hour-emergency-plumber,
// emergency-drain-cleaning) - the literal entries there win over the
// separate southlake/ entries in cityServiceEnhancementsDFWAdditional2.ts
// (same multi-file pattern seen for several recent cities, confirmed via
// findstr across all src/data/*.ts before writing). Facts below extend the
// winning content to the other 8 previously-thin services, with no new
// statistics invented. Facts reused:
// - Larger custom and estate homes with more fixtures, multiple water
//   heaters, and multi-zone plumbing systems
// - Notably hard regional water, 15 to 25 grains per gallon (shared with
//   nearby Keller)
// - Documented gas line capacity considerations tied to the broader
//   Keller/Southlake outdoor-kitchen and appliance boom
// - Extended drain runs and multiple bathroom wings typical of larger
//   custom-built properties
// Differentiated from Keller's batch by anchoring on Southlake's
// larger-home/multi-zone-system angle rather than Keller's specific
// neighborhood construction eras, while still crediting the shared
// regional hard-water and gas-capacity facts to their true scope.

export const southlakeExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "southlake/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in Southlake",
    decisionIntro:
      "Southlake's larger custom and estate homes often have extended drain runs feeding a single main sewer line, meaning a clog can be harder to pinpoint without first identifying which wing or section is contributing to it.",
    decisionItems: [
      "Mention your home's approximate size and layout, since larger Southlake homes often have separate drain runs feeding the main line",
      "Note whether the clog affects the whole home or seems tied to one wing or section",
      "Ask whether the provider maps out which drain run is affected before beginning work",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a Southlake Plumber Checks First",
    providerItems: [
      "Which specific drain run or wing is contributing to the main line clog",
      "Extended drain line length and routing typical of larger custom-built properties",
      "Whether the issue is isolated to one section or indicates a broader system concern",
      "Camera inspection findings before recommending repair scope",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "southlake/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Southlake",
    decisionIntro:
      "Southlake's larger custom and estate homes commonly run multiple water heaters, so a single-unit emergency needs to be diagnosed against the whole system, and the region's notably hard water (15-25 grains per gallon) accelerates mineral scale buildup across every unit.",
    decisionItems: [
      "Mention if your home has multiple water heaters, common in Southlake's larger custom homes",
      "Reduced hot water output in one zone often points to mineral scale buildup in that specific unit",
      "Ask whether the provider has experience diagnosing multi-unit water heater systems",
      "Periodic flushing across all units can help limit scale buildup",
    ],
    providerTitle: "What a Southlake Plumber Checks First",
    providerItems: [
      "Which specific water heater or zone is affected in a multi-unit system",
      "Mineral scale buildup from the region's notably hard water",
      "Tank age and condition for each unit separately",
      "Venting and ignition condition appropriate to the unit type",
    ],
    safetyTitle: "Water Heater Safety",
    safetyItems: [
      "Shut off gas or electric supply if you smell gas or see sparking",
      "Don't attempt to relight a tankless unit's ignition system yourself",
      "Watch for scalding water from a malfunctioning thermostat",
    ],
  },
  "southlake/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Southlake",
    decisionIntro:
      "In Southlake's larger custom homes, a toilet overflow in one wing may not be immediately noticed elsewhere in the house, and mineral scale from the region's notably hard water can also cause a shutoff valve to stick or respond slowly during the emergency.",
    decisionItems: [
      "Mention which wing or section of the home is affected",
      "Note whether the shutoff valve felt stuck or slow to close, a possible sign of hard-water scale",
      "Ask whether other fixtures in the same zone are affected",
      "Larger homes should confirm someone checks other wings for related issues",
    ],
    providerTitle: "What a Southlake Plumber Checks First",
    providerItems: [
      "Which wing or zone the affected fixture is part of",
      "Mineral scale effects on shutoff valve and fill valve function",
      "Whether other fixtures in the same zone show related symptoms",
      "Whether the issue is isolated to the fixture or a broader zone problem",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the blockage is cleared",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "southlake/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Southlake",
    decisionIntro:
      "In Southlake's larger custom homes, a burst pipe may be isolated to one zone of a multi-zone plumbing system, and homes with an outdoor kitchen or added gas appliance should also flag whether the broader area's documented gas line capacity considerations could be related.",
    decisionItems: [
      "Mention which wing or zone the burst appears to be in, since larger homes often have separate plumbing zones",
      "Homes with a recently added outdoor kitchen or pool heater should mention this",
      "Note whether other zones of the home are still functioning normally",
      "Larger homes should confirm the main shutoff and any zone-specific shutoffs are both addressed",
    ],
    providerTitle: "What a Southlake Plumber Checks First",
    providerItems: [
      "Which specific zone of a multi-zone system is affected",
      "Gas line capacity if a recent outdoor appliance addition is nearby",
      "Whether the main shutoff or a zone-specific shutoff is the right point of control",
      "Water shutoff and immediate damage mitigation",
    ],
    safetyTitle: "Burst Pipe Safety",
    safetyItems: [
      "Shut off the main water supply immediately",
      "Turn off electricity to any affected areas near standing water",
      "Document damage with photos before cleanup for insurance claims",
    ],
  },
  "southlake/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Southlake Homeowners",
    decisionIntro:
      "Sewer backups in Southlake's larger custom homes often trace to one specific drain run or bathroom wing rather than the whole system, making it genuinely useful to identify which section is affected before any clearing work begins.",
    decisionItems: [
      "Mention which bathroom wing or section of the home is affected",
      "Note whether the backup seems isolated to one run or affects the whole home",
      "A backup that returns quickly after clearing suggests a deeper issue in that specific run",
      "Ask whether hydro jetting is appropriate for a recurring blockage in that section",
    ],
    providerTitle: "What a Southlake Plumber Checks First",
    providerItems: [
      "Which specific drain run or wing is affected",
      "Extended drain line length and routing typical of larger custom-built properties",
      "Whether hydro jetting or standard snaking is the better approach for that section",
      "Whether the blockage pattern suggests a fixture-level or main-line issue",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Avoid using water in the home until the backup is cleared",
      "Stay away from contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "southlake/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Southlake",
    decisionIntro:
      "Southlake's upscale commercial properties often have larger, multi-zone plumbing systems similar to the city's larger custom homes, and properties with outdoor amenities or gas-fed equipment should also consider the broader area's documented gas line capacity considerations.",
    decisionItems: [
      "Mention if your property has a multi-zone or larger-capacity plumbing system",
      "Note whether your property has outdoor gas-fed equipment or amenities",
      "Ask whether the provider has experience with larger commercial-scale systems",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a Southlake Commercial Plumber Checks First",
    providerItems: [
      "Which zone or section of a larger commercial system is affected",
      "Gas line capacity for properties with outdoor gas-fed equipment or amenities",
      "Mineral scale buildup in commercial water heaters and fixtures from the region's hard water",
      "Backflow prevention and code compliance appropriate to the building's age",
    ],
    safetyTitle: "Commercial Plumbing Safety",
    safetyItems: [
      "Shut off water to the affected fixture or area to limit damage",
      "Post appropriate signage to keep customers or employees away from hazards",
      "Document the issue for property management or insurance records",
    ],
  },
  "southlake/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Southlake Homeowners",
    decisionIntro:
      "Because Southlake's larger custom homes often have multiple water heaters, multi-zone systems, and extended drain runs, a same-day plumber visit often starts by identifying which wing or zone is affected so the right diagnostic approach is ready.",
    decisionItems: [
      "Mention which wing or zone of the home is affected",
      "Note if your home has multiple water heaters or a multi-zone system",
      "Ask about gas line capacity assessment if a new outdoor appliance addition may be connected",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a Southlake Plumber Confirms Before Arrival",
    providerItems: [
      "Home size, zone layout, and number of water heaters",
      "Which specific wing or zone is affected",
      "Recent gas appliance additions and possible capacity strain",
      "Severity level to prioritize same-day dispatch appropriately",
    ],
    safetyTitle: "While You Wait",
    safetyItems: [
      "Shut off water to the affected fixture or zone if safe to do so",
      "Keep documentation and photos ready for any insurance claim",
      "Avoid using the affected fixture until the plumber arrives",
    ],
  },
  "southlake/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Southlake",
    decisionIntro:
      "In Southlake's larger custom homes, sink and shower drain backups are often isolated to one bathroom wing rather than the whole system, while mineral scale from the region's notably hard water narrows pipes over time across every wing.",
    decisionItems: [
      "Mention which bathroom wing or section of the home is affected",
      "Mineral scale buildup from the region's notably hard water is a common factor regardless of wing",
      "Note whether other fixtures in the same zone show similar slowing",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a Southlake Plumber Checks First",
    providerItems: [
      "Which specific wing or zone is affected",
      "Mineral scale buildup from the region's notably hard water",
      "Whether other fixtures in the same zone show related symptoms",
      "Whether the issue is isolated to one fixture or affects multiple drains in a zone",
    ],
    safetyTitle: "Drain Backup Safety",
    safetyItems: [
      "Avoid chemical drain cleaners, which can worsen mineral buildup and damage pipe materials",
      "Stop using the affected fixture until the clog is cleared",
      "Watch for water damage under sinks or around shower bases",
    ],
  },
};
