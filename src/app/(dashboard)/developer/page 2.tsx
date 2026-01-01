'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Key, Webhook, Book, Code2, Copy, Eye, EyeOff, Plus, Trash2 } from 'lucide-react'

const TABS = [
  { id: 'api-keys', label: 'API Keys', icon: Key },
  { id: 'webhooks', label: 'Webhooks', icon: Webhook },
  { id: 'docs', label: 'Documentation', icon: Book },
]

export default function DeveloperPage() {
  const [activeTab, setActiveTab] = useState('api-keys')

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Code2 size={28} className="text-[var(--secondary)]" />
          <h1 className="text-2xl font-bold">Developer Center</h1>
        </div>

        {/* 탭 메뉴 */}
        <div className="flex gap-2 mb-6 border-b border-[var(--border-color)]">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-[1px] transition-colors ${
                activeTab === tab.id
                  ? 'border-[var(--secondary)] text-[var(--secondary)]'
                  : 'border-transparent text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* 컨텐츠 */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
          {activeTab === 'api-keys' && <ApiKeysSection />}
          {activeTab === 'webhooks' && <WebhooksSection />}
          {activeTab === 'docs' && <DocsSection />}
        </div>
      </div>
    </div>
  )
}

function ApiKeysSection() {
  const [showKey, setShowKey] = useState(false)
  const apiKeys = [
    { id: 1, name: 'Production Key', key: 'xc_live_abc123...xyz789', created: '2024-12-01', lastUsed: '2 hours ago' },
    { id: 2, name: 'Development Key', key: 'xc_test_def456...uvw123', created: '2024-11-15', lastUsed: '1 day ago' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">API Keys</h2>
          <p className="text-sm text-[var(--muted)]">Manage your API keys for integrations</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium">
          <Plus size={16} />
          Create New Key
        </button>
      </div>

      <div className="space-y-3">
        {apiKeys.map(apiKey => (
          <div key={apiKey.id} className="p-4 bg-[var(--background)] rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">{apiKey.name}</span>
              <div className="flex items-center gap-2">
                <button className="p-1.5 hover:bg-[var(--card-bg)] rounded transition-colors">
                  <Copy size={16} className="text-[var(--muted)]" />
                </button>
                <button className="p-1.5 hover:bg-[var(--card-bg)] rounded transition-colors text-[var(--accent)]">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <code className="text-xs bg-[var(--card-bg)] px-2 py-1 rounded font-mono">
                {showKey ? apiKey.key : '••••••••••••••••••••••'}
              </code>
              <button onClick={() => setShowKey(!showKey)} className="p-1 hover:bg-[var(--card-bg)] rounded">
                {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            <p className="text-xs text-[var(--muted)]">Created: {apiKey.created} • Last used: {apiKey.lastUsed}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function WebhooksSection() {
  const webhooks = [
    { id: 1, url: 'https://myapp.com/webhooks/xcaster', events: ['stream.started', 'stream.ended'], status: 'active' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Webhooks</h2>
          <p className="text-sm text-[var(--muted)]">Receive real-time notifications</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium">
          <Plus size={16} />
          Add Webhook
        </button>
      </div>

      <div className="space-y-3">
        {webhooks.map(webhook => (
          <div key={webhook.id} className="p-4 bg-[var(--background)] rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <code className="text-sm font-mono">{webhook.url}</code>
              <span className="px-2 py-0.5 bg-[var(--success)]/10 text-[var(--success)] text-xs rounded-full">
                {webhook.status}
              </span>
            </div>
            <p className="text-xs text-[var(--muted)]">Events: {webhook.events.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function DocsSection() {
  const docs = [
    { title: 'Getting Started', desc: 'Learn the basics of XCaster API' },
    { title: 'Authentication', desc: 'How to authenticate your requests' },
    { title: 'Streaming API', desc: 'Create and manage streams programmatically' },
    { title: 'Webhooks Guide', desc: 'Set up real-time event notifications' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Documentation</h2>
        <p className="text-sm text-[var(--muted)]">Learn how to integrate with XCaster</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {docs.map(doc => (
          <a
            key={doc.title}
            href="#"
            className="p-4 bg-[var(--background)] rounded-lg hover:border-[var(--secondary)] border border-transparent transition-colors"
          >
            <h3 className="font-medium text-sm mb-1">{doc.title}</h3>
            <p className="text-xs text-[var(--muted)]">{doc.desc}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
