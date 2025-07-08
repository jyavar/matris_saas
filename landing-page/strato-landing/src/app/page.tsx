import { ArrowRight, Bot, Code, Zap, Shield, Users, Star, Download, Check, Globe, Rocket, BarChart3 } from 'lucide-react'
import Header from '@/components/Header'

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-blue-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Bot className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-sm text-white">STRATO Core OS™ - AI Agents Marketplace</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Build and deploy
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI-powered software
              </span>
              <span className="block text-white">without compromising</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              STRATO provides the developer tools and cloud infrastructure to build, scale, and secure AI agents, SaaS platforms, and intelligent automation solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="/signup" className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 flex items-center justify-center">
                Start building with a free account
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a href="/docs" className="border border-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-200 flex items-center justify-center">
                View Documentation
                <Download className="ml-2 w-5 h-5" />
              </a>
            </div>

            <div className="text-center">
              <p className="text-gray-400 mb-4">Ready to deploy? Start building with a free account.</p>
              <p className="text-gray-400">Speak to an expert for your Pro or Enterprise needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-200">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg w-fit mb-6">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">AI Agents Marketplace</h3>
              <p className="text-gray-300 mb-4">
                Discover, buy, and sell production-ready AI agents for code quality, automation, analytics, and more.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-400">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  15+ specialized agents
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  One-click deployment
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  Revenue sharing
                </li>
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-200">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-lg w-fit mb-6">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Enterprise SaaS Platform</h3>
              <p className="text-gray-300 mb-4">
                Launch your own SaaS with modular Node.js, React, and Supabase architecture. Secure, scalable, and fast.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-400">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  Full-stack solution
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  90%+ test coverage
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  Production-ready
                </li>
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-200">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-lg w-fit mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Monetization Engine</h3>
              <p className="text-gray-300 mb-4">
                Earn revenue by selling your agents or SaaS solutions. Flexible pricing, subscriptions, and analytics included.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-400">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  Multiple revenue streams
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  Analytics dashboard
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  Payment processing
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-400">GitHub Stars</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">15+</div>
              <div className="text-gray-400">AI Agents</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">$50K+</div>
              <div className="text-gray-400">Revenue Generated</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Develop with your favorite tools
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Launch globally, instantly. Keep pushing with Git-connected deploys and collaborative pre-production.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-200">
              <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-3 rounded-lg w-fit mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Production-Ready Security</h3>
              <p className="text-gray-300">
                Enterprise-grade security, 90%+ test coverage, and best practices for peace of mind.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-200">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-lg w-fit mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Global Developer Community</h3>
              <p className="text-gray-300">
                Connect, collaborate, and grow with thousands of developers building the future of AI-powered software.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-200">
              <div className="bg-gradient-to-r from-pink-600 to-red-600 p-3 rounded-lg w-fit mb-6">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Open Source & Extensible</h3>
              <p className="text-gray-300">
                100% open source, MIT licensed. Fork, extend, and contribute to the STRATO ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to deploy?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start building with a free account. Speak to an expert for your Pro or Enterprise needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/signup" className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200">
              Start building with a free account
            </a>
            <a href="/contact" className="border border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-all duration-200">
              Speak to an expert
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 rounded-md">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold text-white">STRATO</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The AI-powered development platform for the future. Build, deploy, and scale with confidence.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/strato-dev" className="text-gray-400 hover:text-white transition-colors">
                  GitHub
                </a>
                <a href="https://twitter.com/strato_dev" className="text-gray-400 hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="https://linkedin.com/company/strato-dev" className="text-gray-400 hover:text-white transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Products</h3>
              <ul className="space-y-2">
                <li><a href="/marketplace" className="text-gray-400 hover:text-white transition-colors">AI Agents Marketplace</a></li>
                <li><a href="/platform" className="text-gray-400 hover:text-white transition-colors">SaaS Platform</a></li>
                <li><a href="/agents" className="text-gray-400 hover:text-white transition-colors">Intelligent Agents</a></li>
                <li><a href="/enterprise" className="text-gray-400 hover:text-white transition-colors">Enterprise</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="/docs" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="/templates" className="text-gray-400 hover:text-white transition-colors">Templates</a></li>
                <li><a href="/community" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                <li><a href="/support" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 STRATO Core OS™. All rights reserved. Built with ❤️ for developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
