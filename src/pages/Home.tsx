import { useState } from "react";
import Container from "../components/Container";
import { Button, ButtonLink } from "../components/Button";
import ColorPicker from "../components/ColorPicker";
import {
  Crosshair,
  DotGrid,
  Marquee,
  Rings,
  Seal,
  TickRule,
} from "../components/Decor";
import LampViewer from "../components/LampViewer";
import StatusChip from "../components/StatusChip";
import { FLIPPED_COLOR, LAMP_COLORS, PRODUCT, formatPrice } from "../lib/lamp";
import { useLamp } from "../lib/useLamp";

const BAND = [
  "Excuse me",
  "Finished?",
  "Flip it",
  "Waiter called",
  "Excuse me",
];

const ANATOMY = [
  ["Lid", "A quiet grey disc that caps the lamp."],
  ["Glow ring", "A thin halo of light around the lid."],
  [
    "Glass band",
    "The glowing middle, pale at one end and deeper at the other.",
  ],
  ["Floor disc", "A bright circle of light at the bottom of the glass."],
  [
    "Base",
    "Dark and weighty. Both ends are identical caps, so it looks right either way up.",
  ],
] as const;

const VENUES = [
  {
    name: "Restaurant",
    note: "Guests signal when the plates are empty — no hand in the air.",
    span: "lg:col-span-4",
    mix: 70,
    rot: "-rotate-1",
    h: "min-h-64",
  },
  {
    name: "Café",
    note: "Finished the coffee? Flip it. The next order is on its way.",
    span: "lg:col-span-5",
    mix: 45,
    rot: "rotate-1",
    h: "min-h-72",
  },
  {
    name: "Bar",
    note: "Spot an empty glass signal across a busy room.",
    span: "lg:col-span-3",
    mix: 85,
    rot: "-rotate-2",
    h: "min-h-64",
  },
  {
    name: "Hotel breakfast",
    note: "A quiet way to say “we’re done” in a quiet room.",
    span: "lg:col-span-7",
    mix: 30,
    rot: "rotate-0",
    h: "min-h-60",
  },
  {
    name: "Terrace",
    note: "Easy to see from the door, even in daylight.",
    span: "lg:col-span-5",
    mix: 60,
    rot: "rotate-1",
    h: "min-h-60",
  },
] as const;

const FAQ = [
  [
    "How does the waiter know?",
    "The lamp turns red as soon as it’s turned upside down. A red glow is easy to spot from across the room.",
  ],
  [
    "Who resets it?",
    "Staff do. After clearing the table they stand the lamp back up, and it returns to the venue colour.",
  ],
  [
    "Can we use our own colours?",
    "Yes. Pick from ten upright colours to match your brand or to colour-code areas such as terrace, bar and dining room. Upside down is always red, so the signal means the same everywhere.",
  ],
  ["Does it need an app or buttons?", "None. Orientation is the only switch."],
] as const;

const QUOTES = [
  {
    text: "Excuse me, we’ve finished eating.",
    bg: "#ff2d2d",
    fg: "#fff",
    rot: "-rotate-3",
    mt: "lg:mt-0",
  },
  {
    text: "Excuse me, we’re done with our drinks.",
    bg: "#ffffff",
    fg: "#0e0e10",
    rot: "rotate-2",
    mt: "lg:mt-10",
  },
  {
    text: "Excuse me, could you clear the table?",
    bg: "#0e0e10",
    fg: "#f3f2ee",
    rot: "-rotate-1",
    mt: "lg:mt-2",
  },
  {
    text: "Excuse me, the bill when you can.",
    bg: "accent",
    fg: "#0e0e10",
    rot: "rotate-3",
    mt: "lg:mt-12",
  },
] as const;

const isLight = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const r = n >> 16,
    g = (n >> 8) & 255,
    b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 150;
};

export default function Home() {
  const { color, setColor } = useLamp();
  const [upsideDown, setUpsideDown] = useState(false);
  const [flipTick, setFlipTick] = useState(0);
  const shown = upsideDown ? FLIPPED_COLOR : color;
  const accentInk = isLight(color.hex) ? "text-night" : "text-white";

  return (
    <div className="page-enter overflow-x-clip">
      {/* HERO */}
      <Container className="grid gap-8 pb-16 pt-8 lg:grid-cols-12 lg:gap-10 lg:pt-14">
        <div className="relative flex flex-col justify-between gap-10 lg:col-span-5">
          <DotGrid className="pointer-events-none absolute -left-4 -top-6 h-44 w-64 text-ink/30" />
          <div className="relative">
            <div className="flex items-center gap-4 text-mute">
              <span aria-hidden="true" className="h-px w-12 bg-ink" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                Nº 01 — The table signal for restaurants &amp; cafés
              </p>
            </div>
            <h1 className="mt-6 text-[clamp(3.6rem,9vw,7.5rem)] font-black leading-[0.86] tracking-tighter">
              Excuse
              <br />
              me
              <span
                className="transition-colors duration-500"
                style={{ color: shown.hex }}
              >
                .
              </span>
            </h1>
            <Seal
              text="FINISHED? FLIP IT • "
              color="#0e0e10"
              ink="#f3f2ee"
              className="absolute -top-2 right-0 hidden size-24 rotate-12 sm:block lg:-right-2 lg:top-14"
            />
            <p className="mt-8 max-w-md text-lg leading-relaxed text-mute">
              A lamp that speaks for your guests. It glows softly while they
              enjoy their meal. When they’re finished, they turn it upside down
              — it turns red and calls the waiter. No waving, no catching an
              eye.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink to="/order" size="lg">
                Order for your venue — {formatPrice(PRODUCT.price)}
              </ButtonLink>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setFlipTick((t) => t + 1)}
              >
                Try the signal
              </Button>
            </div>
          </div>
          <div className="relative">
            <ColorPicker
              name="home-color"
              legend="Your venue colour"
              value={color}
              onChange={setColor}
            />
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink">
            <Rings className="pointer-events-none absolute left-1/2 top-1/2 w-[125%] -translate-x-1/2 -translate-y-1/2 text-white/10" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 transition-[background] duration-700"
              style={{
                background: `radial-gradient(60% 50% at 50% 55%, ${shown.hex}33, transparent 70%)`,
              }}
            />
            <Crosshair className="pointer-events-none absolute right-5 top-5 text-white/30 sm:right-7 sm:top-7" />
            <Crosshair className="pointer-events-none absolute bottom-24 left-5 text-white/20 sm:left-7" />
            <Crosshair className="pointer-events-none absolute bottom-24 right-5 text-white/20 sm:right-7" />

            <LampViewer
              color={color}
              onFlipChange={setUpsideDown}
              flipTick={flipTick}
              className="h-[500px] sm:h-[620px] lg:h-[700px]"
            />

            <div className="pointer-events-none absolute left-5 top-5 sm:left-7 sm:top-7">
              <StatusChip upsideDown={upsideDown} color={shown} />
            </div>
            <div className="pointer-events-none absolute inset-x-5 bottom-5 text-white/50 sm:inset-x-7 sm:bottom-7">
              <TickRule />
              <div className="mt-2 flex justify-between text-[11px] font-medium uppercase tracking-[0.18em]">
                <span>0° · Still enjoying</span>
                <span className="hidden sm:inline">Drag · Arrows · F</span>
                <span>180° · Come over</span>
              </div>
            </div>
          </div>

          <Seal
            color={shown.hex}
            className="absolute -right-3 -top-10 size-28 drop-shadow-lg sm:size-36 lg:-right-6"
          />

          {/* tilted edition card overlapping the stage */}
          <div className="absolute -left-8 bottom-32 z-10 hidden w-48 -rotate-6 rounded-2xl border border-line bg-paper p-4 shadow-xl lg:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mute">
              One per table
            </p>
            <p className="mt-2 text-2xl font-black leading-none tracking-tighter">
              {LAMP_COLORS.length} colours
              <br />+ 1 red
            </p>
            <div className="mt-3 flex -space-x-1.5">
              {LAMP_COLORS.map((c) => (
                <span
                  key={c.id}
                  className="size-4 rounded-full border border-paper"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              <span
                className="size-4 rounded-full border border-paper"
                style={{ backgroundColor: FLIPPED_COLOR.hex }}
              />
            </div>
          </div>
        </div>
      </Container>

      {/* BAND */}
      <Container className="pb-24">
        <Marquee
          words={BAND}
          dotColor={shown.hex}
          className="-rotate-1 rounded-full bg-ink py-4 text-2xl font-black uppercase tracking-tighter text-paper sm:text-4xl"
        />
      </Container>

      {/* COLOUR LIBRARY */}
      <section className="relative pb-28" aria-labelledby="library">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="relative lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mute">
              Nº 02 — Colour library
            </p>
            <h2
              id="library"
              className="mt-4 text-5xl font-black leading-[0.92] tracking-tighter sm:text-6xl"
            >
              Make it match your venue.
            </h2>
            <p className="mt-6 max-w-sm text-mute">
              Ten upright colours — match your brand, or colour-code areas like
              the terrace, the bar and the dining room. Press a card to try it
              on the lamp above.
            </p>
            <DotGrid className="mt-10 h-32 w-56 text-ink/25" />
            <Seal
              text="TEN COLOURS • ONE RED • "
              color={color.hex}
              className="absolute -bottom-6 right-4 hidden size-28 -rotate-12 lg:block"
            />
          </div>

          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
            {LAMP_COLORS.map((c, i) => {
              const light = isLight(c.hex);
              const selected = color.id === c.id;
              return (
                <li key={c.id} className={i % 2 ? "lg:mt-10" : ""}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setColor(c)}
                    className={`group relative flex aspect-[3/4] w-full flex-col justify-between overflow-hidden rounded-[1.75rem] p-4 text-left transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                      light ? "text-night" : "text-white"
                    } ${selected ? "ring-2 ring-ink ring-offset-4 ring-offset-paper" : ""}`}
                    style={{
                      background: `linear-gradient(165deg, ${c.hex}, color-mix(in srgb, ${c.hex} 62%, #000))`,
                    }}
                  >
                    <span
                      className="stripes-light pointer-events-none absolute inset-0 opacity-50"
                      aria-hidden="true"
                    />
                    <span className="relative text-sm font-bold tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-current opacity-40 transition duration-500 group-hover:scale-125"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current opacity-20"
                    />
                    <span className="relative">
                      <span className="block text-lg font-extrabold tracking-tight">
                        {c.name}
                      </span>
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] opacity-70">
                        {selected ? "Selected" : "Upright"}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* HOW IT WORKS — staggered, tilted cards */}
      <section
        className="relative overflow-hidden border-y border-line py-24"
        aria-labelledby="how"
      >
        <Rings className="pointer-events-none absolute -right-40 -top-32 w-[32rem] text-ink/10" />
        <Container className="relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2
              id="how"
              className="text-4xl font-extrabold tracking-tight sm:text-6xl"
            >
              How it works
            </h2>
            <p className="max-w-xs text-sm text-mute">
              Three steps. No buttons, no apps, no waving.
            </p>
          </div>

          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            <li
              className={`relative overflow-hidden rounded-3xl p-7 transition duration-300 hover:-translate-y-2 md:-rotate-2 ${accentInk}`}
              style={{
                background: `linear-gradient(160deg, ${color.hex}, color-mix(in srgb, ${color.hex} 65%, #000))`,
              }}
            >
              <Rings className="absolute -bottom-16 -right-16 w-56 opacity-30" />
              <span className="relative text-7xl font-black leading-none tracking-tighter">
                01
              </span>
              <h3 className="relative mt-16 text-2xl font-bold tracking-tight">
                Enjoy the meal
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed opacity-80">
                Upright, the lamp glows quietly in your venue’s colour. Guests
                have nothing to do.
              </p>
            </li>

            <li
              className="stripes relative overflow-hidden rounded-3xl p-7 text-white transition duration-300 hover:-translate-y-2 md:mt-10 md:rotate-1"
              style={{ backgroundColor: FLIPPED_COLOR.hex }}
            >
              <Rings className="absolute -right-16 -top-16 w-56 opacity-30" />
              <span className="relative text-7xl font-black leading-none tracking-tighter">
                02
              </span>
              <h3 className="relative mt-16 text-2xl font-bold tracking-tight">
                Finished? Flip it
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed opacity-90">
                Turned upside down, it glows red — a clear, silent signal that
                the table is ready for the waiter.
              </p>
            </li>

            <li className="relative overflow-hidden rounded-3xl border border-line bg-white p-7 transition duration-300 hover:-translate-y-2 md:-rotate-1">
              <DotGrid className="absolute -bottom-4 -right-4 h-32 w-40 text-ink/20" />
              <span className="relative text-7xl font-black leading-none tracking-tighter">
                03
              </span>
              <h3 className="relative mt-16 text-2xl font-bold tracking-tight">
                Staff reset it
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-mute">
                After clearing the table, the waiter stands the lamp back up.
                Ready for the next guests.
              </p>
              <span
                aria-hidden="true"
                className="absolute right-6 top-6 size-5 rounded-full"
                style={{ backgroundColor: color.hex }}
              />
            </li>
          </ol>
        </Container>
      </section>

      {/* ANATOMY */}
      <section
        className="relative overflow-hidden py-24"
        aria-labelledby="anatomy"
      >
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-sm rounded-[2rem] border border-line bg-white/60 p-6">
              <Crosshair className="absolute left-4 top-4 text-ink/30" />
              <Crosshair className="absolute right-4 top-4 text-ink/30" />
              <svg
                viewBox="0 0 300 500"
                className="w-full"
                role="img"
                aria-label="Diagram of the lamp with five numbered parts"
              >
                <defs>
                  <linearGradient id="anat-glass" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0"
                      style={{
                        stopColor: `color-mix(in srgb, ${color.hex} 45%, white)`,
                      }}
                    />
                    <stop offset="1" style={{ stopColor: color.hex }} />
                  </linearGradient>
                </defs>
                <ellipse
                  cx="150"
                  cy="462"
                  rx="120"
                  ry="16"
                  fill={color.hex}
                  opacity=".25"
                />
                <rect
                  x="82"
                  y="150"
                  width="136"
                  height="190"
                  fill="url(#anat-glass)"
                />
                <ellipse cx="150" cy="336" rx="64" ry="12" fill={color.hex} />
                <path
                  d="M80 345 A70 14 0 0 0 220 345 V440 A70 14 0 0 1 80 440 Z"
                  fill="#1a1a1d"
                />
                <path
                  d="M80 60 V150 A70 14 0 0 0 220 150 V60 Z"
                  fill="#1a1a1d"
                />
                <ellipse cx="150" cy="60" rx="70" ry="14" fill="#26262a" />
                <ellipse
                  cx="150"
                  cy="60"
                  rx="58"
                  ry="11"
                  fill="none"
                  stroke={color.hex}
                  strokeWidth="3"
                />
                <ellipse cx="150" cy="58" rx="50" ry="9" fill="#55565a" />
                {[
                  { n: 1, x: 262, y: 34, fx: 195, fy: 52 },
                  { n: 2, x: 276, y: 78, fx: 205, fy: 66 },
                  { n: 3, x: 262, y: 250, fx: 218, fy: 250 },
                  { n: 4, x: 276, y: 336, fx: 205, fy: 336 },
                  { n: 5, x: 262, y: 410, fx: 220, fy: 410 },
                ].map((m) => (
                  <g key={m.n}>
                    <line
                      x1={m.fx}
                      y1={m.fy}
                      x2={m.x - 12}
                      y2={m.y}
                      style={{ stroke: "var(--color-ink)" }}
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                    <circle
                      cx={m.x}
                      cy={m.y}
                      r="12"
                      style={{ fill: "var(--color-ink)" }}
                    />
                    <text
                      x={m.x}
                      y={m.y + 4.5}
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="800"
                      style={{ fill: "var(--color-paper)" }}
                    >
                      {m.n}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            <Seal
              text="ANATOMY OF A LAMP • "
              color={color.hex}
              className="absolute -bottom-8 -left-4 size-24 -rotate-12 drop-shadow-lg sm:-left-8 sm:size-28"
            />
          </div>

          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mute">
              Nº 03 — Anatomy
            </p>
            <h2
              id="anatomy"
              className="mt-4 text-5xl font-black leading-[0.92] tracking-tighter sm:text-6xl"
            >
              Five parts. One signal.
            </h2>
            <ol className="mt-10 divide-y divide-line border-y border-line">
              {ANATOMY.map(([name, body], i) => (
                <li
                  key={name}
                  className="grid grid-cols-[3rem_1fr] items-start gap-4 py-5 sm:grid-cols-[3rem_11rem_1fr]"
                >
                  <span className="grid size-10 place-items-center rounded-full bg-ink text-sm font-bold text-paper">
                    {i + 1}
                  </span>
                  <span className="text-xl font-bold tracking-tight">
                    {name}
                  </span>
                  <span className="col-start-2 text-mute sm:col-start-3">
                    {body}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* STATEMENT BANNER */}
      <section className="py-24" aria-label="Statement">
        <Container>
          <div className="relative">
            <div
              className="stripes relative overflow-hidden rounded-[2rem] p-8 sm:p-14 lg:p-20"
              style={{
                background: `linear-gradient(135deg, color-mix(in srgb, ${color.hex} 55%, var(--color-paper)), color-mix(in srgb, ${color.hex} 18%, var(--color-paper)))`,
              }}
            >
              <Rings className="pointer-events-none absolute -left-24 -top-24 w-[26rem] text-ink/15" />
              <Crosshair className="absolute right-8 top-8 text-ink/40" />
              <Crosshair className="absolute bottom-8 left-8 text-ink/40" />
              <p className="relative max-w-4xl text-4xl font-black leading-[1.02] tracking-tighter sm:text-6xl lg:text-7xl">
                While they dine, it{" "}
                <span
                  className="inline-block -rotate-2 rounded-full px-5 text-night"
                  style={{ backgroundColor: color.hex }}
                >
                  glows
                </span>
                . When they’re done, it{" "}
                <span
                  className="inline-block rotate-1 rounded-full px-5 text-white"
                  style={{ backgroundColor: FLIPPED_COLOR.hex }}
                >
                  calls
                </span>
                .
              </p>
            </div>
            <Seal
              text="NO MORE WAVING • "
              color="#0e0e10"
              ink="#f3f2ee"
              className="absolute -bottom-10 right-6 size-28 rotate-12 drop-shadow-lg sm:right-16 sm:size-36"
            />
          </div>
        </Container>
      </section>

      {/* DETAILS — mixed-size grid */}
      <section className="pb-24" aria-label="Product details">
        <Container>
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-paper lg:col-span-5 lg:row-span-2 lg:min-h-[28rem]">
              <Rings className="absolute -bottom-24 -right-24 w-[26rem] text-white/15" />
              <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                Colours
              </p>
              <p
                className="relative mt-4 text-[9rem] font-black leading-none tracking-tighter sm:text-[11rem]"
                style={{ color: shown.hex }}
              >
                {LAMP_COLORS.length}
              </p>
              <p className="relative text-2xl font-bold tracking-tight">
                upright colours to match your venue.
              </p>
              <div className="relative mt-8 flex flex-wrap gap-2">
                {LAMP_COLORS.map((c) => (
                  <span
                    key={c.id}
                    className="size-7 rounded-full"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-ink p-8 lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mute">
                The only switch
              </p>
              <p className="mt-4 text-8xl font-black leading-none tracking-tighter [-webkit-text-stroke:2px_var(--color-ink)] text-transparent">
                180°
              </p>
              <p className="mt-3 font-semibold">
                Flip it. That’s how a guest calls you.
              </p>
            </div>

            <div
              className="stripes relative overflow-hidden rounded-[2rem] p-8 text-white lg:col-span-3"
              style={{ backgroundColor: FLIPPED_COLOR.hex }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Upside down
              </p>
              <p className="mt-4 text-8xl font-black leading-none tracking-tighter">
                1
              </p>
              <p className="mt-3 font-semibold">
                signal: red. Come to my table.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white/70 p-8 lg:col-span-4">
              <DotGrid className="absolute -right-6 -top-6 h-36 w-44 text-ink/20" />
              <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-mute">
                Apps &amp; buttons
              </p>
              <p className="relative mt-4 text-8xl font-black leading-none tracking-tighter">
                0
              </p>
              <p className="relative mt-3 font-semibold">
                Nothing to install. Nothing to press.
              </p>
            </div>

            <div
              className="relative grid place-items-center overflow-hidden rounded-[2rem] p-8 lg:col-span-3"
              style={{
                background: `linear-gradient(150deg, ${shown.hex}, color-mix(in srgb, ${shown.hex} 55%, #000))`,
              }}
            >
              <Seal
                text="EXCUSE ME • EXCUSE ME • "
                color="#0e0e10"
                ink="#f3f2ee"
                className="size-36"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* WHERE IT WORKS */}
      <section className="relative pb-28" aria-labelledby="venues">
        <Container className="mb-12">
          <Marquee
            words={["Restaurant", "Café", "Bar", "Hotel", "Terrace"]}
            dotColor={color.hex}
            className="text-6xl font-black uppercase tracking-tighter text-transparent [-webkit-text-stroke:1px_var(--color-ink)] sm:text-8xl"
          />
        </Container>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2
              id="venues"
              className="text-4xl font-extrabold tracking-tight sm:text-6xl"
            >
              Where it works
            </h2>
            <p className="max-w-xs text-sm text-mute">
              Anywhere a guest would otherwise have to wave.
            </p>
          </div>
          <ul className="mt-12 grid gap-5 lg:grid-cols-12">
            {VENUES.map((r, i) => (
              <li
                key={r.name}
                className={`relative flex flex-col justify-between overflow-hidden rounded-[2rem] p-7 text-ink transition duration-300 hover:-translate-y-2 hover:rotate-0 ${r.span} ${r.rot} ${r.h}`}
                style={{
                  background: `linear-gradient(150deg, color-mix(in srgb, ${color.hex} ${r.mix}%, var(--color-paper))), color-mix(in srgb, ${color.hex} ${Math.min(100, r.mix + 25)}%, var(--color-paper)))`,
                }}
              >
                <span
                  className="stripes pointer-events-none absolute inset-0"
                  aria-hidden="true"
                />
                <Rings
                  className={`pointer-events-none absolute w-56 text-ink/20 ${i % 2 ? "-bottom-20 -left-20" : "-right-20 -top-20"}`}
                />
                <span className="relative grid size-10 place-items-center rounded-full border border-ink text-sm font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative mt-12">
                  <h3 className="text-4xl font-black tracking-tighter">
                    {r.name}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm font-medium">{r.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* WHAT RED MEANS */}
      <section
        className="relative overflow-hidden pb-28"
        aria-labelledby="says"
      >
        <Container>
          <h2
            id="says"
            className="text-4xl font-extrabold tracking-tight sm:text-6xl"
          >
            What a red lamp means
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {QUOTES.map((q) => (
              <li
                key={q.text}
                className={`relative rounded-[1.75rem] rounded-bl-md p-7 text-2xl font-black leading-tight tracking-tighter shadow-lg transition duration-300 hover:-translate-y-2 hover:rotate-0 ${q.rot} ${q.mt}`}
                style={{
                  backgroundColor: q.bg === "accent" ? color.hex : q.bg,
                  color: q.fg,
                }}
              >
                {q.text}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-3 left-4 size-4 rounded-full"
                  style={{
                    backgroundColor: q.bg === "accent" ? color.hex : q.bg,
                  }}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FAQ */}
      <section className="pb-28" aria-labelledby="faq">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="relative lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mute">
              Nº 04 — Questions
            </p>
            <h2
              id="faq"
              className="mt-4 text-5xl font-black leading-[0.92] tracking-tighter sm:text-6xl"
            >
              Excuse me, but…
            </h2>
            <DotGrid className="mt-10 h-28 w-52 text-ink/25" />
          </div>
          <div className="grid gap-3 lg:col-span-8">
            {FAQ.map(([q, a]) => (
              <details
                key={q}
                className="group rounded-3xl border border-line bg-white/60 px-6 py-5 transition open:bg-white open:shadow-lg"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold tracking-tight [&::-webkit-details-marker]:hidden">
                  {q}
                  <span
                    aria-hidden="true"
                    className="grid size-9 shrink-0 place-items-center rounded-full border border-ink text-xl leading-none transition duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-paper"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-xl text-mute">{a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <Container>
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-paper sm:p-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(50% 80% at 85% 20%, color-mix(in srgb, ${shown.hex} 35%, transparent), transparent)`,
                }}
              />
              <Rings className="pointer-events-none absolute -right-24 top-1/2 w-[34rem] -translate-y-1/2 text-white/10" />
              <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
                <h2 className="max-w-xl text-4xl font-black leading-none tracking-tighter sm:text-6xl">
                  Give every table a voice.
                </h2>
                <ButtonLink to="/order" variant="light" size="lg">
                  Order for your venue →
                </ButtonLink>
              </div>
            </div>
            <Seal
              text="ORDER NOW • ORDER NOW • ORDER NOW • "
              color={shown.hex}
              className="absolute -top-10 right-6 size-24 rotate-12 drop-shadow-lg sm:right-14 sm:size-32"
            />
            <Seal
              text="EXCUSE ME • EXCUSE ME • "
              color="#f3f2ee"
              className="absolute -bottom-8 left-8 hidden size-24 -rotate-12 drop-shadow-lg sm:block"
            />
          </div>
        </Container>
      </section>
    </div>
  );
}
