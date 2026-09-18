// Site-wide fallback internal-link pool used by <InternalLinks extra={...} /> (src/components/PageSections.tsx).
// Order matters: the component renders `[...extra, ...internalLinkGroups]`, dedups by href, and caps at 8.
// Pages with 0-2 "extra" links (most blog posts, problem pages, and city/service combo pages) therefore
// surface whichever of THESE entries come first once their own extras are filled -- so the entries most in
// need of site-wide link equity belong at the top of this list.
//
// 2026-09-18 refresh: re-pulled with a fresh, fuller live GSC export (Pages.csv/Queries.csv, 3-month
// window, uploaded by Sunny) that supersedes the 2026-08-14 export used for the previous reorder earlier
// today -- impression volume is roughly 10x higher across the board (bigger sample window), and the
// relative ranking of pages shifted meaningfully. Figures below are impressions / average position from
// that fresh export:
//   /cities/plano                                4931 impr, pos 22.88  <- highest-impression page on the site
//   /cities/dallas                               4928 impr, pos 27.99
//   /cities/richardson                           1353 impr, pos 11.99  <- closest of any high-impression page to page 1
//   /cities/fort-worth                           3824 impr, pos 21.37  (already earning 4 real clicks)
//   /cities/mckinney                             3307 impr, pos 18.9
//   /services/burst-pipe-emergency               3591 impr, pos 60.77  <- huge visibility, weakest position of the group
//   /cities/carrollton                           2290 impr, pos 21.42
//   /cities/garland                              2757 impr, pos 26.96
//   /cities/frisco                               2469 impr, pos 32.5
//   /cities/fort-worth/24-hour-emergency-plumber 2384 impr, pos 21.09  (already earning 1 real click)
//   /cities/arlington                            2085 impr, pos 25.01  (already earning 1 real click)
//   /cost-guides/drain-cleaning-cost-dfw          264 impr, pos 16.1   <- small volume but a very strong position
//   /cities/dallas/24-hour-emergency-plumber     1890 impr, pos 38.34
//   /cities/plano/24-hour-emergency-plumber      1639 impr, pos 45.72
//   /cities/mckinney/24-hour-emergency-plumber   1576 impr, pos 37.04
//   /cities/irving                                917 impr, pos 26.47
export const internalLinkGroups = [
  { label: "Emergency plumber in Plano", href: "/cities/plano" },
  { label: "Emergency plumber in Dallas", href: "/cities/dallas" },
  { label: "Emergency plumber in Richardson", href: "/cities/richardson" },
  { label: "Emergency plumber in Fort Worth", href: "/cities/fort-worth" },
  { label: "Emergency plumber in McKinney", href: "/cities/mckinney" },
  { label: "Burst pipe emergency", href: "/services/burst-pipe-emergency" },
  { label: "Emergency plumber in Carrollton", href: "/cities/carrollton" },
  { label: "Emergency plumber in Garland", href: "/cities/garland" },
  { label: "Emergency plumber in Frisco", href: "/cities/frisco" },
  { label: "24-hour emergency plumber in Fort Worth", href: "/cities/fort-worth/24-hour-emergency-plumber" },
  { label: "Emergency plumber in Arlington", href: "/cities/arlington" },
  { label: "Drain cleaning cost guide", href: "/cost-guides/drain-cleaning-cost-dfw" },
  { label: "24-hour emergency plumber in Dallas", href: "/cities/dallas/24-hour-emergency-plumber" },
  { label: "24-hour emergency plumber in Plano", href: "/cities/plano/24-hour-emergency-plumber" },
  { label: "24-hour emergency plumber in McKinney", href: "/cities/mckinney/24-hour-emergency-plumber" },
  { label: "Emergency plumber in Irving", href: "/cities/irving" },
  { label: "24-hour emergency plumber", href: "/services/24-hour-emergency-plumber" },
  { label: "Emergency drain cleaning", href: "/services/emergency-drain-cleaning" },
  { label: "Main sewer line clog", href: "/services/main-sewer-line-clog" },
  { label: "Emergency plumbing cost guide", href: "/cost-guides/emergency-plumbing-cost-dfw" },
  { label: "Water shutoff valve will not close", href: "/problems/water-shutoff-valve-will-not-close" },
  { label: "Questions before booking emergency plumbing work", href: "/blog/best-questions-to-ask-before-you-book-an-emergency-plumber" },
  { label: "Sewer line signs", href: "/problems/main-sewer-line-signs" },
  { label: "Water backing up in shower and toilet", href: "/problems/water-backing-up-in-shower-and-toilet" },
  { label: "Failed shutoff leak checklist", href: "/blog/water-shutoff-valve-will-not-close-during-a-leak" },
  { label: "FAQ hub", href: "/faq" },
  { label: "Request provider connection", href: "/contact" }
];
