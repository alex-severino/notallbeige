import { lineMark, stackedMark, type LogoMark } from "./logo-data";

type LogoProps = {
  variant?: "line" | "stacked";
  /** Letter colour. */
  ink?: string;
  /** First paint: the doorway, then every other spot. */
  paintA?: string;
  /** Second paint: the o, then every other spot. */
  paintB?: string;
  className?: string;
  title?: string;
};

/** The nine painted spots of the wordmark, shared by the logo and the hero. */
export function LogoShapes({
  mark,
  ink,
  paintA,
  paintB,
}: {
  mark: LogoMark;
  ink: string;
  paintA: string;
  paintB: string;
}) {
  const paint = (index: number) => (index % 2 === 0 ? paintA : paintB);
  return (
    <>
      {mark.spots.map((spot, index) =>
        spot.kind === "dot" ? null : (
          <path
            key={spot.d}
            d={spot.d}
            style={{ fill: paint(index), stroke: spot.kind === "counter" ? paint(index) : "none" }}
            strokeWidth={12}
          />
        ),
      )}
      <path d={mark.letters} style={{ fill: ink }} />
      {mark.spots.map((spot, index) =>
        spot.kind === "dot" ? <path key={spot.d} d={spot.d} style={{ fill: paint(index) }} /> : null,
      )}
    </>
  );
}

export function Logo({
  variant = "line",
  ink = "var(--color-romesco)",
  paintA = "var(--color-india)",
  paintB = "var(--color-lulworth)",
  className,
  title = "not all beige",
}: LogoProps) {
  const mark = variant === "line" ? lineMark : stackedMark;
  return (
    <svg viewBox={mark.viewBox} role="img" aria-label={title} className={className}>
      <LogoShapes mark={mark} ink={ink} paintA={paintA} paintB={paintB} />
    </svg>
  );
}
