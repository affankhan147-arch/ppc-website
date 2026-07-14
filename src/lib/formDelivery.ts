type DeliveryResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "invalid-url" | "delivery-failed" };

type FetchLike = typeof fetch;

function isAllowedDestination(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ||
      (process.env.NODE_ENV !== "production" && url.protocol === "http:");
  } catch {
    return false;
  }
}

export async function deliverToWebhook(
  environmentVariable: "LEAD_WEBHOOK_URL" | "PARTNER_WEBHOOK_URL",
  payload: Record<string, unknown>,
  fetcher: FetchLike = fetch
): Promise<DeliveryResult> {
  const destination = process.env[environmentVariable]?.trim();

  if (!destination) {
    return { ok: false, reason: "not-configured" };
  }

  if (!isAllowedDestination(destination)) {
    return { ok: false, reason: "invalid-url" };
  }

  try {
    const response = await fetcher(destination, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.FORM_ROUTING_BEARER_TOKEN
          ? { authorization: `Bearer ${process.env.FORM_ROUTING_BEARER_TOKEN}` }
          : {})
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000)
    });

    return response.ok
      ? { ok: true }
      : { ok: false, reason: "delivery-failed" };
  } catch {
    return { ok: false, reason: "delivery-failed" };
  }
}
