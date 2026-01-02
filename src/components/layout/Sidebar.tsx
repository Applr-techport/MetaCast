'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import {
  LayoutDashboard,
  FolderOpen,
  CalendarClock,
  Radio,
  BarChart3,
  Users,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Zap,
  User,
  Shield,
  CreditCard,
  Palette,
  LogOut,
} from 'lucide-react'
import { useState } from 'react'

// Mock user data
const currentUser = {
  name: 'Lee Min Ho',
  email: 'lee@metacast.io',
  initials: 'LM',
  plan: 'Pro',
}
import { UpgradePlanModal } from './UpgradePlanModal'
import { useSidebar } from './SidebarContext'

interface NavItem {
  label: string
  href?: string
  icon: React.ReactNode
  badge?: number | string
  badgeColor?: 'purple' | 'default'
}

const navigation: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard size={20} />,
  },
  {
    label: 'AI Studio',
    href: '/ai-studio',
    icon: <Sparkles size={20} />,
    badge: 'New',
    badgeColor: 'purple',
  },
  {
    label: 'Schedule',
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
    label: 'Team',
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


function NavItemComponent({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const pathname = usePathname()
  const isActive = item.href ? pathname === item.href || pathname.startsWith(item.href + '/') : false

  return (
    <Link
      href={item.href || '#'}
      className={cn(
        'flex items-center rounded-lg text-sm transition-colors relative group',
        collapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2.5',
        isActive
          ? 'bg-[var(--primary)] text-white'
          : 'hover:bg-[var(--border-color)]/50 text-[var(--foreground)]'
      )}
      title={collapsed ? item.label : undefined}
    >
      <div className={cn('flex items-center', collapsed ? '' : 'gap-3')}>
        <span className={isActive ? 'text-white' : 'text-[var(--muted)]'}>{item.icon}</span>
        {!collapsed && <span className="font-medium">{item.label}</span>}
      </div>
      {!collapsed && item.badge && (
        <span
          className={cn(
            'px-2 py-0.5 text-xs rounded-full font-medium',
            isActive
              ? 'bg-white/20 text-white'
              : item.badgeColor === 'purple'
                ? 'bg-[var(--secondary)]/10 text-[var(--secondary)]'
                : 'bg-[var(--secondary)] text-white'
          )}
        >
          {item.badge}
        </span>
      )}
      {collapsed && item.badge && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--secondary)] text-white text-[10px] rounded-full flex items-center justify-center font-medium">
          {typeof item.badge === 'number' ? item.badge : ''}
        </span>
      )}
      {/* Tooltip on hover when collapsed */}
      {collapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-[var(--card-bg)] border border-[var(--border-color)] rounded text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-lg">
          {item.label}
        </div>
      )}
    </Link>
  )
}

export function Sidebar() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { collapsed, toggle } = useSidebar()

  return (
    <>
      <aside
        className={cn(
          'h-screen bg-[var(--sidebar-bg)] border-r border-[var(--border-color)] flex flex-col fixed left-0 top-0 z-40 transition-all duration-300 overflow-hidden',
          collapsed ? 'w-16' : 'w-60'
        )}
      >
        {/* Logo - h-16 matches Header height */}
        <div className={cn('h-16 flex items-center border-b border-[var(--border-color)]', collapsed ? 'px-2 justify-center' : 'px-4')}>
          <Link href="/dashboard" className="flex items-center">
            {collapsed ? (
              <div className="w-10 h-10 bg-[var(--secondary)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
            ) : (
              <Image
                src="/metacast.png"
                alt="MetaCast"
                width={180}
                height={36}
                className="h-9 w-auto"
                priority
              />
            )}
          </Link>
        </div>

        {/* Toggle Button - 경계선 바로 아래 */}
        <div className={cn('flex py-2', collapsed ? 'px-2 justify-center' : 'px-3 justify-end')}>
          <button
            onClick={toggle}
            className="p-1 text-[var(--muted)]"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Main Navigation */}
        <nav className={cn('flex-1 pt-4 space-y-1 overflow-y-auto', collapsed ? 'px-2' : 'px-3')}>
          {navigation.map((item) => (
            <NavItemComponent key={item.label} item={item} collapsed={collapsed} />
          ))}
        </nav>

        {/* Upgrade Plan - 하단 */}
        <div className={cn('mt-auto', collapsed ? 'px-2' : 'px-3')}>
          {collapsed ? (
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="w-full p-2.5 text-[var(--secondary)] rounded-lg flex items-center justify-center"
              title="Upgrade Plan"
            >
              <Zap size={18} />
            </button>
          ) : (
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-[var(--secondary)] rounded-lg text-sm font-medium"
            >
              <Zap size={18} />
              <span>Upgrade Plan</span>
            </button>
          )}
        </div>

        {/* User Menu - 최하단 */}
        <div className={cn('pb-4 pt-3', collapsed ? 'px-2' : 'px-3')}>
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={cn(
                'w-full flex items-center rounded-lg',
                collapsed ? 'justify-center p-2' : 'px-2 py-2'
              )}
            >
              <div className={cn('flex items-center', collapsed ? '' : 'gap-3')}>
                <div className="w-8 h-8 bg-[var(--secondary)] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-medium">{currentUser.initials}</span>
                </div>
                {!collapsed && (
                  <div className="text-left">
                    <p className="text-sm font-medium truncate">{currentUser.name}</p>
                    <p className="text-xs text-[var(--muted)] truncate">{currentUser.email}</p>
                  </div>
                )}
              </div>
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                <div className={cn(
                  'absolute bottom-full mb-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl shadow-lg z-50 overflow-hidden',
                  collapsed ? 'left-full ml-2 w-56' : 'left-0 right-0'
                )}>
                  {collapsed && (
                    <div className="p-3 border-b border-[var(--border-color)]">
                      <p className="text-sm font-medium">{currentUser.name}</p>
                      <p className="text-xs text-[var(--muted)]">{currentUser.email}</p>
                      <span className="inline-block mt-2 px-2 py-0.5 bg-[var(--secondary)] text-white text-xs font-medium rounded">
                        {currentUser.plan}
                      </span>
                    </div>
                  )}
                  <div className="py-1">
                    <Link
                      href="/settings/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-[var(--background)] transition-colors"
                    >
                      <User size={16} className="text-[var(--muted)]" />
                      <span className="text-sm">Profile</span>
                    </Link>
                    <Link
                      href="/settings/security"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-[var(--background)] transition-colors"
                    >
                      <Shield size={16} className="text-[var(--muted)]" />
                      <span className="text-sm">Security</span>
                    </Link>
                    <Link
                      href="/settings/billing"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-[var(--background)] transition-colors"
                    >
                      <CreditCard size={16} className="text-[var(--muted)]" />
                      <span className="text-sm">Billing & Plans</span>
                    </Link>
                    <Link
                      href="/settings/ai-usage"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-[var(--background)] transition-colors"
                    >
                      <Zap size={16} className="text-[var(--muted)]" />
                      <span className="text-sm">AI Usage</span>
                    </Link>
                    <Link
                      href="/settings/appearance"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-[var(--background)] transition-colors"
                    >
                      <Palette size={16} className="text-[var(--muted)]" />
                      <span className="text-sm">Appearance</span>
                    </Link>
                  </div>
                  <div className="py-1 border-t border-[var(--border-color)]">
                    <button
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-3 py-2 w-full hover:bg-[var(--accent)]/10 transition-colors text-[var(--accent)]"
                    >
                      <LogOut size={16} />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          {!collapsed && (
            <div className="text-[10px] text-[var(--muted)] font-mono mt-2 text-center">
              v1.0.0
            </div>
          )}
        </div>
      </aside>

      {/* Upgrade Plan Modal */}
      <UpgradePlanModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </>
  )
}

// Export collapsed state width for layout usage
export const SIDEBAR_WIDTH = 240 // 60 * 4 = w-60
export const SIDEBAR_COLLAPSED_WIDTH = 64 // 16 * 4 = w-16
