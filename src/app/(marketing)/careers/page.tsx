'use client'

import Link from 'next/link'
import { MapPin, Clock, ArrowRight, Zap, Heart, Globe, Sparkles } from 'lucide-react'
import { LandingHeader, Footer } from '@/components/landing'

export default function CareersPage() {
  const benefits = [
    { icon: Zap, title: 'Competitive Salary', description: 'Top-tier compensation with equity options' },
    { icon: Heart, title: 'Health & Wellness', description: 'Comprehensive health, dental, and vision coverage' },
    { icon: Globe, title: 'Remote First', description: 'Work from anywhere in the world' },
    { icon: Sparkles, title: 'Learning Budget', description: 'Annual budget for courses and conferences' },
  ]

  const openings = [
    {
      title: 'Senior Backend Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      title: 'ML Engineer - AI Studio',
      department: 'AI/ML',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      title: 'Developer Advocate',
      department: 'Developer Relations',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <LandingHeader />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Build the Future of
            <span className="text-[var(--secondary)]"> Content Creation</span>
          </h1>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Join our team of passionate builders helping creators reach millions of viewers worldwide.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Why MetaCast?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.title} className="bg-white p-6 rounded-xl border border-[var(--border-color)]">
                  <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={24} className="text-[var(--secondary)]" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-[var(--muted)]">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Open Positions</h2>
          <div className="space-y-4">
            {openings.map((job) => (
              <div
                key={job.title}
                className="p-6 rounded-xl border border-[var(--border-color)] hover:border-[var(--secondary)] transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold mb-2 group-hover:text-[var(--secondary)] transition-colors">{job.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
                      <span>{job.department}</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-[var(--muted)] group-hover:text-[var(--secondary)] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[var(--secondary)]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Don't see a fit?</h2>
          <p className="text-white/80 mb-8">
            We're always looking for talented people. Send us your resume!
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--secondary)] rounded-full font-medium hover:bg-white/90 transition-colors"
          >
            Get in Touch
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
