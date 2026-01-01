'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import {
  Users,
  Plus,
  MoreVertical,
  Mail,
  Shield,
  Crown,
  User,
  X,
  Check,
  Clock,
  Copy,
  Trash2,
  RefreshCw,
  ChevronDown,
  AlertCircle,
  Video,
  Radio,
  Settings,
} from 'lucide-react'

// Role type
type Role = 'owner' | 'admin' | 'member'

// Role info
const roleInfo: Record<Role, { label: string; icon: typeof Crown; permissions: string[] }> = {
  owner: {
    label: 'Owner',
    icon: Crown,
    permissions: [
      'Full access to all features',
      'Manage team members and roles',
      'Delete workspace',
      'Billing and subscription',
    ],
  },
  admin: {
    label: 'Admin',
    icon: Shield,
    permissions: [
      'Manage channels and content',
      'Invite and manage members',
      'Access analytics',
      'Create and schedule posts',
    ],
  },
  member: {
    label: 'Member',
    icon: User,
    permissions: [
      'Create and edit content',
      'View analytics',
      'Use AI tools',
      'Cannot manage team',
    ],
  },
}

// Member interface
interface Member {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
  status: 'active' | 'pending'
  joinedAt?: string
  lastActive?: string
}

// Pending invitation interface
interface PendingInvitation {
  id: string
  email: string
  role: Role
  sentAt: string
  expiresAt: string
}

// Sample members data
const initialMembers: Member[] = [
  {
    id: '1',
    name: 'Lee Min Ho',
    email: 'lee@metacast.com',
    role: 'owner',
    status: 'active',
    joinedAt: 'Jan 2024',
    lastActive: '2 min ago',
  },
  {
    id: '2',
    name: 'Kim Soo Jin',
    email: 'kim@metacast.com',
    role: 'admin',
    status: 'active',
    joinedAt: 'Feb 2024',
    lastActive: '1 hour ago',
  },
  {
    id: '3',
    name: 'Park Ji Yeon',
    email: 'park@metacast.com',
    role: 'member',
    status: 'active',
    joinedAt: 'Mar 2024',
    lastActive: '3 hours ago',
  },
  {
    id: '4',
    name: 'Choi Dong Wook',
    email: 'choi@metacast.com',
    role: 'member',
    status: 'pending',
  },
]

// Sample pending invitations
const initialPendingInvitations: PendingInvitation[] = [
  {
    id: '1',
    email: 'newmember@example.com',
    role: 'member',
    sentAt: '2 days ago',
    expiresAt: '5 days',
  },
]

// Team Header Actions
function TeamHeaderActions({
  memberCount,
  onInvite,
}: {
  memberCount: number
  onInvite: () => void
}) {
  return (
    <div className="flex items-center gap-3">
      {/* Member Count */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--secondary)]/10 rounded-lg border border-[var(--secondary)]/20">
        <Users size={14} className="text-[var(--secondary)]" />
        <span className="text-sm font-medium text-[var(--secondary)]">
          {memberCount} members
        </span>
      </div>
      {/* Invite Member Button */}
      <button
        onClick={onInvite}
        className="flex items-center gap-2 px-4 py-2 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg text-sm font-medium transition-colors"
      >
        <Plus size={18} />
        <span>Invite Member</span>
      </button>
    </div>
  )
}

// Invite Member Modal
function InviteMemberModal({
  onClose,
  onInvite,
}: {
  onClose: () => void
  onInvite: (email: string, role: Role) => void
}) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<Role>('member')
  const [showRoleDropdown, setShowRoleDropdown] = useState(false)
  const [inviteLink, setInviteLink] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      onInvite(email, role)
      setEmail('')
    }
  }

  const generateLink = () => {
    setInviteLink(`https://metacast.com/invite/${Math.random().toString(36).slice(2, 10)}`)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[var(--card-bg)] rounded-2xl w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
              <Mail size={20} className="text-[var(--secondary)]" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Invite Member</h2>
              <p className="text-xs text-[var(--muted)]">Add a new team member</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
          >
            <X size={20} className="text-[var(--muted)]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="colleague@company.com"
              className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:border-[var(--secondary)] text-sm"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="w-full flex items-center justify-between px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm"
              >
                <div className="flex items-center gap-2">
                  {(() => {
                    const Icon = roleInfo[role].icon
                    return <Icon size={16} className="text-[var(--secondary)]" />
                  })()}
                  <span>{roleInfo[role].label}</span>
                </div>
                <ChevronDown size={16} className="text-[var(--muted)]" />
              </button>

              {showRoleDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowRoleDropdown(false)}
                  />
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-xl z-50 overflow-hidden">
                    {(['admin', 'member'] as Role[]).map((r) => {
                      const Icon = roleInfo[r].icon
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => {
                            setRole(r)
                            setShowRoleDropdown(false)
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--background)] transition-colors text-left"
                        >
                          <Icon size={16} className="text-[var(--secondary)]" />
                          <div>
                            <p className="text-sm font-medium">{roleInfo[r].label}</p>
                            <p className="text-xs text-[var(--muted)]">
                              {roleInfo[r].permissions[0]}
                            </p>
                          </div>
                          {role === r && (
                            <Check size={16} className="text-[var(--secondary)] ml-auto" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Role Permissions */}
          <div className="bg-[var(--background)] rounded-lg p-4">
            <p className="text-xs font-medium text-[var(--muted)] mb-2">
              {roleInfo[role].label} can:
            </p>
            <ul className="space-y-1">
              {roleInfo[role].permissions.map((perm, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-[var(--foreground)]">
                  <Check size={12} className="text-[var(--secondary)]" />
                  {perm}
                </li>
              ))}
            </ul>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!email}
            className="w-full py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
          >
            Send Invitation
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-[var(--border-color)]" />
          <span className="text-xs text-[var(--muted)]">or</span>
          <div className="flex-1 h-px bg-[var(--border-color)]" />
        </div>

        {/* Invite Link */}
        <div>
          <label className="block text-sm font-medium mb-2">Invite Link</label>
          {inviteLink ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={inviteLink}
                readOnly
                className="flex-1 px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--muted)]"
              />
              <button
                onClick={copyLink}
                className="px-4 py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg transition-colors"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          ) : (
            <button
              onClick={generateLink}
              className="w-full py-3 border border-[var(--border-color)] hover:border-[var(--secondary)] rounded-lg text-sm transition-colors"
            >
              Generate Invite Link
            </button>
          )}
          <p className="text-xs text-[var(--muted)] mt-2">
            Link expires in 7 days. Anyone with this link can join as {roleInfo[role].label}.
          </p>
        </div>
      </div>
    </div>
  )
}

// Member Action Menu
function MemberActionMenu({
  member,
  onChangeRole,
  onRemove,
  onResendInvite,
  onClose,
}: {
  member: Member
  onChangeRole: (role: Role) => void
  onRemove: () => void
  onResendInvite: () => void
  onClose: () => void
}) {
  const [showRoleSubmenu, setShowRoleSubmenu] = useState(false)

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-full mt-1 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-xl z-50 w-48 overflow-hidden">
        {member.status === 'pending' ? (
          <>
            <button
              onClick={onResendInvite}
              className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-[var(--background)] text-sm text-left transition-colors"
            >
              <RefreshCw size={14} className="text-[var(--muted)]" />
              Resend Invitation
            </button>
            <button
              onClick={onRemove}
              className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-[var(--background)] text-sm text-left text-[var(--accent)] transition-colors"
            >
              <Trash2 size={14} />
              Cancel Invitation
            </button>
          </>
        ) : (
          <>
            {member.role !== 'owner' && (
              <div className="relative">
                <button
                  onClick={() => setShowRoleSubmenu(!showRoleSubmenu)}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[var(--background)] text-sm transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-[var(--muted)]" />
                    Change Role
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-[var(--muted)] transition-transform ${showRoleSubmenu ? 'rotate-180' : ''}`}
                  />
                </button>
                {showRoleSubmenu && (
                  <div className="border-t border-[var(--border-color)] bg-[var(--background)]">
                    {(['admin', 'member'] as Role[]).map((r) => (
                      <button
                        key={r}
                        onClick={() => onChangeRole(r)}
                        className="w-full flex items-center justify-between px-6 py-2 hover:bg-[var(--card-bg)] text-sm transition-colors"
                      >
                        <span>{roleInfo[r].label}</span>
                        {member.role === r && (
                          <Check size={14} className="text-[var(--secondary)]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            {member.role !== 'owner' && (
              <button
                onClick={onRemove}
                className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-[var(--background)] text-sm text-left text-[var(--accent)] transition-colors"
              >
                <Trash2 size={14} />
                Remove Member
              </button>
            )}
          </>
        )}
      </div>
    </>
  )
}

// Member Row
function MemberRow({
  member,
  onChangeRole,
  onRemove,
  onResendInvite,
}: {
  member: Member
  onChangeRole: (role: Role) => void
  onRemove: () => void
  onResendInvite: () => void
}) {
  const [showMenu, setShowMenu] = useState(false)
  const RoleIcon = roleInfo[member.role].icon

  return (
    <tr className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--background)] transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-[var(--secondary)]">
              {member.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium">{member.name}</p>
            <p className="text-xs text-[var(--muted)]">{member.email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full ${
            member.role === 'owner'
              ? 'bg-[var(--secondary)] text-white'
              : member.role === 'admin'
              ? 'bg-[var(--secondary)]/20 text-[var(--secondary)]'
              : 'bg-[var(--background)] text-[var(--muted)] border border-[var(--border-color)]'
          }`}
        >
          <RoleIcon size={12} />
          {roleInfo[member.role].label}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${
            member.status === 'active'
              ? 'bg-[var(--success)]/10 text-[var(--success)]'
              : 'bg-[var(--warning)]/10 text-[var(--warning)]'
          }`}
        >
          {member.status === 'active' ? (
            <Check size={10} />
          ) : (
            <Clock size={10} />
          )}
          {member.status === 'active' ? 'Active' : 'Pending'}
        </span>
      </td>
      <td className="px-6 py-4 text-xs text-[var(--muted)]">
        {member.lastActive || '-'}
      </td>
      <td className="px-6 py-4 text-right relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 hover:bg-[var(--card-bg)] rounded-lg transition-colors"
        >
          <MoreVertical size={16} className="text-[var(--muted)]" />
        </button>
        {showMenu && (
          <MemberActionMenu
            member={member}
            onChangeRole={(role) => {
              onChangeRole(role)
              setShowMenu(false)
            }}
            onRemove={() => {
              onRemove()
              setShowMenu(false)
            }}
            onResendInvite={() => {
              onResendInvite()
              setShowMenu(false)
            }}
            onClose={() => setShowMenu(false)}
          />
        )}
      </td>
    </tr>
  )
}

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>(initialMembers)
  const [pendingInvitations, setPendingInvitations] = useState<PendingInvitation[]>(
    initialPendingInvitations
  )
  const [showInviteModal, setShowInviteModal] = useState(false)

  const handleInvite = (email: string, role: Role) => {
    const newMember: Member = {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email,
      role,
      status: 'pending',
    }
    setMembers([...members, newMember])
    setShowInviteModal(false)
  }

  const handleChangeRole = (memberId: string, newRole: Role) => {
    setMembers(
      members.map((m) => (m.id === memberId ? { ...m, role: newRole } : m))
    )
  }

  const handleRemove = (memberId: string) => {
    if (confirm('Are you sure you want to remove this member?')) {
      setMembers(members.filter((m) => m.id !== memberId))
    }
  }

  const handleResendInvite = (memberId: string) => {
    alert('Invitation resent!')
  }

  const handleCancelPendingInvite = (inviteId: string) => {
    setPendingInvitations(pendingInvitations.filter((i) => i.id !== inviteId))
  }

  const activeMembers = members.filter((m) => m.status === 'active')
  const pendingMembers = members.filter((m) => m.status === 'pending')

  return (
    <div className="min-h-screen">
      <Header
        actions={
          <TeamHeaderActions
            memberCount={members.length}
            onInvite={() => setShowInviteModal(true)}
          />
        }
      />

      <div className="p-6 max-w-5xl mx-auto">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Team</h1>
          <p className="text-[var(--muted)] mt-1">
            Manage your team members and their permissions
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} className="text-[var(--secondary)]" />
              <span className="text-xs text-[var(--muted)]">Total Members</span>
            </div>
            <p className="text-2xl font-bold">{members.length}</p>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Check size={16} className="text-[var(--secondary)]" />
              <span className="text-xs text-[var(--muted)]">Active</span>
            </div>
            <p className="text-2xl font-bold">{activeMembers.length}</p>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-[var(--secondary)]" />
              <span className="text-xs text-[var(--muted)]">Pending</span>
            </div>
            <p className="text-2xl font-bold">{pendingMembers.length}</p>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={16} className="text-[var(--secondary)]" />
              <span className="text-xs text-[var(--muted)]">Admins</span>
            </div>
            <p className="text-2xl font-bold">
              {members.filter((m) => m.role === 'admin' || m.role === 'owner').length}
            </p>
          </div>
        </div>

        {/* Members Table */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
              <Users size={16} className="text-[var(--secondary)]" />
            </div>
            <h2 className="text-lg font-semibold">Members</h2>
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="text-left px-6 py-4 text-sm font-medium text-[var(--muted)]">
                    Member
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-[var(--muted)]">
                    Role
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-[var(--muted)]">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-[var(--muted)]">
                    Last Active
                  </th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <MemberRow
                    key={member.id}
                    member={member}
                    onChangeRole={(role) => handleChangeRole(member.id, role)}
                    onRemove={() => handleRemove(member.id)}
                    onResendInvite={() => handleResendInvite(member.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pending Invitations */}
        {pendingInvitations.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
                <Mail size={16} className="text-[var(--secondary)]" />
              </div>
              <h2 className="text-lg font-semibold">Pending Invitations</h2>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl divide-y divide-[var(--border-color)]">
              {pendingInvitations.map((invite) => (
                <div
                  key={invite.id}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[var(--background)] rounded-full flex items-center justify-center">
                      <Mail size={16} className="text-[var(--muted)]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{invite.email}</p>
                      <p className="text-xs text-[var(--muted)]">
                        Sent {invite.sentAt} - Expires in {invite.expiresAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 text-xs bg-[var(--secondary)]/10 text-[var(--secondary)] rounded-full">
                      {roleInfo[invite.role].label}
                    </span>
                    <button
                      onClick={() => handleCancelPendingInvite(invite.id)}
                      className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors text-[var(--muted)] hover:text-[var(--accent)]"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Role Permissions Info */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
              <Shield size={16} className="text-[var(--secondary)]" />
            </div>
            <h2 className="text-lg font-semibold">Role Permissions</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {(['owner', 'admin', 'member'] as Role[]).map((role) => {
              const Icon = roleInfo[role].icon
              return (
                <div
                  key={role}
                  className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        role === 'owner'
                          ? 'bg-[var(--secondary)]'
                          : 'bg-[var(--secondary)]/10'
                      }`}
                    >
                      <Icon
                        size={16}
                        className={role === 'owner' ? 'text-white' : 'text-[var(--secondary)]'}
                      />
                    </div>
                    <h3 className="font-medium">{roleInfo[role].label}</h3>
                  </div>
                  <ul className="space-y-2">
                    {roleInfo[role].permissions.map((perm, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-[var(--muted)]"
                      >
                        <Check size={12} className="text-[var(--secondary)] mt-0.5 flex-shrink-0" />
                        {perm}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <InviteMemberModal
          onClose={() => setShowInviteModal(false)}
          onInvite={handleInvite}
        />
      )}
    </div>
  )
}
