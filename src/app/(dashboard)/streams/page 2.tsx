'use client'

import { Header } from '@/components/layout/Header'
import { useState } from 'react'
import {
  Play,
  Video,
  Package,
  Search,
  Filter,
  Grid3X3,
  List,
  MoreVertical,
  Calendar,
  Clock,
  Eye,
  Trash2,
  Edit3,
  Copy,
  ExternalLink,
} from 'lucide-react'
import Link from 'next/link'

type ViewMode = 'grid' | 'list'
type FilterType = 'all' | 'live' | 'vod' | 'scheduled'

interface Stream {
  id: string
  title: string
  type: 'live' | 'vod' | 'scheduled'
  isLive: boolean
  thumbnail?: string
  duration?: string
  dateTime: string
  platforms: string[]
  views?: number
}

// 샘플 데이터
const sampleStreams: Stream[] = [
  {
    id: '1',
    title: 'Product Launch Event 2024',
    type: 'live',
    isLive: true,
    duration: '25:34',
    dateTime: 'Live Now',
    platforms: ['YouTube', 'Facebook'],
    views: 1234,
  },
  {
    id: '2',
    title: 'Weekly Tech News Update',
    type: 'vod',
    isLive: false,
    duration: '45:12',
    dateTime: '14 Feb, 2024 | 14:25',
    platforms: ['My Website', 'Xcaster App'],
    views: 5678,
  },
  {
    id: '3',
    title: 'Behind the Scenes - Studio Tour',
    type: 'vod',
    isLive: false,
    duration: '32:45',
    dateTime: '12 Feb, 2024 | 10:00',
    platforms: ['YouTube'],
    views: 2345,
  },
  {
    id: '4',
    title: 'Q&A Session with CEO',
    type: 'scheduled',
    isLive: false,
    dateTime: '20 Feb, 2024 | 15:00',
    platforms: ['YouTube', 'Facebook', 'Twitter'],
  },
  {
    id: '5',
    title: 'Tutorial: Getting Started with XCaster',
    type: 'vod',
    isLive: false,
    duration: '18:30',
    dateTime: '10 Feb, 2024 | 09:00',
    platforms: ['My Website'],
    views: 8901,
  },
  {
    id: '6',
    title: 'Live Gaming Session',
    type: 'live',
    isLive: true,
    duration: '1:05:22',
    dateTime: 'Live Now',
    platforms: ['Twitch', 'YouTube'],
    views: 567,
  },
  {
    id: '7',
    title: 'Marketing Strategy Webinar',
    type: 'scheduled',
    isLive: false,
    dateTime: '25 Feb, 2024 | 14:00',
    platforms: ['Zoom', 'YouTube'],
  },
  {
    id: '8',
    title: 'Customer Success Stories',
    type: 'vod',
    isLive: false,
    duration: '22:15',
    dateTime: '08 Feb, 2024 | 11:30',
    platforms: ['My Website', 'YouTube'],
    views: 3456,
  },
  {
    id: '9',
    title: 'Developer Conference Keynote',
    type: 'vod',
    isLive: false,
    duration: '1:23:45',
    dateTime: '05 Feb, 2024 | 09:00',
    platforms: ['YouTube', 'Twitch'],
    views: 12543,
  },
  {
    id: '10',
    title: 'Product Demo - New Features',
    type: 'vod',
    isLive: false,
    duration: '35:20',
    dateTime: '03 Feb, 2024 | 14:00',
    platforms: ['My Website'],
    views: 4521,
  },
  {
    id: '11',
    title: 'Community Meetup March',
    type: 'scheduled',
    isLive: false,
    dateTime: '01 Mar, 2024 | 18:00',
    platforms: ['YouTube', 'Discord'],
  },
  {
    id: '12',
    title: 'Interview with Industry Expert',
    type: 'vod',
    isLive: false,
    duration: '48:30',
    dateTime: '01 Feb, 2024 | 11:00',
    platforms: ['YouTube', 'Facebook'],
    views: 7832,
  },
  {
    id: '13',
    title: 'Live Coding Session - React',
    type: 'live',
    isLive: true,
    duration: '2:15:00',
    dateTime: 'Live Now',
    platforms: ['Twitch', 'YouTube'],
    views: 892,
  },
  {
    id: '14',
    title: 'Monthly Team Update',
    type: 'vod',
    isLive: false,
    duration: '28:45',
    dateTime: '28 Jan, 2024 | 10:00',
    platforms: ['My Website'],
    views: 1234,
  },
  {
    id: '15',
    title: 'Partner Announcement Event',
    type: 'scheduled',
    isLive: false,
    dateTime: '05 Mar, 2024 | 15:00',
    platforms: ['YouTube', 'Facebook', 'LinkedIn'],
  },
  {
    id: '16',
    title: 'Year in Review 2023',
    type: 'vod',
    isLive: false,
    duration: '55:10',
    dateTime: '25 Jan, 2024 | 09:00',
    platforms: ['YouTube', 'My Website'],
    views: 15678,
  },
]

// 스트림 그리드 카드
function StreamGridCard({ stream }: { stream: Stream }) {
  // 아이콘 결정: 라이브/예정=Video(캠코더), VOD=Play
  const renderIcon = () => {
    if (stream.type === 'live' || stream.isLive || stream.type === 'scheduled') {
      return <Video size={32} className="text-[var(--muted)]" />
    }
    return <Play size={32} className="text-[var(--muted)]" />
  }

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden group hover:border-[var(--primary)] transition-colors">
      {/* 썸네일 */}
      <div className="relative aspect-video bg-[var(--background)] flex items-center justify-center">
        {renderIcon()}
        {stream.duration && (
          <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white text-xs rounded">
            {stream.duration}
          </span>
        )}
        {stream.isLive && (
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-[var(--accent)] text-white text-xs font-bold rounded">
            LIVE
          </span>
        )}
        {stream.type === 'scheduled' && (
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-[var(--secondary)] text-white text-xs font-bold rounded">
            SCHEDULED
          </span>
        )}
        {/* 호버 오버레이 */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
            <Play size={16} className="text-black" />
          </button>
          <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
            <Edit3 size={16} className="text-black" />
          </button>
          <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
            <Trash2 size={16} className="text-black" />
          </button>
        </div>
      </div>

      {/* 정보 */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{stream.title}</p>
            <p className="text-xs text-[var(--muted)] mt-1">{stream.dateTime}</p>
          </div>
          <button className="p-1 hover:bg-[var(--background)] rounded transition-colors">
            <MoreVertical size={16} className="text-[var(--muted)]" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-wrap gap-1">
            {stream.platforms.slice(0, 2).map((platform) => (
              <span
                key={platform}
                className="px-2 py-0.5 bg-[var(--background)] border border-[var(--border-color)] text-xs rounded"
              >
                {platform}
              </span>
            ))}
            {stream.platforms.length > 2 && (
              <span className="px-2 py-0.5 bg-[var(--background)] border border-[var(--border-color)] text-xs rounded">
                +{stream.platforms.length - 2}
              </span>
            )}
          </div>
          {stream.views && (
            <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
              <Eye size={12} />
              {stream.views.toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// 스트림 리스트 행
function StreamListRow({ stream }: { stream: Stream }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg hover:border-[var(--primary)] transition-colors">
      {/* 썸네일 */}
      <div className="relative w-32 aspect-video bg-[var(--background)] rounded-lg flex items-center justify-center flex-shrink-0">
        <Video size={20} className="text-[var(--muted)]" />
        {stream.isLive && (
          <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-[var(--accent)] text-white text-[10px] font-bold rounded">
            LIVE
          </span>
        )}
        {stream.duration && (
          <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 text-white text-[10px] rounded">
            {stream.duration}
          </span>
        )}
      </div>

      {/* 제목 */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{stream.title}</p>
        <div className="flex items-center gap-2 mt-1">
          {stream.platforms.map((platform) => (
            <span
              key={platform}
              className="px-2 py-0.5 bg-[var(--background)] border border-[var(--border-color)] text-xs rounded"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>

      {/* 날짜 */}
      <div className="w-40 text-sm text-[var(--muted)]">
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          {stream.dateTime}
        </div>
      </div>

      {/* 조회수 */}
      <div className="w-24 text-sm text-[var(--muted)]">
        {stream.views ? (
          <div className="flex items-center gap-1">
            <Eye size={14} />
            {stream.views.toLocaleString()}
          </div>
        ) : (
          '-'
        )}
      </div>

      {/* 상태 */}
      <div className="w-24">
        {stream.isLive ? (
          <span className="px-2 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-xs rounded-full font-medium">
            Live
          </span>
        ) : stream.type === 'scheduled' ? (
          <span className="px-2 py-1 bg-[var(--secondary)]/10 text-[var(--secondary)] text-xs rounded-full font-medium">
            Scheduled
          </span>
        ) : (
          <span className="px-2 py-1 bg-[var(--muted)]/10 text-[var(--muted)] text-xs rounded-full font-medium">
            VOD
          </span>
        )}
      </div>

      {/* 액션 */}
      <div className="flex items-center gap-1">
        <button className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors">
          <ExternalLink size={16} className="text-[var(--muted)]" />
        </button>
        <button className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors">
          <Copy size={16} className="text-[var(--muted)]" />
        </button>
        <button className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors">
          <Edit3 size={16} className="text-[var(--muted)]" />
        </button>
        <button className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors">
          <Trash2 size={16} className="text-[var(--muted)]" />
        </button>
      </div>
    </div>
  )
}

export default function StreamsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [filter, setFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredStreams = sampleStreams.filter((stream) => {
    if (filter !== 'all' && stream.type !== filter) return false
    if (searchQuery && !stream.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

  const liveCount = sampleStreams.filter((s) => s.isLive).length
  const vodCount = sampleStreams.filter((s) => s.type === 'vod').length
  const scheduledCount = sampleStreams.filter((s) => s.type === 'scheduled').length

  return (
    <div className="min-h-screen">
      <Header />

      <div className="p-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">All Streams</h1>
            <p className="text-sm text-[var(--muted)] mt-1">
              {sampleStreams.length} streams total
            </p>
          </div>
        </div>

        {/* 필터 바 */}
        <div className="flex items-center justify-between mb-6 gap-4">
          {/* 검색 */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search streams..."
              className="w-full pl-10 pr-4 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            />
          </div>

          {/* 타입 필터 */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--card-bg)] border border-[var(--border-color)] hover:bg-[var(--background)]'
              }`}
            >
              All ({sampleStreams.length})
            </button>
            <button
              onClick={() => setFilter('live')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'live'
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--card-bg)] border border-[var(--border-color)] hover:bg-[var(--background)]'
              }`}
            >
              Live ({liveCount})
            </button>
            <button
              onClick={() => setFilter('vod')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'vod'
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--card-bg)] border border-[var(--border-color)] hover:bg-[var(--background)]'
              }`}
            >
              VOD ({vodCount})
            </button>
            <button
              onClick={() => setFilter('scheduled')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'scheduled'
                  ? 'bg-[var(--secondary)] text-white'
                  : 'bg-[var(--card-bg)] border border-[var(--border-color)] hover:bg-[var(--background)]'
              }`}
            >
              Scheduled ({scheduledCount})
            </button>
          </div>

          {/* 뷰 모드 */}
          <div className="flex border border-[var(--border-color)] rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${
                viewMode === 'grid'
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--card-bg)] hover:bg-[var(--background)]'
              }`}
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${
                viewMode === 'list'
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--card-bg)] hover:bg-[var(--background)]'
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* 스트림 목록 */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredStreams.map((stream) => (
              <StreamGridCard key={stream.id} stream={stream} />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredStreams.map((stream) => (
              <StreamListRow key={stream.id} stream={stream} />
            ))}
          </div>
        )}

        {/* 결과 없음 */}
        {filteredStreams.length === 0 && (
          <div className="text-center py-12">
            <Video size={48} className="mx-auto text-[var(--muted)] mb-4" />
            <p className="text-[var(--muted)]">No streams found</p>
          </div>
        )}
      </div>
    </div>
  )
}
