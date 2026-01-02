'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Upload,
  FileText,
  Sparkles,
  Check,
  Play,
  Download,
  Save,
  RotateCcw,
  Mic,
  Music,
  Type,
  Palette,
  Clock,
  Zap,
  Volume2,
  Languages,
  Hash,
  TrendingUp,
  Pause,
  SkipForward,
  ChevronRight,
  Eye,
  Heart,
  MessageSquare,
  RefreshCw,
  Settings2,
  Wand2,
  Folder,
  ChevronDown,
  Plus,
} from 'lucide-react'

// 폴더 데이터 (실제로는 전역 상태나 API에서 가져옴)
const assetFolders = [
  { id: 'product-reviews', name: 'Product Reviews', color: '#8b5cf6' },
  { id: 'tutorials', name: 'Tutorials', color: '#3b82f6' },
  { id: 'promotional', name: 'Promotional', color: '#10b981' },
  { id: 'archive', name: 'Archive', color: '#6b7280' },
]

type Step = 'concept' | 'style' | 'audio' | 'generating' | 'results'

const contentTypes = [
  { id: 'script', icon: FileText, label: 'From Script', desc: 'Write or paste your script' },
  { id: 'topic', icon: Hash, label: 'From Topic', desc: 'AI generates the script' },
  { id: 'url', icon: TrendingUp, label: 'From URL', desc: 'Convert article or tweet' },
  { id: 'upload', icon: Upload, label: 'From Media', desc: 'Upload images or video' },
]

const visualStyles = [
  { id: 'cinematic', label: 'Cinematic', desc: 'Film-like quality with depth', preview: 'from-slate-800 to-slate-900' },
  { id: 'vibrant', label: 'Vibrant', desc: 'Bold colors and energy', preview: 'from-purple-600 to-pink-500' },
  { id: 'minimal', label: 'Minimal', desc: 'Clean and modern', preview: 'from-gray-100 to-gray-200' },
  { id: 'retro', label: 'Retro', desc: 'Vintage aesthetic', preview: 'from-amber-600 to-orange-500' },
  { id: 'neon', label: 'Neon', desc: 'Cyberpunk vibes', preview: 'from-cyan-500 to-purple-600' },
  { id: 'nature', label: 'Natural', desc: 'Organic and earthy', preview: 'from-green-600 to-emerald-500' },
]

const aspectRatios = [
  { id: '9:16', label: '9:16', desc: 'TikTok, Reels, Shorts', icon: '📱' },
  { id: '1:1', label: '1:1', desc: 'Instagram Feed', icon: '⬜' },
  { id: '16:9', label: '16:9', desc: 'YouTube, Landscape', icon: '📺' },
]

const durations = [
  { id: '15', label: '15s', desc: 'Quick hook' },
  { id: '30', label: '30s', desc: 'Standard' },
  { id: '45', label: '45s', desc: 'Extended' },
  { id: '60', label: '60s', desc: 'Full minute' },
]

const voiceStyles = [
  { id: 'energetic', label: 'Energetic', desc: 'Upbeat and exciting' },
  { id: 'calm', label: 'Calm', desc: 'Relaxed and soothing' },
  { id: 'professional', label: 'Professional', desc: 'Business-like tone' },
  { id: 'friendly', label: 'Friendly', desc: 'Warm and approachable' },
]

const musicGenres = [
  { id: 'upbeat', label: 'Upbeat Pop' },
  { id: 'chill', label: 'Lo-fi Chill' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'cinematic', label: 'Cinematic' },
  { id: 'electronic', label: 'Electronic' },
  { id: 'acoustic', label: 'Acoustic' },
]

const generationSteps = [
  { label: 'Analyzing script', duration: 15 },
  { label: 'Generating scenes', duration: 30 },
  { label: 'Creating visuals', duration: 25 },
  { label: 'Synthesizing voice', duration: 15 },
  { label: 'Adding music', duration: 10 },
  { label: 'Rendering final', duration: 5 },
]

export default function ShortformPage() {
  const [step, setStep] = useState<Step>('concept')
  const [contentType, setContentType] = useState('script')
  const [scriptText, setScriptText] = useState('')
  const [topicInput, setTopicInput] = useState('')
  const [visualStyle, setVisualStyle] = useState('cinematic')
  const [aspectRatio, setAspectRatio] = useState('9:16')
  const [duration, setDuration] = useState('30')
  const [voiceStyle, setVoiceStyle] = useState('energetic')
  const [musicGenre, setMusicGenre] = useState('upbeat')
  const [addCaptions, setAddCaptions] = useState(true)
  const [addVoice, setAddVoice] = useState(true)
  const [addMusic, setAddMusic] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentGenStep, setCurrentGenStep] = useState(0)
  const [videoCount, setVideoCount] = useState('3')
  const [saveToFolder, setSaveToFolder] = useState('')
  const [showFolderDropdown, setShowFolderDropdown] = useState(false)
  const [showNewFolderInput, setShowNewFolderInput] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')

  const handleGenerate = () => {
    setStep('generating')
    let currentProgress = 0
    let stepIndex = 0

    const interval = setInterval(() => {
      currentProgress += 1
      setProgress(currentProgress)

      const stepThresholds = [15, 45, 70, 85, 95, 100]
      if (currentProgress >= stepThresholds[stepIndex] && stepIndex < generationSteps.length - 1) {
        stepIndex++
        setCurrentGenStep(stepIndex)
      }

      if (currentProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => setStep('results'), 500)
      }
    }, 80)
  }

  const generatedVideos = [
    { id: '1', title: 'Version A - Hook Focus', views: '12.5K', likes: '1.2K', engagement: '9.6%' },
    { id: '2', title: 'Version B - Story Arc', views: '8.9K', likes: '890', engagement: '10.0%' },
    { id: '3', title: 'Version C - CTA Strong', views: '15.2K', likes: '1.8K', engagement: '11.8%' },
  ]

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/ai-studio/video-generator"
          className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
        >
          <ArrowLeft size={20} className="text-[var(--muted)]" />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-[var(--foreground)]">Shortform Creator</h1>
          <p className="text-sm text-[var(--muted)]">Create viral short videos in minutes</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--secondary)]/10 rounded-full">
          <Zap size={14} className="text-[var(--secondary)]" />
          <span className="text-xs font-medium text-[var(--secondary)]">AI Optimized</span>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[
          { id: 'concept', label: 'Concept', num: 1 },
          { id: 'style', label: 'Style', num: 2 },
          { id: 'audio', label: 'Audio', num: 3 },
          { id: 'generating', label: 'Generate', num: 4 },
        ].map((s, index) => {
          const isActive = step === s.id || (step === 'results' && s.id === 'generating')
          const isCompleted =
            (step === 'style' && s.num === 1) ||
            (step === 'audio' && s.num <= 2) ||
            ((step === 'generating' || step === 'results') && s.num <= 3)

          return (
            <div key={s.id} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  isCompleted
                    ? 'bg-[var(--secondary)] text-white'
                    : isActive
                      ? 'bg-[var(--secondary)]/20 text-[var(--secondary)] border-2 border-[var(--secondary)]'
                      : 'bg-[var(--background)] text-[var(--muted)] border border-[var(--border-color)]'
                }`}>
                  {isCompleted ? <Check size={14} /> : s.num}
                </div>
                <span className={`text-sm font-medium ${isActive || isCompleted ? 'text-[var(--foreground)]' : 'text-[var(--muted)]'}`}>
                  {s.label}
                </span>
              </div>
              {index < 3 && (
                <div className={`flex-1 h-0.5 rounded ${isCompleted ? 'bg-[var(--secondary)]' : 'bg-[var(--border-color)]'}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* Step 1: Concept */}
      {step === 'concept' && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Content Type Selection */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">Start From</h3>
              <div className="grid grid-cols-4 gap-3">
                {contentTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.id}
                      onClick={() => setContentType(type.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        contentType === type.id
                          ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                          : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                      }`}
                    >
                      <Icon size={24} className={contentType === type.id ? 'text-[var(--secondary)]' : 'text-[var(--muted)]'} />
                      <p className="font-medium text-[var(--foreground)] mt-2 text-sm">{type.label}</p>
                      <p className="text-xs text-[var(--muted)] mt-0.5">{type.desc}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
              {contentType === 'script' && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-[var(--foreground)]">Your Script</h3>
                    <button className="flex items-center gap-1.5 text-sm text-[var(--secondary)] hover:underline">
                      <Wand2 size={14} />
                      <span>Enhance with AI</span>
                    </button>
                  </div>
                  <textarea
                    value={scriptText}
                    onChange={(e) => setScriptText(e.target.value)}
                    placeholder="Write your script here. Each sentence will become a scene...

Example:
Did you know this one trick can change everything?
Here's what most people get wrong.
But the secret is actually simple.
Try this today and see the difference."
                    className="w-full h-48 bg-[var(--background)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent"
                  />
                  <div className="flex items-center justify-between mt-3 text-xs text-[var(--muted)]">
                    <span>{scriptText.length} characters</span>
                    <span>Recommended: 50-150 words for 30s video</span>
                  </div>
                </>
              )}

              {contentType === 'topic' && (
                <>
                  <h3 className="font-semibold text-[var(--foreground)] mb-4">Describe Your Topic</h3>
                  <textarea
                    value={topicInput}
                    onChange={(e) => setTopicInput(e.target.value)}
                    placeholder="Describe the topic you want to create a video about...

Example: A motivational video about overcoming procrastination, targeting young professionals, with an inspiring and energetic tone."
                    className="w-full h-36 bg-[var(--background)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent"
                  />
                  <div className="mt-4 p-4 bg-[var(--secondary)]/5 rounded-lg border border-[var(--secondary)]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={14} className="text-[var(--secondary)]" />
                      <span className="text-sm font-medium text-[var(--foreground)]">AI will generate:</span>
                    </div>
                    <ul className="text-xs text-[var(--muted)] space-y-1">
                      <li>• Engaging hook and opening</li>
                      <li>• Scene-by-scene script</li>
                      <li>• Call-to-action ending</li>
                    </ul>
                  </div>
                </>
              )}

              {contentType === 'url' && (
                <>
                  <h3 className="font-semibold text-[var(--foreground)] mb-4">Paste URL</h3>
                  <input
                    type="url"
                    placeholder="https://example.com/article or twitter.com/user/status/..."
                    className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                  />
                  <p className="text-xs text-[var(--muted)] mt-2">Supported: Articles, Blog posts, Twitter/X threads, News stories</p>
                </>
              )}

              {contentType === 'upload' && (
                <div className="border-2 border-dashed border-[var(--border-color)] rounded-xl p-8 text-center hover:border-[var(--secondary)] transition-colors cursor-pointer">
                  <Upload size={40} className="mx-auto text-[var(--muted)] mb-3" />
                  <p className="font-medium text-[var(--foreground)] mb-1">Drop files or click to upload</p>
                  <p className="text-sm text-[var(--muted)]">Images, video clips, or audio files</p>
                  <p className="text-xs text-[var(--muted)] mt-2">Max 10 files, 100MB total</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Quick Settings */}
          <div className="space-y-4">
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-5">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">Quick Settings</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[var(--foreground)] mb-2 block">Aspect Ratio</label>
                  <div className="flex gap-2">
                    {aspectRatios.map((ratio) => (
                      <button
                        key={ratio.id}
                        onClick={() => setAspectRatio(ratio.id)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                          aspectRatio === ratio.id
                            ? 'bg-[var(--secondary)] text-white'
                            : 'bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--secondary)]/10'
                        }`}
                      >
                        {ratio.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[var(--foreground)] mb-2 block">Duration</label>
                  <div className="grid grid-cols-4 gap-2">
                    {durations.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setDuration(d.id)}
                        className={`py-2 rounded-lg text-sm font-medium transition-all ${
                          duration === d.id
                            ? 'bg-[var(--secondary)] text-white'
                            : 'bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--secondary)]/10'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[var(--foreground)] mb-2 block">Variations</label>
                  <select
                    value={videoCount}
                    onChange={(e) => setVideoCount(e.target.value)}
                    className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="1">1 video</option>
                    <option value="3">3 videos (A/B test)</option>
                    <option value="5">5 videos</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-[var(--secondary)]/5 rounded-xl border border-[var(--secondary)]/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={16} className="text-[var(--secondary)]" />
                <span className="font-medium text-[var(--foreground)]">Viral Tip</span>
              </div>
              <p className="text-sm text-[var(--muted)]">
                Hook your audience in the first 3 seconds. Start with a question, bold statement, or surprising fact.
              </p>
            </div>

            <button
              onClick={() => setStep('style')}
              disabled={contentType === 'script' && !scriptText.trim()}
              className="w-full py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] disabled:bg-[var(--border-color)] disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              Continue to Style
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Style */}
      {step === 'style' && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Visual Style */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">Visual Style</h3>
              <div className="grid grid-cols-3 gap-3">
                {visualStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setVisualStyle(style.id)}
                    className={`relative overflow-hidden rounded-xl border-2 transition-all ${
                      visualStyle === style.id
                        ? 'border-[var(--secondary)] ring-2 ring-[var(--secondary)]/30'
                        : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                    }`}
                  >
                    <div className={`h-20 bg-gradient-to-br ${style.preview}`} />
                    <div className="p-3 bg-[var(--card-bg)]">
                      <p className="font-medium text-[var(--foreground)] text-sm">{style.label}</p>
                      <p className="text-xs text-[var(--muted)]">{style.desc}</p>
                    </div>
                    {visualStyle === style.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-[var(--secondary)] rounded-full flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Options */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">Enhancement Options</h3>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-4 bg-[var(--background)] rounded-xl cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[var(--secondary)]" />
                  <div>
                    <p className="font-medium text-[var(--foreground)] text-sm">AI Scene Enhancement</p>
                    <p className="text-xs text-[var(--muted)]">Optimize transitions and pacing</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 bg-[var(--background)] rounded-xl cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[var(--secondary)]" />
                  <div>
                    <p className="font-medium text-[var(--foreground)] text-sm">Color Grading</p>
                    <p className="text-xs text-[var(--muted)]">Apply cinematic color correction</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 bg-[var(--background)] rounded-xl cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[var(--secondary)]" />
                  <div>
                    <p className="font-medium text-[var(--foreground)] text-sm">Motion Smoothing</p>
                    <p className="text-xs text-[var(--muted)]">60fps smooth interpolation</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 bg-[var(--background)] rounded-xl cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-[var(--secondary)]" />
                  <div>
                    <p className="font-medium text-[var(--foreground)] text-sm">HDR Output</p>
                    <p className="text-xs text-[var(--muted)]">High dynamic range colors</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Preview Sidebar */}
          <div className="space-y-4">
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-5">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">Preview</h3>
              <div className={`aspect-[9/16] rounded-xl bg-gradient-to-br ${
                visualStyles.find(s => s.id === visualStyle)?.preview
              } flex items-center justify-center mb-4`}>
                <Play size={40} className="text-white/80" />
              </div>
              <p className="text-sm text-center text-[var(--muted)]">
                {visualStyles.find(s => s.id === visualStyle)?.label} Style Preview
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('concept')}
                className="flex-1 py-3 border border-[var(--border-color)] text-[var(--foreground)] rounded-xl font-medium hover:bg-[var(--background)] transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep('audio')}
                className="flex-1 py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-xl font-medium transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Audio */}
      {step === 'audio' && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Voice Settings */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[var(--foreground)]">Voice Narration</h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addVoice}
                    onChange={(e) => setAddVoice(e.target.checked)}
                    className="w-4 h-4 accent-[var(--secondary)]"
                  />
                  <span className="text-sm text-[var(--foreground)]">Enable</span>
                </label>
              </div>

              {addVoice && <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[var(--foreground)] mb-2 block">Voice Style</label>
                  <div className="grid grid-cols-4 gap-2">
                    {voiceStyles.map((voice) => (
                      <button
                        key={voice.id}
                        onClick={() => setVoiceStyle(voice.id)}
                        className={`p-3 rounded-lg border transition-all ${
                          voiceStyle === voice.id
                            ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                            : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                        }`}
                      >
                        <p className="font-medium text-[var(--foreground)] text-sm">{voice.label}</p>
                        <p className="text-xs text-[var(--muted)]">{voice.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-[var(--background)] rounded-xl">
                  <button className="w-10 h-10 bg-[var(--secondary)] rounded-full flex items-center justify-center hover:bg-[#7c4fe0] transition-colors">
                    <Play size={18} className="text-white ml-0.5" />
                  </button>
                  <div className="flex-1">
                    <div className="h-1 bg-[var(--border-color)] rounded-full">
                      <div className="w-0 h-full bg-[var(--secondary)] rounded-full" />
                    </div>
                  </div>
                  <span className="text-sm text-[var(--muted)]">0:00 / 0:30</span>
                </div>
              </div>}
            </div>

            {/* Music Settings */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[var(--foreground)]">Background Music</h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addMusic}
                    onChange={(e) => setAddMusic(e.target.checked)}
                    className="w-4 h-4 accent-[var(--secondary)]"
                  />
                  <span className="text-sm text-[var(--foreground)]">Enable</span>
                </label>
              </div>

              {addMusic && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {musicGenres.map((genre) => (
                      <button
                        key={genre.id}
                        onClick={() => setMusicGenre(genre.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          musicGenre === genre.id
                            ? 'bg-[var(--secondary)] text-white'
                            : 'bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--secondary)]/10'
                        }`}
                      >
                        {genre.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <Volume2 size={18} className="text-[var(--muted)]" />
                    <input type="range" min="0" max="100" defaultValue="30" className="flex-1 accent-[var(--secondary)]" />
                    <span className="text-sm text-[var(--muted)] w-8">30%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Captions */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[var(--foreground)]">Auto Captions</h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addCaptions}
                    onChange={(e) => setAddCaptions(e.target.checked)}
                    className="w-4 h-4 accent-[var(--secondary)]"
                  />
                  <span className="text-sm text-[var(--foreground)]">Enable</span>
                </label>
              </div>

              {addCaptions && (
                <div className="grid grid-cols-3 gap-3">
                  {['Minimal', 'Bold', 'Animated'].map((style) => (
                    <button
                      key={style}
                      className="p-4 bg-[var(--background)] rounded-xl border border-[var(--border-color)] hover:border-[var(--secondary)] transition-all"
                    >
                      <div className="h-8 flex items-center justify-center mb-2">
                        <Type size={20} className="text-[var(--secondary)]" />
                      </div>
                      <p className="text-sm font-medium text-[var(--foreground)]">{style}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-4">
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-5">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Format</span>
                  <span className="font-medium text-[var(--foreground)]">{aspectRatio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Duration</span>
                  <span className="font-medium text-[var(--foreground)]">{duration}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Style</span>
                  <span className="font-medium text-[var(--foreground)] capitalize">{visualStyle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Voice</span>
                  <span className="font-medium text-[var(--foreground)] capitalize">{voiceStyle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Music</span>
                  <span className="font-medium text-[var(--foreground)]">{addMusic ? musicGenre : 'None'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Variations</span>
                  <span className="font-medium text-[var(--foreground)]">{videoCount}</span>
                </div>
                <div className="h-px bg-[var(--border-color)] my-2" />
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Credits</span>
                  <span className="font-medium text-[var(--secondary)]">{parseInt(videoCount) * 10}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('style')}
                className="flex-1 py-3 border border-[var(--border-color)] text-[var(--foreground)] rounded-xl font-medium hover:bg-[var(--background)] transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleGenerate}
                className="flex-1 py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles size={18} />
                Generate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Generating */}
      {step === 'generating' && (
        <div className="max-w-xl mx-auto">
          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-8 text-center">
            <div className="w-16 h-16 bg-[var(--secondary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles size={32} className="text-[var(--secondary)] animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Creating Your Videos</h3>
            <p className="text-[var(--muted)] mb-8">This usually takes 2-3 minutes</p>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="h-2 bg-[var(--background)] rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-[var(--secondary)] transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">{generationSteps[currentGenStep]?.label}</span>
                <span className="font-medium text-[var(--secondary)]">{progress}%</span>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-2">
              {generationSteps.map((s, index) => (
                <div
                  key={s.label}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    index <= currentGenStep ? 'bg-[var(--background)]' : ''
                  }`}
                >
                  {index < currentGenStep ? (
                    <Check size={18} className="text-[var(--success)]" />
                  ) : index === currentGenStep ? (
                    <div className="w-4 h-4 border-2 border-[var(--secondary)] rounded-full animate-spin border-t-transparent" />
                  ) : (
                    <div className="w-4 h-4 border-2 border-[var(--border-color)] rounded-full" />
                  )}
                  <span className={`text-sm ${index <= currentGenStep ? 'text-[var(--foreground)]' : 'text-[var(--muted)]'}`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Results */}
      {step === 'results' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Your Videos Are Ready!</h2>
              <p className="text-sm text-[var(--muted)]">{videoCount} variations generated successfully</p>
            </div>
            <button
              onClick={() => {
                setStep('concept')
                setProgress(0)
                setCurrentGenStep(0)
              }}
              className="flex items-center gap-2 text-sm text-[var(--secondary)] hover:underline font-medium"
            >
              <RefreshCw size={14} />
              Create New
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {generatedVideos.slice(0, parseInt(videoCount)).map((video, index) => (
              <div
                key={video.id}
                className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] overflow-hidden group"
              >
                <div className="aspect-[9/16] bg-gradient-to-br from-gray-800 to-gray-900 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Play size={24} className="text-white ml-1" />
                    </button>
                  </div>
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/50 rounded text-xs text-white font-medium">
                    {duration}s
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center justify-around text-white text-xs">
                      <span className="flex items-center gap-1"><Eye size={12} />{video.views}</span>
                      <span className="flex items-center gap-1"><Heart size={12} />{video.likes}</span>
                      <span className="flex items-center gap-1"><TrendingUp size={12} />{video.engagement}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-medium text-[var(--foreground)] mb-3">{video.title}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 text-sm font-medium border border-[var(--border-color)] rounded-lg hover:bg-[var(--background)] transition-colors">
                      Edit
                    </button>
                    <button className="flex-1 py-2 text-sm font-medium bg-[var(--secondary)] text-white rounded-lg hover:bg-[#7c4fe0] transition-colors">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Save Options */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4 mb-4">
            <label className="block text-sm font-medium mb-2">Save to Folder</label>
            <div className="relative">
              <button
                onClick={() => setShowFolderDropdown(!showFolderDropdown)}
                className="w-full flex items-center justify-between px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm"
              >
                <div className="flex items-center gap-2">
                  <Folder size={16} style={{ color: assetFolders.find(f => f.id === saveToFolder)?.color || 'var(--muted)' }} />
                  <span>{assetFolders.find(f => f.id === saveToFolder)?.name || 'No folder (Root)'}</span>
                </div>
                <ChevronDown size={16} className="text-[var(--muted)]" />
              </button>
              {showFolderDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => { setShowFolderDropdown(false); setShowNewFolderInput(false); }} />
                  <div className="absolute left-0 right-0 top-full mt-1 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-xl z-50">
                    {/* New Folder Input */}
                    {showNewFolderInput ? (
                      <div className="p-2 border-b border-[var(--border-color)]">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Folder name..."
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && newFolderName.trim()) {
                                console.log('Create folder:', newFolderName)
                                setNewFolderName('')
                                setShowNewFolderInput(false)
                              }
                            }}
                            className="flex-1 px-2 py-1.5 bg-[var(--background)] border border-[var(--border-color)] rounded text-sm focus:outline-none focus:border-[var(--secondary)]"
                            autoFocus
                          />
                          <button
                            onClick={() => {
                              if (newFolderName.trim()) {
                                console.log('Create folder:', newFolderName)
                                setNewFolderName('')
                                setShowNewFolderInput(false)
                              }
                            }}
                            className="px-3 py-1.5 bg-[var(--secondary)] text-white rounded text-sm hover:bg-[#7c4fe0]"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowNewFolderInput(true)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--background)] text-left text-[var(--secondary)] border-b border-[var(--border-color)]"
                      >
                        <Plus size={16} />
                        <span>New Folder</span>
                      </button>
                    )}
                    <button
                      onClick={() => { setSaveToFolder(''); setShowFolderDropdown(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--background)] text-left"
                    >
                      <Folder size={16} className="text-[var(--muted)]" />
                      <span>No folder (Root)</span>
                    </button>
                    {assetFolders.map((folder) => (
                      <button
                        key={folder.id}
                        onClick={() => { setSaveToFolder(folder.id); setShowFolderDropdown(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--background)] text-left"
                      >
                        <Folder size={16} style={{ color: folder.color }} />
                        <span>{folder.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => console.log('Save to folder:', saveToFolder)}
              className="flex-1 py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Save size={18} />
              Save All to Assets
            </button>
            <button className="flex-1 py-3 border border-[var(--border-color)] text-[var(--foreground)] rounded-xl font-medium hover:bg-[var(--background)] transition-colors flex items-center justify-center gap-2">
              <Download size={18} />
              Download All
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
