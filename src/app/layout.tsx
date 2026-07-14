import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyCallBar } from "@/components/StickyCallBar";
import { JsonLd, organizationSchema } from "@/lib/schema";
import { siteConfig } from "@/data/site";

const googleVerification = process.env.NEXT_PUBLIC_SEARCH_CONSOLE_TOKEN || process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_WEBMASTER_TOKEN || process.env.NEXT_PUBLIC_BING_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: `${siteConfig.brandName} | Dallas-Fort Worth Emergency Plumbing Connections`,
    template: `%s | ${siteConfig.brandName}`
  },
  description:
    "Emergency plumbing request help across Dallas-Fort Worth for urgent drain, sewer, pipe, toilet, and water-heater problems.",
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
              <GoogleAnalytics gaId="G-MQ820VTTB0" />
      </body>
    </html>
  );
}
