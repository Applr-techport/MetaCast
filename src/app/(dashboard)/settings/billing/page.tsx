'use client'

import { Header } from '@/components/layout/Header'

export default function BillingPage() {
  const invoices = [
    { id: 'INV-001', date: 'Dec 15, 2025', amount: '$29.00', status: 'Paid' },
    { id: 'INV-002', date: 'Nov 15, 2025', amount: '$29.00', status: 'Paid' },
    { id: 'INV-003', date: 'Oct 15, 2025', amount: '$29.00', status: 'Paid' },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-6">
        <div className="max-w-2xl">
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Billing & Plans</h2>

              {/* Current Plan */}
              <div className="p-5 bg-[var(--secondary)]/5 border border-[var(--secondary)]/20 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[var(--secondary)] text-white text-xs font-medium rounded">PRO</span>
                      <span className="text-lg font-semibold">Pro Plan</span>
                    </div>
                    <p className="text-sm text-[var(--muted)] mt-1">$29/month - Billed monthly</p>
                  </div>
                  <button className="px-3 py-1.5 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[#7c4fe0] transition-colors">
                    Upgrade Plan
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[var(--secondary)]/20">
                  <div>
                    <p className="text-xs text-[var(--muted)]">Next billing</p>
                    <p className="text-sm font-medium">Jan 15, 2026</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted)]">AI Credits</p>
                    <p className="text-sm font-medium">68 / 100 remaining</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted)]">Storage</p>
                    <p className="text-sm font-medium">32.5 GB / 50 GB</p>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-sm font-medium mb-3">Payment Method</h3>
                <div className="flex items-center justify-between p-4 bg-[var(--background)] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-[var(--primary)] rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Visa ending in 4242</p>
                      <p className="text-xs text-[var(--muted)]">Expires 12/2026</p>
                    </div>
                  </div>
                  <button className="text-sm text-[var(--secondary)] hover:underline">Update</button>
                </div>
              </div>

              {/* Billing History */}
              <div>
                <h3 className="text-sm font-medium mb-3">Billing History</h3>
                <div className="bg-[var(--background)] rounded-lg overflow-hidden">
                  {invoices.map((invoice, i) => (
                    <div key={invoice.id} className={`flex items-center justify-between p-4 ${i !== invoices.length - 1 ? 'border-b border-[var(--border-color)]' : ''}`}>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">{invoice.id}</span>
                        <span className="text-sm text-[var(--muted)]">{invoice.date}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">{invoice.amount}</span>
                        <span className="px-2 py-0.5 bg-[var(--success)]/10 text-[var(--success)] text-xs rounded-full">{invoice.status}</span>
                        <button className="text-sm text-[var(--secondary)] hover:underline">Download</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cancel Subscription */}
              <div className="pt-4 border-t border-[var(--border-color)]">
                <button className="text-sm text-[var(--accent)] hover:underline">Cancel Subscription</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
