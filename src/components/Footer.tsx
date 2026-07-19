import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { phoneConfig, siteConfig } from "@/data/site";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { TrackedLink } from "@/components/TrackedLink";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B1917] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.35fr_1fr_1fr_1fr]">
        <div>
          <p className="text-2xl font-black tracking-tight">{siteConfig.brandName}</p>
          <p className="mt-2 font-serif text-xl text-[#4FD1C5]">Emergency plumbing service for stressful moments.</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">{siteConfig.disclosure}</p>
          
            <a
            href={phoneConfig.href}
            data-phone-location="footer"
            className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#F0B429] px-5 py-3 text-sm font-black text-[#1A1300] shadow-lg transition hover:bg-[#d99f1f]"
            aria-label={`Call ${phoneConfig.display} from footer`}
          >
            <PhoneCall className="h-4 w-4" aria-hidden="true" />
            Call {phoneConfig.display}
          </a>
          <p className="mt-5 rounded-xl border border-white/10 bg-white/[.05] p-4 text-sm font-semibold leading-6 text-slate-300">
            Fast help for urgent leaks, drains, sewer, pipe, toilet, and water-heater problems across Dallas-Fort Worth.
          </p>
        </div>
        <div>
          <p className="font-bold">Services</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-400">
            {services.slice(0, 6).map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="hover:text-[#4FD1C5]">
                {service.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold">Cities</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-400">
            <Link href="/cities" className="hover:text-[#4FD1C5]">
              All DFW locations
            </Link>
            {cities.slice(0, 6).map((city) => (
              <Link key={city.slug} href={`/cities/${city.slug}`} className="hover:text-[#4FD1C5]">
                {city.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold">Legal</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-400">
            <Link href="/privacy" className="hover:text-[#4FD1C5]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#4FD1C5]">Terms</Link>
            <Link href="/disclosure" className="hover:text-[#4FD1C5]">Disclosure</Link>
            <Link href="/blog" className="hover:text-[#4FD1C5]">Emergency guides</Link>
            <TrackedLink href="/partner-with-us" className="hover:text-[#4FD1C5]" eventName="partner_route_click" ctaLocation="footer-partner-link" pageType="footer">
              Partner with us
            </TrackedLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
