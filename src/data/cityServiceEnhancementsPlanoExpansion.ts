import type { PageEnhancement } from "./pageEnhancements";

// Plano expansion (batch 4 of the PlumbingHands content-gap fix, see
// Task128/Task138/Task139 in project docs): real, non-generic enhancement
// content for the 8 services that had ZERO Plano-specific content
// (main-sewer-line-clog, water-heater-emergency, toilet-overflow-emergency,
// burst-pipe-emergency, sewer-backup-help, commercial-emergency-plumbing,
// same-day-plumber-connection, sink-and-shower-drain-backup). Facts reused
// (West Plano's 1990s-2000s growth with tankless/PEX systems vs East/Central
// Plano's 1970s-80s homes with traditional copper/galvanized lines, mature
// tree canopy near Downtown Plano causing root intrusion) are the SAME
// already-established Plano facts already live in the existing
// plano/24-hour-emergency-plumber and plano/emergency-drain-cleaning entries.
// Legacy West is a real, well-known West Plano corporate/business district,
// used here as general geography, not an invented statistic.
export const planoExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "plano/main-sewer-line-clog": {
    decisionTitle: "Plano main sewer line decision guide",
    decisionIntro:
      "East and Central Plano's mature tree canopy near Downtown Plano sits above older clay or cast-iron sewer laterals prone to root intrusion, while West Plano's newer PVC laterals installed during the 1990s-2000s growth period see fewer root-related failures.",
    decisionItems: [
      "Mention if your property is in an older, tree-lined section of Plano, since root intrusion into an aging lateral is more likely there.",
      "Describe whether multiple fixtures back up at once, which points to a main-line issue rather than a single fixture clog.",
      "Note your home's approximate age and section of Plano, since lateral material differs significantly between older and newer construction.",
      "Ask whether a camera inspection is warranted given the neighborhood's tree maturity and the home's construction era."
    ],
    providerTitle: "What a Plano main sewer line provider may check",
    providerItems: [
      "Clay or cast-iron lateral condition and root intrusion risk in older East/Central Plano neighborhoods.",
      "PVC lateral condition in newer West Plano construction, where clogs are more often debris-related.",
      "Cleanout access and location, which differs between older and newer sections.",
      "Whether a recurring backup suggests established root growth versus a one-time blockage."
    ],
    safetyTitle: "When a Plano main sewer line issue is urgent",
    safetyItems: [
      "Multiple fixtures backing up together at the lowest points in the home.",
      "Sewage odor or pooling near an outdoor cleanout close to mature trees.",
      "A recurring backup after a previous clearing, suggesting established root growth.",
      "Wastewater reaching living space rather than just a slow drain."
    ],
    preventionTitle: "Plano-specific prevention notes",
    preventionItems: [
      "Older, tree-lined East/Central Plano properties benefit from periodic camera inspection of the lateral even without an active clog.",
      "Avoid planting new trees directly over a known lateral path in established neighborhoods.",
      "Note your section of Plano and home's construction era when requesting service so the right equipment is dispatched."
    ],
    extraFaqs: [
      {
        question: "Are Plano main sewer line clogs more common in older neighborhoods?",
        answer:
          "Yes. East and Central Plano's mature tree canopy near Downtown Plano sits above older clay or cast-iron laterals that are more prone to root intrusion, while West Plano's newer PVC laterals from the 1990s-2000s growth period see fewer root-related failures."
      }
    ],
    extraLinks: [
      { label: "Plano service area", href: "/cities/plano" },
      { label: "Main sewer line clog service", href: "/services/main-sewer-line-clog" },
      { label: "Sewer backup help", href: "/services/sewer-backup-help" }
    ]
  },
  "plano/water-heater-emergency": {
    decisionTitle: "Plano water heater emergency decision guide",
    decisionIntro:
      "West Plano's newer homes more often run tankless water heaters, which fail differently than the traditional tank units still common in East and Central Plano's older 1970s-80s housing stock -- and a tankless unit original to a 1990s-2000s home is now approaching or past its typical 15-20 year service life.",
    decisionItems: [
      "Say whether your unit is tankless or a traditional tank, since troubleshooting and emergency response differ.",
      "For a tankless unit, note if there's an error code displayed, since that can speed up diagnosis.",
      "For a traditional tank in an older East/Central Plano home, note the unit's approximate age.",
      "Describe whether water is actively leaking, pooling, or the unit has simply stopped producing hot water."
    ],
    providerTitle: "What a Plano water heater provider may check",
    providerItems: [
      "Tankless unit error codes, venting, and flow-sensor issues common to West Plano installations.",
      "Traditional tank age and condition in East/Central Plano homes from the 1970s-80s.",
      "Whether a leak is from the tank or connections versus a tankless unit's internal components.",
      "Whether an existing pan and drain line are functioning as a backup against water damage."
    ],
    safetyTitle: "When a Plano water heater issue is urgent",
    safetyItems: [
      "A tankless unit displaying an error code alongside no hot water.",
      "Active water pooling around a traditional tank unit.",
      "A rotten-egg smell, which can indicate a gas leak and requires shutting off the gas supply.",
      "No hot water combined with visible rust or corrosion at a tank unit's base."
    ],
    preventionTitle: "Plano-specific prevention notes",
    preventionItems: [
      "West Plano tankless units benefit from periodic professional descaling and maintenance to avoid mid-use failures.",
      "East/Central Plano traditional tank units original to 1970s-80s homes are well past typical service life and worth a proactive check.",
      "Note whether your unit is tankless or a tank when requesting service so the right technician and parts are dispatched."
    ],
    extraFaqs: [
      {
        question: "Do Plano tankless water heaters fail differently than traditional tanks?",
        answer:
          "Yes. A tankless unit, more common in West Plano's newer construction, typically fails with an error code or a flow/venting issue rather than a tank leak, while a traditional tank unit common in East/Central Plano's older homes is more likely to leak or corrode as it ages."
      }
    ],
    extraLinks: [
      { label: "Plano service area", href: "/cities/plano" },
      { label: "Water heater emergency service", href: "/services/water-heater-emergency" },
      { label: "24-hour emergency plumber in Plano", href: "/cities/plano/24-hour-emergency-plumber" }
    ]
  },
  "plano/toilet-overflow-emergency": {
    decisionTitle: "Plano toilet overflow decision guide",
    decisionIntro:
      "West Plano's newer patio homes and townhomes often share walls and slab plumbing runs, while East and Central Plano's older houses are more likely to still have original cast-iron waste stacks prone to buildup.",
    decisionItems: [
      "Say whether your property is a newer West Plano patio home/townhome or an older East/Central Plano house, since shared-wall plumbing changes who else may be affected.",
      "Describe whether the toilet is overflowing from a simple clog or backing up alongside other fixtures.",
      "Note your home's approximate age if it's an older house with original cast-iron waste lines.",
      "Mention if water has reached flooring outside the bathroom or a shared wall, which changes response urgency."
    ],
    providerTitle: "What a Plano toilet overflow provider may check",
    providerItems: [
      "Whether the blockage is isolated to the toilet's trap or extends into a shared branch line in West Plano patio homes/townhomes.",
      "Original cast-iron waste line condition in older East/Central Plano houses.",
      "Water damage risk to shared walls or flooring depending on construction type.",
      "Whether the issue affects a single unit or points to a shared-line problem in attached construction."
    ],
    safetyTitle: "When a Plano toilet overflow is urgent",
    safetyItems: [
      "Water continuing to rise after the shutoff valve behind the toilet has been closed.",
      "Overflow reaching a shared wall in attached West Plano construction.",
      "Multiple fixtures backing up at the same time as the toilet.",
      "Wastewater rather than clean water, which raises cleanup and health urgency."
    ],
    preventionTitle: "Plano-specific prevention notes",
    preventionItems: [
      "Older East/Central Plano houses with original cast-iron waste lines benefit from periodic camera inspection even between overflow incidents.",
      "West Plano patio home and townhome owners benefit from knowing whether plumbing is shared with an adjoining unit.",
      "Know the location of the toilet's shutoff valve in advance so water flow can be stopped immediately."
    ],
    extraFaqs: [
      {
        question: "Do Plano patio homes and townhomes need different toilet overflow handling?",
        answer:
          "Often, yes. West Plano's newer attached patio homes and townhomes can share wall or slab plumbing runs, so an overflow may need to be flagged to an adjoining owner, unlike a detached East or Central Plano house with fully independent plumbing."
      }
    ],
    extraLinks: [
      { label: "Plano service area", href: "/cities/plano" },
      { label: "Toilet overflow emergency service", href: "/services/toilet-overflow-emergency" },
      { label: "Sink and shower drain backup", href: "/services/sink-and-shower-drain-backup" }
    ]
  },
  "plano/burst-pipe-emergency": {
    decisionTitle: "Plano burst pipe decision guide",
    decisionIntro:
      "East and Central Plano's original 1970s-80s copper and galvanized lines can fail suddenly as they age past 40-50 years, while West Plano's newer PEX manifold systems rarely burst outright but can fail at a manifold valve or fitting.",
    decisionItems: [
      "Say whether your home is in East/Central Plano's older construction or West Plano's newer PEX-manifold construction.",
      "For an older home, note whether the failure is a sudden rupture or a worsening pinhole leak.",
      "For a newer PEX manifold home, describe whether the failure point is at a manifold valve or fitting versus mid-line.",
      "Confirm whether the home's main shutoff has already been closed to stop water flow before a provider arrives."
    ],
    providerTitle: "What a Plano burst pipe provider may check",
    providerItems: [
      "Original copper or galvanized line condition and thinning in East/Central Plano homes from the 1970s-80s.",
      "PEX manifold valve and fitting condition in newer West Plano construction.",
      "Whether a freeze event or pressure spike likely triggered the failure.",
      "Extent of water damage to flooring and drywall once the leak source is controlled."
    ],
    safetyTitle: "When a Plano burst pipe is urgent",
    safetyItems: [
      "Active, uncontrolled water flow anywhere in the home.",
      "Water near electrical outlets, panels, or fixtures.",
      "A shutoff valve that will not fully close during an active leak.",
      "A PEX manifold failure affecting multiple fixtures simultaneously."
    ],
    preventionTitle: "Plano-specific prevention notes",
    preventionItems: [
      "East/Central Plano homes with original copper or galvanized lines from the 1970s-80s benefit from a proactive assessment given their age.",
      "West Plano PEX manifold systems benefit from a periodic check of manifold valves and fittings even though outright bursts are less common.",
      "Know the location of the home's main shutoff valve in advance so water flow can be stopped immediately during a burst."
    ],
    extraFaqs: [
      {
        question: "Do West Plano's newer homes still get burst pipes?",
        answer:
          "Less often than East/Central Plano's older copper and galvanized homes, but a West Plano PEX manifold system can still fail at a valve or fitting. Mentioning your home's plumbing generation helps the provider anticipate which failure type is more likely."
      }
    ],
    extraLinks: [
      { label: "Plano service area", href: "/cities/plano" },
      { label: "Burst pipe emergency service", href: "/services/burst-pipe-emergency" },
      { label: "24-hour emergency plumber in Plano", href: "/cities/plano/24-hour-emergency-plumber" }
    ]
  },
  "plano/sewer-backup-help": {
    decisionTitle: "Plano sewer backup decision guide",
    decisionIntro:
      "A recurring sewer backup near Downtown Plano or other older, tree-lined sections often points to established root intrusion into an aging clay or cast-iron lateral, while a first-time backup in newer West Plano construction is more likely debris-related or a municipal-side issue.",
    decisionItems: [
      "Mention if your home is in an older, tree-lined section of Plano, since root intrusion into an aging lateral is a documented local pattern.",
      "Describe whether the backup affects the lowest fixtures in the home first, a common main-line symptom.",
      "Note whether this is a first-time or recurring backup, since recurrence often points to established root growth.",
      "Ask whether the provider can distinguish a private lateral issue from a municipal main-line issue."
    ],
    providerTitle: "What a Plano sewer backup provider may check",
    providerItems: [
      "Root intrusion at lateral joints in older, heavily-treed neighborhoods near Downtown Plano.",
      "Camera inspection of the private lateral to rule out a structural break or established root growth.",
      "Whether newer West Plano construction points to a debris clog rather than a root-related issue.",
      "Whether the issue is isolated to the property or points to a broader municipal main-line problem."
    ],
    safetyTitle: "When a Plano sewer backup is urgent",
    safetyItems: [
      "Sewage backing up into the lowest fixtures or floor drains.",
      "Standing wastewater in a yard or living space.",
      "Multiple fixtures backing up at once rather than a single slow drain.",
      "A backup that recurs shortly after a previous clearing, pointing to established root growth."
    ],
    preventionTitle: "Plano-specific prevention notes",
    preventionItems: [
      "Homes in older, tree-lined sections benefit from periodic lateral inspection even without an active backup.",
      "Avoid planting new trees directly over a known lateral path in established neighborhoods.",
      "Note whether neighbors have reported similar issues, which helps distinguish a private-line from a municipal-line problem."
    ],
    extraFaqs: [
      {
        question: "Is a recurring Plano sewer backup always caused by tree roots?",
        answer:
          "Not always, but recurring backups near Downtown Plano and other older, tree-lined sections are commonly root-related given the mature tree canopy above aging clay or cast-iron laterals there. A camera inspection is the reliable way to confirm root intrusion versus a different cause."
      }
    ],
    extraLinks: [
      { label: "Plano service area", href: "/cities/plano" },
      { label: "Sewer backup help service", href: "/services/sewer-backup-help" },
      { label: "Main sewer line clog in Plano", href: "/cities/plano/main-sewer-line-clog" }
    ]
  },
  "plano/commercial-emergency-plumbing": {
    decisionTitle: "Plano commercial emergency plumbing decision guide",
    decisionIntro:
      "Plano's commercial plumbing spans large West Plano corporate campuses like Legacy West alongside older, smaller commercial buildings near Downtown Plano -- building scale and age both affect how a commercial plumbing issue should be described.",
    decisionItems: [
      "Say whether the property is a large corporate campus (Legacy West or similar) or an older, smaller Downtown Plano building.",
      "Mention if the business is a restaurant or food-service operation, since grease-trap and kitchen-drain issues need specific provider experience.",
      "Describe how many restrooms, floors, or tenants are affected, since larger campus buildings raise urgency due to occupancy.",
      "Note current business hours and whether the issue is affecting customers, employees, or staff right now."
    ],
    providerTitle: "What a Plano commercial provider may check",
    providerItems: [
      "Restroom and break-room fixture counts and usage patterns relevant to large West Plano corporate campuses.",
      "Grease trap condition and kitchen drain lines for restaurant and food-service tenants.",
      "Shared plumbing infrastructure in older Downtown Plano buildings versus dedicated systems in newer campus construction.",
      "Whether the issue is isolated to one tenant space or affects shared building infrastructure."
    ],
    safetyTitle: "When a Plano commercial plumbing issue is urgent",
    safetyItems: [
      "Restroom facilities unusable during business hours in a high-occupancy corporate campus building.",
      "Kitchen drain or grease trap backup during active food service.",
      "Water intrusion affecting inventory, equipment, or electrical systems.",
      "Any issue affecting multiple tenants in a shared commercial building."
    ],
    preventionTitle: "Plano-specific prevention notes",
    preventionItems: [
      "Large corporate campus buildings benefit from a scheduled plumbing maintenance program given their higher occupancy.",
      "Restaurants and food-service tenants benefit from a regular grease trap service schedule.",
      "Property managers of older Downtown Plano buildings benefit from a baseline plumbing infrastructure assessment given their age."
    ],
    extraFaqs: [
      {
        question: "Do large Plano corporate campuses need a different commercial plumbing response?",
        answer:
          "Often, yes. A large campus building like those in Legacy West has higher restroom and break-room fixture counts and usage than an older, smaller Downtown Plano building, so mentioning the building's scale and occupancy helps match the right response."
      }
    ],
    extraLinks: [
      { label: "Plano service area", href: "/cities/plano" },
      { label: "Commercial emergency plumbing service", href: "/services/commercial-emergency-plumbing" },
      { label: "Same-day plumber connection in Plano", href: "/cities/plano/same-day-plumber-connection" }
    ]
  },
  "plano/same-day-plumber-connection": {
    decisionTitle: "Plano same-day plumber decision guide",
    decisionIntro:
      "Plano's East/Central and West sections have different plumbing profiles, so sharing which part of the city you're in helps match a provider familiar with your home's likely system and able to realistically reach you today.",
    decisionItems: [
      "Share your neighborhood or section of Plano (East/Central versus West) so provider proximity and system familiarity can be considered.",
      "Describe why the request is time-sensitive -- a move-in date, an inspection deadline, or a non-emergency issue you'd still like resolved today.",
      "Note whether your home has a tankless or traditional water heater and copper, galvanized, or PEX supply lines if known.",
      "Mention if this is a follow-up to a previous repair, since context can help the provider prepare before arriving."
    ],
    providerTitle: "What helps a Plano same-day request move faster",
    providerItems: [
      "Neighborhood or section-of-Plano information so the request can be matched to a provider realistically able to reach you today.",
      "A clear description of the issue and any time constraints, such as a closing date or move timeline.",
      "Known plumbing generation (older copper/galvanized versus newer tankless/PEX), since this can affect which technician is best suited.",
      "Confirmation that someone will be available at the property during the arranged window."
    ],
    safetyTitle: "When a same-day request should be treated as more urgent",
    safetyItems: [
      "The issue is worsening while waiting for a scheduled appointment.",
      "A property sale, lease, or move-in deadline depends on same-day resolution.",
      "Multiple fixtures or a whole section of the home is currently unusable.",
      "The issue was flagged during an inspection and needs resolution before a closing date."
    ],
    preventionTitle: "Plano-specific scheduling notes",
    preventionItems: [
      "Sharing whether you're in East/Central or West Plano helps match a technician familiar with that area's typical plumbing systems.",
      "Sharing flexible timing when possible increases the chance of same-day availability.",
      "Confirm pricing and arrival windows directly with the matched provider once availability is known."
    ],
    extraFaqs: [
      {
        question: "Does it matter which part of Plano I'm in for same-day service?",
        answer:
          "It can help. East/Central and West Plano have different typical plumbing systems (older copper/galvanized versus newer tankless/PEX), so mentioning your section of the city and construction era can help match a provider experienced with your home's likely setup."
      }
    ],
    extraLinks: [
      { label: "Plano service area", href: "/cities/plano" },
      { label: "Same-day plumber connection service", href: "/services/same-day-plumber-connection" },
      { label: "Commercial emergency plumbing in Plano", href: "/cities/plano/commercial-emergency-plumbing" }
    ]
  },
  "plano/sink-and-shower-drain-backup": {
    decisionTitle: "Plano sink and shower drain backup decision guide",
    decisionIntro:
      "East and Central Plano's older galvanized or cast-iron branch drain lines narrow gradually from decades of scale, while West Plano's newer PVC branch lines are far less prone to that kind of buildup.",
    decisionItems: [
      "Note your home's approximate age and section of Plano, since branch line material differs significantly between older and newer construction.",
      "Describe whether the backup is in a sink, a shower, or both, and whether it's gradual or sudden.",
      "Mention if other fixtures on the same side of the house have also been draining slowly, which can indicate a shared branch-line issue.",
      "Say whether this is a recurring issue, since repeat slow drains in an older home often point to a narrowing pipe rather than a one-time clog."
    ],
    providerTitle: "What a Plano drain backup provider may check",
    providerItems: [
      "Original galvanized or cast-iron branch line condition and interior narrowing in older East/Central Plano homes.",
      "PVC branch line condition in newer West Plano construction, where clogs are more often debris-related.",
      "Whether multiple fixtures share a branch line that may need clearing as a unit.",
      "Whether a camera inspection is warranted for a recurring backup in an older branch line."
    ],
    safetyTitle: "When a Plano sink or shower backup is urgent",
    safetyItems: [
      "Water backing up into a shower or tub rather than simply draining slowly.",
      "Multiple fixtures backing up around the same time.",
      "Standing water that doesn't clear between uses.",
      "A foul odor accompanying the slow drain, which can indicate trapped organic buildup."
    ],
    preventionTitle: "Plano-specific prevention notes",
    preventionItems: [
      "Older East/Central Plano homes with galvanized or cast-iron branch lines benefit from periodic professional clearing rather than repeated chemical treatments.",
      "West Plano homeowners with newer PVC branch lines can typically rely on standard maintenance without the same scale-buildup concern.",
      "Note the home's build era and section of Plano when requesting service so the right clearing method is used."
    ],
    extraFaqs: [
      {
        question: "Why do older Plano homes get more recurring drain backups than newer ones?",
        answer:
          "East and Central Plano's older homes more often have galvanized or cast-iron branch drain lines that narrow gradually over decades from scale buildup, while West Plano's newer PVC branch lines from the 1990s-2000s growth period are far less prone to that kind of narrowing."
      }
    ],
    extraLinks: [
      { label: "Plano service area", href: "/cities/plano" },
      { label: "Sink and shower drain backup service", href: "/services/sink-and-shower-drain-backup" },
      { label: "Emergency drain cleaning in Plano", href: "/cities/plano/emergency-drain-cleaning" }
    ]
  }
};
