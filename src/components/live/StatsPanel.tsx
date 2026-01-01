'use client'

import { useState } from 'react'
import { TrendingUp, Users, Eye, DollarSign, ShoppingCart, ShoppingBag } from 'lucide-react'

interface StatsData {
  currentViewers: number
  peakViewers: number
  totalViews: number
  revenue: number
  viewerHistory: number[]
  cartHistory?: number[]
  purchaseHistory?: number[]
}

interface StatsPanelProps {
  stats: StatsData
}

export function StatsPanel({ stats }: StatsPanelProps) {
  const [activeTab, setActiveTab] = useState<'viewers' | 'revenue'>('viewers')

  const tabs = [
    { id: 'viewers' as const, label: 'Viewers', icon: Users },
    { id: 'revenue' as const, label: 'Revenue', icon: DollarSign },
  ]

  // SVG polyline points generator
  const generatePolylinePoints = (data: number[], height: number = 50): string => {
    if (data.length === 0) return ''
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    return data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * 100
        const y = height - ((value - min) / range) * (height * 0.8)
        return `${x},${y}`
      })
      .join(' ')
  }

  return (
    <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)]">
      {/* Header with tabs */}
      <div className="flex border-b border-[var(--border-color)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-[var(--secondary)] border-b-2 border-[var(--secondary)]'
                : 'text-[var(--muted)] hover:text-[var(--foreground)]'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Stats cards */}
      <div className="p-4 grid grid-cols-2 gap-3">
        {activeTab === 'viewers' ? (
          <>
            <div className="p-3 bg-[var(--background)] rounded-lg">
              <div className="flex items-center gap-2 text-[var(--muted)] mb-1">
                <Eye size={14} />
                <span className="text-xs">Current</span>
              </div>
              <p className="text-xl font-bold text-[var(--foreground)]">
                {stats.currentViewers.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-[var(--background)] rounded-lg">
              <div className="flex items-center gap-2 text-[var(--muted)] mb-1">
                <TrendingUp size={14} />
                <span className="text-xs">Peak</span>
              </div>
              <p className="text-xl font-bold text-[var(--foreground)]">
                {stats.peakViewers.toLocaleString()}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="p-3 bg-[var(--background)] rounded-lg">
              <div className="flex items-center gap-2 text-[var(--muted)] mb-1">
                <DollarSign size={14} />
                <span className="text-xs">Total Revenue</span>
              </div>
              <p className="text-xl font-bold text-[var(--foreground)]">
                ${(stats.revenue / 100).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-[var(--background)] rounded-lg">
              <div className="flex items-center gap-2 text-[var(--muted)] mb-1">
                <Eye size={14} />
                <span className="text-xs">Total Views</span>
              </div>
              <p className="text-xl font-bold text-[var(--foreground)]">
                {stats.totalViews.toLocaleString()}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Chart */}
      <div className="px-4 pb-4">
        <div className="h-32 bg-[var(--background)] rounded-lg p-3">
          <svg className="w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="30" x2="100" y2="30" stroke="var(--border-color)" strokeWidth="0.3" />

            {/* Viewer area fill */}
            <polygon
              points={`0,60 ${generatePolylinePoints(stats.viewerHistory, 60)} 100,60`}
              fill="var(--secondary)"
              fillOpacity="0.1"
            />

            {/* Viewer line */}
            <polyline
              points={generatePolylinePoints(stats.viewerHistory, 60)}
              fill="none"
              stroke="var(--secondary)"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Cart line */}
            {stats.cartHistory && (
              <polyline
                points={generatePolylinePoints(stats.cartHistory, 60)}
                fill="none"
                stroke="var(--warning)"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Purchase line */}
            {stats.purchaseHistory && (
              <polyline
                points={generatePolylinePoints(stats.purchaseHistory, 60)}
                fill="none"
                stroke="var(--success)"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </div>
        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-[var(--secondary)] rounded" />
            <span className="text-[10px] text-[var(--muted)]">Viewers</span>
          </div>
          {stats.cartHistory && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-[var(--warning)] rounded" />
              <span className="text-[10px] text-[var(--muted)]">Cart</span>
            </div>
          )}
          {stats.purchaseHistory && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-[var(--success)] rounded" />
              <span className="text-[10px] text-[var(--muted)]">Purchases</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
