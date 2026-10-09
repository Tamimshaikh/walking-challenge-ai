# 🚶 Walking Challenge AI

An open-source AI that sends you outside. Pick your walk time, place and difficulty, and get a list of real-world challenges. The screen is the shortest part of the experience.

Built for the Hacktoberfest Open-Source AI Challenge Week 1: Touch Grass.

**Live demo:** YOUR-LIVE-LINK

## How it works

1. Choose walking time (10 to 60 min), place (park, city, college, neighborhood) and difficulty.
2. An open-weight model (Qwen2.5 Instruct) runs in your browser with Transformers.js and writes your challenges.
3. If the model output is unusable, the app falls back to built-in challenges.
4. Walk, tick off the challenges, finish.

## Run locally

    npm install
    npm run dev

Open http://localhost:5173 in Chrome or Edge. The first run downloads the model (about 1.2 GB), then it is cached by the browser.

## Tech

React, Vite, Tailwind CSS, Transformers.js (WebGPU or WASM).

## Open source

The model is one line in `src/ai.js`. Swap it for any other Transformers.js-compatible model.