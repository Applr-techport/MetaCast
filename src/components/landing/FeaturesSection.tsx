'use client'

import { Radio, Calendar, ShoppingBag, BarChart3, FolderOpen, Video } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: Radio,
      title: 'Multi-Platform Streaming',
      description: 'Broadcast to YouTube, Facebook, Instagram, TikTok, Twitch, and custom RTMP destinations simultaneously.',
      highlight: 'Stream to 6+ platforms at once',
      badge: null,
    },
    {
      icon: Video,
      title: 'Brand-Aware AI',
      description: 'AI learns your tone, style, and messaging. Every piece of content reflects your unique brand identity.',
      highlight: 'Your voice, amplified',
      badge: 'AI',
    },
    {
      icon: ShoppingBag,
      title: 'E-commerce Integration',
      description: 'Link products from Coupang, G-Market, and more directly to your streams. Perfect for live shopping.',
      highlight: 'Built for live commerce',
      badge: null,
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Schedule streams in advance with timezone support. Set it and forget it - MetaCast handles the rest.',
      highlight: 'Global timezone support',
      badge: null,
    },
    {
      icon: BarChart3,
      title: 'AI Performance Insights',
      description: 'Get AI-powered recommendations to optimize content timing, format, and engagement strategies.',
      highlight: 'Data-driven optimization',
      badge: 'AI',
    },
    {
      icon: FolderOpen,
      title: 'Full Creative Control',
      description: 'Review, edit, and approve all AI suggestions before publishing. You always have the final say.',
      highlight: 'Human + AI collaboration',
      badge: null,
    },
  ]

  return (
    <section id="features" className="py-20 px-6 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-[var(--secondary)] mb-4 block">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            Everything you need to broadcast
          </h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            MetaCast combines powerful features in one simple platform.
            No technical expertise required.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 bg-white rounded-2xl border border-[var(--border-color)] hover:border-[var(--secondary)] hover:shadow-lg transition-all duration-300 relative"
            >
              {feature.badge && (
                <div className="absolute top-4 right-4 px-2 py-0.5 bg-[var(--secondary)] text-white text-[10px] font-bold rounded">
                  {feature.badge}
                </div>
              )}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[var(--secondary)]/10">
                <feature.icon size={24} className="text-[var(--secondary)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-[var(--muted)] mb-4">{feature.description}</p>
              <div className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-[var(--secondary)]/10 text-[var(--secondary)]">
                {feature.highlight}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
