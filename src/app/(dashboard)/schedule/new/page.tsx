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
  Monitor,
  ShoppingCart,
  Film,
  Youtube,
  Facebook,
} from 'lucide-react'

// Broadcast Type options
const BROADCAST_TYPES = [
  {
    id: 'general',
    name: 'General Broadcast',
    description: 'Standard live streaming with engagement features like polls, Q&A, and giveaways',
    icon: Monitor,
  },
  {
    id: 'commerce',
    name: 'Live Commerce',
    description: 'Product showcase and sales with shopping cart integration',
    icon: ShoppingCart,
  },
  {
    id: 'vod',
    name: 'VOD Streaming',
    description: 'Stream pre-recorded content as live with optional product links',
    icon: Film,
  },
]

// Platform list
const AVAILABLE_PLATFORMS = [
  { id: 'youtube', name: 'YouTube', icon: 'youtube', color: 'text-red-500' },
  { id: 'facebook', name: 'Facebook', icon: 'facebook', color: 'text-blue-600' },
  { id: 'tiktok', name: 'TikTok', icon: 'tiktok', color: 'text-[var(--foreground)]' },
  { id: 'kakao', name: 'Kakao TV', icon: 'kakao', color: 'text-yellow-500' },
  { id: 'twitch', name: 'Twitch', icon: 'twitch', color: 'text-purple-500' },
  { id: 'instagram', name: 'Instagram', icon: 'instagram', color: 'text-pink-500' },
]

// Shopping malls
const SHOPPING_MALLS = [
  { id: 'coupang', name: 'Coupang' },
  { id: '11st', name: '11st' },
  { id: 'gmarket', name: 'G-Market' },
  { id: 'auction', name: 'Auction' },
]

// Platform icon renderer
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

// Sample products
const SAMPLE_PRODUCTS = [
  { id: '1', name: 'Product Name Here', quantity: 45, price: 25000, image: '' },
  { id: '2', name: 'Another Product', quantity: 30, price: 35000, image: '' },
  { id: '3', name: 'Sample Item', quantity: 100, price: 15000, image: '' },
]

// Timezones
const TIMEZONES = [
  { value: 'Asia/Seoul', label: '(GMT+09:00) Seoul' },
  { value: 'Asia/Tokyo', label: '(GMT+09:00) Tokyo' },
  { value: 'America/New_York', label: '(GMT-05:00) New York' },
  { value: 'America/Los_Angeles', label: '(GMT-08:00) Los Angeles' },
  { value: 'Europe/London', label: '(GMT+00:00) London' },
]

// Platform settings config
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
  twitch: {
    fields: ['streamKey', 'category'],
    labels: { streamKey: 'Stream Key', category: 'Category' }
  },
  instagram: {
    fields: ['streamUrl', 'streamKey'],
    labels: { streamUrl: 'Stream URL', streamKey: 'Stream Key' }
  },
  kakao: {
    fields: ['channelId', 'streamKey'],
    labels: { channelId: 'Channel ID', streamKey: 'Stream Key' }
  },
}

interface StreamFormData {
  // Step 1: Broadcast Type
  broadcastType: 'general' | 'commerce' | 'vod' | null

  // Step 2: Stream Type
  streamType: 'pre-recorded' | 'live' | null

  // Step 3: Stream Settings
  videoFile: { name: string; size: number; duration: string } | null
  channels: { name: string; url: string }[]
  platforms: { id: string; name: string; icon: string }[]
  platformSettings: Record<string, Record<string, string>>
  title: string
  category: string
  description: string
  thumbnail: string | null
  broadcaster: string
  deleteAfterLive: boolean

  // Step 4: Products (Commerce only)
  shoppingMall: string
  attachedProducts: typeof SAMPLE_PRODUCTS

  // Step 5: Schedule
  scheduledDate: string
  startTime: string
  endTime: string
  timezone: string
}

// Get step labels based on broadcast type
function getStepLabels(broadcastType: string | null): string[] {
  if (broadcastType === 'general') {
    return ['Broadcast Type', 'Stream Type', 'Stream Detail', 'Schedule']
  }
  return ['Broadcast Type', 'Stream Type', 'Stream Detail', 'Products', 'Schedule']
}

// Step Indicator Component
function StepIndicator({
  currentStep,
  broadcastType
}: {
  currentStep: number
  broadcastType: string | null
}) {
  const steps = getStepLabels(broadcastType)

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
            <span className={`text-xs mt-2 whitespace-nowrap ${
              index + 1 === currentStep ? 'text-[var(--secondary)] font-medium' : 'text-[var(--muted)]'
            }`}>
              {label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-16 h-0.5 mx-2 ${
                index + 1 < currentStep ? 'bg-[var(--secondary)]' : 'bg-[var(--border-color)]'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// Step 1: Broadcast Type Selection
function Step1BroadcastType({
  formData,
  setFormData,
}: {
  formData: StreamFormData
  setFormData: React.Dispatch<React.SetStateAction<StreamFormData>>
}) {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-center mb-2">Select Broadcast Type</h2>
      <p className="text-[var(--muted)] text-center mb-8">
        Choose the type of broadcast that best fits your content
      </p>

      <div className="grid grid-cols-3 gap-6">
        {BROADCAST_TYPES.map((type) => {
          const Icon = type.icon
          const isSelected = formData.broadcastType === type.id

          return (
            <button
              key={type.id}
              onClick={() => setFormData(prev => ({ ...prev, broadcastType: type.id as any }))}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                  : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                isSelected ? 'bg-[var(--secondary)]' : 'bg-[var(--background)]'
              }`}>
                <Icon size={28} className={isSelected ? 'text-white' : 'text-[var(--muted)]'} />
              </div>
              <h3 className="font-semibold mb-2">{type.name}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{type.description}</p>

              {/* Feature hints */}
              <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                <p className="text-xs text-[var(--muted)]">
                  {type.id === 'general' && 'Includes: Polls, Q&A, Giveaways, Notices'}
                  {type.id === 'commerce' && 'Includes: Product Panel, Cart, Sales Tracking'}
                  {type.id === 'vod' && 'Includes: Video Upload, Optional Products'}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Step 2: Stream Type Selection
function Step2StreamType({
  formData,
  setFormData,
}: {
  formData: StreamFormData
  setFormData: React.Dispatch<React.SetStateAction<StreamFormData>>
}) {
  // For VOD broadcast, auto-select pre-recorded
  const isVOD = formData.broadcastType === 'vod'

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

        {/* Live Stream - disabled for VOD */}
        <button
          onClick={() => !isVOD && setFormData(prev => ({ ...prev, streamType: 'live' }))}
          disabled={isVOD}
          className={`p-8 rounded-xl border-2 transition-all ${
            formData.streamType === 'live'
              ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
              : isVOD
                ? 'border-[var(--border-color)] opacity-50 cursor-not-allowed'
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
            {isVOD && (
              <p className="text-xs text-[var(--accent)] mt-2">
                Not available for VOD Streaming
              </p>
            )}
          </div>
        </button>
      </div>
    </div>
  )
}

// Step 3: Stream Detail
function Step3StreamDetail({
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
        const newSettings = { ...prev.platformSettings }
        delete newSettings[platform.id]
        return {
          ...prev,
          platforms: prev.platforms.filter(p => p.id !== platform.id),
          platformSettings: newSettings
        }
      }
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
        [platformId]: { ...prev.platformSettings[platformId], [field]: value }
      }
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        videoFile: { name: file.name, size: file.size, duration: '00:00' }
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
        videoFile: { name: file.name, size: file.size, duration: '00:00' }
      }))
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(2) + ' GB'
    if (bytes >= 1048576) return (bytes / 1048576).toFixed(2) + ' MB'
    return (bytes / 1024).toFixed(2) + ' KB'
  }

  const addChannel = () => {
    if (newChannel.name && newChannel.url) {
      setFormData(prev => ({ ...prev, channels: [...prev.channels, newChannel] }))
      setNewChannel({ name: '', url: '' })
      setShowChannelModal(false)
    }
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
                onClick={() => setFormData(prev => ({ ...prev, videoFile: null }))}
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
              <button onClick={() => togglePlatform(platform as any)} className="hover:text-[var(--accent)]">
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
                onClick={() => setFormData(prev => ({
                  ...prev,
                  channels: prev.channels.filter((_, i) => i !== index)
                }))}
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

      {/* Platform Settings */}
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

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          value={formData.category}
          onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
        >
          <option value="">Select category</option>
          <option value="gaming">Gaming</option>
          <option value="entertainment">Entertainment</option>
          <option value="music">Music</option>
          <option value="education">Education</option>
          <option value="sports">Sports</option>
          <option value="news">News</option>
          <option value="talk-show">Talk Show</option>
        </select>
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
        <select
          value={formData.broadcaster}
          onChange={e => setFormData(prev => ({ ...prev, broadcaster: e.target.value }))}
          className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
        >
          <option value="">Select broadcaster</option>
          <option value="Lee Min Ho">Lee Min Ho</option>
          <option value="Kim Soo Jin">Kim Soo Jin</option>
          <option value="Park Ji Yeon">Park Ji Yeon</option>
        </select>
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
              <button onClick={() => setShowPlatformModal(false)}><X size={20} /></button>
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
            <div className="flex justify-end mt-4">
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
              <button onClick={() => setShowChannelModal(false)}><X size={20} /></button>
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

// Step 4: Product Attach (Commerce and VOD only)
function Step4ProductAttach({
  formData,
  setFormData,
}: {
  formData: StreamFormData
  setFormData: React.Dispatch<React.SetStateAction<StreamFormData>>
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<typeof SAMPLE_PRODUCTS>([])
  const isOptional = formData.broadcastType === 'vod'

  const handleSearch = () => {
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
      <p className="text-[var(--muted)] text-center mb-2">
        Attach products from your shopping mall to your stream
      </p>
      {isOptional && (
        <p className="text-center text-sm text-[var(--secondary)] mb-8">
          Products are optional for VOD streaming
        </p>
      )}

      <div className="grid grid-cols-2 gap-8">
        {/* Left: Search */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Shopping Mall</label>
            <select
              value={formData.shoppingMall}
              onChange={e => setFormData(prev => ({ ...prev, shoppingMall: e.target.value }))}
              className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
            >
              <option value="">Select shopping mall</option>
              {SHOPPING_MALLS.map(mall => (
                <option key={mall.id} value={mall.id}>{mall.name}</option>
              ))}
            </select>
          </div>

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

          <div className="space-y-2 max-h-80 overflow-y-auto">
            {searchResults.map(product => (
              <div key={product.id} className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-lg">
                <div className="w-12 h-12 bg-[var(--border-color)] rounded-lg flex items-center justify-center">
                  <ImageIcon size={20} className="text-[var(--muted)]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-[var(--muted)]">
                    Qty: {product.quantity} | ${(product.price / 1000).toFixed(2)}
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
                  <div key={product.id} className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-lg">
                    <div className="w-12 h-12 bg-[var(--border-color)] rounded-lg flex items-center justify-center">
                      <ImageIcon size={20} className="text-[var(--muted)]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-[var(--muted)]">
                        Qty: {product.quantity} | ${(product.price / 1000).toFixed(2)}
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

// Step 5: Schedule
function Step5Schedule({
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

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Start Time</label>
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

          <div>
            <label className="block text-sm font-medium mb-2">End Time</label>
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

          <div>
            <label className="block text-sm font-medium mb-2">Timezone</label>
            <div className="relative">
              <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
              <select
                value={formData.timezone}
                onChange={e => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
              >
                {TIMEZONES.map(tz => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 p-4 bg-[var(--background)] rounded-lg">
        <h3 className="text-sm font-medium mb-3">Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-[var(--muted)]">Broadcast Type:</span>{' '}
            <span className="font-medium capitalize">{formData.broadcastType}</span>
          </div>
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
          <div className="col-span-2">
            <span className="text-[var(--muted)]">Scheduled:</span>{' '}
            <span className="font-medium">
              {formData.scheduledDate} {formData.startTime} - {formData.endTime}
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
    broadcastType: null,
    streamType: null,
    videoFile: null,
    channels: [],
    platforms: [],
    platformSettings: {},
    title: '',
    category: '',
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

  // Get total steps based on broadcast type
  const getTotalSteps = () => {
    if (formData.broadcastType === 'general') return 4 // Skip products
    return 5
  }

  // Get actual step number (accounting for skipped product step)
  const getActualStep = (logicalStep: number) => {
    if (formData.broadcastType === 'general' && logicalStep >= 4) {
      return logicalStep + 1 // Skip product step for general broadcast
    }
    return logicalStep
  }

  const canProceed = () => {
    // Temporarily allow all steps for testing UI
    return true
  }

  const handleNext = () => {
    const totalSteps = getTotalSteps()
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    } else {
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

  // Render current step content
  const renderStepContent = () => {
    const actualStep = getActualStep(currentStep)
    switch (actualStep) {
      case 1: return <Step1BroadcastType formData={formData} setFormData={setFormData} />
      case 2: return <Step2StreamType formData={formData} setFormData={setFormData} />
      case 3: return <Step3StreamDetail formData={formData} setFormData={setFormData} />
      case 4: return <Step4ProductAttach formData={formData} setFormData={setFormData} />
      case 5: return <Step5Schedule formData={formData} setFormData={setFormData} />
      default: return null
    }
  }

  const totalSteps = getTotalSteps()

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
        <StepIndicator currentStep={currentStep} broadcastType={formData.broadcastType} />

        {/* Step Content */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-8 mb-6">
          {renderStepContent()}
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
            className="px-6 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[#7c4fe0] transition-colors flex items-center gap-2"
          >
            {currentStep === totalSteps ? 'Create Stream' : 'Next'}
            {currentStep < totalSteps && <ArrowRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  )
}
