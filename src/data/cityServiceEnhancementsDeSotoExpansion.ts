import type { PageEnhancement } from "./pageEnhancements";

// DeSoto content-gap fix (Batch 31). DeSoto has 2 of 10 services covered
// in cityServiceEnhancementsDFWAdditional4.ts (24-hour-emergency-plumber,
// emergency-drain-cleaning) - confirmed via findstr across all
// src/data/*.ts that this is the only source. Facts below extend that
// content to the other 8 previously-thin services, with no new statistics
// invented. Facts reused:
// - DeSoto's housing stock is genuinely concentrated in the 1970s-1999
//   era
// - Many homes from this period have original copper or galvanized
//   supply lines now reaching the age where pinhole leaks and corrosion
//   become more common
// - Expansive clay soil and regional hard water consistent across
//   southern Dallas County
// - Discoloration or water quality changes can signal pipe corrosion
// - Older neighborhoods have original cast iron sewer lines prone to
//   root intrusion from mature trees
// Differentiated from other cities by anchoring DeSoto specifically on
// copper pinhole leak risk (distinct failure mode from Mansfield's or
// Allen's general corrosion framing) tied to its concentrated 1970s-1999
// construction window.

export const desotoExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "desoto/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in DeSoto",
    decisionIntro:
      "A main sewer line clog in DeSoto's established 1970s-90s neighborhoods often relates to root intrusion into original cast iron sewer lines, while the area's expansive clay soil, common across southern Dallas County, can also contribute to line shift.",
    decisionItems: [
      "Mention your home's approximate construction era, since DeSoto's housing stock is concentrated in the 1970s-1999 era",
      "Established neighborhoods should consider root intrusion into cast iron sewer lines first",
      "Clay-soil-related line shift is a relevant factor common to southern Dallas County",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a DeSoto Plumber Checks First",
    providerItems: [
      "Root intrusion likelihood given mature tree growth in established neighborhoods",
      "Cast iron sewer line condition typical of 1970s-90s construction",
      "Clay-soil-related line shift common to southern Dallas County",
      "Camera inspection findings before recommending repair",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "desoto/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in DeSoto",
    decisionIntro:
      "DeSoto's regional hard water contributes to mineral scale buildup in water heaters, and because the city's housing stock is concentrated in the 1970s-1999 era, original copper or galvanized connections reaching pinhole-leak age are also a genuine factor to mention.",
    decisionItems: [
      "Reduced hot water output often points to mineral scale buildup from the region's hard water",
      "Mention your home's approximate construction era, given DeSoto's concentrated 1970s-1999 housing stock",
      "Note whether water quality or discoloration has been a recent concern",
      "Describe whether the affected unit is original to the home",
    ],
    providerTitle: "What a DeSoto Plumber Checks First",
    providerItems: [
      "Mineral scale buildup from the region's hard water",
      "Tank age and connection condition typical of 1970s-1999 construction",
      "Pinhole leak risk on original copper supply connections",
      "Venting and ignition condition appropriate to the unit type",
    ],
    safetyTitle: "Water Heater Safety",
    safetyItems: [
      "Shut off gas or electric supply if you smell gas or see sparking",
      "Don't attempt to relight a tankless unit's ignition system yourself",
      "Watch for scalding water from a malfunctioning thermostat",
    ],
  },
  "desoto/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in DeSoto",
    decisionIntro:
      "In DeSoto's 1970s-90s era homes, an original copper or galvanized shutoff valve nearing pinhole-leak age can be slow to respond during a toilet overflow, sometimes preceded by discolored water signaling corrosion.",
    decisionItems: [
      "Mention your home's approximate construction era, since 1970s-90s homes often have original supply lines",
      "Discolored water near the toilet supply line can indicate advanced pipe corrosion",
      "Describe whether this is a slow leak or a sudden failure, since that can indicate different causes",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What a DeSoto Plumber Checks First",
    providerItems: [
      "Shutoff valve condition on original copper or galvanized supply lines",
      "Signs of pinhole-leak-stage pipe corrosion near the fixture",
      "Whether the failure suggests a slow leak or sudden break",
      "Whether the issue is isolated to the fixture or a broader line problem",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the blockage is cleared",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "desoto/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in DeSoto",
    decisionIntro:
      "DeSoto's 1970s-1999 era homes with original copper supply lines are reaching the age where pinhole leaks and full corrosion-driven bursts become more common, often preceded by discolored water, while the area's expansive clay soil can compound pipe stress.",
    decisionItems: [
      "Mention your home's approximate construction era, given DeSoto's concentrated 1970s-1999 housing stock",
      "Discolored water in the weeks before a leak is a common corrosion warning sign",
      "Describe whether the failure was a pinhole-sized leak or a sudden full break",
      "Clay-soil-related pipe stress is a relevant factor common to southern Dallas County",
    ],
    providerTitle: "What a DeSoto Plumber Checks First",
    providerItems: [
      "Pinhole leak risk on original copper supply lines from the 1970s-1999 era",
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
  "desoto/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for DeSoto Homeowners",
    decisionIntro:
      "Sewer backups in DeSoto's established 1970s-90s neighborhoods are a documented pattern tied to root intrusion into original cast iron sewer lines reaching an age where material deterioration becomes common.",
    decisionItems: [
      "Mention your home's approximate age, since older neighborhoods are more prone to root intrusion",
      "A backup that returns quickly after clearing suggests root intrusion needing a different approach",
      "Ask whether hydro jetting is appropriate for a recurring blockage",
      "Describe whether the backup is a first-time or recurring issue",
    ],
    providerTitle: "What a DeSoto Plumber Checks First",
    providerItems: [
      "Root intrusion likelihood given mature tree growth in established neighborhoods",
      "Cast iron sewer line condition typical of 1970s-90s construction",
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
  "desoto/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in DeSoto",
    decisionIntro:
      "DeSoto's commercial buildings from the same 1970s-1999 construction window as much of the city's housing stock may share the same original copper or galvanized plumbing patterns, making pinhole leak risk a relevant factor worth flagging.",
    decisionItems: [
      "Mention the building's approximate construction era when requesting service",
      "Ask whether the provider addresses pinhole leak risk on aging copper lines",
      "Older commercial buildings should have aging supply and drain lines assessed periodically",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a DeSoto Commercial Plumber Checks First",
    providerItems: [
      "Original supply line material and pinhole leak risk in 1970s-1999 era buildings",
      "Aging supply and drain line condition in older commercial buildings",
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
  "desoto/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for DeSoto Homeowners",
    decisionIntro:
      "Because DeSoto's housing stock is genuinely concentrated in the 1970s-1999 era, a same-day plumber visit often starts by identifying your home's construction era and whether original copper or galvanized lines may be reaching pinhole-leak age.",
    decisionItems: [
      "Mention your home's approximate construction era when requesting service",
      "Note whether you've noticed discoloration or water quality changes",
      "Describe whether the issue is a slow leak or sudden failure",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a DeSoto Plumber Confirms Before Arrival",
    providerItems: [
      "Home construction era and likely original plumbing materials",
      "Pinhole leak risk on aging copper or galvanized supply lines",
      "Whether the issue is a slow leak or sudden failure",
      "Severity level to prioritize same-day dispatch appropriately",
    ],
    safetyTitle: "While You Wait",
    safetyItems: [
      "Shut off water to the affected fixture if safe to do so",
      "Keep documentation and photos ready for any insurance claim",
      "Avoid using the affected fixture until the plumber arrives",
    ],
  },
  "desoto/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in DeSoto",
    decisionIntro:
      "In DeSoto's 1970s-90s era homes, sink and shower drain backups often relate to mineral scale buildup from the region's hard water combined with aging fixture drain material reaching the end of typical service life.",
    decisionItems: [
      "Mention your home's approximate construction era, given DeSoto's concentrated 1970s-1999 housing stock",
      "Consider mineral scale buildup and aging fixture drain material together as likely factors",
      "Grease and soap buildup are common causes across all home eras",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a DeSoto Plumber Checks First",
    providerItems: [
      "Mineral scale buildup from the region's hard water",
      "Aging fixture drain material typical of 1970s-1999 construction",
      "Whether the blockage pattern suggests recent debris or long-term buildup",
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
