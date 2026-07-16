import { NextResponse } from "next/server";
import { checkRateLimit, clientIdentifier, noStoreHeaders, validateApiRequest } from "@/lib/apiSecurity";
import { hasConfiguredPhone } from "@/data/site";

const allowedEvents = new Set([
  "phone_click",
  "sticky_call_click",
  "header_call_click",
  "service_page_call",
  "city_page_call",
  "emergency_page_call",
  "cost_page_call",
  "contact_form_start",
  "contact_form_submit",
  "partner_application_start",
  "partner_application_submit",
  "email_click",
  "partner_route_click"
]);

function cleanParam(value: string | null, fallback = "") {
  return (value || fallback).replace(/[\r\n\t]/g, " ").slice(0, 160);
}

export async function GET(request: Request) {
  const validation = validateApiRequest(request, { methods: ["GET"] });
  if (!validation.ok) {
    return NextResponse.json({ ok: false, error: validation.error }, { status: validation.status, headers: noStoreHeaders });
  }

  const rate = checkRateLimit(`call-event:${clientIdentifier(request)}`, { limit: 120, windowMs: 60 * 1000 });
  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429, headers: { ...noStoreHeaders, "retry-after": String(rate.retryAfterSeconds) } }
    );
  }

  const url = new URL(request.url);
  const rawEventName = cleanParam(url.searchParams.get("eventName"), "phone_click");
  const eventName = allowedEvents.has(rawEventName) ? rawEventName : "phone_click";
  const event = {
    eventName,
    location: cleanParam(url.searchParams.get("location"), "unknown"),
    ctaLocation: cleanParam(url.searchParams.get("ctaLocation"), cleanParam(url.searchParams.get("location"), "unknown")),
    pagePath: cleanParam(url.searchParams.get("pagePath") || url.searchParams.get("pageUrl")),
    pageType: cleanParam(url.searchParams.get("pageType")),
    city: cleanParam(url.searchParams.get("city")),
    service: cleanParam(url.searchParams.get("service")),
    problem: cleanParam(url.searchParams.get("problem")),
    deviceContext: cleanParam(url.searchParams.get("deviceContext"), "unknown"),
    timestamp: new Date().toISOString(),
    requestDestination: hasConfiguredPhone() ? "phone" : "contact-form-placeholder"
  };

  console.info("call_click_event", event);
  return NextResponse.json({ ok: true, event }, { headers: noStoreHeaders });
}
