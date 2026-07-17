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
  "24-hour-emergency-plumber": { src: "/images/hero/emergency-plumbing-abstract.svg", alt: "Emergency plumbing service graphic with connected pipes and water flow" },
  "emergency-drain-cleaning": { src: "/images/photography/drain-cleaning.webp", alt: "Plumbing professional inspecting a residential drain line" },
  "main-sewer-line-clog": { src: "/images/photography/sewer-inspection.webp", alt: "Camera inspection at a residential sewer cleanout" },
  "toilet-overflow-emergency": { src: "/images/photography/toilet-repair.webp", alt: "Plumbing professional inspecting a toilet tank" },
  "burst-pipe-emergency": { src: "/images/hero/burst-pipe-emergency.svg", alt: "Burst pipe emergency shutoff and water-control graphic" },
  "water-heater-emergency": { src: "/images/photography/water-heater-inspection.webp", alt: "Plumbing professional inspecting a residential water heater" }
};

const capitalizeFirst = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export const metadata = buildMetadata({
  title: "Emergency plumbing service across Dallas-Fort Worth",
  description: "Call for emergency plumbing service across Dallas-Fort Worth for drain, sewer, pipe, toilet, leak, and water-heater problems.",
  path: "/"
});

export default function HomePage() {
  const faqs = [
    { question: "Can I request emergency plumbing service across Dallas-Fort Worth?", answer: siteConfig.serviceStatement },
    { question: "What plumbing problems can I call about?", answer: "Call about active leaks, drain backups, sewer symptoms, toilet overflows, burst pipes, failed shutoff valves, and urgent water-heater problems." },
    ...emergencyFaqs,
    ...universalFaqs
  ].slice(0, 8);

  return (
    <main>
      <JsonLd data={[
        webPageSchema("/", "Emergency plumbing service across Dallas-Fort Worth", "Call for emergency plumbing service across Dallas-Fort Worth for drain, sewer, pipe, toilet, leak, and water-heater problems."),
        breadcrumbSchema([{ name: "Home", path: "/" }]),
        faqSchema(faqs)
      ]} />

      <section className="hero-field min-h-[620px] text-white">
        <div className="hero-photo">
          <Image src="/images/hero/hero-emergency-plumber-repair.jpg" alt="Licensed emergency plumber actively repairing a pipe at a DFW home" fill sizes="100vw" className="object-cover object-center" priority />
        </div>
        <div className="mx-auto flex min-h-[620px] max-w-7xl items-center px-4 py-14 lg:py-20">
          <article className="max-w-3xl">
            <p className="eyebrow"><ShieldCheck className="h-4 w-4" aria-hidden="true" /> Plumbing Service in Dallas–Fort Worth</p>
            <h1 className="display-title mt-6 text-5xl font-bold leading-[.98] sm:text-6xl lg:text-7xl">
              Urgent Plumbing Help When Every Minute Matters.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100 sm:text-xl">
              Call Plumbing Hands for emergency plumbing service across DFW—from active leaks and drain backups to sewer, toilet, burst-pipe, and water-heater problems.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CallButton location="home-hero" label={`Call ${siteConfig.phoneDisplay}`} pagePath="/" pageType="homepage" service="Emergency plumbing" city={siteConfig.marketName} />
              <Link href="#urgent-help" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-black text-white backdrop-blur transition hover:bg-white/20">
                Find your plumbing service <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="trust-ribbon mt-10 grid gap-1 rounded-2xl p-3 sm:grid-cols-3">
              {["Emergency phone line", "DFW plumbing service", "Clear next steps"].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-bold text-slate-100">
                  <CheckCircle2 className="h-4 w-4 flex-none text-cyan-300" aria-hidden="true" /> {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="urgent-help" className="relative z-10 mx-auto -mt-14 max-w-7xl px-4">
        <div className="rounded-[1.5rem] border border-white/60 bg-[#fffaf1] p-5 shadow-[0_30px_80px_rgba(8,27,44,.18)] sm:p-7">
          <p className="section-kicker">Start with the symptom</p>
          <h2 className="display-title mt-2 text-3xl font-bold text-[#081b2c] sm:text-4xl">What Needs Attention Right Now?</h2>
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
            <div className="media-cover diagnostic-photo" role="img" aria-label="Fully visible plumbing service vehicle ready for an urgent service call" />
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="section-kicker">Be ready before the call</p>
              <h2 className="display-title mt-3 text-4xl font-bold leading-tight text-[#081b2c]">The Right Details Help Service Start Faster.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">A clear description helps identify whether the problem involves one fixture, a wider drain or sewer line, a supply pipe, or a water heater.</p>
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
            <div><p className="section-kicker">Emergency plumbing services</p><h2 className="display-title mt-2 text-4xl font-bold text-[#081b2c]">Help Organized Around Your Plumbing Problem.</h2></div>
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

        <section className="content-section dark-band">
          <div className="mx-auto max-w-5xl text-center">
            <p className="eyebrow">One call. Clear next steps.</p>
            <h2 className="display-title mt-4 text-4xl font-bold leading-tight sm:text-5xl">Tell Us What Happened. Get Your Plumbing Service Moving.</h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-200">Share the problem, your DFW location, and the urgency by phone so the right plumbing service can be identified without a long form.</p>
          </div>
          <div className="mx-auto mt-9 grid max-w-5xl gap-4 md:grid-cols-3">
            {["Describe the affected fixture and urgency", "Share the DFW city or ZIP", "Discuss the right service and next step"].map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/15 bg-white/[.07] p-5 text-left"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#e84d0e] font-black text-white">{index + 1}</span><p className="mt-4 font-bold leading-7 text-white">{step}</p></div>
            ))}
          </div>
        </section>

        <section className="content-section">
          <div className="text-center">
            <p className="section-kicker">Built for urgent plumbing needs</p>
            <h2 className="display-title mx-auto mt-3 max-w-4xl text-4xl font-bold leading-tight text-[#081b2c]">Professional Plumbing Help Starts With One Clear Call.</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">From the first safety step to choosing the right service, Plumbing Hands keeps the process focused on the problem that needs attention.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["Emergency-ready guidance", "Service organized by problem", "Coverage across Dallas–Fort Worth"].map((item) => (
              <div key={item} className="premium-card p-6"><CheckCircle2 className="h-8 w-8 text-[#0b7895]" aria-hidden="true" /><h3 className="mt-4 text-xl font-black text-[#081b2c]">{item}</h3></div>
            ))}
          </div>
        </section>

        <LeadForm pageUrl="/" service="Emergency plumbing" city={siteConfig.marketName} />

        <section className="content-section soft-band">
          <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <p className="section-kicker">Plumbing Service in Dallas–Fort Worth</p>
              <h2 className="display-title mt-3 text-4xl font-bold text-[#081b2c]">Emergency Plumbing Service Across DFW.</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">Choose your city to find emergency plumbing service for leaks, drains, sewers, toilets, pipes, and water heaters.</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-4xl font-black text-[#081b2c]">{cities.length}</p><p className="mt-1 text-sm font-bold text-slate-500">DFW service areas</p></div>
                <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-4xl font-black text-[#081b2c]">{services.length}</p><p className="mt-1 text-sm font-bold text-slate-500">urgent plumbing services</p></div>
              </div>
              <Link href="/cities" className="mt-6 inline-flex items-center gap-2 font-black text-[#0b7895]">Find service in your city <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cities.slice(0, 12).map((city) => <Link key={city.slug} href={`/cities/${city.slug}`} className="premium-card flex items-center gap-3 p-4 font-black text-[#081b2c]"><MapPin className="h-5 w-5 text-[#e84d0e]" aria-hidden="true" />{city.name}</Link>)}
            </div>
          </div>
        </section>

        <section className="content-section">
          <p className="section-kicker">Practical cost guidance</p>
          <h2 className="display-title mt-2 text-4xl font-bold text-[#081b2c]">Know What Can Change The Scope.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {costGuides.map((guide) => (
              <Link key={guide.slug} href={`/cost-guides/${guide.slug}`} className="premium-card p-6"><PhoneCall className="h-7 w-7 text-[#0b7895]" aria-hidden="true" /><h3 className="mt-4 text-xl font-black text-[#081b2c]">{guide.title}</h3><p className="mt-3 leading-7 text-slate-600">{guide.directAnswer}</p></Link>
            ))}
          </div>
        </section>

        <section className="content-section">
          <p className="section-kicker">Homeowner guidance</p>
          <h2 className="display-title mt-2 text-4xl font-bold text-[#081b2c]">Answers For The Moment Something Changes.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {problems.slice(0, 6).map((problem) => (
              <Link key={problem.slug} href={`/problems/${problem.slug}`} className="premium-card p-6"><AlertTriangle className="h-7 w-7 text-[#e84d0e]" aria-hidden="true" /><h3 className="mt-4 text-xl font-black text-[#081b2c]">{problem.title}</h3><p className="mt-3 leading-7 text-slate-600">{problem.directAnswer}</p></Link>
            ))}
          </div>
        </section>

        <FAQBlock faqs={faqs} />
        <InternalLinks />

        <section className="content-section dark-band text-center">
          <p className="eyebrow">Need plumbing service now?</p>
          <h2 className="display-title mx-auto mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">Call Plumbing Hands And Get The Next Step Started.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-200">Tell us the plumbing problem and your Dallas–Fort Worth location. The emergency line is ready for active leaks, backups, toilet, pipe, sewer, and water-heater service needs.</p>
          <div className="mt-7"><CallButton location="home-closing" label={`Call ${siteConfig.phoneDisplay}`} pagePath="/" pageType="homepage" city={siteConfig.marketName} /></div>
        </section>
      </div>
    </main>
  );
}
