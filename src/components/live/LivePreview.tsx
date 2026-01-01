'use client'

import { useState } from 'react'
import { Settings, Maximize2, Volume2, VolumeX } from 'lucide-react'

export function LivePreview() {
  const [isMuted, setIsMuted] = useState(false)
  const [viewerCount] = useState(160)

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold">미리보기</h2>
        <button className="p-1.5 hover:bg-[var(--background)] rounded transition-colors">
          <Settings size={16} className="text-[var(--muted)]" />
        </button>
      </div>

      {/* 비디오 미리보기 */}
      <div className="relative aspect-[9/16] max-h-[320px] bg-black rounded-lg overflow-hidden">
        {/* 플레이스홀더 이미지 */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
            </div>
            <p className="text-white/60 text-xs">라이브 미리보기</p>
          </div>
        </div>

        {/* LIVE 배지 */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
            LIVE
          </span>
          <span className="px-2 py-0.5 bg-black/60 text-white text-xs rounded flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            {viewerCount}
          </span>
        </div>

        {/* 컨트롤 */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 bg-black/60 hover:bg-black/80 rounded transition-colors"
          >
            {isMuted ? (
              <VolumeX size={14} className="text-white" />
            ) : (
              <Volume2 size={14} className="text-white" />
            )}
          </button>
          <button className="p-1.5 bg-black/60 hover:bg-black/80 rounded transition-colors">
            <Maximize2 size={14} className="text-white" />
          </button>
        </div>

        {/* 채팅 오버레이 (미리보기용) */}
        <div className="absolute bottom-12 left-3 right-3 space-y-1">
          <div className="flex items-start gap-2 bg-black/40 rounded px-2 py-1">
            <div className="w-5 h-5 rounded-full bg-yellow-400 flex-shrink-0" />
            <div>
              <span className="text-white text-xs font-medium">UserIm</span>
              <p className="text-white/80 text-xs">우와는 어느정도 되나요</p>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-black/40 rounded px-2 py-1">
            <div className="w-5 h-5 rounded-full bg-pink-400 flex-shrink-0" />
            <div>
              <span className="text-white text-xs font-medium">Jade03213</span>
              <p className="text-white/80 text-xs">항상 이 시간에 라이브얼려나요</p>
            </div>
          </div>
        </div>
      </div>

      {/* 유저 정보 */}
      <div className="mt-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
        <div>
          <p className="text-sm font-medium">UserProfileID1012</p>
          <p className="text-xs text-[var(--muted)]">유저닉네임</p>
        </div>
      </div>

      {/* 방송 시간 정보 */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-[var(--muted)]">시작 시간</p>
          <p className="text-sm font-mono font-medium">09:00:27</p>
        </div>
        <div>
          <p className="text-xs text-[var(--muted)]">진행 시간</p>
          <p className="text-sm font-mono font-medium">00:30</p>
        </div>
        <div>
          <p className="text-xs text-[var(--muted)]">종료 시간</p>
          <p className="text-sm font-mono font-medium">02:00</p>
        </div>
      </div>

      {/* 시청자 통계 */}
      <div className="mt-3 grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-xs text-[var(--muted)]">실시간 접속자 | 누적 접속자</p>
          <p className="text-sm font-mono font-medium">81 | 1,320</p>
        </div>
        <div>
          <p className="text-xs text-[var(--muted)]">좋아요</p>
          <p className="text-sm font-mono font-medium">620</p>
        </div>
      </div>

      {/* RTMP 주소 */}
      <div className="mt-4">
        <p className="text-xs text-[var(--muted)] mb-1">RTMP 주소</p>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-xs bg-[var(--background)] px-2 py-1.5 rounded font-mono truncate">
            Sswasadfg://345dfghdd464.ftsl
          </code>
          <button className="p-1.5 hover:bg-[var(--background)] rounded transition-colors">
            <svg className="w-4 h-4 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
