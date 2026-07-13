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
