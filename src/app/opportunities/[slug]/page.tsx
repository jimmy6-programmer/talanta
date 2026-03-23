import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { MapPin, Clock, Briefcase, ExternalLink, Share2, Bookmark, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// Static job opportunities data (same as in main page for consistency)
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
    responsibilities: [
      'Develop and maintain user interface components',
      'Collaborate with designers and backend developers',
      'Write clean, maintainable code',
      'Participate in code reviews',
      'Learn and implement new technologies'
    ],
    benefits: [
      'Mentorship from senior developers',
      'Remote work flexibility',
      'Competitive stipend',
      'Potential for full-time employment',
      'Learning and development budget'
    ],
    postedDate: '2 days ago',
    slug: 'frontend-developer-intern-tech-innovations',
    companyLogo: '/placeholder.svg?height=60&width=60&text=Tech+Innovations',
    companyWebsite: 'https://techinnovations.example.com'
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
    responsibilities: [
      'Design and implement full-stack solutions',
      'Build RESTful APIs',
      'Optimize application performance',
      'Mentor junior developers',
      'Contribute to architectural decisions'
    ],
    benefits: [
      'Competitive salary and equity',
      'Health, dental, and vision insurance',
      '401(k) with company match',
      'Flexible work schedule',
      'Professional development budget'
    ],
    postedDate: '1 week ago',
    slug: 'full-stack-developer-digital-solutions',
    companyLogo: '/placeholder.svg?height=60&width=60&text=Digital+Solutions',
    companyWebsite: 'https://digitalsolutions.example.com'
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
    responsibilities: [
      'Develop predictive models',
      'Analyze large datasets',
      'Build data pipelines',
      'Present findings to stakeholders',
      'Guide the data science team'
    ],
    benefits: [
      'Highly competitive salary',
      'Stock options',
      'Comprehensive health coverage',
      'Unlimited PTO',
      'On-site gym and meals'
    ],
    postedDate: '3 days ago',
    slug: 'data-scientist-analytics-pro',
    companyLogo: '/placeholder.svg?height=60&width=60&text=Analytics+Pro',
    companyWebsite: 'https://analyticspro.example.com'
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
    responsibilities: [
      'Build cross-platform mobile apps',
      'Integrate with backend APIs',
      'Optimize app performance',
      'Fix bugs and improve stability',
      'Collaborate with design team'
    ],
    benefits: [
      'Competitive hourly rate',
      'Flexible working hours',
      'Remote work',
      'Project-based work',
      'Client exposure'
    ],
    postedDate: '5 days ago',
    slug: 'mobile-app-developer-mobile-first',
    companyLogo: '/placeholder.svg?height=60&width=60&text=Mobile+First',
    companyWebsite: 'https://mobilefirst.example.com'
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
    responsibilities: [
      'Manage cloud infrastructure',
      'Build and maintain CI/CD pipelines',
      'Monitor system performance',
      'Implement security measures',
      'Troubleshoot issues'
    ],
    benefits: [
      'Competitive salary',
      'Health and wellness package',
      'Pension scheme',
      'Remote work options',
      'Training budget'
    ],
    postedDate: '1 day ago',
    slug: 'devops-engineer-cloud-systems',
    companyLogo: '/placeholder.svg?height=60&width=60&text=Cloud+Systems',
    companyWebsite: 'https://cloudsystems.example.com'
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
    responsibilities: [
      'Create wireframes and prototypes',
      'Design user interfaces',
      'Conduct user research',
      'Test designs with users',
      'Collaborate with developers'
    ],
    benefits: [
      'Flexible working hours',
      'Creative freedom',
      'Portfolio building opportunities',
      'Remote work options',
      'Design tool subscriptions'
    ],
    postedDate: '4 days ago',
    slug: 'ui-ux-designer-creative-designs',
    companyLogo: '/placeholder.svg?height=60&width=60&text=Creative+Designs',
    companyWebsite: 'https://creativedesigns.example.com'
  }
]

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = jobOpportunities.find(j => j.slug === slug)
  
  if (!job) {
    return (
      <div className="min-h-screen bg-deep-black pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-black mb-4">Job Not Found</h1>
          <p className="text-foreground/60 mb-8">The job you are looking for does not exist.</p>
          <Link href="/opportunities">
            <Button className="bg-neon-green text-deep-black hover:bg-neon-green/90">
              View All Jobs
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-deep-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link href="/opportunities">
          <Button variant="ghost" className="mb-8 text-foreground/70 hover:text-neon-green">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Jobs
          </Button>
        </Link>

        {/* Job Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="bg-zinc-900/50 border border-white/5 p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                    <img src={job.companyLogo} alt={job.company} className="w-10 h-10" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-black mb-1">{job.title}</h1>
                    <p className="text-xl text-foreground/70">{job.company}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="border-white/10 text-foreground hover:bg-white/5">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" className="border-white/10 text-foreground hover:bg-white/5">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-8 text-sm">
                <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                  {job.type}
                </Badge>
                <div className="flex items-center text-foreground/70">
                  <MapPin className="w-4 h-4 mr-2 text-neon-green" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-foreground/70">
                  <Briefcase className="w-4 h-4 mr-2 text-neon-green" />
                  <span>{job.experience}</span>
                </div>
                <div className="flex items-center text-foreground/70">
                  <Clock className="w-4 h-4 mr-2 text-neon-green" />
                  <span>{job.postedDate}</span>
                </div>
              </div>

              {/* Job Description */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-neon-green">Job Description</h2>
                <p className="text-foreground/70 leading-relaxed">{job.description}</p>
              </div>

              {/* Responsibilities */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-neon-green">Responsibilities</h2>
                <ul className="space-y-2">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start text-foreground/70">
                      <span className="text-neon-green mr-2 mt-1">•</span>
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-neon-green">Requirements</h2>
                <ul className="space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start text-foreground/70">
                      <span className="text-neon-green mr-2 mt-1">•</span>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-neon-green">Benefits</h2>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-foreground/70">
                      <span className="text-neon-green mr-2 mt-1">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-zinc-900/50 border border-white/5 p-6 sticky top-24">
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-4 text-neon-green">Salary</h3>
                <p className="text-2xl font-black">{job.salary}</p>
              </div>

              <Button className="w-full bg-neon-green text-deep-black hover:bg-neon-green/90 font-bold mb-4">
                Apply Now
              </Button>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-4 text-neon-green">Company Details</h3>
                <div className="space-y-2 text-sm text-foreground/70">
                  <div className="flex items-center">
                    <span className="font-medium w-24">Website:</span>
                    <a 
                      href={job.companyWebsite} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-neon-green hover:underline flex items-center"
                    >
                      {job.companyWebsite.replace('https://', '')}
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <h3 className="text-lg font-bold mb-4 text-neon-green">Job Details</h3>
                <div className="space-y-2 text-sm text-foreground/70">
                  <div className="flex justify-between">
                    <span>Employment Type:</span>
                    <span>{job.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Experience Level:</span>
                    <span>{job.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>{job.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Posted:</span>
                    <span>{job.postedDate}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Similar Jobs */}
        <div className="mt-16">
          <h2 className="text-2xl font-black mb-8 text-center">Similar Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobOpportunities
              .filter(j => j.id !== job.id)
              .slice(0, 3)
              .map((similarJob) => (
                <Link key={similarJob.id} href={`/opportunities/${similarJob.slug}`} className="group">
                  <Card className="bg-zinc-900/50 border border-white/5 hover:border-neon-green/50 transition-all duration-300 p-6">
                    <Badge className="mb-2 bg-neon-green/20 text-neon-green border-neon-green/30">
                      {similarJob.type}
                    </Badge>
                    <h3 className="text-lg font-bold group-hover:text-neon-green transition-colors mb-1">
                      {similarJob.title}
                    </h3>
                    <p className="text-foreground/70 mb-2">{similarJob.company}</p>
                    <div className="flex items-center text-sm text-foreground/50 mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{similarJob.location}</span>
                    </div>
                    <p className="text-foreground/70 text-sm line-clamp-2 mb-4">
                      {similarJob.description}
                    </p>
                    <Button className="w-full bg-neon-green text-deep-black hover:bg-neon-green/90 font-bold">
                      View Details
                    </Button>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
