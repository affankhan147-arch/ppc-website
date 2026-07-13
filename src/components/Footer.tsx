import Link from "next/link";
import { siteConfig } from "@/data/site";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { TrackedLink } from "@/components/TrackedLink";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#102238] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <p className="text-lg font-black">{siteConfig.brandName}</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-200">{siteConfig.disclosure}</p>
          <p className="mt-4 rounded-md border border-white/15 bg-white/10 p-3 text-xs leading-5 text-slate-200">
            Service availability may vary by location, timing, and provider coverage. Confirm pricing, credentials, and scope directly with the provider.
          </p>
        </div>
        <div>
          <p className="font-bold">Services</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-300">
            {services.slice(0, 6).map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="hover:text-white">
                {service.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold">Cities</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-300">
            {cities.slice(0, 6).map((city) => (
              <Link key={city.slug} href={`/cities/${city.slug}`} className="hover:text-white">
                {city.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold">Legal</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-300">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/disclosure" className="hover:text-white">Disclosure</Link>
            <Link href="/blog" className="hover:text-white">Emergency guides</Link>
            <TrackedLink href="/partner-with-us" className="hover:text-white" eventName="partner_route_click" ctaLocation="footer-partner-link" pageType="footer">
              Partner with us
            </TrackedLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
