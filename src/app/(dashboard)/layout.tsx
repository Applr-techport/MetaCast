import { Sidebar } from '@/components/layout/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Sidebar />
      <main className="ml-60">
        {children}
      </main>
    </div>
  )
}
