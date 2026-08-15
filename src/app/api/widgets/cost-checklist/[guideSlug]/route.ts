import { costGuides } from "@/data/costGuides";
import { buildLabelValueBadgeSvg } from "@/lib/badge";

type Params = {
  params: Promise<{ guideSlug: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { guideSlug } = await params;
  const slug = guideSlug.replace(/\.svg$/i, "");
  const guide = costGuides.find((item) => item.slug === slug);

  if (!guide) {
    return new Response("Cost guide not found. See /tools/cost-guide-checklists for available badges.", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" }
    });
  }

  const count = guide.questionsToAsk.length;
  const svg = buildLabelValueBadgeSvg(
    "Before You Approve",
    `${guide.title}: ${count} key questions to ask`
  );

  return new Response(svg, {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400"
    }
  });
}
