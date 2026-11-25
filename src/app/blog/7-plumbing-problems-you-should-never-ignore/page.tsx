import Link from "next/link";
import Image from "next/image";
import { AlertTriangle, Droplets, PhoneCall } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { DirectAnswer, InternalLinks, OfficialSources } from "@/components/PageSections";
import { getTopicSources, sourcesHeading } from "@/data/externalSources";
import { getArticleImage } from "@/lib/articleImages";
import { siteConfig } from "@/data/site";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, articleSchema, breadcrumbSchema, webPageSchema, Byline } from "@/lib/schema";

const path = "/blog/7-plumbing-problems-you-should-never-ignore";
const title = "7 Plumbing Problems DFW Homeowners Should Never Ignore";
const description =
  "From dripping faucets to sewer odors, learn seven plumbing warning signs Dallas–Fort Worth homeowners should not ignore and when to request urgent help.";

export const metadata = buildMetadata({ title, description: truncateForMeta(description), path });

const emergencySigns = [
  "A burst or actively leaking pipe",
  "Water spreading through a wall, ceiling, or floor",
  "Sewage backing up into the home",
  "A toilet that will not stop overflowing",
  "No usable water supply",
  "A leaking water heater",
  "Water near electrical outlets or equipment"
];

export default function PlumbingProblemsArticlePage() {
  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema(path, title, description),
          articleSchema(path, title, description),
          breadcrumbSchema([
            { name: "Guides", path: "/blog" },
            { name: title, path }
          ])
        ]}
      />

      <Breadcrumbs
        items={[
          { label: "Guides", href: "/blog" },
          { label: title, href: path }
        ]}
      />

      <article className="mt-6 max-w-4xl">
        <h1 className="display-title mt-3 text-4xl font-bold leading-tight text-ink">{title}</h1>
          <Byline path="/blog/7-plumbing-problems-you-should-never-ignore" />
        <p className="lead mt-5 text-ink-2">
          Most plumbing emergencies do not start with water pouring through the ceiling. They start small—a sink that
          drains a little slower than usual, a toilet that runs when nobody has touched it, or a faint stain below the
          upstairs bathroom.
        </p>
        <p className="mt-4 text-lg leading-8 text-ink-2">
          It is easy to leave these things for another day. Sometimes that is fine. Other times, the small symptom is
          the only warning you get before the repair becomes far more disruptive. For Dallas–Fort Worth homeowners,
          these seven plumbing warning signs are worth taking seriously.
        </p>

        <div className="photo-frame relative mt-6 h-64 w-full overflow-hidden sm:h-80">
          <Image
            src={getArticleImage("24-hour-emergency-plumber", 4)}
            alt="Plumber checking a DFW home for the plumbing problems homeowners should never ignore"
            fill
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-7">
          <DirectAnswer>
            Multiple slow drains, whole-house pressure loss, unexplained moisture, sewer odors, and active leaks can
            point to plumbing problems that should be checked before they spread or affect essential fixtures.
          </DirectAnswer>
        </div>

        <section className="content-section">
          <h2 className="text-2xl font-bold text-ink">The faucet keeps dripping</h2>
          <p className="mt-3 leading-7 text-ink-2">
            A dripping faucet is easy to tune out, especially when the sink still works normally. Inside the fixture,
            though, a washer, seal, cartridge, or valve has probably stopped sealing properly. Left alone, the drip
            can get worse, and water may begin collecting around the base or underneath the sink.
          </p>
          <p className="mt-3 leading-7 text-ink-2">
            Not every drip means a new faucet. Often, one worn component is responsible. Pay closer attention when the
            handle becomes harder to turn, the cabinet feels damp, or several fixtures begin dripping at once. If
            multiple faucets are affected, household water pressure may be part of the problem.
          </p>
        </section>

        <section className="content-section">
          <h2 className="text-2xl font-bold text-ink">Several drains are slowing down</h2>
          <p className="mt-3 leading-7 text-ink-2">
            One slow bathroom drain usually points to hair and soap near the fixture. A sluggish kitchen sink is often
            grease or food debris. When multiple drains slow down around the same time, the restriction may be shared
            or located farther down in the main sewer line.
          </p>
          <p className="mt-3 leading-7 text-ink-2">
            Notice whether the fixtures seem connected. Does the toilet gurgle when the tub drains? Does the shower
            back up while the washing machine runs? Repeated chemical cleaners may create a narrow opening without
            clearing the entire blockage. If more than one drain is involved, reduce water use and request guidance
            before it becomes a complete backup.
          </p>
          <Link
            href="/services/emergency-drain-cleaning"
            className="mt-4 inline-flex font-bold text-accent"
          >
            Review emergency drain-cleaning options
          </Link>
        </section>

        <section className="content-section">
          <h2 className="text-2xl font-bold text-ink">Water pressure drops throughout the house</h2>
          <p className="mt-3 leading-7 text-ink-2">
            Weak pressure at one faucet may be a clogged aerator. A sudden drop throughout the house deserves more
            attention. Possible causes include a partially closed shutoff valve, a failing pressure regulator,
            corroded pipes, municipal work, or a leak that has not become visible yet.
          </p>
          <p className="mt-3 leading-7 text-ink-2">
            Check whether every fixture is affected and whether both hot and cold water are weak. Damp walls,
            unusually soft ground outside, or unexplained water use can support the possibility of a hidden supply
            leak.
          </p>
        </section>

        <section className="content-section">
          <h2 className="text-2xl font-bold text-ink">The toilet keeps running</h2>
          <p className="mt-3 leading-7 text-ink-2">
            A running toilet does not look urgent because it may still flush normally. That is exactly why the problem
            can continue for weeks. A worn flapper, misadjusted float, or failing fill valve is often responsible.
          </p>
          <p className="mt-3 leading-7 text-ink-2">
            If you hear the tank refill when nobody has used it, something is no longer sealing correctly. A new
            flapper may help, but if it does not, the cause is probably elsewhere in the mechanism. If water rises
            toward the rim, stop flushing and close the toilet supply valve if it is safe to reach.
          </p>
        </section>

        <section className="content-section">
          <h2 className="text-2xl font-bold text-ink">A water stain appears below the bathroom</h2>
          <p className="mt-3 leading-7 text-ink-2">
            A ceiling stain is not merely cosmetic until you know where the water came from. The source could be a
            leaking supply connection, failed toilet seal, bathtub overflow, drain connection, or damaged shower
            waterproofing.
          </p>
          <p className="mt-3 leading-7 text-ink-2">
            Water can travel along pipes and framing, so the mark may not sit directly below the leak. Peeling paint,
            soft drywall, a musty odor, or a stain that grows after someone showers all deserve attention. A growing
            patch or moisture near a light fixture should be handled promptly.
          </p>
        </section>

        <section className="content-section">
          <h2 className="text-2xl font-bold text-ink">The pipes bang, whistle, or gurgle</h2>
          <p className="mt-3 leading-7 text-ink-2">
            Some plumbing noise is normal, but a new or repeated sound usually means something has changed. A bang
            after closing a faucet may be water hammer. Whistling can point to restricted flow or high pressure.
            Gurgling from a drain or toilet may indicate a developing clog or venting problem.
          </p>
          <p className="mt-3 leading-7 text-ink-2">
            Notice the pattern. Does the sound happen whenever the washing machine fills, or when someone uses the
            shower? That timing often provides more useful diagnostic information than the sound alone.
          </p>
        </section>

        <section className="content-section">
          <h2 className="text-2xl font-bold text-ink">The bathroom smells like sewage</h2>
          <p className="mt-3 leading-7 text-ink-2">
            Sometimes the cause is simple: an unused drain can dry out at the trap and allow sewer odor into the room.
            Run water into any rarely used sink, tub, shower, or floor drain. If the smell disappears and stays away,
            the dry trap was probably the cause.
          </p>
          <p className="mt-3 leading-7 text-ink-2">
            If the odor returns, a damaged toilet seal, blocked vent, drain buildup, or sewer-line problem may be
            involved. A rocking toilet, regularly gurgling drains, wastewater, or an overflowing outdoor cleanout all
            point to something beyond a dry trap.
          </p>
          <Link
            href="/services/sewer-backup-help"
            className="mt-4 inline-flex font-bold text-accent"
          >
            Review sewer-backup warning signs
          </Link>
        </section>

        <section className="content-section">
          <div className="flex items-center gap-2 text-accent">
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            <p className="text-sm font-bold text-accent">When it is an emergency</p>
          </div>
          <h2 className="text-2xl font-bold text-ink">Some plumbing problems need urgent attention</h2>
          <p className="mt-3 leading-7 text-ink-2">
            The situation becomes urgent when there is a real risk of property damage, sewage exposure, electrical
            danger, or complete loss of usable water service.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {emergencySigns.map((sign) => (
              <li key={sign} className="flex gap-2 font-semibold leading-6 text-ink-2">
                <Droplets className="mt-0.5 h-5 w-5 flex-none text-accent" aria-hidden="true" />
                {sign}
              </li>
            ))}
          </ul>
          <p className="mt-4 leading-7 text-ink-2">
            If you can reach the correct valve safely, shut off the affected fixture or the home&apos;s main water
            supply. Stay clear of standing water near electrical equipment.
          </p>
        </section>

        <section className="content-section">
          <h2 className="text-2xl font-bold text-ink">Can you fix the plumbing problem yourself?</h2>
          <p className="mt-3 leading-7 text-ink-2">
            Cleaning an aerator, refilling a dry trap, or making a small toilet adjustment may be reasonable for some
            homeowners. Request professional help when you cannot identify the source, the problem keeps returning,
            several fixtures are affected, water damage is spreading, sewage is present, or the issue is hidden behind
            a wall or floor.
          </p>
        </section>

        <section className="content-section">
          <h2 className="text-2xl font-bold text-ink">Small warning signs are worth acting on</h2>
          <p className="mt-3 leading-7 text-ink-2">
            A slow drain does not always become a sewer backup, and a dripping faucet does not always signal a larger
            pressure problem. Still, plumbing systems often give some warning before they fail outright. Catching the
            change early usually means more time to compare options and less disruption to the home.
          </p>
        </section>

        <section className="content-section">
          <PhoneCall className="h-7 w-7 text-accent" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-ink">Need plumbing help in Dallas–Fort Worth?</h2>
          <p className="mt-3 leading-7 text-ink-2">
            Whether it is a stubborn leak, several slow drains, a running toilet, or something you cannot quite
            explain, Plumbing Hands can help you request assistance. {siteConfig.serviceStatement}
          </p>
          <div className="mt-5">
            <CallButton
              location="blog-seven-plumbing-problems-bottom"
              label="Request Plumbing Help"
              pagePath={path}
              pageType="blog"
              service="Emergency plumbing"
              city={siteConfig.marketName}
            />
          </div>
          <p className="mt-4 text-sm leading-6 text-ink-2">
            Provider availability, timing, pricing, credentials, and repair scope should be confirmed directly before
            work begins.
          </p>
        </section>
      </article>

      <OfficialSources
        title={sourcesHeading(title)}
        intro="These official sources back up the guidance above. Use them to check a plumber's Texas license, see what a typical Texas home policy covers, or read more on the problem before you approve work."
        links={getTopicSources(`${title} leak sewer drain water heater`)}
      />
      <InternalLinks
        extra={[
          { label: "Emergency plumbing guide hub", href: "/blog" },
          { label: "24-hour emergency plumber", href: "/services/24-hour-emergency-plumber" },
          { label: "Emergency drain cleaning", href: "/services/emergency-drain-cleaning" },
          { label: "Dallas plumbing help", href: "/cities/dallas" },
          { label: "Fort Worth plumbing help", href: "/cities/fort-worth" }
        ]}
      />
    </main>
  );
}
