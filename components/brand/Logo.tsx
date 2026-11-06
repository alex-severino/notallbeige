import { lineMark, lowerMark, stackedMark, type LogoMark } from "./logo-data";

const marks = { line: lineMark, stacked: stackedMark, lower: lowerMark };

type LogoProps = {
  variant?: keyof typeof marks;
  /** Letter colour. */
  ink?: string;
  /** Paint for the top of the B. */
  paintA?: string;
  /** Paint for the A and the bottom of the B. */
  paintB?: string;
  className?: string;
  title?: string;
};

/** The letters with their enclosed spaces painted in, shared by the logo and the hero. The first spot is the O, painted with `paintA` unless `paintO` is given. */
export function LogoShapes({
  mark,
  ink,
  paintA,
  paintB,
  paintO = paintA,
}: {
  mark: LogoMark;
  ink: string;
  paintA: string;
  paintB: string;
  paintO?: string;
}) {
  return (
    <>
      {mark.spots.map((spot, index) => {
        const colour = index === 0 ? paintO : index % 2 === 0 ? paintA : paintB;
        return <path key={spot} d={spot} style={{ fill: colour, stroke: colour }} strokeWidth={12} />;
      })}
      <path d={mark.letters} style={{ fill: ink }} />
    </>
  );
}

export function Logo({
  variant = "line",
  ink = "var(--color-romesco)",
  paintA = "var(--color-lulworth)",
  paintB = "var(--color-india)",
  className,
  title = "not all beige",
}: LogoProps) {
  const mark = marks[variant];
  return (
    <svg viewBox={mark.viewBox} role="img" aria-label={title} className={className}>
      <LogoShapes mark={mark} ink={ink} paintA={paintA} paintB={paintB} paintO="var(--color-shallot)" />
    </svg>
  );
}
