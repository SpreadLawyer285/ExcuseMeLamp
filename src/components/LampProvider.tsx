import { useMemo, useState, type ReactNode } from 'react'
import { LAMP_COLORS, type LampColor } from '../lib/lamp'
import { LampContext } from '../lib/lampContext'

export default function LampProvider({ children }: { children: ReactNode }) {
  const [color, setColor] = useState<LampColor>(LAMP_COLORS[0])
  const value = useMemo(() => ({ color, setColor }), [color])
  return <LampContext.Provider value={value}>{children}</LampContext.Provider>
}
