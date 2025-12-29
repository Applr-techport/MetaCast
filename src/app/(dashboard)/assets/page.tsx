'use client'

import { Header } from '@/components/layout/Header'
import { useState } from 'react'
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
  Folder,
  Upload,
  Plus,
  Clock,
  HardDrive,
  Trash2,
  Download,
  Edit3,
} from 'lucide-react'

type ViewMode = 'grid' | 'list'
type AssetType = 'all' | 'video' | 'image' | 'audio'

interface Asset {
  id: string
  name: string
  type: 'video' | 'image' | 'audio'
  size: string
  duration?: string
  createdAt: string
  thumbnail?: string
  status: 'ready' | 'processing' | 'error'
}

// 샘플 데이터
const sampleAssets: Asset[] = [
  {
    id: '1',
    name: 'Product Launch Video.mp4',
    type: 'video',
    size: '256 MB',
    duration: '02:34',
    createdAt: '2024-12-25',
    status: 'ready',
  },
  {
    id: '2',
    name: 'Brand Introduction.mp4',
    type: 'video',
    size: '128 MB',
    duration: '01:45',
    createdAt: '2024-12-24',
    status: 'ready',
  },
  {
    id: '3',
    name: 'Hero Banner.png',
    type: 'image',
    size: '4.2 MB',
    createdAt: '2024-12-23',
    status: 'ready',
  },
  {
    id: '4',
    name: 'Background Music.mp3',
    type: 'audio',
    size: '8.5 MB',
    duration: '03:22',
    createdAt: '2024-12-22',
    status: 'ready',
  },
  {
    id: '5',
    name: 'Tutorial Part 1.mp4',
    type: 'video',
    size: '512 MB',
    duration: '08:15',
    createdAt: '2024-12-21',
    status: 'processing',
  },
  {
    id: '6',
    name: 'Product Photo 1.jpg',
    type: 'image',
    size: '2.8 MB',
    createdAt: '2024-12-20',
    status: 'ready',
  },
]

// 아이콘 매핑
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

// 에셋 그리드 카드
function AssetGridCard({ asset }: { asset: Asset }) {
  const Icon = getAssetIcon(asset.type)

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden group hover:border-[var(--primary)] transition-colors">
      {/* 썸네일 영역 */}
      <div className="relative aspect-video bg-[var(--background)] flex items-center justify-center">
        <Icon size={32} className="text-[var(--muted)]" />
        {asset.duration && (
          <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white text-xs rounded">
            {asset.duration}
          </span>
        )}
        {asset.status === 'processing' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2" />
              <span className="text-xs">Processing...</span>
            </div>
          </div>
        )}
        {/* 호버 시 액션 버튼 */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          {asset.type === 'video' && (
            <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
              <Play size={16} className="text-black" />
            </button>
          )}
          <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
            <Download size={16} className="text-black" />
          </button>
          <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
            <Trash2 size={16} className="text-black" />
          </button>
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{asset.name}</p>
            <p className="text-xs text-[var(--muted)] mt-1">
              {asset.size} • {asset.createdAt}
            </p>
          </div>
          <button className="p-1 hover:bg-[var(--background)] rounded transition-colors">
            <MoreVertical size={16} className="text-[var(--muted)]" />
          </button>
        </div>
      </div>
    </div>
  )
}

// 에셋 리스트 행
function AssetListRow({ asset }: { asset: Asset }) {
  const Icon = getAssetIcon(asset.type)

  return (
    <div className="flex items-center gap-4 p-4 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg hover:border-[var(--primary)] transition-colors">
      {/* 아이콘 */}
      <div className="w-12 h-12 bg-[var(--background)] rounded-lg flex items-center justify-center">
        <Icon size={24} className="text-[var(--muted)]" />
      </div>

      {/* 이름 */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{asset.name}</p>
        <p className="text-xs text-[var(--muted)] mt-0.5">{asset.type}</p>
      </div>

      {/* 크기 */}
      <div className="w-20 text-sm text-[var(--muted)]">{asset.size}</div>

      {/* 시간 */}
      <div className="w-16 text-sm text-[var(--muted)]">{asset.duration || '-'}</div>

      {/* 날짜 */}
      <div className="w-24 text-sm text-[var(--muted)]">{asset.createdAt}</div>

      {/* 상태 */}
      <div className="w-20">
        {asset.status === 'ready' ? (
          <span className="px-2 py-1 bg-[var(--success)]/10 text-[var(--success)] text-xs rounded-full">
            Ready
          </span>
        ) : (
          <span className="px-2 py-1 bg-yellow-500/10 text-yellow-600 text-xs rounded-full">
            Processing
          </span>
        )}
      </div>

      {/* 액션 */}
      <div className="flex items-center gap-1">
        <button className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors">
          <Download size={16} className="text-[var(--muted)]" />
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

// 스토리지 요약 카드
function StorageSummary() {
  const storageData = [
    { label: 'Videos', size: '1.2 GB', color: '#3b82f6' },
    { label: 'Images', size: '256 MB', color: '#22c55e' },
    { label: 'Audio', size: '128 MB', color: '#f59e0b' },
  ]

  const totalUsed = 1.6 // GB
  const totalAvailable = 5 // GB
  const percentage = (totalUsed / totalAvailable) * 100

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <HardDrive size={20} className="text-[var(--muted)]" />
        <h3 className="font-semibold">Storage</h3>
      </div>

      {/* 프로그레스 바 */}
      <div className="h-3 bg-[var(--background)] rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-[var(--primary)] rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between text-sm mb-4">
        <span className="text-[var(--muted)]">{totalUsed} GB used</span>
        <span className="font-medium">{totalAvailable} GB total</span>
      </div>

      {/* 타입별 사용량 */}
      <div className="space-y-2">
        {storageData.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[var(--muted)]">{item.label}</span>
            </div>
            <span className="font-medium">{item.size}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 빠른 액세스 폴더
function QuickAccess() {
  const folders = [
    { name: 'Recent', count: 12 },
    { name: 'Favorites', count: 5 },
    { name: 'Shortforms', count: 28 },
    { name: 'Live Recordings', count: 8 },
  ]

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
      <h3 className="font-semibold mb-4">Quick Access</h3>
      <div className="space-y-2">
        {folders.map((folder) => (
          <button
            key={folder.name}
            className="w-full flex items-center gap-3 p-2 hover:bg-[var(--background)] rounded-lg transition-colors text-left"
          >
            <Folder size={18} className="text-[var(--muted)]" />
            <span className="flex-1 text-sm">{folder.name}</span>
            <span className="text-xs text-[var(--muted)]">{folder.count}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function AssetsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [assetType, setAssetType] = useState<AssetType>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAssets = sampleAssets.filter((asset) => {
    if (assetType !== 'all' && asset.type !== assetType) return false
    if (searchQuery && !asset.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

  return (
    <div className="min-h-screen">
      <Header />

      <div className="p-6">
        <div className="flex gap-6">
          {/* 메인 콘텐츠 */}
          <div className="flex-1">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Assets</h1>
              <button className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors">
                <Upload size={18} />
                Upload
              </button>
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
                  placeholder="Search assets..."
                  className="w-full pl-10 pr-4 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                />
              </div>

              {/* 타입 필터 */}
              <div className="flex gap-2">
                {(['all', 'video', 'image', 'audio'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setAssetType(type)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      assetType === type
                        ? 'bg-[var(--primary)] text-white'
                        : 'bg-[var(--card-bg)] border border-[var(--border-color)] hover:bg-[var(--background)]'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
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

            {/* 에셋 목록 */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredAssets.map((asset) => (
                  <AssetGridCard key={asset.id} asset={asset} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {/* 리스트 헤더 */}
                <div className="flex items-center gap-4 px-4 py-2 text-xs text-[var(--muted)] font-medium">
                  <div className="w-12" />
                  <div className="flex-1">Name</div>
                  <div className="w-20">Size</div>
                  <div className="w-16">Duration</div>
                  <div className="w-24">Date</div>
                  <div className="w-20">Status</div>
                  <div className="w-24">Actions</div>
                </div>
                {filteredAssets.map((asset) => (
                  <AssetListRow key={asset.id} asset={asset} />
                ))}
              </div>
            )}

            {/* 결과 없음 */}
            {filteredAssets.length === 0 && (
              <div className="text-center py-12">
                <Folder size={48} className="mx-auto text-[var(--muted)] mb-4" />
                <p className="text-[var(--muted)]">No assets found</p>
              </div>
            )}
          </div>

          {/* 사이드바 */}
          <div className="w-72 space-y-4">
            <StorageSummary />
            <QuickAccess />
          </div>
        </div>
      </div>
    </div>
  )
}
