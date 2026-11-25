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
    <section className="premium-form rounded-card border border-rule bg-paper-2 p-6 sm:p-8">
      <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
        A clearer way to request plumbing help
      </h2>

      <p className="mt-3 max-w-3xl leading-7 text-ink-2">
        Need help with {service} in {city}? A short call helps explain the
        problem, location, and urgency without a long form or unclear next step.
      </p>

      <div className="mt-6 grid gap-3">
        <article className="flex items-start gap-4 rounded-2xl border border-rule bg-paper p-5">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-call font-black text-call-ink">
            1
          </span>
          <div>
          <h3 className="font-bold text-ink">
            Describe the problem
          </h3>
          <p className="mt-2 text-sm leading-6 text-ink-2">
            Explain the affected fixture, active water issue, and urgency.
          </p>
          </div>
        </article>

        <article className="flex items-start gap-4 rounded-2xl border border-rule bg-paper p-5">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-call font-black text-call-ink">
            2
          </span>
          <div>
          <h3 className="font-bold text-ink">
            Share your location
          </h3>
          <p className="mt-2 text-sm leading-6 text-ink-2">
            Provide your city or ZIP so the right local service can be discussed.
          </p>
          </div>
        </article>

        <article className="flex items-start gap-4 rounded-2xl border border-rule bg-paper p-5">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-call font-black text-call-ink">
            3
          </span>
          <div>
          <h3 className="font-bold text-ink">
            Discuss the next step
          </h3>
          <p className="mt-2 text-sm leading-6 text-ink-2">
            Speak by phone about the plumbing service and the next action.
          </p>
          </div>
        </article>
      </div>

      <div className="mt-6 flex flex-col items-start gap-3">
        
          <a
          href={siteConfig.phoneHref}
          data-phone-location="how-call-works"
          className="inline-flex min-h-12 whitespace-nowrap items-center justify-center rounded-full bg-call px-6 py-3 text-base font-black text-call-ink"
        >
          Call {siteConfig.phoneDisplay}
        </a>

        <p className="max-w-2xl text-sm font-semibold leading-6 text-ink-2">
          Call now to discuss your plumbing problem and get the next service step started.
        </p>
      </div>
    </section>
  );
}
