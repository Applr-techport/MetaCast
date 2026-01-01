'use client'

import { Bot, Film, Wand2, Mic, MessageCircle, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function AIStudioSection() {
  const aiFeatures = [
    {
      icon: Bot,
      title: 'AI Co-Host',
      description: 'Never broadcast alone. AI assists your live streams with real-time Q&A, product information, and viewer engagement.',
      highlights: ['Real-time Q&A responses', 'Product info assistant', 'Live audience insights'],
      badge: 'Popular',
    },
    {
      icon: Film,
      title: 'AI Video Generator',
      description: 'Create professional videos from text, images, or existing streams. Multiple styles and formats supported.',
      highlights: ['Text to video', 'Image to video', 'Stream highlights'],
    },
    {
      icon: Wand2,
      title: 'AI Tools Suite',
      description: 'Thumbnails, captions, scripts, and more. All the AI-powered tools you need for content creation.',
      highlights: ['Auto thumbnails', 'Caption generation', 'Script writing'],
    },
  ]

  const voiceStyles = [
    { name: 'Professional', desc: 'Formal business tone' },
    { name: 'Friendly', desc: 'Casual, approachable' },
    { name: 'Energetic', desc: 'Upbeat, enthusiastic' },
  ]

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-[var(--secondary)]/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--secondary)]/10 rounded-full mb-6">
            <Sparkles size={16} className="text-[var(--secondary)]" />
            <span className="text-sm font-medium text-[var(--secondary)]">AI Studio</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Supercharge your streams with AI
          </h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            From AI co-hosts to automated video generation, MetaCast brings cutting-edge AI
            technology to your live commerce broadcasts.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {aiFeatures.map((feature) => (
            <div
              key={feature.title}
              className="relative p-6 bg-white rounded-2xl border border-[var(--border-color)] hover:border-[var(--secondary)] hover:shadow-lg transition-all group"
            >
              {feature.badge && (
                <span className="absolute top-4 right-4 px-2 py-1 bg-[var(--secondary)] text-white text-xs font-medium rounded-full">
                  {feature.badge}
                </span>
              )}
              <div className="w-14 h-14 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center mb-4">
                <feature.icon size={28} className="text-[var(--secondary)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-[var(--muted)] mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-[var(--secondary)] rounded-full" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* AI Co-Host Showcase */}
        <div className="bg-white rounded-2xl border border-[var(--border-color)] overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left: Description */}
            <div className="p-8 md:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--secondary)]/10 rounded-full mb-4">
                <Bot size={14} className="text-[var(--secondary)]" />
                <span className="text-xs font-medium text-[var(--secondary)]">AI Co-Host</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Don&apos;t broadcast alone.<br />AI is with you.
              </h3>
              <p className="text-[var(--muted)] mb-6">
                Your AI co-host handles Q&A, provides product details, and keeps viewers engaged
                while you focus on what matters most — your content.
              </p>

              {/* Voice Styles */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">Choose your AI voice style</p>
                <div className="flex gap-2">
                  {voiceStyles.map((style) => (
                    <div
                      key={style.name}
                      className="px-4 py-2 bg-[var(--background)] rounded-lg border border-[var(--border-color)] text-center"
                    >
                      <p className="text-sm font-medium">{style.name}</p>
                      <p className="text-xs text-[var(--muted)]">{style.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
                    <MessageCircle size={16} className="text-[var(--secondary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Real-time Q&A</p>
                    <p className="text-xs text-[var(--muted)]">AI answers viewer questions instantly</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
                    <Mic size={16} className="text-[var(--secondary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Natural Voice</p>
                    <p className="text-xs text-[var(--muted)]">AI speaks with natural, human-like voice</p>
                  </div>
                </div>
              </div>

              <Link
                href="/ai-studio/live-stream"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--secondary)] text-white rounded-lg font-medium hover:bg-[#7c4fe0] transition-colors"
              >
                Try AI Co-Host
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right: Visual Preview */}
            <div className="bg-[var(--background)] p-8 flex items-center justify-center">
              <div className="w-full max-w-sm space-y-4">
                {/* AI Response Preview */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-[var(--border-color)]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[var(--secondary)] rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--muted)] mb-1">AI Co-Host</p>
                      <p className="text-sm">
                        &quot;Great question! This product features premium leather and comes in 3 colors.
                        Currently 20% off with free shipping!&quot;
                      </p>
                    </div>
                  </div>
                </div>

                {/* Viewer Question */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-[var(--border-color)]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[var(--muted)] rounded-full flex-shrink-0" />
                    <div>
                      <p className="text-xs text-[var(--muted)] mb-1">viewer_123</p>
                      <p className="text-sm">&quot;What materials is this made of?&quot;</p>
                    </div>
                  </div>
                </div>

                {/* Live Insights */}
                <div className="bg-[var(--secondary)]/10 rounded-xl p-4 border border-[var(--secondary)]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-[var(--secondary)]" />
                    <span className="text-xs font-medium text-[var(--secondary)]">Live Insight</span>
                  </div>
                  <p className="text-sm">
                    Viewer interest peaked at product demo. Consider extending this segment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
