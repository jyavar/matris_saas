import { Bot, Code, Shield, Zap, Users, BarChart3, Check, ArrowRight, Star, Download } from 'lucide-react'
import Header from '@/components/Header'

export default function AgentsPage() {
  const agents = [
    {
      name: 'Code Quality Guardian',
      description: 'Automated code review and quality assurance agent that identifies potential issues and suggests improvements.',
      category: 'Code Quality',
      rating: 4.9,
      downloads: 1540,
      features: ['TypeScript support', 'ESLint integration', 'Performance analysis', 'Security scanning'],
      icon: Shield,
      featured: true
    },
    {
      name: 'Test Coverage Analyzer',
      description: 'Intelligent test coverage analysis and generation agent that ensures comprehensive testing.',
      category: 'Testing',
      rating: 4.8,
      downloads: 892,
      features: ['Coverage reports', 'Test generation', 'Mutation testing', 'CI/CD integration'],
      icon: Code,
      featured: false
    },
    {
      name: 'Performance Optimizer',
      description: 'AI-powered performance analysis and optimization agent that identifies bottlenecks.',
      category: 'Analytics',
      rating: 4.7,
      downloads: 2341,
      features: ['Performance profiling', 'Bundle analysis', 'Memory optimization', 'Load testing'],
      icon: Zap,
      featured: true
    },
    {
      name: 'Security Scanner',
      description: 'Comprehensive security scanning agent that detects vulnerabilities and dependency issues.',
      category: 'Security',
      rating: 4.9,
      downloads: 1876,
      features: ['Vulnerability scanning', 'Dependency analysis', 'Secrets detection', 'Compliance checks'],
      icon: Shield,
      featured: false
    },
    {
      name: 'Deployment Automator',
      description: 'Intelligent deployment automation agent that handles CI/CD pipelines and production deployments.',
      category: 'Automation',
      rating: 4.6,
      downloads: 654,
      features: ['CI/CD automation', 'Rollback management', 'Environment management', 'Health checks'],
      icon: Bot,
      featured: false
    },
    {
      name: 'Team Collaboration Hub',
      description: 'AI-powered team collaboration agent that manages code reviews and documentation.',
      category: 'Collaboration',
      rating: 4.5,
      downloads: 743,
      features: ['Code review automation', 'Documentation generation', 'Team insights', 'Communication tools'],
      icon: Users,
      featured: false
    }
  ]

  const categories = [
    { name: 'Code Quality', count: 5, icon: Shield },
    { name: 'Testing', count: 3, icon: Code },
    { name: 'Security', count: 2, icon: Shield },
    { name: 'Performance', count: 2, icon: Zap },
    { name: 'Automation', count: 4, icon: Bot },
    { name: 'Analytics', count: 3, icon: BarChart3 }
  ]

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Intelligent AI Agents
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover 15+ specialized AI agents designed to automate your development workflow, improve code quality, and accelerate your productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/marketplace" className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-all duration-200 flex items-center justify-center">
                Browse Marketplace
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a href="/docs/agents/development" className="border border-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-200 flex items-center justify-center">
                Build Your Own
                <Code className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Agent Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg mr-4">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                    <p className="text-gray-400 text-sm">{category.count} agents</p>
                  </div>
                </div>
                <a href={`/marketplace?category=${category.name.toLowerCase()}`} className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  View agents →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Agents */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white">Featured Agents</h2>
            <a href="/marketplace" className="text-blue-400 hover:text-blue-300 flex items-center">
              View all agents
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.filter(agent => agent.featured).map((agent, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                    <agent.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{agent.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{agent.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-white text-sm">{agent.rating}</span>
                    <span className="text-gray-400 text-sm ml-1">({agent.downloads})</span>
                  </div>
                  <span className="text-blue-400 text-sm font-medium">{agent.category}</span>
                </div>
                
                <div className="space-y-2 mb-6">
                  {agent.features.slice(0, 3).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-400">
                      <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                    Get Started
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              How AI Agents Work
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our agents integrate seamlessly into your existing workflow and development tools.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Install & Configure</h3>
              <p className="text-gray-300">
                Install agents via CLI, npm, or integrate directly into your CI/CD pipeline with simple configuration.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Automated Analysis</h3>
              <p className="text-gray-300">
                Agents automatically analyze your code, identify issues, and provide actionable recommendations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Continuous Improvement</h3>
              <p className="text-gray-300">
                Get ongoing insights, automated fixes, and performance improvements as your codebase evolves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Seamless Integration
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Our agents work with your existing tools and workflows. No disruption, maximum benefit.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                    <Check className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">GitHub Integration</h3>
                    <p className="text-gray-400 text-sm">Pull request reviews, issue automation, and repository analysis</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-500/20 p-2 rounded-lg mr-4">
                    <Check className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">CI/CD Pipelines</h3>
                    <p className="text-gray-400 text-sm">GitHub Actions, GitLab CI, Jenkins, and more</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-500/20 p-2 rounded-lg mr-4">
                    <Check className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">IDE Extensions</h3>
                    <p className="text-gray-400 text-sm">VS Code, IntelliJ, and other popular editors</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-yellow-500/20 p-2 rounded-lg mr-4">
                    <Check className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">CLI Tools</h3>
                    <p className="text-gray-400 text-sm">Command-line interface for automation and scripting</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-6">Popular Integrations</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">🐙</div>
                  <div className="text-white font-medium">GitHub</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">🔧</div>
                  <div className="text-white font-medium">VS Code</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-white font-medium">GitHub Actions</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">🚀</div>
                  <div className="text-white font-medium">Vercel</div>
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
            Ready to supercharge your development?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers using AI agents to build better software faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/marketplace" className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200">
              Explore Agents
            </a>
            <a href="/docs/agents/development" className="border border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-all duration-200">
              Build Custom Agent
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 