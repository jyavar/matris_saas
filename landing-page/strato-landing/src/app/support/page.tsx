import { HelpCircle, MessageSquare, Book, Video, Users, Mail, Phone, Clock, Check, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'

export default function SupportPage() {
  const helpResources = [
    {
      icon: Book,
      title: 'Documentation',
      description: 'Comprehensive guides, API references, and tutorials',
      link: '/docs',
      color: 'from-blue-600 to-purple-600'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides and walkthroughs',
      link: '/tutorials',
      color: 'from-green-600 to-blue-600'
    },
    {
      icon: Users,
      title: 'Community Forum',
      description: 'Get help from our community of developers',
      link: '/community',
      color: 'from-purple-600 to-pink-600'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Real-time support during business hours',
      link: '/chat',
      color: 'from-yellow-600 to-orange-600'
    }
  ]

  const faqs = [
    {
      question: 'How do I get started with STRATO?',
      answer: 'Start by creating a free account and following our quick start guide. You can begin with our SaaS platform or explore our AI agents marketplace.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans. All payments are processed securely through Stripe.'
    },
    {
      question: 'Can I deploy STRATO on my own infrastructure?',
      answer: 'Yes! Our Enterprise plan includes on-premise deployment options with full customization and dedicated support.'
    },
    {
      question: 'How do I contribute to the project?',
      answer: 'We welcome contributions! Check out our GitHub repository, read our contributing guidelines, and join our community discussions.'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We offer email support for all plans, priority support for Pro and Enterprise, and 24/7 support for Enterprise customers.'
    },
    {
      question: 'Is STRATO open source?',
      answer: 'Yes! STRATO is 100% open source and MIT licensed. You can fork, modify, and contribute to the project.'
    }
  ]

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@strato.dev',
      response: 'Within 24 hours',
      available: '24/7'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Real-time support',
      contact: 'Available on website',
      response: 'Immediate',
      available: 'Business hours'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us directly',
      contact: '+1 (555) 123-4567',
      response: 'Immediate',
      available: 'Business hours'
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Support Center
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              We're here to help you succeed with STRATO. Find answers, get support, and connect with our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#help" className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-all duration-200 flex items-center justify-center">
                Get Help
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a href="/contact" className="border border-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-200 flex items-center justify-center">
                Contact Us
                <MessageSquare className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Help Resources */}
      <section id="help" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Help Resources
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Find the help you need through our comprehensive support resources.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {helpResources.map((resource, index) => (
              <a
                key={index}
                href={resource.link}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200 group"
              >
                <div className={`bg-gradient-to-r ${resource.color} p-3 rounded-lg w-fit mb-6`}>
                  <resource.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4">{resource.description}</p>
                <span className="text-blue-400 group-hover:text-blue-300 text-sm font-medium">
                  Learn more →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300">
              Find quick answers to common questions about STRATO.
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <HelpCircle className="w-5 h-5 text-blue-400 mr-3" />
                  {faq.question}
                </h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Contact Support
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get in touch with our support team through your preferred method.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg w-fit mx-auto mb-6">
                  <method.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
                <p className="text-gray-300 mb-4">{method.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="text-white font-medium">{method.contact}</div>
                  <div className="text-gray-400 text-sm">Response: {method.response}</div>
                  <div className="text-gray-400 text-sm">Available: {method.available}</div>
                </div>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  Contact
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Tiers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Support Plans
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the support level that fits your needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-2">Community</h3>
              <p className="text-gray-400 mb-6">Free support for all users</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Community forum access
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Documentation & guides
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Email support (48h response)
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Video tutorials
                </li>
              </ul>
              <div className="text-2xl font-bold text-white">Free</div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-8 border border-blue-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro Support</h3>
              <p className="text-gray-400 mb-6">Priority support for Pro users</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Everything in Community
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Priority email support (24h)
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Live chat support
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Phone support
                </li>
              </ul>
              <div className="text-2xl font-bold text-white">$29/month</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-gray-400 mb-6">Dedicated support for enterprises</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Everything in Pro
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  24/7 dedicated support
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Dedicated account manager
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Custom training sessions
                </li>
              </ul>
              <div className="text-2xl font-bold text-white">Custom</div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Support Hours</h3>
              <p className="text-gray-300">When you can reach our support team</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">General Support</h4>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Enterprise Support</h4>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>24/7 Support</span>
                    <span>Always Available</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Time</span>
                    <span>{'< 2 hours'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dedicated Team</span>
                    <span>Yes</span>
                  </div>
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
            Still need help?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Our support team is here to help you succeed with STRATO.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200">
              Contact Support
            </a>
            <a href="/docs" className="border border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-all duration-200">
              View Documentation
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 