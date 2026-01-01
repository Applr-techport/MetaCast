'use client'

import { useState } from 'react'
import { Zap, Sliders, Settings2, Check } from 'lucide-react'

export function ControlSection() {
  const [activeMode, setActiveMode] = useState(1)

  const modes = [
    {
      icon: Zap,
      title: 'Full Auto',
      time: '10 min',
      description: 'One click, done. AI handles everything from script to publishing.',
      features: [
        'AI-generated script',
        'Auto image selection',
        'Default voice & style',
        'Instant multi-platform publish',
      ],
    },
    {
      icon: Sliders,
      title: 'Quick Edit',
      time: '20 min',
      description: 'AI creates the base, you tweak the essentials.',
      features: [
        'Review & edit AI script',
        'Choose from 20+ voice options',
        'Select preferred images',
        'Schedule or publish instantly',
      ],
    },
    {
      icon: Settings2,
      title: 'Full Control',
      time: '30 min',
      description: 'Complete creative control over every element.',
      features: [
        'Write or edit every line',
        'Upload your own assets',
        'Fine-tune timing & transitions',
        'Platform-specific customization',
      ],
    },
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-[var(--secondary)] mb-4 block">
            Your Control
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose how much you want to control
          </h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            From fully automated to hands-on editing — XCaster adapts to your workflow.
            Start fast, refine later.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex justify-center gap-2 mb-12">
          {modes.map((mode, index) => (
            <button
              key={mode.title}
              onClick={() => setActiveMode(index)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeMode === index
                  ? 'bg-[var(--secondary)] text-white'
                  : 'bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
            >
              <mode.icon size={16} />
              {mode.title}
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                activeMode === index ? 'bg-white/20' : 'bg-[var(--secondary)]/10 text-[var(--secondary)]'
              }`}>
                {mode.time}
              </span>
            </button>
          ))}
        </div>

        {/* Mode Detail */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-[var(--background)] rounded-2xl p-8 border border-[var(--border-color)]">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center">
                {(() => {
                  const Icon = modes[activeMode].icon
                  return <Icon size={24} className="text-[var(--secondary)]" />
                })()}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{modes[activeMode].title} Mode</h3>
                <p className="text-[var(--muted)]">{modes[activeMode].description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {modes[activeMode].features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <div className="w-5 h-5 bg-[var(--secondary)]/10 rounded-full flex items-center justify-center">
                    <Check size={12} className="text-[var(--secondary)]" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <p className="text-center text-sm text-[var(--muted)] mt-8">
          Start with Full Auto, switch to Full Control anytime — your workflow, your rules.
        </p>
      </div>
    </section>
  )
}
