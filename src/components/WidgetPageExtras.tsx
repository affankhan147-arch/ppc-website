import Image from "next/image";
import { getArticleImage } from "@/lib/articleImages";

// Shared blocks for the free embeddable badge / widget pages under /tools.

export function WidgetHero({ alt, serviceSlug, seed = 0 }: { alt: string; serviceSlug?: string; seed?: number }) {
  return (
    <div className="photo-frame relative mb-8 h-56 w-full overflow-hidden rounded-2xl sm:h-72">
      <Image src={getArticleImage(serviceSlug, seed)} alt={alt} fill sizes="(min-width: 1024px) 56rem, 100vw" className="object-cover" />
    </div>
  );
}

export function EmbedHowTo({ name }: { name: string }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-[#F0B429] mb-3">How to add the {name} to your site</h2>
      <p className="text-slate-300 mb-4">
        Each badge is a small image served from plumbinghands.com and wrapped in a link, so there is nothing to install and
        nothing to update on your side. It works anywhere you can paste a short piece of HTML.
      </p>
      <ol className="list-decimal space-y-2 pl-5 text-slate-300">
        <li>Copy the code under the badge you want.</li>
        <li>
          Paste it into an HTML or embed block: a Custom HTML block in WordPress, a Code block in Squarespace, an Embed HTML
          element in Wix, or the source view of most newsletter editors.
        </li>
        <li>Publish and check that the badge shows and the link opens the matching Plumbing Hands page.</li>
        <li>Keep the link in place. That is the only condition for using the badge, and it lets your readers see the full source.</li>
      </ol>
    </section>
  );
}
