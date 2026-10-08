"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import {
  repairMethods,
  getRepairMethod,
  leakDetection,
  overallAverage,
  type RepairMethodId
} from "@/data/slabLeakRepairCosts";

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export default function SlabLeakRepairCostCalculator() {
  const [feet, setFeet] = useState(15);
  const [methodId, setMethodId] = useState<RepairMethodId>("relining");
  const [needsDetection, setNeedsDetection] = useState(true);

  const method = getRepairMethod(methodId);

  const result = useMemo(() => {
    const safeFeet = Math.max(1, feet);
    let low = method.perFoot ? method.low * safeFeet : method.low;
    let high = method.perFoot ? method.high * safeFeet : method.high;

    if (needsDetection) {
      low += leakDetection.low;
      high += leakDetection.high;
    }

    return { low, high };
  }, [feet, method, needsDetection]);

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      try {
        sendGAEvent("event", "slab_leak_calculator_use", { method_id: methodId, feet });
      } catch {
        // analytics unavailable - ignore
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [methodId, feet, needsDetection]);

  const field = "w-full rounded-lg border border-[#1A3A38] bg-[#0B1614] p-3 text-white";

  return (
    <div className="rounded-xl border border-[#1A3A38] p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-slate-300">
          Repair method
          <select className={field} value={methodId} onChange={(e) => setMethodId(e.target.value as RepairMethodId)}>
            {repairMethods.map((m) => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
        </label>
        {method.perFoot && (
          <label className="block text-sm text-slate-300">
            Feet of damaged pipe (under the slab)
            <input
              className={field}
              type="number"
              min={1}
              max={100}
              step={1}
              value={feet}
              onChange={(e) => setFeet(Math.max(1, Number(e.target.value) || 1))}
            />
          </label>
        )}
        <label className="flex items-center gap-2 text-sm text-slate-300 sm:col-span-2">
          <input type="checkbox" checked={needsDetection} onChange={(e) => setNeedsDetection(e.target.checked)} />
          Include professional leak detection ({money(leakDetection.low)}-{money(leakDetection.high)})
        </label>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-[#0F1F1D] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">{method.shortLabel} estimate</p>
          <p className="mt-1 text-2xl font-bold text-white">{money(result.low)}-{money(result.high)}</p>
        </div>
        <div className="rounded-lg bg-[#0F1F1D] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Typical range, all DFW slab leaks</p>
          <p className="mt-1 text-2xl font-bold text-white">{money(overallAverage.low)}-{money(overallAverage.high)}</p>
          <p className="mt-1 text-xs text-slate-400">Published average: {money(overallAverage.avg)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400">{method.note} {method.source}.</p>
      <p className="mt-2 text-xs text-slate-400">
        {leakDetection.note} {overallAverage.note} These are planning estimates only, not a quote - a
        licensed plumber&apos;s leak detection is the only way to confirm which repair method your pipe
        actually qualifies for.
      </p>
    </div>
  );
}
