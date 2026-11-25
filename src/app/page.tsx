import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Droplets,
  MapPin,
  SearchCheck,
  Wrench
} from "lucide-react";
import { CallButton } from "@/components/CallButton";
import { FAQBlock, InternalLinks, OfficialSources } from "@/components/PageSections";
import { sources } from "@/data/externalSources";
import { cities } from "@/data/cities";
import { costGuides } from "@/data/costGuides";
import { emergencyFaqs, universalFaqs } from "@/data/faqs";
import { problems } from "@/data/problems";
import { featuredServices, services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { getGridImage } from "@/lib/articleImages";
import { titleCase } from "@/lib/format";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

const serviceImages: Record<string, string> = {
  "24-hour-emergency-plumber": "/images/services/service-24hr-emergency-plumber.jpg",
  "emergency-drain-cleaning": "/images/services/service-emergency-drain-cleaning.jpg",
  "main-sewer-line-clog": "/images/services/service-main-sewer-line-clog.jpg",
  "toilet-overflow-emergency": "/images/services/service-toilet-overflow-emergency.jpg",
  "burst-pipe-emergency": "/images/services/service-burst-pipe-emergency.jpg",
  "water-heater-emergency": "/images/services/service-water-heater-emergency.jpg",
};

const processImages: string[] = [
  "/images/process/process-step1-call-for-help.jpg",
  "/images/process/process-step2-team-dispatched.jpg",
  "/images/process/process-step3-technician-consult.jpg",
];

const urgentCards = [
  { title: "Water is actively leaking", text: "Find the nearest safe shutoff and protect electrical areas.", icon: Droplets, href: "/services/burst-pipe-emergency" },
  { title: "Drains are backing up", text: "Stop adding water and note which fixtures react together.", icon: AlertTriangle, href: "/services/emergency-drain-cleaning" },
  { title: "The toilet will not stop", text: "Close the supply valve if it turns normally and do not flush again.", icon: Clock3, href: "/services/toilet-overflow-emergency" },
  { title: "Sewer symptoms are appearing", text: "Multiple fixtures, odor, or cleanout overflow need prompt attention.", icon: Wrench, href: "/services/main-sewer-line-clog" }
];

const homeGuides = [
  { title: "Burst Pipes in DFW", href: "/guides/dfw-burst-pipes", description: "Why burst pipes are common in DFW, what Winter Storm Uri showed, and the first steps that limit damage." },
  { title: "DFW Plumbing Emergency Data Report", href: "/guides/dfw-plumbing-data", description: "Original, sourced data on DFW water hardness, winter freeze frequency, and the population growth driving demand." },
  { title: "Water Heater Lifespan in DFW", href: "/guides/dfw-water-heater-lifespan", description: "How long tank and tankless water heaters last, why DFW hard water shortens that, and how to extend it." },
  { title: "DFW Emergency Plumbing Cost Guide", href: "/guides/dfw-emergency-plumbing-costs", description: "Realistic cost ranges for common emergency plumbing services across Dallas-Fort Worth." },
  { title: "Slab Leaks in DFW", href: "/guides/dfw-slab-leaks", description: "Why slab leaks are common in DFW, how they are diagnosed, and what homeowners can do about them." },
  { title: "Texas Homeowners Insurance & Plumbing Claims", href: "/guides/texas-insurance-plumbing-claims", description: "What Texas homeowners insurance covers, and does not cover, for a plumbing leak, with real TDI sources." },
  { title: "Polybutylene Pipe in DFW", href: "/guides/dfw-polybutylene-pipe-replacement", description: "How to identify polybutylene pipe, why DFW homes are at risk, and real replacement costs." },
  { title: "Gas Line Safety & Capacity in DFW", href: "/guides/dfw-gas-line-safety", description: "Gas line capacity and safety steps to know before adding an outdoor kitchen or pool heater." },
  { title: "Sewer Line Maintenance & Root Intrusion", href: "/guides/dfw-sewer-root-intrusion", description: "Why DFW sewer lines are prone to root intrusion, how it is diagnosed, and what homeowners can do." }
];

const cityEmergencyLinks = [
  { title: "Dallas Emergency Plumber", description: "24/7 emergency plumbing service in Dallas, TX.", href: "/cities/dallas/24-hour-emergency-plumber" },
  { title: "Plano Emergency Plumber", description: "Fast response for emergency plumbing in Plano.", href: "/cities/plano/24-hour-emergency-plumber" },
  { title: "McKinney Emergency Plumber", description: "Reliable emergency plumbers serving McKinney.", href: "/cities/mckinney/24-hour-emergency-plumber" },
  { title: "Frisco Emergency Plumber", description: "Emergency plumbing services in Frisco, TX.", href: "/cities/frisco/24-hour-emergency-plumber" },
  { title: "Arlington Emergency Plumber", description: "24-hour plumbing help for Arlington residents.", href: "/cities/arlington/24-hour-emergency-plumber" },
  { title: "Fort Worth Emergency Plumber", description: "Emergency plumbers ready in Fort Worth, TX.", href: "/cities/fort-worth/24-hour-emergency-plumber" }
,
  { title: "Carrollton Emergency Plumber", description: "24/7 emergency plumbing service in Carrollton, TX.", href: "/cities/carrollton/24-hour-emergency-plumber" },
  { title: "Mansfield Emergency Drain Cleaning", description: "Fast emergency drain cleaning service in Mansfield, TX.", href: "/cities/mansfield/emergency-drain-cleaning" },
  { title: "Houston Emergency Plumber", description: "24/7 emergency plumbing service in Houston, TX.", href: "/cities/houston/24-hour-emergency-plumber" },
  { title: "Austin Emergency Plumber", description: "24/7 emergency plumbing service in Austin, TX.", href: "/cities/austin/24-hour-emergency-plumber" },
  { title: "San Antonio Emergency Plumber", description: "24/7 emergency plumbing service in San Antonio, TX.", href: "/cities/san-antonio/24-hour-emergency-plumber" }
];

export const metadata = buildMetadata({
  title: "Emergency Plumber in Dallas-Fort Worth: 24/7 Help",
  description: truncateForMeta("Emergency plumbing help across Dallas-Fort Worth: burst pipes, sewer backups, drain cleaning and water heater leaks, day or night."),
  path: "/"
});

export default function HomePage() {
  const faqs = [
    { question: "Can I request emergency plumbing service across Dallas-Fort Worth?", answer: siteConfig.serviceStatement },
    { question: "Do you connect homeowners with 24 hour plumbers or a 24/7 plumber?", answer: "Yes. Plumbing Hands connects Dallas-Fort Worth homeowners with 24 hour plumbers and 24/7 plumber support, including same day plumber service for problems that can't wait until regular business hours." },
    { question: "What plumbing problems can I call about?", answer: "Call about active leaks, drain backups, sewer symptoms, toilet overflows, burst pipes, failed shutoff valves, and urgent water-heater problems." },
    ...emergencyFaqs,
    ...universalFaqs
  ].slice(0, 9);

  return (
    <main>
      <JsonLd data={[
        webPageSchema("/", "24/7 Emergency Plumber in Dallas-Fort Worth", "Call for 24/7 emergency plumber and emergency plumbing service across Dallas-Fort Worth for drain, sewer, pipe, toilet, leak, and water-heater problems."),
        breadcrumbSchema([{ name: "Home", path: "/" }]),
        faqSchema(faqs)
      ]} />

      <section className="hero-field flex min-h-[620px] items-center text-ink lg:min-h-[min(calc(100svh-110px),800px)]">
        <div className="hero-photo">
          <Image src="/images/hero/hero-emergency-plumber-repair.jpg" alt="Licensed emergency plumber actively repairing a pipe at a DFW home" fill sizes="100vw" className="object-cover object-center" priority />
        </div>
        <div className="page-shell relative py-8 pb-24 lg:py-16 lg:pb-24">
          <article className="max-w-3xl">
            <h1 className="display-title font-bold">
              DFW&apos;s Fastest Emergency Plumber – 24/7
            </h1>
            <p className="lead mt-6">
              Need an emergency plumber in Dallas-Fort Worth? Call Plumbing Hands for active leaks and drain backups, plus sewer, toilet, burst-pipe, and water-heater problems.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <CallButton location="home-hero" label={`Call ${siteConfig.phoneDisplay}`} pagePath="/" pageType="homepage" service="Emergency plumbing" city={siteConfig.marketName} />
              <Link href="#urgent-help" className="inline-flex min-h-12 items-center justify-center rounded-pill border border-rule px-6 py-3 font-black text-ink transition-colors hover:border-accent hover:text-accent">
                Find your plumbing service
              </Link>
            </div>
            <p className="mt-8 border-t border-rule pt-5 text-sm font-bold text-ink sm:pt-6">
              <span className="whitespace-nowrap">24/7 emergency phone line,</span> <span className="whitespace-nowrap">{cities.length} DFW service areas,</span> <span className="whitespace-nowrap">{services.length} urgent plumbing services</span>
            </p>
          </article>
        </div>
      </section>

      <div className="page-shell">
        <section id="urgent-help" className="content-section">
          <h2 className="display-title text-3xl font-bold text-ink sm:text-4xl">What Needs Attention Right Now?</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {urgentCards.map(({ title, text, icon: Icon, href }) => (
              <Link key={title} href={href} className="premium-card p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-paper text-call"><Icon className="h-6 w-6" aria-hidden="true" /></span>
                  <h3 className="text-lg font-black leading-tight text-ink">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-ink-2">{text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-black text-accent">See safe next steps</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="content-section overflow-hidden p-0">
          <div className="grid lg:grid-cols-[.88fr_1.12fr]">
            <div className="media-cover diagnostic-photo" role="img" aria-label="Fully visible plumbing service vehicle ready for an urgent service call" />
            <div className="p-7 sm:p-10 lg:p-12">
              <h2 className="display-title text-4xl font-bold leading-tight text-ink">The Right Details Help Service Start Faster.</h2>
              <p className="mt-5 text-lg leading-8 text-ink-2">A clear description helps identify whether the problem involves one fixture, a wider drain or sewer line, a supply pipe, or a water heater.</p>
              <div className="mt-6 grid gap-3">
                {["Which fixture changed first", "Whether water is clean or contaminated", "What shutoff or cleanout is safely accessible", "Whether another fixture reacts at the same time"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-card border border-rule bg-paper px-4 py-3 font-bold text-ink-2"><SearchCheck className="h-5 w-5 flex-none text-accent" aria-hidden="true" />{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="content-section">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><h2 className="display-title text-4xl font-bold text-ink">Help Organized Around Your Plumbing Problem.</h2></div>
            <Link href="/services" className="inline-flex items-center gap-2 font-black text-accent">Browse all 24/7 emergency plumbing services</Link>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {featuredServices.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="premium-card overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={serviceImages[service.slug] ?? "/images/hero/hero-emergency-plumber-repair.jpg"}
                    alt={`${titleCase(service.name)} - professional plumber on the job`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-black leading-tight text-ink">{titleCase(service.name)}</h3>
                  <p className="mt-2 line-clamp-3 leading-7 text-ink-2">{service.shortAnswer}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-call">Explore this service</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

<section className="content-section">
  <h2 className="text-2xl font-black text-ink">Freeze season in Dallas-Fort Worth: protect your pipes</h2>
  <p className="lead mt-3 text-ink-2">Across Dallas-Fort Worth the average first freeze comes around November 22 and the last around March 12 (National Weather Service).</p>
  <ul className="mt-4 space-y-2 text-ink-2">
    <li className="leading-7">Pipes in exterior walls, attics, garages and crawl spaces freeze first.</li>
    <li className="leading-7">If one splits, shut off the main water valve before anything else, then call.</li>
  </ul>
  <ul className="mt-4 space-y-2">
    <li><Link className="font-bold text-accent underline" href="/services/burst-pipe-emergency">Burst pipe emergency help</Link></li>
    <li><Link className="font-bold text-accent underline" href="/blog/frozen-pipes-dallas-fort-worth-prevention-before-the-next-freeze">How to keep pipes from freezing in DFW</Link></li>
    <li><Link className="font-bold text-accent underline" href="/guides/dfw-freeze-history">How often DFW freezes (NWS data)</Link></li>
    <li><Link className="font-bold text-accent underline" href="/tools/freeze-watch-widget">Live DFW freeze watch</Link></li>
  </ul>
</section>

<section className="content-section">
  <h2 className="display-title text-4xl font-bold text-ink">Find an Emergency Plumber in Dallas-Fort Worth Near You.</h2>
  <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {cityEmergencyLinks.map((link) => (
      <Link key={link.href} href={link.href} className="premium-card p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-paper text-call"><MapPin className="h-6 w-6" aria-hidden="true" /></span>
          <h3 className="text-lg font-black leading-tight text-ink">{link.title}</h3>
        </div>
        <p className="mt-3 text-sm leading-6 text-ink-2">{link.description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-black text-accent">View this city</span>
      </Link>
    ))}
  </div>
</section>


        <section className="content-section">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="display-title text-4xl font-bold leading-tight text-ink sm:text-5xl">Tell Us What Happened. Get Your Plumbing Service Moving.</h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-ink-2">Share the problem, your DFW location, and the urgency by phone so the right plumbing service can be identified without a long form.</p>
          </div>
          <ol className="mx-auto mt-9 max-w-5xl divide-y divide-rule border-y border-rule">
            {["Describe the affected fixture and urgency", "Share the DFW city or ZIP", "Discuss the right service and next step"].map((step, index) => (
              <li key={step} className="flex items-baseline gap-5 py-5 text-left"><span className="font-display text-2xl font-bold text-accent">{index + 1}</span><p className="font-bold leading-7 text-ink">{step}</p></li>
            ))}
          </ol>
        </section>

        <section className="content-section">
          <div className="text-center">
            <h2 className="display-title mx-auto max-w-4xl text-4xl font-bold leading-tight text-ink">Professional Plumbing Help Starts With One Clear Call.</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-ink-2">From the first safety step to choosing the right service, Plumbing Hands connects you with 24 hour plumbers and same day plumber service near you, so emergency plumbing help is never far away across Dallas-Fort Worth.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["Emergency-ready guidance", "Service organized by problem", "Coverage across Dallas-Fort Worth"].map((item) => (
              <div key={item} className="premium-card flex items-center gap-4 p-6"><CheckCircle2 className="h-8 w-8 flex-none text-accent" aria-hidden="true" /><h3 className="text-xl font-black text-ink">{item}</h3></div>
            ))}
          </div>
        </section>

        <section className="content-section">
          <div className="text-center">
            <h2 className="display-title mx-auto max-w-3xl text-4xl font-bold leading-tight text-ink">Three Steps From Call To Confirmed Help.</h2>
          </div>
          <div className="mt-8 divide-y divide-rule border-y border-rule">
            {["Explain what is happening", "Share your DFW location", "Confirm the next step"].map((title, index) => (
              <article key={title} className="flex items-center gap-5 py-6 sm:gap-8">
                <div className="photo-frame relative h-24 w-36 flex-none overflow-hidden sm:h-28 sm:w-48">
                  <Image
                    src={processImages[index] ?? processImages[0]}
                    alt={`${title} - PlumbingHands technician`}
                    fill
                    sizes="(min-width: 640px) 192px, 144px"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-2xl font-bold text-accent">{index + 1}</span>
                  <h3 className="text-xl font-black text-ink">{title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>


        <section className="content-section">
          <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <h2 className="display-title text-4xl font-bold text-ink">Emergency Plumbing Service Across DFW.</h2>
              <p className="mt-4 text-lg leading-8 text-ink-2">Choose your city to find emergency plumbing service for leaks, drains, sewers, toilets, pipes, and water heaters.</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-card border border-rule bg-paper-2 p-5"><p className="text-4xl font-black text-ink">{cities.length}</p><p className="mt-1 text-sm font-bold text-muted">DFW service areas</p></div>
                <div className="rounded-card border border-rule bg-paper-2 p-5"><p className="text-4xl font-black text-ink">{services.length}</p><p className="mt-1 text-sm font-bold text-muted">urgent plumbing services</p></div>
              </div>
              <Link href="/cities" className="mt-6 inline-flex items-center gap-2 font-black text-accent">Find service in your city</Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cities.slice(0, 12).map((city) => <Link key={city.slug} href={`/cities/${city.slug}`} className="premium-card flex items-center gap-3 p-4 font-black text-ink"><MapPin className="h-5 w-5 text-call" aria-hidden="true" />{city.name}</Link>)}
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2 className="display-title text-4xl font-bold text-ink">Know What Can Change The Scope.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {costGuides.map((guide, index) => (
              <Link key={guide.slug} href={`/cost-guides/${guide.slug}`} className="premium-card overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={getGridImage(index)}
                    alt={guide.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-ink">{guide.title}</h3>
                  <p className="mt-3 leading-7 text-ink-2">{guide.directAnswer}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="content-section">
          <h2 className="display-title text-4xl font-bold text-ink">Answers For The Moment Something Changes.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {problems.slice(0, 6).map((problem, index) => (
              <Link key={problem.slug} href={`/problems/${problem.slug}`} className="premium-card overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={getGridImage(index)}
                    alt={problem.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-ink">{problem.title}</h3>
                  <p className="mt-3 leading-7 text-ink-2">{problem.directAnswer}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="content-section">
          <h2 className="display-title text-4xl font-bold text-ink">DFW Plumbing Guides &amp; Local Data.</h2>
          <p className="mt-4 text-lg leading-8 text-ink-2">Sourced, in-depth guides on the plumbing issues that hit Dallas-Fort Worth homes hardest: from burst pipes and slab leaks to insurance coverage and water heater lifespan.</p>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {homeGuides.map((guide) => (
              <Link key={guide.href} href={guide.href} className="premium-card p-6">
                <h3 className="text-xl font-black leading-tight text-ink">{guide.title}</h3>
                <p className="mt-3 leading-7 text-ink-2">{guide.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-call">Read the guide</span>
              </Link>
            ))}
          </div>
        </section>

        <OfficialSources
          title="Official resources before you call an emergency plumber in Dallas"
          intro="Two minutes with these official sources can save money and stress: check the plumber's Texas license, know what your home policy usually covers, and know who to call when the break is on the city side of the meter."
          links={[sources.tsbpeLookup, sources.tdiBurstPipes, sources.dallasWater, sources.fortWorthWater]}
        />

        <FAQBlock faqs={faqs} title="Emergency plumber questions DFW homeowners ask" />
        <InternalLinks />

        <section className="content-section text-center">
          <h2 className="display-title mx-auto max-w-3xl text-4xl font-bold text-ink sm:text-5xl">Call Plumbing Hands And Get The Next Step Started.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink-2">Tell us the plumbing problem and your Dallas-Fort Worth location. The emergency line is ready for active leaks, backups, toilet, pipe, sewer, and water-heater service needs.</p>
          <div className="mt-7"><CallButton location="home-closing" label={`Call ${siteConfig.phoneDisplay}`} pagePath="/" pageType="homepage" city={siteConfig.marketName} /></div>
        </section>
      </div>
    </main>
  );
}


