'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import {
  ArrowLeft,
  Tag,
  Sparkles,
  Check,
  Download,
  Save,
  RotateCcw,
  Copy,
  CheckCircle,
  Globe,
  Target,
} from 'lucide-react'

// Header Actions
function ProductDescriptionHeaderActions() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--secondary)]/10 rounded-lg border border-[var(--secondary)]/20">
        <Tag size={14} className="text-[var(--secondary)]" />
        <span className="text-sm font-medium text-[var(--secondary)]">8 credits per description</span>
      </div>
    </div>
  )
}

type Step = 'input' | 'settings' | 'generating' | 'results'

const platforms = [
  { id: 'website', label: 'Website', desc: 'Full-length description' },
  { id: 'social', label: 'Social Media', desc: 'Short, engaging copy' },
  { id: 'marketplace', label: 'Marketplace', desc: 'E-commerce optimized' },
  { id: 'email', label: 'Email', desc: 'Newsletter format' },
]

const tones = [
  { id: 'professional', label: 'Professional' },
  { id: 'casual', label: 'Casual' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'playful', label: 'Playful' },
]

const languages = [
  { id: 'en', label: 'English' },
  { id: 'ko', label: 'Korean' },
  { id: 'ja', label: 'Japanese' },
  { id: 'zh', label: 'Chinese' },
]

export default function ProductDescriptionPage() {
  const [step, setStep] = useState<Step>('input')
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('')
  const [keyPoints, setKeyPoints] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [platform, setPlatform] = useState('website')
  const [tone, setTone] = useState('professional')
  const [language, setLanguage] = useState('en')
  const [progress, setProgress] = useState(0)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const generatedDescriptions = [
    {
      type: 'Short',
      content: `Introducing ${productName || 'Product'} - ${category ? `the ultimate ${category.toLowerCase()} solution` : 'designed to exceed your expectations'}. ${keyPoints?.split('\n')[0] || 'Premium quality meets exceptional performance.'}`
    },
    {
      type: 'Medium',
      content: `Discover ${productName || 'Product'}, ${category ? `a revolutionary ${category.toLowerCase()}` : 'our latest innovation'} crafted for ${targetAudience || 'discerning customers'}.\n\n${keyPoints || 'Experience unmatched quality and design.'}\n\nUpgrade your lifestyle today.`
    },
    {
      type: 'Long',
      content: `Introducing ${productName || 'Product'}\n\n${category ? `Category: ${category}\n\n` : ''}${productName || 'This product'} represents the pinnacle of innovation and design, meticulously crafted for ${targetAudience || 'those who demand the best'}.\n\nKey Features:\n${keyPoints || '- Premium materials\n- Expert craftsmanship\n- Exceptional performance'}\n\nExperience the difference quality makes. Order yours today and join thousands of satisfied customers.`
    }
  ]

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
    }, 80)
  }

  const handleCopy = (index: number, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="min-h-screen">
      <Header actions={<ProductDescriptionHeaderActions />} />

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
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Product Description</h1>
        <p className="text-[var(--muted)]">Create compelling product copy for your live commerce</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-4 mb-8">
        {['Product Info', 'Settings', 'Generate'].map((label, index) => {
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
            {/* Product Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)] mb-2">
                <Tag size={16} className="text-[var(--secondary)]" />
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name..."
                className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Electronics, Fashion, Beauty..."
                className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
              />
            </div>

            {/* Key Points */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Key Selling Points
              </label>
              <textarea
                value={keyPoints}
                onChange={(e) => setKeyPoints(e.target.value)}
                placeholder="- Main benefit 1&#10;- Main benefit 2&#10;- Main benefit 3"
                rows={4}
                className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] resize-none"
              />
            </div>

            {/* Target Audience */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)] mb-2">
                <Target size={16} className="text-[var(--secondary)]" />
                Target Audience
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g., Young professionals, Tech enthusiasts..."
                className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
              />
            </div>

            <button
              onClick={() => setStep('settings')}
              disabled={!productName.trim()}
              className="w-full py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] disabled:bg-[var(--border-color)] disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              Continue to Settings
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Settings */}
      {step === 'settings' && (
        <div className="max-w-2xl">
          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6 space-y-6">
            {/* Platform */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)] mb-3">
                <Globe size={16} className="text-[var(--secondary)]" />
                Platform
              </label>
              <div className="grid grid-cols-2 gap-2">
                {platforms.map((p) => (
                  <label
                    key={p.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      platform === p.id
                        ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                        : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="platform"
                      value={p.id}
                      checked={platform === p.id}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="mt-0.5 accent-[var(--secondary)]"
                    />
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)]">{p.label}</p>
                      <p className="text-xs text-[var(--muted)]">{p.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-3">Tone</label>
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      tone === t.id
                        ? 'bg-[var(--secondary)] text-white'
                        : 'bg-[var(--background)] border border-[var(--border-color)] text-[var(--foreground)] hover:border-[var(--secondary)]/50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
              >
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.label}
                  </option>
                ))}
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
                <span>Generate Descriptions</span>
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
            <h3 className="font-semibold text-[var(--foreground)] mb-6">Creating Descriptions...</h3>

            <div className="max-w-md mx-auto mb-6">
              <div className="h-2 bg-[var(--background)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--secondary)] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-[var(--muted)] mt-2">{progress}%</p>
            </div>

            <p className="text-sm text-[var(--muted)]">
              Generating {tones.find((t) => t.id === tone)?.label.toLowerCase()} copy for{' '}
              {platforms.find((p) => p.id === platform)?.label}...
            </p>
          </div>
        </div>
      )}

      {/* Step 4: Results */}
      {step === 'results' && (
        <div className="max-w-3xl">
          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-[var(--foreground)]">Your Descriptions</h3>
                <p className="text-sm text-[var(--muted)]">
                  {productName} - {platforms.find((p) => p.id === platform)?.label}
                </p>
              </div>
              <button
                onClick={() => {
                  setStep('input')
                  setProgress(0)
                  setProductName('')
                  setCategory('')
                  setKeyPoints('')
                  setTargetAudience('')
                }}
                className="flex items-center gap-2 text-sm text-[var(--secondary)] hover:text-[#7c4fe0] font-medium"
              >
                <RotateCcw size={14} />
                <span>Create New</span>
              </button>
            </div>

            {/* Generated Descriptions */}
            <div className="space-y-4 mb-6">
              {generatedDescriptions.map((desc, index) => (
                <div
                  key={index}
                  className="bg-[var(--background)] border border-[var(--border-color)] rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-[var(--secondary)] bg-[var(--secondary)]/10 px-2 py-1 rounded">
                      {desc.type}
                    </span>
                    <button
                      onClick={() => handleCopy(index, desc.content)}
                      className="flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--secondary)]"
                    >
                      {copiedIndex === index ? (
                        <>
                          <CheckCircle size={14} className="text-[var(--success)]" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-[var(--foreground)] whitespace-pre-wrap leading-relaxed">
                    {desc.content}
                  </p>
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
                <span>Download as TXT</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}
