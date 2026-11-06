"use client";

import { useState, type CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { home, paint, paints, type PaintKey } from "@/content/site";
import styles from "./PaletteWall.module.css";

/** Nine full-height stripes of paint. The one you touch opens up. */
export function PaletteWall() {
  const [active, setActive] = useState<PaintKey>("romesco");

  return (
    <section className={styles.section} aria-labelledby="palette-title">
      <div className={`gutter ${styles.head}`}>
        <Reveal as="h2" className="display-lg" >
          <span id="palette-title">{home.palette.title}</span>
        </Reveal>
        <Reveal as="p" delay={100} className={styles.lead}>
          {home.palette.lead}
        </Reveal>
      </div>
      <ul className={styles.stripes}>
        {paints.map((item) => (
          <li
            key={item.key}
            className={styles.stripe}
            data-active={active === item.key}
            style={{ "--paint": paint(item.key), "--ink": paint(item.ink) } as CSSProperties}
          >
            <button
              type="button"
              className={styles.button}
              aria-expanded={active === item.key}
              onClick={() => setActive(item.key)}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setActive(item.key);
              }}
              onFocus={() => setActive(item.key)}
            >
              <span className={styles.name}>{item.name}</span>
              <span className={styles.detail}>
                <span className={styles.code}>{item.code}</span>
                <span className={styles.note}>{item.note}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
