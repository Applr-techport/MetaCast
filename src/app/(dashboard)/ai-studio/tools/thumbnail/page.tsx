'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import {
  ArrowLeft,
  Image,
  Sparkles,
  Check,
  Download,
  Save,
  RotateCcw,
  Type,
  Palette,
  Layout,
} from 'lucide-react'

// Header Actions
function ThumbnailHeaderActions() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--secondary)]/10 rounded-lg border border-[var(--secondary)]/20">
        <Image size={14} className="text-[var(--secondary)]" />
        <span className="text-sm font-medium text-[var(--secondary)]">10 credits per thumbnail</span>
      </div>
    </div>
  )
}

type Step = 'input' | 'settings' | 'generating' | 'results'

const stylePresets = [
  { id: 'modern', label: 'Modern', desc: 'Clean and minimalist' },
  { id: 'bold', label: 'Bold', desc: 'High contrast, attention-grabbing' },
  { id: 'playful', label: 'Playful', desc: 'Colorful and fun' },
  { id: 'professional', label: 'Professional', desc: 'Corporate and sleek' },
]

const layoutOptions = [
  { id: 'centered', label: 'Centered Text' },
  { id: 'left', label: 'Left Aligned' },
  { id: 'split', label: 'Split Layout' },
  { id: 'overlay', label: 'Text Overlay' },
]

export default function ThumbnailGeneratorPage() {
  const [step, setStep] = useState<Step>('input')
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [style, setStyle] = useState('modern')
  const [layout, setLayout] = useState('centered')
  const [thumbnailCount, setThumbnailCount] = useState('4')
  const [progress, setProgress] = useState(0)

  const handleGenerate = () => {
    setStep('generating')
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 5
      setProgress(currentProgress)
      if (currentProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => setStep('results'), 500)
      }
    }, 100)
  }

  return (
    <div className="min-h-screen">
      <Header actions={<ThumbnailHeaderActions />} />

      <div className="p-6">
      {/* Back Button */}
      <Link
        href="/ai-studio/tools"
        className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to AI Tools</span>
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Thumbnail Generator</h1>
        <p className="text-[var(--muted)]">Create eye-catching thumbnails for your content</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-4 mb-8">
        {['Content', 'Style', 'Generate'].map((label, index) => {
          const stepNum = index + 1
          const isActive =
            (step === 'input' && stepNum === 1) ||
            (step === 'settings' && stepNum === 2) ||
            ((step === 'generating' || step === 'results') && stepNum === 3)
          const isCompleted =
            (step === 'settings' && stepNum === 1) ||
            ((step === 'generating' || step === 'results') && stepNum <= 2)

          return (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isCompleted
                    ? 'bg-[var(--secondary)] text-white'
                    : isActive
                      ? 'bg-[var(--secondary)]/20 text-[var(--secondary)] border-2 border-[var(--secondary)]'
                      : 'bg-[var(--background)] text-[var(--muted)] border border-[var(--border-color)]'
                }`}
              >
                {isCompleted ? <Check size={14} /> : stepNum}
              </div>
              <span className={`text-sm ${isActive || isCompleted ? 'text-[var(--foreground)]' : 'text-[var(--muted)]'}`}>
                {label}
              </span>
              {index < 2 && <div className="w-12 h-px bg-[var(--border-color)]" />}
            </div>
          )
        })}
      </div>

      {/* Step 1: Input */}
      {step === 'input' && (
        <div className="max-w-2xl">
          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)] mb-2">
                <Type size={16} className="text-[var(--secondary)]" />
                Title Text
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your thumbnail title..."
                className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)] mb-2">
                <Type size={14} className="text-[var(--muted)]" />
                Subtitle (Optional)
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Enter a subtitle or tagline..."
                className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
              />
            </div>

            {/* Upload Reference Image */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Reference Image (Optional)
              </label>
              <div className="border-2 border-dashed border-[var(--border-color)] rounded-xl p-6 text-center hover:border-[var(--secondary)] transition-colors cursor-pointer">
                <Image size={32} className="mx-auto text-[var(--muted)] mb-2" />
                <p className="text-sm text-[var(--muted)]">Drop image or click to upload</p>
                <p className="text-xs text-[var(--muted)] mt-1">PNG, JPG (Max 5MB)</p>
              </div>
            </div>

            <button
              onClick={() => setStep('settings')}
              disabled={!title.trim()}
              className="w-full py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] disabled:bg-[var(--border-color)] disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              Continue to Style
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Settings */}
      {step === 'settings' && (
        <div className="max-w-2xl">
          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6 space-y-6">
            {/* Style Preset */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)] mb-3">
                <Palette size={16} className="text-[var(--secondary)]" />
                Style Preset
              </label>
              <div className="grid grid-cols-2 gap-2">
                {stylePresets.map((preset) => (
                  <label
                    key={preset.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      style === preset.id
                        ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                        : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="style"
                      value={preset.id}
                      checked={style === preset.id}
                      onChange={(e) => setStyle(e.target.value)}
                      className="mt-0.5 accent-[var(--secondary)]"
                    />
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)]">{preset.label}</p>
                      <p className="text-xs text-[var(--muted)]">{preset.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Layout */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)] mb-3">
                <Layout size={16} className="text-[var(--secondary)]" />
                Layout
              </label>
              <div className="grid grid-cols-2 gap-2">
                {layoutOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setLayout(opt.id)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                      layout === opt.id
                        ? 'border-[var(--secondary)] bg-[var(--secondary)]/5 text-[var(--secondary)]'
                        : 'border-[var(--border-color)] text-[var(--foreground)] hover:border-[var(--secondary)]/50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Number of Thumbnails */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Number of Variations
              </label>
              <select
                value={thumbnailCount}
                onChange={(e) => setThumbnailCount(e.target.value)}
                className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
              >
                <option value="2">2 thumbnails</option>
                <option value="4">4 thumbnails</option>
                <option value="6">6 thumbnails</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep('input')}
                className="flex-1 py-3 border border-[var(--border-color)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--background)] transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleGenerate}
                className="flex-1 py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles size={18} />
                <span>Generate Thumbnails</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Generating */}
      {step === 'generating' && (
        <div className="max-w-2xl">
          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-8 text-center">
            <Sparkles size={48} className="mx-auto text-[var(--secondary)] mb-4" />
            <h3 className="font-semibold text-[var(--foreground)] mb-6">Creating Your Thumbnails...</h3>

            <div className="max-w-md mx-auto mb-6">
              <div className="h-2 bg-[var(--background)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--secondary)] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-[var(--muted)] mt-2">{progress}%</p>
            </div>

            <p className="text-sm text-[var(--muted)]">Applying {stylePresets.find(s => s.id === style)?.label} style...</p>
          </div>
        </div>
      )}

      {/* Step 4: Results */}
      {step === 'results' && (
        <div className="max-w-3xl">
          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-[var(--foreground)]">Your Thumbnails</h3>
                <p className="text-sm text-[var(--muted)]">{title}</p>
              </div>
              <button
                onClick={() => {
                  setStep('input')
                  setProgress(0)
                  setTitle('')
                  setSubtitle('')
                }}
                className="flex items-center gap-2 text-sm text-[var(--secondary)] hover:text-[#7c4fe0] font-medium"
              >
                <RotateCcw size={14} />
                <span>Create New</span>
              </button>
            </div>

            {/* Generated Thumbnails Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {Array.from({ length: parseInt(thumbnailCount) }).map((_, index) => (
                <div
                  key={index}
                  className="group relative border border-[var(--border-color)] rounded-xl overflow-hidden"
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">{title}</p>
                      {subtitle && <p className="text-white/60 text-sm mt-1">{subtitle}</p>}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                      <Download size={18} className="text-gray-800" />
                    </button>
                    <button className="p-2 bg-[var(--secondary)] rounded-lg hover:bg-[#7c4fe0] transition-colors">
                      <Save size={18} className="text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Save size={18} />
                <span>Save All to Assets</span>
              </button>
              <button className="flex-1 py-3 border border-[var(--border-color)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--background)] transition-colors flex items-center justify-center gap-2">
                <Download size={18} />
                <span>Download All</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}
