"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { unitTypes, repairOptions, getUnitType, getRepairOption } from "@/data/waterHeaterReplaceCosts";
import { waterHardnessData } from "@/data/waterHardness";

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

type Verdict = "replace" | "borderline" | "repair";

export default function WaterHeaterReplaceCalculator() {
  const [unitTypeId, setUnitTypeId] = useState<"tank" | "tankless">("tank");
  const [age, setAge] = useState(8);
  const [repairId, setRepairId] = useState(repairOptions[0].id);
  const [customCost, setCustomCost] = useState(300);
  const [citySlug, setCitySlug] = useState(waterHardnessData[0].slug);

  const unit = getUnitType(unitTypeId);
  const repair = getRepairOption(repairId);
  const city = waterHardnessData.find((c) => c.slug === citySlug) ?? waterHardnessData[0];

  const repairCost = repairId === "custom" ? Math.max(0, customCost) : (repair.lowCost + repair.highCost) / 2;
  const replaceMid = (unit.replaceLow + unit.replaceHigh) / 2;
  const ratio = repairCost > 0 ? repairCost / replaceMid : 0;

  const result = useMemo(() => {
    let verdict: Verdict;
    let reason: string;

    if (repair.alwaysReplace) {
      verdict = "replace";
      reason = "A leak from the tank body itself isn't a repairable part - the tank is compromised. Replacement is the only real option.";
    } else if (ratio >= 0.5) {
      verdict = "replace";
      reason = `Your estimated repair (${money(repairCost)}) is at or above 50% of a typical replacement (${money(replaceMid)}). Rheem's own repair-vs-replace guidance says once repair cost crosses that line, replacement is almost always the better investment.`;
    } else if (age >= unit.expectedLifespanHigh) {
      verdict = "replace";
      reason = `Your unit is ${age} years old, at or past the full ${unit.expectedLifespanLow}-${unit.expectedLifespanHigh}-year expected lifespan for a ${unit.label.toLowerCase()}. Even a cheap repair now is likely to be followed by another one soon.`;
    } else if (age >= unit.expectedLifespanLow) {
      verdict = "borderline";
      reason = `This specific repair is reasonable on cost, but your unit (${age} years old) is already inside the ${unit.expectedLifespanLow}-${unit.expectedLifespanHigh}-year range manufacturers expect it to need replacing. Go ahead with the repair, but start budgeting for a planned replacement instead of waiting for the next failure.`;
    } else {
      verdict = "repair";
      reason = `At ${age} years old, your unit is still well inside its expected service life, and this repair is well under the 50% cost line. Repair is the sensible choice here.`;
    }
    return { verdict, reason };
  }, [repair, ratio, age, unit, repairCost, replaceMid]);

  const verdictLabel: Record<Verdict, string> = {
    replace: "Replace",
    borderline: "Repair now, plan to replace soon",
    repair: "Repair"
  };
  const verdictColor: Record<Verdict, string> = {
    replace: "text-red-400",
    borderline: "text-[#F0B429]",
    repair: "text-green-400"
  };

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      try {
        sendGAEvent("event", "water_heater_calculator_use", { unit_type: unitTypeId, repair_id: repairId, verdict: result.verdict });
      } catch {
        // analytics unavailable - ignore
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [unitTypeId, repairId, age, customCost, result.verdict]);

  const field = "w-full rounded-lg border border-[#1A3A38] bg-[#0B1614] p-3 text-white";

  return (
    <div className="rounded-xl border border-[#1A3A38] p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-slate-300">
          Water heater type
          <select className={field} value={unitTypeId} onChange={(e) => setUnitTypeId(e.target.value as "tank" | "tankless")}>
            {unitTypes.map((u) => (
              <option key={u.id} value={u.id}>{u.label}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-slate-300">
          Age of unit (years)
          <input className={field} type="number" min={0} max={40} step={1} value={age}
            onChange={(e) => setAge(Math.max(0, Number(e.target.value) || 0))} />
        </label>
        <label className="block text-sm text-slate-300 sm:col-span-2">
          What needs fixing?
          <select className={field} value={repairId} onChange={(e) => setRepairId(e.target.value)}>
            {repairOptions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}{r.id !== "custom" && !r.alwaysReplace ? ` (~${money(r.lowCost)}-${money(r.highCost)})` : ""}
              </option>
            ))}
          </select>
        </label>

        {repairId === "custom" && (
          <label className="block text-sm text-slate-300 sm:col-span-2">
            Quoted repair cost ($)
            <input className={field} type="number" min={0} step={10} value={customCost}
              onChange={(e) => setCustomCost(Number(e.target.value) || 0)} />
          </label>
        )}
        <label className="block text-sm text-slate-300 sm:col-span-2">
          Your DFW city (for a water-hardness note)
          <select className={field} value={citySlug} onChange={(e) => setCitySlug(e.target.value)}>
            {waterHardnessData.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-[#0F1F1D] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Estimated repair cost</p>
          <p className="mt-1 text-2xl font-bold text-white">{repair.alwaysReplace ? "N/A" : money(repairCost)}</p>
        </div>
        <div className="rounded-lg bg-[#0F1F1D] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Typical new {unitTypeId} unit installed</p>
          <p className="mt-1 text-2xl font-bold text-white">{money(unit.replaceLow)}-{money(unit.replaceHigh)}</p>
        </div>
        <div className="rounded-lg bg-[#0F1F1D] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Recommendation</p>
          <p className={`mt-1 text-2xl font-bold ${verdictColor[result.verdict]}`}>{verdictLabel[result.verdict]}</p>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-[#0F1F1D] p-4 text-slate-300">
        <p>{result.reason}</p>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        {repair.note} {unit.label} typically lasts {unit.expectedLifespanLow}-{unit.expectedLifespanHigh} years ({unit.source}).
        In {city.name}, water hardness runs {city.rangeLabel} GPG ({city.classification}) - homes in DFW&apos;s harder-water
        cities typically need more frequent tank flushing and often see faster sediment buildup; see our{" "}
        <a href="/guides/dfw-water-heater-lifespan" className="underline">DFW water heater lifespan guide</a> for the full breakdown.
        These are planning estimates only, not a quote - a licensed plumber&apos;s inspection is the final word.
      </p>
    </div>
  );
}
