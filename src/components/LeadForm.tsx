import { siteConfig } from "@/data/site";

type LeadFormProps = {
  pageUrl: string;
  service?: string;
  city?: string;
};

export function LeadForm({
  service = "plumbing problem",
  city = siteConfig.marketName,
}: LeadFormProps) {
  return (
    <section className="premium-form rounded-[1.4rem] border border-white/70 bg-white p-6 shadow-[0_24px_70px_rgba(8,27,44,.16)] sm:p-8">
      <p className="text-sm font-black uppercase tracking-wider text-sky-700">
        Clear phone request process
      </p>

      <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
        A clearer way to request plumbing help
      </h2>

      <p className="mt-3 max-w-3xl leading-7 text-slate-600">
        Need help with {service} in {city}? A short call helps explain the
        problem, location, and urgency without a long form or unclear next step.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-[#f7f8f6] p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0b7895] font-black text-white">
            1
          </span>
          <h3 className="mt-4 font-black text-slate-950">
            Describe the problem
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Explain the affected fixture, active water issue, and urgency.
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-[#f7f8f6] p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0b7895] font-black text-white">
            2
          </span>
          <h3 className="mt-4 font-black text-slate-950">
            Share your location
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Provide your city or ZIP so the right local service can be discussed.
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-[#f7f8f6] p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0b7895] font-black text-white">
            3
          </span>
          <h3 className="mt-4 font-black text-slate-950">
            Discuss the next step
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Speak by phone about the plumbing service and the next action.
          </p>
        </article>
      </div>

      <div className="mt-6 flex flex-col items-start gap-3">
        <a
          href={siteConfig.phoneHref}
          data-phone-location="how-call-works"
          className="inline-flex min-h-12 whitespace-nowrap items-center justify-center rounded-xl bg-[#081b2c] px-6 py-3 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#123b58]"
        >
          Call {siteConfig.phoneDisplay}
        </a>

        <p className="max-w-2xl text-sm font-semibold leading-6 text-slate-600">
          Call now to discuss your plumbing problem and get the next service step started.
        </p>
      </div>
    </section>
  );
}
