export type Problem = {
  slug: string;
  title: string;
  directAnswer: string;
  whatItMeans: string;
  warningSigns: string[];
  steps: string[];
  whatNotToDo: string[];
  urgentWhen: string[];
  relatedServiceSlug: string;
  relatedCostGuideSlug?: string;
};

export const problems: Problem[] = [
  {
    slug: "water-backing-up-in-shower-and-toilet",
    title: "Water backing up in shower and toilet",
    directAnswer: "Water backing up in a shower and toilet often means a shared drain or main sewer line is restricted. Stop using water and request sewer or drain help quickly.",
    whatItMeans: "When toilet flushing sends water into a shower or tub, the blockage is often downstream from both fixtures. That can move wastewater into living areas if water use continues.",
    warningSigns: ["toilet bubbles", "dirty water in tub", "sewer odor", "multiple fixtures slow"],
    steps: ["Stop flushing and shower use.", "Keep people away from dirty water.", "Check if an outdoor cleanout is overflowing.", "Request main sewer line guidance."],
    whatNotToDo: ["Do not keep flushing.", "Do not pour chemicals into backed-up water.", "Do not run laundry or dishwasher.", "Do not touch contaminated water without protection."],
    urgentWhen: ["dirty water rises", "multiple bathrooms are affected", "an outdoor cleanout overflows", "water is spreading indoors"],
    relatedServiceSlug: "main-sewer-line-clog",
    relatedCostGuideSlug: "sewer-line-clog-cost-guide"
  },
  {
    slug: "sewer-smell-in-bathroom",
    title: "Sewer smell in bathroom",
    directAnswer: "A sewer smell in the bathroom may come from a dry trap, drain buildup, venting issue, or sewer backup risk. If odor appears with slow drains, call for help.",
    whatItMeans: "Odor alone can have a simple cause, but odor with gurgling, slow drains, or backup can indicate sewer gas or a drainage restriction that needs prompt attention.",
    warningSigns: ["odor near drains", "slow sink or tub", "toilet gurgling", "floor drain smell"],
    steps: ["Run water in rarely used drains.", "Ventilate the bathroom.", "Check for visible backup.", "Call if odor persists with drainage symptoms."],
    whatNotToDo: ["Do not ignore odor with slow drains.", "Do not seal drains permanently.", "Do not mix chemicals.", "Do not assume air freshener solves the cause."],
    urgentWhen: ["sewage is visible", "several fixtures drain slowly", "odor is strong and sudden", "people feel sick or unsafe"],
    relatedServiceSlug: "sewer-backup-help",
    relatedCostGuideSlug: "sewer-line-clog-cost-guide"
  },
  {
    slug: "toilet-overflowing-will-not-stop",
    title: "Toilet overflowing and will not stop",
    directAnswer: "If a toilet will not stop overflowing, turn the toilet supply valve clockwise, avoid flushing again, and call if the bowl keeps rising or another fixture backs up.",
    whatItMeans: "A nonstop overflow may be a fixture clog, failed tank part, or deeper drain restriction. The first priority is stopping water and preventing floor damage.",
    warningSigns: ["bowl keeps filling", "water on floor", "overflow repeats", "tub backs up after flushing"],
    steps: ["Turn off the toilet supply valve.", "Lift the tank float if needed.", "Put towels down only if water is clean.", "Request toilet overflow help."],
    whatNotToDo: ["Do not flush repeatedly.", "Do not leave the toilet supply on.", "Do not use chemicals in an overflowing bowl.", "Do not ignore backup into tubs or showers."],
    urgentWhen: ["water reaches flooring", "dirty water appears", "the shutoff valve fails", "more than one toilet is affected"],
    relatedServiceSlug: "toilet-overflow-emergency",
    relatedCostGuideSlug: "emergency-plumbing-cost-dfw"
  },
  {
    slug: "kitchen-sink-backing-up",
    title: "Kitchen sink backing up",
    directAnswer: "A kitchen sink backing up is often caused by grease, food debris, disposal issues, or a deeper branch-line clog. Stop using the sink and disposal.",
    whatItMeans: "Kitchen backups can start as a local clog but may involve the shared drain line, especially if the dishwasher or nearby fixtures also back up.",
    warningSigns: ["standing sink water", "dishwasher backup", "grease smell", "disposal hums or stalls"],
    steps: ["Turn off the disposal.", "Stop dishwasher use.", "Remove loose debris from the strainer.", "Request drain cleaning guidance."],
    whatNotToDo: ["Do not pour grease down the drain.", "Do not run the disposal into standing water.", "Do not add chemical cleaner after backup.", "Do not force the trap apart if unsure."],
    urgentWhen: ["water overflows onto cabinets", "dishwasher backs up", "multiple fixtures are slow", "odor or dirty water appears"],
    relatedServiceSlug: "emergency-drain-cleaning",
    relatedCostGuideSlug: "drain-cleaning-cost-dfw"
  },
  {
    slug: "bathtub-drain-backing-up",
    title: "Bathtub drain backing up",
    directAnswer: "A bathtub drain backing up may be a local tub clog or a sign of a shared bathroom drain issue. Stop running water and watch for toilet gurgling.",
    whatItMeans: "Bathtubs often show backups because they sit low in the drain system. Dirty water in the tub can mean the blockage is deeper than the tub drain.",
    warningSigns: ["dirty tub water", "slow drain", "toilet bubbles", "sewer odor"],
    steps: ["Stop using nearby fixtures.", "Avoid contact with dirty water.", "Check whether toilets gurgle.", "Request drain help."],
    whatNotToDo: ["Do not keep showering into a backed-up tub.", "Do not add chemicals to standing water.", "Do not ignore toilet reactions.", "Do not remove drain parts without knowing the line condition."],
    urgentWhen: ["water is dirty", "toilet use affects the tub", "backup repeats after clearing", "multiple drains are slow"],
    relatedServiceSlug: "emergency-drain-cleaning",
    relatedCostGuideSlug: "drain-cleaning-cost-dfw"
  },
  {
    slug: "floor-drain-backing-up",
    title: "Floor drain backing up",
    directAnswer: "A floor drain backing up can point to a main drain or sewer problem, especially when water appears during laundry, showers, or toilet use.",
    whatItMeans: "Floor drains are low points. Backup there can indicate water cannot move through the drain system fast enough and is escaping at the lowest opening.",
    warningSigns: ["water around floor drain", "sewer odor", "laundry overflow", "basement or utility room water"],
    steps: ["Stop water use.", "Keep people away from contaminated water.", "Check whether laundry triggered it.", "Request sewer or drain help."],
    whatNotToDo: ["Do not keep running laundry.", "Do not push dirty water into other rooms.", "Do not remove drain covers during active backup.", "Do not assume mopping fixes the cause."],
    urgentWhen: ["dirty water appears", "backup spreads indoors", "several fixtures are affected", "the problem returns quickly"],
    relatedServiceSlug: "sewer-backup-help",
    relatedCostGuideSlug: "sewer-line-clog-cost-guide"
  },
  {
    slug: "gurgling-toilet-and-slow-drains",
    title: "Gurgling toilet and slow drains",
    directAnswer: "A gurgling toilet with slow drains can be an early warning of a vent, branch drain, or main sewer restriction. Reduce water use and get guidance.",
    whatItMeans: "Gurgling often means air is moving through water in the trap because drainage is restricted. Slow drains at the same time raise the urgency.",
    warningSigns: ["toilet bubbles", "several slow fixtures", "gurgling after shower", "sewer odor"],
    steps: ["Reduce water use.", "List affected fixtures.", "Avoid chemicals.", "Call before it becomes a backup."],
    whatNotToDo: ["Do not ignore recurring gurgling.", "Do not keep testing every fixture.", "Do not use chemicals in multiple drains.", "Do not wait for wastewater to appear."],
    urgentWhen: ["gurgling happens across rooms", "water rises in a tub", "odor appears", "floor drain bubbles"],
    relatedServiceSlug: "main-sewer-line-clog",
    relatedCostGuideSlug: "sewer-line-clog-cost-guide"
  },
  {
    slug: "main-sewer-line-signs",
    title: "Main sewer line signs",
    directAnswer: "Main sewer line signs include multiple slow drains, toilet and tub backup, outdoor cleanout overflow, sewer odor, and gurgling fixtures.",
    whatItMeans: "A main sewer issue affects the shared line leaving the property. It can interrupt the whole plumbing system and may expose people to wastewater.",
    warningSigns: ["multiple fixtures affected", "outdoor cleanout overflow", "sewer smell", "toilet backs into tub"],
    steps: ["Stop using water.", "Check the cleanout only from a safe distance.", "Keep people away from backup.", "Request main line help."],
    whatNotToDo: ["Do not keep flushing.", "Do not remove cleanout caps if pressure is present.", "Do not assume every fixture is separate.", "Do not delay if wastewater appears."],
    urgentWhen: ["cleanout overflows", "sewage appears indoors", "multiple bathrooms fail", "water use triggers backups"],
    relatedServiceSlug: "main-sewer-line-clog",
    relatedCostGuideSlug: "sewer-line-clog-cost-guide"
  },
  {
    slug: "burst-pipe-first-steps",
    title: "Burst pipe first steps",
    directAnswer: "For a burst pipe, shut off the main water valve, stay away from wet electrical areas, open a low faucet to relieve pressure, and request urgent pipe help.",
    whatItMeans: "A burst pipe can release water quickly into walls, ceilings, floors, or crawlspaces. Fast shutoff limits damage before repair can begin.",
    warningSigns: ["water spraying", "ceiling drip", "wall swelling", "meter spinning"],
    steps: ["Close the main shutoff.", "Avoid electrical hazards.", "Open a low faucet.", "Request burst pipe help."],
    whatNotToDo: ["Do not leave pressure on the line.", "Do not touch wet breakers without safety.", "Do not rely on tape for active pressure.", "Do not wait if water is inside walls."],
    urgentWhen: ["water is still flowing", "ceilings bulge", "electrical fixtures are wet", "the shutoff valve will not close"],
    relatedServiceSlug: "burst-pipe-emergency",
    relatedCostGuideSlug: "burst-pipe-emergency-cost-guide"
  },
  {
    slug: "water-heater-leaking-emergency",
    title: "Water heater leaking emergency",
    directAnswer: "A leaking water heater is urgent when water is spreading, the tank is rusted, or electrical or gas components may be affected. Shut off water and power or gas if safe.",
    whatItMeans: "Water heater leaks can come from valves, connections, or the tank itself. Tank leaks often worsen and may require replacement rather than a simple repair.",
    warningSigns: ["water around tank", "rust streaks", "popping sounds", "loss of hot water"],
    steps: ["Turn off water to the heater.", "Turn off breaker or gas if safe.", "Keep clear of standing water.", "Request water heater help."],
    whatNotToDo: ["Do not touch wet electrical parts.", "Do not relight gas if unsafe.", "Do not ignore tank corrosion.", "Do not assume every tank leak is repairable."],
    urgentWhen: ["water spreads across flooring", "the tank is actively leaking", "gas smell is present", "electrical parts are wet"],
    relatedServiceSlug: "water-heater-emergency",
    relatedCostGuideSlug: "water-heater-emergency-cost-guide"
  },
  {
    slug: "no-hot-water-emergency",
    title: "No hot water emergency",
    directAnswer: "No hot water is urgent when it affects health, business operations, or appears with leaking, electrical issues, gas concerns, or a failed water heater.",
    whatItMeans: "No hot water may come from a failed element, pilot or gas issue, tripped breaker, control problem, or aging unit. Safety issues matter more than inconvenience.",
    warningSigns: ["no hot water", "breaker trips", "gas odor", "water around heater"],
    steps: ["Check for visible leaks.", "Do not relight gas if you smell gas.", "Check breaker only if safe.", "Request water heater guidance."],
    whatNotToDo: ["Do not bypass safety controls.", "Do not ignore gas odor.", "Do not keep resetting a tripping breaker.", "Do not assume replacement before diagnosis."],
    urgentWhen: ["gas smell is present", "water leaks near electrical parts", "business operations stop", "vulnerable occupants need hot water"],
    relatedServiceSlug: "water-heater-emergency",
    relatedCostGuideSlug: "water-heater-emergency-cost-guide"
  },
  {
    slug: "ceiling-leak-from-plumbing",
    title: "Ceiling leak from plumbing",
    directAnswer: "A ceiling leak from plumbing can mean an active pipe, fixture, drain, or water heater issue above. Avoid electrical areas and shut off water if safe.",
    whatItMeans: "Ceiling leaks often hide the source above the visible drip. Water may travel before it appears, so the safest first step is reducing water flow and risk.",
    warningSigns: ["dripping ceiling", "stained drywall", "bulging paint", "leak near a light"],
    steps: ["Avoid wet lights or switches.", "Shut off water if safe.", "Protect belongings below.", "Request leak help."],
    whatNotToDo: ["Do not poke bulging drywall near electrical fixtures.", "Do not keep using upstairs fixtures.", "Do not assume the stain is old.", "Do not delay if the ceiling sags."],
    urgentWhen: ["water is active", "ceiling bulges", "electrical fixtures are wet", "water spreads quickly"],
    relatedServiceSlug: "burst-pipe-emergency",
    relatedCostGuideSlug: "burst-pipe-emergency-cost-guide"
  },
  {
    slug: "outdoor-cleanout-overflowing",
    title: "Outdoor cleanout overflowing",
    directAnswer: "An outdoor cleanout overflowing often points to a main sewer line blockage. Stop indoor water use and request sewer line help.",
    whatItMeans: "The cleanout gives access to the sewer line. Overflow there suggests wastewater cannot move normally through the line away from the property.",
    warningSigns: ["water at cleanout", "sewer odor outside", "indoor drains slow", "toilets gurgle"],
    steps: ["Stop using fixtures indoors.", "Keep clear of wastewater.", "Do not remove caps under pressure.", "Request main sewer guidance."],
    whatNotToDo: ["Do not keep running water.", "Do not open a pressurized cleanout.", "Do not let people or pets near wastewater.", "Do not delay if indoor fixtures react."],
    urgentWhen: ["wastewater is visible", "indoor backups start", "odor is strong", "several drains slow at once"],
    relatedServiceSlug: "main-sewer-line-clog",
    relatedCostGuideSlug: "sewer-line-clog-cost-guide"
  },
  {
    slug: "washing-machine-drain-backing-up",
    title: "Washing machine drain backing up",
    directAnswer: "A washing machine drain backing up can be a standpipe, branch drain, or main line problem. Stop the washer and avoid another cycle.",
    whatItMeans: "Laundry discharge sends a large volume of water quickly. If the drain cannot handle it, the backup may reveal a partial blockage in the laundry branch or main line.",
    warningSigns: ["water at standpipe", "floor drain overflow", "gurgling nearby fixtures", "backup during spin cycle"],
    steps: ["Stop the washer.", "Do not run another cycle.", "Move items away from water.", "Request drain cleaning help."],
    whatNotToDo: ["Do not keep testing the washer.", "Do not push water into floor drains.", "Do not add chemicals to the standpipe.", "Do not ignore nearby toilet gurgling."],
    urgentWhen: ["water spreads across flooring", "floor drains back up", "several fixtures slow", "backup returns every cycle"],
    relatedServiceSlug: "emergency-drain-cleaning",
    relatedCostGuideSlug: "drain-cleaning-cost-dfw"
  },
  {
    slug: "water-shutoff-valve-will-not-close",
    title: "Water shutoff valve will not close",
    directAnswer: "If a water shutoff valve will not close during a leak, avoid forcing it until it breaks, look for the next upstream shutoff if safe, and request urgent plumbing help.",
    whatItMeans: "A stuck shutoff can turn a small leak into a larger emergency because water cannot be isolated at the fixture. The next safe shutoff may be a branch valve, water heater valve, or the main water valve.",
    warningSigns: ["valve handle spins", "valve leaks when turned", "water keeps running", "corrosion around valve"],
    steps: ["Stop using the affected fixture.", "Try the next upstream shutoff only if you can reach it safely.", "Keep water away from electrical areas.", "Request urgent valve or leak help."],
    whatNotToDo: ["Do not force a brittle or corroded valve.", "Do not remove a valve under pressure.", "Do not stand in water near electrical equipment.", "Do not wait if water is spreading."],
    urgentWhen: ["water cannot be isolated", "a ceiling or cabinet is wet", "the main valve will not close", "electrical areas are nearby"],
    relatedServiceSlug: "burst-pipe-emergency",
    relatedCostGuideSlug: "emergency-leak-repair-cost-dfw"
  }
];
