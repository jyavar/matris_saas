import { Calendar, MapPin, Clock, Users, ArrowRight, Video, ExternalLink } from 'lucide-react'
import Header from '@/components/Header'

export default function EventsPage() {
  const upcomingEvents = [
    {
      title: 'STRATO Developer Meetup - San Francisco',
      date: 'March 15, 2024',
      time: '6:00 PM - 9:00 PM PST',
      location: 'San Francisco, CA',
      type: 'In-Person',
      attendees: 45,
      maxAttendees: 60,
      description: 'Join us for an evening of networking, talks, and hands-on workshops. Learn about the latest features in STRATO and connect with fellow developers.',
      tags: ['Networking', 'Workshop', 'AI Agents'],
      registration: 'Open',
      featured: true
    },
    {
      title: 'AI Agents Workshop - Virtual',
      date: 'March 22, 2024',
      time: '2:00 PM - 4:00 PM PST',
      location: 'Virtual',
      type: 'Online',
      attendees: 120,
      maxAttendees: 200,
      description: 'Learn how to build and deploy AI agents with STRATO. This hands-on workshop will cover everything from basic setup to advanced customization.',
      tags: ['Workshop', 'AI', 'Virtual'],
      registration: 'Open',
      featured: true
    },
    {
      title: 'SaaS Platform Deep Dive',
      date: 'April 5, 2024',
      time: '1:00 PM - 3:00 PM PST',
      location: 'Virtual',
      type: 'Online',
      attendees: 89,
      maxAttendees: 150,
      description: 'Advanced techniques for building scalable SaaS applications with STRATO. Perfect for experienced developers.',
      tags: ['Advanced', 'SaaS', 'Architecture'],
      registration: 'Open',
      featured: false
    }
  ]

  const pastEvents = [
    {
      title: 'STRATO Launch Event',
      date: 'February 28, 2024',
      time: '7:00 PM - 10:00 PM PST',
      location: 'San Francisco, CA',
      type: 'In-Person',
      attendees: 120,
      description: 'The official launch of STRATO Core OS™. We celebrated with the community and announced our roadmap for 2024.',
      tags: ['Launch', 'Networking', 'Announcement'],
      recording: 'https://youtube.com/watch?v=example'
    },
    {
      title: 'Community Q&A Session',
      date: 'February 15, 2024',
      time: '3:00 PM - 4:00 PM PST',
      location: 'Virtual',
      type: 'Online',
      attendees: 75,
      description: 'Monthly community Q&A session where users can ask questions and get direct answers from the STRATO team.',
      tags: ['Q&A', 'Community', 'Support'],
      recording: 'https://youtube.com/watch?v=example2'
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
              Events & Meetups
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Join us at events around the world to learn, network, and connect with the STRATO community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#upcoming" className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-all duration-200 flex items-center justify-center">
                View Upcoming Events
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a href="/community" className="border border-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-200 flex items-center justify-center">
                Join Community
                <Users className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="upcoming" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white">Upcoming Events</h2>
            <a href="/events/calendar" className="text-blue-400 hover:text-blue-300 flex items-center">
              View calendar
              <Calendar className="ml-2 w-4 h-4" />
            </a>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div key={index} className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border transition-all duration-200 ${
                event.featured 
                  ? 'border-blue-500 bg-blue-500/10' 
                  : 'border-gray-700 hover:border-gray-600'
              }`}>
                {event.featured && (
                  <div className="mb-4">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured Event
                    </span>
                  </div>
                )}
                
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
                    {event.attendees}/{event.maxAttendees}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date} at {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {event.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    event.registration === 'Open' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {event.registration}
                  </span>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12">Past Events</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {pastEvents.map((event, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
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
                    {event.attendees} attendees
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date} at {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {event.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {event.recording && (
                  <a
                    href={event.recording}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Watch Recording
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Types of Events
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We host various types of events to meet different needs and preferences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg w-fit mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Meetups</h3>
              <p className="text-gray-300 text-sm">In-person networking and learning events in major cities</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-lg w-fit mx-auto mb-4">
                <Video className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Webinars</h3>
              <p className="text-gray-300 text-sm">Online presentations and demonstrations accessible worldwide</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-lg w-fit mx-auto mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Workshops</h3>
              <p className="text-gray-300 text-sm">Hands-on learning sessions with practical exercises</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center">
              <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-3 rounded-lg w-fit mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Conferences</h3>
              <p className="text-gray-300 text-sm">Large-scale events with multiple speakers and tracks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Host an Event */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Want to Host an Event?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              We support community organizers who want to host STRATO events in their area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-all duration-200">
                Apply to Host
              </a>
              <a href="/docs/events" className="border border-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-200">
                Event Guidelines
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Never miss an event. Subscribe to our newsletter for updates on upcoming events and community activities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
} 