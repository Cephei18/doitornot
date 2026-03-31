interface InputBoxProps {
  value: string;
  onChange: (nextValue: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function InputBox({ value, onChange, onSubmit, isLoading }: InputBoxProps) {
  return (
    <div className="space-y-4">
      <label htmlFor="decision-input" className="text-xs uppercase tracking-[0.2em] text-zinc-400">
        Question Arena
      </label>
      <textarea
        id="decision-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="What are you overthinking?"
        className="min-h-28 w-full resize-none rounded-3xl border border-zinc-700 bg-zinc-950/70 px-4 py-3 text-base leading-relaxed text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/30"
        disabled={isLoading}
        maxLength={220}
      />
      <button
        type="button"
        onClick={onSubmit}
        disabled={isLoading || !value.trim()}
        className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500 px-4 py-3 text-base font-black uppercase tracking-[0.14em] text-white shadow-[0_10px_28px_rgba(147,51,234,0.45)] transition active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isLoading ? "Summoning a terrible idea..." : "Decide My Fate"}
      </button>
      <p className="text-center text-xs text-zinc-500">
        Zero refunds on emotional damage.
      </p>
    </div>
  );
}
