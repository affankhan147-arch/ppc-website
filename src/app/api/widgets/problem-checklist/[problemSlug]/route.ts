import { problems } from "@/data/problems";
import { buildLabelValueBadgeSvg } from "@/lib/badge";

type Params = {
  params: Promise<{ problemSlug: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { problemSlug } = await params;
  const slug = problemSlug.replace(/\.svg$/i, "");
  const problem = problems.find((item) => item.slug === slug);

  if (!problem) {
    return new Response("Problem not found. See /tools/problem-checklists for available badges.", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" }
    });
  }

  const count = problem.warningSigns.length;
  const svg = buildLabelValueBadgeSvg(
    "Know the Warning Signs",
    `${problem.title}: ${count} signs to know`
  );

  return new Response(svg, {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400"
    }
  });
}
