import type { LampColor } from "../lib/lamp";

export default function StatusChip({
  upsideDown,
  color,
}: {
  upsideDown: boolean;
  color: LampColor;
}) {
  return (
    <p
      role="status"
      className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 py-2 pl-3 pr-4 text-sm font-medium text-white backdrop-blur"
    >
      <span
        className="size-3 rounded-full transition-colors duration-500"
        style={{
          backgroundColor: color.hex,
          boxShadow: `0 0 12px ${color.hex}`,
        }}
        aria-hidden="true"
      />
      {upsideDown
        ? "Upside down — red · waiter called"
        : `Upright — ${color.name.toLowerCase()} · all good`}
    </p>
  );
}
