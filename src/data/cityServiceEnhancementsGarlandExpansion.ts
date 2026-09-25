import type { PageEnhancement } from "./pageEnhancements";

// Garland expansion (batch 6 of the PlumbingHands content-gap fix, see
// Task128/138/139/140/141 in project docs): real, non-generic enhancement
// content for the 8 services that had ZERO Garland-specific content
// (main-sewer-line-clog, water-heater-emergency, toilet-overflow-emergency,
// burst-pipe-emergency, sewer-backup-help, commercial-emergency-plumbing,
// same-day-plumber-connection, sink-and-shower-drain-backup). Facts reused
// (1960s-80s housing stock in northeast Dallas County, original copper/
// galvanized lines, mature trees over clay/cast-iron laterals, Lake Ray
// Hubbard-adjacent newer construction) are the SAME already-established
// Garland facts already live in the existing garland/24-hour-emergency-plumber
// and garland/emergency-drain-cleaning entries. Downtown Garland's historic
// square and Firewheel Town Center are real, well-known Garland landmarks
// used as general geography, not invented statistics.
export const garlandExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "garland/main-sewer-line-clog": {
    decisionTitle: "Garland main sewer line decision guide",
    decisionIntro:
      "Established 1960s-80s Garland neighborhoods pair mature trees with original clay or cast-iron sewer laterals, a common root-intrusion combination, while newer construction near Lake Ray Hubbard more often has PVC laterals with fewer root-related failures.",
    decisionItems: [
      "Mention if your home is in an older, tree-lined section of Garland, since root intrusion into an aging lateral is more likely there.",
      "Describe whether multiple fixtures back up at once, which points to a main-line issue rather than a single fixture clog.",
      "Note whether your property is near Lake Ray Hubbard's newer construction or Garland's older central neighborhoods.",
      "Ask whether a camera inspection is warranted given the neighborhood's age and tree coverage."
    ],
    providerTitle: "What a Garland main sewer line provider may check",
    providerItems: [
      "Clay or cast-iron lateral condition and root intrusion risk in established 1960s-80s neighborhoods.",
      "PVC lateral condition in newer Lake Ray Hubbard-area construction.",
      "Cleanout access and location for older Garland properties.",
      "Whether a recurring backup suggests established root growth versus a one-time blockage."
    ],
    safetyTitle: "When a Garland main sewer line issue is urgent",
    safetyItems: [
      "Multiple fixtures backing up together at the lowest points in the home.",
      "Sewage odor or pooling near an outdoor cleanout close to mature trees.",
      "A recurring backup after a previous clearing, suggesting established root growth.",
      "Wastewater reaching living space rather than just a slow drain."
    ],
    preventionTitle: "Garland-specific prevention notes",
    preventionItems: [
      "Older, tree-lined Garland properties benefit from periodic camera inspection of the lateral even without an active clog.",
      "Avoid planting new trees directly over a known lateral path in established neighborhoods.",
      "Note your section of Garland and home's construction era when requesting service so the right equipment is dispatched."
    ],
    extraFaqs: [
      {
        question: "Are Garland main sewer line clogs more common in older neighborhoods?",
        answer:
          "Yes. Established 1960s-80s Garland neighborhoods commonly pair mature trees with original clay or cast-iron laterals, a documented root-intrusion combination, while newer construction near Lake Ray Hubbard typically has PVC laterals with fewer root-related failures."
      }
    ],
    extraLinks: [
      { label: "Garland service area", href: "/cities/garland" },
      { label: "Main sewer line clog service", href: "/services/main-sewer-line-clog" },
      { label: "Sewer backup help", href: "/services/sewer-backup-help" }
    ]
  },
  "garland/water-heater-emergency": {
    decisionTitle: "Garland water heater emergency decision guide",
    decisionIntro:
      "Garland's predominantly 1960s-80s housing stock means many water heaters, if not already replaced, are well past typical 8-12 year service life, while newer construction near Lake Ray Hubbard is more likely to have a recent unit.",
    decisionItems: [
      "Note your home's approximate age and whether the water heater has ever been replaced.",
      "Say whether your property is in an older central Garland neighborhood or newer Lake Ray Hubbard-area construction.",
      "Describe whether water is actively leaking, pooling, or the unit has simply stopped producing hot water.",
      "Mention if the unit is in an interior closet or garage, since access and shutoff steps differ."
    ],
    providerTitle: "What a Garland water heater provider may check",
    providerItems: [
      "Unit age and condition relative to Garland's typical 1960s-80s construction era.",
      "Whether a leak is from the tank itself, a fitting, or the temperature-and-pressure relief valve.",
      "Newer unit condition in Lake Ray Hubbard-area construction, where failures are less often age-related.",
      "Whether an existing pan and drain line are functioning as a backup against water damage."
    ],
    safetyTitle: "When a Garland water heater issue is urgent",
    safetyItems: [
      "Active water pooling around the unit, especially near flooring.",
      "A rotten-egg smell, which can indicate a gas leak and requires shutting off the gas supply.",
      "Loud popping or rumbling from the unit, which can precede tank failure.",
      "No hot water combined with visible rust or corrosion at the tank's base."
    ],
    preventionTitle: "Garland-specific prevention notes",
    preventionItems: [
      "Homes with an original or long-unreplaced unit from the 1960s-80s benefit from a proactive age and condition check.",
      "Interior-closet or garage installations benefit from a working drain pan and periodic visual check.",
      "Note the unit's approximate age and location when requesting service so the right replacement options can be discussed if needed."
    ],
    extraFaqs: [
      {
        question: "Why do Garland water heaters fail more often in older neighborhoods?",
        answer:
          "Garland's housing stock is predominantly 1960s-80s construction, so a unit that hasn't been replaced is likely well past typical 8-12 year service life. Newer construction near Lake Ray Hubbard is less likely to have an original, aging unit."
      }
    ],
    extraLinks: [
      { label: "Garland service area", href: "/cities/garland" },
      { label: "Water heater emergency service", href: "/services/water-heater-emergency" },
      { label: "24-hour emergency plumber in Garland", href: "/cities/garland/24-hour-emergency-plumber" }
    ]
  },
  "garland/toilet-overflow-emergency": {
    decisionTitle: "Garland toilet overflow decision guide",
    decisionIntro:
      "Garland's older central homes are more likely to still have original clay or cast-iron waste lines prone to buildup, while newer construction near Lake Ray Hubbard typically runs modern PVC less prone to that kind of blockage.",
    decisionItems: [
      "Note your home's approximate age and section of Garland, since waste line material differs significantly.",
      "Describe whether the toilet is overflowing from a simple clog or backing up alongside other fixtures.",
      "Mention if water has reached flooring outside the bathroom, which changes response urgency.",
      "Ask whether a camera inspection is appropriate for a recurring overflow in an older home."
    ],
    providerTitle: "What a Garland toilet overflow provider may check",
    providerItems: [
      "Whether the blockage is isolated to the toilet's trap or extends into a shared branch or lateral line.",
      "Original clay or cast-iron waste line condition in older central Garland homes.",
      "Newer PVC waste line condition in Lake Ray Hubbard-area construction.",
      "Water damage to flooring, particularly relevant in slab-foundation homes typical of the era."
    ],
    safetyTitle: "When a Garland toilet overflow is urgent",
    safetyItems: [
      "Water continuing to rise after the shutoff valve behind the toilet has been closed.",
      "Overflow reaching flooring outside the bathroom.",
      "Multiple fixtures backing up at the same time as the toilet.",
      "Wastewater rather than clean water, which raises cleanup and health urgency."
    ],
    preventionTitle: "Garland-specific prevention notes",
    preventionItems: [
      "Older central Garland homes with original clay or cast-iron waste lines benefit from periodic camera inspection.",
      "Know the location of the toilet's shutoff valve in advance so water flow can be stopped immediately.",
      "Note the home's build era when requesting service so the right equipment is dispatched."
    ],
    extraFaqs: [
      {
        question: "Why do older Garland homes see more toilet overflow issues?",
        answer:
          "Original clay or cast-iron waste lines common in Garland's 1960s-80s housing stock are more prone to buildup that shows up first as a toilet backup, unlike the modern PVC waste lines typical of newer Lake Ray Hubbard-area construction."
      }
    ],
    extraLinks: [
      { label: "Garland service area", href: "/cities/garland" },
      { label: "Toilet overflow emergency service", href: "/services/toilet-overflow-emergency" },
      { label: "Sink and shower drain backup", href: "/services/sink-and-shower-drain-backup" }
    ]
  },
  "garland/burst-pipe-emergency": {
    decisionTitle: "Garland burst pipe decision guide",
    decisionIntro:
      "Original copper or galvanized supply lines in Garland's 1960s-80s homes can fail suddenly as they age, similar to the pattern seen in neighboring Mesquite and Richardson, while newer Lake Ray Hubbard-area construction is far less likely to see this kind of age-related failure.",
    decisionItems: [
      "Note your home's approximate age, since original 1960s-80s copper or galvanized lines are the most likely to fail suddenly.",
      "Say whether the failure is a sudden rupture or appears to be a worsening pinhole leak.",
      "Describe whether the affected line is exposed (exterior wall, garage, attic) or underground/slab-level.",
      "Confirm whether the home's main shutoff has already been closed to stop water flow before a provider arrives."
    ],
    providerTitle: "What a Garland burst pipe provider may check",
    providerItems: [
      "Original copper or galvanized line condition and thinning in 1960s-80s Garland homes.",
      "Whether a freeze event or pressure spike likely triggered a sudden rupture in aging piping.",
      "Extent of water damage to flooring and drywall once the leak source is controlled.",
      "Whether nearby fixtures show early signs of the same age-related pipe thinning."
    ],
    safetyTitle: "When a Garland burst pipe is urgent",
    safetyItems: [
      "Active, uncontrolled water flow anywhere in the home.",
      "Water near electrical outlets, panels, or fixtures common in older wiring.",
      "A shutoff valve that will not fully close during an active leak.",
      "Water pooling near the foundation in slab-built homes."
    ],
    preventionTitle: "Garland-specific prevention notes",
    preventionItems: [
      "Original copper or galvanized lines from the 1960s-80s benefit from a proactive assessment given their age.",
      "A whole-home pressure check can identify whether high pressure is accelerating pipe aging and rupture risk.",
      "Know the location of the home's main shutoff valve in advance so water flow can be stopped immediately during a burst."
    ],
    extraFaqs: [
      {
        question: "Is Garland's burst pipe risk similar to neighboring cities?",
        answer:
          "Yes. Garland's predominantly 1960s-80s housing stock puts original copper and galvanized supply lines in a similar aging range to neighboring Mesquite and Richardson, all of which see comparable age-related burst-pipe patterns in their older homes."
      }
    ],
    extraLinks: [
      { label: "Garland service area", href: "/cities/garland" },
      { label: "Burst pipe emergency service", href: "/services/burst-pipe-emergency" },
      { label: "24-hour emergency plumber in Garland", href: "/cities/garland/24-hour-emergency-plumber" }
    ]
  },
  "garland/sewer-backup-help": {
    decisionTitle: "Garland sewer backup decision guide",
    decisionIntro:
      "A recurring sewer backup in an established, tree-lined Garland neighborhood often points to root intrusion into an aging clay or cast-iron lateral, while a first-time backup near newer Lake Ray Hubbard construction is more likely debris-related or a municipal-side issue.",
    decisionItems: [
      "Mention if your home is in an older, tree-lined section of Garland, since root intrusion into an aging lateral is a documented local pattern.",
      "Describe whether the backup affects the lowest fixtures in the home first, a common main-line symptom.",
      "Note whether this is a first-time or recurring backup, since recurrence often points to established root growth.",
      "Ask whether the provider can distinguish a private lateral issue from a municipal main-line issue."
    ],
    providerTitle: "What a Garland sewer backup provider may check",
    providerItems: [
      "Root intrusion at lateral joints in older, heavily-treed neighborhoods.",
      "Camera inspection of the private lateral to rule out a structural break or established root growth.",
      "Whether newer Lake Ray Hubbard-area construction points to a debris clog rather than a root-related issue.",
      "Whether the issue is isolated to the property or points to a broader municipal main-line problem."
    ],
    safetyTitle: "When a Garland sewer backup is urgent",
    safetyItems: [
      "Sewage backing up into the lowest fixtures or floor drains.",
      "Standing wastewater in a yard or living space.",
      "Multiple fixtures backing up at once rather than a single slow drain.",
      "A backup that recurs shortly after a previous clearing, pointing to established root growth."
    ],
    preventionTitle: "Garland-specific prevention notes",
    preventionItems: [
      "Homes in older, tree-lined sections benefit from periodic lateral inspection even without an active backup.",
      "Avoid planting new trees directly over a known lateral path in established neighborhoods.",
      "Note whether neighbors have reported similar issues, which helps distinguish a private-line from a municipal-line problem."
    ],
    extraFaqs: [
      {
        question: "Is a Garland sewer backup usually caused by tree roots?",
        answer:
          "Often, in established, tree-lined neighborhoods where mature trees sit above aging clay or cast-iron laterals. A camera inspection is the reliable way to confirm root intrusion versus a different cause, especially for a recurring backup."
      }
    ],
    extraLinks: [
      { label: "Garland service area", href: "/cities/garland" },
      { label: "Sewer backup help service", href: "/services/sewer-backup-help" },
      { label: "Main sewer line clog in Garland", href: "/cities/garland/main-sewer-line-clog" }
    ]
  },
  "garland/commercial-emergency-plumbing": {
    decisionTitle: "Garland commercial emergency plumbing decision guide",
    decisionIntro:
      "Garland's commercial plumbing spans older buildings near the historic Downtown Garland square alongside larger, newer retail and dining at Firewheel Town Center -- building age and scale both affect how a commercial plumbing issue should be described.",
    decisionItems: [
      "Say whether the business is in an older Downtown Garland building or newer Firewheel Town Center-area construction.",
      "Mention if the business is a restaurant or food-service operation, since grease-trap and kitchen-drain issues need specific provider experience.",
      "Describe how many restrooms, floors, or tenants are affected, since higher-occupancy retail centers raise urgency.",
      "Note current business hours and whether the issue is affecting customers or staff right now."
    ],
    providerTitle: "What a Garland commercial provider may check",
    providerItems: [
      "Shared plumbing infrastructure in older Downtown Garland buildings versus dedicated systems in newer Firewheel-area construction.",
      "Grease trap condition and kitchen drain lines for restaurant and food-service tenants.",
      "Restroom fixture counts and usage patterns relevant to higher-occupancy retail centers.",
      "Whether the issue is isolated to one tenant space or affects shared building infrastructure."
    ],
    safetyTitle: "When a Garland commercial plumbing issue is urgent",
    safetyItems: [
      "Restroom facilities unusable while the business is open to customers or staff.",
      "Kitchen drain or grease trap backup during active food service.",
      "Water intrusion affecting inventory, equipment, or electrical systems.",
      "Any issue affecting multiple tenants in a shared commercial building."
    ],
    preventionTitle: "Garland-specific prevention notes",
    preventionItems: [
      "Older Downtown Garland buildings benefit from a baseline plumbing infrastructure assessment given their age.",
      "Restaurants and food-service tenants near Firewheel Town Center benefit from a regular grease trap service schedule.",
      "Property managers of higher-occupancy retail buildings benefit from knowing shutoff locations for each tenant space in advance."
    ],
    extraFaqs: [
      {
        question: "Does an older Downtown Garland building need different plumbing service than Firewheel Town Center?",
        answer:
          "Often, yes. An older Downtown Garland building may have shared or aging plumbing infrastructure worth a baseline assessment, while newer Firewheel-area retail and dining typically has dedicated systems but higher fixture counts due to customer traffic."
      }
    ],
    extraLinks: [
      { label: "Garland service area", href: "/cities/garland" },
      { label: "Commercial emergency plumbing service", href: "/services/commercial-emergency-plumbing" },
      { label: "Same-day plumber connection in Garland", href: "/cities/garland/same-day-plumber-connection" }
    ]
  },
  "garland/same-day-plumber-connection": {
    decisionTitle: "Garland same-day plumber decision guide",
    decisionIntro:
      "Garland's mix of established central neighborhoods and newer Lake Ray Hubbard-area development generally supports consistent same-day coverage across northeast Dallas County.",
    decisionItems: [
      "Share your neighborhood or nearby cross streets so provider proximity within Garland can be considered.",
      "Describe why the request is time-sensitive -- a move-in date, an inspection deadline, or a non-emergency issue you'd still like resolved today.",
      "Note whether your home is older central Garland construction or newer Lake Ray Hubbard-area construction.",
      "Mention if this is a follow-up to a previous repair, since context can help the provider prepare before arriving."
    ],
    providerTitle: "What helps a Garland same-day request move faster",
    providerItems: [
      "Neighborhood or cross-street information so the request can be matched to a provider realistically able to reach you today.",
      "A clear description of the issue and any time constraints, such as a closing date or move timeline.",
      "Whether the request is an inspection, a repair, or an installation, since these often need different scheduling windows.",
      "Confirmation that someone will be available at the property during the arranged window."
    ],
    safetyTitle: "When a same-day request should be treated as more urgent",
    safetyItems: [
      "The issue is worsening while waiting for a scheduled appointment.",
      "A property sale, lease, or move-in deadline depends on same-day resolution.",
      "Multiple fixtures or a whole section of the home is currently unusable.",
      "The issue was flagged during an inspection and needs resolution before a closing date."
    ],
    preventionTitle: "Garland-specific scheduling notes",
    preventionItems: [
      "Garland's mix of established and newer neighborhoods generally supports consistent same-day coverage citywide.",
      "Sharing flexible timing when possible increases the chance of same-day availability.",
      "Confirm pricing and arrival windows directly with the matched provider once availability is known."
    ],
    extraFaqs: [
      {
        question: "Does it matter which part of Garland I'm in for same-day service?",
        answer:
          "Generally not much -- Garland's mix of established central neighborhoods and newer Lake Ray Hubbard-area development supports fairly consistent same-day coverage. Sharing your neighborhood still helps match the closest available provider."
      }
    ],
    extraLinks: [
      { label: "Garland service area", href: "/cities/garland" },
      { label: "Same-day plumber connection service", href: "/services/same-day-plumber-connection" },
      { label: "Commercial emergency plumbing in Garland", href: "/cities/garland/commercial-emergency-plumbing" }
    ]
  },
  "garland/sink-and-shower-drain-backup": {
    decisionTitle: "Garland sink and shower drain backup decision guide",
    decisionIntro:
      "Original galvanized or cast-iron branch drain lines in Garland's 1960s-80s homes narrow gradually from decades of scale, while newer Lake Ray Hubbard-area construction runs modern PVC branch lines far less prone to that kind of buildup.",
    decisionItems: [
      "Note your home's approximate age and section of Garland, since branch line material differs significantly.",
      "Describe whether the backup is in a sink, a shower, or both, and whether it's gradual or sudden.",
      "Mention if other fixtures on the same side of the house have also been draining slowly, which can indicate a shared branch-line issue.",
      "Say whether this is a recurring issue, since repeat slow drains in an older home often point to a narrowing pipe."
    ],
    providerTitle: "What a Garland drain backup provider may check",
    providerItems: [
      "Original galvanized or cast-iron branch line condition and interior narrowing in older Garland homes.",
      "PVC branch line condition in newer Lake Ray Hubbard-area construction, where clogs are more often debris-related.",
      "Whether multiple fixtures share a branch line that may need clearing as a unit.",
      "Whether a camera inspection is warranted for a recurring backup in an older branch line."
    ],
    safetyTitle: "When a Garland sink or shower backup is urgent",
    safetyItems: [
      "Water backing up into a shower or tub rather than simply draining slowly.",
      "Multiple fixtures backing up around the same time.",
      "Standing water that doesn't clear between uses.",
      "A foul odor accompanying the slow drain, which can indicate trapped organic buildup."
    ],
    preventionTitle: "Garland-specific prevention notes",
    preventionItems: [
      "Homes with original galvanized or cast-iron branch lines benefit from periodic professional clearing rather than repeated chemical treatments, which can be harder on older pipe.",
      "A recurring slow drain in an older home is worth treating as an early signal rather than repeat DIY clearing.",
      "Note the home's build era when requesting service so the right clearing method is used for the pipe material."
    ],
    extraFaqs: [
      {
        question: "Why do older Garland homes get more recurring drain backups?",
        answer:
          "Original galvanized or cast-iron branch lines common in Garland's 1960s-80s housing stock narrow gradually over decades from scale buildup, while newer Lake Ray Hubbard-area homes run modern PVC branch lines far less prone to that kind of narrowing."
      }
    ],
    extraLinks: [
      { label: "Garland service area", href: "/cities/garland" },
      { label: "Sink and shower drain backup service", href: "/services/sink-and-shower-drain-backup" },
      { label: "Emergency drain cleaning in Garland", href: "/cities/garland/emergency-drain-cleaning" }
    ]
  }
};
