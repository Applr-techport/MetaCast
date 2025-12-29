'use client'

import { Check, X } from 'lucide-react'

export function ComparisonSection() {
  const features = [
    { name: 'Multi-platform streaming', xcaster: true, others: false },
    { name: 'Platform-specific optimization', xcaster: true, others: false },
    { name: 'Pre-recorded as live', xcaster: true, others: false },
    { name: 'E-commerce integration', xcaster: true, others: false },
    { name: 'Brand learning system', xcaster: true, others: false },
    { name: 'AI performance insights', xcaster: true, others: false },
    { name: 'Real-time analytics', xcaster: true, others: 'partial' },
    { name: 'Team collaboration', xcaster: true, others: true },
  ]

  return (
    <section className="py-20 px-6 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-[var(--secondary)] mb-4 block">
            Why XCaster
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What makes us different
          </h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            Other tools do one thing well. XCaster does everything —
            from creation to distribution to optimization.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-[var(--border-color)] overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-[var(--background)] border-b border-[var(--border-color)]">
              <div className="p-4">
                <span className="text-sm font-medium text-[var(--muted)]">Feature</span>
              </div>
              <div className="p-4 text-center border-x border-[var(--border-color)]">
                <span className="text-sm font-bold text-[var(--secondary)]">XCaster</span>
              </div>
              <div className="p-4 text-center">
                <span className="text-sm font-medium text-[var(--muted)]">Others</span>
              </div>
            </div>

            {/* Rows */}
            {features.map((feature, index) => (
              <div
                key={feature.name}
                className={`grid grid-cols-3 ${
                  index !== features.length - 1 ? 'border-b border-[var(--border-color)]' : ''
                }`}
              >
                <div className="p-4 flex items-center">
                  <span className="text-sm">{feature.name}</span>
                </div>
                <div className="p-4 flex items-center justify-center border-x border-[var(--border-color)] bg-[var(--secondary)]/5">
                  <div className="w-6 h-6 bg-[var(--secondary)] rounded-full flex items-center justify-center">
                    <Check size={14} className="text-white" />
                  </div>
                </div>
                <div className="p-4 flex items-center justify-center">
                  {feature.others === true ? (
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-gray-500" />
                    </div>
                  ) : feature.others === 'partial' ? (
                    <span className="text-xs text-[var(--muted)]">Partial</span>
                  ) : (
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <X size={14} className="text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Highlight */}
        <div className="max-w-3xl mx-auto mt-8">
          <div className="bg-[var(--secondary)]/5 rounded-xl p-6 border border-[var(--secondary)]/20">
            <p className="text-center text-sm">
              <span className="font-semibold text-[var(--secondary)]">XCaster&apos;s unique advantage:</span>{' '}
              <span className="text-[var(--muted)]">
                End-to-end solution — create, optimize, distribute, and analyze all in one platform.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
