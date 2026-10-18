"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import {
  regulatorSizes,
  getRegulatorSize,
  regulatorTypes,
  getRegulatorType,
  accessibilityAddOn,
  permitRange,
  inspectionRange,
  repairRange,
  type RegulatorSizeId,
  type RegulatorTypeId
} from "@/data/pressureRegulatorCosts";

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export default function PressureRegulatorCostCalculator() {
  const [sizeId, setSizeId] = useState<RegulatorSizeId>("three-quarter");
  const [typeId, setTypeId] = useState<RegulatorTypeId>("spring-loaded");
  const [hardToAccess, setHardToAccess] = useState(false);
  const [permitNeeded, setPermitNeeded] = useState(false);

  const size = getRegulatorSize(sizeId);
  const type = getRegulatorType(typeId);

  const result = useMemo(() => {
    let low = size.installedLow;
    let high = size.installedHigh;
    if (hardToAccess) {
      low += accessibilityAddOn.low;
      high += accessibilityAddOn.high;
    }
    if (permitNeeded) {
      low += permitRange.low + inspectionRange.low;
      high += permitRange.high + inspectionRange.high;
    }
    return { low, high };
  }, [size, hardToAccess, permitNeeded]);

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      try {
        sendGAEvent("event", "prv_cost_calculator_use", {
          size_id: sizeId,
          type_id: typeId,
          hard_to_access: hardToAccess,
          permit_needed: permitNeeded
        });
      } catch {
        // analytics unavailable - ignore
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [sizeId, typeId, hardToAccess, permitNeeded]);

  const field = "w-full rounded-lg border border-[#1A3A38] bg-[#0B1614] p-3 text-white";

  return (
    <div className="rounded-xl border border-[#1A3A38] p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-slate-300">
          Line size
          <select className={field} value={sizeId} onChange={(e) => setSizeId(e.target.value as RegulatorSizeId)}>
            {regulatorSizes.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-slate-300">
          Regulator type (for reference)
          <select className={field} value={typeId} onChange={(e) => setTypeId(e.target.value as RegulatorTypeId)}>
            {regulatorTypes.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input type="checkbox" checked={hardToAccess} onChange={(e) => setHardToAccess(e.target.checked)} />
          Regulator is hidden or hard to access (behind a wall, under a floor, in a crawl space)
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input type="checkbox" checked={permitNeeded} onChange={(e) => setPermitNeeded(e.target.checked)} />
          My city requires a permit and inspection for this work
        </label>
      </div>

      <div className="mt-6 rounded-lg bg-[#0F1F1D] p-4">
        <p className="text-xs uppercase tracking-wide text-slate-400">{size.shortLabel} installed estimate</p>
        <p className="mt-1 text-2xl font-bold text-white">{money(result.low)}-{money(result.high)}</p>
      </div>

      <p className="mt-4 text-xs text-slate-400">{size.note}</p>
      <p className="mt-2 text-xs text-slate-400">
        A {type.label.toLowerCase()} regulator&apos;s part alone typically runs {money(type.unitLow)}-{money(type.unitHigh)},
        separate from labor - this is shown for reference only and is not added on top of the installed estimate above,
        which already includes a typical part plus labor for that size category.
      </p>
      <p className="mt-3 text-xs text-slate-400">
        Simply repairing a failing regulator instead of replacing it typically runs {money(repairRange.low)}-{money(repairRange.high)} -
        worth asking about if the unit is otherwise new, but replacement is usually the better value once a repair
        quote gets close to half the cost of a new installed unit.
      </p>
      <p className="mt-3 text-xs text-slate-400">
        These are planning estimates only, not a quote - exact accessibility, local permit rules, and whether any
        after-hours or emergency work is involved all move the real number. A licensed plumber&apos;s on-site look
        is the only way to get an exact price.
      </p>
    </div>
  );
}
