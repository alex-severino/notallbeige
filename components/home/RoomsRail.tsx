"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { PaintLink } from "@/components/PaintLink";
import { Scallop } from "@/components/decor";
import { RoomArt } from "@/components/rooms/rooms";
import { home, paint, rooms } from "@/content/site";
import styles from "./RoomsRail.module.css";

/** A suite of rooms you scroll through sideways. Phones get a swipeable strip instead. */
export function RoomsRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    if (!section || !rail) return;
    const query = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");

    let frame = 0;
    let travel = 0;

    const place = () => {
      frame = 0;
      const top = section.getBoundingClientRect().top;
      const progress = travel > 0 ? Math.min(1, Math.max(0, -top / travel)) : 0;
      rail.style.transform = `translate3d(${(-travel * progress).toFixed(1)}px, 0, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(place);
    };
    const measure = () => {
      if (!query.matches) {
        section.removeAttribute("data-pinned");
        section.style.height = "";
        rail.style.transform = "";
        return;
      }
      section.dataset.pinned = "";
      travel = Math.max(0, rail.scrollWidth - window.innerWidth);
      section.style.height = `${window.innerHeight + travel}px`;
      place();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    query.addEventListener("change", measure);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      query.removeEventListener("change", measure);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="rooms-title">
      <div className={styles.stage}>
        <div ref={railRef} className={styles.rail}>
          <header className={styles.intro}>
            <h2 id="rooms-title" className="display-lg">
              {home.rooms.title}
            </h2>
            <p>{home.rooms.lead}</p>
          </header>
          {rooms.map((room) => (
            <article key={room.slug} className={styles.card}>
              <Link href={`/portfolio/${room.slug}`} className={styles.cardLink}>
                <div className={styles.art}>
                  <RoomArt slug={room.slug} title={`Illustration of ${room.title}`} className={styles.svg} />
                </div>
                <div className={styles.meta}>
                  <h3 className={styles.cardTitle}>{room.title}</h3>
                  <span className={styles.dots} aria-hidden="true">
                    {room.scheme.map((item) => (
                      <i key={item.part} style={{ background: paint(item.paint) }} />
                    ))}
                  </span>
                </div>
              </Link>
            </article>
          ))}
          <div className={styles.end}>
            <p className="title display-sm">see every room.</p>
            <PaintLink href="/portfolio" color="shallot" ink="hague">
              the portfolio
            </PaintLink>
          </div>
        </div>
      </div>
      <Scallop color="hague" />
    </section>
  );
}
