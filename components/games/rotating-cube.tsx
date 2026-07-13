"use client"

import { useEffect, useRef } from "react"

export default function RotatingCube() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let rotationX = 0
    let rotationY = 0
    let rotationZ = 0

    const vertices = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1],
    ]

    const edges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ]

    const rotateX = (point: number[], angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [point[0], point[1] * cos - point[2] * sin, point[1] * sin + point[2] * cos]
    }

    const rotateY = (point: number[], angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [point[0] * cos + point[2] * sin, point[1], -point[0] * sin + point[2] * cos]
    }

    const rotateZ = (point: number[], angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [point[0] * cos - point[1] * sin, point[0] * sin + point[1] * cos, point[2]]
    }

    const project = (point: number[]) => {
      const scale = 300 / (8 + point[2])
      return [point[0] * scale + canvas.width / 2, point[1] * scale + canvas.height / 2]
    }

    const gameLoop = () => {
      ctx.fillStyle = "#1e293b"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      rotationX += 0.01
      rotationY += 0.015
      rotationZ += 0.005

      const rotatedVertices = vertices.map((v) => {
        let point = [...v]
        point = rotateX(point, rotationX)
        point = rotateY(point, rotationY)
        point = rotateZ(point, rotationZ)
        return point
      })

      // Draw edges
      ctx.strokeStyle = "#06b6d4"
      ctx.lineWidth = 2
      edges.forEach(([start, end]) => {
        const p1 = project(rotatedVertices[start])
        const p2 = project(rotatedVertices[end])
        ctx.beginPath()
        ctx.moveTo(p1[0], p1[1])
        ctx.lineTo(p2[0], p2[1])
        ctx.stroke()
      })

      // Draw vertices
      ctx.fillStyle = "#fbbf24"
      rotatedVertices.forEach((v) => {
        const p = project(v)
        ctx.beginPath()
        ctx.arc(p[0], p[1], 5, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(gameLoop)
    }

    gameLoop()
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
        <p className="text-sm">3D Rotating Cube</p>
        <p className="text-xs text-slate-500 mt-2">Watch it spin!</p>
      </div>
    </div>
  )
}
