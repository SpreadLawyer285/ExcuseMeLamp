import { useState } from 'react'
import Container from '../components/Container'
import { Button } from '../components/Button'
import { Crosshair, DotGrid, Rings, Seal, TickRule } from '../components/Decor'
import LampViewer from '../components/LampViewer'
import Stepper from '../components/Stepper'
import StatusChip from '../components/StatusChip'
import { FLIPPED_COLOR, LAMP_COLORS, PRODUCT, formatPrice } from '../lib/lamp'
import { useLamp } from '../lib/useLamp'

const DETAILS = [
  ['Upright', 'Glows yellow, purple, green, blue or orange — your pick.'],
  ['Upside down', 'Always red, whichever colour you chose.'],
  ['Design', 'Dark cylindrical body with a luminous glass band.'],
  ['Controls', 'None. Orientation is the only switch.'],
] as const

type Qtys = Record<string, number>
const initialQtys = (): Qtys => ({ [LAMP_COLORS[0].id]: 1 })

export default function Order() {
  const { color, setColor } = useLamp()
  const [qtys, setQtys] = useState<Qtys>(initialQtys)
  const [upsideDown, setUpsideDown] = useState(false)
  const [done, setDone] = useState(false)
  const shown = upsideDown ? FLIPPED_COLOR : color

  const lines = LAMP_COLORS.filter((c) => (qtys[c.id] ?? 0) > 0).map((c) => ({ color: c, qty: qtys[c.id] }))
  const count = lines.reduce((n, l) => n + l.qty, 0)
  const total = count * PRODUCT.price

  const setQty = (id: string, n: number) => setQtys((q) => ({ ...q, [id]: n }))
  const reset = () => { setQtys(initialQtys()); setDone(false) }

  return (
    <div className="page-enter overflow-x-clip">
      <Container className="pb-24 pt-8 lg:pt-14">
        <div className="relative">
          <DotGrid className="pointer-events-none absolute -left-4 -top-6 h-40 w-60 text-ink/25" />
          <div className="relative flex items-center gap-4 text-mute">
            <span aria-hidden="true" className="h-px w-12 bg-ink" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Nº 02 — Order</p>
          </div>
          <h1 className="relative mt-4 text-[clamp(3rem,8vw,6.5rem)] font-black leading-[0.9] tracking-tighter">Order yours.</h1>
          <Seal
            text="MADE TO ORDER • MADE TO ORDER • "
            color={shown.hex}
            className="absolute right-0 top-0 hidden size-32 drop-shadow-lg sm:block lg:size-40"
          />
        </div>
        <TickRule className="mt-10 text-ink/40" />

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <form
            id="order-form"
            className="flex flex-col gap-12 lg:col-span-7"
            onSubmit={(e) => { e.preventDefault(); if (count > 0) setDone(true) }}
          >
            <fieldset>
              <legend className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-mute">1 — Choose your colours</legend>
              <p className="mb-4 text-sm text-mute">Mix as many as you like. Tap a colour name to preview it on the lamp.</p>
              <ul className="grid gap-3">
                {LAMP_COLORS.map((c) => {
                  const qty = qtys[c.id] ?? 0
                  const previewing = color.id === c.id
                  return (
                    <li
                      key={c.id}
                      className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-3 pr-4 transition duration-300 ${
                        qty > 0 ? 'border-ink bg-white shadow-md' : 'border-line bg-white/60'
                      }`}
                    >
                      <button
                        type="button"
                        aria-pressed={previewing}
                        onClick={() => setColor(c)}
                        className="flex items-center gap-3 rounded-full py-1 pl-1 pr-3 text-left transition hover:bg-ink/5"
                      >
                        <span
                          aria-hidden="true"
                          className={`size-11 shrink-0 rounded-full border border-black/10 transition ${previewing ? 'ring-2 ring-ink ring-offset-2 ring-offset-white' : ''}`}
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>
                          <span className="block font-semibold">{c.name}</span>
                          <span className="block text-xs text-mute">{previewing ? 'Previewing' : 'Preview'} · {formatPrice(PRODUCT.price)}</span>
                        </span>
                      </button>
                      <Stepper
                        label={`${c.name} quantity`}
                        value={qty}
                        min={0}
                        max={PRODUCT.maxQuantity}
                        onChange={(n) => { setQty(c.id, n); if (n > qty) setColor(c) }}
                      />
                    </li>
                  )
                })}
              </ul>
            </fieldset>

            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-mute">2 — Product details</h2>
              <dl className="divide-y divide-line border-y border-line">
                {DETAILS.map(([k, v]) => (
                  <div key={k} className="grid gap-1 py-4 sm:grid-cols-3">
                    <dt className="flex items-center gap-2 font-semibold">
                      <span aria-hidden="true" className="size-2.5 rounded-full border border-ink" />
                      {k}
                    </dt>
                    <dd className="text-mute sm:col-span-2">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:hidden">
              <OrderBar lines={lines} count={count} total={total} done={done} onReset={reset} />
            </div>
          </form>

          <aside className="lg:col-span-5">
            <div className="flex flex-col gap-4 lg:sticky lg:top-24">
              <div className="relative overflow-hidden rounded-[2rem] bg-ink">
                <Rings className="pointer-events-none absolute left-1/2 top-1/2 w-[130%] -translate-x-1/2 -translate-y-1/2 text-white/10" />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 transition-[background] duration-700"
                  style={{ background: `radial-gradient(60% 50% at 50% 55%, ${shown.hex}33, transparent 70%)` }}
                />
                <Crosshair className="pointer-events-none absolute right-4 top-4 text-white/30" />
                <Crosshair className="pointer-events-none absolute bottom-4 left-4 text-white/20" />
                <Crosshair className="pointer-events-none absolute bottom-4 right-4 text-white/20" />
                <LampViewer color={color} onFlipChange={setUpsideDown} className="h-[380px] sm:h-[440px]" label="Preview of your lamp" />
                <div className="pointer-events-none absolute left-4 top-4"><StatusChip upsideDown={upsideDown} color={shown} /></div>
              </div>
              <div className="hidden lg:block">
                <OrderBar lines={lines} count={count} total={total} done={done} onReset={reset} />
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  )
}

type Line = { color: { id: string; name: string; hex: string }; qty: number }

function OrderBar({ lines, count, total, done, onReset }: { lines: Line[]; count: number; total: number; done: boolean; onReset: () => void }) {
  const summary = lines.map((l) => `${l.qty} × ${l.color.name}`).join(', ')
  return (
    <div className="rounded-3xl border border-line bg-white/60 p-6">
      <div aria-live="polite">
        {done ? (
          <div className="flex items-start gap-5">
            <Seal text="THANK YOU • THANK YOU • THANK YOU • " color="#ffd21f" className="size-20 shrink-0" />
            <div>
              <p className="text-2xl font-extrabold tracking-tight">Thank you. Excuse us — it’s a demo.</p>
              <p className="mt-2 text-sm text-mute">{summary} noted. No payment was taken; connect your checkout to make this live.</p>
              <Button type="button" variant="outline" className="mt-5" onClick={onReset}>Order another</Button>
            </div>
          </div>
        ) : (
          <>
            {lines.length > 0 ? (
              <ul className="divide-y divide-line border-b border-line">
                {lines.map((l) => (
                  <li key={l.color.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                    <span className="flex items-center gap-2.5 font-medium">
                      <span aria-hidden="true" className="size-4 rounded-full border border-black/10" style={{ backgroundColor: l.color.hex }} />
                      {l.qty} × {l.color.name}
                    </span>
                    <span className="tabular-nums text-mute">{formatPrice(l.qty * PRODUCT.price)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="border-b border-line pb-4 text-sm text-mute">Add at least one lamp to place an order.</p>
            )}
            <div className="mt-4 flex items-end justify-between gap-4">
              <p className="text-sm text-mute">{count} {count === 1 ? 'lamp' : 'lamps'} · {formatPrice(PRODUCT.price)} each</p>
              <p className="text-3xl font-black tracking-tighter tabular-nums">{formatPrice(total)}</p>
            </div>
            <Button type="submit" form="order-form" size="lg" className="mt-5 w-full" disabled={count === 0}>Place order</Button>
          </>
        )}
      </div>
    </div>
  )
}