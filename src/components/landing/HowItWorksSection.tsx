'use client'

import { useState } from 'react'
import { Link2, Upload, Radio, Calendar, Image, Package, Clock, Youtube, Facebook, Instagram, Plus, Check } from 'lucide-react'

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      number: '01',
      icon: Link2,
      title: 'Connect Your Channels',
      description: 'Link your YouTube, Facebook, Instagram, TikTok, and other accounts with secure OAuth authentication.',
      detail: 'One-time setup, automatic token refresh',
    },
    {
      number: '02',
      icon: Upload,
      title: 'Upload or Go Live',
      description: 'Upload pre-recorded videos or start a real-time broadcast directly from your browser.',
      detail: 'Support for 10GB videos, up to 4 hours',
    },
    {
      number: '03',
      icon: Calendar,
      title: 'Schedule & Configure',
      description: 'Set your broadcast time, add products for live commerce, and customize settings per platform.',
      detail: 'Global timezone support',
    },
    {
      number: '04',
      icon: Radio,
      title: 'Stream Everywhere',
      description: 'Go live on all platforms simultaneously. Monitor performance in real-time from one dashboard.',
      detail: '6+ platforms at once',
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-6 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-[var(--secondary)] mb-4 block">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            Start streaming in 4 simple steps
          </h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            From setup to live in minutes. No technical expertise required.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-[var(--border-color)] -translate-x-1/2 z-0" />
              )}

              <div className="relative bg-white rounded-2xl p-6 border border-[var(--border-color)] h-full">
                {/* Number badge */}
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-[var(--secondary)] text-white rounded-xl flex items-center justify-center font-bold text-sm">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center mb-4 mt-2">
                  <step.icon size={24} className="text-[var(--secondary)]" />
                </div>

                {/* Content */}
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--muted)] mb-4">{step.description}</p>

                {/* Detail badge */}
                <span className="inline-block text-xs bg-[var(--background)] px-2 py-1 rounded-full text-[var(--muted)]">
                  {step.detail}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Demo */}
        <div className="mt-16 bg-white rounded-2xl border border-[var(--border-color)] overflow-hidden">
          <div className="grid lg:grid-cols-5">
            {/* Step indicator sidebar */}
            <div className="lg:col-span-1 bg-[var(--background)] p-6 border-r border-[var(--border-color)]">
              <p className="text-xs text-[var(--muted)] mb-4 uppercase tracking-wider">Stream Setup</p>
              {['Stream Type', 'Details', 'Products', 'Schedule'].map((label, i) => (
                <button
                  key={label}
                  onClick={() => setActiveStep(i)}
                  className={`flex items-center gap-3 py-3 w-full text-left transition-colors ${
                    i === activeStep ? 'text-[var(--secondary)]' : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                    i === activeStep ? 'bg-[var(--secondary)] text-white' : i < activeStep ? 'bg-[var(--success)] text-white' : 'bg-[var(--border-color)]'
                  }`}>
                    {i < activeStep ? <Check size={12} /> : i + 1}
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>

            {/* Main content */}
            <div className="lg:col-span-4 p-8">
              {/* Step 1: Stream Type */}
              {activeStep === 0 && (
                <>
                  <h4 className="text-lg font-semibold mb-6">Choose Stream Type</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-6 border-2 border-[var(--secondary)] rounded-xl bg-[var(--secondary)]/5">
                      <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center mb-4">
                        <Upload size={24} className="text-[var(--secondary)]" />
                      </div>
                      <h5 className="font-semibold mb-2">Pre-recorded Live Stream</h5>
                      <p className="text-sm text-[var(--muted)]">
                        Upload a video and stream it as live content with all the engagement benefits.
                      </p>
                    </div>
                    <div className="p-6 border border-[var(--border-color)] rounded-xl hover:border-[var(--secondary)] transition-colors cursor-pointer">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                        <Radio size={24} className="text-[var(--muted)]" />
                      </div>
                      <h5 className="font-semibold mb-2">Live Stream</h5>
                      <p className="text-sm text-[var(--muted)]">
                        Go live in real-time with your camera or screen directly to all platforms.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: Details */}
              {activeStep === 1 && (
                <>
                  <h4 className="text-lg font-semibold mb-6">Stream Details</h4>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">Stream Title</label>
                      <input
                        type="text"
                        placeholder="Enter your stream title..."
                        defaultValue="New Product Launch - Winter Collection 2026"
                        className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        rows={3}
                        placeholder="Describe your stream..."
                        defaultValue="Join us for an exclusive look at our new winter collection. Live Q&A and special discounts for viewers!"
                        className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)] resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Thumbnail</label>
                      <div className="flex items-start gap-4">
                        <div className="w-40 h-24 bg-gradient-to-br from-[var(--secondary)]/20 to-[var(--primary)]/20 rounded-lg flex items-center justify-center border border-[var(--border-color)]">
                          <Image size={24} className="text-[var(--muted)]" />
                        </div>
                        <div className="flex-1">
                          <button className="px-4 py-2 border border-[var(--border-color)] rounded-lg text-sm font-medium hover:border-[var(--secondary)] transition-colors">
                            Upload Image
                          </button>
                          <p className="text-xs text-[var(--muted)] mt-2">Recommended: 1280x720px (16:9 ratio)</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <select className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]">
                        <option>Shopping & Retail</option>
                        <option>Entertainment</option>
                        <option>Education</option>
                        <option>Gaming</option>
                        <option>Music</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: Products */}
              {activeStep === 2 && (
                <>
                  <h4 className="text-lg font-semibold mb-6">Link Products</h4>
                  <p className="text-sm text-[var(--muted)] mb-4">Add products to feature during your live commerce stream.</p>

                  <div className="space-y-3 mb-6">
                    {[
                      { name: 'Winter Jacket - Navy Blue', price: '$189.00', stock: '24 in stock' },
                      { name: 'Wool Scarf Set', price: '$45.00', stock: '56 in stock' },
                      { name: 'Leather Boots - Brown', price: '$229.00', stock: '12 in stock' },
                    ].map((product, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-[var(--background)] rounded-lg border border-[var(--border-color)]">
                        <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
                          <Package size={20} className="text-[var(--secondary)]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-[var(--muted)]">{product.stock}</p>
                        </div>
                        <p className="text-sm font-semibold">{product.price}</p>
                        <button className="p-1 text-[var(--accent)] hover:bg-[var(--accent)]/10 rounded">
                          <span className="text-lg">&times;</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  <button className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-[var(--border-color)] rounded-lg text-sm text-[var(--muted)] hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-colors w-full justify-center">
                    <Plus size={16} />
                    Add More Products
                  </button>

                  <div className="mt-6 p-4 bg-[var(--secondary)]/5 rounded-lg border border-[var(--secondary)]/20">
                    <p className="text-sm font-medium text-[var(--secondary)]">Live Commerce Tip</p>
                    <p className="text-xs text-[var(--muted)] mt-1">Products will appear as clickable overlays during your stream. Viewers can purchase directly without leaving the stream.</p>
                  </div>
                </>
              )}

              {/* Step 4: Schedule */}
              {activeStep === 3 && (
                <>
                  <h4 className="text-lg font-semibold mb-6">Schedule Your Stream</h4>

                  <div className="grid md:grid-cols-2 gap-5 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Date</label>
                      <div className="relative">
                        <input
                          type="text"
                          defaultValue="January 15, 2026"
                          className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                        />
                        <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Time</label>
                      <div className="relative">
                        <input
                          type="text"
                          defaultValue="7:00 PM"
                          className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                        />
                        <Clock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Timezone</label>
                    <select className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]">
                      <option>Asia/Seoul (GMT+9)</option>
                      <option>America/New_York (GMT-5)</option>
                      <option>Europe/London (GMT+0)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Target Platforms</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { name: 'YouTube', icon: Youtube, selected: true },
                        { name: 'Facebook', icon: Facebook, selected: true },
                        { name: 'Instagram', icon: Instagram, selected: false },
                      ].map((platform) => (
                        <div
                          key={platform.name}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                            platform.selected
                              ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                              : 'border-[var(--border-color)] hover:border-[var(--secondary)]'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            platform.selected ? 'bg-[var(--secondary)]/10' : 'bg-gray-100'
                          }`}>
                            <platform.icon size={16} className={platform.selected ? 'text-[var(--secondary)]' : 'text-[var(--muted)]'} />
                          </div>
                          <span className="text-sm font-medium">{platform.name}</span>
                          {platform.selected && (
                            <Check size={14} className="text-[var(--secondary)] ml-auto" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-[var(--background)] rounded-lg border border-[var(--border-color)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Estimated Reach</p>
                        <p className="text-xs text-[var(--muted)]">Based on your connected channels</p>
                      </div>
                      <p className="text-2xl font-bold text-[var(--secondary)]">~45K</p>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  className={`px-6 py-2.5 border border-[var(--border-color)] rounded-lg font-medium text-sm transition-colors hover:border-[var(--secondary)] ${
                    activeStep === 0 ? 'invisible' : ''
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setActiveStep(Math.min(3, activeStep + 1))}
                  className="px-6 py-2.5 bg-[var(--secondary)] text-white rounded-lg font-medium text-sm hover:bg-[#7c4fe0] transition-colors"
                >
                  {activeStep === 3 ? 'Schedule Stream' : 'Next Step'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
