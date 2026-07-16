import Link from "next/link";
import { ArrowRight, CheckCircle2, PhoneCall, ShieldCheck } from "lucide-react";
import { phoneConfig, siteConfig } from "@/data/site";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { TrackedLink } from "@/components/TrackedLink";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-white">
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-9 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-cyan-200">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Dallas-Fort Worth emergency request help
            </p>
            <h2 className="mt-3 max-w-3xl text-2xl font-black leading-tight sm:text-3xl">
              Explain the problem, confirm local availability, and discuss the next step by phone.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              Plumbing Hands helps you connect with available plumbing professionals serving your area. Pricing, credentials, timing, and scope are confirmed directly with the provider.
            </p>
          </div>
          <a
            href={phoneConfig.href}
            data-phone-location="footer"
            className="premium-call-button inline-flex min-h-14 items-center justify-center gap-3 px-6 py-4 text-lg font-black text-white lg:justify-self-end"
            aria-label={`Call ${phoneConfig.display} from footer`}
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
              <PhoneCall className="h-5 w-5" aria-hidden="true" />
            </span>
            Call {phoneConfig.display}
          </a>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="brand-mark grid h-11 w-11 place-items-center rounded-xl text-white shadow-lg">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-lg font-black">{siteConfig.brandName}</p>
              <p className="text-xs font-bold text-slate-400">Emergency plumbing connections</p>
            </div>
          </div>
          <ul className="mt-5 grid gap-2 text-sm text-slate-300">
            {[
              "Safety-first emergency guidance",
              "DFW service-area request paths",
              "Direct provider confirmation before work"
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-cyan-300" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-black">Emergency services</p>
          <div className="mt-4 grid gap-2.5 text-sm text-slate-300">
            {services.slice(0, 6).map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="transition hover:text-white">
                {service.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-black">DFW locations</p>
          <div className="mt-4 grid gap-2.5 text-sm text-slate-300">
            <Link href="/cities" className="flex items-center gap-1.5 font-bold text-cyan-200 hover:text-white">
              All service areas <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            {cities.slice(0, 6).map((city) => (
              <Link key={city.slug} href={`/cities/${city.slug}`} className="transition hover:text-white">
                {city.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-black">Information</p>
          <div className="mt-4 grid gap-2.5 text-sm text-slate-300">
            <Link href="/faq" className="hover:text-white">Emergency FAQ</Link>
            <Link href="/blog" className="hover:text-white">Safety guides</Link>
            <Link href="/cost-guides/emergency-plumbing-cost-dfw" className="hover:text-white">Cost guidance</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/disclosure" className="hover:text-white">Disclosure</Link>
            <TrackedLink href="/partner-with-us" className="hover:text-white" eventName="partner_route_click" ctaLocation="footer-partner-link" pageType="footer">
              Partner with us
            </TrackedLink>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs leading-5 text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. Provider-connection website.</p>
          <p>Availability varies by location, timing, and provider coverage.</p>
        </div>
      </div>
    </footer>
  );
}
