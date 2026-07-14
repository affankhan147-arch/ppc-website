import { z } from "zod";

type DeliveryResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "invalid-url" | "delivery-failed" };

type DeliveryFailureReason = Exclude<DeliveryResult, { ok: true }>["reason"];

type DeliverToWebhook = (
  environmentVariable: "LEAD_WEBHOOK_URL" | "PARTNER_WEBHOOK_URL",
  payload: Record<string, unknown>
) => Promise<DeliveryResult>;

type RouteLogger = Pick<Console, "error" | "info">;

type JsonRouteResult = {
  status: number;
  body: Record<string, unknown>;
};

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

function createRequestId(prefix: "request" | "partner") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function deliveryError(reason: DeliveryFailureReason, notConfiguredMessage: string, failedMessage: string) {
  return reason === "not-configured" ? notConfiguredMessage : failedMessage;
}

function redactPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 4 ? `last4:${digits.slice(-4)}` : "redacted";
}

function emailDomain(email: string) {
  return email.includes("@") ? email.split("@").pop() || "redacted" : "redacted";
}

type LeadSubmission = z.infer<typeof leadSchema>;
type PartnerApplicationSubmission = z.infer<typeof partnerApplicationSchema>;

function logLeadDelivered(logger: RouteLogger, requestId: string, receivedAt: string, data: LeadSubmission) {
  logger.info("service_request_delivered", {
    requestId,
    city: data.city,
    service: data.service,
    urgency: data.urgency,
    pageUrl: data.pageUrl || "",
    utm: {
      source: data.utmSource || "",
      medium: data.utmMedium || "",
      campaign: data.utmCampaign || "",
      term: data.utmTerm || "",
      content: data.utmContent || ""
    },
    phoneHint: redactPhone(data.phone),
    messageLength: data.message?.length || 0,
    receivedAt,
    source: "website-form",
    storageMode: "approved-webhook"
  });
}

function logPartnerApplicationDelivered(
  logger: RouteLogger,
  requestId: string,
  receivedAt: string,
  data: PartnerApplicationSubmission
) {
  logger.info("partner_application_delivered", {
    requestId,
    businessName: data.businessName,
    contactNameLength: data.contactName.length,
    phoneHint: redactPhone(data.phone),
    emailDomain: emailDomain(data.email),
    websiteProvided: Boolean(data.website),
    primaryServiceAreasLength: data.primaryServiceAreas.length,
    servicesOfferedLength: data.servicesOffered.length,
    operatingHours: data.operatingHours,
    emergencyCapacity: data.emergencyCapacity,
    customerTypes: data.customerTypes,
    licenseInfoProvided: Boolean(data.licenseInfo),
    insuranceStatus: data.insuranceStatus,
    preferredContactMethod: data.preferredContactMethod,
    notesLength: data.notes?.length || 0,
    pageUrl: data.pageUrl || "",
    utm: {
      source: data.utmSource || "",
      medium: data.utmMedium || "",
      campaign: data.utmCampaign || "",
      term: data.utmTerm || "",
      content: data.utmContent || ""
    },
    receivedAt,
    source: "provider-application-form",
    storageMode: "approved-partner-webhook"
  });
}

export async function handleLeadSubmission(
  raw: unknown,
  deliverToWebhook: DeliverToWebhook,
  logger: RouteLogger = console
): Promise<JsonRouteResult> {
  const parsed = leadSchema.safeParse(raw);

  if (!parsed.success) {
    return { status: 400, body: { ok: false, error: "Invalid service request." } };
  }

  const requestId = createRequestId("request");
  const receivedAt = new Date().toISOString();
  const delivery = await deliverToWebhook("LEAD_WEBHOOK_URL", {
    type: "customer-service-request",
    requestId,
    receivedAt,
    ...parsed.data
  });

  if (!delivery.ok) {
    logger.error("service_request_delivery_failed", { requestId, reason: delivery.reason });
    return {
      status: 503,
      body: {
        ok: false,
        error: deliveryError(
          delivery.reason,
          "Online request delivery is not configured yet. Please try again later.",
          "The request could not be delivered right now. Please try again shortly."
        )
      }
    };
  }

  logLeadDelivered(logger, requestId, receivedAt, parsed.data);
  return {
    status: 200,
    body: {
      ok: true,
      message: "Service request received.",
      requestId
    }
  };
}

export async function handlePartnerApplicationSubmission(
  raw: unknown,
  deliverToWebhook: DeliverToWebhook,
  logger: RouteLogger = console
): Promise<JsonRouteResult> {
  const parsed = partnerApplicationSchema.safeParse(raw);

  if (!parsed.success) {
    return { status: 400, body: { ok: false, error: "Invalid provider application." } };
  }

  if (parsed.data.companyFax) {
    return { status: 200, body: { ok: true, requestId: "partner_filtered" } };
  }

  const requestId = createRequestId("partner");
  const receivedAt = new Date().toISOString();
  const delivery = await deliverToWebhook("PARTNER_WEBHOOK_URL", {
    type: "provider-partner-application",
    requestId,
    receivedAt,
    ...parsed.data,
    companyFax: undefined
  });

  if (!delivery.ok) {
    logger.error("partner_application_delivery_failed", { requestId, reason: delivery.reason });
    return {
      status: 503,
      body: {
        ok: false,
        error: deliveryError(
          delivery.reason,
          "Provider application delivery is not configured yet. Please try again later.",
          "The application could not be delivered right now. Please try again shortly."
        )
      }
    };
  }

  logPartnerApplicationDelivered(logger, requestId, receivedAt, parsed.data);
  return {
    status: 200,
    body: {
      ok: true,
      message: "Provider application received.",
      requestId
    }
  };
}
