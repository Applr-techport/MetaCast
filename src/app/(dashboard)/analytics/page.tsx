'use client'

import { Header } from '@/components/layout/Header'
import { BarChart3, TrendingUp, Users, Eye, Clock } from 'lucide-react'

export default function AnalyticsPage() {
  const stats = [
    { label: 'Total Views', value: '124.5K', change: '+12.5%', icon: Eye },
    { label: 'Watch Time', value: '8,234h', change: '+8.2%', icon: Clock },
    { label: 'Subscribers', value: '2,845', change: '+15.3%', icon: Users },
    { label: 'Engagement Rate', value: '4.2%', change: '+2.1%', icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 size={28} className="text-[var(--secondary)]" />
          <h1 className="text-2xl font-bold">Analytics</h1>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map(stat => (
            <div key={stat.label} className="p-4 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <stat.icon size={20} className="text-[var(--muted)]" />
                <span className="text-xs text-[var(--success)]">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-[var(--muted)]">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Performance Overview</h2>
          <div className="h-64 flex items-center justify-center text-[var(--muted)]">
            Chart placeholder - integrate with chart library
          </div>
        </div>
      </div>
    </div>
  )
}
