import { getWaterHardnessEntry } from "@/data/waterHardness";
import { buildHardnessBadgeSvg } from "@/lib/badge";

type Params = {
  params: Promise<{ citySlug: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { citySlug } = await params;
  const slug = citySlug.replace(/\.svg$/i, "");
  const entry = getWaterHardnessEntry(slug);

  if (!entry) {
    return new Response("City not found. See /tools/water-hardness-widget for available cities.", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" }
    });
  }

  const svg = buildHardnessBadgeSvg(entry.name, entry.rangeLabel, entry.classification);

  return new Response(svg, {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400"
    }
  });
}
