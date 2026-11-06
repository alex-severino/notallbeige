import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Coat } from "@/components/Coat";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import styles from "@/components/pages.module.css";
import { RoomArt } from "@/components/rooms/rooms";
import { home, paint, rooms } from "@/content/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Colour stories from the Not All Beige sketchbook.",
  alternates: { canonical: "/portfolio" },
};

/** Magazine layout: wide, arch, arch, wide, then two halves. */
const layout = [
  { span: 4, ratio: "4 / 3", arch: false },
  { span: 2, ratio: "2 / 3", arch: true },
  { span: 2, ratio: "2 / 3", arch: true },
  { span: 4, ratio: "4 / 3", arch: false },
  { span: 3, ratio: "4 / 3", arch: false },
  { span: 3, ratio: "4 / 3", arch: false },
];

export default function PortfolioPage() {
  return (
    <Coat>
      <div>
        <PageHero color="lulworth" ink="hague" title={home.rooms.title} lead={home.rooms.lead} />
        <section className={`gutter ${styles.gallery}`} aria-label="Rooms">
          {rooms.map((room, index) => {
            const shape = layout[index % layout.length];
            return (
              <Reveal
                as="article"
                key={room.slug}
                className={styles.tile}
                delay={(index % 2) * 90}
              >
                <div data-arch={shape.arch} className={styles.tile} style={{ "--span": shape.span, "--ratio": shape.ratio } as CSSProperties}>
                  <Link href={`/portfolio/${room.slug}`} className={styles.tileLink}>
                    <div className={styles.tileArt}>
                      <RoomArt slug={room.slug} title={`Illustration of ${room.title}`} />
                    </div>
                    <h2 className={styles.tileTitle}>{room.title}</h2>
                    <div className={styles.tileMeta} aria-hidden="true">
                      {room.scheme.map((item) => (
                        <span key={item.part} className={styles.chip} style={{ background: paint(item.paint) }} />
                      ))}
                    </div>
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </section>
      </div>
    </Coat>
  );
}
