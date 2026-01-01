'use client'

import { useState } from 'react'
import { Megaphone, Send, Clock } from 'lucide-react'

interface NotificationHistory {
  id: string
  message: string
  sentAt: string
}

interface NotificationPanelProps {
  history: NotificationHistory[]
  onSendNotification?: (message: string) => void
}

export function NotificationPanel({ history, onSendNotification }: NotificationPanelProps) {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim() && onSendNotification) {
      onSendNotification(message.trim())
      setMessage('')
    }
  }

  const presetMessages = [
    'Special deal coming soon!',
    'Free shipping on orders now!',
    'Limited stock remaining!',
  ]

  return (
    <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)]">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-2">
          <Megaphone size={18} className="text-[var(--secondary)]" />
          <h3 className="font-semibold text-[var(--foreground)]">Broadcast</h3>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 space-y-3">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter a message to broadcast..."
          className="w-full h-20 bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
        />

        {/* Preset buttons */}
        <div className="flex flex-wrap gap-2">
          {presetMessages.map((preset, index) => (
            <button
              key={index}
              onClick={() => setMessage(preset)}
              className="px-2 py-1 text-xs bg-[var(--background)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--border-color)] transition-colors text-[var(--muted)]"
            >
              {preset.slice(0, 15)}...
            </button>
          ))}
        </div>

        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="w-full py-2 bg-[var(--secondary)] hover:bg-[#7c4fe0] disabled:bg-[var(--border-color)] disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Send size={16} />
          <span>Send Broadcast</span>
        </button>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="border-t border-[var(--border-color)]">
          <div className="p-3 text-xs text-[var(--muted)] font-medium">Recent</div>
          <div className="max-h-32 overflow-y-auto">
            {history.map((item) => (
              <div
                key={item.id}
                className="px-4 py-2 border-t border-[var(--border-color)] hover:bg-[var(--background)]"
              >
                <p className="text-sm text-[var(--foreground)]">{item.message}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-[var(--muted)]">
                  <Clock size={10} />
                  <span>{item.sentAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
