"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type TrackedLinkProps = {
  href: string;
  className?: string;
  eventName: string;
  ctaLocation: string;
  pageType?: string;
  children: ReactNode;
};

function inferDeviceContext() {
  if (typeof window === "undefined") return "unknown";
  return window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";
}

export function TrackedLink({ href, className, eventName, ctaLocation, pageType, children }: TrackedLinkProps) {
  function handleClick() {
    const params = new URLSearchParams({
      eventName,
      ctaLocation,
      pagePath: typeof window === "undefined" ? "" : window.location.pathname,
      pageType: pageType || "",
      deviceContext: inferDeviceContext()
    });
    const eventUrl = `/api/call-event?${params.toString()}`;

    if (navigator.sendBeacon) {
      navigator.sendBeacon(eventUrl);
      return;
    }

    void fetch(eventUrl, { keepalive: true }).catch(() => undefined);
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
