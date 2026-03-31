import { AGENTS, AgentId } from "~/data/agents";
import { motion } from "framer-motion";

interface AgentSelectorProps {
  selectedAgent: AgentId;
  onSelectAgent: (agentId: AgentId) => void;
  disabled?: boolean;
}

export function AgentSelector({
  selectedAgent,
  onSelectAgent,
  disabled = false,
}: AgentSelectorProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
        Choose Your Agent
      </p>
      <div className="grid grid-cols-2 gap-2">
        {AGENTS.map((agent) => {
          const isSelected = selectedAgent === agent.id;

          return (
            <motion.button
              key={agent.id}
              type="button"
              onClick={() => onSelectAgent(agent.id)}
              disabled={disabled}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={[
                "rounded-2xl border px-3 py-3 text-left transition-all duration-150",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                isSelected
                  ? "border-fuchsia-400 bg-zinc-900 text-white shadow-[0_0_25px_rgba(192,38,211,0.35)]"
                  : "border-zinc-700 bg-zinc-900/60 text-zinc-200 hover:border-zinc-500",
              ].join(" ")}
            >
              <p className="text-sm font-black uppercase leading-tight">{agent.name}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-zinc-400">{agent.subtitle}</p>
              <p
                className={[
                  "mt-2 text-[11px] leading-tight",
                  isSelected ? "text-zinc-100" : "text-zinc-400",
                ].join(" ")}
              >
                {agent.description}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
