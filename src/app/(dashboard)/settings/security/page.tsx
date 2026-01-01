'use client'

export default function SecurityPage() {
  return (
    <div className="max-w-2xl">
      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Security Settings</h2>

          {/* Password Change */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Change Password</h3>
            <div>
              <label className="block text-sm text-[var(--muted)] mb-2">Current Password</label>
              <input type="password" className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]" />
            </div>
            <div>
              <label className="block text-sm text-[var(--muted)] mb-2">New Password</label>
              <input type="password" className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]" />
            </div>
            <div>
              <label className="block text-sm text-[var(--muted)] mb-2">Confirm New Password</label>
              <input type="password" className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]" />
            </div>
            <button className="px-4 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[#7c4fe0] transition-colors">Update Password</button>
          </div>

          {/* Two Factor */}
          <div className="pt-6 border-t border-[var(--border-color)]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                <p className="text-xs text-[var(--muted)] mt-1">Add an extra layer of security to your account</p>
              </div>
              <button className="px-4 py-2 border border-[var(--border-color)] rounded-lg text-sm font-medium hover:bg-[var(--background)] transition-colors">
                Enable
              </button>
            </div>
          </div>

          {/* Sessions */}
          <div className="pt-6 border-t border-[var(--border-color)]">
            <h3 className="text-sm font-medium mb-4">Active Sessions</h3>
            <div className="space-y-3">
              {[
                { device: 'MacBook Pro', location: 'Seoul, Korea', current: true },
                { device: 'iPhone 15', location: 'Seoul, Korea', current: false },
              ].map((session, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[var(--background)] rounded-lg">
                  <div>
                    <p className="text-sm font-medium flex items-center gap-2">
                      {session.device}
                      {session.current && <span className="px-2 py-0.5 bg-[var(--success)]/10 text-[var(--success)] text-xs rounded">Current</span>}
                    </p>
                    <p className="text-xs text-[var(--muted)]">{session.location}</p>
                  </div>
                  {!session.current && (
                    <button className="text-xs text-[var(--accent)] hover:underline">Revoke</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
