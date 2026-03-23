'use client'

import { Award, Shield, Terminal, Trophy } from 'lucide-react'

interface CertificateProps {
  userName: string
  courseTitle: string
  completionDate: string
  certId: string
}

export function Certificate({ userName, courseTitle, completionDate, certId }: CertificateProps) {
  return (
    <div className="relative group">
      {/* Animated Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-neon-green/20 via-white/5 to-neon-green/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
      
      <div className="relative bg-black border-4 border-neon-green/30 rounded-[2.5rem] p-8 md:p-20 overflow-hidden shadow-[0_0_50px_rgba(57,255,20,0.1)]">
        {/* Cyberpunk Decorative Elements */}
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Terminal className="w-64 h-64 text-neon-green" />
        </div>
        <div className="absolute bottom-0 left-0 p-8 opacity-10 scale-x-[-1]">
          <Shield className="w-64 h-64 text-neon-green" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-neon-green/10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-neon-green/10"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-10">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-16 h-[2px] bg-neon-green"></div>
              <Award className="w-12 h-12 text-neon-green animate-pulse" />
              <div className="w-16 h-[2px] bg-neon-green"></div>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-[0.4em] text-neon-green uppercase italic">
              Certificate of Completion
            </h2>
            <p className="text-foreground/50 text-xs font-bold uppercase tracking-widest">
              THIS DOCUMENT VERIFIES THAT THE NEURAL LINK HAS BEEN SUCCESSFULLY ESTABLISHED
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-foreground/30 text-xs font-bold uppercase tracking-[0.3em]">PRESENTED TO</p>
            <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              {userName}
            </h1>
          </div>

          <div className="space-y-6">
            <p className="text-foreground/30 text-xs font-bold uppercase tracking-[0.3em]">FOR SUCCESSFUL MASTERY OF</p>
            <h3 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase text-neon-green">
              {courseTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 w-full max-w-3xl">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">Date Validated</p>
              <p className="text-sm font-bold text-white uppercase italic">{completionDate}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 border border-neon-green/50 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-neon-green" />
              </div>
              <p className="text-[8px] font-black text-neon-green uppercase tracking-[0.5em]">QUALIFIED ACCESS</p>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">Verification ID</p>
              <p className="text-[10px] font-mono font-bold text-white/50">{certId}</p>
            </div>
          </div>

          <div className="pt-20 flex flex-col md:flex-row items-center justify-center gap-20">
            <div className="text-center space-y-4">
               <div className="w-48 h-px bg-white/20 relative">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-xs italic text-white/40">GATERA Jimmy</span>
               </div>
               <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest leading-none">LEAD ARCHITECT</p>
            </div>
            <div className="text-center space-y-4">
               <div className="w-48 h-px bg-white/20 relative">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-xs italic text-white/40 italic">TALANTA SYS</span>
               </div>
               <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest leading-none">SYSTEM AUTHORITY</p>
            </div>
          </div>
        </div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-10 animate-scanline bg-gradient-to-b from-transparent via-neon-green/20 to-transparent h-20 w-full z-20"></div>
      </div>
    </div>
  )
}
