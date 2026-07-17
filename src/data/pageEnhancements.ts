import type { FAQ } from "@/data/faqs";

export type EnhancementLink = {
  label: string;
  href: string;
};

export type PageEnhancement = {
  decisionTitle: string;
  decisionIntro: string;
  decisionItems: string[];
  providerTitle: string;
  providerItems: string[];
  safetyTitle: string;
  safetyItems: string[];
  preventionTitle?: string;
  preventionItems?: string[];
  extraFaqs?: FAQ[];
  extraLinks?: EnhancementLink[];
};

export type BlogEnhancement = {
  checklistTitle: string;
  checklistIntro: string;
  checklistItems: string[];
  proofTitle: string;
  proofItems: string[];
  extraFaqs?: FAQ[];
  extraLinks?: EnhancementLink[];
};

export const serviceEnhancements: Record<string, PageEnhancement> = {
  "24-hour-emergency-plumber": {
    decisionTitle: "How to decide whether this is an emergency",
    decisionIntro:
      "Use the emergency path when the plumbing issue can cause damage, expose people to unsafe water, or leave the property without an essential fixture.",
    decisionItems: [
      "Choose urgent help when water is active, spreading, or near electrical fixtures.",
      "Use a same-day request when the issue is contained but likely to worsen before the next business day.",
      "Use the form when the problem is stable enough to describe clearly and you need provider availability confirmed.",
      "Ask the matched provider to explain diagnostic fees, arrival expectations, and repair approval steps before work begins."
    ],
    providerTitle: "What a provider may need to check",
    providerItems: [
      "The working shutoff valve and whether water is still under pressure.",
      "Which fixture, pipe, drain, or appliance started the emergency.",
      "Whether nearby rooms, ceilings, cabinets, or flooring are already wet.",
      "Whether the issue is isolated or connected to a wider drain, sewer, or supply problem."
    ],
    safetyTitle: "When DIY should stop",
    safetyItems: [
      "Stop if water touches outlets, switches, panels, or plugged-in equipment.",
      "Stop if wastewater is visible or a sewer odor appears with slow drains.",
      "Stop if a shutoff valve will not close or starts leaking while you turn it.",
      "Stop if the ceiling sags, paint bubbles, or water spreads inside walls."
    ],
    preventionTitle: "Preparation that can reduce future urgency",
    preventionItems: [
      "Label the main water shutoff and fixture shutoffs before an emergency happens.",
      "Keep photos of water heater labels, fixture model numbers, and visible pipe materials.",
      "Do not ignore repeated slow drains, gurgling, or small leaks that return after temporary fixes."
    ],
    extraFaqs: [
      {
        question: "What should I do before submitting an emergency plumbing request?",
        answer:
          "Shut off water where safe, avoid affected fixtures, note the city and cross streets, and describe whether water or wastewater is still moving."
      },
      {
        question: "Can Plumbing Hands guarantee an emergency plumber will arrive?",
        answer:
          "No. Availability and timing depend on the matched provider, location, schedule, and problem type. Confirm those details directly before authorizing work."
      }
    ],
    extraLinks: [
      { label: "Emergency plumbing cost factors", href: "/cost-guides/emergency-plumbing-cost-dfw" },
      { label: "Burst pipe first steps", href: "/problems/burst-pipe-first-steps" },
      { label: "Toilet overflow steps", href: "/problems/toilet-overflowing-will-not-stop" }
    ]
  },
  "emergency-drain-cleaning": {
    decisionTitle: "How to judge drain-cleaning urgency",
    decisionIntro:
      "Drain backups become higher priority when wastewater appears, multiple fixtures react, or the blocked fixture is essential for the home or business.",
    decisionItems: [
      "Treat the issue as urgent when toilets, tubs, floor drains, or cleanouts back up together.",
      "Request help sooner when the backup returns after plunging or affects more than one room.",
      "Avoid chemical cleaners once standing water or wastewater is present.",
      "Ask whether the visit covers a fixture clog, branch line, or possible main sewer restriction."
    ],
    providerTitle: "What a drain provider may check",
    providerItems: [
      "Whether the backup starts at one fixture or follows water use elsewhere.",
      "Cleanout access, fixture access, and whether cable or camera inspection is appropriate.",
      "Signs of grease, roots, foreign objects, failed disposal parts, or a main-line restriction.",
      "Whether repeated clogs need a cause diagnosis rather than another temporary clearing."
    ],
    safetyTitle: "When to stop DIY drain attempts",
    safetyItems: [
      "Stop if plunging one fixture makes water rise in another fixture.",
      "Stop if wastewater or sewer odor appears in a tub, shower, or floor drain.",
      "Stop if chemical cleaner has already been added and standing water remains.",
      "Stop if a business restroom, kitchen, or floor drain backup creates a slip or sanitation risk."
    ],
    preventionTitle: "Ways to reduce repeat drain problems",
    preventionItems: [
      "Keep grease, wipes, paper towels, and hygiene products out of drains and toilets.",
      "Act on recurring slow drains before wastewater backs up into lower fixtures.",
      "Ask the provider what likely caused the clog and what maintenance is reasonable."
    ],
    extraFaqs: [
      {
        question: "How do I know if a drain clog is really a sewer problem?",
        answer:
          "Multiple fixtures, toilet gurgling, tub backup after flushing, outdoor cleanout overflow, or sewer odor can point beyond a single fixture clog."
      },
      {
        question: "Should I run water to test whether the drain cleared?",
        answer:
          "Avoid repeated testing during an active backup. More water can push wastewater into other fixtures or onto floors."
      }
    ],
    extraLinks: [
      { label: "Drain cleaning cost factors", href: "/cost-guides/drain-cleaning-cost-dfw" },
      { label: "Kitchen sink backing up", href: "/problems/kitchen-sink-backing-up" },
      { label: "Water backing up in shower and toilet", href: "/problems/water-backing-up-in-shower-and-toilet" }
    ]
  },
  "main-sewer-line-clog": {
    decisionTitle: "How to recognize a likely main-line problem",
    decisionIntro:
      "Main sewer symptoms are usually higher risk when several fixtures react together or wastewater appears at a low drain or cleanout.",
    decisionItems: [
      "Treat toilet-and-tub backup, floor drain overflow, and outdoor cleanout overflow as stronger main-line warning signs.",
      "Stop water use when more than one fixture reacts because every extra gallon can push wastewater into lower openings.",
      "Mention heavy rain, recurring backups, roots, or prior cleanings because those details can change the next diagnostic step.",
      "Ask whether the provider is clearing a line, inspecting the cause, or recommending repair planning."
    ],
    providerTitle: "What a sewer provider may need to confirm",
    providerItems: [
      "Lowest fixture where water first appeared.",
      "Whether an outdoor cleanout is accessible and whether it is overflowing.",
      "Which fixtures react when a toilet flushes, shower runs, or laundry drains.",
      "Whether cleanup, camera inspection, or repair planning is outside the initial clearing scope."
    ],
    safetyTitle: "When the main-line request should be urgent",
    safetyItems: [
      "Wastewater appears indoors.",
      "Several fixtures back up or gurgle together.",
      "A cleanout overflows or has visible sewage.",
      "A business, apartment, or only bathroom cannot be used safely."
    ],
    preventionTitle: "Details to save after the visit",
    preventionItems: [
      "What likely caused the restriction.",
      "Whether the provider saw roots, grease, damaged pipe, or repeat-risk conditions.",
      "What symptoms should trigger faster action next time."
    ],
    extraFaqs: [
      {
        question: "What is the fastest clue that a clog may be in the main sewer line?",
        answer:
          "The strongest clue is more than one fixture reacting together, such as a toilet flush causing water to rise in a tub, shower, floor drain, or outdoor cleanout."
      }
    ],
    extraLinks: [
      { label: "Sewer line clog cost guide", href: "/cost-guides/sewer-line-clog-cost-guide" },
      { label: "Outdoor cleanout overflowing", href: "/problems/outdoor-cleanout-overflowing" },
      { label: "Water backing up in shower and toilet", href: "/problems/water-backing-up-in-shower-and-toilet" },
      { label: "Emergency drain cleaning", href: "/services/emergency-drain-cleaning" }
    ]
  },
  "burst-pipe-emergency": {
    decisionTitle: "How to handle a leak before repair starts",
    decisionIntro:
      "The priority is stopping water safely, then describing where water is appearing and whether the leak can be isolated.",
    decisionItems: [
      "Use the fixture shutoff first if it is reachable and not corroded.",
      "Use the main shutoff when water is spreading and a smaller valve will not work.",
      "Treat ceiling, wall, cabinet, or electrical-area leaks as urgent because hidden damage can spread.",
      "Ask the provider to separate leak isolation, pipe repair, access work, and restoration in the scope."
    ],
    providerTitle: "What a leak provider may check",
    providerItems: [
      "Whether water is still under pressure and which shutoff controls it.",
      "Visible pipe material, valve condition, fixture supply lines, and water heater connections.",
      "Whether access through a wall, ceiling, cabinet, crawlspace, or slab may be needed.",
      "Whether drying, cleanup, or restoration should be handled separately from plumbing repair."
    ],
    safetyTitle: "When to stop trying to isolate the leak yourself",
    safetyItems: [
      "Stop if a valve handle bends, spins, or starts leaking while turning.",
      "Stop if water is near outlets, lights, breakers, or plugged-in appliances.",
      "Stop if ceiling drywall sags or water spreads inside a wall.",
      "Stop if you cannot reach the shutoff without standing in water."
    ],
    preventionTitle: "Preparation for future leak emergencies",
    preventionItems: [
      "Label the main shutoff and test owner-approved maintenance only when no leak is active.",
      "Replace corroded or frozen fixture valves before they are needed in an emergency.",
      "Keep photos of valve locations and water heater labels for faster triage."
    ],
    extraFaqs: [
      {
        question: "What if the small shutoff valve will not close?",
        answer:
          "Do not force a brittle valve. If safe, move to the next upstream shutoff or main valve and request urgent leak help."
      }
    ],
    extraLinks: [
      { label: "Water shutoff valve will not close", href: "/problems/water-shutoff-valve-will-not-close" },
      { label: "Emergency leak repair cost", href: "/cost-guides/emergency-leak-repair-cost-dfw" },
      { label: "Ceiling leak from plumbing", href: "/problems/ceiling-leak-from-plumbing" },
      { label: "Dallas emergency plumbing help", href: "/cities/dallas" }
    ]
  }
};

export const problemEnhancements: Record<string, PageEnhancement> = {
  "water-backing-up-in-shower-and-toilet": {
    decisionTitle: "How to read the shower-and-toilet pattern",
    decisionIntro:
      "A toilet and shower reacting together often means the blockage is downstream from both fixtures, which makes continued water use risky.",
    decisionItems: [
      "Treat dirty water in the tub or shower as a contamination risk, not just an inconvenience.",
      "Check whether another bathroom, a floor drain, or the outdoor cleanout reacts before calling.",
      "Mention any recent laundry, dishwasher, or heavy rain timing because those details can change diagnosis.",
      "Ask whether the provider is evaluating a bathroom branch line, main sewer line, or both."
    ],
    providerTitle: "What a provider may inspect",
    providerItems: [
      "Lowest fixtures where wastewater first appears.",
      "Outdoor cleanout condition and whether it is safe to access.",
      "Fixture sequence: what happens when a toilet flushes, shower runs, or sink drains.",
      "Whether a camera inspection, clearing attempt, or cleanup referral may be needed."
    ],
    safetyTitle: "Immediate safety boundaries",
    safetyItems: [
      "Do not keep flushing to test the problem.",
      "Do not run tubs, sinks, laundry, or dishwasher cycles during the backup.",
      "Keep people away from dirty water until cleanup guidance is clear.",
      "Avoid chemical cleaners because they can remain in backed-up water."
    ],
    preventionTitle: "Prevention and recurrence notes",
    preventionItems: [
      "Recurring tub-and-toilet backup should be documented with dates, fixture sequence, and weather conditions.",
      "Wipes, grease, roots, and aging sewer lines can create repeat restrictions.",
      "Ask what warning signs should trigger a faster call next time."
    ],
    extraFaqs: [
      {
        question: "Is water backing up in the shower and toilet dangerous?",
        answer:
          "It can be, especially when the water is dirty or has a sewer odor. Avoid contact and stop water use until the cause is checked."
      },
      {
        question: "Can I use a plunger when the shower and toilet both back up?",
        answer:
          "A plunger may help an isolated toilet clog, but stop if water rises in the shower, tub, or another fixture because that pattern can indicate a deeper restriction."
      }
    ],
    extraLinks: [
      { label: "Main sewer line clog service", href: "/services/main-sewer-line-clog" },
      { label: "Sewer line clog cost guide", href: "/cost-guides/sewer-line-clog-cost-guide" },
      { label: "Outdoor cleanout overflowing", href: "/problems/outdoor-cleanout-overflowing" }
    ]
  },
  "water-shutoff-valve-will-not-close": {
    decisionTitle: "How to choose the next shutoff step",
    decisionIntro:
      "A stuck valve is urgent when water is still moving. The right next step depends on whether another shutoff can be reached safely.",
    decisionItems: [
      "If the fixture valve will not close, look for a branch shutoff or the main water valve.",
      "If the valve leaks or the handle spins, stop turning it and avoid breaking it under pressure.",
      "If water is near electrical areas, prioritize getting clear and reducing risk.",
      "Tell the provider which valve failed and whether the main shutoff is accessible."
    ],
    providerTitle: "What a provider may inspect",
    providerItems: [
      "Valve age, corrosion, handle movement, and whether the stem or packing leaks.",
      "Whether a temporary isolation step is needed before permanent repair.",
      "Pipe material and access around the valve.",
      "Whether nearby supply lines, fixture connectors, or pressure issues contributed."
    ],
    safetyTitle: "What not to do with a stuck valve",
    safetyItems: [
      "Do not use excessive force on a corroded valve.",
      "Do not disassemble a valve while water is pressurized.",
      "Do not keep using the fixture to test the leak.",
      "Do not stand in water near electrical equipment."
    ],
    preventionTitle: "How to reduce repeat shutoff problems",
    preventionItems: [
      "Document shutoff locations before an emergency.",
      "Ask whether brittle valves should be replaced after the leak is controlled.",
      "Keep notes on which valve stopped the water and which did not."
    ],
    extraFaqs: [
      {
        question: "Can I force a stuck shutoff valve closed?",
        answer:
          "Avoid forcing a brittle or corroded valve. Breaking the valve can make the leak worse and may remove your easiest isolation point."
      },
      {
        question: "Should I turn off the main water valve?",
        answer:
          "If water is spreading and a fixture valve will not close, the main valve may be the safest next shutoff if you can reach it without standing in water or touching electrical areas."
      }
    ],
    extraLinks: [
      { label: "Burst pipe emergency", href: "/services/burst-pipe-emergency" },
      { label: "Emergency leak repair cost", href: "/cost-guides/emergency-leak-repair-cost-dfw" },
      { label: "Ceiling leak from plumbing", href: "/problems/ceiling-leak-from-plumbing" },
      { label: "Dallas emergency plumbing help", href: "/cities/dallas" }
    ]
  }
};

export const costGuideEnhancements: Record<string, PageEnhancement> = {
  "emergency-plumbing-cost-dfw": {
    decisionTitle: "How to compare emergency plumbing scopes",
    decisionIntro:
      "Emergency plumbing prices are hard to compare unless each provider is describing the same diagnosis, timing, access, parts, and approval process.",
    decisionItems: [
      "Separate dispatch or diagnostic fees from approved repair labor and parts.",
      "Ask whether after-hours, weekend, or holiday timing changes the pricing method.",
      "Clarify whether wall, ceiling, slab, cleanup, or restoration work is included or separate.",
      "Do not approve work until the provider explains what is known, what is uncertain, and what could change the scope."
    ],
    providerTitle: "Questions that improve pricing clarity",
    providerItems: [
      "What is included before I approve a repair?",
      "What could make the final cost different after diagnosis?",
      "Is this an isolated fixture issue, a supply leak, a drain issue, or a possible sewer problem?",
      "Will I receive options if repair and replacement are both possible?"
    ],
    safetyTitle: "Cost decisions that should not delay safety",
    safetyItems: [
      "Shut off active water before comparing options when safe.",
      "Prioritize wastewater exposure, electrical hazards, and spreading damage over price shopping.",
      "Avoid accepting exact pricing from anyone who has not confirmed the problem scope.",
      "Ask for written scope details before authorizing non-emergency follow-up work."
    ],
    preventionTitle: "Information to save for future cost decisions",
    preventionItems: [
      "Photos of shutoff valves, water heater labels, fixture access, and prior repair paperwork.",
      "Dates and symptoms for recurring drain or sewer problems.",
      "Notes on whether a previous visit cleared a symptom or diagnosed a cause."
    ],
    extraFaqs: [
      {
        question: "Why does this cost guide avoid exact prices?",
        answer:
          "Exact pricing depends on the provider and the diagnosis. This page focuses on cost drivers and questions that help homeowners avoid unclear scope."
      },
      {
        question: "What cost question should I ask first?",
        answer:
          "Ask what is included before repair approval, including dispatch or diagnostic fees, after-hours rules, and what could change after inspection."
      }
    ],
    extraLinks: [
      { label: "24-hour emergency plumber", href: "/services/24-hour-emergency-plumber" },
      { label: "Burst pipe emergency cost", href: "/cost-guides/burst-pipe-emergency-cost-guide" },
      { label: "Ceiling leak from plumbing", href: "/problems/ceiling-leak-from-plumbing" }
    ]
  },
  "drain-cleaning-cost-dfw": {
    decisionTitle: "How to compare drain-cleaning scopes",
    decisionIntro:
      "Drain-cleaning pricing is easier to compare when the provider explains whether the work is for one fixture, a shared branch line, or a possible main sewer line.",
    decisionItems: [
      "Ask whether the quoted work is for a sink, tub, toilet, floor drain, branch line, or main line.",
      "Ask whether cable clearing, hydro equipment, cleanout access, or camera inspection changes the scope.",
      "Mention chemicals, plunging, prior cleanings, and recurring backups before approving work.",
      "Avoid comparing prices until each provider describes the same equipment, access, and return-policy assumptions."
    ],
    providerTitle: "Questions that improve drain cost clarity",
    providerItems: [
      "What fixture or line is included in this visit?",
      "Is camera inspection included, optional, or separate?",
      "What happens if the clog returns quickly?",
      "Does after-hours timing or difficult access change the pricing method?"
    ],
    safetyTitle: "When cost shopping should pause",
    safetyItems: [
      "Wastewater is visible or spreading.",
      "A business restroom, kitchen, or floor drain cannot be used safely.",
      "Several fixtures react together.",
      "A cleanout is overflowing."
    ],
    preventionTitle: "Records that help with repeat drain decisions",
    preventionItems: [
      "Which fixture backed up first and which fixtures reacted later.",
      "Whether grease, wipes, roots, foreign objects, or equipment access affected the visit.",
      "What the provider recommended if the backup returns."
    ],
    extraFaqs: [
      {
        question: "Why can drain-cleaning prices vary so much?",
        answer:
          "A single sink clog, a bathroom branch clog, and a suspected main sewer line problem can require different access, equipment, diagnosis, and follow-up."
      }
    ],
    extraLinks: [
      { label: "Emergency drain cleaning", href: "/services/emergency-drain-cleaning" },
      { label: "Main sewer line clog", href: "/services/main-sewer-line-clog" },
      { label: "Kitchen sink backing up", href: "/problems/kitchen-sink-backing-up" },
      { label: "Water backing up in shower and toilet", href: "/problems/water-backing-up-in-shower-and-toilet" }
    ]
  },
  "emergency-leak-repair-cost-dfw": {
    decisionTitle: "How to compare leak repair scopes",
    decisionIntro:
      "Leak pricing is clearest when water isolation, diagnosis, access, repair, and restoration are discussed as separate parts of the job.",
    decisionItems: [
      "Ask whether the provider is pricing leak isolation, leak diagnosis, repair, or all three.",
      "Clarify whether opening a wall, ceiling, cabinet, or floor is included.",
      "Ask what temporary stopgap options exist if permanent repair needs parts or access.",
      "Confirm whether drying, cleanup, drywall, paint, flooring, or cabinet work is outside the plumbing scope."
    ],
    providerTitle: "Questions to ask before approving leak work",
    providerItems: [
      "Is water fully shut off or still active?",
      "What access do you need to confirm the leak source?",
      "What could change after the wall, ceiling, or cabinet is opened?",
      "Is this repair intended to stop active water, replace a failed valve, or fix a damaged pipe?"
    ],
    safetyTitle: "When cost comparison should wait",
    safetyItems: [
      "Water is spreading near electrical fixtures.",
      "The ceiling is sagging or water is inside a wall.",
      "The main shutoff does not close.",
      "Water is actively damaging flooring, cabinets, or shared building areas."
    ],
    preventionTitle: "Records that help future leak decisions",
    preventionItems: [
      "Photos of valve locations, pipe material, and water-damaged areas.",
      "Receipts or notes from prior valve, fixture, or pipe repairs.",
      "Dates and conditions when leaks or pressure changes appeared."
    ],
    extraFaqs: [
      {
        question: "Why is restoration usually separate from plumbing leak repair?",
        answer:
          "A plumber may stop the water and repair the pipe or valve, while drying, drywall, flooring, paint, or cabinet repair may require a separate restoration scope."
      }
    ],
    extraLinks: [
      { label: "Water shutoff valve will not close", href: "/problems/water-shutoff-valve-will-not-close" },
    { label: "Failed shutoff leak checklist", href: "/blog/water-shutoff-valve-will-not-close-during-a-leak" },
      { label: "Burst pipe emergency", href: "/services/burst-pipe-emergency" },
      { label: "Burst pipe cost guide", href: "/cost-guides/burst-pipe-emergency-cost-guide" },
      { label: "Dallas emergency plumbing help", href: "/cities/dallas" }
    ]
  }
};

export const cityServiceEnhancements: Record<string, PageEnhancement> = {
  "dallas/emergency-drain-cleaning": {
    decisionTitle: "Dallas drain backup decision guide",
    decisionIntro:
      "Dallas homes, apartments, restaurants, and older properties can have very different drain access. The useful first step is describing the fixture pattern clearly.",
    decisionItems: [
      "Mention whether the issue is in a single sink, a bathroom group, a floor drain, or several fixtures.",
      "Share nearby cross streets or neighborhood context so provider coverage can be checked without claiming a local office.",
      "Treat restaurant, apartment, or shared-building backups as higher urgency when customers, tenants, or staff are affected.",
      "Ask whether the provider can evaluate cleanout access and whether a main-line issue is possible."
    ],
    providerTitle: "What to prepare for a Dallas drain request",
    providerItems: [
      "Fixture list, including any tub, toilet, sink, floor drain, laundry, or dishwasher symptoms.",
      "Whether the home has an accessible cleanout and whether it appears to be overflowing.",
      "Whether chemicals, plunging, or a previous clearing attempt happened.",
      "Whether the backup affects a residence, rental, restaurant, office, or other business."
    ],
    safetyTitle: "When the Dallas drain request should be urgent",
    safetyItems: [
      "Wastewater is visible indoors or around an outdoor cleanout.",
      "More than one fixture backs up or gurgles.",
      "A business restroom, kitchen, or floor drain cannot be used safely.",
      "The backup is spreading across flooring, cabinets, or customer/tenant areas."
    ],
    preventionTitle: "Follow-up questions after service",
    preventionItems: [
      "Ask what likely caused the blockage and whether it may recur.",
      "Ask whether the provider recommends maintenance, inspection, or a different repair path.",
      "Keep notes on the fixture sequence so repeat symptoms can be compared."
    ],
    extraFaqs: [
      {
        question: "Does this page claim a Plumbing Hands office in Dallas?",
        answer:
          "No. It is a Dallas service-area request page. Availability, credentials, pricing, and arrival details should be confirmed with the matched provider."
      },
      {
        question: "What Dallas details should I include for drain cleaning?",
        answer:
          "Include the affected fixture, nearby cross streets, whether wastewater is visible, and whether a cleanout, business restroom, or apartment drain is involved."
      }
    ],
    extraLinks: [
      { label: "Dallas emergency plumbing", href: "/cities/dallas" },
      { label: "Emergency drain cleaning service", href: "/services/emergency-drain-cleaning" },
      { label: "Drain cleaning cost in DFW", href: "/cost-guides/drain-cleaning-cost-dfw" }
    ]
  }
};

export const cityPageEnhancements: Record<string, PageEnhancement> = {
  dallas: {
    decisionTitle: "Dallas emergency leak and drain triage",
    decisionIntro:
      "Dallas requests are clearer when the first message explains whether the issue is active water, wastewater, an essential fixture outage, or a cost/planning question.",
    decisionItems: [
      "For active leaks, share whether a fixture valve or main shutoff has stopped the water.",
      "For drain backups, share whether one fixture or several fixtures are reacting.",
      "For apartments, restaurants, or shared buildings, mention tenant, customer, or business impact.",
      "Use nearby cross streets or neighborhood context for service-area matching without treating this as a local office claim."
    ],
    providerTitle: "Useful Dallas request details",
    providerItems: [
      "Affected fixture, room, or business area.",
      "Whether water is clean, dirty, hot, or cold.",
      "Whether a cleanout, shutoff valve, or water heater is accessible.",
      "Whether the problem is new, recurring, or tied to heavy use or recent storms."
    ],
    safetyTitle: "When Dallas requests should be treated as urgent",
    safetyItems: [
      "Water is active or spreading.",
      "Wastewater appears indoors or near a cleanout.",
      "A shutoff valve will not close.",
      "A business, apartment, or only bathroom cannot operate safely."
    ],
    preventionTitle: "Follow-up notes to keep after service",
    preventionItems: [
      "Which shutoff worked and which valve needs attention.",
      "Whether a drain clearing found a likely cause.",
      "What follow-up maintenance or inspection was recommended."
    ],
    extraFaqs: [
      {
        question: "What should I include in a Dallas emergency plumbing request?",
        answer:
          "Include the affected fixture, nearby cross streets, whether water or wastewater is active, and whether a shutoff valve, cleanout, or business area is involved."
      }
    ],
    extraLinks: [
      { label: "Water shutoff valve will not close", href: "/problems/water-shutoff-valve-will-not-close" },
      { label: "Emergency leak repair cost", href: "/cost-guides/emergency-leak-repair-cost-dfw" },
      { label: "Emergency drain cleaning in Dallas", href: "/cities/dallas/emergency-drain-cleaning" }
    ]
  }
};

export const blogEnhancements: Record<string, BlogEnhancement> = {
  "plumber-or-water-restoration-company-first": {
    checklistTitle: "How to sequence a plumber and a restoration company after a leak",
    checklistIntro:
      "When a pipe bursts or a leak spreads beyond a single fixture, homeowners are often unsure whether to call a plumber, a water-restoration company, or both. The short answer is usually both, but not at the same time -- the order matters.",
    checklistItems: [
      "Shut off water at the nearest safe valve or the main shutoff first. Neither a plumber nor a restoration company can work safely while water is still actively flowing.",
      "Call a plumber first when the source of the water is still active or unknown -- a visible burst pipe, a fitting that will not stop leaking, or water appearing without a clear cause. The plumbing side typically needs to be stopped and diagnosed before drying work can be planned properly.",
      "Call a water-restoration company first, or at the same time, when the leak has already been stopped and the concern is standing water, soaked flooring, drywall, or insulation, especially if water has been present for more than a few hours.",
      "If you are not sure which situation applies, describe what you are seeing -- active flow, visible pipe damage, or standing water with no ongoing leak -- when you request help, since that detail affects which provider is dispatched first.",
      "Photograph the damage before cleanup begins if you may need it for insurance, and avoid running fans or dehumidifiers over standing water until you know whether it is clean or contaminated.",
      "Keep the affected area clear of foot traffic and electrical equipment until both the water source and the standing water have been assessed."
    ],
    proofTitle: "What to confirm before approving plumbing or restoration work",
    proofItems: [
      "Ask whether the plumber's visit is expected to stop the leak, complete a full repair, or require a follow-up visit -- those are different scopes with different timelines.",
      "Ask a restoration company whether their assessment includes moisture readings behind walls or under flooring, not just visible surface water, since hidden moisture is a common source of later mold issues.",
      "Clarify separately what each company charges for dispatch, diagnosis, and after-hours service before approving work from either side.",
      "If both a plumber and a restoration company are involved, confirm who is documenting the timeline and cause of the leak, since that record can matter for insurance."
    ],
    extraFaqs: [
      {
        question: "Do I need both a plumber and a water-restoration company after a leak?",
        answer:
          "Not always. A contained leak caught quickly may only need plumbing repair. Restoration is more likely needed when water has been present long enough to soak flooring, drywall, or insulation, or when the source was hidden and ran for an unknown period."
      },
      {
        question: "Will my homeowners insurance cover both services?",
        answer:
          "That depends on your policy and the cause of the leak. Confirm coverage details directly with your insurance provider before assuming either service is included."
      }
    ],
    extraLinks: [
      { label: "Burst pipe emergency service", href: "/services/burst-pipe-emergency" },
      { label: "Water heater emergency", href: "/services/water-heater-emergency" },
      { label: "Ceiling leak from plumbing", href: "/problems/ceiling-leak-from-plumbing" },
      { label: "Burst pipe first steps", href: "/problems/burst-pipe-first-steps" },
      { label: "Emergency plumbing cost guide", href: "/cost-guides/emergency-plumbing-cost-dfw" },
      { label: "Burst pipe emergency cost guide", href: "/cost-guides/burst-pipe-emergency-cost-guide" },
      { label: "Emergency plumbing help in Dallas", href: "/cities/dallas" }
    ]
  },
  "emergency-plumber-near-me-open-now-what-to-do-before-help-arrives": {
    checklistTitle: "What to do before emergency plumbing help arrives",
    checklistIntro:
      "When water is spreading or a fixture is backing up, the useful first steps are usually simple: stop adding water, make the area safer, and collect the details a provider will need. Do not take apart plumbing or force a valve while the problem is active.",
    checklistItems: [
      "Stop using the affected fixture. If several drains react together, pause toilets, sinks, showers, laundry, and the dishwasher until the cause is checked.",
      "Use the nearest working shutoff only if it is easy to reach and turns normally. If it is corroded, leaking, or stuck, do not force it; move to the next safe upstream valve or the main shutoff.",
      "Stay out of standing water near outlets, switches, lights, appliances, or the electrical panel. If water is close to electricity, keep clear and treat the situation as urgent.",
      "Contain clean water with towels or a bucket when it is safe, move valuables away, and photograph visible damage. Avoid contact with wastewater or sewage.",
      "Note what happened first, which fixtures are affected, whether the water is clean or dirty, and what changes when another fixture runs. That sequence can make phone triage more useful.",
      "Have the service address, city or ZIP code, access instructions, parking details, and information about pets or locked areas ready when you request a provider connection."
    ],
    proofTitle: "What to confirm when requesting emergency help",
    proofItems: [
      "Ask whether a provider is actually available for your address and problem. Open-now searches do not guarantee a specific arrival time; timing depends on location, workload, access, and the provider's confirmation.",
      "Clarify dispatch, diagnostic, after-hours, repair, parts, and cleanup charges before approving work. A phone estimate can change after diagnosis or hidden access is found.",
      "Confirm licensing, insurance, warranty, and business details directly with the provider when those points matter to your decision.",
      "Ask whether the first visit is expected to isolate the problem, complete a permanent repair, or arrange a follow-up. After submitting a request, keep the affected fixtures off and stay reachable for questions or arrival updates."
    ],
    extraFaqs: [
      {
        question: "How quickly can an emergency plumber arrive in Dallasâ€“Fort Worth?",
        answer:
          "There is no reliable one-time answer for every address. Availability depends on the city, time, current calls, travel distance, access, and problem type. Confirm the arrival window directly with the provider before relying on it."
      },
      {
        question: "What should I avoid while waiting for emergency plumbing help?",
        answer:
          "Do not keep flushing or running water to test a backup, pour chemical cleaner into standing water, force a stuck shutoff, touch wet electrical equipment, or enter an area contaminated by sewage."
      }
    ],
    extraLinks: [
      { label: "24-hour emergency plumber options", href: "/services/24-hour-emergency-plumber" },
      { label: "Emergency drain cleaning", href: "/services/emergency-drain-cleaning" },
      { label: "Main sewer line clog help", href: "/services/main-sewer-line-clog" },
      { label: "Toilet overflow emergency", href: "/services/toilet-overflow-emergency" },
      { label: "Water heater emergency", href: "/services/water-heater-emergency" },
      { label: "Emergency plumbing help in Dallas", href: "/cities/dallas" },
      { label: "DFW emergency plumbing cost factors", href: "/cost-guides/emergency-plumbing-cost-dfw" }
    ]
  },
  "toilet-overflowing-at-night-in-dallas-fast-steps-for-homeowners": {
    checklistTitle: "What to do when a toilet overflows at night",
    checklistIntro:
      "An overflowing toilet feels worse after hours because it is hard to know whether the problem can wait. Start by stopping incoming water and watching what the other fixtures do. That usually tells you more than another flush will.",
    checklistItems: [
      "Do not flush again. Turn the toilet's supply valve clockwise if it moves normally; stop if the valve is stuck, corroded, or begins leaking.",
      "If clean water is still entering from the tank, remove the tank lid only if you can do so safely and lift the float to slow the refill. Do not reach into a bowl containing wastewater.",
      "Keep children and pets away. Use towels only for clean water, and avoid direct contact when sewage or contaminated water is present.",
      "Check the nearby tub or shower without running more water. Water already rising there, toilet gurgling, or more than one affected fixture can point to a deeper drain or sewer restriction.",
      "In an apartment or shared building, tell property management promptly if water may reach another unit or several fixtures are affected. Note whether neighbors report similar symptoms.",
      "Photograph visible water and record whether the shutoff worked, which fixtures reacted, and whether the water looked clean or dirty. Keep the toilet and connected fixtures unused while waiting."
    ],
    proofTitle: "How to decide whether it can wait until morning",
    proofItems: [
      "Request urgent help when water will not stop, the shutoff fails, wastewater spreads onto flooring, another drain backs up, or the home has no usable toilet.",
      "A contained toilet with the supply off and no activity in other fixtures may be safer to leave unused until normal hours, but only the responding provider can confirm availability and timing for the address.",
      "Ask whether the visit covers an isolated toilet clog, a tank or valve problem, or investigation of a possible branch or main sewer restriction. Those are different scopes.",
      "Confirm dispatch, diagnostic, after-hours, clearing, fixture-repair, and cleanup charges before approving work. Avoid relying on a guaranteed arrival time or exact price that has not been confirmed directly."
    ],
    extraFaqs: [
      {
        question: "Can an overflowing toilet in Dallas wait until morning?",
        answer:
          "It may be reasonable to leave the toilet unused when the supply is fully off, the water is contained, no other fixture reacts, and another toilet is available. Seek urgent help when water continues rising, wastewater spreads, the valve fails, or several fixtures are involved."
      },
      {
        question: "Should I plunge a toilet that is already overflowing?",
        answer:
          "First stop the incoming water and let the bowl level settle. A plunger may help an isolated clog, but stop if the bowl keeps rising, dirty water appears elsewhere, or the tub or shower reacts because the restriction may be deeper."
      }
    ],
    extraLinks: [
      { label: "Emergency toilet overflow help", href: "/services/toilet-overflow-emergency" },
      { label: "Steps when a toilet will not stop overflowing", href: "/problems/toilet-overflowing-will-not-stop" },
      { label: "Emergency drain cleaning", href: "/services/emergency-drain-cleaning" },
      { label: "Sewer backup help", href: "/services/sewer-backup-help" },
      { label: "Emergency plumbing help in Dallas", href: "/cities/dallas" },
      { label: "DFW emergency plumbing cost factors", href: "/cost-guides/emergency-plumbing-cost-dfw" }
    ]
  },
  "main-sewer-line-clogged-in-dallas-warning-signs-and-fast-options": {
    checklistTitle: "How to recognize a likely main sewer clog",
    checklistIntro:
      "One slow sink usually points to a problem near that fixture. A main sewer restriction behaves differently: fixtures begin reacting to one another, and the lowest drain often shows the trouble first. The pattern matters more than any single gurgle.",
    checklistItems: [
      "Stop using water when flushing a toilet makes water rise in a tub or shower, laundry causes a floor drain to back up, or several fixtures slow down together.",
      "Check the lowest fixtures and the outdoor cleanout from a safe distance. Do not remove a cleanout cap when wastewater is visible, overflowing, or may be under pressure.",
      "Keep people and pets away from sewage. Do not run more water to test the line, and do not pour chemical cleaner into fixtures connected to an active backup.",
      "Write down the fixture sequence: what was used first, where water appeared, whether it was clean or dirty, and whether the problem changes after heavy household water use.",
      "Mention recurring clogs, recent drain work, known roots, property access, and whether the cleanout can be located. These details help a provider plan the first inspection without assuming the cause.",
      "For apartments, restaurants, or shared buildings, report the backup promptly and note whether other units or common drains are affected. A shared-line problem needs different coordination than one bathroom clog."
    ],
    proofTitle: "What the first sewer visit mayâ€”and may notâ€”resolve",
    proofItems: [
      "Ask whether the visit is for emergency containment, line clearing, camera inspection, cause diagnosis, cleanup coordination, or repair planning. These may be separate scopes.",
      "Clearing a blockage can restore flow without proving why it formed. When the problem returns, ask what evidence supports roots, grease, damaged pipe, poor slope, or another suspected cause.",
      "Confirm which access point and line segment the provider expects to work on, what happens if the cleanout is inaccessible, and whether a follow-up camera inspection is included or optional.",
      "Confirm availability, credentials, dispatch or diagnostic charges, after-hours terms, and repair approval directly with the provider. Do not rely on guaranteed timing, exact pricing, or a diagnosis made before inspection."
    ],
    extraFaqs: [
      {
        question: "What is the clearest sign of a main sewer line clog in a Dallas home?",
        answer:
          "The strongest clue is more than one fixture reacting togetherâ€”for example, a toilet flush causing water to rise in a tub, shower, floor drain, or outdoor cleanout. Stop water use when that pattern appears."
      },
      {
        question: "Does clearing a main sewer clog fix the underlying problem?",
        answer:
          "Not always. Clearing may restore flow, while camera inspection or follow-up diagnosis may be needed to evaluate a recurring cause such as roots, buildup, damaged pipe, or access-related issues. Ask what the completed scope actually confirmed."
      }
    ],
    extraLinks: [
      { label: "Main sewer line clog help", href: "/services/main-sewer-line-clog" },
      { label: "Sewer backup help", href: "/services/sewer-backup-help" },
      { label: "Emergency drain cleaning", href: "/services/emergency-drain-cleaning" },
      { label: "Water backing up in the shower and toilet", href: "/problems/water-backing-up-in-shower-and-toilet" },
      { label: "Outdoor cleanout overflowing", href: "/problems/outdoor-cleanout-overflowing" },
      { label: "Emergency plumbing help in Dallas", href: "/cities/dallas" },
      { label: "Sewer line clog cost factors", href: "/cost-guides/sewer-line-clog-cost-guide" }
    ]
  },
  "water-shutoff-valve-will-not-close-during-a-leak": {
    checklistTitle: "Failed shutoff leak checklist",
    checklistIntro:
      "Use this checklist when water is leaking and the nearest valve will not close. The goal is to reduce risk and describe the situation clearly.",
    checklistItems: [
      "Stop using the affected fixture immediately.",
      "Check for the next upstream shutoff only if it is safe to reach.",
      "Avoid forcing a corroded, leaking, or spinning valve.",
      "Keep water away from outlets, switches, panels, and plugged-in equipment.",
      "Describe whether water is still active, where it is visible, and which valve failed.",
      "Ask whether the visit is for isolation, diagnosis, valve repair, pipe repair, or restoration coordination."
    ],
    proofTitle: "Claims and scope to verify before approval",
    proofItems: [
      "Confirm whether the provider is stopping active water or completing a permanent repair.",
      "Confirm whether wall, ceiling, cabinet, or floor access is included.",
      "Confirm whether drying, cleanup, drywall, flooring, or cabinet repair is outside the plumbing scope.",
      "Confirm pricing and credentials directly with the matched provider before authorizing work."
    ],
    extraFaqs: [
      {
        question: "Should I force a stuck shutoff valve during a leak?",
        answer:
          "No. If a valve is brittle, corroded, leaking, or spinning, forcing it can make the leak worse. Look for the next safe upstream shutoff or main valve instead."
      },
      {
        question: "What details help a plumber triage a failed shutoff valve?",
        answer:
          "Share which valve failed, whether water is still active, whether electrical areas are nearby, and whether walls, ceilings, cabinets, or floors are wet."
      }
    ],
    extraLinks: [
      { label: "Water shutoff valve will not close", href: "/problems/water-shutoff-valve-will-not-close" },
      { label: "Burst pipe emergency", href: "/services/burst-pipe-emergency" },
      { label: "Emergency leak repair cost", href: "/cost-guides/emergency-leak-repair-cost-dfw" }
    ]
  },
  "best-questions-to-ask-before-you-book-an-emergency-plumber": {
    checklistTitle: "Emergency plumber booking checklist",
    checklistIntro:
      "Use these questions to compare scope and safety before approving emergency work. They are designed to help homeowners get clear answers, not to pressure a booking.",
    checklistItems: [
      "What is included before I approve repair work?",
      "Is there a dispatch or diagnostic fee, and does it change after hours?",
      "What safety step should I take before help arrives?",
      "What could change the scope after diagnosis or access?",
      "Can you explain repair versus replacement options if both are possible?",
      "What work is outside the plumbing scope, such as cleanup or restoration?"
    ],
    proofTitle: "Claims to verify before trusting a provider",
    proofItems: [
      "License, insurance, rating, review, and warranty claims should be verified directly with the provider.",
      "Arrival timing and availability should be confirmed for the specific address and problem.",
      "Exact pricing should not be treated as final until the provider explains diagnosis, access, parts, and scope.",
      "A local listing or office claim should match real, verifiable business information."
    ],
    extraFaqs: [
      {
        question: "What is the most important question before approving emergency plumbing work?",
        answer:
          "Ask what is included before repair approval and what could change after diagnosis. That helps separate dispatch, diagnosis, repair, parts, access, and cleanup."
      },
      {
        question: "Should I choose the fastest provider automatically?",
        answer:
          "Fast help matters when water or wastewater is active, but you should still confirm availability, scope, pricing rules, and credentials directly before authorizing work."
      }
    ],
    extraLinks: [
      { label: "Emergency plumbing cost guide", href: "/cost-guides/emergency-plumbing-cost-dfw" },
      { label: "Water shutoff valve will not close", href: "/problems/water-shutoff-valve-will-not-close" },
      { label: "24-hour emergency plumber", href: "/services/24-hour-emergency-plumber" }
    ]
  },
  "emergency-leak-approval-checklist-for-homeowners": {
    checklistTitle: "Emergency leak approval checklist",
    checklistIntro:
      "Use these prompts when water is active, a shutoff valve failed, or a leak repair needs access through a wall, ceiling, cabinet, or floor.",
    checklistItems: [
      "Water isolated or next safe shutoff identified.",
      "Electrical areas avoided if wet.",
      "Leak source, access area, and affected room described clearly.",
      "Repair scope separated from drying, cleanup, drywall, flooring, and cabinet work.",
      "Dispatch, diagnostic, after-hours, parts, and approval steps explained before work begins.",
      "Credentials, availability, pricing, and warranty details verified directly with the provider."
    ],
    proofTitle: "Scope details to verify",
    proofItems: [
      "Whether the work stops active water, diagnoses hidden access, repairs a pipe, replaces a valve, or coordinates restoration.",
      "What could change once a wall, ceiling, cabinet, or floor is opened.",
      "Whether temporary isolation is available if permanent repair needs parts or extra access.",
      "What is not included in the plumbing scope."
    ],
    extraFaqs: [
      {
        question: "What should I confirm before approving emergency leak work?",
        answer:
          "Confirm whether water is isolated, what access is needed, what the plumbing repair includes, and whether drying or restoration is separate."
      },
      {
        question: "Should price comparison wait during an active leak?",
        answer:
          "If water is spreading or electrical areas are wet, safety and isolation come first. Compare scope and pricing after the immediate risk is controlled."
      }
    ],
    extraLinks: [
      { label: "Burst pipe emergency", href: "/services/burst-pipe-emergency" },
      { label: "Water shutoff valve will not close", href: "/problems/water-shutoff-valve-will-not-close" },
      { label: "Emergency leak repair cost", href: "/cost-guides/emergency-leak-repair-cost-dfw" },
      { label: "Failed shutoff leak checklist", href: "/blog/water-shutoff-valve-will-not-close-during-a-leak" }
    ]
  }
};

export const serviceFaqEnhancements: Record<string, FAQ[]> = {
  "burst-pipe-emergency": [
    {
      question: "What leak details should I include in the request?",
      answer:
        "Include whether water is still active, which shutoff worked, where water is visible, whether electrical areas are nearby, and whether walls, ceilings, cabinets, or floors are wet."
    }
  ],
  "main-sewer-line-clog": [
    {
      question: "What details help a main sewer line call get triaged?",
      answer:
        "Share which fixtures react together, whether the outdoor cleanout is overflowing, whether wastewater is visible, and whether heavy rain or recurring backups are involved."
    }
  ]
};

export const problemFaqEnhancements: Record<string, FAQ[]> = {
  "water-shutoff-valve-will-not-close": [
    {
      question: "What should I tell the provider if the shutoff valve failed?",
      answer:
        "Share which valve failed, whether it leaked or spun, whether the main valve is accessible, and whether water is still spreading."
    }
  ],
  "kitchen-sink-backing-up": [
    {
      question: "When is a kitchen sink backup more than a simple sink clog?",
      answer:
        "It may be more than a simple fixture clog when the dishwasher backs up, nearby drains gurgle, water returns quickly after clearing, or grease-heavy use keeps causing the problem."
    }
  ],
  "outdoor-cleanout-overflowing": [
    {
      question: "Should I open an overflowing outdoor cleanout?",
      answer:
        "Do not remove a cleanout cap if pressure or wastewater is present. Stop indoor water use and request sewer-line guidance instead."
    }
  ]
};

export const costGuideFaqEnhancements: Record<string, FAQ[]> = {
  "emergency-leak-repair-cost-dfw": [
    {
      question: "What is the most important leak cost detail?",
      answer:
        "The key detail is whether water is still active. Active water, failed shutoffs, hidden access, and restoration needs can change the scope."
    }
  ],
  "drain-cleaning-cost-dfw": [
    {
      question: "Why can two drain-cleaning quotes describe different work?",
      answer:
        "One quote may cover a simple fixture clog while another includes main-line access, camera inspection, after-hours timing, or repeat-blockage diagnosis."
    }
  ],
  "sewer-line-clog-cost-guide": [
    {
      question: "What sewer-line cost question protects me from unclear scope?",
      answer:
        "Ask whether the visit is for clearing only, diagnosis, camera inspection, cleanup coordination, or repair planning because those can be separate scopes."
    }
  ]
};
