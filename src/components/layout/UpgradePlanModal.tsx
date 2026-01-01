'use client'

import { useState } from 'react'
import { X, Check, Sparkles, Zap, Crown } from 'lucide-react'

interface Plan {
  id: string
  name: string
  price: { monthly: number; annual: number }
  period: string
  description: string
  features: string[]
  icon: React.ComponentType<{ size?: number; className?: string }>
  popular?: boolean
  current?: boolean
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    period: 'Free forever',
    description: 'For individuals getting started',
    icon: Sparkles,
    features: [
      '5 short-form videos/month',
      '1 connected channel',
      '1GB storage',
      'Basic templates',
      'Community support',
    ],
  },
  {
    id: 'basic',
    name: 'Basic',
    price: { monthly: 12, annual: 10 },
    period: 'per month',
    description: 'For content creators',
    icon: Zap,
    popular: true,
    features: [
      '30 short-form videos/month',
      '3 connected channels',
      '10GB storage',
      'All templates',
      '10 hours live streaming/month',
      'Email support',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: { monthly: 25, annual: 20 },
    period: 'per month',
    description: 'For growing teams',
    icon: Crown,
    current: true,
    features: [
      '100 short-form videos/month',
      '10 connected channels',
      '50GB storage',
      'Custom templates',
      '50 hours live streaming/month',
      'Priority support',
      'Analytics dashboard',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: { monthly: 52, annual: 42 },
    period: 'per month',
    description: 'For agencies & enterprises',
    icon: Crown,
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
  },
]

interface UpgradePlanModalProps {
  isOpen: boolean
  onClose: () => void
}

export function UpgradePlanModal({ isOpen, onClose }: UpgradePlanModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>('standard')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  if (!isOpen) return null

  const getPrice = (plan: Plan) => {
    if (plan.price.monthly === 0) return 'Free'
    const price = billingCycle === 'yearly' ? plan.price.annual : plan.price.monthly
    return `$${price}`
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[var(--card-bg)] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
          <div>
            <h2 className="text-xl font-bold">Choose Your Plan</h2>
            <p className="text-sm text-[var(--muted)] mt-1">
              Select the plan that best fits your needs
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 py-6">
          <span className={`text-sm ${billingCycle === 'monthly' ? 'text-[var(--foreground)]' : 'text-[var(--muted)]'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className={`relative w-14 h-7 rounded-full transition-colors ${
              billingCycle === 'yearly' ? 'bg-[var(--secondary)]' : 'bg-[var(--border-color)]'
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm ${billingCycle === 'yearly' ? 'text-[var(--foreground)]' : 'text-[var(--muted)]'}`}>
            Yearly
            <span className="ml-1 px-2 py-0.5 bg-[var(--secondary)]/10 text-[var(--secondary)] text-xs rounded-full">
              Save 20%
            </span>
          </span>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-4 gap-4 px-6 pb-6">
          {plans.map((plan) => {
            const Icon = plan.icon
            const isSelected = selectedPlan === plan.id

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative rounded-xl border-2 p-5 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                    : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--secondary)] text-white text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                )}

                {plan.current && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 bg-[var(--success)]/10 text-[var(--success)] text-xs rounded-full">
                    Current
                  </span>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-[var(--secondary)]' : 'bg-[var(--background)]'
                  }`}>
                    <Icon size={20} className={isSelected ? 'text-white' : 'text-[var(--muted)]'} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{plan.name}</h3>
                    <p className="text-xs text-[var(--muted)]">{plan.description}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-bold">{getPrice(plan)}</span>
                  {(plan.price.monthly > 0 || plan.price.annual > 0) && (
                    <span className="text-sm text-[var(--muted)] ml-1">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                  )}
                </div>

                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check size={16} className="text-[var(--success)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--muted)]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-[var(--border-color)] bg-[var(--background)]">
          <p className="text-sm text-[var(--muted)]">
            Cancel anytime. No hidden fees.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-[var(--border-color)] rounded-lg text-sm font-medium hover:bg-[var(--card-bg)] transition-colors"
            >
              Cancel
            </button>
            <button
              className="px-6 py-2.5 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[#7c4fe0] transition-colors"
            >
              {selectedPlan === 'standard' ? 'Current Plan' : 'Upgrade Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
