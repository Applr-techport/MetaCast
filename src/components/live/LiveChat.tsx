'use client'

import { useState } from 'react'
import { Send, Search, MoreVertical } from 'lucide-react'

interface ChatMessage {
  id: string
  user: string
  message: string
  avatar: string
  time: string
}

const sampleMessages: ChatMessage[] = [
  { id: '1', user: '탄주', message: '귀염이 넘 예뻐요!', avatar: 'bg-blue-400', time: '방금' },
  { id: '2', user: 'UserIm', message: '우째는 어느정도 되나요', avatar: 'bg-yellow-400', time: '1분 전' },
  { id: '3', user: 'Jade03213', message: '항상 이 시간에 라이브얼려나요', avatar: 'bg-pink-400', time: '2분 전' },
  { id: '4', user: 'S32_호', message: '어떻도 오뿌 우럇잌려', avatar: 'bg-green-400', time: '3분 전' },
  { id: '5', user: 'Jessie', message: '다음 라이브 일정이 어떻게 되나요?', avatar: 'bg-purple-400', time: '4분 전' },
  { id: '6', user: '호그', message: '저번에 여기서서 구매했는데, 배상도 화면과 차이 없고, 마감도 마음에 드네요', avatar: 'bg-indigo-400', time: '5분 전' },
  { id: '7', user: 'minne203', message: '^^', avatar: 'bg-red-400', time: '6분 전' },
  { id: '8', user: 'fie__dwe', message: '우와--------------', avatar: 'bg-orange-400', time: '7분 전' },
]

export function LiveChat() {
  const [messages] = useState<ChatMessage[]>(sampleMessages)
  const [inputMessage, setInputMessage] = useState('')
  const [showAdminMessage, setShowAdminMessage] = useState(true)
  const [showViewerMessage, setShowViewerMessage] = useState(false)
  const [chatCount] = useState(942)

  return (
    <div className="flex-1 flex flex-col border-t border-[var(--border-color)] min-h-0">
      {/* 헤더 */}
      <div className="p-3 border-b border-[var(--border-color)] flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">채팅관리</h3>
            <span className="text-xs text-[var(--muted)]">{chatCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
              <input
                type="text"
                placeholder="검색..."
                className="pl-7 pr-3 py-1 text-xs bg-[var(--background)] border border-[var(--border-color)] rounded w-24 focus:outline-none focus:ring-1 focus:ring-[var(--secondary)]"
              />
            </div>
            <button className="p-1 hover:bg-[var(--background)] rounded">
              <MoreVertical size={16} className="text-[var(--muted)]" />
            </button>
          </div>
        </div>

        {/* 필터 토글 */}
        <div className="flex items-center gap-4 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <span className="text-[var(--muted)]">입장 메시지</span>
            <button
              onClick={() => setShowAdminMessage(!showAdminMessage)}
              className={`relative w-8 h-4 rounded-full transition-colors ${
                showAdminMessage ? 'bg-[var(--secondary)]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${
                  showAdminMessage ? 'left-4' : 'left-0.5'
                }`}
              />
            </button>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <span className="text-[var(--muted)]">퇴장 메시지</span>
            <button
              onClick={() => setShowViewerMessage(!showViewerMessage)}
              className={`relative w-8 h-4 rounded-full transition-colors ${
                showViewerMessage ? 'bg-[var(--secondary)]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${
                  showViewerMessage ? 'left-4' : 'left-0.5'
                }`}
              />
            </button>
          </label>
        </div>
      </div>

      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start gap-2 group">
            <div className={`w-6 h-6 rounded-full ${msg.avatar} flex-shrink-0`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium">{msg.user}</span>
                <span className="text-[10px] text-[var(--muted)]">{msg.time}</span>
              </div>
              <p className="text-xs text-[var(--foreground)] break-words">{msg.message}</p>
            </div>
            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[var(--background)] rounded transition-all">
              <MoreVertical size={12} className="text-[var(--muted)]" />
            </button>
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div className="p-3 border-t border-[var(--border-color)] flex-shrink-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="flex-1 px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--secondary)]"
          />
          <button className="p-2 bg-[var(--secondary)] text-white rounded-lg hover:bg-[#7c4fe0] transition-colors">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
