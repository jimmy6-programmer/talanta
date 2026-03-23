import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Zap, Shield, Trophy, Users, Star, Globe } from 'lucide-react'
import Link from 'next/link'

export default function SubscribePage() {
  const plans = [
    {
      name: 'Monthly Pass',
      price: '29',
      period: 'month',
      description: 'Perfect for dedicated learners who want to master one skill at a time.',
      features: [
        'All 50+ Current Courses',
        'New Courses Every Month',
        'Certificate of Completion',
        'Premium Discord Access',
        'Source Code Access',
        'Cancel Anytime'
      ],
      highlight: false
    },
    {
      name: 'Annual Pass',
      price: '249',
      period: 'year',
      description: 'The ultimate engineering package. Save over 25% compared to monthly.',
      features: [
        'Everything in Monthly',
        '2 Months Free',
        'Priority Support',
        'Exclusive Workshops',
        'Beta Course Access',
        'Downloadable Content'
      ],
      highlight: true
    }
  ]

  return (
    <div className="flex flex-col w-full pb-32">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
          <Badge className="bg-neon-green/10 border-neon-green/30 text-neon-green font-bold tracking-[0.3em] uppercase py-2 px-4">
            UNLIMITED ACCESS
          </Badge>
          <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-none uppercase">
            UPGRADE YOUR <br />
            <span className="text-neon-green neon-glow">OPERATING SYSTEM</span>
          </h1>
          <p className="text-lg text-foreground/50 max-w-2xl mx-auto">
            Get instant access to our entire library of elite software engineering courses. One subscription, zero limits.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative p-1 rounded-[2.5rem] overflow-hidden ${
                plan.highlight ? 'bg-neon-green shadow-[0_0_50px_rgba(0,255,0,0.15)]' : 'bg-white/5 border border-white/5'
              }`}
            >
              <div className={`h-full rounded-[2.4rem] p-8 md:p-12 space-y-8 flex flex-col ${
                plan.highlight ? 'bg-deep-black' : 'bg-zinc-950/50'
              }`}>
                <div className="space-y-4">
                  <h3 className={`text-2xl font-black italic tracking-tighter uppercase ${
                    plan.highlight ? 'text-neon-green' : 'text-white'
                  }`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline">
                    <span className="text-5xl md:text-7xl font-black italic">${plan.price}</span>
                    <span className="text-foreground/40 font-bold ml-2 uppercase tracking-widest text-sm">/{plan.period}</span>
                  </div>
                  <p className="text-foreground/50 text-sm leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-4 flex-grow">
                  <p className="text-[10px] font-black tracking-widest text-foreground/30 uppercase">Included Features</p>
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start text-sm font-bold italic">
                        <CheckCircle2 className={`w-5 h-5 mr-3 shrink-0 ${plan.highlight ? 'text-neon-green' : 'text-foreground/20'}`} />
                        {feature.toUpperCase()}
                      </li>
                    ))}
                  </ul>
                </div>

                  <Link href={`/checkout?plan=${plan.name.toLowerCase().split(' ')[0]}`} className="block">
                    <Button 
                      className={`w-full h-16 text-lg font-black italic uppercase transition-all duration-300 ${
                        plan.highlight 
                          ? 'bg-neon-green text-deep-black hover:shadow-[0_0_30px_rgba(0,255,0,0.5)]' 
                          : 'bg-white/5 border border-white/10 text-white hover:bg-neon-green hover:text-deep-black hover:border-none'
                      }`}
                    >
                      ACTIVATE ACCESS
                    </Button>
                  </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Features */}
      <section className="py-32 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: <Zap className="w-10 h-10 text-neon-green" />,
              title: 'INSTANT DEPLOY',
              desc: 'Start learning immediately after activation. No wait times, no friction.'
            },
            {
              icon: <Shield className="w-10 h-10 text-neon-green" />,
              title: 'SECURE TRANSFERS',
              desc: 'Enterprise-grade encryption on all transactions. Your data is protected.'
            },
            {
              icon: <Trophy className="w-10 h-10 text-neon-green" />,
              title: 'ELITE STATUS',
              desc: 'Join the top 1% of developers globally with our architectural training.'
            }
          ].map((item, i) => (
            <div key={i} className="text-center space-y-6 group">
              <div className="mx-auto w-20 h-20 bg-neon-green/5 border border-neon-green/10 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-black italic tracking-tighter uppercase">{item.title}</h3>
              <p className="text-sm text-foreground/50 leading-relaxed max-w-xs mx-auto">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Link or Guarantee */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center space-x-4 px-6 py-3 bg-white/5 rounded-full border border-white/5">
          <Globe className="w-4 h-4 text-neon-green" />
          <span className="text-[10px] font-black tracking-widest uppercase">Trusted by 3,000,000+ Engineers Worldwide</span>
        </div>
        <p className="text-xs text-foreground/30 font-bold uppercase tracking-widest">30-DAY MONEY-BACK GUARANTEE. ZERO RISK.</p>
      </section>
    </div>
  )
}
