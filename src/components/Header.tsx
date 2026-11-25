"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CheckCircle2, Menu, X } from "lucide-react";
import { navigation, siteConfig } from "@/data/site";
import { CallButton } from "@/components/CallButton";

const mobileNavigation = [{ label: "Home", href: "/" }, ...navigation];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[var(--z-sticky-nav)] border-b border-rule bg-paper">
      <div className="hidden bg-paper-3 text-ink sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs font-bold">
          <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-accent" aria-hidden="true" /> Urgent plumbing help for leaks, drains, and sewer problems</span>
          <span className="text-muted">Plumbing Service in Dallas-Fort Worth</span>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5">
        <Link className="flex min-w-0 items-center gap-3" href="/" aria-label="PlumbingHands home">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl bg-paper-3">
            <Image src="/images/brand/plumbing-hands-mark.svg" width={44} height={44} alt="" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-black tracking-tight text-ink">{siteConfig.brandName}</span>
            <span className="block truncate text-xs font-semibold text-muted">Dallas-Fort Worth Plumbing Service</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-bold text-ink-2 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link key={item.href} className="relative py-2 transition-colors hover:text-accent" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden sm:block">
          <CallButton location="header" />
        </div>
        <button
          type="button"
          className="inline-grid h-11 w-11 place-items-center rounded-xl border border-rule bg-paper-2 text-ink lg:hidden"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>
      {isMenuOpen ? (
        <nav
          id="mobile-navigation"
          className="border-t border-rule bg-paper px-4 py-4 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto grid max-w-7xl gap-1 sm:grid-cols-2">
            {mobileNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-sm font-bold text-ink transition-colors hover:bg-paper-2 hover:text-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mx-auto mt-3 max-w-7xl sm:hidden">
            <CallButton location="mobile-menu" className="w-full" />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
