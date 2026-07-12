import Link from "next/link";
import Image from "next/image";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Droplets,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Wrench
} from "lucide-react";
import { CallButton } from "@/components/CallButton";
import { LeadForm } from "@/components/LeadForm";
import { FAQBlock, InternalLinks } from "@/components/PageSections";
import { cities } from "@/data/cities";
import { costGuides } from "@/data/costGuides";
import { emergencyFaqs, universalFaqs } from "@/data/faqs";
import { problems } from "@/data/problems";
import { featuredServices } from "@/data/services";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

const urgentCards = [
  {
    title: "Active leaks",
    copy: "Shut off the closest valve when safe and request help before damage spreads.",
    icon: Droplets
  },
  {
    title: "Drain backups",
    copy: "Stop running water when sinks, tubs, toilets, or floor drains start backing up.",
    icon: AlertTriangle
  },
  {
    title: "Sewer symptoms",
    copy: "Multiple slow drains, sewer odor, or outdoor cleanout overflow should be handled quickly.",
    icon: Wrench
  },
  {
    title: "Essential fixture loss",
    copy: "No usable toilet, no hot water, or unsafe water near electrical areas may need urgent guidance.",
    icon: Clock
  }
];

const howItWorks = [
  "Tell us your city, issue, urgency, and contact number.",
  "The request can be reviewed for service area and provider availability.",
  "Confirm availability, pricing, credentials, and scope directly before work begins."
];

export const metadata = buildMetadata({
  title: "Emergency plumbing help across Dallas-Fort Worth",
  description:
    "Request urgent plumbing help across Dallas-Fort Worth for drain, sewer, pipe, toilet, and water-heater problems.",
  path: "/"
});

export default function HomePage() {
  const faqs = [
    {
      question: "Can I request urgent plumbing help across Dallas-Fort Worth?",
      answer:
        "Yes. Plumbing Hands helps visitors request service from available providers or partners where coverage is available."
    },
    {
      question: "Does Plumbing Hands claim an office in every city listed?",
      answer:
        "No. Plumbing Hands helps connect visitors with available plumbing service providers or partners where coverage is available. We do not claim a physical office in every city listed."
    },
    ...emergencyFaqs,
    ...universalFaqs
  ].slice(0, 8);

  return (
    <main>
      <JsonLd
        data={[
          webPageSchema(
            "/",
            "Emergency plumbing help across Dallas-Fort Worth",
            "Request urgent plumbing help across Dallas-Fort Worth for drain, sewer, pipe, toilet, and water-heater problems."
          ),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          faqSchema(faqs)
        ]}
      />

      <section className="hero-field">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <article className="self-center text-white">
            <p className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-normal text-cyan-100">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Dallas-Fort Worth service request help
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Emergency Plumbing Help Across Dallas-Fort Worth
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100">
              Find help for urgent drain, sewer, pipe, toilet, and water-heater problems. Plumbing Hands helps visitors request service from available providers or partners where coverage is available.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CallButton location="home-hero" label="Request Emergency Help" />
              <Link
                href="#services"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/25 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
              >
                View Emergency Services <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Transparent service areas", "Original safety-first copy", "Provider coverage varies"].map((item) => (
                <div key={item} className="rounded-md border border-white/15 bg-white/10 p-3 text-sm font-bold text-slate-100">
                  <CheckCircle2 className="mb-2 h-4 w-4 text-cyan-200" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </article>

          <aside className="grid gap-4">
            <div className="overflow-hidden rounded-md border border-white/20 bg-white/10 shadow-2xl">
              <Image
                src="/images/hero/emergency-plumbing-abstract.svg"
                alt=""
                width={960}
                height={320}
                className="h-40 w-full object-cover"
                priority
              />
            </div>
            <div>
              <LeadForm pageUrl="/" service="Emergency plumbing" city={siteConfig.marketName} />
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto -mt-7 max-w-7xl px-4">
        <div className="emergency-strip grid gap-3 p-3 sm:grid-cols-2 lg:grid-cols-4">
          {urgentCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href="/contact"
                className="rounded-md border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:shadow-md"
              >
                <Icon className="h-6 w-6 text-orange-600" aria-hidden="true" />
                <h2 className="mt-3 text-base font-black text-slate-950">{card.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{card.copy}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="page-shell">
        <section className="content-section soft-band">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="section-kicker">Fast local structure</p>
              <h2 className="mt-2 text-3xl font-black leading-tight text-slate-950">
                Built for urgent DFW plumbing decisions
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                The site gives visitors clear next steps, service-area pages, direct answers, cost-factor guidance, and a safe request path without pretending to be a physical office in every city.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["30", "DFW city pages"],
                ["10", "Emergency service pages"],
                ["14", "Problem guides"]
              ].map(([number, label]) => (
                <div key={label} className="rounded-md border border-slate-200 bg-white p-5">
                  <p className="text-3xl font-black text-slate-950">{number}</p>
                  <p className="mt-2 text-sm font-bold text-slate-600">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="content-section">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="section-kicker">Emergency services</p>
              <h2 className="mt-2 text-3xl font-black text-slate-950">Request help by service need</h2>
            </div>
            <Link href="/services/24-hour-emergency-plumber" className="text-sm font-black text-cyan-700 hover:text-cyan-900">
              Start with emergency plumber <ArrowRight className="inline h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service, index) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="premium-card group bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-cyan-50 text-cyan-700">
                    {index % 2 === 0 ? <Droplets className="h-5 w-5" aria-hidden="true" /> : <Wrench className="h-5 w-5" aria-hidden="true" />}
                  </span>
                  <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-orange-600" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-xl font-black text-slate-950">{service.name}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{service.shortAnswer}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="content-section">
          <p className="section-kicker">Common urgent problems</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">Direct answers for stressful moments</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {problems.slice(0, 6).map((problem) => (
              <Link key={problem.slug} href={`/problems/${problem.slug}`} className="premium-card bg-white p-5">
                <AlertTriangle className="h-5 w-5 text-orange-600" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-black text-slate-950">{problem.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{problem.directAnswer}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="content-section">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="section-kicker">Coverage area</p>
              <h2 className="mt-2 text-3xl font-black text-slate-950">Dallas-Fort Worth city pages</h2>
              <p className="mt-4 leading-7 text-slate-700">
                Service availability may vary by location, timing, and provider coverage. City pages use service-area wording and do not claim a physical office in every listed city.
              </p>
              <Image
                src="/images/cities/dfw-service-area-map.svg"
                alt=""
                width={900}
                height={520}
                className="mt-6 rounded-md border border-slate-200 bg-white"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cities.slice(0, 12).map((city) => (
                <Link key={city.slug} href={`/cities/${city.slug}`} className="rounded-md border border-slate-200 bg-white p-4 font-bold text-slate-900 transition hover:border-cyan-400">
                  <MapPin className="mb-2 h-4 w-4 text-cyan-700" aria-hidden="true" />
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section">
          <p className="section-kicker">Cost guides</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">Pricing questions to ask before approving work</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {costGuides.map((guide) => (
              <Link key={guide.slug} href={`/cost-guides/${guide.slug}`} className="premium-card bg-white p-5">
                <PhoneCall className="h-5 w-5 text-cyan-700" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-black text-slate-950">{guide.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{guide.directAnswer}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="content-section soft-band">
          <p className="section-kicker">How it works</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">Simple request flow</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {howItWorks.map((step, index) => (
              <div key={step} className="premium-card bg-white p-5">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-orange-100 text-sm font-black text-orange-700">
                  {index + 1}
                </span>
                <p className="mt-4 font-bold leading-7 text-slate-800">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-md border border-cyan-200 bg-white p-5">
            <p className="font-bold leading-7 text-slate-800">{siteConfig.disclosure}</p>
          </div>
        </section>

        <FAQBlock faqs={faqs} />
        <InternalLinks />
      </div>
    </main>
  );
}
