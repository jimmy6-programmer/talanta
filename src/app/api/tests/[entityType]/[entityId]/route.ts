import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { handleApiError, AppError } from '@/utils/errorHandler'
import { logger } from '@/utils/logger'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ entityType: string; entityId: string }> }
) {
  try {
    const { entityType, entityId } = await params
    logger.info('Fetching test', { entityType, entityId })

    const supabase = await createClient()

    const { data: test, error } = await supabase
      .from('tests')
      .select('*')
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No test found
        logger.info('Test not found', { entityType, entityId })
        return NextResponse.json({ test: null })
      }
      throw new AppError('Database error while fetching test', 500)
    }

    logger.info('Test fetched successfully', { entityType, entityId, testId: test.id })
    return NextResponse.json({ test })
  } catch (error) {
    return handleApiError(error, 'GET Test API')
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ entityType: string; entityId: string }> }
) {
  try {
    const { entityType, entityId } = await params
    const { answers } = await request.json()

    logger.info('Submitting test answers', { entityType, entityId, answersCount: answers.length })

    const supabase = await createClient()

    // Get the test
    const { data: test, error: testError } = await supabase
      .from('tests')
      .select('*')
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .single()

    if (testError || !test) {
      throw new AppError('Test not found', 404)
    }

    // Validate answers
    if (!Array.isArray(answers) || answers.length !== test.questions.length) {
      throw new AppError('Invalid answers format', 400)
    }

    // Calculate score
    let correct = 0
    const questions = test.questions || []

    questions.forEach((question: any, index: number) => {
      if (answers[index] === question.correct_answer_index) {
        correct++
      }
    })

    const score = Math.round((correct / questions.length) * 100)
    const passed = score >= test.passing_score

    logger.info('Test submitted successfully', {
      entityType,
      entityId,
      score,
      passed,
      correct,
      total: questions.length
    })

    // In a real app, you'd save the test result to a user_test_results table
    // For now, just return the result

    return NextResponse.json({
      score,
      correct,
      total: questions.length,
      passed,
      passingScore: test.passing_score
    })
  } catch (error) {
    return handleApiError(error, 'POST Test API')
  }
}