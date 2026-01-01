'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'

export function LiveSettings() {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [chatEnabled, setChatEnabled] = useState(true)
  const [participationEvent, setParticipationEvent] = useState(false)
  const [purchaseEvent, setPurchaseEvent] = useState(false)
  const [bannedWords, setBannedWords] = useState<string[]>(['욕설', '광고', '홍보', '채팅 금지어'])
  const [newBannedWord, setNewBannedWord] = useState('')

  const addBannedWord = () => {
    if (newBannedWord.trim() && !bannedWords.includes(newBannedWord.trim())) {
      setBannedWords([...bannedWords, newBannedWord.trim()])
      setNewBannedWord('')
    }
  }

  const removeBannedWord = (word: string) => {
    setBannedWords(bannedWords.filter(w => w !== word))
  }

  return (
    <div className="h-full flex flex-col">
      {/* 금칙어 섹션 */}
      <div className="p-3 border-b border-[var(--border-color)]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">금칙어</h3>
        </div>

        <p className="text-[10px] text-[var(--muted)] mb-2">
          욕설, 비방, 광고, 사이트, 채팅 금지어
        </p>

        {/* 금칙어 입력 */}
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newBannedWord}
            onChange={(e) => setNewBannedWord(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addBannedWord()}
            placeholder="금칙어 입력..."
            className="flex-1 px-3 py-1.5 text-xs bg-[var(--background)] border border-[var(--border-color)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--secondary)]"
          />
          <button
            onClick={addBannedWord}
            className="px-3 py-1.5 bg-[var(--primary)] text-white text-xs rounded hover:bg-[#1a1a1a] transition-colors"
          >
            등록
          </button>
        </div>

        {/* 금칙어 목록 */}
        <div className="flex flex-wrap gap-1.5">
          {bannedWords.map((word) => (
            <span
              key={word}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--background)] border border-[var(--border-color)] rounded text-xs"
            >
              {word}
              <button
                onClick={() => removeBannedWord(word)}
                className="hover:text-red-500"
              >
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* 설정 섹션 */}
      <div className="p-3 border-b border-[var(--border-color)]">
        <h3 className="text-sm font-semibold mb-3">설정</h3>

        <div className="space-y-3">
          {/* 소리 */}
          <div className="flex items-center justify-between">
            <span className="text-xs">소리</span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                soundEnabled ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow ${
                  soundEnabled ? 'left-5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* 채팅창 */}
          <div className="flex items-center justify-between">
            <span className="text-xs">채팅창</span>
            <button
              onClick={() => setChatEnabled(!chatEnabled)}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                chatEnabled ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow ${
                  chatEnabled ? 'left-5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 이벤트 섹션 */}
      <div className="p-3 flex-1">
        <h3 className="text-sm font-semibold mb-3">이벤트</h3>

        <div className="space-y-3">
          {/* 라이브 참여시 이벤트 */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs">라이브</span>
              <p className="text-[10px] text-[var(--muted)]">참여시 이벤트</p>
            </div>
            <button
              onClick={() => setParticipationEvent(!participationEvent)}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                participationEvent ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow ${
                  participationEvent ? 'left-5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* 상품 구매시 이벤트 */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs">상품</span>
              <p className="text-[10px] text-[var(--muted)]">구매시 이벤트</p>
            </div>
            <button
              onClick={() => setPurchaseEvent(!purchaseEvent)}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                purchaseEvent ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow ${
                  purchaseEvent ? 'left-5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
