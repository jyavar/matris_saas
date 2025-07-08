import { Code, Download, Star, Eye, ArrowRight, Bot, Zap, Shield, Users, BarChart3, Check } from 'lucide-react'
import Header from '@/components/Header'

export default function TemplatesPage() {
  const templates = [
    {
      name: 'SaaS Starter Kit',
      description: 'Complete SaaS platform with authentication, payments, and user management.',
      category: 'Full-Stack',
      downloads: 2341,
      rating: 4.9,
      tags: ['React', 'Node.js', 'Supabase', 'Stripe'],
      icon: Code,
      featured: true,
      price: 'Free'
    },
    {
      name: 'AI Agent Template',
      description: 'Production-ready AI agent with TypeScript, testing, and deployment setup.',
      category: 'AI/ML',
      downloads: 1876,
      rating: 4.8,
      tags: ['TypeScript', 'OpenAI', 'Testing', 'Docker'],
      icon: Bot,
      featured: true,
      price: '$29'
    },
    {
      name: 'E-commerce Platform',
      description: 'Complete e-commerce solution with inventory, payments, and analytics.',
      category: 'E-commerce',
      downloads: 1540,
      rating: 4.7,
      tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Analytics'],
      icon: Zap,
      featured: false,
      price: '$49'
    },
    {
      name: 'Dashboard Template',
      description: 'Modern admin dashboard with charts, tables, and user management.',
      category: 'Dashboard',
      downloads: 892,
      rating: 4.6,
      tags: ['React', 'Tailwind', 'Charts', 'Tables'],
      icon: BarChart3,
      featured: false,
      price: '$19'
    },
    {
      name: 'API Gateway',
      description: 'Scalable API gateway with authentication, rate limiting, and monitoring.',
      category: 'Backend',
      downloads: 654,
      rating: 4.8,
      tags: ['Node.js', 'Express', 'Redis', 'Monitoring'],
      icon: Shield,
      featured: false,
      price: '$39'
    },
    {
      name: 'Team Collaboration',
      description: 'Team collaboration platform with real-time chat and project management.',
      category: 'Collaboration',
      downloads: 743,
      rating: 4.5,
      tags: ['React', 'Socket.io', 'MongoDB', 'Real-time'],
      icon: Users,
      featured: false,
      price: '$34'
    }
  ]

  const categories = [
    { name: 'All', count: 25, active: true },
    { name: 'Full-Stack', count: 8, active: false },
    { name: 'AI/ML', count: 5, active: false },
    { name: 'E-commerce', count: 3, active: false },
    { name: 'Dashboard', count: 4, active: false },
    { name: 'Backend', count: 3, active: false },
    { name: 'Collaboration', count: 2, active: false }
  ]

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready-to-Use Templates
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Jump-start your development with production-ready templates. Built with modern technologies and best practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#templates" className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-all duration-200 flex items-center justify-center">
                Browse Templates
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a href="/docs/templates" className="border border-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-200 flex items-center justify-center">
                Documentation
                <Code className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
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

      {/* Templates Grid */}
      <section id="templates" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white">Featured Templates</h2>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-300 hover:text-white">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                    <template.icon className="w-6 h-6 text-white" />
                  </div>
                  {template.featured && (
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{template.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{template.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-white text-sm">{template.rating}</span>
                    <span className="text-gray-400 text-sm ml-1">({template.downloads})</span>
                  </div>
                  <span className="text-blue-400 text-sm font-medium">{template.category}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {template.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">{template.price}</span>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              How to Use Templates
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get started in minutes with our step-by-step guide.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Choose Template</h3>
              <p className="text-gray-300">
                Browse our collection and select the template that best fits your project needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Download & Setup</h3>
              <p className="text-gray-300">
                Download the template and follow the setup instructions to get it running locally.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Customize & Deploy</h3>
              <p className="text-gray-300">
                Customize the template to your needs and deploy to your preferred platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why Use Our Templates?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Save weeks of development time with our production-ready templates.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                    <Check className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Production Ready</h3>
                    <p className="text-gray-400 text-sm">All templates are tested, documented, and ready for production use</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-500/20 p-2 rounded-lg mr-4">
                    <Check className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Modern Stack</h3>
                    <p className="text-gray-400 text-sm">Built with the latest technologies and best practices</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-500/20 p-2 rounded-lg mr-4">
                    <Check className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Well Documented</h3>
                    <p className="text-gray-400 text-sm">Comprehensive documentation and setup guides included</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-yellow-500/20 p-2 rounded-lg mr-4">
                    <Check className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Community Support</h3>
                    <p className="text-gray-400 text-sm">Active community and support for all templates</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-6">Template Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Templates</span>
                  <span className="text-white font-semibold">25+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Free Templates</span>
                  <span className="text-white font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Downloads</span>
                  <span className="text-white font-semibold">15K+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Average Rating</span>
                  <span className="text-white font-semibold">4.8/5</span>
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
            Ready to accelerate your development?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start building faster with our production-ready templates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#templates" className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200">
              Browse Templates
            </a>
            <a href="/docs/templates" className="border border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-all duration-200">
              View Documentation
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 