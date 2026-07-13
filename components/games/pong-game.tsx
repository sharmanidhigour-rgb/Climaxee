"use client"

import { useEffect, useRef, useState } from "react"

export default function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameOver, setGameOver] = useState(false)
  const [scores, setScores] = useState({ player: 0, ai: 0 })
  const gameStateRef = useRef({
    ballX: 200,
    ballY: 150,
    ballSpeedX: 5,
    ballSpeedY: 5,
    playerY: 100,
    aiY: 100,
    playerScore: 0,
    aiScore: 0,
    gameRunning: true,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const PADDLE_HEIGHT = 80
    const PADDLE_WIDTH = 10
    const BALL_SIZE = 8

    const handleKeyPress = (e: KeyboardEvent) => {
      const state = gameStateRef.current
      if (e.key === "w" || e.key === "W") {
        state.playerY = Math.max(0, state.playerY - 20)
      } else if (e.key === "s" || e.key === "S") {
        state.playerY = Math.min(canvas.height - PADDLE_HEIGHT, state.playerY + 20)
      } else if (e.code === "Space" && !state.gameRunning) {
        resetGame()
      }
    }

    const resetGame = () => {
      gameStateRef.current = {
        ballX: 200,
        ballY: 150,
        ballSpeedX: 5,
        ballSpeedY: 5,
        playerY: 100,
        aiY: 100,
        playerScore: 0,
        aiScore: 0,
        gameRunning: true,
      }
      setGameOver(false)
      setScores({ player: 0, ai: 0 })
    }

    const gameLoop = () => {
      const state = gameStateRef.current

      ctx.fillStyle = "#1e293b"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (state.gameRunning) {
        // Update ball
        state.ballX += state.ballSpeedX
        state.ballY += state.ballSpeedY

        // Ball collision with top/bottom
        if (state.ballY - BALL_SIZE < 0 || state.ballY + BALL_SIZE > canvas.height) {
          state.ballSpeedY *= -1
        }

        // Ball collision with paddles
        if (
          state.ballX - BALL_SIZE < PADDLE_WIDTH &&
          state.ballY > state.playerY &&
          state.ballY < state.playerY + PADDLE_HEIGHT
        ) {
          state.ballSpeedX *= -1
          state.ballX = PADDLE_WIDTH + BALL_SIZE
        }

        if (
          state.ballX + BALL_SIZE > canvas.width - PADDLE_WIDTH &&
          state.ballY > state.aiY &&
          state.ballY < state.aiY + PADDLE_HEIGHT
        ) {
          state.ballSpeedX *= -1
          state.ballX = canvas.width - PADDLE_WIDTH - BALL_SIZE
        }

        // AI movement
        const aiCenter = state.aiY + PADDLE_HEIGHT / 2
        if (aiCenter < state.ballY - 35) {
          state.aiY += 4
        } else if (aiCenter > state.ballY + 35) {
          state.aiY -= 4
        }
        state.aiY = Math.max(0, Math.min(canvas.height - PADDLE_HEIGHT, state.aiY))

        // Scoring
        if (state.ballX < 0) {
          state.aiScore++
          setScores({ player: state.playerScore, ai: state.aiScore })
          state.ballX = 200
          state.ballY = 150
          state.ballSpeedX = 5
          state.ballSpeedY = 5
        } else if (state.ballX > canvas.width) {
          state.playerScore++
          setScores({ player: state.playerScore, ai: state.aiScore })
          state.ballX = 200
          state.ballY = 150
          state.ballSpeedX = -5
          state.ballSpeedY = 5
        }
      }

      // Draw paddles
      ctx.fillStyle = "#3b82f6"
      ctx.fillRect(0, state.playerY, PADDLE_WIDTH, PADDLE_HEIGHT)
      ctx.fillStyle = "#ef4444"
      ctx.fillRect(canvas.width - PADDLE_WIDTH, state.aiY, PADDLE_WIDTH, PADDLE_HEIGHT)

      // Draw ball
      ctx.fillStyle = "#fbbf24"
      ctx.beginPath()
      ctx.arc(state.ballX, state.ballY, BALL_SIZE, 0, Math.PI * 2)
      ctx.fill()

      // Draw center line
      ctx.strokeStyle = "#475569"
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2, 0)
      ctx.lineTo(canvas.width / 2, canvas.height)
      ctx.stroke()
      ctx.setLineDash([])

      // Draw scores
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 32px Arial"
      ctx.textAlign = "center"
      ctx.fillText(state.playerScore.toString(), canvas.width / 4, 50)
      ctx.fillText(state.aiScore.toString(), (canvas.width * 3) / 4, 50)

      if (!state.gameRunning) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 28px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 20)
        ctx.font = "18px Arial"
        ctx.fillText("Press SPACE to Restart", canvas.width / 2, canvas.height / 2 + 20)
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
          height={300}
          className="border-2 border-slate-600 rounded-lg bg-slate-900 w-full max-w-md"
        />
      </div>
      <div className="text-center text-slate-300">
        <p className="text-sm">Use W/S to Move Your Paddle (Left)</p>
        <p className="text-xs text-slate-500 mt-2">Play against AI!</p>
      </div>
    </div>
  )
}
