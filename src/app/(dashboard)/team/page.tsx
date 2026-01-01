'use client'

import { Header } from '@/components/layout/Header'
import { Users, Plus, MoreVertical } from 'lucide-react'

// Team Header Actions
function TeamHeaderActions() {
  return (
    <div className="flex items-center gap-3">
      {/* Member Count */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--background)] rounded-lg border border-[var(--border-color)]">
        <Users size={14} className="text-[var(--muted)]" />
        <span className="text-sm text-[var(--foreground)]">4 members</span>
      </div>
      {/* Invite Member Button */}
      <button className="flex items-center gap-2 px-4 py-2 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg text-sm font-medium transition-colors">
        <Plus size={18} />
        <span>Invite Member</span>
      </button>
    </div>
  )
}

export default function TeamPage() {
  const members = [
    { name: 'Lee Min Ho', email: 'lee@xcaster.com', role: 'Owner', avatar: '', status: 'active' },
    { name: 'Kim Soo Jin', email: 'kim@xcaster.com', role: 'Admin', avatar: '', status: 'active' },
    { name: 'Park Ji Yeon', email: 'park@xcaster.com', role: 'Member', avatar: '', status: 'active' },
    { name: 'Choi Dong Wook', email: 'choi@xcaster.com', role: 'Member', avatar: '', status: 'pending' },
  ]

  return (
    <div className="min-h-screen">
      <Header actions={<TeamHeaderActions />} />
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Team Members</h1>
          <p className="text-[var(--muted)] mt-1">Manage your team and permissions</p>
        </div>

        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--muted)]">Member</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--muted)]">Role</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--muted)]">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.email} className="border-b border-[var(--border-color)] last:border-0">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[var(--muted)] rounded-full" />
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-[var(--muted)]">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      member.role === 'Owner' ? 'bg-[var(--secondary)]/10 text-[var(--secondary)]' :
                      member.role === 'Admin' ? 'bg-blue-100 text-blue-600' :
                      'bg-[var(--background)] text-[var(--muted)]'
                    }`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      member.status === 'active' ? 'bg-[var(--success)]/10 text-[var(--success)]' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-[var(--background)] rounded-lg">
                      <MoreVertical size={16} className="text-[var(--muted)]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
