'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import {
  ArrowLeft,
  Upload,
  MessageSquare,
  Sparkles,
  Check,
  Download,
  Save,
  RotateCcw,
  Video,
  Languages,
  Type,
} from 'lucide-react'

// Header Actions
function CaptionHeaderActions() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--secondary)]/10 rounded-lg border border-[var(--secondary)]/20">
        <MessageSquare size={14} className="text-[var(--secondary)]" />
        <span className="text-sm font-medium text-[var(--secondary)]">5 credits per minute</span>
      </div>
    </div>
  )
}

type Step = 'upload' | 'settings' | 'generating' | 'results'

const languages = [
  { id: 'en', label: 'English' },
  { id: 'ko', label: 'Korean' },
  { id: 'ja', label: 'Japanese' },
  { id: 'zh', label: 'Chinese' },
  { id: 'es', label: 'Spanish' },
]

const captionStyles = [
  { id: 'standard', label: 'Standard', desc: 'Clean, readable subtitles' },
  { id: 'animated', label: 'Animated', desc: 'Word-by-word highlight effect' },
  { id: 'karaoke', label: 'Karaoke', desc: 'Scrolling highlight style' },
]

export default function CaptionGeneratorPage() {
  const [step, setStep] = useState<Step>('upload')
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [language, setLanguage] = useState('en')
  const [captionStyle, setCaptionStyle] = useState('standard')
  const [translateTo, setTranslateTo] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState('')

  const phases = [
    'Extracting audio...',
    'Transcribing speech...',
    'Generating timestamps...',
    'Formatting captions...',
    'Finalizing output...',
  ]

  const handleUpload = () => {
    setUploadedFile('sample_video.mp4')
  }

  const toggleTranslation = (langId: string) => {
    setTranslateTo((prev) =>
      prev.includes(langId) ? prev.filter((l) => l !== langId) : [...prev, langId]
    )
  }

  const handleGenerate = () => {
    setStep('generating')
    let currentProgress = 0
    let phaseIndex = 0

    const interval = setInterval(() => {
      currentProgress += 2
      setProgress(currentProgress)

      const newPhaseIndex = Math.floor((currentProgress / 100) * phases.length)
      if (newPhaseIndex !== phaseIndex && newPhaseIndex < phases.length) {
        phaseIndex = newPhaseIndex
        setCurrentPhase(phases[phaseIndex])
      }

      if (currentProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => setStep('results'), 500)
      }
    }, 100)

    setCurrentPhase(phases[0])
  }

  return (
    <div className="min-h-screen">
      <Header actions={<CaptionHeaderActions />} />

      <div className="p-6">
      {/* Back Button */}
      <Link
        href="/ai-studio/tools"
        className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to AI Tools</span>
      </Link>

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Caption Generator</h1>
        <p className="text-[var(--muted)]">Auto-generate subtitles and captions for any video</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-4 mb-8">
        {['Upload', 'Settings', 'Generate'].map((label, index) => {
          const stepNum = index + 1
          const isActive =
            (step === 'upload' && stepNum === 1) ||
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

      {/* Step 1: Upload */}
      {step === 'upload' && (
        <div className="max-w-2xl">
          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
            <h3 className="font-semibold text-[var(--foreground)] mb-4">Upload Video</h3>

            {/* Upload Area */}
            {!uploadedFile ? (
              <div
                onClick={handleUpload}
                className="border-2 border-dashed border-[var(--border-color)] rounded-xl p-8 text-center hover:border-[var(--secondary)] transition-colors cursor-pointer mb-6"
              >
                <Upload size={40} className="mx-auto text-[var(--muted)] mb-3" />
                <p className="text-sm font-medium text-[var(--foreground)] mb-1">
                  Drop your video here or click to upload
                </p>
                <p className="text-xs text-[var(--muted)]">MP4, MOV, AVI (Max 500MB)</p>
              </div>
            ) : (
              <div className="flex items-center gap-4 p-4 bg-[var(--background)] rounded-lg mb-6">
                <div className="w-16 h-12 bg-[var(--card-bg)] rounded-lg flex items-center justify-center border border-[var(--border-color)]">
                  <Video size={24} className="text-[var(--secondary)]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--foreground)]">{uploadedFile}</p>
                  <p className="text-xs text-[var(--muted)]">2:45 duration</p>
                </div>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="text-sm text-[var(--accent)] hover:underline"
                >
                  Remove
                </button>
              </div>
            )}

            <button
              onClick={() => setStep('settings')}
              disabled={!uploadedFile}
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
            {/* Source Language */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)] mb-2">
                <Languages size={16} className="text-[var(--secondary)]" />
                Source Language
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

            {/* Caption Style */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)] mb-3">
                <Type size={16} className="text-[var(--secondary)]" />
                Caption Style
              </label>
              <div className="space-y-2">
                {captionStyles.map((style) => (
                  <label
                    key={style.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      captionStyle === style.id
                        ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                        : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="captionStyle"
                      value={style.id}
                      checked={captionStyle === style.id}
                      onChange={(e) => setCaptionStyle(e.target.value)}
                      className="mt-0.5 accent-[var(--secondary)]"
                    />
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)]">{style.label}</p>
                      <p className="text-xs text-[var(--muted)]">{style.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Translate To */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-3">
                Also Translate To (Optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {languages
                  .filter((l) => l.id !== language)
                  .map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => toggleTranslation(lang.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        translateTo.includes(lang.id)
                          ? 'bg-[var(--secondary)] text-white'
                          : 'bg-[var(--background)] border border-[var(--border-color)] text-[var(--muted)]'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep('upload')}
                className="flex-1 py-3 border border-[var(--border-color)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--background)] transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleGenerate}
                className="flex-1 py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles size={18} />
                <span>Generate Captions</span>
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
            <h3 className="font-semibold text-[var(--foreground)] mb-6">Generating Captions...</h3>

            <div className="max-w-md mx-auto mb-6">
              <div className="h-2 bg-[var(--background)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--secondary)] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-[var(--muted)] mt-2">{progress}%</p>
            </div>

            <p className="text-sm text-[var(--muted)]">{currentPhase}</p>
          </div>
        </div>
      )}

      {/* Step 4: Results */}
      {step === 'results' && (
        <div className="max-w-3xl">
          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-[var(--foreground)]">Captions Generated</h3>
                <p className="text-sm text-[var(--muted)]">
                  {uploadedFile} - {languages.find((l) => l.id === language)?.label}
                  {translateTo.length > 0 && ` + ${translateTo.length} translations`}
                </p>
              </div>
              <button
                onClick={() => {
                  setStep('upload')
                  setProgress(0)
                  setUploadedFile(null)
                  setTranslateTo([])
                }}
                className="flex items-center gap-2 text-sm text-[var(--secondary)] hover:text-[#7c4fe0] font-medium"
              >
                <RotateCcw size={14} />
                <span>Create New</span>
              </button>
            </div>

            {/* Preview */}
            <div className="border border-[var(--border-color)] rounded-xl overflow-hidden mb-6">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative flex items-center justify-center">
                <Video size={48} className="text-white/40" />
                {/* Caption Preview */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/80 px-4 py-2 rounded">
                  <p className="text-white text-sm text-center">This is a sample caption preview</p>
                </div>
              </div>
            </div>

            {/* Caption Files */}
            <div className="space-y-2 mb-6">
              <p className="text-sm font-medium text-[var(--foreground)]">Generated Files</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-[var(--background)] rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageSquare size={18} className="text-[var(--secondary)]" />
                    <span className="text-sm text-[var(--foreground)]">
                      captions_{language}.srt
                    </span>
                  </div>
                  <button className="text-sm text-[var(--secondary)] hover:underline">Download</button>
                </div>
                {translateTo.map((langId) => (
                  <div
                    key={langId}
                    className="flex items-center justify-between p-3 bg-[var(--background)] rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare size={18} className="text-[var(--secondary)]" />
                      <span className="text-sm text-[var(--foreground)]">
                        captions_{langId}.srt
                      </span>
                    </div>
                    <button className="text-sm text-[var(--secondary)] hover:underline">Download</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Save size={18} />
                <span>Save to Assets</span>
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
