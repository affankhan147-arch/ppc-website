"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";

export const COOKIE_CONSENT_STORAGE_KEY = "phg_cookie_consent";
export const COOKIE_CONSENT_EVENT = "phg-cookie-consent-reset";

type Consent = "accepted" | "declined" | null;

function readStoredConsent(): Consent {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  return stored === "accepted" || stored === "declined" ? stored : null;
}

export function CookieConsent({ gaId }: { gaId: string }) {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(readStoredConsent());
    setReady(true);

    function handleReset() {
      setConsent(null);
    }
    window.addEventListener(COOKIE_CONSENT_EVENT, handleReset);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handleReset);
  }, []);

  function choose(value: "accepted" | "declined") {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value);
    setConsent(value);
  }

  return (
    <>
      {ready && consent === null ? (
        <div
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0B1917] px-4 py-4 shadow-2xl sm:px-6"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-slate-300">
              This site uses cookies for basic analytics to understand how visitors use it. See our{" "}
              <a href="/privacy" className="underline hover:text-[#4FD1C5]">
                Privacy Policy
              </a>{" "}
              for details. You can accept or decline analytics cookies, and change your choice anytime from the footer.
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => choose("declined")}
                className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/5"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="rounded-lg bg-[#4FD1C5] px-4 py-2 text-sm font-black text-[#0B1917] transition hover:bg-[#3fc0b4]"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {consent === "accepted" ? <GoogleAnalytics gaId={gaId} /> : null}
    </>
  );
}

export function CookiePreferencesLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window === "undefined") return;
        window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
        window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
      }}
      className={className}
    >
      Cookie preferences
    </button>
  );
}
