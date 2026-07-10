import { Send } from "lucide-react";

type LeadFormProps = {
  pageUrl: string;
  service?: string;
  city?: string;
};

export function LeadForm({ pageUrl, service = "", city = "" }: LeadFormProps) {
  return (
    <form action="/api/lead" method="post" className="grid gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <input type="hidden" name="pageUrl" value={pageUrl} />
      <label className="grid gap-1 text-sm font-semibold text-slate-700">
        Name
        <input className="rounded-md border border-slate-300 px-3 py-2 text-slate-950" name="name" autoComplete="name" required />
      </label>
      <label className="grid gap-1 text-sm font-semibold text-slate-700">
        Phone
        <input className="rounded-md border border-slate-300 px-3 py-2 text-slate-950" name="phone" autoComplete="tel" required />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold text-slate-700">
          City
          <input className="rounded-md border border-slate-300 px-3 py-2 text-slate-950" name="city" defaultValue={city} required />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-slate-700">
          Service
          <input className="rounded-md border border-slate-300 px-3 py-2 text-slate-950" name="service" defaultValue={service} required />
        </label>
      </div>
      <label className="grid gap-1 text-sm font-semibold text-slate-700">
        Urgency and message
        <textarea className="min-h-24 rounded-md border border-slate-300 px-3 py-2 text-slate-950" name="message" required />
      </label>
      <button className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800" type="submit">
        <Send className="h-4 w-4" aria-hidden="true" />
        Request provider connection
      </button>
      <p className="text-xs leading-5 text-slate-500">
        Submitting this form logs a lead request for routing. It does not guarantee availability, pricing, licensing, or arrival time.
      </p>
    </form>
  );
}
