export type DecisionLabel =
  | "DO IT"
  | "DO NOT"
  | "ABSOLUTELY NOT"
  | "YOU KNOW THE ANSWER"
  | "GO FOR IT"
  | "DON'T EVEN THINK ABOUT IT";

export type AgentId =
  | "toxic-bestie"
  | "brutal-realist"
  | "chaos-demon"
  | "delusional-optimist"
  | "overthinker"
  | "therapist";

export interface AgentProfile {
  id: AgentId;
  name: string;
  subtitle: string;
  description: string;
  vibeColor: string;
  responses: Record<DecisionLabel, string[]>;
  escalationLines: string[];
}

export const AGENTS: AgentProfile[] = [
  {
    id: "toxic-bestie",
    name: "Toxic Bestie",
    subtitle: "Savage confidence",
    description: "sarcastic, judgmental, confident",
    vibeColor: "from-fuchsia-500 via-pink-500 to-rose-500",
    responses: {
      "DO IT": [
        "Do it. I need entertainment and you need character development.",
        "Yes, do it. You're not mysterious, you're just procrastinating.",
        "Do it and pretend you planned it all along.",
      ],
      "DO NOT": [
        "Do not. Even chaos has standards.",
        "No. I support you, but not this nonsense.",
        "Hard pass. Keep your dignity, babe.",
      ],
      "ABSOLUTELY NOT": [
        "Absolutely not. You're one bad choice away from a documentary.",
        "Absolutely not. Respect yourself immediately.",
        "No. Delete the thought and hydrate.",
      ],
      "YOU KNOW THE ANSWER": [
        "You know the answer. Stop outsourcing your common sense.",
        "You already decided. You're just craving permission.",
        "You know. You're stalling for dramatic effect.",
      ],
      "GO FOR IT": [
        "Go for it. If it fails, at least it will be iconic.",
        "Go for it. Regret is hotter than indecision.",
        "Go for it. Main character energy or nothing.",
      ],
      "DON'T EVEN THINK ABOUT IT": [
        "Don't even think about it. That's not a plan, that's a cry for help.",
        "No thoughts, just walk away.",
        "Don't. Future you will file a complaint.",
      ],
    },
    escalationLines: [
      "",
      "You asked this already. Suspicious behavior.",
      "Again? You are farming bad outcomes.",
      "Third rerun. Decide something before the universe blocks you.",
    ],
  },
  {
    id: "brutal-realist",
    name: "Brutal Realist",
    subtitle: "Cold hard facts",
    description: "logical, blunt, no emotions",
    vibeColor: "from-cyan-500 via-blue-600 to-indigo-700",
    responses: {
      "DO IT": [
        "Do it. Upside outweighs downside.",
        "Proceed. Delay is now the bigger risk.",
        "Do it. This is a favorable bet.",
      ],
      "DO NOT": [
        "Do not. Probability of failure is not worth it.",
        "No. Expected value is negative.",
        "Do not. The math is not on your side.",
      ],
      "ABSOLUTELY NOT": [
        "Absolutely not. There is no defensible case.",
        "Rejected. Bad logic, bad timing.",
        "No. Objective analysis says stop.",
      ],
      "YOU KNOW THE ANSWER": [
        "You know the answer. Your first instinct was correct.",
        "Decision already made. You're negotiating with reality.",
        "You know. Execution is now required.",
      ],
      "GO FOR IT": [
        "Go for it. Controlled risk, meaningful upside.",
        "Proceed. Momentum matters.",
        "Go for it. This is strategically sound.",
      ],
      "DON'T EVEN THINK ABOUT IT": [
        "Don't even think about it. This fails basic checks.",
        "No. Eliminate this path.",
        "Abort. This is a low-quality decision.",
      ],
    },
    escalationLines: [
      "",
      "Repeat query detected. Recommendation unchanged.",
      "Repeated indecision increases error rate.",
      "Looping identified. Pick action or drop it.",
    ],
  },
  {
    id: "chaos-demon",
    name: "Chaos Demon",
    subtitle: "Maximum instability",
    description: "unpredictable, risky, short answers",
    vibeColor: "from-violet-500 via-purple-600 to-fuchsia-600",
    responses: {
      "DO IT": [
        "Do it. No explanation.",
        "Do it. Let destiny improvise.",
        "Do it. Maximum timeline distortion.",
      ],
      "DO NOT": [
        "Do not. Cursed vibes detected.",
        "Nope. Reality is fragile right now.",
        "Do not. Bad omen.",
      ],
      "ABSOLUTELY NOT": [
        "Absolutely not. Rift risk is high.",
        "No. This summons consequences.",
        "Absolutely not. Even chaos said chill.",
      ],
      "YOU KNOW THE ANSWER": [
        "You know the answer. You're roleplaying confusion.",
        "You know. Say it out loud to the void.",
        "You know. Stop buffering.",
      ],
      "GO FOR IT": [
        "Go for it. Flip a coin, ignore it, do it anyway.",
        "Go for it. This bad idea has good lighting.",
        "Go for it. Perfect amount of danger.",
      ],
      "DON'T EVEN THINK ABOUT IT": [
        "Don't even think about it. Trap card activated.",
        "No thoughts. Emergency retreat.",
        "Don't. The timeline is wheezing.",
      ],
    },
    escalationLines: [
      "",
      "Again? Delicious.",
      "Double ask accepted. Entropy rising.",
      "Third loop. We are now legally chaos.",
    ],
  },
  {
    id: "delusional-optimist",
    name: "Delusional Optimist",
    subtitle: "Everything is a yes",
    description: "optimistic, impulsive, glitter energy",
    vibeColor: "from-emerald-400 via-lime-400 to-yellow-300",
    responses: {
      "DO IT": [
        "Do it. The universe loves bold nonsense.",
        "Do it. This is your movie montage moment.",
        "Do it. Worst case: plot twist, best case: legend.",
      ],
      "DO NOT": [
        "Do not... unless doing it sounds fun. It does.",
        "I said no, but in a supportive way that means yes tomorrow.",
        "Temporary no. Permanent optimism.",
      ],
      "ABSOLUTELY NOT": [
        "Absolutely not... today. Tomorrow might be iconic though.",
        "No for now. Sparkles pending.",
        "Hard no. Soft maybe later.",
      ],
      "YOU KNOW THE ANSWER": [
        "You know the answer and it's probably yes.",
        "You know. Your inner cheerleader is screaming.",
        "You know. Trust your delusions responsibly.",
      ],
      "GO FOR IT": [
        "Go for it. Audacity is your best accessory.",
        "Go for it. Confidence first, logistics later.",
        "Go for it. You miss 100% of the fun you overthink.",
      ],
      "DON'T EVEN THINK ABOUT IT": [
        "Don't even think about it. Just feel it and sprint.",
        "No thinking. Leap and sparkle.",
        "Brain off, dream on.",
      ],
    },
    escalationLines: [
      "",
      "You asked again? Great sign. Momentum!",
      "Repeat detected. This is called manifesting.",
      "Third ask means destiny is knocking aggressively.",
    ],
  },
  {
    id: "overthinker",
    name: "Overthinker",
    subtitle: "Spiral specialist",
    description: "confused, spiraling, infinitely conditional",
    vibeColor: "from-amber-400 via-orange-500 to-red-500",
    responses: {
      "DO IT": [
        "Do it... but wait, define do it.",
        "Do it maybe, assuming no unforeseen social collapse.",
        "Do it, unless this is one of those situations.",
      ],
      "DO NOT": [
        "Do not, pending further analysis in 14 tabs.",
        "No, but we should revisit after a pros/cons matrix.",
        "Do not. Or do. I need a whiteboard.",
      ],
      "ABSOLUTELY NOT": [
        "Absolutely not. The anxiety spreadsheet says red.",
        "No. This introduces at least 17 new variables.",
        "Absolutely not unless we can simulate it first.",
      ],
      "YOU KNOW THE ANSWER": [
        "You know the answer but your brain requested a committee vote.",
        "You know. The problem is certainty feels suspicious.",
        "You know. You're just narrating uncertainty.",
      ],
      "GO FOR IT": [
        "Go for it, but maybe write contingency plans A through F.",
        "Go for it with disclaimers, boundaries, and backup snacks.",
        "Go for it, cautiously, in theory, hypothetically.",
      ],
      "DON'T EVEN THINK ABOUT IT": [
        "Don't even think about it. Actually impossible, I already did.",
        "No thinking? That's unrealistic but I'll try.",
        "Don't think about it? Too late, I made a flowchart.",
      ],
    },
    escalationLines: [
      "",
      "You're asking again, which feels important and terrifying.",
      "Second repeat. New variables just spawned.",
      "Third repeat. We are now overthinking the overthinking.",
    ],
  },
  {
    id: "therapist",
    name: "Therapist",
    subtitle: "Reflective and grounded",
    description: "curious, calm, emotionally aware",
    vibeColor: "from-sky-400 via-teal-400 to-emerald-400",
    responses: {
      "DO IT": [
        "Do it, if it aligns with who you're becoming.",
        "Yes, do it. Courage often looks like discomfort first.",
        "Do it. Let this be an intentional choice.",
      ],
      "DO NOT": [
        "Do not, if this is driven by fear or urgency.",
        "No. Protect your peace before pleasing everyone else.",
        "Do not. Boundaries are decisions too.",
      ],
      "ABSOLUTELY NOT": [
        "Absolutely not. Your nervous system deserves safety.",
        "No. This would cost more than it gives.",
        "Absolutely not. Self-respect is the decision.",
      ],
      "YOU KNOW THE ANSWER": [
        "You know the answer. Try trusting the quiet truth.",
        "You know. Your body usually knows before your thoughts do.",
        "You know. Permission granted to choose yourself.",
      ],
      "GO FOR IT": [
        "Go for it. Growth rarely feels neat.",
        "Go for it. You can be scared and still choose.",
        "Go for it. Let this be a vote for your future self.",
      ],
      "DON'T EVEN THINK ABOUT IT": [
        "Don't even think about it. Pause and breathe first.",
        "No. This is a moment for restraint, not reaction.",
        "Don't. Clarity before action.",
      ],
    },
    escalationLines: [
      "",
      "You asked again. What feeling are you hoping to avoid?",
      "Second repeat. Let's notice the pattern with compassion.",
      "Third repeat. The answer may be less urgent than the emotion.",
    ],
  },
];

export const AGENT_BY_ID = AGENTS.reduce<Record<AgentId, AgentProfile>>(
  (acc, agent) => {
    acc[agent.id] = agent;
    return acc;
  },
  {} as Record<AgentId, AgentProfile>
);
