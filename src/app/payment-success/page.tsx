import { Suspense } from 'react'
import PaymentSuccessClient from './PaymentSuccessClient'

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-neon-green border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PaymentSuccessClient />
    </Suspense>
  )
}
