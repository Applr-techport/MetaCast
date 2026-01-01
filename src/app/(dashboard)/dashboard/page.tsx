'use client'

import { Header } from '@/components/layout/Header'
import { NewStreamButton } from '@/components/layout/NewStreamButton'
import { Play, Package, Volume2, Video, Radio, Users, Sparkles, Bot, Film, Wand2, ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'

// Dashboard Header Actions
function DashboardHeaderActions() {
  return (
    <div className="flex items-center gap-4">
      {/* Live Status */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--accent)]/10 rounded-lg">
        <Radio size={14} className="text-[var(--accent)] animate-pulse" />
        <span className="text-sm font-medium text-[var(--accent)]">2 Live</span>
      </div>
      {/* Today's Viewers */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--background)] rounded-lg border border-[var(--border-color)]">
        <Users size={14} className="text-[var(--muted)]" />
        <span className="text-sm text-[var(--foreground)]">12.4K viewers today</span>
      </div>
      {/* New Stream Button */}
      <NewStreamButton />
    </div>
  )
}

// 스트림 카드 컴포넌트
function StreamCard({
  id,
  type,
  isLive,
  title,
  dateTime,
  platforms,
  isProductStream,
}: {
  id?: string
  type: 'live' | 'vod' | 'replay'
  isLive?: boolean
  title: string
  dateTime: string
  platforms: string[]
  isProductStream?: boolean
}) {
  // 아이콘 결정: 라이브=Video(캠코더), VOD=Play
  const renderIcon = () => {
    if (type === 'live' || isLive) {
      return <Video size={32} className="text-[var(--muted)]" />
    }
    return <Play size={32} className="text-[var(--muted)]" />
  }

  const cardContent = (
    <>
      {/* 썸네일 */}
      <div className="relative aspect-video bg-[var(--background)] flex items-center justify-center">
        {renderIcon()}
        {/* 상품 방송 표시 */}
        {isProductStream && (
          <span className="absolute top-2 right-2 px-2 py-0.5 bg-[var(--secondary)] text-white text-xs font-medium rounded flex items-center gap-1">
            <Package size={12} />
            Product
          </span>
        )}
      </div>

      {/* 정보 */}
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          {isLive && (
            <span className="text-[var(--accent)] text-xs font-bold">LIVE</span>
          )}
          <span className="font-medium text-sm">{title}</span>
        </div>
        <p className="text-xs text-[var(--muted)] mb-2">{dateTime}</p>
        <div className="flex flex-wrap gap-1">
          {platforms.map((platform) => (
            <span
              key={platform}
              className="px-2 py-1 bg-[var(--background)] border border-[var(--border-color)] text-xs rounded text-[var(--foreground)]"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </>
  )

  const cardClassName = "bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden hover:border-[var(--secondary)] transition-colors cursor-pointer block"

  if (isLive) {
    return (
      <Link href={`/live/${id || '1'}`} className={cardClassName}>
        {cardContent}
      </Link>
    )
  }

  return (
    <div className={cardClassName}>
      {cardContent}
    </div>
  )
}

// 스토리지 카드 컴포넌트
function StorageCard({
  icon: Icon,
  title,
  count,
  size,
}: {
  icon: React.ElementType
  title: string
  count: string
  size: string
}) {
  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
      <div className="w-10 h-10 bg-[var(--background)] rounded-lg flex items-center justify-center mb-3">
        <Icon size={20} className="text-[var(--muted)]" />
      </div>
      <h3 className="font-medium text-sm mb-1">{title}</h3>
      <p className="text-xs text-[var(--muted)] mb-2">{count}</p>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold">{size}</span>
        <button className="px-3 py-1 bg-[var(--background)] border border-[var(--border-color)] rounded text-xs hover:bg-[var(--border-color)] transition-colors">
          More
        </button>
      </div>
    </div>
  )
}

// 스토리지 도넛 차트
function StorageDonut({ available }: { available: string }) {
  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4 flex items-center justify-center">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* 배경 원 */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="var(--border-color)"
            strokeWidth="12"
          />
          {/* Saved Livestream - 34GB */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#6b7280"
            strokeWidth="12"
            strokeDasharray="108 143"
            strokeDashoffset="0"
          />
          {/* Video on Demand - 25GB */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="12"
            strokeDasharray="79 172"
            strokeDashoffset="-108"
          />
          {/* Ads Video - 13GB */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="12"
            strokeDasharray="41 210"
            strokeDashoffset="-187"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold">{available}</span>
          <span className="text-xs text-[var(--muted)]">available</span>
        </div>
      </div>
    </div>
  )
}

// 연결 그래프 컴포넌트
function ConnectionsChart() {
  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4">Connections</h2>

      {/* 필터 */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <select className="px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm">
          <option>last hour</option>
          <option>last 24 hours</option>
          <option>last 7 days</option>
        </select>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--muted)]">From:</span>
          <input type="date" className="px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm" />
          <input type="time" className="px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--muted)]">To:</span>
          <input type="date" className="px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm" />
          <input type="time" className="px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm" />
        </div>
      </div>

      {/* 프로토콜 체크박스 */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <label className="flex items-center gap-1.5 text-xs">
          <input type="checkbox" defaultChecked className="accent-[#ef4444] w-3 h-3" />
          <span className="text-[#ef4444]">RTMP</span>
        </label>
        <label className="flex items-center gap-1.5 text-xs">
          <input type="checkbox" defaultChecked className="accent-[#3b82f6] w-3 h-3" />
          <span className="text-[#3b82f6]">HDS</span>
        </label>
        <label className="flex items-center gap-1.5 text-xs">
          <input type="checkbox" defaultChecked className="accent-[#22c55e] w-3 h-3" />
          <span className="text-[#22c55e]">DASH</span>
        </label>
        <label className="flex items-center gap-1.5 text-xs">
          <input type="checkbox" defaultChecked className="accent-[#f59e0b] w-3 h-3" />
          <span className="text-[#f59e0b]">HLS</span>
        </label>
        <label className="flex items-center gap-1.5 text-xs">
          <input type="checkbox" defaultChecked className="accent-[#8b5cf6] w-3 h-3" />
          <span className="text-[#8b5cf6]">RTSP/RTP</span>
        </label>
        <label className="flex items-center gap-1.5 text-xs">
          <input type="checkbox" defaultChecked className="accent-[#06b6d4] w-3 h-3" />
          <span className="text-[#06b6d4]">Smooth</span>
        </label>
        <div className="flex items-center gap-3 ml-4">
          <label className="flex items-center gap-1.5 text-xs">
            <input type="radio" name="stat" className="w-3 h-3" />
            <span>min</span>
          </label>
          <label className="flex items-center gap-1.5 text-xs">
            <input type="radio" name="stat" className="w-3 h-3" />
            <span>max</span>
          </label>
          <label className="flex items-center gap-1.5 text-xs">
            <input type="radio" name="stat" defaultChecked className="w-3 h-3" />
            <span>average</span>
          </label>
          <label className="flex items-center gap-1.5 text-xs">
            <input type="checkbox" className="w-3 h-3" />
            <span>actual</span>
          </label>
        </div>
      </div>

      {/* 차트 영역 */}
      <div className="h-64 bg-[var(--background)] rounded-lg flex items-end justify-between p-4 gap-2">
        {[40, 45, 50, 55, 70, 85, 75].map((height, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div
              className="w-full bg-[var(--border-color)] rounded-t"
              style={{ height: `${height}%` }}
            />
            <span className="text-xs text-[var(--muted)]">
              {`08 Mar 21`}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 네트워크 그래프 컴포넌트
function NetworkChart() {
  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4">Network</h2>

      {/* 필터 */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <select className="px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm">
          <option>last hour</option>
          <option>last 24 hours</option>
          <option>last 7 days</option>
        </select>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--muted)]">From:</span>
          <input type="date" className="px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm" />
          <input type="time" className="px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--muted)]">To:</span>
          <input type="date" className="px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm" />
          <input type="time" className="px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm" />
        </div>
      </div>

      {/* Bits In/Out 체크박스 */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <label className="flex items-center gap-1.5 text-xs">
          <input type="checkbox" defaultChecked className="accent-[#3b82f6] w-3 h-3" />
          <span className="text-[#3b82f6]">Bits In</span>
        </label>
        <label className="flex items-center gap-1.5 text-xs">
          <input type="checkbox" defaultChecked className="accent-[#ef4444] w-3 h-3" />
          <span className="text-[#ef4444]">Bits Out</span>
        </label>
        <div className="flex items-center gap-3 ml-4">
          <label className="flex items-center gap-1.5 text-xs">
            <input type="radio" name="network-stat" className="w-3 h-3" />
            <span>min</span>
          </label>
          <label className="flex items-center gap-1.5 text-xs">
            <input type="radio" name="network-stat" className="w-3 h-3" />
            <span>max</span>
          </label>
          <label className="flex items-center gap-1.5 text-xs">
            <input type="radio" name="network-stat" defaultChecked className="w-3 h-3" />
            <span>average</span>
          </label>
          <label className="flex items-center gap-1.5 text-xs">
            <input type="checkbox" className="w-3 h-3" />
            <span>actual</span>
          </label>
        </div>
      </div>

      {/* 차트 영역 */}
      <div className="h-48 bg-[var(--background)] rounded-lg p-4 relative">
        <div className="absolute left-4 top-4 text-xs text-[var(--muted)]">1,000 bits</div>
        {/* 간단한 라인 차트 시각화 */}
        <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
          <polyline
            points="0,40 15,35 30,38 45,30 60,25 75,28 90,20 100,22"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="0.5"
          />
          <polyline
            points="0,45 15,42 30,44 45,38 60,35 75,37 90,30 100,32"
            fill="none"
            stroke="#ef4444"
            strokeWidth="0.5"
          />
        </svg>
      </div>
    </div>
  )
}

// AI Studio Quick Access
function AIStudioQuickAccess() {
  const aiFeatures = [
    {
      icon: Bot,
      title: 'AI Co-Host',
      description: 'Stream with AI assistance',
      href: '/ai-studio/live-stream',
      badge: 'Popular',
    },
    {
      icon: Film,
      title: 'Video Generator',
      description: 'Create videos with AI',
      href: '/ai-studio/video-generator',
    },
    {
      icon: Wand2,
      title: 'AI Tools',
      description: 'Thumbnails, captions & more',
      href: '/ai-studio/tools',
    },
  ]

  return (
    <div className="bg-gradient-to-r from-[var(--secondary)]/5 to-[var(--secondary)]/10 border border-[var(--secondary)]/20 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
            <Sparkles size={20} className="text-[var(--secondary)]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">AI Studio</h2>
            <p className="text-sm text-[var(--muted)]">Enhance your content with AI</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--secondary)]/10 rounded-lg">
            <Zap size={14} className="text-[var(--secondary)]" />
            <span className="text-sm font-medium text-[var(--secondary)]">68 credits</span>
          </div>
          <Link
            href="/ai-studio"
            className="text-sm text-[var(--secondary)] hover:underline flex items-center gap-1"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {aiFeatures.map((feature) => {
          const Icon = feature.icon
          return (
            <Link
              key={feature.title}
              href={feature.href}
              className="group bg-[var(--card-bg)] rounded-lg p-4 hover:border-[var(--secondary)] border border-transparent transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
                  <Icon size={18} className="text-[var(--secondary)]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm group-hover:text-[var(--secondary)] transition-colors">
                      {feature.title}
                    </span>
                    {feature.badge && (
                      <span className="px-1.5 py-0.5 bg-[var(--secondary)]/10 text-[var(--secondary)] text-[10px] font-medium rounded">
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--muted)]">{feature.description}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Header actions={<DashboardHeaderActions />} />

      <div className="p-6 space-y-8">
        {/* 타이틀 */}
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {/* AI Studio Quick Access */}
        <AIStudioQuickAccess />

        {/* Stream List */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Stream List</h2>
            <Link
              href="/streams"
              className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors"
            >
              More
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StreamCard
              type="live"
              isLive={true}
              title="Livestream Title"
              dateTime="25:34"
              platforms={['My Website']}
            />
            <StreamCard
              type="replay"
              title="Livestream Title"
              dateTime="14 Feb, 2021 | 14:25"
              platforms={['My Website', 'Xcaster App']}
            />
            <StreamCard
              type="vod"
              isLive={true}
              title="Livestream Title"
              dateTime="25:34"
              platforms={['My Website', 'Xcaster App']}
            />
            <StreamCard
              type="vod"
              title="Livestream Title"
              dateTime="14 Feb, 2021 | 14:25"
              platforms={['My Website']}
            />
          </div>
        </section>

        {/* Storage */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Storage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StorageCard
              icon={Play}
              title="Saved Livestream"
              count="45 Videos"
              size="34GB"
            />
            <StorageCard
              icon={Play}
              title="Video on Demand"
              count="45 Videos"
              size="25GB"
            />
            <StorageCard
              icon={Volume2}
              title="Ads Video"
              count="45 Videos"
              size="13GB"
            />
            <StorageDonut available="8GB" />
          </div>
        </section>

        {/* Connections */}
        <ConnectionsChart />

        {/* Network */}
        <NetworkChart />
      </div>
    </div>
  )
}
