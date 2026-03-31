import { AGENTS, AGENT_BY_ID, AgentId, DecisionLabel } from "~/data/agents";

export interface DecisionResult {
  decision: DecisionLabel;
  message: string;
  agentId: AgentId;
  agentName: string;
  isRepeatQuestion: boolean;
  repeatCount: number;
}

interface WeightedOption<T extends string> {
  value: T;
  weight: number;
}

const BASE_WEIGHTS: WeightedOption<DecisionLabel>[] = [
  { value: "DO IT", weight: 18 },
  { value: "DO NOT", weight: 22 },
  { value: "ABSOLUTELY NOT", weight: 16 },
  { value: "YOU KNOW THE ANSWER", weight: 14 },
  { value: "GO FOR IT", weight: 20 },
  { value: "DON'T EVEN THINK ABOUT IT", weight: 10 },
];

function normalizeQuestion(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function similarityScore(a: string, b: string): number {
  if (!a || !b) {
    return 0;
  }

  if (a === b) {
    return 1;
  }

  const aTokens = new Set(a.split(" "));
  const bTokens = new Set(b.split(" "));

  let overlap = 0;
  aTokens.forEach((token) => {
    if (bTokens.has(token)) {
      overlap += 1;
    }
  });

  const union = new Set([...aTokens, ...bTokens]).size;
  return union === 0 ? 0 : overlap / union;
}

function weightedPick<T extends string>(options: WeightedOption<T>[]): T {
  const totalWeight = options.reduce((sum, option) => sum + option.weight, 0);
  let random = Math.random() * totalWeight;

  for (const option of options) {
    random -= option.weight;
    if (random <= 0) {
      return option.value;
    }
  }

  return options[options.length - 1].value;
}

function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

function getRepeatCount(question: string, questionHistory: string[]): number {
  return questionHistory.reduce((count, previousQuestion) => {
    const previous = normalizeQuestion(previousQuestion);
    const score = similarityScore(question, previous);
    return score >= 0.65 ? count + 1 : count;
  }, 0);
}

function tuneWeightsByAgent(agentId: AgentId, repeatCount: number): WeightedOption<DecisionLabel>[] {
  const repeatPenalty = clamp(repeatCount * 4, 0, 14);

  return BASE_WEIGHTS.map((item) => {
    let weight = item.weight;

    if (agentId === "toxic-bestie") {
      if (item.value === "YOU KNOW THE ANSWER") {
        weight += 7;
      }
      if (item.value === "ABSOLUTELY NOT") {
        weight += 4;
      }
    }

    if (agentId === "brutal-realist" && item.value === "DO NOT") {
      weight += 8;
    }

    if (agentId === "chaos-demon") {
      if (item.value === "DO IT") {
        weight += 8;
      }
      if (item.value === "GO FOR IT") {
        weight += 6;
      }
    }

    if (agentId === "delusional-optimist") {
      if (item.value === "DO IT" || item.value === "GO FOR IT") {
        weight += 10;
      }
      if (item.value === "DO NOT") {
        weight -= 4;
      }
    }

    if (agentId === "overthinker" && item.value === "YOU KNOW THE ANSWER") {
      weight += 6;
    }

    if (agentId === "therapist") {
      if (item.value === "YOU KNOW THE ANSWER") {
        weight += 5;
      }
      if (item.value === "DON'T EVEN THINK ABOUT IT") {
        weight += 2;
      }
    }

    if (repeatPenalty > 0) {
      if (item.value === "DO NOT" || item.value === "ABSOLUTELY NOT" || item.value === "YOU KNOW THE ANSWER") {
        weight += repeatPenalty;
      }
      if (item.value === "GO FOR IT") {
        weight -= Math.floor(repeatPenalty / 3);
      }
    }

    return {
      value: item.value,
      weight: Math.max(2, weight),
    };
  });
}

function pickMessage(agentId: AgentId, decision: DecisionLabel, repeatCount: number): string {
  const agent = AGENT_BY_ID[agentId];
  const bank = agent.responses[decision];
  const line = bank[Math.floor(Math.random() * bank.length)];
  const escalation = agent.escalationLines[clamp(repeatCount, 0, 3)];

  return escalation ? `${line} ${escalation}` : line;
}

export function getDecision(input: string, agentId: AgentId, questionHistory: string[] = []): DecisionResult {
  const normalizedInput = normalizeQuestion(input);
  const repeatCount = getRepeatCount(normalizedInput, questionHistory);
  const weights = tuneWeightsByAgent(agentId, repeatCount);
  const decision = weightedPick(weights);

  return {
    decision,
    message: pickMessage(agentId, decision, repeatCount),
    agentId,
    agentName: AGENT_BY_ID[agentId].name,
    isRepeatQuestion: repeatCount > 0,
    repeatCount,
  };
}

function pickDifferentAgents(anchorAgent: AgentId, count: number): AgentId[] {
  const options = AGENTS.filter((agent) => agent.id !== anchorAgent).map((agent) => agent.id);
  const picked: AgentId[] = [];

  while (picked.length < count && options.length > 0) {
    const index = Math.floor(Math.random() * options.length);
    const [next] = options.splice(index, 1);
    picked.push(next);
  }

  return picked;
}

export function getBattleDecisions(
  input: string,
  selectedAgent: AgentId,
  questionHistory: string[] = []
): DecisionResult[] {
  const opponents = pickDifferentAgents(selectedAgent, 2);
  const roster: AgentId[] = [selectedAgent, ...opponents];

  return roster.map((agentId) => getDecision(input, agentId, questionHistory));
}
