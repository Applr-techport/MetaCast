'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { User, Users, LogOut, Bell, Shield, CreditCard, Palette } from 'lucide-react'

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'appearance', label: 'Appearance', icon: Palette },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="flex gap-6">
          {/* 좌측 탭 메뉴 */}
          <div className="w-56 space-y-1">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[var(--primary)] text-white'
                    : 'hover:bg-[var(--background)] text-[var(--foreground)]'
                }`}
              >
                <tab.icon size={18} className={activeTab === tab.id ? 'text-white' : 'text-[var(--muted)]'} />
                {tab.label}
              </button>
            ))}
            <hr className="my-4 border-[var(--border-color)]" />
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors">
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* 우측 컨텐츠 */}
          <div className="flex-1 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
            {activeTab === 'profile' && <ProfileSection />}
            {activeTab === 'team' && <TeamSection />}
            {activeTab === 'notifications' && <NotificationsSection />}
            {activeTab === 'security' && <SecuritySection />}
            {activeTab === 'billing' && <BillingSection />}
            {activeTab === 'appearance' && <AppearanceSection />}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Profile Settings</h2>
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-[var(--muted)] rounded-full" />
        <button className="px-4 py-2 border border-[var(--border-color)] rounded-lg text-sm hover:bg-[var(--background)]">
          Change Avatar
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input type="text" defaultValue="Lee Min Ho" className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input type="email" defaultValue="lee@xcaster.com" className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm" />
        </div>
      </div>
      <button className="px-6 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium">Save Changes</button>
    </div>
  )
}

function TeamSection() {
  const members = [
    { name: 'Lee Min Ho', email: 'lee@xcaster.com', role: 'Owner' },
    { name: 'Kim Soo Jin', email: 'kim@xcaster.com', role: 'Admin' },
    { name: 'Park Ji Yeon', email: 'park@xcaster.com', role: 'Member' },
  ]
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Team Members</h2>
        <button className="px-4 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium">Invite Member</button>
      </div>
      <div className="space-y-3">
        {members.map(m => (
          <div key={m.email} className="flex items-center justify-between p-4 bg-[var(--background)] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--muted)] rounded-full" />
              <div>
                <p className="text-sm font-medium">{m.name}</p>
                <p className="text-xs text-[var(--muted)]">{m.email}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-[var(--secondary)]/10 text-[var(--secondary)] text-xs rounded-full">{m.role}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function NotificationsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Notification Preferences</h2>
      {['Stream started', 'Stream ended', 'New subscriber', 'Weekly report'].map(item => (
        <div key={item} className="flex items-center justify-between py-3 border-b border-[var(--border-color)]">
          <span className="text-sm">{item}</span>
          <input type="checkbox" defaultChecked className="w-4 h-4" />
        </div>
      ))}
    </div>
  )
}

function SecuritySection() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Security Settings</h2>
      <div>
        <label className="block text-sm font-medium mb-2">Current Password</label>
        <input type="password" className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">New Password</label>
        <input type="password" className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm" />
      </div>
      <button className="px-6 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium">Update Password</button>
    </div>
  )
}

function BillingSection() {
  const invoices = [
    { id: 'INV-001', date: 'Dec 15, 2024', amount: '$29.00', status: 'Paid' },
    { id: 'INV-002', date: 'Nov 15, 2024', amount: '$29.00', status: 'Paid' },
    { id: 'INV-003', date: 'Oct 15, 2024', amount: '$29.00', status: 'Paid' },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Billing & Plans</h2>

      {/* Current Plan */}
      <div className="p-5 bg-[var(--secondary)]/5 border border-[var(--secondary)]/20 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[var(--secondary)] text-white text-xs font-medium rounded">PRO</span>
              <span className="text-lg font-semibold">Pro Plan</span>
            </div>
            <p className="text-sm text-[var(--muted)] mt-1">$29/month - Billed monthly</p>
          </div>
          <button className="px-4 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[#7c4fe0] transition-colors">
            Upgrade Plan
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[var(--secondary)]/20">
          <div>
            <p className="text-xs text-[var(--muted)]">Next billing</p>
            <p className="text-sm font-medium">Jan 15, 2025</p>
          </div>
          <div>
            <p className="text-xs text-[var(--muted)]">AI Credits</p>
            <p className="text-sm font-medium">68 / 100 remaining</p>
          </div>
          <div>
            <p className="text-xs text-[var(--muted)]">Storage</p>
            <p className="text-sm font-medium">32.5 GB / 50 GB</p>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <h3 className="text-sm font-medium mb-3">Payment Method</h3>
        <div className="flex items-center justify-between p-4 bg-[var(--background)] rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-6 bg-[var(--primary)] rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">VISA</span>
            </div>
            <div>
              <p className="text-sm font-medium">Visa ending in 4242</p>
              <p className="text-xs text-[var(--muted)]">Expires 12/2026</p>
            </div>
          </div>
          <button className="text-sm text-[var(--secondary)] hover:underline">Update</button>
        </div>
      </div>

      {/* Billing History */}
      <div>
        <h3 className="text-sm font-medium mb-3">Billing History</h3>
        <div className="bg-[var(--background)] rounded-lg overflow-hidden">
          {invoices.map((invoice, i) => (
            <div key={invoice.id} className={`flex items-center justify-between p-4 ${i !== invoices.length - 1 ? 'border-b border-[var(--border-color)]' : ''}`}>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">{invoice.id}</span>
                <span className="text-sm text-[var(--muted)]">{invoice.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">{invoice.amount}</span>
                <span className="px-2 py-0.5 bg-[var(--success)]/10 text-[var(--success)] text-xs rounded-full">{invoice.status}</span>
                <button className="text-sm text-[var(--secondary)] hover:underline">Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cancel Subscription */}
      <div className="pt-4 border-t border-[var(--border-color)]">
        <button className="text-sm text-[var(--accent)] hover:underline">Cancel Subscription</button>
      </div>
    </div>
  )
}

function AppearanceSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Appearance</h2>
      <div>
        <label className="block text-sm font-medium mb-2">Theme</label>
        <select className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm">
          <option>Light</option>
          <option>Dark</option>
          <option>System</option>
        </select>
      </div>
    </div>
  )
}
