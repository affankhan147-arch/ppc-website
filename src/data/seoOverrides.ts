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
    title: "Water Heater Age Lookup by Serial Number: AO Smith, Rheem",
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
  // Keyword overhaul (2026-11-15), problem pages ranking 22-48 whose titles did not match how people search
  // (GSC 3 months to 2026-11-11). 677 impr / pos 48.3: "toilet and shower backing up", "my toilet and tub are backed up".
  "/problems/water-backing-up-in-shower-and-toilet": {
    title: "Toilet and Shower Backing Up Together? What It Means",
    description:
      "When the toilet and shower back up at the same time, the clog is usually in the main sewer line, not either fixture. Stop using water and do this first."
  },
  // 516 impr / pos 22.5: "sink backup", "kitchen sink backup".
  "/problems/kitchen-sink-backing-up": {
    title: "Kitchen Sink Backing Up? Causes and What to Do Now",
    description:
      "A kitchen sink backup is usually grease and food in the drain line. If it fills when the dishwasher runs or other drains back up too, the clog is deeper."
  },
  // 320 impr / pos 43.5: "floor drain backup", "floor drain backing up".
  "/problems/floor-drain-backing-up": {
    title: "Floor Drain Backing Up? Main Sewer Line Warning Signs",
    description:
      "Water coming up through a floor drain usually means the main sewer line is blocked, since it is the lowest drain in the house. Stop using water and call."
  },
  // 232 impr / pos 41.5: "bathtub back up", "tub backup".
  "/problems/bathtub-drain-backing-up": {
    title: "Bathtub Backing Up? Why Tub Drains Back Up and What to Do",
    description:
      "A tub that fills when you flush or run the washer points to a blocked shared drain or main line, not just hair in the tub. What to check and when to call."
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
  "/blog/water-leak-between-meter-and-house-dallas-who-fixes-it": {
    title: "Water Leak Between Meter and House in Dallas: Who Fixes It?",
    description: "In Dallas the pipe from the meter to your house is yours to fix. How to tell which side is leaking, when to call 311 and how DWU leak adjustments work."
  },
  "/blog/saws-water-leak-who-fixes-it-san-antonio": {
    title: "Water Leak in San Antonio: Who Fixes It and Will SAWS Help?",
    description: "SAWS can't repair plumbing on private property. Who fixes a leak at your San Antonio home, what to shut off first, and how SAWS leak reimbursement works."
  },
  "/blog/san-antonio-plumbing-permit-homeowner-or-plumber": {
    description: "Can you pull your own plumbing permit in San Antonio? Only for your homestead, doing the work yourself. Otherwise a licensed, registered plumber pulls it."
  },
  // New post 2026-11-16 (PH-064).
  "/blog/austin-water-leak-bill-adjustment-after-repair": {
    title: "Austin Water Leak Adjustment: How to Apply After a Repair",
    description:
      "Leak raised your Austin Water bill? Ask for a leak adjustment within 90 days of the repair. What to send, where to send it, and what if there was no leak."
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
  "/blog/tankless-water-heater-freeze-power-outage-dfw": {
    title: "Tankless Water Heater Freeze: What to Do in a DFW Outage",
    description:
      "Tankless freeze protection only works with power. What DFW homeowners should do before a freeze and how to drain the unit in a long outage."
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
  // New post 2026-11-11 (PH-032).
  "/blog/who-is-responsible-for-sewer-line-fort-worth": {
    title: "Fort Worth Sewer Line: Who Is Responsible, Owner or City?",
    description:
      "In Fort Worth the sewer pipe from your house to the city main is yours to maintain. How to tell whose problem a backup is, who to call and the permit rules."
  },
  // New post 2026-11-14 (PH-054).
  "/blog/carrollton-water-leak-adjustment-after-plumbing-repair": {
    title: "Carrollton Water Leak Adjustment: Rules and How to Apply",
    description:
      "Leak raised your Carrollton water bill? The city allows one adjustment per 12 months. What it covers, the 90-day deadline and the form and receipts to send."
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
  },
  // SEO-AUDIT 2026-11-06: title was 65 chars.
  "/tools/sewer-line-repair-cost-calculator": {
    title: "Sewer Line Repair Cost Calculator: Trenchless vs. Dig"
  },
  // SEO-AUDIT 2026-11-06: title was 62 chars.
  "/tools/water-service-line-cost-calculator": {
    title: "Water Service Line Cost Calculator (Plus Who Pays)"
  },
  // Keyword upgrade (2026-11-21, Semrush pasted keywords) -- 7 new titles (R1-R7).
  // Titles only; H1 and body unchanged. All titles <= 60 chars.
  "/services/burst-pipe-emergency": {
    title: "Burst Pipe Repair in DFW: 24/7 Emergency Plumber"
  },
  "/blog/toilet-leaking-at-base-wax-ring-failure-signs-dallas": {
    title: "Leaking Toilet in DFW: When to Call a Plumber"
  },
  "/services/24-hour-emergency-plumber": {
    title: "24 Hour Plumber in DFW: Nights & Weekends"
  },
  "/services/commercial-emergency-plumbing": {
    title: "Commercial Plumbing Companies in DFW: 24/7 Help"
  },
  "/blog/hydro-jetting-vs-drain-snaking-dfw": {
    title: "Hydro Jetting Plumber in DFW: Jetting vs. Snaking"
  },
  "/blog/drain-smell-in-bathroom-sewer-gas-or-simple-clog": {
    title: "Plumber for Sewer Smell in DFW: Gas or Simple Clog"
  },
  "/services/main-sewer-line-clog": {
    title: "Sewer Line Plumber in DFW: Clogs & Backups"
  },
  // Keyword upgrade Round 2 (2026-11-21, Semrush pasted keywords) -- 2 new titles (R1-R2).
  // Titles only; H1 and body unchanged. All titles <= 60 chars.
  "/blog/toilet-running-constantly-dallas-wont-stop-running": {
    title: "Plumber for Running Toilet in DFW: When to Call"
  },
  "/services/water-heater-emergency": {
    title: "Emergency Hot Water Heater Repair in DFW"
  },

  // Title-length fix (2026-11-22 audit) -- 4 new titles, all <= 60 chars.
  // Titles only; H1 and body unchanged. Old titles were 61-72 chars.
  // old title was 72 chars
  "/blog/dfw-plumbing-permit-requirements-and-fees-by-city": {
    title: "DFW Plumbing Permit Requirements & Fees by City (2026)"
  },
  // old title was 65 chars
  "/blog/dfw-lead-service-line-inventory-by-city": {
    title: "DFW Lead Service Line Inventory by City: Is Your Pipe Lead?"
  },
  // old title was 64 chars
  "/blog/water-heater-leaking-from-the-bottom-dallas-causes-and-fixes": {
    title: "Water Heater Leaking From Bottom in Dallas: Causes & Fixes"
  },
  // old title was 61 chars
  "/blog/dfw-water-hardness-by-city-what-it-does-to-your-water-heater": {
    title: "DFW Water Hardness by City: What It Does to Water Heaters"
  },

  // CTR optimization Batch A (2026-11-22, GSC 28 days to 2026-11-21) -- 2 new descriptions.
  // Descriptions only; titles unchanged. All descriptions <= 158 chars.
  "/tools/slab-leak-repair-cost-calculator": {
    description:
      "Free calculator: see 2026 cost ranges for trenchless pipe relining vs. rerouting a slab leak, plus what leak detection costs before repair."
  },
  "/tools/water-pressure-regulator-cost-calculator": {
    description:
      "Free calculator: pick your line size for a 2026 cost range to replace a failed water pressure regulator (PRV), plus the signs it failed open or closed."
  },

  // New 2026-11-27 — "sewer line repair" 90,500/mo, KD 12%. No dedicated page existed for the head term; new blog post.
  "/blog/sewer-line-repair-dallas-fort-worth": {
    title: "Sewer Line Repair in DFW: Signs, Methods & Costs",
    description:
      "Sewer line repair in Dallas-Fort Worth: the warning signs, what a camera inspection finds, trenchless vs. digging, and how to read a quote. Connect with a local licensed plumber: 1 844-397-8298."
  },

  // New 2026-11-27 — "plumber for toilet leak" 22,200/mo, KD 10%. No dedicated page existed for the head term; new blog post.
  "/blog/plumber-for-toilet-leak-dallas-fort-worth": {
    title: "Plumber for Toilet Leak in DFW: Find It, Fix It Fast",
    description:
      "Toilet leaking in Dallas-Fort Worth? Find where the water is coming from — wax ring, supply line, tank, or base — and when to call a plumber. 1 844-397-8298."
  },

  // New 2026-11-27 — "hydro jetting services" 6,600/mo, KD 14%. No dedicated page existed for the head term; new blog post.
  "/blog/hydro-jetting-services-dallas-fort-worth": {
    title: "Hydro Jetting Services in DFW: When You Need It & Costs",
    description:
      "Hydro jetting services in Dallas-Fort Worth: what jetting does, when it beats snaking, what it costs, and when it is not safe. Call 1 844-397-8298."
  },

  // New 2026-11-27 — "tankless water heater repair" 18,100/mo, KD 12%. No dedicated page existed for the head term; new blog post.
  "/blog/tankless-water-heater-repair-dallas-fort-worth": {
    title: "Tankless Water Heater Repair in DFW: What Breaks & Costs",
    description:
      "Tankless water heater repair in Dallas-Fort Worth: the common failures, what hard water does to a heat exchanger, error codes, and repair vs. replace. Call 1 844-397-8298."
  },
};
