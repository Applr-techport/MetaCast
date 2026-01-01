'use client'

import Link from 'next/link'

export function BroadcastSection() {
  const broadcastFeatures = [
    {
      title: 'Live Streaming',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using is that the distribution of letters, as opposed to using it have here, content here.',
    },
    {
      title: 'Snack Video',
      description: 'It is a long established fact that a reader will be distracted by the readable content at page when looking at its layout. The point of using is that the distribution of letters, as opposed to using it have here.',
    },
    {
      title: 'M1',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The distribution of using Lorem Ipsum is that it the letters, as opposed to using it have here.',
    },
    {
      title: 'AR',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point distribution of letters, as opposed to using it have here.',
    },
    {
      title: 'Broadcast SDK',
      description: 'It is a long established fact that a reader will be distracted by the readable content at page when looking at its layout. The point of using is that the distribution of letters, as opposed to using it have here.',
    },
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Broadcast Application</h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            Save time and effort. Focus on creating powerful videos on MetaCast Live.
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-16">
          {broadcastFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}
            >
              {/* Image Placeholder */}
              <div className="flex-1 w-full">
                <div className="aspect-video bg-gray-100 rounded-2xl" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-[var(--muted)] mb-6">{feature.description}</p>
                {/* Pagination dots */}
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-[var(--primary)]' : 'bg-gray-200'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Download Button */}
        <div className="text-center mt-16">
          <Link
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white rounded-xl font-medium transition-colors"
          >
            Download here
          </Link>
        </div>
      </div>
    </section>
  )
}
