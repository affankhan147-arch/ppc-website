import { CheckCircle2, MapPin, PhoneCall, ShieldCheck } from "lucide-react";
import { CallButton } from "@/components/CallButton";
import { siteConfig } from "@/data/site";

type LeadFormProps = {
  pageUrl: string;
  service?: string;
  city?: string;
};

const callSteps = [
  {
    title: "Describe the urgent problem",
    copy: "Share the affected fixture, whether water is active, and what has already been shut off."
  },
  {
    title: "Confirm the service area",
    copy: "Provide your city or ZIP so current provider coverage can be discussed."
  },
  {
    title: "Discuss availability and scope",
    copy: "Confirm timing, pricing, credentials, and the next appropriate step directly by phone."
  }
];

export function LeadForm({
  pageUrl,
  service = "plumbing problem",
  city = siteConfig.marketName
}: LeadFormProps) {
  return (
    <section className="call-intake-panel overflow-hidden rounded-3xl border border-white/20 bg-white text-slate-950 shadow-2xl">
      <div className="border-b border-slate-200 bg-slate-950 px-6 py-5 text-white sm:px-7">
        <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-cyan-200">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Emergency request line
        </p>
        <h2 className="mt-2 text-2xl font-black leading-tight sm:text-3xl">
          Speak With a Plumbing Coordinator Now
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Call about {service} in {city}. No long form is required.
        </p>
      </div>

      <div className="p-6 sm:p-7">
        <a
          href={siteConfig.phoneHref}
          className="group flex items-center justify-between gap-4 rounded-2xl border border-orange-200 bg-orange-50 p-4 transition hover:border-orange-300 hover:bg-orange-100"
          aria-label={`Call ${siteConfig.phoneDisplay}`}
        >
          <span>
            <span className="block text-xs font-black uppercase tracking-[0.12em] text-orange-700">Tap to call</span>
            <span className="mt-1 block text-2xl font-black text-slate-950">{siteConfig.phoneDisplay}</span>
          </span>
          <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-orange-700 text-white shadow-lg transition group-hover:scale-105">
            <PhoneCall className="h-5 w-5" aria-hidden="true" />
          </span>
        </a>

        <div className="mt-6 grid gap-4">
          {callSteps.map((step, index) => (
            <article key={step.title} className="flex gap-3">
              <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-cyan-50 text-sm font-black text-cyan-800">
                {index + 1}
              </span>
              <div>
                <h3 className="font-black text-slate-950">{step.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{step.copy}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="flex items-start gap-2 text-sm font-bold leading-6 text-slate-700">
            <MapPin className="mt-1 h-4 w-4 flex-none text-cyan-700" aria-hidden="true" />
            Coverage and timing depend on location and current provider availability.
          </p>
          <p className="mt-2 flex items-start gap-2 text-sm leading-6 text-slate-600">
            <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-emerald-600" aria-hidden="true" />
            Confirm pricing, credentials, arrival details, and repair scope before authorizing work.
          </p>
        </div>

        <CallButton
          location="call-process-panel"
          pagePath={pageUrl}
          service={service}
          city={city}
          label={`Call ${siteConfig.phoneDisplay}`}
          className="mt-5 w-full"
        />
      </div>
    </section>
  );
}
