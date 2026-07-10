import Link from "next/link";
import { ArrowRight, BarChart3, Clock, MapPin, Route, ShieldCheck } from "lucide-react";
import { CallButton } from "@/components/CallButton";
import { LeadForm } from "@/components/LeadForm";
import { DirectAnswer, FAQBlock, InternalLinks, LocalGuidance } from "@/components/PageSections";
import { cities } from "@/data/cities";
import { emergencyFaqs, universalFaqs } from "@/data/faqs";
import { featuredServices, services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Emergency plumbing help across Dallas-Fort Worth",
  description:
    "Connect with local emergency plumbing and drain cleaning providers across Dallas-Fort Worth. Built for urgent calls, SEO, AEO, and safe lead routing.",
  path: "/"
});

const proofPoints = [
  { icon: Clock, label: "Urgent-call structure", text: "Service pages answer what to do now before the longer explanation." },
  { icon: MapPin, label: "DFW local coverage", text: "Dallas-Fort Worth city pages avoid fake office or address claims." },
  { icon: Route, label: "Routing-ready", text: "Buyer matching is designed by market, service, cap, payout, and fallback." },
  { icon: BarChart3, label: "Tracking-ready", text: "Call clicks, forms, city, service, CTA location, and UTMs are modeled." }
];

export default function HomePage() {
  const faqs = [...emergencyFaqs, ...universalFaqs].slice(0, 8);

  return (
    <main>
      <JsonLd
        data={[
          webPageSchema("/", "Emergency plumbing help across Dallas-Fort Worth", "Provider connection page for urgent plumbing and drain cleaning needs."),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          faqSchema(faqs)
        ]}
      />
      <section className="hero-field text-white">
        <div className="mx-auto grid min-h-[78vh] max-w-7xl content-center gap-8 px-4 py-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm font-bold text-emerald-200">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Pay-per-call platform: Dallas-Fort Worth plumbing launch
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Emergency plumbing help across Dallas-Fort Worth
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
              Connect with local emergency plumbing and drain cleaning providers for urgent leaks, backups, sewer problems,
              water heater issues, burst pipes, and same-day drain help.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CallButton location="homepage-hero" className="sm:min-w-64" />
              <Link className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-4 py-3 text-sm font-bold text-white hover:bg-white/10" href="/contact">
                Request form connection
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="grid gap-3 self-end">
            {proofPoints.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-md border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <div className="flex items-start gap-3">
                    <Icon className="mt-1 h-5 w-5 flex-none text-emerald-300" aria-hidden="true" />
                    <div>
                      <p className="font-black">{item.label}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-200">{item.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page-shell">
        <div className="answer-grid">
          <div>
            <DirectAnswer>
              If water is leaking, wastewater is backing up, or an essential fixture cannot be used, stop water use where safe and
              request a local provider connection. This site uses honest lead-generation wording and does not claim a fake office,
              license, review score, or arrival promise.
            </DirectAnswer>
            <LocalGuidance />
          </div>
          <LeadForm pageUrl="/" city="Dallas" service="Emergency plumbing" />
        </div>

        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-kicker">Core money pages</p>
              <h2 className="mt-2 text-3xl font-black text-slate-950">Emergency services built for calls and answers</h2>
            </div>
            <Link href="/faq" className="font-bold text-emerald-700 hover:text-emerald-900">View FAQ hub</Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-md border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-400">
                <p className="text-xs font-black uppercase tracking-normal text-emerald-700">{service.urgency} urgency</p>
                <h3 className="mt-2 text-xl font-black text-slate-950">{service.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">{service.shortAnswer}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-md bg-slate-950 p-6 text-white">
            <p className="section-kicker text-emerald-300">Reusable platform</p>
            <h2 className="mt-2 text-3xl font-black">Dallas plumbing is Version 1</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Services, cities, problem pages, cost guides, buyer routing, and AEO sections are powered by data files so future
              home-service verticals can be added without rewriting the whole site.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {cities.slice(0, 8).map((city) => (
              <Link key={city.slug} href={`/cities/${city.slug}`} className="rounded-md border border-slate-200 bg-white p-4 font-bold text-slate-900 hover:border-emerald-400">
                Emergency plumbing in {city.name}
              </Link>
            ))}
          </div>
        </section>

        <FAQBlock faqs={faqs} />
        <InternalLinks extra={services.slice(6, 10).map((service) => ({ label: service.name, href: `/services/${service.slug}` }))} />

        <section className="mt-10 rounded-md border border-amber-200 bg-amber-50 p-5">
          <p className="font-black text-amber-900">Disclosure</p>
          <p className="mt-2 leading-7 text-amber-950">{siteConfig.disclosure}</p>
        </section>
      </section>
    </main>
  );
}
