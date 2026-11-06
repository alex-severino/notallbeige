import Link from "next/link";
import type { CSSProperties } from "react";
import { CheckBand, Scallop } from "@/components/decor";
import { PaintLink } from "@/components/PaintLink";
import { Reveal } from "@/components/Reveal";
import { arch } from "@/components/rooms/parts";
import { home, paint, services, site, type PaintKey } from "@/content/site";
import styles from "./sections.module.css";

const ROSETTE_TEXT = "not all beige · come in · sit down · stay a while · ";

function Rosette() {
  const petals = 16;
  const radius = 88;
  let edge = "";
  for (let i = 0; i < petals; i++) {
    const a0 = (i / petals) * Math.PI * 2;
    const a1 = ((i + 1) / petals) * Math.PI * 2;
    const x0 = 100 + radius * Math.cos(a0);
    const y0 = 100 + radius * Math.sin(a0);
    const x1 = 100 + radius * Math.cos(a1);
    const y1 = 100 + radius * Math.sin(a1);
    edge += `${i ? "" : `M${x0.toFixed(2)} ${y0.toFixed(2)}`}A17.5 17.5 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  }
  return (
    <div className={styles.rosette} aria-hidden="true">
      <svg viewBox="0 0 200 200" className={styles.rosetteSpin}>
        <path d={`${edge}Z`} fill={paint("india")} />
        <defs>
          <path id="rosette-ring" d="M100 100m-69 0a69 69 0 1 1 138 0a69 69 0 1 1 -138 0" />
        </defs>
        <text fontSize="16.4" fontWeight="900" fill={paint("hague")} letterSpacing="0.2">
          <textPath href="#rosette-ring">{ROSETTE_TEXT}</textPath>
        </text>
      </svg>
      <svg viewBox="0 0 200 200" className={styles.rosetteCore}>
        <path d={arch(100, 136, 25, 72)} fill={paint("romesco")} />
        <path d={arch(100, 136, 13, 44)} fill={paint("lulworth")} />
      </svg>
    </div>
  );
}

export function Intro() {
  return (
    <section className={styles.intro}>
      <div className="gutter">
        <Reveal as="h2" className={`display-xl ${styles.introTitle}`}>
          {home.intro.title}
        </Reveal>
        <Rosette />
        <div className={styles.introCopy}>
          <Reveal as="p" className={styles.lead}>
            {home.intro.lead}
          </Reveal>
          <Reveal as="p" delay={120}>
            {home.intro.body}
          </Reveal>
        </div>
      </div>
      <Scallop color="calamine" />
    </section>
  );
}

function Beyond({ color, floor }: { color: PaintKey; floor: PaintKey }) {
  return (
    <svg viewBox="0 0 300 480" preserveAspectRatio="xMidYMax slice" aria-hidden="true" className={styles.beyond}>
      <rect width={300} height={480} fill={paint(color)} />
      <path d={arch(150, 392, 74, 250)} fill={paint("aulait")} />
      <path d={arch(150, 392, 62, 238)} fill={paint(floor)} />
      <path d={arch(150, 392, 32, 150)} fill={paint("aulait")} />
      <path d={arch(150, 392, 24, 142)} fill={paint(color)} />
      <path d="M0 480L62 392H238L300 480Z" fill={paint("aulait")} />
      <path d="M38 480 75 392H113L95 480ZM205 480 187 392H225L262 480Z" fill={paint(floor)} />
    </svg>
  );
}

export function Doors() {
  const beyondFloors: PaintKey[] = ["hague", "romesco", "india"];
  return (
    <section className={styles.doorsSection}>
      <div className="gutter">
        <div className={styles.sectionHead}>
          <Reveal as="h2" className="display-lg">
            {home.doors.title}
          </Reveal>
          <Reveal as="p" className={styles.headLead} delay={100}>
            {home.doors.lead}
          </Reveal>
        </div>
        <div className={styles.doors}>
          {services.map((service, index) => (
            <Reveal key={service.id} as="article" delay={index * 110} className={styles.door}>
              <Link href={`/services#${service.id}`} className={styles.doorLink}>
                <div className={styles.frame}>
                  <div className={styles.opening}>
                    <Beyond color={service.beyond} floor={beyondFloors[index]} />
                    <div
                      className={styles.leaf}
                      style={{ "--leaf": paint(service.leaf), "--leaf-ink": paint(service.leaf === "romesco" || service.leaf === "hague" || service.leaf === "bancha" ? "aulait" : "hague") } as CSSProperties}
                    >
                      <span className={styles.leafPanelTop} />
                      <span className={styles.leafPanelBottom} />
                      <span className={styles.leafNumber}>{service.door}</span>
                      <span className={styles.knob} />
                    </div>
                  </div>
                </div>
                <h3 className={`display-sm ${styles.doorTitle}`}>{service.title}</h3>
                <p className={styles.doorText}>{service.short}</p>
                <span className={styles.doorMore}>find out more →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
      <Scallop color="india" />
    </section>
  );
}

export function Marquee() {
  const items = home.marquee;
  const run = [...items, ...items, ...items, ...items];
  return (
    <section aria-label={items.join(", ")}>
      <CheckBand a="aulait" b="hague" size={38} rows={1} />
      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {run.map((item, index) => (
            <span key={index} className={styles.marqueeItem}>
              {item}
              <i className={styles.marqueeDot} style={{ background: paint(["romesco", "india", "lulworth", "shallot", "calamine"][index % 5] as PaintKey) }} />
            </span>
          ))}
        </div>
      </div>
      <CheckBand a="hague" b="aulait" size={38} rows={1} />
    </section>
  );
}

export function Open() {
  return (
    <section className={styles.open}>
      <div className="gutter">
        <Reveal as="h2" className="display-xl">
          {home.open.title}
        </Reveal>
        <Reveal as="p" delay={100} className={styles.openLead}>
          {home.open.lead}
        </Reveal>
        <Reveal delay={160}>
          <a href={`mailto:${site.email}`} className={styles.email}>
            {site.email}
          </a>
        </Reveal>
        <Reveal delay={220} className={styles.buttons}>
          <PaintLink href="/contact">get in touch</PaintLink>
          <PaintLink href="/shop" color="india" ink="hague">
            visit the shop
          </PaintLink>
        </Reveal>
      </div>
    </section>
  );
}
