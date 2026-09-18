// Site-wide fallback internal-link pool used by <InternalLinks extra={...} /> (src/components/PageSections.tsx).
// Order matters: the component renders `[...extra, ...internalLinkGroups]`, dedups by href, and caps at 8.
// Pages with 0-2 "extra" links (most blog posts, problem pages, and city/service combo pages) therefore
// surface whichever of THESE entries come first once their own extras are filled -- so the entries most in
// need of site-wide link equity belong at the top of this list.
//
// 2026-09-18 reorder: promoted the site's highest-impression-but-weak-ranked pages (real GSC data, Pages.csv,
// 2026-08-14 export) to the front so nearly every page on the site now links toward them, not just the
// handful of pages hand-edited in earlier rounds (Task106, Task109). Impression figures are from that export:
//   /cities/plano                                502 impr, pos 24.47  <- highest-impression page on the site
//   /cities/dallas                               400 impr, pos 42.88
//   /cities/mckinney                             381 impr, pos 21.57
//   /cities/carrollton                           368 impr, pos 19.97
//   /cities/fort-worth                           367 impr, pos 31.19
//   /services/burst-pipe-emergency               339 impr, pos 63.65  <- weakest-ranked page with real visibility
//   /cities/frisco                               244 impr, pos 39.27
//   /cities/garland                              221 impr, pos 34.9
//   /cities/arlington                            221 impr, pos 35.37
//   /cities/fort-worth/24-hour-emergency-plumber 219 impr, pos 20.56  <- closest of these to page 1
export const internalLinkGroups = [
  { label: "Emergency plumber in Plano", href: "/cities/plano" },
  { label: "Emergency plumber in Dallas", href: "/cities/dallas" },
  { label: "Emergency plumber in McKinney", href: "/cities/mckinney" },
  { label: "Emergency plumber in Carrollton", href: "/cities/carrollton" },
  { label: "Emergency plumber in Fort Worth", href: "/cities/fort-worth" },
  { label: "Burst pipe emergency", href: "/services/burst-pipe-emergency" },
  { label: "24-hour emergency plumber", href: "/services/24-hour-emergency-plumber" },
  { label: "Emergency drain cleaning", href: "/services/emergency-drain-cleaning" },
  { label: "Emergency plumber in Frisco", href: "/cities/frisco" },
  { label: "Emergency plumber in Garland", href: "/cities/garland" },
  { label: "Emergency plumber in Arlington", href: "/cities/arlington" },
  { label: "24-hour emergency plumber in Fort Worth", href: "/cities/fort-worth/24-hour-emergency-plumber" },
  { label: "Main sewer line clog", href: "/services/main-sewer-line-clog" },
  { label: "Emergency plumbing cost guide", href: "/cost-guides/emergency-plumbing-cost-dfw" },
  { label: "Drain cleaning cost guide", href: "/cost-guides/drain-cleaning-cost-dfw" },
  { label: "Water shutoff valve will not close", href: "/problems/water-shutoff-valve-will-not-close" },
  { label: "Questions before booking emergency plumbing work", href: "/blog/best-questions-to-ask-before-you-book-an-emergency-plumber" },
  { label: "Sewer line signs", href: "/problems/main-sewer-line-signs" },
  { label: "Water backing up in shower and toilet", href: "/problems/water-backing-up-in-shower-and-toilet" },
  { label: "Failed shutoff leak checklist", href: "/blog/water-shutoff-valve-will-not-close-during-a-leak" },
  { label: "FAQ hub", href: "/faq" },
  { label: "Request provider connection", href: "/contact" }
];
