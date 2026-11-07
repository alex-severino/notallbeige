"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { LogoShapes } from "@/components/brand/Logo";
import { stackedMark } from "@/components/brand/logo-data";
import { Enfilade, FloorLamp, Frame, PedestalTable, Pendant, Vase, type EnfiladeRoom } from "@/components/rooms/parts";
import { findPaint, heroSchemes, home, paint, paints, type PaintKey } from "@/content/site";
import styles from "./Hero.module.css";

/** Each doorway is this much smaller than the last. */
const DEPTH = 0.64;
const ZOOM = 170;
const ROLL_MS = 1000;

/** Rooms seen through the door, nearest first. The last one is the next section's colour. */
const ENFILADE: EnfiladeRoom[] = [
  { wall: "var(--room)", tile: [paint("aulait"), paint("hague")] },
  { wall: paint("hague"), tile: [paint("shallot"), paint("romesco")] },
  { wall: paint("india"), tile: [paint("aulait"), paint("romesco")] },
  { wall: paint("shallot"), tile: [paint("aulait"), paint("bancha")] },
  { wall: paint("bancha"), tile: [paint("calamine"), paint("hague")] },
  { wall: paint("calamine") },
];

type Layout = {
  width: number;
  height: number;
  floor: number;
  logo: { x: number; y: number; size: number };
  door: { cx: number; halfWidth: number; height: number };
  vanish: [number, number];
  /** `note` matches the tin notes' body size at a typical width for the layout. */
  cue: { size: number; drop: number; gap: number; note: number };
  wide: boolean;
};

const LANDSCAPE: Layout = {
  width: 1600,
  height: 1000,
  floor: 880,
  logo: { x: 72, y: 150, size: 276 },
  door: { cx: 1204, halfWidth: 186, height: 662 },
  vanish: [1204, 612],
  cue: { size: 30, drop: 48, gap: 28, note: 18 },
  wide: true,
};

const PORTRAIT: Layout = {
  width: 800,
  height: 1640,
  floor: 1436,
  logo: { x: 32, y: 176, size: 256 },
  door: { cx: 556, halfWidth: 176, height: 590 },
  vanish: [556, 1160],
  cue: { size: 40, drop: 54, gap: 40, note: 30 },
  wide: false,
};

const logoTransform = ({ logo }: Layout) => {
  const scale = logo.size / 1000;
  const [minX, minY] = stackedMark.viewBox.split(" ").map(Number);
  return `translate(${logo.x - minX * scale} ${logo.y - minY * scale}) scale(${scale})`;
};

function Furnishings({ layout }: { layout: Layout }) {
  const { floor, wide } = layout;
  return (
    <>
      {wide ? (
        <>
          <Frame x={1450} y={214} w={120} h={166} frame="var(--trim)" mat="var(--pa)">
            <circle cx={60} cy={66} r={38} fill="var(--pb)" />
            <rect y={116} width={120} height={50} fill="var(--floor)" />
          </Frame>
          <PedestalTable x={1510} y={floor + 4} width={166} height={252} top="var(--trim)" leg="var(--floor)" />
          <Vase x={1510} y={floor - 248} s={0.6} body="var(--vase)" stem="var(--ink)" bloomA="var(--pb)" bloomB="var(--bloom)" />
          <Pendant x={960} y={276} width={224} shade="var(--shade)" fringe="var(--fringe)" cord="var(--trim)" />
        </>
      ) : null}
      {!wide ? (
        <FloorLamp x={72} y={floor + 2} s={0.56} height={470} shade="var(--shade)" stripe="var(--pb)" fringe="var(--fringe)" stem="var(--trim)" />
      ) : null}
    </>
  );
}

function Scene({
  layout,
  className,
  worldRef,
}: {
  layout: Layout;
  className: string;
  worldRef: React.RefObject<SVGGElement | null>;
}) {
  const { width, height, floor, door, cue } = layout;
  return (
    <svg className={`${styles.scene} ${className}`} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <g ref={worldRef}>
        <rect x={-9000} y={floor} width={20000} height={9000} fill="var(--floor)" />
        <rect x={-9000} y={floor - 44} width={20000} height={44} fill="var(--trim)" />
        <g transform={logoTransform(layout)}>
          <LogoShapes mark={stackedMark} ink="var(--ink)" paintA="var(--pa)" paintB="var(--pb)" />
        </g>
        <Enfilade
          rooms={ENFILADE}
          cx={door.cx}
          floor={floor}
          halfWidth={door.halfWidth}
          height={door.height}
          vanish={layout.vanish}
          frame={24}
          frameFill="var(--trim)"
          depth={DEPTH}
        />
        <text className={styles.cue} x={door.cx} y={floor + cue.drop} textAnchor="middle" fill="var(--trim)">
          <tspan fontSize={cue.size} fontWeight={900} letterSpacing="-0.02em">
            {home.hero.welcome}
          </tspan>
          <tspan x={door.cx} dy={cue.gap} fontSize={cue.note} fontWeight={600}>
            {home.hero.scrollCue}
          </tspan>
        </text>
        <Furnishings layout={layout} />
      </g>
    </svg>
  );
}

function Roller({ color, className }: { color: string; className?: string }) {
  return (
    <div className={`${styles.roller} ${className ?? ""}`} style={{ "--nap": color } as CSSProperties} aria-hidden="true">
      <svg viewBox="0 0 300 60" className={styles.rollerArm}>
        <path d="M0 30H120" stroke="var(--color-aulait)" strokeWidth="9" />
        <rect x="116" y="14" width="184" height="32" rx="16" fill="var(--color-hague)" />
      </svg>
    </div>
  );
}

function Tin({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 48 58" aria-hidden="true">
      <path d="M8 16C8 1 40 1 40 16" fill="none" stroke="var(--color-aulait)" strokeWidth="2.6" />
      <path d="M4 14H44V50A6 6 0 0 1 38 56H10A6 6 0 0 1 4 50Z" fill={color} stroke="var(--color-aulait)" strokeWidth="2" />
      <rect x="1.5" y="11" width="45" height="6.5" rx="3" fill="var(--color-aulait)" />
    </svg>
  );
}

function schemeVars(key: PaintKey): CSSProperties {
  const scheme = heroSchemes[key];
  return {
    "--ink": paint(scheme.ink),
    "--pa": paint(scheme.a),
    "--pb": paint(scheme.b),
    "--trim": paint(scheme.trim),
    "--floor": paint(scheme.floor),
    "--bloom": paint(scheme.bloom),
    "--vase": paint(scheme.vase),
    "--shade": paint(scheme.shade),
    "--fringe": paint(scheme.fringe),
    "--room": paint(scheme.room),
  } as CSSProperties;
}

/** The opening gag plays once per visit, not on every return to the homepage. */
let introPlayed = false;

export function Hero() {
  const [wall, setWall] = useState<PaintKey>("romesco");
  const [scheme, setScheme] = useState<PaintKey>("romesco");
  const [coat, setCoat] = useState<{ to: PaintKey; id: number } | null>(null);
  const [intro, setIntro] = useState(() => !introPlayed);
  // Null until a tin has been touched: the note invites people to try one.
  const [note, setNote] = useState<PaintKey | null>(null);
  const [played, setPlayed] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wideWorld = useRef<SVGGElement>(null);
  const tallWorld = useRef<SVGGElement>(null);
  const timers = useRef<number[]>([]);
  const coats = useRef(0);

  useEffect(() => {
    introPlayed = true;
    const pending = timers.current;
    return () => pending.forEach(window.clearTimeout);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const box = section.getBoundingClientRect();
      const travel = box.height - window.innerHeight;
      const progress = travel > 0 ? Math.min(1, Math.max(0, -box.top / travel)) : 0;
      const scale = Math.exp(Math.log(ZOOM) * progress);
      const place = (world: SVGGElement | null, [vx, vy]: [number, number]) =>
        world?.setAttribute("transform", `translate(${vx} ${vy}) scale(${scale.toFixed(4)}) translate(${-vx} ${-vy})`);
      place(wideWorld.current, LANDSCAPE.vanish);
      place(tallWorld.current, PORTRAIT.vanish);
      stage.style.setProperty("--progress", progress.toFixed(4));
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  function repaint(next: PaintKey) {
    setNote(next);
    setPlayed(true);
    if (next === wall || coat) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setWall(next);
      setScheme(next);
      return;
    }
    coats.current += 1;
    setCoat({ to: next, id: coats.current });
    timers.current.push(
      window.setTimeout(() => setScheme(next), ROLL_MS * 0.42),
      window.setTimeout(() => {
        setWall(next);
        setCoat(null);
      }, ROLL_MS),
    );
  }

  const current = note ? findPaint(note) : null;
  const rest = played ? wall : null;

  return (
    <section ref={sectionRef} className={styles.hero} aria-label="Welcome">
      <h1 className="sr-only">Not All Beige, interior design by Angelina Severino</h1>
      <div
        ref={stageRef}
        className={styles.stage}
        style={{ ...schemeVars(scheme), background: paint(wall), "--progress": 0 } as CSSProperties}
      >
        {coat ? <div key={`coat-${coat.id}`} className={styles.coat} style={{ background: paint(coat.to) }} /> : null}

        <Scene layout={LANDSCAPE} className={styles.wide} worldRef={wideWorld} />
        <Scene layout={PORTRAIT} className={styles.tall} worldRef={tallWorld} />

        {coat ? <Roller key={`roller-${coat.id}`} color={paint(coat.to)} /> : null}

        <div className={styles.controls}>
          <p className={styles.note} aria-live="polite">
            <span className={styles.noteName} data-prompt={!current}>
              {current ? current.name : home.hero.tinPrompt.title}
            </span>
            {current ? current.note : home.hero.tinPrompt.body}
          </p>
          <div className={styles.tins} data-invite={!played} role="group" aria-label="Repaint the wall">
            {paints.map((item, index) => (
              <button
                key={item.key}
                type="button"
                className={styles.tin}
                style={{ "--i": index } as CSSProperties}
                aria-label={`Paint the wall ${item.name}`}
                aria-pressed={wall === item.key}
                onClick={() => repaint(item.key)}
                onPointerEnter={() => setNote(item.key)}
                onPointerLeave={() => setNote(rest)}
                onFocus={() => setNote(item.key)}
                onBlur={() => setNote(rest)}
              >
                <Tin color={paint(item.key)} />
              </button>
            ))}
          </div>
        </div>

        <p className={styles.coverline}>
          {home.hero.coverline[0]}
          <br />
          {home.hero.coverline[1]}
        </p>

        {intro ? (
          // Removed once finished: Next keeps this page alive between visits, and showing it
          // again would otherwise restart the animation.
          <div className={styles.curtain} aria-hidden="true" onAnimationEnd={() => setIntro(false)}>
            {[LANDSCAPE, PORTRAIT].map((layout) => (
              <svg
                key={layout.width}
                className={`${styles.scene} ${layout.wide ? styles.wide : styles.tall}`}
                viewBox={`0 0 ${layout.width} ${layout.height}`}
                preserveAspectRatio="xMidYMax meet"
              >
                <g transform={logoTransform(layout)} fill="var(--color-aulait)">
                  <path d={stackedMark.words[1]} />
                  <path d={stackedMark.words[2]} />
                </g>
              </svg>
            ))}
          </div>
        ) : null}
        {intro ? <Roller color={paint("romesco")} className={styles.introRoller} /> : null}
      </div>
    </section>
  );
}
