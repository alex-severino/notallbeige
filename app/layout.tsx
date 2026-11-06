import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Awning } from "@/components/Awning";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";
import "./globals.css";

/** Two weights only: Black for titles and the logo, Semibold for everything else. */
const mori = localFont({
  src: [
    { path: "./fonts/PPMori-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/PPMori-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-mori",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "not all beige. interiors by Angelina Severino",
    template: "%s | not all beige",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#c8241e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={mori.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-[70] focus:bg-aulait focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Awning />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
