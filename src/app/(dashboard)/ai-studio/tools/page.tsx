'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { ArrowLeft, Image, MessageSquare, FileText, Tag, Palette, BarChart3, ArrowRight, Lock, Sparkles } from 'lucide-react'

// Header Actions
function ToolsHeaderActions() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--secondary)]/10 rounded-lg border border-[var(--secondary)]/20">
        <Sparkles size={14} className="text-[var(--secondary)]" />
        <span className="text-sm font-medium text-[var(--secondary)]">6 tools available</span>
      </div>
    </div>
  )
}

const tools = [
  {
    id: 'thumbnail',
    icon: Image,
    title: 'Thumbnail Generator',
    description: 'Create eye-catching thumbnails for your videos and streams',
    href: '/ai-studio/tools/thumbnail',
    buttonText: 'Generate',
    available: true,
  },
  {
    id: 'caption',
    icon: MessageSquare,
    title: 'Caption Generator',
    description: 'Auto-generate subtitles and captions for any video',
    href: '/ai-studio/tools/caption',
    buttonText: 'Generate',
    available: true,
  },
  {
    id: 'script',
    icon: FileText,
    title: 'Script Writer',
    description: 'Generate live stream scripts from product information',
    href: '/ai-studio/tools/script',
    buttonText: 'Write',
    available: true,
  },
  {
    id: 'product-description',
    icon: Tag,
    title: 'Product Description',
    description: 'Create compelling product copy for your live commerce',
    href: '/ai-studio/tools/product-description',
    buttonText: 'Generate',
    available: true,
  },
  {
    id: 'brand-voice',
    icon: Palette,
    title: 'Brand Voice Trainer',
    description: "Train AI on your brand's tone and style",
    href: '/ai-studio/tools/brand-voice',
    buttonText: 'Train',
    available: true,
  },
  {
    id: 'content-analyzer',
    icon: BarChart3,
    title: 'Content Analyzer',
    description: 'Analyze your best performing content patterns',
    href: '/ai-studio/tools/content-analyzer',
    buttonText: 'Analyze',
    available: true,
  },
]

export default function AIToolsPage() {
  return (
    <div className="min-h-screen">
      <Header actions={<ToolsHeaderActions />} />

      <div className="p-6">
      {/* Back Button */}
      <Link
        href="/ai-studio"
        className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to AI Studio</span>
      </Link>

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">AI Tools</h1>
        <p className="text-[var(--muted)]">Boost your content with AI-powered utilities</p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => {
          const IconComponent = tool.icon
          return (
            <Link
              key={tool.id}
              href={tool.available ? tool.href : '#'}
              className={`group bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-5 transition-all ${
                tool.available
                  ? 'hover:border-[var(--secondary)] hover:shadow-md cursor-pointer'
                  : 'opacity-60 cursor-not-allowed'
              }`}
              onClick={(e) => !tool.available && e.preventDefault()}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    tool.available ? 'bg-[var(--secondary)]/10' : 'bg-[var(--background)]'
                  }`}
                >
                  <IconComponent
                    size={24}
                    className={tool.available ? 'text-[var(--secondary)]' : 'text-[var(--muted)]'}
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[var(--foreground)]">{tool.title}</h3>
                    {!tool.available && <Lock size={14} className="text-[var(--muted)]" />}
                  </div>
                  <p className="text-sm text-[var(--muted)] mb-3">{tool.description}</p>

                  {/* Button */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-medium ${
                        tool.available
                          ? 'text-[var(--secondary)] group-hover:text-[#7c4fe0]'
                          : 'text-[var(--muted)]'
                      } transition-colors`}
                    >
                      {tool.buttonText}
                    </span>
                    {tool.available && (
                      <ArrowRight
                        size={16}
                        className="text-[var(--secondary)] group-hover:translate-x-1 transition-transform"
                      />
                    )}
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
    </div>
  )
}
