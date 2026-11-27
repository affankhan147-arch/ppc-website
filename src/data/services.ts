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
  image?: string;
  /** Search title for /services/[slug], matched to real GSC queries (layout template appends the brand). */
  seoTitle?: string;
  /** Visible H1 for /services/[slug]. Falls back to "{Name} in Dallas-Fort Worth". */
  seoH1?: string;
  /** Title + H1 for /cities/[city]/[slug]. "{city}" is replaced with the city name. */
  cityHeading?: string;
  seoDescription?: string;
};

export const services: Service[] = [
  {
    slug: "24-hour-emergency-plumber",
    name: "24-hour emergency plumber",
    categorySlug: "emergency-plumbing",
    shortAnswer: "24 hour plumbing services, around the clock in Dallas-Fort Worth -- if water is leaking, a drain is backing up, or a fixture cannot be used safely after hours, shut off the closest valve and request a 24 hour plumber, nights, weekends, and holidays included.",
    // Task208: "DFW" instead of "Dallas-Fort Worth" - after Task197 this metro-wide page started
    // outranking the Dallas city hub for "emergency plumber dallas" (13.7 vs 37.8). City intent
    // belongs to /cities/dallas; this page keeps the generic 24-hour intent.
    // Keyword overhaul (2026-11-15): GSC 3 months to 2026-11-11 - "emergency plumber near me" 3,937 impressions at
    // position 7.5 with 0 clicks, and the title never said "emergency plumber". Still "DFW", not Dallas (Task208).
    seoTitle: "24 Hour Emergency Plumber in DFW: Nights & Weekends",
    // Oct 2026 GSC: 3,933 impressions for "emergency plumber near me" at position ~7, 0 clicks.
    // The old snippet ("If water is leaking ... --...") never said emergency, DFW, or the number.
    seoDescription:
      "Emergency plumber needed in Dallas-Fort Worth? Call {phone} for a 24-hour plumber: leaks, burst pipes, sewer backups, nights and weekends.",
    seoH1: "24 Hour Plumber Across DFW",
    cityHeading: "24 Hour Plumber in {city}, TX: Nights & Weekends",
    urgency: "High",
    symptoms: ["active leak", "water near electrical fixtures", "overflowing toilet", "no usable bathroom", "after-hours plumbing failure"],
    steps: ["Shut off the nearest valve if safe.", "Move items away from water.", "Avoid using backed-up fixtures.", "Call for a provider connection.", "Tell the plumber the problem, the fixture, your address, and whether water is spreading."],
    callPrep: ["Your city and nearest cross streets.", "Which fixture or pipe is affected.", "Whether water is still running.", "Photos are helpful if safe to take."],
    commonCauses: ["failed supply line", "fixture blockage", "broken shutoff valve", "frozen or stressed pipe", "main drain backup"],
    mistakesToAvoid: ["Do not keep running water to test the problem.", "Do not stand in water near electrical fixtures.", "Do not accept guaranteed pricing before diagnosis.", "Do not delay if damage is spreading."],
    costDiscussion: "Emergency plumbing cost in Dallas-Fort Worth depends on timing, diagnosis, access, parts, and whether property damage is active. Confirm dispatch, diagnostic, and repair pricing directly with the matched provider before work starts.",
    costFactors: ["time of day", "severity", "access", "parts needed", "service distance"],
    faqSeed: ["What counts as a plumbing emergency?", "Should I shut off the main water valve?", "Can I wait until morning?", "What counts as a 24-hour plumbing emergency?", "Do 24-hour plumbers charge more at night?"]
  },
  {
    slug: "emergency-drain-cleaning",
    name: "emergency drain cleaning",
    categorySlug: "drain-cleaning",
    shortAnswer: "Emergency drain cleaning in Dallas-Fort Worth is for water backing up into a sink, tub, toilet, or floor drain, sewage coming up anywhere, or a drain that has stopped completely in a home with one usable bathroom. A single slow drain can usually wait for a same-day slot; sewage, pooling water, or every fixture affected at once cannot.",
    seoTitle: "Emergency Drain Cleaning in DFW: 24/7 Drain Service",
    seoDescription:
      "Emergency drain cleaning in Dallas-Fort Worth: what counts as an emergency, what to do first, and hydro jetting vs. snaking. Call {phone} for a local licensed plumber, fast.",
    cityHeading: "Drain Cleaning in {city}, TX: 24/7 Emergency Service",
    urgency: "High",
    symptoms: ["multiple slow drains", "standing water", "sewage odor", "gurgling fixtures", "overflowing cleanout", "water pooling on the floor", "backup getting worse while you watch"],
    steps: ["Stop running water into the clogged line -- if water is overflowing, use the fixture shutoff under the sink or behind the toilet, or the main shutoff if you cannot find it.", "Do not add chemical drain cleaner after backup starts -- it rarely reaches a main line blockage, can corrode pipes, and makes the job hazardous for whoever works on it next.", "Remove standing water with towels, a mop, or a wet/dry vacuum so it does not soak into flooring, drywall, or cabinets; wear gloves if sewage is involved.", "Check the other drains -- if several react at once, the problem is in the main line, and that changes what the provider brings.", "Take photos of where the water is and how high it got -- useful for the plumber and for insurance.", "Request same-day drain help and describe which fixtures are affected, whether sewage is involved, and how long it has been going on."],
    callPrep: ["Which drains are slow or backing up.", "Whether toilets, tubs, sinks, or floor drains are involved.", "Any sewer odor or outdoor cleanout overflow.", "Whether chemicals were already used.", "How long it has been going on and whether it is getting worse.", "Whether the same drain has blocked before."],
    commonCauses: ["grease buildup -- the most common kitchen drain cause in DFW, worse in winter when cold pipes harden grease faster", "hair and soap sludge in bathroom drains", "tree roots from live oaks and pecans growing into a sewer line joint", "clay soil shifting a buried pipe into a belly that collects solids", "foreign object or flushable wipes that do not break down like toilet paper", "a heavy DFW thunderstorm overwhelming a partially blocked drain", "main sewer restriction"],
    mistakesToAvoid: ["Do not pour chemicals into standing water.", "Do not run laundry or dishwasher during a backup.", "Do not keep plunging if another fixture rises.", "Do not ignore recurring slow drains.", "Do not walk through sewage water -- keep children and pets away from it.", "Do not keep running water to test whether the drain cleared."],
    costDiscussion: "Emergency drain cleaning cost in Dallas-Fort Worth depends on the method, the access, the time of day, and whether a camera inspection is included. An after-hours call usually costs more than a daytime one -- if the problem can safely wait until morning, it costs less booked that way. A straightforward clog cleared with a snake is usually under an hour; hydro jetting takes longer, typically one to two hours, because the line is cleaned in sections and tested. Ask the price first, get it in writing, and do not agree to a repair you have not been quoted. The drain cleaning cost guide carries the pricing detail.",
    costFactors: ["line location", "clog depth", "equipment needed", "after-hours timing", "repeat blockage history", "whether a camera inspection is included", "method -- snaking or hydro jetting"],
    faqSeed: ["When is a clogged drain an emergency?", "Is chemical drain cleaner safe?", "What does same-day drain cleaning include?", "Is emergency drain service available nights and weekends in DFW?"]
  },
  {
    slug: "main-sewer-line-clog",
    name: "main sewer line clog",
    categorySlug: "sewer-help",
    shortAnswer: "A sewer line plumber handles main-line clogs -- several fixtures slow at once, toilet-and-tub backup, outdoor cleanout overflow, or sewer odor. Stop using water, avoid flushing toilets, and request urgent sewer line help.",
    seoTitle: "Main Sewer Line Clog & Sewer Line Repair in DFW",
    cityHeading: "Sewer Line Clog & Sewer Repair in {city}, TX",
    urgency: "High",
    symptoms: ["toilet and tub backup", "floor drain overflow", "sewage smell", "multiple fixtures affected", "cleanout overflow"],
    steps: ["Stop using sinks, tubs, and toilets.", "Keep people away from contaminated water.", "Check the outdoor cleanout -- sewage visible there means the main line is blocked; stop using water inside.", "Call for sewer backup help."],
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
    shortAnswer: "For a burst pipe in DFW, call a burst pipe plumber fast -- shut off the main water valve first if safe, keep people away from wet electrical areas, and request an emergency burst-pipe connection as soon as possible.",
    // Keyword overhaul (2026-11-15): GSC 3 months - "burst pipe repair" 1,530 impressions (pos 35.6), "burst pipe
    // plumber" 1,013 (48.1), "emergency pipe repair" 636 (35.7). Lead with the biggest query. Semrush "frozen pipe
    // repair" 1.9K/mo, KD 9 stays in the snippet (Task245).
    seoTitle: "Burst Pipe Repair in DFW: 24/7 Burst Pipe Plumber",
    seoDescription:
      "Burst or frozen pipe in Dallas-Fort Worth? Shut off the main water valve, then call {phone} for 24/7 burst pipe and emergency pipe repair.",
    seoH1: "Burst Pipe Repair & 24/7 Emergency Pipe Repair in Dallas-Fort Worth",
    cityHeading: "Burst Pipe Repair in {city}, TX: Emergency Plumber",
    urgency: "High",
    symptoms: ["water spraying", "ceiling leak", "wall swelling", "sudden pressure loss", "water meter spinning"],
    steps: ["Shut off the main water valve if you can reach it safely.", "Turn off electricity near standing water if safe.", "Open a low faucet to drain pressure.", "Call for urgent pipe help."],
    callPrep: ["Where water is appearing.", "Whether the main shutoff is closed.", "Pipe material if known.", "Whether ceiling, wall, or slab access may be involved."],
    commonCauses: ["freeze stress", "corrosion", "high pressure", "failed fitting", "accidental damage"],
    mistakesToAvoid: ["Do not leave the main water on.", "Do not touch wet switches or outlets.", "Do not patch over active pressure.", "Do not wait if ceilings or walls are swelling."],
    costDiscussion: "Burst pipe repair cost depends on where the pipe broke, how hard it is to reach, the pipe material, and whether walls, ceilings, or a slab have to be opened. Water mitigation is usually billed separately from the plumbing repair itself.",
    costFactors: ["pipe location", "wall or slab access", "material type", "water damage", "after-hours timing"],
    faqSeed: ["Where is my main shutoff valve?", "Is a burst pipe an emergency?", "What should I do before help arrives?", "When should I call a burst pipe plumber instead of waiting?"]
  },
  {
    slug: "water-heater-emergency",
    name: "water heater emergency",
    categorySlug: "emergency-plumbing",
    shortAnswer: "A plumber for hot water heater repair in DFW handles a leaking water heater, no hot water, or an unsafe unit -- shut off water and power or gas if safe, then request help for inspection or repair.",
    // Task245 (2026-11-14): Semrush "emergency hot water heater repair" 3.6K/mo, KD 6; PH ranked ~16.
    seoTitle: "Emergency Hot Water Heater Repair in DFW: Leaks, No Hot Water",
    seoDescription:
      "Hot water heater leaking or no hot water in DFW? Shut off the water and power or gas, then call {phone} for emergency tank or tankless repair.",
    cityHeading: "Emergency Water Heater Repair in {city}, TX",
    urgency: "Medium",
    symptoms: ["tank leaking", "no hot water", "rusty water", "popping sounds", "water near heater"],
    steps: ["Turn off water to the heater.", "Turn off power or gas if safe.", "Avoid standing water near electrical parts.", "Call for water heater help."],
    callPrep: ["Tank or tankless type.", "Approximate age and size.", "Whether water is actively leaking.", "Whether gas, breaker, or shutoff is accessible."],
    commonCauses: ["tank corrosion", "failed valve", "heating element issue", "sediment buildup", "supply connector leak"],
    mistakesToAvoid: ["Do not touch electrical components near water.", "Do not relight gas if you smell gas.", "Do not assume a tank leak can always be repaired.", "Do not ignore rusty or expanding leaks."],
    costDiscussion: "Water heater emergency cost depends on repair versus replacement, tank size, access, parts, and code requirements. Confirm whether the provider can explain options before work begins.",
    costFactors: ["tank age", "leak location", "repair versus replacement", "capacity", "code requirements"],
    faqSeed: ["Is a leaking water heater an emergency?", "Should I turn off the breaker?", "Can a water heater leak be repaired?", "Do you repair hot water heaters or only replace them?", "What should I do first if my water heater stops making hot water?"]
  },
  {
    slug: "sewer-backup-help",
    name: "sewer backup help",
    categorySlug: "sewer-help",
    shortAnswer: "A sewer backup can expose people to contaminated water and often points to a blocked or broken sewer line. Stop using plumbing fixtures, keep the area clear, and request urgent sewer repair guidance.",
    seoTitle: "Sewer Backup Help in DFW: Backed-Up Toilets & Drains",
    cityHeading: "Sewer Backup & Sewer Repair Help in {city}, TX",
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
    shortAnswer: "A commercial plumber in DFW helps businesses when plumbing stops operations -- drain backups, restrooms out of service, water-heater failure, and leaks that stop work. A commercial plumbing contractor covers the fixtures and equipment a business depends on, and businesses should call quickly when plumbing affects customers or risks property damage, since downtime and code compliance matter.",
    urgency: "High",
    symptoms: ["restroom shutdown", "kitchen drain backup", "water on floor", "tenant complaints", "business interruption"],
    steps: ["Stop affected equipment.", "Block off unsafe areas.", "Document impacted fixtures.", "Request commercial plumbing help."],
    callPrep: ["Business type and open hours.", "Which fixtures or equipment are affected.", "Whether customers or tenants are impacted.", "Access instructions for the provider."],
    commonCauses: ["high fixture use", "grease line buildup", "failed flush valve", "supply line break", "main drain restriction"],
    mistakesToAvoid: ["Do not leave unsafe wet areas open.", "Do not run equipment tied to backed-up drains.", "Do not promise tenants a fixed repair time without confirmation.", "Do not ignore recurring business interruptions."],
    costDiscussion: "Commercial emergency plumbing cost depends on business hours, fixture count, access, equipment, and downtime needs. Ask about after-hours options and what is included in the visit.",
    costFactors: ["business hours", "fixture count", "access", "required equipment", "downtime impact"],
    faqSeed: ["When should a business call an emergency plumber?", "Can work happen after hours?", "What information should a manager provide?", "What commercial plumbing work do you cover?", "Do you handle commercial plumbing maintenance?", "What should a business do first in a drain backup?", "What commercial plumbing services do you cover?"]
  },
  {
    slug: "same-day-plumber-connection",
    name: "same-day plumber connection",
    categorySlug: "emergency-plumbing",
    shortAnswer: "A same-day plumber connection routes urgent non-life-safety plumbing needs to available local providers for issues that need prompt attention.",
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
  },
  {
    slug: "emergency-plumbing-under-200",
    name: "emergency plumbing under 200",
    categorySlug: "emergency-plumbing",
    shortAnswer: "Some emergency plumbing visits can stay under $200 -- a simple diagnosis, a minor clearing, or shutting off water and making a leak safe -- but whether a visit stays under $200 depends on the diagnosis, parts, timing, and access, so confirm the price with the matched provider before work starts.",
    urgency: "Medium",
    symptoms: ["urgent leak", "no hot water", "slow drain worsening", "fixture failure", "water heater issue"],
    steps: ["Shut off the nearest valve if safe.", "Describe the problem and your budget clearly.", "Ask what the visit includes.", "Request a provider connection."],
    callPrep: ["City and service need.", "What the problem is and when it started.", "Whether water damage is active.", "Photos or notes about the issue."],
    commonCauses: ["fixture wear", "minor active leak", "slow clog", "water heater trouble", "shutoff failure"],
    mistakesToAvoid: ["Do not accept guaranteed pricing before diagnosis.", "Do not hide prior chemical use.", "Do not wait if water is spreading.", "Do not assume a price cap covers parts or after-hours work."],
    costDiscussion: "Whether an emergency plumbing visit stays under $200 depends on timing, diagnosis, access, parts, and whether property damage is active. Costs vary and must be confirmed directly with the matched provider before work starts -- a price mentioned online is not a quote for your home.",
    costFactors: ["time of day", "diagnosis", "parts needed", "access", "service distance"],
    faqSeed: ["Can emergency plumbing stay under $200?", "What does an emergency visit include?", "How do I keep the cost down?"]
  },
  {
    slug: "toilet-backup",
    name: "toilet backup",
    categorySlug: "emergency-plumbing",
    shortAnswer: "A toilet backing up -- water or waste coming back up into the bowl instead of flushing away -- usually points to a clog in the toilet trap, a blocked branch line, or a main sewer restriction. Stop flushing, avoid using other fixtures, and request urgent help if water keeps rising or other drains back up too.",
    urgency: "High",
    symptoms: ["toilet backs up after flushing", "water rises in bowl", "sewage odor", "tub or shower backs up too", "gurgling fixtures"],
    steps: ["Stop flushing the toilet.", "Turn off the toilet supply valve if water keeps rising.", "Do not use other fixtures until the cause is known.", "Call for toilet backup help."],
    callPrep: ["Whether the toilet supply valve works.", "Whether a tub or shower backs up too.", "Whether the water is clean or dirty.", "How many toilets are affected."],
    commonCauses: ["fixture clog", "blocked toilet trap", "main line restriction", "foreign object", "failed fill valve"],
    mistakesToAvoid: ["Do not flush repeatedly.", "Do not keep plunging if dirty water rises elsewhere.", "Do not mix chemicals with toilet water.", "Do not ignore sewage odor."],
    costDiscussion: "Toilet backup cost depends on whether the issue is isolated to the toilet or tied to a deeper drain or sewer line problem. Cleanup and fixture repair may be separate from clearing the blockage, so confirm scope with the provider before work starts.",
    costFactors: ["clog depth", "fixture condition", "floor cleanup", "main line involvement", "time of service"],
    faqSeed: ["Why is my toilet backing up?", "When is toilet backup a sewer issue?", "Should I use a plunger?"]
  },
  {
    slug: "water-heater-not-heating",
    name: "water heater not heating",
    categorySlug: "emergency-plumbing",
    shortAnswer: "A water heater that is not heating usually comes down to a failed heating element, a tripped thermostat, a pilot light that will not stay lit, a gas supply problem, or heavy sediment. Check the power or gas supply and the pilot light if safe, then request water heater help.",
    urgency: "Medium",
    symptoms: ["no hot water", "lukewarm water only", "pilot light will not stay lit", "popping sounds", "water near heater"],
    steps: ["Check whether the breaker is tripped or the gas supply is on.", "Do not relight gas if you smell gas.", "Avoid standing water near electrical parts.", "Call for water heater help."],
    callPrep: ["Tank or tankless type.", "Approximate age and size.", "Whether water is actively leaking.", "Whether gas, breaker, or shutoff is accessible."],
    commonCauses: ["failed heating element", "thermostat failure", "pilot light issue", "sediment buildup", "gas supply problem"],
    mistakesToAvoid: ["Do not touch electrical components near water.", "Do not relight gas if you smell gas.", "Do not assume a tank leak can always be repaired.", "Do not ignore rusty or expanding leaks."],
    costDiscussion: "Water heater repair cost depends on repair versus replacement, tank size, access, parts, and code requirements. Costs vary and must be confirmed directly with the matched provider -- ask whether the provider can explain options before work begins.",
    costFactors: ["tank age", "repair versus replacement", "parts needed", "capacity", "code requirements"],
    faqSeed: ["Why is my water heater not heating?", "Is a water heater that stopped heating an emergency?", "Can a water heater be repaired?"]
  },
  {
    slug: "burst-pipe-what-to-do",
    name: "burst pipe what to do",
    categorySlug: "emergency-plumbing",
    shortAnswer: "When a pipe bursts, shut off the main water valve first, keep people away from wet electrical areas, open a low faucet to drain pressure, and get an emergency plumber out for pipe repair as soon as possible.",
    urgency: "High",
    symptoms: ["water spraying", "ceiling leak", "wall swelling", "sudden pressure loss", "water meter spinning"],
    steps: ["Shut off the main water valve.", "Turn off electricity near standing water if safe.", "Open a low faucet to drain pressure.", "Call for urgent pipe help."],
    callPrep: ["Where water is appearing.", "Whether the main shutoff is closed.", "Pipe material if known.", "Whether ceiling, wall, or slab access may be involved."],
    commonCauses: ["freeze stress", "corrosion", "high pressure", "failed fitting", "accidental damage"],
    mistakesToAvoid: ["Do not leave the main water on.", "Do not touch wet switches or outlets.", "Do not patch over active pressure.", "Do not wait if ceilings or walls are swelling."],
    costDiscussion: "Burst pipe repair cost depends on where the pipe broke, how hard it is to reach, the pipe material, and whether walls, ceilings, or a slab have to be opened. Costs vary and must be confirmed directly with the matched provider -- water mitigation is usually billed separately from the plumbing repair itself.",
    costFactors: ["pipe location", "wall or slab access", "material type", "water damage", "after-hours timing"],
    faqSeed: ["What do I do first when a pipe bursts?", "Where is my main shutoff valve?", "Is a burst pipe an emergency?"]
  }

];

export const featuredServices = services.slice(0, 6);
export const day2PrimaryServiceSlugs = services.slice(0, 8).map((service) => service.slug);
