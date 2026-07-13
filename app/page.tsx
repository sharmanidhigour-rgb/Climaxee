"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Hero from "@/components/hero"
import GamesShowcase from "@/components/games-showcase"
import GameDetail from "@/components/game-detail"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  if (selectedGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Header />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <Button
            onClick={() => setSelectedGame(null)}
            className="mb-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0"
          >
            ← Back to Portfolio
          </Button>
          <GameDetail gameId={selectedGame} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      <Hero />
      <GamesShowcase onSelectGame={setSelectedGame} />
      <Contact />
      <Footer />
    </div>
  )
}
