"use client";

import { PhoneCall } from "lucide-react";
import { siteConfig } from "@/data/site";

type CallButtonProps = {
  label?: string;
  location: string;
  className?: string;
};

const hasUsablePhone = !siteConfig.phoneE164.includes("X");

export function CallButton({ label = hasUsablePhone ? `Call ${siteConfig.phoneDisplay}` : "Request Emergency Help", location, className = "" }: CallButtonProps) {
  const callEventUrl = `/api/call-event?location=${encodeURIComponent(location)}`;

  function handleClick() {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(callEventUrl);
      return;
    }
    void fetch(callEventUrl, { keepalive: true }).catch(() => undefined);
  }

  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 ${className}`}
      href={hasUsablePhone ? `tel:${siteConfig.phoneE164}` : "/contact"}
      data-call-event-url={callEventUrl}
      onClick={handleClick}
      aria-label={`${label} from ${location}`}
    >
      <PhoneCall className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}
