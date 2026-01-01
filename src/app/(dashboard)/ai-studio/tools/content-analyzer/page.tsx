'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import {
  ArrowLeft,
  BarChart3,
  Sparkles,
  Check,
  Upload,
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  Clock,
  Calendar,
  Film,
  Radio,
  RefreshCw,
  Download,
  ChevronRight,
} from 'lucide-react'

// Header Actions
function ContentAnalyzerHeaderActions() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--secondary)]/10 rounded-lg border border-[var(--secondary)]/20">
        <BarChart3 size={14} className="text-[var(--secondary)]" />
        <span className="text-sm font-medium text-[var(--secondary)]">Free analysis</span>
      </div>
    </div>
  )
}

type Step = 'select' | 'analyzing' | 'results'

const contentTypes = [
  { id: 'all', label: 'All Content' },
  { id: 'videos', label: 'Videos' },
  { id: 'streams', label: 'Live Streams' },
  { id: 'shorts', label: 'Shorts' },
]

const timeRanges = [
  { id: '7d', label: 'Last 7 Days' },
  { id: '30d', label: 'Last 30 Days' },
  { id: '90d', label: 'Last 90 Days' },
  { id: 'all', label: 'All Time' },
]

const sampleContent = [
  { id: '1', title: 'Product Launch Live', type: 'stream', views: 12500, engagement: 8.2, trend: 'up' },
  { id: '2', title: 'Unboxing Review #45', type: 'video', views: 8900, engagement: 6.5, trend: 'up' },
  { id: '3', title: 'Quick Tips Series', type: 'shorts', views: 45000, engagement: 12.3, trend: 'up' },
  { id: '4', title: 'Weekly Q&A Session', type: 'stream', views: 6700, engagement: 9.1, trend: 'down' },
  { id: '5', title: 'Behind the Scenes', type: 'video', views: 3200, engagement: 4.2, trend: 'down' },
]

export default function ContentAnalyzerPage() {
  const [step, setStep] = useState<Step>('select')
  const [contentType, setContentType] = useState('all')
  const [timeRange, setTimeRange] = useState('30d')
  const [progress, setProgress] = useState(0)

  const handleAnalyze = () => {
    setStep('analyzing')
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 3
      setProgress(currentProgress)
      if (currentProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => setStep('results'), 500)
      }
    }, 80)
  }

  return (
    <div className="min-h-screen">
      <Header actions={<ContentAnalyzerHeaderActions />} />

      <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/ai-studio/tools"
          className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
        >
          <ArrowLeft size={20} className="text-[var(--muted)]" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-[var(--foreground)]">Content Analyzer</h1>
          <p className="text-sm text-[var(--muted)]">Analyze your best performing content patterns</p>
        </div>
      </div>

      {/* Step 1: Select */}
      {step === 'select' && (
        <div className="space-y-6">
          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
            <h2 className="font-semibold text-[var(--foreground)] mb-4">Select Analysis Scope</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--foreground)] mb-3">Content Type</label>
              <div className="flex flex-wrap gap-2">
                {contentTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setContentType(type.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      contentType === type.id
                        ? 'bg-[var(--secondary)] text-white'
                        : 'bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-3">Time Range</label>
              <div className="flex flex-wrap gap-2">
                {timeRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setTimeRange(range.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      timeRange === range.id
                        ? 'bg-[var(--secondary)] text-white'
                        : 'bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
            <h3 className="font-semibold text-[var(--foreground)] mb-4">Content to Analyze</h3>
            <div className="space-y-3">
              {sampleContent.map((content) => (
                <div
                  key={content.id}
                  className="flex items-center gap-4 p-4 bg-[var(--background)] rounded-xl"
                >
                  <div className="w-10 h-10 bg-[var(--card-bg)] rounded-lg flex items-center justify-center">
                    {content.type === 'stream' ? (
                      <Radio size={18} className="text-[var(--accent)]" />
                    ) : content.type === 'shorts' ? (
                      <Film size={18} className="text-[var(--secondary)]" />
                    ) : (
                      <Film size={18} className="text-[var(--secondary)]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[var(--foreground)]">{content.title}</p>
                    <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                      <span>{content.type}</span>
                      <span>{content.views.toLocaleString()} views</span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    content.trend === 'up' ? 'text-[var(--success)]' : 'text-[var(--accent)]'
                  }`}>
                    {content.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    <span>{content.engagement}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            className="w-full py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles size={18} />
            Start Analysis
          </button>
        </div>
      )}

      {/* Step 2: Analyzing */}
      {step === 'analyzing' && (
        <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-8 text-center">
          <Sparkles size={48} className="mx-auto text-[var(--secondary)] mb-4" />
          <h3 className="font-semibold text-[var(--foreground)] mb-2">Analyzing Your Content...</h3>
          <p className="text-sm text-[var(--muted)] mb-6">AI is identifying patterns in your best performing content</p>

          <div className="max-w-md mx-auto mb-4">
            <div className="h-2 bg-[var(--background)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--secondary)] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-[var(--muted)] mt-2">{progress}%</p>
          </div>
        </div>
      )}

      {/* Step 3: Results */}
      {step === 'results' && (
        <div className="space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Total Views', value: '76.3K', change: '+12%', icon: Eye },
              { label: 'Avg Engagement', value: '8.1%', change: '+2.3%', icon: Heart },
              { label: 'Comments', value: '2,340', change: '+18%', icon: MessageSquare },
              { label: 'Shares', value: '890', change: '+5%', icon: Share2 },
            ].map((stat) => {
              const StatIcon = stat.icon
              return (
                <div key={stat.label} className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
                      <StatIcon size={18} className="text-[var(--secondary)]" />
                    </div>
                    <span className="text-xs font-medium text-[var(--success)] bg-[var(--success)]/10 px-2 py-0.5 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-[var(--foreground)] mb-0.5">{stat.value}</p>
                  <p className="text-xs text-[var(--muted)]">{stat.label}</p>
                </div>
              )
            })}
          </div>

          {/* Key Insights */}
          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-[var(--foreground)]">Key Insights</h2>
              <span className="px-3 py-1 bg-[var(--success)]/10 text-[var(--success)] rounded-full text-sm font-medium">AI Generated</span>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Best Performing Time', insight: 'Your content performs 45% better when posted between 7-9 PM', icon: Clock },
                { title: 'Optimal Length', insight: 'Videos under 3 minutes get 2x more engagement than longer ones', icon: Film },
                { title: 'Top Topics', insight: 'Product unboxing and tutorials drive the most views', icon: TrendingUp },
                { title: 'Engagement Pattern', insight: 'Live streams with Q&A segments have 60% higher retention', icon: MessageSquare },
              ].map((insight) => {
                const InsightIcon = insight.icon
                return (
                  <div key={insight.title} className="flex items-start gap-4 p-4 bg-[var(--background)] rounded-xl">
                    <div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <InsightIcon size={18} className="text-[var(--secondary)]" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--foreground)] mb-1">{insight.title}</p>
                      <p className="text-sm text-[var(--muted)]">{insight.insight}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
            <h3 className="font-semibold text-[var(--foreground)] mb-4">Top Performing Content</h3>
            <div className="space-y-3">
              {sampleContent.slice(0, 3).map((content, index) => (
                <div
                  key={content.id}
                  className="flex items-center gap-4 p-4 bg-[var(--background)] rounded-xl"
                >
                  <div className="w-8 h-8 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center text-sm font-bold text-[var(--secondary)]">
                    {index + 1}
                  </div>
                  <div className="w-16 h-12 bg-[var(--card-bg)] rounded-lg flex items-center justify-center">
                    {content.type === 'stream' ? (
                      <Radio size={20} className="text-[var(--accent)]" />
                    ) : (
                      <Film size={20} className="text-[var(--secondary)]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[var(--foreground)]">{content.title}</p>
                    <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
                      <span className="flex items-center gap-1">
                        <Eye size={12} />
                        {content.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={12} />
                        {content.engagement}%
                      </span>
                    </div>
                  </div>
                  <button className="text-sm text-[var(--secondary)] hover:underline flex items-center gap-1">
                    Details
                    <ChevronRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-[var(--secondary)]/5 rounded-xl border border-[var(--secondary)]/20 p-6">
            <h3 className="font-semibold text-[var(--foreground)] mb-4">AI Recommendations</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check size={18} className="text-[var(--secondary)] mt-0.5" />
                <p className="text-sm text-[var(--foreground)]">Create more short-form content (under 60 seconds) to capitalize on high engagement rates</p>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-[var(--secondary)] mt-0.5" />
                <p className="text-sm text-[var(--foreground)]">Schedule live streams during peak hours (7-9 PM) for maximum viewership</p>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-[var(--secondary)] mt-0.5" />
                <p className="text-sm text-[var(--foreground)]">Include more Q&A segments in your live streams to boost retention</p>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                setStep('select')
                setProgress(0)
              }}
              className="flex-1 py-3 bg-[var(--background)] border border-[var(--border-color)] text-[var(--foreground)] rounded-xl font-medium flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} />
              New Analysis
            </button>
            <button className="flex-1 py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-xl font-medium flex items-center justify-center gap-2">
              <Download size={18} />
              Export Report
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}
