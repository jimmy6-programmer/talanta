import { createClient } from '@/utils/supabase/server'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Play, Clock, Trophy, Globe, Lock, User, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { TopicAccordion } from '@/components/TopicAccordion'

// Static course data for testing (will replace with DB data when available)
const staticCourses = {
  'web-development': {
    id: 1,
    title: 'Web Development Masterclass',
    slug: 'web-development',
    description: 'Master HTML, CSS, and JavaScript from scratch. Build beautiful, responsive websites with modern web technologies.',
    thumbnail_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
    price: 299.00,
    difficulty: 'Beginner',
    categories: { name: 'Web Development' },
    lessons: [
      { id: 1, title: 'Introduction to HTML', duration: 300, is_preview: true, slug: 'introduction-to-html' },
      { id: 2, title: 'CSS Fundamentals', duration: 360, is_preview: true, slug: 'css-fundamentals' },
      { id: 3, title: 'JavaScript Basics', duration: 420, is_preview: true, slug: 'javascript-basics' },
      { id: 4, title: 'Advanced JavaScript Concepts', duration: 480, is_preview: false, slug: 'advanced-javascript' },
      { id: 5, title: 'DOM Manipulation', duration: 390, is_preview: false, slug: 'dom-manipulation' }
    ],
    course_sections: [
      { id: 1, title: 'HTML Fundamentals', order_index: 1 },
      { id: 2, title: 'CSS Styling', order_index: 2 },
      { id: 3, title: 'JavaScript Programming', order_index: 3 }
    ]
  },
  'data-science': {
    id: 2,
    title: 'Data Science Fundamentals',
    slug: 'data-science',
    description: 'Learn Python for data science, visualization, and basic machine learning. Analyze real datasets and build predictive models.',
    thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    price: 349.00,
    difficulty: 'Intermediate',
    categories: { name: 'Data Science' },
    lessons: [
      { id: 1, title: 'Introduction to Data Science', duration: 300, is_preview: true, slug: 'data-science-intro' },
      { id: 2, title: 'Python for Data Analysis', duration: 360, is_preview: false, slug: 'python-data-analysis' },
      { id: 3, title: 'Data Visualization', duration: 420, is_preview: false, slug: 'data-visualization' },
      { id: 4, title: 'Statistical Analysis', duration: 480, is_preview: false, slug: 'statistical-analysis' },
      { id: 5, title: 'Machine Learning Basics', duration: 390, is_preview: false, slug: 'machine-learning-basics' }
    ],
    course_sections: [
      { id: 1, title: 'Data Science Basics', order_index: 1 },
      { id: 2, title: 'Python Programming', order_index: 2 },
      { id: 3, title: 'Data Analysis', order_index: 3 }
    ]
  },
  'forex-trading': {
    id: 3,
    title: 'Forex Trading Masterclass',
    slug: 'forex-trading',
    description: 'Learn professional forex trading strategies, technical analysis, and risk management. Start trading with confidence.',
    thumbnail_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
    price: 249.00,
    difficulty: 'Beginner to Advanced',
    categories: { name: 'Finance' },
    lessons: [
      { id: 1, title: 'Introduction to Forex Trading', duration: 240, is_preview: true, slug: 'forex-trading-intro' },
      { id: 2, title: 'Currency Pairs and Market Structure', duration: 300, is_preview: false, slug: 'currency-pairs' },
      { id: 3, title: 'Technical Analysis Basics', duration: 360, is_preview: false, slug: 'technical-analysis' },
      { id: 4, title: 'Advanced Chart Patterns', duration: 420, is_preview: false, slug: 'advanced-chart-patterns' },
      { id: 5, title: 'Risk Management Strategies', duration: 390, is_preview: false, slug: 'risk-management' }
    ],
    course_sections: [
      { id: 1, title: 'Forex Basics', order_index: 1 },
      { id: 2, title: 'Market Analysis', order_index: 2 },
      { id: 3, title: 'Trading Strategies', order_index: 3 }
    ]
  }
}

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  // Try to get data from database first
  const { data: course } = await supabase
    .from('courses')
    .select('*, categories(name), lessons(*), course_sections(*)')
    .eq('slug', slug)
    .single()

  // Fallback to static data if not in database
  let displayCourse: any
  if (course) {
    displayCourse = course
  } else {
    const staticCourse = staticCourses[slug as keyof typeof staticCourses]
    if (!staticCourse) {
      notFound()
    }
    displayCourse = staticCourse
  }

  // Group lessons by section
  // For static data, we'll assign lessons to sections based on their index
  let sectionsWithLessons = []
  if (displayCourse.course_sections) {
    sectionsWithLessons = displayCourse.course_sections
      ?.sort((a: any, b: any) => a.order_index - b.order_index)
      .map((section: any, sectionIndex: number) => ({
        ...section,
        lessons: displayCourse.lessons
          ?.filter((lesson: any) => {
            // For static data, assign lessons to sections based on their index
            if (displayCourse.course_sections && !('section_id' in lesson)) {
              const lessonsPerSection = Math.ceil(displayCourse.lessons.length / displayCourse.course_sections.length)
              const lessonIndex = displayCourse.lessons.findIndex((l: any) => l.id === lesson.id)
              return Math.floor(lessonIndex / lessonsPerSection) === sectionIndex
            }
            return lesson.section_id === section.id
          })
          .sort((a: any, b: any) => (a.order_index || a.id) - (b.order_index || b.id)) || []
      })) || []
  } else {
    // If no sections defined, create a default section
    sectionsWithLessons = [
      {
        id: 1,
        title: 'Course Content',
        order_index: 1,
        lessons: displayCourse.lessons?.sort((a: any, b: any) => (a.order_index || a.id) - (b.order_index || b.id)) || []
      }
    ]
  }

  return (
    <div className="flex flex-col w-full">
      {/* Hero Header */}
      <section className="relative py-24 bg-zinc-950/50 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full cyber-grid opacity-10 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <Badge className="bg-neon-green/10 border-neon-green/30 text-neon-green font-bold tracking-widest uppercase text-[10px]">
                {displayCourse.categories?.name}
              </Badge>
              <Badge variant="outline" className="border-white/10 text-foreground/50">
                {displayCourse.difficulty}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter leading-none">
              {displayCourse.title.toUpperCase()}
            </h1>

            <p className="text-lg text-foreground/60 leading-relaxed max-w-xl">
              {displayCourse.description || 'Master the core concepts and architectural patterns in this comprehensive training module.'}
            </p>

              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link href={`/checkout?course=${displayCourse.id}`}>
                  <Button size="lg" className="h-16 px-10 bg-neon-green text-deep-black font-black italic text-xl shadow-[0_0_30px_rgba(0,255,0,0.3)] hover:shadow-[0_0_50px_rgba(0,255,0,0.5)] transition-all">
                    ENROLL NOW ${displayCourse.price}
                  </Button>
                </Link>
                <div className="flex flex-col items-start">
                  <p className="text-[10px] font-black tracking-widest text-foreground/30 uppercase">Money-back guarantee</p>
                  <p className="text-sm font-bold italic">30 DAYS REFUND POLICY</p>
                </div>
              </div>
          </div>

          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,255,0,0.05)] group">
            {displayCourse.thumbnail_url ? (
              <Image src={displayCourse.thumbnail_url} alt={displayCourse.title} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                <Play className="w-20 h-20 text-neon-green/20" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-20 h-20 bg-neon-green rounded-full flex items-center justify-center">
                <Play className="w-10 h-10 text-deep-black fill-current ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Stats */}
      <section className="bg-deep-black border-b border-white/5 py-8">
        <div className="container mx-auto px-4 flex flex-wrap justify-between gap-8 md:gap-12">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-neon-green/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-neon-green" />
            </div>
            <div>
              <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">Duration</p>
              <p className="font-bold italic">15.5 HOURS</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-neon-green/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-neon-green" />
            </div>
            <div>
              <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">Level</p>
              <p className="font-bold italic uppercase">{displayCourse.difficulty}</p>
            </div>
          </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-neon-green/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-neon-green" />
              </div>
              <div>
                <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">Language</p>
                <p className="font-bold italic uppercase">ENGLISH SYS</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-neon-green/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-neon-green" />
              </div>
              <div>
                <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">Certificate</p>
                <p className="font-bold italic uppercase">YES ENCRYPTED</p>
              </div>
            </div>
        </div>
      </section>

      {/* Curriculum & Instructor */}
      <div className="container mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">
              TOPICS TO BE <span className="text-neon-green">COVERED</span>
            </h2>

            <TopicAccordion sections={sectionsWithLessons} courseSlug={slug} />
          </div>

          {/* Instructor Sidebar */}
          <div className="space-y-12">
            <div className="p-8 bg-zinc-950/50 border border-white/5 rounded-3xl space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/5 rounded-full blur-3xl" />
              
              <h2 className="text-2xl font-black italic tracking-tighter uppercase flex items-center gap-2">
                <User className="w-6 h-6 text-neon-green" />
                THE INSTRUCTOR
              </h2>

              <div className="space-y-6">
                <div className="w-24 h-24 rounded-2xl bg-zinc-900 border border-white/10 overflow-hidden relative">
                  <Image 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" 
                    alt="Talanta" 
                    fill 
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black italic text-neon-green">LEAD ARCHITECT</h3>
                  <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">Principal Architect</p>
                </div>
                <p className="text-sm text-foreground/50 leading-relaxed italic font-medium">
                  "I've trained over 3 million engineers globally. My mission is to decrypt complex architectures into actionable engineering patterns."
                </p>
                <div className="flex gap-4">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-foreground/40 hover:text-neon-green cursor-pointer transition-colors">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border border-neon-green/10 rounded-3xl bg-neon-green/[0.02] space-y-6">
              <h3 className="text-sm font-black italic tracking-widest uppercase text-neon-green">LIFETIME ACCESS</h3>
              <p className="text-xs text-foreground/50 leading-relaxed">
                Unlock the full potential of this module. One-time payment. Zero recurring fees. Free updates for life.
              </p>
              <Link href={`/checkout?course=${displayCourse.id}`} className="block">
                <Button className="w-full bg-neon-green text-deep-black font-black italic shadow-[0_0_20px_rgba(0,255,0,0.2)]">
                  CLAIM ACCESS
                </Button>
              </Link>
            </div>
          </div>
      </div>
    </div>
  )
}

