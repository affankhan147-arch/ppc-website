import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const event = {
    location: url.searchParams.get("location") || "unknown",
    pageUrl: url.searchParams.get("pageUrl") || "",
    city: url.searchParams.get("city") || "",
    service: url.searchParams.get("service") || "",
    timestamp: new Date().toISOString(),
    trackedPhone: siteConfig.phoneE164
  };

  console.info("call_click_event", event);
  return NextResponse.json({ ok: true, event });
}
