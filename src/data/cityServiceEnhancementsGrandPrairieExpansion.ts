import type { PageEnhancement } from "./pageEnhancements";

// Grand Prairie content-gap fix (Batch 16). Grand Prairie already has 2 of
// 10 services covered directly in pageEnhancements.ts (24-hour-emergency-
// plumber, emergency-drain-cleaning) - facts below extend that existing
// content to the other 8 previously-thin services, with no new statistics
// invented. Facts reused from the existing entries:
// - Grand Prairie sits partly within the Trinity River and Johnson Creek
//   floodplain zones, meaning heavy-storm groundwater pressure is a genuine
//   factor here, distinct from typical clay-soil movement alone
// - The city's rapid growth spans several distinct plumbing-material
//   generations rather than one dominant construction era
// - Blackland Prairie clay soil contributes to slab leak risk
// - Cast-iron drain lines from the 1950s-1970s era are common in older
//   sections of the city
// Note: cityServiceEnhancementsDFWAdditional.ts also has grand-prairie/24-
// hour-emergency-plumber and grand-prairie/emergency-drain-cleaning entries,
// but the literal entries in pageEnhancements.ts win in the merge order and
// are what's actually live - those (read above) are the source of facts here.

export const grandPrairieExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "grand-prairie/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in Grand Prairie",
    decisionIntro:
      "A main sewer line clog in Grand Prairie can involve groundwater infiltration during heavy storms in Trinity River or Johnson Creek floodplain-adjacent properties, cast-iron pipe deterioration in older 1950s-1970s neighborhoods, or construction debris in the city's newer growth areas.",
    decisionItems: [
      "Mention whether your property is near the Trinity River or Johnson Creek floodplain",
      "Describe whether the issue coincided with recent heavy rain",
      "Older 1950s-1970s neighborhoods should consider cast-iron pipe deterioration",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a Grand Prairie Plumber Checks First",
    providerItems: [
      "Groundwater infiltration likelihood given floodplain proximity",
      "Cast-iron drain line condition in older neighborhoods",
      "Construction-era-appropriate pipe material given the city's varied growth pattern",
      "Camera inspection findings before recommending repair",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "grand-prairie/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Grand Prairie",
    decisionIntro:
      "Because Grand Prairie's rapid growth spans several distinct plumbing-material generations, water heater age and expected failure patterns vary significantly by neighborhood era, with older 1950s-1970s homes more likely dealing with an aging unit than newer construction.",
    decisionItems: [
      "Mention your home's approximate construction era when requesting service",
      "Older 1950s-1970s homes should consider the water heater's overall age first",
      "Newer construction homes should check for tankless error codes if applicable",
      "Reduced hot water output or inconsistent temperature often points to an aging tank",
    ],
    providerTitle: "What a Grand Prairie Plumber Checks First",
    providerItems: [
      "Tank age and corrosion appropriate to the home's construction era",
      "Sediment buildup common in aging tank units from older neighborhoods",
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
  "grand-prairie/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Grand Prairie",
    decisionIntro:
      "In Grand Prairie properties near the Trinity River or Johnson Creek floodplain, elevated groundwater pressure during heavy storms can occasionally push into the sewer system and show up as a toilet overflowing without an obvious clog, which calls for different handling than a standard fixture-level blockage.",
    decisionItems: [
      "Note whether the overflow happened during or shortly after heavy rainfall",
      "Floodplain-adjacent properties with no visible clog may be experiencing groundwater pressure effects",
      "Older 1950s-1970s homes should check original supply line and shutoff valve condition",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What a Grand Prairie Plumber Checks First",
    providerItems: [
      "Whether the overflow coincides with heavy rainfall and floodplain-related groundwater pressure",
      "Shutoff valve condition on older supply lines",
      "Fixture-level clog versus broader line issue",
      "Backflow prevention status for properties with repeated storm-related issues",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the cause is identified",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "grand-prairie/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Grand Prairie",
    decisionIntro:
      "Because Grand Prairie's rapid growth spans several distinct plumbing-material generations, burst pipes here can stem from very different causes depending on your neighborhood's construction era: aging pipe corrosion in older sections, or newer fitting failures combined with Blackland Prairie clay-soil movement in more recently developed areas.",
    decisionItems: [
      "Mention your home's approximate construction era when requesting service",
      "Older neighborhoods should suspect aging pipe corrosion first",
      "Newer construction should suspect a fitting failure combined with clay-soil movement",
      "Document damage promptly for insurance purposes regardless of construction era",
    ],
    providerTitle: "What a Grand Prairie Plumber Checks First",
    providerItems: [
      "Pipe material and corrosion level appropriate to the home's construction era",
      "Clay-soil-related slab stress contributing to the failure",
      "Whether the property is in a floodplain-adjacent area with added groundwater factors",
      "Water shutoff and immediate damage mitigation",
    ],
    safetyTitle: "Burst Pipe Safety",
    safetyItems: [
      "Shut off the main water supply immediately",
      "Turn off electricity to any affected areas near standing water",
      "Document damage with photos before cleanup for insurance claims",
    ],
  },
  "grand-prairie/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Grand Prairie Homeowners",
    decisionIntro:
      "Sewer backups in Grand Prairie's Trinity River and Johnson Creek floodplain-adjacent properties often relate to groundwater infiltration during heavy storms, while older neighborhoods with cast-iron drain lines from the 1950s-1970s era face material deterioration risk regardless of weather.",
    decisionItems: [
      "Floodplain-adjacent properties should consider groundwater infiltration first, especially after heavy rain",
      "Older 1950s-1970s neighborhoods should consider cast-iron pipe deterioration",
      "A backup that recurs after storms suggests infiltration rather than a standard blockage",
      "A camera inspection identifies the exact cause before repairs are proposed",
    ],
    providerTitle: "What a Grand Prairie Plumber Checks First",
    providerItems: [
      "Groundwater infiltration likelihood given floodplain proximity",
      "Cast-iron drain line deterioration in older neighborhoods",
      "Whether backflow prevention is warranted for repeated storm-related backups",
      "Root intrusion likelihood in mature, established areas",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Avoid using water in the home until the backup is cleared",
      "Stay away from contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "grand-prairie/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Grand Prairie",
    decisionIntro:
      "Grand Prairie's commercial properties span the same varied construction eras as its housing stock, with older buildings needing aging-infrastructure assessment and floodplain-adjacent commercial properties near the Trinity River or Johnson Creek facing added groundwater-related risk during heavy storms.",
    decisionItems: [
      "Older commercial buildings should have aging supply and drain lines assessed periodically",
      "Floodplain-adjacent commercial properties should consider backflow prevention given storm-related risk",
      "Newer commercial buildouts may have warranty coverage worth checking",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a Grand Prairie Commercial Plumber Checks First",
    providerItems: [
      "Aging supply and drain line condition in older commercial buildings",
      "Backflow prevention status for floodplain-adjacent properties",
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
  "grand-prairie/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Grand Prairie Homeowners",
    decisionIntro:
      "Because Grand Prairie spans several distinct plumbing-material generations and includes floodplain-adjacent zones near the Trinity River and Johnson Creek, a same-day plumber visit often starts by identifying your neighborhood's construction era and flood-zone proximity so the right diagnostic approach is ready.",
    decisionItems: [
      "Mention your home's approximate construction era when requesting service",
      "Note whether your property is near the Trinity River or Johnson Creek floodplain",
      "Describe whether recent heavy rain coincided with the issue",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a Grand Prairie Plumber Confirms Before Arrival",
    providerItems: [
      "Neighborhood construction era and likely plumbing materials",
      "Floodplain proximity and recent storm activity",
      "Whether backflow prevention is already in place",
      "Severity level to prioritize same-day dispatch appropriately",
    ],
    safetyTitle: "While You Wait",
    safetyItems: [
      "Shut off water to the affected fixture if safe to do so",
      "Keep documentation and photos ready for any insurance claim",
      "Avoid using the affected fixture until the plumber arrives",
    ],
  },
  "grand-prairie/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Grand Prairie",
    decisionIntro:
      "In Grand Prairie's older 1950s-1970s neighborhoods, sink and shower drain backups often relate to aging cast-iron fixture drains, while newer construction and floodplain-adjacent properties can see additional factors like construction debris or storm-related groundwater effects.",
    decisionItems: [
      "Older 1950s-1970s homes should consider aging cast-iron fixture drain material as a factor",
      "Newer construction homes should rule out leftover construction debris first",
      "Floodplain-adjacent properties should note whether issues coincide with heavy rain",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a Grand Prairie Plumber Checks First",
    providerItems: [
      "Aging cast-iron fixture drain material in older 1950s-1970s homes",
      "Construction debris in drains of recently built or renovated homes",
      "Storm-related groundwater effects in floodplain-adjacent properties",
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
