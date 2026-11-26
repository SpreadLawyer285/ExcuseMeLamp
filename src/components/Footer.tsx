import { Link } from 'react-router'
import Container from './Container'

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col justify-between gap-4 text-sm text-mute sm:flex-row">
        <p className="font-semibold text-ink">Excuse Me Lamp</p>
        <p>Finished? Turn it over. Your waiter takes it from there.</p>
        <nav aria-label="Footer" className="flex gap-5 font-medium text-ink">
          <Link to="/story" className="underline underline-offset-4">Story</Link>
          <Link to="/order" className="underline underline-offset-4">Order</Link>
        </nav>
      </Container>
    </footer>
  )
}