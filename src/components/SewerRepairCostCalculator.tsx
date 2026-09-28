"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import {
  repairMethods,
  getRepairMethod,
  cameraInspection,
  permitFee,
  treeRootObstacle,
  type RepairMethodId
} from "@/data/sewerRepairCosts";

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export default function SewerRepairCostCalculator() {
  const [length, setLength] = useState(50);
  const [methodId, setMethodId] = useState<RepairMethodId>("cipp-lining");
  const [needsCamera, setNeedsCamera] = useState(true);
  const [needsPermit, setNeedsPermit] = useState(true);
  const [hasRootObstacle, setHasRootObstacle] = useState(false);

  const method = getRepairMethod(methodId);
  const traditional = getRepairMethod("traditional");

  const result = useMemo(() => {
    const safeLength = Math.max(1, length);
    let low = method.lowPerFoot * safeLength;
    let high = method.highPerFoot * safeLength;
    let tradLow = traditional.lowPerFoot * safeLength;
    let tradHigh = traditional.highPerFoot * safeLength;

    if (needsCamera) {
      low += cameraInspection.low;
      high += cameraInspection.high;
      tradLow += cameraInspection.low;
      tradHigh += cameraInspection.high;
    }
    if (needsPermit) {
      low += permitFee.low;
      high += permitFee.high;
      tradLow += permitFee.low;
      tradHigh += permitFee.high;
    }
    if (hasRootObstacle) {
      // Assume a typical 3-hour extra-labor obstacle allowance.
      low += treeRootObstacle.low * 3;
      high += treeRootObstacle.high * 3;
      tradLow += treeRootObstacle.low * 3;
      tradHigh += treeRootObstacle.high * 3;
    }

    return { low, high, tradLow, tradHigh, savingsLow: tradLow - high, savingsHigh: tradHigh - low };
  }, [length, method, traditional, needsCamera, needsPermit, hasRootObstacle]);

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      try {
        sendGAEvent("event", "sewer_repair_calculator_use", { method_id: methodId, length });
      } catch {
        // analytics unavailable - ignore
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [methodId, length, needsCamera, needsPermit, hasRootObstacle]);

  const field = "w-full rounded-lg border border-[#1A3A38] bg-[#0B1614] p-3 text-white";

  return (
    <div className="rounded-xl border border-[#1A3A38] p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-slate-300">
          Sewer line length needing repair (feet)
          <input
            className={field}
            type="number"
            min={1}
            max={200}
            step={1}
            value={length}
            onChange={(e) => setLength(Math.max(1, Number(e.target.value) || 1))}
          />
        </label>
        <label className="block text-sm text-slate-300">
          Repair method
          <select className={field} value={methodId} onChange={(e) => setMethodId(e.target.value as RepairMethodId)}>
            {repairMethods.map((m) => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-300 sm:col-span-2">
          <input type="checkbox" checked={needsCamera} onChange={(e) => setNeedsCamera(e.target.checked)} />
          Include a diagnostic camera inspection ({money(cameraInspection.low)}-{money(cameraInspection.high)})
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-300 sm:col-span-2">
          <input type="checkbox" checked={needsPermit} onChange={(e) => setNeedsPermit(e.target.checked)} />
          Assume a city permit is required (up to {money(permitFee.high)})
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-300 sm:col-span-2">
          <input type="checkbox" checked={hasRootObstacle} onChange={(e) => setHasRootObstacle(e.target.checked)} />
          Tree roots or other obstacles likely in the way (adds extra excavation labor)
        </label>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-[#0F1F1D] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">{method.shortLabel} estimate</p>
          <p className="mt-1 text-2xl font-bold text-white">{money(result.low)}-{money(result.high)}</p>
        </div>
        <div className="rounded-lg bg-[#0F1F1D] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Traditional dig-and-replace estimate</p>
          <p className="mt-1 text-2xl font-bold text-white">{money(result.tradLow)}-{money(result.tradHigh)}</p>
        </div>
      </div>

      {method.minDisruption && (
        <div className="mt-4 rounded-lg bg-[#0F1F1D] p-4 text-slate-300">
          <p>
            Going trenchless here could save roughly <strong>{money(Math.max(0, result.savingsLow))}-{money(Math.max(0, result.savingsHigh))}</strong>{" "}
            versus a full dig-and-replace at this length, with far less yard disruption - but only if your pipe&apos;s
            condition actually qualifies. A collapsed section or a pipe with bellies (sags) can&apos;t be lined or burst.
          </p>
        </div>
      )}

      <p className="mt-4 text-xs text-slate-400">{method.note} {method.source}.</p>
      <p className="mt-2 text-xs text-slate-400">
        {cameraInspection.note} {treeRootObstacle.note} {permitFee.note} These are planning estimates only, not a
        quote - a licensed plumber&apos;s camera inspection is the only way to confirm your pipe&apos;s actual condition
        and which methods are viable.
      </p>
    </div>
  );
}
