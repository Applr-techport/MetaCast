'use client'

export default function AppearancePage() {
  return (
    <div className="max-w-2xl">
      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Appearance</h2>

          <div>
            <label className="block text-sm font-medium mb-3">Theme</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'system', label: 'System' },
              ].map((theme) => (
                <button
                  key={theme.value}
                  className={`p-4 border rounded-xl text-sm font-medium transition-colors ${
                    theme.value === 'dark'
                      ? 'border-[var(--secondary)] bg-[var(--secondary)]/5 text-[var(--secondary)]'
                      : 'border-[var(--border-color)] hover:border-[var(--secondary)]'
                  }`}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Language</label>
            <select className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]">
              <option>English</option>
              <option>한국어</option>
              <option>日本語</option>
              <option>中文</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Timezone</label>
            <select className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]">
              <option>Asia/Seoul (GMT+9)</option>
              <option>America/New_York (GMT-5)</option>
              <option>Europe/London (GMT+0)</option>
              <option>Asia/Tokyo (GMT+9)</option>
            </select>
          </div>

          <button className="px-4 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium hover:bg-[#7c4fe0] transition-colors">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}
