'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, ChevronDown, Monitor, Bot } from 'lucide-react'
import Link from 'next/link'

interface StreamOption {
  id: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  description: string
  href: string
  badge?: string
}

const streamOptions: StreamOption[] = [
  {
    id: 'standard',
    icon: Monitor,
    title: 'Standard Stream',
    description: 'Host your own live broadcast',
    href: '/schedule/new',
  },
  {
    id: 'ai-assisted',
    icon: Bot,
    title: 'Stream with AI',
    description: 'Broadcast with an AI co-host',
    href: '/ai-studio/live-stream',
    badge: 'AI',
  },
]

export function NewStreamButton() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on ESC key
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-[var(--secondary)] text-white rounded-lg hover:bg-[#7c4fe0] transition-colors text-sm font-medium"
      >
        <Plus size={16} />
        <span>New Stream</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[var(--card-bg)] rounded-xl shadow-lg border border-[var(--border-color)] overflow-hidden z-50">
          {/* Header */}
          <div className="px-4 py-2.5 border-b border-[var(--border-color)]">
            <span className="text-xs font-medium text-[var(--muted)]">Start a new stream</span>
          </div>

          {/* Options */}
          {streamOptions.map((option) => {
            const Icon = option.icon
            return (
              <Link
                key={option.id}
                href={option.href}
                onClick={() => setIsOpen(false)}
                className="flex items-start gap-3 px-4 py-3 hover:bg-[var(--background)] transition-colors"
              >
                <div className="w-9 h-9 bg-[var(--background)] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-[var(--muted)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-[var(--foreground)]">{option.title}</span>
                    {option.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[var(--secondary)]/10 text-[var(--secondary)] rounded">
                        {option.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[var(--muted)]">{option.description}</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
