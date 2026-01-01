'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  Calendar,
  Download,
  Radio,
  Package,
  Zap,
  ArrowUp,
  ArrowDown,
  ChevronDown,
} from 'lucide-react'

// Date Range Options
const dateRangeOptions = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: 'year', label: 'This Year' },
  { value: 'custom', label: 'Custom Range' },
]

// Analytics Header Actions
function AnalyticsHeaderActions({
  dateRange,
  setDateRange,
  onExport,
}: {
  dateRange: string
  setDateRange: (range: string) => void
  onExport: () => void
}) {
  const [showDatePicker, setShowDatePicker] = useState(false)

  const selectedLabel = dateRangeOptions.find((o) => o.value === dateRange)?.label || 'Last 30 days'

  return (
    <div className="flex items-center gap-3">
      {/* Date Range Selector */}
      <div className="relative">
        <button
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[var(--background)] rounded-lg border border-[var(--border-color)] hover:border-[var(--secondary)] transition-colors"
        >
          <Calendar size={14} className="text-[var(--muted)]" />
          <span className="text-sm text-[var(--foreground)]">{selectedLabel}</span>
          <ChevronDown size={14} className="text-[var(--muted)]" />
        </button>
        {showDatePicker && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowDatePicker(false)} />
            <div className="absolute right-0 top-full mt-1 w-48 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-xl z-50 py-1">
              {dateRangeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setDateRange(option.value)
                    setShowDatePicker(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-[var(--background)] transition-colors ${
                    dateRange === option.value ? 'text-[var(--secondary)] font-medium' : ''
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      {/* Export Button */}
      <button
        onClick={onExport}
        className="flex items-center gap-2 px-4 py-2 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg text-sm font-medium transition-colors"
      >
        <Download size={18} />
        <span>Export</span>
      </button>
    </div>
  )
}

// Revenue Line Chart
function RevenueChart() {
  const data = [
    { month: 'Jan', revenue: 12400000 },
    { month: 'Feb', revenue: 18200000 },
    { month: 'Mar', revenue: 15600000 },
    { month: 'Apr', revenue: 22100000 },
    { month: 'May', revenue: 19800000 },
    { month: 'Jun', revenue: 28500000 },
    { month: 'Jul', revenue: 24300000 },
    { month: 'Aug', revenue: 31200000 },
    { month: 'Sep', revenue: 27800000 },
    { month: 'Oct', revenue: 35400000 },
    { month: 'Nov', revenue: 32100000 },
    { month: 'Dec', revenue: 41200000 },
  ]

  const max = Math.max(...data.map((d) => d.revenue))
  const width = 100
  const height = 100

  const getX = (i: number) => (i / (data.length - 1)) * width
  const getY = (val: number) => height - (val / max) * height

  const linePath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)},${getY(d.revenue)}`)
    .join(' ')
  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-[var(--muted)]">Monthly revenue trend from all product streams</p>
        <select className="px-3 py-1.5 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm">
          <option>Revenue</option>
          <option>Orders</option>
          <option>Viewers</option>
        </select>
      </div>
      <div className="flex items-center gap-3 mb-6">
        <p className="text-2xl font-bold">W 308.8M</p>
        <p className="text-xs text-[var(--success)]">+23.5% vs last period</p>
      </div>
      <div className="relative h-48 w-full">
        {/* Y-axis lines */}
        {[0, 25, 50, 75, 100].map((val) => (
          <div
            key={val}
            className="absolute w-full border-t border-[var(--border-color)]"
            style={{ bottom: `${val}%` }}
          >
            <span className="absolute -left-12 -top-2 text-xs text-[var(--muted)]">
              {val === 0 ? '0' : `${Math.round((max * val) / 100 / 1000000)}M`}
            </span>
          </div>
        ))}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#revenueGradient)" />
          <path
            d={linePath}
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {/* X-axis labels */}
        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-[var(--muted)]">
          {data.map((d) => (
            <span key={d.month}>{d.month}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// Platform Performance (보라색 통일)
function PlatformPerformance() {
  const platforms = [
    { name: 'YouTube', revenue: 145200000, viewers: 45000, orders: 1234, conversion: 2.7 },
    { name: 'Facebook', revenue: 82100000, viewers: 28000, orders: 892, conversion: 3.2 },
    { name: 'TikTok', revenue: 58400000, viewers: 35000, orders: 567, conversion: 1.6 },
    { name: 'Instagram', revenue: 23100000, viewers: 16500, orders: 234, conversion: 1.4 },
  ]

  const maxRevenue = Math.max(...platforms.map((p) => p.revenue))

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
      <p className="text-xs text-[var(--muted)] mb-4">Revenue by connected channel from Channels</p>
      <div className="space-y-4">
        {platforms.map((platform, i) => (
          <div key={platform.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-[var(--secondary)]/10 rounded flex items-center justify-center text-xs font-medium text-[var(--secondary)]">
                  {i + 1}
                </span>
                <span className="text-sm font-medium">{platform.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">W {(platform.revenue / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-[var(--muted)]">{platform.conversion}% CVR</p>
              </div>
            </div>
            <div className="h-2 bg-[var(--background)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--secondary)] rounded-full"
                style={{ width: `${(platform.revenue / maxRevenue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Broadcast Performance (Schedule 연동)
function BroadcastPerformance() {
  const broadcasts = [
    {
      id: '1',
      title: 'Product Launch Live',
      date: 'Dec 28',
      viewers: 12400,
      peakViewers: 18200,
      revenue: 45200000,
      orders: 234,
      isProduct: true,
    },
    {
      id: '2',
      title: 'Weekly Q&A Session',
      date: 'Dec 26',
      viewers: 8900,
      peakViewers: 12100,
      revenue: 28100000,
      orders: 156,
      isProduct: true,
    },
    {
      id: '3',
      title: 'Behind the Scenes',
      date: 'Dec 24',
      viewers: 6700,
      peakViewers: 9400,
      revenue: 0,
      orders: 0,
      isProduct: false,
    },
    {
      id: '4',
      title: 'Holiday Special Sale',
      date: 'Dec 22',
      viewers: 15600,
      peakViewers: 22300,
      revenue: 82400000,
      orders: 412,
      isProduct: true,
    },
    {
      id: '5',
      title: 'New Arrivals Showcase',
      date: 'Dec 20',
      viewers: 9200,
      peakViewers: 13800,
      revenue: 31500000,
      orders: 178,
      isProduct: true,
    },
  ]

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
        <p className="text-xs text-[var(--muted)]">Performance of scheduled streams from Schedule</p>
        <button className="text-sm text-[var(--secondary)] hover:underline">View All</button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-[var(--border-color)]">
            <th className="text-left px-4 py-3 text-xs font-medium text-[var(--muted)]">Broadcast</th>
            <th className="text-right px-4 py-3 text-xs font-medium text-[var(--muted)]">Viewers</th>
            <th className="text-right px-4 py-3 text-xs font-medium text-[var(--muted)]">Peak</th>
            <th className="text-right px-4 py-3 text-xs font-medium text-[var(--muted)]">Orders</th>
            <th className="text-right px-4 py-3 text-xs font-medium text-[var(--muted)]">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {broadcasts.map((broadcast) => (
            <tr
              key={broadcast.id}
              className="border-b border-[var(--border-color)] last:border-b-0 hover:bg-[var(--background)] transition-colors"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
                    {broadcast.isProduct ? (
                      <Package size={14} className="text-[var(--secondary)]" />
                    ) : (
                      <Radio size={14} className="text-[var(--secondary)]" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{broadcast.title}</p>
                    <p className="text-xs text-[var(--muted)]">{broadcast.date}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-right text-sm">{broadcast.viewers.toLocaleString()}</td>
              <td className="px-4 py-3 text-right text-sm">{broadcast.peakViewers.toLocaleString()}</td>
              <td className="px-4 py-3 text-right text-sm">{broadcast.orders.toLocaleString()}</td>
              <td className="px-4 py-3 text-right text-sm font-medium">
                {broadcast.revenue > 0 ? `W ${(broadcast.revenue / 1000000).toFixed(1)}M` : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Top Products
function TopProducts() {
  const products = [
    { id: '1', name: 'Premium Skincare Set', sales: 412, revenue: 45200000, growth: 24.5 },
    { id: '2', name: 'Wireless Earbuds Pro', sales: 328, revenue: 32800000, growth: 18.2 },
    { id: '3', name: 'Organic Face Cream', sales: 256, revenue: 25600000, growth: -5.3 },
    { id: '4', name: 'Smart Watch Series 5', sales: 198, revenue: 39600000, growth: 31.2 },
    { id: '5', name: 'Hair Treatment Oil', sales: 167, revenue: 8350000, growth: 12.8 },
  ]

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-[var(--muted)]">Top selling products from product streams</p>
        <button className="text-sm text-[var(--secondary)] hover:underline">View All</button>
      </div>
      <div className="space-y-3">
        {products.map((product, i) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-3 bg-[var(--background)] rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 bg-[var(--secondary)]/10 rounded flex items-center justify-center text-sm font-medium text-[var(--secondary)]">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-xs text-[var(--muted)]">{product.sales} sold</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">W {(product.revenue / 1000000).toFixed(1)}M</p>
              <p className={`text-xs flex items-center justify-end gap-0.5 ${product.growth >= 0 ? 'text-[var(--success)]' : 'text-[var(--accent)]'}`}>
                {product.growth >= 0 ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                {Math.abs(product.growth)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Viewer Analytics - 시청자 분석
function ViewerAnalytics() {
  const viewerData = {
    avgWatchTime: '18:34',
    totalWatchHours: 2847,
    dropoffRate: 32,
    returnRate: 68,
    newViewers: 45,
    returningViewers: 55,
  }

  // 시청자 이탈 시점 데이터
  const dropoffPoints = [
    { time: '0:00', viewers: 100 },
    { time: '5:00', viewers: 85 },
    { time: '10:00', viewers: 72 },
    { time: '15:00', viewers: 68 },
    { time: '20:00', viewers: 65 },
    { time: '25:00', viewers: 62 },
    { time: '30:00', viewers: 58 },
  ]

  const max = 100
  const width = 100
  const height = 60

  const getX = (i: number) => (i / (dropoffPoints.length - 1)) * width
  const getY = (val: number) => height - (val / max) * height

  const linePath = dropoffPoints
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)},${getY(d.viewers)}`)
    .join(' ')
  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
      <p className="text-xs text-[var(--muted)] mb-4">Viewer behavior and retention analysis</p>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-[var(--background)] rounded-lg">
          <p className="text-xs text-[var(--muted)] mb-1">Avg Watch Time</p>
          <p className="text-xl font-bold">{viewerData.avgWatchTime}</p>
        </div>
        <div className="text-center p-3 bg-[var(--background)] rounded-lg">
          <p className="text-xs text-[var(--muted)] mb-1">Total Watch Hours</p>
          <p className="text-xl font-bold">{viewerData.totalWatchHours.toLocaleString()}h</p>
        </div>
        <div className="text-center p-3 bg-[var(--background)] rounded-lg">
          <p className="text-xs text-[var(--muted)] mb-1">New Viewers</p>
          <p className="text-xl font-bold">{viewerData.newViewers}%</p>
        </div>
        <div className="text-center p-3 bg-[var(--background)] rounded-lg">
          <p className="text-xs text-[var(--muted)] mb-1">Returning</p>
          <p className="text-xl font-bold">{viewerData.returningViewers}%</p>
        </div>
      </div>
      {/* Viewer Retention Chart */}
      <div>
        <p className="text-sm font-medium mb-3">Viewer Retention</p>
        <div className="relative h-24 w-full">
          <svg
            className="absolute inset-0 w-full h-full overflow-visible"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="retentionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#retentionGradient)" />
            <path
              d={linePath}
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="absolute -bottom-5 left-0 right-0 flex justify-between text-xs text-[var(--muted)]">
            {dropoffPoints.map((d) => (
              <span key={d.time}>{d.time}</span>
            ))}
          </div>
        </div>
        <p className="text-xs text-[var(--muted)] mt-6">Average {viewerData.dropoffRate}% drop-off within first 10 minutes</p>
      </div>
    </div>
  )
}

// Time Analysis - 시간대 분석 히트맵
function TimeAnalysis() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const hours = ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM', '12AM']

  // 히트맵 데이터 (0-100 scale, 높을수록 좋은 시간대)
  const heatmapData = [
    [20, 25, 35, 40, 65, 80, 45], // Mon
    [22, 28, 38, 42, 70, 85, 50], // Tue
    [18, 22, 32, 38, 60, 75, 42], // Wed
    [25, 30, 40, 45, 72, 88, 55], // Thu
    [30, 35, 45, 55, 85, 95, 70], // Fri
    [45, 55, 65, 75, 90, 100, 80], // Sat
    [40, 50, 60, 70, 85, 92, 72], // Sun
  ]

  const getColor = (value: number) => {
    if (value >= 80) return 'bg-[var(--secondary)]'
    if (value >= 60) return 'bg-[var(--secondary)]/70'
    if (value >= 40) return 'bg-[var(--secondary)]/40'
    if (value >= 20) return 'bg-[var(--secondary)]/20'
    return 'bg-[var(--secondary)]/10'
  }

  const bestTimes = [
    { day: 'Saturday', time: '9PM', score: 100 },
    { day: 'Friday', time: '9PM', score: 95 },
    { day: 'Sunday', time: '9PM', score: 92 },
  ]

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
      <p className="text-xs text-[var(--muted)] mb-4">Best streaming times based on viewer engagement</p>
      <div className="grid grid-cols-3 gap-6">
        {/* Heatmap */}
        <div className="col-span-2">
          <div className="flex">
            <div className="w-12" />
            <div className="flex-1 grid grid-cols-7 gap-1 mb-1">
              {hours.map((hour) => (
                <div key={hour} className="text-center text-xs text-[var(--muted)]">{hour}</div>
              ))}
            </div>
          </div>
          {days.map((day, dayIndex) => (
            <div key={day} className="flex items-center mb-1">
              <div className="w-12 text-xs text-[var(--muted)]">{day}</div>
              <div className="flex-1 grid grid-cols-7 gap-1">
                {heatmapData[dayIndex].map((value, hourIndex) => (
                  <div
                    key={hourIndex}
                    className={`h-8 rounded ${getColor(value)} cursor-pointer hover:ring-2 hover:ring-[var(--secondary)] transition-all`}
                    title={`${day} ${hours[hourIndex]}: ${value}% engagement`}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="flex items-center justify-end gap-2 mt-3">
            <span className="text-xs text-[var(--muted)]">Low</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded bg-[var(--secondary)]/10" />
              <div className="w-4 h-4 rounded bg-[var(--secondary)]/40" />
              <div className="w-4 h-4 rounded bg-[var(--secondary)]/70" />
              <div className="w-4 h-4 rounded bg-[var(--secondary)]" />
            </div>
            <span className="text-xs text-[var(--muted)]">High</span>
          </div>
        </div>
        {/* Best Times */}
        <div>
          <p className="text-sm font-medium mb-3">Best Times to Stream</p>
          <div className="space-y-2">
            {bestTimes.map((time, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[var(--background)] rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[var(--secondary)]/10 rounded flex items-center justify-center text-xs font-medium text-[var(--secondary)]">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{time.day}</p>
                    <p className="text-xs text-[var(--muted)]">{time.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[var(--secondary)]">{time.score}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// AI Content Performance
function AIContentPerformance() {
  const comparison = {
    aiContent: { views: 48200, engagement: 6.8, conversion: 3.2, creditsUsed: 1240 },
    regularContent: { views: 32100, engagement: 4.2, conversion: 1.8 },
  }

  const improvement = {
    views: ((comparison.aiContent.views - comparison.regularContent.views) / comparison.regularContent.views * 100).toFixed(0),
    engagement: ((comparison.aiContent.engagement - comparison.regularContent.engagement) / comparison.regularContent.engagement * 100).toFixed(0),
    conversion: ((comparison.aiContent.conversion - comparison.regularContent.conversion) / comparison.regularContent.conversion * 100).toFixed(0),
  }

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
      <p className="text-xs text-[var(--muted)] mb-4">AI-generated content performance vs regular content from AI Studio</p>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-[var(--background)] rounded-lg">
          <p className="text-xs text-[var(--muted)] mb-1">Views</p>
          <p className="text-lg font-bold">{comparison.aiContent.views.toLocaleString()}</p>
          <p className="text-xs text-[var(--success)]">+{improvement.views}% vs regular</p>
        </div>
        <div className="text-center p-3 bg-[var(--background)] rounded-lg">
          <p className="text-xs text-[var(--muted)] mb-1">Engagement</p>
          <p className="text-lg font-bold">{comparison.aiContent.engagement}%</p>
          <p className="text-xs text-[var(--success)]">+{improvement.engagement}% vs regular</p>
        </div>
        <div className="text-center p-3 bg-[var(--background)] rounded-lg">
          <p className="text-xs text-[var(--muted)] mb-1">Conversion</p>
          <p className="text-lg font-bold">{comparison.aiContent.conversion}%</p>
          <p className="text-xs text-[var(--success)]">+{improvement.conversion}% vs regular</p>
        </div>
      </div>
      <div className="flex items-center justify-between p-3 bg-[var(--secondary)]/5 border border-[var(--secondary)]/20 rounded-lg">
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-[var(--secondary)]" />
          <span className="text-sm">AI Credits Used</span>
        </div>
        <span className="text-sm font-medium">{comparison.aiContent.creditsUsed.toLocaleString()} credits</span>
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d')

  const handleExport = () => {
    // Export analytics data based on selected date range
    console.log(`Exporting analytics for: ${dateRange}`)
  }

  const stats = [
    {
      label: 'Total Revenue',
      value: 'W 308.8M',
      change: 23.5,
      trend: 'up',
      icon: DollarSign,
    },
    {
      label: 'Total Orders',
      value: '2,847',
      change: 18.2,
      trend: 'up',
      icon: ShoppingCart,
    },
    {
      label: 'Total Viewers',
      value: '124.5K',
      change: 12.5,
      trend: 'up',
      icon: Users,
    },
    {
      label: 'Avg. Conversion',
      value: '2.3%',
      change: -0.4,
      trend: 'down',
      icon: TrendingUp,
    },
  ]

  return (
    <div className="min-h-screen">
      <Header actions={<AnalyticsHeaderActions dateRange={dateRange} setDateRange={setDateRange} onExport={handleExport} />} />

      <div className="p-6">
        {/* 1. Overview Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon size={16} className="text-[var(--secondary)]" />
                <span className="text-xs text-[var(--muted)]">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p
                className={`text-xs flex items-center gap-0.5 ${
                  stat.trend === 'up' ? 'text-[var(--success)]' : 'text-[var(--accent)]'
                }`}
              >
                {stat.trend === 'up' ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                {stat.trend === 'up' ? '+' : ''}{stat.change}% this period
              </p>
            </div>
          ))}
        </div>

        {/* 2. Revenue Chart + Platform */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-2">
            <RevenueChart />
          </div>
          <PlatformPerformance />
        </div>

        {/* 3. Viewer Analytics - 시청자 분석 */}
        <div className="mb-6">
          <ViewerAnalytics />
        </div>

        {/* 4. Broadcast Performance */}
        <div className="mb-6">
          <BroadcastPerformance />
        </div>

        {/* 5. Time Analysis - 시간대 분석 */}
        <div className="mb-6">
          <TimeAnalysis />
        </div>

        {/* 6. Top Products + AI Performance */}
        <div className="grid grid-cols-2 gap-6">
          <TopProducts />
          <AIContentPerformance />
        </div>
      </div>
    </div>
  )
}
