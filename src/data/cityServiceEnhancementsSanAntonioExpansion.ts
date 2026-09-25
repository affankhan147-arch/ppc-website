import type { PageEnhancement } from "./pageEnhancements";

// San Antonio content-gap fix (Batch 11 - final priority-1 city). San Antonio
// already has 2 of 10 services covered in cityServiceEnhancementsTexas.ts
// (24-hour-emergency-plumber, emergency-drain-cleaning) - facts below extend
// that existing content to the other 8 previously-thin services, with no new
// statistics invented. Facts reused from the existing Texas-file entries:
// - San Antonio blends historic homes with expanding newer suburbs
// - Limestone soil can cause foundations to shift, stressing pipes
// - The city has aging sewer systems and frequent rainfall contributing to
//   backups

export const sanAntonioExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "san-antonio/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in San Antonio",
    decisionIntro:
      "A main sewer line clog in San Antonio often relates to San Antonio's aging sewer system and older lines in historic neighborhoods, where root intrusion and deterioration are more likely, while newer suburban developments more commonly see construction debris or joint issues from limestone-soil foundation shift.",
    decisionItems: [
      "Mention whether your home is in a historic neighborhood or a newer suburb",
      "Historic-area homes should consider root intrusion or aging pipe deterioration first",
      "Newer suburban homes should consider construction debris or foundation-shift-related joint issues",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a San Antonio Plumber Checks First",
    providerItems: [
      "Root intrusion and deterioration in older historic-area lines",
      "Construction debris or joint misalignment in newer suburban mains",
      "Foundation shift effects on underground line position",
      "Camera inspection findings before recommending repair",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "san-antonio/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in San Antonio",
    decisionIntro:
      "San Antonio's mix of historic homes and newer suburbs means water heater emergencies vary by neighborhood: older homes are more likely dealing with an aging tank nearing the end of its service life, while newer suburban homes more commonly run modern tankless or high-efficiency units.",
    decisionItems: [
      "Older historic-area homes should consider the water heater's overall age first",
      "Newer suburban homes with tankless units should check for error codes before assuming a major failure",
      "Foundation shift in either type of home can occasionally affect nearby supply line connections",
      "Mention your home's approximate age and neighborhood when requesting service",
    ],
    providerTitle: "What a San Antonio Plumber Checks First",
    providerItems: [
      "Tank age and corrosion in historic-area homes",
      "Tankless error codes and scale buildup in newer suburban installs",
      "Supply line connection integrity near the unit",
      "Venting and ignition condition appropriate to the unit type",
    ],
    safetyTitle: "Water Heater Safety",
    safetyItems: [
      "Shut off gas or electric supply if you smell gas or see sparking",
      "Don't attempt to relight a tankless unit's ignition system yourself",
      "Watch for scalding water from a malfunctioning thermostat",
    ],
  },
  "san-antonio/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in San Antonio",
    decisionIntro:
      "San Antonio's aging sewer system can occasionally struggle to keep up during heavy rainfall, and in some cases this shows up as a toilet overflowing without an obvious clog, which calls for different handling than a straightforward fixture-level blockage.",
    decisionItems: [
      "Note whether the overflow happened during or shortly after heavy rainfall",
      "An overflow with no clog present may point to aging sewer system capacity rather than a home plumbing issue",
      "Historic-area homes should check original supply line and shutoff valve condition",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What a San Antonio Plumber Checks First",
    providerItems: [
      "Whether the overflow coincides with heavy rainfall and aging sewer system capacity",
      "Shutoff valve condition on older historic-area supply lines",
      "Fixture-level clog versus broader line issue",
      "Newer suburban fixture installation quality where relevant",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the cause is identified",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "san-antonio/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in San Antonio",
    decisionIntro:
      "San Antonio's limestone soil can cause foundations to shift, stressing both older original pipes in historic homes and newer PEX systems in expanding suburbs, though the failure looks different in each: aging corrosion versus a settling-related fitting failure.",
    decisionItems: [
      "Historic-area homes should suspect aging pipe corrosion combined with foundation shift stress",
      "Newer suburban homes should suspect a PEX fitting or joint failure from foundation shift",
      "Mention any known history of foundation movement or repair on your property",
      "Document damage promptly for insurance purposes regardless of neighborhood",
    ],
    providerTitle: "What a San Antonio Plumber Checks First",
    providerItems: [
      "Original pipe corrosion combined with limestone-soil foundation shift in historic homes",
      "PEX manifold and fitting integrity in newer suburban construction",
      "Foundation movement history relevant to the failure point",
      "Water shutoff and immediate damage mitigation",
    ],
    safetyTitle: "Burst Pipe Safety",
    safetyItems: [
      "Shut off the main water supply immediately",
      "Turn off electricity to any affected areas near standing water",
      "Document damage with photos before cleanup for insurance claims",
    ],
  },
  "san-antonio/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for San Antonio Homeowners",
    decisionIntro:
      "Sewer backups in San Antonio often trace back to San Antonio's aging sewer system and root intrusion in older historic-area laterals, or to limestone-soil foundation shift affecting newer suburban lines, with heavy rainfall adding to backup risk in either case.",
    decisionItems: [
      "Recurring backups in historic-area homes should consider root intrusion or aging pipe deterioration first",
      "Backups in newer suburban homes may relate to foundation-shift-related line stress",
      "Backups appearing during or after heavy rainfall may point to aging sewer system capacity",
      "A camera inspection identifies the exact cause before repairs are proposed",
    ],
    providerTitle: "What a San Antonio Plumber Checks First",
    providerItems: [
      "Root intrusion and deterioration in older historic-area lines",
      "Foundation-shift-related line stress in newer suburban homes",
      "Timing relative to recent heavy rainfall",
      "Cleanout access appropriate to the property's era",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Avoid using water in the home until the backup is cleared",
      "Stay away from contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "san-antonio/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in San Antonio",
    decisionIntro:
      "San Antonio's mix of historic downtown commercial buildings, including those near the River Walk, and newer suburban retail and office corridors means commercial plumbing emergencies here range from aging-infrastructure failures to fixture wear from high daily traffic in newer construction.",
    decisionItems: [
      "Historic downtown commercial buildings should have aging supply and drain lines assessed periodically",
      "Newer suburban commercial buildouts may have warranty coverage worth checking before paying for repairs",
      "High-traffic tourist and retail areas see more frequent fixture-level issues from volume alone",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a San Antonio Commercial Plumber Checks First",
    providerItems: [
      "Aging supply and drain line condition in historic downtown buildings",
      "Contractor warranty status for newer suburban commercial buildouts",
      "Fixture-level wear from high daily traffic",
      "Backflow prevention and code compliance appropriate to the building's age",
    ],
    safetyTitle: "Commercial Plumbing Safety",
    safetyItems: [
      "Shut off water to the affected fixture or area to limit damage",
      "Post appropriate signage to keep customers or employees away from hazards",
      "Document the issue for property management or insurance records",
    ],
  },
  "san-antonio/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for San Antonio Homeowners",
    decisionIntro:
      "Because San Antonio blends historic homes with expanding newer suburbs, a same-day plumber visit often starts by identifying which type of property you have: historic homes need experience with aging original materials, while newer suburban homes may qualify for builder warranty coverage.",
    decisionItems: [
      "Mention whether your home is in a historic neighborhood or a newer suburb",
      "Historic-area homeowners should mention any known original plumbing materials",
      "Newer suburban homeowners should check builder warranty documentation before scheduling",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a San Antonio Plumber Confirms Before Arrival",
    providerItems: [
      "Neighborhood era and likely plumbing materials for the property",
      "Whether the issue may fall under an existing builder or manufacturer warranty",
      "System type to bring the right parts and tools for older or newer homes",
      "Severity level to prioritize same-day dispatch appropriately",
    ],
    safetyTitle: "While You Wait",
    safetyItems: [
      "Shut off water to the affected fixture if safe to do so",
      "Keep documentation and photos ready for any warranty claim",
      "Avoid using the affected fixture until the plumber arrives",
    ],
  },
  "san-antonio/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in San Antonio",
    decisionIntro:
      "In San Antonio's historic-area homes, sink and shower drain backups are more likely tied to aging fixture drain materials and general pipe deterioration, while newer suburban homes more commonly see construction debris, grease, or fixture-level clogs typical of recent construction.",
    decisionItems: [
      "Historic-area homes should consider aging fixture drain material as a factor",
      "Homes finished within the last few years should rule out leftover construction debris first",
      "Grease and soap buildup are common causes in both older and newer kitchens",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a San Antonio Plumber Checks First",
    providerItems: [
      "Aging fixture drain material in historic-area homes",
      "Construction debris in drains of recently built or renovated suburban homes",
      "Grease and soap buildup in kitchen lines regardless of neighborhood",
      "Whether the issue is isolated to one fixture or affects multiple drains",
    ],
    safetyTitle: "Drain Backup Safety",
    safetyItems: [
      "Avoid chemical drain cleaners, which can damage older pipe materials and newer fittings alike",
      "Stop using the affected fixture until the clog is cleared",
      "Watch for water damage under sinks or around shower bases",
    ],
  },
};
