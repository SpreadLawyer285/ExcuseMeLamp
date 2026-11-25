import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark' | 'inverted'
const KEY = 'excuseme-theme'
const listeners = new Set<() => void>()

const isTheme = (v: unknown): v is Theme => v === 'light' || v === 'dark' || v === 'inverted'

function read(): Theme {
  try {
    const saved = localStorage.getItem(KEY)
    if (isTheme(saved)) return saved
  } catch { /* storage unavailable */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

let current: Theme = typeof window === 'undefined' ? 'light' : read()
if (typeof window !== 'undefined') document.documentElement.dataset.theme = current

function setTheme(t: Theme) {
  current = t
  document.documentElement.dataset.theme = t
  try { localStorage.setItem(KEY, t) } catch { /* ignore */ }
  listeners.forEach((l) => l())
}

export function useTheme() {
  const theme = useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => { listeners.delete(cb) } },
    () => current,
    () => 'light' as Theme,
  )
  return { theme, setTheme }
}