"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { leakCostCities, leakPresets, waterCharge } from "@/data/leakCostRates";

const DAYS_PER_MONTH = 30;
const money = (n: number) => `$${n.toFixed(2)}`;
const gallonsFmt = (n: number) => Math.round(n).toLocaleString("en-US");

export default function LeakCostCalculator() {
  const [citySlug, setCitySlug] = useState(leakCostCities[0].slug);
  const [usage, setUsage] = useState(8000);
  const [presetId, setPresetId] = useState("average");
  const [customGpd, setCustomGpd] = useState(100);

  const city = leakCostCities.find((c) => c.slug === citySlug) ?? leakCostCities[0];
  const preset = leakPresets.find((p) => p.id === presetId);
  const gpd = presetId === "custom" ? Math.max(0, customGpd) : preset?.gallonsPerDay ?? 0;

  const result = useMemo(() => {
    const baseUse = Math.max(0, usage);
    const leakGallons = gpd * DAYS_PER_MONTH;
    const extraWater = waterCharge(city, baseUse + leakGallons) - waterCharge(city, baseUse);
    const sewerCap = city.slug === "dallas" ? 40000 : Infinity;
    const sewerGallons = Math.min(baseUse + leakGallons, sewerCap) - Math.min(baseUse, sewerCap);
    const extraSewer = (sewerGallons / 1000) * city.sewerPerThousand;
    return { leakGallons, extraWater, extraSewer };
  }, [city, usage, gpd]);

  // Usage measurement: one GA4 event per change after the first render. GA only loads after
  // cookie consent (CookieConsent.tsx), so nothing is sent for visitors who decline.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      try {
        sendGAEvent("event", "leak_calculator_use", { city: citySlug, leak_type: presetId });
      } catch {
        // analytics unavailable - ignore
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [citySlug, presetId, usage, customGpd]);

  const field = "w-full rounded-lg border border-[#1A3A38] bg-[#0B1614] p-3 text-white";

  return (
    <div className="rounded-xl border border-[#1A3A38] p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-slate-300">
          Your city
          <select className={field} value={citySlug} onChange={(e) => setCitySlug(e.target.value)}>
            {leakCostCities.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-slate-300">
          Normal monthly water use (gallons)
          <input className={field} type="number" min={0} step={500} value={usage}
            onChange={(e) => setUsage(Number(e.target.value) || 0)} />
        </label>
        <label className="block text-sm text-slate-300 sm:col-span-2">
          Leak type
          <select className={field} value={presetId} onChange={(e) => setPresetId(e.target.value)}>
            {leakPresets.map((p) => (
              <option key={p.id} value={p.id}>{p.label} (~{p.gallonsPerDay} gal/day)</option>
            ))}
            <option value="custom">Custom gallons per day</option>
          </select>
        </label>
        {presetId === "custom" && (
          <label className="block text-sm text-slate-300 sm:col-span-2">
            Gallons lost per day
            <input className={field} type="number" min={0} step={10} value={customGpd}
              onChange={(e) => setCustomGpd(Number(e.target.value) || 0)} />
          </label>
        )}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-[#0F1F1D] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Water lost per month</p>
          <p className="mt-1 text-2xl font-bold text-white">{gallonsFmt(result.leakGallons)} gal</p>
        </div>
        <div className="rounded-lg bg-[#0F1F1D] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Added water charge</p>
          <p className="mt-1 text-2xl font-bold text-[#F0B429]">{money(result.extraWater)}/mo</p>
          <p className="text-xs text-slate-400">{money(result.extraWater * 12)} per year</p>
        </div>
        <div className="rounded-lg bg-[#0F1F1D] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Extra sewer if it runs {city.winterMonths}</p>
          <p className="mt-1 text-2xl font-bold text-[#F0B429]">{money(result.extraSewer)}/mo</p>
          <p className="text-xs text-slate-400">locked into your sewer average</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        {city.name}: {city.effectiveLabel}. {city.sewerRule} Estimates use a 30-day month and the
        published volume rates only; fixed monthly charges don&apos;t change with a leak. Your utility bill is the final word.
      </p>
    </div>
  );
}
