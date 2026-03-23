import { createClient } from '@/utils/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Award, Download, Share2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Certificate } from '@/components/Certificate'
import CertificateClient from './CertificateClient'

export default async function CertificatePage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get course details
  const { data: course } = await supabase
    .from('courses')
    .select('id, title, slug')
    .eq('slug', slug)
    .single()

  if (!course) {
    notFound()
  }

  // Verify completion
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('id, enrolled_at')
    .eq('user_id', user.id)
    .eq('course_id', course.id)
    .single()

  if (!enrollment) {
    redirect('/dashboard')
  }

  // Get all lessons for this course
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id')
    .eq('course_id', course.id)

  const totalLessons = lessons?.length || 0

  // Get completed lessons
  const { data: completedLessons } = await supabase
    .from('progress')
    .select('lesson_id, updated_at')
    .eq('user_id', user.id)
    .in('lesson_id', lessons?.map(l => l.id) || [])
    .eq('is_completed', true)

  const completedCount = completedLessons?.length || 0
  const isCompleted = totalLessons > 0 && completedCount === totalLessons

  if (!isCompleted) {
    redirect(`/courses/${slug}`)
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()

  const userName = profile?.full_name || user.email?.split('@')[0].toUpperCase() || 'TALANTA STUDENT'
  const completionDate = completedLessons?.sort((a,b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())[0]?.updated_at
  const certId = `TLNT-${enrollment.id.substring(0, 8).toUpperCase()}-${course.id.substring(0, 4).toUpperCase()}`

  return (
    <div className="min-h-screen bg-deep-black py-20 px-4">
      <div className="container mx-auto max-w-5xl space-y-12">
        {/* Back Button */}
        <Link href="/dashboard" className="inline-flex items-center text-neon-green hover:underline font-black italic uppercase tracking-tighter">
          <ArrowLeft className="w-4 h-4 mr-2" /> BACK TO DASHBOARD
        </Link>

        {/* Certificate Preview */}
        <Certificate
          userName={userName}
          courseTitle={course.title}
          completionDate={new Date(completionDate).toLocaleDateString()}
          certId={certId}
        />

        {/* Actions */}
        <CertificateClient
          userName={userName}
          courseTitle={course.title}
          completionDate={new Date(completionDate).toLocaleDateString()}
          certId={certId}
        />
      </div>
    </div>
  )
}
