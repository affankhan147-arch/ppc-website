import Link from "next/link";
import { Menu, PhoneCall, ShieldCheck } from "lucide-react";
import { navigation, siteConfig } from "@/data/site";
import { CallButton } from "@/components/CallButton";

const customerNavigation = navigation.filter((item) => item.label !== "Partners");

export function Header() {
  return (
    <header className="site-header sticky top-0 z-40">
      <div className="hidden border-b border-white/10 bg-slate-950 text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs font-bold">
          <p className="flex items-center gap-2 text-slate-200">
            <ShieldCheck className="h-4 w-4 text-cyan-300" aria-hidden="true" />
            Safety-first emergency plumbing request help across Dallas-Fort Worth
          </p>
          <a className="flex items-center gap-2 text-white hover:text-cyan-200" href={siteConfig.phoneHref}>
            <PhoneCall className="h-4 w-4 text-orange-400" aria-hidden="true" />
            Emergency line: {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link className="flex min-w-0 items-center gap-3" href="/" aria-label={`${siteConfig.brandName} home`}>
            <span className="brand-mark grid h-11 w-11 flex-none place-items-center rounded-xl text-white shadow-lg">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-base font-black tracking-tight text-slate-950">{siteConfig.brandName}</span>
              <span className="block truncate text-xs font-bold text-slate-500">Emergency plumbing connections</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 text-sm font-bold text-slate-600 lg:flex" aria-label="Primary navigation">
            {customerNavigation.map((item) => (
              <Link key={item.href} className="transition hover:text-cyan-700" href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden sm:block">
            <CallButton location="header" label={`Call ${siteConfig.phoneDisplay}`} />
          </div>

          <details className="group relative lg:hidden">
            <summary
              className="mobile-nav-summary inline-grid h-11 w-11 cursor-pointer list-none place-items-center rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:border-cyan-300 hover:text-cyan-700"
              aria-label="Open website navigation"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </summary>
            <div className="absolute right-0 top-14 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">
              <nav className="grid gap-1" aria-label="Mobile navigation">
                {customerNavigation.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-xl px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-800">
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-2 border-t border-slate-200 pt-3 sm:hidden">
                <CallButton location="mobile-header-menu" label={`Call ${siteConfig.phoneDisplay}`} className="w-full" />
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
