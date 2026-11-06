import type { Metadata } from "next";
import { Coat } from "@/components/Coat";
import { PageHero } from "@/components/PageHero";
import { PaintLink } from "@/components/PaintLink";
import { Reveal } from "@/components/Reveal";
import { Scallop } from "@/components/decor";
import styles from "@/components/pages.module.css";
import { RoomArt } from "@/components/rooms/rooms";
import { paint, process, services, type PaintKey } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Full interior design, one-to-one consultancy and colour planning from Not All Beige.",
  alternates: { canonical: "/services" },
};

const illustrations = ["dining-room", "kitchen", "hallway"];
const stepColours: PaintKey[] = ["shallot", "india", "lulworth", "calamine"];

export default function ServicesPage() {
  return (
    <Coat>
      <div>
        <PageHero
          color="romesco"
          ink="aulait"
          title="three ways in."
          lead="Every project starts with a conversation about how you live. After that, pick your door."
        />
        {services.map((service, index) => (
          <section key={service.id} id={service.id} className={styles.band} style={{ background: paint(service.paint), color: paint(service.ink) }}>
            <div className={`gutter ${styles.bandGrid}`} data-flip={index % 2 === 1}>
              <div>
                <Reveal as="p" className={styles.doorLabel}>
                  door {service.door}
                </Reveal>
                <Reveal as="h2" className="display-md">
                  {service.title}
                </Reveal>
                <Reveal as="p" delay={90} className={styles.bandBody}>
                  {service.body}
                </Reveal>
                <Reveal delay={160}>
                  <ul className={styles.includes}>
                    {service.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Reveal>
              </div>
              <Reveal className={styles.archArt}>
                <RoomArt slug={illustrations[index]} title="Illustrated room scheme" />
              </Reveal>
            </div>
            <Scallop color={service.paint} />
          </section>
        ))}
        <section className={styles.process}>
          <div className="gutter">
            <Reveal as="h2" className="display-lg">
              how it goes.
            </Reveal>
            <ol className={styles.steps}>
              {process.map((step, index) => (
                <Reveal as="li" key={step.title} delay={index * 90}>
                  <span className={styles.stepNumber} style={{ color: paint(stepColours[index]) }}>
                    {index + 1}
                  </span>
                  <h3 className={`display-sm ${styles.stepTitle}`}>{step.title}</h3>
                  <p>{step.body}</p>
                </Reveal>
              ))}
            </ol>
            <PaintLink href="/contact" color="india" ink="hague">
              start with hello
            </PaintLink>
          </div>
        </section>
      </div>
    </Coat>
  );
}
