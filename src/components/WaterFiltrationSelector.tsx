"use client";

import { useEffect, useRef, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import {
  filtrationSystems,
  getFiltrationSystem,
  getDisinfectantNote,
  type FiltrationSystemId
} from "@/data/waterFiltrationCosts";
import { waterHardnessData, regionalAverageHardness } from "@/data/waterHardness";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function WaterFiltrationSelector() {
  const [citySlug, setCitySlug] = useState<string>(waterHardnessData[0].slug);
  const [concernId, setConcernId] = useState<FiltrationSystemId>("carbon");

  const system = getFiltrationSystem(concernId);
  const disinfectantNote = getDisinfectantNote(citySlug);

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      try {
        sendGAEvent("event", "water_filtration_selector_use", { city: citySlug, concern_id: concernId });
      } catch {
        // analytics unavailable - ignore
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [citySlug, concernId]);

  const field = "w-full rounded-lg border border-[#1A3A38] bg-[#0B1614] p-3 text-white";

  return (
    <div className="rounded-xl border border-[#1A3A38] p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-slate-300">
          Your city
          <select className={field} value={citySlug} onChange={(e) => setCitySlug(e.target.value)}>
            {waterHardnessData.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
            <option value={regionalAverageHardness.slug}>{regionalAverageHardness.name}</option>
          </select>
        </label>
        <label className="block text-sm text-slate-300">
          Your main concern
          <select
            className={field}
            value={concernId}
            onChange={(e) => setConcernId(e.target.value as FiltrationSystemId)}
          >
            {filtrationSystems.map((s) => (
              <option key={s.id} value={s.id}>{s.bestFor}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-[#0F1F1D] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Recommended system</p>
          <p className="mt-1 text-xl font-bold text-white">{system.label}</p>
        </div>
        <div className="rounded-lg bg-[#0F1F1D] p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Installed cost range</p>
          <p className="mt-1 text-2xl font-bold text-white">{money(system.lowInstalled)}-{money(system.highInstalled)}</p>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-[#0F1F1D] p-4 text-slate-300">
        <p>{system.note}</p>
      </div>

      {disinfectantNote && (
        <div className="mt-4 rounded-lg border border-[#1A3A38] p-4 text-slate-300">
          <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
            What your city&apos;s water utility uses
          </p>
          <p>{disinfectantNote.note}</p>
        </div>
      )}

      <p className="mt-4 text-xs text-slate-400">
        Installed-cost ranges by system type: HomeAdvisor, &quot;How Much Do Home Water Filtration Systems
        Cost?&quot; (2025/2026 data, independently re-verified against the same page a second time this
        session). Disinfectant facts: Dallas Water Utilities&apos; and the North Texas Municipal Water
        District&apos;s own published water quality pages.
      </p>
      <p className="mt-2 text-xs text-slate-400">
        These are planning estimates only, not a quote - your actual installed cost depends on your home&apos;s
        plumbing layout, water pressure, and whether electrical access is needed for a UV stage. A licensed
        plumber&apos;s on-site look is the only way to confirm the exact number.
      </p>
    </div>
  );
}
