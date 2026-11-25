import Link from "next/link";
import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { FAQ } from "@/data/faqs";
import type { SourceLink } from "@/data/externalSources";
import { internalLinkGroups } from "@/data/internalLinks";
import type { PageEnhancement } from "@/data/pageEnhancements";
import { siteConfig } from "@/data/site";

// Bold run-in that restates the page topic at the start of an intro paragraph.
// NOTE (design.md): templates no longer render LeadIn — the H1 echo is a gate 69
// fix; the intro paragraph starts with its own sentence. Kept exported so no
// import breaks while templates are migrated.
export function LeadIn({ topic }: { topic: string }) {
  const text = topic.trim();
  const end = /[?.!]$/.test(text) ? "" : ".";
  return (
    <>
      <strong className="font-bold text-ink">
        {text}
        {end}
      </strong>{" "}
    </>
  );
}

// Outbound citation section: official / authoritative sources for the page topic.
export function OfficialSources({ title, intro, links }: { title: string; intro?: string; links: SourceLink[] }) {
  if (!links.length) return null;
  return (
    <section className="content-section">
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
      {intro ? <p className="mt-3 leading-7 text-ink-2">{intro}</p> : null}
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {links.map((link) => (
          <li key={link.href} className="rounded-card border border-rule bg-paper p-4">
            <a href={link.href} target="_blank" rel="noopener noreferrer" className="font-bold text-accent underline hover:text-ink">
              {link.label}
            </a>
            {link.note ? <p className="mt-1 text-sm leading-6 text-ink-2">{link.note}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function DirectAnswer({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-card border border-rule bg-paper-3 p-5">
      <p className="text-sm font-bold text-accent">Quick answer</p>
      <div className="mt-2 text-lg font-semibold leading-7 text-ink">{children}</div>
    </section>
  );
}

export function EmergencySteps({ steps }: { steps: string[] }) {
  return (
    <section className="content-section">
      <h2 className="text-2xl font-bold text-ink">What to do now</h2>
      <ol className="mt-4 grid gap-3 md:grid-cols-2">
        {steps.map((step, index) => (
          <li key={step} className="rounded-card border border-rule bg-paper p-4">
            <span className="text-sm font-bold text-accent">Step {index + 1}</span>
            <p className="mt-1 font-semibold text-ink">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CostFactors({ factors }: { factors: string[] }) {
  return (
    <section className="content-section">
      <h2 className="text-2xl font-bold text-ink">Cost factors</h2>
      <p className="mt-3 text-ink-2">Pricing should be confirmed directly with the matched provider before work starts. Common factors include:</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {factors.map((factor) => (
          <li key={factor} className="flex gap-2 rounded-card bg-paper p-3 text-sm font-semibold text-ink-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-accent" aria-hidden="true" />
            {factor}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function InfoListSection({
  title,
  intro,
  items
}: {
  title: string;
  intro?: string;
  items: string[];
}) {
  return (
    <section className="content-section">
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
      {intro ? <p className="mt-3 leading-7 text-ink-2">{intro}</p> : null}
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="rounded-card border border-rule bg-paper p-4 font-semibold leading-6 text-ink-2">
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
      <p className="leading-7 text-ink-2">
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
        title={enhancement.decisionTitle}
        intro={enhancement.decisionIntro}
        items={enhancement.decisionItems}
      />
      <InfoListSection
        title={enhancement.providerTitle}
        items={enhancement.providerItems}
      />
      <InfoListSection
        title={enhancement.safetyTitle}
        items={enhancement.safetyItems}
      />
      {enhancement.preventionItems?.length ? (
        <InfoListSection
          title={enhancement.preventionTitle || "How to reduce repeat risk"}
          items={enhancement.preventionItems}
        />
      ) : null}
    </>
  );
}

export function FAQBlock({ faqs, title = "Frequently asked questions" }: { faqs: FAQ[]; title?: string }) {
  return (
    <section className="content-section">
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
      <div className="mt-4 grid gap-3">
        {faqs.map((faq) => (
          <details key={faq.question} className="rounded-card border border-rule bg-paper p-4">
            <summary className="cursor-pointer font-bold text-ink">{faq.question}</summary>
            <p className="mt-2 leading-7 text-ink-2">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function InternalLinks({ extra = [] }: { extra?: { label: string; href: string }[] }) {
  const seen = new Set<string>();
  const links = [...extra, ...internalLinkGroups]
    .filter((link) => {
      if (seen.has(link.href)) return false;
      seen.add(link.href);
      return true;
    })
    .slice(0, 8);
  return (
    <section className="content-section">
      <h2 className="text-2xl font-bold text-ink">Related emergency plumbing resources</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="rounded-card border border-rule bg-paper p-4 font-bold text-ink transition-colors hover:border-accent">
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
