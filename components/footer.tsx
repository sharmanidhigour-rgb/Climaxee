"use client"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-700/50 bg-slate-950/50 px-4 md:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Climaxee</h3>
            <p className="text-slate-400 text-sm">
              Professional game developer specializing in Unity game development with expertise in racing games, card
              games, and board games.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#games" className="text-slate-400 hover:text-cyan-400 transition">
                  My Games
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-cyan-400 transition">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="mailto:sharmahimanshu40000@gmail.com"
                  className="text-slate-400 hover:text-cyan-400 transition"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-400">
                Email:{" "}
                <a href="mailto:sharmahimanshu40000@gmail.com" className="text-cyan-400 hover:text-cyan-300">
                  sharmahimanshu40000@gmail.com
                </a>
              </li>
              <li className="text-slate-400">
                Phone:{" "}
                <a href="tel:+919783388579" className="text-cyan-400 hover:text-cyan-300">
                  +91 9783388579
                </a>
              </li>
              <li className="text-slate-400">
                WhatsApp:{" "}
                <a
                  href="https://wa.me/919783388579"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  Chat Now
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700/50 pt-8 mb-8">
          <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-lg p-6 border border-slate-700/50">
            <h3 className="text-lg font-bold text-cyan-400 mb-3">Developer</h3>
            <div className="space-y-2">
              <p className="text-white font-semibold">Himanshu Sharma</p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Senior Unity Game Developer & Software Engineer with extensive experience in game development.
                Specialized in creating engaging gaming experiences including:
              </p>
              <ul className="text-slate-400 text-sm space-y-1 ml-4">
                <li>
                  • <span className="text-cyan-400">Racing Games:</span> Car Racing, Motor Biking, Truck Racing, Endless
                  Car Racing, Circuit Racing, Drift Challenge, Off-road Games, etc.
                </li>
                <li>
                  • <span className="text-cyan-400">Card Games:</span> Teen Patti, Poker, Rummy, Blackjack, Solitaire
                  Card Games, etc.
                </li>
                <li>
                  • <span className="text-cyan-400">Board Games:</span> Ludo, Chess, Carrom, Solitaire, Dominoes, Dice
                  Games, etc.
                </li>
                <li>
                  • <span className="text-cyan-400">Multiplayer Games:</span> Online Tournaments, Real-time Gaming,
                  Social Features, etc.
                </li>
              </ul>
              <p className="text-slate-400 text-sm mt-3">
                Passionate about delivering high-quality, optimized games with smooth gameplay and engaging user
                experiences.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700/50 pt-8 text-center text-slate-400 text-sm">
          <p>© {currentYear} Climaxee. All rights reserved.</p>
          <p className="mt-2">Professional Game Developer | Unity Specialist</p>
        </div>
      </div>
    </footer>
  )
}
