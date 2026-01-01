'use client'

import { useState } from 'react'
import { Play, ExternalLink } from 'lucide-react'
import { LandingHeader, Footer } from '@/components/landing'

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'shortform', label: 'Short-form' },
    { id: 'live', label: 'Live Stream' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'marketing', label: 'Marketing' },
  ]

  const portfolioItems = [
    {
      id: 1,
      title: 'Fashion Brand Campaign',
      category: 'shortform',
      client: 'Style Co.',
      description: 'AI-generated short-form videos for seasonal campaign',
      stats: { views: '1.2M', engagement: '8.5%' },
    },
    {
      id: 2,
      title: 'Product Launch Live',
      category: 'live',
      client: 'Tech Startup',
      description: 'Multi-platform live streaming for product announcement',
      stats: { views: '50K', engagement: '12%' },
    },
    {
      id: 3,
      title: 'Daily Product Showcase',
      category: 'ecommerce',
      client: 'Beauty Shop',
      description: 'Automated daily product videos for social media',
      stats: { views: '500K', engagement: '6.2%' },
    },
    {
      id: 4,
      title: 'Brand Story Series',
      category: 'marketing',
      client: 'Food & Beverage',
      description: 'Weekly AI-generated content series',
      stats: { views: '2.5M', engagement: '9.1%' },
    },
    {
      id: 5,
      title: 'Influencer Content Pack',
      category: 'shortform',
      client: 'Fitness Influencer',
      description: '30 days of automated workout videos',
      stats: { views: '800K', engagement: '11%' },
    },
    {
      id: 6,
      title: 'Virtual Event Streaming',
      category: 'live',
      client: 'Conference Org',
      description: 'Multi-day conference with 5 simultaneous streams',
      stats: { views: '120K', engagement: '15%' },
    },
  ]

  const filteredItems = activeCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory)

  return (
    <main className="min-h-screen bg-white">
      <LandingHeader />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Portfolio
            </h1>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              See how businesses are using MetaCast to create amazing video content
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-[var(--secondary)] text-white'
                    : 'bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl border border-[var(--border-color)] overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-[var(--secondary)]/20 to-[var(--accent)]/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={24} className="text-[var(--secondary)] ml-1" />
                    </button>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-white/90 rounded text-xs font-medium capitalize">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{item.title}</h3>
                    <ExternalLink size={16} className="text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-[var(--secondary)] mb-2">{item.client}</p>
                  <p className="text-sm text-[var(--muted)] mb-4">{item.description}</p>

                  {/* Stats */}
                  <div className="flex gap-4 pt-4 border-t border-[var(--border-color)]">
                    <div>
                      <p className="text-lg font-bold">{item.stats.views}</p>
                      <p className="text-xs text-[var(--muted)]">Views</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{item.stats.engagement}</p>
                      <p className="text-xs text-[var(--muted)]">Engagement</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16 p-12 bg-[var(--background)] rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Ready to create your success story?</h2>
            <p className="text-[var(--muted)] mb-6">
              Join thousands of creators and businesses using MetaCast
            </p>
            <a
              href="/signup"
              className="inline-flex px-8 py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-xl font-medium transition-colors"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
