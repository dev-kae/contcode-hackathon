export function PromptSuggestions({
  label,
  append,
  suggestions
}) {
  return (
    (<div className="space-y-6">
      <h2 className="text-center text-2xl font-bold">{label}</h2>
      <div className="flex gap-6 text-sm">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => append({ role: "user", content: suggestion })}
            className="h-max flex-1 rounded-xl border border-neutral-200 bg-white p-4 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800">
            <p>{suggestion}</p>
          </button>
        ))}
      </div>
    </div>)
  );
}