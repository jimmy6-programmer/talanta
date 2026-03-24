import { createClient } from '@/utils/supabase/server'
import { CheckCircle2, Play, ChevronLeft, Menu, Lock } from 'lucide-react'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { CompleteButton } from '@/components/CompleteButton'
import { CodeEditor } from '@/components/CodeEditor'
import TradingChart from '@/components/TradingChart'
import TestComponent from '@/components/TestComponent'

// Static course data for testing (will replace with DB data when available)
const staticCourses = {
  'web-development': {
    id: 1,
    title: 'Web Development Masterclass',
    lessons: [
      {
        id: 1,
        title: 'Introduction to HTML',
        slug: 'introduction-to-html',
        duration: 300,
        is_preview: true,
        content: `
          <h3>What is HTML?</h3>
          <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications. It describes the structure of a web page semantically and originally included cues for the appearance of the document.</p>
          
          <h3>Basic HTML Structure</h3>
          <p>Every HTML document follows a basic structure:</p>
          
          <h3>Key Concepts</h3>
          <ul>
            <li><strong>Elements:</strong> The building blocks of HTML</li>
            <li><strong>Tags:</strong> Mark the start and end of elements</li>
            <li><strong>Attributes:</strong> Provide additional information about elements</li>
            <li><strong>Semantic HTML:</strong> Uses tags that describe their purpose</li>
          </ul>
        `,
        type: 'exercise',
        showIDE: true,
        initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First HTML Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
        }
        .container {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        p {
            line-height: 1.6;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <h1>Welcome to HTML</h1>
    <div class="container">
        <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages.</p>
        
        <h2>Key Features:</h2>
        <ul>
            <li>Structure web content</li>
            <li>Create links between pages</li>
            <li>Embed images and multimedia</li>
            <li>Build forms for user input</li>
        </ul>
        
        <p>HTML uses tags to define elements, and each tag serves a specific purpose.</p>
    </div>
</body>
</html>`,
        language: 'html' as const,
        exercise: {
            question: 'Create an HTML page with a header, main content area, and footer',
            tests: [
                { input: 'Check for header tag', expected: 'Header element exists' },
                { input: 'Check for main content', expected: 'Main content area exists' },
                { input: 'Check for footer', expected: 'Footer element exists' }
            ]
        }
      },
      {
        id: 2,
        title: 'CSS Fundamentals',
        slug: 'css-fundamentals',
        duration: 360,
        is_preview: true,
        content: `
          <h3>What is CSS?</h3>
          <p>CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML or XML. CSS describes how elements should be rendered on screen, paper, or in other media.</p>
          
          <h3>CSS Syntax</h3>
          <p>CSS rules consist of selectors and declarations:</p>
          
          <h3>Selectors</h3>
          <ul>
            <li><strong>Element Selector:</strong> Selects elements by tag name</li>
            <li><strong>Class Selector:</strong> Selects elements with a specific class attribute</li>
            <li><strong>ID Selector:</strong> Selects an element with a specific ID attribute</li>
            <li><strong>Attribute Selector:</strong> Selects elements with specific attributes</li>
          </ul>
        `,
        type: 'exercise',
        initialCode: `/* CSS Styles */
body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 960px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border-radius: 8px;
}

h1 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 30px;
}

.card {
    background-color: #f8f9fa;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 6px;
    border-left: 4px solid #3498db;
    transition: all 0.3s ease;
}

.card:hover {
    background-color: #e9ecef;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.btn {
    display: inline-block;
    background-color: #3498db;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #2980b9;
}

@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
    
    h1 {
        font-size: 1.5em;
    }
}`,
        language: 'css' as const,
        showIDE: true,
        exercise: {
            question: 'Create a CSS class that styles a button with hover effects',
            tests: [
                { input: 'Check button background color', expected: 'Button has blue background' },
                { input: 'Check hover effect', expected: 'Button darkens on hover' },
                { input: 'Check border radius', expected: 'Button has rounded corners' }
            ]
        }
      },
      {
        id: 3,
        title: 'JavaScript Basics',
        slug: 'javascript-basics',
        duration: 420,
        is_preview: true,
        content: `
          <h3>What is JavaScript?</h3>
          <p>JavaScript is a programming language that allows you to implement complex features on web pages. It enables interactive web pages and is an essential part of web applications.</p>
          
          <h3>Variables and Data Types</h3>
          <p>JavaScript has several primitive data types:</p>
          
          <h3>Functions</h3>
          <p>Functions are reusable blocks of code that perform a specific task:</p>
        `,
        type: 'exercise',
        initialCode: `// JavaScript Examples

// Variables
let message = 'Hello, World!';
const PI = 3.14159;
var count = 5;

// Data types
console.log(typeof message); // string
console.log(typeof PI); // number
console.log(typeof count); // number

// Functions
function greet(name) {
    return \`Hello, \${name}!\`;
}

const add = (a, b) => a + b;

// Objects
const person = {
    name: 'John Doe',
    age: 30,
    hobbies: ['reading', 'coding', 'gaming'],
    address: {
        street: '123 Main St',
        city: 'New York',
        country: 'USA'
    },
    greet: function() {
        console.log(\`Hello, my name is \${this.name}\`);
    }
};

// Arrays
const numbers = [1, 2, 3, 4, 5];

// Array methods
const doubled = numbers.map(num => num * 2);
const even = numbers.filter(num => num % 2 === 0);
const sum = numbers.reduce((acc, num) => acc + num, 0);

// DOM manipulation
document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('button');
    const container = document.querySelector('.container');
    
    button.addEventListener('click', function() {
        const newElement = document.createElement('div');
        newElement.textContent = 'Dynamic Content!';
        newElement.className = 'dynamic';
        container.appendChild(newElement);
    });
});`,
        language: 'javascript' as const,
        showIDE: true,
        exercise: {
            question: 'Create a function that reverses a string',
            tests: [
                { input: 'hello', expected: 'olleh' },
                { input: 'JavaScript', expected: 'tpircSavaJ' },
                { input: '', expected: '' }
            ]
        }
      },
      {
        id: 4,
        title: 'Introduction to Forex Trading',
        slug: 'forex-trading-intro',
        duration: 240,
        is_preview: true,
        content: `
          <h3>What is Forex Trading?</h3>
          <p>Forex (Foreign Exchange) trading involves buying and selling currencies with the aim of making a profit. The forex market is the largest and most liquid financial market in the world.</p>
          
          <h3>Key Concepts</h3>
          <ul>
            <li><strong>Currency Pairs:</strong> Currencies are traded in pairs (e.g., EUR/USD)</li>
            <li><strong>Exchange Rate:</strong> The price of one currency in terms of another</li>
            <li><strong>Pips:</strong> The smallest unit of price movement</li>
            <li><strong>Leverage:</strong> Borrowed capital to increase trading position size</li>
          </ul>
          
          <h3>Trading Hours</h3>
          <p>The forex market is open 24 hours a day, 5 days a week, with trading sessions overlapping across major financial centers.</p>
        `,
        type: 'chart',
        showIDE: false,
        chartData: {
            type: 'candlestick',
            symbol: 'EUR/USD',
            timeframe: '1H',
            data: [
                { time: '2024-01-01', open: 1.0850, high: 1.0860, low: 1.0845, close: 1.0855 },
                { time: '2024-01-02', open: 1.0855, high: 1.0870, low: 1.0850, close: 1.0865 },
                { time: '2024-01-03', open: 1.0865, high: 1.0875, low: 1.0860, close: 1.0870 },
                { time: '2024-01-04', open: 1.0870, high: 1.0878, low: 1.0865, close: 1.0872 },
                { time: '2024-01-05', open: 1.0872, high: 1.0880, low: 1.0868, close: 1.0875 },
                { time: '2024-01-06', open: 1.0875, high: 1.0890, low: 1.0870, close: 1.0885 },
                { time: '2024-01-07', open: 1.0885, high: 1.0900, low: 1.0880, close: 1.0895 },
                { time: '2024-01-08', open: 1.0895, high: 1.0910, low: 1.0885, close: 1.0905 },
                { time: '2024-01-09', open: 1.0905, high: 1.0920, low: 1.0895, close: 1.0915 },
                { time: '2024-01-10', open: 1.0915, high: 1.0930, low: 1.0900, close: 1.0925 }
            ]
        }
      }
    ]
  },
  'data-science': {
    id: 2,
    title: 'Data Science Fundamentals',
    lessons: [
       {
        id: 1,
        title: 'Introduction to Data Science',
        slug: 'data-science-intro',
        duration: 300,
        is_preview: true,
        content: `
          <h3>What is Data Science?</h3>
          <p>Data Science is an interdisciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data.</p>
          
          <h3>Key Components</h3>
          <ul>
            <li><strong>Data Collection:</strong> Gathering data from various sources</li>
            <li><strong>Data Cleaning:</strong> Preprocessing and cleaning messy data</li>
            <li><strong>Exploratory Analysis:</strong> Understanding patterns and relationships</li>
            <li><strong>Machine Learning:</strong> Building predictive models</li>
            <li><strong>Visualization:</strong> Communicating findings effectively</li>
          </ul>
        `,
        type: 'exercise',
        initialCode: `# Python for Data Science
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Load dataset
df = pd.read_csv('data.csv')

# Basic information about the dataset
print("Dataset Shape:", df.shape)
print("\\nFirst 5 Rows:")
print(df.head())

# Summary statistics
print("\\nSummary Statistics:")
print(df.describe())

# Check for missing values
print("\\nMissing Values:")
print(df.isnull().sum())

# Data visualization
plt.figure(figsize=(10, 6))
sns.histplot(df['value'], bins=30, kde=True)
plt.title('Distribution of Values')
plt.xlabel('Value')
plt.ylabel('Frequency')
plt.show()

# Correlation heatmap
correlation_matrix = df.corr()
plt.figure(figsize=(12, 8))
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', vmin=-1, vmax=1)
plt.title('Correlation Heatmap')
plt.show()

# Basic machine learning example
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Prepare data
X = df[['feature1', 'feature2', 'feature3']]
y = df['target']

# Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("\\nModel Evaluation:")
print(f"Mean Squared Error: {mse:.2f}")
print(f"R-squared Score: {r2:.2f}")

# Coefficients
print("\\nModel Coefficients:")
print(pd.DataFrame({'Feature': X.columns, 'Coefficient': model.coef_}))`,
        language: 'python' as const,
        showIDE: true,
        exercise: {
            question: 'Write a Python function to calculate the mean, median, and standard deviation of a dataset',
            tests: [
                { input: '[1, 2, 3, 4, 5]', expected: 'Mean: 3, Median: 3, Std: 1.41' },
                { input: '[10, 20, 30, 40, 50]', expected: 'Mean: 30, Median: 30, Std: 14.14' },
                { input: '[5, 5, 5, 5, 5]', expected: 'Mean: 5, Median: 5, Std: 0' }
            ]
        }
      }
    ]
  }
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>
}) {
  const { slug, lessonSlug } = await params
  const supabase = await createClient()

  // Try to get data from database first
  const { data: course } = await supabase
    .from('courses')
    .select(`
      *,
      course_sections(
        *,
        lessons(*)
      )
    `)
    .eq('slug', slug)
    .single()

  // Fallback to static data if not in database
  let lesson: any
  let sortedLessons: any[]

  if (course) {
    // Flatten lessons from all sections
    const allLessons = course.course_sections?.flatMap((section: any) => section.lessons || []) || []
    lesson = allLessons.find((l: any) => l.slug === lessonSlug)
    if (!lesson) notFound()

    sortedLessons = allLessons.sort((a: any, b: any) => a.order_index - b.order_index)
  } else {
    // Check if we have static data for this course
    const staticCourse = staticCourses[slug as keyof typeof staticCourses]
    if (!staticCourse) notFound()

    lesson = staticCourse.lessons.find((l: any) => l.slug === lessonSlug)
    if (!lesson) notFound()

    sortedLessons = staticCourse.lessons.sort((a: any, b: any) => a.id - b.id)
  }

  const { data: { user } } = await supabase.auth.getUser()
  
  // Check actual enrollment (only for DB courses)
  let isEnrolled = false
  if (user && course) {
    const { data: enrollment } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', user.id)
      .eq('course_id', course.id)
      .single()
    
    isEnrolled = !!enrollment
  }

  if (course && !lesson.is_preview && !isEnrolled) {
    redirect(`/courses/${slug}`)
  }

  const currentIdx = sortedLessons?.findIndex((l: any) => l.slug === lessonSlug) || 0
  const nextLesson = sortedLessons?.[currentIdx + 1]

  // Helper function to extract YouTube video ID
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/[?&]v=([^#\&\?]*)/)
    return match && match[1]
  }

  return (
    <div className="min-h-screen bg-deep-black">
      <div className="flex flex-col md:flex-row">
        {/* Lesson Sidebar */}
        <div className="hidden lg:flex flex-col w-80 border-r border-white/5 bg-zinc-950/50 sticky top-0">
            <div className="p-6 border-b border-white/5">
              <Link href={`/courses/${slug}`} className="text-xs font-bold text-neon-green flex items-center hover:underline">
                <ChevronLeft className="w-4 h-4 mr-1" />
                BACK TO COURSE
              </Link>
              <h2 className="text-sm font-black italic tracking-tighter uppercase mt-4">
                {course?.title || staticCourses[slug]?.title}
              </h2>
            </div>
          <div className="flex-1 overflow-y-auto">
            {sortedLessons?.map((l: any, idx: number) => (
              <Link 
                key={l.id} 
                href={`/courses/${slug}/lessons/${l.slug}`}
                className={`flex items-center space-x-4 p-4 border-b border-white/5 transition-colors group ${
                  l.slug === lessonSlug ? 'bg-neon-green/5 border-l-2 border-l-neon-green' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-foreground/30 group-hover:text-neon-green">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold truncate ${l.slug === lessonSlug ? 'text-neon-green' : 'text-foreground/70'}`}>
                    {l.title}
                  </p>
                  <p className="text-[10px] text-foreground/30 uppercase tracking-widest font-black">
                    {Math.floor(l.duration / 60)}m {l.duration % 60}s
                  </p>
                </div>
                {(!l.is_preview && !isEnrolled) ? (
                  <Lock className="w-3 h-3 text-foreground/20" />
                ) : (
                  <Play className={`w-3 h-3 ${l.slug === lessonSlug ? 'text-neon-green' : 'text-foreground/20'}`} />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden">
          <div className={`flex h-full ${lesson.show_ide || lesson.type === 'chart' ? 'flex-col lg:flex-row' : 'flex-col'}`}>
            {/* Left Column: Video & Content */}
            <div className={`${lesson.show_ide || lesson.type === 'chart' ? 'w-full lg:w-1/2 lg:pr-3' : 'w-full'}`}>
              {/* Video Player */}
              <div className="aspect-video w-full bg-zinc-900 relative overflow-hidden">
                {lesson.video_url && getYouTubeVideoId(lesson.video_url) ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(lesson.video_url)}`}
                    title={lesson.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Mock video player interface */}
                    <div className="w-full h-full flex items-center justify-center flex-col space-y-4">
                      <div className="w-20 h-20 bg-neon-green/10 rounded-full flex items-center justify-center group-hover:bg-neon-green group-hover:scale-110 transition-all duration-500 cursor-pointer">
                        <Play className="w-10 h-10 text-neon-green group-hover:text-deep-black fill-current ml-1" />
                      </div>
                      <p className="text-[10px] font-black italic tracking-[0.5em] text-neon-green/50">
                        {lesson.type === 'chart' ? 'CHART ANALYSIS...' : lesson.show_ide ? 'CODE EXECUTION...' : 'STREAM DECODING...'}
                      </p>
                    </div>

                    {/* Controls Overlay (Mock) */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Play className="w-4 h-4 text-white" />
                          <div className="w-32 md:w-64 h-1 bg-white/20 rounded-full relative overflow-hidden">
                            <div className="absolute top-0 left-0 h-full w-1/3 bg-neon-green" />
                          </div>
                          <span className="text-[10px] font-bold text-white">10:30 / {Math.floor(lesson.duration / 60)}:{String(lesson.duration % 60).padStart(2, '0')}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="text-white hover:text-neon-green text-[10px] font-bold tracking-widest">
                            1.0X
                          </Button>
                          <Button variant="ghost" size="sm" className="text-white hover:text-neon-green text-[10px] font-bold tracking-widest">
                            1080P SYS
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Lesson Content */}
              <div className="p-6 md:p-12">
                <div className="max-w-4xl mx-auto space-y-8">
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-[10px] font-black tracking-widest uppercase text-neon-green border-neon-green/30">
                      LESSON {lesson.order_index || currentIdx + 1}
                    </Badge>
                    <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">
                      {lesson.title}
                    </h1>
                  </div>

                  <div className="prose prose-invert max-w-none prose-p:text-foreground/60 prose-headings:italic prose-headings:font-black">
                    <div dangerouslySetInnerHTML={{ __html: lesson.content }} />

                    {lesson.exercise && (
                      <div className="mt-8 p-6 bg-zinc-900/50 border border-white/5 rounded-xl">
                        <h3 className="text-neon-green font-bold mb-4">Exercise</h3>
                        {(() => {
                          try {
                            const exerciseData = typeof lesson.exercise === 'string' ? JSON.parse(lesson.exercise) : lesson.exercise;
                            return (
                              <>
                                <p className="mb-4">{exerciseData?.question}</p>
                                {exerciseData?.tests && exerciseData.tests.length > 0 && (
                                  <div className="space-y-2">
                                    <h4 className="text-sm font-bold text-foreground/70">Test Cases:</h4>
                                    {exerciseData.tests.map((test: any, index: number) => (
                                      <div key={index} className="text-xs bg-black/30 p-2 rounded">
                                        <code>Input: {test.input} → Output: {test.expected}</code>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </>
                            );
                          } catch (error) {
                            console.error('Error parsing exercise data:', error);
                            return <p className="text-red-400">Error loading exercise data</p>;
                          }
                        })()}
                      </div>
                    )}

                    {/* Test Component */}
                    <div className="mt-8">
                      <TestComponent
                        entityType="lesson"
                        entityId={lesson.id}
                        title={`${lesson.title} Test`}
                      />
                    </div>

                    {/* Complete Button */}
                    {course && (
                      <div className="mt-8 flex justify-center">
                        <CompleteButton
                          lessonId={lesson.id}
                          nextLessonSlug={nextLesson?.slug || null}
                          courseSlug={slug}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

              {/* Right Column: IDE or Chart (Conditionally Rendered) */}
              {(lesson.show_ide || lesson.type === 'chart') && (
                <div className="w-full lg:w-1/2 lg:pl-3 border-t lg:border-t-0 lg:border-l border-white/5 bg-zinc-900 mt-6 lg:mt-0 overflow-hidden">
                {lesson.show_ide ? (
                  <div className="h-full flex flex-col">
                    <div className="bg-zinc-950 border-b border-white/5 px-4 py-2">
                      <h3 className="text-xs font-bold text-neon-green uppercase tracking-wider">
                        {lesson.language?.toUpperCase()} EDITOR
                      </h3>
                    </div>
                    <div className="flex-1">
                      <CodeEditor
                        initialCode={lesson.initial_code}
                        language={lesson.language}
                        title={`${lesson.title} - Code Editor`}
                        readOnly={false}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col">
                    <div className="bg-zinc-950 border-b border-white/5 px-4 py-2">
                      <h3 className="text-xs font-bold text-neon-green uppercase tracking-wider">
                        LIVE CHART - {lesson.chart_data?.symbol}
                      </h3>
                    </div>
                    <div className="flex-1">
                      <TradingChart
                        symbol={lesson.chart_data?.symbol}
                        timeframe={lesson.chart_data?.timeframe}
                        height={700}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}