import type { PageEnhancement } from "./pageEnhancements";

// Arlington expansion (batch 3 of the PlumbingHands content-gap fix, see
// Task128/Task138 in the project docs): real, non-generic enhancement content
// for the 8 services that had ZERO Arlington-specific content
// (main-sewer-line-clog, water-heater-emergency, toilet-overflow-emergency,
// burst-pipe-emergency, sewer-backup-help, commercial-emergency-plumbing,
// same-day-plumber-connection, sink-and-shower-drain-backup). Facts reused
// (1970s-90s slab-construction boom, original copper lines 40-50 years old,
// UTA and the entertainment district, shared-era municipal/subdivision lines
// prone to cluster failures) are the SAME already-established Arlington facts
// already live in the existing arlington/24-hour-emergency-plumber and
// arlington/emergency-drain-cleaning entries in pageEnhancements.ts. AT&T
// Stadium, Globe Life Field, and Six Flags Over Texas are real, well-known
// Arlington landmarks used here as general geography, not invented statistics.
export const arlingtonExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "arlington/main-sewer-line-clog": {
    decisionTitle: "Arlington main sewer line decision guide",
    decisionIntro:
      "Arlington's dense 1970s-90s subdivisions often have clay or cast-iron sewer laterals installed in the same construction window as neighboring homes, so laterals across a whole cluster can approach the end of their service life around the same time.",
    decisionItems: [
      "Mention if neighbors have reported similar sewer issues recently, since shared-era laterals can fail in clusters.",
      "Describe whether multiple fixtures back up at once, which points to a main-line issue rather than a single fixture clog.",
      "Note if the property is a UTA-area rental with shared building laterals.",
      "Ask whether a camera inspection is appropriate given the subdivision's build era."
    ],
    providerTitle: "What an Arlington main sewer line provider may check",
    providerItems: [
      "Clay or cast-iron lateral condition typical of 1970s-90s Arlington construction.",
      "Whether the failure pattern matches other reports in the same subdivision.",
      "Shared lateral configuration in UTA-area multi-tenant properties.",
      "Cleanout access and location, which can vary by subdivision phase."
    ],
    safetyTitle: "When an Arlington main sewer line issue is urgent",
    safetyItems: [
      "Multiple fixtures backing up together at the lowest points in the home.",
      "Sewage odor or pooling near an outdoor cleanout.",
      "Wastewater reaching shared areas in a UTA-area multi-tenant property.",
      "A backup that recurs shortly after a previous clearing, pointing to a structural issue."
    ],
    preventionTitle: "Arlington-specific prevention notes",
    preventionItems: [
      "Homes in 1970s-90s subdivisions benefit from periodic camera inspection of the lateral as it approaches the end of typical service life.",
      "Ask neighbors if similar sewer issues have occurred, since shared-era laterals can fail around the same time.",
      "UTA-area rental properties benefit from documented sewer history for landlord coordination."
    ],
    extraFaqs: [
      {
        question: "Why might several Arlington homes have sewer line issues around the same time?",
        answer:
          "Much of Arlington was developed in dense phases during the 1970s-90s, so homes in the same subdivision often share clay or cast-iron laterals installed in the same window, meaning cluster-area failures can occur as those laterals age."
      }
    ],
    extraLinks: [
      { label: "Arlington service area", href: "/cities/arlington" },
      { label: "Main sewer line clog service", href: "/services/main-sewer-line-clog" },
      { label: "Sewer backup help", href: "/services/sewer-backup-help" }
    ]
  },
  "arlington/water-heater-emergency": {
    decisionTitle: "Arlington water heater emergency decision guide",
    decisionIntro:
      "Most Arlington homes are slab-built from the 1970s-90s boom, so water heaters sit in an interior closet or garage rather than a basement. A home from that era has often already had at least one water heater replacement -- if not, the original unit is now well past typical 8-12 year service life.",
    decisionItems: [
      "Say whether the unit is original to the home or has been replaced, since this changes the likely failure cause.",
      "Note the unit's location -- interior closet or garage -- since access and shutoff steps differ.",
      "Describe whether water is actively leaking, pooling, or the unit has simply stopped producing hot water.",
      "Mention if the unit is in an interior closet near flooring, since a slow leak there can cause hidden damage."
    ],
    providerTitle: "What an Arlington water heater provider may check",
    providerItems: [
      "Whether the unit's age suggests it's original to a 1970s-90s home or a later replacement.",
      "Water damage risk specific to interior-closet installations common in Arlington's slab construction.",
      "Whether a leak is from the tank itself, a fitting, or the temperature-and-pressure relief valve.",
      "Whether an existing pan and drain line are functioning as a backup against interior water damage."
    ],
    safetyTitle: "When an Arlington water heater issue is urgent",
    safetyItems: [
      "Active water pooling around the unit, especially in an interior closet near flooring.",
      "A rotten-egg smell, which can indicate a gas leak and requires shutting off the gas supply.",
      "Loud popping or rumbling from the unit, which can precede tank failure.",
      "No hot water combined with visible rust or corrosion at the tank's base."
    ],
    preventionTitle: "Arlington-specific prevention notes",
    preventionItems: [
      "A water heater original to a 1970s-90s Arlington home is well past typical service life and worth a proactive check.",
      "Interior-closet installations benefit from a working drain pan and periodic visual check, since a leak there is easy to miss.",
      "Note the unit's approximate age and location when requesting service so the right replacement options can be discussed if needed."
    ],
    extraFaqs: [
      {
        question: "How old is too old for an Arlington water heater?",
        answer:
          "Typical water heater service life is 8-12 years, so a unit original to a 1970s-90s Arlington home would be decades past that. If your unit has never been replaced, a proactive age and condition check is worth requesting before it fails."
      }
    ],
    extraLinks: [
      { label: "Arlington service area", href: "/cities/arlington" },
      { label: "Water heater emergency service", href: "/services/water-heater-emergency" },
      { label: "24-hour emergency plumber in Arlington", href: "/cities/arlington/24-hour-emergency-plumber" }
    ]
  },
  "arlington/toilet-overflow-emergency": {
    decisionTitle: "Arlington toilet overflow decision guide",
    decisionIntro:
      "UTA-area rentals see high tenant turnover, so a new resident often has no history of a unit's plumbing, while owner-occupied 1970s-90s subdivision homes are more likely to still have original cast-iron waste lines prone to buildup.",
    decisionItems: [
      "Say whether the property is a UTA-area rental or an owner-occupied home, since plumbing history availability differs.",
      "Describe whether the toilet is overflowing from a simple clog or backing up alongside other fixtures.",
      "Note your home's approximate age if it's an owner-occupied house, since original cast-iron waste lines are more prone to buildup.",
      "Mention if water has reached flooring outside the bathroom, which changes response urgency."
    ],
    providerTitle: "What an Arlington toilet overflow provider may check",
    providerItems: [
      "Whether the blockage is isolated to the toilet's trap or extends into a shared branch line.",
      "Original cast-iron waste line condition in 1970s-90s owner-occupied homes.",
      "In UTA-area rentals, whether the issue is unit-specific or a shared-building problem worth flagging to a landlord.",
      "Water damage to flooring, particularly relevant in multi-unit rental buildings."
    ],
    safetyTitle: "When an Arlington toilet overflow is urgent",
    safetyItems: [
      "Water continuing to rise after the shutoff valve behind the toilet has been closed.",
      "Overflow reaching flooring outside the bathroom or, in a rental building, a neighboring unit.",
      "Multiple fixtures backing up at the same time as the toilet.",
      "Wastewater rather than clean water, which raises cleanup and health urgency."
    ],
    preventionTitle: "Arlington-specific prevention notes",
    preventionItems: [
      "Owner-occupied homes with original cast-iron waste lines benefit from periodic camera inspection even between overflow incidents.",
      "UTA-area renters benefit from asking a landlord about prior plumbing history when moving in.",
      "Know the location of the toilet's shutoff valve in advance so water flow can be stopped immediately."
    ],
    extraFaqs: [
      {
        question: "Do Arlington rental properties near UTA need a different approach to toilet overflows?",
        answer:
          "Often the biggest difference is history: a new tenant near UTA typically has no record of the unit's plumbing, while an owner-occupied 1970s-90s home nearby may have documented issues with original cast-iron lines. Mentioning which situation applies helps the provider respond appropriately."
      }
    ],
    extraLinks: [
      { label: "Arlington service area", href: "/cities/arlington" },
      { label: "Toilet overflow emergency service", href: "/services/toilet-overflow-emergency" },
      { label: "Sink and shower drain backup", href: "/services/sink-and-shower-drain-backup" }
    ]
  },
  "arlington/burst-pipe-emergency": {
    decisionTitle: "Arlington burst pipe decision guide",
    decisionIntro:
      "The same 1970s-90s original copper lines behind Arlington's pinhole-leak pattern can also fail suddenly rather than gradually -- a full rupture rather than a slow spray -- especially where a section has already thinned from age or is exposed to a hard freeze.",
    decisionItems: [
      "Say whether the failure is a sudden rupture or appears to be a worsening pinhole leak, since the response can differ.",
      "Note your home's approximate age, since original 1970s-90s copper lines are the most likely to fail suddenly at 40-50 years old.",
      "Describe whether the affected line is exposed (exterior wall, garage, attic) or underground/slab-level.",
      "Confirm whether the home's main shutoff has already been closed to stop water flow before a provider arrives."
    ],
    providerTitle: "What an Arlington burst pipe provider may check",
    providerItems: [
      "Original copper line condition and thinning in 1970s-90s Arlington homes.",
      "Whether a freeze event or water pressure spike likely triggered a sudden rupture in aging copper.",
      "Extent of water damage to flooring and drywall once the leak source is controlled.",
      "Whether nearby fixtures show early signs of the same age-related copper thinning."
    ],
    safetyTitle: "When an Arlington burst pipe is urgent",
    safetyItems: [
      "Active, uncontrolled water flow anywhere in the home.",
      "Water near electrical outlets, panels, or fixtures.",
      "A shutoff valve that will not fully close during an active leak.",
      "Water pooling near the foundation in slab-built homes."
    ],
    preventionTitle: "Arlington-specific prevention notes",
    preventionItems: [
      "Original copper lines from the 1970s-90s benefit from a proactive assessment given their age, since a sudden rupture can follow the same slow thinning that causes pinhole leaks.",
      "A whole-home pressure check can identify whether high pressure is accelerating copper aging and rupture risk.",
      "Know the location of the home's main shutoff valve in advance so water flow can be stopped immediately during a burst."
    ],
    extraFaqs: [
      {
        question: "Is a burst pipe different from the pinhole leaks common in Arlington?",
        answer:
          "Yes -- a pinhole leak is a small, gradual spray from copper thinning, while a burst pipe is a sudden full-line failure at a weakened point. Both stem from the same 1970s-90s original copper aging past 40-50 years, so a home with a history of pinhole leaks is also at higher risk of an eventual burst."
      }
    ],
    extraLinks: [
      { label: "Arlington service area", href: "/cities/arlington" },
      { label: "Burst pipe emergency service", href: "/services/burst-pipe-emergency" },
      { label: "24-hour emergency plumber in Arlington", href: "/cities/arlington/24-hour-emergency-plumber" }
    ]
  },
  "arlington/sewer-backup-help": {
    decisionTitle: "Arlington sewer backup decision guide",
    decisionIntro:
      "Arlington's shared-era subdivision laterals can fail in clusters as they age, and entertainment-district properties near AT&T Stadium, Globe Life Field, and Six Flags Over Texas see sharp, event-driven surges in restroom usage that can stress older commercial lines on game or concert days.",
    decisionItems: [
      "Mention if your home is in a 1970s-90s subdivision where neighbors may share the same lateral installation era.",
      "If the property is a commercial or hospitality business near the entertainment district, note whether the backup coincides with a major event day.",
      "Describe whether the backup affects the lowest fixtures in the home first, a common main-line symptom.",
      "Ask whether the provider can distinguish a private lateral issue from a municipal main-line issue."
    ],
    providerTitle: "What an Arlington sewer backup provider may check",
    providerItems: [
      "Shared-era lateral condition in dense 1970s-90s subdivisions.",
      "Commercial line capacity for entertainment-district restaurants and venues during high-traffic event periods.",
      "Camera inspection of the private lateral to rule out a structural break.",
      "Whether the issue is isolated to the property or points to a broader municipal main-line problem."
    ],
    safetyTitle: "When an Arlington sewer backup is urgent",
    safetyItems: [
      "Sewage backing up into the lowest fixtures or floor drains.",
      "Standing wastewater in a yard, garage, or commercial space during business hours.",
      "Multiple fixtures backing up at once rather than a single slow drain.",
      "A backup that recurs shortly after a previous clearing, pointing to a structural issue."
    ],
    preventionTitle: "Arlington-specific prevention notes",
    preventionItems: [
      "Homes in shared-era subdivisions benefit from periodic lateral inspection even without an active backup.",
      "Entertainment-district businesses benefit from scheduling preventive line maintenance ahead of major event calendars.",
      "Note whether neighbors have reported similar issues, which helps distinguish a private-line from a municipal-line problem."
    ],
    extraFaqs: [
      {
        question: "Do Arlington entertainment-district businesses see more sewer backups on event days?",
        answer:
          "Restaurants and venues near AT&T Stadium, Globe Life Field, and Six Flags Over Texas can see restroom usage spike sharply on game or concert days, which can stress older commercial lines. Scheduling preventive maintenance ahead of a known event calendar can reduce the chance of a mid-event backup."
      }
    ],
    extraLinks: [
      { label: "Arlington service area", href: "/cities/arlington" },
      { label: "Sewer backup help service", href: "/services/sewer-backup-help" },
      { label: "Main sewer line clog in Arlington", href: "/cities/arlington/main-sewer-line-clog" }
    ]
  },
  "arlington/commercial-emergency-plumbing": {
    decisionTitle: "Arlington commercial emergency plumbing decision guide",
    decisionIntro:
      "Arlington's commercial plumbing needs range from entertainment-district restaurants and hospitality venues near AT&T Stadium, Globe Life Field, and Six Flags Over Texas, which face sharp event-driven demand spikes, to steadier UTA-area retail and office plumbing.",
    decisionItems: [
      "Say whether the business is in the entertainment district (stadium, ballpark, or Six Flags-adjacent) or a steadier UTA-area or general commercial location.",
      "Mention if the business is a restaurant or food-service operation, since grease-trap and kitchen-drain issues need specific provider experience.",
      "Describe how many restrooms, floors, or tenants are affected, since higher-occupancy venues raise urgency, especially near event venues.",
      "Note current business hours and whether an event is scheduled nearby that could affect access or urgency."
    ],
    providerTitle: "What an Arlington commercial provider may check",
    providerItems: [
      "Restroom and kitchen line capacity for entertainment-district venues facing event-day surges.",
      "Grease trap condition and kitchen drain lines for restaurant and food-service tenants.",
      "Shared plumbing infrastructure for UTA-area retail and office buildings.",
      "Whether the issue is isolated to one tenant space or affects shared building infrastructure."
    ],
    safetyTitle: "When an Arlington commercial plumbing issue is urgent",
    safetyItems: [
      "Restroom facilities unusable ahead of or during a major event at a nearby venue.",
      "Kitchen drain or grease trap backup during active food service.",
      "Water intrusion affecting inventory, equipment, or electrical systems.",
      "Any issue affecting multiple tenants in a shared commercial building."
    ],
    preventionTitle: "Arlington-specific prevention notes",
    preventionItems: [
      "Entertainment-district venues benefit from scheduling preventive plumbing checks ahead of the event calendar rather than reacting mid-event.",
      "Restaurants and food-service tenants benefit from a regular grease trap service schedule.",
      "Property managers of higher-occupancy buildings benefit from knowing shutoff locations for each tenant space in advance."
    ],
    extraFaqs: [
      {
        question: "Should Arlington entertainment-district venues plan plumbing maintenance around event days?",
        answer:
          "Yes. Restrooms and kitchen lines near AT&T Stadium, Globe Life Field, and Six Flags Over Texas see much higher usage on game, concert, or park days, so scheduling preventive checks ahead of the event calendar reduces the risk of a mid-event emergency."
      }
    ],
    extraLinks: [
      { label: "Arlington service area", href: "/cities/arlington" },
      { label: "Commercial emergency plumbing service", href: "/services/commercial-emergency-plumbing" },
      { label: "Same-day plumber connection in Arlington", href: "/cities/arlington/same-day-plumber-connection" }
    ]
  },
  "arlington/same-day-plumber-connection": {
    decisionTitle: "Arlington same-day plumber decision guide",
    decisionIntro:
      "Arlington sits between Dallas and Fort Worth, and its dense, mostly-uniform 1970s-90s subdivision layout means same-day coverage is fairly consistent citywide -- with the notable exception of entertainment-district event days, when nearby traffic can affect arrival timing.",
    decisionItems: [
      "Share your neighborhood or nearby cross streets so provider proximity within Arlington can be considered.",
      "Mention if a major event is scheduled nearby (stadium, ballpark, or Six Flags), since event-day traffic can affect arrival windows near the entertainment district.",
      "Describe why the request is time-sensitive -- a move-in date, an inspection deadline, or a non-emergency issue you'd still like resolved today.",
      "Note whether the issue is flexible on timing within the day or needs a specific window."
    ],
    providerTitle: "What helps an Arlington same-day request move faster",
    providerItems: [
      "Neighborhood or cross-street information so the request can be matched to a provider realistically able to reach you today.",
      "Awareness of nearby event-day traffic near AT&T Stadium, Globe Life Field, or Six Flags Over Texas that could affect timing.",
      "A clear description of the issue and any time constraints, such as a closing date or move timeline.",
      "Confirmation that someone will be available at the property during the arranged window."
    ],
    safetyTitle: "When a same-day request should be treated as more urgent",
    safetyItems: [
      "The issue is worsening while waiting for a scheduled appointment.",
      "A property sale, lease, or move-in deadline depends on same-day resolution.",
      "Multiple fixtures or a whole section of the home is currently unusable.",
      "The issue was flagged during an inspection and needs resolution before a closing date."
    ],
    preventionTitle: "Arlington-specific scheduling notes",
    preventionItems: [
      "Arlington's uniform subdivision layout generally supports consistent same-day coverage citywide.",
      "Requests near the entertainment district on major event days may have different realistic arrival windows due to traffic.",
      "Confirm pricing and arrival windows directly with the matched provider once availability is known."
    ],
    extraFaqs: [
      {
        question: "Does a stadium event affect same-day plumbing service in Arlington?",
        answer:
          "It can. Traffic around AT&T Stadium, Globe Life Field, or Six Flags Over Texas on a major event day may affect arrival timing for requests near the entertainment district, so mentioning a nearby scheduled event helps set realistic expectations."
      }
    ],
    extraLinks: [
      { label: "Arlington service area", href: "/cities/arlington" },
      { label: "Same-day plumber connection service", href: "/services/same-day-plumber-connection" },
      { label: "Commercial emergency plumbing in Arlington", href: "/cities/arlington/commercial-emergency-plumbing" }
    ]
  },
  "arlington/sink-and-shower-drain-backup": {
    decisionTitle: "Arlington sink and shower drain backup decision guide",
    decisionIntro:
      "Branch drain lines installed during Arlington's 1970s-90s subdivision boom narrow gradually from decades of scale buildup, and because whole subdivisions share that same construction window, a recurring backup in one home can be an early signal for similar-aged homes nearby.",
    decisionItems: [
      "Note your home's approximate age, since original branch drain lines from the 1970s-90s narrow over time and are more prone to slow drains.",
      "Describe whether the backup is in a sink, a shower, or both, and whether it's gradual or sudden.",
      "Mention if other fixtures on the same side of the house have also been draining slowly, which can indicate a shared branch-line issue.",
      "Say whether this is a recurring issue, since repeat slow drains in a home from this era often point to a narrowing pipe."
    ],
    providerTitle: "What an Arlington drain backup provider may check",
    providerItems: [
      "Original branch line condition and interior narrowing typical of 1970s-90s Arlington construction.",
      "Whether multiple fixtures share a branch line that may need clearing as a unit.",
      "Buildup from hair, soap, and grease versus a structural narrowing of the pipe itself.",
      "Whether a camera inspection is warranted for a recurring backup in an aging branch line."
    ],
    safetyTitle: "When an Arlington sink or shower backup is urgent",
    safetyItems: [
      "Water backing up into a shower or tub rather than simply draining slowly.",
      "Multiple fixtures backing up around the same time.",
      "Standing water that doesn't clear between uses.",
      "A foul odor accompanying the slow drain, which can indicate trapped organic buildup."
    ],
    preventionTitle: "Arlington-specific prevention notes",
    preventionItems: [
      "Homes with original 1970s-90s branch lines benefit from periodic professional clearing rather than repeated chemical treatments, which can be harder on older pipe.",
      "A recurring slow drain in a home from this era is worth treating as an early signal rather than repeat DIY clearing.",
      "Note the home's build era when requesting service so the right clearing method is used for the pipe material."
    ],
    extraFaqs: [
      {
        question: "Why do Arlington homes from the same era get similar drain problems?",
        answer:
          "Homes built during Arlington's 1970s-90s subdivision boom typically share the same branch drain pipe materials and installation era, so as those lines age and narrow from scale buildup, similar-aged homes nearby can develop comparable slow-drain issues around the same time."
      }
    ],
    extraLinks: [
      { label: "Arlington service area", href: "/cities/arlington" },
      { label: "Sink and shower drain backup service", href: "/services/sink-and-shower-drain-backup" },
      { label: "Emergency drain cleaning in Arlington", href: "/cities/arlington/emergency-drain-cleaning" }
    ]
  }
};
