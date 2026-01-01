'use client'

import { CheckCircle, AlertCircle, Clock } from 'lucide-react'
import { LandingHeader, Footer } from '@/components/landing'

export default function StatusPage() {
  const services = [
    { name: 'Streaming API', status: 'operational', uptime: '99.99%' },
    { name: 'Dashboard', status: 'operational', uptime: '99.98%' },
    { name: 'AI Studio', status: 'operational', uptime: '99.95%' },
    { name: 'YouTube Integration', status: 'operational', uptime: '99.97%' },
    { name: 'Facebook Integration', status: 'operational', uptime: '99.96%' },
    { name: 'Twitch Integration', status: 'operational', uptime: '99.99%' },
    { name: 'Analytics', status: 'operational', uptime: '99.94%' },
    { name: 'Webhooks', status: 'operational', uptime: '99.98%' },
  ]

  const incidents = [
    {
      date: 'December 28, 2025',
      title: 'Scheduled Maintenance',
      status: 'resolved',
      description: 'Scheduled database maintenance completed successfully. No impact to streaming services.',
    },
    {
      date: 'December 15, 2025',
      title: 'AI Studio Degraded Performance',
      status: 'resolved',
      description: 'Some users experienced slow response times in AI Studio. Issue identified and resolved within 30 minutes.',
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle size={20} className="text-green-500" />
      case 'degraded': return <AlertCircle size={20} className="text-yellow-500" />
      case 'outage': return <AlertCircle size={20} className="text-red-500" />
      default: return <Clock size={20} className="text-gray-500" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'operational': return 'Operational'
      case 'degraded': return 'Degraded'
      case 'outage': return 'Outage'
      default: return status
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <LandingHeader />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full mb-6">
            <CheckCircle size={18} />
            <span className="text-sm font-medium">All Systems Operational</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">System Status</h1>
          <p className="text-lg text-[var(--muted)]">
            Real-time status of MetaCast services and infrastructure.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Services</h2>
          <div className="bg-white rounded-xl border border-[var(--border-color)] divide-y divide-[var(--border-color)]">
            {services.map((service) => (
              <div key={service.name} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(service.status)}
                  <span className="font-medium">{service.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[var(--muted)]">{service.uptime} uptime</span>
                  <span className="text-sm text-green-600 font-medium">{getStatusLabel(service.status)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Uptime Graph Placeholder */}
      <section className="py-12 px-6 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-6">90-Day Uptime</h2>
          <div className="bg-white rounded-xl border border-[var(--border-color)] p-6">
            <div className="flex gap-1">
              {Array.from({ length: 90 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-8 bg-green-500 rounded-sm"
                  title={`Day ${90 - i}: 100% uptime`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-[var(--muted)]">
              <span>90 days ago</span>
              <span>Today</span>
            </div>
          </div>
        </div>
      </section>

      {/* Incidents */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Past Incidents</h2>
          <div className="space-y-4">
            {incidents.map((incident, index) => (
              <div key={index} className="bg-white rounded-xl border border-[var(--border-color)] p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{incident.title}</h3>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Resolved</span>
                </div>
                <p className="text-sm text-[var(--muted)] mb-2">{incident.date}</p>
                <p className="text-sm">{incident.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
