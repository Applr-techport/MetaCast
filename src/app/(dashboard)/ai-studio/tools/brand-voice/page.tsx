'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import {
  ArrowLeft,
  Palette,
  Sparkles,
  Check,
  Upload,
  FileText,
  Plus,
  X,
  Save,
  Play,
  RefreshCw,
} from 'lucide-react'

// Header Actions
function BrandVoiceHeaderActions() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--secondary)]/10 rounded-lg border border-[var(--secondary)]/20">
        <Palette size={14} className="text-[var(--secondary)]" />
        <span className="text-sm font-medium text-[var(--secondary)]">50 credits to train</span>
      </div>
    </div>
  )
}

type Step = 'samples' | 'analyze' | 'review' | 'complete'

const toneOptions = [
  { id: 'formal', label: 'Formal', desc: 'Professional and official tone' },
  { id: 'casual', label: 'Casual', desc: 'Relaxed and comfortable tone' },
  { id: 'friendly', label: 'Friendly', desc: 'Warm and approachable tone' },
  { id: 'energetic', label: 'Energetic', desc: 'Dynamic and exciting tone' },
]

const styleOptions = [
  { id: 'minimal', label: 'Minimal' },
  { id: 'descriptive', label: 'Descriptive' },
  { id: 'persuasive', label: 'Persuasive' },
  { id: 'storytelling', label: 'Storytelling' },
]

export default function BrandVoicePage() {
  const [step, setStep] = useState<Step>('samples')
  const [samples, setSamples] = useState<string[]>([''])
  const [selectedTone, setSelectedTone] = useState('casual')
  const [selectedStyles, setSelectedStyles] = useState<string[]>(['minimal'])
  const [brandName, setBrandName] = useState('')
  const [keywords, setKeywords] = useState('')
  const [progress, setProgress] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const addSample = () => {
    if (samples.length < 5) {
      setSamples([...samples, ''])
    }
  }

  const removeSample = (index: number) => {
    setSamples(samples.filter((_, i) => i !== index))
  }

  const updateSample = (index: number, value: string) => {
    const newSamples = [...samples]
    newSamples[index] = value
    setSamples(newSamples)
  }

  const toggleStyle = (styleId: string) => {
    setSelectedStyles(prev =>
      prev.includes(styleId) ? prev.filter(s => s !== styleId) : [...prev, styleId]
    )
  }

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setStep('analyze')
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 2
      setProgress(currentProgress)
      if (currentProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setIsAnalyzing(false)
          setStep('review')
        }, 500)
      }
    }, 100)
  }

  const currentStepIndex = ['samples', 'analyze', 'review', 'complete'].indexOf(step)

  return (
    <div className="min-h-screen">
      <Header actions={<BrandVoiceHeaderActions />} />

      <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/ai-studio/tools"
          className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
        >
          <ArrowLeft size={20} className="text-[var(--muted)]" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-[var(--foreground)]">Brand Voice Trainer</h1>
          <p className="text-sm text-[var(--muted)]">Train AI to match your brand's tone and style</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4 mb-8">
        {['Samples', 'Analyzing', 'Review', 'Complete'].map((label, index) => {
          const isActive = index === currentStepIndex
          const isCompleted = index < currentStepIndex
          return (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                isCompleted
                  ? 'bg-[var(--secondary)] text-white'
                  : isActive
                    ? 'bg-[var(--secondary)]/20 text-[var(--secondary)] border-2 border-[var(--secondary)]'
                    : 'bg-[var(--background)] text-[var(--muted)] border border-[var(--border-color)]'
              }`}>
                {isCompleted ? <Check size={14} /> : index + 1}
              </div>
              <span className={`text-sm ${isActive || isCompleted ? 'text-[var(--foreground)]' : 'text-[var(--muted)]'}`}>
                {label}
              </span>
              {index < 3 && <div className={`flex-1 h-px ${index < currentStepIndex ? 'bg-[var(--secondary)]' : 'bg-[var(--border-color)]'}`} />}
            </div>
          )
        })}
      </div>

      {/* Step 1: Sample Input */}
      {step === 'samples' && (
        <div className="space-y-6">
          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
            <h2 className="font-semibold text-[var(--foreground)] mb-4">Brand Information</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Brand Name</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="Enter your brand name"
                  className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Core Keywords</label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="Comma separated (e.g., premium, eco-friendly)"
                  className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-4 py-2.5 text-sm"
                />
              </div>
            </div>

            <h3 className="font-medium text-[var(--foreground)] mb-3">Base Tone</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {toneOptions.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedTone === tone.id
                      ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                      : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                  }`}
                >
                  <p className="font-medium text-[var(--foreground)]">{tone.label}</p>
                  <p className="text-xs text-[var(--muted)]">{tone.desc}</p>
                </button>
              ))}
            </div>

            <h3 className="font-medium text-[var(--foreground)] mb-3">Writing Style</h3>
            <div className="flex flex-wrap gap-2">
              {styleOptions.map((style) => (
                <button
                  key={style.id}
                  onClick={() => toggleStyle(style.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedStyles.includes(style.id)
                      ? 'bg-[var(--secondary)] text-white'
                      : 'bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-[var(--foreground)]">Sample Texts</h2>
                <p className="text-sm text-[var(--muted)]">Enter text samples that represent your brand style (max 5)</p>
              </div>
              <button
                onClick={addSample}
                disabled={samples.length >= 5}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--secondary)] text-white rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={14} />
                Add
              </button>
            </div>

            <div className="space-y-4">
              {samples.map((sample, index) => (
                <div key={index} className="relative">
                  <textarea
                    value={sample}
                    onChange={(e) => updateSample(index, e.target.value)}
                    placeholder={`Sample ${index + 1}: Marketing copy, product descriptions, social posts, etc.`}
                    rows={3}
                    className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm resize-none"
                  />
                  {samples.length > 1 && (
                    <button
                      onClick={() => removeSample(index)}
                      className="absolute top-2 right-2 p-1 hover:bg-[var(--card-bg)] rounded"
                    >
                      <X size={16} className="text-[var(--muted)]" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-[var(--background)] rounded-xl">
              <div className="flex items-center gap-3">
                <Upload size={20} className="text-[var(--secondary)]" />
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">Upload Files</p>
                  <p className="text-xs text-[var(--muted)]">Upload TXT, DOC, or PDF files at once</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!brandName || samples.every(s => !s.trim())}
            className="w-full py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] disabled:bg-[var(--border-color)] disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles size={18} />
            Analyze Brand Voice
          </button>
        </div>
      )}

      {/* Step 2: Analyzing */}
      {step === 'analyze' && (
        <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-8 text-center">
          <Sparkles size={48} className="mx-auto text-[var(--secondary)] mb-4" />
          <h3 className="font-semibold text-[var(--foreground)] mb-2">Analyzing Brand Voice...</h3>
          <p className="text-sm text-[var(--muted)] mb-6">AI is learning your brand style from the provided samples</p>

          <div className="max-w-md mx-auto mb-4">
            <div className="h-2 bg-[var(--background)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--secondary)] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-[var(--muted)] mt-2">{progress}%</p>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 'review' && (
        <div className="space-y-6">
          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-[var(--foreground)]">Analysis Results</h2>
              <span className="px-3 py-1 bg-[var(--success)]/10 text-[var(--success)] rounded-full text-sm font-medium">Complete</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-[var(--background)] rounded-xl">
                <p className="text-sm text-[var(--muted)] mb-1">Detected Tone</p>
                <p className="font-semibold text-[var(--foreground)]">{toneOptions.find(t => t.id === selectedTone)?.label}</p>
              </div>
              <div className="p-4 bg-[var(--background)] rounded-xl">
                <p className="text-sm text-[var(--muted)] mb-1">Style Characteristics</p>
                <p className="font-semibold text-[var(--foreground)]">{selectedStyles.map(s => styleOptions.find(st => st.id === s)?.label).join(', ')}</p>
              </div>
            </div>

            <div className="p-4 bg-[var(--background)] rounded-xl mb-4">
              <p className="text-sm text-[var(--muted)] mb-2">Detected Features</p>
              <ul className="space-y-1 text-sm text-[var(--foreground)]">
                <li>- Prefers short, impactful sentences</li>
                <li>- Uses customer-friendly expressions</li>
                <li>- Employs emotional vocabulary</li>
              </ul>
            </div>
          </div>

          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
            <h3 className="font-semibold text-[var(--foreground)] mb-4">Test Generation</h3>
            <div className="p-4 bg-[var(--background)] rounded-xl mb-4">
              <p className="text-sm text-[var(--muted)] mb-2">Input</p>
              <p className="text-sm text-[var(--foreground)]">New wireless earbuds launch announcement</p>
            </div>
            <div className="p-4 bg-[var(--secondary)]/5 border border-[var(--secondary)]/20 rounded-xl mb-4">
              <p className="text-sm text-[var(--muted)] mb-2">Generated Result</p>
              <p className="text-sm text-[var(--foreground)]">
                {brandName || 'Your brand'} is finally unveiling our new wireless earbuds.
                Elevate your everyday with premium sound. Discover them now.
              </p>
            </div>
            <button className="flex items-center gap-2 text-sm text-[var(--secondary)] font-medium">
              <RefreshCw size={14} />
              Regenerate
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep('samples')}
              className="flex-1 py-3 bg-[var(--background)] border border-[var(--border-color)] text-[var(--foreground)] rounded-xl font-medium"
            >
              Reconfigure
            </button>
            <button
              onClick={() => setStep('complete')}
              className="flex-1 py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-xl font-medium flex items-center justify-center gap-2"
            >
              <Save size={18} />
              Save Profile
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Complete */}
      {step === 'complete' && (
        <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-8 text-center">
          <div className="w-16 h-16 bg-[var(--success)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-[var(--success)]" />
          </div>
          <h3 className="font-semibold text-[var(--foreground)] text-lg mb-2">Brand Voice Saved</h3>
          <p className="text-sm text-[var(--muted)] mb-6">
            AI will now generate content matching {brandName || 'your brand'}'s style
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/ai-studio/tools"
              className="px-6 py-2.5 bg-[var(--background)] border border-[var(--border-color)] text-[var(--foreground)] rounded-xl font-medium"
            >
              Back to Tools
            </Link>
            <button
              onClick={() => {
                setStep('samples')
                setProgress(0)
              }}
              className="px-6 py-2.5 bg-[var(--secondary)] text-white rounded-xl font-medium"
            >
              Train New Voice
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}
