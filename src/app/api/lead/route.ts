import { NextResponse } from "next/server";
import {
  checkRateLimit,
  clientIdentifier,
  noStoreHeaders,
  trustedProductionOrigins,
  validateApiRequest
} from "@/lib/apiSecurity";
import { deliverToWebhook } from "@/lib/formDelivery";
import { handleLeadSubmission } from "@/lib/formRouteHandlers";

const requestPolicy = {
  methods: ["POST"],
  contentTypes: ["application/json", "application/x-www-form-urlencoded", "multipart/form-data"],
  maxBytes: 64 * 1024,
  trustedOrigins: trustedProductionOrigins()
};

export async function POST(request: Request) {
  const validation = validateApiRequest(request, requestPolicy);
  if (!validation.ok) {
    return NextResponse.json({ ok: false, error: validation.error }, { status: validation.status, headers: noStoreHeaders });
  }

  const rate = checkRateLimit(`lead:${clientIdentifier(request)}`, { limit: 10, windowMs: 10 * 60 * 1000 });
  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429, headers: { ...noStoreHeaders, "retry-after": String(rate.retryAfterSeconds) } }
    );
  }

  let raw: unknown;
  try {
    const contentType = request.headers.get("content-type") || "";
    raw = contentType.includes("application/json")
      ? await request.json()
      : Object.fromEntries((await request.formData()).entries());
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request body." }, { status: 400, headers: noStoreHeaders });
  }

  const result = await handleLeadSubmission(raw, deliverToWebhook);
  return NextResponse.json(result.body, { status: result.status, headers: noStoreHeaders });
}
