import { Suspense } from 'react'
import CheckoutClient from './CheckoutClient'

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-neon-green border-t-transparent rounded-full animate-spin" />
          <p className="text-foreground/40 font-mono text-sm tracking-widest uppercase">LOADING...</p>
        </div>
      </div>
    }>
      <CheckoutClient />
    </Suspense>
  )
}
