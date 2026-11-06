import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { paint, type PaintKey } from "@/content/site";

type PaintLinkProps = {
  href: string;
  children: ReactNode;
  color?: PaintKey;
  ink?: PaintKey;
  over?: PaintKey;
  overInk?: PaintKey;
  external?: boolean;
};

/** Chunky button. On hover a new coat rolls across it. */
export function PaintLink({
  href,
  children,
  color = "hague",
  ink = "aulait",
  over = "romesco",
  overInk = "aulait",
  external = false,
}: PaintLinkProps) {
  const style = {
    "--link": paint(color),
    "--link-ink": paint(ink),
    "--link-over": paint(over),
    "--link-over-ink": paint(overInk),
  } as CSSProperties;
  if (external) {
    return (
      <a href={href} className="paint-link" style={style} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className="paint-link" style={style}>
      {children}
    </Link>
  );
}
