'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import {
  Radio,
  Film,
  Wand2,
  ArrowRight,
  Sparkles,
  Clock,
  Users,
  Eye,
  ChevronRight,
  Zap,
  Image,
  FileText,
  MessageSquare,
  BarChart3,
} from 'lucide-react'

// AI Studio Header Actions
function AIStudioHeaderActions() {
  return (
    <div className="flex items-center gap-4">
      {/* AI Credits */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--secondary)]/10 rounded-lg border border-[var(--secondary)]/20">
        <Zap size={14} className="text-[var(--secondary)]" />
        <span className="text-sm font-medium text-[var(--secondary)]">2,450 credits</span>
      </div>
      {/* Processing Status */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--background)] rounded-lg border border-[var(--border-color)]">
        <Sparkles size={14} className="text-[var(--muted)]" />
        <span className="text-sm text-[var(--foreground)]">3 tasks running</span>
      </div>
    </div>
  )
}

// Main AI Features - Focus on these
const aiFeatures = [
  {
    id: 'live-stream',
    icon: Radio,
    title: 'AI Live Stream',
    description: 'Add an AI co-host to your broadcasts. AI assists with Q&A, product info, and real-time insights.',
    href: '/ai-studio/live-stream',
    badge: 'Popular',
  },
  {
    id: 'video-generator',
    icon: Film,
    title: 'AI Video Generator',
    description: 'Generate videos from text, images, or existing footage using advanced AI models.',
    href: '/ai-studio/video-generator',
    badge: null,
  },
  {
    id: 'tools',
    icon: Wand2,
    title: 'AI Tools',
    description: 'Thumbnails, captions, scripts, and more - all the AI tools you need for content creation.',
    href: '/ai-studio/tools',
    badge: null,
  },
]

// Quick Tools
const quickTools = [
  { icon: Image, label: 'Thumbnail', href: '/ai-studio/tools/thumbnail' },
  { icon: MessageSquare, label: 'Captions', href: '/ai-studio/tools/caption' },
  { icon: FileText, label: 'Script', href: '/ai-studio/tools/script' },
  { icon: BarChart3, label: 'Analyzer', href: '/ai-studio/tools/content-analyzer' },
]

// Stats
const stats = [
  { label: 'AI Generated', value: '1,247', icon: Sparkles },
  { label: 'Stream Hours', value: '324h', icon: Clock },
  { label: 'Total Views', value: '128K', icon: Eye },
  { label: 'Active Viewers', value: '2.4K', icon: Users },
]

// Recent Activity
const recentActivity = [
  { id: '1', type: 'live', title: 'Product Launch Stream', status: 'completed', time: '2 hours ago' },
  { id: '2', type: 'video', title: 'Product Highlight #12', status: 'completed', time: '5 hours ago' },
  { id: '3', type: 'video', title: 'Brand Introduction', status: 'processing', progress: 67, time: 'In progress' },
  { id: '4', type: 'live', title: 'Weekly Q&A Session', status: 'scheduled', time: 'Today 3:00 PM' },
]

export default function AIStudioPage() {
  return (
    <div>
      {/* Header - Same as other pages */}
      <Header actions={<AIStudioHeaderActions />} />

      {/* Main Content */}
      <div className="p-6">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">AI Studio</h1>
          <p className="text-sm text-[var(--muted)] mt-1">AI-powered content creation tools</p>
        </div>

      {/* Main AI Features - Big Cards for Focus */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {aiFeatures.map((feature) => {
          const Icon = feature.icon
          return (
            <Link
              key={feature.id}
              href={feature.href}
              className="group bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6 hover:border-[var(--secondary)] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center">
                  <Icon size={24} className="text-[var(--secondary)]" />
                </div>
                {feature.badge && (
                  <span className="text-xs font-medium text-[var(--secondary)] bg-[var(--secondary)]/10 px-2 py-1 rounded-full">
                    {feature.badge}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2 group-hover:text-[var(--secondary)] transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--muted)] mb-4 line-clamp-2">
                {feature.description}
              </p>
              <div className="flex items-center text-sm text-[var(--secondary)] font-medium">
                <span>Get Started</span>
                <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick Tools */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Quick Tools</h2>
        <div className="grid grid-cols-4 gap-4">
          {quickTools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.label}
                href={tool.href}
                className="flex items-center gap-3 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4 hover:border-[var(--secondary)] transition-all group"
              >
                <div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
                  <Icon size={20} className="text-[var(--secondary)]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--secondary)] transition-colors">
                    {tool.label}
                  </p>
                </div>
                <ArrowRight size={16} className="text-[var(--muted)] group-hover:text-[var(--secondary)] group-hover:translate-x-1 transition-all" />
              </Link>
            )
          })}
        </div>
      </div>

      {/* Stats & Recent Activity */}
      <div className="grid grid-cols-3 gap-6">
        {/* Stats */}
        <div className="col-span-2">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Overview</h2>
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-4"
                >
                  <div className="w-9 h-9 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center mb-3">
                    <Icon size={18} className="text-[var(--secondary)]" />
                  </div>
                  <p className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</p>
                  <p className="text-xs text-[var(--muted)]">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Recent Activity</h2>
            <Link href="/ai-studio/projects" className="text-xs text-[var(--secondary)] hover:underline">
              View All
            </Link>
          </div>
          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] divide-y divide-[var(--border-color)]">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 hover:bg-[var(--background)] transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  {item.type === 'live' ? (
                    <Radio size={14} className="text-[var(--secondary)]" />
                  ) : (
                    <Film size={14} className="text-[var(--secondary)]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--foreground)] truncate">{item.title}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {item.status === 'processing' ? `Processing ${item.progress}%` : item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Credits Banner */}
      <div className="mt-8 bg-[var(--secondary)]/5 border border-[var(--secondary)]/20 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
            <Zap size={20} className="text-[var(--secondary)]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">AI Credits Available</p>
            <p className="text-xs text-[var(--muted)]">2,450 credits remaining this month</p>
          </div>
        </div>
        <Link
          href="/settings/billing"
          className="text-sm font-medium text-[var(--secondary)] hover:underline"
        >
          Manage Plan
        </Link>
      </div>
      </div>
    </div>
  )
}
