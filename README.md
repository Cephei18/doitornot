# DoItOrNot

A Farcaster Mini App where users ask a question and get a chaotic, personality-driven decision.

Production app:
- https://doitornot-jdcy.vercel.app

## What Is a Farcaster Mini App?

A Farcaster Mini App is a web app that opens inside Warpcast with native Mini App capabilities.

For this project, Mini App behavior depends on:
- Mini App SDK initialization in the root page (`sdk.actions.ready()`)
- Frame metadata (`fc:frame`) in app metadata
- A manifest endpoint at `/.well-known/farcaster.json`

When Warpcast loads the app and receives the Mini App-ready signal, the splash screen dismisses and the app becomes interactive.

## How This App Is Wired for Farcaster

This repository uses Next.js App Router and the Farcaster Mini App SDK.

Key integration points:
- Root page calls `sdk.actions.ready()` on load
- Metadata includes `fc:frame` launch config
- `/.well-known/farcaster.json` is redirected to the hosted Farcaster manifest

Current hosted manifest redirect:
- Source: `/.well-known/farcaster.json`
- Destination: `https://api.farcaster.xyz/miniapps/hosted-manifest/019d48ca-6b23-5935-c634-3230c9f0c41d`
- Configured as a temporary redirect (HTTP 307)

## What Is in the App

Core user flow:
- User asks a question
- User selects an agent personality
- App reveals a decision with suspense and random chaos events
- Optional battle mode compares results from multiple agents

Main UI pieces:
- Question input and submit flow
- Agent selector
- Decision card and reveal animation
- Animated theme and effects tuned for social sharing

Technical highlights:
- Next.js 14 App Router + TypeScript
- React + Framer Motion for interactions
- Decision and chaos engines in reusable library modules
- API routes for notifications, webhook handling, and OG image generation

## Project Structure

Important folders:
- `src/app` - App Router pages, layout, metadata, API routes
- `src/components` - UI and feature components
- `src/lib` - decision logic, chaos engine, utilities
- `public` - static assets (`og.png`, `icon.png`, `splash.png`)

## Local Development

Install dependencies:

```bash
npm install
```

Run in dev mode:

```bash
npm run dev
```

Mini App manifest/redirect check:

```bash
curl -i http://localhost:3000/.well-known/farcaster.json
```

You should see a `307 Temporary Redirect` to the hosted Farcaster manifest URL.

## Build and Deploy

Build for production:

```bash
npm run build
```

Deploy to Vercel:

```bash
npm run deploy:vercel
```

## Notes

- OG/preview image target size: 1200 x 630 (`public/og.png`)
- Splash image target size: 200 x 200 (`public/splash.png`)
- App icon: 1024 x 1024 (`public/icon.png`)

