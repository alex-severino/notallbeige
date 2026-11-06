"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { Logo } from "@/components/brand/Logo";
import { nav, paint } from "@/content/site";
import styles from "./Awning.module.css";

const tabStyle = (color: string, ink: string) => ({ "--tab": color, "--tab-ink": ink }) as CSSProperties;

/** The site's navigation: a striped awning hanging from the top of every page. */
export function Awning() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className={styles.awning} style={{ viewTransitionName: "site-awning" }}>
        <Link
          href="/"
          className={`${styles.tab} ${styles.home}`}
          style={tabStyle(paint("aulait"), paint("romesco"))}
          aria-label="not all beige, home"
          onClick={() => setOpen(false)}
        >
          <Logo className={styles.logo} title="not all beige" />
        </Link>

        <nav className={styles.tabs} aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.tab}
              style={tabStyle(paint(item.paint), paint(item.ink))}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={`${styles.tab} ${styles.menuButton}`}
          style={tabStyle(paint("hague"), paint("aulait"))}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className={styles.burger} data-open={open} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
      </header>

      <div id="site-menu" className={styles.menu} data-open={open} inert={!open}>
        {nav.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className={styles.menuLink}
            style={{ ...tabStyle(paint(item.paint), paint(item.ink)), "--index": nav.length - index } as CSSProperties}
            aria-current={isCurrent(item.href) ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
