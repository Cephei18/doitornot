"use client";

import { useCallback, useState } from "react";
import { Button } from "./Button";
import { APP_URL } from "~/lib/constants";

interface CastConfig {
  text?: string;
  embeds?: string[];
}

interface ShareButtonProps {
  buttonText: string;
  cast: CastConfig;
  className?: string;
  isLoading?: boolean;
}

export function ShareButton({ buttonText, cast, className = "", isLoading = false }: ShareButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleShare = useCallback(async () => {
    try {
      setIsProcessing(true);

      const message = [
        cast.text || "",
        ...(cast.embeds || []).map((embed) =>
          embed.startsWith("http") ? embed : `${APP_URL}${embed}`
        ),
      ]
        .filter(Boolean)
        .join("\n\n");

      if (navigator.share) {
        await navigator.share({ text: message });
      } else {
        await navigator.clipboard.writeText(message);
      }
    } finally {
      setIsProcessing(false);
    }
  }, [cast]);

  return (
    <Button
      onClick={handleShare}
      className={className}
      isLoading={isLoading || isProcessing}
    >
      {buttonText}
    </Button>
  );
}
