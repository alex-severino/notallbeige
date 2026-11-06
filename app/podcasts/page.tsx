import type { Metadata } from "next";
import { Coat } from "@/components/Coat";
import { PageHero } from "@/components/PageHero";
import styles from "@/components/pages.module.css";
import { paint, podcasts, type PaintKey } from "@/content/site";

export const metadata: Metadata = {
  title: "Podcasts",
  description: "Angelina Severino in conversation on design, poster art and creative leadership.",
  alternates: { canonical: "/podcasts" },
};

function Record({ label, ink }: { label: PaintKey; ink: PaintKey }) {
  return (
    <svg viewBox="0 0 200 200" className={styles.record} aria-hidden="true">
      <circle cx={100} cy={100} r={100} fill={paint(ink)} />
      <g fill="none" stroke={paint(label)} strokeWidth={1.6} opacity={0.5}>
        <circle cx={100} cy={100} r={88} />
        <circle cx={100} cy={100} r={76} />
        <circle cx={100} cy={100} r={64} />
        <circle cx={100} cy={100} r={52} />
      </g>
      <circle cx={100} cy={100} r={38} fill={paint("shallot")} />
      <path d="M100 62A38 38 0 0 1 138 100H100Z" fill={paint("lulworth")} />
      <circle cx={100} cy={100} r={6} fill={paint(ink)} />
    </svg>
  );
}

export default function PodcastsPage() {
  return (
    <Coat>
      <div>
        <PageHero color="bancha" ink="aulait" title={podcasts.title} lead={podcasts.lead} />
        <section className={styles.episodes} aria-label="Episodes">
          {podcasts.episodes.map((episode) => (
            <a
              key={episode.href}
              href={episode.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.episode}
              style={{ background: paint(episode.paint), color: paint(episode.ink) }}
            >
              <Record label={episode.paint} ink={episode.ink} />
              <p className={styles.episodeShow}>
                {episode.show}, {episode.year}
              </p>
              <h2 className={styles.episodeTitle}>{episode.title}</h2>
              <span className={styles.episodeListen}>listen ↗</span>
            </a>
          ))}
        </section>
      </div>
    </Coat>
  );
}
