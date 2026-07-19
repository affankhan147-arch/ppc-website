import Link from "next/link";
import type { ReactNode } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, HelpCircle, MapPin, WalletCards } from "lucide-react";
import { FAQ } from "@/data/faqs";
import { internalLinkGroups } from "@/data/internalLinks";
import type { PageEnhancement } from "@/data/pageEnhancements";
import { siteConfig } from "@/data/site";

export function DirectAnswer({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-md border border-[#4FD1C5]/25 bg-[#16302C] p-5">
      <p className="text-sm font-black uppercase tracking-normal text-[#4FD1C5]">Quick answer</p>
      <div className="mt-2 text-lg font-semibold leading-7 text-white">{children}</div>
    </section>
  );
}

export function EmergencySteps({ steps }: { steps: string[] }) {
  return (
    <section className="content-section">
      <div className="section-kicker"><AlertTriangle className="h-4 w-4" aria-hidden="true" /> What to do now</div>
      <ol className="mt-4 grid gap-3 md:grid-cols-2">
        {steps.map((step, index) => (
          <li key={step} className="rounded-md border border-white/10 bg-[#0F1F1D] p-4">
            <span className="text-xs font-black text-[#F0B429]">Step {index + 1}</span>
            <p className="mt-1 font-semibold text-white">{step}</p>
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
      <p className="mt-3 text-slate-300">Pricing should be confirmed directly with the matched provider before work starts. Common factors include:</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {factors.map((factor) => (
          <li key={factor} className="flex gap-2 rounded-md bg-[#0F1F1D] p-3 text-sm font-semibold text-slate-200">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#4FD1C5]" aria-hidden="true" />
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
      <h2 className="mt-2 text-2xl font-black text-white">{title}</h2>
      {intro ? <p className="mt-3 leading-7 text-slate-300">{intro}</p> : null}
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="rounded-md border border-white/10 bg-[#0F1F1D] p-4 font-semibold leading-6 text-slate-200">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function LocalGuidance({ cityName = "Dallas-Fort Worth" }: { cityName?: string }) {
  return (
    <section className="content-section">
      <div className="section-kicker"><MapPin className="h-4 w-4" aria-hidden="true" /> Local service-area guidance</div>
      <p className="mt-3 leading-7 text-slate-300">
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
      <div className="mt-4 grid gap-3">
        {faqs.map((faq) => (
          <details key={faq.question} className="rounded-md border border-white/10 bg-[#0F1F1D] p-4">
            <summary className="cursor-pointer font-bold text-white">{faq.question}</summary>
            <p className="mt-2 leading-7 text-slate-300">{faq.answer}</p>
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
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="rounded-md border border-white/10 bg-[#0F1F1D] p-4 font-bold text-white transition hover:border-[#4FD1C5]">
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
