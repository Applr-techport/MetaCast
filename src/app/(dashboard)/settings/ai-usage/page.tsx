'use client'

import { Header } from '@/components/layout/Header'
import { Zap, Video, FileText, Image, Mic, Scissors } from 'lucide-react'

export default function AIUsagePage() {
  const usageHistory = [
    { date: 'Jan 2, 2026', type: 'Video Generation', credits: 15, description: 'AI Studio - Short-form content' },
    { date: 'Jan 1, 2026', type: 'Thumbnail Generation', credits: 2, description: 'AI Studio - Thumbnail creator' },
    { date: 'Dec 31, 2025', type: 'Script Writing', credits: 5, description: 'AI Studio - Script generator' },
    { date: 'Dec 30, 2025', type: 'Video Generation', credits: 15, description: 'AI Studio - Short-form content' },
    { date: 'Dec 29, 2025', type: 'Transcription', credits: 3, description: 'AI Studio - Auto-transcribe' },
  ]

  const usedCredits = 32
  const totalCredits = 100
  const usagePercent = (usedCredits / totalCredits) * 100

  const creditRates = [
    { type: 'Video Generation', credits: '10-20 credits', icon: Video },
    { type: 'Script Writing', credits: '3-8 credits', icon: FileText },
    { type: 'Thumbnail Generation', credits: '2 credits', icon: Image },
    { type: 'Transcription', credits: '1-5 credits', icon: FileText },
    { type: 'Voice Synthesis', credits: '5-10 credits', icon: Mic },
    { type: 'Auto-Clipping', credits: '5 credits', icon: Scissors },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-6">
        <div className="max-w-2xl">
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">AI Usage & Credits</h2>

              {/* Usage Overview */}
              <div className="p-5 bg-[var(--secondary)]/5 border border-[var(--secondary)]/20 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-[var(--muted)]">Monthly AI Credits</p>
                    <p className="text-2xl font-bold">{totalCredits - usedCredits} <span className="text-sm font-normal text-[var(--muted)]">/ {totalCredits} remaining</span></p>
                  </div>
                  <div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
                    <Zap size={20} className="text-[var(--secondary)]" />
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="h-3 bg-[var(--background)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--secondary)] rounded-full transition-all"
                      style={{ width: `${usagePercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-[var(--muted)]">
                    <span>{usedCredits} credits used</span>
                    <span>Resets Jan 15, 2026</span>
                  </div>
                </div>

                <button className="w-full py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[#7c4fe0] transition-colors">
                  Buy More Credits
                </button>
              </div>

              {/* Credit Rates */}
              <div>
                <h3 className="text-sm font-medium mb-3">Credit Usage Rates</h3>
                <div className="grid grid-cols-2 gap-3">
                  {creditRates.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.type} className="flex items-center justify-between p-3 bg-[var(--background)] rounded-lg">
                        <div className="flex items-center gap-2">
                          <Icon size={16} className="text-[var(--secondary)]" />
                          <span className="text-sm">{item.type}</span>
                        </div>
                        <span className="text-xs text-[var(--muted)]">{item.credits}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Usage History */}
              <div>
                <h3 className="text-sm font-medium mb-3">Recent Usage</h3>
                <div className="bg-[var(--background)] rounded-lg overflow-hidden">
                  {usageHistory.map((item, i) => (
                    <div key={i} className={`flex items-center justify-between p-4 ${i !== usageHistory.length - 1 ? 'border-b border-[var(--border-color)]' : ''}`}>
                      <div>
                        <p className="text-sm font-medium">{item.type}</p>
                        <p className="text-xs text-[var(--muted)]">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-[var(--secondary)]">-{item.credits} credits</p>
                        <p className="text-xs text-[var(--muted)]">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-3 py-2 text-sm text-[var(--secondary)] hover:underline">
                  View Full History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
