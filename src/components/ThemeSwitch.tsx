import type { ReactNode } from "react";
import { useTheme, type Theme } from "../lib/theme";

const icon = (children: ReactNode) => (
  <svg
    viewBox="0 0 24 24"
    className="size-[18px]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const OPTIONS: { id: Theme; label: string; icon: ReactNode }[] = [
  {
    id: "light",
    label: "Light mode",
    icon: icon(
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>,
    ),
  },
  {
    id: "dark",
    label: "Dark mode",
    icon: icon(<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />),
  },
  {
    id: "inverted",
    label: "Inverted colours",
    icon: icon(
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
      </>,
    ),
  },
];

/** Native radios → arrow keys and screen readers work without extra code. */
export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <fieldset className="mx-1 flex min-w-0 items-center rounded-full border border-line p-0.5">
      <legend className="sr-only">Colour mode</legend>
      {OPTIONS.map((o) => (
        <label key={o.id} className="cursor-pointer" title={o.label}>
          <input
            type="radio"
            name="theme"
            value={o.id}
            checked={theme === o.id}
            onChange={() => setTheme(o.id)}
            className="peer sr-only"
          />
          <span className="grid size-8 place-items-center rounded-full text-mute transition duration-300 hover:text-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2">
            {o.icon}
            <span className="sr-only">{o.label}</span>
          </span>
        </label>
      ))}
    </fieldset>
  );
}
