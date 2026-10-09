export const BANK = {
  Park: [
    "🌳 Find 3 different types of trees",
    "🐦 Spot 2 different birds",
    "🍃 Collect (look at) 3 different leaf shapes",
    "🌤️ Spend 2 minutes just observing the sky",
    "🦋 Find an insect or butterfly",
    "🌸 Find a flower and notice its colors",
    "🧘 Stand still for 1 minute and listen to all sounds",
  ],
  City: [
    "🏛️ Find a building with interesting architecture",
    "🎨 Spot a piece of street art or a colorful sign",
    "🚪 Find the oldest-looking door or wall nearby",
    "🔤 Find 3 different fonts on signboards",
    "🌿 Spot a plant growing in an unexpected place",
    "👀 Look up: notice something above eye level",
    "🧘 Stand still for 1 minute and listen to the city",
  ],
  College: [
    "🏫 Find a spot on campus you've never visited",
    "🌳 Find the biggest tree around",
    "🎓 Notice one notice board and read something new",
    "🪑 Find the most peaceful place to sit",
    "👀 Spot something you never noticed before",
    "🧘 Stand still for 1 minute and listen to the sounds",
    "🚶 Walk a path you don't usually take",
  ],
  Neighborhood: [
    "🏠 Find a house with a unique feature",
    "🌿 Spot 3 different plants",
    "🐕 Notice any animal (bird, dog, cat)",
    "🚪 Find an interesting door or gate",
    "☁️ Spend 2 minutes observing the sky",
    "👋 Smile or say hello to one person",
    "🧘 Stand still for 1 minute and listen",
  ],
}

export const COMMON = [
  "📸 Take one interesting photo",
  "🧠 Learn one new thing about your surroundings",
  "📝 Note one thing you noticed today",
]

const COUNT_BY_TIME = { 10: 3, 20: 4, 30: 5, 60: 7 }

export function generateChallenges({ time, place, difficulty }) {
  let count = COUNT_BY_TIME[time] ?? 4
  if (difficulty === "Easy") count = Math.max(3, count - 1)
  if (difficulty === "Hard") count = count + 1

  const pool = [...BANK[place]].sort(() => Math.random() - 0.5)
  const tasks = [...pool.slice(0, count - 1), COMMON[Math.floor(Math.random() * COMMON.length)]]
  return tasks.slice(0, count).map((text, i) => ({ id: i, text, done: false }))
}