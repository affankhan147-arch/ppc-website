import { NextResponse } from "next/server";
import { z } from "zod";
import { deliverToWebhook } from "@/lib/formDelivery";

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
  const receivedAt = new Date().toISOString();
  const delivery = await deliverToWebhook("LEAD_WEBHOOK_URL", {
    type: "customer-service-request",
    requestId,
    receivedAt,
    ...parsed.data
  });

  if (!delivery.ok) {
    console.error("service_request_delivery_failed", { requestId, reason: delivery.reason });
    return NextResponse.json(
      {
        ok: false,
        error: delivery.reason === "not-configured"
          ? "Online request delivery is not configured yet. Please try again later."
          : "The request could not be delivered right now. Please try again shortly."
      },
      { status: 503 }
    );
  }

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
    receivedAt,
    source: "website-form",
    storageMode: "approved-webhook"
  };

  console.info("service_request_delivered", safeRequestLog);
  return NextResponse.json({
    ok: true,
    message: "Service request received.",
    requestId
  });
}
