"use client"

import { useState } from "react"
import GameCard from "./game-card"

interface GamesShowcaseProps {
  onSelectGame: (gameId: string) => void
}

export default function GamesShowcase({ onSelectGame }: GamesShowcaseProps) {
  const [filter, setFilter] = useState<"all" | "racing" | "cards" | "board">("all")

  const games = [
    {
      id: "endless-racing",
      title: "Endless Car Racing",
      subtitle: "Like Traffic Racer",
      category: "racing",
      image: "/endless-car-racing-game.jpg",
      description: "High-speed endless racing with traffic dodging",
      features: ["Infinite gameplay", "Multiple cars", "Power-ups", "Leaderboards"],
      developmentTime: "3-4 months",
      technologies: ["Unity", "C#", "Mobile Optimization"],
      steps: [
        "Game design and mechanics planning",
        "Car physics and controls implementation",
        "Traffic AI system development",
        "UI/UX design and implementation",
        "Testing and optimization",
      ],
    },
    {
      id: "circuit-racing",
      title: "Circuit Racing Game",
      subtitle: "Drift Challenge",
      category: "racing",
      image: "/circuit-racing-drift-game.jpg",
      description: "Professional circuit racing with drift mechanics",
      features: ["Multiple tracks", "Drift system", "Car customization", "Multiplayer"],
      developmentTime: "4-5 months",
      technologies: ["Unity", "C#", "Networking"],
      steps: [
        "Track design and creation",
        "Advanced physics engine setup",
        "Drift mechanics implementation",
        "Multiplayer networking",
        "Performance optimization",
      ],
    },
    {
      id: "off-road-racing",
      title: "Off-Road Racing",
      subtitle: "Truck Racing",
      category: "racing",
      image: "/off-road-truck-racing-game.jpg",
      description: "Extreme off-road and truck racing experience",
      features: ["Terrain deformation", "Vehicle damage", "Weather effects", "Customization"],
      developmentTime: "4-6 months",
      technologies: ["Unity", "C#", "Terrain tools"],
      steps: [
        "Terrain generation and design",
        "Vehicle physics for off-road",
        "Damage system implementation",
        "Weather and environmental effects",
        "Testing and balancing",
      ],
    },
    {
      id: "teen-patti",
      title: "Teen Patti",
      subtitle: "Card Game",
      category: "cards",
      image: "/teen-patti-card-game.jpg",
      description: "Classic Indian card game with multiplayer support",
      features: ["AI opponents", "Multiplayer", "Betting system", "Animations"],
      developmentTime: "2-3 months",
      technologies: ["Unity", "C#", "Networking"],
      steps: [
        "Game rules implementation",
        "Card deck and shuffling system",
        "AI player logic",
        "Betting and chip system",
        "Multiplayer synchronization",
      ],
    },
    {
      id: "poker",
      title: "Poker",
      subtitle: "Card Game",
      category: "cards",
      image: "/poker-card-game.jpg",
      description: "Professional poker game with realistic gameplay",
      features: ["Multiple variants", "AI players", "Tournament mode", "Statistics"],
      developmentTime: "3-4 months",
      technologies: ["Unity", "C#", "Database"],
      steps: [
        "Poker rules and hand evaluation",
        "AI decision making",
        "Tournament system",
        "Player statistics tracking",
        "UI implementation",
      ],
    },
    {
      id: "rummy",
      title: "Rummy",
      subtitle: "Card Game",
      category: "cards",
      image: "/rummy-card-game.png",
      description: "Strategic rummy card game with smooth gameplay",
      features: ["Multiple variants", "AI opponents", "Animations", "Leaderboards"],
      developmentTime: "2-3 months",
      technologies: ["Unity", "C#", "Networking"],
      steps: [
        "Game logic implementation",
        "Card combination detection",
        "AI strategy development",
        "Animation system",
        "Multiplayer support",
      ],
    },
    {
      id: "ludo",
      title: "Ludo",
      subtitle: "Board Game",
      category: "board",
      image: "/ludo-board.png",
      description: "Classic ludo board game with multiplayer",
      features: ["4 player support", "AI opponents", "Animations", "Online play"],
      developmentTime: "2-3 months",
      technologies: ["Unity", "C#", "Networking"],
      steps: [
        "Board and piece logic",
        "Dice rolling system",
        "Movement validation",
        "AI player implementation",
        "Multiplayer synchronization",
      ],
    },
    {
      id: "chess",
      title: "Chess",
      subtitle: "Board Game",
      category: "board",
      image: "/chess-board-game.jpg",
      description: "Professional chess game with AI engine",
      features: ["AI opponent", "Move validation", "Game history", "Difficulty levels"],
      developmentTime: "3-4 months",
      technologies: ["Unity", "C#", "AI algorithms"],
      steps: [
        "Board representation",
        "Move validation system",
        "AI engine development",
        "Difficulty levels",
        "UI and animations",
      ],
    },
    {
      id: "carrom",
      title: "Carrom",
      subtitle: "Board Game",
      category: "board",
      image: "/carrom-board-game.jpg",
      description: "Physics-based carrom board game",
      features: ["Physics simulation", "Multiplayer", "Animations", "Customization"],
      developmentTime: "2-3 months",
      technologies: ["Unity", "C#", "Physics engine"],
      steps: [
        "Physics simulation setup",
        "Piece and striker mechanics",
        "Scoring system",
        "Multiplayer support",
        "UI implementation",
      ],
    },
    {
      id: "solitaire",
      title: "Solitaire",
      subtitle: "Card Game",
      category: "cards",
      image: "/solitaire-card-game.jpg",
      description: "Classic solitaire card game with multiple variants",
      features: ["Multiple variants", "Undo system", "Statistics", "Animations"],
      developmentTime: "1-2 months",
      technologies: ["Unity", "C#"],
      steps: [
        "Game rules implementation",
        "Card deck management",
        "Move validation",
        "Undo/Redo system",
        "UI and animations",
      ],
    },
  ]

  const filteredGames = filter === "all" ? games : games.filter((game) => game.category === filter)

  return (
    <section id="games" className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">My Game Portfolio</h2>
        <p className="text-slate-400 text-center mb-12 text-balance">
          A collection of professionally developed games across multiple genres
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {["all", "racing", "cards", "board"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                filter === cat
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} onClick={() => onSelectGame(game.id)} />
          ))}
        </div>
      </div>
    </section>
  )
}
