import { pipeline } from "@huggingface/transformers"

let generatorPromise = null

export function loadModel(onProgress) {
  if (!generatorPromise) {
    const hasWebGPU = typeof navigator !== "undefined" && "gpu" in navigator
    generatorPromise = pipeline("text-generation", "onnx-community/Qwen2.5-1.5B-Instruct", {
      device: hasWebGPU ? "webgpu" : "wasm",
      dtype: hasWebGPU ? "q4f16" : "q4",
      progress_callback: onProgress,
    }).catch((e) => {
      generatorPromise = null
      throw e
    })
  }
  return generatorPromise
}

const EMOJI = /\p{Extended_Pictographic}/u
const ECHO = /give \d|challenges\b|walker|difficulty|minutes,/i

function parseLines(text) {
  const seen = new Set()
  return text
    .split(/\n+/)
    .map((l) =>
      l
        .replace(/\*\*/g, "")
        .replace(/^\s*(?:[-*•]|\d+[.)])\s*/, "")
        .trim()
    )
    .filter((l) => l.length >= 8 && l.length <= 100 && EMOJI.test(l) && !ECHO.test(l))
    .filter((l) => (seen.has(l) ? false : (seen.add(l), true)))
}

export async function generateAIChallenges({ time, place, difficulty, count }, onProgress) {
  const generator = await loadModel(onProgress)

  const messages = [
    {
      role: "system",
      content:
        "You are a friendly walking coach. You invent short, safe, fun outdoor activities. " +
        "Reply with only the activities, one per line, each starting with one emoji. No numbering, no extra text.",
    },
    { role: "user", content: "Walk: 20 minutes, City, Easy. Give 3 challenges." },
    {
      role: "assistant",
      content:
        "🏛️ Find a building with an interesting door\n🎨 Spot some colorful street art\n👀 Look up and notice something above eye level",
    },
    {
      role: "user",
      content: `Walk: ${time} minutes, ${place}, ${difficulty}. Give ${count} challenges.`,
    },
  ]

  const out = await generator(messages, {
    max_new_tokens: 150,
    do_sample: true,
    temperature: 0.6,
    top_p: 0.9,
    repetition_penalty: 1.1,
  })

  const text = out[0].generated_text.at(-1).content
  console.log("AI raw output:", JSON.stringify(text))

  const lines = parseLines(text)
  if (lines.length < Math.min(count, 3)) {
    throw new Error("AI output unusable: " + JSON.stringify(text))
  }

  return lines.slice(0, count).map((t, i) => ({ id: i, text: t, done: false }))
}