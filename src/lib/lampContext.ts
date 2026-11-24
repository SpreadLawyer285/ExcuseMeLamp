import { createContext } from 'react'
import type { LampColor } from './lamp'

export type LampCtx = { color: LampColor; setColor: (c: LampColor) => void }
export const LampContext = createContext<LampCtx | null>(null)
