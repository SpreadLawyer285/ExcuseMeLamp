import { Link, type LinkProps } from "react-router";
import type { ButtonHTMLAttributes } from "react";

type Variant = "solid" | "outline" | "light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition duration-300 ease-out active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none";
const variants: Record<Variant, string> = {
  solid:
    "bg-ink text-paper hover:opacity-90 hover:-translate-y-0.5 hover:shadow-xl",
  outline: "border border-ink/80 text-ink hover:bg-ink hover:text-paper",
  light: "bg-white/10 text-white backdrop-blur hover:bg-white/20",
};
const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-8 text-base",
};
const cls = (v: Variant, s: Size, extra = "") =>
  `${base} ${variants[v]} ${sizes[s]} ${extra}`;

type Shared = { variant?: Variant; size?: Size };

export function Button({
  variant = "solid",
  size = "md",
  className,
  ...rest
}: Shared & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...rest} className={cls(variant, size, className)} />;
}

export function ButtonLink({
  variant = "solid",
  size = "md",
  className,
  ...rest
}: Shared & LinkProps) {
  return <Link {...rest} className={cls(variant, size, className)} />;
}
