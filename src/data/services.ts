export type Service = {
  slug: string;
  name: string;
  categorySlug: string;
  shortAnswer: string;
  urgency: string;
  symptoms: string[];
  steps: string[];
  callPrep: string[];
  commonCauses: string[];
  mistakesToAvoid: string[];
  costDiscussion: string;
  costFactors: string[];
  faqSeed: string[];
};

export const services: Service[] = [
  {
    slug: "24-hour-emergency-plumber",
    name: "24-hour emergency plumber",
    categorySlug: "emergency-plumbing",
    shortAnswer: "If water is actively leaking, a drain is backing up, or an essential fixture cannot be used safely, shut off the closest valve when possible and request urgent plumbing help.",
    urgency: "High",
    symptoms: ["active leak", "water near electrical fixtures", "overflowing toilet", "no usable bathroom", "after-hours plumbing failure"],
    steps: ["Shut off the nearest valve if safe.", "Move items away from water.", "Avoid using backed-up fixtures.", "Call for a provider connection."],
    callPrep: ["Your city and nearest cross streets.", "Which fixture or pipe is affected.", "Whether water is still running.", "Photos are helpful if safe to take."],
    commonCauses: ["failed supply line", "fixture blockage", "broken shutoff valve", "frozen or stressed pipe", "main drain backup"],
    mistakesToAvoid: ["Do not keep running water to test the problem.", "Do not stand in water near electrical fixtures.", "Do not accept guaranteed pricing before diagnosis.", "Do not delay if damage is spreading."],
    costDiscussion: "Emergency plumbing cost in Dallas-Fort Worth depends on timing, diagnosis, access, parts, and whether property damage is active. Confirm dispatch, diagnostic, and repair pricing directly with the matched provider before work starts.",
    costFactors: ["time of day", "severity", "access", "parts needed", "service distance"],
    faqSeed: ["What counts as a plumbing emergency?", "Should I shut off the main water valve?", "Can I wait until morning?"]
  },
  {
    slug: "emergency-drain-cleaning",
    name: "emergency drain cleaning",
    categorySlug: "drain-cleaning",
    shortAnswer: "Emergency drain cleaning is needed when wastewater is backing up, more than one fixture is affected, or a clog blocks a kitchen, bathroom, or business from operating.",
    urgency: "High",
    symptoms: ["multiple slow drains", "standing water", "sewage odor", "gurgling fixtures", "overflowing cleanout"],
    steps: ["Stop running water into the clogged line.", "Do not add chemical drain cleaner after backup starts.", "Note which fixtures are affected.", "Request same-day drain help."],
    callPrep: ["Which drains are slow or backing up.", "Whether toilets, tubs, sinks, or floor drains are involved.", "Any sewer odor or outdoor cleanout overflow.", "Whether chemicals were already used."],
    commonCauses: ["grease buildup", "hair or soap sludge", "foreign object", "root intrusion", "main sewer restriction"],
    mistakesToAvoid: ["Do not pour chemicals into standing water.", "Do not run laundry or dishwasher during a backup.", "Do not keep plunging if another fixture rises.", "Do not ignore recurring slow drains."],
    costDiscussion: "Drain cleaning cost varies by fixture, clog depth, access, and equipment. A simple fixture clog is different from a suspected main sewer line issue, so ask what diagnostic or clearing method is included.",
    costFactors: ["line location", "clog depth", "equipment needed", "after-hours timing", "repeat blockage history"],
    faqSeed: ["When is a clogged drain an emergency?", "Is chemical drain cleaner safe?", "What does same-day drain cleaning include?"]
  },
  {
    slug: "main-sewer-line-clog",
    name: "main sewer line clog",
    categorySlug: "sewer-help",
    shortAnswer: "A main sewer line clog often affects several fixtures at once. Stop using water, avoid flushing toilets, and request urgent sewer line guidance.",
    urgency: "High",
    symptoms: ["toilet and tub backup", "floor drain overflow", "sewage smell", "multiple fixtures affected", "cleanout overflow"],
    steps: ["Stop using sinks, tubs, and toilets.", "Keep people away from contaminated water.", "Check whether a cleanout is overflowing.", "Call for sewer backup help."],
    callPrep: ["Which fixtures are backing up.", "Whether water rises in tubs or showers after flushing.", "Whether an outdoor cleanout is overflowing.", "How long the symptoms have been happening."],
    commonCauses: ["root intrusion", "collapsed or bellied pipe", "grease and sludge buildup", "foreign object", "heavy rain inflow"],
    mistakesToAvoid: ["Do not keep flushing toilets.", "Do not use every fixture to locate the clog.", "Do not touch contaminated water without protection.", "Do not assume it is only one fixture if multiple drains react."],
    costDiscussion: "Main sewer line clog cost can vary widely because clearing, camera inspection, access, and cleanup are separate considerations. Ask the provider what is included before authorizing work.",
    costFactors: ["main line access", "camera inspection need", "root intrusion", "line depth", "cleanup complexity"],
    faqSeed: ["How do I know it is the main sewer line?", "Is a sewer backup dangerous?", "Will drain cleaning fix a main line clog?"]
  },
  {
    slug: "toilet-overflow-emergency",
    name: "toilet overflow emergency",
    categorySlug: "emergency-plumbing",
    shortAnswer: "For an overflowing toilet, turn the toilet supply valve clockwise, avoid repeated flushing, and call if water keeps rising or other drains are backing up.",
    urgency: "High",
    symptoms: ["bowl keeps filling", "water on floor", "toilet backs into tub", "repeated overflow", "sewage odor"],
    steps: ["Turn off the toilet supply valve.", "Lift the tank float if needed.", "Do not flush again.", "Call if backup continues."],
    callPrep: ["Whether the toilet supply valve works.", "Whether a tub or shower backs up too.", "Whether the water is clean or dirty.", "How many toilets are affected."],
    commonCauses: ["fixture clog", "blocked toilet trap", "main line restriction", "failed fill valve", "foreign object"],
    mistakesToAvoid: ["Do not flush repeatedly.", "Do not keep plunging if dirty water rises elsewhere.", "Do not mix chemicals with toilet water.", "Do not ignore sewage odor."],
    costDiscussion: "Toilet overflow cost depends on whether the issue is isolated to the toilet or tied to a deeper drain or sewer line problem. Cleanup and fixture repair may be separate from clearing the blockage.",
    costFactors: ["clog depth", "fixture condition", "floor cleanup", "main line involvement", "time of service"],
    faqSeed: ["How do I stop a toilet from overflowing?", "When is toilet overflow a sewer issue?", "Should I use a plunger?"]
  },
  {
    slug: "burst-pipe-emergency",
    name: "burst pipe emergency",
    categorySlug: "emergency-plumbing",
    shortAnswer: "For a burst pipe, shut off the main water valve, protect electrical areas, and request emergency plumbing help as soon as possible.",
    urgency: "High",
    symptoms: ["water spraying", "ceiling leak", "wall swelling", "sudden pressure loss", "water meter spinning"],
    steps: ["Shut off the main water valve.", "Turn off electricity near standing water if safe.", "Open a low faucet to drain pressure.", "Call for urgent pipe help."],
    callPrep: ["Where water is appearing.", "Whether the main shutoff is closed.", "Pipe material if known.", "Whether ceiling, wall, or slab access may be involved."],
    commonCauses: ["freeze stress", "corrosion", "high pressure", "failed fitting", "accidental damage"],
    mistakesToAvoid: ["Do not leave the main water on.", "Do not touch wet switches or outlets.", "Do not patch over active pressure.", "Do not wait if ceilings or walls are swelling."],
    costDiscussion: "Burst pipe emergency cost depends on pipe location, access, material, and whether surrounding surfaces must be opened. Water mitigation may be a separate service from plumbing repair.",
    costFactors: ["pipe location", "wall or slab access", "material type", "water damage", "after-hours timing"],
    faqSeed: ["Where is my main shutoff valve?", "Is a burst pipe an emergency?", "What should I do before help arrives?"]
  },
  {
    slug: "water-heater-emergency",
    name: "water heater emergency",
    categorySlug: "emergency-plumbing",
    shortAnswer: "A leaking or unsafe water heater needs fast attention. Shut off water and power or gas if safe, then request help for inspection or repair.",
    urgency: "Medium",
    symptoms: ["tank leaking", "no hot water", "rusty water", "popping sounds", "water near heater"],
    steps: ["Turn off water to the heater.", "Turn off power or gas if safe.", "Avoid standing water near electrical parts.", "Call for water heater help."],
    callPrep: ["Tank or tankless type.", "Approximate age and size.", "Whether water is actively leaking.", "Whether gas, breaker, or shutoff is accessible."],
    commonCauses: ["tank corrosion", "failed valve", "heating element issue", "sediment buildup", "supply connector leak"],
    mistakesToAvoid: ["Do not touch electrical components near water.", "Do not relight gas if you smell gas.", "Do not assume a tank leak can always be repaired.", "Do not ignore rusty or expanding leaks."],
    costDiscussion: "Water heater emergency cost depends on repair versus replacement, tank size, access, parts, and code requirements. Confirm whether the provider can explain options before work begins.",
    costFactors: ["tank age", "leak location", "repair versus replacement", "capacity", "code requirements"],
    faqSeed: ["Is a leaking water heater an emergency?", "Should I turn off the breaker?", "Can a water heater leak be repaired?"]
  },
  {
    slug: "sewer-backup-help",
    name: "sewer backup help",
    categorySlug: "sewer-help",
    shortAnswer: "A sewer backup can expose people to contaminated water. Stop using plumbing fixtures, keep the area clear, and request urgent guidance.",
    urgency: "High",
    symptoms: ["sewage in tub", "floor drain backup", "strong odor", "slow drains throughout home", "gurgling toilets"],
    steps: ["Stop all water use.", "Keep children and pets away.", "Avoid DIY cleanup of contaminated water.", "Call for sewer help."],
    callPrep: ["Where sewage or dirty water appears.", "Whether multiple fixtures are affected.", "Any outdoor cleanout overflow.", "Photos of affected areas if safe."],
    commonCauses: ["main sewer blockage", "root intrusion", "city line surcharge", "broken lateral", "heavy rain inflow"],
    mistakesToAvoid: ["Do not keep using water.", "Do not let people walk through contaminated water.", "Do not pour chemicals into backed-up drains.", "Do not delay if backup spreads."],
    costDiscussion: "Sewer backup costs may include clearing the line, diagnosing the cause, and cleanup. Those services can be priced separately, so confirm scope with the provider.",
    costFactors: ["backup severity", "line blockage", "cleanup needs", "camera inspection", "access"],
    faqSeed: ["What should I do during a sewer backup?", "Who handles sewer backup cleanup?", "Can rain cause sewer backup?"]
  },
  {
    slug: "commercial-emergency-plumbing",
    name: "commercial emergency plumbing",
    categorySlug: "emergency-plumbing",
    shortAnswer: "Businesses should call quickly when plumbing stops operations, affects customers, or risks property damage, since downtime and code compliance both factor into how fast a provider needs to respond.",
    urgency: "High",
    symptoms: ["restroom shutdown", "kitchen drain backup", "water on floor", "tenant complaints", "business interruption"],
    steps: ["Stop affected equipment.", "Block off unsafe areas.", "Document impacted fixtures.", "Request commercial plumbing help."],
    callPrep: ["Business type and open hours.", "Which fixtures or equipment are affected.", "Whether customers or tenants are impacted.", "Access instructions for the provider."],
    commonCauses: ["high fixture use", "grease line buildup", "failed flush valve", "supply line break", "main drain restriction"],
    mistakesToAvoid: ["Do not leave unsafe wet areas open.", "Do not run equipment tied to backed-up drains.", "Do not promise tenants a fixed repair time without confirmation.", "Do not ignore recurring business interruptions."],
    costDiscussion: "Commercial emergency plumbing cost depends on business hours, fixture count, access, equipment, and downtime needs. Ask about after-hours options and what is included in the visit.",
    costFactors: ["business hours", "fixture count", "access", "required equipment", "downtime impact"],
    faqSeed: ["When should a business call an emergency plumber?", "Can work happen after hours?", "What information should a manager provide?"]
  },
  {
    slug: "same-day-plumber-connection",
    name: "same-day plumber connection",
    categorySlug: "emergency-plumbing",
    shortAnswer: "A same-day plumber connection helps route urgent non-life-safety plumbing needs to available local providers, for issues that need prompt attention but are not an active emergency.",
    urgency: "Medium",
    symptoms: ["urgent leak", "no usable fixture", "slow drain worsening", "water heater issue", "fixture failure"],
    steps: ["Identify the affected fixture.", "Describe the urgency clearly.", "Share your city and service need.", "Request a provider connection."],
    callPrep: ["City and service need.", "Preferred timing.", "Whether water damage is active.", "Photos or notes about the issue."],
    commonCauses: ["fixture wear", "minor active leak", "slow clog", "water heater trouble", "shutoff failure"],
    mistakesToAvoid: ["Do not describe an active emergency as routine.", "Do not hide prior chemical use.", "Do not wait if water is spreading.", "Do not assume same-day availability is guaranteed."],
    costDiscussion: "Same-day plumbing cost depends on urgency, availability, distance, and the actual diagnosis. Same-day connection does not guarantee a specific price or arrival time.",
    costFactors: ["availability", "problem type", "service area", "parts", "timing"],
    faqSeed: ["How does a plumber connection work?", "Is same-day service guaranteed?", "What details should I share?"]
  },
  {
    slug: "sink-and-shower-drain-backup",
    name: "sink and shower drain backup",
    categorySlug: "drain-cleaning",
    shortAnswer: "When a sink and shower back up together, the problem may be deeper than one fixture. Stop water use and request drain guidance.",
    urgency: "Medium",
    symptoms: ["sink backs into tub", "shower fills when sink runs", "bathroom odor", "slow shared drain", "recurring clog"],
    steps: ["Stop running water.", "Check if other fixtures are affected.", "Avoid chemicals after backup.", "Call for drain help."],
    callPrep: ["Which sink and shower are affected.", "Whether toilets gurgle.", "Whether water is dirty or clean.", "How often the backup returns."],
    commonCauses: ["shared branch clog", "hair buildup", "soap sludge", "venting issue", "main line restriction"],
    mistakesToAvoid: ["Do not keep running water to force the clog.", "Do not add chemicals to a backed-up shower.", "Do not ignore toilet gurgling.", "Do not assume it is only a surface clog."],
    costDiscussion: "Shared drain backup cost depends on where the blockage sits and whether the main line is involved. Ask whether the provider is clearing a fixture branch or diagnosing a wider line issue.",
    costFactors: ["shared line access", "clog depth", "equipment", "repeat issue", "building layout"],
    faqSeed: ["Why do sink and shower drains back up together?", "Is it a main line problem?", "Should I snake it myself?"]
  }
];

export const featuredServices = services.slice(0, 6);
export const day2PrimaryServiceSlugs = services.slice(0, 8).map((service) => service.slug);
