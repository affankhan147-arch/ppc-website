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
    <section className="premium-form rounded-[1.4rem] border border-white/10 bg-[#16302C] p-6 shadow-[0_24px_70px_rgba(0,0,0,.3)] sm:p-8">
      <p className="text-sm font-black uppercase tracking-wider text-[#4FD1C5]">
        Clear phone request process
      </p>

      <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
        A clearer way to request plumbing help
      </h2>

      <p className="mt-3 max-w-3xl leading-7 text-slate-300">
        Need help with {service} in {city}? A short call helps explain the
        problem, location, and urgency without a long form or unclear next step.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-white/10 bg-[#0F1F1D] p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0B429] font-black text-[#1A1300]">
            1
          </span>
          <h3 className="mt-4 font-black text-white">
            Describe the problem
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Explain the affected fixture, active water issue, and urgency.
          </p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-[#0F1F1D] p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0B429] font-black text-[#1A1300]">
            2
          </span>
          <h3 className="mt-4 font-black text-white">
            Share your location
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Provide your city or ZIP so the right local service can be discussed.
          </p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-[#0F1F1D] p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0B429] font-black text-[#1A1300]">
            3
          </span>
          <h3 className="mt-4 font-black text-white">
            Discuss the next step
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Speak by phone about the plumbing service and the next action.
          </p>
        </article>
      </div>

      <div className="mt-6 flex flex-col items-start gap-3">
        
          href={siteConfig.phoneHref}
          data-phone-location="how-call-works"
          className="inline-flex min-h-12 whitespace-nowrap items-center justify-center rounded-xl bg-[#F0B429] px-6 py-3 text-base font-black text-[#1A1300] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#d99f1f]"
        >
          Call {siteConfig.phoneDisplay}
        </a>

        <p className="max-w-2xl text-sm font-semibold leading-6 text-slate-300">
          Call now to discuss your plumbing problem and get the next service step started.
        </p>
      </div>
    </section>
  );
}
