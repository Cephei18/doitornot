import { AnimatePresence, motion } from "framer-motion";
import { ChaosEvent } from "~/lib/chaosEngine";

interface ChaosEffectsProps {
  event: ChaosEvent | null;
}

const EVENT_STYLE: Record<ChaosEvent["type"], string> = {
  none: "border-zinc-700 bg-zinc-900/80 text-zinc-300",
  "double-down": "border-pink-400/80 bg-pink-500/20 text-pink-200",
  "plot-twist": "border-cyan-300/80 bg-cyan-500/20 text-cyan-100",
  "gaslight-mode": "border-yellow-300/80 bg-yellow-400/20 text-yellow-100",
};

export function ChaosEffects({ event }: ChaosEffectsProps) {
  if (!event || event.type === "none") {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key={event.type}
        initial={{ opacity: 0, y: 12, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8 }}
        className={[
          "rounded-2xl border px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
          EVENT_STYLE[event.type],
        ].join(" ")}
      >
        <p className="text-xs uppercase tracking-[0.2em]">{event.title}</p>
        <p className="mt-1 text-sm">{event.detail}</p>
      </motion.div>
    </AnimatePresence>
  );
}
