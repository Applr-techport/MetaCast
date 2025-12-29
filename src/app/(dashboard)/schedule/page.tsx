'use client'

import { Header } from '@/components/layout/Header'
import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Video,
  Package,
  Search,
  X,
  Calendar as CalendarIcon,
  Edit3,
  Plus,
  Globe,
  Youtube,
  Facebook,
  Twitter,
  Trash2,
  AlertTriangle,
  Clock,
  Link2,
  ExternalLink,
} from 'lucide-react'

// 사용 가능한 플랫폼 목록
const AVAILABLE_PLATFORMS = [
  { id: 'youtube', name: 'YouTube', icon: 'youtube', color: 'text-red-500' },
  { id: 'facebook', name: 'Facebook', icon: 'facebook', color: 'text-blue-600' },
  { id: 'tiktok', name: 'TikTok', icon: 'tiktok', color: 'text-[var(--foreground)]' },
  { id: 'kakao', name: 'Kakao TV', icon: 'kakao', color: 'text-yellow-500' },
  { id: 'twitch', name: 'Twitch', icon: 'twitch', color: 'text-purple-500' },
  { id: 'instagram', name: 'Instagram', icon: 'instagram', color: 'text-pink-500' },
]

// 상품 데이터 타입
interface Product {
  id: string
  name: string
  quantity: number
  price: number
  image?: string
}

// 스케줄 상세 데이터 타입
interface ScheduleDetail {
  id: string
  type: 'live' | 'pre-recorded'
  title: string
  description?: string
  thumbnail?: string
  scheduledDate: string
  startTime: string
  endTime: string
  endDate?: string // 자정 넘어가는 스트림용
  timezone: string
  realTime?: string
  status: 'scheduled' | 'standby' | 'live' | 'end'
  broadcaster: string
  deleteAfterLive: boolean
  size?: string
  channels: { name: string; url: string }[]
  platforms: { id: string; name: string; icon: string }[]
  products: Product[]
  shoppingMall?: string
  duration?: string
}

// 삭제 확인 모달
function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
      <div className="bg-[var(--card-bg)] rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle size={24} className="text-red-500" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Delete Schedule</h3>
            <p className="text-sm text-[var(--muted)]">This action cannot be undone</p>
          </div>
        </div>
        <p className="text-sm mb-6">
          Are you sure you want to delete <strong>"{title}"</strong>?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[var(--background)] text-[var(--foreground)] rounded-lg text-sm font-medium hover:bg-[var(--border-color)] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

// 플랫폼 선택 모달
function PlatformSelectModal({
  isOpen,
  onClose,
  selectedPlatforms,
  onTogglePlatform,
}: {
  isOpen: boolean
  onClose: () => void
  selectedPlatforms: { id: string; name: string; icon: string }[]
  onTogglePlatform: (platform: { id: string; name: string; icon: string }) => void
}) {
  if (!isOpen) return null

  const isSelected = (id: string) => selectedPlatforms.some(p => p.id === id)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
      <div className="bg-[var(--card-bg)] rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Select Platforms</h3>
          <button onClick={onClose} className="p-1 hover:bg-[var(--background)] rounded">
            <X size={20} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {AVAILABLE_PLATFORMS.map(platform => (
            <button
              key={platform.id}
              onClick={() => onTogglePlatform({ id: platform.id, name: platform.name, icon: platform.icon })}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${
                isSelected(platform.id)
                  ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                  : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${platform.color}`}>
                {platform.icon === 'youtube' && <Youtube size={20} />}
                {platform.icon === 'facebook' && <Facebook size={20} />}
                {platform.icon === 'tiktok' && <span className="text-sm font-bold">TT</span>}
                {platform.icon === 'kakao' && <span className="text-sm font-bold">K</span>}
                {platform.icon === 'twitch' && <span className="text-sm font-bold">Tw</span>}
                {platform.icon === 'instagram' && <span className="text-sm font-bold">IG</span>}
              </div>
              <span className="text-sm font-medium">{platform.name}</span>
            </button>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="text-sm text-[var(--secondary)] hover:underline"
          >
            + Add Custom Channel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[#7c4fe0] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

// 채널 추가 모달
function ChannelAddModal({
  isOpen,
  onClose,
  onAdd,
}: {
  isOpen: boolean
  onClose: () => void
  onAdd: (channel: { name: string; url: string }) => void
}) {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  if (!isOpen) return null

  const handleSubmit = () => {
    if (name && url) {
      onAdd({ name, url })
      setName('')
      setUrl('')
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
      <div className="bg-[var(--card-bg)] rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Add Custom Channel</h3>
          <button onClick={onClose} className="p-1 hover:bg-[var(--background)] rounded">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm text-[var(--muted)] mb-1 block">Channel Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Website"
              className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-[var(--muted)] mb-1 block">RTMP URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="rtmp://example.com/live/stream-key"
              className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[var(--background)] text-[var(--foreground)] rounded-lg text-sm font-medium hover:bg-[var(--border-color)] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[#7c4fe0] transition-colors"
          >
            Add Channel
          </button>
        </div>
      </div>
    </div>
  )
}

// Schedule Detail 모달
function ScheduleDetailModal({
  isOpen,
  onClose,
  schedule,
  onEdit,
  onDelete,
}: {
  isOpen: boolean
  onClose: () => void
  schedule: ScheduleDetail | null
  onEdit: (schedule: ScheduleDetail) => void
  onDelete: (id: string) => void
}) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [editedSchedule, setEditedSchedule] = useState<ScheduleDetail | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showPlatformSelect, setShowPlatformSelect] = useState(false)
  const [showChannelAdd, setShowChannelAdd] = useState(false)

  // schedule이 변경될 때 editedSchedule 초기화
  const scheduleId = schedule?.id
  if (schedule && editedSchedule?.id !== scheduleId) {
    setEditedSchedule({ ...schedule })
  }

  if (!isOpen || !schedule) return null

  const statusColors = {
    scheduled: 'text-[var(--secondary)]',
    standby: 'text-yellow-500',
    live: 'text-[var(--accent)]',
    end: 'text-[var(--muted)]',
  }

  const statusLabels = {
    scheduled: 'Scheduled',
    standby: 'Stand by',
    live: 'Live',
    end: 'End',
  }

  const handleSave = () => {
    if (editedSchedule) {
      onEdit(editedSchedule)
      setIsEditMode(false)
    }
  }

  const handleCancel = () => {
    setEditedSchedule({ ...schedule })
    setIsEditMode(false)
  }

  const handleDelete = () => {
    onDelete(schedule.id)
    setShowDeleteConfirm(false)
    onClose()
  }

  const handleClose = () => {
    setIsEditMode(false)
    setEditedSchedule(null)
    onClose()
  }

  const handleTogglePlatform = (platform: { id: string; name: string; icon: string }) => {
    if (!editedSchedule) return
    const exists = editedSchedule.platforms.some(p => p.id === platform.id)
    if (exists) {
      setEditedSchedule({
        ...editedSchedule,
        platforms: editedSchedule.platforms.filter(p => p.id !== platform.id)
      })
    } else {
      setEditedSchedule({
        ...editedSchedule,
        platforms: [...editedSchedule.platforms, platform]
      })
    }
  }

  const handleAddChannel = (channel: { name: string; url: string }) => {
    if (!editedSchedule) return
    setEditedSchedule({
      ...editedSchedule,
      channels: [...editedSchedule.channels, channel]
    })
  }

  const handleRemoveChannel = (index: number) => {
    if (!editedSchedule) return
    setEditedSchedule({
      ...editedSchedule,
      channels: editedSchedule.channels.filter((_, i) => i !== index)
    })
  }

  const handleRemovePlatform = (id: string) => {
    if (!editedSchedule) return
    setEditedSchedule({
      ...editedSchedule,
      platforms: editedSchedule.platforms.filter(p => p.id !== id)
    })
  }

  const currentData = isEditMode && editedSchedule ? editedSchedule : schedule

  const renderPlatformIcon = (icon: string) => {
    switch (icon) {
      case 'youtube': return <Youtube size={20} className="text-red-500" />
      case 'facebook': return <Facebook size={20} className="text-blue-600" />
      case 'tiktok': return <span className="text-sm font-bold">TT</span>
      case 'kakao': return <span className="text-sm font-bold text-yellow-500">K</span>
      case 'twitch': return <span className="text-sm font-bold text-purple-500">Tw</span>
      case 'instagram': return <span className="text-sm font-bold text-pink-500">IG</span>
      default: return <Video size={20} className="text-[var(--muted)]" />
    }
  }

  return (
    <>
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[var(--card-bg)] rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
          <h2 className="text-xl font-bold">
            {isEditMode ? 'Edit Schedule' : 'Schedule Detail'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* 컨텐츠 */}
        <div className="p-6">
          <div className="flex gap-8">
            {/* 왼쪽: 썸네일 + 기본 정보 */}
            <div className="flex-1">
              {/* 썸네일/프리뷰 */}
              <div className="relative aspect-video bg-[var(--background)] rounded-xl flex items-center justify-center mb-4">
                {schedule.status === 'end' && schedule.duration ? (
                  <>
                    <Play size={48} className="text-[var(--foreground)]" />
                    <span className="absolute bottom-3 left-3 px-2 py-1 bg-black/70 text-white text-sm rounded">
                      {schedule.duration}
                    </span>
                  </>
                ) : (
                  <span className="text-[var(--muted)]">Wait for livestream...</span>
                )}
              </div>

              {/* 타입 */}
              <div className="text-xs text-[var(--muted)] uppercase tracking-wide mb-1">
                {isEditMode ? (
                  <select
                    value={editedSchedule?.type || 'live'}
                    onChange={(e) => setEditedSchedule(prev => prev ? { ...prev, type: e.target.value as 'live' | 'pre-recorded' } : null)}
                    className="px-2 py-1 bg-[var(--background)] border border-[var(--border-color)] rounded text-xs"
                  >
                    <option value="live">LIVESTREAM</option>
                    <option value="pre-recorded">PRE-RECORDED LIVESTREAM</option>
                  </select>
                ) : (
                  currentData.type === 'live' ? 'LIVESTREAM' : 'PRE-RECORDED LIVESTREAM'
                )}
              </div>

              {/* 제목 */}
              <div className="flex items-center gap-2 mb-4">
                {isEditMode ? (
                  <input
                    type="text"
                    value={editedSchedule?.title || ''}
                    onChange={(e) => setEditedSchedule(prev => prev ? { ...prev, title: e.target.value } : null)}
                    className="text-xl font-bold bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-3 py-2 w-full"
                  />
                ) : (
                  <>
                    <h3 className="text-xl font-bold">{currentData.title}</h3>
                    <button
                      onClick={() => setIsEditMode(true)}
                      className="p-1 hover:bg-[var(--background)] rounded transition-colors"
                    >
                      <Edit3 size={16} className="text-[var(--muted)]" />
                    </button>
                  </>
                )}
              </div>

              {/* 날짜/시간 정보 */}
              <div className="space-y-3">
                {/* 날짜 */}
                <div className="flex items-center gap-3 text-sm">
                  <CalendarIcon size={18} className="text-[var(--muted)]" />
                  <span className="text-[var(--muted)] w-20">Date</span>
                  {isEditMode ? (
                    <input
                      type="date"
                      value={editedSchedule?.scheduledDate || ''}
                      onChange={(e) => setEditedSchedule(prev => prev ? { ...prev, scheduledDate: e.target.value } : null)}
                      className="flex-1 px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm"
                    />
                  ) : (
                    <span className="font-medium">{currentData.scheduledDate}</span>
                  )}
                </div>

                {/* 시작 시간 */}
                <div className="flex items-center gap-3 text-sm">
                  <Clock size={18} className="text-[var(--muted)]" />
                  <span className="text-[var(--muted)] w-20">Start</span>
                  {isEditMode ? (
                    <input
                      type="time"
                      value={editedSchedule?.startTime || ''}
                      onChange={(e) => setEditedSchedule(prev => prev ? { ...prev, startTime: e.target.value } : null)}
                      className="flex-1 px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm"
                    />
                  ) : (
                    <span className="font-medium">{currentData.startTime}</span>
                  )}
                </div>

                {/* 종료 시간 */}
                <div className="flex items-center gap-3 text-sm">
                  <Clock size={18} className="text-[var(--muted)]" />
                  <span className="text-[var(--muted)] w-20">End</span>
                  {isEditMode ? (
                    <input
                      type="time"
                      value={editedSchedule?.endTime || ''}
                      onChange={(e) => setEditedSchedule(prev => prev ? { ...prev, endTime: e.target.value } : null)}
                      className="flex-1 px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm"
                    />
                  ) : (
                    <span className="font-medium">{currentData.endTime}</span>
                  )}
                </div>
              </div>
            </div>

            {/* 오른쪽: 상세 정보 */}
            <div className="w-80 space-y-6">
              {/* Broadcast platforms (위로 이동) */}
              <div>
                <h4 className="text-sm font-medium mb-3">Broadcast Platforms</h4>
                <div className="flex flex-wrap items-center gap-2">
                  {currentData.platforms.map((platform, i) => (
                    <div
                      key={i}
                      className="relative w-12 h-12 bg-[var(--background)] rounded-lg flex items-center justify-center group"
                    >
                      {renderPlatformIcon(platform.icon)}
                      {isEditMode && (
                        <button
                          onClick={() => handleRemovePlatform(platform.id)}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setIsEditMode(true)
                      setShowPlatformSelect(true)
                    }}
                    className="w-12 h-12 bg-[var(--background)] rounded-lg flex items-center justify-center hover:bg-[var(--border-color)] transition-colors border-2 border-dashed border-[var(--border-color)]"
                  >
                    <Plus size={20} className="text-[var(--muted)]" />
                  </button>
                </div>
                <p className="text-xs text-[var(--muted)] mt-2">YouTube, TikTok, Facebook, Kakao TV...</p>
              </div>

              {/* Custom Channels (아래로 이동) */}
              <div>
                <h4 className="text-sm font-medium mb-3">Custom Channels (RTMP)</h4>
                <div className="space-y-2">
                  {currentData.channels.map((channel, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2 bg-[var(--background)] rounded-lg group"
                    >
                      <Link2 size={16} className="text-[var(--muted)]" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{channel.name}</div>
                        <div className="text-xs text-[var(--muted)] truncate">{channel.url}</div>
                      </div>
                      {isEditMode && (
                        <button
                          onClick={() => handleRemoveChannel(i)}
                          className="p-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setIsEditMode(true)
                      setShowChannelAdd(true)
                    }}
                    className="w-full p-2 border-2 border-dashed border-[var(--border-color)] rounded-lg text-sm text-[var(--muted)] hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    Add Custom Channel
                  </button>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between py-2 border-b border-[var(--border-color)]">
                <span className="text-sm text-[var(--muted)]">Status</span>
                {isEditMode ? (
                  <select
                    value={editedSchedule?.status || 'scheduled'}
                    onChange={(e) => setEditedSchedule(prev => prev ? { ...prev, status: e.target.value as ScheduleDetail['status'] } : null)}
                    className="px-2 py-1 bg-[var(--background)] border border-[var(--border-color)] rounded text-sm"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="standby">Stand by</option>
                    <option value="live">Live</option>
                    <option value="end">End</option>
                  </select>
                ) : (
                  <span className={`text-sm font-medium ${statusColors[currentData.status]}`}>
                    {statusLabels[currentData.status]}
                  </span>
                )}
              </div>

              {/* Broadcaster */}
              <div className="flex items-center justify-between py-2 border-b border-[var(--border-color)]">
                <span className="text-sm text-[var(--muted)]">Broadcaster</span>
                {isEditMode ? (
                  <input
                    type="text"
                    value={editedSchedule?.broadcaster || ''}
                    onChange={(e) => setEditedSchedule(prev => prev ? { ...prev, broadcaster: e.target.value } : null)}
                    className="px-2 py-1 bg-[var(--background)] border border-[var(--border-color)] rounded text-sm text-right"
                  />
                ) : (
                  <span className="text-sm font-medium">{currentData.broadcaster}</span>
                )}
              </div>

              {/* Size */}
              <div className="flex items-center justify-between py-2 border-b border-[var(--border-color)]">
                <span className="text-sm text-[var(--muted)]">Size</span>
                <span className="text-sm font-medium">{currentData.size || '-'}</span>
              </div>

              {/* Product Attached */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium">Product Attached ({currentData.products.length})</h4>
                  {currentData.shoppingMall && (
                    <span className="text-xs text-[var(--muted)] capitalize">{currentData.shoppingMall}</span>
                  )}
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {currentData.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-2 p-2 bg-[var(--background)] rounded-lg"
                    >
                      <div className="w-10 h-10 bg-[var(--border-color)] rounded-lg flex items-center justify-center">
                        <Video size={16} className="text-[var(--muted)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        <p className="text-xs text-[var(--muted)]">
                          Qty: {product.quantity} | ₩{product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {currentData.products.length === 0 && (
                    <p className="text-xs text-[var(--muted)] text-center py-4">No products attached</p>
                  )}
                </div>
                {isEditMode && (
                  <button className="w-full mt-2 p-2 border-2 border-dashed border-[var(--border-color)] rounded-lg text-sm text-[var(--muted)] hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-colors flex items-center justify-center gap-2">
                    <Plus size={16} />
                    Add Product
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 하단 버튼 - 보라색 스타일 */}
        <div className="flex justify-between p-4 border-t border-[var(--border-color)]">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-[var(--background)] text-[var(--foreground)] rounded-lg text-sm font-medium hover:bg-[var(--border-color)] transition-colors"
          >
            Cancel
          </button>
          <div className="flex gap-2">
            {isEditMode ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-[var(--background)] text-[var(--foreground)] rounded-lg text-sm font-medium hover:bg-[var(--border-color)] transition-colors"
                >
                  Discard
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[#7c4fe0] transition-colors"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 bg-[var(--background)] text-red-500 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setIsEditMode(true)}
                  className="px-4 py-2 bg-[var(--background)] text-[var(--foreground)] border border-[var(--border-color)] rounded-lg text-sm font-medium hover:bg-[var(--border-color)] transition-colors"
                >
                  Edit
                </button>
                {(schedule.status === 'live' || schedule.status === 'standby') && (
                  <Link
                    href={`/live/${schedule.id}`}
                    className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    Go Live Studio
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* 삭제 확인 모달 */}
    <DeleteConfirmModal
      isOpen={showDeleteConfirm}
      onClose={() => setShowDeleteConfirm(false)}
      onConfirm={handleDelete}
      title={schedule.title}
    />

    {/* 플랫폼 선택 모달 */}
    <PlatformSelectModal
      isOpen={showPlatformSelect}
      onClose={() => setShowPlatformSelect(false)}
      selectedPlatforms={editedSchedule?.platforms || []}
      onTogglePlatform={handleTogglePlatform}
    />

    {/* 채널 추가 모달 */}
    <ChannelAddModal
      isOpen={showChannelAdd}
      onClose={() => setShowChannelAdd(false)}
      onAdd={handleAddChannel}
    />
    </>
  )
}

// 스트림 카드 컴포넌트
function StreamCard({
  type,
  title,
  date,
  time,
  platforms,
  duration,
  onClick,
  isProductStream,
}: {
  type: 'live' | 'vod'
  title: string
  date: string
  time: string
  platforms: string[]
  duration?: string
  onClick?: () => void
  isProductStream?: boolean
}) {
  // 아이콘 결정: 라이브=Video(캠코더), VOD=Play
  const renderIcon = () => {
    if (type === 'live') {
      return <Video size={32} className="text-[var(--muted)]" />
    }
    return <Play size={32} className="text-[var(--muted)]" />
  }

  return (
    <div
      className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden cursor-pointer hover:border-[var(--primary)] transition-colors"
      onClick={onClick}
    >
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
        {duration && (
          <span className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
            {duration}
          </span>
        )}
      </div>

      {/* 정보 */}
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          {type === 'live' && (
            <span className="text-[var(--accent)] text-xs font-medium">LIVE</span>
          )}
          <span className="font-medium text-sm">{title}</span>
        </div>
        <p className="text-xs text-[var(--muted)] mb-2">
          {date} | {time}
        </p>
        <div className="flex flex-wrap gap-1">
          {platforms.map((platform) => (
            <span
              key={platform}
              className="px-2 py-0.5 bg-[var(--background)] text-xs rounded text-[var(--foreground)]"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}


// 캘린더 컴포넌트
function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // 해당 월의 첫 날과 마지막 날
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  // 달력에 표시할 날짜들 생성
  const days: (number | null)[] = []

  // 첫 주의 빈 칸
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push(null)
  }

  // 실제 날짜들
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(i)
  }

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const today = new Date()
  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear()

  // 스케줄이 있는 날짜 (예시)
  const scheduledDays = [8, 9, 14, 15, 16, 23]

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
      <h3 className="font-semibold mb-4">Calendar</h3>

      {/* 년/월 네비게이션 */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button onClick={prevMonth} className="p-1 hover:bg-[var(--background)] rounded">
          <ChevronLeft size={16} />
        </button>
        <div className="text-center">
          <div className="text-sm font-medium">{year}</div>
          <div className="text-sm">{monthNames[month]}</div>
        </div>
        <button onClick={nextMonth} className="p-1 hover:bg-[var(--background)] rounded">
          <ChevronRight size={16} />
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-xs text-[var(--muted)] py-1">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={`
              relative text-center text-sm py-2 rounded cursor-pointer transition-colors
              ${day === null ? '' : 'hover:bg-[var(--background)]'}
              ${day && isToday(day) ? 'bg-[var(--primary)] text-white' : ''}
            `}
          >
            {day}
            {day && scheduledDays.includes(day) && !isToday(day) && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--secondary)] rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// 스케줄 목록 컴포넌트
function ScheduleList() {
  const schedules = [
    { time: '09:30', type: 'LIVE', title: 'Livestream Title', color: 'var(--accent)' },
    { time: '15:30', type: 'LIVE', title: 'Livestream Title', color: 'var(--accent)' },
    { time: '15:30', type: 'VOD', title: 'VOD Title', color: 'var(--secondary)' },
    { time: '19:30', type: 'LIVE', title: 'Livestream Title', color: 'var(--accent)' },
  ]

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
      <h3 className="font-semibold mb-4">Scheduled</h3>

      <div className="space-y-4">
        {schedules.map((schedule, index) => (
          <div key={index} className="flex gap-3">
            <div className="text-sm font-medium w-12">{schedule.time}</div>
            <div
              className="w-1 rounded-full"
              style={{ backgroundColor: schedule.color }}
            />
            <div>
              <div className="text-xs text-[var(--muted)]">{schedule.type}</div>
              <div className="text-sm font-medium">{schedule.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 초기 스케줄 데이터
const initialSchedules: ScheduleDetail[] = [
  {
    id: '1',
    type: 'live',
    title: 'Livestream Title',
    description: 'Live streaming session about new products',
    scheduledDate: '2021-02-17',
    startTime: '16:30',
    endTime: '18:30',
    timezone: 'Asia/Seoul',
    status: 'standby',
    broadcaster: '@kimtaehee1991',
    deleteAfterLive: false,
    channels: [
      { name: 'My Website', url: 'rtmp://mywebsite.com/live/stream1' },
    ],
    platforms: [
      { id: 'youtube', name: 'YouTube', icon: 'youtube' },
    ],
    products: [
      { id: '1', name: 'Product 1', quantity: 50, price: 25000 },
      { id: '2', name: 'Product 2', quantity: 30, price: 35000 },
    ],
    shoppingMall: 'coupang',
  },
  {
    id: '2',
    type: 'pre-recorded',
    title: 'VoD Title',
    description: 'Pre-recorded product showcase',
    scheduledDate: '2020-03-12',
    startTime: '19:30',
    endTime: '19:42',
    timezone: 'Asia/Seoul',
    status: 'end',
    broadcaster: '@kimtaehee1991',
    deleteAfterLive: true,
    size: '245MB',
    duration: '12:35',
    channels: [
      { name: 'My Website', url: 'rtmp://mywebsite.com/live/stream2' },
    ],
    platforms: [
      { id: 'youtube', name: 'YouTube', icon: 'youtube' },
    ],
    products: [
      { id: '1', name: 'Product 1', quantity: 50, price: 25000 },
      { id: '2', name: 'Product 2', quantity: 30, price: 35000 },
      { id: '3', name: 'Product 3', quantity: 100, price: 15000 },
    ],
    shoppingMall: 'coupang',
  },
  {
    id: '3',
    type: 'live',
    title: 'Morning Show',
    scheduledDate: '2021-02-15',
    startTime: '11:30',
    endTime: '13:00',
    timezone: 'Asia/Seoul',
    status: 'scheduled',
    broadcaster: '@host2022',
    deleteAfterLive: false,
    channels: [],
    platforms: [
      { id: 'youtube', name: 'YouTube', icon: 'youtube' },
      { id: 'facebook', name: 'Facebook', icon: 'facebook' },
    ],
    products: [
      { id: '1', name: 'Morning Special', quantity: 100, price: 19000 },
    ],
  },
  {
    id: '4',
    type: 'pre-recorded',
    title: 'Product Review',
    scheduledDate: '2021-02-15',
    startTime: '14:30',
    endTime: '15:00',
    timezone: 'Asia/Seoul',
    status: 'scheduled',
    broadcaster: '@reviewer',
    deleteAfterLive: false,
    size: '180MB',
    duration: '30:35',
    channels: [
      { name: 'Partner Site', url: 'rtmp://partner.com/live/key123' },
    ],
    platforms: [
      { id: 'youtube', name: 'YouTube', icon: 'youtube' },
      { id: 'kakao', name: 'Kakao TV', icon: 'kakao' },
    ],
    products: [
      { id: '1', name: 'Review Item A', quantity: 45, price: 29000 },
      { id: '2', name: 'Review Item B', quantity: 20, price: 45000 },
    ],
    shoppingMall: '11st',
  },
  {
    id: '5',
    type: 'live',
    title: 'Night Talk',
    scheduledDate: '2021-02-15',
    startTime: '22:10',
    endTime: '01:30',
    endDate: '2021-02-16',
    timezone: 'Asia/Seoul',
    status: 'scheduled',
    broadcaster: '@nighthost',
    deleteAfterLive: false,
    channels: [
      { name: 'XCaster App', url: 'rtmp://xcaster.app/live/nighttalk' },
    ],
    platforms: [
      { id: 'youtube', name: 'YouTube', icon: 'youtube' },
      { id: 'tiktok', name: 'TikTok', icon: 'tiktok' },
    ],
    products: [],
  },
  {
    id: '6',
    type: 'pre-recorded',
    title: 'Tutorial Video',
    description: 'Step-by-step tutorial video',
    scheduledDate: '2021-02-16',
    startTime: '14:00',
    endTime: '14:30',
    timezone: 'Asia/Seoul',
    status: 'scheduled',
    broadcaster: '@teacher',
    deleteAfterLive: false,
    size: '120MB',
    duration: '20:35',
    channels: [],
    platforms: [
      { id: 'youtube', name: 'YouTube', icon: 'youtube' },
    ],
    products: [
      { id: '1', name: 'Tutorial Bundle', quantity: 200, price: 12000 },
    ],
    shoppingMall: 'gmarket',
  },
]

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<ScheduleDetail[]>(initialSchedules)
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleDetail | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (schedule: ScheduleDetail) => {
    setSelectedSchedule(schedule)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedSchedule(null)
  }

  const handleEdit = (updatedSchedule: ScheduleDetail) => {
    setSchedules(prev => prev.map(s => s.id === updatedSchedule.id ? updatedSchedule : s))
    setSelectedSchedule(updatedSchedule)
  }

  const handleDelete = (id: string) => {
    setSchedules(prev => prev.filter(s => s.id !== id))
    closeModal()
  }

  // 스케줄 데이터를 날짜별로 그룹화
  const todaySchedules = schedules.filter(s => s.id === '1' || s.id === '2')
  const tomorrowSchedules = schedules.filter(s => s.id === '3' || s.id === '4' || s.id === '5')
  const feb16Schedules = schedules.filter(s => s.id === '6')

  return (
    <div className="min-h-screen">
      <Header />

      <div className="p-6">
        <div className="flex gap-6">
          {/* 왼쪽: 스트림 목록 */}
          <div className="flex-1">
            {/* 제목 + 필터 */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Scheduled Streams</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    className="px-3 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-sm"
                    placeholder="Start"
                  />
                  <span className="text-[var(--muted)]">~</span>
                  <input
                    type="date"
                    className="px-3 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-sm"
                    placeholder="End"
                  />
                </div>
                <button className="p-2 hover:bg-[var(--background)] rounded-lg">
                  <Search size={20} className="text-[var(--muted)]" />
                </button>
              </div>
            </div>

            {/* Today */}
            {todaySchedules.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Today</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {todaySchedules.map(schedule => (
                    <StreamCard
                      key={schedule.id}
                      type={schedule.type === 'live' ? 'live' : 'vod'}
                      title={schedule.title}
                      date="14 Feb, 2021"
                      time={`${schedule.startTime} - ${schedule.endTime}`}
                      platforms={schedule.platforms.map(p => p.name)}
                      duration={schedule.duration}
                      onClick={() => openModal(schedule)}
                      isProductStream={schedule.products.length > 0}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Tomorrow */}
            {tomorrowSchedules.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Tomorrow</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tomorrowSchedules.map(schedule => (
                    <StreamCard
                      key={schedule.id}
                      type={schedule.type === 'live' ? 'live' : 'vod'}
                      title={schedule.title}
                      date="15 Feb, 2021"
                      time={`${schedule.startTime} - ${schedule.endTime}`}
                      platforms={schedule.platforms.map(p => p.name)}
                      duration={schedule.duration}
                      onClick={() => openModal(schedule)}
                      isProductStream={schedule.products.length > 0}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* 16 Feb */}
            {feb16Schedules.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-semibold mb-4">16 Feb</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {feb16Schedules.map(schedule => (
                    <StreamCard
                      key={schedule.id}
                      type={schedule.type === 'live' ? 'live' : 'vod'}
                      title={schedule.title}
                      date="16 Feb, 2021"
                      time={`${schedule.startTime} - ${schedule.endTime}`}
                      platforms={schedule.platforms.map(p => p.name)}
                      duration={schedule.duration}
                      onClick={() => openModal(schedule)}
                      isProductStream={schedule.products.length > 0}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* 오른쪽: 캘린더 + 스케줄 */}
          <div className="w-72 space-y-4">
            <Calendar />
            <ScheduleList />
          </div>
        </div>
      </div>

      {/* Schedule Detail 모달 */}
      <ScheduleDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        schedule={selectedSchedule}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
