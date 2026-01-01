'use client'

import { LandingHeader, Footer } from '@/components/landing'
import { Sparkles, Bug, Zap, Shield } from 'lucide-react'

export default function ChangelogPage() {
  const releases = [
    {
      version: 'v1.2.0',
      date: 'January 2, 2026',
      highlights: true,
      changes: [
        { type: 'feature', text: 'AI-powered video clip generator from live streams' },
        { type: 'feature', text: 'New thumbnail generation with AI' },
        { type: 'improvement', text: 'Improved multi-platform sync latency by 40%' },
        { type: 'fix', text: 'Fixed audio desync issues on Facebook Live' },
      ],
    },
    {
      version: 'v1.1.5',
      date: 'December 20, 2025',
      changes: [
        { type: 'improvement', text: 'Enhanced dashboard performance' },
        { type: 'fix', text: 'Fixed scheduling timezone issues' },
        { type: 'fix', text: 'Resolved chat overlay positioning bug' },
      ],
    },
    {
      version: 'v1.1.0',
      date: 'December 1, 2025',
      changes: [
        { type: 'feature', text: 'Brand Voice AI for consistent messaging' },
        { type: 'feature', text: 'Team collaboration features' },
        { type: 'improvement', text: 'New analytics dashboard with real-time data' },
        { type: 'security', text: 'Enhanced 2FA authentication options' },
      ],
    },
    {
      version: 'v1.0.0',
      date: 'November 15, 2025',
      changes: [
        { type: 'feature', text: 'Official launch of MetaCast platform' },
        { type: 'feature', text: 'Multi-platform streaming support' },
        { type: 'feature', text: 'AI Studio with script and caption generation' },
        { type: 'feature', text: 'Real-time analytics dashboard' },
      ],
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case 'feature': return <Sparkles size={14} className="text-[var(--secondary)]" />
      case 'improvement': return <Zap size={14} className="text-blue-500" />
      case 'fix': return <Bug size={14} className="text-orange-500" />
      case 'security': return <Shield size={14} className="text-green-500" />
      default: return null
    }
  }

  const getLabel = (type: string) => {
    switch (type) {
      case 'feature': return 'New'
      case 'improvement': return 'Improved'
      case 'fix': return 'Fixed'
      case 'security': return 'Security'
      default: return type
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <LandingHeader />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Changelog</h1>
          <p className="text-lg text-[var(--muted)]">
            Stay up to date with the latest features, improvements, and fixes.
          </p>
        </div>
      </section>

      {/* Releases */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          {releases.map((release, index) => (
            <div key={release.version} className={`relative pl-8 pb-12 ${index !== releases.length - 1 ? 'border-l-2 border-[var(--border-color)]' : ''}`}>
              <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-[var(--secondary)]" />
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xl font-bold">{release.version}</span>
                  {release.highlights && (
                    <span className="px-2 py-0.5 bg-[var(--secondary)] text-white text-xs rounded-full">Latest</span>
                  )}
                </div>
                <p className="text-sm text-[var(--muted)]">{release.date}</p>
              </div>
              <div className="space-y-3">
                {release.changes.map((change, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-[var(--background)] rounded-lg">
                    <div className="flex items-center gap-2 min-w-[80px]">
                      {getIcon(change.type)}
                      <span className="text-xs font-medium text-[var(--muted)]">{getLabel(change.type)}</span>
                    </div>
                    <p className="text-sm">{change.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
