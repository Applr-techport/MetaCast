'use client'

import { Header } from '@/components/layout/Header'
import { useState } from 'react'
import {
  Sparkles,
  FileText,
  Video,
  Image as ImageIcon,
  Wand2,
  ChevronRight,
  Upload,
  Mic,
  Volume2,
  Clock,
  Globe,
  Loader2,
} from 'lucide-react'

type InputType = 'text' | 'video' | 'image'
type Step = 'input' | 'scenario' | 'voice' | 'generate'

// 입력 타입 선택 탭
function InputTypeTabs({
  selected,
  onChange,
}: {
  selected: InputType
  onChange: (type: InputType) => void
}) {
  const tabs = [
    { type: 'text' as const, icon: FileText, label: 'Text Idea' },
    { type: 'video' as const, icon: Video, label: 'Upload Video' },
    { type: 'image' as const, icon: ImageIcon, label: 'Upload Image' },
  ]

  return (
    <div className="flex gap-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.type}
          onClick={() => onChange(tab.type)}
          className={`
            flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all
            ${
              selected === tab.type
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--card-bg)] border border-[var(--border-color)] hover:bg-[var(--background)]'
            }
          `}
        >
          <tab.icon size={18} />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  )
}

// 텍스트 입력 섹션
function TextInputSection({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Enter your content idea or keywords
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., 'How to make perfect coffee at home' or 'AI technology trends 2024'"
          className="w-full h-32 px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Target Duration</label>
          <select className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm">
            <option value="30">30 seconds</option>
            <option value="60">60 seconds</option>
            <option value="90">90 seconds</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Language</label>
          <select className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm">
            <option value="en">English</option>
            <option value="ko">한국어</option>
            <option value="ja">日本語</option>
            <option value="zh">中文</option>
          </select>
        </div>
      </div>
    </div>
  )
}

// 파일 업로드 섹션
function FileUploadSection({
  type,
  file,
  onFileChange,
}: {
  type: 'video' | 'image'
  file: File | null
  onFileChange: (f: File | null) => void
}) {
  const accept = type === 'video' ? 'video/*' : 'image/*'
  const icon = type === 'video' ? Video : ImageIcon

  return (
    <div className="space-y-4">
      <div
        className="border-2 border-dashed border-[var(--border-color)] rounded-xl p-8 text-center hover:border-[var(--primary)] transition-colors cursor-pointer"
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept={accept}
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
          className="hidden"
        />
        {file ? (
          <div className="space-y-2">
            <div className="w-16 h-16 mx-auto bg-[var(--success)] rounded-full flex items-center justify-center">
              {type === 'video' ? (
                <Video size={32} className="text-white" />
              ) : (
                <ImageIcon size={32} className="text-white" />
              )}
            </div>
            <p className="font-medium">{file.name}</p>
            <p className="text-sm text-[var(--muted)]">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="w-16 h-16 mx-auto bg-[var(--background)] rounded-full flex items-center justify-center">
              <Upload size={32} className="text-[var(--muted)]" />
            </div>
            <p className="font-medium">
              Drop your {type} here or click to browse
            </p>
            <p className="text-sm text-[var(--muted)]">
              {type === 'video'
                ? 'MP4, MOV, AVI up to 500MB'
                : 'JPG, PNG, WebP up to 50MB'}
            </p>
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Additional instructions (optional)
        </label>
        <textarea
          placeholder="Describe the style or focus you want for the shortform..."
          className="w-full h-20 px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
        />
      </div>
    </div>
  )
}

// 시나리오 편집 섹션
function ScenarioSection({
  scenario,
  onChange,
  isLoading,
  onRegenerate,
}: {
  scenario: string
  onChange: (s: string) => void
  isLoading: boolean
  onRegenerate: () => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium">AI Generated Scenario</label>
        <button
          onClick={onRegenerate}
          disabled={isLoading}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--secondary)] hover:bg-[var(--background)] rounded-lg transition-colors disabled:opacity-50"
        >
          <Wand2 size={16} />
          Regenerate
        </button>
      </div>
      {isLoading ? (
        <div className="h-64 bg-[var(--background)] border border-[var(--border-color)] rounded-lg flex items-center justify-center">
          <div className="text-center space-y-3">
            <Loader2 size={32} className="animate-spin mx-auto text-[var(--primary)]" />
            <p className="text-sm text-[var(--muted)]">Generating scenario...</p>
          </div>
        </div>
      ) : (
        <textarea
          value={scenario}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-64 px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent font-mono"
        />
      )}
      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-4">
        <h4 className="text-sm font-medium mb-3">Scene Breakdown</h4>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((scene) => (
            <div
              key={scene}
              className="flex items-center gap-3 p-2 bg-[var(--background)] rounded-lg"
            >
              <span className="w-6 h-6 bg-[var(--primary)] text-white rounded-full flex items-center justify-center text-xs font-medium">
                {scene}
              </span>
              <span className="text-sm flex-1">Scene {scene} description...</span>
              <span className="text-xs text-[var(--muted)]">
                {scene * 7 + 3}s
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 음성 선택 섹션
function VoiceSection({
  selected,
  onChange,
}: {
  selected: string
  onChange: (v: string) => void
}) {
  const voices = [
    { id: 'adam', name: 'Adam', gender: 'Male', accent: 'American' },
    { id: 'emily', name: 'Emily', gender: 'Female', accent: 'British' },
    { id: 'james', name: 'James', gender: 'Male', accent: 'Australian' },
    { id: 'sarah', name: 'Sarah', gender: 'Female', accent: 'American' },
    { id: 'yuna', name: 'Yuna', gender: 'Female', accent: 'Korean' },
    { id: 'custom', name: 'Upload Custom', gender: '-', accent: '-' },
  ]

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">Select Voice</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {voices.map((voice) => (
          <div
            key={voice.id}
            onClick={() => onChange(voice.id)}
            className={`
              p-4 rounded-lg border cursor-pointer transition-all
              ${
                selected === voice.id
                  ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                  : 'border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[var(--primary)]/50'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div
                className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${selected === voice.id ? 'bg-[var(--primary)]' : 'bg-[var(--background)]'}
              `}
              >
                {voice.id === 'custom' ? (
                  <Upload
                    size={18}
                    className={selected === voice.id ? 'text-white' : 'text-[var(--muted)]'}
                  />
                ) : (
                  <Mic
                    size={18}
                    className={selected === voice.id ? 'text-white' : 'text-[var(--muted)]'}
                  />
                )}
              </div>
              <div>
                <p className="font-medium text-sm">{voice.name}</p>
                {voice.id !== 'custom' && (
                  <p className="text-xs text-[var(--muted)]">
                    {voice.gender} · {voice.accent}
                  </p>
                )}
              </div>
            </div>
            {voice.id !== 'custom' && (
              <button className="mt-3 w-full flex items-center justify-center gap-2 py-2 bg-[var(--background)] rounded-lg text-sm hover:bg-[var(--border-color)] transition-colors">
                <Volume2 size={14} />
                Preview
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Speech Speed</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            defaultValue="1"
            className="w-full"
          />
          <div className="flex justify-between text-xs text-[var(--muted)] mt-1">
            <span>0.5x</span>
            <span>1.0x</span>
            <span>2.0x</span>
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Pitch</label>
          <input
            type="range"
            min="-10"
            max="10"
            step="1"
            defaultValue="0"
            className="w-full"
          />
          <div className="flex justify-between text-xs text-[var(--muted)] mt-1">
            <span>Low</span>
            <span>Normal</span>
            <span>High</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 진행 상태 표시
function ProgressSteps({ current }: { current: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: 'input', label: 'Input' },
    { key: 'scenario', label: 'Scenario' },
    { key: 'voice', label: 'Voice' },
    { key: 'generate', label: 'Generate' },
  ]

  const currentIndex = steps.findIndex((s) => s.key === current)

  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((step, index) => (
        <div key={step.key} className="flex items-center">
          <div
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
              ${
                index <= currentIndex
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--background)] text-[var(--muted)]'
              }
            `}
          >
            <span
              className={`
              w-5 h-5 rounded-full flex items-center justify-center text-xs
              ${index <= currentIndex ? 'bg-white/20' : 'bg-[var(--border-color)]'}
            `}
            >
              {index + 1}
            </span>
            {step.label}
          </div>
          {index < steps.length - 1 && (
            <ChevronRight size={16} className="mx-2 text-[var(--muted)]" />
          )}
        </div>
      ))}
    </div>
  )
}

// 생성 상태 섹션
function GenerationSection({ isGenerating }: { isGenerating: boolean }) {
  const stages = [
    { label: 'Generating images...', progress: 100 },
    { label: 'Creating video clips...', progress: 75 },
    { label: 'Synthesizing voice...', progress: 50 },
    { label: 'Compositing final video...', progress: 25 },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center">
            <Sparkles size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold">Generating Your Shortform</h3>
            <p className="text-sm text-[var(--muted)]">
              This may take a few minutes...
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{stage.label}</span>
                <span className="text-[var(--muted)]">{stage.progress}%</span>
              </div>
              <div className="h-2 bg-[var(--background)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
                  style={{ width: `${stage.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
          <div className="aspect-video bg-[var(--background)] rounded-lg mb-3 flex items-center justify-center">
            <Loader2 size={32} className="animate-spin text-[var(--muted)]" />
          </div>
          <p className="text-sm font-medium">Preview</p>
          <p className="text-xs text-[var(--muted)]">Will appear when ready</p>
        </div>
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
          <h4 className="font-medium mb-3">Generation Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Duration</span>
              <span>60 seconds</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Resolution</span>
              <span>1080x1920</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Format</span>
              <span>MP4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Voice</span>
              <span>Emily (British)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CreatePage() {
  const [step, setStep] = useState<Step>('input')
  const [inputType, setInputType] = useState<InputType>('text')
  const [textInput, setTextInput] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [scenario, setScenario] = useState('')
  const [isScenarioLoading, setIsScenarioLoading] = useState(false)
  const [selectedVoice, setSelectedVoice] = useState('emily')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateScenario = () => {
    setIsScenarioLoading(true)
    // 시뮬레이션: 실제로는 API 호출
    setTimeout(() => {
      setScenario(`[SCENE 1: Opening Hook - 5s]
Visual: Dynamic text animation with coffee beans falling
Narration: "Did you know there's a secret to making barista-quality coffee at home?"

[SCENE 2: Problem Statement - 10s]
Visual: Split screen showing watery vs rich coffee
Narration: "Most people make these 3 common mistakes that ruin their coffee..."

[SCENE 3: Solution Introduction - 15s]
Visual: Step-by-step brewing demonstration
Narration: "Here's the professional technique that changes everything..."

[SCENE 4: Key Tips - 20s]
Visual: Close-up shots of water temperature, grind size, timing
Narration: "First, your water should be exactly 200°F. Second, use a burr grinder..."

[SCENE 5: Call to Action - 10s]
Visual: Final product shot with steam rising
Narration: "Try this tomorrow morning and taste the difference! Follow for more tips."`)
      setIsScenarioLoading(false)
      setStep('scenario')
    }, 2000)
  }

  const handleNext = () => {
    if (step === 'input') {
      handleGenerateScenario()
    } else if (step === 'scenario') {
      setStep('voice')
    } else if (step === 'voice') {
      setStep('generate')
      setIsGenerating(true)
    }
  }

  const handleBack = () => {
    if (step === 'scenario') setStep('input')
    else if (step === 'voice') setStep('scenario')
    else if (step === 'generate') setStep('voice')
  }

  const canProceed = () => {
    if (step === 'input') {
      if (inputType === 'text') return textInput.trim().length > 0
      return file !== null
    }
    if (step === 'scenario') return scenario.trim().length > 0
    if (step === 'voice') return selectedVoice !== ''
    return false
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="p-6 max-w-4xl mx-auto">
        {/* 타이틀 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Sparkles className="text-[var(--secondary)]" />
            Create Shortform
          </h1>
          <p className="text-[var(--muted)] mt-1">
            Generate AI-powered shortform videos in minutes
          </p>
        </div>

        {/* 진행 단계 */}
        <ProgressSteps current={step} />

        {/* 메인 컨텐츠 */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
          {step === 'input' && (
            <>
              <InputTypeTabs selected={inputType} onChange={setInputType} />
              {inputType === 'text' ? (
                <TextInputSection value={textInput} onChange={setTextInput} />
              ) : (
                <FileUploadSection
                  type={inputType}
                  file={file}
                  onFileChange={setFile}
                />
              )}
            </>
          )}

          {step === 'scenario' && (
            <ScenarioSection
              scenario={scenario}
              onChange={setScenario}
              isLoading={isScenarioLoading}
              onRegenerate={handleGenerateScenario}
            />
          )}

          {step === 'voice' && (
            <VoiceSection selected={selectedVoice} onChange={setSelectedVoice} />
          )}

          {step === 'generate' && <GenerationSection isGenerating={isGenerating} />}
        </div>

        {/* 네비게이션 버튼 */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={step === 'input'}
            className="px-6 py-3 border border-[var(--border-color)] rounded-lg text-sm font-medium hover:bg-[var(--background)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed() || step === 'generate'}
            className="px-6 py-3 bg-[var(--primary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {step === 'input' && (
              <>
                <Wand2 size={18} />
                Generate Scenario
              </>
            )}
            {step === 'scenario' && (
              <>
                Select Voice
                <ChevronRight size={18} />
              </>
            )}
            {step === 'voice' && (
              <>
                <Sparkles size={18} />
                Generate Video
              </>
            )}
            {step === 'generate' && (
              <>
                <Loader2 size={18} className="animate-spin" />
                Generating...
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
