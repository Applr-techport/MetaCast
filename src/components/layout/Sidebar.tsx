'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import {
  LayoutDashboard,
  FolderOpen,
  CalendarClock,
  Radio,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  Code2,
} from 'lucide-react'
import { useState } from 'react'

interface NavItem {
  label: string
  href?: string
  icon: React.ReactNode
  badge?: number
  children?: NavItem[]
}

const navigation: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard size={20} />,
  },
  {
    label: 'Schedule Streams',
    href: '/schedule',
    icon: <CalendarClock size={20} />,
    badge: 3,
  },
  {
    label: 'Assets',
    href: '/assets',
    icon: <FolderOpen size={20} />,
  },
  {
    label: 'Channel',
    href: '/channels',
    icon: <Radio size={20} />,
    badge: 2,
  },
  {
    label: 'Team Member',
    href: '/team',
    icon: <Users size={20} />,
    badge: 5,
  },
  {
    label: 'Analytics',
    href: '/analytics',
    icon: <BarChart3 size={20} />,
  },
]

const bottomNavigation: NavItem[] = [
  {
    label: 'Developer Center',
    href: '/developer',
    icon: <Code2 size={20} />,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Settings size={20} />,
  },
  {
    label: 'Help',
    href: '/help',
    icon: <HelpCircle size={20} />,
  },
]

function NavItemComponent({ item }: { item: NavItem }) {
  const pathname = usePathname()
  const isActive = item.href ? pathname === item.href || pathname.startsWith(item.href + '/') : false

  return (
    <Link
      href={item.href || '#'}
      className={cn(
        'flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors',
        isActive
          ? 'bg-[var(--primary)] text-white'
          : 'hover:bg-[var(--border-color)]/50 text-[var(--foreground)]'
      )}
    >
      <div className="flex items-center gap-3">
        <span className={isActive ? 'text-white' : 'text-[var(--muted)]'}>{item.icon}</span>
        <span className="font-medium">{item.label}</span>
      </div>
      {item.badge && (
        <span
          className={cn(
            'px-2 py-0.5 text-xs rounded-full font-medium',
            isActive ? 'bg-white/20 text-white' : 'bg-[var(--secondary)] text-white'
          )}
        >
          {item.badge}
        </span>
      )}
    </Link>
  )
}

export function Sidebar() {
  return (
    <aside className="w-60 h-screen bg-[var(--sidebar-bg)] border-r border-[var(--border-color)] flex flex-col fixed left-0 top-0 z-40">
      {/* 로고 */}
      <div className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold text-[var(--foreground)]">XCaster</span>
        </Link>
      </div>

      {/* 메인 네비게이션 */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <NavItemComponent key={item.label} item={item} />
        ))}
      </nav>

      {/* Upgrade Plan */}
      <div className="px-3 pb-2">
        <button className="w-full px-4 py-3 bg-white border-2 border-[var(--secondary)] text-[var(--secondary)] rounded-lg text-sm font-semibold hover:bg-[var(--secondary)]/5 transition-colors">
          UPGRADE PLAN
        </button>
      </div>

      {/* 하단 네비게이션 */}
      <div className="px-3 pb-2 space-y-1">
        {bottomNavigation.map((item) => (
          <NavItemComponent key={item.label} item={item} />
        ))}
      </div>

      {/* 버전 표시 */}
      <div className="px-3 pb-4">
        <div className="text-[10px] text-[var(--muted)] font-mono">
          v1.0.0
        </div>
      </div>
    </aside>
  )
}
