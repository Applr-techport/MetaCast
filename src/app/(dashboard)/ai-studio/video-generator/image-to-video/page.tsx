'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Check,
  Play,
  Download,
  Save,
  X,
  Plus,
  ChevronRight,
  Move,
  RotateCw,
  Maximize2,
  Layers,
  Wand2,
  Clock,
  RefreshCw,
  Eye,
  Settings2,
  ZoomIn,
  ZoomOut,
  Move3D,
  Repeat,
  Palette,
} from 'lucide-react'

type Step = 'upload' | 'motion' | 'style' | 'generating' | 'results'

const motionPresets = [
  { id: 'zoom-in', label: 'Zoom In', desc: 'Slowly zoom into the center', icon: ZoomIn },
  { id: 'zoom-out', label: 'Zoom Out', desc: 'Pull back to reveal more', icon: ZoomOut },
  { id: 'pan-left', label: 'Pan Left', desc: 'Horizontal movement left', icon: Move },
  { id: 'pan-right', label: 'Pan Right', desc: 'Horizontal movement right', icon: Move },
  { id: 'parallax', label: 'Parallax 3D', desc: 'Depth-aware movement', icon: Move3D },
  { id: 'orbit', label: 'Orbit', desc: 'Circular camera motion', icon: RotateCw },
]

const animationStyles = [
  { id: 'cinematic', label: 'Cinematic', desc: 'Film-like smooth motion', preview: 'from-slate-800 to-slate-900' },
  { id: 'dreamy', label: 'Dreamy', desc: 'Soft, ethereal movement', preview: 'from-purple-400 to-pink-400' },
  { id: 'dynamic', label: 'Dynamic', desc: 'Energetic, fast-paced', preview: 'from-orange-500 to-red-500' },
  { id: 'subtle', label: 'Subtle', desc: 'Minimal, elegant motion', preview: 'from-gray-600 to-gray-700' },
]

const durations = [
  { id: '3', label: '3s', desc: 'Quick' },
  { id: '5', label: '5s', desc: 'Standard' },
  { id: '10', label: '10s', desc: 'Extended' },
  { id: '15', label: '15s', desc: 'Long' },
]

const outputFormats = [
  { id: '16:9', label: '16:9', desc: 'Landscape' },
  { id: '9:16', label: '9:16', desc: 'Portrait' },
  { id: '1:1', label: '1:1', desc: 'Square' },
]

export default function ImageToVideoPage() {
  const [step, setStep] = useState<Step>('upload')
  const [uploadedImages, setUploadedImages] = useState<{ id: string; name: string }[]>([])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [motionPreset, setMotionPreset] = useState('zoom-in')
  const [animationStyle, setAnimationStyle] = useState('cinematic')
  const [duration, setDuration] = useState('5')
  const [outputFormat, setOutputFormat] = useState('16:9')
  const [loopVideo, setLoopVideo] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentGenStep, setCurrentGenStep] = useState(0)

  const generationSteps = [
    'Analyzing image depth',
    'Creating motion layers',
    'Applying style effects',
    'Generating frames',
    'Rendering video',
  ]

  const handleAddImage = () => {
    const newImage = {
      id: String(Date.now()),
      name: `Image ${uploadedImages.length + 1}.jpg`
    }
    setUploadedImages([...uploadedImages, newImage])
    if (!selectedImage) {
      setSelectedImage(newImage.id)
    }
  }

  const handleRemoveImage = (id: string) => {
    setUploadedImages(uploadedImages.filter(img => img.id !== id))
    if (selectedImage === id) {
      setSelectedImage(uploadedImages.find(img => img.id !== id)?.id || null)
    }
  }

  const handleGenerate = () => {
    setStep('generating')
    let currentProgress = 0
    let stepIndex = 0

    const interval = setInterval(() => {
      currentProgress += 2
      setProgress(currentProgress)

      const newStep = Math.floor((currentProgress / 100) * generationSteps.length)
      if (newStep !== stepIndex && newStep < generationSteps.length) {
        stepIndex = newStep
        setCurrentGenStep(stepIndex)
      }

      if (currentProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => setStep('results'), 500)
      }
    }, 80)
  }

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
          <h1 className="text-xl font-bold text-[var(--foreground)]">Image to Video</h1>
          <p className="text-sm text-[var(--muted)]">Bring your images to life with AI-powered animation</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--secondary)]/10 rounded-full">
          <Wand2 size={14} className="text-[var(--secondary)]" />
          <span className="text-xs font-medium text-[var(--secondary)]">AI Motion</span>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[
          { id: 'upload', label: 'Upload', num: 1 },
          { id: 'motion', label: 'Motion', num: 2 },
          { id: 'style', label: 'Style', num: 3 },
          { id: 'generating', label: 'Generate', num: 4 },
        ].map((s, index) => {
          const isActive = step === s.id || (step === 'results' && s.id === 'generating')
          const isCompleted =
            (step === 'motion' && s.num === 1) ||
            (step === 'style' && s.num <= 2) ||
            ((step === 'generating' || step === 'results') && s.num <= 3)

          return (
            <div key={s.id} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-2">
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

      {/* Step 1: Upload */}
      {step === 'upload' && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">Upload Images</h3>

              {/* Main Upload Area */}
              {uploadedImages.length === 0 ? (
                <div
                  onClick={handleAddImage}
                  className="border-2 border-dashed border-[var(--border-color)] rounded-xl p-12 text-center hover:border-[var(--secondary)] transition-colors cursor-pointer"
                >
                  <div className="w-16 h-16 bg-[var(--secondary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload size={28} className="text-[var(--secondary)]" />
                  </div>
                  <p className="font-medium text-[var(--foreground)] mb-2">Drop your images here</p>
                  <p className="text-sm text-[var(--muted)] mb-4">or click to browse</p>
                  <p className="text-xs text-[var(--muted)]">PNG, JPG, WEBP up to 20MB each</p>
                </div>
              ) : (
                <>
                  {/* Selected Image Preview */}
                  <div className="aspect-video bg-[var(--background)] rounded-xl border border-[var(--border-color)] mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                      <ImageIcon size={64} className="text-white/30" />
                    </div>
                    <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/50 rounded text-xs text-white">
                      {uploadedImages.find(img => img.id === selectedImage)?.name || 'No image selected'}
                    </div>
                  </div>

                  {/* Image Thumbnails */}
                  <div className="flex gap-2 flex-wrap">
                    {uploadedImages.map((img) => (
                      <div
                        key={img.id}
                        onClick={() => setSelectedImage(img.id)}
                        className={`relative w-20 h-20 rounded-lg border-2 cursor-pointer transition-all overflow-hidden ${
                          selectedImage === img.id
                            ? 'border-[var(--secondary)] ring-2 ring-[var(--secondary)]/30'
                            : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                        }`}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                          <ImageIcon size={20} className="text-white/50" />
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveImage(img.id)
                          }}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--accent)] rounded-full flex items-center justify-center hover:bg-[var(--accent)]/80"
                        >
                          <X size={10} className="text-white" />
                        </button>
                      </div>
                    ))}
                    {uploadedImages.length < 10 && (
                      <button
                        onClick={handleAddImage}
                        className="w-20 h-20 rounded-lg border-2 border-dashed border-[var(--border-color)] flex items-center justify-center hover:border-[var(--secondary)] transition-colors"
                      >
                        <Plus size={24} className="text-[var(--muted)]" />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-5">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">Quick Settings</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[var(--foreground)] mb-2 block">Output Format</label>
                  <div className="flex gap-2">
                    {outputFormats.map((format) => (
                      <button
                        key={format.id}
                        onClick={() => setOutputFormat(format.id)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                          outputFormat === format.id
                            ? 'bg-[var(--secondary)] text-white'
                            : 'bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--secondary)]/10'
                        }`}
                      >
                        {format.label}
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
              </div>
            </div>

            <div className="bg-[var(--secondary)]/5 rounded-xl border border-[var(--secondary)]/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-[var(--secondary)]" />
                <span className="font-medium text-[var(--foreground)]">AI Tip</span>
              </div>
              <p className="text-sm text-[var(--muted)]">
                High-resolution images with clear subjects work best. AI will automatically detect depth and create realistic motion.
              </p>
            </div>

            <button
              onClick={() => setStep('motion')}
              disabled={uploadedImages.length === 0}
              className="w-full py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] disabled:bg-[var(--border-color)] disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              Continue to Motion
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Motion */}
      {step === 'motion' && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Motion Presets */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">Motion Preset</h3>
              <div className="grid grid-cols-3 gap-3">
                {motionPresets.map((preset) => {
                  const Icon = preset.icon
                  return (
                    <button
                      key={preset.id}
                      onClick={() => setMotionPreset(preset.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        motionPreset === preset.id
                          ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                          : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                      }`}
                    >
                      <Icon size={24} className={motionPreset === preset.id ? 'text-[var(--secondary)]' : 'text-[var(--muted)]'} />
                      <p className="font-medium text-[var(--foreground)] mt-2 text-sm">{preset.label}</p>
                      <p className="text-xs text-[var(--muted)] mt-0.5">{preset.desc}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Motion Preview */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">Motion Preview</h3>
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center relative">
                <ImageIcon size={48} className="text-white/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Play size={24} className="text-white ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 bg-black/50 rounded-lg text-xs text-white">
                  <Clock size={12} />
                  <span>{duration}s</span>
                </div>
              </div>
            </div>

            {/* Advanced Controls */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">Fine-tune Motion</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-[var(--foreground)]">Motion Intensity</label>
                    <span className="text-sm text-[var(--secondary)]">75%</span>
                  </div>
                  <input type="range" min="0" max="100" defaultValue="75" className="w-full accent-[var(--secondary)]" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-[var(--foreground)]">Speed</label>
                    <span className="text-sm text-[var(--secondary)]">1.0x</span>
                  </div>
                  <input type="range" min="0" max="100" defaultValue="50" className="w-full accent-[var(--secondary)]" />
                </div>
                <label className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={loopVideo}
                    onChange={(e) => setLoopVideo(e.target.checked)}
                    className="w-4 h-4 accent-[var(--secondary)]"
                  />
                  <div className="flex items-center gap-2">
                    <Repeat size={16} className="text-[var(--secondary)]" />
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)]">Seamless Loop</p>
                      <p className="text-xs text-[var(--muted)]">Perfect for backgrounds</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-5">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">Selected Motion</h3>
              <div className="p-4 bg-[var(--background)] rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  {(() => {
                    const preset = motionPresets.find(p => p.id === motionPreset)
                    const Icon = preset?.icon || Move
                    return <Icon size={24} className="text-[var(--secondary)]" />
                  })()}
                  <div>
                    <p className="font-medium text-[var(--foreground)]">
                      {motionPresets.find(p => p.id === motionPreset)?.label}
                    </p>
                    <p className="text-xs text-[var(--muted)]">
                      {motionPresets.find(p => p.id === motionPreset)?.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('upload')}
                className="flex-1 py-3 border border-[var(--border-color)] text-[var(--foreground)] rounded-xl font-medium hover:bg-[var(--background)] transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep('style')}
                className="flex-1 py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-xl font-medium transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Style */}
      {step === 'style' && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Animation Style */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">Animation Style</h3>
              <div className="grid grid-cols-2 gap-3">
                {animationStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setAnimationStyle(style.id)}
                    className={`relative overflow-hidden rounded-xl border-2 transition-all ${
                      animationStyle === style.id
                        ? 'border-[var(--secondary)] ring-2 ring-[var(--secondary)]/30'
                        : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                    }`}
                  >
                    <div className={`h-24 bg-gradient-to-br ${style.preview}`} />
                    <div className="p-3 bg-[var(--card-bg)]">
                      <p className="font-medium text-[var(--foreground)] text-sm">{style.label}</p>
                      <p className="text-xs text-[var(--muted)]">{style.desc}</p>
                    </div>
                    {animationStyle === style.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-[var(--secondary)] rounded-full flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Enhancement Options */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">Enhancements</h3>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-3 p-4 bg-[var(--background)] rounded-xl cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[var(--secondary)]" />
                  <div>
                    <p className="font-medium text-[var(--foreground)] text-sm">AI Upscaling</p>
                    <p className="text-xs text-[var(--muted)]">Enhance to 4K quality</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 bg-[var(--background)] rounded-xl cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[var(--secondary)]" />
                  <div>
                    <p className="font-medium text-[var(--foreground)] text-sm">Depth Analysis</p>
                    <p className="text-xs text-[var(--muted)]">3D-aware animation</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 bg-[var(--background)] rounded-xl cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-[var(--secondary)]" />
                  <div>
                    <p className="font-medium text-[var(--foreground)] text-sm">Color Grade</p>
                    <p className="text-xs text-[var(--muted)]">Cinema-style colors</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 bg-[var(--background)] rounded-xl cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-[var(--secondary)]" />
                  <div>
                    <p className="font-medium text-[var(--foreground)] text-sm">Film Grain</p>
                    <p className="text-xs text-[var(--muted)]">Subtle texture overlay</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-4">
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-5">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Images</span>
                  <span className="font-medium text-[var(--foreground)]">{uploadedImages.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Format</span>
                  <span className="font-medium text-[var(--foreground)]">{outputFormat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Duration</span>
                  <span className="font-medium text-[var(--foreground)]">{duration}s each</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Motion</span>
                  <span className="font-medium text-[var(--foreground)] capitalize">{motionPreset.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Style</span>
                  <span className="font-medium text-[var(--foreground)] capitalize">{animationStyle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Loop</span>
                  <span className="font-medium text-[var(--foreground)]">{loopVideo ? 'Yes' : 'No'}</span>
                </div>
                <div className="h-px bg-[var(--border-color)] my-2" />
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Credits</span>
                  <span className="font-medium text-[var(--secondary)]">{uploadedImages.length * 5}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('motion')}
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
              <Wand2 size={32} className="text-[var(--secondary)] animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Animating Your Images</h3>
            <p className="text-[var(--muted)] mb-8">Creating smooth, natural motion...</p>

            <div className="mb-6">
              <div className="h-2 bg-[var(--background)] rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-[var(--secondary)] transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">{generationSteps[currentGenStep]}</span>
                <span className="font-medium text-[var(--secondary)]">{progress}%</span>
              </div>
            </div>

            <div className="space-y-2">
              {generationSteps.map((s, index) => (
                <div
                  key={s}
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
                    {s}
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
              <p className="text-sm text-[var(--muted)]">{uploadedImages.length} video{uploadedImages.length > 1 ? 's' : ''} generated</p>
            </div>
            <button
              onClick={() => {
                setStep('upload')
                setProgress(0)
                setCurrentGenStep(0)
                setUploadedImages([])
                setSelectedImage(null)
              }}
              className="flex items-center gap-2 text-sm text-[var(--secondary)] hover:underline font-medium"
            >
              <RefreshCw size={14} />
              Create New
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {uploadedImages.map((img, index) => (
              <div
                key={img.id}
                className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] overflow-hidden group"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Play size={24} className="text-white ml-1" />
                    </button>
                  </div>
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/50 rounded text-xs text-white font-medium">
                    {duration}s
                  </div>
                  {loopVideo && (
                    <div className="absolute top-3 right-3 p-1.5 bg-black/50 rounded">
                      <Repeat size={12} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-medium text-[var(--foreground)] mb-1">{img.name.replace('.jpg', '')}</p>
                  <p className="text-xs text-[var(--muted)] mb-3">{motionPreset.replace('-', ' ')} · {animationStyle}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 text-sm font-medium border border-[var(--border-color)] rounded-lg hover:bg-[var(--background)] transition-colors flex items-center justify-center gap-1">
                      <Eye size={14} />
                      Preview
                    </button>
                    <button className="flex-1 py-2 text-sm font-medium bg-[var(--secondary)] text-white rounded-lg hover:bg-[#7c4fe0] transition-colors flex items-center justify-center gap-1">
                      <Save size={14} />
                      Save
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
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
