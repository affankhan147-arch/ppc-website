export type CostGuide = {
  slug: string;
  title: string;
  directAnswer: string;
  factors: string[];
  relatedServiceSlug: string;
};

export const costGuides: CostGuide[] = [
  {
    slug: "emergency-plumbing-cost-dallas",
    title: "Emergency plumbing cost in Dallas",
    directAnswer: "Emergency plumbing cost depends on timing, severity, access, parts, and whether the problem risks water damage. Confirm pricing directly with the provider before work starts.",
    factors: ["after-hours timing", "diagnostic work", "parts", "access difficulty", "water damage risk"],
    relatedServiceSlug: "24-hour-emergency-plumber"
  },
  {
    slug: "emergency-drain-cleaning-cost-dallas",
    title: "Emergency drain cleaning cost in Dallas",
    directAnswer: "Emergency drain cleaning cost depends on clog location, equipment needed, severity, and whether the main sewer line is involved.",
    factors: ["fixture versus main line", "cable or hydro equipment", "camera inspection", "repeat clogs", "same-day timing"],
    relatedServiceSlug: "emergency-drain-cleaning"
  },
  {
    slug: "sewer-backup-cost-dallas",
    title: "Sewer backup cost factors in Dallas",
    directAnswer: "Sewer backup costs vary because clearing the line, inspecting the cause, and cleaning contaminated areas can be separate steps.",
    factors: ["backup size", "main line access", "root intrusion", "cleanup needs", "inspection needs"],
    relatedServiceSlug: "sewer-backup-help"
  },
  {
    slug: "burst-pipe-repair-cost-dallas",
    title: "Burst pipe repair cost factors in Dallas",
    directAnswer: "Burst pipe repair cost depends on where the pipe is located, how much access is needed, and whether walls, ceilings, or slabs are involved.",
    factors: ["pipe location", "material", "access", "water shutoff", "surface repair coordination"],
    relatedServiceSlug: "burst-pipe-emergency"
  },
  {
    slug: "water-heater-emergency-cost-dallas",
    title: "Water heater emergency cost factors in Dallas",
    directAnswer: "Water heater emergency cost depends on the age of the unit, whether the leak is repairable, and whether replacement is needed.",
    factors: ["tank age", "leak source", "part availability", "replacement size", "code requirements"],
    relatedServiceSlug: "water-heater-emergency"
  }
];
