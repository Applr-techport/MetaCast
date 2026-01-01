'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Clock,
  ArrowUp,
  ArrowDown,
  Calendar,
  Download,
  Filter,
} from 'lucide-react'

// Analytics Header Actions
function AnalyticsHeaderActions() {
  return (
    <div className="flex items-center gap-3">
      {/* Date Range Selector */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--background)] rounded-lg border border-[var(--border-color)]">
        <Calendar size={14} className="text-[var(--muted)]" />
        <span className="text-sm text-[var(--foreground)]">Last 30 days</span>
      </div>
      {/* Export Button */}
      <button className="flex items-center gap-2 px-4 py-2 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg text-sm font-medium transition-colors">
        <Download size={18} />
        <span>Export</span>
      </button>
    </div>
  )
}

// Simple Bar Chart Component
function SimpleBarChart({ data }: { data: { label: string; value: number; color?: string }[] }) {
  const max = Math.max(...data.map((d) => d.value))

  return (
    <div className="flex items-end gap-2 h-40">
      {data.map((item, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2">
          <div
            className="w-full rounded-t-lg transition-all hover:opacity-80"
            style={{
              height: `${(item.value / max) * 100}%`,
              backgroundColor: item.color || 'var(--secondary)',
              minHeight: '4px',
            }}
          />
          <span className="text-xs text-[var(--muted)]">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

// Simple Line Chart Component (visual representation)
function SimpleLineChart() {
  const points = [30, 45, 35, 55, 48, 62, 58, 75, 68, 85, 78, 92]
  const width = 100
  const height = 100

  const getX = (i: number) => (i / (points.length - 1)) * width
  const getY = (p: number) => height - (p / 100) * height

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)},${getY(p)}`).join(' ')
  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`

  return (
    <div className="relative h-40 w-full">
      {/* Y-axis lines */}
      {[0, 25, 50, 75, 100].map((val) => (
        <div
          key={val}
          className="absolute w-full border-t border-[var(--border-color)]"
          style={{ bottom: `${val}%` }}
        >
          <span className="absolute -left-8 -top-2 text-xs text-[var(--muted)]">
            {val === 0 ? '0' : `${val}k`}
          </span>
        </div>
      ))}
      {/* Line visualization using SVG */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Area fill */}
        <path d={areaPath} fill="url(#lineGradient)" />
        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* Points overlay */}
      <div className="absolute inset-0 flex justify-between items-end px-0">
        {points.map((p, i) => (
          <div
            key={i}
            className="relative"
            style={{ height: `${p}%` }}
          >
            <div
              className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full bg-white border-2 border-[#8b5cf6]"
            />
          </div>
        ))}
      </div>
      {/* X-axis labels */}
      <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-[var(--muted)]">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
          (month) => (
            <span key={month}>{month}</span>
          )
        )}
      </div>
    </div>
  )
}

// Donut Chart Component
function DonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let cumulativePercent = 0

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          {data.map((item, i) => {
            const percent = (item.value / total) * 100
            const offset = cumulativePercent
            cumulativePercent += percent
            return (
              <circle
                key={i}
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke={item.color}
                strokeWidth="4"
                strokeDasharray={`${percent} ${100 - percent}`}
                strokeDashoffset={-offset}
              />
            )
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl font-bold">{total.toLocaleString()}</p>
            <p className="text-xs text-[var(--muted)]">Total</p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-[var(--muted)]">{item.label}</span>
            <span className="text-sm font-medium">{item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d')

  const stats = [
    {
      label: 'Total Views',
      value: '124.5K',
      change: 12.5,
      icon: Eye,
      trend: 'up',
    },
    {
      label: 'Watch Time',
      value: '8,234h',
      change: 8.2,
      icon: Clock,
      trend: 'up',
    },
    {
      label: 'Subscribers',
      value: '2,845',
      change: 15.3,
      icon: Users,
      trend: 'up',
    },
    {
      label: 'Engagement Rate',
      value: '4.2%',
      change: -2.1,
      icon: TrendingUp,
      trend: 'down',
    },
  ]

  const weeklyData = [
    { label: 'Mon', value: 1200 },
    { label: 'Tue', value: 1900 },
    { label: 'Wed', value: 1500 },
    { label: 'Thu', value: 2200 },
    { label: 'Fri', value: 2800 },
    { label: 'Sat', value: 3200 },
    { label: 'Sun', value: 2600 },
  ]

  const platformData = [
    { label: 'YouTube', value: 45000, color: '#FF0000' },
    { label: 'Facebook', value: 28000, color: '#1877F2' },
    { label: 'TikTok', value: 35000, color: '#000000' },
    { label: 'Instagram', value: 16500, color: '#E4405F' },
  ]

  const topContent = [
    { title: 'Product Launch Live', views: '45.2K', engagement: '6.8%', platform: 'YouTube' },
    { title: 'Weekly Q&A Session', views: '32.1K', engagement: '5.2%', platform: 'Facebook' },
    { title: 'Behind the Scenes', views: '28.5K', engagement: '7.1%', platform: 'TikTok' },
    { title: 'Tutorial Series Ep.1', views: '18.7K', engagement: '4.9%', platform: 'YouTube' },
  ]

  return (
    <div className="min-h-screen">
      <Header actions={<AnalyticsHeaderActions />} />

      <div className="p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BarChart3 size={28} className="text-[var(--secondary)]" />
            <div>
              <h1 className="text-2xl font-bold">Analytics</h1>
              <p className="text-sm text-[var(--muted)]">Track your content performance</p>
            </div>
          </div>

          {/* Time Range Filter */}
          <div className="flex gap-2">
            {[
              { id: '7d', label: '7 Days' },
              { id: '30d', label: '30 Days' },
              { id: '90d', label: '90 Days' },
              { id: 'year', label: 'Year' },
            ].map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range.id
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--background)] hover:bg-[var(--border-color)]'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-5 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
                  <stat.icon size={20} className="text-[var(--secondary)]" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === 'up' ? 'text-[var(--success)]' : 'text-[var(--accent)]'
                  }`}
                >
                  {stat.trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  {Math.abs(stat.change)}%
                </div>
              </div>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-[var(--muted)]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Main Chart */}
          <div className="col-span-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Views Over Time</h2>
              <select className="px-3 py-1.5 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm">
                <option>Views</option>
                <option>Watch Time</option>
                <option>Engagement</option>
              </select>
            </div>
            <div className="pl-8 pr-4">
              <SimpleLineChart />
            </div>
          </div>

          {/* Platform Distribution */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-6">Views by Platform</h2>
            <DonutChart data={platformData} />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Weekly Performance */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-6">Weekly Performance</h2>
            <SimpleBarChart data={weeklyData} />
          </div>

          {/* Top Content */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Top Performing Content</h2>
              <button className="text-sm text-[var(--secondary)] hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {topContent.map((content, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-[var(--background)] rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-[var(--secondary)]/10 rounded flex items-center justify-center text-sm font-medium text-[var(--secondary)]">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{content.title}</p>
                      <p className="text-xs text-[var(--muted)]">{content.platform}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{content.views}</p>
                    <p className="text-xs text-[var(--success)]">{content.engagement} engagement</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
