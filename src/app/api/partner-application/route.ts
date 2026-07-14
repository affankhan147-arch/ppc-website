import { NextResponse } from "next/server";
import { deliverToWebhook } from "@/lib/formDelivery";
import { handlePartnerApplicationSubmission } from "@/lib/formRouteHandlers";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  const raw =
    contentType.includes("application/json")
      ? await request.json()
      : Object.fromEntries((await request.formData()).entries());

  const result = await handlePartnerApplicationSubmission(raw, deliverToWebhook);
  return NextResponse.json(result.body, { status: result.status });
}
