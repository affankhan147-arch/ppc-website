import type { PageEnhancement } from "./pageEnhancements";

// Houston content-gap fix (Batch 9). Houston already has 2 of 10 services
// covered in cityServiceEnhancementsTexas.ts (24-hour-emergency-plumber,
// emergency-drain-cleaning) - those facts (heavy clay soil, frequent heavy
// rains, aging infrastructure, backwater valves) are extended here to the
// other 8 previously-thin services. Facts below are well-established,
// verifiable, general public facts about Houston (confirmed via web
// research, consistent with and extending the existing Texas-file content,
// not fabricated):
// - Houston sits on expansive Gulf Coast clay/gumbo soil that shifts with
//   moisture, causing foundation movement that stresses slab-based supply
//   and drain lines (a well-documented cause of slab leaks in the region)
// - Many older Houston neighborhoods (The Heights, Montrose, Oak Forest, and
//   similar early-to-mid-20th-century areas) have original cast-iron drain
//   pipes and clay sewer laterals prone to corrosion/tuberculation and root
//   intrusion
// - Houston's flat terrain and heavy rainfall/hurricane exposure (well
//   documented storm history) can overload the sewer system and cause
//   backups/backflow during major rain events
// - Newer Houston-area suburbs (Katy, Cypress, Sugar Land, The Woodlands
//   area) built from the 1990s-2020s commonly have PEX plumbing and
//   slab-on-grade construction
// - Winter Storm Uri (February 2021) caused widespread burst-pipe damage
//   across Texas including the Houston area, a well-documented event
// No new statistics invented; all facts are general, verifiable public
// knowledge about Houston's soil, climate, and housing stock.

export const houstonExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "houston/main-sewer-line-clog": {
    decisionTitle: "Main Sewer Line Clogs in Houston",
    decisionIntro:
      "A main sewer line clog in Houston can stem from foundation movement in the region's expansive clay soil pulling on underground lines, from root intrusion into older clay laterals common in inner-loop neighborhoods, or from construction debris in newer suburban PVC mains.",
    decisionItems: [
      "Mention any known history of foundation movement or repair on your property",
      "Older inner-loop homes should consider root intrusion from nearby mature trees",
      "Newer suburban homes with a recent backup should consider construction debris",
      "A camera inspection confirms the exact cause before any digging is proposed",
    ],
    providerTitle: "What a Houston Plumber Checks First",
    providerItems: [
      "Camera inspection of the main line for offset joints from soil movement",
      "Root intrusion in older clay laterals near mature trees",
      "Construction debris in newer suburban PVC mains",
      "Cleanout access appropriate to the property's era",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Stop using water in the home until the line is cleared",
      "Avoid contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "houston/water-heater-emergency": {
    decisionTitle: "Water Heater Emergencies in Houston",
    decisionIntro:
      "Houston's humid climate and high water table can accelerate corrosion in older tank-style water heaters, and hurricane-season power outages add another layer of urgency, while newer suburban homes more commonly run tankless units that fail differently.",
    decisionItems: [
      "Older tank units in humid conditions are more prone to corrosion and sediment buildup",
      "Power outages during storm season can affect both tank and tankless recovery time",
      "Newer suburban homes with tankless units should check for error codes first",
      "Mention your unit type and approximate age when requesting service",
    ],
    providerTitle: "What a Houston Plumber Checks First",
    providerItems: [
      "Tank corrosion and sediment buildup in humid, high-water-table conditions",
      "Tankless error codes and scale buildup in newer installs",
      "Power or gas supply status during storm-related outages",
      "Venting and ignition condition appropriate to the unit type",
    ],
    safetyTitle: "Water Heater Safety",
    safetyItems: [
      "Shut off gas or electric supply if you smell gas or see sparking",
      "Don't attempt to relight a tankless unit's ignition system yourself",
      "Watch for scalding water from a malfunctioning thermostat",
    ],
  },
  "houston/toilet-overflow-emergency": {
    decisionTitle: "Toilet Overflow Emergencies in Houston",
    decisionIntro:
      "During Houston's heavy rain events, an overloaded municipal sewer system can occasionally cause backpressure that shows up as a toilet overflowing on its own, which is a different situation from an isolated clog and calls for different handling.",
    decisionItems: [
      "Note whether the overflow happened during or shortly after heavy rainfall",
      "An overflow with no clog present may indicate municipal system backpressure rather than a home plumbing issue",
      "Older homes with original supply lines should check shutoff valve condition",
      "Multiple fixtures overflowing at once points to a broader line issue, not just the toilet",
    ],
    providerTitle: "What a Houston Plumber Checks First",
    providerItems: [
      "Whether the overflow coincides with heavy rainfall and municipal system load",
      "Backflow prevention device condition where installed",
      "Shutoff valve condition on older supply lines",
      "Whether the issue is isolated to the fixture or a broader line problem",
    ],
    safetyTitle: "Overflow Safety",
    safetyItems: [
      "Shut off the toilet's supply valve immediately to stop the overflow",
      "Avoid flushing again until the cause is identified",
      "Clean up standing water promptly to prevent flooring damage",
    ],
  },
  "houston/burst-pipe-emergency": {
    decisionTitle: "Burst Pipe Emergencies in Houston",
    decisionIntro:
      "Burst pipes in Houston most often trace back to two very different causes: ongoing stress on slab plumbing from the region's expansive clay soil shifting with moisture, or rare but serious winter freeze events like February 2021's Winter Storm Uri, which caused widespread burst-pipe damage across the Houston area.",
    decisionItems: [
      "A slab leak from soil movement often shows as unexplained hot spots on flooring or a rising water bill before any visible burst",
      "A sudden burst during or after a hard freeze points to frozen-pipe rupture rather than gradual slab stress",
      "Older homes with original piping are more vulnerable to both causes than newer PEX systems",
      "Document any prior foundation repair history when requesting service",
    ],
    providerTitle: "What a Houston Plumber Checks First",
    providerItems: [
      "Slab movement history and its relationship to a suspected slab leak",
      "Freeze-related rupture points after a hard freeze event",
      "Pipe material and age relative to the home's construction era",
      "Water shutoff and immediate damage mitigation",
    ],
    safetyTitle: "Burst Pipe Safety",
    safetyItems: [
      "Shut off the main water supply immediately",
      "Turn off electricity to any affected areas near standing water",
      "Document damage with photos before cleanup for insurance claims",
    ],
  },
  "houston/sewer-backup-help": {
    decisionTitle: "Sewer Backup Help for Houston Homeowners",
    decisionIntro:
      "Sewer backups in Houston can stem from root intrusion into older cast-iron and clay lines common in inner-loop neighborhoods, municipal system overload during major rain events, or construction debris and fixture-level clogs in newer suburban PVC lines.",
    decisionItems: [
      "Recurring backups in older homes should consider root intrusion or pipe corrosion first",
      "Backups appearing during or after heavy rainfall may point to municipal system overload",
      "Backups appearing soon after move-in in new construction point to construction debris",
      "A camera inspection identifies the exact cause before repairs are proposed",
    ],
    providerTitle: "What a Houston Plumber Checks First",
    providerItems: [
      "Root intrusion and corrosion in older cast-iron or clay lines",
      "Timing relative to recent heavy rainfall or storm events",
      "Construction debris in newer suburban PVC lines",
      "Cleanout access appropriate to the property's era",
    ],
    safetyTitle: "Sewage Backup Safety",
    safetyItems: [
      "Avoid using water in the home until the backup is cleared",
      "Stay away from contact with backed-up wastewater",
      "Ventilate the area if sewer gas odor is present",
    ],
  },
  "houston/commercial-emergency-plumbing": {
    decisionTitle: "Commercial Emergency Plumbing in Houston",
    decisionIntro:
      "Houston's mix of older downtown and inner-loop commercial buildings on original cast-iron and clay infrastructure alongside rapidly developed suburban retail and office corridors means commercial plumbing emergencies here range from aging-pipe failures to fixture wear from high daily traffic in newer construction.",
    decisionItems: [
      "Older inner-loop commercial buildings should have aging supply and drain lines assessed periodically",
      "Newer suburban commercial buildouts may have warranty coverage worth checking before paying for repairs",
      "Heavy rain events can add urgency for businesses in flood-prone areas",
      "Multi-tenant buildings may need property management coordination before access",
    ],
    providerTitle: "What a Houston Commercial Plumber Checks First",
    providerItems: [
      "Aging supply and drain line condition in older commercial buildings",
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
  "houston/same-day-plumber-connection": {
    decisionTitle: "Same-Day Plumber Connection for Houston Homeowners",
    decisionIntro:
      "Because Houston's expansive clay soil and mixed housing stock mean a plumbing issue can be tied to foundation movement, aging inner-loop pipe materials, or newer suburban construction, a same-day plumber visit often starts by narrowing down which of these is most likely for your property.",
    decisionItems: [
      "Mention whether your home has had prior foundation movement or repair",
      "Older inner-loop homeowners should mention known original pipe materials if known",
      "Newer suburban homeowners should check builder warranty documentation before scheduling",
      "Same-day scheduling helps limit water damage while these details are sorted out",
    ],
    providerTitle: "What a Houston Plumber Confirms Before Arrival",
    providerItems: [
      "Foundation movement history relevant to a possible slab leak",
      "Neighborhood era and likely plumbing materials for the property",
      "Whether the issue may fall under an existing builder or manufacturer warranty",
      "Severity level to prioritize same-day dispatch appropriately",
    ],
    safetyTitle: "While You Wait",
    safetyItems: [
      "Shut off water to the affected fixture if safe to do so",
      "Keep documentation and photos ready for any warranty or insurance claim",
      "Avoid using the affected fixture until the plumber arrives",
    ],
  },
  "houston/sink-and-shower-drain-backup": {
    decisionTitle: "Sink and Shower Drain Backups in Houston",
    decisionIntro:
      "In older Houston inner-loop homes, sink and shower drain backups are more likely tied to aging cast-iron fixture drains and corrosion buildup, while newer suburban homes more commonly see construction debris, grease, or fixture-level clogs typical of recent construction.",
    decisionItems: [
      "Older homes should consider aging fixture drain material and corrosion as a factor",
      "Homes finished within the last few years should rule out leftover construction debris first",
      "Grease and soap buildup are common causes in both older and newer kitchens",
      "A slow drain that worsens over days usually means a building clog, not a sudden blockage",
    ],
    providerTitle: "What a Houston Plumber Checks First",
    providerItems: [
      "Aging fixture drain material and corrosion in older inner-loop homes",
      "Construction debris in drains of recently built or renovated homes",
      "Grease and soap buildup in kitchen lines regardless of neighborhood",
      "Whether the issue is isolated to one fixture or affects multiple drains",
    ],
    safetyTitle: "Drain Backup Safety",
    safetyItems: [
      "Avoid chemical drain cleaners, which can damage older cast-iron pipes and newer PVC/PEX fittings alike",
      "Stop using the affected fixture until the clog is cleared",
      "Watch for water damage under sinks or around shower bases",
    ],
  },
};
