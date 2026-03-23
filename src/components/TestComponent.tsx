'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, Trophy, Target } from 'lucide-react'

interface Question {
  question: string
  options: string[]
  correct_answer_index: number
}

interface Test {
  id: number
  title: string
  questions: Question[]
  passing_score: number
}

interface TestResult {
  score: number
  correct: number
  total: number
  passed: boolean
  passingScore: number
}

interface TestComponentProps {
  entityType: 'section' | 'lesson'
  entityId: number
  title: string
}

export default function TestComponent({ entityType, entityId, title }: TestComponentProps) {
  const [test, setTest] = useState<Test | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<TestResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    fetchTest()
  }, [entityType, entityId])

  const fetchTest = async () => {
    try {
      const response = await fetch(`/api/tests/${entityType}/${entityId}`)
      const data = await response.json()
      if (data.test) {
        setTest(data.test)
        setAnswers(new Array(data.test.questions.length).fill(-1))
      }
    } catch (error) {
      console.error('Error fetching test:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = answerIndex
    setAnswers(newAnswers)
  }

  const handleSubmit = async () => {
    if (!test) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/tests/${entityType}/${entityId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      })

      const data = await response.json()
      setResult(data)
      setShowResults(true)
    } catch (error) {
      console.error('Error submitting test:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const canSubmit = answers.every(answer => answer !== -1)

  if (isLoading) {
    return (
      <Card className="bg-zinc-900/50 border-white/5">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
            <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
            <div className="h-4 bg-zinc-700 rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!test) {
    return (
      <Card className="bg-zinc-900/50 border-white/5">
        <CardContent className="p-6 text-center">
          <p className="text-foreground/50">No test available for this {entityType}.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-zinc-900/50 border-white/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-neon-green">
          <Target className="w-5 h-5" />
          {test.title}
        </CardTitle>
        <CardDescription>
          {test.questions.length} questions • Passing score: {test.passing_score}%
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!showResults ? (
          <>
            {test.questions.map((question, qIndex) => (
              <div key={qIndex} className="space-y-4">
                <h3 className="font-semibold text-foreground">
                  {qIndex + 1}. {question.question}
                </h3>
                <RadioGroup
                  value={answers[qIndex].toString()}
                  onValueChange={(value) => handleAnswerChange(qIndex, parseInt(value))}
                  className="space-y-2"
                >
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center space-x-2">
                      <RadioGroupItem value={oIndex.toString()} id={`q${qIndex}-o${oIndex}`} />
                      <Label htmlFor={`q${qIndex}-o${oIndex}`} className="text-foreground/80 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}

            <Button
              onClick={handleSubmit}
              disabled={!canSubmit || isSubmitting}
              className="w-full bg-neon-green text-deep-black font-bold"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Test'}
            </Button>
          </>
        ) : (
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2">
              {result?.passed ? (
                <>
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                  <Badge className="bg-green-500 text-white">PASSED</Badge>
                </>
              ) : (
                <>
                  <XCircle className="w-8 h-8 text-red-500" />
                  <Badge className="bg-red-500 text-white">FAILED</Badge>
                </>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-neon-green">
                {result?.score}%
              </h3>
              <p className="text-foreground/60">
                {result?.correct} out of {result?.total} correct
              </p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <p className="text-xs text-foreground/40 uppercase tracking-wider">Your Score</p>
                <p className="font-bold">{result?.score}%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-foreground/40 uppercase tracking-wider">Required</p>
                <p className="font-bold">{result?.passingScore}%</p>
              </div>
            </div>

            <Button
              onClick={() => {
                setShowResults(false)
                setAnswers(new Array(test.questions.length).fill(-1))
                setResult(null)
              }}
              variant="outline"
              className="border-neon-green/50 text-neon-green hover:bg-neon-green/10"
            >
              Retake Test
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}