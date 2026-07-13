"use client"

import { useEffect, useRef, useState } from "react"

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const gameStateRef = useRef({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    score: 0,
    gameRunning: true,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const GRID_SIZE = 20
    const TILE_COUNT = 20

    const handleKeyPress = (e: KeyboardEvent) => {
      const state = gameStateRef.current
      switch (e.key.toLowerCase()) {
        case "arrowup":
        case "w":
          if (state.direction.y === 0) state.nextDirection = { x: 0, y: -1 }
          break
        case "arrowdown":
        case "s":
          if (state.direction.y === 0) state.nextDirection = { x: 0, y: 1 }
          break
        case "arrowleft":
        case "a":
          if (state.direction.x === 0) state.nextDirection = { x: -1, y: 0 }
          break
        case "arrowright":
        case "d":
          if (state.direction.x === 0) state.nextDirection = { x: 1, y: 0 }
          break
        case " ":
          if (!state.gameRunning) resetGame()
          break
      }
    }

    const resetGame = () => {
      gameStateRef.current = {
        snake: [{ x: 10, y: 10 }],
        food: { x: 15, y: 15 },
        direction: { x: 1, y: 0 },
        nextDirection: { x: 1, y: 0 },
        score: 0,
        gameRunning: true,
      }
      setGameOver(false)
      setScore(0)
    }

    let frameCount = 0
    const gameLoop = () => {
      const state = gameStateRef.current

      ctx.fillStyle = "#1e293b"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (state.gameRunning) {
        frameCount++
        if (frameCount % 5 === 0) {
          state.direction = state.nextDirection
          const head = state.snake[0]
          const newHead = {
            x: head.x + state.direction.x,
            y: head.y + state.direction.y,
          }

          if (
            newHead.x < 0 ||
            newHead.x >= TILE_COUNT ||
            newHead.y < 0 ||
            newHead.y >= TILE_COUNT ||
            state.snake.some((s) => s.x === newHead.x && s.y === newHead.y)
          ) {
            state.gameRunning = false
            setGameOver(true)
          } else {
            state.snake.unshift(newHead)

            if (newHead.x === state.food.x && newHead.y === state.food.y) {
              state.score++
              setScore(state.score)
              state.food = {
                x: Math.floor(Math.random() * TILE_COUNT),
                y: Math.floor(Math.random() * TILE_COUNT),
              }
            } else {
              state.snake.pop()
            }
          }
        }
      }

      // Draw grid
      ctx.strokeStyle = "#334155"
      ctx.lineWidth = 0.5
      for (let i = 0; i <= TILE_COUNT; i++) {
        ctx.beginPath()
        ctx.moveTo(i * GRID_SIZE, 0)
        ctx.lineTo(i * GRID_SIZE, canvas.height)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, i * GRID_SIZE)
        ctx.lineTo(canvas.width, i * GRID_SIZE)
        ctx.stroke()
      }

      // Draw snake
      ctx.fillStyle = "#10b981"
      state.snake.forEach((segment, index) => {
        if (index === 0) ctx.fillStyle = "#34d399"
        ctx.fillRect(segment.x * GRID_SIZE + 1, segment.y * GRID_SIZE + 1, GRID_SIZE - 2, GRID_SIZE - 2)
        if (index === 0) ctx.fillStyle = "#10b981"
      })

      // Draw food
      ctx.fillStyle = "#ef4444"
      ctx.fillRect(state.food.x * GRID_SIZE + 1, state.food.y * GRID_SIZE + 1, GRID_SIZE - 2, GRID_SIZE - 2)

      // Draw score
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 20px Arial"
      ctx.fillText(`Score: ${state.score}`, 10, 25)

      if (!state.gameRunning) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 28px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 20)
        ctx.font = "18px Arial"
        ctx.fillText(`Score: ${state.score}`, canvas.width / 2, canvas.height / 2 + 20)
        ctx.fillText("Press SPACE to Restart", canvas.width / 2, canvas.height / 2 + 50)
      }

      requestAnimationFrame(gameLoop)
    }

    window.addEventListener("keydown", handleKeyPress)
    gameLoop()

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-full flex justify-center">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border-2 border-slate-600 rounded-lg bg-slate-900 w-full max-w-md"
        />
      </div>
      <div className="text-center text-slate-300">
        <p className="text-sm">Use Arrow Keys or WASD to Move</p>
        <p className="text-xs text-slate-500 mt-2">Eat the red food, avoid yourself!</p>
      </div>
    </div>
  )
}
