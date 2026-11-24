import { useContext } from 'react'
import { LampContext } from './lampContext'

export function useLamp() {
  const ctx = useContext(LampContext)
  if (!ctx) throw new Error('useLamp must be used inside <LampProvider>')
  return ctx
}
