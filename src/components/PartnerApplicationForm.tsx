"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

type PartnerApplicationFormProps = {
  pageUrl: string;
};

function inferDeviceContext() {
  if (typeof window === "undefined") return "unknown";
  return window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";
}

export function PartnerApplicationForm({ pageUrl }: PartnerApplicationFormProps) {
  const pageUrlRef = useRef<HTMLInputElement>(null);
  const utmSourceRef = useRef<HTMLInputElement>(null);
  const utmMediumRef = useRef<HTMLInputElement>(null);
  const utmCampaignRef = useRef<HTMLInputElement>(null);
  const utmTermRef = useRef<HTMLInputElement>(null);
  const utmContentRef = useRef<HTMLInputElement>(null);
  const [started, setStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ tone: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fields = [
      [pageUrlRef, window.location.href],
      [utmSourceRef, params.get("utm_source") || ""],
      [utmMediumRef, params.get("utm_medium") || ""],
      [utmCampaignRef, params.get("utm_campaign") || ""],
      [utmTermRef, params.get("utm_term") || ""],
      [utmContentRef, params.get("utm_content") || ""]
    ] as const;

    fields.forEach(([ref, value]) => {
      if (ref.current) ref.current.value = value;
    });
  }, [pageUrl]);

  function sendPartnerEvent(eventName: "partner_application_start" | "partner_application_submit") {
    const pathname = typeof window === "undefined" ? pageUrl : window.location.pathname;
    const params = new URLSearchParams({
      eventName,
      location: "partner-application-form",
      ctaLocation: "partner-application-form",
      pagePath: pathname || pageUrl,
      pageType: "partner",
      deviceContext: inferDeviceContext()
    });
    const eventUrl = `/api/call-event?${params.toString()}`;

    if (navigator.sendBeacon) {
      navigator.sendBeacon(eventUrl);
      return;
    }

    void fetch(eventUrl, { keepalive: true }).catch(() => undefined);
  }

  function handleFormStart() {
    if (started) return;
    setStarted(true);
    sendPartnerEvent("partner_application_start");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);
    sendPartnerEvent("partner_application_submit");

    try {
      const response = await fetch("/api/partner-application", {
        method: "POST",
        body: new FormData(event.currentTarget)
      });
      const result = await response.json() as { ok?: boolean; requestId?: string; error?: string };

      if (!response.ok || !result.ok) {
        setStatus({ tone: "error", message: result.error || "The application could not be submitted. Please review the required fields and try again." });
        return;
      }

      event.currentTarget.reset();
      setStatus({
        tone: "success",
        message: `Provider application received. Reference: ${result.requestId || "pending"}.`
      });
    } catch {
      setStatus({ tone: "error", message: "The application could not be submitted right now. Please try again shortly." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      method="post"
      className="premium-form grid gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-xl shadow-slate-950/10"
      onFocusCapture={handleFormStart}
      onSubmit={handleSubmit}
    >
      <input ref={pageUrlRef} type="hidden" name="pageUrl" defaultValue={pageUrl} />
      <input ref={utmSourceRef} type="hidden" name="utmSource" defaultValue="" />
      <input ref={utmMediumRef} type="hidden" name="utmMedium" defaultValue="" />
      <input ref={utmCampaignRef} type="hidden" name="utmCampaign" defaultValue="" />
      <input ref={utmTermRef} type="hidden" name="utmTerm" defaultValue="" />
      <input ref={utmContentRef} type="hidden" name="utmContent" defaultValue="" />
      <input className="hidden" type="text" name="companyFax" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div>
        <p className="text-xs font-black uppercase tracking-normal text-sky-700">Provider application</p>
        <h2 className="mt-1 text-xl font-black text-slate-950 sm:text-2xl">Share your coverage details</h2>
      </div>

      <label className="grid gap-1 text-sm font-semibold text-slate-700">
        Business name
        <input className="rounded-md border border-slate-300 px-3 py-3 text-slate-950" name="businessName" autoComplete="organization" required />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold text-slate-700">
          Contact name
          <input className="rounded-md border border-slate-300 px-3 py-3 text-slate-950" name="contactName" autoComplete="name" required />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-slate-700">
          Phone
          <input className="rounded-md border border-slate-300 px-3 py-3 text-slate-950" name="phone" autoComplete="tel" required />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold text-slate-700">
          Email
          <input className="rounded-md border border-slate-300 px-3 py-3 text-slate-950" name="email" type="email" autoComplete="email" required />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-slate-700">
          Website if available
          <input className="rounded-md border border-slate-300 px-3 py-3 text-slate-950" name="website" type="url" placeholder="https://example.com" />
        </label>
      </div>

      <label className="grid gap-1 text-sm font-semibold text-slate-700">
        Primary service areas
        <textarea className="min-h-20 rounded-md border border-slate-300 px-3 py-3 text-slate-950" name="primaryServiceAreas" placeholder="Cities, ZIP codes, or neighborhoods served" required />
      </label>

      <label className="grid gap-1 text-sm font-semibold text-slate-700">
        Plumbing services offered
        <textarea className="min-h-20 rounded-md border border-slate-300 px-3 py-3 text-slate-950" name="servicesOffered" placeholder="Emergency plumbing, drain cleaning, sewer, water heater, commercial..." required />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold text-slate-700">
          Operating hours
          <input className="rounded-md border border-slate-300 px-3 py-3 text-slate-950" name="operatingHours" placeholder="24/7, weekdays, nights, weekends..." required />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-slate-700">
          Emergency-response capacity
          <select className="rounded-md border border-slate-300 bg-white px-3 py-3 text-slate-950" name="emergencyCapacity" defaultValue="limited" required>
            <option value="yes-24-7">24/7 emergency capacity</option>
            <option value="limited">Limited emergency capacity</option>
            <option value="no">No emergency capacity</option>
            <option value="not-sure">Not sure yet</option>
          </select>
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold text-slate-700">
          Customer type
          <select className="rounded-md border border-slate-300 bg-white px-3 py-3 text-slate-950" name="customerTypes" defaultValue="residential-commercial" required>
            <option value="residential-commercial">Residential and commercial</option>
            <option value="residential">Residential only</option>
            <option value="commercial">Commercial only</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm font-semibold text-slate-700">
          Preferred contact method
          <select className="rounded-md border border-slate-300 bg-white px-3 py-3 text-slate-950" name="preferredContactMethod" defaultValue="phone" required>
            <option value="phone">Phone</option>
            <option value="email">Email</option>
          </select>
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold text-slate-700">
          License or credential information
          <input className="rounded-md border border-slate-300 px-3 py-3 text-slate-950" name="licenseInfo" placeholder="Share only verifiable details" />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-slate-700">
          Insurance status
          <select className="rounded-md border border-slate-300 bg-white px-3 py-3 text-slate-950" name="insuranceStatus" defaultValue="prefer-discuss" required>
            <option value="insured">Insured</option>
            <option value="not-insured">Not insured</option>
            <option value="not-sure">Not sure</option>
            <option value="prefer-discuss">Prefer to discuss</option>
          </select>
        </label>
      </div>

      <label className="grid gap-1 text-sm font-semibold text-slate-700">
        Notes
        <textarea className="min-h-20 rounded-md border border-slate-300 px-3 py-3 text-slate-950" name="notes" placeholder="Coverage limits, dispatch rules, exclusions, or onboarding questions" />
      </label>

      <label className="flex gap-2 text-xs leading-5 text-slate-600">
        <input className="mt-1 h-4 w-4 rounded border-slate-300" type="checkbox" name="consent" required />
        I agree to be contacted about provider onboarding and understand that submitted credential, insurance, service-area, and availability details must be verified before being used publicly.
      </label>

      <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-base font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500" type="submit" disabled={submitting}>
        <Send className="h-4 w-4" aria-hidden="true" />
        {submitting ? "Submitting Application" : "Submit Provider Application"}
      </button>

      {status ? (
        <p
          aria-live="polite"
          className={`rounded-md border p-3 text-sm font-semibold leading-6 ${
            status.tone === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-red-200 bg-red-50 text-red-900"
          }`}
        >
          {status.message}
        </p>
      ) : null}
      <p className="text-xs leading-5 text-slate-500">
        Application routing depends on the approved provider-review workflow. Do not submit customer emergency requests through this form.
      </p>
    </form>
  );
}
