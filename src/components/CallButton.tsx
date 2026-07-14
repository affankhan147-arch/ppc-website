"use client";

import { PhoneCall } from "lucide-react";
import { hasConfiguredPhone, siteConfig } from "@/data/site";

type CallButtonProps = {
  label?: string;
  location: string;
  className?: string;
  eventName?: string;
  pagePath?: string;
  pageType?: string;
  service?: string;
  city?: string;
  problem?: string;
};

const hasUsablePhone = hasConfiguredPhone();

function inferEventName(location: string) {
  if (location === "header") return "header_call_click";
  if (location.includes("mobile-sticky")) return "sticky_call_click";
  if (location.startsWith("service-")) return "service_page_call";
  if (location.startsWith("city-")) return "city_page_call";
  if (location.startsWith("problem-")) return "emergency_page_call";
  if (location.startsWith("cost-")) return "cost_page_call";
  return "phone_click";
}

function inferPageType(pathname: string) {
  if (pathname === "/") return "homepage";
  if (pathname === "/contact") return "contact";
  if (pathname.startsWith("/services/")) return "service";
  if (pathname.startsWith("/cities/") && pathname.split("/").filter(Boolean).length === 3) return "city-service";
  if (pathname.startsWith("/cities/")) return "city";
  if (pathname.startsWith("/problems/")) return "problem";
  if (pathname.startsWith("/cost-guides/")) return "cost-guide";
  return "other";
}

function inferDeviceContext() {
  if (typeof window === "undefined") return "unknown";
  return window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";
}

export function CallButton({
  label = hasUsablePhone ? `Call ${siteConfig.phoneDisplay || siteConfig.phoneE164}` : "Request Emergency Help",
  location,
  className = "",
  eventName,
  pagePath,
  pageType,
  service,
  city,
  problem
}: CallButtonProps) {
  function buildCallEventUrl() {
    const pathname = pagePath || (typeof window === "undefined" ? "" : window.location.pathname);
    const params = new URLSearchParams({
      eventName: eventName || inferEventName(location),
      location,
      ctaLocation: location,
      pagePath: pathname,
      pageType: pageType || inferPageType(pathname),
      service: service || "",
      city: city || "",
      problem: problem || "",
      deviceContext: inferDeviceContext()
    });

    return `/api/call-event?${params.toString()}`;
  }

  function handleClick() {
    const callEventUrl = buildCallEventUrl();
    if (navigator.sendBeacon) {
      navigator.sendBeacon(callEventUrl);
      return;
    }
    void fetch(callEventUrl, { keepalive: true }).catch(() => undefined);
  }

  return (
    <a
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-orange-700 px-5 py-3 text-base font-black text-white shadow-sm transition hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-300 ${className}`}
      href={hasUsablePhone ? `tel:${siteConfig.phoneE164}` : "/contact"}
      data-call-event-name={eventName || inferEventName(location)}
      data-cta-location={location}
      data-phone-mode={hasUsablePhone ? "tel" : "contact-placeholder"}
      onClick={handleClick}
      aria-label={`${label} from ${location}`}
    >
      <PhoneCall className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}
