"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const makeAIMove = (currentBoard: (string | null)[]) => {
    const emptySquares = currentBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null) as number[]

    if (emptySquares.length === 0) return currentBoard

    // Simple AI: try to win, block player, or pick random
    const newBoard = [...currentBoard]

    // Check if AI can win
    for (const i of emptySquares) {
      newBoard[i] = "O"
      if (calculateWinner(newBoard) === "O") return newBoard
      newBoard[i] = null
    }

    // Check if player can win and block
    for (const i of emptySquares) {
      newBoard[i] = "X"
      if (calculateWinner(newBoard) === "X") {
        newBoard[i] = "O"
        return newBoard
      }
      newBoard[i] = null
    }

    // Pick random
    const randomIdx = emptySquares[Math.floor(Math.random() * emptySquares.length)]
    newBoard[randomIdx] = "O"
    return newBoard
  }

  const handleClick = (index: number) => {
    if (board[index] || gameOver) return

    const newBoard = [...board]
    newBoard[index] = "X"
    setBoard(newBoard)

    const w = calculateWinner(newBoard)
    if (w) {
      setWinner(w)
      setGameOver(true)
      return
    }

    if (newBoard.every((val) => val !== null)) {
      setGameOver(true)
      return
    }

    const aiBoard = makeAIMove(newBoard)
    setBoard(aiBoard)

    const aiWinner = calculateWinner(aiBoard)
    if (aiWinner) {
      setWinner(aiWinner)
      setGameOver(true)
      return
    }

    if (aiBoard.every((val) => val !== null)) {
      setGameOver(true)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setGameOver(false)
    setWinner(null)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Tic Tac Toe</h2>
        <p className="text-slate-400">Play against AI</p>
      </div>

      <div className="grid grid-cols-3 gap-2 bg-slate-700 p-4 rounded-lg">
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 md:w-24 md:h-24 bg-slate-800 border-2 border-slate-600 rounded-lg text-3xl md:text-4xl font-bold text-white hover:bg-slate-700 transition-colors"
          >
            {value === "X" && <span className="text-blue-400">X</span>}
            {value === "O" && <span className="text-red-400">O</span>}
          </button>
        ))}
      </div>

      {gameOver && (
        <div className="text-center">
          {winner ? (
            <p className="text-xl font-bold text-white mb-4">{winner === "X" ? "🎉 You Won!" : "🤖 AI Won!"}</p>
          ) : (
            <p className="text-xl font-bold text-white mb-4">It's a Draw!</p>
          )}
          <Button
            onClick={resetGame}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
          >
            Play Again
          </Button>
        </div>
      )}
    </div>
  )
}
