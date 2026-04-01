"use client";

import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import App from "./app";

export default function Home() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (<App />);
}
