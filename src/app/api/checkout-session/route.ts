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
  try {
    const { courseId, userId, plan, price } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    const origin = req.headers.get('origin') || 'http://localhost:3000'

    if (plan) {
      const priceInCents = Math.round(Number(price) * 100)
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment', // Using payment for now to simplify demo, though plan should be subscription
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: plan,
                description: `Full access to all Talanta courses and resources.`,
              },
              unit_amount: priceInCents,
            },
            quantity: 1,
          },
        ],
        metadata: {
          plan,
          userId,
        },
        success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&plan=${encodeURIComponent(plan)}`,
        cancel_url: `${origin}/subscribe`,
      })
      return NextResponse.json({ url: session.url, sessionId: session.id })
    }

    if (!courseId) {
      return NextResponse.json({ error: 'courseId or plan is required' }, { status: 400 })
    }

    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('id, title, slug, price, thumbnail_url, description')
      .eq('id', courseId)
      .single()

    if (courseError || !course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    const { data: existingEnrollment } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single()

    if (existingEnrollment) {
      return NextResponse.json({ error: 'Already enrolled in this course' }, { status: 409 })
    }

    const priceInCents = Math.round(Number(course.price) * 100)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course.title,
              description: course.description || undefined,
              images: course.thumbnail_url ? [course.thumbnail_url] : [],
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        courseId: course.id,
        userId,
        courseSlug: course.slug,
      },
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&course=${course.slug}`,
      cancel_url: `${origin}/courses/${course.slug}`,
    })

    return NextResponse.json({ url: session.url, sessionId: session.id })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
