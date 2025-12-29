'use client'

import { Shield, Clock, Lock, Award } from 'lucide-react'

export function TrustSection() {
  const badges = [
    {
      icon: Shield,
      title: '99.9% Uptime',
      description: 'Enterprise-grade reliability with automatic failover',
    },
    {
      icon: Lock,
      title: 'SOC 2 Ready',
      description: 'Bank-level security for your data and credentials',
    },
    {
      icon: Clock,
      title: 'Auto Recovery',
      description: 'Automatic reconnection if connection drops',
    },
    {
      icon: Award,
      title: 'GDPR Compliant',
      description: 'Your data privacy is our priority',
    },
  ]

  return (
    <section className="py-16 px-6 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
          <p className="text-sm text-[var(--muted)]">
            Built for professional creators who demand stability
          </p>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="p-4 bg-white rounded-xl border border-[var(--border-color)] text-center"
            >
              <div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <badge.icon size={20} className="text-[var(--secondary)]" />
              </div>
              <h4 className="font-semibold text-sm mb-1">{badge.title}</h4>
              <p className="text-xs text-[var(--muted)]">{badge.description}</p>
            </div>
          ))}
        </div>

        {/* OAuth Note */}
        <p className="text-center text-xs text-[var(--muted)] mt-8">
          We use OAuth 2.0 for all platform connections — we never store your passwords.
        </p>
      </div>
    </section>
  )
}
