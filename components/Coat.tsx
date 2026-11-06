import { ViewTransition, type ReactNode } from "react";

/** Wrap each page so that navigating rolls a fresh coat of colour across the old one. */
export function Coat({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="coat" exit="coat-under" default="none">
      {children}
    </ViewTransition>
  );
}
