import type { ReactNode } from "react";
import { Scallop } from "@/components/decor";
import { paint, type PaintKey } from "@/content/site";

/** Every inner page opens on a wall painted its own colour. */
export function PageHero({
  color,
  ink,
  title,
  lead,
  hem = true,
  children,
}: {
  color: PaintKey;
  ink: PaintKey;
  title: ReactNode;
  lead?: ReactNode;
  /** Set false when the footer's own scalloped edge comes straight after. */
  hem?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="relative" style={{ background: paint(color), color: paint(ink) }}>
      <div className="gutter pb-[clamp(3.5rem,9vh,6.5rem)] pt-[clamp(7.5rem,20vh,12rem)]">
        <h1 className="display-xl">{title}</h1>
        {lead ? <p className="mt-[clamp(1.5rem,4vh,3rem)] max-w-[30em] text-[1.15em] leading-[1.22]">{lead}</p> : null}
        {children}
      </div>
      {hem ? <Scallop color={color} /> : null}
    </section>
  );
}
