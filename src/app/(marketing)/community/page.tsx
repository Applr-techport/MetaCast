'use client'

import Link from 'next/link'
import { MessageCircle, Users, Youtube, Github, Twitter, ArrowRight } from 'lucide-react'
import { LandingHeader, Footer } from '@/components/landing'

export default function CommunityPage() {
  const channels = [
    {
      icon: MessageCircle,
      name: 'Discord',
      description: 'Join 5,000+ creators in our Discord community',
      members: '5,000+',
      href: 'https://discord.gg/metacast',
      color: 'bg-[#5865F2]',
    },
    {
      icon: Twitter,
      name: 'Twitter/X',
      description: 'Follow us for updates and tips',
      members: '12,000+',
      href: 'https://twitter.com/metacast',
      color: 'bg-black',
    },
    {
      icon: Youtube,
      name: 'YouTube',
      description: 'Tutorials, tips, and creator spotlights',
      members: '8,000+',
      href: 'https://youtube.com/@metacast',
      color: 'bg-red-600',
    },
    {
      icon: Github,
      name: 'GitHub',
      description: 'Open source tools and integrations',
      members: '1,200+',
      href: 'https://github.com/metacast',
      color: 'bg-gray-800',
    },
  ]

  const featuredCreators = [
    { name: 'TechStreamers', subscribers: '250K', category: 'Tech' },
    { name: 'GamingPro', subscribers: '180K', category: 'Gaming' },
    { name: 'FitnessLive', subscribers: '95K', category: 'Fitness' },
    { name: 'CookingMaster', subscribers: '120K', category: 'Food' },
  ]

  return (
    <main className="min-h-screen bg-white">
      <LandingHeader />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Join the MetaCast
            <span className="text-[var(--secondary)]"> Community</span>
          </h1>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Connect with thousands of creators, share tips, get help, and grow together.
          </p>
        </div>
      </section>

      {/* Channels */}
      <section className="py-16 px-6 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Join the Conversation</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {channels.map((channel) => {
              const Icon = channel.icon
              return (
                <a
                  key={channel.name}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-6 rounded-xl border border-[var(--border-color)] hover:border-[var(--secondary)] transition-all hover:shadow-lg"
                >
                  <div className={`w-12 h-12 ${channel.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">{channel.name}</h3>
                  <p className="text-sm text-[var(--muted)] mb-3">{channel.description}</p>
                  <p className="text-sm font-medium text-[var(--secondary)]">{channel.members} members</p>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Creators */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Featured Creators</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCreators.map((creator) => (
              <div key={creator.name} className="text-center p-6 rounded-xl border border-[var(--border-color)]">
                <div className="w-20 h-20 bg-[var(--secondary)]/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users size={32} className="text-[var(--secondary)]" />
                </div>
                <h3 className="font-semibold">{creator.name}</h3>
                <p className="text-sm text-[var(--muted)]">{creator.subscribers} subscribers</p>
                <span className="inline-block mt-2 px-3 py-1 bg-[var(--background)] text-xs rounded-full">{creator.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[var(--secondary)]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-white/80 mb-8">
            Start your creator journey with MetaCast today.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--secondary)] rounded-full font-medium hover:bg-white/90 transition-colors"
          >
            Get Started Free
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
