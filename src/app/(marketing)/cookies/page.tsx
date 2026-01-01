'use client'

import { LandingHeader, Footer } from '@/components/landing'

export default function CookiesPage() {
  const lastUpdated = 'January 1, 2026'

  return (
    <main className="min-h-screen bg-white">
      <LandingHeader />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-[var(--muted)] mb-12">Last updated: {lastUpdated}</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-xl font-semibold mt-8 mb-4">1. What Are Cookies</h2>
            <p className="text-[var(--muted)] mb-4">
              Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences and improve your browsing experience.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Cookies</h2>
            <p className="text-[var(--muted)] mb-4">
              MetaCast uses cookies for the following purposes:
            </p>

            <h3 className="text-lg font-medium mt-6 mb-3">2.1 Essential Cookies</h3>
            <p className="text-[var(--muted)] mb-4">
              These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
            </p>
            <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
              <li>Authentication and login status</li>
              <li>Security tokens</li>
              <li>Session management</li>
            </ul>

            <h3 className="text-lg font-medium mt-6 mb-3">2.2 Analytics Cookies</h3>
            <p className="text-[var(--muted)] mb-4">
              These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
            </p>
            <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
              <li>Page views and navigation patterns</li>
              <li>Feature usage statistics</li>
              <li>Performance metrics</li>
            </ul>

            <h3 className="text-lg font-medium mt-6 mb-3">2.3 Functional Cookies</h3>
            <p className="text-[var(--muted)] mb-4">
              These cookies enable personalized features and remember your preferences.
            </p>
            <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
              <li>Language and region preferences</li>
              <li>Theme settings (dark/light mode)</li>
              <li>Dashboard customizations</li>
            </ul>

            <h3 className="text-lg font-medium mt-6 mb-3">2.4 Marketing Cookies</h3>
            <p className="text-[var(--muted)] mb-4">
              These cookies track your online activity to help advertisers deliver more relevant advertising. They may be set by third-party advertising networks.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Third-Party Cookies</h2>
            <p className="text-[var(--muted)] mb-4">
              We may use services from third parties that set their own cookies:
            </p>
            <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
              <li>Google Analytics - for website analytics</li>
              <li>Stripe - for payment processing</li>
              <li>Intercom - for customer support</li>
              <li>Social media platforms - for sharing features</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Managing Cookies</h2>
            <p className="text-[var(--muted)] mb-4">
              You can control and manage cookies in several ways:
            </p>
            <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
              <li>Browser settings - Most browsers allow you to block or delete cookies</li>
              <li>Cookie consent banner - Adjust your preferences when you first visit our site</li>
              <li>Account settings - Manage certain cookie preferences in your account</li>
            </ul>
            <p className="text-[var(--muted)] mb-4">
              Please note that blocking some cookies may affect your experience on our website and limit functionality.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Cookie Duration</h2>
            <p className="text-[var(--muted)] mb-4">
              Cookies have different lifespans:
            </p>
            <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
              <li>Session cookies - Deleted when you close your browser</li>
              <li>Persistent cookies - Remain until their expiration date or until you delete them</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Updates to This Policy</h2>
            <p className="text-[var(--muted)] mb-4">
              We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Contact Us</h2>
            <p className="text-[var(--muted)] mb-4">
              If you have questions about our use of cookies, please contact us at:
            </p>
            <p className="text-[var(--muted)]">
              Email: privacy@metacast.io
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
