'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { User, Shield, CreditCard, Zap, Palette } from 'lucide-react'

const TABS = [
  { id: 'profile', label: 'Profile', icon: User, href: '/settings/profile' },
  { id: 'security', label: 'Security', icon: Shield, href: '/settings/security' },
  { id: 'billing', label: 'Billing', icon: CreditCard, href: '/settings/billing' },
  { id: 'ai-usage', label: 'AI Usage', icon: Zap, href: '/settings/ai-usage' },
  { id: 'appearance', label: 'Appearance', icon: Palette, href: '/settings/appearance' },
]

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const activeTab = TABS.find(tab => pathname === tab.href)?.id || 'profile'

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <div className="flex gap-6">
          {/* Left Tab Menu */}
          <div className="w-48 flex-shrink-0">
            <nav className="space-y-1">
              {TABS.map(tab => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <Link
                    key={tab.id}
                    href={tab.href}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-[var(--primary)] text-white'
                        : 'hover:bg-[var(--background)] text-[var(--foreground)]'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-white' : 'text-[var(--muted)]'} />
                    {tab.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Right Content */}
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
