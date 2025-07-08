import { Search, Book, Code, Bot, Zap, Shield, Users, Star, ArrowRight, ChevronRight } from 'lucide-react'
import Header from '@/components/Header'

export default function DocsPage() {
  const categories = [
    {
      name: 'Getting Started',
      icon: Book,
      items: [
        { name: 'Quick Start Guide', href: '/docs/quickstart', description: 'Get up and running in 5 minutes' },
        { name: 'Installation', href: '/docs/installation', description: 'Install STRATO on your system' },
        { name: 'First Agent', href: '/docs/first-agent', description: 'Create your first AI agent' },
        { name: 'Configuration', href: '/docs/configuration', description: 'Configure your environment' }
      ]
    },
    {
      name: 'AI Agents',
      icon: Bot,
      items: [
        { name: 'Agent Development', href: '/docs/agents/development', description: 'Build custom AI agents' },
        { name: 'Agent Marketplace', href: '/docs/agents/marketplace', description: 'Publish and sell agents' },
        { name: 'Agent Integration', href: '/docs/agents/integration', description: 'Integrate agents into your workflow' },
        { name: 'Agent Testing', href: '/docs/agents/testing', description: 'Test and validate your agents' }
      ]
    },
    {
      name: 'SaaS Platform',
      icon: Code,
      items: [
        { name: 'Platform Overview', href: '/docs/platform/overview', description: 'Understanding the STRATO platform' },
        { name: 'Backend Setup', href: '/docs/platform/backend', description: 'Set up the Node.js backend' },
        { name: 'Frontend Development', href: '/docs/platform/frontend', description: 'Build React applications' },
        { name: 'Database Schema', href: '/docs/platform/database', description: 'Supabase database design' }
      ]
    },
    {
      name: 'API Reference',
      icon: Zap,
      items: [
        { name: 'REST API', href: '/docs/api/rest', description: 'Complete REST API documentation' },
        { name: 'Authentication', href: '/docs/api/auth', description: 'API authentication and security' },
        { name: 'Webhooks', href: '/docs/api/webhooks', description: 'Set up webhook integrations' },
        { name: 'Rate Limits', href: '/docs/api/rate-limits', description: 'API rate limiting and quotas' }
      ]
    },
    {
      name: 'Security',
      icon: Shield,
      items: [
        { name: 'Security Best Practices', href: '/docs/security/best-practices', description: 'Security guidelines and recommendations' },
        { name: 'Authentication', href: '/docs/security/auth', description: 'User authentication and authorization' },
        { name: 'Data Protection', href: '/docs/security/data', description: 'Data encryption and privacy' },
        { name: 'Compliance', href: '/docs/security/compliance', description: 'GDPR, SOC2, and compliance' }
      ]
    },
    {
      name: 'Community',
      icon: Users,
      items: [
        { name: 'Contributing', href: '/docs/community/contributing', description: 'How to contribute to STRATO' },
        { name: 'Code of Conduct', href: '/docs/community/code-of-conduct', description: 'Community guidelines' },
        { name: 'Discussions', href: '/docs/community/discussions', description: 'Join community discussions' },
        { name: 'Showcase', href: '/docs/community/showcase', description: 'Showcase your projects' }
      ]
    }
  ]

  const popularDocs = [
    { name: 'Quick Start Guide', href: '/docs/quickstart', views: '2.5k' },
    { name: 'Agent Development', href: '/docs/agents/development', views: '1.8k' },
    { name: 'API Reference', href: '/docs/api/rest', views: '1.2k' },
    { name: 'Security Best Practices', href: '/docs/security/best-practices', views: '950' }
  ]

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Documentation
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Everything you need to build, deploy, and scale with STRATO. From quick start guides to advanced API documentation.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Docs */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Popular Documentation</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDocs.map((doc, index) => (
              <a
                key={index}
                href={doc.href}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <Book className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-400 text-sm">{doc.views} views</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {doc.name}
                </h3>
                <div className="flex items-center text-blue-400">
                  <span className="text-sm">Read more</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Browse Documentation</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg mr-4">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <a
                      key={itemIndex}
                      href={item.href}
                      className="block p-4 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                          {item.name}
                        </h4>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Get Started in Minutes</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Follow our step-by-step guides to get up and running with STRATO quickly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg w-fit mx-auto mb-6">
                <Book className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">1. Quick Start</h3>
              <p className="text-gray-300 mb-6">
                Install STRATO and create your first AI agent in under 5 minutes.
              </p>
              <a href="/docs/quickstart" className="text-blue-400 hover:text-blue-300 font-medium">
                Read Quick Start Guide →
              </a>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-lg w-fit mx-auto mb-6">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">2. Build Agents</h3>
              <p className="text-gray-300 mb-6">
                Learn how to build, test, and deploy your own AI agents.
              </p>
              <a href="/docs/agents/development" className="text-blue-400 hover:text-blue-300 font-medium">
                Agent Development Guide →
              </a>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-lg w-fit mx-auto mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">3. Deploy & Scale</h3>
              <p className="text-gray-300 mb-6">
                Deploy your agents to production and scale with confidence.
              </p>
              <a href="/docs/platform/deployment" className="text-blue-400 hover:text-blue-300 font-medium">
                Deployment Guide →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need help? We're here for you
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Can't find what you're looking for? Our team is ready to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/community" className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200">
              Join Community
            </a>
            <a href="/contact" className="border border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-all duration-200">
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 