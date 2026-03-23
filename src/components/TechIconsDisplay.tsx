// src/components/TechIconsDisplay.tsx
"use client";

import { motion } from 'framer-motion';
import * as lucide from 'lucide-react';
import React from 'react';

interface TechIconsDisplayProps {
  technologies: string[];
  side: 'left' | 'right';   // We pass side to adjust curve direction
}

// Map technology names to image assets - each image used exactly once
const techImageMap: Record<string, string> = {
  'React': '/assets/react.png',
  'TypeScript': '/assets/javascript.png',
  'Nextjs': '/assets/node.png',
  'Tailwind': '/assets/css.png',
  'Vite': '/assets/html.png',
  'Jest': '/assets/python.png',
  'Figma': '/assets/photoshop.png',
  'Webpack': '/assets/shopify.png',
  'Docker': '/assets/docker.png',
  'Kubernetes': '/assets/flutter.png',
  'AWS': '/assets/github.png',
  'Terraform': '/assets/solidity.png',
  'GraphQL': '/assets/laravel.png',
  'PostgreSQL': '/assets/git.png',
  'Redis': '/assets/forex.png',
  'Git': '/assets/kali.png'
};

const TechIconsDisplay = ({ technologies, side }: TechIconsDisplayProps) => {
  const getIconComponent = (iconName: string) => {
    // @ts-expect-error - ignore lucide type issues
    return lucide[iconName] || lucide.Code;
  };
  
  const getImageSrc = (techName: string): string => {
    return techImageMap[techName] || '/assets/javascript.png'; // fallback
  };

  // Gentle curve: more offset the farther from center
  const getOffset = (index: number, total: number) => {
    const center = (total - 1) / 2;
    const distanceFromCenter = Math.abs(index - center);
    
    // IMPORTANT CHANGE HERE — reverse the direction
    const direction = side === 'left' ? 1 : -1;
    
    const xOffset = distanceFromCenter * 12 * direction;
    const yScale = 1 - distanceFromCenter * 0.08;

    return { xOffset, yScale };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: side === 'left' ? 0.2 : 0.4, // slight delay difference left→right
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.7, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <motion.div
      className={`flex flex-col items-center gap-5 lg:gap-6 ${side === 'left' ? 'items-end pr-4 lg:pr-8' : 'items-start pl-4 lg:pl-8'}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {technologies.map((tech, index) => {
        const Icon = getIconComponent(tech);
        const { xOffset, yScale } = getOffset(index, technologies.length);
        
        return (
          <motion.div
            key={`${side}-${tech}-${index}`}
            variants={itemVariants}
            whileHover={{ scale: 1.25, rotate: side === 'left' ? -8 : 8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            style={{
              x: xOffset,
              scaleY: yScale,
              rotate: side === 'left' ? -4 - index * 1.2 : 4 + index * 1.2, // gentle outward tilt
            }}
            className="relative group"
          >
            <div className="relative bg-zinc-950/70 backdrop-blur-sm border border-neon-green/30 rounded-xl p-3 shadow-[0_0_15px_rgba(0,255,0,0.08)] group-hover:border-neon-green/50 transition-all">
              <motion.div
                whileHover={{ scale: 1.2 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10"
              >
                <img 
                  src={getImageSrc(tech)} 
                  alt={tech} 
                  className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 group-hover:scale-120 transition-transform duration-300"
                />
              </motion.div>
            </div>

            {/* Tooltip */}
            <div className={`absolute top-1/2 ${side === 'left' ? 'right-full mr-4' : 'left-full ml-4'} -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20`}>
              <div className="bg-zinc-950 border border-neon-green/40 rounded px-3 py-1.5 whitespace-nowrap">
                <span className="text-xs font-mono font-bold text-neon-green">{tech}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default TechIconsDisplay;