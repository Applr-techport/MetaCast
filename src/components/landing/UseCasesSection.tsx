'use client'

import { useState } from 'react'
import { User, Building2, ShoppingCart, Mic } from 'lucide-react'

export function UseCasesSection() {
  const [activeTab, setActiveTab] = useState(0)

  const useCases = [
    {
      icon: User,
      tab: 'Creators',
      title: 'For Content Creators',
      headline: 'Reach your audience everywhere',
      description: 'Stop logging into multiple platforms. Stream once and reach all your followers on YouTube, TikTok, Instagram, and more simultaneously.',
      benefits: [
        'Save 3+ hours per stream on setup',
        'Grow your audience across all platforms',
        'Schedule content in advance',
        'Track performance in one dashboard',
      ],
      stat: { value: '300%', label: 'More reach with multi-streaming' },
    },
    {
      icon: Building2,
      tab: 'Agencies',
      title: 'For Marketing Agencies',
      headline: 'Manage all clients from one place',
      description: 'Handle multiple client accounts efficiently. Create, schedule, and publish content for all your clients without switching between platforms.',
      benefits: [
        'Unlimited client channels',
        'Team collaboration features',
        'White-label reporting',
        'Bulk scheduling capabilities',
      ],
      stat: { value: '50%', label: 'Time saved on client management' },
    },
    {
      icon: ShoppingCart,
      tab: 'E-commerce',
      title: 'For E-commerce Brands',
      headline: 'Turn streams into sales',
      description: 'Connect your product catalog directly to your streams. Feature products during live shopping events and drive real-time conversions.',
      benefits: [
        'Product catalog integration',
        'Live shopping features',
        'Multi-platform commerce',
        'Real-time inventory sync',
      ],
      stat: { value: '2.5x', label: 'Higher conversion in live shopping' },
    },
    {
      icon: Mic,
      tab: 'Events',
      title: 'For Event Organizers',
      headline: 'Broadcast to the world',
      description: 'Stream conferences, webinars, and virtual events to multiple platforms. Reach maximum audience with professional-grade broadcasting.',
      benefits: [
        'Multi-day event support',
        'Simultaneous streams',
        'Pre-recorded as live',
        'Global timezone scheduling',
      ],
      stat: { value: '10x', label: 'Audience reach vs single platform' },
    },
  ]

  const activeCase = useCases[activeTab]

  return (
    <section id="use-cases" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-[var(--secondary)] mb-4 block">
            Use Cases
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            Built for every broadcaster
          </h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            Whether you&apos;re a solo creator or enterprise team, MetaCast scales with your needs.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {useCases.map((useCase, index) => (
            <button
              key={useCase.tab}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                activeTab === index
                  ? 'bg-[var(--secondary)] text-white'
                  : 'bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
            >
              <useCase.icon size={16} />
              {useCase.tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Info */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--secondary)]/10 rounded-full mb-4">
              <activeCase.icon size={14} className="text-[var(--secondary)]" />
              <span className="text-xs font-medium text-[var(--secondary)]">{activeCase.title}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{activeCase.headline}</h3>
            <p className="text-[var(--muted)] mb-8">{activeCase.description}</p>

            <ul className="space-y-3 mb-8">
              {activeCase.benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[var(--secondary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-[var(--secondary)] rounded-full" />
                  </div>
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Stat */}
            <div className="inline-flex items-center gap-4 p-4 bg-[var(--background)] rounded-xl">
              <span className="text-3xl font-bold text-[var(--secondary)]">{activeCase.stat.value}</span>
              <span className="text-sm text-[var(--muted)]">{activeCase.stat.label}</span>
            </div>
          </div>

          {/* Right - Visual */}
          <div className="relative">
            <div className="bg-[var(--background)] rounded-2xl p-8 border border-[var(--border-color)]">
              {activeTab === 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-semibold">My Streams</h4>
                    <span className="text-xs text-[var(--secondary)]">This week</span>
                  </div>
                  {['Morning Vlog', 'Product Review', 'Q&A Session'].map((stream, i) => (
                    <div key={stream} className="flex items-center gap-4 p-3 bg-white rounded-lg">
                      <div className="w-16 h-10 rounded bg-[var(--secondary)]" style={{ opacity: 1 - i * 0.25 }} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{stream}</p>
                        <p className="text-xs text-[var(--muted)]">4 platforms</p>
                      </div>
                      <span className="text-xs text-[var(--muted)]">{i === 0 ? '2.3K views' : i === 1 ? '1.8K views' : '956 views'}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-semibold">Client Channels</h4>
                    <span className="text-xs bg-[var(--secondary)]/10 text-[var(--secondary)] px-2 py-1 rounded">12 Active</span>
                  </div>
                  {['Fashion Brand', 'Tech Startup', 'Food & Beverage'].map((client) => (
                    <div key={client} className="flex items-center gap-4 p-3 bg-white rounded-lg">
                      <div className="w-10 h-10 rounded-lg bg-[var(--secondary)]/10 flex items-center justify-center">
                        <Building2 size={18} className="text-[var(--secondary)]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{client}</p>
                        <p className="text-xs text-[var(--muted)]">6 channels connected</p>
                      </div>
                      <div className="flex -space-x-1">
                        {[1, 2, 3].map((j) => (
                          <div key={j} className="w-5 h-5 rounded-full bg-[var(--secondary)] border border-white" style={{ opacity: 1 - (j - 1) * 0.3 }} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-semibold">Live Shopping</h4>
                    <span className="flex items-center gap-1 text-xs text-[var(--secondary)]">
                      <div className="w-2 h-2 bg-[var(--secondary)] rounded-full animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  {['Summer Dress', 'Sneakers', 'Watch'].map((product, i) => (
                    <div key={product} className="flex items-center gap-4 p-3 bg-white rounded-lg">
                      <div className="w-12 h-12 rounded-lg bg-[var(--secondary)]/10" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{product}</p>
                        <p className="text-xs text-[var(--secondary)]">{i === 0 ? '23 sold' : i === 1 ? '18 sold' : '12 sold'}</p>
                      </div>
                      <span className="font-semibold text-sm">{i === 0 ? '$89' : i === 1 ? '$129' : '$299'}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-semibold">Event Schedule</h4>
                    <span className="text-xs text-[var(--muted)]">Tech Conference 2024</span>
                  </div>
                  {['Keynote', 'Panel Discussion', 'Workshop'].map((session, i) => (
                    <div key={session} className="flex items-center gap-4 p-3 bg-white rounded-lg">
                      <div className="text-center">
                        <p className="text-xs text-[var(--muted)]">{i === 0 ? '9:00' : i === 1 ? '11:00' : '14:00'}</p>
                        <p className="text-xs text-[var(--muted)]">AM</p>
                      </div>
                      <div className="w-1 h-10 bg-[var(--secondary)] rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{session}</p>
                        <p className="text-xs text-[var(--muted)]">Streaming to 4 platforms</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${i === 0 ? 'bg-[var(--secondary)]/10 text-[var(--secondary)]' : 'bg-gray-100 text-[var(--muted)]'}`}>
                        {i === 0 ? 'Live' : 'Scheduled'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
