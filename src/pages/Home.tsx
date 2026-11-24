import { useState } from 'react'
import Container from '../components/Container'
import { Button, ButtonLink } from '../components/Button'
import ColorPicker from '../components/ColorPicker'
import { Crosshair, DotGrid, Marquee, Rings, Seal, TickRule } from '../components/Decor'
import LampViewer from '../components/LampViewer'
import StatusChip from '../components/StatusChip'
import { FLIPPED_COLOR, LAMP_COLORS, PRODUCT, formatPrice } from '../lib/lamp'
import { useLamp } from '../lib/useLamp'

const STEPS = [
  { n: '01', title: 'Stand it up', body: 'Upright, it glows in the colour you choose: yellow, purple, green, blue or orange.' },
  { n: '02', title: 'Turn it over', body: 'Flip it upside down and it blushes red — politely announcing that something is wrong.' },
  { n: '03', title: 'Set it right', body: 'Stand it back up and the glow returns to your colour. No buttons, no apps.' },
]

const FEATURES = [
  ['Form', 'A single dark cylinder. A glowing band of light, and nothing else.'],
  ['Colour', `${LAMP_COLORS.length} upright colours, 1 upside-down red.`],
  ['Interaction', 'The lamp reacts to orientation alone.'],
  ['Presence', 'Quiet by day, a soft pool of light by night.'],
] as const

const BAND = ['Excuse me', 'Turn it over', 'Now in red', 'Stand it up', 'Excuse me']

export default function Home() {
  const { color, setColor } = useLamp()
  const [upsideDown, setUpsideDown] = useState(false)
  const [flipTick, setFlipTick] = useState(0)
  const shown = upsideDown ? FLIPPED_COLOR : color

  return (
    <div className="page-enter overflow-x-clip">
      {/* HERO */}
      <Container className="grid gap-8 pb-16 pt-8 lg:grid-cols-12 lg:gap-10 lg:pt-14">
        <div className="relative flex flex-col justify-between gap-10 lg:col-span-5">
          <DotGrid className="pointer-events-none absolute -left-4 -top-6 h-44 w-64 text-ink/30" />
          <div className="relative">
            <div className="flex items-center gap-4 text-mute">
              <span aria-hidden="true" className="h-px w-12 bg-ink" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em]">Nº 01 — The lamp that reacts</p>
            </div>
            <h1 className="mt-6 text-[clamp(3.6rem,9vw,7.5rem)] font-black leading-[0.86] tracking-tighter">
              Excuse<br />me<span className="transition-colors duration-500" style={{ color: shown.hex }}>.</span>
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-mute">
              A lamp with manners. Upright it glows in the colour you pick. Turn it upside down and it turns red.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink to="/order" size="lg">Order — {formatPrice(PRODUCT.price)}</ButtonLink>
              <Button variant="outline" size="lg" onClick={() => setFlipTick((t) => t + 1)}>
                Flip the lamp
              </Button>
            </div>
          </div>
          <div className="relative">
            <ColorPicker name="home-color" legend="Upright colour" value={color} onChange={setColor} />
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink">
            <Rings className="pointer-events-none absolute left-1/2 top-1/2 w-[125%] -translate-x-1/2 -translate-y-1/2 text-white/10" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 transition-[background] duration-700"
              style={{ background: `radial-gradient(60% 50% at 50% 55%, ${shown.hex}33, transparent 70%)` }}
            />
            <Crosshair className="pointer-events-none absolute right-5 top-5 text-white/30 sm:right-7 sm:top-7" />
            <Crosshair className="pointer-events-none absolute bottom-24 left-5 text-white/20 sm:left-7" />
            <Crosshair className="pointer-events-none absolute bottom-24 right-5 text-white/20 sm:right-7" />

            <LampViewer color={color} onFlipChange={setUpsideDown} flipTick={flipTick} className="h-[500px] sm:h-[620px] lg:h-[700px]" />

            <div className="pointer-events-none absolute left-5 top-5 sm:left-7 sm:top-7">
              <StatusChip upsideDown={upsideDown} color={shown} />
            </div>
            <div className="pointer-events-none absolute inset-x-5 bottom-5 text-white/50 sm:inset-x-7 sm:bottom-7">
              <TickRule />
              <div className="mt-2 flex justify-between text-[11px] font-medium uppercase tracking-[0.18em]">
                <span>0° · Upright</span>
                <span className="hidden sm:inline">Drag · Arrows · F</span>
                <span>180° · Red</span>
              </div>
            </div>
          </div>
          <Seal color={shown.hex} className="absolute -right-3 -top-10 size-28 drop-shadow-lg sm:size-36 lg:-right-6" />
        </div>
      </Container>

      {/* BAND */}
      <Container className="pb-20">
        <Marquee
          words={BAND}
          dotColor={shown.hex}
          className="rounded-full bg-ink py-4 text-2xl font-black uppercase tracking-tighter text-paper sm:text-4xl"
        />
      </Container>

      {/* HOW IT BEHAVES */}
      <section className="relative overflow-hidden border-t border-line py-20" aria-labelledby="how">
        <Rings className="pointer-events-none absolute -right-32 -top-24 w-[28rem] text-ink/10" />
        <Container className="relative grid gap-10 lg:grid-cols-12">
          <h2 id="how" className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:col-span-4">How it behaves</h2>
          <ol className="grid gap-4 sm:grid-cols-3 lg:col-span-8">
            {STEPS.map((s) => (
              <li key={s.n} className="rounded-3xl border border-line bg-white/50 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <span className="grid size-11 place-items-center rounded-full border border-ink text-sm font-bold">{s.n}</span>
                <h3 className="mt-10 text-xl font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* DETAILS */}
      <section className="pb-20" aria-label="Product details">
        <Container>
          <dl className="grid divide-y divide-line border-y border-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {FEATURES.map(([k, v]) => (
              <div key={k} className="py-8 lg:px-6 lg:first:pl-0">
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-mute">
                  <span aria-hidden="true" className="size-2.5 rounded-full border border-ink" />
                  {k}
                </dt>
                <dd className="mt-3 text-lg font-semibold leading-snug tracking-tight">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <Container>
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-paper sm:p-14">
              <Rings className="pointer-events-none absolute -right-24 top-1/2 w-[34rem] -translate-y-1/2 text-white/10" />
              <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
                <h2 className="max-w-xl text-4xl font-black leading-none tracking-tighter sm:text-6xl">Make room for one that apologises.</h2>
                <ButtonLink to="/order" variant="light" size="lg">Choose your colour →</ButtonLink>
              </div>
            </div>
            <Seal
              text="ORDER NOW • ORDER NOW • ORDER NOW • "
              color={shown.hex}
              className="absolute -top-10 right-6 size-24 drop-shadow-lg sm:right-14 sm:size-32"
            />
          </div>
        </Container>
      </section>
    </div>
  )
}