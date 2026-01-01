import {
  LandingHeader,
  HeroSection,
  ProblemSection,
  FeaturesSection,
  AIStudioSection,
  UseCasesSection,
  HowItWorksSection,
  TestimonialsSection,
  CTASection,
  Footer,
} from '@/components/landing'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <LandingHeader />
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <AIStudioSection />
      <UseCasesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
