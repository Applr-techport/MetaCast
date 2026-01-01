'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Users, Globe, Zap, Award, ArrowRight } from 'lucide-react'
import { LandingHeader, Footer } from '@/components/landing'

export default function AboutPage() {
  const stats = [
    { label: 'Active Users', value: '10,000+' },
    { label: 'Countries', value: '50+' },
    { label: 'Streams Delivered', value: '1M+' },
    { label: 'Uptime', value: '99.9%' },
  ]

  const values = [
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'We push the boundaries of what\'s possible with AI and streaming technology.',
    },
    {
      icon: Users,
      title: 'Creator-Centric',
      description: 'Every feature we build starts with understanding creator needs.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Enabling creators to connect with audiences worldwide, seamlessly.',
    },
    {
      icon: Award,
      title: 'Quality Obsessed',
      description: 'We never compromise on stream quality and platform reliability.',
    },
  ]

  const team = [
    { name: 'Alex Kim', role: 'CEO & Co-founder', image: '/team/alex.jpg' },
    { name: 'Sarah Chen', role: 'CTO & Co-founder', image: '/team/sarah.jpg' },
    { name: 'David Park', role: 'Head of Product', image: '/team/david.jpg' },
    { name: 'Emily Wong', role: 'Head of Engineering', image: '/team/emily.jpg' },
  ]

  return (
    <main className="min-h-screen bg-white">
      <LandingHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Empowering Creators with
            <span className="text-[var(--secondary)]"> AI-Powered</span> Streaming
          </h1>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            MetaCast is building the future of content creation. We believe every creator deserves professional-grade tools to share their story with the world.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-[var(--secondary)]">{stat.value}</p>
                <p className="text-sm text-[var(--muted)] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
          <div className="prose prose-lg mx-auto text-[var(--muted)]">
            <p className="mb-6">
              MetaCast was born in 2024 from a simple observation: content creators spend too much time on technical complexities instead of what they do best - creating.
            </p>
            <p className="mb-6">
              Our founders, experienced in both streaming technology and AI, saw an opportunity to bridge this gap. They envisioned a platform where AI handles the heavy lifting - from multi-platform distribution to content optimization - while creators focus on their craft.
            </p>
            <p>
              Today, MetaCast powers thousands of creators and businesses worldwide, from solo YouTubers to enterprise media companies. We're just getting started.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="text-center">
                  <div className="w-14 h-14 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-[var(--secondary)]" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-[var(--muted)]">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Leadership Team</h2>
          <p className="text-[var(--muted)] text-center mb-12 max-w-2xl mx-auto">
            Our team brings together expertise from leading tech companies in streaming, AI, and creator tools.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-32 h-32 bg-[var(--border-color)] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users size={40} className="text-[var(--muted)]" />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-[var(--muted)]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[var(--secondary)]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-white/80 mb-8">
            We're always looking for talented people who share our passion for empowering creators.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/careers"
              className="flex items-center gap-2 px-6 py-3 bg-white text-[var(--secondary)] rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              View Open Positions
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
