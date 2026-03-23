import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Webhook signature verification failed'
    console.error('Webhook signature verification failed:', message)
    return NextResponse.json({ error: message }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const courseId = session.metadata?.courseId
    const userId = session.metadata?.userId

    if (!courseId || !userId) {
      console.error('Missing metadata in checkout session:', session.id)
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
    }

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ received: true })
    }

    const { data: existing } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single()

    if (!existing) {
      const { error: enrollError } = await supabase
        .from('enrollments')
        .insert({ user_id: userId, course_id: courseId })

      if (enrollError) {
        console.error('Failed to create enrollment:', enrollError)
        return NextResponse.json({ error: 'Failed to create enrollment' }, { status: 500 })
      }
    }
  }

  return NextResponse.json({ received: true })
}
