import Image from "next/image";
import Link from "next/link";
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
import { FAQBlock } from "@/components/PageSections";
import { cities } from "@/data/cities";
import { costGuides } from "@/data/costGuides";
import { emergencyFaqs, universalFaqs } from "@/data/faqs";
import { featuredServices, services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

const urgentCards = [
  {
    title: "Active leak or burst pipe",
    copy: "Shut off the closest safe valve and keep water away from electrical areas.",
    action: "Get pipe emergency help",
    icon: Droplets,
    href: "/services/burst-pipe-emergency"
  },
  {
    title: "Drain backup or standing water",
    copy: "Stop using affected fixtures and avoid adding chemical drain cleaner.",
    action: "Request drain cleaning help",
    icon: AlertTriangle,
    href: "/services/emergency-drain-cleaning"
  },
  {
    title: "Multiple fixtures or sewer symptoms",
    copy: "Stop water use when toilets, tubs, or floor drains react together.",
    action: "Review main sewer help",
    icon: Wrench,
    href: "/services/main-sewer-line-clog"
  },
  {
    title: "Water heater leak or no hot water",
    copy: "Turn off water and power or gas only when it is safe to do so.",
    action: "Discuss water heater help",
    icon: Clock,
    href: "/services/water-heater-emergency"
  }
];

const trustPoints = [
  {
    title: "Safety-first guidance",
    copy: "Immediate steps focus on limiting water damage and avoiding electrical or wastewater hazards.",
    icon: ShieldCheck
  },
  {
    title: "DFW request routing",
    copy: "City and service paths help explain where assistance is needed before availability is discussed.",
    icon: MapPin
  },
  {
    title: "Direct provider confirmation",
    copy: "Pricing, credentials, timing, diagnosis, and repair scope are confirmed directly before work.",
    icon: CheckCircle2
  }
];

const callProcess = [
  {
    title: "Explain what is happening",
    copy: "Describe the affected fixture or pipe, whether water is active, and any immediate safety concern."
  },
  {
    title: "Share your DFW location",
    copy: "Provide the city or ZIP so current service-area and provider availability can be discussed."
  },
  {
    title: "Confirm the next step",
    copy: "Discuss timing and then confirm pricing, credentials, diagnosis, and scope directly with the provider."
  }
];

const coverageStats = [
  [String(cities.length), "DFW city paths"],
  [String(services.length), "plumbing service paths"],
  [String(costGuides.length), "cost-factor guides"]
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
      answer: siteConfig.serviceStatement
    },
    {
      question: "What should I confirm before approving emergency plumbing work?",
      answer:
        "Confirm provider availability, timing, credentials, diagnostic or dispatch charges, repair scope, and pricing directly before authorizing work."
    },
    ...emergencyFaqs,
    ...universalFaqs
  ].slice(0, 7);

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

      <section className="hero-field overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-16 xl:py-20">
          <article className="relative z-10 text-white">
            <p className="premium-eyebrow">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Dallas-Fort Worth emergency request line
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
              Emergency Plumbing Help Across Dallas-Fort Worth
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Get clear next steps for urgent leaks, drain backups, sewer symptoms, toilet overflows, and water-heater problemsâ€”then call to discuss current provider availability.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CallButton
                location="home-hero"
                label={`Call ${siteConfig.phoneDisplay}`}
                pagePath="/"
                pageType="homepage"
                service="Emergency plumbing"
                city={siteConfig.marketName}
                className="min-h-14 px-6 text-lg"
              />
              <Link href="#urgent-help" className="premium-secondary-button min-h-14 px-6 py-4 text-base font-black">
                Choose your plumbing problem <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>

            <p className="mt-4 flex items-center gap-2 text-sm font-bold text-cyan-100">
              <PhoneCall className="h-4 w-4 text-orange-300" aria-hidden="true" />
              Speak by phoneâ€”no long request form required.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Safety-first emergency guidance",
                "DFW service-area request paths",
                "Provider details confirmed directly"
              ].map((item) => (
                <div key={item} className="hero-proof-card">
                  <CheckCircle2 className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>

          <aside className="relative z-10 grid gap-5">
            <div className="hero-visual-panel relative overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
              <Image
                src="/images/hero/hero-emergency-plumber-repair.jpg"
                alt="Licensed emergency plumber actively repairing a pipe at a DFW home"
                width={1200}
                height={520}
                className="h-52 w-full object-cover sm:h-60"
                priority
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-slate-950/80 p-4 text-white backdrop-blur-md">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-cyan-200">Before you call</p>
                <p className="mt-1 text-sm font-bold leading-6">
                  Stop active water when safe, avoid wet electrical areas, and note which fixtures are affected.
                </p>
              </div>
            </div>
            <LeadForm pageUrl="/" service="emergency plumbing" city={siteConfig.marketName} />
          </aside>
        </div>
      </section>

      <section id="urgent-help" className="relative z-20 mx-auto -mt-8 max-w-7xl px-4">
        <div className="premium-surface p-5 sm:p-7">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-kicker">Start with the urgent issue</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                Choose the Problem That Needs Attention
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              These links provide issue-specific safety guidance before you call. Avoid testing the problem by repeatedly running water.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {urgentCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link key={card.title} href={card.href} className="premium-card premium-card-link group p-5">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-50 text-orange-700">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-xl font-black leading-tight text-slate-950">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{card.copy}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-cyan-800">
                    {card.action} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="page-shell">
        <section className="content-section premium-trust-section">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="section-kicker">A clearer way to request help</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Why Homeowners Use Plumbing Hands
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Plumbing Hands combines practical emergency information with organized DFW service paths so callers can describe the problem clearly and confirm the right details before work begins.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {coverageStats.map(([number, label]) => (
                  <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-3xl font-black text-slate-950">{number}</p>
                    <p className="mt-1 text-xs font-bold leading-5 text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {trustPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <article key={point.title} className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-lg backdrop-blur">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-50 text-cyan-800">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-xl font-black text-slate-950">{point.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{point.copy}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="services" className="content-section">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">Emergency plumbing services</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Get Guidance for the Right Service Need
              </h2>
            </div>
            <Link href="/services/24-hour-emergency-plumber" className="inline-flex items-center gap-2 text-sm font-black text-cyan-800 hover:text-cyan-950">
              View emergency plumber guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredServices.slice(0, 6).map((service, index) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="premium-card premium-card-link group p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-50 text-cyan-800">
                    {index % 2 === 0 ? <Droplets className="h-7 w-7" aria-hidden="true" /> : <Wrench className="h-7 w-7" aria-hidden="true" />}
                  </span>
                  <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-orange-600" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-2xl font-black leading-tight text-slate-950">{service.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.shortAnswer}</p>
                <p className="mt-5 text-xs font-black uppercase tracking-[0.1em] text-orange-700">Urgency: {service.urgency}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="content-section soft-band">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="section-kicker">Simple phone process</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                What Happens After You Call
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                The call helps organize the urgent facts. It does not replace direct confirmation of provider availability, credentials, pricing, diagnosis, or scope.
              </p>
              <CallButton
                location="home-process-cta"
                label={`Call ${siteConfig.phoneDisplay}`}
                pagePath="/"
                pageType="homepage"
                service="Emergency plumbing"
                city={siteConfig.marketName}
                className="mt-6"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {callProcess.map((step, index) => (
                <article key={step.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-base font-black text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 text-xl font-black text-slate-950">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="section-kicker">Dallas-Fort Worth coverage</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Find Your DFW Service-Area Path
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                City pages help explain local request context without claiming a staffed Plumbing Hands office or guaranteed provider availability in that location.
              </p>
              <Link href="/cities" className="mt-5 inline-flex items-center gap-2 text-base font-black text-cyan-800 hover:text-cyan-950">
                View all DFW locations <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Image
                src="/images/cities/dfw-service-area-map.svg"
                alt=""
                width={900}
                height={520}
                className="mt-6 w-full rounded-3xl border border-slate-200 bg-white shadow-sm"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cities.slice(0, 9).map((city) => (
                <Link key={city.slug} href={`/cities/${city.slug}`} className="premium-card premium-card-link group p-5">
                  <MapPin className="h-6 w-6 text-cyan-800" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-black text-slate-950">{city.name}</h3>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.08em] text-slate-500 group-hover:text-cyan-800">
                    View local request path <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">Emergency cost guidance</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Understand the Factors Before Approving Work
              </h2>
            </div>
            <Link href="/cost-guides/emergency-plumbing-cost-dfw" className="inline-flex items-center gap-2 text-sm font-black text-cyan-800 hover:text-cyan-950">
              Open the DFW cost guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {costGuides.slice(0, 3).map((guide) => (
              <Link key={guide.slug} href={`/cost-guides/${guide.slug}`} className="premium-card premium-card-link group p-6">
                <PhoneCall className="h-7 w-7 text-orange-700" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-black leading-tight text-slate-950">{guide.title}</h3>
                <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
                  {guide.factors.slice(0, 3).map((factor) => (
                    <li key={factor} className="flex gap-2">
                      <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-cyan-700" aria-hidden="true" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-cyan-800">
                  Review cost factors <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="premium-final-cta overflow-hidden rounded-[2rem] px-6 py-10 text-white shadow-2xl sm:px-10 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="premium-eyebrow">
                <PhoneCall className="h-4 w-4" aria-hidden="true" />
                Emergency plumbing request line
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                Water is spreading, a drain is backing up, or an essential fixture is unavailable?
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">
                Call to explain the problem and location. Current provider availability varies, and all pricing, credentials, timing, and repair scope should be confirmed directly.
              </p>
            </div>
            <CallButton
              location="home-final-cta"
              label={`Call ${siteConfig.phoneDisplay}`}
              pagePath="/"
              pageType="homepage"
              service="Emergency plumbing"
              city={siteConfig.marketName}
              className="min-h-14 px-7 text-lg lg:min-w-72"
            />
          </div>
        </section>

        <FAQBlock faqs={faqs} />
      </div>
    </main>
  );
}
