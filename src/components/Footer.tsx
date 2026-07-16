import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { phoneConfig, siteConfig } from "@/data/site";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { TrackedLink } from "@/components/TrackedLink";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#081b2c] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.35fr_1fr_1fr_1fr]">
        <div>
          <p className="text-2xl font-black tracking-tight">{siteConfig.brandName}</p>
          <p className="mt-2 font-serif text-xl text-cyan-100">Emergency plumbing service for stressful moments.</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-200">{siteConfig.disclosure}</p>
          <a
            href={phoneConfig.href}
            data-phone-location="footer"
            className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#e84d0e] px-5 py-3 text-sm font-black text-white shadow-lg transition hover:bg-[#bf360c]"
            aria-label={`Call ${phoneConfig.display} from footer`}
          >
            <PhoneCall className="h-4 w-4" aria-hidden="true" />
            Call {phoneConfig.display}
          </a>
          <p className="mt-5 rounded-xl border border-white/15 bg-white/[.07] p-4 text-sm font-semibold leading-6 text-slate-200">
            Fast help for urgent leaks, drains, sewer, pipe, toilet, and water-heater problems across Dallas–Fort Worth.
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
            <Link href="/cities" className="hover:text-white">
              All DFW locations
            </Link>
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
