import { NextResponse } from "next/server";
import { z } from "zod";
import { deliverToWebhook } from "@/lib/formDelivery";

const partnerApplicationSchema = z.object({
  businessName: z.string().trim().min(2).max(160),
  contactName: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(40),
  email: z.string().trim().email().max(160),
  website: z.string().trim().max(240).optional(),
  primaryServiceAreas: z.string().trim().min(2).max(800),
  servicesOffered: z.string().trim().min(2).max(800),
  operatingHours: z.string().trim().min(2).max(240),
  emergencyCapacity: z.enum(["yes-24-7", "limited", "no", "not-sure"]),
  customerTypes: z.enum(["residential-commercial", "residential", "commercial"]),
  licenseInfo: z.string().trim().max(300).optional(),
  insuranceStatus: z.enum(["insured", "not-insured", "not-sure", "prefer-discuss"]),
  preferredContactMethod: z.enum(["phone", "email"]),
  notes: z.string().trim().max(1000).optional(),
  consent: z.literal("on"),
  companyFax: z.string().optional(),
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

function emailDomain(email: string) {
  return email.includes("@") ? email.split("@").pop() || "redacted" : "redacted";
}

function createRequestId() {
  return `partner_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  const raw =
    contentType.includes("application/json")
      ? await request.json()
      : Object.fromEntries((await request.formData()).entries());

  const parsed = partnerApplicationSchema.safeParse(raw);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid provider application." }, { status: 400 });
  }

  if (parsed.data.companyFax) {
    return NextResponse.json({ ok: true, requestId: "partner_filtered" });
  }

  const requestId = createRequestId();
  const receivedAt = new Date().toISOString();
  const delivery = await deliverToWebhook("PARTNER_WEBHOOK_URL", {
    type: "provider-partner-application",
    requestId,
    receivedAt,
    ...parsed.data,
    companyFax: undefined
  });

  if (!delivery.ok) {
    console.error("partner_application_delivery_failed", { requestId, reason: delivery.reason });
    return NextResponse.json(
      {
        ok: false,
        error: delivery.reason === "not-configured"
          ? "Provider application delivery is not configured yet. Please try again later."
          : "The application could not be delivered right now. Please try again shortly."
      },
      { status: 503 }
    );
  }

  const safeApplicationLog = {
    requestId,
    businessName: parsed.data.businessName,
    contactNameLength: parsed.data.contactName.length,
    phoneHint: redactPhone(parsed.data.phone),
    emailDomain: emailDomain(parsed.data.email),
    websiteProvided: Boolean(parsed.data.website),
    primaryServiceAreasLength: parsed.data.primaryServiceAreas.length,
    servicesOfferedLength: parsed.data.servicesOffered.length,
    operatingHours: parsed.data.operatingHours,
    emergencyCapacity: parsed.data.emergencyCapacity,
    customerTypes: parsed.data.customerTypes,
    licenseInfoProvided: Boolean(parsed.data.licenseInfo),
    insuranceStatus: parsed.data.insuranceStatus,
    preferredContactMethod: parsed.data.preferredContactMethod,
    notesLength: parsed.data.notes?.length || 0,
    pageUrl: parsed.data.pageUrl || "",
    utm: {
      source: parsed.data.utmSource || "",
      medium: parsed.data.utmMedium || "",
      campaign: parsed.data.utmCampaign || "",
      term: parsed.data.utmTerm || "",
      content: parsed.data.utmContent || ""
    },
    receivedAt,
    source: "provider-application-form",
    storageMode: "approved-partner-webhook"
  };

  console.info("partner_application_delivered", safeApplicationLog);
  return NextResponse.json({
    ok: true,
    message: "Provider application received.",
    requestId
  });
}
