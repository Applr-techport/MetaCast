'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Video,
  Sparkles,
  Check,
  Play,
  Download,
  Save,
  RotateCcw,
  Clock,
  Users,
  Calendar,
} from 'lucide-react'

type Step = 'select' | 'settings' | 'generating' | 'results'

const pastStreams = [
  { id: '1', title: 'Product Launch Live', date: '2024-01-15', duration: '2h 15m', viewers: 1234 },
  { id: '2', title: 'Q&A Session with CEO', date: '2024-01-12', duration: '1h 30m', viewers: 892 },
  { id: '3', title: 'Weekly Product Review', date: '2024-01-10', duration: '45m', viewers: 567 },
  { id: '4', title: 'Holiday Sale Event', date: '2024-01-05', duration: '3h', viewers: 2341 },
]

const outputFormats = [
  { id: 'shortform', label: 'Shortform (9:16)', desc: 'TikTok, Reels, Shorts' },
  { id: 'square', label: 'Square (1:1)', desc: 'Instagram, Facebook' },
  { id: 'landscape', label: 'Landscape (16:9)', desc: 'YouTube, Website' },
]

const extractModes = [
  { id: 'highlights', label: 'Auto Highlights', desc: 'AI finds the best moments' },
  { id: 'products', label: 'Product Showcases', desc: 'Extract product reveal moments' },
  { id: 'engagement', label: 'High Engagement', desc: 'Clips with most viewer reactions' },
]

export default function FromStreamPage() {
  const [step, setStep] = useState<Step>('select')
  const [selectedStream, setSelectedStream] = useState<string | null>(null)
  const [outputFormat, setOutputFormat] = useState('shortform')
  const [extractMode, setExtractMode] = useState('highlights')
  const [clipCount, setClipCount] = useState('5')
  const [progress, setProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState('')

  const phases = [
    'Analyzing stream content...',
    'Detecting key moments...',
    'Extracting highlights...',
    'Generating clips...',
    'Finalizing output...',
  ]

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
    }, 150)

    setCurrentPhase(phases[0])
  }

  const selectedStreamData = pastStreams.find((s) => s.id === selectedStream)

  return (
    <div className="p-6">
      {/* Back Button */}
      <Link
        href="/ai-studio/video-generator"
        className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to Video Generator</span>
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">From Live Stream</h1>
        <p className="text-[var(--muted)]">Extract highlights and clips from your past streams</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-4 mb-8">
        {['Select Stream', 'Settings', 'Generate'].map((label, index) => {
          const stepNum = index + 1
          const isActive =
            (step === 'select' && stepNum === 1) ||
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

      {/* Step 1: Select Stream */}
      {step === 'select' && (
        <div className="max-w-2xl">
          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
            <h3 className="font-semibold text-[var(--foreground)] mb-4">Select a Past Stream</h3>

            <div className="space-y-3 mb-6">
              {pastStreams.map((stream) => (
                <label
                  key={stream.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedStream === stream.id
                      ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                      : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="stream"
                    value={stream.id}
                    checked={selectedStream === stream.id}
                    onChange={(e) => setSelectedStream(e.target.value)}
                    className="accent-[var(--secondary)]"
                  />
                  <div className="w-16 h-10 bg-[var(--background)] rounded-lg flex items-center justify-center">
                    <Video size={20} className="text-[var(--secondary)]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[var(--foreground)]">{stream.title}</p>
                    <div className="flex items-center gap-4 text-xs text-[var(--muted)] mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {stream.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {stream.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={12} />
                        {stream.viewers.toLocaleString()} viewers
                      </span>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <button
              onClick={() => setStep('settings')}
              disabled={!selectedStream}
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
            {/* Selected Stream Info */}
            {selectedStreamData && (
              <div className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-lg">
                <Video size={20} className="text-[var(--secondary)]" />
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">{selectedStreamData.title}</p>
                  <p className="text-xs text-[var(--muted)]">{selectedStreamData.duration} - {selectedStreamData.viewers.toLocaleString()} viewers</p>
                </div>
              </div>
            )}

            {/* Extract Mode */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-3">Extract Mode</label>
              <div className="space-y-2">
                {extractModes.map((mode) => (
                  <label
                    key={mode.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      extractMode === mode.id
                        ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                        : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="extractMode"
                      value={mode.id}
                      checked={extractMode === mode.id}
                      onChange={(e) => setExtractMode(e.target.value)}
                      className="mt-0.5 accent-[var(--secondary)]"
                    />
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)]">{mode.label}</p>
                      <p className="text-xs text-[var(--muted)]">{mode.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Output Format */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-3">Output Format</label>
              <div className="space-y-2">
                {outputFormats.map((format) => (
                  <label
                    key={format.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      outputFormat === format.id
                        ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                        : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="outputFormat"
                      value={format.id}
                      checked={outputFormat === format.id}
                      onChange={(e) => setOutputFormat(e.target.value)}
                      className="mt-0.5 accent-[var(--secondary)]"
                    />
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)]">{format.label}</p>
                      <p className="text-xs text-[var(--muted)]">{format.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Number of Clips */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Number of Clips</label>
              <select
                value={clipCount}
                onChange={(e) => setClipCount(e.target.value)}
                className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
              >
                <option value="3">3 clips</option>
                <option value="5">5 clips</option>
                <option value="10">10 clips</option>
                <option value="15">15 clips</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep('select')}
                className="flex-1 py-3 border border-[var(--border-color)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--background)] transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleGenerate}
                className="flex-1 py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles size={18} />
                <span>Extract Clips</span>
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
            <h3 className="font-semibold text-[var(--foreground)] mb-6">Extracting Clips...</h3>

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
                <h3 className="font-semibold text-[var(--foreground)]">{clipCount} Clips Generated</h3>
                <p className="text-sm text-[var(--muted)]">
                  From: {selectedStreamData?.title}
                </p>
              </div>
              <button
                onClick={() => {
                  setStep('select')
                  setProgress(0)
                  setSelectedStream(null)
                }}
                className="flex items-center gap-2 text-sm text-[var(--secondary)] hover:text-[#7c4fe0] font-medium"
              >
                <RotateCcw size={14} />
                <span>Create New</span>
              </button>
            </div>

            {/* Generated Clips Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {Array.from({ length: parseInt(clipCount) }).map((_, index) => (
                <div
                  key={index}
                  className="border border-[var(--border-color)] rounded-xl overflow-hidden"
                >
                  <div className="aspect-[9/16] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <Play size={32} className="text-white/80" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-[var(--foreground)] truncate">
                      Highlight #{index + 1}
                    </p>
                    <p className="text-xs text-[var(--muted)]">0:{30 + index * 5}s</p>
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
  )
}
