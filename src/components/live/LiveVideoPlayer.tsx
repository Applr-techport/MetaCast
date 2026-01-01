'use client'

import { Users, Volume2, VolumeX, Maximize, Heart, Clock, User, ShoppingBag, ShoppingCart, DollarSign } from 'lucide-react'
import { useState, useEffect } from 'react'

interface LiveVideoPlayerProps {
  viewerCount: number
  streamTitle: string
  isLive?: boolean
  startTime?: string
  endTime?: string
  broadcasterName?: string
  likes?: number
  totalViewers?: number
  isCommerce?: boolean
  cartCount?: number
  productsSold?: number
  totalSales?: number
}

export function LiveVideoPlayer({
  viewerCount,
  streamTitle,
  isLive = true,
  startTime = '14:00',
  endTime = '16:00',
  broadcasterName = 'Host',
  likes = 0,
  totalViewers = 0,
  isCommerce = false,
  cartCount = 0,
  productsSold = 0,
  totalSales = 0,
}: LiveVideoPlayerProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [elapsedTime, setElapsedTime] = useState('00:00:00')

  useEffect(() => {
    const interval = setInterval(() => {
      const [hours, minutes] = startTime.split(':').map(Number)
      const startDate = new Date()
      startDate.setHours(hours, minutes, 0, 0)
      const now = new Date()
      const diff = Math.max(0, now.getTime() - startDate.getTime())
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setElapsedTime(
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [startTime])

  return (
    <div className="relative bg-black rounded-xl overflow-hidden aspect-[9/16] h-full w-auto">
      {/* Video placeholder */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <span className="text-gray-500 text-sm">Live Stream</span>
      </div>

      {/* Top overlay - Commerce stats */}
      <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/80 to-transparent">
        {/* Row 1: LIVE badge + Title */}
        <div className="flex items-center gap-2 mb-2">
          {isLive && (
            <span className="inline-flex items-center gap-1 bg-[var(--accent)] text-white rounded px-1.5 py-0.5 text-[10px] font-bold">
              <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
              LIVE
            </span>
          )}
          <span className="text-white text-xs font-medium truncate flex-1">{streamTitle}</span>
        </div>

        {/* Row 2: Commerce stats (only if isCommerce) */}
        {isCommerce && (
          <div className="flex items-center gap-3 text-[10px]">
            <div className="flex items-center gap-1 text-[var(--secondary)]">
              <ShoppingCart size={10} />
              <span>{cartCount.toLocaleString()} cart</span>
            </div>
            <div className="flex items-center gap-1 text-[var(--success)]">
              <ShoppingBag size={10} />
              <span>{productsSold.toLocaleString()} sold</span>
            </div>
            <div className="flex items-center gap-1 text-[var(--warning)]">
              <DollarSign size={10} />
              <span>${(totalSales / 100).toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom overlay - Broadcaster & Viewer stats */}
      <div className="absolute bottom-12 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
        {/* Broadcaster */}
        <div className="flex items-center gap-1.5 mb-2">
          <User size={12} className="text-[var(--secondary)]" />
          <span className="text-white/90 text-[10px]">{broadcasterName}</span>
        </div>

        {/* Time info */}
        <div className="flex items-center gap-3 text-[10px] text-white/80 mb-2">
          <div className="flex items-center gap-1">
            <Clock size={10} className="text-[var(--secondary)]" />
            <span>{startTime}</span>
          </div>
          <span className="text-[var(--accent)] font-mono font-semibold">{elapsedTime}</span>
          <span>~ {endTime}</span>
        </div>

        {/* Viewer Stats */}
        <div className="flex items-center gap-3 text-[10px]">
          <div className="flex items-center gap-1 text-white/90">
            <Heart size={10} className="text-[var(--accent)]" />
            <span>{likes.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1 text-white/90">
            <Users size={10} className="text-[var(--secondary)]" />
            <span>{viewerCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1 text-white/70">
            <span>Total: {totalViewers.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
        >
          {isMuted ? (
            <VolumeX size={18} className="text-white" />
          ) : (
            <Volume2 size={18} className="text-white" />
          )}
        </button>
        <button className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
          <Maximize size={18} className="text-white" />
        </button>
      </div>
    </div>
  )
}
