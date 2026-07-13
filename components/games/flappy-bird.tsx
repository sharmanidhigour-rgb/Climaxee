"use client"

import { useEffect, useRef, useState } from "react"

export default function FlappyBird() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const gameStateRef = useRef({
    birdY: 150,
    birdVelocity: 0,
    pipes: [] as Array<{ x: number; gap: number }>,
    score: 0,
    gameRunning: true,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const GRAVITY = 0.6
    const JUMP_STRENGTH = -12
    const PIPE_WIDTH = 60
    const PIPE_GAP = 120
    const PIPE_SPEED = 4

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault()
        if (gameStateRef.current.gameRunning) {
          gameStateRef.current.birdVelocity = JUMP_STRENGTH
        } else {
          resetGame()
        }
      }
    }

    const handleClick = () => {
      if (gameStateRef.current.gameRunning) {
        gameStateRef.current.birdVelocity = JUMP_STRENGTH
      } else {
        resetGame()
      }
    }

    const resetGame = () => {
      gameStateRef.current = {
        birdY: 150,
        birdVelocity: 0,
        pipes: [],
        score: 0,
        gameRunning: true,
      }
      setGameOver(false)
      setScore(0)
    }

    const gameLoop = () => {
      const state = gameStateRef.current

      // Clear canvas
      ctx.fillStyle = "#1e293b"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (state.gameRunning) {
        // Update bird
        state.birdVelocity += GRAVITY
        state.birdY += state.birdVelocity

        // Check collision with ground/ceiling
        if (state.birdY > canvas.height - 30 || state.birdY < 0) {
          state.gameRunning = false
          setGameOver(true)
        }

        // Generate pipes
        if (state.pipes.length === 0 || state.pipes[state.pipes.length - 1].x < canvas.width - 200) {
          state.pipes.push({
            x: canvas.width,
            gap: Math.random() * (canvas.height - PIPE_GAP - 100) + 50,
          })
        }

        // Update pipes
        state.pipes = state.pipes.filter((pipe) => {
          pipe.x -= PIPE_SPEED

          // Check collision
          if (state.birdY - 15 < pipe.gap || state.birdY + 15 > pipe.gap + PIPE_GAP) {
            if (state.birdY - 15 > pipe.x && state.birdY + 15 < pipe.x + PIPE_WIDTH) {
              state.gameRunning = false
              setGameOver(true)
            }
          }

          // Score
          if (pipe.x === canvas.width / 2) {
            state.score++
            setScore(state.score)
          }

          return pipe.x > -PIPE_WIDTH
        })

        // Draw pipes
        ctx.fillStyle = "#10b981"
        state.pipes.forEach((pipe) => {
          ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.gap)
          ctx.fillRect(pipe.x, pipe.gap + PIPE_GAP, PIPE_WIDTH, canvas.height)
        })
      }

      // Draw bird
      ctx.fillStyle = "#fbbf24"
      ctx.beginPath()
      ctx.arc(50, state.birdY, 15, 0, Math.PI * 2)
      ctx.fill()

      // Draw score
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 24px Arial"
      ctx.fillText(`Score: ${state.score}`, 20, 40)

      if (!state.gameRunning) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 32px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 20)
        ctx.font = "20px Arial"
        ctx.fillText(`Final Score: ${state.score}`, canvas.width / 2, canvas.height / 2 + 20)
        ctx.fillText("Click to Restart", canvas.width / 2, canvas.height / 2 + 60)
      }

      requestAnimationFrame(gameLoop)
    }

    window.addEventListener("keydown", handleKeyPress)
    canvas.addEventListener("click", handleClick)
    gameLoop()

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      canvas.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-full flex justify-center">
        <canvas
          ref={canvasRef}
          width={400}
          height={600}
          className="border-2 border-slate-600 rounded-lg bg-slate-900 w-full max-w-md"
        />
      </div>
      <div className="text-center text-slate-300">
        <p className="text-sm">Press SPACE or Click to Jump</p>
        <p className="text-xs text-slate-500 mt-2">Avoid the pipes!</p>
      </div>
    </div>
  )
}
