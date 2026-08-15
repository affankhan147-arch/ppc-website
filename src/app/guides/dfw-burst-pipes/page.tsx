import Image from "next/image";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { InternalLinks } from "@/components/PageSections";
import { getArticleImage } from "@/lib/articleImages";

export const metadata = buildMetadata({
  title: "Burst Pipes in DFW: Causes, Costs & First Steps",
  description: truncateForMeta(
    "A research-backed guide to why burst pipes are common in Dallas-Fort Worth, what Winter Storm Uri showed, and the first steps that limit damage."
  ),
  path: "/guides/dfw-burst-pipes"
});

export default function BurstPipesGuidePage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "/guides/dfw-burst-pipes",
            "Burst Pipes in DFW: Why They Happen and What To Do First",
            "A research-backed guide to why burst pipes are common in Dallas-Fort Worth, what Winter Storm Uri showed, and the first steps that limit damage."
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: "Burst Pipes in DFW", path: "/guides/dfw-burst-pipes" }
          ])
        ]}
      />

      <div className="page-shell">
        <div className="premium-card max-w-4xl mx-auto">
          <div className="section-kicker">Research Guide</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Burst Pipes in DFW:<br />
            <span className="text-[#F0B429]">Why They Happen, What They Cost, and What To Do First</span>
          </h1>

          <div className="bg-[#0F1F1D] border-l-4 border-[#F0B429] p-5 mb-8 text-slate-300 text-sm">
            <p>This guide is for informational purposes only and does not constitute professional plumbing or insurance advice. Always consult a licensed professional and your insurance policy for your specific situation.</p>
          </div>

          <div className="photo-frame relative mt-2 mb-8 h-64 w-full overflow-hidden rounded-2xl sm:h-80">
            <Image
              src={getArticleImage("burst-pipe-emergency", 0)}
              alt="Burst pipe emergency response in a Dallas-Fort Worth home"
              fill
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 1: Why Burst Pipes Are More Common in DFW Than You'd Expect</h2>
            <p className="text-slate-300 mb-4">
              A burst pipe usually isn't a single dramatic event - it's the end of a two-step process. When water freezes inside a pipe, it expands by roughly nine percent, and that expansion builds pressure between the ice blockage and a closed fixture downstream. The pipe itself often doesn't split where the ice is; it splits at the weakest point in the run, and frequently the actual rupture only becomes visible once the ice thaws and pressurized water finds that weak point and starts spraying.
            </p>
            <p className="text-slate-300 mb-4">
              DFW homes carry a specific version of this risk that colder-climate cities don't. Homes here are generally not built to the same freeze-protection standards as homes in the northern United States, since sustained hard freezes are the exception rather than the rule. That means pipe runs through attics, garages, and exterior walls are often less insulated, and a single multi-day freeze event can catch an entire metro area's plumbing off guard at once - which is exactly what happened during Winter Storm Uri (see Section 2).
            </p>
            <p className="text-slate-300 mb-4">
              Freezing isn't the only cause. Water hammer - the pressure spike that happens when a valve or appliance shuts off suddenly - can crack a stressed fitting even in warm weather. High static water pressure from the municipal supply puts constant strain on older joints. And DFW's housing stock includes a meaningful share of homes with aging galvanized steel or polybutylene (PB) plastic pipe, both of which become more failure-prone with age; polybutylene in particular is a well-documented DFW-area risk factor covered in more depth in our <a href="/guides/dfw-polybutylene-pipe-replacement" className="text-[#F0B429] underline">polybutylene pipe guide</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 2: What Winter Storm Uri Showed About DFW's Real Risk</h2>
            <p className="text-slate-300 mb-4">
              February 2021's Winter Storm Uri is the clearest evidence that burst pipes aren't a rare, freak-occurrence problem for North Texas - they're a predictable outcome any time a hard, sustained freeze hits a region built for mild winters. A statewide survey of Texas residents found that 16 percent reported their pipes froze and burst during the storm, a share that - extrapolated across the state - points to roughly 1.2 million Texas homes affected. Eastern Texas, which includes the DFW metroplex, saw some of the most extreme temperature swings in the state, with drops of 40-plus degrees below seasonal average.
            </p>
            <p className="text-slate-300 mb-4">
              The insurance industry's own numbers tell the same story. One national insurer recorded just 75 frozen-pipe claims in Texas the year before the storm - and then received roughly 29,000 claims in the state in the ten days before February 22, 2021 alone. Individual incidents averaged an estimated $27,000 in damages, and total insured losses across the affected region were projected as high as $18 billion.
            </p>
            <p className="text-slate-300 mb-4">
              The takeaway for DFW homeowners isn't that another Uri-scale event is imminent - it's that the underlying vulnerability (homes and plumbing not built for sustained freezes) doesn't go away between storms. Any hard freeze that lasts more than a day or two puts the same exposed pipe runs at risk, just at a smaller scale than 2021.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 3: Is a Burst Pipe Covered by Homeowners Insurance in Texas?</h2>
            <p className="text-slate-300 mb-4">
              Most Texas homeowners policies do cover water damage from a burst or broken pipe, according to the Texas Department of Insurance - but "most" is doing real work in that sentence, and TDI is explicit that exceptions exist. The details of what's covered, what your deductible looks like, and whether gradual damage from a slow, undiscovered leak is treated differently than sudden pipe failure all depend on your specific policy, so it's worth reading the water-damage section of your policy before you need it, not after.
            </p>
            <p className="text-slate-300 mb-4">
              One important distinction TDI draws: a standard homeowners policy covers water damage from a broken pipe inside your home, but it does not cover flood damage - water that enters from outside, such as rising groundwater or storm runoff. Those require a separate flood insurance policy. A burst supply line under a sink is a plumbing claim; water that comes in through the foundation during a storm is a flood claim, and mixing the two up can mean a denied claim.
            </p>
            <p className="text-slate-300 mb-4">
              TDI also emphasizes a policyholder's duty to mitigate damage once a leak is discovered: turn off the water at the main shutoff and move valuable items off the floor and out of the affected area. An insurer can deny or reduce a claim if the policyholder doesn't take reasonable steps to protect the property once the problem is known - which makes the first-ten-minutes response in Section 4 matter for your claim, not just for the immediate damage. For the fuller picture on Texas plumbing insurance claims, including permit and documentation requirements, see our <a href="/guides/texas-insurance-plumbing-claims" className="text-[#F0B429] underline">Texas homeowners insurance and plumbing claims guide</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 4: What To Do in the First 10 Minutes</h2>
            <p className="text-slate-300 mb-4">
              The gap between a contained pipe failure and a flooded room usually comes down to how fast the water gets shut off, not how fast a plumber arrives. The sequence that limits damage:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li><strong>Shut off the main water valve immediately.</strong> Every DFW homeowner should know this location before an emergency happens - typically in a garage, utility closet, crawl space, or at the street-side meter box. If you don't know where yours is, find it today, not during the next freeze.</li>
              <li><strong>Turn off electricity to the affected area if it's safe to reach the breaker</strong> without stepping through standing water. Never touch a wet switch or outlet.</li>
              <li><strong>Open a low faucet after shutting the main off</strong> to relieve the remaining pressure trapped in the lines, which reduces how much more water sprays out before the plumbing empties.</li>
              <li><strong>Photograph the damage before you start cleanup</strong> - your insurer will want documentation of the original extent, and TDI's mitigation guidance doesn't mean you have to clean everything up before help arrives, just that you should stop the water and protect what you can.</li>
              <li><strong>Call for emergency service.</strong> See our <a href="/services/burst-pipe-emergency" className="text-[#F0B429] underline">burst pipe emergency service page</a> for what to expect from a same-day response, and our <a href="/cost-guides/burst-pipe-emergency-cost-guide" className="text-[#F0B429] underline">burst pipe cost guide</a> for realistic pricing factors before you approve any repair.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Section 5: Preventing the Next One</h2>
            <p className="text-slate-300 mb-4">
              Most freeze-related pipe failures are preventable with a handful of low-cost habits ahead of the next hard freeze warning:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li><strong>Insulate exposed pipe runs</strong> in attics, garages, and exterior walls - the same areas that lack the freeze protection built into colder-climate homes.</li>
              <li><strong>Let faucets drip during a hard freeze</strong> on any line that has failed before or runs through an exposed space; moving water is far less likely to freeze solid.</li>
              <li><strong>Disconnect garden hoses and cover exterior spigots</strong> before the first freeze warning of the season.</li>
              <li><strong>Confirm you know your main shutoff location</strong> - this is the single highest-leverage piece of freeze prep, since it's what limits every other failure once it happens.</li>
              <li><strong>If your home still has galvanized or polybutylene supply lines,</strong> treat proactive replacement as a real option rather than waiting for a failure - both materials become significantly more failure-prone with age, and a planned replacement is dramatically cheaper than an emergency one plus water damage cleanup.</li>
            </ul>
            <p className="text-slate-400 text-sm mt-4">
              <strong>Sources:</strong> Groundworks Texas frozen pipe survey (Winter Storm Uri, February 2021); Texas Department of Insurance guidance on water damage and burst pipe coverage.
            </p>
          </section>

          <div className="mt-12 pt-6 border-t border-[#1A3A38] text-slate-400 text-sm">
            <p><strong>Have a plumbing emergency?</strong> Call PlumbingHands - DFW's trusted emergency plumber, available 24/7.</p>
          </div>

          <div className="mt-10">
            <InternalLinks
              extra={[
                { label: "Burst Pipe Emergency Service", href: "/services/burst-pipe-emergency" },
                { label: "Burst Pipe Emergency Cost Guide", href: "/cost-guides/burst-pipe-emergency-cost-guide" },
                { label: "Polybutylene Pipe in DFW", href: "/guides/dfw-polybutylene-pipe-replacement" },
                { label: "Texas Homeowners Insurance & Plumbing Claims Guide", href: "/guides/texas-insurance-plumbing-claims" },
                { label: "DFW Plumbing Emergency Data Report", href: "/guides/dfw-plumbing-data" },
                { label: "Free DFW Data Badges (Embeddable)", href: "/tools/dfw-data-badges" },
                { label: "Free DFW Freeze Watch Widget (Live)", href: "/tools/freeze-watch-widget" }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
