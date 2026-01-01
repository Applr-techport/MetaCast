'use client'

import Link from 'next/link'
import { Code, Book, Terminal, Webhook, Key, Zap, ArrowRight, ExternalLink, Github, Copy } from 'lucide-react'
import { LandingHeader, Footer } from '@/components/landing'

export default function DeveloperCenterPage() {
  const resources = [
    {
      icon: Book,
      title: 'API Documentation',
      description: 'Complete reference for all API endpoints with examples.',
      href: '/developers/api',
      cta: 'Read Docs',
    },
    {
      icon: Terminal,
      title: 'SDKs & Libraries',
      description: 'Official SDKs for JavaScript, Python, and more.',
      href: '/developers/sdks',
      cta: 'Get SDKs',
    },
    {
      icon: Webhook,
      title: 'Webhooks',
      description: 'Real-time event notifications for your applications.',
      href: '/developers/webhooks',
      cta: 'Learn More',
    },
    {
      icon: Key,
      title: 'Authentication',
      description: 'OAuth 2.0 and API key authentication guides.',
      href: '/developers/auth',
      cta: 'Get Started',
    },
  ]

  const quickstartCode = `import { MetaCast } from '@metacast/sdk';

const client = new MetaCast({
  apiKey: process.env.METACAST_API_KEY
});

// Create a new stream
const stream = await client.streams.create({
  title: 'My Live Stream',
  platforms: ['youtube', 'facebook'],
  scheduledFor: new Date('2026-01-15T18:00:00Z')
});

console.log('Stream created:', stream.id);`

  const stats = [
    { label: 'API Requests/Day', value: '50M+' },
    { label: 'Developer Apps', value: '5,000+' },
    { label: 'Avg Response Time', value: '<50ms' },
    { label: 'Uptime SLA', value: '99.99%' },
  ]

  return (
    <main className="min-h-screen bg-white">
      <LandingHeader />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-[var(--primary)] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code size={24} className="text-[var(--secondary)]" />
            <span className="text-sm font-medium text-white/80">Developer Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Build with MetaCast
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Integrate powerful streaming capabilities into your applications with our comprehensive APIs, SDKs, and developer tools.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/developers/api"
              className="flex items-center gap-2 px-6 py-3 bg-[var(--secondary)] text-white rounded-full font-medium hover:bg-[#7c4fe0] transition-colors"
            >
              View API Docs
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/developers/quickstart"
              className="flex items-center gap-2 px-6 py-3 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              Quickstart Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-[var(--secondary)]">{stat.value}</p>
                <p className="text-sm text-[var(--muted)] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Developer Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource) => {
              const Icon = resource.icon
              return (
                <Link
                  key={resource.title}
                  href={resource.href}
                  className="p-6 border border-[var(--border-color)] rounded-xl hover:border-[var(--secondary)] transition-colors group"
                >
                  <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={24} className="text-[var(--secondary)]" />
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-[var(--secondary)] transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] mb-4">{resource.description}</p>
                  <span className="flex items-center gap-1 text-[var(--secondary)] text-sm font-medium">
                    {resource.cta}
                    <ArrowRight size={14} />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quickstart */}
      <section className="py-20 px-6 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Zap size={24} className="text-[var(--secondary)] mx-auto mb-2" />
            <h2 className="text-2xl font-bold mb-2">Get Started in Minutes</h2>
            <p className="text-[var(--muted)]">
              Install our SDK and start building with just a few lines of code.
            </p>
          </div>

          {/* Install command */}
          <div className="bg-[var(--primary)] rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/50">Install via npm</span>
              <button className="text-white/50 hover:text-white transition-colors">
                <Copy size={14} />
              </button>
            </div>
            <code className="text-[var(--secondary)] font-mono">npm install @metacast/sdk</code>
          </div>

          {/* Code example */}
          <div className="bg-[var(--primary)] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <span className="text-xs text-white/50">quickstart.ts</span>
              <button className="text-white/50 hover:text-white transition-colors">
                <Copy size={14} />
              </button>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm text-white/80 font-mono">{quickstartCode}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* API Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">API Capabilities</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Stream Management',
                features: ['Create & schedule streams', 'Multi-platform broadcasting', 'Real-time stream control', 'Recording management'],
              },
              {
                title: 'AI Content',
                features: ['Auto-generate clips', 'Smart transcription', 'Content optimization', 'Thumbnail generation'],
              },
              {
                title: 'Analytics',
                features: ['Real-time metrics', 'Audience insights', 'Revenue tracking', 'Custom reports'],
              },
            ].map((section) => (
              <div key={section.title} className="border border-[var(--border-color)] rounded-xl p-6">
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                      <div className="w-1.5 h-1.5 bg-[var(--secondary)] rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-20 px-6 bg-[var(--secondary)]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Github size={48} className="mx-auto mb-4 text-white/80" />
          <h2 className="text-3xl font-bold mb-4">Join Our Developer Community</h2>
          <p className="text-white/80 mb-8">
            Connect with other developers, share projects, and get help from our team.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/metacast"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white text-[var(--primary)] rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              <Github size={18} />
              GitHub
            </a>
            <Link
              href="/community"
              className="flex items-center gap-2 px-6 py-3 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              Discord Community
              <ExternalLink size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
