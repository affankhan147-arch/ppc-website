import { siteConfig } from "@/data/site";

// Search-snippet overrides for pages that already rank on page 1 or near it but
// earn few clicks (Search Console, 3 months to 2026-10-19). buildMetadata() in
// src/lib/seo.ts applies these by path, so the page's H1 and body stay as they are.
// Rules: title <= 60 characters and still contains the page's long-tail keyword;
// description <= 158 characters, answers the query first, then gives a reason to click.
// Baseline (impressions / CTR / avg position) is noted per page for the later comparison.
export type SeoOverride = { title?: string; description?: string };

const phone = siteConfig.phoneDisplay;

export const seoOverrides: Record<string, SeoOverride> = {
  // 1,152 impr / 0.9% / pos 12.3 - searchers want the official TSBPE lookup.
  "/blog/how-to-verify-a-texas-plumbers-license": {
    title: "TSBPE License Search: Verify a Texas Plumber in 60 Seconds",
    description:
      "Direct link to the official TSBPE license lookup, plus how to read the result: license type, expiration date and the red flags to check before you hire."
  },
  // 531 impr / 0.6% / pos 7.4
  "/blog/drain-backup-in-a-restaurant-what-owners-should-do-first": {
    description:
      "A kitchen drain or grease trap backing up is a health-code emergency. What to do in the first 15 minutes, who to call, and the DFW grease trap rules."
  },
  // 466 impr / 1.1% / pos 9.6 - queries are brand + "serial number".
  "/tools/water-heater-age-lookup": {
    title: "Water Heater Age Lookup by Serial Number: AO Smith, Rheem, GE",
    description:
      "Free tool: pick your brand, type the first 4 digits of the serial number and see when your water heater was made. Covers Rheem, Ruud, AO Smith, State and GE."
  },
  // 370 impr / 0.3% / pos 7.7
  "/blog/toilet-shower-and-sink-backing-up-together-what-it-means": {
    description:
      "When the toilet, shower and sink back up at the same time, the clog is usually in the main sewer line, not one drain. What to check and what to stop doing."
  },
  // 262 impr / 0.4% / pos 7.8
  "/blog/shower-water-suddenly-scalding-or-freezing-what-it-means": {
    description:
      "Sudden bursts of hot or cold water usually mean a worn shower mixing valve, not a failing water heater. How to tell which, and when scalding is a safety risk."
  },
  // 170 impr / 0.6% / pos 6.3
  "/problems/outdoor-cleanout-overflowing": {
    title: "Outdoor Cleanout Overflowing? What to Do Right Now",
    description:
      "Sewage coming up from the cleanout pipe in your yard usually means a main sewer line blockage. Stop using water inside, keep people away, and call for help."
  },
  // 159 impr / 0.6% / pos 12.0
  "/blog/bathtub-backing-up-when-toilet-flushes-what-causes-it": {
    description:
      "If flushing the toilet pushes water up into the tub, the shared drain or the main sewer line is partly blocked. The usual causes and when it's an emergency."
  },
  // 101 impr / 0% / pos 8.9
  "/services/toilet-overflow-emergency": {
    title: "Toilet Overflow Emergency? 24/7 Plumber in Dallas-Fort Worth",
    description: `Turn the valve behind the toilet clockwise and stop flushing. Then call ${phone} for a 24/7 plumber in Dallas-Fort Worth, nights and weekends included.`
  },
  // 97 impr / 0% / pos 14.8
  "/problems/water-shutoff-valve-will-not-close": {
    title: "Water Shutoff Valve Will Not Close? What to Do in a Leak",
    description:
      "Don't force a stuck valve until it snaps. Use the main shutoff or the valve at the water meter, keep water away from outlets, and call for urgent help."
  },
  // 83 impr / 0% / pos 7.9
  "/blog/water-shutoff-valve-will-not-close-during-a-leak": {
    description:
      "Old shutoff valves seize after years without use. How to reach the main or meter shutoff instead, what not to do, and how a plumber replaces a stuck valve."
  },
  // 68 impr / 0% / pos 6.5
  "/guides/dfw-polybutylene-pipe-replacement": {
    title: "Polybutylene Pipe Replacement in DFW: Signs, Risks and Cost",
    description:
      "Gray plastic pipe stamped PB2110? How to spot polybutylene in a Dallas-Fort Worth home, why insurers flag it, and what replacing it usually involves."
  },
  // 45 impr / 0% / pos 9.5
  "/blog/dfw-water-conservation-rebate-programs-by-city": {
    title: "DFW Water Conservation Rebate Programs by City (2026)",
    description:
      "Several DFW water utilities offer rebates, vouchers or free toilets for replacing old high-flow models. See which cities do, who qualifies and how to apply."
  },
  // 45 impr / 0% / pos 12.9
  "/blog/dfw-backflow-preventer-testing-requirements-by-city": {
    description:
      "Fort Worth requires annual testing of every registered backflow assembly, irrigation systems included. See how the rules differ across DFW cities."
  },
  // 41 impr / 0% / pos 7.8
  "/cost-guides/water-heater-emergency-cost-guide": {
    title: "Water Heater Emergency Cost in DFW: Repair vs. Replace",
    description:
      "What drives the bill when a water heater fails: a repairable part, a leaking connection or a failed tank. Questions to ask before you approve the work."
  },
  // 37 impr / 0% / pos 7.1
  "/blog/how-to-check-your-water-meter-for-a-hidden-leak-dallas": {
    description:
      "Turn off every fixture, find the leak indicator on your water meter and watch it. If it moves with everything off, you have a hidden leak. Here's how to find it."
  },
  // 47 impr / 0% / pos 11.5
  "/tools/dfw-leak-cost-calculator": {
    description:
      "See what a dripping faucet, running toilet or hidden leak adds to your Dallas or Fort Worth water and sewer bill each month, using each city's current rates."
  },
  // 364 impr / 0% / pos 15.3
  "/cost-guides/drain-cleaning-cost-dfw": {
    title: "Drain Cleaning Cost in DFW: Main Line vs. Single Drain",
    description:
      "Why a main sewer line costs more to clear than one clogged sink, when a camera inspection is worth paying for, and what to ask before approving drain work."
  },
  // 88 impr / 1.1% / pos 14.4
  "/blog/sudden-low-water-pressure-in-dallas-home-what-it-means": {
    description:
      "A sudden drop across the whole house usually points to the pressure regulator, a main-line leak or a city-side problem. How to tell which one you have."
  },

  // ---- Round 2 (GSC 3 months to 2026-10-20) ----
  // 53 impr / 1.9% / pos 5.7 - old title was 74 characters, so Google cut the year and the hook.
  "/blog/dfw-water-sewer-rate-increases-by-city-2026": {
    title: "DFW Water & Sewer Rate Increases by City (2026)",
    description:
      "Arlington raised rates 6.3% for 2026. See each DFW city's increase, and why a bill far above that usually means a hidden leak, not the rate."
  },
  // 53 impr / 0% / pos 14.4 - old description opened with a long run-on sentence.
  "/blog/emergency-plumber-irving-tx-what-to-know": {
    description: `Active leak, sewer backup or burst pipe in Irving? What to shut off first, what to tell the plumber, and how to reach a 24/7 plumber: ${phone}.`
  },
  // 83 impr / 1.2% / pos 13.3
  "/blog/emergency-plumbing-in-arlington-tx-night-and-weekend-issues": {
    description: `Toilet overflow, drain backup or burst pipe in Arlington at night or on a weekend? What to do first and how to reach a 24/7 plumber: ${phone}.`
  },
  // 91 impr / 0% / pos 16 - old description ended in an ellipsis.
  "/blog/best-questions-to-ask-before-you-book-an-emergency-plumber": {
    title: "Questions to Ask Before You Book an Emergency Plumber",
    description:
      "Ask these before you book: the dispatch fee, how diagnosis is priced, when they'll arrive, whether you approve work first, and what cleanup is included."
  },
  // 42 impr / 2.4% / pos 4.3
  "/guides/dfw-housing-age-by-city": {
    description:
      "U.S. Census data on when homes were built in 7 DFW cities, and what that age means for galvanized steel and polybutylene pipes still hiding in your walls."
  },
  // 42 impr / 2.4% / pos 8.4
  "/blog/no-usable-toilet-in-the-house-what-dfw-homeowners-should-do": {
    title: "No Usable Toilet in the House? What to Do Right Now",
    description:
      "Every toilet backing up at once usually means a main sewer line problem, not a clog. Stop flushing, check the outdoor cleanout, and get a plumber out tonight."
  }
};
