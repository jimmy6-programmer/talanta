import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Code, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CourseCard } from '@/components/CourseCard'
import { createClient } from '@/utils/supabase/server'
import TechIconsDisplay from '@/components/TechIconsDisplay'
import { MobileTechIcons } from '@/components/MobileTechIcons'

export default async function HomePage() {
  const supabase = await createClient()

  const { data: courses } = await supabase
    .from('courses')
    .select('*, categories(name)')
    .limit(3)

  const leftBracketIcons = [
    'React', 'TypeScript', 'Nextjs', 'Tailwind',
    'Vite', 'Jest', 'Figma', 'Webpack'
  ]

  const rightBracketIcons = [
    'Docker', 'Kubernetes', 'AWS', 'Terraform',
    'GraphQL', 'PostgreSQL', 'Redis', 'Git'
  ]

  const allIcons = [...leftBracketIcons, ...rightBracketIcons]

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-40 cyber-grid overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-black/60 to-deep-black pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
              {/* Desktop: Three-column bracket layout */}
              <div className="hidden md:flex md:items-center lg:items-center md:justify-between lg:justify-between md:gap-6 lg:gap-10 min-h-[520px] lg:min-h-[620px]">
                {/* Left icons */}
                <TechIconsDisplay 
                  technologies={leftBracketIcons} 
                  side="left" 
                  className="flex items-center justify-start w-[280px] md:w-[320px] lg:w-[380px] opacity-75 hover:opacity-100 transition-opacity duration-500 h-full"
                />

                {/* Center text */}
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-7 md:space-y-9 lg:space-y-10 h-full">
                <div className="inline-flex items-center space-x-2 bg-neon-green/10 border border-neon-green/30 px-3.5 py-1 rounded-full text-[10px] md:text-xs font-black tracking-[0.25em] text-neon-green uppercase animate-pulse mx-auto">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
                  </span>
                  <span>System Online: Version 2.0.4</span>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight">
                  LEVEL UP YOUR<br />
                  <span className="text-neon-green italic neon-glow">CODE STACK</span>
                </h1>

                <p className="text-base md:text-lg lg:text-xl text-foreground/70 max-w-3xl mx-auto font-medium leading-relaxed">
                  Elite-level software engineering courses designed to turn you into a{' '}
                  <span className="text-white font-bold">top 1% developer</span>. No fluff, just pure architectural mastery.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
                  <Link href="/courses">
                    <Button
                      size="lg"
                      className="h-12 sm:h-14 px-7 sm:px-9 bg-neon-green text-deep-black font-black italic text-base sm:text-lg hover:scale-105 transition-transform shadow-[0_0_25px_rgba(0,255,0,0.25)]"
                    >
                      ACCESS COURSES <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>

                  <Link href="/subscribe">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-12 sm:h-14 px-7 sm:px-9 border-neon-green/40 text-white font-bold text-base sm:text-lg hover:bg-neon-green/10 hover:border-neon-green/60 transition-all"
                    >
                      ALL ACCESS PASS
                    </Button>
                  </Link>

                  <Link href="/test-certificate">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-12 sm:h-14 px-7 sm:px-9 border-neon-green/40 text-white font-bold text-base sm:text-lg hover:bg-neon-green/10 hover:border-neon-green/60 transition-all"
                    >
                      TEST CERTIFICATE
                    </Button>
                  </Link>
                </div>
              </div>

                {/* Right icons */}
                <TechIconsDisplay 
                  technologies={rightBracketIcons} 
                  side="right" 
                  className="flex items-center justify-end w-[280px] md:w-[320px] lg:w-[380px] opacity-75 hover:opacity-100 transition-opacity duration-500 h-full"
                />
            </div>

            {/* Mobile version */}
            <div className="md:hidden space-y-10 pt-4 pb-12">
              <MobileTechIcons icons={allIcons} />

              <div className="text-center space-y-7 px-2">
                <div className="inline-flex items-center space-x-2 bg-neon-green/10 border border-neon-green/30 px-3 py-1 rounded-full text-xs font-black tracking-[0.2em] text-neon-green uppercase animate-pulse mx-auto">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
                  </span>
                  <span>System Online: Version 2.0.4</span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-black tracking-tighter leading-tight">
                  LEVEL UP YOUR<br />
                  <span className="text-neon-green italic neon-glow">CODE STACK</span>
                </h1>

                <p className="text-base text-foreground/70 max-w-xl mx-auto font-medium">
                  Elite-level software engineering courses designed to turn you into a{' '}
                  <span className="text-white font-bold">top 1% developer</span>. No fluff, just pure architectural mastery.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Link href="/courses">
                    <Button
                      size="lg"
                      className="h-12 px-8 bg-neon-green text-deep-black font-black italic text-base hover:scale-105 transition-transform shadow-[0_0_25px_rgba(0,255,0,0.25)]"
                    >
                      ACCESS COURSES <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>

                  <Link href="/subscribe">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-12 px-8 border-neon-green/40 text-white font-bold text-base hover:bg-neon-green/10 hover:border-neon-green/60 transition-all"
                    >
                      ALL ACCESS PASS
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Trusted by */}
            <div className="pt-16 md:pt-20 pb-8">
              <p className="text-[10px] md:text-xs font-black tracking-[0.3em] text-foreground/40 uppercase mb-6 text-center">
                TRUSTED BY ENGINEERS AT
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                <span className="text-xl md:text-2xl font-black italic tracking-tighter">GOOGLE</span>
                <span className="text-xl md:text-2xl font-black italic tracking-tighter">META</span>
                <span className="text-xl md:text-2xl font-black italic tracking-tighter">AMAZON</span>
                <span className="text-xl md:text-2xl font-black italic tracking-tighter">MICROSOFT</span>
                <span className="text-xl md:text-2xl font-black italic tracking-tighter">APPLE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 md:py-24 bg-deep-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 space-y-4 md:space-y-0">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic">
                Featured <span className="text-neon-green">Programs</span>
              </h2>
              <p className="text-foreground/50 font-medium">Curated sequences to master specific domains.</p>
            </div>
            <Link href="/courses" className="text-neon-green font-bold flex items-center group hover:underline">
              VIEW ALL <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses?.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                slug={course.slug}
                thumbnail_url={course.thumbnail_url}
                price={course.price}
                difficulty={course.difficulty}
                category={course.categories?.name || 'Uncategorized'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 md:py-24 border-y border-white/5 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 cyber-grid" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic">
              Why <span className="text-neon-green">Talanta</span>?
            </h2>
            <p className="text-foreground/50">Everything you need to go from junior to lead architect.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="w-8 h-8 text-neon-green" />,
                title: 'No-Fluff Mastery',
                desc: 'We respect your time. Every minute is packed with high-signal architectural knowledge.'
              },
              {
                icon: <Zap className="w-8 h-8 text-neon-green" />,
                title: 'Real-World Scale',
                desc: 'Build projects that actually scale. No Todo apps, only production-grade systems.'
              },
              {
                icon: <Shield className="w-8 h-8 text-neon-green" />,
                title: 'Lifelong Access',
                desc: 'Buy once, keep forever. Free updates as the technology landscape evolves.'
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-deep-black/50 border border-white/5 rounded-2xl hover:border-neon-green/20 transition-all group">
                <div className="mb-6 p-4 bg-neon-green/5 w-fit rounded-xl group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 italic uppercase tracking-tighter">{feature.title}</h3>
                <p className="text-foreground/50 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Access CTA */}
      <section className="py-20 md:py-24 container mx-auto px-4">
        <div className="bg-neon-green p-1 md:p-2 rounded-[2rem] overflow-hidden">
          <div className="bg-deep-black rounded-[1.8rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-6 max-w-xl">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
                Get <span className="text-neon-green">Unlimited</span> Access
              </h2>
              <p className="text-foreground/60 text-lg">
                One subscription for everything. Over 50+ elite courses, premium discord access, and exclusive weekly workshops.
              </p>
              <ul className="space-y-3">
                {['All 50+ Current Courses', 'New Courses Every Month', 'Certificate of Completion', 'Source Code Access'].map((item) => (
                  <li key={item} className="flex items-center text-sm font-bold italic">
                    <CheckCircle2 className="w-5 h-5 text-neon-green mr-2" />
                    {item.toUpperCase()}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center p-8 bg-neon-green/5 border border-neon-green/20 rounded-3xl w-full md:w-80">
              <span className="text-sm font-bold text-neon-green mb-2 uppercase tracking-[0.2em]">All-Access Pass</span>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl md:text-6xl font-black italic">$29</span>
                <span className="text-foreground/50 font-bold ml-2">/MO</span>
              </div>
              <Link href="/subscribe" className="w-full">
                <Button className="w-full h-14 bg-neon-green text-deep-black font-black italic text-lg hover:shadow-[0_0_20px_rgba(0,255,0,0.5)] transition-all">
                  UPGRADE NOW
                </Button>
              </Link>
              <p className="mt-4 text-[10px] text-foreground/30 font-bold uppercase tracking-widest">Cancel anytime. 30-day guarantee.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}