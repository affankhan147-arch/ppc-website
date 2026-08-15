import { getWidgetFact } from "@/data/widgetFacts";
import { buildLabelValueBadgeSvg } from "@/lib/badge";

type Params = {
  params: Promise<{ factSlug: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { factSlug } = await params;
  const slug = factSlug.replace(/\.svg$/i, "");
  const fact = getWidgetFact(slug);

  if (!fact) {
    return new Response("Fact not found. See /tools/dfw-data-badges for available badges.", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" }
    });
  }

  const svg = buildLabelValueBadgeSvg(fact.label, fact.value);

  return new Response(svg, {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400"
    }
  });
}
