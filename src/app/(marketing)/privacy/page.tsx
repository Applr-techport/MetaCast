'use client'

import { LandingHeader, Footer } from '@/components/landing'

export default function PrivacyPage() {
  const lastUpdated = 'January 1, 2026'

  return (
    <main className="min-h-screen bg-white">
      <LandingHeader />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-[var(--muted)] mb-12">Last updated: {lastUpdated}</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p className="text-[var(--muted)] mb-4">
              MetaCast Inc. ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our streaming platform and related services.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            <h3 className="text-lg font-medium mt-6 mb-3">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
              <li>Account information (name, email, password)</li>
              <li>Profile information (avatar, bio, social links)</li>
              <li>Payment information (processed securely via Stripe)</li>
              <li>Content you create (streams, videos, comments)</li>
              <li>Communications with our support team</li>
            </ul>

            <h3 className="text-lg font-medium mt-6 mb-3">2.2 Information Collected Automatically</h3>
            <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
              <li>Device information (IP address, browser type, OS)</li>
              <li>Usage data (pages visited, features used, time spent)</li>
              <li>Streaming analytics (viewer counts, watch time, engagement)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="text-[var(--muted)] mb-4">We use collected information to:</p>
            <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
              <li>Provide and maintain our services</li>
              <li>Process transactions and send related information</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Analyze usage to improve our services</li>
              <li>Detect, prevent, and address technical issues</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Information Sharing</h2>
            <p className="text-[var(--muted)] mb-4">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
              <li>Service providers who assist in our operations</li>
              <li>Connected platforms (YouTube, Facebook) when you authorize</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners with your consent</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p className="text-[var(--muted)] mb-4">
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
              <li>SSL/TLS encryption for data in transit</li>
              <li>AES-256 encryption for data at rest</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls and employee training</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Your Rights</h2>
            <p className="text-[var(--muted)] mb-4">Depending on your location, you may have rights to:</p>
            <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your data</li>
              <li>Export your data</li>
              <li>Object to certain processing</li>
              <li>Withdraw consent</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Cookies</h2>
            <p className="text-[var(--muted)] mb-4">
              We use cookies and similar technologies for authentication, preferences, analytics, and advertising. You can control cookies through your browser settings, though some features may not function properly without them.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Data Retention</h2>
            <p className="text-[var(--muted)] mb-4">
              We retain your information for as long as your account is active or as needed to provide services. After account deletion, we may retain certain information for legal compliance, dispute resolution, and fraud prevention.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">9. International Transfers</h2>
            <p className="text-[var(--muted)] mb-4">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers in compliance with applicable laws.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">10. Children's Privacy</h2>
            <p className="text-[var(--muted)] mb-4">
              Our services are not intended for users under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">11. Changes to This Policy</h2>
            <p className="text-[var(--muted)] mb-4">
              We may update this Privacy Policy from time to time. We will notify you of significant changes via email or through our services. Your continued use after changes constitutes acceptance.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">12. Contact Us</h2>
            <p className="text-[var(--muted)] mb-4">
              For privacy-related questions or to exercise your rights:
            </p>
            <p className="text-[var(--muted)]">
              Email: privacy@metacast.io<br />
              Data Protection Officer: dpo@metacast.io<br />
              Address: Seoul, South Korea
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
