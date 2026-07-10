export type Problem = {
  slug: string;
  title: string;
  directAnswer: string;
  warningSigns: string[];
  steps: string[];
  relatedServiceSlug: string;
};

export const problems: Problem[] = [
  {
    slug: "toilet-and-tub-backing-up",
    title: "Toilet and tub backing up together",
    directAnswer: "A toilet and tub backing up together often points to a shared drain or main sewer line problem, especially when flushing pushes water into another fixture.",
    warningSigns: ["gurgling after flush", "sewage odor", "multiple fixtures slow", "water rising in tub"],
    steps: ["Stop flushing.", "Do not run showers or laundry.", "Keep people away from dirty water.", "Call for sewer line guidance."],
    relatedServiceSlug: "main-sewer-line-clog"
  },
  {
    slug: "sewage-smell-in-bathroom",
    title: "Sewage smell in bathroom",
    directAnswer: "A sewage smell may come from a dry trap, vent issue, drain buildup, or sewer backup risk. If odor appears with slow drains, get help quickly.",
    warningSigns: ["odor near drains", "slow fixtures", "gurgling", "floor drain smell"],
    steps: ["Run water in unused drains.", "Check for visible backup.", "Ventilate the room.", "Call if odor persists with drainage issues."],
    relatedServiceSlug: "sewer-backup-help"
  },
  {
    slug: "water-coming-through-ceiling",
    title: "Water coming through ceiling",
    directAnswer: "Water coming through a ceiling can mean an active pipe, fixture, or water heater leak above. Shut off water if safe and avoid electrical areas.",
    warningSigns: ["dripping ceiling", "bulging drywall", "light fixture leak", "new stains"],
    steps: ["Avoid wet electrical fixtures.", "Shut off water.", "Place a bucket if safe.", "Call for urgent leak help."],
    relatedServiceSlug: "burst-pipe-emergency"
  },
  {
    slug: "kitchen-sink-backing-up",
    title: "Kitchen sink backing up",
    directAnswer: "A kitchen sink backup may be a grease clog or deeper line blockage. Stop running the disposal and avoid adding chemical cleaners after water backs up.",
    warningSigns: ["standing sink water", "dishwasher backup", "grease odor", "slow repeated clog"],
    steps: ["Turn off disposal.", "Stop dishwasher use.", "Remove standing water only if safe.", "Call for drain cleaning guidance."],
    relatedServiceSlug: "emergency-drain-cleaning"
  },
  {
    slug: "water-heater-leaking",
    title: "Water heater leaking",
    directAnswer: "A leaking water heater should be treated quickly because tank leaks can worsen and electrical or gas equipment may be nearby.",
    warningSigns: ["water around tank", "rust", "popping sounds", "hot water loss"],
    steps: ["Turn off water to the unit.", "Turn off power or gas if safe.", "Avoid standing water.", "Request water heater help."],
    relatedServiceSlug: "water-heater-emergency"
  },
  {
    slug: "main-drain-slow",
    title: "Main drain running slow",
    directAnswer: "A slow main drain can become a backup. If several fixtures drain slowly, the issue may not be isolated to one sink or tub.",
    warningSigns: ["several slow drains", "toilet bubbles", "laundry drain overflow", "recurring clogs"],
    steps: ["Reduce water use.", "Note affected fixtures.", "Avoid repeated plunging if backup spreads.", "Call for drain evaluation."],
    relatedServiceSlug: "main-sewer-line-clog"
  },
  {
    slug: "business-restroom-closed",
    title: "Business restroom closed by plumbing issue",
    directAnswer: "A closed restroom can affect customer access and business operations. Managers should document fixtures affected and request commercial help.",
    warningSigns: ["multiple stalls blocked", "floor water", "odor", "tenant complaints"],
    steps: ["Close unsafe areas.", "Stop water use.", "Notify staff.", "Request commercial emergency plumbing help."],
    relatedServiceSlug: "commercial-emergency-plumbing"
  },
  {
    slug: "shower-filling-with-dirty-water",
    title: "Shower filling with dirty water",
    directAnswer: "Dirty water rising into a shower can indicate a drain or sewer backup. Stop water use and keep people away from the water.",
    warningSigns: ["dirty water in shower", "toilet bubbles", "sewer odor", "floor drain overflow"],
    steps: ["Stop using fixtures.", "Avoid contact with water.", "Do not add chemicals.", "Call for sewer backup help."],
    relatedServiceSlug: "sewer-backup-help"
  }
];
