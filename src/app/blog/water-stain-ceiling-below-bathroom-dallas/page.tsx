import Link from "next/link";
import { AlertTriangle, PhoneCall } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { DirectAnswer, InternalLinks } from "@/components/PageSections";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, articleSchema, breadcrumbSchema, webPageSchema } from "@/lib/schema";

const path = "/blog/water-stain-ceiling-below-bathroom-dallas";
const title = "Water Stain on the Ceiling Below a Bathroom in Dallas: What It Could Mean";
const description =
  "See what can cause a water stain on the ceiling below a bathroom in Dallas, how to narrow down the source, and when it is a real emergency.";

export const metadata = buildMetadata({ title: "Water Stain Below Bathroom in Dallas: Causes and Next Steps", description, path });

export default function WaterStainBelowBathroomPage() {
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
        <p className="section-kicker">Dallas ceiling-leak guide</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950">{title}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A water stain on the ceiling below a bathroom usually starts small—a faint yellow or brown mark that looks
          dry and stays the same size for days. It is easy to write off.
        </p>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Then someone showers, flushes, or fills the tub, and the stain gets noticeably darker. That timing is the
          clue. A stain below a bathroom often traces back to a plumbing leak, failed fixture seal, or waterproofing
          problem above it. The source can be small, but water may travel through flooring, insulation, and framing
          before it becomes visible—which is why the stain and the actual leak are not always in the same place.
        </p>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          For Dallas homeowners, catching the source early can mean the difference between a limited repair and a
          ceiling that has to be opened more extensively.
        </p>

        <div className="mt-7">
          <DirectAnswer>
            A ceiling stain below a bathroom can come from a toilet seal, shower or tub drain, sink connection,
            waterproofing failure, or hidden supply pipe. Notice which fixture use makes the stain change, and treat
            active dripping, sagging drywall, or moisture near electrical equipment as urgent.
          </DirectAnswer>
        </div>

        <section className="content-section">
          <p className="section-kicker">Common causes</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">What usually causes a water stain below a bathroom?</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "A leaking toilet seal or supply connection",
              "A damaged shower drain or enclosure",
              "A leaking bathtub drain or overflow",
              "Loose plumbing connections under a sink",
              "A hidden water-supply pipe leak",
              "Failed caulk or waterproofing around the shower",
              "Condensation from plumbing or poor ventilation"
            ].map((item) => (
              <li key={item} className="rounded-md border border-slate-200 bg-white p-4 font-semibold leading-6 text-slate-800">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 leading-7 text-slate-700">
            The stain&apos;s location is a starting point, not a diagnosis. Water can move sideways along pipes and joists
            before it soaks through the ceiling.
          </p>
        </section>

        <section className="content-section">
          <p className="section-kicker">Toilet clues</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Is the toilet causing the ceiling stain?</h2>
          <p className="mt-3 leading-7 text-slate-700">
            Toilets can leak without leaving a puddle on the bathroom floor. The wax seal underneath can fail and let
            small amounts of water escape with every flush. The leak can also come from the supply line, shutoff valve,
            tank bolts, or the connection between the tank and bowl.
          </p>
          <p className="mt-3 leading-7 text-slate-700">
            The clearest clue is timing: if the stain darkens specifically after a flush, that toilet becomes a likely
            source. Other signs include a toilet that rocks slightly, flooring around the base that feels soft, or a
            musty smell that has settled into the room.
          </p>
          <p className="mt-3 leading-7 text-slate-700">
            If a toilet repeatedly needs tightening, do not keep tightening it without finding out why. Movement can
            damage the seal and may point to a flange or subfloor problem. If the stain changes after flushing, stop
            using that toilet until it is checked.
          </p>
          <Link href="/services/toilet-overflow-emergency" className="mt-4 inline-flex font-black text-cyan-700 hover:text-cyan-900">
            Review urgent toilet problems
          </Link>
        </section>

        <section className="content-section">
          <p className="section-kicker">Shower clues</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Could the shower be leaking through the ceiling?</h2>
          <p className="mt-3 leading-7 text-slate-700">
            Showers can fail at more points than most people expect: a loose drain connection, cracked grout, leaking
            valve, damaged pan beneath the tile, or water escaping around a door or curtain that no longer seals.
          </p>
          <p className="mt-3 leading-7 text-slate-700">
            Pay attention to when the stain reacts. If it darkens only while the shower is running, the drain, valve,
            or a supply line behind the wall may be involved. If it worsens after water splashes around the enclosure,
            failed caulk or a door seal becomes more likely.
          </p>
          <p className="mt-3 leading-7 text-slate-700">
            Fresh caulk is not a cure-all. It can repair a surface joint, but it will not fix a damaged shower pan or a
            leaking drain connection hidden below the tile.
          </p>
        </section>

        <section className="content-section">
          <p className="section-kicker">Bathtub clues</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Why does the ceiling stain appear after a bath?</h2>
          <p className="mt-3 leading-7 text-slate-700">
            A bathtub has several possible leak points: the drain, overflow assembly, faucet connections, supply pipes,
            and the seam where the tub meets the wall.
          </p>
          <p className="mt-3 leading-7 text-slate-700">
            The overflow is easy to miss. If the ceiling reacts only when the tub is filled deeply, the overflow gasket
            becomes a strong suspect. If the stain appears after the tub drains, look more closely at the drain
            connection or the seal along the tub&apos;s edge. Notice whether filling, sitting full, or draining triggers the
            change; that timing can narrow the possibilities considerably.
          </p>
        </section>

        <section className="content-section">
          <p className="section-kicker">Sink clues</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Could a bathroom sink be the source?</h2>
          <p className="mt-3 leading-7 text-slate-700">
            Yes. Sink leaks can collect inside the vanity before reaching the floor or ceiling below. By the time a
            stain appears downstairs, the cabinet may have been damp for a while.
          </p>
          <p className="mt-3 leading-7 text-slate-700">
            Run a dry paper towel along the visible connections and the bottom of the cabinet. Moisture often shows on
            paper before it is easy to see. Swollen cabinet material, rust on fittings, or a musty smell inside the
            vanity suggest the leak has been present longer than it appears. Leave stored items out until the source is
            found and the cabinet is actually dry.
          </p>
        </section>

        <section className="content-section">
          <p className="section-kicker">Hidden supply leak</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Could a hidden pipe leak without any fixture being used?</h2>
          <p className="mt-3 leading-7 text-slate-700">
            Not every stain is tied to a fixture. A pressurized supply pipe inside the wall or ceiling can leak
            continuously, whether anyone is using the bathroom or not. That makes it especially important to address,
            because the water does not stop between fixture uses.
          </p>
          <p className="mt-3 leading-7 text-slate-700">
            Take it seriously if the stain grows throughout the day, the ceiling stays damp, you hear water moving
            while everything is off, household pressure has dropped, or the water bill changes without an obvious
            reason. Bubbling paint or softening drywall adds to the concern.
          </p>
          <p className="mt-3 leading-7 text-slate-700">
            If water is actively dripping or spreading quickly, locate the home&apos;s main shutoff valve—but operate it
            only if it is safe to reach.
          </p>
        </section>

        <section className="content-section">
          <p className="section-kicker">Tracing the source</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Why is the leak not directly above the stain?</h2>
          <p className="mt-3 leading-7 text-slate-700">
            Water does not always fall straight down. It may follow a pipe, floor joist, sloped subfloor, or cable before
            soaking into drywall. The visible stain can be several feet from the actual failure.
          </p>
          <p className="mt-3 leading-7 text-slate-700">
            That is why cutting into the center of the stain does not guarantee access to the source. Diagnosis needs
            to account for the bathroom layout and the path water could realistically follow. The stain proves that
            moisture reached the ceiling; it is not a map to the failed component.
          </p>
        </section>

        <section className="content-section">
          <p className="section-kicker">Intermittent leak</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">A dry ceiling stain may not mean the problem is solved</h2>
          <p className="mt-3 leading-7 text-slate-700">
            A stain that stops growing might mean the leak is gone. It might also be intermittent—active only during a
            long shower, deep bath, particular flush, or when a connection shifts under use.
          </p>
          <p className="mt-3 leading-7 text-slate-700">
            Lightly mark the stain&apos;s edge in pencil and note the date. If discoloration moves beyond the line, water is
            still getting in. Do not repaint until the source is corrected and the material has dried; paint can hide
            the next warning along with the old one.
          </p>
        </section>

        <section className="content-section rounded-md border border-orange-200 bg-orange-50 p-6">
          <div className="flex items-center gap-2 text-orange-700">
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            <p className="text-sm font-black uppercase">Emergency warning signs</p>
          </div>
          <h2 className="mt-3 text-2xl font-black text-slate-950">When does a ceiling leak become an emergency?</h2>
          <p className="mt-3 leading-7 text-slate-700">
            Request urgent help when water is dripping through the ceiling, the stain is expanding quickly, the
            ceiling is sagging or bulging, or moisture is near a light fixture, outlet, or wiring. A soft bathroom floor,
            leak you cannot stop, contaminated water, or damage spreading into several rooms also needs prompt
            attention.
          </p>
          <p className="mt-3 leading-7 text-slate-700">
            Water-soaked drywall becomes heavy and can fail with little warning. Keep people away from any sagging
            section, and do not touch wet areas or nearby switches when electrical equipment may be involved.
          </p>
        </section>

        <section className="content-section">
          <p className="section-kicker">While you wait</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">What should you do while waiting for help?</h2>
          <p className="mt-3 leading-7 text-slate-700">
            If it is safe, stop using the fixture you suspect, move valuables away from the affected ceiling, and set a
            container under active dripping. Photograph the stain and note whether it changes after particular fixture
            use; that record can help with diagnosis. Locate the main shutoff in case the leak gets worse, and stay
            away from sagging drywall or wet electrical areas.
          </p>
          <p className="mt-3 leading-7 text-slate-700">
            Do not open the ceiling unless you understand what may be behind it. Cutting blindly into drywall can hit a
            pipe or wire and may expose you to wet insulation or contaminated water.
          </p>
        </section>

        <section className="content-section">
          <p className="section-kicker">Provider scope</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Plumber first, or a restoration company?</h2>
          <p className="mt-3 leading-7 text-slate-700">
            A plumber typically identifies and stops the water source. Drywall, insulation, flooring, and mold-related
            work may be a separate scope handled by another provider.
          </p>
          <p className="mt-3 leading-7 text-slate-700">
            Before work begins, ask what they believe is leaking and how confident they are. Confirm whether water must
            be shut off, whether the visit covers diagnosis or repair, what needs to be opened, and whether cleanup is
            included. Clear scope helps reduce surprise costs later.
          </p>
        </section>

        <section className="content-section">
          <p className="section-kicker">Do not wait</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Do not ignore a water stain below the bathroom</h2>
          <p className="mt-3 leading-7 text-slate-700">
            A ceiling stain can come from something as limited as a loose sink connection. It can also be the first
            visible sign of a leaking pipe, failed toilet seal, or shower that has leaked quietly for months. What
            matters is whether moisture is still getting in.
          </p>
          <p className="mt-3 leading-7 text-slate-700">
            Watch for changes, stop using the fixture you suspect, and request help before the damage spreads or
            reaches electrical equipment.
          </p>
        </section>

        <section className="content-section rounded-md border border-cyan-200 bg-cyan-50 p-6">
          <PhoneCall className="h-7 w-7 text-cyan-800" aria-hidden="true" />
          <h2 className="mt-3 text-2xl font-black text-slate-950">Need help with a ceiling leak in Dallas?</h2>
          <p className="mt-3 leading-7 text-slate-700">
            If a water stain has appeared below your bathroom, Plumbing Hands can help you request assistance from
            available plumbing professionals serving Dallas and surrounding Dallas–Fort Worth communities.
          </p>
          <div className="mt-5">
            <CallButton
              location="blog-water-stain-bathroom-dallas-bottom"
              label="Request Plumbing Help"
              pagePath={path}
              pageType="blog"
              service="Ceiling leak diagnosis"
              city="Dallas"
            />
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            {siteConfig.disclosure} Availability, timing, pricing, credentials, diagnosis, and repair scope should be
            confirmed directly with the provider before work begins.
          </p>
        </section>
      </article>

      <InternalLinks
        extra={[
          { label: "Dallas plumbing help", href: "/cities/dallas" },
          { label: "24-hour emergency plumber", href: "/services/24-hour-emergency-plumber" },
          { label: "Burst-pipe emergency", href: "/services/burst-pipe-emergency" },
          { label: "Water shutoff valve will not close", href: "/problems/water-shutoff-valve-will-not-close" }
        ]}
      />
    </main>
  );
}
