"use client";

import { useMemo, useRef, useState } from "react";
import { Bungee, Space_Grotesk } from "next/font/google";
import { motion } from "framer-motion";
import { AgentSelector } from "~/components/AgentSelector";
import { DecisionCard } from "~/components/DecisionCard";
import { InputBox } from "~/components/InputBox";
import { RevealAnimation } from "~/components/RevealAnimation";
import { AGENTS, AgentId } from "~/data/agents";
import { applyChaos, ChaosEvent, SUSPENSE_LINES } from "~/lib/chaosEngine";
import { getBattleDecisions, getDecision, DecisionResult } from "~/lib/decisionEngine";

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body"
});

const titleFont = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-title"
});

export interface AppProps {
  title?: string;
}

export default function App(
  { title }: AppProps = { title: "DoItOrNot" }
) {
  const [question, setQuestion] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<AgentId>("toxic-bestie");
  const [isRevealing, setIsRevealing] = useState(false);
  const [suspenseLine, setSuspenseLine] = useState(SUSPENSE_LINES[0]);
  const [result, setResult] = useState<DecisionResult | null>(null);
  const [battleResults, setBattleResults] = useState<DecisionResult[]>([]);
  const [chaosEvent, setChaosEvent] = useState<ChaosEvent | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [questionHistory, setQuestionHistory] = useState<string[]>([]);
  const suspenseIntervalRef = useRef<number | null>(null);

  const nextAgentId = useMemo(() => {
    const currentIndex = AGENTS.findIndex((agent) => agent.id === selectedAgent);
    const nextIndex = (currentIndex + 1) % AGENTS.length;
    return AGENTS[nextIndex].id;
  }, [selectedAgent]);

  const stopSuspenseTicker = () => {
    if (suspenseIntervalRef.current !== null) {
      window.clearInterval(suspenseIntervalRef.current);
      suspenseIntervalRef.current = null;
    }
  };

  const startSuspenseTicker = () => {
    stopSuspenseTicker();
    suspenseIntervalRef.current = window.setInterval(() => {
      setSuspenseLine(SUSPENSE_LINES[Math.floor(Math.random() * SUSPENSE_LINES.length)]);
    }, 540);
  };

  const revealDecision = (seedQuestion: string, seedAgent: AgentId) => {
    if (!seedQuestion.trim() || isRevealing) {
      return;
    }

    setIsRevealing(true);
    setBattleResults([]);
    setChaosEvent(null);
    setSuspenseLine(SUSPENSE_LINES[Math.floor(Math.random() * SUSPENSE_LINES.length)]);
    startSuspenseTicker();

    const revealDelay = 1200 + Math.floor(Math.random() * 800);

    window.setTimeout(() => {
      const base = getDecision(seedQuestion, seedAgent, questionHistory);
      const chaotic = applyChaos(base);

      setResult(chaotic.result);
      setChaosEvent(chaotic.event.type === "none" ? null : chaotic.event);
      setQuestionHistory((current) => [...current, seedQuestion].slice(-35));
      setIsRevealing(false);
      stopSuspenseTicker();

      if (
        chaotic.event.type !== "none" ||
        chaotic.result.decision === "ABSOLUTELY NOT" ||
        chaotic.result.decision === "DON'T EVEN THINK ABOUT IT"
      ) {
        setIsShaking(true);
        window.setTimeout(() => setIsShaking(false), 360);
      }
    }, revealDelay);
  };

  const handleDecide = () => {
    revealDecision(question, selectedAgent);
  };

  const handleAskAgain = () => {
    setQuestion("");
    setResult(null);
    setBattleResults([]);
    setChaosEvent(null);
  };

  const handleTryAnotherAgent = () => {
    setSelectedAgent(nextAgentId);
    setResult(null);
    setBattleResults([]);
    setChaosEvent(null);
  };

  const handleSpinAgain = () => {
    if (!question.trim()) {
      return;
    }

    revealDecision(question, selectedAgent);
  };

  const handleStartBattleMode = () => {
    if (!question.trim()) {
      return;
    }

    const decisions = getBattleDecisions(question, selectedAgent, questionHistory);
    setBattleResults(decisions);
  };

  const handlePickBattleWinner = (agentId: AgentId) => {
    const winner = battleResults.find((battle) => battle.agentId === agentId);

    if (!winner) {
      return;
    }

    setSelectedAgent(agentId);
    setResult(winner);
  };

  return (
    <div className={`${bodyFont.className} ${titleFont.variable}`}>
      <main className="relative min-h-screen overflow-hidden bg-zinc-950 px-4 py-6">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_20%,rgba(236,72,153,0.35),transparent_30%),radial-gradient(circle_at_82%_15%,rgba(59,130,246,0.35),transparent_30%),radial-gradient(circle_at_55%_85%,rgba(168,85,247,0.24),transparent_34%)]" />
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 fill=%22none%22%3E%3Ccircle cx=%221%22 cy=%221%22 r=%221%22 fill=%22white%22/%3E%3C/svg%3E')" }} />

        <motion.div
          animate={{ y: [0, -3, 0, 2, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="relative mx-auto w-full max-w-md space-y-5"
        >
          <header className="text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-400">Farcaster Mini Game</p>
            <h1
              className="mt-2 text-5xl uppercase leading-[0.9] text-white sm:text-6xl"
              style={{ fontFamily: "var(--font-title), sans-serif" }}
            >
              Do It. Or Not.
            </h1>
            <p className="mt-3 text-base font-semibold text-zinc-300">Stop overthinking.</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">{title}</p>
          </header>

          <section className="rounded-3xl border border-zinc-700 bg-zinc-900/75 p-4 shadow-[0_16px_42px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            <InputBox
              value={question}
              onChange={setQuestion}
              onSubmit={handleDecide}
              isLoading={isRevealing}
            />
          </section>

          <section className="rounded-3xl border border-zinc-700 bg-zinc-900/70 p-4">
            <AgentSelector
              selectedAgent={selectedAgent}
              onSelectAgent={setSelectedAgent}
              disabled={isRevealing}
            />
          </section>

          {result ? (
            <DecisionCard
              result={result}
              battleResults={battleResults}
              chaosEvent={chaosEvent}
              isShaking={isShaking}
              onSpinAgain={handleSpinAgain}
              onStartBattle={handleStartBattleMode}
              onPickBattleWinner={handlePickBattleWinner}
              onAskAgain={handleAskAgain}
              onTryAnotherAgent={handleTryAnotherAgent}
            />
          ) : (
            <section className="rounded-3xl border border-dashed border-zinc-600 bg-zinc-900/60 p-4 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Ready To Play</p>
              <p className="mt-2 text-sm text-zinc-300">Enter a question, pick a chaos consultant, then decide your fate.</p>
            </section>
          )}

          <footer className="pb-6 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Built for screenshots and questionable life choices
          </footer>
        </motion.div>

        <RevealAnimation active={isRevealing} line={suspenseLine} />
      </main>

      <style jsx>{`
        main::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.08) 45%, transparent 70%);
          animation: sweep 6s linear infinite;
          pointer-events: none;
          mix-blend-mode: soft-light;
        }

        @keyframes sweep {
          from {
            transform: translateX(-120%);
          }
          to {
            transform: translateX(120%);
          }
        }
      `}</style>
    </div>
  );
}

