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
  const formStartedAtRef = useRef<HTMLInputElement>(null);
  const submissionIdRef = useRef<HTMLInputElement>(null);
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
      [utmContentRef, params.get("utm_content") || ""],
      [formStartedAtRef, String(Date.now())],
      [submissionIdRef, crypto.randomUUID()]
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
      if (formStartedAtRef.current) formStartedAtRef.current.value = String(Date.now());
      if (submissionIdRef.current) submissionIdRef.current.value = crypto.randomUUID();
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
      className="premium-form grid gap-3 rounded-card border border-rule bg-paper-2 p-4"
      onFocusCapture={handleFormStart}
      onSubmit={handleSubmit}
    >
      <input ref={pageUrlRef} type="hidden" name="pageUrl" defaultValue={pageUrl} />
      <input ref={utmSourceRef} type="hidden" name="utmSource" defaultValue="" />
      <input ref={utmMediumRef} type="hidden" name="utmMedium" defaultValue="" />
      <input ref={utmCampaignRef} type="hidden" name="utmCampaign" defaultValue="" />
      <input ref={utmTermRef} type="hidden" name="utmTerm" defaultValue="" />
      <input ref={utmContentRef} type="hidden" name="utmContent" defaultValue="" />
      <input ref={formStartedAtRef} type="hidden" name="formStartedAt" defaultValue="" />
      <input ref={submissionIdRef} type="hidden" name="submissionId" defaultValue="" />
      <input className="hidden" type="text" name="companyFax" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div>
        <p className="text-xs font-black text-accent">Provider application</p>
        <h2 className="mt-1 text-xl font-bold text-ink sm:text-2xl">Share your coverage details</h2>
      </div>

      <label className="grid gap-1 text-sm font-semibold text-ink-2">
        Business name
        <input className="rounded-md px-3 py-3" name="businessName" autoComplete="organization" required />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold text-ink-2">
          Contact name
          <input className="rounded-md px-3 py-3" name="contactName" autoComplete="name" required />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-ink-2">
          Phone
          <input className="rounded-md px-3 py-3" name="phone" autoComplete="tel" required />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold text-ink-2">
          Email
          <input className="rounded-md px-3 py-3" name="email" type="email" autoComplete="email" required />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-ink-2">
          Website if available
          <input className="rounded-md px-3 py-3" name="website" type="url" placeholder="https://example.com" />
        </label>
      </div>

      <label className="grid gap-1 text-sm font-semibold text-ink-2">
        Primary service areas
        <textarea className="min-h-20 rounded-md px-3 py-3" name="primaryServiceAreas" placeholder="Cities, ZIP codes, or neighborhoods served" required />
      </label>

      <label className="grid gap-1 text-sm font-semibold text-ink-2">
        Plumbing services offered
        <textarea className="min-h-20 rounded-md px-3 py-3" name="servicesOffered" placeholder="Emergency plumbing, drain cleaning, sewer, water heater, commercial..." required />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold text-ink-2">
          Operating hours
          <input className="rounded-md px-3 py-3" name="operatingHours" placeholder="24/7, weekdays, nights, weekends..." required />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-ink-2">
          Emergency-response capacity
          <select className="rounded-md px-3 py-3" name="emergencyCapacity" defaultValue="limited" required>
            <option value="yes-24-7">24/7 emergency capacity</option>
            <option value="limited">Limited emergency capacity</option>
            <option value="no">No emergency capacity</option>
            <option value="not-sure">Not sure yet</option>
          </select>
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold text-ink-2">
          Customer type
          <select className="rounded-md px-3 py-3" name="customerTypes" defaultValue="residential-commercial" required>
            <option value="residential-commercial">Residential and commercial</option>
            <option value="residential">Residential only</option>
            <option value="commercial">Commercial only</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm font-semibold text-ink-2">
          Preferred contact method
          <select className="rounded-md px-3 py-3" name="preferredContactMethod" defaultValue="phone" required>
            <option value="phone">Phone</option>
            <option value="email">Email</option>
          </select>
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold text-ink-2">
          License or credential information
          <input className="rounded-md px-3 py-3" name="licenseInfo" placeholder="Share only verifiable details" />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-ink-2">
          Insurance status
          <select className="rounded-md px-3 py-3" name="insuranceStatus" defaultValue="prefer-discuss" required>
            <option value="insured">Insured</option>
            <option value="not-insured">Not insured</option>
            <option value="not-sure">Not sure</option>
            <option value="prefer-discuss">Prefer to discuss</option>
          </select>
        </label>
      </div>

      <label className="grid gap-1 text-sm font-semibold text-ink-2">
        Notes
        <textarea className="min-h-20 rounded-md px-3 py-3" name="notes" placeholder="Coverage limits, dispatch rules, exclusions, or onboarding questions" />
      </label>

      <label className="flex gap-2 text-xs leading-5 text-muted">
        <input className="mt-1 h-4 w-4 rounded" type="checkbox" name="consent" required />
        I agree to be contacted about provider onboarding and understand that submitted credential, insurance, service-area, and availability details must be verified before being used publicly.
      </label>

      <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-call px-4 py-3 text-base font-black text-call-ink disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={submitting}>
        <Send className="h-4 w-4" aria-hidden="true" />
        {submitting ? "Submitting Application" : "Submit Provider Application"}
      </button>

      {status ? (
        <p
          aria-live="polite"
          className={`rounded-md border p-3 text-sm font-semibold leading-6 ${
            status.tone === "success"
              ? "border-success bg-paper text-success"
              : "border-error bg-paper text-error"
          }`}
        >
          {status.message}
        </p>
      ) : null}
      <p className="text-xs leading-5 text-muted">
        Application routing depends on the approved provider-review workflow. Do not submit customer emergency requests through this form.
      </p>
    </form>
  );
}
