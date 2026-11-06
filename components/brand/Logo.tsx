import { lineMark, lowerMark, stackedMark, type LogoMark } from "./logo-data";

const marks = { line: lineMark, stacked: stackedMark, lower: lowerMark };

type LogoProps = {
  variant?: keyof typeof marks;
  /** Letter colour. The enclosed spaces stay open, so whatever is behind shows through. */
  ink?: string;
  className?: string;
  title?: string;
};

/** The hero's letters with their enclosed spaces painted in. The logo itself is never filled. */
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
  return (
    <>
      {mark.spots.map((spot, index) => {
        const colour = index % 2 === 0 ? paintA : paintB;
        return <path key={spot} d={spot} style={{ fill: colour, stroke: colour }} strokeWidth={12} />;
      })}
      <path d={mark.letters} style={{ fill: ink }} />
    </>
  );
}

export function Logo({ variant = "line", ink = "var(--color-romesco)", className, title = "not all beige" }: LogoProps) {
  const mark = marks[variant];
  return (
    <svg viewBox={mark.viewBox} role="img" aria-label={title} className={className}>
      <path d={mark.letters} style={{ fill: ink }} />
    </svg>
  );
}
