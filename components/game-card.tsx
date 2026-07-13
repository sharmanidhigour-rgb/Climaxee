"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface GameCardProps {
  game: {
    id: string
    title: string
    subtitle: string
    category: string
    image: string
    description: string
  }
  onClick: () => void
}

export default function GameCard({ game, onClick }: GameCardProps) {
  return (
    <Card
      className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden group cursor-pointer h-full flex flex-col hover:shadow-lg hover:shadow-cyan-500/20"
      onClick={onClick}
    >
      <div className="h-40 md:h-48 bg-slate-700 overflow-hidden relative">
        <img
          src={game.image || "/placeholder.svg"}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
      </div>

      <div className="p-4 md:p-6 flex flex-col flex-grow">
        <div className="mb-2">
          <h3 className="text-lg md:text-xl font-bold text-white">{game.title}</h3>
          <p className="text-sm text-cyan-400">{game.subtitle}</p>
        </div>
        <p className="text-slate-400 text-sm mb-4 flex-grow">{game.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full capitalize">
            {game.category}
          </span>
          <Button
            size="sm"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  )
}
