"use client";

export function ContextTab() {
  return (
    <div className="mx-6">
      <h2 className="text-lg font-semibold mb-2">Context</h2>
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <pre className="font-mono text-xs whitespace-pre-wrap break-words w-full">
          {JSON.stringify({ mode: "standalone", auth: "disabled", provider: "local" }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
