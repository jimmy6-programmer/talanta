'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AdminRegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validate form
    if (!email.endsWith('@admin.talanta.com')) {
      toast.error('ERROR: Only @admin.talanta.com emails are allowed')
      setLoading(false)
      return
    }

    if (password.length < 8) {
      toast.error('ERROR: Password must be at least 8 characters long')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      toast.error('ERROR: Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        toast.error(`ERROR: ${result.error}`)
        setLoading(false)
        return
      }

      toast.success('ADMIN REGISTRATION SUCCESSFUL')
      router.push('/admin/login')
      
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('ERROR: Registration failed')
    } finally {
      setLoading(false)
    }
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
            ADMIN <span className="text-neon-green">REGISTRATION</span>
          </h1>
          <p className="text-xs font-bold text-foreground/30 uppercase tracking-[0.3em]">
            Secure Admin Account Creation
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6 relative z-10">
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

          <div className="space-y-2">
            <Label className="text-[10px] font-black tracking-widest text-foreground/50 uppercase ml-2">CONFIRM PASSWORD</Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-green/50" />
              <Input 
                type="password" 
                placeholder="********" 
                className="h-14 pl-12 bg-white/5 border-white/10 focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all text-xs font-bold"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-red-500 uppercase tracking-wider">
                  SECURITY REQUIREMENTS
                </p>
                <ul className="text-xs text-red-400 space-y-0.5">
                  <li>• Must use @admin.talanta.com email domain</li>
                  <li>• Password must be at least 8 characters</li>
                  <li>• Password must include numbers and letters</li>
                  <li>• Account will have full admin privileges</li>
                </ul>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 bg-red-600 text-white font-black italic text-lg shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:scale-[1.02] transition-transform"
              disabled={loading}
            >
              CREATE ADMIN ACCOUNT <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em] leading-relaxed">
            SECURE ENCRYPTION ACTIVE <br />
            AES 256 BIT SSL READY
          </p>
          
          <Button
            type="button"
            variant="ghost"
            className="text-xs font-bold text-foreground/50 hover:text-neon-green transition-colors"
            onClick={() => router.push('/admin/login')}
          >
            ALREADY HAVE AN ADMIN ACCOUNT? LOGIN
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
