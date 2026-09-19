import type { PageEnhancement } from "./pageEnhancements";

// Dallas expansion: real, non-generic city-service enhancement content for the
// 8 services that previously had ZERO Dallas-specific enhancement content
// (main-sewer-line-clog, water-heater-emergency, toilet-overflow-emergency,
// burst-pipe-emergency, sewer-backup-help, commercial-emergency-plumbing,
// same-day-plumber-connection, sink-and-shower-drain-backup). Facts reused
// here (Blackland Prairie expansive clay soil, slab-on-grade construction,
// Lakewood / M Streets / Oak Cliff / Kessler Park older neighborhoods with
// original cast iron or galvanized lines, homes 40+ years old) are the SAME
// already-established Dallas facts used in the existing
// dallas/24-hour-emergency-plumber and dallas/emergency-drain-cleaning
// entries in pageEnhancements.ts -- nothing here is invented.
export const dallasExpansionCityServiceEnhancements: Record<string, PageEnhancement> = {
  "dallas/main-sewer-line-clog": {
    decisionTitle: "Dallas main sewer line decision guide",
    decisionIntro:
      "Older central Dallas neighborhoods such as Lakewood, the M Streets, Oak Cliff, and Kessler Park combine mature, decades-old trees with original clay or cast iron sewer laterals -- a common pairing for root intrusion. Dallas's Blackland Prairie clay soil can also shift the line itself over time, separately from root activity.",
    decisionItems: [
      "Mention if your home is in an older tree-lined neighborhood, since mature root systems near an aging lateral are a documented pattern here.",
      "Describe whether multiple fixtures back up at once versus a single slow drain, which helps distinguish a main-line issue from a branch-line clog.",
      "Note your home's approximate age, since pre-1970s Dallas homes are more likely to still have the original clay or cast iron lateral.",
      "Ask whether the provider can run a camera inspection to confirm root intrusion, a cracked line, or a soil-shift misalignment before recommending repair."
    ],
    providerTitle: "What a Dallas main sewer line provider may check",
    providerItems: [
      "Root intrusion at pipe joints, especially in neighborhoods with large mature trees close to the lateral's likely path.",
      "Original clay or cast iron lateral condition in homes built before the 1970s.",
      "Whether Blackland Prairie clay soil movement has separated or misaligned a joint rather than a root or debris clog.",
      "Cleanout access and location, since many older Dallas homes were not built with an easily accessible cleanout."
    ],
    safetyTitle: "When a Dallas main sewer line issue is urgent",
    safetyItems: [
      "Wastewater backing up into multiple fixtures at the lowest points in the home.",
      "Sewage odor or pooling near an outdoor cleanout or the yard.",
      "Gurgling from toilets or drains when other fixtures are used.",
      "Repeated backups after a previous clearing, which can point to a structural break rather than a simple clog."
    ],
    preventionTitle: "Dallas-specific prevention notes",
    preventionItems: [
      "Homes in older, heavily-treed neighborhoods can benefit from periodic camera inspection of the lateral even without an active clog.",
      "Seasonal clay-soil movement means a lateral that was fine last year can shift, so recurring symptoms are worth a full inspection rather than repeat clearing.",
      "Note the home's build era and neighborhood when requesting service so the right camera and clearing equipment are dispatched."
    ],
    extraFaqs: [
      {
        question: "Are Dallas main sewer line clogs usually caused by tree roots?",
        answer:
          "Root intrusion is a common cause in older, heavily-treed Dallas neighborhoods with aging clay or cast iron laterals, but Blackland Prairie clay soil movement can also crack or misalign a line independently of roots. A camera inspection is the reliable way to tell the two apart."
      }
    ],
    extraLinks: [
      { label: "Dallas emergency plumbing", href: "/cities/dallas" },
      { label: "Main sewer line clog service", href: "/services/main-sewer-line-clog" },
      { label: "Sewer backup help", href: "/services/sewer-backup-help" }
    ]
  },
  "dallas/water-heater-emergency": {
    decisionTitle: "Dallas water heater emergency decision guide",
    decisionIntro:
      "Most Dallas homes are slab-on-grade with no basement, so water heaters typically sit in an interior closet, garage, or attic rather than a basement where a leak would be immediately visible. Older homes over 40 years old are more likely to still have an original unit or original flex lines nearing the end of service life.",
    decisionItems: [
      "Say where the unit is located -- interior closet, garage, or attic -- since access and shutoff steps differ by location in a slab-on-grade home.",
      "Note your home's approximate age, since original units and flex lines in older Dallas homes are more likely to be past typical service life.",
      "Describe whether water is actively leaking, pooling, or if the unit has simply stopped producing hot water.",
      "Mention if the unit is in an interior closet near flooring or drywall, since a slow leak there can cause hidden damage before it's noticed."
    ],
    providerTitle: "What a Dallas water heater provider may check",
    providerItems: [
      "Whether the unit's age and flex line condition match typical service life for the home's construction era.",
      "Water damage risk specific to interior-closet installations common in slab-on-grade Dallas homes.",
      "Whether a leak is from the tank itself, a fitting, or the temperature-and-pressure relief valve.",
      "Whether the existing pan and drain line (if present) are functioning as a backup against interior water damage."
    ],
    safetyTitle: "When a Dallas water heater issue is urgent",
    safetyItems: [
      "Active water pooling around the unit, especially in an interior closet near flooring.",
      "A rotten-egg smell, which can indicate a gas leak and requires shutting off the gas supply.",
      "Water heater making loud popping or rumbling sounds, which can precede tank failure.",
      "No hot water combined with visible rust or corrosion at the tank's base."
    ],
    preventionTitle: "Dallas-specific prevention notes",
    preventionItems: [
      "Homes over 40 years old with an original or long-unreplaced unit benefit from a proactive age and condition check before failure.",
      "Interior-closet installations common to slab-on-grade Dallas homes benefit from a working drain pan and periodic visual check, since a leak there is easy to miss.",
      "Note the unit's approximate age and location when requesting service so the right replacement options can be discussed if needed."
    ],
    extraFaqs: [
      {
        question: "Why do Dallas water heaters often sit in interior closets?",
        answer:
          "Most Dallas homes are built slab-on-grade without a basement, so water heaters are commonly placed in an interior closet, garage, or attic instead. This makes a slow leak less immediately visible than in a basement installation, which is why a working drain pan matters."
      }
    ],
    extraLinks: [
      { label: "Dallas emergency plumbing", href: "/cities/dallas" },
      { label: "Water heater emergency service", href: "/services/water-heater-emergency" },
      { label: "24-hour emergency plumber in Dallas", href: "/cities/dallas/24-hour-emergency-plumber" }
    ]
  },
  "dallas/toilet-overflow-emergency": {
    decisionTitle: "Dallas toilet overflow decision guide",
    decisionIntro:
      "Central Dallas has a mix of older single-family homes with original cast iron waste stacks and dense multi-family apartment buildings where a toilet overflow can affect the unit below. The right first step depends on which situation applies.",
    decisionItems: [
      "Say whether you're in a house or an apartment/condo, since shared vertical stacks in multi-family buildings change urgency and who else may be affected.",
      "Describe whether the toilet is overflowing from a simple clog or backing up alongside other fixtures, which can point to a larger line issue.",
      "Note your home's approximate age if it's a house, since original cast iron waste stacks in older Dallas homes are more prone to buildup that shows up first as a toilet backup.",
      "Mention if water has reached flooring outside the bathroom, which changes how urgent the response needs to be."
    ],
    providerTitle: "What a Dallas toilet overflow provider may check",
    providerItems: [
      "Whether the blockage is isolated to the toilet's trap or extends further into a shared branch or stack line.",
      "Original cast iron waste stack condition in older central Dallas homes.",
      "In apartment or condo settings, whether the issue is unit-specific or a shared-stack problem affecting neighboring units.",
      "Water damage to flooring or the ceiling below, particularly relevant in multi-story or multi-unit buildings."
    ],
    safetyTitle: "When a Dallas toilet overflow is urgent",
    safetyItems: [
      "Water continuing to rise after the shutoff valve behind the toilet has been closed.",
      "Overflow reaching flooring outside the bathroom or, in multi-unit buildings, the ceiling of the unit below.",
      "Multiple fixtures backing up at the same time as the toilet, suggesting a larger line problem.",
      "Wastewater rather than clean water, which raises the health and cleanup urgency."
    ],
    preventionTitle: "Dallas-specific prevention notes",
    preventionItems: [
      "Homes with original cast iron waste stacks benefit from periodic camera inspection even between overflow incidents.",
      "In apartment or condo buildings, note whether neighboring units have reported similar issues, since that can indicate a shared-line problem worth flagging to a property manager as well.",
      "Know the location of the toilet's shutoff valve in advance so water flow can be stopped immediately during an overflow."
    ],
    extraFaqs: [
      {
        question: "Can a Dallas apartment toilet overflow affect the unit below?",
        answer:
          "In multi-family buildings with shared vertical stacks, a toilet overflow can affect a neighboring or lower unit, particularly in older buildings. If you're in an apartment or condo, mentioning that to the provider and to your property manager helps get the right response."
      }
    ],
    extraLinks: [
      { label: "Dallas emergency plumbing", href: "/cities/dallas" },
      { label: "Toilet overflow emergency service", href: "/services/toilet-overflow-emergency" },
      { label: "Sink and shower drain backup", href: "/services/sink-and-shower-drain-backup" }
    ]
  },
  "dallas/burst-pipe-emergency": {
    decisionTitle: "Dallas burst pipe decision guide",
    decisionIntro:
      "North Texas experiences periodic hard freezes -- including the well-documented multi-day freeze in February 2021 -- that put stress on exposed or uninsulated pipes, particularly in pre-1980s Dallas homes with original galvanized or copper lines. Separately, Blackland Prairie clay soil movement can stress underground and slab-level lines year-round.",
    decisionItems: [
      "Say whether the burst appears to be from freeze damage (during or after a hard freeze) or happened independently of weather.",
      "Note your home's approximate age, since original galvanized or copper lines in pre-1980s Dallas homes are more vulnerable to both freeze stress and age-related failure.",
      "Describe whether the affected line is exposed (garage, exterior wall, attic) or appears to be underground or slab-level.",
      "Confirm whether the home's main shutoff has already been closed, since stopping water flow is the first priority before a provider arrives."
    ],
    providerTitle: "What a Dallas burst pipe provider may check",
    providerItems: [
      "Freeze-related stress on exposed lines in garages, exterior walls, or attics, especially in older construction.",
      "Original galvanized or copper supply line condition in pre-1980s Dallas homes.",
      "Whether Blackland Prairie clay soil movement contributed to a slab-level or underground break.",
      "Extent of water damage to flooring, drywall, and belongings once the leak source is controlled."
    ],
    safetyTitle: "When a Dallas burst pipe is urgent",
    safetyItems: [
      "Active, uncontrolled water flow anywhere in the home.",
      "Water near electrical outlets, panels, or fixtures.",
      "A shutoff valve that will not fully close during an active leak.",
      "Water pooling near the foundation, which can compound existing clay-soil movement."
    ],
    preventionTitle: "Dallas-specific prevention notes",
    preventionItems: [
      "Homes with original galvanized or copper lines from before 1980 benefit from a proactive assessment ahead of the next hard freeze.",
      "Exposed lines in garages, exterior walls, and attics are the most freeze-vulnerable points in typical Dallas construction and are worth insulating before winter.",
      "Know the location of the home's main shutoff valve in advance so water flow can be stopped immediately during a burst."
    ],
    extraFaqs: [
      {
        question: "Are Dallas burst pipes usually caused by freezing?",
        answer:
          "Freezing is a well-documented cause in North Texas, including during the February 2021 multi-day freeze, particularly for exposed lines in garages, exterior walls, and attics of older homes. Clay-soil movement is a separate, year-round factor that can stress underground and slab-level lines independent of weather."
      }
    ],
    extraLinks: [
      { label: "Dallas emergency plumbing", href: "/cities/dallas" },
      { label: "Burst pipe emergency service", href: "/services/burst-pipe-emergency" },
      { label: "24-hour emergency plumber in Dallas", href: "/cities/dallas/24-hour-emergency-plumber" }
    ]
  },
  "dallas/sewer-backup-help": {
    decisionTitle: "Dallas sewer backup decision guide",
    decisionIntro:
      "Older, heavily-treed Dallas neighborhoods combine mature root systems with aging sewer laterals, and North Texas's heavy spring and summer thunderstorms can add stormwater volume that stresses aging sections of the sewer system. Both can produce a backup, and the right first step is describing which pattern you're seeing.",
    decisionItems: [
      "Note whether the backup started during or shortly after heavy rain, which points toward a stormwater-related surcharge rather than a root or debris clog.",
      "Mention if your home is in an older, heavily-treed neighborhood, since root intrusion into an aging lateral is a documented local pattern.",
      "Describe whether the backup affects the lowest fixtures in the home first (a common main-line symptom) or a single isolated fixture.",
      "Ask whether the provider can distinguish a private lateral issue from a municipal main-line issue, since the fix and responsible party differ."
    ],
    providerTitle: "What a Dallas sewer backup provider may check",
    providerItems: [
      "Root intrusion at lateral joints in older, heavily-treed neighborhoods.",
      "Whether recent heavy rain caused a temporary stormwater-related surcharge versus a standing blockage.",
      "Camera inspection of the private lateral to rule out a structural break from clay-soil movement.",
      "Whether the issue is isolated to the property or appears to be a broader municipal main-line problem worth reporting separately."
    ],
    safetyTitle: "When a Dallas sewer backup is urgent",
    safetyItems: [
      "Sewage backing up into the lowest fixtures or floor drains in the home.",
      "Standing wastewater in a yard, garage, or living space.",
      "Multiple fixtures backing up at once rather than a single slow drain.",
      "A backup that recurs shortly after a previous clearing, which can point to a structural issue."
    ],
    preventionTitle: "Dallas-specific prevention notes",
    preventionItems: [
      "Homes in older, heavily-treed neighborhoods can benefit from periodic lateral inspection even without an active backup.",
      "During heavy rain events, monitoring the lowest drains in the home for early gurgling can provide an early warning before a full backup.",
      "Note whether neighbors have reported similar issues after the same rain event, which helps distinguish a private-line from a municipal-line problem."
    ],
    extraFaqs: [
      {
        question: "Does heavy rain cause Dallas sewer backups?",
        answer:
          "Heavy spring and summer thunderstorms in North Texas can add stormwater volume that stresses aging sections of the sewer system, which can contribute to a backup separately from root intrusion or a private-line clog. Whether the backup started during or right after heavy rain is useful information to share with the provider."
      }
    ],
    extraLinks: [
      { label: "Dallas emergency plumbing", href: "/cities/dallas" },
      { label: "Sewer backup help service", href: "/services/sewer-backup-help" },
      { label: "Main sewer line clog in Dallas", href: "/cities/dallas/main-sewer-line-clog" }
    ]
  },
  "dallas/commercial-emergency-plumbing": {
    decisionTitle: "Dallas commercial emergency plumbing decision guide",
    decisionIntro:
      "Dallas commercial plumbing spans older converted buildings in areas like Deep Ellum and Downtown alongside newer high-density developments in Uptown and the Design District. Building age and occupancy type both affect how a commercial plumbing issue should be described.",
    decisionItems: [
      "Say whether the building is an older converted structure or newer construction, since original plumbing infrastructure differs significantly between the two.",
      "Mention if the business is a restaurant or food-service operation, since grease-trap and kitchen-drain issues need provider experience specific to that equipment.",
      "Describe how many restrooms, floors, or tenants are affected, since higher-occupancy buildings raise the urgency of a given issue.",
      "Note current business hours and whether the issue is affecting customers or staff right now versus being noticed after hours."
    ],
    providerTitle: "What a Dallas commercial provider may check",
    providerItems: [
      "Grease trap condition and kitchen drain lines for restaurant and food-service tenants.",
      "Shared plumbing infrastructure in older converted buildings versus dedicated lines in newer construction.",
      "Restroom fixture counts and usage patterns relevant to higher-occupancy Downtown, Uptown, or Deep Ellum buildings.",
      "Whether the issue is isolated to one tenant space or affects shared building infrastructure."
    ],
    safetyTitle: "When a Dallas commercial plumbing issue is urgent",
    safetyItems: [
      "Restroom facilities unusable while the business is open to customers or staff.",
      "Kitchen drain or grease trap backup during active food service.",
      "Water intrusion affecting inventory, equipment, or electrical systems.",
      "Any issue affecting multiple tenants in a shared commercial building."
    ],
    preventionTitle: "Dallas-specific prevention notes",
    preventionItems: [
      "Restaurants and food-service tenants benefit from a regular grease trap service schedule to reduce emergency kitchen-drain calls.",
      "Older converted commercial buildings in areas like Deep Ellum benefit from a baseline plumbing infrastructure assessment given their age.",
      "Property managers of higher-occupancy buildings benefit from knowing shutoff locations for each tenant space in advance of an emergency."
    ],
    extraFaqs: [
      {
        question: "Do Dallas restaurants need a different plumbing response than an office?",
        answer:
          "Restaurant and food-service plumbing issues often involve grease traps and kitchen drain lines that need provider experience specific to that equipment, unlike a typical office restroom issue. Mentioning that the business is a restaurant helps match the right provider."
      }
    ],
    extraLinks: [
      { label: "Dallas emergency plumbing", href: "/cities/dallas" },
      { label: "Commercial emergency plumbing service", href: "/services/commercial-emergency-plumbing" },
      { label: "Same-day plumber connection in Dallas", href: "/cities/dallas/same-day-plumber-connection" }
    ]
  },
  "dallas/same-day-plumber-connection": {
    decisionTitle: "Dallas same-day plumber decision guide",
    decisionIntro:
      "Dallas covers a large geographic footprint within the broader Dallas-Fort Worth metro, so the distance between a provider and your specific neighborhood affects how realistic same-day service is. Sharing your neighborhood or nearby cross streets helps match a provider that can realistically reach you today.",
    decisionItems: [
      "Share your neighborhood or nearby cross streets so provider proximity within the Dallas area can be considered.",
      "Describe why the request is time-sensitive -- a move-in date, an inspection deadline, or a non-emergency issue you'd still like resolved today.",
      "Note whether the issue is flexible on timing within the day or needs a specific window, such as before or after work hours.",
      "Mention if this is a follow-up to a previous repair, since context can help the provider prepare before arriving."
    ],
    providerTitle: "What helps a Dallas same-day request move faster",
    providerItems: [
      "Neighborhood or cross-street information so the request can be matched to a provider realistically able to reach that part of Dallas today.",
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
    preventionTitle: "Dallas-specific scheduling notes",
    preventionItems: [
      "Because Dallas spans a large area, requests near the city's edges may have different realistic same-day windows than central neighborhoods.",
      "Sharing flexible timing when possible increases the chance of same-day availability across a large metro area.",
      "Confirm pricing and arrival windows directly with the matched provider once availability is known."
    ],
    extraFaqs: [
      {
        question: "Does where I live in Dallas affect same-day availability?",
        answer:
          "Yes. Dallas is geographically large, and provider proximity to your specific neighborhood affects realistic same-day availability. Sharing your neighborhood or nearby cross streets helps match a provider that can reach you today."
      }
    ],
    extraLinks: [
      { label: "Dallas emergency plumbing", href: "/cities/dallas" },
      { label: "Same-day plumber connection service", href: "/services/same-day-plumber-connection" },
      { label: "Commercial emergency plumbing in Dallas", href: "/cities/dallas/commercial-emergency-plumbing" }
    ]
  },
  "dallas/sink-and-shower-drain-backup": {
    decisionTitle: "Dallas sink and shower drain backup decision guide",
    decisionIntro:
      "Older central Dallas homes with original galvanized or cast iron branch drain lines can narrow gradually from decades of scale and corrosion, which shows up first as a slow-draining sink or shower rather than a full backup. Larger Dallas homes with multiple bathrooms may also share a branch line, so one backup can be a preview of a wider issue.",
    decisionItems: [
      "Note your home's approximate age, since original galvanized or cast iron branch lines in older Dallas homes narrow over time and are more prone to slow drains.",
      "Describe whether the backup is in a sink, a shower, or both, and whether it's gradual or sudden.",
      "Mention if other fixtures on the same side of the house have also been draining slowly, which can indicate a shared branch-line issue.",
      "Say whether this is a recurring issue, since repeat slow drains in an older home often point to a narrowing pipe rather than a one-time clog."
    ],
    providerTitle: "What a Dallas drain backup provider may check",
    providerItems: [
      "Original galvanized or cast iron branch line condition and interior narrowing in older Dallas homes.",
      "Whether multiple fixtures share a branch line that may need clearing as a unit rather than fixture by fixture.",
      "Buildup from hair, soap, and grease versus a structural narrowing of the pipe itself.",
      "Whether a camera inspection is warranted for a recurring backup in an older branch line."
    ],
    safetyTitle: "When a Dallas sink or shower backup is urgent",
    safetyItems: [
      "Water backing up into a shower or tub rather than simply draining slowly.",
      "Multiple fixtures backing up around the same time.",
      "Standing water that doesn't clear between uses.",
      "A foul odor accompanying the slow drain, which can indicate trapped organic buildup."
    ],
    preventionTitle: "Dallas-specific prevention notes",
    preventionItems: [
      "Homes with original galvanized or cast iron branch lines benefit from periodic professional clearing rather than repeated over-the-counter chemical treatments, which can be harder on older pipe.",
      "Larger homes with multiple bathrooms on a shared branch line benefit from treating a recurring slow drain as an early signal worth investigating.",
      "Note the home's build era when requesting service so the right clearing method is used for the pipe material."
    ],
    extraFaqs: [
      {
        question: "Why do older Dallas homes get recurring sink and shower drain backups?",
        answer:
          "Original galvanized or cast iron branch lines in older Dallas homes can narrow gradually over decades from scale and corrosion, which shows up as recurring slow drains rather than a single blockage. A camera inspection can confirm whether the pipe itself has narrowed."
      }
    ],
    extraLinks: [
      { label: "Dallas emergency plumbing", href: "/cities/dallas" },
      { label: "Sink and shower drain backup service", href: "/services/sink-and-shower-drain-backup" },
      { label: "Emergency drain cleaning in Dallas", href: "/cities/dallas/emergency-drain-cleaning" }
    ]
  }
};
