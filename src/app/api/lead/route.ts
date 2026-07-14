import { NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(7),
  service: z.string().min(1),
  city: z.string().min(1),
  urgency: z.string().min(1),
  message: z.string().optional(),
  pageUrl: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional()
});

function redactPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 4 ? `last4:${digits.slice(-4)}` : "redacted";
}

function createRequestId() {
  return `request_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  const raw =
    contentType.includes("application/json")
      ? await request.json()
      : Object.fromEntries((await request.formData()).entries());

  const parsed = leadSchema.safeParse(raw);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid service request." }, { status: 400 });
  }

  const requestId = createRequestId();
  const safeRequestLog = {
    requestId,
    city: parsed.data.city,
    service: parsed.data.service,
    urgency: parsed.data.urgency,
    pageUrl: parsed.data.pageUrl || "",
    utm: {
      source: parsed.data.utmSource || "",
      medium: parsed.data.utmMedium || "",
      campaign: parsed.data.utmCampaign || "",
      term: parsed.data.utmTerm || "",
      content: parsed.data.utmContent || ""
    },
    phoneHint: redactPhone(parsed.data.phone),
    messageLength: parsed.data.message?.length || 0,
    receivedAt: new Date().toISOString(),
    source: "website-form",
    storageMode: "placeholder-console-log-only"
  };

  console.info("service_request_placeholder_logged", safeRequestLog);
  return NextResponse.json({
    ok: true,
    message: "Service request received.",
    requestId,
    nextStep: "Owner must connect approved CRM or service request storage before public launch."
  });
}
