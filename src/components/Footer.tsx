import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { phoneConfig, siteConfig } from "@/data/site";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { titleCase } from "@/lib/format";
import { TrackedLink } from "@/components/TrackedLink";
import { CookiePreferencesLink } from "@/components/CookieConsent";

export function Footer() {
  return (
    <footer className="border-t border-rule bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <p className="font-display text-4xl font-bold tracking-tight">{siteConfig.brandName}</p>
        <p className="mt-2 font-display text-xl text-accent">Emergency plumbing service for stressful moments.</p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{siteConfig.disclosure}</p>
        <a
          href={phoneConfig.href}
          data-phone-location="footer"
          className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-pill bg-call px-5 py-3 text-sm font-black text-call-ink transition-colors hover:bg-[color-mix(in_oklab,var(--color-call)_88%,black)]"
          aria-label={`Call ${phoneConfig.display} from footer`}
        >
          <PhoneCall className="h-4 w-4" aria-hidden="true" />
          Call {phoneConfig.display}
        </a>
        <p className="mt-5 max-w-2xl rounded-card border border-rule bg-paper-2 p-4 text-sm font-semibold leading-6 text-ink-2">
          Fast help for urgent leaks, drains, sewer, pipe, toilet, and water-heater problems across Dallas-Fort Worth.
        </p>
        <div className="mt-12 grid gap-10 border-t border-rule pt-10 md:grid-cols-3">
          <div>
            <p className="font-bold">Services</p>
            <div className="mt-3 grid gap-2 text-sm text-muted">
              <Link href="/services" className="hover:text-accent">
                All services
              </Link>
              {services.slice(0, 6).map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} className="hover:text-accent">
                  {titleCase(service.name)}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold">Cities</p>
            <div className="mt-3 grid gap-2 text-sm text-muted">
              <Link href="/cities" className="hover:text-accent">
                All DFW locations
              </Link>
              {cities.slice(0, 6).map((city) => (
                <Link key={city.slug} href={`/cities/${city.slug}`} className="hover:text-accent">
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold">Legal</p>
            <div className="mt-3 grid gap-2 text-sm text-muted">
              <Link href="/about" className="hover:text-accent">About</Link>
              <Link href="/contact" className="hover:text-accent">Contact</Link>
              <Link href="/privacy" className="hover:text-accent">Privacy</Link>
              <Link href="/terms" className="hover:text-accent">Terms</Link>
              <Link href="/disclosure" className="hover:text-accent">Disclosure</Link>
              <Link href="/blog" className="hover:text-accent">Emergency guides</Link>
              <TrackedLink href="/partner-with-us" className="hover:text-accent" eventName="partner_route_click" ctaLocation="footer-partner-link" pageType="footer">
                Plumbing providers: partner with us
              </TrackedLink>
              <TrackedLink href="/partners" className="hover:text-accent" eventName="referral_partner_route_click" ctaLocation="footer-referral-partner-link" pageType="footer">
                Become a referral partner
              </TrackedLink>
              <CookiePreferencesLink className="text-left hover:text-accent" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
