export type BlogPost = {
  slug: string;
  title: string;
  directAnswer: string;
  category: string;
  relatedServiceSlug: string;
};

const titles = [
  "Emergency Plumber Near Me Open Now: What to Do Before Help Arrives",
  "Toilet Overflowing at Night in Dallas: Fast Steps for Homeowners",
  "Main Sewer Line Clogged in Dallas: Warning Signs and Fast Options",
  "Emergency Drain Cleaning Cost in Dallas: What Affects the Price",
  "Roto-Rooter vs Local Emergency Plumber in Dallas: Which Should You Call",
  "Sewer Backup in Fort Worth: What It Means and Who to Call",
  "Bathtub Backing Up When Toilet Flushes: What Causes It",
  "Kitchen Sink Backing Up in Dallas: Signs You Need Drain Help",
  "Same-Day Drain Cleaning in Dallas: What to Expect",
  "24-Hour Plumber in Plano: When the Problem Cannot Wait",
  "Emergency Plumbing in Arlington TX: Common Night and Weekend Problems",
  "Water Heater Leaking in Dallas: Emergency Signs to Watch",
  "Burst Pipe in Dallas: What to Shut Off First",
  "Drain Smell in Bathroom: Sewer Gas or Simple Clog",
  "How to Know if a Clogged Drain Is Actually a Sewer Line Problem",
  "Emergency Plumber vs Regular Plumber: What Is the Difference",
  "How Long Should Emergency Drain Cleaning Take",
  "Commercial Drain Backup: What Business Owners Should Do First",
  "Dallas Hard Water and Drain Problems: What Homeowners Should Know",
  "Dallas Storms and Sewer Backups: What to Check After Heavy Rain",
  "Emergency Plumbing Cost Guide for Dallas Homeowners",
  "Drain Cleaning Cost Guide for Dallas Homeowners",
  "Best Questions to Ask Before You Book an Emergency Plumber",
  "What Counts as a Plumbing Emergency",
  "Signs Your Main Drain Needs Same-Day Service",
  "Toilet, Shower, and Sink Backing Up Together: What It Means",
  "Emergency Drain Cleaning in Fort Worth: Fast Homeowner Guide",
  "Emergency Plumber in Plano: When to Call Now",
  "Emergency Drain Cleaning in Frisco: What to Expect",
  "Emergency Sewer Help in Garland: Signs and Next Steps",
  "Water Shutoff Valve Will Not Close During a Leak",
  "Emergency Leak Approval Checklist for Homeowners"
];

const serviceCycle = [
  "24-hour-emergency-plumber",
  "toilet-overflow-emergency",
  "main-sewer-line-clog",
  "emergency-drain-cleaning",
  "same-day-plumber-connection",
  "sewer-backup-help",
  "sink-and-shower-drain-backup",
  "water-heater-emergency",
  "burst-pipe-emergency",
  "commercial-emergency-plumbing"
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const relatedServiceOverrides: Record<string, string> = {
  "Water Shutoff Valve Will Not Close During a Leak": "burst-pipe-emergency",
  "Emergency Leak Approval Checklist for Homeowners": "burst-pipe-emergency"
};

const directAnswerOverrides: Record<string, string> = {
  "Main Sewer Line Clogged in Dallas: Warning Signs and Fast Options":
    "A likely main sewer clog shows up as multiple slow drains, toilet-and-tub backup, outdoor cleanout overflow, or sewer odor. Stop water use and request sewer guidance before more wastewater appears.",
  "Emergency Plumbing Cost Guide for Dallas Homeowners":
    "Emergency plumbing cost depends on diagnosis, timing, access, parts, and whether water damage is active. Ask about dispatch, diagnostic, repair approval, and cleanup scope before work begins.",
  "Drain Cleaning Cost Guide for Dallas Homeowners":
    "Drain cleaning cost depends on whether the blockage is in one fixture, a shared branch, or the main sewer line. Ask what equipment, access, inspection, and return-policy assumptions are included.",
  "Emergency Leak Approval Checklist for Homeowners":
    "Before approving emergency leak work, confirm whether water is isolated, what access is needed, what repair scope is included, and what cleanup or restoration work is separate."
};

export const blogPosts: BlogPost[] = titles.map((title, index) => ({
  slug: slugify(title),
  title,
  directAnswer:
    directAnswerOverrides[title] ||
    "Fast action starts with stopping water use where safe, identifying the affected fixture, and calling a local provider connection when the issue risks damage, contamination, or loss of essential plumbing.",
  category: index % 3 === 0 ? "Cost and decision guides" : index % 3 === 1 ? "Emergency steps" : "Drain and sewer guidance",
  relatedServiceSlug: relatedServiceOverrides[title] || serviceCycle[index % serviceCycle.length]
}));
