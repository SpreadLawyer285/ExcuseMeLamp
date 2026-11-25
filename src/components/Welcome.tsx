import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { Button } from "./Button";
import { Crosshair, Rings, Seal, TickRule } from "./Decor";
import LampViewer from "./LampViewer";
import { LAMP_COLORS } from "../lib/lamp";

type Phase = "in" | "flip" | "flood" | "out";
const TEXT = "Excuse me!";
const WELCOME_COLOR = LAMP_COLORS[0]; // yellow, turns red by itself when flipped

const SPARKLES: { x: string; y: string; s: number; d: number }[] = [
  { x: "12%", y: "28%", s: 24, d: 0 },
  { x: "84%", y: "22%", s: 18, d: 0.6 },
  { x: "90%", y: "64%", s: 28, d: 1.1 },
  { x: "9%", y: "70%", s: 18, d: 0.3 },
  { x: "28%", y: "86%", s: 14, d: 0.9 },
  { x: "72%", y: "10%", s: 14, d: 1.4 },
];

function Sparkle({ x, y, s, d }: (typeof SPARKLES)[number]) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="welcome__sparkle"
      style={{ left: x, top: y, width: s, height: s, animationDelay: `${d}s` }}
    >
      <path
        d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Tabletop line with a plate and a glass. */
function Table() {
  return (
    <svg
      viewBox="0 -80 720 100"
      className="welcome__table"
      aria-hidden="true"
      fill="none"
    >
      <line
        x1="0"
        y1="0"
        x2="720"
        y2="0"
        stroke="rgba(243,242,238,.28)"
        strokeWidth="1.5"
      />
      <ellipse
        cx="118"
        cy="-6"
        rx="72"
        ry="8"
        stroke="rgba(243,242,238,.4)"
        strokeWidth="1.5"
      />
      <ellipse
        cx="118"
        cy="-8"
        rx="46"
        ry="4.5"
        stroke="rgba(243,242,238,.25)"
        strokeWidth="1.2"
      />
      <path
        d="M572 0 L562 -74 H618 L608 0 Z"
        stroke="rgba(243,242,238,.4)"
        strokeWidth="1.5"
        fill="rgba(243,242,238,.06)"
      />
      <path d="M567 -26 H613" stroke="rgba(243,242,238,.3)" strokeWidth="1.2" />
    </svg>
  );
}

/** The 3D lamp stands on a table, is flipped over, turns red and calls the waiter — then the screen floods into the site. */
export default function Welcome({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("in");
  const [ready, setReady] = useState(false);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // never get stuck if the 3D scene is slow to start
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 2500);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const t: number[] = [];
    if (phase === "in" && ready)
      t.push(window.setTimeout(() => setPhase("flip"), reduce ? 300 : 2000));
    if (phase === "flip")
      t.push(window.setTimeout(() => setPhase("flood"), reduce ? 600 : 2400));
    if (phase === "flood")
      t.push(window.setTimeout(() => setPhase("out"), reduce ? 50 : 900));
    if (phase === "out") t.push(window.setTimeout(onDone, 450));
    return () => t.forEach(clearTimeout);
  }, [phase, ready, reduce, onDone]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")
        setPhase((p) => (p === "in" || p === "flip" ? "flood" : p));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className="welcome"
      data-phase={phase}
      data-ready={ready}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome"
    >
      {/* background decoration */}
      <div className="welcome__deco" aria-hidden="true">
        <div className="welcome__burst" />
        <Rings className="absolute left-1/2 top-1/2 w-[130vmin] -translate-x-1/2 -translate-y-1/2 text-white/[0.07]" />
        {SPARKLES.map((s, i) => (
          <Sparkle key={i} {...s} />
        ))}
        <Crosshair className="absolute left-5 top-5 text-white/30" />
        <Crosshair className="absolute right-5 top-5 text-white/30" />
        <Crosshair className="absolute bottom-5 left-5 text-white/30" />
        <Crosshair className="absolute bottom-5 right-5 text-white/30" />
        <div className="absolute inset-x-16 top-6 hidden text-white/40 sm:block">
          <div className="mb-2 flex justify-between text-[11px] font-semibold uppercase tracking-[0.2em]">
            <span>Nº 00 — Table service</span>
            <span>Excuse Me Lamp</span>
          </div>
          <TickRule />
        </div>
        <p className="absolute inset-x-0 bottom-8 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-white/40 sm:bottom-10">
          Your table is being served
        </p>
        <Seal
          text="FINISHED? FLIP IT • "
          color="var(--accent)"
          className="absolute bottom-14 left-8 hidden size-28 sm:block"
        />
      </div>

      {/* flood circle grows out of the lamp */}
      <div className="welcome__flood" aria-hidden="true" />

      {/* the scene */}
      <div className="welcome__stage">
        <div className="welcome__glow" aria-hidden="true" />

        <div className="welcome__lampbox">
          <span
            className="welcome__ping"
            aria-hidden="true"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="welcome__ping"
            aria-hidden="true"
            style={{ animationDelay: ".5s" }}
          />
          <span
            className="welcome__ping"
            aria-hidden="true"
            style={{ animationDelay: "1s" }}
          />
          <Table />
          <LampViewer
            decorative
            color={WELCOME_COLOR}
            flipTick={phase === "in" ? 0 : 1}
            flipDuration={1.5}
            smoothFlip
            onReady={onReady}
            className="h-full w-full"
          />
        </div>

        <h1 className="welcome__bubble" aria-label={TEXT}>
          {[...TEXT].map((ch, i) => (
            <span
              key={i}
              style={{ "--i": i } as CSSProperties}
              aria-hidden="true"
            >
              {ch}
            </span>
          ))}
        </h1>

        <p className="welcome__tag" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" />
            <path d="M10 21a2 2 0 0 0 4 0" />
          </svg>
          Table 7 · Waiter called
        </p>
      </div>

      <Button
        variant="light"
        className="welcome__skip"
        onClick={() => setPhase("flood")}
        autoFocus
      >
        Skip
      </Button>
    </div>
  );
}
