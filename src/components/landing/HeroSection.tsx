'use client'

import Link from 'next/link'
import { Play, ArrowRight, Radio } from 'lucide-react'

export function HeroSection() {
  const platforms = [
    { name: 'YouTube' },
    { name: 'Facebook' },
    { name: 'Instagram' },
    { name: 'TikTok' },
    { name: 'Twitch' },
    { name: 'Kakao TV' },
  ]

  const stats = [
    { value: '6+', label: 'Platforms' },
    { value: '10K+', label: 'Creators' },
    { value: '1M+', label: 'Streams' },
  ]

  return (
    <section className="pt-28 pb-16 px-6 bg-gradient-to-b from-[var(--secondary)]/5 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--secondary)]/10 rounded-full mb-6">
              <Radio size={14} className="text-[var(--secondary)]" />
              <span className="text-xs font-medium text-[var(--secondary)]">
                Content Automation Platform
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 font-heading">
              One Platform.{' '}
              <span className="text-[var(--secondary)]">Infinite Reach.</span>
              <br />
              Full Automation.
            </h1>

            {/* Sub Headline */}
            <p className="text-lg text-[var(--muted)] mb-8 max-w-lg">
              AI creates your videos. Schedule broadcasts when you sleep. Stream live to YouTube, TikTok, Instagram and more—simultaneously. Manage everything from one dashboard.
            </p>

            {/* Key Benefits */}
            <div className="flex flex-wrap gap-4 mb-8">
              {['AI + Live + VOD', 'Set & forget scheduling', 'All platforms, one hub'].map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 bg-[var(--secondary)]/10 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[var(--secondary)] rounded-full" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/signup"
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-xl font-medium transition-colors"
              >
                Start Free Trial
                <ArrowRight size={18} />
              </Link>
              <button className="flex items-center justify-center gap-2 px-6 py-3.5 border border-[var(--border-color)] hover:border-[var(--secondary)] rounded-xl font-medium transition-colors">
                <Play size={18} className="text-[var(--secondary)]" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-[var(--secondary)]">{stat.value}</p>
                  <p className="text-sm text-[var(--muted)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Dashboard Preview */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl border border-[var(--border-color)] overflow-hidden">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[var(--background)] border-b border-[var(--border-color)]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-6 bg-white rounded-md flex items-center px-3">
                    <span className="text-xs text-[var(--muted)]">app.metacast.io/dashboard</span>
                  </div>
                </div>
              </div>

              {/* Dashboard Preview */}
              <div className="p-4">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="p-3 bg-[var(--background)] rounded-lg">
                    <p className="text-xs text-[var(--muted)] mb-1">Live Now</p>
                    <p className="text-lg font-bold text-[var(--secondary)]">3</p>
                  </div>
                  <div className="p-3 bg-[var(--background)] rounded-lg">
                    <p className="text-xs text-[var(--muted)] mb-1">VOD</p>
                    <p className="text-lg font-bold">10</p>
                  </div>
                  <div className="p-3 bg-[var(--background)] rounded-lg">
                    <p className="text-xs text-[var(--muted)] mb-1">Scheduled</p>
                    <p className="text-lg font-bold text-[var(--secondary)]">3</p>
                  </div>
                </div>

                <div className="bg-[var(--background)] rounded-lg p-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-12 bg-gradient-to-br from-[var(--secondary)]/30 to-[var(--secondary)]/10 rounded-md flex items-center justify-center">
                      <div className="flex items-center gap-1 px-1.5 py-0.5 bg-[var(--secondary)] rounded text-[10px] text-white font-medium">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        LIVE
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Product Launch Stream</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-4 h-4 rounded-full bg-[var(--secondary)]" />
                        <div className="w-4 h-4 rounded-full bg-[var(--secondary)]/70" />
                        <div className="w-4 h-4 rounded-full bg-[var(--secondary)]/50" />
                        <span className="text-xs text-[var(--muted)]">+3 platforms</span>
                      </div>
                    </div>
                    <p className="text-xs text-[var(--muted)]">1:23:45</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--muted)]">Connected Channels</span>
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-white bg-[var(--secondary)]"
                        style={{ opacity: 1 - (i - 1) * 0.2 }}
                      />
                    ))}
                    <div className="w-6 h-6 rounded-full border-2 border-white bg-[var(--muted)] flex items-center justify-center text-[10px] text-white font-medium">
                      +2
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-4 bottom-1/4 bg-white rounded-xl shadow-lg border border-[var(--border-color)] p-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
                  <Radio size={16} className="text-[var(--secondary)]" />
                </div>
                <div>
                  <p className="text-xs font-medium">15.6K viewers</p>
                  <p className="text-[10px] text-[var(--muted)]">Real-time</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Logos */}
        <div className="mt-16 pt-10 border-t border-[var(--border-color)]">
          <p className="text-center text-sm text-[var(--muted)] mb-6">
            Broadcast to all major platforms simultaneously
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--secondary)]/10">
                  <div className="w-4 h-4 rounded-full bg-[var(--secondary)]" />
                </div>
                <span className="text-sm font-medium">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
