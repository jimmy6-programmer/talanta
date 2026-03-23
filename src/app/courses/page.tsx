import { createClient } from '@/utils/supabase/server'
import { CourseCard } from '@/components/CourseCard'
import { Badge } from '@/components/ui/badge'
import { Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// Static courses to test our new page functionality
const staticCourses = [
  {
    id: 1,
    title: "Web Development Masterclass",
    slug: "web-development",
    description: "Master HTML, CSS, and JavaScript from scratch. Build beautiful, responsive websites with modern web technologies.",
    thumbnail_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
    price: 299.00,
    difficulty: "Beginner",
    categories: { name: "Web Development", slug: "web-development" },
    lessons: [
      { id: 1, title: "Introduction to HTML", duration: 300, is_preview: true },
      { id: 2, title: "CSS Fundamentals", duration: 360, is_preview: true },
      { id: 3, title: "JavaScript Basics", duration: 420, is_preview: true },
      { id: 4, title: "Advanced JavaScript Concepts", duration: 480, is_preview: false },
      { id: 5, title: "DOM Manipulation", duration: 390, is_preview: false }
    ]
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    slug: "data-science",
    description: "Learn Python for data science, visualization, and basic machine learning. Analyze real datasets and build predictive models.",
    thumbnail_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    price: 349.00,
    difficulty: "Intermediate",
    categories: { name: "Data Science", slug: "data-science" },
    lessons: [
      { id: 1, title: "Introduction to Data Science", duration: 300, is_preview: true },
      { id: 2, title: "Python for Data Analysis", duration: 360, is_preview: false },
      { id: 3, title: "Data Visualization", duration: 420, is_preview: false },
      { id: 4, title: "Statistical Analysis", duration: 480, is_preview: false },
      { id: 5, title: "Machine Learning Basics", duration: 390, is_preview: false }
    ]
  },
  {
    id: 3,
    title: "Forex Trading Masterclass",
    slug: "forex-trading",
    description: "Learn professional forex trading strategies, technical analysis, and risk management. Start trading with confidence.",
    thumbnail_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
    price: 249.00,
    difficulty: "Beginner to Advanced",
    categories: { name: "Finance", slug: "finance" },
    lessons: [
      { id: 1, title: "Introduction to Forex Trading", duration: 240, is_preview: true },
      { id: 2, title: "Currency Pairs and Market Structure", duration: 300, is_preview: false },
      { id: 3, title: "Technical Analysis Basics", duration: 360, is_preview: false },
      { id: 4, title: "Advanced Chart Patterns", duration: 420, is_preview: false },
      { id: 5, title: "Risk Management Strategies", duration: 390, is_preview: false }
    ]
  }
]

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>
}) {
  const { category, search } = await searchParams
  const supabase = await createClient()

  const selectStr = category ? '*, categories!inner(name, slug)' : '*, categories(name, slug)'
  let query = supabase
    .from('courses')
    .select(selectStr)
    .eq('is_published', true)

  if (category) {
    query = query.eq('categories.slug', category)
  }

  if (search) {
    query = query.ilike('title', `%${search}%`)
  }

  const { data: courses } = await query.order('created_at', { ascending: false })
  const { data: categories } = await supabase.from('categories').select('*')

  // Fallback to static courses if no DB courses found
  const displayCourses = courses && courses.length > 0 ? courses : staticCourses

  return (
    <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">
              Course <span className="text-neon-green">Archive</span>
            </h1>
            <p className="text-foreground/50 max-w-2xl">
              Explore our elite training modules. Use the neural filters to narrow down your focus area.
            </p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
            <div className="flex flex-wrap gap-2">
              <a href="/courses">
                <Button
                  variant={!category ? 'default' : 'outline'}
                  className={!category ? 'bg-neon-green text-deep-black font-bold' : 'border-white/10 hover:border-neon-green/50'}
                >
                  ALL SYSTEMS
                </Button>
              </a>
            {categories?.map((cat) => (
              <a key={cat.id} href={`/courses?category=${cat.slug}`}>
                <Button
                  variant={category === cat.slug ? 'default' : 'outline'}
                  className={category === cat.slug ? 'bg-neon-green text-deep-black font-bold' : 'border-white/10 hover:border-neon-green/50'}
                >
                  {cat.name.toUpperCase()}
                </Button>
              </a>
            ))}
          </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
              <Input
                placeholder="SEARCH COURSES..."
                className="pl-10 bg-deep-black/50 border-white/10 focus:border-neon-green/50 transition-all"
              />
            </div>
        </div>

        {/* Course Grid */}
        {displayCourses && displayCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                slug={course.slug}
                thumbnail_url={course.thumbnail_url}
                price={course.price}
                difficulty={course.difficulty}
                category={course.categories?.name || 'Uncategorized'}
              />
            ))}
          </div>
          ) : (
            <div className="py-32 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
              <p className="text-foreground/30 font-black italic text-2xl uppercase tracking-widest">
                NO COURSES FOUND IN THIS SECTOR
              </p>
            </div>
          )}
      </div>
    </div>
  )
}
