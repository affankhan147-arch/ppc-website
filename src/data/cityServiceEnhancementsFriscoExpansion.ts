import type { PageEnhancement } from "./pageEnhancements";

// Frisco content-gap fix (Batch 7). Facts reused from frisco/24-hour-emergency-plumber
// and frisco/emergency-drain-cleaning (already live): overwhelmingly 2000s-2020s
// construction with modern PEX plumbing (not aging copper); new-construction settling
// issues common in homes under 5 years old; dense HOA-governed subdivisions affecting
// access/shutoff coordination; tankless/high-efficiency water heaters common in newer
// builds; builder-warranty documentation relevance; PVC sewer lines far less prone to
// root intrusion than older DFW cities; drain backups more often construction debris,
// grease, or fixture-level clogs than root intrusion; shared HOA subdivision drain
// infrastructure. No new statistics invented.

export const friscoExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "frisco/main-sewer-line-clog": {
    decisionTitle: "Why Main Sewer Line Clogs Happen Differently in Frisco",
    decisionIntro:
      "Frisco's newer PVC sewer lines resist root intrusion far better than the older clay and cast-iron laterals common in Dallas or Fort Worth, so a slow-draining or backed-up main line in Frisco more often traces back to leftover construction debris settled in the line since the original build, a misaligned or offset joint from soil settlement in a newer subdivision, or a fixture-level clog working its way toward the main.",
    decisionItems: [
      "Multiple fixtures backing up at once still points to the main line, not a single drain",
      "Homes finished within the last 1-3 years should check for leftover construction debris (drywall, adhesive, wood scraps) before assuming a structural issue",
      "Newer subdivisions with recent grading work can see joint misalignment from soil settlement",
      "A sewer camera inspection confirms the cause before any digging is proposed",
    ],
    providerTitle: "What a Frisco Plumber Checks First",
    providerItems: [
      "Camera inspection of the PVC main to rule out debris vs. joint separation",
      "Cleanout location relative to the home's original builder plumbing plan",
      "Whether the issue is isolated to one home or a shared subdivision line",
      "HOA notification requirements before any exterior excavation",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "frisco/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Frisco's Newer Homes",
    decisionIntro:
      "Because Frisco's housing stock is overwhelmingly 2000s-2020s construction, most homes run tankless or high-efficiency water heaters rather than older tank units, and those units fail differently: ignition or venting faults, mineral scale buildup in the heat exchanger, and error-code shutdowns are more common here than the tank corrosion and sediment buildup seen in older DFW cities.",
    decisionItems: [
      "Tankless units often display an error code before shutting down completely",
      "No hot water with an intact pilot/ignition light suggests a flow sensor or scale issue",
      "Homes under builder warranty may have water heater coverage worth checking before paying out of pocket",
      "Venting issues are more common in tankless installs than in older tank setups",
    ],
    providerTitle: "What a Frisco Plumber Checks First",
    providerItems: [
      "Tankless error code diagnosis before recommending replacement",
      "Mineral scale buildup common with Frisco's water hardness",
      "Whether the unit is still covered under builder or manufacturer warranty",
      "Gas or electric supply issues feeding the unit",
    ],
    safetyTitle: "Water Heater Safety",
    safetyItems: [
      "Shut off the gas or electric supply if you smell gas or see sparking",
      "Don't attempt to relight a tankless unit's ignition system yourself",
      "Watch for scalding water from a malfunctioning thermostat",
    ],
  },
  "frisco/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Frisco's Dense Subdivisions",
    decisionIntro:
      "Frisco's dense, HOA-governed subdivisions mean toilet overflow issues can involve shared subdivision drain lines feeding multiple homes, and newer low-flow, water-saving toilets common in recent construction are more prone to clogging on tissue and wipes than older, higher-volume-flush models.",
    decisionItems: [
      "A single overflowing toilet is usually isolated; multiple homes affected points to a shared subdivision line",
      "Low-flow toilets in newer builds need different clearing techniques than older high-volume models",
      "Check HOA guidelines before any exterior cleanout access in shared easements",
      "Builder warranty may cover toilet or supply line defects in very new homes",
    ],
    providerTitle: "What a Frisco Plumber Checks First",
    providerItems: [
      "Whether the clog is isolated to the fixture or the shared line",
      "Low-flow toilet-specific clearing methods",
      "Supply line and shutoff valve condition on newer fixtures",
      "HOA access requirements for shared subdivision infrastructure",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the blockage is cleared",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "frisco/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Frisco's New Construction",
    decisionIntro:
      "Unlike older DFW cities where burst pipes usually come from decades of copper corrosion, Frisco's predominantly PEX plumbing tends to fail at connection fittings during the new-construction settling period in the first few years, when foundation and soil settling can stress joints that were fine at installation.",
    decisionItems: [
      "Homes under 5 years old should suspect a fitting failure at a joint or manifold connection first",
      "New-construction settling can stress supply lines even when materials are sound",
      "Builder warranty may cover plumbing defects discovered in the first 1-2 years",
      "A pinhole leak in PEX is far less common than in old copper, so a sudden burst usually means a joint or fitting failure",
    ],
    providerTitle: "What a Frisco Plumber Checks First",
    providerItems: [
      "PEX manifold and fitting integrity near the point of failure",
      "Whether settling-related stress caused the joint failure",
      "Builder warranty documentation and timeline",
      "Water shutoff and immediate damage mitigation",
    ],
    safetyTitle: "Burst Pipe Safety",
    safetyItems: [
      "Shut off the main water supply immediately",
      "Turn off electricity to any affected areas near standing water",
      "Document damage with photos before cleanup for warranty or insurance claims",
    ],
  },
  "frisco/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Frisco Homeowners",
    decisionIntro:
      "Frisco's newer PVC sewer lines are far more resistant to root intrusion than the older clay and cast-iron lines found elsewhere in DFW, so a recurring sewer backup here more often points to construction debris left over from the original build, grease buildup, or fixture-level clogs, and dense HOA subdivisions can also mean a shared line issue affecting more than one home.",
    decisionItems: [
      "Recurring backups in a home under 5 years old should first rule out leftover construction debris",
      "Grease and fixture-level clogs are more common causes here than root intrusion",
      "Multiple affected homes in the same subdivision suggests a shared infrastructure issue",
      "A camera inspection identifies the exact cause before repairs are proposed",
    ],
    providerTitle: "What a Frisco Plumber Checks First",
    providerItems: [
      "Camera inspection of the PVC line for debris or grease buildup",
      "Whether neighboring homes are experiencing the same issue",
      "Cleanout access per the original builder plumbing plan",
      "HOA coordination for shared subdivision drain lines",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Avoid using water in the home until the backup is cleared",
      "Stay away from contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "frisco/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Frisco",
    decisionIntro:
      "Frisco's rapid commercial growth around corporate campuses, The Star, and retail centers like Stonebriar Centre means commercial plumbing emergencies here often involve newer building systems still within builder or contractor warranty, high-traffic restroom fixtures under heavy daily use, and after-hours response needs for offices and retail that keep extended hours.",
    decisionItems: [
      "Newer commercial buildouts may have warranty coverage worth checking before paying for repairs",
      "High-traffic retail and office restrooms see more frequent fixture-level issues from volume alone",
      "After-hours and weekend response matters for retail centers and office campuses with extended hours",
      "Multi-tenant buildings may need coordination with property management before access",
    ],
    providerTitle: "What a Frisco Commercial Plumber Checks First",
    providerItems: [
      "Whether the building or fixtures are still under contractor warranty",
      "Fixture-level wear from high daily traffic volume",
      "Property management or tenant coordination requirements",
      "Backflow prevention and code compliance for commercial systems",
    ],
    safetyTitle: "Commercial Plumbing Safety",
    safetyItems: [
      "Shut off water to the affected fixture or area to limit damage",
      "Post appropriate signage to keep customers or employees away from hazards",
      "Document the issue for property management or insurance records",
    ],
  },
  "frisco/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Frisco Homeowners",
    decisionIntro:
      "Many Frisco homeowners are in homes still under builder or manufacturer warranty, so a same-day plumber visit often starts by helping determine whether an issue is a covered warranty repair or an out-of-pocket fix, especially for newer homeowners handling their first plumbing issue in a recently built home.",
    decisionItems: [
      "Check builder warranty documentation before scheduling repairs on a home under 1-2 years old",
      "Newer PEX and tankless systems often need different diagnostic steps than older tank/copper systems",
      "HOA-governed subdivisions may have access considerations for exterior work",
      "Same-day scheduling helps limit water damage while warranty questions are sorted out",
    ],
    providerTitle: "What a Frisco Plumber Confirms Before Arrival",
    providerItems: [
      "Whether the issue may fall under an existing builder or manufacturer warranty",
      "System type (PEX, tankless, etc.) to bring the right parts and tools",
      "HOA or subdivision access requirements",
      "Severity level to prioritize same-day dispatch appropriately",
    ],
    safetyTitle: "While You Wait",
    safetyItems: [
      "Shut off water to the affected fixture if safe to do so",
      "Keep documentation and photos ready for any warranty claim",
      "Avoid using the affected fixture until the plumber arrives",
    ],
  },
  "frisco/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Frisco",
    decisionIntro:
      "In Frisco's newer kitchens and bathrooms, sink and shower drain backups are more often caused by leftover construction debris from recent builds, grease and soap buildup, or hair and low-flow-fixture-related clogs than by the aging pipe corrosion that causes similar backups in older DFW homes.",
    decisionItems: [
      "Homes finished within the last few years should rule out leftover construction debris first",
      "Grease and soap buildup are common causes in newer kitchens and bathrooms",
      "Low-flow fixtures can trap hair and debris differently than older high-flow fixtures",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a Frisco Plumber Checks First",
    providerItems: [
      "Construction debris in drains of recently built or renovated homes",
      "Grease and soap buildup in kitchen lines",
      "Low-flow fixture-specific clog patterns",
      "Whether the issue is isolated to one fixture or affects multiple drains",
    ],
    safetyTitle: "Drain Backup Safety",
    safetyItems: [
      "Avoid chemical drain cleaners, which can damage PEX and PVC fittings",
      "Stop using the affected fixture until the clog is cleared",
      "Watch for water damage under sinks or around shower bases",
    ],
  },
};
