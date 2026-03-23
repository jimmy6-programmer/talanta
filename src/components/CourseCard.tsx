'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Play, Star, Clock, Trophy } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface CourseCardProps {
  id: string
  title: string
  slug: string
  thumbnail_url: string | null
  price: number
  difficulty: string
  category: string
}

export function CourseCard({ id, title, slug, thumbnail_url, price, difficulty, category }: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-deep-black border border-white/10 rounded-xl overflow-hidden hover:border-neon-green/30 transition-all duration-500"
    >
      <Link href={`/courses/${slug}`}>
          <div className="relative aspect-video w-full bg-muted overflow-hidden">
            {thumbnail_url ? (
              <Image
                src={thumbnail_url}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                <span className="text-neon-green/30 font-black italic text-4xl uppercase">TALANTA</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-transparent to-transparent opacity-60" />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 bg-neon-green rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,255,0,0.5)]">
                <Play className="w-8 h-8 text-deep-black fill-current ml-1" />
              </div>
            </div>
          </div>

        <div className="p-5 space-y-4">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="text-[10px] font-bold tracking-widest uppercase border-neon-green/20 text-neon-green">
              {category}
            </Badge>
            <span className="text-xs text-foreground/50 flex items-center">
              <Star className="w-3 h-3 text-neon-green fill-current mr-1" />
              4.9
            </span>
          </div>

          <h3 className="text-lg font-bold leading-tight group-hover:text-neon-green transition-colors line-clamp-2 min-h-[3.5rem]">
            {title}
          </h3>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center space-x-4 text-xs text-foreground/40">
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                15h
              </span>
              <span className="flex items-center">
                <Trophy className="w-3 h-3 mr-1" />
                {difficulty}
              </span>
            </div>
            <div className="text-lg font-black text-neon-green italic">
              ${price}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
