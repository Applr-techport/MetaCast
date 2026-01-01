'use client'

import { useState, ReactNode } from 'react'
import { Bell } from 'lucide-react'

interface HeaderProps {
  actions?: ReactNode
  showNotifications?: boolean
}

export function Header({ actions, showNotifications = true }: HeaderProps) {
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false)

  const notifications = [
    { id: 1, title: 'Stream started', message: 'Your scheduled stream is now live', time: '2 min ago', unread: true },
    { id: 2, title: 'New subscriber', message: 'You have 5 new subscribers on YouTube', time: '1 hour ago', unread: true },
    { id: 3, title: 'Stream ended', message: 'Product Launch stream completed', time: '3 hours ago', unread: false },
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="h-16 bg-[var(--card-bg)] border-b border-[var(--border-color)] flex items-center justify-end px-6 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {/* Custom Actions */}
        {actions}

        {/* Notifications */}
        {showNotifications && (
          <div className="relative">
            <button
              onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
              className="relative p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
            >
              <Bell size={20} className="text-[var(--foreground)]" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[var(--accent)] text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotificationDropdown && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setShowNotificationDropdown(false)} />
                <div className="absolute right-0 top-12 w-80 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl shadow-lg z-30">
                  <div className="p-4 border-b border-[var(--border-color)]">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-[var(--border-color)] hover:bg-[var(--background)] cursor-pointer ${
                          notification.unread ? 'bg-[var(--secondary)]/5' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {notification.unread && (
                            <span className="w-2 h-2 mt-2 bg-[var(--secondary)] rounded-full flex-shrink-0" />
                          )}
                          <div className={notification.unread ? '' : 'ml-5'}>
                            <p className="text-sm font-medium">{notification.title}</p>
                            <p className="text-xs text-[var(--muted)]">{notification.message}</p>
                            <p className="text-xs text-[var(--muted)] mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-[var(--border-color)]">
                    <button className="text-sm text-[var(--secondary)] hover:underline">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
