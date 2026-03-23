// src/components/MobileTechIcons.tsx
"use client";

import * as lucide from 'lucide-react';
import { motion } from 'framer-motion';

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

interface MobileTechIconsProps {
  icons: string[];
}

export function MobileTechIcons({ icons }: MobileTechIconsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3.5 sm:gap-4 opacity-70 hover:opacity-90 transition-opacity">
      {icons.map((tech) => {
        // Safe dynamic access (only runs on client)
        // @ts-expect-error - lucide dynamic access
        const Icon = (lucide as Record<string, typeof lucide.Code>)[tech] || lucide.Code;
        
        const getImageSrc = (techName: string): string => {
          return techImageMap[techName] || '/assets/javascript.png'; // fallback
        };

         return (
           <div
             key={tech}
             className="bg-zinc-950/60 border border-neon-green/25 rounded-xl p-2.5 shadow-sm hover:scale-115 hover:border-neon-green/50 transition-all duration-300"
           >
             <motion.div
               whileHover={{ scale: 1.15 }}
               animate={{ scale: [1, 1.05, 1] }}
               transition={{ 
                 duration: 3, 
                 repeat: Infinity, 
                 ease: "easeInOut" 
               }}
               className="w-7 h-7 sm:w-8 sm:h-8"
             >
               <img 
                 src={getImageSrc(tech)} 
                 alt={tech} 
                 className="w-7 h-7 sm:w-8 sm:h-8"
               />
             </motion.div>
           </div>
         );
       })}
     </div>
   );
}