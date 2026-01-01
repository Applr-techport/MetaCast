'use client'

import { TrendingUp, Clock, Target, BarChart3 } from 'lucide-react'

export function AIInsightsSection() {
  const insights = [
    {
      icon: Clock,
      title: 'Optimal Timing',
      description: 'AI analyzes your audience behavior to recommend the best time to stream.',
      example: '"Your YouTube audience is 2.3x more active on Tuesday 8PM"',
    },
    {
      icon: TrendingUp,
      title: 'Performance Prediction',
      description: 'Get AI-powered predictions before you go live.',
      example: '"Shortening intro by 5 seconds could reduce drop-off by 15%"',
    },
    {
      icon: Target,
      title: 'Content Recommendations',
      description: 'AI suggests content types based on past performance.',
      example: '"Tutorial content gets 40% higher engagement than reviews"',
    },
    {
      icon: BarChart3,
      title: 'Auto Optimization',
      description: 'Automatic A/B testing and continuous improvement.',
      example: '"Thumbnail A outperformed B by 23% — now default"',
    },
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-[var(--secondary)] mb-4 block">
            AI Insights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Not just creation — performance optimization
          </h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            XCaster doesn&apos;t just help you create. It learns from your data
            and continuously improves your results.
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {insights.map((insight) => (
            <div
              key={insight.title}
              className="p-6 bg-white rounded-2xl border border-[var(--border-color)] hover:border-[var(--secondary)] transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <insight.icon size={24} className="text-[var(--secondary)]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{insight.title}</h3>
                  <p className="text-sm text-[var(--muted)] mb-4">{insight.description}</p>
                  <div className="bg-[var(--background)] rounded-lg p-3">
                    <p className="text-xs text-[var(--secondary)] italic">{insight.example}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Highlight */}
        <div className="mt-12 bg-gradient-to-r from-[var(--secondary)]/5 to-[var(--secondary)]/10 rounded-2xl p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-[var(--secondary)] mb-2">312%</p>
              <p className="text-sm text-[var(--muted)]">Average view increase</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[var(--secondary)] mb-2">8.5x</p>
              <p className="text-sm text-[var(--muted)]">Average ROI</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[var(--secondary)] mb-2">73%</p>
              <p className="text-sm text-[var(--muted)]">Time saved on production</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
