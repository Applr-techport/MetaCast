'use client'

import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

export function CTASection() {
  const benefits = [
    '14-day free trial',
    'AI learns your brand in 48hrs',
    'You approve everything',
    'Cancel anytime',
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-gradient-to-br from-[var(--secondary)] to-[#6d28d9] rounded-3xl overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative px-8 py-16 md:px-16 md:py-20">
            <div className="max-w-3xl mx-auto text-center">
              {/* Headline */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-heading">
                AI that learns. You that controls.
              </h2>

              {/* Sub headline */}
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Join 10,000+ creators using AI that adapts to their brand - not the other way around.
              </p>

              {/* Benefits */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2 text-white/90"
                  >
                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/signup"
                  className="flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-[var(--secondary)] rounded-xl font-medium transition-colors"
                >
                  Start Free Trial
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/pricing"
                  className="flex items-center gap-2 px-8 py-4 border border-white/30 hover:bg-white/10 text-white rounded-xl font-medium transition-colors"
                >
                  View Pricing
                </Link>
              </div>

              {/* Trust indicator */}
              <p className="text-white/60 text-sm mt-8">
                Setup takes less than 5 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
