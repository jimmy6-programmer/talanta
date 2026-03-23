'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const courseSlug = searchParams.get('course')
  const [countdown, setCountdown] = useState(8)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/dashboard')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-green/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="w-full max-w-lg text-center relative z-10 space-y-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mx-auto w-28 h-28 bg-neon-green/10 border-2 border-neon-green/30 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(0,255,0,0.2)]"
        >
          <CheckCircle2 className="w-14 h-14 text-neon-green" />
        </motion.div>

        <div className="space-y-3">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[10px] font-black tracking-widest text-neon-green uppercase"
          >
            TRANSACTION CONFIRMED
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl font-black italic tracking-tighter uppercase"
          >
            ACCESS <span className="text-neon-green">GRANTED</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-foreground/50 leading-relaxed"
          >
            Your payment was successful. You now have full lifetime access to the course. Time to level up.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6 space-y-4"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground/40 font-mono uppercase tracking-widest">Status</span>
            <span className="text-neon-green font-black flex items-center gap-1">
              <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              ACTIVE
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground/40 font-mono uppercase tracking-widest">Access Level</span>
            <span className="font-black text-white">LIFETIME</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground/40 font-mono uppercase tracking-widest">Redirecting in</span>
            <span className="font-black text-neon-green font-mono">{countdown}s</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3"
        >
            <Link href="/dashboard" className="flex-1">
              <Button className="w-full h-12 bg-neon-green text-deep-black font-black italic uppercase shadow-[0_0_20px_rgba(0,255,0,0.3)]">
                <BookOpen className="w-4 h-4 mr-2" />
                GO TO DASHBOARD
              </Button>
            </Link>
            {courseSlug && (
              <Link href={`/courses/${courseSlug}`} className="flex-1">
                <Button variant="outline" className="w-full h-12 border-white/10 hover:border-neon-green/30 font-black italic uppercase">
                  VIEW COURSE
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}

        </motion.div>
      </motion.div>
    </div>
  )
}
