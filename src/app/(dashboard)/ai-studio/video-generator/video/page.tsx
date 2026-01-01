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
  Film,
  Clock,
  Layers,
  Volume2,
  Mic,
  Plus,
  Trash2,
  GripVertical,
  ChevronRight,
  Settings2,
  Eye,
  Pause,
  SkipBack,
  SkipForward,
  Maximize2,
  RefreshCw,
  Image,
  Music,
  Type,
} from 'lucide-react'

type Step = 'storyboard' | 'timeline' | 'audio' | 'generating' | 'results'

const outputFormats = [
  { id: '16:9', label: '16:9', desc: 'YouTube, Standard' },
  { id: '9:16', label: '9:16', desc: 'Vertical, Mobile' },
  { id: '1:1', label: '1:1', desc: 'Square, Social' },
  { id: '4:3', label: '4:3', desc: 'Classic' },
]

const resolutions = [
  { id: '720p', label: '720p HD' },
  { id: '1080p', label: '1080p Full HD' },
  { id: '4k', label: '4K Ultra HD' },
]

const videoStyles = [
  { id: 'realistic', label: 'Realistic', desc: 'Photorealistic footage' },
  { id: 'cinematic', label: 'Cinematic', desc: 'Film-like quality' },
  { id: 'animated', label: 'Animated', desc: '2D/3D animation style' },
  { id: 'documentary', label: 'Documentary', desc: 'News and doc style' },
]

export default function VideoPage() {
  const [step, setStep] = useState<Step>('storyboard')
  const [outputFormat, setOutputFormat] = useState('16:9')
  const [resolution, setResolution] = useState('1080p')
  const [videoStyle, setVideoStyle] = useState('cinematic')
  const [videoDuration, setVideoDuration] = useState('180')
  const [progress, setProgress] = useState(0)
  const [currentGenStep, setCurrentGenStep] = useState(0)
  const [scenes, setScenes] = useState([
    { id: '1', type: 'intro', description: 'Opening hook - capture attention', duration: 10 },
    { id: '2', type: 'content', description: 'Main content section', duration: 120 },
    { id: '3', type: 'outro', description: 'Call to action and closing', duration: 15 },
  ])

  const generationSteps = [
    'Analyzing storyboard',
    'Generating scene assets',
    'Creating video segments',
    'Processing transitions',
    'Adding audio layers',
    'Rendering final video',
  ]

  const handleAddScene = () => {
    setScenes([...scenes, {
      id: String(Date.now()),
      type: 'content',
      description: 'New scene',
      duration: 30,
    }])
  }

  const handleRemoveScene = (id: string) => {
    if (scenes.length > 1) {
      setScenes(scenes.filter(s => s.id !== id))
    }
  }

  const handleGenerate = () => {
    setStep('generating')
    let currentProgress = 0
    let stepIndex = 0

    const interval = setInterval(() => {
      currentProgress += 1
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
    }, 100)
  }

  const totalDuration = scenes.reduce((acc, s) => acc + s.duration, 0)

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
          <h1 className="text-xl font-bold text-[var(--foreground)]">Long-form Video Creator</h1>
          <p className="text-sm text-[var(--muted)]">Create professional videos with scene-by-scene control</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--secondary)]/10 rounded-full">
          <Film size={14} className="text-[var(--secondary)]" />
          <span className="text-xs font-medium text-[var(--secondary)]">Pro Editor</span>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[
          { id: 'storyboard', label: 'Storyboard', num: 1 },
          { id: 'timeline', label: 'Timeline', num: 2 },
          { id: 'audio', label: 'Audio', num: 3 },
          { id: 'generating', label: 'Generate', num: 4 },
        ].map((s, index) => {
          const isActive = step === s.id || (step === 'results' && s.id === 'generating')
          const isCompleted =
            (step === 'timeline' && s.num === 1) ||
            (step === 'audio' && s.num <= 2) ||
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

      {/* Step 1: Storyboard */}
      {step === 'storyboard' && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Scenes Editor */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[var(--foreground)]">Scenes</h3>
                <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                  <Clock size={14} />
                  <span>Total: {Math.floor(totalDuration / 60)}:{String(totalDuration % 60).padStart(2, '0')}</span>
                </div>
              </div>

              <div className="space-y-3">
                {scenes.map((scene, index) => (
                  <div
                    key={scene.id}
                    className="flex items-start gap-3 p-4 bg-[var(--background)] rounded-xl border border-[var(--border-color)]"
                  >
                    <GripVertical size={18} className="text-[var(--muted)] mt-1 cursor-grab" />
                    <div className="w-8 h-8 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center text-sm font-semibold text-[var(--secondary)]">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <select
                          value={scene.type}
                          onChange={(e) => {
                            const updated = [...scenes]
                            updated[index].type = e.target.value
                            setScenes(updated)
                          }}
                          className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg px-2 py-1 text-sm"
                        >
                          <option value="intro">Intro</option>
                          <option value="content">Content</option>
                          <option value="transition">Transition</option>
                          <option value="outro">Outro</option>
                        </select>
                        <span className="text-xs text-[var(--muted)]">{scene.duration}s</span>
                      </div>
                      <textarea
                        value={scene.description}
                        onChange={(e) => {
                          const updated = [...scenes]
                          updated[index].description = e.target.value
                          setScenes(updated)
                        }}
                        placeholder="Describe this scene..."
                        className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm resize-none h-16 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                      />
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 px-2 py-1 text-xs text-[var(--secondary)] hover:bg-[var(--secondary)]/10 rounded">
                          <Image size={12} />
                          Add Image
                        </button>
                        <button className="flex items-center gap-1 px-2 py-1 text-xs text-[var(--secondary)] hover:bg-[var(--secondary)]/10 rounded">
                          <Upload size={12} />
                          Upload
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveScene(scene.id)}
                      className="p-1.5 text-[var(--muted)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={handleAddScene}
                className="mt-4 w-full py-3 border-2 border-dashed border-[var(--border-color)] rounded-xl text-sm font-medium text-[var(--muted)] hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Add Scene
              </button>
            </div>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-4">
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-5">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">Video Settings</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[var(--foreground)] mb-2 block">Format</label>
                  <div className="grid grid-cols-2 gap-2">
                    {outputFormats.map((format) => (
                      <button
                        key={format.id}
                        onClick={() => setOutputFormat(format.id)}
                        className={`py-2 px-3 rounded-lg text-sm transition-all ${
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
                  <label className="text-sm font-medium text-[var(--foreground)] mb-2 block">Resolution</label>
                  <select
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm"
                  >
                    {resolutions.map((res) => (
                      <option key={res.id} value={res.id}>{res.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-[var(--foreground)] mb-2 block">Style</label>
                  <select
                    value={videoStyle}
                    onChange={(e) => setVideoStyle(e.target.value)}
                    className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm"
                  >
                    {videoStyles.map((style) => (
                      <option key={style.id} value={style.id}>{style.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-[var(--secondary)]/5 rounded-xl border border-[var(--secondary)]/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-[var(--secondary)]" />
                <span className="font-medium text-[var(--foreground)]">Pro Tip</span>
              </div>
              <p className="text-sm text-[var(--muted)]">
                Keep each scene description concise but specific. Include details about camera angles, lighting, and mood.
              </p>
            </div>

            <button
              onClick={() => setStep('timeline')}
              disabled={scenes.length === 0}
              className="w-full py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] disabled:bg-[var(--border-color)] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              Continue to Timeline
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Timeline */}
      {step === 'timeline' && (
        <div className="space-y-6">
          {/* Timeline Preview */}
          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[var(--foreground)]">Timeline Preview</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--muted)]">{Math.floor(totalDuration / 60)}:{String(totalDuration % 60).padStart(2, '0')} total</span>
              </div>
            </div>

            {/* Video Preview Area */}
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl mb-4 flex items-center justify-center relative">
              <Play size={64} className="text-white/60" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-3 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
                  <button className="text-white hover:text-[var(--secondary)]"><SkipBack size={18} /></button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <Play size={20} className="text-gray-900 ml-0.5" />
                  </button>
                  <button className="text-white hover:text-[var(--secondary)]"><SkipForward size={18} /></button>
                  <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div className="w-0 h-full bg-[var(--secondary)]" />
                  </div>
                  <span className="text-white text-sm">0:00 / {Math.floor(totalDuration / 60)}:{String(totalDuration % 60).padStart(2, '0')}</span>
                  <button className="text-white hover:text-[var(--secondary)]"><Maximize2 size={18} /></button>
                </div>
              </div>
            </div>

            {/* Timeline Tracks */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[var(--muted)] w-16">Video</span>
                <div className="flex-1 h-10 bg-[var(--background)] rounded-lg flex gap-1 p-1 overflow-hidden">
                  {scenes.map((scene, index) => (
                    <div
                      key={scene.id}
                      style={{ width: `${(scene.duration / totalDuration) * 100}%` }}
                      className="h-full bg-[var(--secondary)] rounded flex items-center justify-center text-xs text-white font-medium truncate px-2"
                    >
                      Scene {index + 1}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[var(--muted)] w-16">Audio</span>
                <div className="flex-1 h-8 bg-[var(--background)] rounded-lg flex items-center px-2">
                  <div className="w-full h-4 bg-[var(--success)]/30 rounded flex items-center px-2">
                    <span className="text-xs text-[var(--success)]">Voice Track</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[var(--muted)] w-16">Music</span>
                <div className="flex-1 h-8 bg-[var(--background)] rounded-lg flex items-center px-2">
                  <div className="w-full h-4 bg-[var(--warning)]/30 rounded flex items-center px-2">
                    <span className="text-xs text-[var(--warning)]">Background Music</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scene Details */}
          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
            <h3 className="font-semibold text-[var(--foreground)] mb-4">Scene Transitions</h3>
            <div className="grid grid-cols-4 gap-3">
              {['Cut', 'Fade', 'Dissolve', 'Wipe'].map((transition) => (
                <button
                  key={transition}
                  className="p-4 bg-[var(--background)] rounded-xl border border-[var(--border-color)] hover:border-[var(--secondary)] transition-all text-center"
                >
                  <div className="w-12 h-8 mx-auto mb-2 bg-[var(--secondary)]/10 rounded flex items-center justify-center">
                    <Layers size={18} className="text-[var(--secondary)]" />
                  </div>
                  <p className="text-sm font-medium text-[var(--foreground)]">{transition}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep('storyboard')}
              className="flex-1 py-3 border border-[var(--border-color)] text-[var(--foreground)] rounded-xl font-medium hover:bg-[var(--background)] transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => setStep('audio')}
              className="flex-1 py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-xl font-medium transition-colors"
            >
              Continue to Audio
            </button>
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
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[var(--secondary)]" />
                  <span className="text-sm">Enable</span>
                </label>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {['Professional', 'Friendly', 'Energetic'].map((voice) => (
                  <button
                    key={voice}
                    className="p-4 bg-[var(--background)] rounded-xl border border-[var(--border-color)] hover:border-[var(--secondary)] transition-all"
                  >
                    <Mic size={24} className="mx-auto mb-2 text-[var(--secondary)]" />
                    <p className="text-sm font-medium text-[var(--foreground)]">{voice}</p>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4 p-4 bg-[var(--background)] rounded-xl">
                <button className="w-10 h-10 bg-[var(--secondary)] rounded-full flex items-center justify-center">
                  <Play size={18} className="text-white ml-0.5" />
                </button>
                <div className="flex-1">
                  <div className="h-1 bg-[var(--border-color)] rounded-full">
                    <div className="w-0 h-full bg-[var(--secondary)] rounded-full" />
                  </div>
                </div>
                <span className="text-sm text-[var(--muted)]">Preview voice</span>
              </div>
            </div>

            {/* Background Music */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[var(--foreground)]">Background Music</h3>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[var(--secondary)]" />
                  <span className="text-sm">Enable</span>
                </label>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {['Corporate', 'Cinematic', 'Upbeat', 'Ambient', 'Dramatic'].map((genre) => (
                  <button
                    key={genre}
                    className="px-4 py-2 bg-[var(--background)] rounded-lg text-sm font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]/10 transition-colors"
                  >
                    {genre}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <Music size={18} className="text-[var(--muted)]" />
                <input type="range" min="0" max="100" defaultValue="30" className="flex-1 accent-[var(--secondary)]" />
                <span className="text-sm text-[var(--muted)] w-8">30%</span>
              </div>
            </div>

            {/* Sound Effects */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">Sound Effects</h3>
              <div className="grid grid-cols-4 gap-2">
                {['Transitions', 'Ambience', 'UI Sounds', 'Whoosh'].map((effect) => (
                  <label key={effect} className="flex items-center gap-2 p-3 bg-[var(--background)] rounded-lg cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-[var(--secondary)]" />
                    <span className="text-sm text-[var(--foreground)]">{effect}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-5">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Scenes</span>
                  <span className="font-medium text-[var(--foreground)]">{scenes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Duration</span>
                  <span className="font-medium text-[var(--foreground)]">{Math.floor(totalDuration / 60)}:{String(totalDuration % 60).padStart(2, '0')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Format</span>
                  <span className="font-medium text-[var(--foreground)]">{outputFormat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Resolution</span>
                  <span className="font-medium text-[var(--foreground)]">{resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Style</span>
                  <span className="font-medium text-[var(--foreground)] capitalize">{videoStyle}</span>
                </div>
                <div className="h-px bg-[var(--border-color)] my-2" />
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Estimated Credits</span>
                  <span className="font-medium text-[var(--secondary)]">{Math.ceil(totalDuration / 30) * 15}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('timeline')}
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
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Generating Your Video</h3>
            <p className="text-[var(--muted)] mb-8">This may take 5-10 minutes for longer videos</p>

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
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Your Video is Ready!</h2>
              <p className="text-sm text-[var(--muted)]">{Math.floor(totalDuration / 60)}:{String(totalDuration % 60).padStart(2, '0')} · {resolution} · {outputFormat}</p>
            </div>
            <button
              onClick={() => {
                setStep('storyboard')
                setProgress(0)
                setCurrentGenStep(0)
              }}
              className="flex items-center gap-2 text-sm text-[var(--secondary)] hover:underline font-medium"
            >
              <RefreshCw size={14} />
              Create New
            </button>
          </div>

          <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
              <button className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                <Play size={36} className="text-white ml-1" />
              </button>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-[var(--foreground)]">Generated Video</p>
                <p className="text-sm text-[var(--muted)]">{scenes.length} scenes · {videoStyle} style</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-[var(--secondary)] hover:bg-[var(--secondary)]/10 rounded-lg">
                  <Eye size={18} />
                </button>
                <button className="p-2 text-[var(--secondary)] hover:bg-[var(--secondary)]/10 rounded-lg">
                  <Settings2 size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
              <Save size={18} />
              Save to Assets
            </button>
            <button className="flex-1 py-3 border border-[var(--border-color)] text-[var(--foreground)] rounded-xl font-medium hover:bg-[var(--background)] transition-colors flex items-center justify-center gap-2">
              <Download size={18} />
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
