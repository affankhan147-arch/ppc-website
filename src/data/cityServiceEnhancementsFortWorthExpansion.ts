import type { PageEnhancement } from "./pageEnhancements";

// Fort Worth expansion (batch 2 of the PlumbingHands content-gap fix, see
// Task128 in the project docs): real, non-generic enhancement content for the
// 8 services that had ZERO Fort Worth-specific content (main-sewer-line-clog,
// water-heater-emergency, toilet-overflow-emergency, burst-pipe-emergency,
// sewer-backup-help, commercial-emergency-plumbing, same-day-plumber-connection,
// sink-and-shower-drain-backup). Facts reused (pier-and-beam homes in Fairmount
// and Ryan Place, crawlspace access, galvanized lines pre-1960s, cast-iron/clay
// sewer laterals near the historic core, newer slab/PEX construction toward
// Alliance) are the SAME already-established Fort Worth facts already live in
// the existing fort-worth/24-hour-emergency-plumber and
// fort-worth/emergency-drain-cleaning entries in pageEnhancements.ts.
export const fortWorthExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "fort-worth/main-sewer-line-clog": {
    decisionTitle: "Fort Worth main sewer line decision guide",
    decisionIntro:
      "Older Fort Worth neighborhoods near the historic core often still run on original cast-iron or clay sewer laterals, which are far more prone to root intrusion and joint separation than the PVC laterals used in newer far-north subdivisions toward Alliance.",
    decisionItems: [
      "Mention if your home is in an older central Fort Worth neighborhood, since cast-iron or clay laterals there are more prone to root intrusion and joint separation.",
      "Describe whether multiple fixtures back up together, which points to a main-line issue rather than a single fixture clog.",
      "Note whether your property has mature trees near the likely sewer line path.",
      "Ask whether a camera inspection is appropriate given the home's age and construction era."
    ],
    providerTitle: "What a Fort Worth main sewer line provider may check",
    providerItems: [
      "Cast-iron or clay lateral condition and root intrusion risk in older central Fort Worth neighborhoods.",
      "PVC lateral condition in newer far-north subdivisions, where clogs are more likely debris-related than root-related.",
      "Cleanout access and location, which differs between historic-core and newer construction.",
      "Whether pier-and-beam crawlspace access affects how the lateral can be inspected or cleared."
    ],
    safetyTitle: "When a Fort Worth main sewer line issue is urgent",
    safetyItems: [
      "Multiple fixtures backing up together rather than one slow drain.",
      "Wastewater reaching a crawlspace in pier-and-beam construction, which can go unnoticed longer than a slab-level backup.",
      "Sewage odor or pooling near an outdoor cleanout.",
      "A backup that recurs shortly after a previous clearing, which can point to a structural break in an older lateral."
    ],
    preventionTitle: "Fort Worth-specific prevention notes",
    preventionItems: [
      "Homes near the historic core with cast-iron or clay laterals benefit from periodic camera inspection even without an active clog.",
      "Avoid planting new trees directly over a known lateral path in older neighborhoods.",
      "Note your home's construction era and foundation type (pier-and-beam or slab) when requesting service so the right equipment is dispatched."
    ],
    extraFaqs: [
      {
        question: "Are Fort Worth main sewer line clogs different near the historic core versus Alliance?",
        answer:
          "Yes. Homes near Fort Worth's historic core more often have original cast-iron or clay laterals prone to root intrusion, while newer far-north subdivisions toward Alliance typically have PVC laterals where clogs are more often debris-related. Mentioning your neighborhood and approximate home age helps the provider anticipate which is more likely."
      }
    ],
    extraLinks: [
      { label: "Fort Worth service area", href: "/cities/fort-worth" },
      { label: "Main sewer line clog service", href: "/services/main-sewer-line-clog" },
      { label: "Sewer backup help", href: "/services/sewer-backup-help" }
    ]
  },
  "fort-worth/water-heater-emergency": {
    decisionTitle: "Fort Worth water heater emergency decision guide",
    decisionIntro:
      "Older pier-and-beam homes in areas like Fairmount and Ryan Place sometimes have the water heater in a crawlspace or a small utility closet, while newer slab construction toward Alliance typically places it in an interior closet or garage -- access and leak-detection steps differ between the two.",
    decisionItems: [
      "Say whether your home is pier-and-beam or slab construction, since water heater location and access commonly differ.",
      "If pier-and-beam, mention whether the unit is in a crawlspace, since a leak there is less visible than in an interior closet.",
      "Note your home's approximate age, since older units and galvanized fittings are more likely to be past typical service life.",
      "Describe whether water is actively leaking, pooling, or the unit has simply stopped producing hot water."
    ],
    providerTitle: "What a Fort Worth water heater provider may check",
    providerItems: [
      "Crawlspace access and condition if the unit is located there in a pier-and-beam home.",
      "Unit age and fitting condition relative to the home's construction era.",
      "Interior-closet or garage installation condition in newer slab-built homes toward Alliance.",
      "Whether an existing pan and drain line are functioning as a backup against water damage."
    ],
    safetyTitle: "When a Fort Worth water heater issue is urgent",
    safetyItems: [
      "Water pooling in a crawlspace, which can go unnoticed longer than a leak in an interior closet.",
      "A rotten-egg smell, which can indicate a gas leak and requires shutting off the gas supply.",
      "Loud popping or rumbling from the unit, which can precede tank failure.",
      "No hot water combined with visible rust or corrosion at the tank's base."
    ],
    preventionTitle: "Fort Worth-specific prevention notes",
    preventionItems: [
      "Crawlspace water heater installations in pier-and-beam homes benefit from periodic visual checks, since a leak there is easy to miss.",
      "Units past typical service life in older central Fort Worth homes benefit from a proactive age and condition check.",
      "Note the unit's location and your home's foundation type when requesting service so the right access equipment is dispatched."
    ],
    extraFaqs: [
      {
        question: "Do Fort Worth pier-and-beam homes need different water heater service?",
        answer:
          "Often, yes. A water heater in a crawlspace under a pier-and-beam home needs crawlspace access and a leak there is easier to miss than in an interior closet common to newer slab homes. Mentioning your foundation type and the unit's location helps match the right equipment for the job."
      }
    ],
    extraLinks: [
      { label: "Fort Worth service area", href: "/cities/fort-worth" },
      { label: "Water heater emergency service", href: "/services/water-heater-emergency" },
      { label: "24-hour emergency plumber in Fort Worth", href: "/cities/fort-worth/24-hour-emergency-plumber" }
    ]
  },
  "fort-worth/toilet-overflow-emergency": {
    decisionTitle: "Fort Worth toilet overflow decision guide",
    decisionIntro:
      "Pier-and-beam homes common in older Fort Worth neighborhoods have wood-framed flooring that is more vulnerable to water damage from a toilet overflow than the concrete slab found in newer construction toward Alliance.",
    decisionItems: [
      "Say whether your home is pier-and-beam or slab construction, since flooring water-damage risk differs significantly.",
      "Describe whether the toilet is overflowing from a simple clog or backing up alongside other fixtures.",
      "Note whether water has reached wood-framed flooring outside the bathroom, which raises urgency in pier-and-beam homes.",
      "Mention your home's approximate age if it's a house with original cast-iron waste lines."
    ],
    providerTitle: "What a Fort Worth toilet overflow provider may check",
    providerItems: [
      "Whether the blockage is isolated to the toilet's trap or extends into a shared branch or lateral line.",
      "Wood-framed subfloor water damage risk in pier-and-beam homes near the historic core.",
      "Original cast-iron waste line condition in older Fort Worth homes.",
      "Whether the issue affects a single fixture or points to a larger drain-line problem."
    ],
    safetyTitle: "When a Fort Worth toilet overflow is urgent",
    safetyItems: [
      "Water continuing to rise after the shutoff valve behind the toilet has been closed.",
      "Overflow reaching wood-framed flooring in a pier-and-beam home, which can warp or weaken over time.",
      "Multiple fixtures backing up at the same time as the toilet.",
      "Wastewater rather than clean water, which raises cleanup and health urgency."
    ],
    preventionTitle: "Fort Worth-specific prevention notes",
    preventionItems: [
      "Pier-and-beam homes benefit from prompt attention to any overflow given the vulnerability of wood-framed flooring to water damage.",
      "Homes with original cast-iron waste lines benefit from periodic camera inspection even between overflow incidents.",
      "Know the location of the toilet's shutoff valve in advance so water flow can be stopped immediately."
    ],
    extraFaqs: [
      {
        question: "Does a pier-and-beam foundation make a Fort Worth toilet overflow more damaging?",
        answer:
          "It can. Wood-framed flooring in pier-and-beam homes, common in older Fort Worth neighborhoods, is more vulnerable to water damage from an overflow than the concrete slab used in newer construction, so a faster response matters more in that setting."
      }
    ],
    extraLinks: [
      { label: "Fort Worth service area", href: "/cities/fort-worth" },
      { label: "Toilet overflow emergency service", href: "/services/toilet-overflow-emergency" },
      { label: "Sink and shower drain backup", href: "/services/sink-and-shower-drain-backup" }
    ]
  },
  "fort-worth/burst-pipe-emergency": {
    decisionTitle: "Fort Worth burst pipe decision guide",
    decisionIntro:
      "Galvanized supply lines in Fort Worth homes built before the 1960s are past typical service life and more vulnerable to both age-related failure and freeze stress, especially where they run through an exposed crawlspace in pier-and-beam construction rather than a heated interior.",
    decisionItems: [
      "Say whether your home is pier-and-beam or slab, since crawlspace-exposed lines face different freeze risk than slab-protected lines.",
      "Note your home's approximate age, since galvanized lines from before the 1960s are more vulnerable to both freeze stress and age-related failure.",
      "Describe whether the burst appears to be freeze-related or happened independently of weather.",
      "Confirm whether the home's main shutoff has already been closed to stop water flow before a provider arrives."
    ],
    providerTitle: "What a Fort Worth burst pipe provider may check",
    providerItems: [
      "Crawlspace-exposed line condition and freeze vulnerability in pier-and-beam homes.",
      "Galvanized supply line condition in homes built before the 1960s.",
      "PEX manifold condition in newer far-north construction toward Alliance, where failures are less common but still possible.",
      "Extent of water damage to wood-framed flooring in pier-and-beam homes versus slab and drywall in newer construction."
    ],
    safetyTitle: "When a Fort Worth burst pipe is urgent",
    safetyItems: [
      "Active, uncontrolled water flow anywhere in the home.",
      "Water pooling in a crawlspace, which can be harder to notice than a leak in a finished space.",
      "Water near electrical panels or outlets, more common in older homes with dated wiring.",
      "A shutoff valve that will not fully close during an active leak."
    ],
    preventionTitle: "Fort Worth-specific prevention notes",
    preventionItems: [
      "Crawlspace-exposed lines in pier-and-beam homes benefit from insulation ahead of hard freezes, since they lack the protection a slab provides.",
      "Galvanized lines from before the 1960s benefit from a proactive assessment given their age.",
      "Know the location of the home's main shutoff valve in advance so water flow can be stopped immediately during a burst."
    ],
    extraFaqs: [
      {
        question: "Are Fort Worth pier-and-beam homes more vulnerable to burst pipes?",
        answer:
          "Crawlspace-exposed supply lines in pier-and-beam construction lack the thermal protection a concrete slab provides, which can make them more vulnerable to freeze-related bursts during a hard freeze than lines in newer slab-built homes toward Alliance."
      }
    ],
    extraLinks: [
      { label: "Fort Worth service area", href: "/cities/fort-worth" },
      { label: "Burst pipe emergency service", href: "/services/burst-pipe-emergency" },
      { label: "24-hour emergency plumber in Fort Worth", href: "/cities/fort-worth/24-hour-emergency-plumber" }
    ]
  },
  "fort-worth/sewer-backup-help": {
    decisionTitle: "Fort Worth sewer backup decision guide",
    decisionIntro:
      "Homes near Fort Worth's historic core with original cast-iron or clay laterals are more prone to root-intrusion backups, and pier-and-beam construction means a backup can pool in a crawlspace where it goes unnoticed longer than a slab-level backup would.",
    decisionItems: [
      "Mention if your home is in an older central Fort Worth neighborhood with mature trees near the likely sewer line path.",
      "Say whether your home is pier-and-beam, since a backup in a crawlspace can be missed longer than one at floor level.",
      "Describe whether the backup affects the lowest fixtures in the home first, a common main-line symptom.",
      "Ask whether the provider can distinguish a private lateral issue from a municipal main-line issue."
    ],
    providerTitle: "What a Fort Worth sewer backup provider may check",
    providerItems: [
      "Root intrusion at lateral joints in older, heavily-treed Fort Worth neighborhoods.",
      "Crawlspace wastewater exposure in pier-and-beam homes.",
      "Camera inspection of the private lateral to rule out a structural break.",
      "Whether the issue is isolated to the property or points to a broader municipal main-line problem."
    ],
    safetyTitle: "When a Fort Worth sewer backup is urgent",
    safetyItems: [
      "Sewage backing up into the lowest fixtures or a crawlspace in pier-and-beam homes.",
      "Standing wastewater in a yard, garage, or living space.",
      "Multiple fixtures backing up at once rather than a single slow drain.",
      "A backup that recurs shortly after a previous clearing, pointing to a structural issue."
    ],
    preventionTitle: "Fort Worth-specific prevention notes",
    preventionItems: [
      "Homes near the historic core with mature trees benefit from periodic lateral inspection even without an active backup.",
      "Pier-and-beam homeowners benefit from periodically checking the crawlspace for early signs of a slow backup.",
      "Note whether neighbors have reported similar issues, which helps distinguish a private-line from a municipal-line problem."
    ],
    extraFaqs: [
      {
        question: "Why is a Fort Worth sewer backup harder to notice in a pier-and-beam home?",
        answer:
          "A backup that would pool visibly on a slab floor can instead collect in a pier-and-beam home's crawlspace, where it's easy to miss until the odor or a floor-level symptom appears. Periodically checking the crawlspace can catch a slow backup earlier."
      }
    ],
    extraLinks: [
      { label: "Fort Worth service area", href: "/cities/fort-worth" },
      { label: "Sewer backup help service", href: "/services/sewer-backup-help" },
      { label: "Main sewer line clog in Fort Worth", href: "/cities/fort-worth/main-sewer-line-clog" }
    ]
  },
  "fort-worth/commercial-emergency-plumbing": {
    decisionTitle: "Fort Worth commercial emergency plumbing decision guide",
    decisionIntro:
      "Fort Worth commercial plumbing spans historic buildings in the Stockyards and Sundance Square alongside newer industrial and office construction toward Alliance. Building age and occupancy type both affect how a commercial plumbing issue should be described.",
    decisionItems: [
      "Say whether the building is an older historic structure (Stockyards, Sundance Square, near-downtown) or newer construction toward Alliance.",
      "Mention if the business is a restaurant or food-service operation, since grease-trap and kitchen-drain issues need specific provider experience.",
      "Describe how many restrooms, floors, or tenants are affected, since higher-occupancy buildings raise urgency.",
      "Note current business hours and whether the issue is affecting customers or staff right now."
    ],
    providerTitle: "What a Fort Worth commercial provider may check",
    providerItems: [
      "Grease trap condition and kitchen drain lines for restaurant and food-service tenants, common in Stockyards-area venues.",
      "Shared plumbing infrastructure in older historic buildings versus dedicated lines in newer Alliance-area construction.",
      "Restroom fixture counts and usage patterns relevant to higher-occupancy Sundance Square buildings.",
      "Whether the issue is isolated to one tenant space or affects shared building infrastructure."
    ],
    safetyTitle: "When a Fort Worth commercial plumbing issue is urgent",
    safetyItems: [
      "Restroom facilities unusable while the business is open to customers or staff.",
      "Kitchen drain or grease trap backup during active food service.",
      "Water intrusion affecting inventory, equipment, or electrical systems.",
      "Any issue affecting multiple tenants in a shared commercial building."
    ],
    preventionTitle: "Fort Worth-specific prevention notes",
    preventionItems: [
      "Restaurants and food-service tenants, common in the Stockyards, benefit from a regular grease trap service schedule.",
      "Older historic commercial buildings benefit from a baseline plumbing infrastructure assessment given their age.",
      "Property managers of higher-occupancy buildings benefit from knowing shutoff locations for each tenant space in advance."
    ],
    extraFaqs: [
      {
        question: "Do Fort Worth Stockyards restaurants need a different plumbing response than a Sundance Square office?",
        answer:
          "Often, yes. Restaurant and food-service plumbing issues, common among Stockyards-area venues, involve grease traps and kitchen drain lines that need specific provider experience, unlike a typical office restroom issue in a Sundance Square building."
      }
    ],
    extraLinks: [
      { label: "Fort Worth service area", href: "/cities/fort-worth" },
      { label: "Commercial emergency plumbing service", href: "/services/commercial-emergency-plumbing" },
      { label: "Same-day plumber connection in Fort Worth", href: "/cities/fort-worth/same-day-plumber-connection" }
    ]
  },
  "fort-worth/same-day-plumber-connection": {
    decisionTitle: "Fort Worth same-day plumber decision guide",
    decisionIntro:
      "Fort Worth stretches from the historic core out to far-north developments like Alliance, so the distance between a provider and your specific neighborhood affects how realistic same-day service is. Sharing your neighborhood helps match a provider that can realistically reach you today.",
    decisionItems: [
      "Share your neighborhood or nearby cross streets so provider proximity within the Fort Worth area can be considered.",
      "Describe why the request is time-sensitive -- a move-in date, an inspection deadline, or a non-emergency issue you'd still like resolved today.",
      "Note whether your home is pier-and-beam or slab, since this can affect the type of technician best suited to the job.",
      "Mention if this is a follow-up to a previous repair, since context can help the provider prepare before arriving."
    ],
    providerTitle: "What helps a Fort Worth same-day request move faster",
    providerItems: [
      "Neighborhood or cross-street information so the request can be matched to a provider realistically able to reach that part of Fort Worth today.",
      "A clear description of the issue and any time constraints, such as a closing date or move timeline.",
      "Foundation type (pier-and-beam or slab), since some requests benefit from a technician experienced with crawlspace access.",
      "Confirmation that someone will be available at the property during the arranged window."
    ],
    safetyTitle: "When a same-day request should be treated as more urgent",
    safetyItems: [
      "The issue is worsening while waiting for a scheduled appointment.",
      "A property sale, lease, or move-in deadline depends on same-day resolution.",
      "Multiple fixtures or a whole section of the home is currently unusable.",
      "The issue was flagged during an inspection and needs resolution before a closing date."
    ],
    preventionTitle: "Fort Worth-specific scheduling notes",
    preventionItems: [
      "Because Fort Worth spans a large area from the historic core to Alliance, requests near the city's edges may have different realistic same-day windows than central neighborhoods.",
      "Sharing flexible timing when possible increases the chance of same-day availability across a large metro area.",
      "Confirm pricing and arrival windows directly with the matched provider once availability is known."
    ],
    extraFaqs: [
      {
        question: "Does where I live in Fort Worth affect same-day availability?",
        answer:
          "Yes. Fort Worth spans a large area from the historic core to far-north developments like Alliance, and provider proximity to your specific neighborhood affects realistic same-day availability. Sharing your neighborhood or nearby cross streets helps match a provider that can reach you today."
      }
    ],
    extraLinks: [
      { label: "Fort Worth service area", href: "/cities/fort-worth" },
      { label: "Same-day plumber connection service", href: "/services/same-day-plumber-connection" },
      { label: "Commercial emergency plumbing in Fort Worth", href: "/cities/fort-worth/commercial-emergency-plumbing" }
    ]
  },
  "fort-worth/sink-and-shower-drain-backup": {
    decisionTitle: "Fort Worth sink and shower drain backup decision guide",
    decisionIntro:
      "Older central Fort Worth homes with original cast-iron branch drain lines narrow gradually from decades of scale and corrosion, and pier-and-beam construction actually makes some branch-line access easier from beneath the house than a slab home would allow.",
    decisionItems: [
      "Note your home's approximate age, since original cast-iron branch lines in older Fort Worth homes narrow over time and are more prone to slow drains.",
      "Say whether your home is pier-and-beam or slab, since under-house access can change the clearing approach.",
      "Describe whether the backup is in a sink, a shower, or both, and whether it's gradual or sudden.",
      "Mention if other fixtures on the same side of the house have also been draining slowly, which can indicate a shared branch-line issue."
    ],
    providerTitle: "What a Fort Worth drain backup provider may check",
    providerItems: [
      "Original cast-iron branch line condition and interior narrowing in older Fort Worth homes.",
      "Under-house branch line access in pier-and-beam construction, which can simplify clearing versus a slab home.",
      "Whether multiple fixtures share a branch line that may need clearing as a unit.",
      "Buildup from hair, soap, and grease versus a structural narrowing of the pipe itself."
    ],
    safetyTitle: "When a Fort Worth sink or shower backup is urgent",
    safetyItems: [
      "Water backing up into a shower or tub rather than simply draining slowly.",
      "Multiple fixtures backing up around the same time.",
      "Standing water that doesn't clear between uses.",
      "A foul odor accompanying the slow drain, which can indicate trapped organic buildup."
    ],
    preventionTitle: "Fort Worth-specific prevention notes",
    preventionItems: [
      "Homes with original cast-iron branch lines benefit from periodic professional clearing rather than repeated chemical treatments, which can be harder on older pipe.",
      "Pier-and-beam homeowners can mention under-house access is available, which can speed up a branch-line clearing visit.",
      "Note the home's build era and foundation type when requesting service so the right clearing method is used."
    ],
    extraFaqs: [
      {
        question: "Is a Fort Worth pier-and-beam home easier to fix for drain backups?",
        answer:
          "In some ways, yes. Under-house access in pier-and-beam construction can make it easier to reach and clear a branch drain line than in a slab home, though original cast-iron branch lines common in older Fort Worth homes still narrow gradually from scale and corrosion over time."
      }
    ],
    extraLinks: [
      { label: "Fort Worth service area", href: "/cities/fort-worth" },
      { label: "Sink and shower drain backup service", href: "/services/sink-and-shower-drain-backup" },
      { label: "Emergency drain cleaning in Fort Worth", href: "/cities/fort-worth/emergency-drain-cleaning" }
    ]
  }
};
