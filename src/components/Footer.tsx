'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Youtube, Github, Twitter, Linkedin, Facebook, SquareTerminal } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const sections = [
    {
      title: 'LEARNING',
      links: [
        { name: 'Courses', href: '/courses' },
        { name: 'Learning Paths', href: '/paths' },
        { name: 'Subscriptions', href: '/subscribe' },
      ],
    },
    {
      title: 'COMMUNITY',
      links: [
        { name: 'Forum', href: '#' },
        { name: 'Student Stories', href: '/testimonials' },
        { name: 'Support', href: '/support' },
      ],
    },
    {
      title: 'PLATFORM',
      links: [
        { name: 'Term of Use', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Blog', href: '/blog' },
      ],
    },
  ]

  return (
    <footer className="bg-deep-black border-t border-neon-green/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-neon-green rounded-md flex items-center justify-center">
                  <SquareTerminal className="text-deep-black w-5 h-5" />
                </div>
                <span className="text-xl font-black tracking-tighter neon-glow">
                  TALANTA
                </span>
              </Link>
            <p className="text-sm text-foreground/50 mb-6">
              Building the next generation of engineers with elite-level training and real-world projects.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-foreground/50 hover:text-neon-green transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-foreground/50 hover:text-neon-green transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-foreground/50 hover:text-neon-green transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-foreground/50 hover:text-neon-green transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold text-neon-green tracking-widest mb-6 uppercase">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/50 hover:text-white transition-colors flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-[1px] bg-neon-green mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-foreground/30">
            <p>© {currentYear} TALANTA SYSTEMS. ALL RIGHTS RESERVED.</p>
            <div className="flex space-x-6">
            <Link href="/terms" className="hover:text-neon-green">TERMS</Link>
            <Link href="/privacy" className="hover:text-neon-green">PRIVACY</Link>
            <Link href="/contact" className="hover:text-neon-green">CONTACT</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
