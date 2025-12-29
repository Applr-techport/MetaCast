'use client'

export function PlayerSection() {
  const playerFeatures = [
    {
      title: 'Player Overview',
      description: 'It is a long established fact that a reader will be distracted by the readable content while loading at its layout. The point of using.',
    },
    {
      title: 'Player SDK',
      description: 'It is a long established fact that a reader will be distracted by the readable content while loading at its layout. The point of using.',
    },
    {
      title: 'Player URL Test',
      description: 'It is a long established fact that a reader will be distracted by the readable content while loading at its layout. The point of using.',
    },
  ]

  return (
    <section className="py-20 px-6 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Player</h2>
          <p className="text-[var(--muted)]">
            We work with teams worldwide helping them live broadcast
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Player Preview */}
          <div className="flex-1 w-full">
            <div className="aspect-video bg-gray-800 rounded-2xl flex items-center justify-center">
              {/* Video player placeholder */}
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="flex-1 space-y-8">
            {playerFeatures.map((feature, index) => (
              <div key={feature.title}>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--muted)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
