import type { CSSProperties } from "react";
import { useLocation } from "react-router";
import { DotGrid, Rings } from "./Decor";
import { useLamp } from "../lib/useLamp";

/** Quiet fixed layer behind every page. Tints itself with the selected lamp colour. */
export default function Backdrop() {
  const { color } = useLamp();
  const { pathname } = useLocation();
  const page = pathname.startsWith("/order") ? "order" : "home";

  return (
    <div
      className="backdrop"
      data-page={page}
      style={{ "--bg-accent": color.hex } as CSSProperties}
      aria-hidden="true"
    >
      <div className="backdrop__grid" />
      <div className="backdrop__blob backdrop__blob--a" />
      <div className="backdrop__blob backdrop__blob--b" />
      <Rings className="absolute -left-[20vmax] top-[10vh] w-[48vmax] text-ink/[0.06]" />
      <DotGrid className="absolute bottom-10 right-8 hidden h-40 w-60 text-ink/15 md:block" />
    </div>
  );
}
