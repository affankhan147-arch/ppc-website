"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import {
  softenerTypes,
  getSoftenerType,
  recommendGrainCapacity,
  defaultGallonsPerPersonPerDay,
  type SoftenerTypeId
} from "@/data/waterSoftenerCosts";
import { waterHardnessData, regionalAverageHardness } from "@/data/waterHardness";

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

function midGpg(rangeLabel: string): number {
  const parts = rangeLabel.split("-").map((p) => parseFloat(p));
  if (parts.length === 2 && !Number.isNaN(parts[0]) && !Number.isNaN(parts[1])) {
    return (parts[0] + parts[1]) / 2;
  }
  return 10;
}

export default function WaterSoftenerCostCalculator() {
  const [citySlug, setCitySlug] = useState<string>(waterHardnessData[0].slug);
  const [people, setPeople] = useState(4);
  const [gpd, setGpd] = useState(defaultGallonsPerPersonPerDay);
  const [typeId, setTypeId] = useState<SoftenerTypeId>("single-tank");

  const cityEntry =
    waterHardnessData.find((c) => c.slug === citySlug) ?? regionalAverageHardness;
  const type = getSoftenerType(typeId);

  const result = useMemo(() => {
    const hardnessGpg = midGpg(cityEntry.rangeLabel);
    const dailyGrainLoad = Math.max(1, people) * Math.max(1, gpd) * hardnessGpg;
    const tier = recommendGrainCapacity(dailyGrainLoad);
    return { hardnessGpg, dailyGrainLoad, tier };
  }, [cityEntry, people, gpd]);

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      try {
        sendGAEvent("event", "water_softener_calculator_use", { city: citySlug, type_id: typeId });
      } catch {
        // analytics unavailable - ignore
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [citySlug, people, gpd, typeId]);

  const field = "w-full rounded-lg border border-[#1A3A38] bg-[#0B1614] p-3 text-white";

  return (
    <div className="rounded-xl border border-[#1A3A38] p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-slate-300">
          Your city
          <select className={field} value={citySlug} onChange={(e) => setCitySlug(e.target.value)}>
            {waterHardnessData.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name} ({c.rangeLabel} GPG)</option>
            ))}
            <option value={regionalAverageHardness.slug}>
              {regionalAverageHardness.name} ({regionalAverageHardness.rangeLabel} GPG)
            </option>
          </select>
        </label>
        <label className="block text-sm text-slate-300">
          People in the household
          <input
            className={field}
            type="number"
            min={1}
            max={10}
            step={1}
            value={people}
            onChange={(e) => setPeople(Math.max(1, Number(e.target.value) || 1))}
          />
        </label>
        <label className="block text-sm text-slate-300 sm:col-span-2">
          Estimated water use (gallons per person per day) - adjust if you know your actual usage from a water bill
          <input
            className={field}
            type="number"
            min={20}
            max={150}
            step={5}
            value={gpd}
            onChange={(e) => setGpd(Math.max(20, Number(e.target.value) || defaultGallonsPerPersonPerDay))}
          />
        </label>
        <label className="block text-sm text-slate-300 sm:col-span-2">
          Softener type
          <select className={field} value={typeId} onChange={(e) => setTypeId(e.target.value as SoftenerTypeId)}>
            {softenerTypes.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-[#0F1F1D] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Recommended grain capacity</p>
          <p className="mt-1 text-2xl font-bold text-white">{result.tier.grains.toLocaleString("en-US")} grains</p>
        </div>
        <div className="rounded-lg bg-[#0F1F1D] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">{type.shortLabel}, installed</p>
          <p className="mt-1 text-2xl font-bold text-white">{money(type.lowInstalled)}-{money(type.highInstalled)}</p>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-[#0F1F1D] p-4 text-slate-300">
        <p>
          At {result.hardnessGpg.toFixed(0)} GPG for {cityEntry.name} and {people} {people === 1 ? "person" : "people"}{" "}
          using {gpd} gal/day each, your household runs through about{" "}
          <strong>{Math.round(result.dailyGrainLoad).toLocaleString("en-US")} grains/day</strong>. Equipment-only cost
          for a {result.tier.grains.toLocaleString("en-US")}-grain unit typically runs {money(result.tier.equipmentLow)}-
          {money(result.tier.equipmentHigh)}, before labor, plumbing changes, and disposal.
        </p>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        Grain-capacity sizing uses a commonly published water-treatment industry rule of thumb (daily grain load x 7
        days between regenerations x a 25% reserve buffer) - it is not a manufacturer spec or a regulated figure, which
        is why the water-use input above is adjustable. Installed-cost ranges by type and equipment-only cost by
        capacity: HomeAdvisor, &quot;How Much Does a Water Softener System Cost to Install?&quot; (2025/2026 data).
      </p>
      <p className="mt-2 text-xs text-slate-400">
        These are planning estimates only, not a quote - your actual installed cost depends on existing plumbing
        access, electrical needs, drain-line routing for the brine discharge, and any permit your city requires. A
        licensed plumber&apos;s on-site look is the only way to confirm the exact number.
      </p>
    </div>
  );
}
