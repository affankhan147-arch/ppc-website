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
    question: "Can you guarantee arrival time?",
    answer: "No guaranteed arrival time is claimed. Availability depends on the matched provider, location, service need, and schedule."
  },
  {
    question: "Should I call if water is actively leaking?",
    answer: "Yes. If water is actively leaking and you cannot stop it safely, shut off water if possible and request urgent help."
  },
  {
    question: "Do you create Google Business Profiles?",
    answer: "No fake profiles are created. A Google Business Profile should only be used for a real eligible business or verified partner."
  }
];

export const emergencyFaqs: FAQ[] = [
  {
    question: "What should I do first during a plumbing emergency?",
    answer: "Stop the water source if safe, avoid using affected fixtures, protect people from contaminated water, and request help."
  },
  {
    question: "When should a drain backup be treated as urgent?",
    answer: "Treat it as urgent when more than one fixture backs up, wastewater appears, or the problem blocks essential use."
  },
  {
    question: "Can I use chemical drain cleaner during a backup?",
    answer: "Avoid chemical cleaners once water has backed up. They can create splash risk and may not solve a deeper blockage."
  },
  {
    question: "What details should I share when calling?",
    answer: "Share the city, affected fixtures, whether water is active, any sewer odor, and whether the problem is getting worse."
  }
];
