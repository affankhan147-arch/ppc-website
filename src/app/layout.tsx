import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyCallBar } from "@/components/StickyCallBar";
import { JsonLd, organizationSchema } from "@/lib/schema";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: `${siteConfig.brandName} | Dallas-Fort Worth Emergency Plumbing Connections`,
    template: `%s | ${siteConfig.brandName}`
  },
  description:
    "Config-driven pay-per-call lead generation platform for emergency plumbing and drain cleaning provider connections across Dallas-Fort Worth.",
  applicationName: siteConfig.brandName
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={organizationSchema()} />
        <Header />
        {children}
        <Footer />
        <StickyCallBar />
      </body>
    </html>
  );
}
