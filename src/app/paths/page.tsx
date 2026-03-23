import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Code, Database, Layout, Search, Layers, ShieldCheck, Terminal, Cpu, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function PathsPage() {
  const paths = [
    {
      title: 'Full-Stack Architect',
      description: 'Master everything from modern frontend architectures to high-performance backends and cloud infrastructure.',
      icon: <Layers className="w-8 h-8 text-neon-green" />,
      courses: 12,
      duration: '85 Hours',
      level: 'Advanced',
      skills: ['Next.js', 'Go', 'Docker', 'Kubernetes', 'PostgreSQL'],
      category: 'web-development'
    },
    {
      title: 'Frontend Lead',
      description: 'Become an expert in building high-end, high-performance user interfaces with modern React ecosystems.',
      icon: <Layout className="w-8 h-8 text-neon-green" />,
      courses: 8,
      duration: '45 Hours',
      level: 'Intermediate',
      skills: ['React', 'TypeScript', 'Framer Motion', 'Tailwind', 'State Management'],
      category: 'web-development'
    },
    {
      title: 'Backend Specialist',
      description: 'Design and implement scalable distributed systems, databases, and high-performance APIs.',
      icon: <Database className="w-8 h-8 text-neon-green" />,
      courses: 10,
      duration: '65 Hours',
      level: 'Advanced',
      skills: ['Node.js', 'Python', 'Redis', 'Microservices', 'System Design'],
      category: 'web-development'
    },
    {
      title: 'Security Engineer',
      description: 'Learn to protect your applications from modern threats and master the art of secure architectural patterns.',
      icon: <ShieldCheck className="w-8 h-8 text-neon-green" />,
      courses: 6,
      duration: '35 Hours',
      level: 'Expert',
      skills: ['Web Security', 'OWASP', 'Encryption', 'Auth Patterns', 'Pentesting'],
      category: 'cybersecurity'
    }
  ]

  return (
    <div className="flex flex-col w-full pb-32">
      {/* Hero */}
      <section className="relative pt-32 pb-20 border-b border-white/5 bg-zinc-950/50">
        <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
          <Badge className="bg-neon-green/10 border-neon-green/30 text-neon-green font-bold tracking-[0.3em] uppercase py-2 px-4">
            LEARNING SEQUENCES
          </Badge>
          <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-none uppercase">
            CHOOSE YOUR <br />
            <span className="text-neon-green neon-glow">TRAJECTORY</span>
          </h1>
          <p className="text-lg text-foreground/50 max-w-2xl mx-auto">
            Stop guessing what to learn next. Our curated paths provide a clear sequence to master complex domains.
          </p>
        </div>
      </section>

      {/* Path Cards */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {paths.map((path) => (
            <div 
              key={path.title}
              className="group p-1 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-neon-green/30 hover:bg-neon-green/5 transition-all duration-500 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/5 rounded-full blur-3xl group-hover:bg-neon-green/10 transition-colors" />
              
                  <div className="relative z-10 p-8 md:p-12 space-y-8">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                        <div className="space-y-4 flex-1 min-w-0">
                          <div className="p-4 bg-neon-green/10 w-fit rounded-2xl group-hover:scale-110 transition-transform duration-300">
                            {path.icon}
                          </div>
                          <h3 className="text-3xl font-black italic tracking-tighter uppercase group-hover:text-neon-green transition-colors break-words">
                            {path.title}
                          </h3>
                        </div>
                        <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
                          <Badge variant="outline" className="border-white/10 text-foreground/40 font-black italic whitespace-nowrap px-3 py-1">
                            {path.level.toUpperCase()}
                          </Badge>
                          <p className="text-[10px] font-black tracking-widest text-foreground/20 uppercase whitespace-nowrap sm:whitespace-normal sm:text-right">
                            {path.courses} Courses • {path.duration}
                          </p>
                        </div>
                      </div>

                  <p className="text-foreground/50 leading-relaxed font-medium">
                    {path.description}
                  </p>

                  <div className="space-y-4">
                    <p className="text-[10px] font-black tracking-widest text-foreground/30 uppercase">Mastery Targets</p>
                    <div className="flex flex-wrap gap-2">
                      {path.skills.map((skill) => (
                        <span 
                          key={skill}
                          className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-xs font-bold text-foreground/40"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link href={`/courses?category=${path.category}`}>
                    <Button className="w-full h-14 bg-white/5 border border-white/10 text-white font-black italic uppercase group-hover:bg-neon-green group-hover:text-deep-black group-hover:border-none transition-all duration-300">
                      EXPLORE PATHWAY <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Assessment CTA */}
      <section className="container mx-auto px-4 py-12">
        <div className="p-12 bg-zinc-950/80 border border-white/5 rounded-[3rem] text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon-green/5 rounded-full blur-3xl pointer-events-none" />
          
          <Badge className="bg-neon-green/10 border-neon-green/30 text-neon-green font-black tracking-widest uppercase">
            ASSESSMENT ENGINE
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase max-w-2xl mx-auto leading-none">
            NOT SURE WHERE TO <span className="text-neon-green">INITIALIZE</span>?
          </h2>
          <p className="text-foreground/50 max-w-xl mx-auto">
            Take our 5-minute skills assessment to determine your current engineering rank and get a personalized trajectory.
          </p>
            <Link href="/assessment">
              <Button size="lg" className="bg-neon-green text-deep-black font-black italic px-10 h-14 hover:shadow-[0_0_30px_rgba(0,255,0,0.3)]">
                START ASSESSMENT
              </Button>
            </Link>
        </div>
      </section>
    </div>
  )
}
