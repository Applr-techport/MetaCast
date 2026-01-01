'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import {
  ArrowLeft,
  Film,
  Image,
  Video,
  Zap,
  ArrowRight,
  Clock,
  Sparkles,
  Play,
  TrendingUp,
  Star,
  Layers,
  Wand2,
  Scissors,
  Maximize2,
} from 'lucide-react'

// Header Actions
function VideoGeneratorHeaderActions() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--secondary)]/10 rounded-lg border border-[var(--secondary)]/20">
        <Sparkles size={14} className="text-[var(--secondary)]" />
        <span className="text-sm font-medium text-[var(--secondary)]">820 credits remaining</span>
      </div>
    </div>
  )
}

const generationModes = [
  {
    id: 'shortform',
    icon: Zap,
    title: 'Shortform Creator',
    description: 'Create viral short videos optimized for social platforms',
    features: ['15-60 seconds', 'Auto captions', 'Trending music', 'Viral hooks'],
    href: '/ai-studio/video-generator/shortform',
    badge: 'Popular',
    stats: { created: '12.5K', avgTime: '2 min' },
  },
  {
    id: 'video',
    icon: Film,
    title: 'Long-form Video',
    description: 'Generate professional videos with full creative control',
    features: ['Up to 10 min', 'Scene editor', 'Voice synthesis', 'Multi-track'],
    href: '/ai-studio/video-generator/video',
    badge: null,
    stats: { created: '8.2K', avgTime: '5 min' },
  },
  {
    id: 'image',
    icon: Image,
    title: 'Image to Video',
    description: 'Bring static images to life with AI-powered animation',
    features: ['Motion effects', 'Parallax depth', 'Seamless loops', 'Style transfer'],
    href: '/ai-studio/video-generator/image-to-video',
    badge: 'AI Enhanced',
    stats: { created: '15.8K', avgTime: '1 min' },
  },
  {
    id: 'stream',
    icon: Video,
    title: 'Stream Highlights',
    description: 'Extract the best moments from your live streams automatically',
    features: ['Auto detection', 'Peak moments', 'Clip editing', 'Multi-export'],
    href: '/ai-studio/video-generator/from-stream',
    badge: null,
    stats: { created: '4.3K', avgTime: '3 min' },
  },
]

const recentProjects = [
  { id: '1', title: 'Product Launch Promo', type: 'shortform', duration: '0:45', status: 'completed', thumbnail: 'gradient-1' },
  { id: '2', title: 'Tutorial Series Ep.3', type: 'video', duration: '8:30', status: 'completed', thumbnail: 'gradient-2' },
  { id: '3', title: 'Instagram Story Set', type: 'image', duration: '0:15', status: 'processing', thumbnail: 'gradient-3' },
]

// Purple-only gradient helper (design rule: only purple as accent color)
function getProjectGradient() {
  return 'bg-gradient-to-br from-[var(--secondary)] to-[#a855f7]'
}

const aiCapabilities = [
  { icon: Wand2, title: 'Scene Generation', desc: 'AI creates scenes from text descriptions' },
  { icon: Layers, title: 'Style Transfer', desc: 'Apply cinematic styles to any footage' },
  { icon: Scissors, title: 'Smart Editing', desc: 'Auto-cut and transition optimization' },
  { icon: Maximize2, title: '4K Upscaling', desc: 'Enhance resolution up to 4K quality' },
]

export default function AIVideoGeneratorPage() {
  return (
    <div className="min-h-screen">
      <Header actions={<VideoGeneratorHeaderActions />} />

      <div className="p-6 max-w-7xl mx-auto">
      {/* Sub Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/ai-studio"
          className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
        >
          <ArrowLeft size={20} className="text-[var(--muted)]" />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-[var(--foreground)]">AI Video Generator</h1>
          <p className="text-sm text-[var(--muted)]">Create stunning videos with the power of AI</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--secondary)]/10 rounded-full">
          <Sparkles size={14} className="text-[var(--secondary)]" />
          <span className="text-xs font-medium text-[var(--secondary)]">Powered by Kling AI</span>
        </div>
      </div>

      {/* AI Capabilities Banner */}
      <div className="bg-gradient-to-r from-[var(--secondary)]/10 to-[var(--secondary)]/5 rounded-xl border border-[var(--secondary)]/20 p-5 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[var(--secondary)] rounded-xl flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-[var(--foreground)]">AI-Powered Video Creation</h2>
            <p className="text-sm text-[var(--muted)]">Professional quality videos generated in minutes</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {aiCapabilities.map((cap) => {
            const Icon = cap.icon
            return (
              <div key={cap.title} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-[var(--secondary)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">{cap.title}</p>
                  <p className="text-xs text-[var(--muted)]">{cap.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Generation Modes */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[var(--foreground)]">Choose Creation Mode</h2>
            <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
              <TrendingUp size={14} />
              <span>40.8K videos created this month</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {generationModes.map((mode) => {
              const IconComponent = mode.icon
              return (
                <Link
                  key={mode.id}
                  href={mode.href}
                  className="group bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-5 hover:border-[var(--secondary)] hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center group-hover:bg-[var(--secondary)]/20 transition-colors">
                      <IconComponent size={24} className="text-[var(--secondary)]" />
                    </div>
                    {mode.badge && (
                      <span className="px-2 py-0.5 bg-[var(--secondary)]/10 text-[var(--secondary)] rounded-full text-xs font-medium">
                        {mode.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-[var(--foreground)] mb-1 group-hover:text-[var(--secondary)] transition-colors">
                    {mode.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] mb-4">{mode.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {mode.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-[var(--background)] text-xs text-[var(--muted)] rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
                    <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
                      <span className="flex items-center gap-1">
                        <Star size={12} />
                        {mode.stats.created} created
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        ~{mode.stats.avgTime}
                      </span>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-[var(--secondary)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Projects Sidebar */}
        <div className="space-y-4">
          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[var(--foreground)]">Recent Projects</h3>
              <Link href="/assets" className="text-xs text-[var(--secondary)] hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-lg hover:bg-[var(--background)]/80 transition-colors cursor-pointer"
                >
                  <div className={`w-14 h-10 rounded-lg flex items-center justify-center ${getProjectGradient()}`}>
                    <Play size={14} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--foreground)] truncate">{project.title}</p>
                    <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                      <span className="capitalize">{project.type}</span>
                      <span>·</span>
                      <span>{project.duration}</span>
                    </div>
                  </div>
                  {project.status === 'processing' && (
                    <div className="w-2 h-2 bg-[var(--secondary)] rounded-full animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-5">
            <h3 className="font-semibold text-[var(--foreground)] mb-4">This Month</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--muted)]">Videos Created</span>
                <span className="font-semibold text-[var(--foreground)]">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--muted)]">Total Duration</span>
                <span className="font-semibold text-[var(--foreground)]">45 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--muted)]">AI Credits Used</span>
                <span className="font-semibold text-[var(--foreground)]">180</span>
              </div>
              <div className="h-px bg-[var(--border-color)] my-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--muted)]">Credits Remaining</span>
                <span className="font-semibold text-[var(--secondary)]">820</span>
              </div>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-[var(--secondary)]/5 rounded-xl border border-[var(--secondary)]/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-[var(--secondary)]" />
              <span className="font-medium text-[var(--foreground)]">Pro Tip</span>
            </div>
            <p className="text-sm text-[var(--muted)]">
              Use detailed prompts with specific visual descriptions for best results. Include mood, lighting, and camera angles.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
