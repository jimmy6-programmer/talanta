import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Trophy, Clock, Play, Award, Zap, Activity } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

      // Get enrolled courses and progress
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select(`
          id,
          course_id,
          enrolled_at,
          courses (
            id,
            title,
            slug,
            thumbnail_url,
            categories (name),
            lessons (id, slug, duration, order_index)
          )
        `)
        .eq('user_id', user.id)

      // Get all completed lessons for this user
      const { data: completedLessonsData } = await supabase
        .from('progress')
        .select('lesson_id, updated_at')
        .eq('user_id', user.id)
        .eq('is_completed', true)

      const completedLessonIds = new Set(completedLessonsData?.map(p => p.lesson_id) || [])
      
      // Calculate total learning time (sum durations of completed lessons)
      // First, get durations for all lessons this user has completed
      const { data: lessonsWithDuration } = await supabase
        .from('lessons')
        .select('id, duration')
        .in('id', Array.from(completedLessonIds))

      const totalSeconds = lessonsWithDuration?.reduce((acc, curr) => acc + (curr.duration || 0), 0) || 0
      const totalHours = (totalSeconds / 3600).toFixed(1)

      // Map progress to enrollments
      const activeCourses = enrollments?.map(en => {
        const courseLessons = (en.courses as any).lessons || []
        const totalLessons = courseLessons.length
        const completedCount = courseLessons.filter((l: any) => completedLessonIds.has(l.id)).length
        const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

        // Find first uncompleted lesson
        const sortedLessons = [...courseLessons].sort((a: any, b: any) => a.order_index - b.order_index)
        const firstUncompleted = sortedLessons.find((l: any) => !completedLessonIds.has(l.id)) || sortedLessons[0]

        return {
          ...en,
          progress,
          resumeSlug: firstUncompleted?.slug,
          completedAt: progress === 100 ? completedLessonsData?.filter(p => courseLessons.some((cl: any) => cl.id === p.lesson_id)).sort((a,b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())[0]?.updated_at : null
        }
      }) || []

      const completedCourses = activeCourses.filter(c => c.progress === 100)

      return (
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col space-y-12">
            {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
                    DASHBOARD <span className="text-neon-green">ACTIVE</span>
                  </h1>
                  <p className="text-foreground/50 max-w-xl font-bold uppercase tracking-widest text-xs">
                    Welcome back, <span className="text-white">{user.email?.split('@')[0].toUpperCase()}</span>. System integrity at 100%.
                  </p>
                </div>
                 <div className="flex items-center space-x-4">
                    <div className="text-right hidden sm:block">
                       <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">Active Subscription</p>
                       <p className="font-bold text-neon-green italic">ALL ACCESS PASS</p>
                    </div>
                    <Link href="/api/logout">
                       <Button className="w-12 h-12 rounded-full bg-neon-green/10 border border-neon-green/30 flex items-center justify-center">
                          <Activity className="w-6 h-6 text-neon-green animate-pulse" />
                       </Button>
                    </Link>
                 </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { icon: <Clock className="w-5 h-5" />, label: 'LEARNING TIME', value: `${totalHours}H` },
                  { icon: <Play className="w-5 h-5" />, label: 'LESSONS WATCHED', value: completedLessonIds.size.toString().padStart(2, '0') },
                  { icon: <Trophy className="w-5 h-5" />, label: 'CERTIFICATES', value: completedCourses.length.toString().padStart(2, '0') },
                  { icon: <Zap className="w-5 h-5" />, label: 'SKILL LEVEL', value: `Lvl. ${Math.min(10, Math.floor(completedLessonIds.size / 5) + 1)}` },
                ].map((stat, i) => (stat &&
                  <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-2xl flex items-center space-x-6">
                    <div className="p-3 rounded-xl bg-neon-green/10 text-neon-green">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">{stat.label}</p>
                      <p className="text-2xl font-black italic tracking-tighter">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

            {/* In Progress Section */}
            <div className="space-y-8">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter flex items-center">
                <span className="w-2 h-2 bg-neon-green rounded-full mr-3 animate-pulse"></span>
                RESUME <span className="text-neon-green">TRAINING</span>
              </h2>

              {activeCourses.filter(c => c.progress < 100).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {activeCourses.filter(c => c.progress < 100).map((en: any) => (
                    <div key={en.id} className="group relative bg-deep-black border border-white/10 rounded-2xl overflow-hidden hover:border-neon-green/30 transition-all p-6 space-y-6">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="text-[10px] font-bold border-neon-green/20 text-neon-green uppercase">
                          {en.courses.categories?.name}
                        </Badge>
                        <span className="text-xs font-black italic text-neon-green">{en.progress}%</span>
                      </div>
                      
                      <h3 className="text-xl font-black italic uppercase leading-none group-hover:text-neon-green transition-colors">
                        {en.courses.title}
                      </h3>

                      <div className="space-y-2">
                        <Progress value={en.progress} className="h-1 bg-white/5" />
                        <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Sector Progress</p>
                      </div>

                      <Link href={`/courses/${en.courses.slug}/lessons/${en.resumeSlug}`} className="block">
                        <Button className="w-full h-12 bg-white/5 border border-white/10 text-white font-black italic hover:bg-neon-green hover:text-deep-black transition-all">
                          CONTINUE MODULE <Play className="ml-2 w-4 h-4 fill-current" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : activeCourses.length > 0 && activeCourses.every(c => c.progress === 100) ? (
                <div className="py-12 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.02] space-y-4">
                  <p className="text-foreground/50 font-black italic text-lg uppercase tracking-widest">
                    ALL SECTORS FULLY COMPLETED
                  </p>
                  <Link href="/courses">
                    <Button className="bg-neon-green text-deep-black font-black italic h-10 px-6 text-sm">
                      INITIALIZE NEW SECTOR
                    </Button>
                  </Link>
                </div>
              ) : (
              <div className="py-32 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.02] space-y-6">
                <p className="text-foreground/30 font-black italic text-2xl uppercase tracking-widest">
                  NO ACTIVE SECTORS FOUND
                </p>
                <Link href="/courses">
                  <Button className="bg-neon-green text-deep-black font-black italic h-12 px-8">
                    INITIALIZE NEW SEQUENCE
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Certificates Section */}
          {completedCourses.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter flex items-center">
                <Award className="w-6 h-6 mr-3 text-neon-green" />
                ACQUIRED <span className="text-neon-green">CERTIFICATES</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {completedCourses.map((en: any) => (
                  <div key={en.id} className="group relative bg-deep-black border border-neon-green/30 rounded-2xl overflow-hidden p-6 space-y-6 shadow-[0_0_20px_rgba(57,255,20,0.1)]">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="text-[10px] font-bold border-neon-green/50 text-neon-green uppercase bg-neon-green/5">
                        VERIFIED
                      </Badge>
                      <Trophy className="w-5 h-5 text-neon-green" />
                    </div>
                    
                    <h3 className="text-xl font-black italic uppercase leading-none text-white">
                      {en.courses.title}
                    </h3>

                    <p className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest">
                      Completed: {new Date(en.completedAt).toLocaleDateString()}
                    </p>

                    <Link href={`/certificates/${en.courses.slug}`} className="block">
                      <Button className="w-full h-12 bg-neon-green/10 border border-neon-green/30 text-neon-green font-black italic hover:bg-neon-green hover:text-deep-black transition-all">
                        VIEW CERTIFICATE <Award className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Section */}
          <div className="space-y-8">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter">
                SKILL UPGRADES <span className="text-neon-green">RECOMMENDED</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {/* Just a placeholder for recommended courses */}
                 <div className="p-12 bg-white/5 border border-white/5 rounded-2xl border-dashed flex flex-col items-center justify-center text-center space-y-4 col-span-full opacity-40">
                    <Zap className="w-12 h-12 text-neon-green/20 animate-pulse" />
                    <p className="text-xs font-bold text-foreground/30 uppercase tracking-widest">More technical modules being compiled for your neural link</p>
                 </div>
              </div>
          </div>
        </div>
      </div>
    )
  }

