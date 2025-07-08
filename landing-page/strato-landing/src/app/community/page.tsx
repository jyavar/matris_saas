import { Users, MessageSquare, Calendar, Star, ArrowRight, Github, Twitter, Linkedin, Globe, Award } from 'lucide-react'
import Header from '@/components/Header'

export default function CommunityPage() {
  const events = [
    {
      title: 'STRATO Developer Meetup',
      date: 'March 15, 2024',
      time: '6:00 PM PST',
      location: 'San Francisco, CA',
      type: 'In-Person',
      attendees: 45,
      description: 'Join us for an evening of networking, talks, and hands-on workshops.'
    },
    {
      title: 'AI Agents Workshop',
      date: 'March 22, 2024',
      time: '2:00 PM PST',
      location: 'Virtual',
      type: 'Online',
      attendees: 120,
      description: 'Learn how to build and deploy AI agents with STRATO.'
    },
    {
      title: 'SaaS Platform Deep Dive',
      date: 'April 5, 2024',
      time: '1:00 PM PST',
      location: 'Virtual',
      type: 'Online',
      attendees: 89,
      description: 'Advanced techniques for building scalable SaaS applications.'
    }
  ]

  const contributors = [
    {
      name: 'Alex Chen',
      role: 'Core Contributor',
      avatar: '/api/placeholder/100/100',
      contributions: 156,
      specialties: ['Backend', 'AI Agents']
    },
    {
      name: 'Sarah Johnson',
      role: 'Community Lead',
      avatar: '/api/placeholder/100/100',
      contributions: 89,
      specialties: ['Frontend', 'Documentation']
    },
    {
      name: 'Mike Rodriguez',
      role: 'Security Expert',
      avatar: '/api/placeholder/100/100',
      contributions: 67,
      specialties: ['Security', 'Testing']
    },
    {
      name: 'Emily Wang',
      role: 'DevOps Engineer',
      avatar: '/api/placeholder/100/100',
      contributions: 92,
      specialties: ['Deployment', 'CI/CD']
    }
  ]

  const forums = [
    {
      name: 'General Discussion',
      description: 'General questions and discussions about STRATO',
      topics: 234,
      posts: 1247,
      icon: MessageSquare
    },
    {
      name: 'AI Agents',
      description: 'Discussion about building and using AI agents',
      topics: 156,
      posts: 892,
      icon: Star
    },
    {
      name: 'SaaS Platform',
      description: 'Questions about the SaaS platform and deployment',
      topics: 89,
      posts: 445,
      icon: Globe
    },
    {
      name: 'Templates & Examples',
      description: 'Share and discuss templates and code examples',
      topics: 67,
      posts: 334,
      icon: Award
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
              Join Our Community
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Connect with thousands of developers building the future with STRATO. Share knowledge, get help, and contribute to the ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#forums" className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-all duration-200 flex items-center justify-center">
                Join Discussion
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a href="https://github.com/strato-dev" className="border border-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-200 flex items-center justify-center">
                GitHub
                <Github className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-gray-400">Community Members</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-400">GitHub Stars</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-400">Contributors</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-gray-400">Projects Built</div>
            </div>
          </div>
        </div>
      </section>

      {/* Forums */}
      <section id="forums" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white">Community Forums</h2>
            <a href="/forums" className="text-blue-400 hover:text-blue-300 flex items-center">
              View all forums
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {forums.map((forum, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                    <forum.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">{forum.topics} topics</div>
                    <div className="text-sm text-gray-400">{forum.posts} posts</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{forum.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{forum.description}</p>
                
                <a href={`/forums/${forum.name.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  Join discussion →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white">Upcoming Events</h2>
            <a href="/events" className="text-blue-400 hover:text-blue-300 flex items-center">
              View all events
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    event.type === 'In-Person' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {event.type}
                  </span>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    {event.attendees}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{event.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date} at {event.time}
                  </div>
                  <div className="text-sm text-gray-400">
                    📍 {event.location}
                  </div>
                </div>
                
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  Register
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contributors */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Meet Our Contributors
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The amazing people who make STRATO possible through their contributions and expertise.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contributors.map((contributor, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{contributor.name.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{contributor.name}</h3>
                <p className="text-blue-400 text-sm mb-3">{contributor.role}</p>
                <div className="text-gray-400 text-sm mb-4">
                  {contributor.contributions} contributions
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {contributor.specialties.map((specialty, specialtyIndex) => (
                    <span key={specialtyIndex} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Connect With Us
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Follow us on social media and stay updated with the latest news, tutorials, and community highlights.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <a href="https://github.com/strato-dev" className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-200 text-center group">
              <Github className="w-12 h-12 text-white mx-auto mb-4 group-hover:text-blue-400 transition-colors" />
              <h3 className="text-xl font-semibold text-white mb-2">GitHub</h3>
              <p className="text-gray-300 mb-4">Star our repository and contribute to the project</p>
              <span className="text-blue-400 group-hover:text-blue-300">Follow us →</span>
            </a>
            
            <a href="https://twitter.com/strato_dev" className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-200 text-center group">
              <Twitter className="w-12 h-12 text-white mx-auto mb-4 group-hover:text-blue-400 transition-colors" />
              <h3 className="text-xl font-semibold text-white mb-2">Twitter</h3>
              <p className="text-gray-300 mb-4">Get updates, tips, and community highlights</p>
              <span className="text-blue-400 group-hover:text-blue-300">Follow us →</span>
            </a>
            
            <a href="https://linkedin.com/company/strato-dev" className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-200 text-center group">
              <Linkedin className="w-12 h-12 text-white mx-auto mb-4 group-hover:text-blue-400 transition-colors" />
              <h3 className="text-xl font-semibold text-white mb-2">LinkedIn</h3>
              <p className="text-gray-300 mb-4">Connect with our team and community</p>
              <span className="text-blue-400 group-hover:text-blue-300">Follow us →</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to join the community?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Connect with developers, share your projects, and help build the future of AI-powered development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#forums" className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200">
              Join Discussion
            </a>
            <a href="https://github.com/strato-dev" className="border border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-all duration-200">
              Contribute on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 