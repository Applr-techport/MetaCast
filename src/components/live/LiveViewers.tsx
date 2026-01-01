'use client'

import { useState } from 'react'
import { Search, MoreVertical, Ban, UserX } from 'lucide-react'

interface Viewer {
  id: string
  username: string
  status: 'online' | 'away'
  isBlocked?: boolean
}

const sampleViewers: Viewer[] = [
  { id: '1', username: 'fjluuill01012', status: 'online' },
  { id: '2', username: 'dyyedgil01012', status: 'online' },
  { id: '3', username: 'DDweldfl01012', status: 'online' },
  { id: '4', username: 'UUEERl01012', status: 'away' },
  { id: '5', username: 'Unnbvbel01012', status: 'online' },
  { id: '6', username: 'dfewrwrrl01012', status: 'away' },
  { id: '7', username: 'UserProfileID1012', status: 'online' },
]

export function LiveViewers() {
  const [viewers] = useState<Viewer[]>(sampleViewers)
  const [activeTab, setActiveTab] = useState<'viewers' | 'blacklist'>('viewers')
  const [viewerCount] = useState(81)
  const [blacklistCount] = useState(6)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredViewers = viewers.filter(v =>
    v.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <div className="p-3 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setActiveTab('viewers')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'viewers'
                ? 'bg-[var(--primary)] text-white'
                : 'text-[var(--muted)] hover:bg-[var(--background)]'
            }`}
          >
            시청자 {viewerCount}
          </button>
          <button
            onClick={() => setActiveTab('blacklist')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'blacklist'
                ? 'bg-[var(--primary)] text-white'
                : 'text-[var(--muted)] hover:bg-[var(--background)]'
            }`}
          >
            블랙리스트 {blacklistCount}
          </button>
        </div>

        {/* 필터 버튼들 */}
        <div className="flex items-center gap-1 mb-3">
          <button className="px-2 py-1 text-[10px] bg-[var(--primary)] text-white rounded">
            전체 목록
          </button>
          <button className="px-2 py-1 text-[10px] text-[var(--muted)] hover:bg-[var(--background)] rounded">
            리스트
          </button>
          <button className="px-2 py-1 text-[10px] text-[var(--muted)] hover:bg-[var(--background)] rounded">
            상태
          </button>
          <button className="px-2 py-1 text-[10px] text-[var(--muted)] hover:bg-[var(--background)] rounded">
            활동 등급
          </button>
        </div>

        {/* 검색 */}
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="유저 아이디"
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-[var(--background)] border border-[var(--border-color)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--secondary)]"
          />
        </div>
      </div>

      {/* 시청자 목록 */}
      <div className="flex-1 overflow-y-auto">
        {filteredViewers.map((viewer) => (
          <div
            key={viewer.id}
            className="flex items-center justify-between px-3 py-2 hover:bg-[var(--background)] group"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-7 h-7 rounded-full bg-gray-200" />
                <span
                  className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white ${
                    viewer.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
              </div>
              <div>
                <p className="text-xs font-medium">{viewer.username}</p>
                <p className="text-[10px] text-[var(--muted)]">
                  {viewer.status === 'online' ? '유저 시청중' : '유저 대기중'}
                </p>
              </div>
            </div>
            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[var(--border-color)] rounded transition-all">
              <MoreVertical size={14} className="text-[var(--muted)]" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
