import { motion } from "framer-motion";
import { AgentId } from "~/data/agents";
import { ChaosEvent } from "~/lib/chaosEngine";
import { DecisionResult } from "~/lib/decisionEngine";
import { ChaosEffects } from "~/components/ChaosEffects";

interface DecisionCardProps {
  result: DecisionResult;
  battleResults: DecisionResult[];
  chaosEvent: ChaosEvent | null;
  isShaking: boolean;
  onSpinAgain: () => void;
  onStartBattle: () => void;
  onPickBattleWinner: (agentId: AgentId) => void;
  onAskAgain: () => void;
  onTryAnotherAgent: () => void;
}

export function DecisionCard({
  result,
  battleResults,
  chaosEvent,
  isShaking,
  onSpinAgain,
  onStartBattle,
  onPickBattleWinner,
  onAskAgain,
  onTryAnotherAgent,
}: DecisionCardProps) {
  const angle = result.decision === "ABSOLUTELY NOT" ? -1.5 : 1.2;

  return (
    <div className="space-y-4">
      <ChaosEffects event={chaosEvent} />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 10, rotate: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: angle,
          x: isShaking ? [0, -6, 6, -4, 4, 0] : 0,
        }}
        transition={{ duration: 0.34 }}
        className="rounded-[26px] border border-fuchsia-400/60 bg-[linear-gradient(155deg,#0f0f1a_0%,#15112d_45%,#1b1032_100%)] p-[1px] shadow-[0_0_40px_rgba(192,38,211,0.45)]"
      >
        <div className="rounded-[25px] bg-zinc-950/85 p-5 text-white">
          <span className="inline-flex rounded-full border border-zinc-600 bg-zinc-900 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-zinc-300">
            {result.agentName}
          </span>
          <h2 className="mt-4 text-5xl font-black uppercase leading-[0.85] sm:text-6xl">
            {result.decision}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-200">{result.message}</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={onAskAgain}
          className="rounded-2xl border border-zinc-700 bg-zinc-900 px-2 py-2 text-xs font-bold uppercase tracking-[0.12em] text-zinc-100 transition hover:border-zinc-500 active:scale-[0.98]"
        >
          Ask Again
        </button>
        <button
          type="button"
          onClick={onTryAnotherAgent}
          className="rounded-2xl border border-zinc-700 bg-zinc-900 px-2 py-2 text-xs font-bold uppercase tracking-[0.12em] text-zinc-100 transition hover:border-zinc-500 active:scale-[0.98]"
        >
          Try Agent
        </button>
        <button
          type="button"
          onClick={onSpinAgain}
          className="rounded-2xl border border-fuchsia-400/70 bg-fuchsia-500/20 px-2 py-2 text-xs font-bold uppercase tracking-[0.12em] text-fuchsia-100 transition active:scale-[0.98]"
        >
          Spin Again
        </button>
      </div>

      <button
        type="button"
        onClick={onStartBattle}
        className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_10px_30px_rgba(14,165,233,0.35)] transition active:scale-[0.98]"
      >
        Multi-Agent Battle Mode
      </button>

      {battleResults.length > 0 ? (
        <div className="space-y-2 rounded-2xl border border-zinc-700 bg-zinc-900/70 p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Choose Your Winner</p>
          <div className="grid gap-2">
            {battleResults.map((battle) => (
              <button
                key={battle.agentId}
                onClick={() => onPickBattleWinner(battle.agentId)}
                className="rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-3 text-left transition hover:border-cyan-400 active:scale-[0.99]"
                type="button"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">{battle.agentName}</p>
                <p className="mt-1 text-xl font-black uppercase text-zinc-100">{battle.decision}</p>
                <p className="mt-1 text-sm text-zinc-300">{battle.message}</p>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onAskAgain}
          className="rounded-2xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-bold uppercase tracking-[0.12em] text-zinc-100 transition active:scale-[0.98]"
        >
          New Question
        </button>
        <button
          type="button"
          onClick={onTryAnotherAgent}
          className="rounded-2xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-bold uppercase tracking-[0.12em] text-zinc-100 transition active:scale-[0.98]"
        >
          Another Agent
        </button>
      </div>
    </div>
  );
}
