'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Shield, ArrowRight, CheckCircle2, AlertCircle, RefreshCcw, Brain, Zap, Terminal } from 'lucide-react'
import Link from 'next/link'

const questions = [
  {
    id: 1,
    question: "WHICH ARCHITECTURAL PATTERN IS BEST SUITED FOR HIGHLY SCALABLE, DECOUPLED SYSTEMS?",
    options: [
      { id: 'a', text: 'MONOLITHIC ARCHITECTURE' },
      { id: 'b', text: 'MICROSERVICES ARCHITECTURE' },
      { id: 'c', text: 'CLIENT-SERVER MODEL' },
      { id: 'd', text: 'SINGLE PAGE APPLICATION' }
    ],
    correct: 'b'
  },
  {
    id: 2,
    question: "IN REACT, WHICH HOOK IS PRIMARILY USED FOR MANAGING SIDE EFFECTS?",
    options: [
      { id: 'a', text: 'USESTATE' },
      { id: 'b', text: 'USECONTEXT' },
      { id: 'c', text: 'USEEFFECT' },
      { id: 'd', text: 'USEREDUCER' }
    ],
    correct: 'c'
  },
  {
    id: 3,
    question: "WHAT IS THE PRIMARY ADVANTAGE OF USING TYPESCRIPT OVER JAVASCRIPT?",
    options: [
      { id: 'a', text: 'FASTER EXECUTION SPEED' },
      { id: 'b', text: 'STATIC TYPE CHECKING' },
      { id: 'c', text: 'SMALLER BUNDLE SIZE' },
      { id: 'd', text: 'AUTOMATIC CODE GENERATION' }
    ],
    correct: 'b'
  },
  {
    id: 4,
    question: "WHICH HTTP METHOD IS TYPICALLY USED TO UPDATE AN EXISTING RESOURCE?",
    options: [
      { id: 'a', text: 'GET' },
      { id: 'b', text: 'POST' },
      { id: 'c', text: 'PUT/PATCH' },
      { id: 'd', text: 'DELETE' }
    ],
    correct: 'c'
  },
  {
    id: 5,
    question: "WHAT IS THE PURPOSE OF A LOAD BALANCER IN SYSTEM DESIGN?",
    options: [
      { id: 'a', text: 'ENCRYPTING DATA' },
      { id: 'b', text: 'DISTRIBUTING TRAFFIC ACROSS SERVERS' },
      { id: 'c', text: 'COMPILING SOURCE CODE' },
      { id: 'd', text: 'STORING USER SESSIONS' }
    ],
    correct: 'b'
  }
]

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isFinished, setIsFinished] = useState(false)
  const [score, setScore] = useState(0)
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleSelect = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: optionId }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      calculateScore()
      setIsFinished(true)
    }
  }

  const calculateScore = () => {
    let newScore = 0
    questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        newScore++
      }
    })
    setScore(newScore)
  }

  const reset = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setIsFinished(false)
    setScore(0)
    setIsInitializing(true)
    setTimeout(() => setIsInitializing(false), 2000)
  }

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center p-4">
        <div className="text-center space-y-8 max-w-md w-full">
          <motion.div
            animate={{ scale: [0.9, 1.1, 0.9], rotate: [0, 90, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 bg-neon-green/10 border border-neon-green/30 rounded-2xl mx-auto flex items-center justify-center"
          >
            <Brain className="w-10 h-10 text-neon-green" />
          </motion.div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black italic tracking-tighter uppercase">Initializing <span className="text-neon-green">Assessment Engine</span></h2>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-neon-green"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5 }}
              />
            </div>
          </div>
          <p className="text-[10px] font-black tracking-widest text-foreground/30 uppercase">Calibrating difficulty parameters...</p>
        </div>
      </div>
    )
  }

  if (isFinished) {
    const rank = score === 5 ? 'ELITE ARCHITECT' : score >= 3 ? 'SENIOR ENGINEER' : 'JUNIOR DEVELOPER'
    const recommendation = score === 5 ? 'FULL-STACK ARCHITECT' : score >= 3 ? 'FRONTEND LEAD' : 'BACKEND SPECIALIST'

    return (
      <div className="min-h-screen bg-deep-black py-24 px-4 cyber-grid">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-deep-black border border-white/5 rounded-[3rem] p-8 md:p-16 text-center space-y-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/5 rounded-full blur-3xl" />
            
            <div className="space-y-4">
              <Badge className="bg-neon-green/10 border-neon-green/30 text-neon-green font-black px-4 py-2">ASSESSMENT COMPLETE</Badge>
              <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">YOUR RANK: <span className="text-neon-green">{rank}</span></h1>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
                <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest mb-1">Score</p>
                <p className="text-4xl font-black italic text-neon-green">{score}/5</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
                <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest mb-1">Accuracy</p>
                <p className="text-4xl font-black italic text-neon-green">{score * 20}%</p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-foreground/50 text-lg">Based on your neural patterns, we recommend the following trajectory:</p>
              <div className="p-8 bg-neon-green/5 border border-neon-green/20 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter text-neon-green">{recommendation}</h3>
                  <p className="text-sm font-bold italic text-foreground/40 uppercase">Recommended Learning Sequence</p>
                </div>
                <Link href="/paths">
                  <Button size="lg" className="bg-neon-green text-deep-black font-black italic">
                    VIEW PATH <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={reset} variant="ghost" className="text-foreground/30 hover:text-white font-bold italic uppercase tracking-widest">
                <RefreshCcw className="mr-2 w-4 h-4" /> RETAKE ASSESSMENT
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  const q = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-deep-black py-24 px-4 cyber-grid flex items-center justify-center">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5 pb-8">
            <div className="space-y-2 text-center md:text-left">
              <Badge className="bg-neon-green/10 border-neon-green/30 text-neon-green font-black uppercase tracking-widest">RANK EVALUATION</Badge>
              <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase leading-none">CORE ARCHITECTURE <span className="text-neon-green">ASSESSMENT</span></h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">Question</p>
                <p className="text-2xl font-black italic text-neon-green">{currentQuestion + 1}/{questions.length}</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center">
                <Brain className="w-8 h-8 text-neon-green" />
              </div>
            </div>
          </div>

          {/* Question */}
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <h3 className="text-2xl md:text-4xl font-black italic leading-tight text-white/90">
              {q.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {q.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={`group p-8 text-left rounded-[2rem] border transition-all duration-300 relative overflow-hidden ${
                    answers[q.id] === opt.id
                      ? 'bg-neon-green border-none text-deep-black scale-[1.02] shadow-[0_0_30px_rgba(0,255,0,0.2)]'
                      : 'bg-white/5 border-white/5 text-foreground/50 hover:border-neon-green/30 hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="relative z-10 flex items-center gap-6">
                    <span className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl italic ${
                      answers[q.id] === opt.id ? 'bg-deep-black text-neon-green' : 'bg-white/5 text-foreground/20'
                    }`}>
                      {opt.id.toUpperCase()}
                    </span>
                    <span className="text-lg font-black italic uppercase tracking-tighter">{opt.text}</span>
                  </div>
                  {answers[q.id] === opt.id && (
                    <motion.div 
                      layoutId="check"
                      className="absolute right-8 top-1/2 -translate-y-1/2"
                    >
                      <CheckCircle2 className="w-8 h-8 text-deep-black" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center pt-8 border-t border-white/5">
              <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> SELECT ONE OPTION TO PROCEED
              </p>
              <Button
                onClick={handleNext}
                disabled={!answers[q.id]}
                size="lg"
                className={`h-16 px-10 font-black italic text-xl transition-all ${
                  answers[q.id] 
                    ? 'bg-neon-green text-deep-black shadow-[0_0_30px_rgba(0,255,0,0.3)]' 
                    : 'bg-white/5 text-foreground/20'
                }`}
              >
                {currentQuestion === questions.length - 1 ? 'FINISH EVALUATION' : 'NEXT MODULE'} <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
