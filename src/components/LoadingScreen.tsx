'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SquareTerminal } from 'lucide-react'

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.floor(Math.random() * 5) + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] bg-deep-black flex items-center justify-center overflow-hidden"
        >
          {/* Cyberpunk grid background */}
          <div className="absolute inset-0 opacity-10 cyber-grid" />
          
          <div className="relative z-10 w-full max-w-md px-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-12"
            >
              <div className="w-20 h-20 bg-neon-green rounded-xl mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(0,255,0,0.4)]">
                <SquareTerminal className="text-deep-black w-10 h-10" />
              </div>
              <h2 className="mt-6 text-3xl font-black tracking-tighter text-white uppercase italic">
                TALANTA <span className="text-neon-green">SYSTEMS</span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-black tracking-[0.3em] text-neon-green uppercase">
                  Initializing Neural Link
                </span>
                <span className="text-2xl font-black italic text-neon-green">
                  {Math.min(progress, 100)}%
                </span>
              </div>
              
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  className="h-full bg-neon-green shadow-[0_0_15px_rgba(0,255,0,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              
              <div className="flex justify-between text-[8px] font-bold text-foreground/30 uppercase tracking-widest">
                <span>Sector 7G</span>
                <span>Buffer Verified</span>
                <span>Data Secure</span>
              </div>
            </div>

            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-12 text-[10px] text-foreground/20 font-medium uppercase tracking-[0.5em]"
            >
              Establishing Secure Connection...
            </motion.div>
          </div>

          {/* Decorative scanline */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/2 w-full animate-scanline" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
