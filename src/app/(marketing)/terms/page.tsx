'use client'

import { LandingHeader, Footer } from '@/components/landing'

export default function TermsPage() {
  const lastUpdated = 'January 1, 2026'

  return (
    <main className="min-h-screen bg-white">
      <LandingHeader />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-[var(--muted)] mb-12">Last updated: {lastUpdated}</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
            <p className="text-[var(--muted)] mb-4">
              By accessing or using MetaCast's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Use License</h2>
            <p className="text-[var(--muted)] mb-4">
              Permission is granted to temporarily access and use MetaCast's services for personal, non-commercial transitory viewing only. This license does not include:
            </p>
            <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
              <li>Modifying or copying our materials</li>
              <li>Using materials for commercial purposes</li>
              <li>Attempting to reverse engineer any software</li>
              <li>Removing copyright or proprietary notations</li>
              <li>Transferring materials to another person</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Account Registration</h2>
            <p className="text-[var(--muted)] mb-4">
              To access certain features, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Subscription and Payments</h2>
            <p className="text-[var(--muted)] mb-4">
              Some services require a paid subscription. By subscribing, you agree to pay all fees associated with your chosen plan. Fees are non-refundable except as required by law or as explicitly stated in these terms.
            </p>
            <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
              <li>Subscriptions automatically renew unless cancelled</li>
              <li>Price changes will be communicated 30 days in advance</li>
              <li>You may cancel your subscription at any time</li>
              <li>Refunds are processed within 5-10 business days</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Content Guidelines</h2>
            <p className="text-[var(--muted)] mb-4">
              You are responsible for all content you stream, upload, or create using our services. You agree not to use our services for:
            </p>
            <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
              <li>Illegal or harmful activities</li>
              <li>Infringing intellectual property rights</li>
              <li>Distributing malware or harmful code</li>
              <li>Harassment or abuse of others</li>
              <li>Spam or unsolicited advertising</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Intellectual Property</h2>
            <p className="text-[var(--muted)] mb-4">
              MetaCast and its licensors retain all intellectual property rights in the services. You retain ownership of content you create, but grant us a license to use, store, and display such content as necessary to provide our services.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
            <p className="text-[var(--muted)] mb-4">
              MetaCast shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services. Our total liability shall not exceed the amount paid by you in the twelve months preceding the claim.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Termination</h2>
            <p className="text-[var(--muted)] mb-4">
              We may terminate or suspend your account immediately, without prior notice, for any breach of these Terms. Upon termination, your right to use our services will immediately cease.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to Terms</h2>
            <p className="text-[var(--muted)] mb-4">
              We reserve the right to modify these terms at any time. We will notify you of significant changes via email or through our services. Your continued use after changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Information</h2>
            <p className="text-[var(--muted)] mb-4">
              For questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-[var(--muted)]">
              Email: legal@metacast.io<br />
              Address: Seoul, South Korea
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
