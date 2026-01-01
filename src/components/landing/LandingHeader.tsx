'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Features', href: '/#features' },
    { label: 'Use Cases', href: '/#use-cases' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Testimonials', href: '/#testimonials' },
    { label: 'Pricing', href: '/pricing' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/metacast.png"
              alt="MetaCast"
              width={160}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[var(--muted)] hover:text-[var(--secondary)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm text-[var(--foreground)] hover:text-[var(--secondary)] transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-full text-sm font-medium transition-colors"
            >
              Start Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[var(--border-color)]">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="py-3 text-sm text-[var(--foreground)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-[var(--border-color)]">
                <Link
                  href="/login"
                  className="text-sm text-center py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="py-2.5 bg-[var(--secondary)] text-white rounded-full text-sm font-medium text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Free
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
