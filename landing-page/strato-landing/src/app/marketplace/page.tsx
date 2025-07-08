import { Search, Filter, Star, Download, Bot, Code, Zap, Shield, Users, Star as StarIcon, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'

export default function MarketplacePage() {
  const categories = [
    { name: 'All', count: 15, active: true },
    { name: 'Code Quality', count: 5, active: false },
    { name: 'Automation', count: 4, active: false },
    { name: 'Analytics', count: 3, active: false },
    { name: 'Security', count: 2, active: false },
    { name: 'Testing', count: 1, active: false }
  ]

  const agents = [
    {
      id: 1,
      name: 'Code Quality Guardian',
      description: 'Automated code review and quality assurance agent that identifies potential issues, suggests improvements, and maintains coding standards.',
      category: 'Code Quality',
      price: '$29/month',
      rating: 4.9,
      reviews: 127,
      downloads: 1540,
      tags: ['TypeScript', 'React', 'Node.js'],
      icon: Shield,
      featured: true
    },
    {
      id: 2,
      name: 'Test Coverage Analyzer',
      description: 'Intelligent test coverage analysis and generation agent that ensures comprehensive testing across your codebase.',
      category: 'Testing',
      price: '$19/month',
      rating: 4.8,
      reviews: 89,
      downloads: 892,
      tags: ['Jest', 'Vitest', 'Coverage'],
      icon: Code,
      featured: false
    },
    {
      id: 3,
      name: 'Performance Optimizer',
      description: 'AI-powered performance analysis and optimization agent that identifies bottlenecks and suggests improvements.',
      category: 'Analytics',
      price: '$39/month',
      rating: 4.7,
      reviews: 203,
      downloads: 2341,
      tags: ['Performance', 'Monitoring', 'Optimization'],
      icon: Zap,
      featured: true
    },
    {
      id: 4,
      name: 'Security Scanner',
      description: 'Comprehensive security scanning agent that detects vulnerabilities, dependency issues, and security best practices.',
      category: 'Security',
      price: '$49/month',
      rating: 4.9,
      reviews: 156,
      downloads: 1876,
      tags: ['Security', 'Vulnerabilities', 'Dependencies'],
      icon: Shield,
      featured: false
    },
    {
      id: 5,
      name: 'Deployment Automator',
      description: 'Intelligent deployment automation agent that handles CI/CD pipelines, testing, and production deployments.',
      category: 'Automation',
      price: '$34/month',
      rating: 4.6,
      reviews: 78,
      downloads: 654,
      tags: ['CI/CD', 'Deployment', 'Automation'],
      icon: Bot,
      featured: false
    },
    {
      id: 6,
      name: 'Team Collaboration Hub',
      description: 'AI-powered team collaboration agent that manages code reviews, documentation, and team communication.',
      category: 'Automation',
      price: '$24/month',
      rating: 4.5,
      reviews: 92,
      downloads: 743,
      tags: ['Collaboration', 'Reviews', 'Documentation'],
      icon: Users,
      featured: false
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              AI Agents Marketplace
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover, buy, and sell production-ready AI agents for code quality, automation, analytics, and more.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search AI agents..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  category.active
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Agents */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white">Featured Agents</h2>
            <a href="/marketplace/all" className="text-blue-400 hover:text-blue-300 flex items-center">
              View all agents
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.filter(agent => agent.featured).map((agent) => (
              <div key={agent.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                    <agent.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{agent.name}</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{agent.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-white text-sm">{agent.rating}</span>
                    <span className="text-gray-400 text-sm ml-1">({agent.reviews})</span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Download className="w-4 h-4 mr-1" />
                    {agent.downloads}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {agent.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">{agent.price}</span>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Agents */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white">All Agents</h2>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-300 hover:text-white">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                    <agent.icon className="w-6 h-6 text-white" />
                  </div>
                  {agent.featured && (
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{agent.name}</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{agent.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-white text-sm">{agent.rating}</span>
                    <span className="text-gray-400 text-sm ml-1">({agent.reviews})</span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Download className="w-4 h-4 mr-1" />
                    {agent.downloads}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {agent.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">{agent.price}</span>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to build your own AI agent?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Create, publish, and monetize your AI agents on the STRATO marketplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/docs" className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200">
              Start Building
            </a>
            <a href="/contact" className="border border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-all duration-200">
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 