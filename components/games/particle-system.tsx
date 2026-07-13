"use client"

import { useEffect, useRef } from "react"

export default function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      life: number
      color: string
    }

    const particles: Particle[] = []

    const createParticles = (x: number, y: number) => {
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 3 + 1
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      createParticles(x, y)
    }

    const gameLoop = () => {
      ctx.fillStyle = "rgba(30, 41, 59, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.1 // gravity
        p.life -= 0.02

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.fillStyle = p.color
        ctx.globalAlpha = p.life
        ctx.beginPath()
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1

      // Draw instructions
      ctx.fillStyle = "#94a3b8"
      ctx.font = "14px Arial"
      ctx.fillText("Move your mouse around", 20, 30)

      requestAnimationFrame(gameLoop)
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    gameLoop()

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-full flex justify-center">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border-2 border-slate-600 rounded-lg bg-slate-900 w-full max-w-md cursor-crosshair"
        />
      </div>
      <div className="text-center text-slate-300">
        <p className="text-sm">Interactive Particle System</p>
        <p className="text-xs text-slate-500 mt-2">Move your mouse to create particles</p>
      </div>
    </div>
  )
}
