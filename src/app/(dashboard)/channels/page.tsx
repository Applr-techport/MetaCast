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
} from 'lucide-react'

// Channels Header Actions
function ChannelsHeaderActions() {
  return (
    <div className="flex items-center gap-3">
      {/* Connected Count */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--success)]/10 rounded-lg">
        <Check size={14} className="text-[var(--success)]" />
        <span className="text-sm font-medium text-[var(--success)]">3 connected</span>
      </div>
      {/* Add Channel Button */}
      <button className="flex items-center gap-2 px-4 py-2 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg text-sm font-medium transition-colors">
        <Link2 size={18} />
        <span>Add Channel</span>
      </button>
    </div>
  )
}

interface Channel {
  id: string
  platform: 'youtube' | 'instagram' | 'facebook' | 'tiktok' | 'twitter' | 'custom'
  name: string
  handle: string
  followers: string
  connected: boolean
  status: 'active' | 'expired' | 'error'
  lastSync?: string
  avatar?: string
}

// 샘플 연결된 채널
const connectedChannels: Channel[] = [
  {
    id: '1',
    platform: 'youtube',
    name: 'MetaCast Official',
    handle: '@xcaster_official',
    followers: '125K',
    connected: true,
    status: 'active',
    lastSync: '2 hours ago',
  },
  {
    id: '2',
    platform: 'instagram',
    name: 'MetaCast',
    handle: '@xcaster',
    followers: '89K',
    connected: true,
    status: 'active',
    lastSync: '1 hour ago',
  },
  {
    id: '3',
    platform: 'facebook',
    name: 'MetaCast Page',
    handle: '/xcaster',
    followers: '45K',
    connected: true,
    status: 'expired',
    lastSync: '3 days ago',
  },
]

// 연결 가능한 플랫폼
const availablePlatforms = [
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    color: '#FF0000',
    description: 'Upload videos and go live',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    color: '#E4405F',
    description: 'Share reels and stories',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    color: '#1877F2',
    description: 'Post to pages and groups',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: Tv,
    color: '#000000',
    description: 'Share short videos',
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: Twitter,
    color: '#000000',
    description: 'Post video tweets',
  },
  {
    id: 'custom',
    name: 'Custom RTMP',
    icon: Settings,
    color: '#6b7280',
    description: 'Connect any RTMP destination',
  },
]

// 플랫폼 아이콘 컴포넌트
function PlatformIcon({
  platform,
  size = 24,
}: {
  platform: Channel['platform']
  size?: number
}) {
  const platformData = availablePlatforms.find((p) => p.id === platform)
  if (!platformData) return null

  const Icon = platformData.icon
  return (
    <div
      className="rounded-lg flex items-center justify-center"
      style={{
        backgroundColor: platformData.color,
        width: size + 12,
        height: size + 12,
      }}
    >
      <Icon size={size} className="text-white" />
    </div>
  )
}

// 연결된 채널 카드
function ConnectedChannelCard({ channel }: { channel: Channel }) {
  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4 hover:border-[var(--primary)] transition-colors">
      <div className="flex items-start gap-4">
        {/* 플랫폼 아이콘 */}
        <PlatformIcon platform={channel.platform} size={20} />

        {/* 채널 정보 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-sm truncate">{channel.name}</h3>
            {channel.status === 'active' && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-[var(--success)]/10 text-[var(--success)] text-xs rounded-full">
                <Check size={12} />
                Connected
              </span>
            )}
            {channel.status === 'expired' && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-500/10 text-yellow-600 text-xs rounded-full">
                <AlertCircle size={12} />
                Expired
              </span>
            )}
          </div>
          <p className="text-sm text-[var(--muted)] mt-0.5">{channel.handle}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-[var(--muted)]">
            <span>{channel.followers} followers</span>
            <span>•</span>
            <span>Last sync: {channel.lastSync}</span>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex items-center gap-1">
          {channel.status === 'expired' && (
            <button className="flex items-center gap-1 px-3 py-1.5 bg-[var(--primary)] text-white rounded-lg text-sm hover:bg-[var(--primary-hover)] transition-colors">
              <RefreshCw size={14} />
              Reconnect
            </button>
          )}
          <button className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors">
            <ExternalLink size={16} className="text-[var(--muted)]" />
          </button>
          <button className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors">
            <MoreVertical size={16} className="text-[var(--muted)]" />
          </button>
        </div>
      </div>
    </div>
  )
}

// 플랫폼 연결 카드
function PlatformCard({
  platform,
  onConnect,
}: {
  platform: (typeof availablePlatforms)[0]
  onConnect: () => void
}) {
  const Icon = platform.icon
  const isConnected = connectedChannels.some((c) => c.platform === platform.id)

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4 hover:border-[var(--primary)] transition-colors">
      <div className="flex items-center gap-4">
        {/* 아이콘 */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: platform.color }}
        >
          <Icon size={24} className="text-white" />
        </div>

        {/* 정보 */}
        <div className="flex-1">
          <h3 className="font-medium">{platform.name}</h3>
          <p className="text-sm text-[var(--muted)]">{platform.description}</p>
        </div>

        {/* 연결 버튼 */}
        {isConnected ? (
          <button
            className="flex items-center gap-2 px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm hover:bg-[var(--border-color)] transition-colors"
            onClick={onConnect}
          >
            <Plus size={16} />
            Add Another
          </button>
        ) : (
          <button
            className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors"
            onClick={onConnect}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  )
}

// 커스텀 RTMP 설정 모달
function CustomRtmpModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[var(--card-bg)] rounded-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Custom RTMP Destination</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[var(--background)] rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              placeholder="My Custom Server"
              className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">RTMP URL</label>
            <input
              type="text"
              placeholder="rtmp://..."
              className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Stream Key</label>
            <input
              type="password"
              placeholder="••••••••••••"
              className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-[var(--border-color)] rounded-lg text-sm font-medium hover:bg-[var(--background)] transition-colors"
          >
            Cancel
          </button>
          <button className="flex-1 px-4 py-3 bg-[var(--primary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors">
            Save Destination
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ChannelsPage() {
  const [showRtmpModal, setShowRtmpModal] = useState(false)

  const handleConnect = (platformId: string) => {
    if (platformId === 'custom') {
      setShowRtmpModal(true)
    } else {
      // OAuth 연동 시뮬레이션
      console.log(`Connecting to ${platformId}...`)
    }
  }

  return (
    <div className="min-h-screen">
      <Header actions={<ChannelsHeaderActions />} />

      <div className="p-6 max-w-4xl mx-auto">
        {/* 타이틀 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Channels</h1>
          <p className="text-[var(--muted)] mt-1">
            Connect your social media accounts to publish content
          </p>
        </div>

        {/* 연결된 채널 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Connected Channels</h2>
          {connectedChannels.length > 0 ? (
            <div className="space-y-3">
              {connectedChannels.map((channel) => (
                <ConnectedChannelCard key={channel.id} channel={channel} />
              ))}
            </div>
          ) : (
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-[var(--background)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus size={32} className="text-[var(--muted)]" />
              </div>
              <p className="text-[var(--muted)]">No channels connected yet</p>
              <p className="text-sm text-[var(--muted)] mt-1">
                Connect a platform below to start publishing
              </p>
            </div>
          )}
        </section>

        {/* 플랫폼 연결 */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Add New Channel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availablePlatforms.map((platform) => (
              <PlatformCard
                key={platform.id}
                platform={platform}
                onConnect={() => handleConnect(platform.id)}
              />
            ))}
          </div>
        </section>

        {/* OAuth 안내 */}
        <section className="mt-8">
          <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-xl p-4">
            <div className="flex gap-4">
              <AlertCircle size={20} className="text-[var(--muted)] flex-shrink-0 mt-0.5" />
              <div className="text-sm text-[var(--muted)]">
                <p className="font-medium text-[var(--foreground)] mb-1">
                  About Channel Connections
                </p>
                <p>
                  We use OAuth to securely connect to your social media accounts. We only
                  request the permissions needed to publish content on your behalf. You can
                  disconnect any channel at any time from your platform settings.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Custom RTMP Modal */}
      <CustomRtmpModal isOpen={showRtmpModal} onClose={() => setShowRtmpModal(false)} />
    </div>
  )
}
