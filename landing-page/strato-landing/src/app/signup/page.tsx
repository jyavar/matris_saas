import { Mail, Lock, User, ArrowRight, Bot, Check } from 'lucide-react'
import Header from '@/components/Header'

export default function SignupPage() {
  const features = [
    'Free forever plan with 5 AI agents',
    '14-day free trial on all paid plans',
    'No credit card required to start',
    'Cancel anytime, no questions asked'
  ]

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Signup Form */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-full">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <span className="ml-3 text-xl font-bold text-white">STRATO</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
                <p className="text-gray-300">Start building with AI agents today</p>
              </div>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        placeholder="Your first name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        placeholder="Your last name"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                      placeholder="Create a strong password"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    className="mt-1 w-4 h-4 text-blue-500 bg-white/10 border-gray-700 rounded focus:ring-blue-500 focus:ring-2"
                    required
                  />
                  <label htmlFor="terms" className="ml-3 text-sm text-gray-300">
                    I agree to the{' '}
                    <a href="/terms" className="text-blue-400 hover:text-blue-300">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-blue-400 hover:text-blue-300">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Already have an account?{' '}
                  <a href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                    Sign in
                  </a>
                </p>
              </div>
            </div>

            {/* Features & Benefits */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Join thousands of developers building the future
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                  Get started with STRATO and unlock the power of AI agents for your development workflow.
                </p>
              </div>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">What you'll get:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>• Access to 15+ pre-built AI agents</li>
                  <li>• Full SaaS platform with Node.js & React</li>
                  <li>• Marketplace to buy and sell agents</li>
                  <li>• Enterprise-grade security & testing</li>
                  <li>• 24/7 community support</li>
                </ul>
              </div>
              
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  By creating an account, you agree to our{' '}
                  <a href="/terms" className="text-blue-400 hover:text-blue-300">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-blue-400 hover:text-blue-300">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 