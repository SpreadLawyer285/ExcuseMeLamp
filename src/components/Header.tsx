import { Link, NavLink } from "react-router";
import { ButtonLink } from "./Button";
import ThemeSwitch from "./ThemeSwitch";

const link = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${isActive ? "bg-ink/10 text-ink" : "text-mute hover:text-ink"}`;

export default function Header() {
  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-8">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-line bg-paper/80 py-2 pl-5 pr-2 backdrop-blur-md">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-[15px] font-extrabold tracking-tight"
        >
          <span aria-hidden="true" className="size-3.5 rounded-full bg-ink" />
          <span className="max-sm:sr-only">Excuse Me Lamp</span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1">
          <NavLink to="/" end className={link}>
            Lamp
          </NavLink>
          <NavLink to="/order" className={link}>
            Order
          </NavLink>
          <ThemeSwitch />
          <ButtonLink to="/order" className="hidden sm:inline-flex">
            Order now
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
