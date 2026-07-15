type DeliveryResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "invalid-url" | "delivery-failed" };

type FetchLike = typeof fetch;

function isPrivateHostname(rawHostname: string) {
  const hostname = rawHostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (hostname === "localhost" || hostname.endsWith(".localhost") || hostname.endsWith(".local") || hostname.endsWith(".internal")) return true;
  if (hostname === "::1" || hostname.startsWith("fc") || hostname.startsWith("fd") || hostname.startsWith("fe80:")) return true;
  const parts = hostname.split(".").map(Number);
  if (parts.length === 4 && parts.every((part) => Number.isInteger(part) && part >= 0 && part <= 255)) {
    return parts[0] === 10 || parts[0] === 127 || parts[0] === 0 ||
      (parts[0] === 169 && parts[1] === 254) ||
      (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
      (parts[0] === 192 && parts[1] === 168);
  }
  return false;
}

function isAllowedDestination(value: string) {
  try {
    const url = new URL(value);
    const protocolAllowed = url.protocol === "https:" ||
      (process.env.NODE_ENV !== "production" && url.protocol === "http:");
    return protocolAllowed && !url.username && !url.password && !isPrivateHostname(url.hostname);
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
  if (!destination) return { ok: false, reason: "not-configured" };
  if (!isAllowedDestination(destination)) return { ok: false, reason: "invalid-url" };
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
      redirect: "error",
      signal: AbortSignal.timeout(10_000)
    });
    return response.ok ? { ok: true } : { ok: false, reason: "delivery-failed" };
  } catch {
    return { ok: false, reason: "delivery-failed" };
  }
}
