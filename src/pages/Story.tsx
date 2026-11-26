import { useState } from 'react'
import Container from '../components/Container'
import { ButtonLink } from '../components/Button'
import { Crosshair, DotGrid, Marquee, Rings, Seal, TickRule } from '../components/Decor'
import { FLIPPED_COLOR, LAMP_COLORS, PRODUCT, formatPrice } from '../lib/lamp'
import { useLamp } from '../lib/useLamp'

/** Set to false once every "draft" detail below has been confirmed with the client. */
const DRAFT = true

const PHOTOS = {
  upright: { src: '/ExcusemeLamp1.png', alt: 'The Excuse Me Lamp standing upright, glowing warm yellow', label: 'Upright — still enjoying' },
  flipped: { src: '/ExcusemeLamp.png', alt: 'The Excuse Me Lamp turned upside down, glowing red', label: 'Upside down — come over' },
} as const

const STEPS = [
  { t: 'The idea', b: 'Guests finish eating and then have to catch someone’s eye. One simple object should say it for them.', draft: false },
  { t: 'Modelled in 3D', b: 'The lamp was designed and modelled in 3D in Blender. The same model powers the interactive lamp on this site.', draft: false },
  { t: 'Prototype', b: 'First working units are built and checked on real tables, in real light, in real rooms.', draft: true },
  { t: 'Testing', b: 'Prototypes are used in a few venues to check that the red signal is spotted quickly and that staff reset it without thinking.', draft: true },
  { t: 'Production', b: 'Small production runs, checked unit by unit before they leave.', draft: true },
  { t: 'Delivery', b: 'Packed one per box and shipped to your door or your venue.', draft: true },
] as const

const FACTS = [
  ['Made in', 'Your country / workshop'],
  ['Body', 'Dark, weighty cylindrical body'],
  ['Glow', 'Luminous glass band with soft light'],
  ['Colours', `${LAMP_COLORS.length} upright, plus red upside down`],
  ['Lead time', '3–5 days for single orders'],
  ['Venue orders', 'Volume pricing on request'],
] as const

const STOCKISTS = [
  ['Partner café', 'Your city'],
  ['Partner restaurant', 'Your city'],
  ['Hotel & hospitality partner', 'Your region'],
] as const

export default function Story() {
  const { color } = useLamp()
  const [view, setView] = useState<keyof typeof PHOTOS>('upright')
  const accent = view === 'flipped' ? FLIPPED_COLOR.hex : color.hex

  return (
    <div className="page-enter overflow-x-clip">
      {/* HERO */}
      <Container className="grid items-center gap-10 pb-20 pt-8 lg:grid-cols-12 lg:gap-12 lg:pt-14">
        <div className="relative lg:col-span-6">
          <DotGrid className="pointer-events-none absolute -left-4 -top-6 h-40 w-60 text-ink/25" />
          <div className="relative flex items-center gap-4 text-mute">
            <span aria-hidden="true" className="h-px w-12 bg-ink" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Nº 05 — Story</p>
          </div>
          <h1 className="relative mt-6 text-[clamp(3.2rem,8vw,6.8rem)] font-black leading-[0.88] tracking-tighter">
            Made to be turned over<span style={{ color: accent }} className="transition-colors duration-500">.</span>
          </h1>
          <p className="relative mt-8 max-w-lg text-lg leading-relaxed text-mute">
            The Excuse Me Lamp began with a small, very human problem: finishing a meal and not being able to catch the waiter’s eye. Here is how the idea became an object, how it’s made, and where you can get one for your table or your venue.
          </p>
          <div className="relative mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/order" size="lg">Order — {formatPrice(PRODUCT.price)}</ButtonLink>
            <a href="#where" className="inline-flex h-14 items-center justify-center rounded-full border border-ink/80 px-8 text-base font-semibold tracking-tight transition duration-300 hover:bg-ink hover:text-paper">
              Where to get it
            </a>
          </div>
        </div>

        {/* two tilted photo frames */}
        <div className="relative mx-auto grid w-full max-w-xl grid-cols-2 gap-4 lg:col-span-6">
          {(['upright', 'flipped'] as const).map((k, i) => (
            <figure
              key={k}
              className={`relative overflow-hidden rounded-[2rem] bg-night text-day shadow-2xl ${i === 0 ? '-rotate-3' : 'mt-10 rotate-3'}`}
            >
              <img
                src={PHOTOS[k].src} alt={PHOTOS[k].alt} width={1920} height={1080}
                decoding="async" className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10 text-[11px] font-semibold uppercase tracking-[0.18em]">
                {PHOTOS[k].label}
              </figcaption>
            </figure>
          ))}
          <Seal
            text="STUDIO RENDERS • "
            color={accent}
            className="absolute -bottom-6 left-1/2 size-24 -translate-x-1/2 rotate-12 drop-shadow-lg sm:size-28"
          />
        </div>
      </Container>

      {/* BAND */}
      <Container className="pb-24">
        <Marquee
          words={['Designed', 'Modelled', 'Built', 'Shipped', 'Flipped']}
          dotColor={accent}
          className="-rotate-1 rounded-full bg-ink py-4 text-2xl font-black uppercase tracking-tighter text-paper sm:text-4xl"
        />
      </Container>

      {/* PHOTO STAGE: upright ⇄ upside down */}
      <section className="pb-28" aria-labelledby="two-states">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="two-states" className="text-4xl font-extrabold tracking-tight sm:text-6xl">One lamp. Two states.</h2>
            <fieldset className="flex rounded-full border border-line p-1">
              <legend className="sr-only">Lamp photo</legend>
              {(['upright', 'flipped'] as const).map((k) => (
                <label key={k} className="cursor-pointer">
                  <input type="radio" name="story-view" value={k} checked={view === k} onChange={() => setView(k)} className="peer sr-only" />
                  <span className="block rounded-full px-5 py-2.5 text-sm font-semibold text-mute transition duration-300 peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2">
                    {k === 'upright' ? 'Upright' : 'Upside down'}
                  </span>
                </label>
              ))}
            </fieldset>
          </div>

          <div className="relative mt-10 overflow-hidden rounded-[2rem] bg-night text-day">
            <Rings className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[110%] -translate-x-1/2 -translate-y-1/2 text-white/10" />
            {(['upright', 'flipped'] as const).map((k) => (
              <img
                key={k} src={PHOTOS[k].src} alt={view === k ? PHOTOS[k].alt : ''} aria-hidden={view !== k}
                width={1920} height={1080} loading="lazy" decoding="async"
                className={`${k === 'upright' ? 'relative' : 'absolute inset-0'} aspect-[4/3] w-full scale-[1.08] object-cover transition-opacity duration-700 sm:aspect-video ${view === k ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            <Crosshair className="absolute right-5 top-5 z-20 text-white/30" />
            <Crosshair className="absolute bottom-5 left-5 z-20 text-white/30" />
            <p role="status" className="absolute left-5 top-5 z-20 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/40 py-2 pl-3 pr-4 text-sm font-medium backdrop-blur">
              <span className="size-3 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}` }} aria-hidden="true" />
              {PHOTOS[view].label}
            </p>
          </div>
          <p className="mt-4 max-w-xl text-sm text-mute">
            Studio renders of the lamp. Upright it glows in the venue’s colour. Turned over, it’s always red — the signal that a table is ready for the waiter.
          </p>
        </Container>
      </section>

      {/* HOW IT'S MADE */}
      <section className="relative overflow-hidden border-y border-line py-24" aria-labelledby="making">
        <Rings className="pointer-events-none absolute -left-40 -top-28 w-[30rem] text-ink/10" />
        <Container className="relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mute">Nº 06 — The making of</p>
            <h2 id="making" className="mt-4 text-5xl font-black leading-[0.92] tracking-tighter sm:text-6xl">From idea to your table.</h2>
            {DRAFT && <p className="mt-6 inline-block rounded-full border border-dashed border-ink/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-mute">Draft — confirm steps</p>}
          </div>
          <ol className="relative lg:col-span-8">
            <span aria-hidden="true" className="absolute bottom-6 left-[1.4rem] top-6 w-px bg-line" />
            {STEPS.map((s, i) => (
              <li key={s.t} className="relative grid grid-cols-[3rem_1fr] gap-5 pb-8 last:pb-0">
                <span
                  className="relative z-10 grid size-11 place-items-center rounded-full text-sm font-bold text-night"
                  style={{ backgroundColor: i % 2 ? FLIPPED_COLOR.hex : color.hex, color: i % 2 ? '#fff' : undefined }}
                >
                  {i + 1}
                </span>
                <div className={`rounded-3xl border border-line bg-white/60 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg ${i % 2 ? 'sm:translate-x-4' : ''}`}>
                  <h3 className="flex flex-wrap items-center gap-3 text-xl font-bold tracking-tight">
                    {s.t}
                    {DRAFT && s.draft && <span className="rounded-full border border-dashed border-ink/50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-mute">Draft</span>}
                  </h3>
                  <p className="mt-2 text-mute">{s.b}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* DETAILS */}
      <section className="py-24" aria-labelledby="facts">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="facts" className="text-4xl font-extrabold tracking-tight sm:text-6xl">The details</h2>
            {DRAFT && <p className="rounded-full border border-dashed border-ink/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-mute">Draft — confirm before launch</p>}
          </div>
          <TickRule className="mt-8 text-ink/40" />
          <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FACTS.map(([k, v], i) => (
              <div
                key={k}
                className={`relative overflow-hidden rounded-3xl border border-line bg-white/60 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg ${i % 3 === 1 ? 'lg:translate-y-4' : ''}`}
              >
                <Rings className="pointer-events-none absolute -bottom-12 -right-12 w-36 text-ink/10" />
                <dt className="relative flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-mute">
                  <span aria-hidden="true" className="size-2.5 rounded-full" style={{ backgroundColor: LAMP_COLORS[(i * 2) % LAMP_COLORS.length].hex }} />
                  {k}
                </dt>
                <dd className="relative mt-6 text-xl font-bold leading-snug tracking-tight">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* WHERE TO GET IT */}
      <section id="where" className="relative scroll-mt-24 pb-28" aria-labelledby="where-h">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="where-h" className="text-4xl font-extrabold tracking-tight sm:text-6xl">Where to get it</h2>
            <p className="max-w-xs text-sm text-mute">Three ways to put a lamp on your table.</p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-12">
            {/* online */}
            <div
              className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] p-8 text-night lg:col-span-5 lg:-rotate-1"
              style={{ background: `linear-gradient(150deg, ${color.hex}, color-mix(in srgb, ${color.hex} 60%, #000))` }}
            >
              <span className="stripes-light pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
              <Rings className="pointer-events-none absolute -right-16 -top-16 w-56 opacity-30" />
              <span className="relative text-xs font-semibold uppercase tracking-[0.2em] opacity-70">01 — Online</span>
              <div className="relative mt-16">
                <h3 className="text-4xl font-black tracking-tighter">Order direct</h3>
                <p className="mt-3 max-w-xs font-medium">Pick your colours, set a quantity for each, and order in a minute. {formatPrice(PRODUCT.price)} per lamp.</p>
                <ButtonLink to="/order" className="mt-6">Go to the order page →</ButtonLink>
              </div>
            </div>

            {/* venues */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-ink p-8 text-paper lg:col-span-4 lg:mt-8 lg:rotate-1">
              <Rings className="pointer-events-none absolute -bottom-20 -right-20 w-72 text-white/10" />
              <span className="relative text-xs font-semibold uppercase tracking-[0.2em] opacity-60">02 — For venues</span>
              <div className="relative mt-16">
                <h3 className="text-4xl font-black tracking-tighter">Equip your tables</h3>
                <p className="mt-3 max-w-xs opacity-80">Restaurants, cafés, bars and hotels can ask for volume pricing and colour-coding by zone.</p>
                <a
                  href="mailto:venues@excusemelamp.example?subject=Venue%20enquiry"
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-white/10 px-5 text-sm font-semibold backdrop-blur transition hover:bg-white/20"
                >
                  Email us about your venue
                </a>
              </div>
            </div>

            {/* stockists */}
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white/60 p-8 lg:col-span-3 lg:-rotate-1">
              <DotGrid className="pointer-events-none absolute -right-6 -top-6 h-32 w-40 text-ink/20" />
              <span className="relative text-xs font-semibold uppercase tracking-[0.2em] text-mute">03 — In person</span>
              <h3 className="relative mt-8 text-3xl font-black tracking-tighter">Stockists</h3>
              {DRAFT && <p className="relative mt-2 inline-block rounded-full border border-dashed border-ink/50 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-mute">Draft list</p>}
              <ul className="relative mt-5 divide-y divide-line border-y border-line">
                {STOCKISTS.map(([n, c]) => (
                  <li key={n} className="py-3">
                    <p className="font-semibold leading-tight">{n}</p>
                    <p className="text-sm text-mute">{c}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* GALLERY */}
      <section className="pb-28" aria-label="Gallery">
        <Container className="grid gap-5 md:grid-cols-12">
          <figure className="relative overflow-hidden rounded-[2rem] bg-night text-day md:col-span-7 md:-rotate-1">
            <img src={PHOTOS.flipped.src} alt={PHOTOS.flipped.alt} width={1920} height={1080} loading="lazy" decoding="async" className="aspect-video w-full scale-110 object-cover" />
            <figcaption className="absolute left-5 top-5 rounded-full bg-black/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">Red means: come over</figcaption>
          </figure>
          <figure className="relative overflow-hidden rounded-[2rem] bg-night text-day md:col-span-5 md:mt-12 md:rotate-1">
            <img src={PHOTOS.upright.src} alt={PHOTOS.upright.alt} width={1920} height={1080} loading="lazy" decoding="async" className="aspect-[4/3] w-full scale-125 object-cover" />
            <figcaption className="absolute left-5 top-5 rounded-full bg-black/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">Glow means: all good</figcaption>
          </figure>
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
                style={{ background: `radial-gradient(50% 80% at 85% 20%, color-mix(in srgb, ${accent} 35%, transparent), transparent)` }}
              />
              <Rings className="pointer-events-none absolute -right-24 top-1/2 w-[34rem] -translate-y-1/2 text-white/10" />
              <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
                <h2 className="max-w-xl text-4xl font-black leading-none tracking-tighter sm:text-6xl">Ready to give every table a voice?</h2>
                <ButtonLink to="/order" variant="light" size="lg">Order for your venue →</ButtonLink>
              </div>
            </div>
            <Seal text="ORDER NOW • ORDER NOW • " color={accent} className="absolute -top-10 right-6 size-24 rotate-12 drop-shadow-lg sm:right-14 sm:size-32" />
          </div>
        </Container>
      </section>
    </div>
  )
}