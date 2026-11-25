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
          className="fixed inset-x-0 bottom-0 z-50 border-t border-rule bg-paper px-4 py-3 sm:px-6 sm:py-4"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <p className="text-sm leading-6 text-muted">
              This site uses cookies for basic analytics to understand how visitors use it. See our{" "}
              <a href="/privacy" className="underline hover:text-accent">
                Privacy Policy
              </a>{" "}
              for details.{" "}
              <span className="hidden sm:inline">
                You can accept or decline analytics cookies, and change your choice anytime from the footer.
              </span>
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => choose("declined")}
                className="rounded-lg border border-rule px-4 py-2 text-sm font-semibold text-ink-2 transition hover:bg-paper-2"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-black text-accent-ink transition hover:bg-[color-mix(in_oklab,var(--color-accent)_88%,black)]"
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
