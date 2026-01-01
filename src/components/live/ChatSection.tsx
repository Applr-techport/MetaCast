'use client'

import { useState } from 'react'
import { Send, Ban, X, Plus } from 'lucide-react'

interface ChatMessage {
  id: string
  username: string
  message: string
  timestamp: string
  isHost?: boolean
}

interface ChatSectionProps {
  messages: ChatMessage[]
  bannedWords: string[]
  onSendMessage?: (message: string) => void
  onAddBannedWord?: (word: string) => void
  onRemoveBannedWord?: (word: string) => void
}

export function ChatSection({
  messages,
  bannedWords,
  onSendMessage,
  onAddBannedWord,
  onRemoveBannedWord,
}: ChatSectionProps) {
  const [inputValue, setInputValue] = useState('')
  const [showBannedWords, setShowBannedWords] = useState(false)
  const [newWord, setNewWord] = useState('')

  const handleSend = () => {
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue.trim())
      setInputValue('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleAddWord = () => {
    if (newWord.trim() && onAddBannedWord) {
      onAddBannedWord(newWord.trim())
      setNewWord('')
    }
  }

  return (
    <div className="flex flex-col h-full bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)]">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between">
        <h3 className="font-semibold text-[var(--foreground)]">실시간 채팅</h3>
        <button
          onClick={() => setShowBannedWords(!showBannedWords)}
          className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs transition-colors ${
            showBannedWords
              ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
              : 'text-[var(--muted)] hover:bg-[var(--background)]'
          }`}
        >
          <Ban size={14} />
          <span>금칙어 ({bannedWords.length})</span>
        </button>
      </div>

      {/* Banned words panel */}
      {showBannedWords && (
        <div className="p-3 border-b border-[var(--border-color)] bg-[var(--background)]">
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              placeholder="금칙어 추가..."
              className="flex-1 bg-[var(--card-bg)] border border-[var(--border-color)] rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--secondary)]"
              onKeyPress={(e) => e.key === 'Enter' && handleAddWord()}
            />
            <button
              onClick={handleAddWord}
              className="p-1 bg-[var(--secondary)] text-white rounded transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {bannedWords.map((word) => (
              <span
                key={word}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full text-xs"
              >
                {word}
                <button
                  onClick={() => onRemoveBannedWord?.(word)}
                  className="hover:bg-[var(--accent)]/20 rounded-full"
                >
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="text-sm">
            <span className={`font-medium ${msg.isHost ? 'text-[var(--secondary)]' : 'text-[var(--foreground)]'}`}>
              {msg.username}
              {msg.isHost && (
                <span className="ml-1 px-1.5 py-0.5 bg-[var(--secondary)] text-white text-[10px] rounded">
                  호스트
                </span>
              )}
            </span>
            <span className="text-[var(--muted)] ml-2">{msg.message}</span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[var(--border-color)]">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요..."
            className="flex-1 bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
