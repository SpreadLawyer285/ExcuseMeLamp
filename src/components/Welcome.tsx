import { useEffect, useState, type CSSProperties } from 'react'
import { Button } from './Button'

type Phase = 'in' | 'red' | 'flood' | 'out'
const TEXT = 'Excuse me!'

/** "Excuse me!" pops in front of a yellow circle that turns red, floods to page colour, then fades away. */
export default function Welcome({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('in')
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const t: number[] = []
    if (phase === 'in') t.push(window.setTimeout(() => setPhase('red'), reduce ? 300 : 1300))
    if (phase === 'red') t.push(window.setTimeout(() => setPhase('flood'), reduce ? 600 : 1200))
    if (phase === 'flood') t.push(window.setTimeout(() => setPhase('out'), reduce ? 50 : 900))
    if (phase === 'out') t.push(window.setTimeout(onDone, 450))
    return () => t.forEach(clearTimeout)
  }, [phase, reduce, onDone])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPhase((p) => (p === 'in' || p === 'red' ? 'flood' : p))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="welcome" data-phase={phase} role="dialog" aria-modal="true" aria-label="Welcome">
      <div className="welcome__circle" aria-hidden="true" />
      <h1 className="welcome__text" aria-label={TEXT}>
        {[...TEXT].map((ch, i) => (
          <span key={i} style={{ '--i': i } as CSSProperties}>{ch}</span>
        ))}
      </h1>
      <Button variant="light" className="welcome__skip" onClick={() => setPhase('flood')} autoFocus>
        Skip
      </Button>
    </div>
  )
}