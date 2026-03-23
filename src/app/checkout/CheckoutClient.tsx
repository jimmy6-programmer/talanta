'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { motion } from 'framer-motion'
import { Shield, Zap, Lock, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Course {
  id: string
  title: string
  slug: string
  price: number
  thumbnail_url: string | null
  description: string | null
  difficulty: string | null
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const courseId = searchParams.get('course')

  const [course, setCourse] = useState<Course | null>(null)
  const [plan, setPlan] = useState<{ name: string, price: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [redirecting, setRedirecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    async function init() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        const currentPath = window.location.pathname + window.location.search
        router.push('/login?redirect=' + encodeURIComponent(currentPath))
        return
      }

      setUserId(user.id)

      const planParam = searchParams.get('plan')
      if (planParam) {
        const plans: Record<string, { name: string, price: number }> = {
          monthly: { name: 'Monthly All-Access', price: 29 },
          annual: { name: 'Annual All-Access', price: 249 }
        }
        if (plans[planParam]) {
          setPlan(plans[planParam])
          setLoading(false)
          return
        }
      }

      if (!courseId) {
        setError('No course or plan selected.')
        setLoading(false)
        return
      }

      const { data, error: courseError } = await supabase
        .from('courses')
        .select('id, title, slug, price, thumbnail_url, description, difficulty')
        .eq('id', courseId)
        .single()

      if (courseError || !data) {
        setError('Course not found.')
        setLoading(false)
        return
      }

      const { data: enrollment } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .single()

      if (enrollment) {
        router.push('/dashboard')
        return
      }

      setCourse(data)
      setLoading(false)
    }

    init()
  }, [courseId, searchParams, router])

  async function handleCheckout() {
    if ((!course && !plan) || !userId || redirecting) return
    setRedirecting(true)
    setError(null)

    try {
      const body = course 
        ? { courseId: course.id, userId }
        : { plan: plan?.name, userId, price: plan?.price }

      const res = await fetch('/api/checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok || !data.url) {
        setError(data.error || 'Failed to create checkout session.')
        setRedirecting(false)
        return
      }

      window.parent.postMessage({ type: 'OPEN_EXTERNAL_URL', data: { url: data.url } }, '*')
      window.location.href = data.url
    } catch {
      setError('Network error. Please try again.')
      setRedirecting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-neon-green border-t-transparent rounded-full animate-spin" />
          <p className="text-foreground/40 font-mono text-sm tracking-widest uppercase">INITIALIZING...</p>
        </div>
      </div>
    )
  }

  if (error && !course && !plan) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4 p-8 bg-white/5 border border-red-500/20 rounded-2xl max-w-md">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto" />
          <p className="text-red-400 font-mono">{error}</p>
          <Button onClick={() => router.push('/courses')} variant="outline" className="border-white/10">
            BACK TO COURSES
          </Button>
        </div>
      </div>
    )
  }

  if (!course && !plan) return null

  const itemTitle = course ? course.title.toUpperCase() : plan?.name.toUpperCase()
  const itemPrice = course ? course.price : plan?.price || 0
  const itemDifficulty = course ? course.difficulty : 'ALL ACCESS'
  const isSubscription = !!plan

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-green/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="text-center mb-8 space-y-2">
          <p className="text-[10px] font-black tracking-widest text-neon-green uppercase">SECURE CHECKOUT</p>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">CONFIRM <span className="text-neon-green">ORDER</span></h1>
        </div>

        <div className="bg-zinc-900/80 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm shadow-[0_0_60px_rgba(0,255,0,0.04)]">
          <div className="p-8 space-y-6">
            <div className="flex items-start gap-4 p-5 bg-white/5 border border-white/5 rounded-2xl">
              <div className="w-16 h-16 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center flex-shrink-0">
                <Zap className="w-8 h-8 text-neon-green" />
              </div>
              <div className="space-y-1 min-w-0">
                <p className="text-[10px] text-foreground/30 font-black tracking-widest uppercase">{isSubscription ? 'SUBSCRIPTION' : 'COURSE MODULE'}</p>
                <h2 className="font-black italic text-lg leading-tight line-clamp-2">{itemTitle}</h2>
                {itemDifficulty && (
                  <span className="inline-block text-[10px] text-neon-green font-black tracking-widest uppercase border border-neon-green/20 rounded px-2 py-0.5">
                    {itemDifficulty}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-foreground/40 font-mono">{isSubscription ? 'PLAN PRICE' : 'COURSE PRICE'}</span>
                <span className="font-bold">${Number(itemPrice).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-foreground/40 font-mono">{isSubscription ? 'UNLIMITED ACCESS' : 'LIFETIME ACCESS'}</span>
                <span className="text-neon-green font-bold">INCLUDED</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-foreground/40 font-mono">CERTIFICATE</span>
                <span className="text-neon-green font-bold">INCLUDED</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                <span className="font-black italic text-lg uppercase">TOTAL</span>
                <span className="font-black italic text-3xl text-neon-green">${Number(itemPrice).toFixed(2)}</span>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
              >
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span className="font-mono">{error}</span>
              </motion.div>
            )}

            <Button
              onClick={handleCheckout}
              disabled={redirecting}
              className="w-full h-14 bg-neon-green text-deep-black font-black italic text-lg uppercase tracking-wider shadow-[0_0_30px_rgba(0,255,0,0.3)] hover:shadow-[0_0_50px_rgba(0,255,0,0.5)] transition-all duration-300 disabled:opacity-50"
            >
              {redirecting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-deep-black border-t-transparent rounded-full animate-spin" />
                  REDIRECTING...
                </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    PROCEED TO PAYMENT ${Number(itemPrice).toFixed(2)}
                  </span>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-foreground/30 text-xs">
                <Shield className="w-3 h-3" />
                <span className="font-mono uppercase tracking-widest">Secured by Stripe · 256-bit encryption</span>
              </div>
            </div>

            <div className="px-8 pb-6">
              <p className="text-center text-[10px] text-foreground/20 font-mono uppercase tracking-widest">
                You will be redirected to Stripe's secure payment page. 30-day refund policy applies.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push(course ? `/courses/${course.slug}` : '/subscribe')}
              className="text-foreground/30 hover:text-foreground/60 text-sm font-mono uppercase tracking-widest transition-colors"
            >
              ← BACK TO {course ? 'COURSE' : 'PLANS'}
            </button>
          </div>
      </motion.div>
    </div>
  )
}
