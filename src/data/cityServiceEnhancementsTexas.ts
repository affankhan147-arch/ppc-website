import type { PageEnhancement } from "./pageEnhancements";

export const texasCityServiceEnhancements: Record<string, PageEnhancement> = {
  "houston/24-hour-emergency-plumber": {
    decisionTitle: "When to Call a 24-Hour Emergency Plumber in Houston",
    decisionIntro: "Houston's sprawling urban landscape and heavy clay soil create unique plumbing challenges. With frequent heavy rains and aging infrastructure, sewer backups and pipe bursts are common. Here's when to call a professional.",
    decisionItems: [
      "Multiple drains backing up at once, often after heavy rain",
      "Water pooling in your yard or driveway unexpectedly",
      "Gurgling sounds from toilets and drains, especially after storms",
      "Sewage odors coming from floor drains or your yard",
      "Sudden loss of water pressure throughout the house"
    ],
    providerTitle: "What to Expect from a Houston Emergency Plumber",
    providerItems: [
      "Licensed plumbers familiar with Houston's soil and drainage systems",
      "24/7 emergency service – nights, weekends, holidays",
      "Upfront flat-rate pricing with no hidden charges",
      "Free phone consultation to assess your situation"
    ],
    safetyTitle: "Immediate Safety Steps in Houston Before Help Arrives",
    safetyItems: [
      "Turn off the main water valve if you see flooding",
      "Avoid using any electrical devices near standing water",
      "Open windows if you smell gas or sewer fumes",
      "Never use chemical drain cleaners – they can corrode pipes"
    ],
    preventionTitle: "Preventing Plumbing Emergencies in Houston",
    preventionItems: [
      "Schedule annual sewer line inspections to catch issues early",
      "Insulate exposed pipes in attics and crawl spaces",
      "Test your main water shutoff valve regularly",
      "Install a backwater valve to protect against sewer backups during heavy rains"
    ],
    extraFaqs: [
      { question: "How much does an emergency plumber cost in Houston?", answer: "Pricing varies based on diagnosis, time of day, and parts needed. We give a flat-rate estimate before starting work." },
      { question: "Do you offer same-day service in Houston?", answer: "Yes, we have providers available 24/7 in the Houston area and typically arrive within 30 to 60 minutes." }
    ],
    extraLinks: [
      { label: "24-Hour Emergency Plumber in Houston", href: "/services/24-hour-emergency-plumber" }
    ]
  },
  // Keyword overhaul 05 (2026-11-15): this entry is live on /cities/houston/emergency-drain-cleaning ("emergency drain
  // cleaning houston" 34 impressions @ 17.4). The old copy promised flat-rate estimates and same-day results the site
  // cannot stand behind; rewritten without promises. The 311 fact is the one already sourced in the houston/24-hour entry.
  "houston/emergency-drain-cleaning": {
    decisionTitle: "Emergency drain cleaning in Houston: when to call",
    decisionIntro: "One slow sink can usually wait for a daytime visit. Several drains backing up at once, a toilet that bubbles when the washer drains, or dirty water in a tub or floor drain means the main line is blocked, and in Houston that often shows up during or right after a heavy downpour. That is a same-day call.",
    decisionItems: [
      "Say how many drains are affected and which ones, since one fixture and the main line need different equipment.",
      "Mention if the backup started during or after heavy rain, and whether an outdoor cleanout is overflowing.",
      "Tell the plumber whether chemical drain cleaner has already been used, so they can protect themselves.",
      "Water coming up in the street or at the city's meter is a City of Houston matter: report it through 311, which is open 24 hours a day."
    ],
    providerTitle: "What a Houston drain plumber may do",
    providerItems: [
      "Clear the main line through an outdoor cleanout when there is one, usually the easiest way in.",
      "Use a cable snake for most clogs, and hydro jetting for grease or roots that a snake only punches through.",
      "Run a camera when the same drain keeps clogging, to see whether the pipe is broken or just blocked.",
      "Give a price for clearing the line before starting, and a separate price for any repair the camera shows."
    ],
    safetyTitle: "Before the plumber arrives",
    safetyItems: [
      "Stop running water into the house: no flushing, laundry or dishwasher until the line is cleared.",
      "Keep children and pets away from sewage, and don't clean it up without gloves.",
      "Don't pour chemical drain cleaner into standing water.",
      "If water is spreading toward outlets or the panel, switch that area off at the breaker if you can do it without standing in water."
    ],
    preventionTitle: "Fewer drain emergencies in Houston",
    preventionItems: [
      "Keep grease, wipes and coffee grounds out of drains; they cause most kitchen and main-line clogs.",
      "If backups keep happening after storms, ask a plumber whether a backwater valve suits your sewer line.",
      "Know where your outdoor cleanout is so a plumber can reach the main line quickly."
    ],
    extraFaqs: [
      { question: "How much does emergency drain cleaning cost in Houston?", answer: "It depends on where the clog is and when you call. Clearing one fixture costs less than clearing the main line, hydro jetting costs more than snaking, and nights and weekends add an after-hours charge. Ask what is included, and whether a camera inspection is extra, before work starts." },
      { question: "Can a plumber clear a main sewer line clog in Houston at night?", answer: "Yes. Main line backups are one of the most common after-hours calls. Stop using water until the plumber arrives, and have the cleanout location and the list of affected drains ready." }
    ],
    extraLinks: [
      { label: "24 hour plumber in Houston", href: "/cities/houston/24-hour-emergency-plumber" },
      { label: "Drain cleaning cost factors", href: "/cost-guides/drain-cleaning-cost-dfw" }
    ]
  },
  // Keyword overhaul 05 (2026-11-15): live on /cities/austin/24-hour-emergency-plumber, the site's most-shown page
  // (9,948 impressions in 3 months; "emergency plumber austin" 284 @ 27.8, "24 hour plumber austin" 63 @ 24). The old copy
  // promised arrival in 30-60 minutes, flat-rate estimates and free consultations; removed. Austin facts sourced from
  // austintexas.gov/water/water-leaks and /water/high-water-bill-options (City Code 15-9-141), and the NWS Austin/San
  // Antonio "February 2021 Historical Winter Storm Event" summary.
  "austin/24-hour-emergency-plumber": {
    decisionTitle: "24 hour plumber in Austin, TX: who to call first",
    decisionIntro: "In Austin the first call depends on which side of the meter the water is on. Austin Water maintains the water mains and the line up to the meter, and takes leak reports around the clock at 512-972-1000. Property owners are responsible for the service line past the meter and for the plumbing inside the house, and that is a job for an emergency plumber.",
    decisionItems: [
      "Water bubbling up in the street, a sidewalk or the meter box: report it to Austin Water at 512-972-1000, which is available 24/7.",
      "A leak inside the house, under the slab, or in the yard between the meter and the house: close your cut-off valve and call a plumber.",
      "Sewage backing up into a tub, shower or floor drain is a plumbing emergency at any hour; stop using water until the line is cleared.",
      "Tell the plumber whether you have closed the cut-off valve, and whether the leak started during or right after a freeze."
    ],
    providerTitle: "What an Austin emergency plumber may check",
    providerItems: [
      "Pipes in the attic, garage, exterior walls and outdoor hose bibs, the places most likely to split in a hard freeze.",
      "The private service line between the meter and the house if the yard is soggy or the meter keeps moving with every fixture off.",
      "Water heater connections and the relief line when the leak is near the heater.",
      "A dated, paid invoice that names the repair, which Austin Water asks for with a leak bill adjustment request."
    ],
    safetyTitle: "When it can't wait until morning in Austin",
    safetyItems: [
      "Water you cannot shut off, or water reaching outlets, the electrical panel or light fixtures.",
      "A ceiling that is sagging or dripping.",
      "Sewage coming up into the house.",
      "Burst pipes after a hard freeze: in the February 10-18, 2021 winter storm, the National Weather Service Austin/San Antonio office reported 5 to 6 consecutive days of temperature records at its climate sites, including Austin's."
    ],
    preventionTitle: "Austin-specific prevention notes",
    preventionItems: [
      "Find your cut-off valve before you need it: Austin Water says it sits on the service line just past the meter box, on your side, and shuts off water to the whole property.",
      "Insulate exposed pipes in the attic, the garage and on outside walls before a freeze.",
      "Keep the plumber's paid invoice after any leak repair: Austin Water's leak bill adjustment request has to be sent within 90 days of the repair."
    ],
    extraFaqs: [
      { question: "Who do I call about a water leak in the street in Austin?", answer: "Austin Water, at 512-972-1000, which is available 24/7; it also shows known leaks on its Leak Response Map. Austin 311 handles non-emergency water and sewer questions from 7 a.m. to 9 p.m. A leak inside your home or past the meter is yours to have repaired by a licensed plumber." },
      { question: "How much does an emergency plumber cost in Austin?", answer: "It depends on the time of the call, the problem and the parts. After-hours dispatch fees and rates run higher than daytime ones, so ask for the dispatch fee and how the repair will be priced before anyone drives out, and get the repair price in writing before work starts." },
      { question: "Can I get a credit on my Austin water bill after a leak?", answer: "Possibly. Austin Water takes leak bill adjustment requests within 90 days of the leak repair, with a repair receipt or paid invoice, your account number, the property address, the dates of the high charges and a description of the repair. An adjustment is not guaranteed." }
    ],
    extraLinks: [
      { label: "Emergency plumber cost: what drives the price", href: "/guides/dfw-emergency-plumbing-costs" },
      { label: "How to verify a Texas plumber's license", href: "/blog/how-to-verify-a-texas-plumbers-license" }
    ]
  },
  // Keyword overhaul 05 (2026-11-15): live on /cities/austin/emergency-drain-cleaning ("emergency drain cleaning company
  // austin tx" 30 @ 34.1). Old promises (flat-rate estimates, "our team") removed. 311 hours from austintexas.gov/water/water-leaks.
  "austin/emergency-drain-cleaning": {
    decisionTitle: "Emergency drain cleaning in Austin: when to call",
    decisionIntro: "A clog in one sink can usually wait for a daytime visit. Several drains backing up at once, or sewage in a tub, shower or floor drain, means the main line is blocked and needs a plumber the same day. Austin 311 takes non-emergency sewer questions from 7 a.m. to 9 p.m.; a backup inside your house is a job for a plumber.",
    decisionItems: [
      "Slow or clogged drains in more than one room at the same time.",
      "Water rising in a tub or shower when a toilet is flushed.",
      "Gurgling toilets or sinks when another fixture drains.",
      "A sewage smell from floor drains, or an outdoor cleanout that is overflowing."
    ],
    providerTitle: "What an Austin drain plumber may do",
    providerItems: [
      "Clear the main line through an outdoor cleanout when there is one, usually the easiest way in.",
      "Use a cable snake for most clogs, and hydro jetting for grease or roots.",
      "Run a camera when a drain keeps clogging, to see whether the pipe is cracked or just blocked.",
      "Give a price for clearing the line before starting, and a separate price for any repair the camera shows."
    ],
    safetyTitle: "Before the plumber arrives",
    safetyItems: [
      "Stop using water: no flushing, laundry or dishwasher until the line is cleared.",
      "Don't use chemical drain cleaners in standing water.",
      "Keep people and pets away from sewage.",
      "If water is pooling near outlets, switch that area off at the breaker if you can do it safely."
    ],
    preventionTitle: "Fewer drain emergencies in Austin",
    preventionItems: [
      "Use drain screens, and keep grease, wipes and coffee grounds out of drains.",
      "If the same drain clogs every few months, ask for a camera inspection rather than another snaking.",
      "Hard water leaves mineral scale in pipes and fixtures; a water softener can slow it down."
    ],
    extraFaqs: [
      { question: "How much does emergency drain cleaning cost in Austin?", answer: "A single-fixture clog costs less than clearing the main line, and hydro jetting costs more than snaking. Nights and weekends add an after-hours charge. Ask what is included, and whether a camera inspection is extra, before work starts." },
      { question: "Can a plumber clear a main sewer line clog in Austin at night?", answer: "Yes. Main line backups are a common after-hours call. Stop using water until it is cleared, and tell the plumber where your outdoor cleanout is if you know." }
    ],
    extraLinks: [
      { label: "24 hour plumber in Austin", href: "/cities/austin/24-hour-emergency-plumber" },
      { label: "Drain cleaning cost factors", href: "/cost-guides/drain-cleaning-cost-dfw" }
    ]
  },
  "san-antonio/24-hour-emergency-plumber": {
    decisionTitle: "When to Call a 24-Hour Emergency Plumber in San Antonio",
    decisionIntro: "San Antonio's blend of historic homes and expanding suburbs creates a mix of plumbing systems. The region's limestone soil can cause foundations to shift, stressing pipes. Here's when to call a professional emergency plumber.",
    decisionItems: [
      "Water backing up into multiple fixtures across the house",
      "Sudden loss of water pressure or no water at all",
      "Gurgling sounds from drains or toilets",
      "Foul sewage odors from floor drains or yard",
      "Water stains on ceilings or walls from hidden leaks"
    ],
    providerTitle: "What to Expect from a San Antonio Emergency Plumber",
    providerItems: [
      "Licensed plumbers experienced with both historic and modern homes",
      "24/7 emergency service – nights, weekends, holidays",
      "Flat-rate pricing with no hidden fees",
      "Free phone consultation to discuss your issue"
    ],
    safetyTitle: "Immediate Safety Steps in San Antonio Before Help Arrives",
    safetyItems: [
      "Turn off the main water valve if you detect flooding",
      "Avoid using any electrical appliances near water",
      "Open windows if you smell gas or sewer fumes",
      "Do not use chemical drain cleaners – they can corrode pipes"
    ],
    preventionTitle: "Preventing Plumbing Emergencies in San Antonio",
    preventionItems: [
      "Schedule annual sewer line inspections, especially for older homes",
      "Insulate pipes in unheated areas",
      "Know the location of your main water shutoff valve",
      "Install a sump pump in basements to prevent flooding"
    ],
    extraFaqs: [
      { question: "How much does an emergency plumber cost in San Antonio?", answer: "Pricing depends on diagnosis, time of day, and parts needed. We provide a flat-rate estimate before any work begins." },
      { question: "Do you offer same-day service in San Antonio?", answer: "Yes, we have providers available 24/7 in the San Antonio area and typically arrive within 30 to 60 minutes." }
    ],
    extraLinks: [
      { label: "24-Hour Emergency Plumber in San Antonio", href: "/services/24-hour-emergency-plumber" }
    ]
  },
  // Keyword overhaul 05 (2026-11-15): live on /cities/san-antonio/emergency-drain-cleaning. Old promises removed. SAWS facts
  // are the ones already sourced in the san-antonio/24-hour entry in pageEnhancements.ts (PH-036).
  "san-antonio/emergency-drain-cleaning": {
    decisionTitle: "Emergency drain cleaning in San Antonio: when to call",
    decisionIntro: "One slow drain can wait. Several drains backing up at once, or sewage in a tub, shower or floor drain, means the main line is blocked and is a same-day call. San Antonio Water System (SAWS) takes water and sewer emergency calls 24 hours a day, but says it cannot repair plumbing on private property, so a backup inside your home needs a plumber.",
    decisionItems: [
      "Slow or clogged drains in more than one room at the same time.",
      "Water rising in a tub or shower when a toilet is flushed.",
      "Gurgling toilets or sinks when another fixture drains.",
      "Sewage overflowing in the street or from a city manhole is a call to SAWS, not to a plumber."
    ],
    providerTitle: "What a San Antonio drain plumber may do",
    providerItems: [
      "Clear the main line through an outdoor cleanout when there is one, usually the easiest way in.",
      "Use a cable snake for most clogs, and hydro jetting for grease or roots.",
      "Run a camera when a drain keeps clogging, to see whether older pipe is cracked or just blocked.",
      "Give a price for clearing the line before starting, and a separate price for any repair the camera shows."
    ],
    safetyTitle: "Before the plumber arrives",
    safetyItems: [
      "Stop using water: no flushing, laundry or dishwasher until the line is cleared.",
      "Don't use chemical drain cleaners in standing water.",
      "Keep people and pets away from sewage.",
      "If water is pooling near outlets, switch that area off at the breaker if you can do it safely."
    ],
    preventionTitle: "Fewer drain emergencies in San Antonio",
    preventionItems: [
      "Use drain screens, and keep grease, wipes and coffee grounds out of drains.",
      "If the same drain clogs every few months, ask for a camera inspection rather than another snaking.",
      "Ask a plumber whether a backwater valve suits your sewer line if backups follow heavy rain."
    ],
    extraFaqs: [
      { question: "How much does emergency drain cleaning cost in San Antonio?", answer: "A single-fixture clog costs less than clearing the main line, and hydro jetting costs more than snaking. Nights and weekends add an after-hours charge. Ask what is included, and whether a camera inspection is extra, before work starts." },
      { question: "Will SAWS clear a clogged drain at my house?", answer: "No. SAWS takes water and sewer emergency calls 24 hours a day but says it cannot repair plumbing on private property. A clog in your home's drains or sewer line needs a plumber." }
    ],
    extraLinks: [
      { label: "24 hour plumber in San Antonio", href: "/cities/san-antonio/24-hour-emergency-plumber" },
      { label: "Drain cleaning cost factors", href: "/cost-guides/drain-cleaning-cost-dfw" }
    ]
  }
};