import { useId } from 'react'

/** Rotating circular-text badge. `color` is the disc colour. */
export function Seal({
  text = 'EXCUSE ME • EXCUSE ME • EXCUSE ME • ',
  color = '#ffd21f',
  ink = '#0e0e10',
  className = '',
}: { text?: string; color?: string; ink?: string; className?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <circle cx="100" cy="100" r="98" fill={color} style={{ transition: 'fill .5s ease' }} />
      <circle cx="100" cy="100" r="92" fill="none" stroke={ink} strokeWidth="1" />
      <circle cx="100" cy="100" r="50" fill="none" stroke={ink} strokeWidth="1" />
      <defs>
        <path id={id} d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0" />
      </defs>
      <g className="spin-slow" style={{ transformOrigin: '100px 100px' }}>
        <text fontSize="14.5" fontWeight="800" letterSpacing="3" fill={ink}>
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </g>
      <circle cx="100" cy="100" r="30" fill={ink} />
      <path d="M86 100h28m-10-10 10 10-10 10" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Concentric circles with a hairline crosshair. Colour via text-* classes. */
export function Rings({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1">
      {[196, 160, 124, 88, 52].map((r, i) => (
        <circle key={r} cx="200" cy="200" r={r} strokeDasharray={i === 1 ? '2 6' : undefined} />
      ))}
      <path d="M200 0v400M0 200h400" strokeOpacity=".5" />
    </svg>
  )
}

/** Registration mark. */
export function Crosshair({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`size-6 ${className}`} fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="12" cy="12" r="6" />
      <path d="M12 0v24M0 12h24" />
    </svg>
  )
}

/** Ruler-style tick line. Colour via text-* classes. */
export function TickRule({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`ticks h-[14px] w-full ${className}`} />
}

/** Faint dot grid. Colour via text-* classes. */
export function DotGrid({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`dots ${className}`} />
}

/** Endless scrolling band of words separated by dots. */
export function Marquee({ words, dotColor = 'currentColor', className = '' }: { words: string[]; dotColor?: string; className?: string }) {
  const row = (k: number) => (
    <ul key={k} className="flex shrink-0 items-center gap-8 pr-8">
      {words.map((w, i) => (
        <li key={i} className="flex items-center gap-8 whitespace-nowrap">
          {w}
          <span className="size-3 rounded-full transition-colors duration-500" style={{ backgroundColor: dotColor }} />
        </li>
      ))}
    </ul>
  )
  return (
    <div aria-hidden="true" className={`overflow-hidden ${className}`}>
      <div className="marquee flex w-max">{row(0)}{row(1)}</div>
    </div>
  )
}