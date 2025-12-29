'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Video,
  Radio,
  Upload,
  Search,
  X,
  Plus,
  ChevronDown,
  Calendar,
  Clock,
  Globe,
  Trash2,
  Image as ImageIcon,
  Play,
  Camera,
  Package,
  Youtube,
  Facebook,
  ShoppingCart,
  Store,
} from 'lucide-react'

// 플랫폼 목록 (Schedule과 동일하게 lucide 아이콘 사용)
const AVAILABLE_PLATFORMS = [
  { id: 'youtube', name: 'YouTube', icon: 'youtube', color: 'text-red-500' },
  { id: 'facebook', name: 'Facebook', icon: 'facebook', color: 'text-blue-600' },
  { id: 'tiktok', name: 'TikTok', icon: 'tiktok', color: 'text-[var(--foreground)]' },
  { id: 'kakao', name: 'Kakao TV', icon: 'kakao', color: 'text-yellow-500' },
  { id: 'twitch', name: 'Twitch', icon: 'twitch', color: 'text-purple-500' },
  { id: 'instagram', name: 'Instagram', icon: 'instagram', color: 'text-pink-500' },
]

// 방송 종류 세분화
const BROADCAST_TYPES = [
  { id: 'youtube-live', name: 'YouTube Live', category: 'live' },
  { id: 'product-sales', name: 'Product Sales', category: 'commerce' },
  { id: 'news', name: 'News', category: 'media' },
  { id: 'talk-show', name: 'Talk Show', category: 'entertainment' },
  { id: 'gaming', name: 'Gaming', category: 'entertainment' },
  { id: 'music', name: 'Music', category: 'entertainment' },
  { id: 'education', name: 'Education', category: 'education' },
  { id: 'webinar', name: 'Webinar', category: 'education' },
  { id: 'sports', name: 'Sports', category: 'media' },
  { id: 'interview', name: 'Interview', category: 'media' },
  { id: 'other', name: 'Other', category: 'other' },
]

// 쇼핑몰 목록
const SHOPPING_MALLS = [
  { id: 'coupang', name: 'Coupang' },
  { id: '11st', name: '11st' },
  { id: 'gmarket', name: 'G-Market' },
  { id: 'auction', name: 'Auction' },
]

// 플랫폼 아이콘 렌더링 함수
const renderPlatformIcon = (icon: string, size: number = 20) => {
  switch (icon) {
    case 'youtube': return <Youtube size={size} className="text-red-500" />
    case 'facebook': return <Facebook size={size} className="text-blue-600" />
    case 'tiktok': return <span className="text-sm font-bold">TT</span>
    case 'kakao': return <span className="text-sm font-bold text-yellow-500">K</span>
    case 'twitch': return <span className="text-sm font-bold text-purple-500">Tw</span>
    case 'instagram': return <span className="text-sm font-bold text-pink-500">IG</span>
    default: return <Video size={size} className="text-[var(--muted)]" />
  }
}

// 샘플 상품 목록
const SAMPLE_PRODUCTS = [
  { id: '1', name: 'Product Name Here', quantity: 45, price: 25000, image: '' },
  { id: '2', name: 'Another Product', quantity: 30, price: 35000, image: '' },
  { id: '3', name: 'Sample Item', quantity: 100, price: 15000, image: '' },
]

// 타임존 목록
const TIMEZONES = [
  { value: 'Asia/Seoul', label: '(GMT+09:00) Seoul' },
  { value: 'Asia/Tokyo', label: '(GMT+09:00) Tokyo' },
  { value: 'America/New_York', label: '(GMT-05:00) New York' },
  { value: 'America/Los_Angeles', label: '(GMT-08:00) Los Angeles' },
  { value: 'Europe/London', label: '(GMT+00:00) London' },
]

// 플랫폼별 필수 입력 필드 정의
const PLATFORM_FIELDS: Record<string, { fields: string[]; labels: Record<string, string> }> = {
  youtube: {
    fields: ['streamKey', 'privacy', 'category'],
    labels: {
      streamKey: 'Stream Key',
      privacy: 'Privacy',
      category: 'Category',
    }
  },
  facebook: {
    fields: ['pageId', 'privacy'],
    labels: {
      pageId: 'Page ID',
      privacy: 'Privacy',
    }
  },
  tiktok: {
    fields: ['serverUrl', 'streamKey'],
    labels: {
      serverUrl: 'Server URL',
      streamKey: 'Stream Key',
    }
  },
  twitch: {
    fields: ['streamKey', 'category'],
    labels: {
      streamKey: 'Stream Key',
      category: 'Category',
    }
  },
  instagram: {
    fields: ['streamUrl', 'streamKey'],
    labels: {
      streamUrl: 'Stream URL',
      streamKey: 'Stream Key',
    }
  },
  kakao: {
    fields: ['channelId', 'streamKey'],
    labels: {
      channelId: 'Channel ID',
      streamKey: 'Stream Key',
    }
  },
}

interface StreamFormData {
  // Step 1
  streamType: 'pre-recorded' | 'live' | null

  // Step 2 - Video Upload (Pre-recorded only)
  videoFile: {
    name: string
    size: number
    duration: string
  } | null

  // Step 2 - Stream Settings
  channels: { name: string; url: string }[]
  platforms: { id: string; name: string; icon: string }[]
  platformSettings: Record<string, Record<string, string>> // 플랫폼별 설정
  title: string
  type: string
  description: string
  thumbnail: string | null
  broadcaster: string
  deleteAfterLive: boolean

  // Step 3
  shoppingMall: string
  attachedProducts: typeof SAMPLE_PRODUCTS

  // Step 4
  scheduledDate: string
  startTime: string
  endTime: string
  timezone: string
}

// Step 진행바 컴포넌트
function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const steps = ['Stream Type', 'Stream Detail', 'Product Attach', 'Schedule']

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((label, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                index + 1 < currentStep
                  ? 'bg-[var(--secondary)] text-white'
                  : index + 1 === currentStep
                  ? 'bg-[var(--secondary)] text-white'
                  : 'bg-[var(--background)] border border-[var(--border-color)] text-[var(--muted)]'
              }`}
            >
              {index + 1 < currentStep ? <Check size={18} /> : index + 1}
            </div>
            <span className={`text-xs mt-2 ${index + 1 === currentStep ? 'text-[var(--secondary)] font-medium' : 'text-[var(--muted)]'}`}>
              {label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-20 h-0.5 mx-2 ${
                index + 1 < currentStep ? 'bg-[var(--secondary)]' : 'bg-[var(--border-color)]'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// Step 1: Stream Type 선택
function Step1StreamType({
  formData,
  setFormData,
}: {
  formData: StreamFormData
  setFormData: React.Dispatch<React.SetStateAction<StreamFormData>>
}) {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-center mb-2">Select Stream Type</h2>
      <p className="text-[var(--muted)] text-center mb-8">Choose how you want to stream your content</p>

      <div className="grid grid-cols-2 gap-6">
        {/* Pre-recorded Live Stream */}
        <button
          onClick={() => setFormData(prev => ({ ...prev, streamType: 'pre-recorded' }))}
          className={`p-8 rounded-xl border-2 transition-all ${
            formData.streamType === 'pre-recorded'
              ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
              : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
          }`}
        >
          <div className="flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              formData.streamType === 'pre-recorded' ? 'bg-[var(--secondary)]' : 'bg-[var(--background)]'
            }`}>
              <Video size={28} className={formData.streamType === 'pre-recorded' ? 'text-white' : 'text-[var(--muted)]'} />
            </div>
            <h3 className="font-semibold mb-2">Pre-recorded Live Stream</h3>
            <p className="text-sm text-[var(--muted)]">
              Upload a pre-recorded video and stream it as live content
            </p>
          </div>
        </button>

        {/* Live Stream */}
        <button
          onClick={() => setFormData(prev => ({ ...prev, streamType: 'live' }))}
          className={`p-8 rounded-xl border-2 transition-all ${
            formData.streamType === 'live'
              ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
              : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
          }`}
        >
          <div className="flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              formData.streamType === 'live' ? 'bg-[var(--secondary)]' : 'bg-[var(--background)]'
            }`}>
              <Radio size={28} className={formData.streamType === 'live' ? 'text-white' : 'text-[var(--muted)]'} />
            </div>
            <h3 className="font-semibold mb-2">Live Stream</h3>
            <p className="text-sm text-[var(--muted)]">
              Stream live content directly from your camera or screen
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}

// Step 2: Stream Detail
function Step2StreamDetail({
  formData,
  setFormData,
}: {
  formData: StreamFormData
  setFormData: React.Dispatch<React.SetStateAction<StreamFormData>>
}) {
  const [showPlatformModal, setShowPlatformModal] = useState(false)
  const [showChannelModal, setShowChannelModal] = useState(false)
  const [newChannel, setNewChannel] = useState({ name: '', url: '' })
  const [isDragging, setIsDragging] = useState(false)

  const togglePlatform = (platform: typeof AVAILABLE_PLATFORMS[0]) => {
    setFormData(prev => {
      const exists = prev.platforms.find(p => p.id === platform.id)
      if (exists) {
        // 플랫폼 제거 시 해당 플랫폼 설정도 제거
        const newSettings = { ...prev.platformSettings }
        delete newSettings[platform.id]
        return {
          ...prev,
          platforms: prev.platforms.filter(p => p.id !== platform.id),
          platformSettings: newSettings
        }
      }
      // 플랫폼 추가 시 빈 설정 초기화
      return {
        ...prev,
        platforms: [...prev.platforms, { id: platform.id, name: platform.name, icon: platform.icon }],
        platformSettings: { ...prev.platformSettings, [platform.id]: {} }
      }
    })
  }

  const updatePlatformSetting = (platformId: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      platformSettings: {
        ...prev.platformSettings,
        [platformId]: {
          ...prev.platformSettings[platformId],
          [field]: value
        }
      }
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // 실제로는 파일 업로드 API 호출
      setFormData(prev => ({
        ...prev,
        videoFile: {
          name: file.name,
          size: file.size,
          duration: '00:00' // 실제로는 비디오 메타데이터에서 추출
        }
      }))
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('video/')) {
      setFormData(prev => ({
        ...prev,
        videoFile: {
          name: file.name,
          size: file.size,
          duration: '00:00'
        }
      }))
    }
  }

  const removeVideoFile = () => {
    setFormData(prev => ({ ...prev, videoFile: null }))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(2) + ' GB'
    if (bytes >= 1048576) return (bytes / 1048576).toFixed(2) + ' MB'
    return (bytes / 1024).toFixed(2) + ' KB'
  }

  const addChannel = () => {
    if (newChannel.name && newChannel.url) {
      setFormData(prev => ({
        ...prev,
        channels: [...prev.channels, newChannel]
      }))
      setNewChannel({ name: '', url: '' })
      setShowChannelModal(false)
    }
  }

  const removeChannel = (index: number) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold text-center mb-2">Stream Detail</h2>
      <p className="text-[var(--muted)] text-center mb-8">Configure your stream settings</p>

      {/* Video Upload (Pre-recorded only) */}
      {formData.streamType === 'pre-recorded' && (
        <div>
          <label className="block text-sm font-medium mb-2">
            Upload Video <span className="text-[var(--accent)]">*</span>
          </label>
          {formData.videoFile ? (
            <div className="flex items-center gap-4 p-4 bg-[var(--background)] border border-[var(--border-color)] rounded-lg">
              <div className="w-16 h-16 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
                <Play size={24} className="text-[var(--secondary)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{formData.videoFile.name}</p>
                <p className="text-xs text-[var(--muted)]">
                  {formatFileSize(formData.videoFile.size)} • Duration: {formData.videoFile.duration}
                </p>
              </div>
              <button
                onClick={removeVideoFile}
                className="p-2 hover:text-[var(--accent)] transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                isDragging
                  ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                  : 'border-[var(--border-color)] hover:border-[var(--secondary)]'
              }`}
            >
              <input
                type="file"
                accept="video/*"
                onChange={handleFileUpload}
                className="hidden"
                id="video-upload"
              />
              <label htmlFor="video-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-[var(--background)] rounded-full flex items-center justify-center mb-3">
                    <Upload size={24} className="text-[var(--muted)]" />
                  </div>
                  <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-[var(--muted)]">MP4, MOV, AVI, MKV up to 10GB</p>
                  <p className="text-xs text-[var(--muted)] mt-1">Maximum duration: 4 hours</p>
                </div>
              </label>
            </div>
          )}
        </div>
      )}

      {/* Platforms */}
      <div>
        <label className="block text-sm font-medium mb-2">Platforms</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.platforms.map(platform => (
            <span
              key={platform.id}
              className="px-3 py-1.5 bg-[var(--secondary)]/10 border border-[var(--secondary)] rounded-full text-sm flex items-center gap-2"
            >
              {renderPlatformIcon(platform.icon, 16)}
              <span>{platform.name}</span>
              <button
                onClick={() => togglePlatform(platform as any)}
                className="hover:text-[var(--accent)]"
              >
                <X size={14} />
              </button>
            </span>
          ))}
          <button
            onClick={() => setShowPlatformModal(true)}
            className="px-3 py-1.5 border border-dashed border-[var(--border-color)] rounded-full text-sm text-[var(--muted)] hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-colors flex items-center gap-1"
          >
            <Plus size={14} />
            Add Platform
          </button>
        </div>
      </div>

      {/* Custom Channels */}
      <div>
        <label className="block text-sm font-medium mb-2">Custom Channels (RTMP)</label>
        <div className="space-y-2">
          {formData.channels.map((channel, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-[var(--background)] rounded-lg">
              <div className="flex-1">
                <p className="text-sm font-medium">{channel.name}</p>
                <p className="text-xs text-[var(--muted)]">{channel.url}</p>
              </div>
              <button
                onClick={() => removeChannel(index)}
                className="p-1 hover:text-[var(--accent)]"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <button
            onClick={() => setShowChannelModal(true)}
            className="w-full p-3 border border-dashed border-[var(--border-color)] rounded-lg text-sm text-[var(--muted)] hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Add Custom Channel
          </button>
        </div>
      </div>

      {/* Platform Settings - 플랫폼별 설정 폼 */}
      {formData.platforms.length > 0 && (
        <div className="space-y-4">
          <label className="block text-sm font-medium">Platform Settings</label>
          {formData.platforms.map(platform => {
            const platformConfig = PLATFORM_FIELDS[platform.id]
            if (!platformConfig) return null

            return (
              <div key={platform.id} className="p-4 bg-[var(--background)] rounded-lg border border-[var(--border-color)]">
                <div className="flex items-center gap-2 mb-4">
                  {renderPlatformIcon(platform.icon, 18)}
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
                          value={formData.platformSettings[platform.id]?.[field] || ''}
                          onChange={e => updatePlatformSetting(platform.id, field, e.target.value)}
                          className="w-full px-3 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                        >
                          <option value="">Select privacy</option>
                          <option value="public">Public</option>
                          <option value="unlisted">Unlisted</option>
                          <option value="private">Private</option>
                        </select>
                      ) : field === 'category' ? (
                        <select
                          value={formData.platformSettings[platform.id]?.[field] || ''}
                          onChange={e => updatePlatformSetting(platform.id, field, e.target.value)}
                          className="w-full px-3 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                        >
                          <option value="">Select category</option>
                          <option value="gaming">Gaming</option>
                          <option value="entertainment">Entertainment</option>
                          <option value="music">Music</option>
                          <option value="sports">Sports</option>
                          <option value="education">Education</option>
                          <option value="news">News & Politics</option>
                          <option value="howto">Howto & Style</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={formData.platformSettings[platform.id]?.[field] || ''}
                          onChange={e => updatePlatformSetting(platform.id, field, e.target.value)}
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

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter stream title"
          className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
        />
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium mb-2">Broadcast Type</label>
        <div className="relative">
          <select
            value={formData.type}
            onChange={e => setFormData(prev => ({ ...prev, type: e.target.value }))}
            className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)] appearance-none"
          >
            <option value="">Select broadcast type</option>
            <optgroup label="Live">
              <option value="youtube-live">YouTube Live</option>
            </optgroup>
            <optgroup label="Commerce">
              <option value="product-sales">Product Sales</option>
            </optgroup>
            <optgroup label="Media">
              <option value="news">News</option>
              <option value="sports">Sports</option>
              <option value="interview">Interview</option>
            </optgroup>
            <optgroup label="Entertainment">
              <option value="talk-show">Talk Show</option>
              <option value="gaming">Gaming</option>
              <option value="music">Music</option>
            </optgroup>
            <optgroup label="Education">
              <option value="education">Education</option>
              <option value="webinar">Webinar</option>
            </optgroup>
            <optgroup label="Other">
              <option value="other">Other</option>
            </optgroup>
          </select>
          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none" />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Enter stream description"
          rows={4}
          className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)] resize-none"
        />
      </div>

      {/* Thumbnail */}
      <div>
        <label className="block text-sm font-medium mb-2">Thumbnail</label>
        <div className="border-2 border-dashed border-[var(--border-color)] rounded-lg p-8 text-center hover:border-[var(--secondary)] transition-colors cursor-pointer">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-[var(--background)] rounded-full flex items-center justify-center mb-3">
              <Upload size={20} className="text-[var(--muted)]" />
            </div>
            <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
            <p className="text-xs text-[var(--muted)]">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>

      {/* Broadcaster */}
      <div>
        <label className="block text-sm font-medium mb-2">Broadcaster</label>
        <div className="relative">
          <select
            value={formData.broadcaster}
            onChange={e => setFormData(prev => ({ ...prev, broadcaster: e.target.value }))}
            className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)] appearance-none"
          >
            <option value="">Select broadcaster</option>
            <option value="Lee Min Ho">Lee Min Ho</option>
            <option value="Kim Soo Jin">Kim Soo Jin</option>
            <option value="Park Ji Yeon">Park Ji Yeon</option>
          </select>
          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none" />
        </div>
      </div>

      {/* Delete After Live */}
      <div className="flex items-center justify-between p-4 bg-[var(--background)] rounded-lg">
        <div>
          <p className="text-sm font-medium">Delete After Live</p>
          <p className="text-xs text-[var(--muted)]">Automatically delete the stream after it ends</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={formData.deleteAfterLive}
            onChange={e => setFormData(prev => ({ ...prev, deleteAfterLive: e.target.checked }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-[var(--border-color)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--secondary)]"></div>
        </label>
      </div>

      {/* Platform Modal */}
      {showPlatformModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--card-bg)] rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Select Platforms</h3>
              <button onClick={() => setShowPlatformModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {AVAILABLE_PLATFORMS.map(platform => {
                const isSelected = formData.platforms.find(p => p.id === platform.id)
                return (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform)}
                    className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                        : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                      {renderPlatformIcon(platform.icon, 20)}
                    </div>
                    <span className="font-medium">{platform.name}</span>
                  </button>
                )
              })}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  setShowPlatformModal(false)
                  setShowChannelModal(true)
                }}
                className="text-sm text-[var(--secondary)] hover:underline"
              >
                + Add Custom Channel
              </button>
              <button
                onClick={() => setShowPlatformModal(false)}
                className="px-4 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[#7c4fe0] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Channel Modal */}
      {showChannelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--card-bg)] rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Custom Channel</h3>
              <button onClick={() => setShowChannelModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Channel Name</label>
                <input
                  type="text"
                  value={newChannel.name}
                  onChange={e => setNewChannel(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="My Custom Channel"
                  className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">RTMP URL</label>
                <input
                  type="text"
                  value={newChannel.url}
                  onChange={e => setNewChannel(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="rtmp://..."
                  className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowChannelModal(false)}
                className="flex-1 px-4 py-2 border border-[var(--border-color)] rounded-lg text-sm font-medium hover:bg-[var(--background)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addChannel}
                className="flex-1 px-4 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[#7c4fe0] transition-colors"
              >
                Add Channel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Step 3: Product Attach
function Step3ProductAttach({
  formData,
  setFormData,
}: {
  formData: StreamFormData
  setFormData: React.Dispatch<React.SetStateAction<StreamFormData>>
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<typeof SAMPLE_PRODUCTS>([])

  const handleSearch = () => {
    // 실제로는 API 호출
    setSearchResults(SAMPLE_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  }

  const attachProduct = (product: typeof SAMPLE_PRODUCTS[0]) => {
    if (!formData.attachedProducts.find(p => p.id === product.id)) {
      setFormData(prev => ({
        ...prev,
        attachedProducts: [...prev.attachedProducts, product]
      }))
    }
  }

  const removeProduct = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      attachedProducts: prev.attachedProducts.filter(p => p.id !== productId)
    }))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-center mb-2">Product Attach</h2>
      <p className="text-[var(--muted)] text-center mb-8">Attach products from your shopping mall to your stream</p>

      <div className="grid grid-cols-2 gap-8">
        {/* Left: Search */}
        <div className="space-y-4">
          {/* Shopping Mall Select */}
          <div>
            <label className="block text-sm font-medium mb-2">Shopping Mall</label>
            <div className="relative">
              <select
                value={formData.shoppingMall}
                onChange={e => setFormData(prev => ({ ...prev, shoppingMall: e.target.value }))}
                className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)] appearance-none"
              >
                <option value="">Select shopping mall</option>
                {SHOPPING_MALLS.map(mall => (
                  <option key={mall.id} value={mall.id}>
                    {mall.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none" />
            </div>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-2">Search Products</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[#7c4fe0] transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          {/* Search Results */}
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {searchResults.map(product => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-lg"
              >
                <div className="w-12 h-12 bg-[var(--border-color)] rounded-lg flex items-center justify-center">
                  <ImageIcon size={20} className="text-[var(--muted)]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-[var(--muted)]">
                    Qty: {product.quantity} | ₩{product.price.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => attachProduct(product)}
                  className="px-3 py-1.5 bg-[var(--secondary)] text-white rounded-lg text-xs font-medium hover:bg-[#7c4fe0] transition-colors"
                >
                  Attach
                </button>
              </div>
            ))}
            {searchResults.length === 0 && searchQuery && (
              <p className="text-center text-[var(--muted)] py-8">No products found</p>
            )}
          </div>
        </div>

        {/* Right: Attached Products */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Attached Products ({formData.attachedProducts.length})
          </label>
          <div className="border border-[var(--border-color)] rounded-lg p-4 min-h-[300px]">
            {formData.attachedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-[var(--muted)]">
                <ImageIcon size={48} className="mb-4 opacity-50" />
                <p className="text-sm">No products attached yet</p>
                <p className="text-xs">Search and attach products from the left panel</p>
              </div>
            ) : (
              <div className="space-y-2">
                {formData.attachedProducts.map(product => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-lg"
                  >
                    <div className="w-12 h-12 bg-[var(--border-color)] rounded-lg flex items-center justify-center">
                      <ImageIcon size={20} className="text-[var(--muted)]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-[var(--muted)]">
                        Qty: {product.quantity} | ₩{product.price.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="p-1.5 hover:text-[var(--accent)] transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Step 4: Schedule
function Step4Schedule({
  formData,
  setFormData,
}: {
  formData: StreamFormData
  setFormData: React.Dispatch<React.SetStateAction<StreamFormData>>
}) {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-center mb-2">Schedule</h2>
      <p className="text-[var(--muted)] text-center mb-8">Set when your stream will go live</p>

      <div className="grid grid-cols-2 gap-8">
        {/* Left: Calendar */}
        <div>
          <label className="block text-sm font-medium mb-2">Select Date</label>
          <div className="border border-[var(--border-color)] rounded-lg p-4 bg-[var(--background)]">
            <input
              type="date"
              value={formData.scheduledDate}
              onChange={e => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
              className="w-full px-4 py-3 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
            />
          </div>
        </div>

        {/* Right: Time & Timezone */}
        <div className="space-y-4">
          {/* Start Time */}
          <div>
            <label className="block text-sm font-medium mb-2">Start Date & Time</label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                <input
                  type="date"
                  value={formData.scheduledDate}
                  onChange={e => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                />
              </div>
              <div className="relative">
                <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={e => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                />
              </div>
            </div>
          </div>

          {/* End Time */}
          <div>
            <label className="block text-sm font-medium mb-2">End Date & Time</label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                <input
                  type="date"
                  value={formData.scheduledDate}
                  className="w-full pl-10 pr-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                  readOnly
                />
              </div>
              <div className="relative">
                <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={e => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                />
              </div>
            </div>
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-sm font-medium mb-2">Timezone</label>
            <div className="relative">
              <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
              <select
                value={formData.timezone}
                onChange={e => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)] appearance-none"
              >
                {TIMEZONES.map(tz => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 p-4 bg-[var(--background)] rounded-lg">
        <h3 className="text-sm font-medium mb-2">Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-[var(--muted)]">Stream Type:</span>{' '}
            <span className="font-medium">{formData.streamType === 'live' ? 'Live Stream' : 'Pre-recorded'}</span>
          </div>
          <div>
            <span className="text-[var(--muted)]">Platforms:</span>{' '}
            <span className="font-medium">{formData.platforms.length} selected</span>
          </div>
          <div>
            <span className="text-[var(--muted)]">Products:</span>{' '}
            <span className="font-medium">{formData.attachedProducts.length} attached</span>
          </div>
          <div>
            <span className="text-[var(--muted)]">Scheduled:</span>{' '}
            <span className="font-medium">
              {formData.scheduledDate} {formData.startTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NewStreamPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<StreamFormData>({
    streamType: null,
    videoFile: null,
    channels: [],
    platforms: [],
    platformSettings: {},
    title: '',
    type: '',
    description: '',
    thumbnail: null,
    broadcaster: '',
    deleteAfterLive: false,
    shoppingMall: '',
    attachedProducts: [],
    scheduledDate: '',
    startTime: '',
    endTime: '',
    timezone: 'Asia/Seoul',
  })

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.streamType !== null
      case 2:
        // Pre-recorded는 비디오 파일 필수
        const hasVideo = formData.streamType === 'live' || formData.videoFile !== null
        const hasDestination = formData.platforms.length > 0 || formData.channels.length > 0
        return formData.title.trim() !== '' && hasVideo && hasDestination
      case 3:
        return true // Products are optional
      case 4:
        return formData.scheduledDate !== '' && formData.startTime !== ''
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1)
    } else {
      // Submit and redirect
      console.log('Creating stream:', formData)
      router.push('/schedule')
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    } else {
      router.push('/schedule')
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="p-6">
        {/* Back button and title */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">New Stream</h1>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={4} />

        {/* Step Content */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-8 mb-6">
          {currentStep === 1 && <Step1StreamType formData={formData} setFormData={setFormData} />}
          {currentStep === 2 && <Step2StreamDetail formData={formData} setFormData={setFormData} />}
          {currentStep === 3 && <Step3ProductAttach formData={formData} setFormData={setFormData} />}
          {currentStep === 4 && <Step4Schedule formData={formData} setFormData={setFormData} />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="px-6 py-2 border border-[var(--border-color)] rounded-lg text-sm font-medium hover:bg-[var(--background)] transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="px-6 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[#7c4fe0] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === 4 ? 'Create Stream' : 'Next'}
            {currentStep < 4 && <ArrowRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  )
}
