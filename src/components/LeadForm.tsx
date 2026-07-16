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
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-black uppercase tracking-wider text-sky-700">
        Phone request process
      </p>

      <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
        How your call works
      </h2>

      <p className="mt-3 max-w-3xl leading-7 text-slate-600">
        Need help with {service} in {city}? A short phone conversation helps
        explain the problem, location, and urgency without completing a form.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-700 font-black text-white">
            1
          </span>
          <h3 className="mt-4 font-black text-slate-950">
            Describe the problem
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Explain the affected fixture, active water issue, and urgency.
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-700 font-black text-white">
            2
          </span>
          <h3 className="mt-4 font-black text-slate-950">
            Share your location
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Provide your city or ZIP so local service availability can be checked.
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-700 font-black text-white">
            3
          </span>
          <h3 className="mt-4 font-black text-slate-950">
            Discuss the next step
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Speak by phone about availability and the appropriate next action.
          </p>
        </article>
      </div>

      <div className="mt-6 flex flex-col items-start gap-3">
        <a
          href={siteConfig.phoneHref}
          data-phone-location="how-call-works"
          className="inline-flex min-h-12 whitespace-nowrap items-center justify-center rounded-md bg-slate-950 px-5 py-3 text-base font-black text-white transition hover:bg-slate-800"
        >
          Call {siteConfig.phoneDisplay}
        </a>

        <p className="max-w-2xl text-xs leading-5 text-slate-600">
          Availability depends on location, timing, and provider coverage.
          Confirm pricing, credentials, and arrival details directly with the provider.
        </p>
      </div>
    </section>
  );
}
