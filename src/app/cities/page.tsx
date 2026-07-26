import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { cities, getPriorityServiceSlugsForCity } from "@/data/cities";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Dallas-Fort Worth plumbing service areas",
  description:
    "Browse all 30 Dallas-Fort Worth service-area pages for emergency plumbing, drain, sewer, leak, toilet, and water-heater help, organized by city.",
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
    .filter((name): name is string => Boolean(name));

  return priorityNames.length ? priorityNames : ["Emergency plumbing", "Drain cleaning"];
}

export default function CitiesPage() {
  const path = "/cities";

  return (
    <main className="page-shell">
      <JsonLd
        data={[
          webPageSchema(
            path,
            "Emergency plumbing help by DFW location",
            "Dallas-Fort Worth service-area hub for urgent plumbing, drain, sewer, leak, toilet, and water-heater requests."
          ),
          breadcrumbSchema([{ name: "Cities", path }])
        ]}
      />
      <Breadcrumbs items={[{ label: "Cities", href: path }]} />

      <section className="content-section soft-band">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div className="min-w-0">
            <p className="section-kicker">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" /> DFW service areas
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
              Emergency plumbing help by DFW location
            </h1>
            <ul className="mt-5 grid gap-3 text-lg font-bold text-slate-800 sm:grid-cols-2">
              {hubBullets.map((item) => (
                <li key={item} className="flex gap-2 rounded-md border border-slate-200 bg-white p-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-cyan-700" aria-hidden="true" />
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 rounded-md border border-cyan-200 bg-white p-5">
            <p className="text-lg font-black text-slate-950">Request path</p>
            <ul className="mt-3 grid gap-2 text-base font-semibold text-slate-700">
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
            <p className="section-kicker">Locations</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">DFW city service areas</h2>
          </div>
          <Link href="/services/24-hour-emergency-plumber" className="text-base font-black text-cyan-700 hover:text-cyan-900">
            Start with emergency plumber <ArrowRight className="inline h-5 w-5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/cities/${city.slug}`}
              className="premium-card group min-w-0 bg-white p-5 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:shadow-xl"
            >
              <div className="flex items-start gap-3">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-md bg-cyan-50 text-cyan-700">
                  <MapPin className="h-6 w-6" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-2xl font-black text-slate-950">{city.name}</h3>
                  <p className="mt-1 text-base font-bold text-slate-600">{city.countyHint}</p>
                </div>
              </div>
              <ul className="mt-4 grid gap-2 text-base font-semibold text-slate-700">
                <li>{city.areaHint}</li>
                {serviceNamesForCity(city.slug).map((serviceName) => (
                  <li key={serviceName}>{serviceName}</li>
                ))}
              </ul>
              <span className="mt-4 inline-flex items-center gap-2 text-base font-black text-cyan-700 group-hover:text-cyan-900">
                Open {city.name} page <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
