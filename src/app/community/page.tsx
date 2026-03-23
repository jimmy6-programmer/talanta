'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  User, 
  MessageSquare, 
  Users, 
  ShieldCheck, 
  Zap,
  Loader2,
  Terminal,
  Hash
} from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

interface Message {
  id: string
  content: string
  created_at: string
  user_id: string
  profiles: {
    full_name: string
    avatar_url: string | null
    is_admin: boolean
  }
}

export default function CommunityPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()
  const router = useRouter()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login?redirect=/community')
        return
      }
      setUser(user)

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      setProfile(profile)
      setLoading(false)
    }

    checkUser()
    fetchMessages()

    // Subscribe to realtime messages
    const channel = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        async (payload) => {
          // Fetch the message with profile data
          const { data: newMessageData, error } = await supabase
            .from('messages')
            .select(`
              *,
              profiles (
                full_name,
                avatar_url,
                is_admin
              )
            `)
            .eq('id', payload.new.id)
            .single()

          if (newMessageData) {
            setMessages((prev) => [...prev, newMessageData as Message])
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, router])

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        profiles (
          full_name,
          avatar_url,
          is_admin
        )
      `)
      .order('created_at', { ascending: true })
      .limit(50)

    if (data) {
      setMessages(data as any)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !user || sending) return

    setSending(true)
    const { error } = await supabase
      .from('messages')
      .insert([
        {
          user_id: user.id,
          content: newMessage.trim(),
        }
      ])

    if (error) {
      console.error('Error sending message:', error)
    } else {
      setNewMessage('')
    }
    setSending(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-deep-black flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-neon-green animate-spin" />
        <p className="text-neon-green font-mono tracking-widest animate-pulse">
          INITIALIZING_COMMUNITY_LINK...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-deep-black pt-24 pb-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
          {/* Sidebar - Visible on all screens */}
          <div className="flex flex-col space-y-6">
            <div className="bg-deep-black/40 border border-neon-green/20 rounded-xl p-6 backdrop-blur-xl">
              <h3 className="text-xl font-black text-neon-green mb-4 flex items-center">
                <Users className="mr-2 w-5 h-5" /> CHANNELS
              </h3>
              <div className="space-y-2">
                <button className="w-full flex items-center px-3 py-2 bg-neon-green/10 text-neon-green rounded-lg border border-neon-green/30">
                  <Hash className="w-4 h-4 mr-2" /> global-chat
                </button>
                <button className="w-full flex items-center px-3 py-2 text-foreground/50 hover:bg-white/5 rounded-lg transition-all">
                  <Hash className="w-4 h-4 mr-2" /> tech-support
                </button>
                <button className="w-full flex items-center px-3 py-2 text-foreground/50 hover:bg-white/5 rounded-lg transition-all">
                  <Hash className="w-4 h-4 mr-2" /> course-q-and-a
                </button>
              </div>
            </div>

            <div className="bg-deep-black/40 border border-neon-green/20 rounded-xl p-6 backdrop-blur-xl flex-grow overflow-hidden flex flex-col">
              <h3 className="text-lg font-black text-neon-green mb-4 flex items-center">
                <Zap className="mr-2 w-5 h-5" /> NEURAL_STATUS
              </h3>
              <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                  <span className="text-sm font-mono text-foreground/70">Lead Architect (Online)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-neon-green" />
                  <span className="text-sm font-mono text-foreground/70">Skill Bot (AI)</span>
                </div>
                {/* Random Mock Users */}
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <span className="text-sm font-mono text-foreground/40 text-xs">User_{Math.floor(Math.random() * 9999)}_Disconnected</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3 flex flex-col bg-deep-black/40 border border-neon-green/20 rounded-xl overflow-hidden backdrop-blur-xl relative h-[600px] lg:h-[calc(100vh-10px)]">
            {/* Chat Header */}
            <div className="p-4 border-b border-neon-green/10 flex items-center justify-between bg-deep-black/60">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-neon-green/20 flex items-center justify-center border border-neon-green/30">
                  <Terminal className="text-neon-green w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight flex items-center">
                    GLOBAL_CHAT_RELAY <span className="ml-2 text-[10px] bg-neon-green/20 text-neon-green px-1.5 py-0.5 rounded border border-neon-green/30 uppercase tracking-tighter">Secure</span>
                  </h2>
                  <p className="text-xs text-neon-green/60 font-mono">Channel active • Protocol v2.4.0</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center space-x-2">
                <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                  <span className="text-[10px] font-mono text-white/70 uppercase">Uplink Stable</span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar scroll-smooth">
              <div className="text-center py-8">
                <p className="text-xs font-mono text-neon-green/30 uppercase tracking-[0.2em]">--- Beginning of Neural Stream ---</p>
              </div>

              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex items-start space-x-4 ${msg.user_id === user?.id ? 'flex-row-reverse space-x-reverse' : ''}`}
                  >
                    <div className="flex-shrink-0">
                      {msg.profiles?.avatar_url ? (
                        <img 
                          src={msg.profiles.avatar_url} 
                          alt={msg.profiles.full_name}
                          className="w-10 h-10 rounded-lg border border-neon-green/20 object-cover"
                        />
                      ) : (
                        <div className={`w-10 h-10 rounded-lg border border-neon-green/20 flex items-center justify-center ${msg.profiles?.is_admin ? 'bg-neon-green/20' : 'bg-white/5'}`}>
                          <User className={`w-5 h-5 ${msg.profiles?.is_admin ? 'text-neon-green' : 'text-white/40'}`} />
                        </div>
                      )}
                    </div>
                    
                    <div className={`max-w-[70%] space-y-1 ${msg.user_id === user?.id ? 'items-end' : ''}`}>
                      <div className={`flex items-center space-x-2 ${msg.user_id === user?.id ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <span className={`text-xs font-bold tracking-tight ${msg.profiles?.is_admin ? 'text-neon-green' : 'text-white/80'}`}>
                          {msg.profiles?.full_name || 'Anonymous User'}
                        </span>
                        {msg.profiles?.is_admin && (
                          <ShieldCheck className="w-3 h-3 text-neon-green" />
                        )}
                        <span className="text-[9px] font-mono text-white/30 uppercase">
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed border ${
                        msg.user_id === user?.id 
                          ? 'bg-neon-green/10 border-neon-green/30 text-neon-green rounded-tr-none' 
                          : 'bg-white/5 border-white/10 text-white/90 rounded-tl-none'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-deep-black/60 border-t border-neon-green/10">
              <form onSubmit={handleSendMessage} className="relative group">
                <div className="absolute inset-0 bg-neon-green/5 blur-xl group-focus-within:bg-neon-green/10 transition-all rounded-xl" />
                <div className="relative flex items-center space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message into the matrix..."
                    className="bg-deep-black/80 border-neon-green/20 focus:border-neon-green/50 text-white placeholder:text-white/20 h-12 pr-10 rounded-xl"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={!newMessage.trim() || sending}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-neon-green hover:bg-neon-green/80 text-deep-black rounded-lg transition-all disabled:opacity-50"
                  >
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </Button>
                </div>
              </form>
              <p className="mt-2 text-[10px] font-mono text-white/20 text-center uppercase tracking-widest">
                Press ENTER to transmit data • Be respectful in the neural stream
              </p>
            </div>

            {/* Scanline Effect overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 bg-[length:100%_2px,3px_100%] opacity-20" />
          </div>
        </div>
      </div>
    </div>
  )
}
