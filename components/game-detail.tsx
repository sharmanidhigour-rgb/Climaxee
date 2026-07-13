"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface GameDetailProps {
  gameId: string
}

export default function GameDetail({ gameId }: GameDetailProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const games: Record<string, any> = {
    "endless-racing": {
      title: "Endless Car Racing",
      subtitle: "Like Traffic Racer",
      image: "/endless-car-racing-game.jpg",
      description:
        "High-speed endless racing game with traffic dodging mechanics, similar to the popular Traffic Racer game.",
      features: ["Infinite gameplay", "Multiple cars", "Power-ups", "Leaderboards", "Daily challenges"],
      developmentTime: "3-4 months",
      technologies: ["Unity", "C#", "Mobile Optimization", "Firebase"],
      steps: [
        "Game design and mechanics planning",
        "Car physics and controls implementation",
        "Traffic AI system development",
        "UI/UX design and implementation",
        "Testing and optimization for mobile",
      ],
      details:
        "This endless racing game features smooth controls, realistic car physics, and challenging traffic patterns. Players can unlock multiple vehicles and compete on global leaderboards.",
    },
    "circuit-racing": {
      title: "Circuit Racing Game",
      subtitle: "Drift Challenge",
      image: "/circuit-racing-drift-game.jpg",
      description: "Professional circuit racing with advanced drift mechanics and multiplayer support.",
      features: ["Multiple tracks", "Drift system", "Car customization", "Multiplayer", "Replay system"],
      developmentTime: "4-5 months",
      technologies: ["Unity", "C#", "Networking", "Physics engine"],
      steps: [
        "Track design and creation",
        "Advanced physics engine setup",
        "Drift mechanics implementation",
        "Multiplayer networking",
        "Performance optimization",
      ],
      details:
        "Experience professional-grade circuit racing with realistic drift mechanics. Customize your vehicle, compete in tournaments, and challenge friends in multiplayer mode.",
    },
    "off-road-racing": {
      title: "Off-Road Racing",
      subtitle: "Truck Racing",
      image: "/off-road-truck-racing-game.jpg",
      description: "Extreme off-road and truck racing experience with terrain deformation.",
      features: ["Terrain deformation", "Vehicle damage", "Weather effects", "Customization", "Campaign mode"],
      developmentTime: "4-6 months",
      technologies: ["Unity", "C#", "Terrain tools", "Physics"],
      steps: [
        "Terrain generation and design",
        "Vehicle physics for off-road",
        "Damage system implementation",
        "Weather and environmental effects",
        "Testing and balancing",
      ],
      details:
        "Race through challenging off-road terrain with realistic truck physics. Experience dynamic weather, vehicle damage, and terrain deformation that affects gameplay.",
    },
    "teen-patti": {
      title: "Teen Patti",
      subtitle: "Card Game",
      image: "/teen-patti-card-game.jpg",
      description: "Classic Indian card game with multiplayer support and AI opponents.",
      features: ["AI opponents", "Multiplayer", "Betting system", "Animations", "Statistics"],
      developmentTime: "2-3 months",
      technologies: ["Unity", "C#", "Networking", "Database"],
      steps: [
        "Game rules implementation",
        "Card deck and shuffling system",
        "AI player logic",
        "Betting and chip system",
        "Multiplayer synchronization",
      ],
      details:
        "Play the classic Indian card game Teen Patti with realistic gameplay, smooth animations, and challenging AI opponents. Compete with friends in multiplayer mode.",
    },
    poker: {
      title: "Poker",
      subtitle: "Card Game",
      image: "/poker-card-game.jpg",
      description: "Professional poker game with realistic gameplay and tournament modes.",
      features: ["Multiple variants", "AI players", "Tournament mode", "Statistics", "Leaderboards"],
      developmentTime: "3-4 months",
      technologies: ["Unity", "C#", "Database", "Networking"],
      steps: [
        "Poker rules and hand evaluation",
        "AI decision making",
        "Tournament system",
        "Player statistics tracking",
        "UI implementation",
      ],
      details:
        "Experience professional poker with multiple game variants, realistic AI opponents, and tournament modes. Track your statistics and climb the leaderboards.",
    },
    rummy: {
      title: "Rummy",
      subtitle: "Card Game",
      image: "/rummy-card-game.png",
      description: "Strategic rummy card game with smooth gameplay and AI opponents.",
      features: ["Multiple variants", "AI opponents", "Animations", "Leaderboards", "Daily tournaments"],
      developmentTime: "2-3 months",
      technologies: ["Unity", "C#", "Networking"],
      steps: [
        "Game logic implementation",
        "Card combination detection",
        "AI strategy development",
        "Animation system",
        "Multiplayer support",
      ],
      details:
        "Play strategic rummy with smooth animations and intelligent AI opponents. Participate in daily tournaments and compete with players worldwide.",
    },
    ludo: {
      title: "Ludo",
      subtitle: "Board Game",
      image: "/ludo-board.png",
      description: "Classic ludo board game with 4-player support and online multiplayer.",
      features: ["4 player support", "AI opponents", "Animations", "Online play", "Tournaments"],
      developmentTime: "2-3 months",
      technologies: ["Unity", "C#", "Networking"],
      steps: [
        "Board and piece logic",
        "Dice rolling system",
        "Movement validation",
        "AI player implementation",
        "Multiplayer synchronization",
      ],
      details:
        "Play the classic board game Ludo with up to 4 players. Challenge AI opponents or play with friends online in real-time multiplayer matches.",
    },
    chess: {
      title: "Chess",
      subtitle: "Board Game",
      image: "/chess-board-game.jpg",
      description: "Professional chess game with AI engine and multiple difficulty levels.",
      features: ["AI opponent", "Move validation", "Game history", "Difficulty levels", "Tutorials"],
      developmentTime: "3-4 months",
      technologies: ["Unity", "C#", "AI algorithms"],
      steps: [
        "Board representation",
        "Move validation system",
        "AI engine development",
        "Difficulty levels",
        "UI and animations",
      ],
      details:
        "Play chess against an intelligent AI engine with adjustable difficulty levels. Learn from game history and improve your skills with built-in tutorials.",
    },
    carrom: {
      title: "Carrom",
      subtitle: "Board Game",
      image: "/carrom-board-game.jpg",
      description: "Physics-based carrom board game with multiplayer support.",
      features: ["Physics simulation", "Multiplayer", "Animations", "Customization", "Tournaments"],
      developmentTime: "2-3 months",
      technologies: ["Unity", "C#", "Physics engine"],
      steps: [
        "Physics simulation setup",
        "Piece and striker mechanics",
        "Scoring system",
        "Multiplayer support",
        "UI implementation",
      ],
      details:
        "Experience realistic carrom gameplay with accurate physics simulation. Play against AI or challenge friends in multiplayer matches.",
    },
    solitaire: {
      title: "Solitaire",
      subtitle: "Card Game",
      image: "/solitaire-card-game.jpg",
      description: "Classic solitaire card game with multiple variants and smooth animations.",
      features: ["Multiple variants", "Undo system", "Statistics", "Animations", "Daily challenges"],
      developmentTime: "1-2 months",
      technologies: ["Unity", "C#"],
      steps: [
        "Game rules implementation",
        "Card deck management",
        "Move validation",
        "Undo/Redo system",
        "UI and animations",
      ],
      details:
        "Play classic solitaire with multiple game variants. Track your statistics and complete daily challenges to earn rewards.",
    },
  }

  const game = games[gameId]

  if (!game) {
    return <div className="text-white text-center py-12">Game not found</div>
  }

  return (
    <div
      className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      {/* Game Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="rounded-xl overflow-hidden shadow-2xl shadow-cyan-500/20">
          <img src={game.image || "/placeholder.svg"} alt={game.title} className="w-full h-auto" />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{game.title}</h1>
          <p className="text-xl text-cyan-400 mb-6">{game.subtitle}</p>
          <p className="text-slate-300 text-lg mb-8">{game.description}</p>

          <div className="space-y-6">
            {/* Development Time */}
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-2">DEVELOPMENT TIME</h3>
              <p className="text-2xl font-bold text-cyan-400">{game.developmentTime}</p>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-3">TECHNOLOGIES</h3>
              <div className="flex flex-wrap gap-2">
                {game.technologies.map((tech: string) => (
                  <Badge key={tech} className="bg-cyan-500/20 text-cyan-300 border-cyan-500/50">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <Card className="bg-slate-800/50 border-slate-700 p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {game.features.map((feature: string) => (
            <div key={feature} className="flex items-center gap-3">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span className="text-slate-300">{feature}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Development Steps */}
      <Card className="bg-slate-800/50 border-slate-700 p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Development Steps</h2>
        <div className="space-y-4">
          {game.steps.map((step: string, index: number) => (
            <div key={step} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              <div className="flex-grow">
                <p className="text-slate-300">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Details */}
      <Card className="bg-slate-800/50 border-slate-700 p-8">
        <h2 className="text-2xl font-bold text-white mb-4">About This Game</h2>
        <p className="text-slate-300 text-lg leading-relaxed">{game.details}</p>
      </Card>
    </div>
  )
}
