"use client";

import { useEffect, useRef } from "react";
import { Send } from "lucide-react";

type LeadFormProps = {
  pageUrl: string;
  service?: string;
  city?: string;
};

const serviceOptions = [
  "Emergency plumbing",
  "Emergency drain cleaning",
  "Main sewer line clog",
  "Toilet overflow",
  "Burst pipe",
  "Water heater emergency",
  "Sewer backup",
  "Commercial plumbing emergency"
];

export function LeadForm({ pageUrl, service = "", city = "" }: LeadFormProps) {
  const options = service && !serviceOptions.includes(service) ? [service, ...serviceOptions] : serviceOptions;
  const pageUrlRef = useRef<HTMLInputElement>(null);
  const utmSourceRef = useRef<HTMLInputElement>(null);
  const utmMediumRef = useRef<HTMLInputElement>(null);
  const utmCampaignRef = useRef<HTMLInputElement>(null);
  const utmTermRef = useRef<HTMLInputElement>(null);
  const utmContentRef = useRef<HTMLInputElement>(null);

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

  return (
    <form action="/api/lead" method="post" className="premium-form grid gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-xl shadow-slate-950/10">
      <input ref={pageUrlRef} type="hidden" name="pageUrl" defaultValue={pageUrl} />
      <input ref={utmSourceRef} type="hidden" name="utmSource" defaultValue="" />
      <input ref={utmMediumRef} type="hidden" name="utmMedium" defaultValue="" />
      <input ref={utmCampaignRef} type="hidden" name="utmCampaign" defaultValue="" />
      <input ref={utmTermRef} type="hidden" name="utmTerm" defaultValue="" />
      <input ref={utmContentRef} type="hidden" name="utmContent" defaultValue="" />
      <div>
        <p className="text-xs font-black uppercase tracking-normal text-sky-700">Fast request form</p>
        <h2 className="mt-1 text-2xl font-black text-slate-950">Tell us what service you need</h2>
      </div>
      <label className="grid gap-1 text-sm font-semibold text-slate-700">
        Plumbing issue
        <select className="rounded-md border border-slate-300 bg-white px-3 py-3 text-slate-950" name="service" defaultValue={service || "Emergency plumbing"} required>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm font-semibold text-slate-700">
        City or ZIP
        <input className="rounded-md border border-slate-300 px-3 py-3 text-slate-950" name="city" defaultValue={city} placeholder="Dallas, Fort Worth, 75201..." required />
      </label>
      <label className="grid gap-1 text-sm font-semibold text-slate-700">
        Urgency
        <select className="rounded-md border border-slate-300 bg-white px-3 py-3 text-slate-950" name="urgency" defaultValue="urgent-today" required>
          <option value="active-emergency">Active emergency now</option>
          <option value="urgent-today">Urgent today</option>
          <option value="soon">Soon, not active damage</option>
          <option value="planning">Planning or price question</option>
        </select>
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold text-slate-700">
          Name
          <input className="rounded-md border border-slate-300 px-3 py-3 text-slate-950" name="name" autoComplete="name" required />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-slate-700">
          Phone
          <input className="rounded-md border border-slate-300 px-3 py-3 text-slate-950" name="phone" autoComplete="tel" required />
        </label>
      </div>
      <label className="grid gap-1 text-sm font-semibold text-slate-700">
        Message optional
        <textarea className="min-h-20 rounded-md border border-slate-300 px-3 py-3 text-slate-950" name="message" placeholder="Briefly describe the issue, if you can." />
      </label>
      <button className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-slate-800" type="submit">
        <Send className="h-4 w-4" aria-hidden="true" />
        Submit Service Request
      </button>
      <p className="text-xs leading-5 text-slate-500">
        Service availability depends on location, timing, and provider coverage. Pricing, credentials, and arrival details should be confirmed directly with the provider.
      </p>
    </form>
  );
}
