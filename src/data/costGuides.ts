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
    directAnswer: "Emergency plumber cost in Dallas-Fort Worth -- also searched as 24 hour plumber cost or emergency plumber near me cost -- depends on diagnosis, timing, access, parts, severity, and the provider's own pricing. Confirm any dispatch or diagnostic fee before work starts.",
    rangeGuidance: "General emergency plumbing visits may involve a service or diagnostic charge plus repair labor and parts. After-hours timing, active water damage, wall or ceiling access, and specialty parts can change the final cost.",
    factors: ["after-hours timing", "diagnostic work", "parts", "access difficulty", "water damage risk", "fixture or pipe location"],
    questionsToAsk: ["Is there a dispatch or diagnostic fee?", "What is included before repair approval?", "Can you explain options before work starts?", "Does pricing change after hours?"],
    relatedServiceSlug: "24-hour-emergency-plumber",
    relatedProblemSlugs: ["toilet-overflowing-will-not-stop", "ceiling-leak-from-plumbing", "burst-pipe-first-steps"]
  },
  {
    slug: "drain-cleaning-cost-dfw",
    title: "Drain cleaning cost in Dallas-Fort Worth",
    directAnswer: "How much does drain cleaning cost? It depends on whether the clog is in one fixture, a shared branch line, or the main sewer line, plus whether it's an emergency same-day call, along with the equipment and access needed.",
    rangeGuidance: "A simple fixture clog is usually different from a main line issue, and emergency drain cleaning cost or 24 hour drain cleaning cost can run higher than a scheduled visit. Costs can change if camera inspection, heavy equipment, repeat blockage diagnosis, or after-hours service is needed.",
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
    directAnswer: "Water heater emergency cost -- also asked as hot water heater repair cost or no hot water emergency cost -- depends on whether the issue is a repairable part, a connection leak, a tank failure, or a replacement need.",
    rangeGuidance: "Age, capacity, fuel type, access, code requirements, and whether the tank is actively leaking all affect cost. Confirm repair versus replacement options before approving work.",
    factors: ["tank age", "leak source", "part availability", "replacement size", "fuel type", "code requirements"],
    questionsToAsk: ["Is the tank itself leaking?", "Can the issue be repaired safely?", "What size and type is being priced?", "Are code upgrades or disposal separate?"],
    relatedServiceSlug: "water-heater-emergency",
    relatedProblemSlugs: ["water-heater-leaking-emergency", "no-hot-water-emergency"]
  },
  {
    slug: "burst-pipe-emergency-cost-guide",
    title: "Burst pipe emergency cost guide",
    directAnswer: "Burst pipe repair cost depends on pipe location, access, material, whether water is still active, and whether walls, ceilings, or slabs are involved -- this is the same question as \"how much does it cost to fix a burst pipe,\" just answered from the factors that actually move the price.",
    rangeGuidance: "Visible pipe repairs are different from leaks hidden behind drywall, under slab, or above ceilings. Water mitigation, drywall, and restoration may be separate from plumbing repair.",
    factors: ["pipe location", "material", "access", "water shutoff", "surface repair coordination", "after-hours timing"],
    questionsToAsk: ["Is water fully shut off?", "What access is needed?", "Is restoration included or separate?", "What caused the break if known?"],
    relatedServiceSlug: "burst-pipe-emergency",
    relatedProblemSlugs: ["burst-pipe-first-steps", "ceiling-leak-from-plumbing"]
  },
  {
    slug: "emergency-leak-repair-cost-dfw",
    title: "Emergency leak repair cost in Dallas-Fort Worth",
    directAnswer: "Water leak emergency cost -- the same question as emergency leak repair cost -- depends on whether water is still active, where the leak is located, what must be opened for access, and whether a shutoff valve also needs repair.",
    rangeGuidance: "A visible supply-line leak, a failed shutoff valve, a ceiling leak, and a hidden wall or slab leak can involve different diagnosis and access work. Restoration, drying, drywall, and flooring are usually separate from plumbing repair.",
    factors: ["active water status", "shutoff valve condition", "leak location", "wall or ceiling access", "pipe material", "after-hours timing"],
    questionsToAsk: ["Can the water be isolated safely?", "Is leak access included or separate?", "Is this a temporary stop or a permanent repair?", "What restoration work is outside the plumbing scope?"],
    relatedServiceSlug: "burst-pipe-emergency",
    relatedProblemSlugs: ["water-shutoff-valve-will-not-close", "ceiling-leak-from-plumbing", "burst-pipe-first-steps"]
  },
  {
    slug: "tankless-water-heater-installation-cost",
    title: "Tankless water heater installation cost",
    directAnswer: "Tankless water heater installation cost depends heavily on whether it's a direct swap for an existing tankless unit or a conversion from a tank system, since a conversion often requires gas line upsizing, new venting, and electrical work that a like-for-like swap does not.",
    rangeGuidance: "A straightforward tankless-to-tankless replacement is usually simpler than a tank-to-tankless conversion. Unit capacity (GPM), gas versus electric, venting changes, gas line sizing, and old tank removal or disposal all affect the final cost -- ask which of these apply to your home before comparing quotes.",
    factors: ["tank-to-tankless conversion vs. direct swap", "unit capacity (GPM) needed for household size", "gas line upsizing", "new venting requirements", "electrical requirements for electric units", "old tank removal and disposal", "permit and code compliance"],
    questionsToAsk: ["Is this a direct swap or a conversion from a tank?", "What GPM size is being quoted for my household?", "Does the gas line need to be upsized?", "Is a permit included, and who pulls it?", "Is removal and disposal of the old unit included?"],
    relatedServiceSlug: "water-heater-emergency",
    relatedProblemSlugs: ["no-hot-water-emergency", "water-heater-leaking-emergency"]
  }
];


