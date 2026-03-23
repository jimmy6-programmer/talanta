'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, ShoppingCart, User, Menu, SquareTerminal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState<any>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // For now, redirect to courses with search param
      router.push(`/courses?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }


    const navLinks = [
      { name: 'Courses', href: '/courses' },
      { name: 'Paths', href: '/paths' },
      { name: 'Community', href: '/community' },
      { name: 'Opportunities', href: '/opportunities' },
    ]


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neon-green/20 bg-deep-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-10 h-10 bg-neon-green rounded-md flex items-center justify-center"
            >
              <SquareTerminal className="text-deep-black w-6 h-6" />
            </motion.div>
            <span className="text-2xl font-black tracking-tighter neon-glow hidden sm:inline-block">
              TALANTA
            </span>
          </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-neon-green ${
                pathname === link.href ? 'text-neon-green underline underline-offset-4' : 'text-foreground/70'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex items-center">
            <motion.form
              initial={false}
              animate={{ 
                width: isSearchOpen ? '200px' : '0px',
                opacity: isSearchOpen ? 1 : 0
              }}
              onSubmit={handleSearch}
              className="overflow-hidden bg-deep-black/50 border border-neon-green/30 rounded-md flex items-center mr-2"
            >
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-sm text-foreground focus:ring-0 px-3 py-1 w-full"
              />
            </motion.form>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:text-neon-green relative z-10"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <X className="w-5 h-5 text-neon-green" /> : <Search className="w-5 h-5" />}
            </Button>
          </div>
            <Button variant="ghost" size="icon" className="hover:text-neon-green hidden sm:flex">
              <ShoppingCart className="w-5 h-5" />
            </Button>
            {user ? (
              <Link href="/dashboard">
                <Button className="bg-neon-green/10 text-neon-green border border-neon-green/30 hover:bg-neon-green hover:text-deep-black transition-all">
                  DASHBOARD <User className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="outline" className="border-neon-green/50 text-neon-green hover:bg-neon-green hover:text-deep-black transition-all duration-300">
                  LOG IN
                </Button>
              </Link>
            )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-deep-black border-b border-neon-green/20 p-4 space-y-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-lg font-medium text-foreground/70 hover:text-neon-green"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/subscribe"
            className="block text-lg font-bold text-neon-green"
            onClick={() => setIsMenuOpen(false)}
          >
            GET ACCESS
          </Link>
        </motion.div>
      )}
    </nav>
  )
}
