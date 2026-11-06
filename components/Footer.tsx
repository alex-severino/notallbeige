import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { nav, paint, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative bg-romesco pt-24 text-aulait gutter pb-6">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-full h-11"
        style={{
          marginBottom: -1,
          backgroundImage: `radial-gradient(circle at 50% 100%, ${paint("romesco")} 43.5px, transparent 44px)`,
          backgroundSize: "88px 44px",
          backgroundPosition: "center bottom",
          backgroundRepeat: "repeat-x",
        }}
      />
      <div className="flex flex-wrap items-start justify-between gap-x-16 gap-y-8">
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-1 sm:grid-cols-3">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="underline-offset-4 hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col items-start gap-1 sm:items-end">
          <a href={`mailto:${site.email}`} className="underline-offset-4 hover:underline">
            {site.email}
          </a>
          <a href={site.founderUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
            an angelina severino venture ↗
          </a>
        </div>
      </div>
      <Logo className="mt-14 hidden h-auto w-full sm:block" ink={paint("aulait")} />
      <Logo variant="stacked" className="mt-12 block h-auto w-full sm:hidden" ink={paint("aulait")} />
      <div className="mt-6 flex flex-wrap justify-between gap-x-8 gap-y-1 text-[0.9375rem]">
        <p>© {site.legalName} 2026</p>
        <p>Colours named after Farrow &amp; Ball paints, matched on screen as closely as we can.</p>
      </div>
    </footer>
  );
}
