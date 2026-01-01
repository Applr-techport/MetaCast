---
name: ai-studio
description: AI Studio feature development. Use when creating AI-powered tools, video generators, or content creation features.
---

# MetaCast AI Studio Rules

## AI Studio Structure

```
src/app/(dashboard)/ai-studio/
├── page.tsx                    # AI Studio dashboard
├── video-generator/
│   ├── page.tsx               # Video generator hub
│   ├── shortform/page.tsx     # Short-form video creator
│   ├── video/page.tsx         # Long-form video creator
│   ├── image-to-video/page.tsx
│   └── from-stream/page.tsx   # Create from stream recording
├── tools/
│   ├── page.tsx               # AI Tools hub
│   ├── script/page.tsx        # Script generator
│   ├── caption/page.tsx       # Caption generator
│   ├── thumbnail/page.tsx     # Thumbnail generator
│   ├── brand-voice/page.tsx   # Brand voice analyzer
│   ├── content-analyzer/page.tsx
│   └── product-description/page.tsx
└── live-stream/
    └── page.tsx               # AI-enhanced live streaming
```

## AI Tool Page Template

```tsx
'use client'

import { useState } from 'react'
import { Sparkles, Loader2, Download, Copy, RefreshCw } from 'lucide-react'

interface GeneratedContent {
  id: string
  content: string
  createdAt: Date
}

export default function AIToolPage() {
  // Input state
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('professional')

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false)
  const [results, setResults] = useState<GeneratedContent[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style })
      })

      if (!response.ok) throw new Error('Generation failed')

      const data = await response.json()
      setResults(prev => [data, ...prev])
    } catch (err) {
      setError('Failed to generate. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Tool Name</h1>
        <p className="text-[var(--muted)] mt-1">
          Description of what this tool does
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
          <h2 className="font-semibold mb-4">Input</h2>

          {/* Prompt input */}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to create..."
            className="w-full h-32 p-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg resize-none focus:outline-none focus:border-[var(--secondary)]"
          />

          {/* Options */}
          <div className="mt-4">
            <label className="block text-sm text-[var(--muted)] mb-2">Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full p-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="creative">Creative</option>
            </select>
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full mt-4 py-3 bg-[var(--secondary)] hover:bg-[#7c4fe0] disabled:opacity-50 rounded-lg flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Generate</span>
              </>
            )}
          </button>

          {error && (
            <p className="mt-3 text-sm text-[var(--accent)]">{error}</p>
          )}
        </div>

        {/* Results Panel */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
          <h2 className="font-semibold mb-4">Results</h2>

          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-[var(--muted)]">
              <Sparkles size={32} className="mb-3 opacity-50" />
              <p>Generated content will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((result) => (
                <ResultCard key={result.id} result={result} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ResultCard({ result }: { result: GeneratedContent }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(result.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-4 bg-[var(--background)] rounded-lg">
      <p className="whitespace-pre-wrap">{result.content}</p>

      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[var(--border-color)]">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-3 py-1 text-sm hover:bg-[var(--card-bg)] rounded"
        >
          <Copy size={14} />
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
        <button className="flex items-center gap-1 px-3 py-1 text-sm hover:bg-[var(--card-bg)] rounded">
          <Download size={14} />
          <span>Save</span>
        </button>
        <button className="flex items-center gap-1 px-3 py-1 text-sm hover:bg-[var(--card-bg)] rounded">
          <RefreshCw size={14} />
          <span>Regenerate</span>
        </button>
      </div>
    </div>
  )
}
```

## Video Generator Template

```tsx
'use client'

import { useState } from 'react'
import { Upload, Play, Pause, Download, Folder } from 'lucide-react'

type GenerationStep = 'input' | 'processing' | 'preview' | 'complete'

export default function VideoGeneratorPage() {
  const [step, setStep] = useState<GenerationStep>('input')
  const [progress, setProgress] = useState(0)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  // Save options
  const [saveToFolder, setSaveToFolder] = useState('')
  const [showFolderDropdown, setShowFolderDropdown] = useState(false)

  return (
    <div className="p-6">
      {/* Progress Steps */}
      <div className="flex items-center gap-4 mb-8">
        {['Input', 'Processing', 'Preview', 'Complete'].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              i <= ['input', 'processing', 'preview', 'complete'].indexOf(step)
                ? 'bg-[var(--secondary)] text-white'
                : 'bg-[var(--card-bg)] text-[var(--muted)]'
            }`}>
              {i + 1}
            </div>
            <span className={i <= ['input', 'processing', 'preview', 'complete'].indexOf(step)
              ? 'text-white'
              : 'text-[var(--muted)]'
            }>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 'input' && <InputStep onNext={() => setStep('processing')} />}
      {step === 'processing' && <ProcessingStep progress={progress} />}
      {step === 'preview' && <PreviewStep videoUrl={videoUrl} onNext={() => setStep('complete')} />}
      {step === 'complete' && <CompleteStep videoUrl={videoUrl} />}
    </div>
  )
}

function ProcessingStep({ progress }: { progress: number }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-64 h-2 bg-[var(--card-bg)] rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-[var(--secondary)] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-[var(--muted)]">Generating video... {progress}%</p>

      <div className="mt-8 text-sm text-[var(--muted)] space-y-2">
        <p>Analyzing content...</p>
        <p>Generating scenes...</p>
        <p>Adding transitions...</p>
        <p>Rendering final video...</p>
      </div>
    </div>
  )
}
```

## AI API Endpoint Pattern

```typescript
// src/app/api/ai/generate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  // Check auth
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check usage limits
  const { data: usage } = await supabase
    .from('user_usage')
    .select('ai_credits')
    .eq('user_id', user.id)
    .single()

  if (!usage || usage.ai_credits <= 0) {
    return NextResponse.json(
      { error: 'No AI credits remaining' },
      { status: 402 }
    )
  }

  try {
    const { prompt, style, type } = await request.json()

    // Call AI service (OpenAI, Replicate, etc.)
    const result = await generateContent({ prompt, style, type })

    // Deduct credits
    await supabase
      .from('user_usage')
      .update({ ai_credits: usage.ai_credits - 1 })
      .eq('user_id', user.id)

    // Log usage
    await supabase.from('ai_generations').insert({
      user_id: user.id,
      type,
      prompt,
      result_id: result.id,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('AI generation error:', error)
    return NextResponse.json(
      { error: 'Generation failed' },
      { status: 500 }
    )
  }
}
```

## Credit/Usage Display

```tsx
function UsageIndicator() {
  const [credits, setCredits] = useState(0)

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[var(--card-bg)] rounded-lg">
      <Sparkles size={16} className="text-[var(--secondary)]" />
      <span className="text-sm">
        <span className="font-semibold">{credits}</span>
        <span className="text-[var(--muted)]"> credits left</span>
      </span>
    </div>
  )
}
```

## Save to Assets Pattern

```tsx
// After generation complete, save to assets
const handleSaveToAssets = async () => {
  const response = await fetch('/api/assets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'video',
      url: generatedVideoUrl,
      title: `AI Generated - ${new Date().toLocaleDateString()}`,
      folder_id: saveToFolder || null,
      source: 'ai-studio',
      metadata: {
        prompt,
        style,
        generator: 'shortform'
      }
    })
  })

  if (response.ok) {
    // Show success toast
    // Redirect to assets or stay
  }
}
```

## Common AI Tool Icons

```tsx
import {
  Sparkles,      // AI/Magic
  Wand2,         // Generation
  FileVideo,     // Video
  Image,         // Image/Thumbnail
  FileText,      // Script/Text
  Captions,      // Subtitles
  Mic,           // Voice
  Languages,     // Translation
  Palette,       // Style
  Zap,           // Quick/Fast
} from 'lucide-react'
```

## Checklist

Before creating AI Studio feature:
- [ ] Show generation progress/status
- [ ] Handle errors gracefully
- [ ] Display remaining credits
- [ ] Save results to Assets option
- [ ] Folder selection for saved items
- [ ] Copy/Download/Regenerate actions
- [ ] No emojis in UI
- [ ] CSS variables only
- [ ] All text in English
