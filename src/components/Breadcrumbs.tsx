import Link from "next/link";

export function Breadcrumbs({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav className="text-sm font-semibold text-slate-500" aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-2">
        <li><Link href="/" className="hover:text-slate-900">Home</Link></li>
        {items.map((item) => (
          <li key={item.href} className="before:mr-2 before:content-['/']">
            <Link href={item.href} className="hover:text-slate-900">{item.label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
