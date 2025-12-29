'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { LandingHeader, Footer } from '@/components/landing'

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: 'Free',
      description: 'For individuals getting started',
      price: { monthly: 0, annual: 0 },
      features: [
        '5 short-form videos/month',
        '1 connected channel',
        '1GB storage',
        'Basic templates',
        'Community support',
      ],
      cta: 'Get Started',
      highlight: false,
    },
    {
      name: 'Basic',
      description: 'For content creators',
      price: { monthly: 12, annual: 10 },
      features: [
        '30 short-form videos/month',
        '3 connected channels',
        '10GB storage',
        'All templates',
        '10 hours live streaming/month',
        'Email support',
      ],
      cta: 'Start Free Trial',
      highlight: false,
      badge: 'Popular',
    },
    {
      name: 'Standard',
      description: 'For growing teams',
      price: { monthly: 25, annual: 20 },
      features: [
        '100 short-form videos/month',
        '10 connected channels',
        '50GB storage',
        'Custom templates',
        '50 hours live streaming/month',
        'Priority support',
        'Analytics dashboard',
      ],
      cta: 'Start Free Trial',
      highlight: true,
    },
    {
      name: 'Professional',
      description: 'For agencies & enterprises',
      price: { monthly: 52, annual: 42 },
      features: [
        'Unlimited videos',
        'Unlimited channels',
        '200GB storage',
        'White-label options',
        'Unlimited live streaming',
        'Dedicated support',
        'Advanced analytics',
        'API access',
        'Team collaboration',
      ],
      cta: 'Start Free Trial',
      highlight: false,
      badge: 'Best Value',
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <LandingHeader />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include a 14-day free trial.
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-sm ${!isAnnual ? 'font-medium' : 'text-[var(--muted)]'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  isAnnual ? 'bg-[var(--secondary)]' : 'bg-gray-200'
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    isAnnual ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${isAnnual ? 'font-medium' : 'text-[var(--muted)]'}`}>
                Annual
                <span className="ml-1 text-xs text-[var(--secondary)]">Save 20%</span>
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-6 rounded-2xl border ${
                  plan.highlight
                    ? 'border-[var(--secondary)] shadow-lg scale-105'
                    : 'border-[var(--border-color)]'
                } bg-white`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--secondary)] text-white text-xs font-medium rounded-full">
                    {plan.badge}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-[var(--muted)]">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    ${isAnnual ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className="text-[var(--muted)]">/month</span>
                  {isAnnual && plan.price.monthly > 0 && (
                    <p className="text-xs text-[var(--muted)] mt-1">
                      Billed annually (${plan.price.annual * 12}/year)
                    </p>
                  )}
                </div>

                <Link
                  href="/signup"
                  className={`block w-full py-3 rounded-xl text-center font-medium transition-colors ${
                    plan.highlight
                      ? 'bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white'
                      : 'border border-[var(--border-color)] hover:border-[var(--secondary)] hover:text-[var(--secondary)]'
                  }`}
                >
                  {plan.cta}
                </Link>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check size={16} className="text-[var(--success)] mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* FAQ Link */}
          <div className="text-center mt-16">
            <p className="text-[var(--muted)]">
              Have questions?{' '}
              <Link href="/#faq" className="text-[var(--secondary)] hover:underline">
                Check our FAQ
              </Link>
              {' '}or{' '}
              <a href="mailto:support@xcaster.io" className="text-[var(--secondary)] hover:underline">
                contact us
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
