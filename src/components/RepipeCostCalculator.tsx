"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { pipeMaterials, getPipeMaterial, perSqFtRate, type PipeMaterialId } from "@/data/repipeCosts";

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export default function RepipeCostCalculator() {
  const [sqft, setSqft] = useState(1800);
  const [materialId, setMaterialId] = useState<PipeMaterialId>("pex");

  const material = getPipeMaterial(materialId);
  const pex = getPipeMaterial("pex");

  const result = useMemo(() => {
    const safeSqft = Math.max(400, sqft);
    const baseLow = safeSqft * perSqFtRate.low;
    const baseHigh = safeSqft * perSqFtRate.high;
    const low = baseLow * material.multiplier;
    const high = baseHigh * material.multiplier;
    const pexLow = baseLow * pex.multiplier;
    const pexHigh = baseHigh * pex.multiplier;
    return { low, high, pexLow, pexHigh };
  }, [sqft, material, pex]);

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      try {
        sendGAEvent("event", "repipe_calculator_use", { material_id: materialId, sqft });
      } catch {
        // analytics unavailable - ignore
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [materialId, sqft]);

  const field = "w-full rounded-lg border border-[#1A3A38] bg-[#0B1614] p-3 text-white";

  return (
    <div className="rounded-xl border border-[#1A3A38] p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-slate-300">
          Home size (square feet)
          <input
            className={field}
            type="number"
            min={400}
            max={5000}
            step={50}
            value={sqft}
            onChange={(e) => setSqft(Math.max(400, Number(e.target.value) || 400))}
          />
        </label>
        <label className="block text-sm text-slate-300">
          Pipe material
          <select
            className={field}
            value={materialId}
            onChange={(e) => setMaterialId(e.target.value as PipeMaterialId)}
          >
            {pipeMaterials.map((m) => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 rounded-lg bg-[#0F1F1D] p-4">
        <p className="text-xs uppercase tracking-wide text-slate-400">{material.shortLabel} full-repipe estimate</p>
        <p className="mt-1 text-2xl font-bold text-white">{money(result.low)}-{money(result.high)}</p>
      </div>

      {materialId === "copper" && (
        <div className="mt-4 rounded-lg bg-[#0F1F1D] p-4 text-slate-300">
          <p>
            For comparison, the same home repiped in PEX would run roughly{" "}
            <strong>{money(result.pexLow)}-{money(result.pexHigh)}</strong> - most DFW repipe jobs today
            use PEX rather than copper for exactly this reason.
          </p>
        </div>
      )}

      <p className="mt-4 text-xs text-slate-400">{material.note}</p>
      <p className="mt-2 text-xs text-slate-400">
        {perSqFtRate.note} These are planning estimates only, not a quote - the number of fixtures, whether
        your home is slab or pier-and-beam, attic/crawlspace access, and any drywall repair all move the
        real number. A licensed plumber&apos;s walkthrough is the only way to get an exact price.
      </p>
    </div>
  );
}
