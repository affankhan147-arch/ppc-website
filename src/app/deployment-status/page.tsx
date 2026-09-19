import type { Metadata } from "next";
import { productionRevision } from "@/data/productionRevision";

export const metadata: Metadata = {
  title: "Deployment Status | Plumbing Hands",
  robots: {
    index: false,
    follow: false
  }
};

export default function DeploymentStatusPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm font-black uppercase tracking-wider text-sky-700">
        Plumbing Hands Production Revision
      </p>
      <h1 className="mt-3 text-3xl font-black text-slate-950">
        {productionRevision.id}
      </h1>
      <dl className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <dt className="text-sm font-bold text-slate-500">Required headline</dt>
          <dd className="mt-1 font-semibold text-slate-950">{productionRevision.requiredHeadline}</dd>
        </div>
        <div>
          <dt className="text-sm font-bold text-slate-500">Required market label</dt>
          <dd className="mt-1 font-semibold text-slate-950">{productionRevision.requiredMarketLabel}</dd>
        </div>
      </dl>
    </main>
  );
}
