'use client'

import Link from 'next/link'
import { Code, Key, Book, Zap, ArrowRight, Copy } from 'lucide-react'
import { LandingHeader, Footer } from '@/components/landing'

export default function ApiDocumentationPage() {
  const endpoints = [
    { method: 'GET', path: '/api/v1/streams', description: 'List all streams' },
    { method: 'POST', path: '/api/v1/streams', description: 'Create a new stream' },
    { method: 'GET', path: '/api/v1/streams/:id', description: 'Get stream details' },
    { method: 'PUT', path: '/api/v1/streams/:id', description: 'Update stream settings' },
    { method: 'DELETE', path: '/api/v1/streams/:id', description: 'Delete a stream' },
    { method: 'POST', path: '/api/v1/streams/:id/start', description: 'Start streaming' },
    { method: 'POST', path: '/api/v1/streams/:id/stop', description: 'Stop streaming' },
  ]

  const codeExample = `curl -X GET "https://api.metacast.io/v1/streams" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`

  return (
    <main className="min-h-screen bg-white">
      <LandingHeader />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">API Documentation</h1>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Build powerful streaming integrations with the MetaCast API. Full RESTful API with webhooks support.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-6 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[var(--border-color)]">
              <Key size={24} className="text-[var(--secondary)] mb-4" />
              <h3 className="font-semibold mb-2">Authentication</h3>
              <p className="text-sm text-[var(--muted)]">Learn how to authenticate your API requests with API keys.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[var(--border-color)]">
              <Book size={24} className="text-[var(--secondary)] mb-4" />
              <h3 className="font-semibold mb-2">Guides</h3>
              <p className="text-sm text-[var(--muted)]">Step-by-step tutorials for common integration patterns.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[var(--border-color)]">
              <Zap size={24} className="text-[var(--secondary)] mb-4" />
              <h3 className="font-semibold mb-2">Webhooks</h3>
              <p className="text-sm text-[var(--muted)]">Real-time notifications for stream events.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
          <div className="bg-[#1e1e1e] rounded-xl p-6 relative">
            <button className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Copy size={16} className="text-white/60" />
            </button>
            <pre className="text-sm text-white/90 overflow-x-auto">
              <code>{codeExample}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="py-16 px-6 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Stream Endpoints</h2>
          <div className="bg-white rounded-xl border border-[var(--border-color)] overflow-hidden">
            <table className="w-full">
              <thead className="bg-[var(--background)]">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium">Method</th>
                  <th className="text-left px-4 py-3 text-sm font-medium">Endpoint</th>
                  <th className="text-left px-4 py-3 text-sm font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {endpoints.map((endpoint) => (
                  <tr key={endpoint.path + endpoint.method} className="hover:bg-[var(--background)] transition-colors">
                    <td className="px-4 py-3">
                      <span className={`text-xs font-mono font-medium px-2 py-1 rounded ${
                        endpoint.method === 'GET' ? 'bg-green-100 text-green-700' :
                        endpoint.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                        endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {endpoint.method}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-sm">{endpoint.path}</td>
                    <td className="px-4 py-3 text-sm text-[var(--muted)]">{endpoint.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-[var(--secondary)]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Code size={32} className="text-[var(--secondary)]" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Ready to integrate?</h2>
          <p className="text-[var(--muted)] mb-8">
            Get your API key and start building today.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--secondary)] text-white rounded-full font-medium hover:bg-[#7c4fe0] transition-colors"
          >
            Get API Key
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
