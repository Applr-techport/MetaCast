'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import {
  ArrowLeft,
  Check,
  Mic,
  MessageCircleQuestion,
  BarChart3,
  FileText,
  Play,
  Globe,
  ShoppingBag,
  ChevronRight,
  Zap,
  Monitor,
  Smartphone,
  Radio,
  Volume2,
} from 'lucide-react'

// Header Actions
function LiveStreamHeaderActions() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--secondary)]/10 rounded-lg border border-[var(--secondary)]/20">
        <Zap size={14} className="text-[var(--secondary)]" />
        <span className="text-sm font-medium text-[var(--secondary)]">Est. 450 credits/hour</span>
      </div>
    </div>
  )
}

type Step = 'role' | 'settings' | 'connect'

const steps = [
  { id: 'role', label: 'AI Role' },
  { id: 'settings', label: 'AI Settings' },
  { id: 'connect', label: 'Broadcast Connect' },
]

// AI Roles (new concept: Co-Host instead of Avatar)
const aiRoles = [
  {
    id: 'co-host',
    icon: Mic,
    title: 'Co-Host',
    description: 'AI assists with voice, introducing products, sharing stats, and event announcements',
    features: ['Product explanation assist', 'Real-time data sharing', 'Purchase prompts'],
    recommended: true,
  },
  {
    id: 'qa-assistant',
    icon: MessageCircleQuestion,
    title: 'Q&A Assistant',
    description: 'Automatically responds to viewer questions',
    features: ['Product info answers', 'Shipping/returns guide', 'FAQ auto-handling'],
    recommended: false,
  },
  {
    id: 'live-insights',
    icon: BarChart3,
    title: 'Live Insights',
    description: 'Announces real-time stats and reactions via voice',
    features: ['Viewer count changes', 'Purchase/cart alerts', 'Popular chat summary'],
    recommended: false,
  },
  {
    id: 'prompter-only',
    icon: FileText,
    title: 'Prompter Only',
    description: 'No voice, only displays scripts/info on screen',
    features: ['Next line suggestions', 'Product info display', 'Chat highlights'],
    recommended: false,
  },
]

// Voice Styles
const voiceStyles = [
  { id: 'friendly', label: 'Friendly', description: 'Relaxed, conversational tone' },
  { id: 'professional', label: 'Professional', description: 'Calm and trustworthy tone' },
  { id: 'energetic', label: 'Energetic', description: 'Dynamic, engaging tone' },
  { id: 'calm', label: 'Calm', description: 'Warm and intimate tone' },
]

// Voice Options
const voices = [
  { id: 'yuna', name: 'Yuna', gender: 'female', language: 'Korean' },
  { id: 'minho', name: 'Minho', gender: 'male', language: 'Korean' },
  { id: 'sarah', name: 'Sarah', gender: 'female', language: 'English' },
]

// Interaction Frequency Options
const frequencyOptions = [
  { id: 'high', label: 'Active', description: 'Frequently joins and actively participates' },
  { id: 'medium', label: 'Moderate', description: 'Participates at appropriate moments' },
  { id: 'low', label: 'Minimal', description: 'Only participates when requested' },
]

// Platforms
const platforms = [
  { id: 'youtube', label: 'YouTube', icon: Monitor, connected: true },
  { id: 'instagram', label: 'Instagram', icon: Smartphone, connected: true },
  { id: 'tiktok', label: 'TikTok', icon: Smartphone, connected: false },
  { id: 'facebook', label: 'Facebook', icon: Monitor, connected: true },
  { id: 'naver', label: 'Naver Shopping', icon: ShoppingBag, connected: false },
  { id: 'coupang', label: 'Coupang Live', icon: ShoppingBag, connected: false },
]

// Products
const products = [
  { id: '1', name: 'Premium AirPods Case', price: 29900, stock: 150 },
  { id: '2', name: 'Wireless Charging Pad Pro', price: 49900, stock: 89 },
  { id: '3', name: 'Silicone Watch Band', price: 19900, stock: 230 },
]

export default function AILiveStreamPage() {
  const [currentStep, setCurrentStep] = useState<Step>('role')

  // Step 1: AI Role
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  // Step 2: AI Settings
  const [voiceStyle, setVoiceStyle] = useState('friendly')
  const [selectedVoice, setSelectedVoice] = useState('yuna')
  const [frequency, setFrequency] = useState('medium')
  const [autoResponse, setAutoResponse] = useState({
    productInfo: true,
    shipping: true,
    generalQuestions: false,
  })
  const [features, setFeatures] = useState({
    purchaseAlert: true,
    cartAlert: true,
    chatHighlight: true,
    realTimeTranslation: false,
  })

  // Step 3: Broadcast Connect
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['youtube', 'instagram'])
  const [productEnabled, setProductEnabled] = useState(true)
  const [selectedProducts, setSelectedProducts] = useState<string[]>(['1', '2', '3'])

  const currentStepIndex = steps.findIndex(s => s.id === currentStep)
  const selectedRoleData = aiRoles.find(r => r.id === selectedRole)
  const needsVoice = selectedRole !== 'prompter-only'

  const togglePlatform = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId)
    if (!platform?.connected) return
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((p) => p !== platformId) : [...prev, platformId]
    )
  }

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((p) => p !== productId) : [...prev, productId]
    )
  }

  const nextStep = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id as Step)
    }
  }

  const prevStep = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id as Step)
    }
  }

  const canProceed = () => {
    if (currentStep === 'role') return selectedRole !== null
    if (currentStep === 'settings') return true
    if (currentStep === 'connect') return selectedPlatforms.length > 0
    return true
  }

  return (
    <div className="min-h-screen">
      <Header actions={<LiveStreamHeaderActions />} />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Sub Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/ai-studio"
              className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-[var(--muted)]" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-[var(--foreground)]">AI Live Stream</h1>
              <p className="text-sm text-[var(--muted)]">Add an AI partner to your broadcast</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-4 mb-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep
              const isCompleted = index < currentStepIndex
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <button
                    onClick={() => index <= currentStepIndex && setCurrentStep(step.id as Step)}
                    disabled={index > currentStepIndex}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-[var(--secondary)]/10'
                        : isCompleted
                          ? 'hover:bg-[var(--background)] cursor-pointer'
                          : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isCompleted
                        ? 'bg-[var(--secondary)] text-white'
                        : isActive
                          ? 'bg-[var(--secondary)]/20 text-[var(--secondary)] border-2 border-[var(--secondary)]'
                          : 'bg-[var(--background)] text-[var(--muted)] border border-[var(--border-color)]'
                    }`}>
                      {isCompleted ? <Check size={14} /> : index + 1}
                    </div>
                    <span className={`text-sm font-medium ${isActive ? 'text-[var(--secondary)]' : isCompleted ? 'text-[var(--foreground)]' : 'text-[var(--muted)]'}`}>
                      {step.label}
                    </span>
                  </button>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-px mx-4 ${index < currentStepIndex ? 'bg-[var(--secondary)]' : 'bg-[var(--border-color)]'}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Main Content - 2 columns */}
          <div className="col-span-2 space-y-6">
            {/* Step 1: AI Role Selection */}
            {currentStep === 'role' && (
              <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
                <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">Select AI Role</h2>
                <p className="text-sm text-[var(--muted)] mb-6">Choose how AI will assist during your broadcast</p>

                <div className="grid grid-cols-2 gap-4">
                  {aiRoles.map((role) => {
                    const RoleIcon = role.icon
                    const isSelected = selectedRole === role.id
                    return (
                      <button
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`relative p-5 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                            : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                        }`}
                      >
                        {role.recommended && (
                          <span className="absolute top-3 right-3 text-[10px] font-bold bg-[var(--secondary)] text-white px-2 py-0.5 rounded-full">
                            Recommended
                          </span>
                        )}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                          isSelected ? 'bg-[var(--secondary)]/20' : 'bg-[var(--background)]'
                        }`}>
                          <RoleIcon size={24} className={isSelected ? 'text-[var(--secondary)]' : 'text-[var(--muted)]'} />
                        </div>
                        <h3 className="font-semibold text-[var(--foreground)] mb-1">{role.title}</h3>
                        <p className="text-sm text-[var(--muted)] mb-4">{role.description}</p>
                        <ul className="space-y-1.5">
                          {role.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs text-[var(--muted)]">
                              <Check size={12} className="text-[var(--secondary)]" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        {isSelected && (
                          <div className="absolute top-4 left-4 w-5 h-5 bg-[var(--secondary)] rounded-full flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Step 2: AI Settings */}
            {currentStep === 'settings' && (
              <>
                {/* Voice Settings (only if role needs voice) */}
                {needsVoice && (
                  <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
                    <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6">Voice Settings</h2>

                    {/* Voice Style */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-[var(--foreground)] mb-3">Voice Style</label>
                      <div className="grid grid-cols-4 gap-3">
                        {voiceStyles.map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setVoiceStyle(style.id)}
                            className={`p-3 rounded-xl border-2 text-left transition-all ${
                              voiceStyle === style.id
                                ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                                : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                            }`}
                          >
                            <p className="font-medium text-sm text-[var(--foreground)] mb-0.5">{style.label}</p>
                            <p className="text-xs text-[var(--muted)]">{style.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Voice Selection */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--foreground)] mb-3">Voice Selection</label>
                      <div className="grid grid-cols-3 gap-3">
                        {voices.map((voice) => (
                          <div
                            key={voice.id}
                            onClick={() => setSelectedVoice(voice.id)}
                            className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                              selectedVoice === voice.id
                                ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                                : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                selectedVoice === voice.id ? 'bg-[var(--secondary)]/20' : 'bg-[var(--background)]'
                              }`}>
                                <Volume2 size={18} className={selectedVoice === voice.id ? 'text-[var(--secondary)]' : 'text-[var(--muted)]'} />
                              </div>
                              <div>
                                <p className="font-medium text-[var(--foreground)]">{voice.name}</p>
                                <p className="text-xs text-[var(--muted)]">{voice.gender} / {voice.language}</p>
                              </div>
                            </div>
                            <button
                              onClick={(e) => e.stopPropagation()}
                              className="mt-3 flex items-center gap-1.5 text-xs text-[var(--secondary)] hover:underline"
                            >
                              <Play size={12} />
                              Preview
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Interaction Settings */}
                <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
                  <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6">AI Interaction Settings</h2>

                  {/* Frequency */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-3">AI Participation Level</label>
                    <div className="space-y-2">
                      {frequencyOptions.map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                            frequency === option.id
                              ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                              : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="frequency"
                            checked={frequency === option.id}
                            onChange={() => setFrequency(option.id)}
                            className="accent-[var(--secondary)]"
                          />
                          <div>
                            <p className="font-medium text-[var(--foreground)]">{option.label}</p>
                            <p className="text-xs text-[var(--muted)]">{option.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Auto Response Scope */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-3">Auto Response Scope</label>
                    <div className="space-y-2">
                      {[
                        { key: 'productInfo', label: 'Product Info', desc: 'Price, specs, stock' },
                        { key: 'shipping', label: 'Shipping/Returns', desc: 'Delivery and return inquiries' },
                        { key: 'generalQuestions', label: 'General Questions', desc: 'Other viewer questions' },
                      ].map((item) => (
                        <label
                          key={item.key}
                          className="flex items-center justify-between p-4 bg-[var(--background)] rounded-xl cursor-pointer"
                        >
                          <div>
                            <p className="font-medium text-[var(--foreground)]">{item.label}</p>
                            <p className="text-xs text-[var(--muted)]">{item.desc}</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={autoResponse[item.key as keyof typeof autoResponse]}
                            onChange={(e) => setAutoResponse(prev => ({ ...prev, [item.key]: e.target.checked }))}
                            className="w-5 h-5 accent-[var(--secondary)]"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* AI Features */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-3">AI Features</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { key: 'purchaseAlert', label: 'Purchase Alert', desc: '"User X just purchased!"' },
                        { key: 'cartAlert', label: 'Cart Alert', desc: '"50 people adding to cart!"' },
                        { key: 'chatHighlight', label: 'Chat Highlight', desc: 'Highlight repeated questions' },
                        { key: 'realTimeTranslation', label: 'Real-time Translation', desc: 'Multi-language subtitles' },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between p-4 bg-[var(--background)] rounded-xl"
                        >
                          <div>
                            <p className="text-sm font-medium text-[var(--foreground)]">{item.label}</p>
                            <p className="text-xs text-[var(--muted)]">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => setFeatures(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof features] }))}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              features[item.key as keyof typeof features] ? 'bg-[var(--secondary)]' : 'bg-[var(--border-color)]'
                            }`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                              features[item.key as keyof typeof features] ? 'translate-x-6' : 'translate-x-0.5'
                            }`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Broadcast Connect */}
            {currentStep === 'connect' && (
              <>
                {/* Platform Selection */}
                <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
                  <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">Broadcast Platforms</h2>
                  <p className="text-sm text-[var(--muted)] mb-6">Select platforms to stream to</p>

                  <div className="grid grid-cols-3 gap-3">
                    {platforms.map((platform) => {
                      const PlatformIcon = platform.icon
                      const isSelected = selectedPlatforms.includes(platform.id)
                      return (
                        <button
                          key={platform.id}
                          onClick={() => togglePlatform(platform.id)}
                          disabled={!platform.connected}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            !platform.connected
                              ? 'opacity-50 cursor-not-allowed border-[var(--border-color)]'
                              : isSelected
                                ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                                : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <PlatformIcon size={20} className={isSelected ? 'text-[var(--secondary)]' : 'text-[var(--muted)]'} />
                            {platform.connected ? (
                              isSelected && <Check size={16} className="text-[var(--secondary)]" />
                            ) : (
                              <span className="text-[10px] bg-[var(--background)] px-1.5 py-0.5 rounded text-[var(--muted)]">Connect</span>
                            )}
                          </div>
                          <p className="text-sm font-medium text-[var(--foreground)]">{platform.label}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Product Connect */}
                <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold text-[var(--foreground)]">Product Integration</h2>
                      <p className="text-sm text-[var(--muted)]">Connect products for AI to reference</p>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <span className="text-sm text-[var(--foreground)]">Enable Products</span>
                      <button
                        onClick={() => setProductEnabled(!productEnabled)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          productEnabled ? 'bg-[var(--secondary)]' : 'bg-[var(--border-color)]'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          productEnabled ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </label>
                  </div>

                  {productEnabled && (
                    <>
                      <p className="text-sm text-[var(--muted)] mb-3">Connected Store: Coupang Partners</p>
                      <div className="space-y-2">
                        {products.map((product) => {
                          const isSelected = selectedProducts.includes(product.id)
                          return (
                            <div
                              key={product.id}
                              onClick={() => toggleProduct(product.id)}
                              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                isSelected
                                  ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                                  : 'border-[var(--border-color)] hover:border-[var(--secondary)]/50'
                              }`}
                            >
                              <div className="w-12 h-12 bg-[var(--background)] rounded-lg flex items-center justify-center">
                                <ShoppingBag size={20} className="text-[var(--secondary)]" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-[var(--foreground)]">{product.name}</p>
                                <p className="text-sm text-[var(--secondary)] font-semibold">
                                  ${(product.price / 1000).toFixed(2)}
                                </p>
                              </div>
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                isSelected
                                  ? 'border-[var(--secondary)] bg-[var(--secondary)]'
                                  : 'border-[var(--border-color)]'
                              }`}>
                                {isSelected && <Check size={12} className="text-white" />}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <button className="mt-4 text-sm text-[var(--secondary)] hover:underline">
                        Change Products
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Right Sidebar - Summary */}
          <div className="space-y-6">
            {/* Settings Summary */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-5">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">Settings Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--muted)]">AI Role</span>
                  <span className="font-medium text-[var(--foreground)]">
                    {selectedRoleData?.title || 'Not selected'}
                  </span>
                </div>
                {needsVoice && selectedRole && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--muted)]">Voice</span>
                    <span className="font-medium text-[var(--foreground)]">
                      {voices.find(v => v.id === selectedVoice)?.name} / {voiceStyles.find(s => s.id === voiceStyle)?.label}
                    </span>
                  </div>
                )}
                {selectedRole && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--muted)]">Participation</span>
                    <span className="font-medium text-[var(--foreground)]">
                      {frequencyOptions.find(f => f.id === frequency)?.label}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--muted)]">Platforms</span>
                  <span className="font-medium text-[var(--foreground)]">
                    {selectedPlatforms.length > 0
                      ? selectedPlatforms.map(p => platforms.find(pl => pl.id === p)?.label).join(', ')
                      : '-'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--muted)]">Products</span>
                  <span className="font-medium text-[var(--foreground)]">
                    {productEnabled ? `${selectedProducts.length} items` : '-'}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border-color)]">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-[var(--muted)]">Est. Credits</span>
                  <span className="font-semibold text-[var(--secondary)]">450 credits/hour</span>
                </div>
                <p className="text-xs text-[var(--muted)]">Remaining: 2,450 credits</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {currentStep !== 'connect' ? (
                <>
                  <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="w-full py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] disabled:bg-[var(--border-color)] disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    Next Step
                    <ChevronRight size={18} />
                  </button>
                  {currentStepIndex > 0 && (
                    <button
                      onClick={prevStep}
                      className="w-full py-3 bg-[var(--background)] border border-[var(--border-color)] text-[var(--foreground)] rounded-xl font-medium transition-colors"
                    >
                      Previous Step
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button
                    disabled={!canProceed()}
                    className="w-full py-3 bg-[var(--accent)] hover:bg-[#e63950] disabled:bg-[var(--border-color)] disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Radio size={18} />
                    Start Broadcast with AI
                  </button>
                  <button
                    onClick={prevStep}
                    className="w-full py-3 bg-[var(--background)] border border-[var(--border-color)] text-[var(--foreground)] rounded-xl font-medium transition-colors"
                  >
                    Previous Step
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
