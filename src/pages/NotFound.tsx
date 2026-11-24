import Container from '../components/Container'
import { ButtonLink } from '../components/Button'

export default function NotFound() {
  return (
    <Container className="page-enter py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mute">404</p>
      <h1 className="mt-4 text-7xl font-black tracking-tighter">Excuse me?</h1>
      <p className="mt-4 text-mute">That page doesn’t exist.</p>
      <ButtonLink to="/" className="mt-8">Back to the lamp</ButtonLink>
    </Container>
  )
}
