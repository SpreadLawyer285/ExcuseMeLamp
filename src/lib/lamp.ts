export type LampColor = { id: string; name: string; hex: string }

/** Upright glow colours */
export const LAMP_COLORS: LampColor[] = [
  { id: 'yellow', name: 'Yellow', hex: '#ffd21f' },
  { id: 'purple', name: 'Purple', hex: '#8b5cf6' },
  { id: 'green', name: 'Green', hex: '#22c55e' },
  { id: 'blue', name: 'Blue', hex: '#3b82f6' },
  { id: 'orange', name: 'Orange', hex: '#ff8a1f' },
]

/** Shown whenever the lamp is upside down */
export const FLIPPED_COLOR: LampColor = { id: 'red', name: 'Red', hex: '#ff2d2d' }

/** PLACEHOLDER product data — edit freely. */
export const PRODUCT = {
  name: 'Excuse Me Lamp',
  price: 89,
  currency: 'EUR',
  maxQuantity: 10,
}

export const formatPrice = (n: number) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: PRODUCT.currency }).format(n)
