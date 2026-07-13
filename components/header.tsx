"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const APK_LINK = "https://drive.google.com/file/d/1auvsqnjwb0vI86tnAj7rK-ZSehv15Jxt/view?usp=drive_link"

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <span className="text-white font-bold text-xl">HS</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Climaxee
                </h1>
                <p className="text-xs text-cyan-400">Game Developer</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#games" className="text-slate-300 hover:text-cyan-400 transition">
                Games
              </a>
              <a href="#contact" className="text-slate-300 hover:text-cyan-400 transition">
                Contact
              </a>
              <div className="relative group">
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition font-semibold flex items-center gap-2">
                  📱 My Games
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-cyan-500/30 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <a
                    href={APK_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-t-lg transition"
                  >
                    📥 Download APK
                  </a>
                  <a
                    href="#games"
                    className="block px-4 py-3 text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-b-lg transition"
                  >
                    🎮 View All Games
                  </a>
                </div>
              </div>
              <a
                href="https://wa.me/919783388579"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition"
              >
                WhatsApp
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <nav ref={menuRef} className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-slate-700 pt-4">
              <a
                href="#games"
                className="text-slate-300 hover:text-cyan-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Games
              </a>
              <a
                href="#contact"
                className="text-slate-300 hover:text-cyan-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
              <div className="flex flex-col gap-2">
                <a
                  href={APK_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg text-center font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  📱 My Games - APK
                </a>
              </div>
              <a
                href="https://wa.me/919783388579"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-center"
              >
                WhatsApp
              </a>
            </nav>
          )}
        </div>
      </header>
    </>
  )
}
