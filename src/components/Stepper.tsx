type Props = { value: number; min?: number; max: number; onChange: (n: number) => void; label: string }

export default function Stepper({ value, min = 1, max, onChange, label }: Props) {
  const btn =
    'grid size-12 place-items-center rounded-full border border-line bg-white/60 text-xl font-semibold transition hover:bg-ink hover:text-paper active:scale-95 disabled:pointer-events-none disabled:opacity-30'
  return (
    <div role="group" aria-label={label} className="flex items-center gap-4">
      <button type="button" className={btn} aria-label="Decrease quantity" disabled={value <= min} onClick={() => onChange(value - 1)}>−</button>
      <output aria-live="polite" className="min-w-10 text-center text-3xl font-extrabold tabular-nums tracking-tight">{value}</output>
      <button type="button" className={btn} aria-label="Increase quantity" disabled={value >= max} onClick={() => onChange(value + 1)}>+</button>
    </div>
  )
}
