import Link from "next/link";
import { CheckCircle2, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { InternalLinks, OfficialSources } from "@/components/PageSections";
import { sources } from "@/data/externalSources";
import { cities, getPriorityServiceSlugsForCity } from "@/data/cities";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { titleCase } from "@/lib/format";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "DFW, Houston, Austin & San Antonio Plumbing Areas",
  description: truncateForMeta("Browse 33 Texas service-area pages across Dallas-Fort Worth, Houston, Austin, and San Antonio for emergency plumbing, drain, and leak help by city."),
  path: "/cities"
});

const hubBullets = [
  "City-specific request paths",
  "Emergency plumbing and drain needs",
  "Provider availability varies by area",
  "Clear provider coverage guidance"
];

function serviceNamesForCity(citySlug: string) {
  const priorityNames = getPriorityServiceSlugsForCity(citySlug)
    .map((serviceSlug) => services.find((service) => service.slug === serviceSlug)?.name)
    .filter((name): name is string => Boolean(name))
    .map((name) => titleCase(name));

  return priorityNames.length ? priorityNames : ["Emergency Plumbing", "Drain Cleaning"];
}

export default function CitiesPage() {
  const path = "/cities";

  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema(
            path,
            "Emergency plumbing help by Texas location",
            "Texas service-area hub covering Dallas-Fort Worth, Houston, Austin, and San Antonio for urgent plumbing, drain, sewer, leak, toilet, and water-heater requests."
          ),
          breadcrumbSchema([{ name: "Cities", path }])
        ]}
      />
      <Breadcrumbs items={[{ label: "Cities", href: path }]} />

      <section className="content-section">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div className="min-w-0">
            <h1 className="display-title font-bold text-ink">
              Emergency plumbing help by Texas location
            </h1>
            <ul className="mt-5 grid gap-3 text-lg font-bold text-ink sm:grid-cols-2">
              {hubBullets.map((item) => (
                <li key={item} className="flex gap-2 rounded-card border border-rule bg-paper p-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-accent" aria-hidden="true" />
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 rounded-card border border-rule bg-paper p-5">
            <p className="text-lg font-bold text-ink">Request path</p>
            <ul className="mt-3 grid gap-2 text-base font-semibold text-ink-2">
              <li>Choose location</li>
              <li>Select urgent service need</li>
              <li>Confirm pricing, credentials, and scope directly</li>
            </ul>
            <div className="mt-5">
              <CallButton location="cities-hub" pagePath={path} pageType="city" city={siteConfig.marketName} service="Emergency plumbing" />
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">Texas city service areas</h2>
          </div>
          <Link href="/services" className="font-bold text-accent underline hover:text-ink">
            Browse all services
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/cities/${city.slug}`}
              className="premium-card min-w-0 p-5"
            >
              <div className="flex items-start gap-3">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-card bg-paper-3 text-accent">
                  <MapPin className="h-6 w-6" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold text-ink">{city.name}</h3>
                  <p className="mt-1 text-base font-bold text-ink-2">{city.countyHint}</p>
                </div>
              </div>
              <ul className="mt-4 grid gap-2 text-base font-semibold text-ink-2">
                <li>{city.areaHint}</li>
                {serviceNamesForCity(city.slug).map((serviceName) => (
                  <li key={serviceName}>{serviceName}</li>
                ))}
              </ul>
              <span className="mt-4 inline-flex items-center gap-2 text-base font-bold text-accent">
                Open {city.name} page
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="content-section">
        <h2 className="text-2xl font-bold text-ink">What each city page covers</h2>
        <p className="mt-3 leading-7 text-ink-2">
          Every city page lists the urgent plumbing services requested most in that area, local notes on water service and
          older housing stock, and links to service pages written for that city. Pick your city, then choose the problem you
          have, whether it is a burst pipe, a sewer backup or a water heater leak, to see first steps and what to ask the
          provider before work starts.
        </p>
      </section>

      <OfficialSources
        title="Official water utility and licensing resources for Texas cities"
        intro="For a break on the city side of the meter, call your water utility. For anything on your side, check the plumber's Texas license before work begins."
        links={[sources.dallasWater, sources.fortWorthWater, sources.tsbpeLookup]}
      />

      <InternalLinks />
    </main>
  );
}
