import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";

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
    requestDestination: siteConfig.phoneE164.includes("X") ? "contact-form-placeholder" : "phone"
  };

  console.info("call_click_event", event);
  return NextResponse.json({ ok: true, event });
}
