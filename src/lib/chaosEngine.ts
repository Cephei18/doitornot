import { AgentId, DecisionLabel } from "~/data/agents";
import { DecisionResult } from "~/lib/decisionEngine";

export type ChaosEventType = "none" | "double-down" | "plot-twist" | "gaslight-mode";

export interface ChaosEvent {
  type: ChaosEventType;
  title: string;
  detail: string;
}

export interface ChaoticDecision {
  result: DecisionResult;
  event: ChaosEvent;
}

const OPPOSITE_MAP: Record<DecisionLabel, DecisionLabel> = {
  "DO IT": "DO NOT",
  "DO NOT": "DO IT",
  "ABSOLUTELY NOT": "GO FOR IT",
  "YOU KNOW THE ANSWER": "DO IT",
  "GO FOR IT": "ABSOLUTELY NOT",
  "DON'T EVEN THINK ABOUT IT": "GO FOR IT",
};

const GASLIGHT_DECISIONS: DecisionLabel[] = [
  "YOU KNOW THE ANSWER",
  "DO IT",
  "DO NOT",
];

const GASLIGHT_LINES = [
  "You should definitely maybe probably not do this unless yes.",
  "The answer is obvious and completely unclear at the same time.",
  "Trust yourself. Not that self. The other self.",
  "This is both wise and catastrophic. Proceed accordingly.",
];

const DOUBLE_DOWN_LINES: Record<AgentId, string[]> = {
  "toxic-bestie": ["I said what I said. No appeals."],
  "brutal-realist": ["Decision confidence upgraded to 99.2%."],
  "chaos-demon": ["We are doubling down. Seatbelts are decorative."],
  "delusional-optimist": ["Triple glitter confidence enabled."],
  "overthinker": ["I rechecked all panic scenarios. Same answer."],
  therapist: ["Grounded certainty engaged. Hold steady."],
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const SUSPENSE_LINES = [
  "Consulting chaos...",
  "This might ruin your life...",
  "Thinking (badly)...",
  "Spinning emotional roulette...",
  "Summoning questionable wisdom...",
  "Calibrating impulsive outcomes...",
];

export function applyChaos(base: DecisionResult): ChaoticDecision {
  const roll = Math.random();

  if (roll > 0.16) {
    return {
      result: base,
      event: {
        type: "none",
        title: "Normal Timeline",
        detail: "No chaos event this round.",
      },
    };
  }

  const eventRoll = Math.random();

  if (eventRoll < 0.34) {
    return {
      result: {
        ...base,
        message: `${base.message} ${pickRandom(DOUBLE_DOWN_LINES[base.agentId])}`,
      },
      event: {
        type: "double-down",
        title: "Double Down Mode",
        detail: "Confidence boosted. Aggression increased.",
      },
    };
  }

  if (eventRoll < 0.68) {
    const flipped = OPPOSITE_MAP[base.decision];

    return {
      result: {
        ...base,
        decision: flipped,
        message: `Plot twist activated. ${base.message}`,
      },
      event: {
        type: "plot-twist",
        title: "Plot Twist",
        detail: "Outcome inverted for maximum drama.",
      },
    };
  }

  return {
    result: {
      ...base,
      decision: pickRandom(GASLIGHT_DECISIONS),
      message: pickRandom(GASLIGHT_LINES),
    },
    event: {
      type: "gaslight-mode",
      title: "Gaslight Mode",
      detail: "Logic unavailable. Confusion delivered.",
    },
  };
}
