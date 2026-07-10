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

  const lead = {
    ...parsed.data,
    receivedAt: new Date().toISOString(),
    source: "website-form"
  };

  console.info("lead_request_logged", lead);
  return NextResponse.json({ ok: true, message: "Lead request logged for safe routing.", lead });
}
