import type { PageEnhancement } from "./pageEnhancements";

// Flower Mound content-gap fix (Batch 24). Flower Mound already has 2 of 10
// services covered directly in pageEnhancements.ts (24-hour-emergency-plumber,
// emergency-drain-cleaning) - the literal entries there win over the
// separate flower-mound/ entries in cityServiceEnhancementsDFWAdditional3.ts
// (same multi-file pattern seen for several recent cities, confirmed via
// findstr across all src/data/*.ts before writing). Facts below extend the
// winning content to the other 8 previously-thin services, with no new
// statistics invented. Facts reused:
// - Flower Mound sits on the Tarrant-Denton county border, so water supply
//   source depends on neighborhood, though both county systems run
//   equally hard (12-20 grains per gallon)
// - Lake Forest, an established neighborhood with median construction
//   around 1993, with a documented tree-heavy root intrusion pattern
// - Blackland Prairie clay soil common across the DFW border area,
//   contributing to slab leak risk
// Differentiated from Bedford's batch (Mayfair Hills root intrusion) by
// anchoring on Flower Mound's unique county-border water source context
// and its own named Lake Forest neighborhood.

export const flowerMoundExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "flower-mound/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in Flower Mound",
    decisionIntro:
      "A main sewer line clog in Flower Mound's established Lake Forest neighborhood (median construction around 1993) often relates to documented root intrusion from mature tree growth, while the area's Blackland Prairie clay soil can also contribute to line shift regardless of neighborhood.",
    decisionItems: [
      "Mention whether your home is in an established, tree-heavy neighborhood like Lake Forest",
      "Homes in Lake Forest should consider root intrusion into aging sewer lines first",
      "Note whether your property is on the Tarrant County or Denton County side, since it can be relevant context",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a Flower Mound Plumber Checks First",
    providerItems: [
      "Root intrusion likelihood given Lake Forest's documented tree-heavy pattern",
      "Clay-soil-related line shift given the area's Blackland Prairie soil",
      "Which county water and sewer system serves the specific property",
      "Camera inspection findings before recommending repair",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "flower-mound/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Flower Mound",
    decisionIntro:
      "Flower Mound's consistently hard water, 12 to 20 grains per gallon regardless of whether your home is on the Tarrant County or Denton County water system, accelerates mineral scale buildup and is why the area benefits from annual water heater flushing rather than the standard two-year interval.",
    decisionItems: [
      "Reduced hot water output often points to mineral scale buildup from Flower Mound's consistently hard water",
      "Mention whether your water heater has been flushed within the past year",
      "Note which county water system serves your property, since either side runs equally hard",
      "Homes in Lake Forest should also consider the unit's overall age",
    ],
    providerTitle: "What a Flower Mound Plumber Checks First",
    providerItems: [
      "Mineral scale buildup from the area's consistently hard water (12-20 grains per gallon)",
      "Whether annual flushing has been part of the unit's maintenance history",
      "Tank age and corrosion in established Lake Forest-era homes",
      "Venting and ignition condition appropriate to the unit type",
    ],
    safetyTitle: "Water Heater Safety",
    safetyItems: [
      "Shut off gas or electric supply if you smell gas or see sparking",
      "Don't attempt to relight a tankless unit's ignition system yourself",
      "Watch for scalding water from a malfunctioning thermostat",
    ],
  },
  "flower-mound/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Flower Mound",
    decisionIntro:
      "In Flower Mound, mineral scale from the area's consistently hard water can cause a toilet fill valve or shutoff to stick or respond slowly during an overflow, an issue seen across both established Lake Forest homes and newer construction regardless of which county water system serves the property.",
    decisionItems: [
      "Mention whether the shutoff valve felt stuck or slow to close, a possible sign of hard-water scale",
      "Homes in Lake Forest (median construction around 1993) should also consider fixture age",
      "Newer construction homes should rule out installation issues on recently placed fixtures",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What a Flower Mound Plumber Checks First",
    providerItems: [
      "Mineral scale effects on shutoff valve and fill valve function",
      "Fixture age appropriate to Lake Forest-era or newer construction",
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
  "flower-mound/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Flower Mound",
    decisionIntro:
      "Flower Mound's Blackland Prairie clay soil can contribute to pipe stress and slab-related bursts regardless of neighborhood, while established Lake Forest-era homes should also consider root intrusion pressure on buried lines from the area's documented mature tree growth.",
    decisionItems: [
      "Clay-soil-related slab stress is a relevant factor for any Flower Mound property",
      "Homes in Lake Forest should also consider root pressure on buried lines from mature trees",
      "Note which county side of Flower Mound your property is on when requesting service",
      "Mention your home's approximate construction era when requesting service",
    ],
    providerTitle: "What a Flower Mound Plumber Checks First",
    providerItems: [
      "Clay-soil-related slab stress given the area's Blackland Prairie soil",
      "Root intrusion pressure on buried lines in tree-heavy Lake Forest-era neighborhoods",
      "Mineral scale contribution to pipe stress from the area's consistently hard water",
      "Water shutoff and immediate damage mitigation",
    ],
    safetyTitle: "Burst Pipe Safety",
    safetyItems: [
      "Shut off the main water supply immediately",
      "Turn off electricity to any affected areas near standing water",
      "Document damage with photos before cleanup for insurance claims",
    ],
  },
  "flower-mound/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Flower Mound Homeowners",
    decisionIntro:
      "Sewer backups in Flower Mound's established Lake Forest neighborhood are a documented pattern tied to root intrusion from mature tree growth, while mineral scale buildup from the area's consistently hard water is a separate, genuine factor across any neighborhood.",
    decisionItems: [
      "Homes in Lake Forest should consider root intrusion first",
      "Any Flower Mound home should also consider mineral scale buildup given the consistently hard water",
      "A backup that returns quickly after clearing suggests root intrusion needing a different approach",
      "Ask whether hydro jetting is appropriate for a recurring blockage",
    ],
    providerTitle: "What a Flower Mound Plumber Checks First",
    providerItems: [
      "Root intrusion likelihood given Lake Forest's documented tree-heavy pattern",
      "Mineral scale buildup from the area's consistently hard water",
      "Whether hydro jetting or standard snaking is the better approach",
      "Whether the blockage pattern suggests a fixture-level or main-line issue",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Avoid using water in the home until the backup is cleared",
      "Stay away from contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "flower-mound/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Flower Mound",
    decisionIntro:
      "Flower Mound's consistently hard water affects commercial water heaters and fixtures the same way it does residential ones, and because the city sits on the Tarrant-Denton county border, which water system serves a given commercial property can be useful context.",
    decisionItems: [
      "Ask whether the provider addresses mineral scale buildup in commercial water heaters and fixtures",
      "Note which county side of Flower Mound your property is on",
      "Older commercial buildings should have aging supply and drain lines assessed periodically",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a Flower Mound Commercial Plumber Checks First",
    providerItems: [
      "Mineral scale buildup in commercial water heaters and fixtures from the area's hard water",
      "Which county water system serves the property",
      "Aging supply and drain line condition in older commercial buildings",
      "Backflow prevention and code compliance appropriate to the building's age",
    ],
    safetyTitle: "Commercial Plumbing Safety",
    safetyItems: [
      "Shut off water to the affected fixture or area to limit damage",
      "Post appropriate signage to keep customers or employees away from hazards",
      "Document the issue for property management or insurance records",
    ],
  },
  "flower-mound/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Flower Mound Homeowners",
    decisionIntro:
      "Because Flower Mound sits on the Tarrant-Denton county border and includes established tree-heavy neighborhoods like Lake Forest alongside newer construction, a same-day plumber visit often starts by identifying your neighborhood and water source so the right diagnostic approach is ready.",
    decisionItems: [
      "Mention whether your property is on the Tarrant County or Denton County side",
      "Note whether your home is in an established neighborhood like Lake Forest",
      "Ask about mineral scale considerations given the area's consistently hard water",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a Flower Mound Plumber Confirms Before Arrival",
    providerItems: [
      "Which county water system serves the property",
      "Neighborhood and construction era, including tree-heavy lot considerations",
      "Hard-water scale considerations for the affected fixture",
      "Severity level to prioritize same-day dispatch appropriately",
    ],
    safetyTitle: "While You Wait",
    safetyItems: [
      "Shut off water to the affected fixture if safe to do so",
      "Keep documentation and photos ready for any insurance claim",
      "Avoid using the affected fixture until the plumber arrives",
    ],
  },
  "flower-mound/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Flower Mound",
    decisionIntro:
      "In Flower Mound, sink and shower drain backups are commonly tied to mineral scale buildup from the area's consistently hard water narrowing pipes over time, a pattern documented across established Lake Forest homes and newer construction alike.",
    decisionItems: [
      "Mineral scale buildup from Flower Mound's consistently hard water is a common factor regardless of home age",
      "Homes in Lake Forest should also consider general age-related fixture drain wear",
      "Newer construction homes should rule out leftover construction debris first",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a Flower Mound Plumber Checks First",
    providerItems: [
      "Mineral scale buildup from the area's consistently hard water",
      "Aging fixture drain material in Lake Forest-era homes",
      "Construction debris in drains of recently built homes",
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
