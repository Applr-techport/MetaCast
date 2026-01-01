'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import {
  ArrowLeft,
  FileText,
  Sparkles,
  Check,
  Download,
  Save,
  RotateCcw,
  Clock,
  Copy,
  CheckCircle,
  Tag,
} from 'lucide-react'

// Header Actions
function ScriptHeaderActions() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--secondary)]/10 rounded-lg border border-[var(--secondary)]/20">
        <FileText size={14} className="text-[var(--secondary)]" />
        <span className="text-sm font-medium text-[var(--secondary)]">15 credits per script</span>
      </div>
    </div>
  )
}

type Step = 'input' | 'settings' | 'generating' | 'results'

const toneOptions = [
  { id: 'professional', label: 'Professional', desc: 'Formal and informative' },
  { id: 'casual', label: 'Casual', desc: 'Friendly and conversational' },
  { id: 'enthusiastic', label: 'Enthusiastic', desc: 'Energetic and exciting' },
  { id: 'persuasive', label: 'Persuasive', desc: 'Sales-focused and compelling' },
]

const scriptTypes = [
  { id: 'product-intro', label: 'Product Introduction' },
  { id: 'demo', label: 'Product Demo' },
  { id: 'qa', label: 'Q&A Session' },
  { id: 'promotion', label: 'Promotion/Sale' },
]

export default function ScriptWriterPage() {
  const [step, setStep] = useState<Step>('input')
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [keyFeatures, setKeyFeatures] = useState('')
  const [scriptType, setScriptType] = useState('product-intro')
  const [tone, setTone] = useState('professional')
  const [duration, setDuration] = useState('5')
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)

  const generatedScript = `Hello everyone! Today, I'm excited to introduce a truly special product.

Let me present "${productName || 'Product Name'}" to you.

${productDescription || 'Product description goes here.'}

Let's take a look at the key features:
${keyFeatures || '- Feature 1\n- Feature 2\n- Feature 3'}

Check it out now!`

  const handleGenerate = () => {
    setStep('generating')
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 4
      setProgress(currentProgress)
      if (currentProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => setStep('results'), 500)
      }
    }, 100)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedScript)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen">
      <Header actions={<ScriptHeaderActions />} />

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
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Script Writer</h1>
        <p className="text-[var(--muted)]">Generate live stream scripts from product information</p>
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

            {/* Product Description */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Product Description
              </label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Describe your product in detail..."
                rows={4}
                className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] resize-none"
              />
            </div>

            {/* Key Features */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Key Features (one per line)
              </label>
              <textarea
                value={keyFeatures}
                onChange={(e) => setKeyFeatures(e.target.value)}
                placeholder="- Feature 1&#10;- Feature 2&#10;- Feature 3"
                rows={4}
                className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] resize-none font-mono"
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
            {/* Script Type */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-3">
                Script Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {scriptTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setScriptType(type.id)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                      scriptType === type.id
                        ? 'border-[var(--secondary)] bg-[var(--secondary)]/5 text-[var(--secondary)]'
                        : 'border-[var(--border-color)] text-[var(--foreground)] hover:border-[var(--secondary)]/50'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-3">Tone</label>
              <div className="space-y-2">
                {toneOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      tone === opt.id
                        ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                        : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tone"
                      value={opt.id}
                      checked={tone === opt.id}
                      onChange={(e) => setTone(e.target.value)}
                      className="mt-0.5 accent-[var(--secondary)]"
                    />
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)]">{opt.label}</p>
                      <p className="text-xs text-[var(--muted)]">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)] mb-2">
                <Clock size={16} className="text-[var(--secondary)]" />
                Target Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
              >
                <option value="3">3 minutes</option>
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
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
                <span>Generate Script</span>
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
            <h3 className="font-semibold text-[var(--foreground)] mb-6">Writing Your Script...</h3>

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
              Creating {toneOptions.find((t) => t.id === tone)?.label.toLowerCase()} script...
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
                <h3 className="font-semibold text-[var(--foreground)]">Your Script</h3>
                <p className="text-sm text-[var(--muted)]">
                  {productName} - {scriptTypes.find((t) => t.id === scriptType)?.label}
                </p>
              </div>
              <button
                onClick={() => {
                  setStep('input')
                  setProgress(0)
                  setProductName('')
                  setProductDescription('')
                  setKeyFeatures('')
                }}
                className="flex items-center gap-2 text-sm text-[var(--secondary)] hover:text-[#7c4fe0] font-medium"
              >
                <RotateCcw size={14} />
                <span>Create New</span>
              </button>
            </div>

            {/* Script Preview */}
            <div className="relative mb-6">
              <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                    <FileText size={16} className="text-[var(--secondary)]" />
                    <span>{duration} min script</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-sm text-[var(--secondary)] hover:text-[#7c4fe0] font-medium"
                  >
                    {copied ? (
                      <>
                        <CheckCircle size={14} />
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
                <div className="whitespace-pre-wrap text-sm text-[var(--foreground)] leading-relaxed">
                  {generatedScript}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Save size={18} />
                <span>Save to Assets</span>
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
