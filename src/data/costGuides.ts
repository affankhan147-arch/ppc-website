export type CostGuide = {
  slug: string;
  title: string;
  directAnswer: string;
  rangeGuidance: string;
  factors: string[];
  questionsToAsk: string[];
  relatedServiceSlug: string;
  relatedProblemSlugs: string[];
};

export const costGuides: CostGuide[] = [
  {
    slug: "emergency-plumbing-cost-dfw",
    title: "Emergency plumber cost in Dallas-Fort Worth",
    directAnswer: "Emergency plumber cost in Dallas-Fort Worth depends on diagnosis, timing, access, parts, severity, and the provider's own pricing. Confirm any dispatch or diagnostic fee before work starts.",
    rangeGuidance: "General emergency plumbing visits may involve a service or diagnostic charge plus repair labor and parts. After-hours timing, active water damage, wall or ceiling access, and specialty parts can change the final cost.",
    factors: ["after-hours timing", "diagnostic work", "parts", "access difficulty", "water damage risk", "fixture or pipe location"],
    questionsToAsk: ["Is there a dispatch or diagnostic fee?", "What is included before repair approval?", "Can you explain options before work starts?", "Does pricing change after hours?"],
    relatedServiceSlug: "24-hour-emergency-plumber",
    relatedProblemSlugs: ["toilet-overflowing-will-not-stop", "ceiling-leak-from-plumbing", "burst-pipe-first-steps"]
  },
  {
    slug: "drain-cleaning-cost-dfw",
    title: "Drain cleaning cost in Dallas-Fort Worth",
    directAnswer: "Drain cleaning cost depends on whether the clog is in one fixture, a shared branch line, or the main sewer line, plus the equipment and access needed.",
    rangeGuidance: "A simple fixture clog is usually different from a main line issue. Costs can change if camera inspection, heavy equipment, repeat blockage diagnosis, or after-hours service is needed.",
    factors: ["fixture versus main line", "cable or hydro equipment", "camera inspection", "repeat clogs", "same-day timing", "cleanout access"],
    questionsToAsk: ["Is the quote for one fixture or the main line?", "What equipment is included?", "Is camera inspection separate?", "What happens if the clog returns quickly?"],
    relatedServiceSlug: "emergency-drain-cleaning",
    relatedProblemSlugs: ["kitchen-sink-backing-up", "bathtub-drain-backing-up", "washing-machine-drain-backing-up"]
  },
  {
    slug: "sewer-line-clog-cost-guide",
    title: "Sewer line clog cost guide",
    directAnswer: "Sewer line clog cost varies because clearing the blockage, inspecting the cause, and handling contaminated backup can be separate steps.",
    rangeGuidance: "Main line work can cost more than a basic fixture clog because access, line length, roots, cleanout condition, and inspection needs matter. Cleanup is often separate from plumbing work.",
    factors: ["backup size", "main line access", "root intrusion", "cleanup needs", "inspection needs", "line depth or condition"],
    questionsToAsk: ["Is this main line clearing or fixture drain cleaning?", "Is camera inspection included?", "What if roots or a broken line are found?", "Is cleanup part of the plumbing visit?"],
    relatedServiceSlug: "main-sewer-line-clog",
    relatedProblemSlugs: ["main-sewer-line-signs", "outdoor-cleanout-overflowing", "water-backing-up-in-shower-and-toilet"]
  },
  {
    slug: "water-heater-emergency-cost-guide",
    title: "Water heater emergency cost guide",
    directAnswer: "Water heater emergency cost depends on whether the issue is a repairable part, a connection leak, a tank failure, or a replacement need.",
    rangeGuidance: "Age, capacity, fuel type, access, code requirements, and whether the tank is actively leaking all affect cost. Confirm repair versus replacement options before approving work.",
    factors: ["tank age", "leak source", "part availability", "replacement size", "fuel type", "code requirements"],
    questionsToAsk: ["Is the tank itself leaking?", "Can the issue be repaired safely?", "What size and type is being priced?", "Are code upgrades or disposal separate?"],
    relatedServiceSlug: "water-heater-emergency",
    relatedProblemSlugs: ["water-heater-leaking-emergency", "no-hot-water-emergency"]
  },
  {
    slug: "burst-pipe-emergency-cost-guide",
    title: "Burst pipe emergency cost guide",
    directAnswer: "Burst pipe emergency cost depends on pipe location, access, material, whether water is still active, and whether walls, ceilings, or slabs are involved.",
    rangeGuidance: "Visible pipe repairs are different from leaks hidden behind drywall, under slab, or above ceilings. Water mitigation, drywall, and restoration may be separate from plumbing repair.",
    factors: ["pipe location", "material", "access", "water shutoff", "surface repair coordination", "after-hours timing"],
    questionsToAsk: ["Is water fully shut off?", "What access is needed?", "Is restoration included or separate?", "What caused the break if known?"],
    relatedServiceSlug: "burst-pipe-emergency",
    relatedProblemSlugs: ["burst-pipe-first-steps", "ceiling-leak-from-plumbing"]
  },
  {
    slug: "emergency-leak-repair-cost-dfw",
    title: "Emergency leak repair cost in Dallas-Fort Worth",
    directAnswer: "Emergency leak repair cost depends on whether water is still active, where the leak is located, what must be opened for access, and whether a shutoff valve also needs repair.",
    rangeGuidance: "A visible supply-line leak, a failed shutoff valve, a ceiling leak, and a hidden wall or slab leak can involve different diagnosis and access work. Restoration, drying, drywall, and flooring are usually separate from plumbing repair.",
    factors: ["active water status", "shutoff valve condition", "leak location", "wall or ceiling access", "pipe material", "after-hours timing"],
    questionsToAsk: ["Can the water be isolated safely?", "Is leak access included or separate?", "Is this a temporary stop or a permanent repair?", "What restoration work is outside the plumbing scope?"],
    relatedServiceSlug: "burst-pipe-emergency",
    relatedProblemSlugs: ["water-shutoff-valve-will-not-close", "ceiling-leak-from-plumbing", "burst-pipe-first-steps"]
  }
];
