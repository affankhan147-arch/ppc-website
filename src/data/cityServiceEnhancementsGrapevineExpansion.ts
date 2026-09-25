import type { PageEnhancement } from "./pageEnhancements";

// Grapevine content-gap fix (Batch 18). Grapevine already has 2 of 10
// services covered directly in pageEnhancements.ts (24-hour-emergency-
// plumber, emergency-drain-cleaning) - the literal entries there win over
// the separate grapevine/ entries in cityServiceEnhancementsDFWAdditional.ts
// (same multi-file pattern as Grand Prairie and Mesquite). Facts below
// extend the winning content to the other 8 previously-thin services, with
// no new statistics invented. Facts reused:
// - Housing spans nearly 70 years across three distinct eras: historic
//   downtown (often pre-1980, galvanized pipe and pier-and-beam), lake-area
//   neighborhoods like Silver Lake and Dove Creek (1980s-90s, copper supply
//   lines), and newer post-2000 developments (PEX supply lines)
// - Lake-area homes face a documented pattern of accelerated copper pinhole
//   leaks from the combination of higher humidity near Lake Grapevine and
//   hard municipal water (around 246 ppm total dissolved solids)
// - Properties near Lake Grapevine or feeder creeks face elevated
//   groundwater pressure during heavy rain
// - Historic downtown homes often still have original cast-iron drain lines
//   now 45+ years old

export const grapevineExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "grapevine/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in Grapevine",
    decisionIntro:
      "A main sewer line clog in Grapevine's historic downtown often relates to original cast-iron pipe now 45+ years old, while properties near Lake Grapevine or its feeder creeks can see elevated groundwater pressure contributing to the issue, and newer post-2000 developments more commonly see construction debris in PVC mains.",
    decisionItems: [
      "Mention whether your home is historic downtown, lake-area, or a newer post-2000 development",
      "Historic downtown homes should consider cast-iron pipe deterioration first",
      "Lake or feeder-creek-adjacent properties should mention any recent heavy rain",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a Grapevine Plumber Checks First",
    providerItems: [
      "Cast-iron pipe deterioration in historic downtown-era homes",
      "Groundwater pressure effects for properties near the lake or feeder creeks",
      "Construction debris in newer post-2000 development mains",
      "Camera inspection findings before recommending repair",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "grapevine/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Grapevine",
    decisionIntro:
      "Grapevine's hard municipal water, around 246 ppm total dissolved solids, accelerates mineral scale buildup inside water heaters across all three of the city's construction eras, while historic downtown homes may also be dealing with a unit nearing the end of its service life.",
    decisionItems: [
      "Reduced hot water output often points to mineral scale buildup from Grapevine's hard water",
      "Historic downtown homes should consider the water heater's overall age as a factor",
      "A water softener can reduce future scale-related failures across any construction era",
      "Mention your home's era (historic, lake-area, or newer) when requesting service",
    ],
    providerTitle: "What a Grapevine Plumber Checks First",
    providerItems: [
      "Mineral scale buildup from the city's hard municipal water",
      "Tank age and corrosion in historic downtown-era homes",
      "Venting and ignition condition appropriate to the unit type",
      "Whether a water softener recommendation is appropriate",
    ],
    safetyTitle: "Water Heater Safety",
    safetyItems: [
      "Shut off gas or electric supply if you smell gas or see sparking",
      "Don't attempt to relight a tankless unit's ignition system yourself",
      "Watch for scalding water from a malfunctioning thermostat",
    ],
  },
  "grapevine/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Grapevine",
    decisionIntro:
      "In Grapevine's historic downtown homes, aging galvanized supply lines and shutoff valves can be slower to respond during an overflow, while properties near Lake Grapevine or its feeder creeks can occasionally see elevated groundwater pressure contribute to overflow issues during heavy rain.",
    decisionItems: [
      "Historic downtown homes should check galvanized supply line and shutoff valve condition",
      "Lake or feeder-creek-adjacent properties should note whether the overflow coincided with heavy rain",
      "Newer post-2000 homes should rule out installation issues on recently placed fixtures",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What a Grapevine Plumber Checks First",
    providerItems: [
      "Shutoff valve condition on historic downtown-era galvanized supply lines",
      "Groundwater pressure effects for lake or feeder-creek-adjacent properties",
      "Installation quality on newer post-2000 fixtures",
      "Whether the issue is isolated to the fixture or a broader line problem",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the blockage is cleared",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "grapevine/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Grapevine",
    decisionIntro:
      "Grapevine's lake-area neighborhoods like Silver Lake and Dove Creek have a documented pattern of accelerated copper pinhole leaks, driven by the combination of higher humidity near Lake Grapevine and the area's hard municipal water, while historic downtown homes face galvanized pipe corrosion and newer post-2000 developments are more likely to see a PEX fitting failure.",
    decisionItems: [
      "Lake-area copper-plumbed homes from the 1980s-90s should suspect pinhole leaks first",
      "Watch for small water stains or mineral deposits on exposed copper lines as an early warning sign",
      "Historic downtown homes should suspect galvanized pipe corrosion",
      "Newer post-2000 homes should suspect a PEX fitting failure",
    ],
    providerTitle: "What a Grapevine Plumber Checks First",
    providerItems: [
      "Copper pinhole leak patterns in lake-area 1980s-90s homes",
      "Galvanized pipe corrosion in historic downtown-era homes",
      "PEX fitting integrity in newer post-2000 construction",
      "Water shutoff and immediate damage mitigation",
    ],
    safetyTitle: "Burst Pipe Safety",
    safetyItems: [
      "Shut off the main water supply immediately",
      "Turn off electricity to any affected areas near standing water",
      "Document damage with photos before cleanup for insurance claims",
    ],
  },
  "grapevine/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Grapevine Homeowners",
    decisionIntro:
      "Sewer backups in Grapevine's historic downtown often relate to original cast-iron drain lines now 45+ years old, while properties near Lake Grapevine and its feeder creeks face elevated groundwater pressure during heavy rain that can contribute independently or alongside material deterioration.",
    decisionItems: [
      "Historic downtown homes should consider cast-iron pipe deterioration first",
      "Lake or feeder-creek-adjacent properties should note whether the backup coincided with heavy rain",
      "A backup that recurs after storms suggests groundwater pressure rather than a standard blockage",
      "A camera inspection identifies the exact cause before repairs are proposed",
    ],
    providerTitle: "What a Grapevine Plumber Checks First",
    providerItems: [
      "Cast-iron drain line condition in historic downtown-era homes",
      "Groundwater pressure effects for lake or feeder-creek-adjacent properties",
      "Root intrusion likelihood given mature tree growth in established neighborhoods",
      "Whether hydro jetting is appropriate for a recurring blockage",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Avoid using water in the home until the backup is cleared",
      "Stay away from contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "grapevine/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Grapevine",
    decisionIntro:
      "Grapevine's historic downtown commercial buildings may still have original galvanized supply lines or cast-iron drains worth assessing, while newer commercial development benefits from the same hard-water considerations affecting the rest of the city's fixtures and water heaters.",
    decisionItems: [
      "Historic downtown commercial buildings should have aging supply and drain lines assessed periodically",
      "Newer commercial buildouts may have warranty coverage worth checking",
      "Grapevine's hard water can affect commercial water heaters and fixtures regardless of building age",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a Grapevine Commercial Plumber Checks First",
    providerItems: [
      "Aging supply and drain line condition in historic downtown commercial buildings",
      "Contractor warranty status for newer commercial buildouts",
      "Mineral scale buildup in commercial water heaters and fixtures from hard water",
      "Backflow prevention and code compliance appropriate to the building's age",
    ],
    safetyTitle: "Commercial Plumbing Safety",
    safetyItems: [
      "Shut off water to the affected fixture or area to limit damage",
      "Post appropriate signage to keep customers or employees away from hazards",
      "Document the issue for property management or insurance records",
    ],
  },
  "grapevine/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Grapevine Homeowners",
    decisionIntro:
      "Because Grapevine spans three distinct construction eras - historic downtown, 1980s-90s lake-area neighborhoods, and newer post-2000 development - a same-day plumber visit often starts by identifying which of these describes your home, since each era points to a different likely cause.",
    decisionItems: [
      "Mention whether your home is historic downtown, lake-area (like Silver Lake or Dove Creek), or newer post-2000",
      "Lake-area homeowners should mention any signs of pinhole leaks, such as small water stains on copper lines",
      "Historic downtown homeowners should mention known galvanized piping if known",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a Grapevine Plumber Confirms Before Arrival",
    providerItems: [
      "Home era (historic, lake-area, or newer) and likely plumbing materials",
      "Signs of pinhole leaks for lake-area copper-plumbed homes",
      "Whether a water softener may help given the city's hard water",
      "Severity level to prioritize same-day dispatch appropriately",
    ],
    safetyTitle: "While You Wait",
    safetyItems: [
      "Shut off water to the affected fixture if safe to do so",
      "Keep documentation and photos ready for any insurance claim",
      "Avoid using the affected fixture until the plumber arrives",
    ],
  },
  "grapevine/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Grapevine",
    decisionIntro:
      "In Grapevine, sink and shower drain backups are commonly tied to mineral scale buildup from the city's hard water narrowing pipes over time across all construction eras, while historic downtown homes may also have aging cast-iron fixture drains and newer construction can see leftover debris.",
    decisionItems: [
      "All homes should consider mineral scale buildup as a factor given Grapevine's hard water",
      "Historic downtown homes should also consider aging cast-iron fixture drain material",
      "Newer post-2000 homes should rule out leftover construction debris first",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a Grapevine Plumber Checks First",
    providerItems: [
      "Mineral scale buildup from the city's hard water across all home eras",
      "Aging cast-iron fixture drain material in historic downtown homes",
      "Construction debris in drains of recently built or renovated homes",
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
