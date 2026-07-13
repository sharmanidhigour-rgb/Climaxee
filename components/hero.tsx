"use client"

import { useEffect, useState } from "react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const APK_LINK = "https://drive.google.com/file/d/1auvsqnjwb0vI86tnAj7rK-ZSehv15Jxt/view?usp=drive_link"

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative px-4 md:px-8 py-16 md:py-32 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/custom-rad-hero-bg-video-dBkrQjJQUOVza1n4LvSd2znHnB7exA.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Animated background elements overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">Professional Game Developer</h2>
          <p className="text-lg md:text-xl text-slate-300 mb-4 text-balance">Specialized in Unity Game Development</p>
          <p className="text-base md:text-lg text-cyan-400 mb-8 text-balance">
            Car Racing • Motor Biking • Truck Racing • Card Games • Board Games • Endless Racing
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#games"
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition transform hover:scale-105"
            >
              View My Games
            </a>
            <a
              href={APK_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition transform hover:scale-105"
            >
              📱 My Games APK
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border-2 border-cyan-500 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-500/10 transition"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
