"use client";

import { useCallback, useState } from "react";
import { ShareButton } from "../Share";
import { Button } from "../Button";
import { APP_URL } from "~/lib/constants";

export function ActionsTab() {
  const [shareUrlCopied, setShareUrlCopied] = useState(false);

  const copyShareUrl = useCallback(async () => {
    await navigator.clipboard.writeText(APP_URL);
    setShareUrlCopied(true);
    setTimeout(() => setShareUrlCopied(false), 1500);
  }, []);

  return (
    <div className="space-y-3 px-6 w-full max-w-md mx-auto">
      <ShareButton
        buttonText="Share Mini App"
        cast={{
          text: "Try DoItOrNot and let chaos decide.",
          embeds: [APP_URL],
        }}
        className="w-full"
      />

      <Button onClick={copyShareUrl} className="w-full">
        {shareUrlCopied ? "Copied!" : "Copy Share URL"}
      </Button>

      <Button onClick={() => window.open(APP_URL, "_blank")} className="w-full">
        Open App URL
      </Button>
    </div>
  );
}
