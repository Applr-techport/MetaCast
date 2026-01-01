'use client'

import Link from 'next/link'
import { ArrowRight, Youtube, Facebook, Twitch, Radio, Video, Rss } from 'lucide-react'
import { LandingHeader, Footer } from '@/components/landing'

export default function IntegrationsPage() {
  const platforms = [
    { name: 'YouTube', icon: Youtube, description: 'Stream directly to YouTube Live with full chat integration', status: 'available' },
    { name: 'Facebook', icon: Facebook, description: 'Go live on Facebook Pages and Groups simultaneously', status: 'available' },
    { name: 'Twitch', icon: Twitch, description: 'Connect your Twitch channel for seamless streaming', status: 'available' },
    { name: 'LinkedIn Live', icon: Radio, description: 'Professional streaming for business audiences', status: 'available' },
    { name: 'Custom RTMP', icon: Video, description: 'Stream to any platform that supports RTMP', status: 'available' },
    { name: 'TikTok Live', icon: Rss, description: 'Reach TikTok audiences with live content', status: 'coming-soon' },
  ]

  const tools = [
    { name: 'OBS Studio', description: 'Full compatibility with OBS via virtual camera and RTMP' },
    { name: 'Streamlabs', description: 'Connect your Streamlabs setup seamlessly' },
    { name: 'Zoom', description: 'Broadcast Zoom meetings to multiple platforms' },
    { name: 'Google Meet', description: 'Stream your Google Meet calls live' },
    { name: 'Slack', description: 'Get notifications and control streams from Slack' },
    { name: 'Zapier', description: 'Automate workflows with 5000+ apps' },
  ]

  return (
    <main className="min-h-screen bg-white">
      <LandingHeader />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Connect with Your Favorite
            <span className="text-[var(--secondary)]"> Platforms</span>
          </h1>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            MetaCast integrates with all major streaming platforms and tools. Stream everywhere your audience is, from a single dashboard.
          </p>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-16 px-6 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Streaming Platforms</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform) => {
              const Icon = platform.icon
              return (
                <div key={platform.name} className="bg-white p-6 rounded-xl border border-[var(--border-color)]">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center">
                      <Icon size={24} className="text-[var(--secondary)]" />
                    </div>
                    {platform.status === 'coming-soon' && (
                      <span className="px-2 py-1 bg-[var(--muted)]/10 text-[var(--muted)] text-xs rounded-full">Coming Soon</span>
                    )}
                  </div>
                  <h3 className="font-semibold mb-2">{platform.name}</h3>
                  <p className="text-sm text-[var(--muted)]">{platform.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Tools & Apps</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div key={tool.name} className="p-6 rounded-xl border border-[var(--border-color)] hover:border-[var(--secondary)] transition-colors">
                <h3 className="font-semibold mb-2">{tool.name}</h3>
                <p className="text-sm text-[var(--muted)]">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[var(--secondary)]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Stream Everywhere?</h2>
          <p className="text-white/80 mb-8">
            Start your free trial and connect all your platforms today.
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
