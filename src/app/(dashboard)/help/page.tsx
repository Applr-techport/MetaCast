'use client'

import { Header } from '@/components/layout/Header'
import { HelpCircle, Book, MessageCircle, Mail, ExternalLink, Search, MessageSquare } from 'lucide-react'

// Help Header Actions
function HelpHeaderActions() {
  return (
    <div className="flex items-center gap-3">
      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
        <input
          type="text"
          placeholder="Search help articles..."
          className="w-64 pl-9 pr-4 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent"
        />
      </div>
      {/* Live Chat Button */}
      <button className="flex items-center gap-2 px-4 py-2 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg text-sm font-medium transition-colors">
        <MessageSquare size={18} />
        <span>Live Chat</span>
      </button>
    </div>
  )
}

export default function HelpPage() {
  const helpItems = [
    { icon: Book, title: 'Documentation', desc: 'Browse our guides and tutorials', href: '#' },
    { icon: MessageCircle, title: 'Community', desc: 'Join our Discord community', href: '#' },
    { icon: Mail, title: 'Contact Support', desc: 'Get help from our team', href: '#' },
  ]

  const faqs = [
    { q: 'How do I connect my YouTube channel?', a: 'Go to Channels page and click "Add Channel" to connect via OAuth.' },
    { q: 'What video formats are supported?', a: 'We support MP4, MOV, AVI, and MKV up to 10GB.' },
    { q: 'Can I stream to multiple platforms?', a: 'Yes, you can multistream to YouTube, Facebook, Twitch, and more.' },
  ]

  return (
    <div className="min-h-screen">
      <Header actions={<HelpHeaderActions />} />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle size={28} className="text-[var(--secondary)]" />
          <h1 className="text-2xl font-bold">Help Center</h1>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {helpItems.map(item => (
            <a key={item.title} href={item.href} className="p-6 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl hover:border-[var(--secondary)] transition-colors">
              <item.icon size={24} className="text-[var(--secondary)] mb-3" />
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-[var(--muted)]">{item.desc}</p>
            </a>
          ))}
        </div>

        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-4 bg-[var(--background)] rounded-lg">
                <p className="font-medium text-sm mb-2">{faq.q}</p>
                <p className="text-sm text-[var(--muted)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
