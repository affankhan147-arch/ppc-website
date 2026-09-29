"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import {
  brandFamilies,
  getBrandFamily,
  resolveFourDigitYear,
  manualLookupBrands,
  type BrandFamilyId
} from "@/data/waterHeaterAgeCodes";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const CURRENT_YEAR = new Date().getFullYear();

export default function WaterHeaterAgeLookup() {
  const [familyId, setFamilyId] = useState<BrandFamilyId>("rheem-family");
  const [code, setCode] = useState("");
  const family = getBrandFamily(familyId);

  const result = useMemo(() => {
    const digits = code.replace(/\D/g, "");
    if (digits.length < 4) return null;
    const first = Number(digits.slice(0, 2));
    const second = Number(digits.slice(2, 4));

    if (family.format === "month-year") {
      if (first < 1 || first > 12) return { error: "First two digits should be a month (01-12) for this brand family - double-check you're reading the date code, not a model number." };
      const year = resolveFourDigitYear(second, CURRENT_YEAR);
      const age = CURRENT_YEAR - year;
      return { month: monthNames[first - 1], year, age, approximate: false };
    }

    // year-week format
    const year = resolveFourDigitYear(first, CURRENT_YEAR);
    const week = second;
    if (week < 1 || week > 53) return { error: "The digits after the year should be a week number (01-53) for this brand family - double-check you're reading the date code, not a model number." };
    const approxMonth = Math.min(12, Math.max(1, Math.ceil((week / 53) * 12)));
    const age = CURRENT_YEAR - year;
    return { month: monthNames[approxMonth - 1], year, age, approximate: true };
  }, [code, family]);

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!result || "error" in result) return;
    const timer = setTimeout(() => {
      try {
        sendGAEvent("event", "water_heater_age_lookup_use", { family: familyId });
      } catch {
        // analytics unavailable - ignore
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [familyId, result]);

  const field = "w-full rounded-lg border border-[#1A3A38] bg-[#0B1614] p-3 text-white";

  return (
    <div className="rounded-xl border border-[#1A3A38] p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-slate-300">
          Brand
          <select
            className={field}
            value={familyId}
            onChange={(e) => setFamilyId(e.target.value as BrandFamilyId)}
          >
            {brandFamilies.map((f) => (
              <option key={f.id} value={f.id}>{f.label}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-slate-300">
          First 4 digits of the serial number
          <input
            className={field}
            type="text"
            inputMode="numeric"
            maxLength={4}
            placeholder={family.format === "month-year" ? "e.g. 0724" : "e.g. 2410"}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </label>
      </div>

      <p className="mt-3 text-xs text-slate-400">{family.note} {family.example}.</p>

      {result && "error" in result && (
        <div className="mt-6 rounded-lg bg-[#0F1F1D] p-4 text-amber-300">{result.error}</div>
      )}

      {result && !("error" in result) && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-[#0F1F1D] p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              {result.approximate ? "Approximate manufacture date" : "Manufacture date"}
            </p>
            <p className="mt-1 text-2xl font-bold text-white">{result.month} {result.year}</p>
          </div>
          <div className="rounded-lg bg-[#0F1F1D] p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">Approximate age</p>
            <p className="mt-1 text-2xl font-bold text-white">{result.age} {result.age === 1 ? "year" : "years"} old</p>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-lg bg-[#0F1F1D] p-4 text-slate-300">
        <p className="text-sm">
          Different brand? Bradford White and most tankless brands (Rinnai, Navien, Noritz, Bosch) use a
          letter-based date code or print the date in plain text - rather than guess at a letter cipher,
          check it directly with the manufacturer:
        </p>
        <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
          {manualLookupBrands.map((b) => (
            <li key={b.brand}>
              <a href={b.url} target="_blank" rel="noopener noreferrer" className="text-[#F0B429] underline">{b.brand}</a>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        A two-digit year is read as this century unless that would place manufacture in the future, in which
        case it&apos;s read as last century - the standard way both sourced guides handle the same ambiguity.
        This is an estimate based on published brand date-code formats, not a substitute for the rating plate
        on the unit itself, which is the most reliable source.
      </p>
    </div>
  );
}
