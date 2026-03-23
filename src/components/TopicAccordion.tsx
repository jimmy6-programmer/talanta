'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Play, Lock, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Lesson {
  id: string
  title: string
  slug: string
  duration: number
  is_preview: boolean
}

interface Section {
  id: string
  title: string
  lessons: Lesson[]
}

interface TopicAccordionProps {
  sections: Section[]
  courseSlug: string
}

export function TopicAccordion({ sections, courseSlug }: TopicAccordionProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    Object.fromEntries(sections.map((s, i) => [s.id, i === 0]))
  )

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <div 
          key={section.id} 
          className="border border-white/5 bg-white/[0.02] rounded-2xl overflow-hidden"
        >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center space-x-4 text-left">
                <span className="text-sm font-black text-neon-green/30 tracking-widest uppercase">
                  MODULE {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl font-black italic tracking-tighter uppercase group-hover:text-neon-green transition-colors">
                  {section.title}
                </h3>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-[10px] font-black text-foreground/30 uppercase tracking-widest hidden sm:inline-block">
                  {section.lessons.length} SUB-TOPICS
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-neon-green transition-transform duration-300 ${
                    expandedSections[section.id] ? 'rotate-180' : ''
                  }`} 
                />
              </div>
            </button>

            <AnimatePresence>
              {expandedSections[section.id] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 space-y-2 border-t border-white/5 bg-deep-black/20">
                    <p className="text-[10px] font-black tracking-[0.2em] text-foreground/20 uppercase mb-4 mt-4">TECHNICAL SPECIFICATIONS / SUB-TOPICS</p>
                    <div className="space-y-1">
                      {section.lessons.map((lesson) => (
                        <div 
                          key={lesson.id} 
                          className="group flex items-center justify-between p-4 hover:bg-neon-green/[0.03] border border-transparent hover:border-neon-green/10 rounded-xl transition-all"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 rounded-lg bg-deep-black border border-white/5 flex items-center justify-center group-hover:border-neon-green/20">
                              {lesson.is_preview ? (
                                <Play className="w-3 h-3 text-neon-green fill-current" />
                              ) : (
                                <Lock className="w-3 h-3 text-foreground/20" />
                              )}
                            </div>
                            <div className="space-y-0.5">
                              <h4 className="text-sm font-bold italic group-hover:text-neon-green transition-colors">
                                {lesson.title.toUpperCase()}
                              </h4>
                              <div className="flex items-center space-x-2 text-[10px] font-black text-foreground/30 uppercase tracking-widest">
                                <Clock className="w-3 h-3" />
                                <span>{Math.floor(lesson.duration / 60)}m {lesson.duration % 60}s</span>
                              </div>
                            </div>
                          </div>

                          {lesson.is_preview && (
                            <Link href={`/courses/${courseSlug}/lessons/${lesson.slug}`}>
                              <Button size="sm" variant="outline" className="h-8 px-4 border-neon-green/30 text-neon-green hover:bg-neon-green hover:text-deep-black font-black italic text-[10px]">
                                PREVIEW MODULE
                              </Button>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
