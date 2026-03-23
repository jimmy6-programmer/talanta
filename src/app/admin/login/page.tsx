'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { Shield, Mail, Lock, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

// Temporary static admin credentials
const STATIC_ADMIN_EMAIL = 'admin@talanta.com'
const STATIC_ADMIN_PASSWORD = 'admin123'

export default function AdminLoginPage() {
  const [email, setEmail] = useState(STATIC_ADMIN_EMAIL)
  const [password, setPassword] = useState(STATIC_ADMIN_PASSWORD)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Check against static credentials
    if (email === STATIC_ADMIN_EMAIL && password === STATIC_ADMIN_PASSWORD) {
      // Set cookie for temporary authentication (expires in 1 day)
      document.cookie = 'isAdminLoggedIn=true; path=/admin; max-age=86400; SameSite=Lax'
      toast.success('ADMIN ACCESS GRANTED')
      router.push('/admin')
    } else {
      toast.error('Invalid admin credentials')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 cyber-grid">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-deep-black border border-neon-green/20 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Shield className="w-20 h-20 text-neon-green" />
        </div>

        <div className="text-center space-y-2 mb-10">
          <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">
            ADMIN <span className="text-neon-green">LOGIN</span>
          </h1>
          <p className="text-xs font-bold text-foreground/30 uppercase tracking-[0.3em]">
            Secure Admin Access Only
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <Label className="text-[10px] font-black tracking-widest text-foreground/50 uppercase ml-2">ADMIN EMAIL</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-green/50" />
              <Input 
                type="email" 
                placeholder="ADMIN@TALANTA.COM" 
                className="h-14 pl-12 bg-white/5 border-white/10 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all uppercase text-xs font-bold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black tracking-widest text-foreground/50 uppercase ml-2">ADMIN PASSWORD</Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-green/50" />
              <Input 
                type="password" 
                placeholder="********" 
                className="h-14 pl-12 bg-white/5 border-white/10 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all text-xs font-bold"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <Button 
              type="submit" 
              className="w-full h-14 bg-neon-green text-deep-black font-black italic text-lg shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:scale-[1.02] transition-transform"
              disabled={loading}
            >
              ACCESS ADMIN PANEL <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <div className="relative flex items-center justify-center py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <span className="relative px-4 bg-deep-black text-[10px] font-black text-foreground/20 uppercase tracking-widest">
                OR
              </span>
            </div>

            <Button 
              type="button" 
              variant="outline" 
              className="w-full h-14 border-white/10 text-white font-bold hover:bg-white/5 transition-all"
              onClick={() => router.push('/admin/register')}
              disabled={loading}
            >
              CREATE NEW ADMIN ACCOUNT
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em] leading-relaxed">
            SECURE ENCRYPTION ACTIVE <br />
            AES 256 BIT SSL READY
          </p>
          
          <Button
            type="button"
            variant="ghost"
            className="mt-4 text-xs font-bold text-foreground/50 hover:text-neon-green transition-colors"
            onClick={() => router.push('/login')}
          >
            RETURN TO USER LOGIN
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
