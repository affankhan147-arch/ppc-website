"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import {
  disposalProblems,
  recommendTier,
  overallReplacement,
  overallRepair,
  laborPerHour,
  replaceAgeThresholdYears,
  type DisposalProblem
} from "@/data/garbageDisposalCosts";

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export default function GarbageDisposalCostCalculator() {
  const [people, setPeople] = useState(3);
  const [ageYears, setAgeYears] = useState(5);
  const [problem, setProblem] = useState<DisposalProblem>("jammed-or-clogged");

  const tier = recommendTier(Math.max(1, people));

  const result = useMemo(() => {
    const oldUnit = ageYears >= replaceAgeThresholdYears;
    const severeFault = problem === "cracked-or-burned-out" || problem === "estimate-only";
    const leansReplace = oldUnit || severeFault;
    return { leansReplace, oldUnit, severeFault };
  }, [ageYears, problem]);

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      try {
        sendGAEvent("event", "garbage_disposal_calculator_use", {
          problem,
          leans_replace: String(result.leansReplace)
        });
      } catch {
        // analytics unavailable - ignore
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [people, ageYears, problem, result.leansReplace]);

  const field = "w-full rounded-lg border border-[#1A3A38] bg-[#0B1614] p-3 text-white";

  return (
    <div className="rounded-xl border border-[#1A3A38] p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-slate-300">
          What&apos;s going on?
          <select
            className={field}
            value={problem}
            onChange={(e) => setProblem(e.target.value as DisposalProblem)}
          >
            {disposalProblems.map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-slate-300">
          Unit&apos;s age (years), if known
          <input
            className={field}
            type="number"
            min={0}
            max={30}
            step={1}
            value={ageYears}
            onChange={(e) => setAgeYears(Math.max(0, Number(e.target.value) || 0))}
          />
        </label>
        <label className="block text-sm text-slate-300 sm:col-span-2">
          People in the household (for sizing a replacement unit)
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
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-[#0F1F1D] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {result.leansReplace ? "Replacement leans better here" : "Repair is usually worth trying first"}
          </p>
          <p className="mt-1 text-2xl font-bold text-white">
            {result.leansReplace
              ? `${money(tier.installedLow)}-${money(tier.installedHigh)}`
              : `${money(overallRepair.low)}-${money(overallRepair.high)}`}
          </p>
        </div>
        <div className="rounded-lg bg-[#0F1F1D] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {result.leansReplace ? "Recommended size for your household" : "If repair doesn't fix it, replacement range"}
          </p>
          <p className="mt-1 text-2xl font-bold text-white">
            {result.leansReplace
              ? tier.hpRange
              : `${money(tier.installedLow)}-${money(tier.installedHigh)}`}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-[#0F1F1D] p-4 text-slate-300">
        {result.leansReplace ? (
          <p>
            {result.severeFault && problem !== "estimate-only"
              ? "A cracked housing or a burned-out motor usually costs more to repair than a new unit is worth, so replacement is the better move."
              : `At ${ageYears} years old, your disposal is at or past HomeAdvisor's typical 5-10 year lifespan, so putting more money into a repair usually doesn't pay off.`}{" "}
            For a {people}-person household, a {tier.hpRange} unit installed typically runs{" "}
            <strong>{money(tier.installedLow)}-{money(tier.installedHigh)}</strong> (overall average across all sizes:
            about {money(overallReplacement.average)}), including labor at roughly {money(laborPerHour.low)}-
            {money(laborPerHour.high)} per hour for a job that usually takes about an hour.
          </p>
        ) : (
          <p>
            A jam, clog, leak, or a unit that won&apos;t power on is usually a repairable fix on a disposal under{" "}
            {replaceAgeThresholdYears} years old. Garbage disposal repairs typically run{" "}
            <strong>{money(overallRepair.low)}-{money(overallRepair.high)}</strong> (average about{" "}
            {money(overallRepair.average)}). If the plumber finds the motor itself has failed or the housing is
            cracked, replacement for a {people}-person household ({tier.hpRange}) would run{" "}
            {money(tier.installedLow)}-{money(tier.installedHigh)} instead.
          </p>
        )}
      </div>

      <p className="mt-4 text-xs text-slate-400">
        Replacement cost by household-size tier and overall average/range: HomeAdvisor, &quot;How Much Does It Cost to
        Replace a Garbage Disposal?&quot; (fetched 2026-10-14). Repair overall range/average: HomeAdvisor figures as
        cited in Bob Vila&apos;s repair-cost guide - shown as one general range here rather than broken into
        per-problem dollar figures, since that finer breakdown in the secondary source carries no cited source and
        the article itself is several years old.
      </p>
      <p className="mt-2 text-xs text-slate-400">
        This is a planning estimate, not a quote. Wiring problems, disposal mounting issues, and what&apos;s
        actually wrong with your specific unit can only be confirmed by a licensed plumber&apos;s on-site look - and
        if you smell burning or a unit keeps humming after a jam is cleared, shut it off and unplug it first.
      </p>
    </div>
  );
}
