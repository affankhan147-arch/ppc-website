import type { PageEnhancement } from "./pageEnhancements";

// Austin content-gap fix (Batch 10). Austin already has 2 of 10 services
// covered in cityServiceEnhancementsTexas.ts (24-hour-emergency-plumber,
// emergency-drain-cleaning) - facts below extend that existing content to
// the other 8 previously-thin services, with no new statistics invented.
// Facts reused from the existing Texas-file entries:
// - Austin's rapid growth means a mix of older homes with outdated plumbing
//   and new construction with unfamiliar systems
// - Austin's limestone bedrock and hard water lead to mineral buildup in
//   pipes, a common cause of frequent clogs
// - New development strains the city's drainage systems

export const austinExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "austin/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in Austin",
    decisionIntro:
      "A main sewer line clog in Austin often relates to mineral scale buildup from the region's hard water narrowing older lines over time, root intrusion into older neighborhood laterals, or construction debris in the newer developments straining Austin's rapidly growing drainage system.",
    decisionItems: [
      "Mention whether your home is older with original plumbing or newer construction",
      "Older homes should consider mineral scale buildup or root intrusion first",
      "Newer development homes with a recent backup should consider construction debris",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What an Austin Plumber Checks First",
    providerItems: [
      "Mineral scale buildup common with Austin's hard water",
      "Root intrusion in older neighborhood laterals",
      "Construction debris in newer development mains",
      "Camera inspection findings before recommending repair",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "austin/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Austin",
    decisionIntro:
      "Austin's hard water and limestone bedrock lead to mineral scale buildup inside water heaters, which shortens tank lifespan and can cause tankless units in newer homes to throw error codes, while older homes with outdated plumbing may also be dealing with an aging unit nearing the end of its service life.",
    decisionItems: [
      "Reduced hot water output often points to mineral scale buildup in the tank or heat exchanger",
      "Older homes with outdated plumbing should consider the water heater's overall age",
      "Newer homes with tankless units should check for error codes from scale buildup",
      "A water softener can reduce future scale-related failures",
    ],
    providerTitle: "What an Austin Plumber Checks First",
    providerItems: [
      "Mineral scale buildup in tank or tankless units",
      "Overall unit age and condition, especially in older homes",
      "Tankless error codes tied to hard water scale",
      "Venting and ignition condition appropriate to the unit type",
    ],
    safetyTitle: "Water Heater Safety",
    safetyItems: [
      "Shut off gas or electric supply if you smell gas or see sparking",
      "Don't attempt to relight a tankless unit's ignition system yourself",
      "Watch for scalding water from a malfunctioning thermostat",
    ],
  },
  "austin/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Austin",
    decisionIntro:
      "In Austin, mineral buildup from hard water can affect fill valves and flappers over time, leading to running or overflowing toilets, and this shows up differently in older homes with original fixtures versus newer construction with unfamiliar modern toilet systems.",
    decisionItems: [
      "Mention whether your home has original older fixtures or newer installed toilets",
      "Mineral buildup on the fill valve or flapper is a common cause of overflow in hard water areas",
      "Older homes should check supply line and shutoff valve condition",
      "Newer construction homes should rule out installation issues on recently placed fixtures",
    ],
    providerTitle: "What an Austin Plumber Checks First",
    providerItems: [
      "Mineral buildup on fill valves and flappers from hard water",
      "Shutoff valve condition on older supply lines",
      "Installation quality on newer fixtures",
      "Whether the issue is isolated to the fixture or a broader line problem",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the blockage is cleared",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "austin/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Austin",
    decisionIntro:
      "Austin's mix of older homes with outdated plumbing and rapid new construction means burst pipes here come from two different directions: aging original pipe material corroding over decades in older homes, or fitting failures in modern PEX systems installed during the city's fast growth.",
    decisionItems: [
      "Older homes with outdated plumbing should suspect aging pipe corrosion first",
      "Newer construction homes should suspect a fitting or joint failure in modern PEX systems",
      "Mineral scale buildup from hard water can also weaken older pipe walls over time",
      "Mention your home's approximate age when requesting service",
    ],
    providerTitle: "What an Austin Plumber Checks First",
    providerItems: [
      "Original pipe material and corrosion level in older homes",
      "PEX manifold and fitting integrity in newer construction",
      "Mineral scale contribution to pipe wall weakening",
      "Water shutoff and immediate damage mitigation",
    ],
    safetyTitle: "Burst Pipe Safety",
    safetyItems: [
      "Shut off the main water supply immediately",
      "Turn off electricity to any affected areas near standing water",
      "Document damage with photos before cleanup for insurance claims",
    ],
  },
  "austin/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Austin Homeowners",
    decisionIntro:
      "Sewer backups in Austin often stem from mineral scale buildup and root intrusion in older neighborhood lines, or from new development straining the city's drainage system in rapidly growing areas, and hard water conditions can accelerate scale buildup in either case.",
    decisionItems: [
      "Recurring backups in older homes should consider mineral scale or root intrusion first",
      "Backups in newer developments may point to a drainage system still adjusting to rapid growth",
      "A camera inspection identifies the exact cause before repairs are proposed",
      "A water softener can help reduce future mineral-related buildup",
    ],
    providerTitle: "What an Austin Plumber Checks First",
    providerItems: [
      "Mineral scale buildup and root intrusion in older lines",
      "Drainage system capacity issues in newer developments",
      "Pipe material differences between older and newer neighborhoods",
      "Cleanout access appropriate to the property's era",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Avoid using water in the home until the backup is cleared",
      "Stay away from contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "austin/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Austin",
    decisionIntro:
      "Austin's rapid commercial growth means a mix of older downtown buildings with aging supply and drain lines and newly built offices and retail space still within contractor warranty, and hard water mineral buildup affects fixtures in both older and newer commercial buildings alike.",
    decisionItems: [
      "Older downtown commercial buildings should have aging supply and drain lines assessed periodically",
      "Newer commercial buildouts may have warranty coverage worth checking before paying for repairs",
      "Hard water mineral buildup can affect fixtures and water heaters regardless of building age",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What an Austin Commercial Plumber Checks First",
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
  "austin/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Austin Homeowners",
    decisionIntro:
      "Because Austin's housing mixes older homes with outdated plumbing and rapidly built newer construction, a same-day plumber visit often starts by narrowing down whether your issue relates to aging original materials, hard water mineral buildup, or a newer system still under warranty.",
    decisionItems: [
      "Mention whether your home has older, original plumbing or newer installed systems",
      "Note if you've noticed mineral buildup or scale on fixtures",
      "Newer construction homeowners should check builder warranty documentation before scheduling",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What an Austin Plumber Confirms Before Arrival",
    providerItems: [
      "Home age and likely plumbing materials",
      "Hard water scale buildup relevant to the issue",
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
  "austin/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Austin",
    decisionIntro:
      "In Austin, sink and shower drain backups are commonly tied to mineral scale buildup from hard water narrowing pipes over time, especially in older homes, while newer construction homes more often see grease, soap, or leftover construction debris as the cause.",
    decisionItems: [
      "Older homes should consider mineral scale buildup as a factor in slow or blocked drains",
      "Homes finished within the last few years should rule out leftover construction debris first",
      "Grease and soap buildup are common causes in both older and newer kitchens",
      "A water softener can help reduce future scale-related drain issues",
    ],
    providerTitle: "What an Austin Plumber Checks First",
    providerItems: [
      "Mineral scale buildup in older home drain lines",
      "Construction debris in drains of recently built or renovated homes",
      "Grease and soap buildup in kitchen lines regardless of home age",
      "Whether the issue is isolated to one fixture or affects multiple drains",
    ],
    safetyTitle: "Drain Backup Safety",
    safetyItems: [
      "Avoid chemical drain cleaners, which can worsen mineral buildup and damage fittings",
      "Stop using the affected fixture until the clog is cleared",
      "Watch for water damage under sinks or around shower bases",
    ],
  },
};
