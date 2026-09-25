import type { PageEnhancement } from "./pageEnhancements";

// McKinney content-gap fix (Batch 8). Facts reused from mckinney/24-hour-emergency-plumber
// and mckinney/emergency-drain-cleaning (already live): McKinney combines a historic
// downtown core (older homes, original supply lines, older sewer laterals prone to root
// intrusion from mature trees) with rapid 2000s-2020s suburban growth similar to Frisco
// (PEX fittings, new-construction settling, PVC lines less prone to root intrusion,
// construction-debris-driven backups, builder warranty relevance). No new statistics
// invented.

export const mckinneyExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "mckinney/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs Across McKinney's Two Building Eras",
    decisionIntro:
      "A main sewer line clog in McKinney plays out differently depending on the neighborhood: historic downtown properties often have older clay or cast-iron laterals vulnerable to root intrusion from mature trees, while newer outer subdivisions run PVC lines where the more likely cause is construction debris or a settling-related joint issue.",
    decisionItems: [
      "Mention whether your property is in the historic downtown core or a newer outer subdivision",
      "Downtown properties with mature trees nearby should consider root intrusion first",
      "Newer subdivision homes with a backup soon after move-in should consider leftover construction debris",
      "A camera inspection confirms the cause and avoids guesswork on either type of property",
    ],
    providerTitle: "What a McKinney Plumber Checks First",
    providerItems: [
      "Camera inspection tailored to the line material for the neighborhood's era",
      "Root intrusion risk near mature trees in historic downtown areas",
      "Construction debris or joint settlement in newer subdivision mains",
      "Cleanout access, which differs between older and newer neighborhood layouts",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "mckinney/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in McKinney's Older and Newer Homes",
    decisionIntro:
      "Historic downtown McKinney homes are more likely to run older tank-style water heaters approaching or past typical service life, while McKinney's newer suburban subdivisions, built in the same 2000s-2020s wave as Frisco, more commonly run tankless or high-efficiency units that fail differently and may still be under builder warranty.",
    decisionItems: [
      "Older tank units in historic-area homes are more prone to sediment buildup and tank corrosion",
      "Newer subdivision homes with tankless units should check for error codes before assuming a major failure",
      "Builder warranty coverage is worth checking for homes in newer McKinney subdivisions",
      "Mention your home's approximate age and neighborhood when requesting service",
    ],
    providerTitle: "What a McKinney Plumber Checks First",
    providerItems: [
      "Tank age, sediment buildup, and corrosion in older downtown-area homes",
      "Tankless error codes and scale buildup in newer subdivision installs",
      "Builder or manufacturer warranty status for newer homes",
      "Venting and ignition condition appropriate to the unit type",
    ],
    safetyTitle: "Water Heater Safety",
    safetyItems: [
      "Shut off gas or electric supply if you smell gas or see sparking",
      "Don't attempt to relight a tankless unit's ignition system yourself",
      "Watch for scalding water from a malfunctioning thermostat",
    ],
  },
  "mckinney/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies Across McKinney",
    decisionIntro:
      "In historic downtown McKinney homes, older supply lines and shutoff valves can be slower to respond during a toilet overflow, while newer suburban subdivisions typically have modern low-flow toilets that clog differently on tissue and wipes than older, higher-volume-flush fixtures.",
    decisionItems: [
      "Older downtown homes should check that supply line shutoffs still operate smoothly",
      "Newer subdivision low-flow toilets need different clearing techniques than older fixtures",
      "Note your neighborhood and approximate home age when requesting service",
      "Builder warranty may apply to toilet or supply line defects in very new subdivision homes",
    ],
    providerTitle: "What a McKinney Plumber Checks First",
    providerItems: [
      "Shutoff valve condition on older downtown-area supply lines",
      "Low-flow toilet-specific clearing methods for newer subdivisions",
      "Whether the clog is isolated to the fixture or a broader line issue",
      "Access considerations that differ across McKinney's older and newer neighborhoods",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the blockage is cleared",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "mckinney/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in McKinney's Old and New Neighborhoods",
    decisionIntro:
      "Historic downtown McKinney homes with original supply lines face burst-pipe risk from decades of aging and corrosion, while McKinney's newer subdivisions, built in the same growth wave as Frisco, more often see PEX fitting failures tied to new-construction settling in homes under a few years old.",
    decisionItems: [
      "Older downtown homes should suspect aging supply line corrosion first",
      "Newer subdivision homes under 5 years old should suspect a PEX fitting or joint failure from settling",
      "Builder warranty may cover plumbing defects in newer subdivision homes",
      "Mention your home's approximate age and neighborhood when requesting service",
    ],
    providerTitle: "What a McKinney Plumber Checks First",
    providerItems: [
      "Original supply line corrosion in historic downtown-era homes",
      "PEX manifold and fitting integrity in newer subdivision homes",
      "Whether settling-related stress caused a joint failure in newer construction",
      "Water shutoff and immediate damage mitigation regardless of neighborhood",
    ],
    safetyTitle: "Burst Pipe Safety",
    safetyItems: [
      "Shut off the main water supply immediately",
      "Turn off electricity to any affected areas near standing water",
      "Document damage with photos before cleanup for warranty or insurance claims",
    ],
  },
  "mckinney/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help Across McKinney's Historic and New Areas",
    decisionIntro:
      "Recurring sewer backups in historic downtown McKinney more often trace back to root intrusion from mature trees into older clay or cast-iron laterals, while backups in McKinney's newer outer subdivisions more commonly stem from construction debris, grease buildup, or fixture-level clogs in PVC lines that resist root intrusion.",
    decisionItems: [
      "Recurring backups in historic downtown homes should consider root intrusion first",
      "Backups appearing soon after move-in in newer subdivisions point to construction debris",
      "Grease and fixture-level clogs are common in both older and newer homes but present differently",
      "A camera inspection identifies the exact cause before repairs are proposed",
    ],
    providerTitle: "What a McKinney Plumber Checks First",
    providerItems: [
      "Root intrusion likelihood in older downtown laterals near mature trees",
      "Construction debris or grease buildup in newer subdivision PVC lines",
      "Pipe material differences between the historic core and newer growth areas",
      "Cleanout access, which varies by neighborhood layout and era",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Avoid using water in the home until the backup is cleared",
      "Stay away from contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "mckinney/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in McKinney",
    decisionIntro:
      "McKinney's commercial plumbing needs split along the same historic-versus-new-growth line as its housing: historic downtown McKinney's town square businesses often occupy older buildings with aging supply and drain infrastructure, while McKinney's newer commercial corridors serve rapidly developed retail and office space still within contractor warranty.",
    decisionItems: [
      "Historic downtown square businesses should have aging supply and drain lines assessed periodically",
      "Newer commercial buildouts may have warranty coverage worth checking before paying for repairs",
      "After-hours response matters for both downtown restaurants/retail and newer office parks",
      "Multi-tenant buildings, historic or new, may need property management coordination",
    ],
    providerTitle: "What a McKinney Commercial Plumber Checks First",
    providerItems: [
      "Aging supply and drain line condition in historic downtown commercial buildings",
      "Contractor warranty status for newer commercial buildouts",
      "Fixture-level wear from high daily customer or employee traffic",
      "Backflow prevention and code compliance appropriate to the building's age",
    ],
    safetyTitle: "Commercial Plumbing Safety",
    safetyItems: [
      "Shut off water to the affected fixture or area to limit damage",
      "Post appropriate signage to keep customers or employees away from hazards",
      "Document the issue for property management or insurance records",
    ],
  },
  "mckinney/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for McKinney Homeowners",
    decisionIntro:
      "Because McKinney spans both a historic downtown core and rapid newer suburban growth, a same-day plumber visit often starts by identifying which era your home falls into: older homes need experience with original supply lines and aging materials, while newer subdivision homes may qualify for builder warranty coverage on the same issue.",
    decisionItems: [
      "Mention whether your home is in historic downtown McKinney or a newer subdivision",
      "Newer subdivision homeowners should check builder warranty documentation before scheduling",
      "Historic downtown homeowners should mention any known original plumbing materials",
      "Same-day scheduling helps limit damage while these details are sorted out",
    ],
    providerTitle: "What a McKinney Plumber Confirms Before Arrival",
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
  "mckinney/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups Across McKinney",
    decisionIntro:
      "In historic downtown McKinney homes, sink and shower drain backups are more likely tied to aging galvanized or cast-iron fixture drains, while McKinney's newer suburban subdivisions more commonly see construction debris, grease, or low-flow-fixture-related clogs typical of recent construction.",
    decisionItems: [
      "Older downtown homes should consider aging fixture drain material as a factor",
      "Homes finished within the last few years should rule out leftover construction debris first",
      "Grease and soap buildup are common causes in both older and newer kitchens",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a McKinney Plumber Checks First",
    providerItems: [
      "Aging fixture drain material in historic downtown-area homes",
      "Construction debris in drains of recently built or renovated subdivision homes",
      "Grease and soap buildup in kitchen lines regardless of neighborhood",
      "Whether the issue is isolated to one fixture or affects multiple drains",
    ],
    safetyTitle: "Drain Backup Safety",
    safetyItems: [
      "Avoid chemical drain cleaners, which can damage older pipe materials and newer PEX/PVC fittings alike",
      "Stop using the affected fixture until the clog is cleared",
      "Watch for water damage under sinks or around shower bases",
    ],
  },
};
