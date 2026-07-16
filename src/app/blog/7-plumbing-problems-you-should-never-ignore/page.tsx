import Link from "next/link";
import { AlertTriangle, CheckCircle2, Droplets, PhoneCall } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { DirectAnswer, InternalLinks } from "@/components/PageSections";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, articleSchema, breadcrumbSchema, webPageSchema } from "@/lib/schema";

const path = "/blog/7-plumbing-problems-you-should-never-ignore";
const title = "7 Plumbing Problems You Should Never Ignore";
const description =
  "From dripping faucets to sewage smells, learn seven plumbing warning signs homeowners should not ignore and when to request emergency help.";

export const metadata = buildMetadata({
  title,
  description,
  path
});

const emergencySigns = [
  "A burst pipe or a leak that is spreading quickly",
  "Water pooling or moving through the house",
  "Sewage backing up into a sink, tub, or toilet",
  "No usable water supply",
  "A toilet that will not stop overflowing",
  "A water heater that may be leaking",
  "Any plumbing problem near electrical outlets or wiring"
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
        <p className="section-kicker">Home plumbing guidance</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950">{title}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Nobody wakes up excited to deal with plumbing. A slow drain or a faucet that will not quite shut off is easy
          to leave for next weekend. Then next weekend becomes next month, and suddenly there is water-stained drywall
          or a repair bill that could have been smaller.
        </p>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Plumbing problems almost never fix themselves, and they rarely stay small. A hidden leak can still cause
          damage. A quietly running toilet can still waste water. These seven warning signs are worth noticing early.
        </p>

        <div className="mt-7">
          <DirectAnswer>
            Dripping faucets, slow drains, weak water pressure, running toilets, unexplained dampness, unusual pipe
            noises, and sewer odors can all point to problems that become more expensive when ignored.
          </DirectAnswer>
        </div>

        <section className="content-section">
          <p className="section-kicker">Warning sign 1</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">A faucet that will not stop dripping</h2>
          <p className="mt-3 leading-7 text-slate-700">
            That steady drip is more than an annoyance. It usually means a washer, cartridge, seal, or another part
            inside the fixture has worn out. Depending on the faucet, the solution may be a small repair or a
            replacement.
          </p>
          <p className="mt-3 leading-7 text-slate-700">
            A single drip can waste more water than it appears to, especially over several weeks. If corrosion or
            excessive pressure is contributing to the problem, waiting can allow it to get worse.
          </p>
        </section>

        <section className="content-section">
          <p className="section-kicker">Warning sign 2</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Drains that take too long to empty</h2>
          <p className="mt-3 leading-7 text-slate-700">
            A sluggish drain is often the early stage of a complete blockage. Kitchen drains collect grease and food
            debris, while bathroom drains commonly collect hair, soap residue, and personal-care products.
          </p>
          <p className="mt-3 leading-7 text-slate-700">
            Chemical drain cleaners may create a temporary opening without removing the full obstruction, and some
            products can be hard on older pipes. When several drains slow down together, the restriction may be
            farther down the system or in the main sewer line.
          </p>
          <Link
            href="/services/emergency-drain-cleaning"
            className="mt-4 inline-flex items-center gap-2 font-black text-cyan-700 hover:text-cyan-900"
          >
            Review emergency drain-cleaning options
          </Link>
        </section>

        <section className="content-section">
          <p className="section-kicker">Warning sign 3</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Water pressure that has become weak</h2>
          <p className="mt-3 leading-7 text-slate-700">
            Weak pressure turns ordinary jobs into chores. If the problem affects only one faucet, the aerator may
            need cleaning or replacement. Whole-house pressure loss deserves a closer look.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Mineral buildup at a fixture",
              "A shutoff valve that is not fully open",
              "A failing pressure regulator",
              "Corrosion inside older pipes",
              "A leak that is not yet visible",
              "A municipal supply issue"
            ].map((item) => (
              <li key={item} className="flex gap-2 rounded-md border border-slate-200 bg-white p-4 font-semibold text-slate-800">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="content-section">
          <p className="section-kicker">Warning sign 4</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">A toilet that keeps running</h2>
          <p className="mt-3 leading-7 text-slate-700">
            A running toilet is easy to miss because the fixture may still flush normally. Meanwhile, water continues
            moving from the tank to the bowl. A worn flapper, misadjusted float, or failing fill valve is often
            responsible.
          </p>
          <p className="mt-3 leading-7 text-slate-700">
            Simple adjustments can help, but repeated guesswork may leave the same problem running for weeks. If the
            toilet will not stop filling or begins to overflow, close its supply valve if it is safe to do so.
          </p>
        </section>

        <section className="content-section">
          <p className="section-kicker">Warning sign 5</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Water stains or dampness you cannot explain</h2>
          <p className="mt-3 leading-7 text-slate-700">
            A discolored ceiling patch, peeling paint, musty odor, warped flooring, or damp cabinet should not be
            dismissed as cosmetic. These are common signs of water escaping somewhere out of view.
          </p>
          <p className="mt-3 leading-7 text-slate-700">
            Water can travel before it becomes visible, so the leak may not be directly behind the stain. Hidden
            moisture can encourage mold and weaken building materials. The earlier the source is located, the smaller
            the surrounding repair may be.
          </p>
        </section>

        <section className="content-section">
          <p className="section-kicker">Warning sign 6</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Strange noises coming from the pipes</h2>
          <p className="mt-3 leading-7 text-slate-700">
            A loud bang after a faucet closes may be water hammer. Whistling may point to restricted flow or excessive
            pressure. Gurgling from a drain can indicate a developing blockage or a venting problem.
          </p>
          <p className="mt-3 leading-7 text-slate-700">
            These sounds do not always mean an emergency, but they do mean something has changed. Investigating the
            cause early can help prevent pipe movement, repeated backups, or fixture damage.
          </p>
        </section>

        <section className="content-section">
          <p className="section-kicker">Warning sign 7</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">A sewage smell in or around the house</h2>
          <p className="mt-3 leading-7 text-slate-700">
            A sewer-like odor can come from a dry drain trap, a failing toilet seal, a blocked plumbing vent, or a
            damaged sewer pipe. Running water into a rarely used drain may refill a dry trap. If the odor returns or
            does not go away, the system should be inspected.
          </p>
          <p className="mt-3 leading-7 text-slate-700">
            Persistent sewer odors are not something to cover with air freshener. Keep people away from any wastewater
            and reduce water use if several fixtures are also gurgling or backing up.
          </p>
          <Link
            href="/services/sewer-backup-help"
            className="mt-4 inline-flex items-center gap-2 font-black text-cyan-700 hover:text-cyan-900"
          >
            Review sewer-backup warning signs
          </Link>
        </section>

        <section className="content-section rounded-md border border-orange-200 bg-orange-50 p-6">
          <div className="flex items-center gap-2 text-orange-700">
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            <p className="text-sm font-black uppercase">When it is an emergency</p>
          </div>
          <h2 className="mt-3 text-2xl font-black text-slate-950">Some plumbing problems should not wait</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {emergencySigns.map((sign) => (
              <li key={sign} className="flex gap-2 font-semibold leading-6 text-slate-800">
                <Droplets className="mt-0.5 h-5 w-5 flex-none text-orange-600" aria-hidden="true" />
                {sign}
              </li>
            ))}
          </ul>
          <p className="mt-4 leading-7 text-slate-700">
            If it is safe, close the affected fixture valve or the home&apos;s main water shutoff while requesting
            help. Stay away from standing water near electrical equipment.
          </p>
        </section>

        <section className="content-section">
          <p className="section-kicker">Early action</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Small plumbing problems are usually cheaper to address early</h2>
          <p className="mt-3 leading-7 text-slate-700">
            Many expensive plumbing repairs begin with a small sign that was easy to postpone. Paying attention to a
            drip, slow drain, unusual smell, or unexplained stain can help protect the home and make the eventual
            repair more manageable.
          </p>
        </section>

        <section className="content-section rounded-md border border-cyan-200 bg-cyan-50 p-6">
          <PhoneCall className="h-7 w-7 text-cyan-800" aria-hidden="true" />
          <h2 className="mt-3 text-2xl font-black text-slate-950">Need plumbing help?</h2>
          <p className="mt-3 leading-7 text-slate-700">
            Request help for a stubborn leak, clogged drain, running toilet, low pressure, sewer odor, or another
            plumbing concern. {siteConfig.serviceStatement}
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
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Provider availability, timing, pricing, credentials, and repair scope should be confirmed directly before
            work begins.
          </p>
        </section>
      </article>

      <InternalLinks
        extra={[
          { label: "Emergency plumbing guide hub", href: "/blog" },
          { label: "24-hour emergency plumber", href: "/services/24-hour-emergency-plumber" },
          { label: "Emergency drain cleaning", href: "/services/emergency-drain-cleaning" },
          { label: "Dallas plumbing help", href: "/cities/dallas" }
        ]}
      />
    </main>
  );
}
