export type FAQ = {
  question: string;
  answer: string;
};

export const universalFaqs: FAQ[] = [
  {
    question: "Is this website a plumbing company?",
    answer: "This website connects users with local emergency plumbing providers. It is not a licensed plumbing company unless specific verified proof is shown."
  },
  {
    question: "Is arrival time promised?",
    answer: "No. Availability depends on the matched provider, location, service need, and schedule."
  },
  {
    question: "Should I call if water is actively leaking?",
    answer: "Yes. If water is actively leaking and you cannot stop it safely, shut off water if possible and request urgent help."
  },
  {
    question: "How should I verify the provider?",
    answer: "Confirm the provider's pricing, credentials, scope, and timing directly before approving any work."
  },
  {
    question: "How should I use the city service-area pages?",
    answer: "Use city pages to describe where plumbing help is needed. Provider availability, credentials, timing, pricing, and scope should be confirmed directly before work begins."
  },
  {
    question: "Can I call instead of using the form?",
    answer: "When phone support is available, use the call option. If it is not shown, submit the request form with your city, issue, and urgency."
  },
  {
    question: "Can this site guarantee exact plumbing prices?",
    answer: "No. Cost depends on diagnosis, access, timing, parts, severity, and provider pricing. Confirm pricing directly before approving work."
  }
];

export const emergencyFaqs: FAQ[] = [
  {
    question: "What should I do first during a plumbing emergency?",
    answer: "Stop the water source if safe, avoid using affected fixtures, protect people from contaminated water, and request help."
  },
  {
    question: "What should I do during an active leak?",
    answer: "Use the closest working shutoff valve, keep water away from electrical areas, and request leak help quickly if water keeps spreading."
  },
  {
    question: "When should a drain backup be treated as urgent?",
    answer: "Treat it as urgent when more than one fixture backs up, wastewater appears, or the problem blocks essential use."
  },
  {
    question: "Which sewer symptoms need fast attention?",
    answer: "Multiple slow drains, sewer odor, toilet gurgling, dirty tub water, or outdoor cleanout overflow should be treated as urgent warning signs."
  },
  {
    question: "When does fixture loss become urgent?",
    answer: "No usable toilet, no hot water for vulnerable occupants, or water near unsafe areas can justify urgent guidance."
  },
  {
    question: "Can I use chemical drain cleaner during a backup?",
    answer: "Avoid chemical cleaners once water has backed up. They can create splash risk and may not solve a deeper blockage."
  },
  {
    question: "What details should I share when calling?",
    answer: "Share the city, affected fixtures, whether water is active, any sewer odor, and whether the problem is getting worse."
  },
  {
    question: "When is a sewer smell urgent?",
    answer: "Sewer smell is more urgent when it appears with slow drains, gurgling toilets, visible wastewater, or symptoms across multiple fixtures."
  },
  {
    question: "What should I avoid during a drain backup?",
    answer: "Avoid running more water, using chemical cleaners, running laundry or dishwasher cycles, and touching contaminated water."
  },
  {
    question: "What should I tell the provider?",
    answer: "Share the affected fixture, whether water or wastewater is active, your city, access notes, and any shutoff steps already taken."
  }
];
