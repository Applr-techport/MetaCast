'use client'

import { Header } from '@/components/layout/Header'
import { useState } from 'react'
import {
  Youtube,
  Instagram,
  Facebook,
  Twitter,
  Plus,
  Check,
  X,
  ExternalLink,
  Settings,
  RefreshCw,
  MoreVertical,
  AlertCircle,
  Tv,
  Link2,
  Radio,
  Upload,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  ChevronRight,
  Clock,
  Users,
  Video,
  Zap,
  BarChart2,
} from 'lucide-react'

// Channels Header Actions
function ChannelsHeaderActions({ channelCount, onAddChannel }: { channelCount: number; onAddChannel: () => void }) {
  return (
    <div className="flex items-center gap-3">
      {/* Connected Count */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--secondary)]/10 rounded-lg border border-[var(--secondary)]/20">
        <Link2 size={14} className="text-[var(--secondary)]" />
        <span className="text-sm font-medium text-[var(--secondary)]">{channelCount} channels</span>
      </div>
      {/* Add Channel Button */}
      <button
        onClick={onAddChannel}
        className="flex items-center gap-2 px-4 py-2 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg text-sm font-medium transition-colors"
      >
        <Plus size={18} />
        <span>Add Channel</span>
      </button>
    </div>
  )
}

// Platform info type
interface PlatformInfo {
  name: string
  icon: typeof Youtube
  capabilities: ('live' | 'upload')[]
  liveRequirements?: {
    maxResolution?: string
    maxFps?: number
    protocols?: string[]
    keyframeInterval?: string
    note?: string
  }
  uploadRequirements?: {
    maxFileSize?: string
    formats?: string[]
    maxDuration?: string
    aspectRatio?: string
    dailyLimit?: string
    rateLimit?: string
  }
  authType: string
  scopes?: string[]
  note?: string
}

// Platform info with API requirements
const platformInfo: Record<string, PlatformInfo> = {
  youtube: {
    name: 'YouTube',
    icon: Youtube,
    capabilities: ['live', 'upload'],
    liveRequirements: {
      maxResolution: '1080p',
      maxFps: 60,
      protocols: ['RTMP', 'HLS'],
      keyframeInterval: '2s recommended',
    },
    uploadRequirements: {
      maxFileSize: '256GB',
      formats: ['MP4', 'MOV', 'AVI', 'WMV'],
      maxDuration: '12 hours',
    },
    authType: 'OAuth 2.0',
    scopes: ['youtube.upload', 'youtube.readonly', 'youtube.force-ssl'],
  },
  facebook: {
    name: 'Facebook',
    icon: Facebook,
    capabilities: ['live', 'upload'],
    liveRequirements: {
      maxResolution: '720p',
      maxFps: 30,
      protocols: ['RTMP'],
      keyframeInterval: '2s required',
    },
    uploadRequirements: {
      maxFileSize: '10GB',
      formats: ['MP4', 'MOV'],
      maxDuration: '240 minutes',
    },
    authType: 'OAuth 2.0',
    scopes: ['pages_manage_posts', 'pages_read_engagement', 'publish_video'],
  },
  instagram: {
    name: 'Instagram',
    icon: Instagram,
    capabilities: ['upload'],
    uploadRequirements: {
      maxFileSize: '100MB',
      formats: ['MP4', 'MOV'],
      maxDuration: '90 seconds (Reels)',
      aspectRatio: '9:16 recommended',
      dailyLimit: '50 posts/day',
    },
    authType: 'OAuth 2.0 (via Facebook)',
    scopes: ['instagram_basic', 'instagram_content_publish'],
    note: 'Requires Business/Creator account linked to Facebook Page',
  },
  tiktok: {
    name: 'TikTok',
    icon: Tv,
    capabilities: ['upload'],
    uploadRequirements: {
      maxFileSize: '4GB',
      formats: ['MP4', 'WebM'],
      maxDuration: '10 minutes',
      rateLimit: '6 requests/min',
    },
    authType: 'OAuth 2.0',
    scopes: ['video.upload', 'video.publish'],
    note: 'Content visibility limited until audit approval',
  },
  twitter: {
    name: 'X (Twitter)',
    icon: Twitter,
    capabilities: ['upload'],
    uploadRequirements: {
      maxFileSize: '512MB',
      formats: ['MP4'],
      maxDuration: '140 seconds (2:20)',
    },
    authType: 'OAuth 2.0',
    scopes: ['tweet.write', 'users.read'],
  },
  custom: {
    name: 'Custom RTMP',
    icon: Settings,
    capabilities: ['live'],
    liveRequirements: {
      protocols: ['RTMP', 'RTMPS'],
      note: 'Configure your own RTMP server',
    },
    authType: 'Stream Key',
  },
}

type PlatformId = keyof typeof platformInfo

interface ConnectedChannel {
  id: string
  platform: PlatformId
  accountName: string
  accountId: string
  avatar?: string
  status: 'active' | 'expired' | 'error'
  capabilities: ('live' | 'upload')[]
  lastSync: string
  stats?: {
    followers?: string
    videos?: number
    streams?: number
  }
  // Platform-specific settings
  settings?: {
    defaultPrivacy?: string
    streamKey?: string
    rtmpUrl?: string
  }
}

// Recent activity data
const recentActivity = [
  {
    id: '1',
    platform: 'youtube' as PlatformId,
    type: 'upload',
    title: 'Product Launch Highlight Video',
    channel: 'MetaCast Official',
    time: '2 hours ago',
    views: '1.2K',
    status: 'published',
  },
  {
    id: '2',
    platform: 'facebook' as PlatformId,
    type: 'live',
    title: 'Weekly Q&A Session',
    channel: 'MetaCast Page',
    time: '5 hours ago',
    views: '856',
    status: 'published',
  },
  {
    id: '3',
    platform: 'youtube' as PlatformId,
    type: 'upload',
    title: 'Behind the Scenes #12',
    channel: 'MetaCast Official',
    time: 'Tomorrow 3:00 PM',
    status: 'scheduled',
  },
  {
    id: '4',
    platform: 'instagram' as PlatformId,
    type: 'upload',
    title: 'New Feature Teaser Reel',
    channel: 'metacast_official',
    time: 'Pending reconnection',
    status: 'pending',
  },
]

// API usage data
const apiUsage: Record<PlatformId, { dailyUploads?: { used: number; limit: number }; apiCalls?: { used: number; limit: number }; storageUsed?: string } | undefined> = {
  youtube: {
    dailyUploads: { used: 12, limit: 100 },
    apiCalls: { used: 4500, limit: 10000 },
    storageUsed: '45.2 GB',
  },
  facebook: {
    dailyUploads: { used: 8, limit: 50 },
    apiCalls: { used: 1200, limit: 5000 },
  },
  instagram: undefined,
  tiktok: {
    dailyUploads: { used: 3, limit: 50 },
    apiCalls: { used: 45, limit: 360 },
  },
  twitter: {
    dailyUploads: { used: 5, limit: 50 },
    apiCalls: { used: 800, limit: 2400 },
  },
  custom: undefined,
}

// Sample connected channels
const connectedChannels: ConnectedChannel[] = [
  {
    id: '1',
    platform: 'youtube',
    accountName: 'MetaCast Official',
    accountId: 'UC_xxxxxxxxxxxxx',
    status: 'active',
    capabilities: ['live', 'upload'],
    lastSync: '2 hours ago',
    stats: {
      followers: '125K',
      videos: 234,
      streams: 56,
    },
  },
  {
    id: '2',
    platform: 'facebook',
    accountName: 'MetaCast Page',
    accountId: '123456789',
    status: 'active',
    capabilities: ['live', 'upload'],
    lastSync: '1 hour ago',
    stats: {
      followers: '45K',
      videos: 89,
      streams: 23,
    },
  },
  {
    id: '3',
    platform: 'instagram',
    accountName: 'metacast_official',
    accountId: '17841400000000',
    status: 'expired',
    capabilities: ['upload'],
    lastSync: '3 days ago',
    stats: {
      followers: '89K',
      videos: 156,
    },
  },
]

// Platform icon component (purple unified)
function PlatformIcon({
  platform,
  size = 24,
}: {
  platform: PlatformId
  size?: number
}) {
  const info = platformInfo[platform]
  if (!info) return null

  const Icon = info.icon
  return (
    <div
      className="rounded-lg flex items-center justify-center bg-[var(--secondary)]/10"
      style={{
        width: size + 12,
        height: size + 12,
      }}
    >
      <Icon size={size} className="text-[var(--secondary)]" />
    </div>
  )
}

// Connected channel card
function ConnectedChannelCard({
  channel,
  onManage,
  onDisconnect,
}: {
  channel: ConnectedChannel
  onManage: () => void
  onDisconnect: () => void
}) {
  const [showMenu, setShowMenu] = useState(false)
  const info = platformInfo[channel.platform]

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4 hover:border-[var(--secondary)] transition-colors">
      <div className="flex items-start gap-4">
        {/* Platform icon */}
        <PlatformIcon platform={channel.platform} size={20} />

        {/* Channel info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-sm truncate">{channel.accountName}</h3>
            {channel.status === 'active' && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-[var(--success)]/10 text-[var(--success)] text-xs rounded-full">
                <Check size={12} />
                Active
              </span>
            )}
            {channel.status === 'expired' && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-[var(--warning)]/10 text-[var(--warning)] text-xs rounded-full">
                <AlertCircle size={12} />
                Reconnect
              </span>
            )}
            {channel.status === 'error' && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] text-xs rounded-full">
                <X size={12} />
                Error
              </span>
            )}
          </div>

          {/* Capabilities */}
          <div className="flex items-center gap-2 mb-2">
            {channel.capabilities.includes('live') && (
              <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
                <Radio size={12} />
                Live
              </span>
            )}
            {channel.capabilities.includes('upload') && (
              <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
                <Upload size={12} />
                Upload
              </span>
            )}
          </div>

          {/* Stats */}
          {channel.stats && (
            <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
              {channel.stats.followers && (
                <span className="flex items-center gap-1">
                  <Users size={12} />
                  {channel.stats.followers}
                </span>
              )}
              {channel.stats.videos !== undefined && (
                <span className="flex items-center gap-1">
                  <Video size={12} />
                  {channel.stats.videos} videos
                </span>
              )}
              {channel.stats.streams !== undefined && (
                <span className="flex items-center gap-1">
                  <Radio size={12} />
                  {channel.stats.streams} streams
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {channel.lastSync}
              </span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          {channel.status === 'expired' && (
            <button className="flex items-center gap-1 px-3 py-1.5 bg-[var(--secondary)] text-white rounded-lg text-sm hover:bg-[#7c4fe0] transition-colors">
              <RefreshCw size={14} />
              Reconnect
            </button>
          )}
          <button
            onClick={onManage}
            className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
          >
            <Settings size={16} className="text-[var(--muted)]" />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
            >
              <MoreVertical size={16} className="text-[var(--muted)]" />
            </button>
            {showMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                <div className="absolute right-0 top-full mt-1 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-xl z-50 py-1 min-w-[160px]">
                  <button
                    onClick={() => {
                      setShowMenu(false)
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--background)] transition-colors"
                  >
                    <ExternalLink size={14} />
                    View on {info.name}
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false)
                      onDisconnect()
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--accent)] hover:bg-[var(--background)] transition-colors"
                  >
                    <Trash2 size={14} />
                    Disconnect
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Add Channel Modal
function AddChannelModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId | null>(null)

  if (!isOpen) return null

  const platforms = Object.entries(platformInfo).filter(([id]) => id !== 'custom') as [PlatformId, typeof platformInfo.youtube][]

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[var(--card-bg)] rounded-2xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Add Channel</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {!selectedPlatform ? (
          <>
            <p className="text-sm text-[var(--muted)] mb-4">
              Connect your social media account to publish content directly from MetaCast.
            </p>
            <div className="space-y-2">
              {platforms.map(([id, info]) => {
                const Icon = info.icon
                return (
                  <button
                    key={id}
                    onClick={() => setSelectedPlatform(id)}
                    className="w-full flex items-center gap-4 p-4 bg-[var(--background)] border border-[var(--border-color)] rounded-xl hover:border-[var(--secondary)] transition-colors text-left"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--secondary)]/10">
                      <Icon size={24} className="text-[var(--secondary)]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{info.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-[var(--muted)] mt-1">
                        {info.capabilities.includes('live') && (
                          <span className="flex items-center gap-1">
                            <Radio size={12} /> Live
                          </span>
                        )}
                        {info.capabilities.includes('upload') && (
                          <span className="flex items-center gap-1">
                            <Upload size={12} /> Upload
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-[var(--muted)]" />
                  </button>
                )
              })}
            </div>

            {/* Custom RTMP */}
            <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
              <button
                onClick={() => setSelectedPlatform('custom')}
                className="w-full flex items-center gap-4 p-4 bg-[var(--background)] border border-[var(--border-color)] rounded-xl hover:border-[var(--secondary)] transition-colors text-left"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--secondary)]/10">
                  <Settings size={24} className="text-[var(--secondary)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Custom RTMP</h3>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Connect any RTMP-compatible streaming destination
                  </p>
                </div>
                <ChevronRight size={20} className="text-[var(--muted)]" />
              </button>
            </div>
          </>
        ) : selectedPlatform === 'custom' ? (
          <CustomRtmpForm onBack={() => setSelectedPlatform(null)} onClose={onClose} />
        ) : (
          <OAuthConnectView
            platform={selectedPlatform}
            onBack={() => setSelectedPlatform(null)}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  )
}

// OAuth Connect View
function OAuthConnectView({
  platform,
  onBack,
  onClose,
}: {
  platform: PlatformId
  onBack: () => void
  onClose: () => void
}) {
  const [isConnecting, setIsConnecting] = useState(false)
  const info = platformInfo[platform]
  const Icon = info.icon

  const handleConnect = () => {
    setIsConnecting(true)
    // OAuth 연동 시뮬레이션
    setTimeout(() => {
      console.log(`Connecting to ${platform}...`)
      // 실제로는 OAuth 팝업 열기
      setIsConnecting(false)
      onClose()
    }, 1500)
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] mb-4"
      >
        <ChevronRight size={16} className="rotate-180" />
        Back
      </button>

      <div className="text-center py-6">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[var(--secondary)]/10 mx-auto mb-4">
          <Icon size={32} className="text-[var(--secondary)]" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Connect {info.name}</h3>
        <p className="text-sm text-[var(--muted)] mb-6">
          You will be redirected to {info.name} to authorize MetaCast.
        </p>
      </div>

      {/* Capabilities */}
      <div className="bg-[var(--background)] rounded-xl p-4 mb-4">
        <h4 className="text-sm font-medium mb-3">Capabilities</h4>
        <div className="space-y-2">
          {info.capabilities.includes('live') && (
            <div className="flex items-center gap-3 text-sm">
              <Radio size={16} className="text-[var(--secondary)]" />
              <span>Live Streaming</span>
              <span className="text-xs text-[var(--muted)] ml-auto">
                {info.liveRequirements?.maxResolution} @ {info.liveRequirements?.maxFps}fps
              </span>
            </div>
          )}
          {info.capabilities.includes('upload') && (
            <div className="flex items-center gap-3 text-sm">
              <Upload size={16} className="text-[var(--secondary)]" />
              <span>Video Upload</span>
              <span className="text-xs text-[var(--muted)] ml-auto">
                Max {info.uploadRequirements?.maxFileSize}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Permissions */}
      <div className="bg-[var(--background)] rounded-xl p-4 mb-6">
        <h4 className="text-sm font-medium mb-3">Permissions Required</h4>
        <ul className="space-y-1 text-sm text-[var(--muted)]">
          {info.scopes?.map((scope) => (
            <li key={scope} className="flex items-center gap-2">
              <Check size={14} className="text-[var(--secondary)]" />
              {scope}
            </li>
          ))}
        </ul>
      </div>

      {/* Note */}
      {info.note && (
        <div className="flex items-start gap-3 p-3 bg-[var(--secondary)]/5 border border-[var(--secondary)]/20 rounded-lg mb-6">
          <AlertCircle size={16} className="text-[var(--secondary)] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--muted)]">{info.note}</p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm font-medium hover:bg-[var(--border-color)] transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[#7c4fe0] transition-colors disabled:opacity-50"
        >
          {isConnecting ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Zap size={16} />
              Connect with {info.name}
            </>
          )}
        </button>
      </div>
    </div>
  )
}

// Custom RTMP Form
function CustomRtmpForm({
  onBack,
  onClose,
}: {
  onBack: () => void
  onClose: () => void
}) {
  const [showKey, setShowKey] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    rtmpUrl: '',
    streamKey: '',
  })

  const handleSave = () => {
    console.log('Saving custom RTMP:', formData)
    onClose()
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] mb-4"
      >
        <ChevronRight size={16} className="rotate-180" />
        Back
      </button>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Destination Name</label>
          <input
            type="text"
            placeholder="e.g., My Streaming Server"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">RTMP URL</label>
          <input
            type="text"
            placeholder="rtmp://your-server.com/live"
            value={formData.rtmpUrl}
            onChange={(e) => setFormData({ ...formData, rtmpUrl: e.target.value })}
            className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Stream Key</label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              placeholder="Your stream key"
              value={formData.streamKey}
              onChange={(e) => setFormData({ ...formData, streamKey: e.target.value })}
              className="w-full px-4 py-3 pr-20 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="p-1.5 hover:bg-[var(--border-color)] rounded transition-colors"
              >
                {showKey ? (
                  <EyeOff size={16} className="text-[var(--muted)]" />
                ) : (
                  <Eye size={16} className="text-[var(--muted)]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(formData.streamKey)}
                className="p-1.5 hover:bg-[var(--border-color)] rounded transition-colors"
              >
                <Copy size={16} className="text-[var(--muted)]" />
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex items-start gap-3 p-3 bg-[var(--secondary)]/5 border border-[var(--secondary)]/20 rounded-lg">
          <AlertCircle size={16} className="text-[var(--secondary)] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--muted)]">
            Custom RTMP destinations support live streaming only. Video uploads are not available.
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onBack}
          className="flex-1 px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm font-medium hover:bg-[var(--border-color)] transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!formData.name || !formData.rtmpUrl}
          className="flex-1 px-4 py-3 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[#7c4fe0] transition-colors disabled:opacity-50"
        >
          Save Destination
        </button>
      </div>
    </div>
  )
}

// Channel Settings Modal
function ChannelSettingsModal({
  channel,
  isOpen,
  onClose,
}: {
  channel: ConnectedChannel | null
  isOpen: boolean
  onClose: () => void
}) {
  if (!isOpen || !channel) return null

  const info = platformInfo[channel.platform]
  const Icon = info.icon

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[var(--card-bg)] rounded-2xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--secondary)]/10">
              <Icon size={20} className="text-[var(--secondary)]" />
            </div>
            <div>
              <h2 className="font-bold">{channel.accountName}</h2>
              <p className="text-sm text-[var(--muted)]">{info.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Status */}
        <div className="bg-[var(--background)] rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium">Connection Status</h4>
            {channel.status === 'active' ? (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-[var(--success)]/10 text-[var(--success)] text-xs rounded-full">
                <Check size={12} />
                Active
              </span>
            ) : (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-[var(--warning)]/10 text-[var(--warning)] text-xs rounded-full">
                <AlertCircle size={12} />
                Needs Reconnection
              </span>
            )}
          </div>
          <p className="text-sm text-[var(--muted)]">
            Last synced: {channel.lastSync}
          </p>
        </div>

        {/* Capabilities */}
        <div className="bg-[var(--background)] rounded-xl p-4 mb-4">
          <h4 className="text-sm font-medium mb-3">Available Features</h4>
          <div className="space-y-2">
            {channel.capabilities.includes('live') && (
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Radio size={16} className="text-[var(--secondary)]" />
                  Live Streaming
                </span>
                <span className="text-xs text-[var(--muted)]">
                  {info.liveRequirements?.maxResolution} @ {info.liveRequirements?.maxFps}fps
                </span>
              </div>
            )}
            {channel.capabilities.includes('upload') && (
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Upload size={16} className="text-[var(--secondary)]" />
                  Video Upload
                </span>
                <span className="text-xs text-[var(--muted)]">
                  Max {info.uploadRequirements?.maxFileSize}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Account Stats */}
        {channel.stats && (
          <div className="bg-[var(--background)] rounded-xl p-4 mb-4">
            <h4 className="text-sm font-medium mb-3">Account Stats</h4>
            <div className="grid grid-cols-3 gap-4">
              {channel.stats.followers && (
                <div className="text-center">
                  <p className="text-lg font-bold">{channel.stats.followers}</p>
                  <p className="text-xs text-[var(--muted)]">Followers</p>
                </div>
              )}
              {channel.stats.videos !== undefined && (
                <div className="text-center">
                  <p className="text-lg font-bold">{channel.stats.videos}</p>
                  <p className="text-xs text-[var(--muted)]">Videos</p>
                </div>
              )}
              {channel.stats.streams !== undefined && (
                <div className="text-center">
                  <p className="text-lg font-bold">{channel.stats.streams}</p>
                  <p className="text-xs text-[var(--muted)]">Streams</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          {channel.status === 'expired' && (
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[#7c4fe0] transition-colors">
              <RefreshCw size={16} />
              Reconnect Account
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm font-medium hover:bg-[var(--border-color)] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ChannelsPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState<ConnectedChannel | null>(null)
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  const handleManageChannel = (channel: ConnectedChannel) => {
    setSelectedChannel(channel)
    setShowSettingsModal(true)
  }

  const handleDisconnect = (channel: ConnectedChannel) => {
    if (confirm(`Disconnect ${channel.accountName}?`)) {
      console.log('Disconnecting:', channel.id)
    }
  }

  return (
    <div className="min-h-screen">
      <Header actions={<ChannelsHeaderActions channelCount={connectedChannels.length} onAddChannel={() => setShowAddModal(true)} />} />

      <div className="p-6 max-w-4xl mx-auto">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Channels</h1>
          <p className="text-[var(--muted)] mt-1">
            Manage your connected platforms for publishing and streaming
          </p>
        </div>

        {/* 1. Overview */}
        {connectedChannels.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
                <BarChart2 size={16} className="text-[var(--secondary)]" />
              </div>
              <h2 className="text-lg font-semibold">Overview</h2>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={16} className="text-[var(--secondary)]" />
                  <span className="text-xs text-[var(--muted)]">Total Reach</span>
                </div>
                <p className="text-2xl font-bold">259K</p>
                <p className="text-xs text-[var(--success)]">+12% this month</p>
              </div>
              <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Video size={16} className="text-[var(--secondary)]" />
                  <span className="text-xs text-[var(--muted)]">Videos Published</span>
                </div>
                <p className="text-2xl font-bold">479</p>
                <p className="text-xs text-[var(--muted)]">Across all channels</p>
              </div>
              <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Radio size={16} className="text-[var(--secondary)]" />
                  <span className="text-xs text-[var(--muted)]">Live Streams</span>
                </div>
                <p className="text-2xl font-bold">79</p>
                <p className="text-xs text-[var(--muted)]">Total broadcasts</p>
              </div>
              <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={16} className="text-[var(--secondary)]" />
                  <span className="text-xs text-[var(--muted)]">Scheduled</span>
                </div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-[var(--muted)]">Upcoming posts</p>
              </div>
            </div>
          </section>
        )}

        {/* 2. Connected Channels */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
              <Link2 size={16} className="text-[var(--secondary)]" />
            </div>
            <h2 className="text-lg font-semibold">Connected Channels</h2>
          </div>

          {connectedChannels.length > 0 ? (
            <div className="space-y-3">
              {connectedChannels.map((channel) => (
                <ConnectedChannelCard
                  key={channel.id}
                  channel={channel}
                  onManage={() => handleManageChannel(channel)}
                  onDisconnect={() => handleDisconnect(channel)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-[var(--secondary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Link2 size={32} className="text-[var(--secondary)]" />
              </div>
              <p className="text-[var(--foreground)] font-medium">No channels connected</p>
              <p className="text-sm text-[var(--muted)] mt-1 mb-4">
                Connect your social media accounts to start publishing
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[#7c4fe0] transition-colors"
              >
                <Plus size={16} />
                Add Channel
              </button>
            </div>
          )}
        </section>

        {/* 3. API Usage & Limits */}
        {connectedChannels.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-[var(--secondary)]" />
              </div>
              <h2 className="text-lg font-semibold">API Usage & Limits</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {connectedChannels.filter(c => c.status === 'active').map((channel) => {
                const info = platformInfo[channel.platform]
                const usage = apiUsage[channel.platform]
                return (
                  <div key={channel.id} className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <PlatformIcon platform={channel.platform} size={16} />
                      <div>
                        <p className="font-medium text-sm">{channel.accountName}</p>
                        <p className="text-xs text-[var(--muted)]">{info.name}</p>
                      </div>
                    </div>
                    {usage && (
                      <div className="space-y-3">
                        {usage.dailyUploads && (
                          <div>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-[var(--muted)]">Daily Uploads</span>
                              <span>{usage.dailyUploads.used}/{usage.dailyUploads.limit}</span>
                            </div>
                            <div className="h-1.5 bg-[var(--background)] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[var(--secondary)] rounded-full"
                                style={{ width: `${(usage.dailyUploads.used / usage.dailyUploads.limit) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                        {usage.apiCalls && (
                          <div>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-[var(--muted)]">API Calls (today)</span>
                              <span>{usage.apiCalls.used}/{usage.apiCalls.limit}</span>
                            </div>
                            <div className="h-1.5 bg-[var(--background)] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[var(--secondary)] rounded-full"
                                style={{ width: `${(usage.apiCalls.used / usage.apiCalls.limit) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                        {usage.storageUsed && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[var(--muted)]">Storage Used</span>
                            <span>{usage.storageUsed}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* 4. Recent Activity */}
        {connectedChannels.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
                  <Clock size={16} className="text-[var(--secondary)]" />
                </div>
                <h2 className="text-lg font-semibold">Recent Activity</h2>
              </div>
              <button className="text-sm text-[var(--secondary)] hover:underline">View All</button>
            </div>
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl divide-y divide-[var(--border-color)]">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4 hover:bg-[var(--background)] transition-colors">
                  <PlatformIcon platform={activity.platform} size={16} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{activity.title}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        activity.type === 'live'
                          ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                          : 'bg-[var(--secondary)]/10 text-[var(--secondary)]'
                      }`}>
                        {activity.type === 'live' ? 'Live' : 'Upload'}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--muted)]">{activity.channel} • {activity.time}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
                    {activity.views && (
                      <span className="flex items-center gap-1">
                        <Eye size={12} />
                        {activity.views}
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded-full ${
                      activity.status === 'published'
                        ? 'bg-[var(--success)]/10 text-[var(--success)]'
                        : activity.status === 'scheduled'
                        ? 'bg-[var(--secondary)]/10 text-[var(--secondary)]'
                        : 'bg-[var(--warning)]/10 text-[var(--warning)]'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Info */}
        <section className="mt-8">
          <div className="bg-[var(--secondary)]/5 border border-[var(--secondary)]/20 rounded-xl p-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle size={16} className="text-[var(--secondary)]" />
              </div>
              <div className="text-sm text-[var(--muted)]">
                <p className="font-medium text-[var(--foreground)] mb-1">
                  About Channel Connections
                </p>
                <p>
                  MetaCast uses OAuth 2.0 to securely connect to your accounts. We only request
                  permissions needed for publishing content. You can revoke access anytime from
                  your platform settings.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modals */}
      <AddChannelModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
      <ChannelSettingsModal
        channel={selectedChannel}
        isOpen={showSettingsModal}
        onClose={() => {
          setShowSettingsModal(false)
          setSelectedChannel(null)
        }}
      />
    </div>
  )
}
