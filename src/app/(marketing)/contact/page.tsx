'use client'

import { useState } from 'react'
import { Mail, MessageCircle, MapPin, Phone, Send, Clock } from 'lucide-react'
import { LandingHeader, Footer } from '@/components/landing'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      description: 'General inquiries',
      value: 'support@metacast.io',
      href: 'mailto:support@metacast.io',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Available 24/7',
      value: 'Start a conversation',
      href: '#chat',
    },
    {
      icon: MapPin,
      title: 'Office',
      description: 'Visit us',
      value: 'Seoul, South Korea',
      href: '#',
    },
  ]

  const departments = [
    { label: 'General Inquiry', email: 'support@metacast.io' },
    { label: 'Sales', email: 'sales@metacast.io' },
    { label: 'Technical Support', email: 'tech@metacast.io' },
    { label: 'Press & Media', email: 'press@metacast.io' },
    { label: 'Partnerships', email: 'partners@metacast.io' },
  ]

  return (
    <main className="min-h-screen bg-white">
      <LandingHeader />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-[var(--muted)]">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method) => {
              const Icon = method.icon
              return (
                <a
                  key={method.title}
                  href={method.href}
                  className="flex items-start gap-4 p-6 border border-[var(--border-color)] rounded-xl hover:border-[var(--secondary)] transition-colors group"
                >
                  <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={24} className="text-[var(--secondary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-[var(--secondary)] transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-sm text-[var(--muted)] mb-2">{method.description}</p>
                    <p className="text-sm font-medium text-[var(--secondary)]">{method.value}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-6 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white border border-[var(--border-color)] rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:border-[var(--secondary)]"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:border-[var(--secondary)]"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:border-[var(--secondary)]"
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales Question</option>
                    <option value="billing">Billing Issue</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:border-[var(--secondary)] resize-none"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[var(--secondary)] text-white rounded-lg font-medium hover:bg-[#7c4fe0] transition-colors"
                >
                  Send Message
                  <Send size={18} />
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-8">
              {/* Response Time */}
              <div className="bg-white border border-[var(--border-color)] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={24} className="text-[var(--secondary)]" />
                  <h3 className="font-semibold">Response Time</h3>
                </div>
                <p className="text-[var(--muted)] text-sm">
                  We typically respond within 24 hours during business days. For urgent issues, please use our live chat for immediate assistance.
                </p>
              </div>

              {/* Departments */}
              <div className="bg-white border border-[var(--border-color)] rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Contact by Department</h3>
                <div className="space-y-3">
                  {departments.map((dept) => (
                    <div key={dept.label} className="flex items-center justify-between py-2 border-b border-[var(--border-color)] last:border-0">
                      <span className="text-sm">{dept.label}</span>
                      <a href={`mailto:${dept.email}`} className="text-sm text-[var(--secondary)] hover:underline">
                        {dept.email}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white border border-[var(--border-color)] rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM KST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">Saturday</span>
                    <span>10:00 AM - 4:00 PM KST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">Sunday</span>
                    <span className="text-[var(--muted)]">Closed</span>
                  </div>
                </div>
                <p className="text-xs text-[var(--muted)] mt-4">
                  Live chat support is available 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
