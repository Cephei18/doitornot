import { AnimatePresence, motion } from "framer-motion";

interface RevealAnimationProps {
  active: boolean;
  line: string;
}

export function RevealAnimation({ active, line }: RevealAnimationProps) {
  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          key="reveal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-zinc-950/90 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="mx-4 w-full max-w-sm rounded-3xl border border-fuchsia-400/40 bg-zinc-900 p-6 text-center shadow-[0_0_40px_rgba(217,70,239,0.35)]"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Decision Reveal</p>
            <div className="mx-auto mt-4 h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-fuchsia-400" />
            <p className="mt-4 text-lg font-bold text-zinc-100">{line}</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
