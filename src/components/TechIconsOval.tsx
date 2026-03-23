// src/components/TechIconsDisplay.tsx
"use client";

import { motion } from 'framer-motion';
import * as lucide from 'lucide-react';
import React, { useMemo } from 'react';

interface TechIconsDisplayProps {
  technologies?: string[];
}

const TechIconsDisplay = ({ technologies = [] }: TechIconsDisplayProps) => {
  const defaultTechIcons = [
    'React', 'Nodejs', 'TypeScript', 'Python', 'Nextjs',
    'Tailwind', 'GraphQL', 'Docker', 'Kubernetes', 'AWS',
    'PostgreSQL', 'MongoDB', 'Redis', 'Git', 'Figma',
    'Jest', 'Webpack', 'Vite', 'Prisma', 'TensorFlow'
  ];

  const iconsToUse = technologies.length > 0 ? technologies : defaultTechIcons;
  
  // Split icons into left and right groups
  const leftGroup = useMemo(() => iconsToUse.slice(0, Math.ceil(iconsToUse.length / 2)), [iconsToUse]);
  const rightGroup = useMemo(() => iconsToUse.slice(Math.ceil(iconsToUse.length / 2)), [iconsToUse]);

  const getIconComponent = (iconName: string) => {
    // @ts-expect-error - lucide icons are properly typed but TS sometimes struggles
    const Icon = lucide[iconName];
    return Icon || lucide.Code;
  };

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
  };

  const rightItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Left side icons */}
      <motion.div 
        className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-6 pl-8 lg:pl-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {leftGroup.map((tech, index) => {
          const Icon = getIconComponent(tech);
          return (
            <motion.div
              key={`left-${tech}-${index}`}
              variants={itemVariants}
              className="relative group"
              whileHover={{ scale: 1.2, x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-neon-green/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Icon container */}
                <div className="relative bg-deep-black/60 backdrop-blur-sm border border-neon-green/20 rounded-2xl p-3 shadow-xl group-hover:border-neon-green/60 transition-all duration-300">
                  <Icon className="w-8 h-8 text-neon-green group-hover:scale-110 transition-transform duration-300" />
                </div>
                {/* Tooltip with tech name */}
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-deep-black border border-neon-green/30 rounded-lg px-3 py-1.5 whitespace-nowrap">
                    <span className="text-xs font-mono text-neon-green font-bold">{tech}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Right side icons */}
      <motion.div 
        className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-6 pr-8 lg:pr-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {rightGroup.map((tech, index) => {
          const Icon = getIconComponent(tech);
          return (
            <motion.div
              key={`right-${tech}-${index}`}
              variants={rightItemVariants}
              className="relative group"
              whileHover={{ scale: 1.2, x: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-neon-green/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Icon container */}
                <div className="relative bg-deep-black/60 backdrop-blur-sm border border-neon-green/20 rounded-2xl p-3 shadow-xl group-hover:border-neon-green/60 transition-all duration-300">
                  <Icon className="w-8 h-8 text-neon-green group-hover:scale-110 transition-transform duration-300" />
                </div>
                {/* Tooltip with tech name */}
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-deep-black border border-neon-green/30 rounded-lg px-3 py-1.5 whitespace-nowrap">
                    <span className="text-xs font-mono text-neon-green font-bold">{tech}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Decorative gradient lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-green/30 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-green/30 to-transparent" />

      {/* Floating particles effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-neon-green/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -30, 30, -30],
              x: [null, 20, -20, 20],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TechIconsDisplay;