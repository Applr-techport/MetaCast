'use client'

import Link from 'next/link'
import { Search, Book, Video, MessageCircle, FileText, Zap, ArrowRight } from 'lucide-react'
import { LandingHeader, Footer } from '@/components/landing'

export default function HelpCenterPage() {
  const categories = [
    {
      icon: Book,
      title: 'Getting Started',
      description: 'Learn the basics of MetaCast',
      articles: ['Quick Start Guide', 'Setting Up Your First Stream', 'Connecting Platforms'],
      href: '/help/getting-started',
    },
    {
      icon: Video,
      title: 'Streaming',
      description: 'Everything about live streaming',
      articles: ['Multi-Platform Setup', 'Stream Quality Settings', 'Scheduling Streams'],
      href: '/help/streaming',
    },
    {
      icon: Zap,
      title: 'AI Studio',
      description: 'AI-powered content tools',
      articles: ['Using AI Video Generator', 'Script Writing with AI', 'Thumbnail Creation'],
      href: '/help/ai-studio',
    },
    {
      icon: FileText,
      title: 'Billing & Plans',
      description: 'Manage your subscription',
      articles: ['Plan Comparison', 'Upgrading Your Plan', 'Payment Methods'],
      href: '/help/billing',
    },
  ]

  const popularArticles = [
    'How to stream to YouTube and Facebook simultaneously',
    'Setting up AI-generated captions',
    'Managing team member permissions',
    'Troubleshooting stream quality issues',
    'Understanding AI credit usage',
  ]

  return (
    <main className="min-h-screen bg-white">
      <LandingHeader />

      {/* Hero with Search */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-[var(--secondary)]/5 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How can we help?</h1>
          <div className="relative max-w-xl mx-auto">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
            <input
              type="text"
              placeholder="Search for articles..."
              className="w-full pl-12 pr-4 py-4 border border-[var(--border-color)] rounded-xl text-lg focus:outline-none focus:border-[var(--secondary)]"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.title} className="p-6 rounded-xl border border-[var(--border-color)] hover:border-[var(--secondary)] transition-colors">
                  <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={24} className="text-[var(--secondary)]" />
                  </div>
                  <h3 className="font-semibold mb-2">{category.title}</h3>
                  <p className="text-sm text-[var(--muted)] mb-4">{category.description}</p>
                  <ul className="space-y-2">
                    {category.articles.map((article) => (
                      <li key={article}>
                        <span className="text-sm text-[var(--secondary)] hover:underline cursor-pointer">{article}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 px-6 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Popular Articles</h2>
          <div className="bg-white rounded-xl border border-[var(--border-color)] divide-y divide-[var(--border-color)]">
            {popularArticles.map((article) => (
              <div key={article} className="p-4 hover:bg-[var(--background)] transition-colors cursor-pointer flex items-center justify-between">
                <span className="text-sm">{article}</span>
                <ArrowRight size={16} className="text-[var(--muted)]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-[var(--secondary)]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageCircle size={32} className="text-[var(--secondary)]" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
          <p className="text-[var(--muted)] mb-8">
            Our support team is available 24/7 to assist you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--secondary)] text-white rounded-full font-medium hover:bg-[#7c4fe0] transition-colors"
          >
            Contact Support
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
