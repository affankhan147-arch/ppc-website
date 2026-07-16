import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Droplets,
  MapPin,
  PhoneCall,
  SearchCheck,
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
import { featuredServices, services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

const urgentCards = [
  { title: "Water is actively leaking", text: "Find the nearest safe shutoff and protect electrical areas.", icon: Droplets, href: "/services/burst-pipe-emergency" },
  { title: "Drains are backing up", text: "Stop adding water and note which fixtures react together.", icon: AlertTriangle, href: "/services/emergency-drain-cleaning" },
  { title: "The toilet will not stop", text: "Close the supply valve if it turns normally and do not flush again.", icon: Clock3, href: "/services/toilet-overflow-emergency" },
  { title: "Sewer symptoms are appearing", text: "Multiple fixtures, odor, or cleanout overflow need prompt attention.", icon: Wrench, href: "/services/main-sewer-line-clog" }
];

const servicePhotography: Record<string, { src: string; alt: string }> = {
  "24-hour-emergency-plumber": { src: "/images/photography/service-van.webp", alt: "Illustrative unbranded plumbing service vehicle arriving at a DFW home" },
  "emergency-drain-cleaning": { src: "/images/photography/drain-cleaning.webp", alt: "Illustrative plumbing professional inspecting a residential drain line" },
  "main-sewer-line-clog": { src: "/images/photography/sewer-inspection.webp", alt: "Illustrative camera inspection at a residential sewer cleanout" },
  "toilet-overflow-emergency": { src: "/images/photography/toilet-repair.webp", alt: "Illustrative plumbing professional inspecting a toilet tank" },
  "burst-pipe-emergency": { src: "/images/photography/plumbing-diagnostic.png", alt: "Illustrative close-up of a plumbing diagnostic inspection" },
  "water-heater-emergency": { src: "/images/photography/water-heater-inspection.webp", alt: "Illustrative plumbing professional inspecting a residential water heater" }
};

const capitalizeFirst = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export const metadata = buildMetadata({
  title: "Emergency plumbing help across Dallas-Fort Worth",
  description: "Request urgent plumbing help across Dallas-Fort Worth for drain, sewer, pipe, toilet, and water-heater problems.",
  path: "/"
});

export default function HomePage() {
  const faqs = [
    { question: "Can I request urgent plumbing help across Dallas-Fort Worth?", answer: siteConfig.serviceStatement },
    { question: "How does Plumbing Hands describe service areas?", answer: "Service-area pages help visitors describe where plumbing help is needed. Availability, timing, pricing, credentials, and scope should be confirmed directly with the provider." },
    ...emergencyFaqs,
    ...universalFaqs
  ].slice(0, 8);

  return (
    <main>
      <JsonLd data={[
        webPageSchema("/", "Emergency plumbing help across Dallas-Fort Worth", "Request urgent plumbing help across Dallas-Fort Worth for drain, sewer, pipe, toilet, and water-heater problems."),
        breadcrumbSchema([{ name: "Home", path: "/" }]),
        faqSchema(faqs)
      ]} />

      <section className="hero-field min-h-[620px] text-white">
        <div className="hero-photo">
          <Image src="/images/photography/home-emergency-plumber.png" alt="Illustrative scene of a plumbing professional inspecting a kitchen sink while a homeowner observes" fill sizes="100vw" className="object-cover object-center" priority />
        </div>
        <div className="mx-auto flex min-h-[620px] max-w-7xl items-center px-4 py-14 lg:py-20">
          <article className="max-w-3xl">
            <p className="eyebrow"><ShieldCheck className="h-4 w-4" aria-hidden="true" /> Dallas–Fort Worth plumbing connection</p>
            <h1 className="display-title mt-6 text-5xl font-bold leading-[.98] sm:text-6xl lg:text-7xl">
              Calm guidance when plumbing cannot wait.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100 sm:text-xl">
              Describe the problem, your location, and what is happening now. PlumbingHands helps connect DFW requests with available plumbing providers while keeping pricing, credentials, timing, and scope clear.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CallButton location="home-hero" label={`Call ${siteConfig.phoneDisplay}`} pagePath="/" pageType="homepage" service="Emergency plumbing" city={siteConfig.marketName} />
              <Link href="#urgent-help" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-black text-white backdrop-blur transition hover:bg-white/20">
                Find your problem <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="trust-ribbon mt-10 grid gap-1 rounded-2xl p-3 sm:grid-cols-3">
              {["Safety-first next steps", "DFW service-area guidance", "Provider details confirmed directly"].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-bold text-slate-100">
                  <CheckCircle2 className="h-4 w-4 flex-none text-cyan-300" aria-hidden="true" /> {item}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-300">Illustrative service photography; people shown are not identified as PlumbingHands employees or customers.</p>
          </article>
        </div>
      </section>

      <section id="urgent-help" className="relative z-10 mx-auto -mt-14 max-w-7xl px-4">
        <div className="rounded-[1.5rem] border border-white/60 bg-[#fffaf1] p-5 shadow-[0_30px_80px_rgba(8,27,44,.18)] sm:p-7">
          <p className="section-kicker">Start with the symptom</p>
          <h2 className="display-title mt-2 text-3xl font-bold text-[#081b2c] sm:text-4xl">What needs attention right now?</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {urgentCards.map(({ title, text, icon: Icon, href }) => (
              <Link key={title} href={href} className="premium-card group p-5">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-orange-50 text-[#e84d0e]"><Icon className="h-6 w-6" aria-hidden="true" /></span>
                <h3 className="mt-4 text-lg font-black leading-tight text-[#081b2c]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-black text-[#0b7895]">See safe next steps <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="page-shell">
        <section className="content-section overflow-hidden p-0">
          <div className="grid lg:grid-cols-[.88fr_1.12fr]">
            <div className="media-cover diagnostic-photo" role="img" aria-label="Illustrative close-up of a plumbing diagnostic inspection beneath a sink" />
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="section-kicker">Useful before the call</p>
              <h2 className="display-title mt-3 text-4xl font-bold leading-tight text-[#081b2c]">Notice the pattern—not just the mess.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">A clear description helps distinguish one fixture problem from a wider drain, sewer, supply, or water-heater issue.</p>
              <div className="mt-6 grid gap-3">
                {["Which fixture changed first", "Whether water is clean or contaminated", "What shutoff or cleanout is safely accessible", "Whether another fixture reacts at the same time"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-[#f2f6f5] px-4 py-3 font-bold text-slate-800"><SearchCheck className="h-5 w-5 flex-none text-[#0b7895]" aria-hidden="true" />{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="content-section">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="section-kicker">Emergency services</p><h2 className="display-title mt-2 text-4xl font-bold text-[#081b2c]">Help organized around the problem.</h2></div>
            <Link href="/services/24-hour-emergency-plumber" className="inline-flex items-center gap-2 font-black text-[#0b7895]">Emergency plumber overview <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="premium-card group overflow-hidden">
                <div className="service-photo" role="img" aria-label={servicePhotography[service.slug].alt} style={{ backgroundImage: `url(${servicePhotography[service.slug].src})` }} />
                <div className="p-5">
                  <h3 className="text-xl font-black leading-tight text-[#081b2c]">{capitalizeFirst(service.name)}</h3>
                  <p className="mt-2 line-clamp-3 leading-7 text-slate-600">{service.shortAnswer}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#e84d0e]">Explore this service <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="content-section dark-band overflow-hidden p-0">
          <div className="grid lg:grid-cols-2">
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="eyebrow">Transparent by design</p>
              <h2 className="display-title mt-4 text-4xl font-bold leading-tight">A clearer way to request plumbing help.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-200">The site helps organize the request. The responding provider confirms availability, timing, credentials, pricing, and the work scope directly.</p>
              <div className="mt-8 grid gap-5">
                {["Describe the affected fixture and urgency", "Share the DFW city or ZIP", "Confirm provider details before authorizing work"].map((step, index) => (
                  <div key={step} className="flex gap-4"><span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-[#e84d0e] font-black">{index + 1}</span><p className="pt-2 font-bold text-white">{step}</p></div>
                ))}
              </div>
            </div>
            <div className="media-cover consultation-photo" role="img" aria-label="Illustrative scene of a plumbing professional explaining a sink assessment to a homeowner" />
          </div>
        </section>

        <section className="content-section overflow-hidden p-0">
          <div className="grid items-center lg:grid-cols-[1.08fr_.92fr]">
            <div className="media-cover crew-photo" role="img" aria-label="Illustrative provider crew preparing tools beside an unbranded service vehicle" />
            <div className="p-7 sm:p-9">
              <p className="section-kicker">Prepared for the request</p>
              <h2 className="display-title mt-3 text-4xl font-bold leading-tight text-[#081b2c]">A professional arrival starts with clear details.</h2>
              <p className="mt-4 leading-7 text-slate-600">Share the affected fixture, urgency, and location so an available provider can confirm the right next step. Always confirm identity, credentials, pricing, and scope directly before work begins.</p>
              <p className="mt-4 text-xs font-semibold text-slate-500">Illustrative service photography. People and vehicles shown are not represented as a specific PlumbingHands provider, employee, or customer.</p>
            </div>
          </div>
        </section>

        <LeadForm pageUrl="/" service="Emergency plumbing" city={siteConfig.marketName} />

        <section className="content-section soft-band">
          <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <p className="section-kicker">Dallas–Fort Worth coverage</p>
              <h2 className="display-title mt-3 text-4xl font-bold text-[#081b2c]">Local pages without fake local-office claims.</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">Choose your city to describe the location and see relevant emergency service guidance. Provider coverage still depends on the request.</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-4xl font-black text-[#081b2c]">{cities.length}</p><p className="mt-1 text-sm font-bold text-slate-500">DFW city guides</p></div>
                <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-4xl font-black text-[#081b2c]">{services.length}</p><p className="mt-1 text-sm font-bold text-slate-500">service paths</p></div>
              </div>
              <Link href="/cities" className="mt-6 inline-flex items-center gap-2 font-black text-[#0b7895]">View every service area <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cities.slice(0, 12).map((city) => <Link key={city.slug} href={`/cities/${city.slug}`} className="premium-card flex items-center gap-3 p-4 font-black text-[#081b2c]"><MapPin className="h-5 w-5 text-[#e84d0e]" aria-hidden="true" />{city.name}</Link>)}
            </div>
          </div>
        </section>

        <section className="content-section">
          <p className="section-kicker">Practical cost guidance</p>
          <h2 className="display-title mt-2 text-4xl font-bold text-[#081b2c]">Know what can change the scope.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {costGuides.map((guide) => (
              <Link key={guide.slug} href={`/cost-guides/${guide.slug}`} className="premium-card p-6"><PhoneCall className="h-7 w-7 text-[#0b7895]" aria-hidden="true" /><h3 className="mt-4 text-xl font-black text-[#081b2c]">{guide.title}</h3><p className="mt-3 leading-7 text-slate-600">{guide.directAnswer}</p></Link>
            ))}
          </div>
        </section>

        <section className="content-section">
          <p className="section-kicker">Homeowner guidance</p>
          <h2 className="display-title mt-2 text-4xl font-bold text-[#081b2c]">Answers for the moment something changes.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {problems.slice(0, 6).map((problem) => (
              <Link key={problem.slug} href={`/problems/${problem.slug}`} className="premium-card p-6"><AlertTriangle className="h-7 w-7 text-[#e84d0e]" aria-hidden="true" /><h3 className="mt-4 text-xl font-black text-[#081b2c]">{problem.title}</h3><p className="mt-3 leading-7 text-slate-600">{problem.directAnswer}</p></Link>
            ))}
          </div>
        </section>

        <FAQBlock faqs={faqs} />
        <InternalLinks />

        <section className="content-section dark-band text-center">
          <p className="eyebrow">Ready to describe the problem?</p>
          <h2 className="display-title mx-auto mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">Start with a clear conversation about what is happening now.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-200">Availability and timing depend on location and provider coverage. Confirm pricing, credentials, and scope directly before work begins.</p>
          <div className="mt-7"><CallButton location="home-closing" label={`Call ${siteConfig.phoneDisplay}`} pagePath="/" pageType="homepage" city={siteConfig.marketName} /></div>
        </section>
      </div>
    </main>
  );
}
