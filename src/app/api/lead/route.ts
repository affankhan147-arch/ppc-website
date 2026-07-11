import { NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(7),
  service: z.string().min(1),
  city: z.string().min(1),
  message: z.string().min(1),
  pageUrl: z.string().optional()
});

function redactPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 4 ? `last4:${digits.slice(-4)}` : "redacted";
}

function createLeadId() {
  return `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  const raw =
    contentType.includes("application/json")
      ? await request.json()
      : Object.fromEntries((await request.formData()).entries());

  const parsed = leadSchema.safeParse(raw);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid lead request." }, { status: 400 });
  }

  const leadId = createLeadId();
  const safeLeadLog = {
    leadId,
    city: parsed.data.city,
    service: parsed.data.service,
    pageUrl: parsed.data.pageUrl || "",
    phoneHint: redactPhone(parsed.data.phone),
    messageLength: parsed.data.message.length,
    receivedAt: new Date().toISOString(),
    source: "website-form",
    storageMode: "placeholder-console-log-only"
  };

  console.info("lead_request_placeholder_logged", safeLeadLog);
  return NextResponse.json({
    ok: true,
    message: "Lead request logged for safe routing placeholder.",
    leadId,
    nextStep: "Owner must connect approved CRM, call tracking, or buyer routing storage before public launch."
  });
}
