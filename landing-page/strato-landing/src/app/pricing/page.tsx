import { Check, Bot, Code, Zap, Shield, Users, Star } from 'lucide-react'
import Header from '@/components/Header'

export default function PricingPage() {
  const plans = [
    {
      name: 'Hobby',
      price: '$0',
      description: 'Perfect for getting started',
      features: [
        '5 AI agents per month',
        'Basic analytics',
        'Community support',
        '1 project',
        '100 API calls/month'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: '$29',
      description: 'For professional developers',
      features: [
        'Unlimited AI agents',
        'Advanced analytics',
        'Priority support',
        'Unlimited projects',
        '10,000 API calls/month',
        'Custom branding',
        'Revenue sharing'
      ],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large teams and organizations',
      features: [
        'Everything in Pro',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantee',
        'On-premise deployment',
        'Advanced security',
        'Custom pricing'
      ],
      cta: 'Contact Sales',
      popular: false
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
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Choose the perfect plan for your needs. Start free, scale as you grow.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative bg-white/5 backdrop-blur-sm rounded-xl p-8 border transition-all duration-200 ${
                  plan.popular
                    ? 'border-blue-500 bg-blue-500/10 scale-105'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-white mb-2">
                    {plan.price}
                    {plan.price !== 'Custom' && <span className="text-lg text-gray-400">/month</span>}
                  </div>
                  <p className="text-gray-400">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-white/10 text-white border border-gray-600 hover:bg-white/20'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Can I change my plan anytime?
                </h3>
                <p className="text-gray-300">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-3">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-300">
                  We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Is there a free trial?
                </h3>
                <p className="text-gray-300">
                  Yes, all paid plans come with a 14-day free trial. No credit card required to start.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Do you offer refunds?
                </h3>
                <p className="text-gray-300">
                  We offer a 30-day money-back guarantee for all paid plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 