export const noStoreHeaders: Record<string, string> = {
  "cache-control": "no-store, max-age=0",
  pragma: "no-cache",
  "x-content-type-options": "nosniff"
};

type ValidationPolicy = {
  methods: string[];
  contentTypes?: string[];
  maxBytes?: number;
  trustedOrigins?: string[];
};

type ValidationResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

type RatePolicy = { limit: number; windowMs: number };
type RateBucket = { count: number; resetAt: number };

const rateBuckets = new Map<string, RateBucket>();

export function validateApiRequest(request: Request, policy: ValidationPolicy): ValidationResult {
  if (!policy.methods.includes(request.method.toUpperCase())) {
    return { ok: false, status: 405, error: "Method not allowed." };
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    const rawContentType = request.headers.get("content-type") || "";
    const contentType = rawContentType.split(";", 1)[0].trim().toLowerCase();
    if (policy.contentTypes?.length && !policy.contentTypes.includes(contentType)) {
      return { ok: false, status: 415, error: "Unsupported content type." };
    }

    const rawLength = request.headers.get("content-length");
    if (rawLength && policy.maxBytes && Number(rawLength) > policy.maxBytes) {
      return { ok: false, status: 413, error: "Request body is too large." };
    }

    const origin = request.headers.get("origin");
    if (origin && policy.trustedOrigins?.length && !policy.trustedOrigins.includes(origin)) {
      return { ok: false, status: 403, error: "Origin is not allowed." };
    }
  }

  return { ok: true };
}

export function clientIdentifier(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || "unknown";
}

export function checkRateLimit(
  key: string,
  policy: RatePolicy,
  now = Date.now()
 ) {
  const current = rateBuckets.get(key);
  if (!current || current.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + policy.windowMs });
    return { allowed: true, remaining: Math.max(0, policy.limit - 1), retryAfterSeconds: 0 };
  }

  if (current.count >= policy.limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000))
    };
  }

  current.count += 1;
  return { allowed: true, remaining: Math.max(0, policy.limit - current.count), retryAfterSeconds: 0 };
}

export function trustedProductionOrigins() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return Array.from(new Set([
    "https://plumbinghands.com",
    "https://www.plumbinghands.com",
    ...(configured?.startsWith("https://") ? [configured.replace(/\/$/, "")] : [])
  ]));
}
