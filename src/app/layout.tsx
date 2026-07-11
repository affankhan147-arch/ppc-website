import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyCallBar } from "@/components/StickyCallBar";
import { JsonLd, organizationSchema } from "@/lib/schema";
import { siteConfig } from "@/data/site";

const googleVerification = process.env.NEXT_PUBLIC_SEARCH_CONSOLE_TOKEN;
const bingVerification = process.env.NEXT_PUBLIC_BING_WEBMASTER_TOKEN;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: `${siteConfig.brandName} | Dallas-Fort Worth Emergency Plumbing Connections`,
    template: `%s | ${siteConfig.brandName}`
  },
  description:
    "Config-driven pay-per-call lead generation platform for emergency plumbing and drain cleaning provider connections across Dallas-Fort Worth.",
  applicationName: siteConfig.brandName,
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {})
  }
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
