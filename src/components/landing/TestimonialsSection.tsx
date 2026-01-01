'use client'

import { Star, Quote } from 'lucide-react'

export function TestimonialsSection() {
  const stats = [
    { value: '10,000+', label: 'Active Creators' },
    { value: '1M+', label: 'Streams Delivered' },
    { value: '50M+', label: 'Total Views' },
    { value: '99.9%', label: 'Uptime' },
  ]

  const testimonials = [
    {
      quote: 'The AI actually learned my brand voice. After 2 weeks, the content suggestions felt like something I would write myself.',
      name: 'Sarah Kim',
      role: 'YouTuber, 500K subscribers',
      rating: 5,
      highlight: 'Brand learning',
    },
    {
      quote: 'I was skeptical about AI content, but MetaCast lets me review everything before publishing. Full control with AI speed.',
      name: 'James Park',
      role: 'Marketing Agency CEO',
      rating: 5,
      highlight: 'Full control',
    },
    {
      quote: 'The AI recommendations helped us increase engagement by 180%. It suggested posting times I never would have guessed.',
      name: 'Min Ji Lee',
      role: 'E-commerce Brand Owner',
      rating: 5,
      highlight: '180% engagement',
    },
  ]

  return (
    <section id="testimonials" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-[var(--background)] rounded-2xl"
            >
              <p className="text-3xl md:text-4xl font-bold text-[var(--secondary)] mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-[var(--muted)]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-[var(--secondary)] mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            Loved by creators worldwide
          </h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            See what our users have to say about their experience with MetaCast.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white p-6 rounded-2xl border border-[var(--border-color)] hover:shadow-lg transition-shadow"
            >
              {/* Quote icon */}
              <Quote size={32} className="text-[var(--secondary)]/20 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[var(--secondary)] text-[var(--secondary)]" />
                ))}
              </div>

              {/* Highlight badge */}
              {testimonial.highlight && (
                <div className="inline-flex items-center px-2 py-0.5 bg-[var(--secondary)]/10 rounded text-[10px] font-medium text-[var(--secondary)] mb-3">
                  {testimonial.highlight}
                </div>
              )}

              {/* Quote */}
              <p className="text-[var(--foreground)] mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-[var(--secondary)]">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-sm">{testimonial.name}</p>
                  <p className="text-xs text-[var(--muted)]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
