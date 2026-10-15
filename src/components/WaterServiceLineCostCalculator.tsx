"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import {
  serviceLineMethods,
  getServiceLineMethod,
  serviceLineMaterials,
  getServiceLineMaterial,
  distanceAddOn,
  spotRepairRange,
  permitRange,
  type ServiceLineMethodId,
  type PipeMaterialId
} from "@/data/waterServiceLineCosts";

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export default function WaterServiceLineCostCalculator() {
  const [length, setLength] = useState(50);
  const [methodId, setMethodId] = useState<ServiceLineMethodId>("trenched");
  const [materialId, setMaterialId] = useState<PipeMaterialId>("pex");

  const method = getServiceLineMethod(methodId);
  const material = getServiceLineMaterial(materialId);

  const result = useMemo(() => {
    const safeLength = Math.max(10, length);
    const low = safeLength * method.perFootLow;
    const high = safeLength * method.perFootHigh;
    return { low, high };
  }, [length, method]);

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      try {
        sendGAEvent("event", "water_service_line_calculator_use", {
          method_id: methodId,
          material_id: materialId,
          length
        });
      } catch {
        // analytics unavailable - ignore
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [methodId, materialId, length]);

  const field = "w-full rounded-lg border border-[#1A3A38] bg-[#0B1614] p-3 text-white";

  return (
    <div className="rounded-xl border border-[#1A3A38] p-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm text-slate-300">
          Distance from street/meter to house (ft)
          <input
            className={field}
            type="number"
            min={10}
            max={300}
            step={5}
            value={length}
            onChange={(e) => setLength(Math.max(10, Number(e.target.value) || 10))}
          />
        </label>
        <label className="block text-sm text-slate-300">
          Installation method
          <select
            className={field}
            value={methodId}
            onChange={(e) => setMethodId(e.target.value as ServiceLineMethodId)}
          >
            {serviceLineMethods.map((m) => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-slate-300">
          Pipe material
          <select
            className={field}
            value={materialId}
            onChange={(e) => setMaterialId(e.target.value as PipeMaterialId)}
          >
            {serviceLineMaterials.map((m) => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 rounded-lg bg-[#0F1F1D] p-4">
        <p className="text-xs uppercase tracking-wide text-slate-400">{method.shortLabel} estimate for {length} ft</p>
        <p className="mt-1 text-2xl font-bold text-white">{money(result.low)}-{money(result.high)}</p>
      </div>

      <p className="mt-4 text-xs text-slate-400">{method.note}</p>
      <p className="mt-2 text-xs text-slate-400">
        {material.label} material itself typically runs {money(material.perFootMaterialLow)}-{money(material.perFootMaterialHigh)} per linear foot,
        separate from labor - jobs using {material.label.toLowerCase()} tend to land toward the {material.tendsToward === "high" ? "higher" : "lower"} end
        of the installed estimate above rather than changing the total directly.
      </p>
      <p className="mt-3 text-xs text-slate-400">{distanceAddOn.note}</p>
      <p className="mt-2 text-xs text-slate-400">
        A single spot repair (one failure point, not a full replacement) typically runs {money(spotRepairRange.low)}-{money(spotRepairRange.high)} instead.
        Most DFW cities also require a permit (typically {money(permitRange.low)}-{money(permitRange.high)}) for this work.
      </p>
      <p className="mt-3 text-xs text-slate-400">
        These are planning estimates only, not a quote - soil type, depth, driveway or sidewalk crossings, and how
        far the house sits from the connection point all move the real number. A licensed plumber&apos;s on-site
        walkthrough is the only way to get an exact price.
      </p>
    </div>
  );
}
