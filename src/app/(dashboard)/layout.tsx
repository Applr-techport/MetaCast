'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { SidebarProvider, useSidebar } from '@/components/layout/SidebarContext'
import { cn } from '@/lib/utils/cn'

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Sidebar />
      <main className={cn('transition-all duration-300', collapsed ? 'ml-16' : 'ml-60')}>
        {children}
      </main>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  )
}
