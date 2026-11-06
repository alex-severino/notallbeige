import { paint, type PaintKey } from "@/content/site";

/** Scalloped hem that hangs from a section into the next. */
export function Scallop({ color, size = 88, className = "" }: { color: PaintKey; size?: number; className?: string }) {
  const radius = size / 2;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-full z-10 ${className}`}
      style={{
        height: radius,
        marginTop: -1,
        backgroundImage: `radial-gradient(circle at 50% 0, ${paint(color)} ${radius - 0.5}px, transparent ${radius}px)`,
        backgroundSize: `${size}px ${radius}px`,
        backgroundPosition: "center top",
        backgroundRepeat: "repeat-x",
      }}
    />
  );
}

/** Band of checks, drawn with CSS so it never needs an image. */
export function CheckBand({ a, b, size = 44, rows = 2 }: { a: PaintKey; b: PaintKey; size?: number; rows?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        height: size * rows,
        backgroundColor: paint(a),
        backgroundImage: `conic-gradient(${paint(b)} 25%, transparent 0 50%, ${paint(b)} 0 75%, transparent 0)`,
        backgroundSize: `${size * 2}px ${size * 2}px`,
      }}
    />
  );
}
