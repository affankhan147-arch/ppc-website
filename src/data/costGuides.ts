export type CostGuide = {
  slug: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  directAnswer: string;
  rangeGuidance: string;
  factors: string[];
  questionsToAsk: string[];
  relatedServiceSlug: string;
  relatedProblemSlugs: string[];
};

// Task208 (2026-10-08): "emergency-plumbing-cost-dfw" was removed here and 301'd to
// /guides/dfw-emergency-plumbing-costs (next.config.mjs). GSC showed both pages splitting
// "emergency plumber cost / rates / call-out fee" queries; the guide has the real price table.
export const costGuides: CostGuide[] = [
  {
    slug: "drain-cleaning-cost-dfw",
    title: "Drain cleaning cost in Dallas-Fort Worth",
    seoTitle: "Drain & Sewer Line Cleaning Cost in DFW",
    seoDescription: "What drain and sewer line cleaning costs in Dallas-Fort Worth depends on: one fixture vs. the main line, cable vs. hydro equipment, camera inspection, and timing.",
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
    directAnswer: "Emergency water heater repair cost depends on whether the problem is a repairable part, a leaking connection, a failed tank, or a full replacement. A no-hot-water call that turns out to be a thermostat or igniter is a very different bill from a tank that is leaking from the bottom.",
    rangeGuidance: "Age, capacity, fuel type, access, code requirements, and whether the tank is actively leaking all affect cost. Confirm repair versus replacement options before approving work.",
    factors: ["tank age", "leak source", "part availability", "replacement size", "fuel type", "code requirements"],
    questionsToAsk: ["Is the tank itself leaking?", "Can the issue be repaired safely?", "What size and type is being priced?", "Are code upgrades or disposal separate?"],
    relatedServiceSlug: "water-heater-emergency",
    relatedProblemSlugs: ["water-heater-leaking-emergency", "no-hot-water-emergency"]
  },
  {
    slug: "burst-pipe-emergency-cost-guide",
    title: "Burst pipe repair cost guide",
    seoTitle: "Burst Pipe Repair Cost: What It Costs to Fix a Burst Pipe",
    seoDescription: "What it costs to fix a burst pipe in Dallas-Fort Worth: where it broke, pipe material, wall or slab access, and after-hours timing set the price.",
    directAnswer: "Burst pipe repair cost depends mostly on where the pipe broke and how hard it is to reach. A split line under a sink or in an open garage wall is a small job; a break behind finished drywall, above a ceiling, or under a slab costs far more to fix because the plumber has to open and then close up the surface. Pipe material, whether water is still running, and after-hours timing also move the price.",
    rangeGuidance: "Visible pipe repairs are different from leaks hidden behind drywall, under slab, or above ceilings. Water mitigation, drywall, and restoration may be separate from plumbing repair.",
    factors: ["pipe location", "material", "access", "water shutoff", "surface repair coordination", "after-hours timing"],
    questionsToAsk: ["Is water fully shut off?", "What access is needed?", "Is restoration included or separate?", "What caused the break if known?"],
    relatedServiceSlug: "burst-pipe-emergency",
    relatedProblemSlugs: ["burst-pipe-first-steps", "ceiling-leak-from-plumbing"]
  },
  {
    slug: "emergency-leak-repair-cost-dfw",
    title: "Emergency leak repair cost in Dallas-Fort Worth",
    directAnswer: "Emergency leak repair cost depends on whether water is still running, where the leak is, what has to be opened to reach it, and whether a failed shutoff valve also needs replacing.",
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


