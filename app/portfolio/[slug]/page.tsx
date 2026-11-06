import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Coat } from "@/components/Coat";
import { Scallop } from "@/components/decor";
import styles from "@/components/pages.module.css";
import { RoomArt } from "@/components/rooms/rooms";
import { findPaint, paint, rooms } from "@/content/site";

/** Every room is known at build time, so nothing here should ever render per request. */
export const ensureStatic = "navigation";
/** The slug isn't in the shared shell, so opening a room waits for its small static page. */
export const instant = false;

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const room = rooms.find((item) => item.slug === slug);
  if (!room) return {};
  return {
    title: room.title,
    description: room.story,
    alternates: { canonical: `/portfolio/${room.slug}` },
  };
}

export default async function RoomPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const index = rooms.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const room = rooms[index];
  const next = rooms[(index + 1) % rooms.length];

  return (
    <Coat>
      <div>
        <div className={styles.roomArt}>
          <RoomArt slug={room.slug} title={`Illustration of ${room.title}`} crop="xMidYMid slice" />
        </div>
        <section className={styles.roomBody} style={{ background: paint(room.paint), color: paint(room.ink) }}>
          <div className="gutter">
            <h1 className="display-lg">{room.title}</h1>
            <div className={styles.roomGrid}>
              <div>
                <p>{room.story}</p>
                <p className={styles.note}>An illustrated colour scheme. Photographs are on their way.</p>
              </div>
              <ul className={styles.schemeList}>
                {room.scheme.map((item) => {
                  const colour = findPaint(item.paint);
                  return (
                    <li key={item.part} className={styles.schemeRow} style={{ background: paint(colour.key), color: paint(colour.ink) }}>
                      <span>{item.part}</span>
                      <span>{colour.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <Scallop color={room.paint} />
        </section>
        {room.photos.length ? (
          <section className="gutter grid gap-4 bg-aulait py-20">
            {room.photos.map((photo) => (
              <img key={photo.src} src={photo.src} alt={photo.alt} loading="lazy" className="block h-auto w-full" />
            ))}
          </section>
        ) : null}
        <Link href={`/portfolio/${next.slug}`} className={`gutter ${styles.next}`} style={{ background: paint(next.paint), color: paint(next.ink) }}>
          <p className={styles.nextLabel}>next room →</p>
          <p className="title display-lg">{next.title}</p>
        </Link>
      </div>
    </Coat>
  );
}
