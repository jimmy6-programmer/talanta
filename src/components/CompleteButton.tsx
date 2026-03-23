'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

interface CompleteButtonProps {
  lessonId: string
  nextLessonSlug: string | null
  courseSlug: string
}

export function CompleteButton({ lessonId, nextLessonSlug, courseSlug }: CompleteButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleComplete() {
    setLoading(true)
    try {
      const res = await fetch(`/api/lessons/${lessonId}/complete`, {
        method: 'POST',
      })

      if (res.ok) {
        if (nextLessonSlug) {
          router.push(`/courses/${courseSlug}/lessons/${nextLessonSlug}`)
        } else {
          router.push(`/courses/${courseSlug}`)
        }
      }
    } catch (error) {
      console.error('Failed to complete lesson:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      onClick={handleComplete}
      disabled={loading}
      size="lg" 
      className="bg-white/5 border border-white/10 text-white font-bold italic hover:bg-neon-green hover:text-deep-black transition-all"
    >
      {loading ? 'PROCESSING...' : (nextLessonSlug ? 'COMPLETE & NEXT' : 'COMPLETE MODULE')}
      <ChevronRight className="ml-2 w-4 h-4" />
    </Button>
  )
}
