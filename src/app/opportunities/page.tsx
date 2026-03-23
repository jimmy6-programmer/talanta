import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Search, Filter, MapPin, Clock, Briefcase } from 'lucide-react'
import Link from 'next/link'

// Static job opportunities data
const jobOpportunities = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    company: 'Tech Innovations Inc.',
    location: 'Remote',
    type: 'Internship',
    experience: 'Entry Level',
    salary: '$3000 - $4000/month',
    description: 'Join our team as a Frontend Developer Intern and work on cutting-edge web applications using React, TypeScript, and modern CSS.',
    requirements: ['Proficiency in React', 'Strong CSS skills', 'Understanding of Git', 'Excellent communication'],
    postedDate: '2 days ago',
    slug: 'frontend-developer-intern-tech-innovations'
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'Digital Solutions Co.',
    location: 'New York, NY',
    type: 'Full Time',
    experience: 'Mid Level',
    salary: '$80000 - $100000/year',
    description: 'We are seeking an experienced Full Stack Developer to build scalable web applications. You will work with Node.js, React, and PostgreSQL.',
    requirements: ['3+ years experience', 'Node.js and React expertise', 'Database design skills', 'API development'],
    postedDate: '1 week ago',
    slug: 'full-stack-developer-digital-solutions'
  },
  {
    id: 3,
    title: 'Data Scientist',
    company: 'Analytics Pro',
    location: 'San Francisco, CA',
    type: 'Full Time',
    experience: 'Senior Level',
    salary: '$120000 - $150000/year',
    description: 'Lead data science initiatives and build predictive models for our clients. Strong background in machine learning and statistical analysis.',
    requirements: ['5+ years experience', 'Python expertise', 'Machine learning knowledge', 'Data visualization skills'],
    postedDate: '3 days ago',
    slug: 'data-scientist-analytics-pro'
  },
  {
    id: 4,
    title: 'Mobile App Developer',
    company: 'Mobile First Apps',
    location: 'Remote',
    type: 'Contract',
    experience: 'Mid Level',
    salary: '$70 - $90/hour',
    description: 'Develop cross-platform mobile applications using React Native. Work on exciting projects for major clients.',
    requirements: ['React Native experience', 'Mobile app development', 'API integration', 'Testing and debugging skills'],
    postedDate: '5 days ago',
    slug: 'mobile-app-developer-mobile-first'
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'Cloud Systems Ltd.',
    location: 'London, UK',
    type: 'Full Time',
    experience: 'Senior Level',
    salary: '£70000 - £90000/year',
    description: 'Manage our cloud infrastructure and CI/CD pipelines. Experience with AWS, Docker, and Kubernetes required.',
    requirements: ['Cloud infrastructure', 'CI/CD pipelines', 'Docker/Kubernetes', 'Linux administration'],
    postedDate: '1 day ago',
    slug: 'devops-engineer-cloud-systems'
  },
  {
    id: 6,
    title: 'UI/UX Designer',
    company: 'Creative Designs Studio',
    location: 'Los Angeles, CA',
    type: 'Part Time',
    experience: 'Entry Level',
    salary: '$25 - $35/hour',
    description: 'Create beautiful and intuitive user interfaces for web and mobile applications. Portfolio required.',
    requirements: ['UI/UX design', 'Figma/Sketch expertise', 'Prototyping skills', 'Design system knowledge'],
    postedDate: '4 days ago',
    slug: 'ui-ux-designer-creative-designs'
  }
]

const filterOptions = {
  location: ['All Locations', 'Remote', 'New York, NY', 'San Francisco, CA', 'London, UK', 'Los Angeles, CA'],
  type: ['All Types', 'Full Time', 'Part Time', 'Contract', 'Internship'],
  experience: ['All Levels', 'Entry Level', 'Mid Level', 'Senior Level'],
  salary: ['All Salaries', '$0 - $50000', '$50000 - $100000', '$100000+']
}

export default function OpportunitiesPage() {
  return (
    <div className="min-h-screen bg-deep-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-4">
            Job Opportunities
          </h1>
          <p className="text-foreground/60 text-lg mb-8 max-w-2xl mx-auto">
            Explore exciting career opportunities from top companies around the world. 
            Find your dream job or internship in tech.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs, companies, or keywords..."
              className="w-full pl-12 pr-4 py-4 bg-zinc-900/50 border border-white/5 rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-neon-green/50 focus:border-neon-green"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
            {Object.entries(filterOptions).map(([key, options]) => (
              <div key={key} className="min-w-fit">
                <select className="bg-zinc-900/50 border border-white/5 rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-neon-green/50 focus:border-neon-green">
                  {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="border-neon-green/30 text-neon-green hover:bg-neon-green hover:text-deep-black">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {jobOpportunities.map((job) => (
            <Link key={job.id} href={`/opportunities/${job.slug}`} className="group flex flex-col">
              <Card className="bg-zinc-900/50 border border-white/5 hover:border-neon-green/50 transition-all duration-300 p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Badge className="mb-2 bg-neon-green/20 text-neon-green border-neon-green/30">
                      {job.type}
                    </Badge>
                    <h3 className="text-xl font-bold group-hover:text-neon-green transition-colors mb-1">
                      {job.title}
                    </h3>
                    <p className="text-foreground/70">{job.company}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-foreground/50">{job.postedDate}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm text-foreground/60 flex-shrink-0">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-neon-green" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2 text-neon-green" />
                    <span>{job.experience}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-neon-green" />
                    <span>{job.salary}</span>
                  </div>
                </div>

                <p className="text-foreground/70 text-sm line-clamp-2 mb-4 flex-shrink-0">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-6 flex-shrink-0">
                  {job.requirements.slice(0, 3).map((req, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-white/5 text-foreground/60">
                      {req}
                    </Badge>
                  ))}
                  {job.requirements.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-white/5 text-foreground/60">
                      +{job.requirements.length - 3} more
                    </Badge>
                  )}
                </div>

                <Button className="w-full bg-neon-green text-deep-black hover:bg-neon-green/90 font-bold mt-auto">
                  View Details
                </Button>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2">
          <Button variant="outline" className="border-white/10 text-foreground/60 hover:text-neon-green disabled:opacity-50" disabled>
            Previous
          </Button>
          <Button className="bg-neon-green text-deep-black hover:bg-neon-green/90 font-bold">1</Button>
          <Button variant="outline" className="border-white/10 text-foreground hover:bg-white/5">2</Button>
          <Button variant="outline" className="border-white/10 text-foreground hover:bg-white/5">3</Button>
          <Button variant="outline" className="border-white/10 text-foreground hover:bg-white/5">Next</Button>
        </div>
      </div>
    </div>
  )
}
