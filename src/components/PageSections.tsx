import Link from "next/link";
import type { ReactNode } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, HelpCircle, MapPin, WalletCards } from "lucide-react";
import { FAQ } from "@/data/faqs";
import { internalLinkGroups } from "@/data/internalLinks";
import type { PageEnhancement } from "@/data/pageEnhancements";
import { siteConfig } from "@/data/site";

export function DirectAnswer({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-emerald-200 bg-emerald-50/90 p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.1em] text-emerald-800">Quick answer</p>
      <div className="mt-2 text-lg font-semibold leading-7 text-slate-950">{children}</div>
    </section>
  );
}

export function EmergencySteps({ steps }: { steps: string[] }) {
  return (
    <section className="content-section">
      <div className="section-kicker"><AlertTriangle className="h-4 w-4" aria-hidden="true" /> What to do now</div>
      <ol className="mt-5 grid gap-4 md:grid-cols-2">
        {steps.map((step, index) => (
          <li key={step} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-black uppercase tracking-[0.08em] text-emerald-700">Step {index + 1}</span>
            <p className="mt-2 font-semibold leading-7 text-slate-900">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CostFactors({ factors }: { factors: string[] }) {
  return (
    <section className="content-section">
      <div className="section-kicker"><WalletCards className="h-4 w-4" aria-hidden="true" /> Cost factors</div>
      <p className="mt-3 leading-7 text-slate-700">Pricing should be confirmed directly with the matched provider before work starts. Common factors include:</p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {factors.map((factor) => (
          <li key={factor} className="flex gap-2 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-800">
            <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-emerald-600" aria-hidden="true" />
            {factor}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function InfoListSection({
  kicker,
  title,
  intro,
  items
}: {
  kicker: string;
  title: string;
  intro?: string;
  items: string[];
}) {
  return (
    <section className="content-section">
      <p className="section-kicker">{kicker}</p>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{title}</h2>
      {intro ? <p className="mt-3 leading-7 text-slate-700">{intro}</p> : null}
      <ul className="mt-5 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="rounded-2xl border border-slate-200 bg-white p-5 font-semibold leading-7 text-slate-800 shadow-sm">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function LocalGuidance({ cityName = "Dallas-Fort Worth" }: { cityName?: string }) {
  return (
    <section className="content-section premium-trust-section">
      <div className="section-kicker"><MapPin className="h-4 w-4" aria-hidden="true" /> Local service-area guidance</div>
      <p className="mt-3 leading-7 text-slate-700">
        This page is written for homeowners and property managers in {cityName}. {siteConfig.serviceStatement} Availability, pricing,
        credentials, and arrival details should be confirmed directly with the matched provider.
      </p>
    </section>
  );
}

export function EnhancementSections({ enhancement }: { enhancement?: PageEnhancement }) {
  if (!enhancement) return null;

  return (
    <>
      <InfoListSection
        kicker="Decision support"
        title={enhancement.decisionTitle}
        intro={enhancement.decisionIntro}
        items={enhancement.decisionItems}
      />
      <InfoListSection
        kicker="Provider diagnosis"
        title={enhancement.providerTitle}
        items={enhancement.providerItems}
      />
      <InfoListSection
        kicker="Safety boundaries"
        title={enhancement.safetyTitle}
        items={enhancement.safetyItems}
      />
      {enhancement.preventionItems?.length ? (
        <InfoListSection
          kicker="Prevention"
          title={enhancement.preventionTitle || "How to reduce repeat risk"}
          items={enhancement.preventionItems}
        />
      ) : null}
    </>
  );
}

export function FAQBlock({ faqs }: { faqs: FAQ[] }) {
  return (
    <section className="content-section">
      <div className="section-kicker"><HelpCircle className="h-4 w-4" aria-hidden="true" /> Common questions</div>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Emergency Plumbing Questions</h2>
      <div className="mt-5 grid gap-3">
        {faqs.map((faq) => (
          <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm open:border-cyan-300 open:bg-cyan-50/40">
            <summary className="cursor-pointer list-none font-black text-slate-950 marker:hidden">
              <span className="flex items-center justify-between gap-4">
                <span>{faq.question}</span>
                <span className="text-xl text-cyan-700 transition group-open:rotate-45" aria-hidden="true">+</span>
              </span>
            </summary>
            <p className="mt-3 leading-7 text-slate-700">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function InternalLinks({ extra = [] }: { extra?: { label: string; href: string }[] }) {
  const links = [...extra, ...internalLinkGroups].slice(0, 8);
  return (
    <section className="content-section">
      <div className="section-kicker"><ArrowRight className="h-4 w-4" aria-hidden="true" /> Related emergency plumbing resources</div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="premium-card premium-card-link p-5 font-black text-slate-900">
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
