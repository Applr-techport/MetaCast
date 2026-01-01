'use client'

import { Link2, Upload, Radio, Calendar } from 'lucide-react'

export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      icon: Link2,
      title: 'Connect Your Channels',
      description: 'Link your YouTube, Facebook, Instagram, TikTok, and other accounts with secure OAuth authentication.',
      detail: 'One-time setup, automatic token refresh',
    },
    {
      number: '02',
      icon: Upload,
      title: 'Upload or Go Live',
      description: 'Upload pre-recorded videos or start a real-time broadcast directly from your browser.',
      detail: 'Support for 10GB videos, up to 4 hours',
    },
    {
      number: '03',
      icon: Calendar,
      title: 'Schedule & Configure',
      description: 'Set your broadcast time, add products for live commerce, and customize settings per platform.',
      detail: 'Global timezone support',
    },
    {
      number: '04',
      icon: Radio,
      title: 'Stream Everywhere',
      description: 'Go live on all platforms simultaneously. Monitor performance in real-time from one dashboard.',
      detail: '6+ platforms at once',
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-6 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-[var(--secondary)] mb-4 block">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            Start streaming in 4 simple steps
          </h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            From setup to live in minutes. No technical expertise required.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-[var(--border-color)] -translate-x-1/2 z-0" />
              )}

              <div className="relative bg-white rounded-2xl p-6 border border-[var(--border-color)] h-full">
                {/* Number badge */}
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-[var(--secondary)] text-white rounded-xl flex items-center justify-center font-bold text-sm">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center mb-4 mt-2">
                  <step.icon size={24} className="text-[var(--secondary)]" />
                </div>

                {/* Content */}
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--muted)] mb-4">{step.description}</p>

                {/* Detail badge */}
                <span className="inline-block text-xs bg-[var(--background)] px-2 py-1 rounded-full text-[var(--muted)]">
                  {step.detail}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Demo */}
        <div className="mt-16 bg-white rounded-2xl border border-[var(--border-color)] overflow-hidden">
          <div className="grid lg:grid-cols-5">
            {/* Step indicator sidebar */}
            <div className="lg:col-span-1 bg-[var(--background)] p-6 border-r border-[var(--border-color)]">
              <p className="text-xs text-[var(--muted)] mb-4 uppercase tracking-wider">Stream Setup</p>
              {['Stream Type', 'Details', 'Products', 'Schedule'].map((label, i) => (
                <div
                  key={label}
                  className={`flex items-center gap-3 py-3 ${i === 0 ? 'text-[var(--secondary)]' : 'text-[var(--muted)]'}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    i === 0 ? 'bg-[var(--secondary)] text-white' : 'bg-[var(--border-color)]'
                  }`}>
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="lg:col-span-4 p-8">
              <h4 className="text-lg font-semibold mb-6">Choose Stream Type</h4>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 border-2 border-[var(--secondary)] rounded-xl bg-[var(--secondary)]/5">
                  <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center mb-4">
                    <Upload size={24} className="text-[var(--secondary)]" />
                  </div>
                  <h5 className="font-semibold mb-2">Pre-recorded Live Stream</h5>
                  <p className="text-sm text-[var(--muted)]">
                    Upload a video and stream it as live content with all the engagement benefits.
                  </p>
                </div>

                <div className="p-6 border border-[var(--border-color)] rounded-xl hover:border-[var(--secondary)] transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                    <Radio size={24} className="text-[var(--muted)]" />
                  </div>
                  <h5 className="font-semibold mb-2">Live Stream</h5>
                  <p className="text-sm text-[var(--muted)]">
                    Go live in real-time with your camera or screen directly to all platforms.
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button className="px-6 py-2.5 bg-[var(--secondary)] text-white rounded-lg font-medium text-sm">
                  Next Step
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
