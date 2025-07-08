import { Bot, Code, Zap, Shield, Users, Star, Globe, BarChart3 } from 'lucide-react'
import Header from '@/components/Header'

export default function AboutPage() {
  const stats = [
    { number: '500+', label: 'GitHub Stars', icon: Star },
    { number: '15+', label: 'AI Agents', icon: Bot },
    { number: '$50K+', label: 'Revenue Generated', icon: BarChart3 },
    { number: '10,000+', label: 'Active Users', icon: Users }
  ]

  const values = [
    {
      icon: Code,
      title: 'Innovation First',
      description: 'We push the boundaries of what&apos;s possible with AI and automation, always staying ahead of the curve.'
    },
    {
      icon: Shield,
      title: 'Security & Quality',
      description: 'Enterprise-grade security and 90%+ test coverage ensure your applications are bulletproof.'
    },
    {
      icon: Zap,
      title: 'Performance & Speed',
      description: 'Lightning-fast development with intelligent automation and optimized workflows.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by developers, for developers, with continuous feedback and improvement.'
    }
  ]

  const team = [
    {
      name: 'Alex Chen',
      role: 'Founder & CEO',
      bio: 'Former Senior Engineer at Google, passionate about developer productivity and AI automation.',
      avatar: '/avatars/alex.jpg'
    },
    {
      name: 'Sarah Kim',
      role: 'CTO',
      bio: 'Expert in distributed systems and cloud architecture, previously at AWS and Microsoft.',
      avatar: '/avatars/sarah.jpg'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Product',
      bio: 'Product leader with 10+ years experience in developer tools and SaaS platforms.',
      avatar: '/avatars/marcus.jpg'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Building the Future of
            <span className="text-blue-600"> Developer Tools</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We&apos;re on a mission to revolutionize how developers build, deploy, and scale applications. 
            Our AI-powered platform combines cutting-edge technology with enterprise-grade reliability.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-gray-50">
                <div className="flex justify-center mb-4">
                  <value.icon className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The brilliant minds behind STRATO Core OS™
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-white shadow-sm">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Join Us in Building the Future
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Ready to revolutionize your development workflow? Get started today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Get Started Free
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 