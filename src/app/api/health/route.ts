import { NextResponse } from "next/server";
import { getOperationalStatus } from "@/lib/operationalStatus";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      generatedAt: new Date().toISOString(),
      ...getOperationalStatus()
    },
    {
      headers: {
        "cache-control": "no-store"
      }
    }
  );
}
