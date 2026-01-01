'use client'

import { Header } from '@/components/layout/Header'
import { useState } from 'react'
import Link from 'next/link'
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Video,
  Image as ImageIcon,
  Music,
  Play,
  MoreVertical,
  Upload,
  Clock,
  HardDrive,
  Trash2,
  ArrowDownToLine,
  Edit3,
  Sparkles,
  Radio,
  Calendar,
  Youtube,
  Facebook,
  Instagram,
  Eye,
  Share2,
  Send,
  Copy,
  X,
  Check,
  ArrowUpDown,
  Globe,
  Plus,
  Folder,
  FolderPlus,
  Tag,
  TagIcon,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'

// Assets Header Actions
function AssetsHeaderActions({ onUploadClick }: { onUploadClick: () => void }) {
  return (
    <div className="flex items-center gap-3">
      {/* Storage Info */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--background)] rounded-lg border border-[var(--border-color)]">
        <HardDrive size={14} className="text-[var(--muted)]" />
        <span className="text-sm text-[var(--foreground)]">12.4 GB / 50 GB</span>
      </div>
      {/* Upload Button */}
      <button
        onClick={onUploadClick}
        className="flex items-center gap-2 px-4 py-2 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg text-sm font-medium transition-colors"
      >
        <Upload size={18} />
        <span>Upload</span>
      </button>
    </div>
  )
}

type ViewMode = 'grid' | 'list'
type SourceFilter = 'all' | 'ai-studio' | 'live-stream' | 'upload'
type StatusFilter = 'all' | 'ready' | 'processing' | 'scheduled'
type SortBy = 'date-desc' | 'date-asc' | 'name-asc' | 'name-desc' | 'views-desc' | 'size-desc'

interface Asset {
  id: string
  name: string
  type: 'video' | 'image' | 'audio'
  source: 'ai-studio' | 'live-stream' | 'upload'
  size: string
  duration?: string
  createdAt: string
  thumbnail?: string
  status: 'ready' | 'processing' | 'scheduled'
  platforms?: string[]
  views?: number
  scheduledDate?: string
  aiGenerated?: boolean
  folderId?: string
  tags?: string[]
}

interface AssetFolder {
  id: string
  name: string
  color: string
  count: number
}

// 샘플 폴더 데이터
const sampleFolders: AssetFolder[] = [
  { id: 'product-reviews', name: 'Product Reviews', color: '#8b5cf6', count: 3 },
  { id: 'tutorials', name: 'Tutorials', color: '#3b82f6', count: 2 },
  { id: 'promotional', name: 'Promotional', color: '#10b981', count: 2 },
  { id: 'archive', name: 'Archive', color: '#6b7280', count: 1 },
]

// 사용 가능한 태그
const availableTags = [
  'product', 'tutorial', 'review', 'holiday', 'gaming', 'music',
  'live', 'demo', 'q&a', 'announcement', 'sponsored', 'educational'
]

// 샘플 데이터 - AI Studio 및 Live Stream 결과물
const sampleAssets: Asset[] = [
  {
    id: '1',
    name: 'AI Product Review - Holiday Special',
    type: 'video',
    source: 'ai-studio',
    size: '428 MB',
    duration: '03:24',
    createdAt: '2024-12-28',
    status: 'ready',
    aiGenerated: true,
    platforms: ['youtube', 'tiktok'],
    views: 12450,
    folderId: 'product-reviews',
    tags: ['product', 'review', 'holiday'],
  },
  {
    id: '2',
    name: 'Live Stream Recording - Product Launch',
    type: 'video',
    source: 'live-stream',
    size: '1.2 GB',
    duration: '45:12',
    createdAt: '2024-12-27',
    status: 'ready',
    platforms: ['youtube', 'facebook', 'twitch'],
    views: 8924,
    folderId: 'promotional',
    tags: ['live', 'product', 'announcement'],
  },
  {
    id: '3',
    name: 'AI Short-form - Top 5 Features',
    type: 'video',
    source: 'ai-studio',
    size: '86 MB',
    duration: '00:58',
    createdAt: '2024-12-27',
    status: 'ready',
    aiGenerated: true,
    platforms: ['tiktok', 'instagram'],
    views: 24680,
    folderId: 'tutorials',
    tags: ['tutorial', 'educational'],
  },
  {
    id: '4',
    name: 'AI Thumbnail - Product Hero',
    type: 'image',
    source: 'ai-studio',
    size: '2.8 MB',
    createdAt: '2024-12-26',
    status: 'ready',
    aiGenerated: true,
    folderId: 'promotional',
    tags: ['product'],
  },
  {
    id: '5',
    name: 'Weekly Q&A Session',
    type: 'video',
    source: 'live-stream',
    size: '890 MB',
    duration: '32:45',
    createdAt: '2024-12-26',
    status: 'processing',
    platforms: ['youtube'],
    tags: ['live', 'q&a'],
  },
  {
    id: '6',
    name: 'AI Video - How It Works',
    type: 'video',
    source: 'ai-studio',
    size: '256 MB',
    duration: '02:15',
    createdAt: '2024-12-25',
    status: 'scheduled',
    aiGenerated: true,
    scheduledDate: '2024-12-30 15:00',
    platforms: ['youtube', 'facebook'],
    folderId: 'tutorials',
    tags: ['tutorial', 'demo'],
  },
  {
    id: '7',
    name: 'Brand Logo Animation',
    type: 'video',
    source: 'upload',
    size: '45 MB',
    duration: '00:12',
    createdAt: '2024-12-25',
    status: 'ready',
    folderId: 'archive',
    tags: [],
  },
  {
    id: '8',
    name: 'Live Demo - New Features',
    type: 'video',
    source: 'live-stream',
    size: '1.5 GB',
    duration: '58:30',
    createdAt: '2024-12-24',
    status: 'ready',
    platforms: ['youtube', 'twitch'],
    views: 15320,
    folderId: 'product-reviews',
    tags: ['demo', 'live'],
  },
]

// 소스 아이콘 및 라벨
function getSourceInfo(source: Asset['source']) {
  switch (source) {
    case 'ai-studio':
      return { icon: Sparkles, label: 'AI Studio', color: 'text-[var(--secondary)]' }
    case 'live-stream':
      return { icon: Radio, label: 'Live Stream', color: 'text-[var(--secondary)]' }
    case 'upload':
      return { icon: Upload, label: 'Upload', color: 'text-[var(--secondary)]' }
  }
}

// 타입 아이콘
function getAssetIcon(type: Asset['type']) {
  switch (type) {
    case 'video':
      return Video
    case 'image':
      return ImageIcon
    case 'audio':
      return Music
  }
}

// 플랫폼 아이콘
function getPlatformIcon(platform: string) {
  switch (platform) {
    case 'youtube':
      return Youtube
    case 'facebook':
      return Facebook
    case 'instagram':
      return Instagram
    default:
      return Share2
  }
}

// 상태 배지
function StatusBadge({ status }: { status: Asset['status'] }) {
  const config = {
    ready: { label: 'Ready', className: 'bg-[var(--success)]/10 text-[var(--success)]' },
    processing: { label: 'Processing', className: 'bg-[var(--secondary)]/10 text-[var(--secondary)]' },
    scheduled: { label: 'Scheduled', className: 'bg-[var(--secondary)]/10 text-[var(--secondary)]' },
  }

  const { label, className } = config[status]

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}

// 에셋 그리드 카드
function AssetGridCard({
  asset,
  isSelected,
  onSelect,
  onClick,
  onSchedule
}: {
  asset: Asset
  isSelected: boolean
  onSelect: (id: string) => void
  onClick: (asset: Asset) => void
  onSchedule: (asset: Asset) => void
}) {
  const [showMenu, setShowMenu] = useState(false)
  const Icon = getAssetIcon(asset.type)
  const sourceInfo = getSourceInfo(asset.source)
  const SourceIcon = sourceInfo.icon

  return (
    <div className={`bg-[var(--card-bg)] border-2 rounded-xl overflow-hidden group hover:border-[var(--secondary)] transition-colors relative ${isSelected ? 'border-[var(--secondary)]' : 'border-[var(--border-color)]'}`}>
      {/* 체크박스 */}
      <div className="absolute top-2 left-2 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(asset.id)}
          onClick={(e) => e.stopPropagation()}
          className="w-5 h-5 rounded border-2 border-white cursor-pointer"
        />
      </div>

      {/* 썸네일 영역 */}
      <div
        className="relative aspect-video bg-[var(--background)] flex items-center justify-center cursor-pointer"
        onClick={() => onClick(asset)}
      >
        <Icon size={32} className="text-[var(--muted)]" />

        {/* AI 생성 배지 */}
        {asset.aiGenerated && (
          <div className="absolute top-2 left-12 flex items-center gap-1 px-2 py-1 bg-[var(--secondary)]/90 text-white text-xs rounded-md">
            <Sparkles size={12} />
            <span>AI</span>
          </div>
        )}

        {/* 상태 배지 */}
        <div className="absolute top-2 right-2">
          <StatusBadge status={asset.status} />
        </div>

        {/* 재생 시간 */}
        {asset.duration && (
          <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white text-xs rounded">
            {asset.duration}
          </span>
        )}

        {/* Processing 상태 */}
        {asset.status === 'processing' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2" />
              <span className="text-xs">Processing...</span>
            </div>
          </div>
        )}

        {/* 호버 시 액션 버튼 */}
        {asset.status === 'ready' && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            {asset.type === 'video' && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClick(asset)
                }}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              >
                <Play size={18} className="text-gray-900" />
              </button>
            )}
            {asset.type === 'image' && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClick(asset)
                }}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              >
                <Eye size={18} className="text-gray-900" />
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation()
                // TODO: Implement download
                console.log('Download asset:', asset.id)
              }}
              className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowDownToLine size={18} className="text-gray-900" />
            </button>
          </div>
        )}
      </div>

      {/* 카드 정보 */}
      <div className="p-3">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-sm line-clamp-2 flex-1">{asset.name}</h3>
        </div>

        {/* 소스 및 크기 */}
        <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-2">
          <SourceIcon size={12} className={sourceInfo.color} />
          <span>{sourceInfo.label}</span>
          <span>•</span>
          <span>{asset.size}</span>
        </div>

        {/* 플랫폼 */}
        {asset.platforms && asset.platforms.length > 0 && (
          <div className="flex items-center gap-1.5 mb-2">
            {asset.platforms.slice(0, 3).map((platform) => {
              const PlatformIcon = getPlatformIcon(platform)
              return (
                <div
                  key={platform}
                  className="w-5 h-5 bg-[var(--background)] rounded flex items-center justify-center"
                >
                  <PlatformIcon size={12} className="text-[var(--muted)]" />
                </div>
              )
            })}
            {asset.platforms.length > 3 && (
              <span className="text-xs text-[var(--muted)]">+{asset.platforms.length - 3}</span>
            )}
          </div>
        )}

        {/* 뷰 수 또는 스케줄 */}
        {asset.views && (
          <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
            <Eye size={12} />
            <span>{asset.views.toLocaleString()} views</span>
          </div>
        )}
        {asset.scheduledDate && (
          <div className="flex items-center gap-1 text-xs text-[var(--secondary)]">
            <Calendar size={12} />
            <span>{asset.scheduledDate}</span>
          </div>
        )}

        {/* 생성 날짜 */}
        <div className="flex items-center gap-1 text-xs text-[var(--muted)] mt-2">
          <Clock size={12} />
          <span>{asset.createdAt}</span>
        </div>

        {/* Action Buttons */}
        {asset.status === 'ready' && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-[var(--border-color)]">
            {/* Schedule Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onSchedule(asset)
              }}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[var(--background)] hover:bg-[var(--border-color)] rounded-lg text-xs transition-colors"
            >
              <Send size={14} className="text-[var(--muted)]" />
            </button>
            {/* Edit Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                // TODO: Open edit modal or navigate to editor
                console.log('Edit asset:', asset.id)
              }}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[var(--background)] hover:bg-[var(--border-color)] rounded-lg text-xs transition-colors"
            >
              <Edit3 size={14} className="text-[var(--muted)]" />
            </button>
            {/* Copy/Duplicate Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigator.clipboard.writeText(window.location.origin + '/assets/' + asset.id)
                // TODO: Show toast notification
                console.log('Copied asset link:', asset.id)
              }}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[var(--background)] hover:bg-[var(--border-color)] rounded-lg text-xs transition-colors"
            >
              <Copy size={14} className="text-[var(--muted)]" />
            </button>
            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (window.confirm(`Delete "${asset.name}"?`)) {
                  // TODO: Implement delete
                  console.log('Delete asset:', asset.id)
                }
              }}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[var(--background)] hover:bg-[var(--border-color)] rounded-lg text-xs transition-colors"
            >
              <Trash2 size={14} className="text-[var(--muted)]" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// 에셋 리스트 행
function AssetListRow({
  asset,
  isSelected,
  onSelect,
  onClick,
  onSchedule
}: {
  asset: Asset
  isSelected: boolean
  onSelect: (id: string) => void
  onClick: (asset: Asset) => void
  onSchedule: (asset: Asset) => void
}) {
  const [showMenu, setShowMenu] = useState(false)
  const Icon = getAssetIcon(asset.type)
  const sourceInfo = getSourceInfo(asset.source)
  const SourceIcon = sourceInfo.icon

  return (
    <div className={`bg-[var(--card-bg)] border-2 rounded-lg p-4 group hover:border-[var(--secondary)] transition-colors ${isSelected ? 'border-[var(--secondary)]' : 'border-[var(--border-color)]'}`}>
      <div className="flex items-center gap-4">
        {/* 체크박스 */}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(asset.id)}
          onClick={(e) => e.stopPropagation()}
          className="w-5 h-5 rounded cursor-pointer flex-shrink-0"
        />

        {/* 썸네일 */}
        <div
          className="w-24 h-16 bg-[var(--background)] rounded flex items-center justify-center flex-shrink-0 cursor-pointer relative"
          onClick={() => onClick(asset)}
        >
          <Icon size={24} className="text-[var(--muted)]" />
          {asset.duration && (
            <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded">
              {asset.duration}
            </span>
          )}
          {asset.status === 'processing' && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* 정보 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-sm truncate cursor-pointer" onClick={() => onClick(asset)}>
              {asset.name}
            </h3>
            {asset.aiGenerated && (
              <div className="flex items-center gap-1 px-2 py-0.5 bg-[var(--secondary)]/10 text-[var(--secondary)] text-xs rounded">
                <Sparkles size={10} />
                <span>AI</span>
              </div>
            )}
            <StatusBadge status={asset.status} />
          </div>
          <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
            <div className="flex items-center gap-1">
              <SourceIcon size={12} className={sourceInfo.color} />
              <span>{sourceInfo.label}</span>
            </div>
            <span>•</span>
            <span>{asset.size}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{asset.createdAt}</span>
            </div>
            {asset.views && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Eye size={12} />
                  <span>{asset.views.toLocaleString()} views</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 플랫폼 */}
        {asset.platforms && asset.platforms.length > 0 && (
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {asset.platforms.slice(0, 4).map((platform) => {
              const PlatformIcon = getPlatformIcon(platform)
              return (
                <div
                  key={platform}
                  className="w-6 h-6 bg-[var(--background)] rounded flex items-center justify-center"
                >
                  <PlatformIcon size={14} className="text-[var(--muted)]" />
                </div>
              )
            })}
            {asset.platforms.length > 4 && (
              <span className="text-xs text-[var(--muted)]">+{asset.platforms.length - 4}</span>
            )}
          </div>
        )}

        {/* 액션 버튼 */}
        {asset.status === 'ready' && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onSchedule(asset)
              }}
              className="p-2 bg-[var(--background)] hover:bg-[var(--border-color)] rounded-lg transition-colors"
              title="Schedule"
            >
              <Send size={16} className="text-[var(--muted)]" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClick(asset)
              }}
              className="p-2 bg-[var(--background)] hover:bg-[var(--border-color)] rounded-lg transition-colors"
              title={asset.type === 'video' ? 'Play' : 'View'}
            >
              {asset.type === 'video' ? <Play size={16} className="text-[var(--muted)]" /> : <Eye size={16} className="text-[var(--muted)]" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                // TODO: Implement download
                console.log('Download asset:', asset.id)
              }}
              className="p-2 bg-[var(--background)] hover:bg-[var(--border-color)] rounded-lg transition-colors"
              title="Download"
            >
              <ArrowDownToLine size={16} className="text-[var(--muted)]" />
            </button>
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowMenu(!showMenu)
                }}
                className="p-2 bg-[var(--background)] hover:bg-[var(--border-color)] rounded-lg transition-colors"
                title="More"
              >
                <MoreVertical size={16} className="text-[var(--muted)]" />
              </button>
              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowMenu(false)
                    }}
                  />
                  <div className="absolute right-0 top-full mt-1 w-48 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-xl z-50">
                    <div className="py-1">
                      <div className="px-3 py-1.5 text-xs font-semibold text-[var(--muted)] uppercase">Move to folder</div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log('Move to root:', asset.id)
                          setShowMenu(false)
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--background)] text-left"
                      >
                        <Folder size={14} />
                        <span>No folder</span>
                      </button>
                      {sampleFolders.map((folder) => (
                        <button
                          key={folder.id}
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log('Move to:', folder.id, asset.id)
                            setShowMenu(false)
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--background)] text-left"
                        >
                          <Folder size={14} style={{ color: folder.color }} />
                          <span>{folder.name}</span>
                        </button>
                      ))}
                      <div className="border-t border-[var(--border-color)] my-1" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log('Delete:', asset.id)
                          setShowMenu(false)
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--background)] text-left text-red-500"
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Available platforms for scheduling
const AVAILABLE_PLATFORMS = [
  { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-500' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600' },
  { id: 'tiktok', name: 'TikTok', icon: Share2, color: 'text-[var(--foreground)]' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
]

const TIMEZONES = [
  { value: 'Asia/Seoul', label: '(GMT+09:00) Seoul' },
  { value: 'Asia/Tokyo', label: '(GMT+09:00) Tokyo' },
  { value: 'America/New_York', label: '(GMT-05:00) New York' },
  { value: 'America/Los_Angeles', label: '(GMT-08:00) Los Angeles' },
  { value: 'Europe/London', label: '(GMT+00:00) London' },
]

// Platform settings configuration
const PLATFORM_FIELDS: Record<string, { fields: string[]; labels: Record<string, string> }> = {
  youtube: {
    fields: ['streamKey', 'privacy', 'category'],
    labels: { streamKey: 'Stream Key', privacy: 'Privacy', category: 'Category' }
  },
  facebook: {
    fields: ['pageId', 'privacy'],
    labels: { pageId: 'Page ID', privacy: 'Privacy' }
  },
  tiktok: {
    fields: ['serverUrl', 'streamKey'],
    labels: { serverUrl: 'Server URL', streamKey: 'Stream Key' }
  },
  instagram: {
    fields: ['streamUrl', 'streamKey'],
    labels: { streamUrl: 'Stream URL', streamKey: 'Stream Key' }
  },
}

// Quick Schedule Modal
function QuickScheduleModal({
  asset,
  onClose,
}: {
  asset: Asset | null
  onClose: () => void
}) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [scheduledDate, setScheduledDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [timezone, setTimezone] = useState('Asia/Seoul')
  const [title, setTitle] = useState('')
  const [platformSettings, setPlatformSettings] = useState<Record<string, Record<string, string>>>({})

  if (!asset) return null

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    )
  }

  const updatePlatformSetting = (platformId: string, field: string, value: string) => {
    setPlatformSettings(prev => ({
      ...prev,
      [platformId]: { ...prev[platformId], [field]: value }
    }))
  }

  const handleSchedule = () => {
    console.log('Schedule:', {
      asset: asset.id,
      platforms: selectedPlatforms,
      platformSettings,
      date: scheduledDate,
      time: startTime,
      timezone,
      title: title || asset.name,
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-[var(--card-bg)] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
          <div>
            <h2 className="text-xl font-bold">Schedule Stream</h2>
            <p className="text-sm text-[var(--muted)] mt-1">{asset.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Platforms */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Select Platforms <span className="text-[var(--secondary)]">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {AVAILABLE_PLATFORMS.map((platform) => {
                const Icon = platform.icon
                const isSelected = selectedPlatforms.includes(platform.id)
                return (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                        : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-[var(--secondary)]' : 'bg-[var(--background)]'
                      }`}
                    >
                      <Icon
                        size={20}
                        className={isSelected ? 'text-white' : platform.color}
                      />
                    </div>
                    <span className="font-medium text-sm">{platform.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Title (optional) */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Stream Title (optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={asset.name}
              className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Date <span className="text-[var(--secondary)]">*</span>
              </label>
              <div className="relative">
                <Calendar
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Time <span className="text-[var(--secondary)]">*</span>
              </label>
              <div className="relative">
                <Clock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                />
              </div>
            </div>
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-sm font-medium mb-2">Timezone</label>
            <div className="relative">
              <Globe
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
              />
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Platform Settings */}
          {selectedPlatforms.length > 0 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium">Platform Settings</label>
              {selectedPlatforms.map(platformId => {
                const platform = AVAILABLE_PLATFORMS.find(p => p.id === platformId)
                const platformConfig = PLATFORM_FIELDS[platformId]
                if (!platform || !platformConfig) return null

                const Icon = platform.icon

                return (
                  <div key={platformId} className="p-4 bg-[var(--background)] rounded-lg border border-[var(--border-color)]">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon size={18} className={platform.color} />
                      <span className="font-medium text-sm">{platform.name} Settings</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {platformConfig.fields.map(field => (
                        <div key={field}>
                          <label className="block text-xs text-[var(--muted)] mb-1">
                            {platformConfig.labels[field]}
                          </label>
                          {field === 'privacy' ? (
                            <select
                              value={platformSettings[platformId]?.[field] || ''}
                              onChange={e => updatePlatformSetting(platformId, field, e.target.value)}
                              className="w-full px-3 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                            >
                              <option value="">Select privacy</option>
                              <option value="public">Public</option>
                              <option value="unlisted">Unlisted</option>
                              <option value="private">Private</option>
                            </select>
                          ) : field === 'category' ? (
                            <select
                              value={platformSettings[platformId]?.[field] || ''}
                              onChange={e => updatePlatformSetting(platformId, field, e.target.value)}
                              className="w-full px-3 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                            >
                              <option value="">Select category</option>
                              <option value="gaming">Gaming</option>
                              <option value="entertainment">Entertainment</option>
                              <option value="music">Music</option>
                              <option value="sports">Sports</option>
                              <option value="education">Education</option>
                            </select>
                          ) : (
                            <input
                              type="text"
                              value={platformSettings[platformId]?.[field] || ''}
                              onChange={e => updatePlatformSetting(platformId, field, e.target.value)}
                              placeholder={`Enter ${platformConfig.labels[field].toLowerCase()}`}
                              className="w-full px-3 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Summary */}
          <div className="p-4 bg-[var(--background)] rounded-lg">
            <h3 className="text-sm font-medium mb-2">Summary</h3>
            <div className="space-y-1 text-sm">
              <div>
                <span className="text-[var(--muted)]">Asset:</span>{' '}
                <span className="font-medium">{asset.name}</span>
              </div>
              <div>
                <span className="text-[var(--muted)]">Platforms:</span>{' '}
                <span className="font-medium">
                  {selectedPlatforms.length > 0
                    ? `${selectedPlatforms.length} selected`
                    : 'None selected'}
                </span>
              </div>
              {scheduledDate && startTime && (
                <div>
                  <span className="text-[var(--muted)]">Scheduled:</span>{' '}
                  <span className="font-medium">
                    {scheduledDate} at {startTime}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-[var(--border-color)]">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-[var(--border-color)] rounded-lg text-sm font-medium hover:bg-[var(--background)] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSchedule}
            disabled={selectedPlatforms.length === 0 || !scheduledDate || !startTime}
            className="px-6 py-2.5 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[#7c4fe0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Schedule Stream
          </button>
        </div>
      </div>
    </div>
  )
}

// Upload Modal
function UploadModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFolderId, setSelectedFolderId] = useState<string>('')
  const [newFolderName, setNewFolderName] = useState('')
  const [showNewFolder, setShowNewFolder] = useState(false)

  if (!isOpen) return null

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    setSelectedFiles(prev => [...prev, ...files])
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setSelectedFiles(prev => [...prev, ...files])
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpload = () => {
    console.log('Upload files:', selectedFiles)
    // TODO: Implement file upload
    onClose()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-[var(--card-bg)] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
          <div>
            <h2 className="text-xl font-bold">Upload Files</h2>
            <p className="text-sm text-[var(--muted)] mt-1">Upload videos, images, or audio files</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              isDragging
                ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
            }`}
          >
            <Upload size={48} className="text-[var(--muted)] mx-auto mb-4" />
            <p className="text-sm font-medium mb-1">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-xs text-[var(--muted)] mb-4">
              Supports: MP4, MOV, AVI, JPG, PNG, GIF, MP3, WAV
            </p>
            <input
              type="file"
              multiple
              accept="video/*,image/*,audio/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block px-4 py-2 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg text-sm font-medium cursor-pointer transition-colors"
            >
              Browse Files
            </label>
          </div>

          {/* Folder Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">Save to Folder</label>
            <div className="flex gap-2">
              <select
                value={selectedFolderId}
                onChange={(e) => setSelectedFolderId(e.target.value)}
                className="flex-1 px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
              >
                <option value="">No folder (Root)</option>
                {sampleFolders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowNewFolder(!showNewFolder)}
                className="px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--border-color)] transition-colors"
                title="New Folder"
              >
                <FolderPlus size={18} className="text-[var(--muted)]" />
              </button>
            </div>
            {showNewFolder && (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="New folder name..."
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                />
                <button
                  onClick={() => {
                    if (newFolderName.trim()) {
                      // TODO: 실제로는 폴더 생성 API 호출
                      console.log('Create folder:', newFolderName)
                      setNewFolderName('')
                      setShowNewFolder(false)
                    }
                  }}
                  className="px-4 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm hover:bg-[#7c4fe0] transition-colors"
                >
                  Create
                </button>
              </div>
            )}
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Selected Files ({selectedFiles.length})</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-lg border border-[var(--border-color)]"
                  >
                    <div className="w-10 h-10 bg-[var(--card-bg)] rounded flex items-center justify-center flex-shrink-0">
                      {file.type.startsWith('video/') ? (
                        <Video size={20} className="text-[var(--muted)]" />
                      ) : file.type.startsWith('image/') ? (
                        <ImageIcon size={20} className="text-[var(--muted)]" />
                      ) : (
                        <Music size={20} className="text-[var(--muted)]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-[var(--muted)]">{formatFileSize(file.size)}</p>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1.5 hover:bg-[var(--card-bg)] rounded transition-colors flex-shrink-0"
                    >
                      <X size={16} className="text-[var(--muted)]" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-[var(--border-color)]">
          <p className="text-sm text-[var(--muted)]">
            {selectedFiles.length > 0 && `${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''} selected`}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-[var(--border-color)] rounded-lg text-sm font-medium hover:bg-[var(--background)] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={selectedFiles.length === 0}
              className="px-6 py-2.5 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[#7c4fe0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Upload {selectedFiles.length > 0 && `(${selectedFiles.length})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// 미리보기 모달
function PreviewModal({
  asset,
  onClose,
  onSchedule,
}: {
  asset: Asset | null
  onClose: () => void
  onSchedule: (asset: Asset) => void
}) {
  if (!asset) return null

  const Icon = getAssetIcon(asset.type)
  const sourceInfo = getSourceInfo(asset.source)

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6" onClick={onClose}>
      <div className="bg-[var(--card-bg)] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
          <h2 className="text-xl font-bold">{asset.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Preview */}
        <div className="p-6">
          <div className="aspect-video bg-[var(--background)] rounded-xl flex items-center justify-center mb-6">
            <Icon size={64} className="text-[var(--muted)]" />
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs text-[var(--muted)] mb-1">Source</p>
              <p className="text-sm font-medium">{sourceInfo.label}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--muted)] mb-1">Size</p>
              <p className="text-sm font-medium">{asset.size}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--muted)] mb-1">Created</p>
              <p className="text-sm font-medium">{asset.createdAt}</p>
            </div>
            {asset.duration && (
              <div>
                <p className="text-xs text-[var(--muted)] mb-1">Duration</p>
                <p className="text-sm font-medium">{asset.duration}</p>
              </div>
            )}
            {asset.views && (
              <div>
                <p className="text-xs text-[var(--muted)] mb-1">Views</p>
                <p className="text-sm font-medium">{asset.views.toLocaleString()}</p>
              </div>
            )}
            {asset.platforms && asset.platforms.length > 0 && (
              <div className="col-span-2">
                <p className="text-xs text-[var(--muted)] mb-2">Platforms</p>
                <div className="flex items-center gap-2">
                  {asset.platforms.map((platform) => {
                    const PlatformIcon = getPlatformIcon(platform)
                    return (
                      <div
                        key={platform}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[var(--background)] rounded-lg"
                      >
                        <PlatformIcon size={14} className="text-[var(--muted)]" />
                        <span className="text-xs capitalize">{platform}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {asset.status === 'ready' && (
            <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-color)]">
              <button
                onClick={() => {
                  onClose()
                  onSchedule(asset)
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Send size={16} />
                <span>Schedule Stream</span>
              </button>
              <button
                onClick={() => {
                  // TODO: Implement download
                  console.log('Download asset:', asset.id)
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--background)] hover:bg-[var(--border-color)] border border-[var(--border-color)] rounded-lg text-sm font-medium transition-colors"
              >
                <ArrowDownToLine size={16} />
                <span>Download</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AssetsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortBy>('date-desc')
  const [selectedAssets, setSelectedAssets] = useState<string[]>([])
  const [previewAsset, setPreviewAsset] = useState<Asset | null>(null)
  const [scheduleAsset, setScheduleAsset] = useState<Asset | null>(null)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showFolderModal, setShowFolderModal] = useState(false)
  const [showTagFilter, setShowTagFilter] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [foldersExpanded, setFoldersExpanded] = useState(true)
  const [tagsExpanded, setTagsExpanded] = useState(true)
  const [showNewFolderInput, setShowNewFolderInput] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // 태그 토글
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  // 필터링 및 정렬
  const filteredAssets = sampleAssets
    .filter((asset) => {
      const matchesSource = sourceFilter === 'all' || asset.source === sourceFilter
      const matchesStatus = statusFilter === 'all' || asset.status === statusFilter
      const matchesSearch =
        searchQuery === '' || asset.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFolder = !selectedFolder || asset.folderId === selectedFolder
      const matchesTags = selectedTags.length === 0 ||
        (asset.tags && selectedTags.some(tag => asset.tags?.includes(tag)))
      return matchesSource && matchesStatus && matchesSearch && matchesFolder && matchesTags
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'date-asc':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'views-desc':
          return (b.views || 0) - (a.views || 0)
        case 'size-desc': {
          // Convert size strings like "428 MB" or "1.2 GB" to bytes for comparison
          const getSizeInBytes = (sizeStr: string): number => {
            const parts = sizeStr.split(' ')
            const value = parseFloat(parts[0])
            const unit = parts[1]?.toUpperCase()

            switch (unit) {
              case 'GB': return value * 1024 * 1024 * 1024
              case 'MB': return value * 1024 * 1024
              case 'KB': return value * 1024
              default: return value
            }
          }
          return getSizeInBytes(b.size) - getSizeInBytes(a.size)
        }
        default:
          return 0
      }
    })

  // 페이지네이션
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage)
  const paginatedAssets = filteredAssets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // 필터 변경시 첫 페이지로 리셋
  const resetToFirstPage = () => setCurrentPage(1)

  // 선택 핸들러
  const handleSelectAsset = (id: string) => {
    setSelectedAssets((prev) =>
      prev.includes(id) ? prev.filter((assetId) => assetId !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedAssets.length === filteredAssets.length) {
      setSelectedAssets([])
    } else {
      setSelectedAssets(filteredAssets.map((a) => a.id))
    }
  }

  const handleDeleteSelected = () => {
    if (window.confirm(`Delete ${selectedAssets.length} assets?`)) {
      setSelectedAssets([])
    }
  }

  // 통계
  const stats = {
    total: sampleAssets.length,
    aiGenerated: sampleAssets.filter((a) => a.aiGenerated).length,
    liveStreams: sampleAssets.filter((a) => a.source === 'live-stream').length,
    processing: sampleAssets.filter((a) => a.status === 'processing').length,
  }

  return (
    <div>
      <Header actions={<AssetsHeaderActions onUploadClick={() => setUploadModalOpen(true)} />} />

      <div className="p-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <HardDrive size={16} className="text-[var(--secondary)]" />
              <span className="text-xs text-[var(--muted)]">Total Assets</span>
            </div>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-[var(--secondary)]" />
              <span className="text-xs text-[var(--muted)]">AI Generated</span>
            </div>
            <p className="text-2xl font-bold">{stats.aiGenerated}</p>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Radio size={16} className="text-[var(--secondary)]" />
              <span className="text-xs text-[var(--muted)]">Live Streams</span>
            </div>
            <p className="text-2xl font-bold">{stats.liveStreams}</p>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-[var(--secondary)]" />
              <span className="text-xs text-[var(--muted)]">Processing</span>
            </div>
            <p className="text-2xl font-bold">{stats.processing}</p>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedAssets.length > 0 && (
          <div className="flex items-center justify-between p-4 bg-[var(--secondary)]/10 rounded-xl mb-6 border border-[var(--secondary)]/20">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedAssets.length === filteredAssets.length}
                onChange={handleSelectAll}
                className="w-5 h-5 rounded cursor-pointer"
              />
              <span className="text-sm font-medium">
                {selectedAssets.length} selected
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* Move to Folder Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-[var(--background)] hover:bg-[var(--border-color)] rounded-lg text-sm transition-colors">
                  <Folder size={16} />
                  <span>Move to</span>
                  <ChevronDown size={14} />
                </button>
                <div className="absolute right-0 top-full mt-1 w-48 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        console.log('Move to root:', selectedAssets)
                        setSelectedAssets([])
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--background)] text-left"
                    >
                      <Folder size={14} />
                      <span>No folder (Root)</span>
                    </button>
                    {sampleFolders.map((folder) => (
                      <button
                        key={folder.id}
                        onClick={() => {
                          console.log('Move to folder:', folder.id, selectedAssets)
                          setSelectedAssets([])
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--background)] text-left"
                      >
                        <Folder size={14} style={{ color: folder.color }} />
                        <span>{folder.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={handleDeleteSelected}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--background)] hover:bg-[var(--border-color)] rounded-lg text-sm transition-colors"
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[var(--background)] hover:bg-[var(--border-color)] rounded-lg text-sm transition-colors">
                <ArrowDownToLine size={16} />
                <span>Download</span>
              </button>
            </div>
          </div>
        )}

        {/* Filters and Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
              />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm w-64 focus:outline-none focus:border-[var(--secondary)]"
              />
            </div>

            {/* Source Filter */}
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value as SourceFilter)}
              className="px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
            >
              <option value="all">All Sources</option>
              <option value="ai-studio">AI Studio</option>
              <option value="live-stream">Live Streams</option>
              <option value="upload">Uploads</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
            >
              <option value="all">All Status</option>
              <option value="ready">Ready</option>
              <option value="processing">Processing</option>
              <option value="scheduled">Scheduled</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="views-desc">Most Views</option>
              <option value="size-desc">Largest Size</option>
            </select>
          </div>

          {/* View Mode Toggle & Folder Management */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-[var(--background)] p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[var(--card-bg)] text-[var(--foreground)]'
                    : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                }`}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[var(--card-bg)] text-[var(--foreground)]'
                    : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                }`}
              >
                <List size={18} />
              </button>
            </div>

            {/* Folder Button with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  sidebarOpen
                    ? 'bg-[var(--secondary)] text-white'
                    : 'bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]'
                }`}
                title="Folder Management"
              >
                <Folder size={18} />
              </button>

              {/* Folder Dropdown Panel */}
              {sidebarOpen && (
                <>
                  {/* Backdrop for closing */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setSidebarOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-72 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl shadow-2xl z-50 overflow-hidden">
                    <div className="p-4">
                    {/* Folders Section */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setFoldersExpanded(!foldersExpanded)}
                          className="flex items-center gap-2 text-sm font-semibold hover:text-[var(--secondary)] transition-colors"
                        >
                          {foldersExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          <Folder size={16} />
                          <span>Folders</span>
                        </button>
                        <button
                          onClick={() => setShowNewFolderInput(!showNewFolderInput)}
                          className="p-1 hover:bg-[var(--background)] rounded transition-colors"
                          title="New Folder"
                        >
                          <Plus size={16} className="text-[var(--muted)] hover:text-[var(--secondary)]" />
                        </button>
                      </div>
                      {/* New Folder Input */}
                      {showNewFolderInput && (
                        <div className="mt-3 flex gap-2">
                          <input
                            type="text"
                            placeholder="Folder name..."
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && newFolderName.trim()) {
                                console.log('Create folder:', newFolderName)
                                setNewFolderName('')
                                setShowNewFolderInput(false)
                              }
                            }}
                            className="flex-1 px-2 py-1.5 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                            autoFocus
                          />
                          <button
                            onClick={() => {
                              if (newFolderName.trim()) {
                                console.log('Create folder:', newFolderName)
                                setNewFolderName('')
                                setShowNewFolderInput(false)
                              }
                            }}
                            className="px-2 py-1.5 bg-[var(--secondary)] text-white rounded-lg text-sm hover:bg-[#7c4fe0] transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      )}
                      {foldersExpanded && (
                        <div className="mt-3 space-y-1 pl-6">
                          <button
                            onClick={() => setSelectedFolder(null)}
                            className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                              !selectedFolder
                                ? 'bg-[var(--secondary)]/10 text-[var(--secondary)]'
                                : 'hover:bg-[var(--background)]'
                            }`}
                          >
                            <Folder size={14} />
                            <span>All Files</span>
                          </button>
                          {sampleFolders.map((folder) => (
                            <button
                              key={folder.id}
                              onClick={() => setSelectedFolder(folder.id)}
                              className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                                selectedFolder === folder.id
                                  ? 'bg-[var(--secondary)]/10 text-[var(--secondary)]'
                                  : 'hover:bg-[var(--background)]'
                              }`}
                            >
                              <Folder size={14} style={{ color: folder.color }} />
                              <span className="flex-1 text-left">{folder.name}</span>
                              <span className="text-xs text-[var(--muted)]">{folder.count}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-[var(--border-color)] my-3" />

                    {/* Tags Section */}
                    <div>
                      <button
                        onClick={() => setTagsExpanded(!tagsExpanded)}
                        className="flex items-center gap-2 text-sm font-semibold hover:text-[var(--secondary)] transition-colors w-full"
                      >
                        {tagsExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        <Tag size={16} />
                        <span>Tags</span>
                      </button>
                      {tagsExpanded && (
                        <div className="mt-3 pl-6">
                          <div className="flex flex-wrap gap-2">
                            {availableTags.map((tag) => (
                              <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`px-2 py-1 rounded-full text-xs transition-colors ${
                                  selectedTags.includes(tag)
                                    ? 'bg-[var(--secondary)] text-white'
                                    : 'bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]'
                                }`}
                              >
                                #{tag}
                              </button>
                            ))}
                          </div>
                          {selectedTags.length > 0 && (
                            <button
                              onClick={() => setSelectedTags([])}
                              className="mt-3 text-xs text-[var(--secondary)] hover:underline"
                            >
                              Clear all tags
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Assets Grid/List */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 mt-6">
          <p className="text-xs text-[var(--muted)] mb-4">Media files from AI Studio, live streams, and uploads</p>
        {filteredAssets.length === 0 ? (
          <div className="text-center py-16">
            <HardDrive size={48} className="text-[var(--muted)] mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No assets found</h3>
            <p className="text-sm text-[var(--muted)]">
              Try adjusting your filters or create new content from AI Studio or Live Streams
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedAssets.map((asset) => (
              <AssetGridCard
                key={asset.id}
                asset={asset}
                isSelected={selectedAssets.includes(asset.id)}
                onSelect={handleSelectAsset}
                onClick={setPreviewAsset}
                onSchedule={setScheduleAsset}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {paginatedAssets.map((asset) => (
              <AssetListRow
                key={asset.id}
                asset={asset}
                isSelected={selectedAssets.includes(asset.id)}
                onSelect={handleSelectAsset}
                onClick={setPreviewAsset}
                onSchedule={setScheduleAsset}
              />
            ))}
          </div>
        )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--border-color)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--border-color)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  if (totalPages <= 7) return true
                  if (page === 1 || page === totalPages) return true
                  if (Math.abs(page - currentPage) <= 1) return true
                  return false
                })
                .map((page, idx, arr) => {
                  const showEllipsis = idx > 0 && page - arr[idx - 1] > 1
                  return (
                    <div key={page} className="flex items-center gap-1">
                      {showEllipsis && <span className="px-2 text-[var(--muted)]">...</span>}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-[40px] px-3 py-2 text-sm rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-[var(--secondary)] text-white'
                            : 'bg-[var(--background)] border border-[var(--border-color)] hover:bg-[var(--border-color)]'
                        }`}
                      >
                        {page}
                      </button>
                    </div>
                  )
                })}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--border-color)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--border-color)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Last
            </button>

            <span className="ml-4 text-sm text-[var(--muted)]">
              {filteredAssets.length} items / Page {currentPage} of {totalPages}
            </span>
          </div>
        )}

        {/* Upload Modal */}
        <UploadModal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} />

        {/* Quick Schedule Modal */}
        <QuickScheduleModal asset={scheduleAsset} onClose={() => setScheduleAsset(null)} />

        {/* Preview Modal */}
        <PreviewModal
          asset={previewAsset}
          onClose={() => setPreviewAsset(null)}
          onSchedule={setScheduleAsset}
        />
      </div>
    </div>
  )
}
