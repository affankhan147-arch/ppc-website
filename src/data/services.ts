export type Service = {
  slug: string;
  name: string;
  categorySlug: string;
  shortAnswer: string;
  urgency: string;
  symptoms: string[];
  steps: string[];
  costFactors: string[];
  faqSeed: string[];
};

export const services: Service[] = [
  {
    slug: "24-hour-emergency-plumber",
    name: "24-hour emergency plumber",
    categorySlug: "emergency-plumbing",
    shortAnswer: "If water is actively leaking, a drain is backing up, or a fixture cannot be used safely, shut off the closest valve when possible and request urgent plumbing help.",
    urgency: "High",
    symptoms: ["active leak", "water near electrical fixtures", "overflowing toilet", "no usable bathroom", "after-hours plumbing failure"],
    steps: ["Shut off the nearest valve if safe.", "Move items away from water.", "Avoid using backed-up fixtures.", "Call for a provider connection."],
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
    costFactors: ["backup severity", "line blockage", "cleanup needs", "camera inspection", "access"],
    faqSeed: ["What should I do during a sewer backup?", "Who handles sewer backup cleanup?", "Can rain cause sewer backup?"]
  },
  {
    slug: "commercial-emergency-plumbing",
    name: "commercial emergency plumbing",
    categorySlug: "emergency-plumbing",
    shortAnswer: "Businesses should call quickly when plumbing stops operations, affects customers, or risks property damage.",
    urgency: "High",
    symptoms: ["restroom shutdown", "kitchen drain backup", "water on floor", "tenant complaints", "business interruption"],
    steps: ["Stop affected equipment.", "Block off unsafe areas.", "Document impacted fixtures.", "Request commercial plumbing help."],
    costFactors: ["business hours", "fixture count", "access", "required equipment", "downtime impact"],
    faqSeed: ["When should a business call an emergency plumber?", "Can work happen after hours?", "What information should a manager provide?"]
  },
  {
    slug: "same-day-plumber-connection",
    name: "same-day plumber connection",
    categorySlug: "emergency-plumbing",
    shortAnswer: "A same-day plumber connection helps route urgent non-life-safety plumbing needs to available local providers.",
    urgency: "Medium",
    symptoms: ["urgent leak", "no usable fixture", "slow drain worsening", "water heater issue", "fixture failure"],
    steps: ["Identify the affected fixture.", "Describe the urgency clearly.", "Share your city and service need.", "Request a provider connection."],
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
    costFactors: ["shared line access", "clog depth", "equipment", "repeat issue", "building layout"],
    faqSeed: ["Why do sink and shower drains back up together?", "Is it a main line problem?", "Should I snake it myself?"]
  }
];

export const featuredServices = services.slice(0, 6);
