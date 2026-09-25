import type { PageEnhancement } from "./pageEnhancements";

// Irving expansion (batch 5 of the PlumbingHands content-gap fix, see
// Task128/138/139/140 in project docs): real, non-generic enhancement content
// for the 8 services that had ZERO Irving-specific content
// (main-sewer-line-clog, water-heater-emergency, toilet-overflow-emergency,
// burst-pipe-emergency, sewer-backup-help, commercial-emergency-plumbing,
// same-day-plumber-connection, sink-and-shower-drain-backup). Facts reused
// (older Las Colinas-area homes with aging copper, newer high-density
// multi-family/townhome construction near the DFW Airport corridor with
// shared lines and HOA coordination needs) are the SAME already-established
// Irving facts already live in the existing irving/24-hour-emergency-plumber
// and irving/emergency-drain-cleaning entries. Las Colinas as a major
// business/urban district and Irving's concentration of DFW Airport-area
// hotels are real, well-known facts used as general geography, not invented
// statistics.
export const irvingExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "irving/main-sewer-line-clog": {
    decisionTitle: "Irving main sewer line decision guide",
    decisionIntro:
      "Older Las Colinas-area homes typically have an independent private lateral, often clay or cast-iron given the development's age, while newer multi-family and townhome construction near the DFW Airport corridor commonly shares a lateral across several units.",
    decisionItems: [
      "Say whether your property is an older Las Colinas-area single-family home or newer shared-lateral multi-family/townhome construction.",
      "For shared-lateral properties, ask neighbors or property management if others are experiencing similar symptoms.",
      "Describe whether multiple fixtures back up at once, which points to a main-line issue rather than a single fixture clog.",
      "Ask whether HOA or property management needs to be looped in before a shared-lateral repair begins."
    ],
    providerTitle: "What an Irving main sewer line provider may check",
    providerItems: [
      "Clay or cast-iron lateral condition in older, independent Las Colinas-area homes.",
      "Shared lateral configuration and access in newer multi-family or townhome developments.",
      "Whether the failure pattern matches other units in a shared-lateral property.",
      "Cleanout access and location, which can be shared in denser newer construction."
    ],
    safetyTitle: "When an Irving main sewer line issue is urgent",
    safetyItems: [
      "Multiple fixtures backing up together at the lowest points in the property.",
      "A shared-lateral backup affecting more than one unit in multi-family construction.",
      "Sewage odor or pooling near an outdoor cleanout.",
      "A backup that recurs shortly after a previous clearing, pointing to a structural issue."
    ],
    preventionTitle: "Irving-specific prevention notes",
    preventionItems: [
      "Older Las Colinas-area homes with clay or cast-iron laterals benefit from periodic camera inspection.",
      "Shared-lateral multi-family owners benefit from knowing their HOA's emergency plumbing coordination process in advance.",
      "Keep property management contact details ready for shared-lateral emergencies."
    ],
    extraFaqs: [
      {
        question: "Can an Irving sewer line issue affect more than one home?",
        answer:
          "In newer multi-family and townhome construction near the DFW Airport corridor, yes -- these properties commonly share a lateral across several units, so a main-line issue in one unit can point to a building-wide problem rather than an isolated clog."
      }
    ],
    extraLinks: [
      { label: "Irving service area", href: "/cities/irving" },
      { label: "Main sewer line clog service", href: "/services/main-sewer-line-clog" },
      { label: "Sewer backup help", href: "/services/sewer-backup-help" }
    ]
  },
  "irving/water-heater-emergency": {
    decisionTitle: "Irving water heater emergency decision guide",
    decisionIntro:
      "Older Las Colinas-area homes typically have an independent water heater original to the property's construction era, while newer multi-family and townhome buildings near the DFW Airport corridor sometimes use shared or centralized systems that need property management coordination.",
    decisionItems: [
      "Say whether your unit is independent (older Las Colinas-area home) or part of a shared/centralized system in newer multi-family construction.",
      "For a shared system, ask property management whether other units are affected before assuming an isolated failure.",
      "Note your unit's approximate age if independent, since older units are more likely to be past typical service life.",
      "Describe whether water is actively leaking, pooling, or the unit has simply stopped producing hot water."
    ],
    providerTitle: "What an Irving water heater provider may check",
    providerItems: [
      "Unit age and condition in older, independent Las Colinas-area homes.",
      "Shared or centralized system configuration in newer multi-family buildings, where applicable.",
      "Whether a leak is from the tank itself, a fitting, or the temperature-and-pressure relief valve.",
      "Whether an existing pan and drain line are functioning as a backup against water damage."
    ],
    safetyTitle: "When an Irving water heater issue is urgent",
    safetyItems: [
      "Active water pooling around the unit, especially near flooring or a shared wall.",
      "A rotten-egg smell, which can indicate a gas leak and requires shutting off the gas supply.",
      "Loud popping or rumbling from the unit, which can precede tank failure.",
      "A shared-system failure affecting hot water in more than one unit."
    ],
    preventionTitle: "Irving-specific prevention notes",
    preventionItems: [
      "Independent units in older Las Colinas-area homes past typical service life benefit from a proactive age and condition check.",
      "Multi-family residents benefit from knowing whether their building uses a shared or independent water heating system before an emergency happens.",
      "Note your property type and unit configuration when requesting service so the right technician is dispatched."
    ],
    extraFaqs: [
      {
        question: "Does an Irving multi-family building share one water heater?",
        answer:
          "Some newer multi-family and townhome buildings near the DFW Airport corridor use shared or centralized systems, while older Las Colinas-area homes and many individual units have independent water heaters. Confirming which setup applies helps the provider diagnose the issue correctly."
      }
    ],
    extraLinks: [
      { label: "Irving service area", href: "/cities/irving" },
      { label: "Water heater emergency service", href: "/services/water-heater-emergency" },
      { label: "24-hour emergency plumber in Irving", href: "/cities/irving/24-hour-emergency-plumber" }
    ]
  },
  "irving/toilet-overflow-emergency": {
    decisionTitle: "Irving toilet overflow decision guide",
    decisionIntro:
      "Newer multi-family and townhome buildings near the DFW Airport corridor often share vertical stacks, so a toilet overflow can affect a neighboring unit, while older Las Colinas-area homes are single-family with independent waste lines.",
    decisionItems: [
      "Say whether you're in an older Las Colinas-area single-family home or a newer multi-family/townhome unit with shared stacks.",
      "Describe whether the toilet is overflowing from a simple clog or backing up alongside other fixtures.",
      "In shared-stack construction, note whether a neighboring unit may also be affected.",
      "Mention if water has reached flooring outside the bathroom or a shared wall, which changes response urgency."
    ],
    providerTitle: "What an Irving toilet overflow provider may check",
    providerItems: [
      "Whether the blockage is isolated to the toilet's trap or extends into a shared stack in multi-family construction.",
      "Independent waste line condition in older Las Colinas-area single-family homes.",
      "Water damage risk to a neighboring unit or shared wall in denser construction.",
      "Whether property management needs to be notified for a shared-stack issue."
    ],
    safetyTitle: "When an Irving toilet overflow is urgent",
    safetyItems: [
      "Water continuing to rise after the shutoff valve behind the toilet has been closed.",
      "Overflow reaching a neighboring unit in shared-stack multi-family construction.",
      "Multiple fixtures backing up at the same time as the toilet.",
      "Wastewater rather than clean water, which raises cleanup and health urgency."
    ],
    preventionTitle: "Irving-specific prevention notes",
    preventionItems: [
      "Multi-family residents benefit from knowing whether their building has shared stacks before an overflow happens.",
      "Older Las Colinas-area homeowners with independent waste lines benefit from periodic camera inspection.",
      "Know the location of the toilet's shutoff valve in advance so water flow can be stopped immediately."
    ],
    extraFaqs: [
      {
        question: "Can an Irving toilet overflow affect a neighboring unit?",
        answer:
          "In newer multi-family and townhome buildings near the DFW Airport corridor that share vertical stacks, yes -- an overflow can affect a neighboring unit. Mentioning your building type helps the provider and property management respond appropriately."
      }
    ],
    extraLinks: [
      { label: "Irving service area", href: "/cities/irving" },
      { label: "Toilet overflow emergency service", href: "/services/toilet-overflow-emergency" },
      { label: "Sink and shower drain backup", href: "/services/sink-and-shower-drain-backup" }
    ]
  },
  "irving/burst-pipe-emergency": {
    decisionTitle: "Irving burst pipe decision guide",
    decisionIntro:
      "Original copper supply lines in older Las Colinas-area homes can fail suddenly as they age, while newer multi-family and townhome construction near the DFW Airport corridor more often sees a shared-line failure that can affect more than one unit at once.",
    decisionItems: [
      "Say whether your property is an older Las Colinas-area home or newer shared-line multi-family/townhome construction.",
      "For an older home, note whether the failure is a sudden rupture or a worsening pinhole leak in aging copper.",
      "For shared-line construction, ask whether a neighboring unit is also experiencing water issues.",
      "Confirm whether the property's main shutoff has already been closed to stop water flow before a provider arrives."
    ],
    providerTitle: "What an Irving burst pipe provider may check",
    providerItems: [
      "Original copper line condition and thinning in older Las Colinas-area homes.",
      "Shared-line configuration and whether a failure point affects multiple units in newer construction.",
      "Extent of water damage to flooring, drywall, and shared walls once the leak source is controlled.",
      "Whether HOA or property management coordination is needed for a shared-line repair."
    ],
    safetyTitle: "When an Irving burst pipe is urgent",
    safetyItems: [
      "Active, uncontrolled water flow anywhere in the property.",
      "Water near electrical outlets, panels, or fixtures.",
      "A shutoff valve that will not fully close during an active leak.",
      "A shared-line burst affecting more than one unit in multi-family construction."
    ],
    preventionTitle: "Irving-specific prevention notes",
    preventionItems: [
      "Older Las Colinas-area homes with original copper lines benefit from a proactive assessment given their age.",
      "Multi-family and townhome owners benefit from knowing their HOA's emergency plumbing coordination process in advance of a shared-line failure.",
      "Know the location of the property's main shutoff valve so water flow can be stopped immediately during a burst."
    ],
    extraFaqs: [
      {
        question: "Can one Irving burst pipe affect multiple units?",
        answer:
          "In newer multi-family and townhome construction near the DFW Airport corridor with shared supply lines, a single failure point can affect more than one unit, unlike an older, independent Las Colinas-area single-family home where a burst pipe stays isolated to that property."
      }
    ],
    extraLinks: [
      { label: "Irving service area", href: "/cities/irving" },
      { label: "Burst pipe emergency service", href: "/services/burst-pipe-emergency" },
      { label: "24-hour emergency plumber in Irving", href: "/cities/irving/24-hour-emergency-plumber" }
    ]
  },
  "irving/sewer-backup-help": {
    decisionTitle: "Irving sewer backup decision guide",
    decisionIntro:
      "A shared lateral serving several units in newer multi-family or townhome construction near the DFW Airport corridor can back up for all of them at once, while an older Las Colinas-area single-family home has an independent lateral that fails on its own.",
    decisionItems: [
      "Say whether your property is an older Las Colinas-area single-family home or shares a lateral with other units.",
      "For shared-lateral properties, ask neighbors or property management if others are experiencing similar backups.",
      "Describe whether the backup affects the lowest fixtures first, a common main-line symptom.",
      "Ask whether the provider can distinguish a private lateral issue from a municipal main-line issue."
    ],
    providerTitle: "What an Irving sewer backup provider may check",
    providerItems: [
      "Independent lateral condition in older Las Colinas-area single-family homes.",
      "Shared lateral configuration and whether multiple units are affected in newer construction.",
      "Camera inspection of the lateral to rule out a structural break.",
      "Whether the issue is isolated to the property or points to a broader municipal main-line problem."
    ],
    safetyTitle: "When an Irving sewer backup is urgent",
    safetyItems: [
      "Sewage backing up into the lowest fixtures or floor drains.",
      "A shared-lateral backup affecting more than one unit in multi-family construction.",
      "Standing wastewater in a yard, garage, or living space.",
      "A backup that recurs shortly after a previous clearing, pointing to a structural issue."
    ],
    preventionTitle: "Irving-specific prevention notes",
    preventionItems: [
      "Older Las Colinas-area homes benefit from periodic lateral inspection even without an active backup.",
      "Shared-lateral property owners benefit from knowing their HOA's emergency plumbing coordination process in advance.",
      "Note whether neighbors have reported similar issues, which helps distinguish a private-line from a municipal-line problem."
    ],
    extraFaqs: [
      {
        question: "Why might several Irving units back up at the same time?",
        answer:
          "Newer multi-family and townhome construction near the DFW Airport corridor often shares a lateral across several units, so a backup in one can point to a shared-line issue affecting others -- unlike an older, independent Las Colinas-area single-family home."
      }
    ],
    extraLinks: [
      { label: "Irving service area", href: "/cities/irving" },
      { label: "Sewer backup help service", href: "/services/sewer-backup-help" },
      { label: "Main sewer line clog in Irving", href: "/cities/irving/main-sewer-line-clog" }
    ]
  },
  "irving/commercial-emergency-plumbing": {
    decisionTitle: "Irving commercial emergency plumbing decision guide",
    decisionIntro:
      "Irving's commercial plumbing spans Las Colinas corporate office towers alongside a heavy concentration of hotels near DFW Airport, where a plumbing issue affects paying guests around the clock rather than daytime office staff.",
    decisionItems: [
      "Say whether the property is a Las Colinas-area corporate office building or a DFW Airport-area hotel or hospitality property.",
      "For a hotel, note how many rooms or floors are affected, since guest impact raises urgency outside normal business hours.",
      "Mention if the business is a restaurant or food-service operation, since grease-trap and kitchen-drain issues need specific provider experience.",
      "Describe current occupancy or business hours and whether the issue is affecting guests, customers, or staff right now."
    ],
    providerTitle: "What an Irving commercial provider may check",
    providerItems: [
      "Guest-room and common-area plumbing systems in DFW Airport-area hotels, which often need 24/7 response.",
      "Restroom fixture counts and shared infrastructure in Las Colinas corporate office towers.",
      "Grease trap condition and kitchen drain lines for hotel restaurants and food-service tenants.",
      "Whether the issue is isolated to one area or affects shared building infrastructure."
    ],
    safetyTitle: "When an Irving commercial plumbing issue is urgent",
    safetyItems: [
      "Guest rooms unusable at a DFW Airport-area hotel, especially overnight.",
      "Restroom facilities unusable during business hours in a Las Colinas office tower.",
      "Kitchen drain or grease trap backup during active food service.",
      "Any issue affecting multiple tenants or guest floors in a shared building."
    ],
    preventionTitle: "Irving-specific prevention notes",
    preventionItems: [
      "DFW Airport-area hotels benefit from a 24/7-aware maintenance plan given round-the-clock guest occupancy.",
      "Las Colinas office towers benefit from scheduled plumbing maintenance during off-hours to minimize disruption to tenants.",
      "Restaurants and food-service tenants benefit from a regular grease trap service schedule."
    ],
    extraFaqs: [
      {
        question: "Do Irving hotels near DFW Airport need faster plumbing response than office buildings?",
        answer:
          "Often, yes. A hotel near DFW Airport has paying guests on-site around the clock, so a plumbing issue there typically needs faster, 24/7-aware response than a Las Colinas office tower that's only occupied during business hours."
      }
    ],
    extraLinks: [
      { label: "Irving service area", href: "/cities/irving" },
      { label: "Commercial emergency plumbing service", href: "/services/commercial-emergency-plumbing" },
      { label: "Same-day plumber connection in Irving", href: "/cities/irving/same-day-plumber-connection" }
    ]
  },
  "irving/same-day-plumber-connection": {
    decisionTitle: "Irving same-day plumber decision guide",
    decisionIntro:
      "Irving's central location between Dallas and Fort Worth near DFW Airport generally supports good same-day coverage, though shared-line multi-family properties may need extra lead time to coordinate with an HOA or property manager.",
    decisionItems: [
      "Share your neighborhood or property type (older Las Colinas-area home versus newer multi-family/townhome) so provider proximity and access needs can be considered.",
      "Describe why the request is time-sensitive -- a move-in date, an inspection deadline, or a non-emergency issue you'd still like resolved today.",
      "For multi-family or townhome properties, confirm whether property management needs to authorize access in advance.",
      "Mention if this is a follow-up to a previous repair, since context can help the provider prepare before arriving."
    ],
    providerTitle: "What helps an Irving same-day request move faster",
    providerItems: [
      "Neighborhood or property-type information so the request can be matched to a provider realistically able to reach you today.",
      "A clear description of the issue and any time constraints, such as a closing date or move timeline.",
      "Confirmation that HOA or property management access requirements, if any, are already handled.",
      "Confirmation that someone will be available at the property during the arranged window."
    ],
    safetyTitle: "When a same-day request should be treated as more urgent",
    safetyItems: [
      "The issue is worsening while waiting for a scheduled appointment.",
      "A property sale, lease, or move-in deadline depends on same-day resolution.",
      "Multiple fixtures or a whole section of the property is currently unusable.",
      "The issue was flagged during an inspection and needs resolution before a closing date."
    ],
    preventionTitle: "Irving-specific scheduling notes",
    preventionItems: [
      "Irving's central DFW-area location generally supports consistent same-day coverage.",
      "Multi-family or townhome requests may need extra lead time if HOA or property management authorization is required first.",
      "Confirm pricing and arrival windows directly with the matched provider once availability is known."
    ],
    extraFaqs: [
      {
        question: "Does living in an Irving HOA community affect same-day plumbing service?",
        answer:
          "It can add a step. If your property requires HOA or property management authorization for a provider to access shared areas or lines, handling that in advance helps keep a same-day request on schedule."
      }
    ],
    extraLinks: [
      { label: "Irving service area", href: "/cities/irving" },
      { label: "Same-day plumber connection service", href: "/services/same-day-plumber-connection" },
      { label: "Commercial emergency plumbing in Irving", href: "/cities/irving/commercial-emergency-plumbing" }
    ]
  },
  "irving/sink-and-shower-drain-backup": {
    decisionTitle: "Irving sink and shower drain backup decision guide",
    decisionIntro:
      "Older Las Colinas-area homes have independent branch drain lines that narrow gradually with age, while newer multi-family and townhome construction near the DFW Airport corridor can share branch lines across units, so a persistent backup may not be isolated to one property.",
    decisionItems: [
      "Say whether your property is an older Las Colinas-area single-family home or newer shared-branch multi-family/townhome construction.",
      "Describe whether the backup is in a sink, a shower, or both, and whether it's gradual or sudden.",
      "In shared-branch properties, mention if a neighboring unit has reported similar slow drains.",
      "Say whether this is a recurring issue, since repeat slow drains often point to a narrowing pipe rather than a one-time clog."
    ],
    providerTitle: "What an Irving drain backup provider may check",
    providerItems: [
      "Independent branch line condition and interior narrowing in older Las Colinas-area homes.",
      "Shared branch line configuration in newer multi-family or townhome construction.",
      "Whether multiple units share a branch line that may need clearing as a unit.",
      "Buildup from hair, soap, and grease versus a structural narrowing of the pipe itself."
    ],
    safetyTitle: "When an Irving sink or shower backup is urgent",
    safetyItems: [
      "Water backing up into a shower or tub rather than simply draining slowly.",
      "Multiple fixtures backing up around the same time.",
      "Standing water that doesn't clear between uses.",
      "A foul odor accompanying the slow drain, which can indicate trapped organic buildup."
    ],
    preventionTitle: "Irving-specific prevention notes",
    preventionItems: [
      "Older Las Colinas-area homes benefit from periodic professional clearing rather than repeated chemical treatments, which can be harder on older pipe.",
      "Shared-branch multi-family residents benefit from reporting recurring backups to property management for pattern tracking.",
      "Note the property's build era and configuration when requesting service so the right clearing method is used."
    ],
    extraFaqs: [
      {
        question: "Can an Irving drain backup point to a building-wide issue?",
        answer:
          "In newer multi-family and townhome construction near the DFW Airport corridor with shared branch lines, a persistent backup can indicate a shared-line issue rather than one isolated to your unit -- worth flagging to property management alongside requesting service."
      }
    ],
    extraLinks: [
      { label: "Irving service area", href: "/cities/irving" },
      { label: "Sink and shower drain backup service", href: "/services/sink-and-shower-drain-backup" },
      { label: "Emergency drain cleaning in Irving", href: "/cities/irving/emergency-drain-cleaning" }
    ]
  }
};
