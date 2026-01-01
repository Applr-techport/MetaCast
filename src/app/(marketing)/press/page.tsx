'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Download, Mail, ArrowRight, FileText } from 'lucide-react'
import { LandingHeader, Footer } from '@/components/landing'

export default function PressPage() {
  const pressReleases = [
    {
      date: 'January 2, 2026',
      title: 'MetaCast Launches AI Video Clip Generator',
      description: 'New feature automatically creates short-form content from live streams.',
    },
    {
      date: 'December 1, 2025',
      title: 'MetaCast Raises $15M Series A',
      description: 'Funding to accelerate AI-powered streaming tools development.',
    },
    {
      date: 'November 15, 2025',
      title: 'MetaCast Officially Launches',
      description: 'AI-powered multi-platform streaming platform now available to creators worldwide.',
    },
  ]

  const mediaKit = [
    { name: 'Logo Pack (SVG, PNG)', size: '2.4 MB' },
    { name: 'Brand Guidelines', size: '5.1 MB' },
    { name: 'Product Screenshots', size: '12.3 MB' },
    { name: 'Executive Headshots', size: '8.7 MB' },
  ]

  return (
    <main className="min-h-screen bg-white">
      <LandingHeader />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Press & Media</h1>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Resources for journalists and media professionals covering MetaCast.
          </p>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-16 px-6 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Quick Facts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[var(--border-color)]">
              <h3 className="font-semibold mb-4">About MetaCast</h3>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li>Founded: 2024</li>
                <li>Headquarters: San Francisco, CA</li>
                <li>Employees: 50+</li>
                <li>Active Users: 10,000+</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[var(--border-color)]">
              <h3 className="font-semibold mb-4">Leadership</h3>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li>Alex Kim - CEO & Co-founder</li>
                <li>Sarah Chen - CTO & Co-founder</li>
                <li>David Park - Head of Product</li>
                <li>Emily Wong - Head of Engineering</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Press Releases</h2>
          <div className="space-y-4">
            {pressReleases.map((release) => (
              <div
                key={release.title}
                className="p-6 rounded-xl border border-[var(--border-color)] hover:border-[var(--secondary)] transition-colors cursor-pointer group"
              >
                <p className="text-sm text-[var(--muted)] mb-2">{release.date}</p>
                <h3 className="font-semibold mb-2 group-hover:text-[var(--secondary)] transition-colors">{release.title}</h3>
                <p className="text-sm text-[var(--muted)]">{release.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-16 px-6 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Media Kit</h2>
          <div className="bg-white rounded-xl border border-[var(--border-color)] divide-y divide-[var(--border-color)]">
            {mediaKit.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-4 hover:bg-[var(--background)] transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-[var(--muted)]" />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[var(--muted)]">{item.size}</span>
                  <Download size={18} className="text-[var(--secondary)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-[var(--secondary)]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail size={32} className="text-[var(--secondary)]" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Media Inquiries</h2>
          <p className="text-[var(--muted)] mb-8">
            For press inquiries, please contact our communications team.
          </p>
          <a
            href="mailto:press@metacast.io"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--secondary)] text-white rounded-full font-medium hover:bg-[#7c4fe0] transition-colors"
          >
            press@metacast.io
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
