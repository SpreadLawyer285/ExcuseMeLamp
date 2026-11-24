import { Link } from 'react-router'
import Container from './Container'

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col justify-between gap-4 text-sm text-mute sm:flex-row">
        <p className="font-semibold text-ink">Excuse Me Lamp</p>
        <p>Turn it over. It will tell you it’s sorry — in red.</p>
        <Link to="/order" className="font-medium text-ink underline underline-offset-4">Order</Link>
      </Container>
    </footer>
  )
}
