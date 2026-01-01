'use client'

import { Clock, Copy, TrendingDown, Wrench } from 'lucide-react'

export function ProblemSection() {
  const problems = [
    {
      icon: Clock,
      title: 'Time-Consuming Setup',
      description: 'Setting up streams for each platform takes hours. Login, configure, upload - repeat for every channel.',
    },
    {
      icon: Copy,
      title: 'Generic AI Content',
      description: 'Most AI tools produce cookie-cutter content that sounds robotic and loses your brand personality.',
    },
    {
      icon: TrendingDown,
      title: 'Missed Opportunities',
      description: 'Limited reach when streaming to just one platform. Your audience is scattered across channels.',
    },
    {
      icon: Wrench,
      title: 'No Control Over AI',
      description: 'AI makes decisions without your input. You need a system where you approve everything before it goes live.',
    },
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-[var(--secondary)] mb-4 block">
            The Problem
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            Broadcasting shouldn&apos;t be this hard
          </h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            Creators and businesses waste countless hours managing multiple platforms,
            missing out on audience reach and revenue opportunities.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="p-6 bg-[var(--background)] rounded-2xl border border-[var(--border-color)]"
            >
              <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center mb-4">
                <problem.icon size={24} className="text-[var(--secondary)]" />
              </div>
              <h3 className="font-semibold mb-2">{problem.title}</h3>
              <p className="text-sm text-[var(--muted)]">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
