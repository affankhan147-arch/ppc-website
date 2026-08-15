import { blogPosts } from "@/data/blogPosts";
import { cities, priorityCityServiceCombos } from "@/data/cities";
import { costGuides } from "@/data/costGuides";
import { problems } from "@/data/problems";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";

export type PageKind =
  | "home"
  | "service"
  | "service-index"
  | "city-index"
  | "city"
  | "city-service"
  | "problem"
  | "cost-guide"
  | "guide"
  | "blog"
  | "legal"
  | "faq";

export type InventoryPage = {
  kind: PageKind;
  title: string;
  path: string;
  h1: string;
  description: string;
};

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getCity(slug: string) {
  return cities.find((city) => city.slug === slug);
}

export function getProblem(slug: string) {
  return problems.find((problem) => problem.slug === slug);
}

export function getCostGuide(slug: string) {
  return costGuides.find((guide) => guide.slug === slug);
}

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function cityServicePath(citySlug: string, serviceSlug: string) {
  return `/cities/${citySlug}/${serviceSlug}`;
}

export function getAllInventoryPages(): InventoryPage[] {
  const guidePages: InventoryPage[] = [
    { kind: "guide", title: "Texas Homeowners Insurance & Plumbing Claims Guide", path: "/guides/texas-insurance-plumbing-claims", h1: "Texas Homeowners Insurance guide", description: "A research-backed guide explaining what Texas homeowners insurance covers (and doesn't cover) when a plumbing leak occurs, with real TDI sources." },
    { kind: "guide", title: "Burst Pipes in DFW - Why They Happen, What They Cost, What To Do First", path: "/guides/dfw-burst-pipes", h1: "Burst Pipes in DFW", description: "A research-backed guide explaining why burst pipes are so common in Dallas-Fort Worth, what Winter Storm Uri showed about the real risk, insurance coverage, and the first steps that limit damage." },
    { kind: "guide", title: "Slab Leaks in DFW - What Homeowners Need to Know", path: "/guides/dfw-slab-leaks", h1: "Slab Leaks in DFW", description: "A research-backed guide explaining why slab leaks are uniquely common in Dallas-Fort Worth, how they're diagnosed, and what homeowners can do." },
    { kind: "guide", title: "Polybutylene Pipe in DFW - Identification, Insurance, Replacement", path: "/guides/dfw-polybutylene-pipe-replacement", h1: "Polybutylene Pipe in DFW", description: "A research-backed guide to polybutylene (PB) pipe: how to identify it, why DFW homes are at added risk, insurance implications, and real replacement costs." },
    { kind: "guide", title: "Sewer Line Maintenance & Root Intrusion in DFW", path: "/guides/dfw-sewer-root-intrusion", h1: "Sewer Line Maintenance & Root Intrusion in DFW", description: "A research-backed guide explaining why DFW sewer lines are uniquely prone to root intrusion, how it's diagnosed, and what homeowners can do." },
    { kind: "guide", title: "Gas Line Safety & Capacity in DFW - What Homeowners Need to Know", path: "/guides/dfw-gas-line-safety", h1: "Gas Line Safety & Capacity in DFW", description: "A research-backed guide explaining gas line capacity, safety steps, and what homeowners should know before adding outdoor kitchens or pool heaters in DFW." },
    { kind: "guide", title: "DFW Emergency Plumbing Cost Guide - What Homeowners Can Expect to Pay", path: "/guides/dfw-emergency-plumbing-costs", h1: "DFW Emergency Plumbing Cost Guide", description: "A research-backed guide explaining how emergency plumbing pricing works in Dallas-Fort Worth, with realistic cost ranges for common services." },
    { kind: "guide", title: "Water Heater Lifespan & Maintenance in DFW - How Long They Really Last", path: "/guides/dfw-water-heater-lifespan", h1: "Water Heater Lifespan in DFW", description: "A research-backed guide to how long tank and tankless water heaters last, why DFW's hard water shortens that lifespan, and the maintenance that actually extends it." }
  ];

  const legalPages: InventoryPage[] = [
    { kind: "service-index", title: "24/7 Emergency Plumbing Services in Dallas-Fort Worth", path: "/services", h1: "24/7 Emergency Plumbing Services in Dallas-Fort Worth", description: "Browse every 24/7 emergency plumbing, drain cleaning, and sewer line service available across Dallas-Fort Worth." },
    { kind: "legal", title: "Partner with PlumbingHands", path: "/partners", h1: "Partner with PlumbingHands", description: "Become a referral partner with PlumbingHands. We connect DFW homeowners with trusted emergency plumbers. Partners gain visibility and mutual referrals." },
    { kind: "home", title: `${siteConfig.brandName} | Emergency Plumbing Connections`, path: "/", h1: "Emergency plumbing help across Dallas-Fort Worth", description: "Connect with local emergency plumbing and drain cleaning providers across Dallas-Fort Worth." },
    { kind: "city-index", title: "Texas Plumbing Service Areas", path: "/cities", h1: "Emergency plumbing help by Texas location", description: "Browse Dallas-Fort Worth, Houston, Austin, and San Antonio service-area pages for emergency plumbing, drain, sewer, leak, toilet, and water-heater help." },
    { kind: "blog", title: "Emergency Plumbing Guides", path: "/blog", h1: "Emergency plumbing guides", description: "Helpful emergency plumbing, drain, sewer, cost, and decision guides for Dallas-Fort Worth homeowners." },
    { kind: "faq", title: "Emergency Plumbing FAQ", path: "/faq", h1: "Emergency plumbing and drain cleaning FAQ", description: "Clear answers for urgent plumbing, drain, and sewer questions." },
    { kind: "legal", title: "Contact", path: "/contact", h1: "Request a plumbing provider connection", description: "Share your city, service need, and urgency to request a local provider connection." },
    { kind: "legal", title: "Partner With Us", path: "/partner-with-us", h1: "Provider partner inquiries", description: "Partner inquiry page for real plumbing providers and service partners." },
    { kind: "legal", title: "Privacy Policy", path: "/privacy", h1: "Privacy policy", description: "How this website handles submitted service request information." },
    { kind: "legal", title: "Terms", path: "/terms", h1: "Terms of use", description: "Terms for using this provider connection website." },
    { kind: "legal", title: "Disclosure", path: "/disclosure", h1: "Provider connection disclosure", description: "Honest disclosure for this service request website." }
  ];

  const servicePages = services.map((service) => ({
    kind: "service" as const,
    title: `${service.name} in ${siteConfig.marketName}`,
    path: `/services/${service.slug}`,
    h1: `${service.name} in ${siteConfig.marketName}`,
    description: service.shortAnswer
  }));

  const cityPages = cities.map((city) => ({
    kind: "city" as const,
    title: `Emergency plumbing help in ${city.name}, TX`,
    path: `/cities/${city.slug}`,
    h1: `Emergency plumbing help in ${city.name}`,
    description: `Connect with local emergency plumbing and drain cleaning providers serving ${city.name} and nearby ${siteConfig.marketName} areas.`
  }));

  const cityServicePages = priorityCityServiceCombos.flatMap((combo) => {
    const city = cities.find((item) => item.slug === combo.citySlug);
    const service = services.find((item) => item.slug === combo.serviceSlug);
    if (!city || !service) return [];
    return [{
      kind: "city-service" as const,
      title: `${service.name} in ${city.name}, TX`,
      path: cityServicePath(city.slug, service.slug),
      h1: `${service.name} in ${city.name}, TX`,
      description: `${service.shortAnswer} This ${city.name} page uses transparent service-area wording and provider availability guidance.`
    }];
  });

  const problemPages = problems.map((problem) => ({
    kind: "problem" as const,
    title: `${problem.title} | Dallas-Fort Worth plumbing help`,
    path: `/problems/${problem.slug}`,
    h1: problem.title,
    description: problem.directAnswer
  }));

  const costPages = costGuides.map((guide) => ({
    kind: "cost-guide" as const,
    title: guide.title,
    path: `/cost-guides/${guide.slug}`,
    h1: guide.title,
    description: guide.directAnswer
  }));

  const blogPages = blogPosts.map((post) => ({
    kind: "blog" as const,
    title: post.title,
    path: `/blog/${post.slug}`,
    h1: post.title,
    description: post.directAnswer
  }));

  return [...legalPages, ...guidePages, ...servicePages, ...cityPages, ...cityServicePages, ...problemPages, ...costPages, ...blogPages];
}
