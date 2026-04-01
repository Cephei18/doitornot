"use client";

import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import App from "./app";

export default function Home() {
  useEffect(() => {
    const init = async () => {
      await sdk.actions.ready();
    };

    init();
  }, []);

  return (<App />);
}
