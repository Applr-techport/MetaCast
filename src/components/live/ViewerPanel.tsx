'use client'

import { useState } from 'react'
import { Users, Ban, X, Plus } from 'lucide-react'

interface Viewer {
  id: string
  username: string
  joinedAt: string
  isBanned?: boolean
}

interface ViewerPanelProps {
  viewers: Viewer[]
  bannedWords: string[]
  onBanUser?: (userId: string) => void
  onAddBannedWord?: (word: string) => void
  onRemoveBannedWord?: (word: string) => void
}

export function ViewerPanel({
  viewers,
  bannedWords,
  onBanUser,
  onAddBannedWord,
  onRemoveBannedWord,
}: ViewerPanelProps) {
  const [activeTab, setActiveTab] = useState<'viewers' | 'banned'>('viewers')
  const [newWord, setNewWord] = useState('')

  const handleAddWord = () => {
    if (newWord.trim() && onAddBannedWord) {
      onAddBannedWord(newWord.trim())
      setNewWord('')
    }
  }

  return (
    <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-[var(--border-color)]">
        <button
          onClick={() => setActiveTab('viewers')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'viewers'
              ? 'text-[var(--secondary)] border-b-2 border-[var(--secondary)]'
              : 'text-[var(--muted)] hover:text-[var(--foreground)]'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Users size={16} />
            <span>시청자 ({viewers.length})</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('banned')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'banned'
              ? 'text-[var(--secondary)] border-b-2 border-[var(--secondary)]'
              : 'text-[var(--muted)] hover:text-[var(--foreground)]'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Ban size={16} />
            <span>금칙어 ({bannedWords.length})</span>
          </div>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'viewers' ? (
          <div className="space-y-2">
            {viewers.map((viewer) => (
              <div
                key={viewer.id}
                className="flex items-center justify-between p-2 hover:bg-[var(--background)] rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">{viewer.username}</p>
                  <p className="text-xs text-[var(--muted)]">{viewer.joinedAt}</p>
                </div>
                <button
                  onClick={() => onBanUser?.(viewer.id)}
                  className="p-1.5 text-[var(--muted)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 rounded transition-colors"
                  title="사용자 차단"
                >
                  <Ban size={14} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {/* Add new word */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                placeholder="금칙어 추가..."
                className="flex-1 bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                onKeyPress={(e) => e.key === 'Enter' && handleAddWord()}
              />
              <button
                onClick={handleAddWord}
                className="p-2 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Banned words list */}
            <div className="flex flex-wrap gap-2">
              {bannedWords.map((word) => (
                <span
                  key={word}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full text-xs"
                >
                  {word}
                  <button
                    onClick={() => onRemoveBannedWord?.(word)}
                    className="hover:bg-[var(--accent)]/20 rounded-full p-0.5"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
