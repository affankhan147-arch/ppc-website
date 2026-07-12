import { blogPosts } from "@/data/blogPosts";
import { cities, priorityCityServiceCombos } from "@/data/cities";
import { costGuides } from "@/data/costGuides";
import { problems } from "@/data/problems";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";

export type PageKind =
  | "home"
  | "service"
  | "city"
  | "city-service"
  | "problem"
  | "cost-guide"
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
  const legalPages: InventoryPage[] = [
    { kind: "home", title: `${siteConfig.brandName} | Emergency Plumbing Connections`, path: "/", h1: "Emergency plumbing help across Dallas-Fort Worth", description: "Connect with local emergency plumbing and drain cleaning providers across Dallas-Fort Worth." },
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

  return [...legalPages, ...servicePages, ...cityPages, ...cityServicePages, ...problemPages, ...costPages, ...blogPages];
}
