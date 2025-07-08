import { Code, Database, Shield, Zap, Users, BarChart3, Globe, Rocket, Check, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'

export default function PlatformPage() {
  const features = [
    {
      icon: Code,
      title: 'Full-Stack Architecture',
      description: 'Modern Node.js backend with React frontend, built for scale and performance.',
      details: ['TypeScript throughout', 'Modular design', 'API-first approach', 'Real-time capabilities']
    },
    {
      icon: Database,
      title: 'Supabase Integration',
      description: 'Enterprise-grade database with built-in authentication, real-time subscriptions, and edge functions.',
      details: ['PostgreSQL database', 'Row Level Security', 'Real-time subscriptions', 'Edge functions']
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Production-ready security with 90%+ test coverage and best practices.',
      details: ['JWT authentication', 'Rate limiting', 'CORS protection', 'Input validation']
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimized for speed with caching, CDN, and efficient data handling.',
      details: ['Response caching', 'Database optimization', 'Asset optimization', 'Lazy loading']
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Built-in user management, roles, and permissions for team workflows.',
      details: ['User roles & permissions', 'Team management', 'Activity tracking', 'Audit logs']
    },
    {
      icon: BarChart3,
      title: 'Analytics & Monitoring',
      description: 'Comprehensive analytics, logging, and monitoring for production insights.',
      details: ['Usage analytics', 'Error tracking', 'Performance monitoring', 'Custom dashboards']
    }
  ]

  const techStack = [
    { name: 'Node.js', description: 'Backend runtime' },
    { name: 'React 18', description: 'Frontend framework' },
    { name: 'TypeScript', description: 'Type safety' },
    { name: 'Supabase', description: 'Database & auth' },
    { name: 'Tailwind CSS', description: 'Styling' },
    { name: 'Vitest', description: 'Testing' },
    { name: 'Pino', description: 'Logging' },
    { name: 'Stripe', description: 'Payments' }
  ]

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Enterprise SaaS Platform
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Launch your own SaaS with production-ready architecture. Built with Node.js, React, and Supabase for scale, security, and performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/docs/platform/overview" className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-all duration-200 flex items-center justify-center">
                View Documentation
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a href="/signup" className="border border-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-200 flex items-center justify-center">
                Get Started Free
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Everything you need to build a successful SaaS
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From authentication to payments, analytics to deployment - we've got you covered.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-200">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg w-fit mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-sm text-gray-400">
                      <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Built with modern technologies
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the best tools for the job. Our platform uses proven, production-ready technologies.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-gray-700 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">{tech.name}</h3>
                <p className="text-gray-400 text-sm">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Scalable Architecture
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Our platform is designed to scale from startup to enterprise. Start small, grow big.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-500/20 p-2 rounded-lg mr-4">
                    <Check className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Microservices Ready</h3>
                    <p className="text-gray-400 text-sm">Modular architecture that can be split into microservices as you scale</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-500/20 p-2 rounded-lg mr-4">
                    <Check className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Cloud Native</h3>
                    <p className="text-gray-400 text-sm">Deploy anywhere - AWS, Google Cloud, Azure, or your own infrastructure</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-500/20 p-2 rounded-lg mr-4">
                    <Check className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Auto-scaling</h3>
                    <p className="text-gray-400 text-sm">Built-in support for horizontal scaling and load balancing</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <div className="space-y-6">
                <div className="text-center">
                  <Globe className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Global Deployment</h3>
                  <p className="text-gray-300">Deploy to multiple regions for optimal performance</p>
                </div>
                <div className="text-center">
                  <Rocket className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">CI/CD Pipeline</h3>
                  <p className="text-gray-300">Automated testing and deployment workflows</p>
                </div>
                <div className="text-center">
                  <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Security First</h3>
                  <p className="text-gray-300">Enterprise-grade security and compliance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to build your SaaS?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start with our platform and focus on what matters most - your product and customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/signup" className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200">
              Start Building
            </a>
            <a href="/docs/platform/overview" className="border border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-all duration-200">
              View Documentation
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 