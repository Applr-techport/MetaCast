'use client'

import Link from 'next/link'
import { Clock, ArrowRight, Tag } from 'lucide-react'
import { LandingHeader, Footer } from '@/components/landing'

export default function BlogPage() {
  const featuredPost = {
    title: 'The Future of Multi-Platform Streaming: AI-Powered Automation',
    excerpt: 'Discover how artificial intelligence is transforming the way creators broadcast to multiple platforms simultaneously, saving hours of manual work.',
    category: 'AI & Technology',
    date: 'Jan 15, 2026',
    readTime: '8 min read',
    slug: 'future-of-multi-platform-streaming',
  }

  const posts = [
    {
      title: '10 Tips for Growing Your Live Stream Audience in 2026',
      excerpt: 'Learn proven strategies to attract and retain viewers across YouTube, Facebook, and other platforms.',
      category: 'Growth',
      date: 'Jan 10, 2026',
      readTime: '5 min read',
      slug: 'growing-live-stream-audience',
    },
    {
      title: 'How MetaCast Reduced Streaming Setup Time by 80%',
      excerpt: 'A case study on how creators are saving hours every week with automated multi-streaming.',
      category: 'Case Study',
      date: 'Jan 5, 2026',
      readTime: '6 min read',
      slug: 'reducing-streaming-setup-time',
    },
    {
      title: 'Understanding Stream Analytics: Metrics That Matter',
      excerpt: 'Not all metrics are created equal. Learn which analytics actually drive growth and engagement.',
      category: 'Analytics',
      date: 'Dec 28, 2025',
      readTime: '7 min read',
      slug: 'understanding-stream-analytics',
    },
    {
      title: 'AI-Generated Short-Form Content: A Complete Guide',
      excerpt: 'Transform your long streams into viral clips automatically. Here\'s everything you need to know.',
      category: 'AI & Technology',
      date: 'Dec 20, 2025',
      readTime: '10 min read',
      slug: 'ai-generated-short-form-content',
    },
    {
      title: 'Building a Consistent Streaming Schedule That Works',
      excerpt: 'Consistency is key to audience growth. Learn how to create a schedule you can actually maintain.',
      category: 'Strategy',
      date: 'Dec 15, 2025',
      readTime: '4 min read',
      slug: 'consistent-streaming-schedule',
    },
    {
      title: 'Monetization Strategies for Live Streamers in 2026',
      excerpt: 'From sponsorships to subscriptions, explore the revenue streams available to modern creators.',
      category: 'Monetization',
      date: 'Dec 10, 2025',
      readTime: '9 min read',
      slug: 'monetization-strategies',
    },
  ]

  const categories = ['All', 'AI & Technology', 'Growth', 'Analytics', 'Strategy', 'Case Study', 'Monetization']

  return (
    <main className="min-h-screen bg-white">
      <LandingHeader />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">MetaCast Blog</h1>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              Insights, tutorials, and updates from the MetaCast team to help you grow your streaming presence.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  index === 0
                    ? 'bg-[var(--secondary)] text-white'
                    : 'bg-[var(--background)] text-[var(--muted)] hover:text-[var(--secondary)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          <div className="bg-[var(--background)] rounded-2xl p-8 mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-[var(--secondary)]/10 text-[var(--secondary)] text-xs font-medium rounded-full">
                Featured
              </span>
              <span className="px-3 py-1 bg-[var(--border-color)] text-[var(--muted)] text-xs rounded-full">
                {featuredPost.category}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 hover:text-[var(--secondary)] transition-colors cursor-pointer">
              {featuredPost.title}
            </h2>
            <p className="text-[var(--muted)] mb-6 max-w-3xl">{featuredPost.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
                <span>{featuredPost.date}</span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {featuredPost.readTime}
                </span>
              </div>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="flex items-center gap-2 text-[var(--secondary)] font-medium hover:gap-3 transition-all"
              >
                Read Article
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Post Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border border-[var(--border-color)] rounded-xl p-6 hover:border-[var(--secondary)] transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Tag size={14} className="text-[var(--secondary)]" />
                  <span className="text-xs text-[var(--muted)]">{post.category}</span>
                </div>
                <h3 className="font-semibold mb-3 hover:text-[var(--secondary)] transition-colors cursor-pointer">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--muted)] mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 border border-[var(--border-color)] rounded-full text-sm font-medium hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-colors">
              Load More Articles
            </button>
          </div>

          {/* Newsletter */}
          <div className="mt-20 bg-[var(--secondary)]/5 border border-[var(--secondary)]/20 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-[var(--muted)] mb-6 max-w-xl mx-auto">
              Get the latest streaming tips, product updates, and industry insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white border border-[var(--border-color)] rounded-lg focus:outline-none focus:border-[var(--secondary)]"
              />
              <button className="w-full sm:w-auto px-6 py-3 bg-[var(--secondary)] text-white rounded-lg font-medium hover:bg-[#7c4fe0] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
