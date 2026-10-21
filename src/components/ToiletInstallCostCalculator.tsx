"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import {
  jobTypes,
  toiletTypeCosts,
  removalHaulAway,
  estimateTotal,
  type JobType,
  type ToiletType,
} from "@/data/toiletInstallCosts";

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export default function ToiletInstallCostCalculator() {
  const [toiletType, setToiletType] = useState<ToiletType>("two-piece");
  const [jobType, setJobType] = useState<JobType>("replace-existing");
  const [includeRemoval, setIncludeRemoval] = useState(true);

  const result = useMemo(
    () => estimateTotal(toiletType, jobType, includeRemoval),
    [toiletType, jobType, includeRemoval]
  );

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      try {
        sendGAEvent("event", "toilet_install_calculator_use", {
          toilet_type: toiletType,
          job_type: jobType
        });
      } catch {
        // analytics unavailable - ignore
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [toiletType, jobType, includeRemoval]);

  const field = "w-full rounded-lg border border-[#1A3A38] bg-[#0B1614] p-3 text-white";
  const typeLabel = toiletTypeCosts.find((t) => t.id === toiletType)?.label ?? "";

  return (
    <div className="rounded-xl border border-[#1A3A38] p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-slate-300">
          Toilet type
          <select
            className={field}
            value={toiletType}
            onChange={(e) => setToiletType(e.target.value as ToiletType)}
          >
            {toiletTypeCosts.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-slate-300">
          Job type
          <select
            className={field}
            value={jobType}
            onChange={(e) => setJobType(e.target.value as JobType)}
          >
            {jobTypes.map((j) => (
              <option key={j.id} value={j.id}>{j.label}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-300 sm:col-span-2">
          <input
            type="checkbox"
            checked={includeRemoval}
            disabled={jobType === "new-install"}
            onChange={(e) => setIncludeRemoval(e.target.checked)}
            className="h-4 w-4 rounded border-[#1A3A38]"
          />
          Haul away the old toilet (+{money(removalHaulAway.low)}-{money(removalHaulAway.high)})
        </label>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-[#0F1F1D] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Fixr range</p>
          <p className="mt-1 text-2xl font-bold text-white">
            {money(result.low)}-{money(result.high)}
          </p>
        </div>
        <div className="rounded-lg bg-[#0F1F1D] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">HomeAdvisor average</p>
          <p className="mt-1 text-2xl font-bold text-white">
            {result.homeAdvisorMid !== null ? money(result.homeAdvisorMid) : "Not listed for this type"}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-[#0F1F1D] p-4 text-slate-300">
        {jobType === "new-install" ? (
          <p>
            Installing a {typeLabel.toLowerCase()} where no toilet existed before means new rough-in plumbing, a
            drain line, and venting - Fixr puts that scope at <strong>{money(1000)}-{money(3500)}</strong> on top of
            the fixture itself, so the range above reflects that higher floor rather than a simple swap.
          </p>
        ) : (
          <p>
            Swapping in a {typeLabel.toLowerCase()} where plumbing already exists is the common case - both sources
            price the fixture plus labor, and hauling away the old one typically adds another{" "}
            <strong>{money(removalHaulAway.low)}-{money(removalHaulAway.high)}</strong>
            {includeRemoval ? " (already included above)" : " (not included above - check the box to add it)"}.
          </p>
        )}
      </div>

      <p className="mt-4 text-xs text-slate-400">
        Figures above come from two independently fetched cost guides checked October 2026: Fixr, &quot;Cost to
        Install a Toilet,&quot; and HomeAdvisor, &quot;How Much Does It Cost to Install a Toilet?&quot; They disagree
        moderately on national averages and on which toilet type costs more - that reflects real market-price
        variance, not an error, so both ranges are shown rather than one smoothed-over number.
      </p>
      <p className="mt-2 text-xs text-slate-400">
        This is a planning estimate, not a quote. Venting, floor-flange condition, and whether the shutoff valve
        also needs replacing can only be confirmed by a licensed plumber&apos;s on-site look.
      </p>
    </div>
  );
}
