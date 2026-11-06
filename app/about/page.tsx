import type { Metadata } from "next";
import { Coat } from "@/components/Coat";
import { PageHero } from "@/components/PageHero";
import { PaintLink } from "@/components/PaintLink";
import { Reveal } from "@/components/Reveal";
import styles from "@/components/pages.module.css";
import { about, paint, type PaintKey } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "Angelina Severino, the designer behind Not All Beige.",
  alternates: { canonical: "/about" },
};

const beliefColours: PaintKey[] = ["shallot", "india", "lulworth", "calamine", "aulait"];

export default function AboutPage() {
  const [lead, ...rest] = about.body;
  return (
    <Coat>
      <div>
        <PageHero color="india" ink="hague" title={about.title} />
        <img
          src="/images/angelina-severino.png"
          alt="Angelina Severino sitting at a long table in a room hung with floor-to-ceiling red curtains"
          width={2773}
          height={1838}
          loading="eager"
          className={styles.portrait}
        />
        <section className={`gutter ${styles.aboutCopy}`}>
          <Reveal as="p" className={styles.aboutLead}>
            {lead}
          </Reveal>
          <div className={styles.aboutRest}>
            {rest.map((paragraph, index) => (
              <Reveal as="p" key={paragraph} delay={index * 90}>
                {paragraph}
              </Reveal>
            ))}
            <Reveal delay={200}>
              <PaintLink href="/contact">say hello</PaintLink>
            </Reveal>
          </div>
        </section>
        <section className={`gutter ${styles.beliefs}`} aria-label="What we believe">
          <ul className={styles.beliefList}>
            {about.beliefs.map((belief, index) => (
              <Reveal as="li" key={belief} className={styles.belief}>
                <span style={{ color: paint(beliefColours[index % beliefColours.length]) }}>{belief}</span>
              </Reveal>
            ))}
          </ul>
        </section>
      </div>
    </Coat>
  );
}
