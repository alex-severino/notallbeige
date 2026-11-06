import Link from "next/link";
import type { CSSProperties } from "react";
import { CheckBand, Scallop } from "@/components/decor";
import { PaintLink } from "@/components/PaintLink";
import { Reveal } from "@/components/Reveal";
import { arch, Enfilade, type EnfiladeRoom } from "@/components/rooms/parts";
import { home, paint, services, site, type PaintKey } from "@/content/site";
import styles from "./sections.module.css";

const ROSETTE_TEXT = "NOT ALL BEIGE · COME ON IN · ";
const RING = 72;

function Rosette() {
  const petals = 16;
  const radius = 90;
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
      {/* The box is wider than 200 so the lobes aren't clipped flat as it turns. */}
      <svg viewBox="-10 -10 220 220" className={styles.rosetteSpin}>
        <path d={`${edge}Z`} fill={paint("hague")} />
        <defs>
          <path id="rosette-ring" d={`M100 100m${-RING} 0a${RING} ${RING} 0 1 1 ${RING * 2} 0a${RING} ${RING} 0 1 1 ${-RING * 2} 0`} />
        </defs>
        <text fontSize="21" fontWeight="900" fill={paint("aulait")}>
          <textPath href="#rosette-ring" textLength={(2 * Math.PI * RING - 2).toFixed(1)} lengthAdjust="spacing">
            {ROSETTE_TEXT}
          </textPath>
        </text>
      </svg>
      <svg viewBox="-10 -10 220 220" className={styles.rosetteCore}>
        <path d={arch(100, 134, 27, 76)} fill={paint("romesco")} />
        <path d={arch(100, 134, 14, 46)} fill={paint("india")} />
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

const tile = (a: PaintKey, b: PaintKey): [string, string] => [paint(a), paint(b)];

/** What you can see through each door. */
const suites: EnfiladeRoom[][] = [
  [
    { wall: paint("lulworth"), tile: tile("aulait", "hague") },
    { wall: paint("hague"), tile: tile("aulait", "romesco") },
    { wall: paint("india"), tile: tile("aulait", "romesco") },
    { wall: paint("calamine") },
  ],
  [
    { wall: paint("shallot"), tile: tile("aulait", "romesco") },
    { wall: paint("romesco"), tile: tile("aulait", "hague") },
    { wall: paint("lulworth"), tile: tile("aulait", "hague") },
    { wall: paint("india") },
  ],
  [
    { wall: paint("romesco"), tile: tile("aulait", "hague") },
    { wall: paint("india"), tile: tile("aulait", "bancha") },
    { wall: paint("shallot"), tile: tile("aulait", "romesco") },
    { wall: paint("lulworth") },
  ],
];

function Beyond({ rooms }: { rooms: EnfiladeRoom[] }) {
  return (
    <svg viewBox="0 0 300 480" preserveAspectRatio="xMidYMax slice" aria-hidden="true" className={styles.beyond}>
      <Enfilade
        rooms={rooms}
        cx={150}
        floor={480}
        halfWidth={150}
        height={480}
        vanish={[150, 300]}
        frame={14}
        frameFill={paint("aulait")}
        depth={0.62}
      />
    </svg>
  );
}

export function Doors() {
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
                    <Beyond rooms={suites[index]} />
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
