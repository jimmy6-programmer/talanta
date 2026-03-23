'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { Shield, Mail, Lock, ArrowRight, Github } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

      if (error) {
        toast.error(error.message)
      } else {
        toast.success('DECRYPTION SUCCESSFUL: WELCOME BACK')
        router.push('/dashboard')
      }
      setLoading(false)
    }
  
    const handleSignUp = async () => {
      setLoading(true)
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
  
      if (error) {
        toast.error(error.message)
      } else {
        toast.success('VERIFICATION LINK SENT: CHECK INBOX')
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
              SYS <span className="text-neon-green">LOGIN</span>
            </h1>
            <p className="text-xs font-bold text-foreground/30 uppercase tracking-[0.3em]">
              Neural Authentication Required
            </p>
          </div>
  
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <Label className="text-[10px] font-black tracking-widest text-foreground/50 uppercase ml-2">USER ID (EMAIL)</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-green/50" />
                <Input 
                  type="email" 
                  placeholder="ID@PROVIDER.COM" 
                  className="h-14 pl-12 bg-white/5 border-white/10 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all uppercase text-xs font-bold"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
  
            <div className="space-y-2">
              <Label className="text-[10px] font-black tracking-widest text-foreground/50 uppercase ml-2">ACCESS KEY (PASSWORD)</Label>
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
                INITIATE SESSION <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <div className="relative flex items-center justify-center py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <span className="relative px-4 bg-deep-black text-[10px] font-black text-foreground/20 uppercase tracking-widest">
                  OR USE EXT AUTH
                </span>
              </div>
  
              <Button 
                type="button" 
                variant="outline" 
                className="w-full h-14 border-white/10 text-white font-bold hover:bg-white/5 transition-all"
                onClick={handleSignUp}
                disabled={loading}
              >
                REGISTER NEW NODE
              </Button>
            </div>
          </form>
  
          <div className="mt-8 text-center">
            <p className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em] leading-relaxed">
              SECURE ENCRYPTION ACTIVE <br />
              AES 256 BIT SSL READY
            </p>
          </div>
      </motion.div>
    </div>
  )
}
