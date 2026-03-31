"use client";

import { APP_NAME } from "~/lib/constants";

export function Header() {
  return (
    <div className="relative">
      <div className="mt-4 mb-4 mx-4 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-between border-[3px] border-double border-primary">
        <div className="text-lg font-light">Welcome to {APP_NAME}!</div>
      </div>
    </div>
  );
}
