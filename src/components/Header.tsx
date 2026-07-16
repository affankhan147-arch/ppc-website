import Link from "next/link";
import { Menu, PhoneCall, ShieldCheck } from "lucide-react";
import { navigation, siteConfig } from "@/data/site";
import { CallButton } from "@/components/CallButton";

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
            {navigation.filter((item) => item.label !== "Partners").map((item) => (
              <Link key={item.href} className="transition hover:text-cyan-700" href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden sm:block">
            <CallButton location="header" label={`Call ${siteConfig.phoneDisplay}`} />
          </div>

          <Link
            className="inline-grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:border-cyan-300 hover:text-cyan-700 lg:hidden"
            href="/contact"
            aria-label="Open emergency request options"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
