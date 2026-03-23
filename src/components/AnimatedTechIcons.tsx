// src/components/AnimatedTechIcons.tsx (optional enhanced version)
"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import * as lucide from 'lucide-react';

const AnimatedTechIcons = ({ technologies = [] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const leftOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const leftX = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const defaultTechIcons = [
    'React', 'Nodejs', 'TypeScript', 'Python', 'Nextjs',
    'Tailwind', 'GraphQL', 'Docker', 'Kubernetes', 'AWS',
    'PostgreSQL', 'MongoDB', 'Redis', 'Git', 'Figma'
  ];

  const iconsToUse = technologies.length > 0 ? technologies : defaultTechIcons;
  const leftGroup = iconsToUse.slice(0, Math.ceil(iconsToUse.length / 2));
  const rightGroup = iconsToUse.slice(Math.ceil(iconsToUse.length / 2));

  const getIcon = (name: string) => {
    // @ts-expect-error
    const Icon = lucide[name];
    return Icon || lucide.Code;
  };

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-green/5 via-transparent to-neon-green/5" />
      
      {/* Left side with scroll-based animation */}
      <motion.div 
        style={{ opacity: leftOpacity, x: leftX }}
        className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 pl-8 lg:pl-16"
      >
        {leftGroup.map((tech, idx) => {
          const Icon = getIcon(tech);
          return (
            <motion.div
              key={`left-${tech}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.2, x: 10 }}
              className="group relative"
            >
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-3 shadow-2xl group-hover:border-neon-green/50 transition-all duration-300">
                <Icon className="w-8 h-8 text-neon-green" />
              </div>
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-deep-black border border-neon-green rounded px-2 py-1">
                  <span className="text-xs font-mono text-neon-green">{tech}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Right side with scroll-based animation */}
      <motion.div 
        style={{ opacity: rightOpacity, x: rightX }}
        className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 pr-8 lg:pr-16"
      >
        {rightGroup.map((tech, idx) => {
          const Icon = getIcon(tech);
          return (
            <motion.div
              key={`right-${tech}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.2, x: -10 }}
              className="group relative"
            >
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-3 shadow-2xl group-hover:border-neon-green/50 transition-all duration-300">
                <Icon className="w-8 h-8 text-neon-green" />
              </div>
              <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-deep-black border border-neon-green rounded px-2 py-1">
                  <span className="text-xs font-mono text-neon-green">{tech}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute left-8 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-neon-green/20 to-transparent" />
      <div className="absolute right-8 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-neon-green/20 to-transparent" />
      
      {/* Animated ring effect */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-neon-green/10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default AnimatedTechIcons;