import { LAMP_COLORS, type LampColor } from "../lib/lamp";

type Props = {
  value: LampColor;
  onChange: (c: LampColor) => void;
  name: string;
  legend: string;
  /** 'dots' = compact circles, 'cards' = large labelled tiles */
  layout?: "dots" | "cards";
};

/** Native radio inputs → free arrow-key + screen-reader support. */
export default function ColorPicker({
  value,
  onChange,
  name,
  legend,
  layout = "dots",
}: Props) {
  return (
    <fieldset>
      <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-mute">
        {legend}
      </legend>
      <div
        className={
          layout === "dots"
            ? "grid grid-cols-5 gap-2 sm:grid-cols-10"
            : "grid grid-cols-2 gap-3 sm:grid-cols-3"
        }
      >
        {LAMP_COLORS.map((c) => (
          <label
            key={c.id}
            className={
              layout === "dots"
                ? "flex justify-center cursor-pointer"
                : "cursor-pointer"
            }
          >
            <input
              type="radio"
              name={name}
              value={c.id}
              checked={value.id === c.id}
              onChange={() => onChange(c)}
              className="peer sr-only"
            />
            {layout === "dots" ? (
              <span
                title={c.name}
                className="grid size-12 place-items-center rounded-full border border-black/10 transition duration-300 peer-checked:scale-110 peer-checked:ring-2 peer-checked:ring-ink peer-checked:ring-offset-4 peer-checked:ring-offset-paper peer-focus-visible:outline-3 peer-focus-visible:outline-offset-4 hover:scale-105"
                style={{ backgroundColor: c.hex }}
              >
                <span className="sr-only">{c.name}</span>
              </span>
            ) : (
              <span className="flex items-center gap-3 rounded-2xl border border-line bg-white/60 p-3 transition duration-300 hover:-translate-y-0.5 peer-checked:border-ink peer-checked:bg-white peer-checked:shadow-lg peer-focus-visible:outline-3 peer-focus-visible:outline-offset-4">
                <span
                  className="size-9 shrink-0 rounded-full border border-black/10"
                  style={{ backgroundColor: c.hex }}
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold">{c.name}</span>
              </span>
            )}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
