'use client'

import { Header } from '@/components/layout/Header'

export default function ProfilePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-6">
        <div className="max-w-2xl">
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Profile Settings</h2>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-[var(--secondary)] rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">LM</span>
                </div>
                <button className="px-3 py-1.5 border border-[var(--border-color)] rounded-lg text-sm hover:bg-[var(--background)]">
                  Change Avatar
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input type="text" defaultValue="Lee Min Ho" className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" defaultValue="lee@metacast.io" className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  defaultValue="Content creator and live streamer"
                  rows={3}
                  className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm resize-none focus:outline-none focus:border-[var(--secondary)]"
                />
              </div>
              <button className="px-4 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[#7c4fe0] transition-colors">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
