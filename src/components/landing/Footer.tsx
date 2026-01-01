'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Youtube, Facebook, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  const footerLinks = {
    'Product': [
      { label: 'Features', href: '/#features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Use Cases', href: '/#use-cases' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Changelog', href: '/changelog' },
    ],
    'Resources': [
      { label: 'Help Center', href: '/help' },
      { label: 'Developer Center', href: '/developers' },
      { label: 'API Documentation', href: '/developers/api' },
      { label: 'System Status', href: '/status' },
      { label: 'Community', href: '/community' },
    ],
    'Company': [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press Kit', href: '/press' },
      { label: 'Contact', href: '/contact' },
    ],
  }

  const socialLinks = [
    { name: 'YouTube', href: 'https://youtube.com', icon: Youtube },
    { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
    { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  ]

  return (
    <footer className="bg-[var(--primary)] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/metacast.png"
                alt="MetaCast"
                width={150}
                height={30}
                className="h-7 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-white/60 text-sm mb-4 leading-relaxed">
              AI-powered multi-channel live streaming platform. Broadcast to YouTube, Facebook, and more simultaneously with intelligent automation.
            </p>
            <p className="text-white/40 text-xs mb-6">
              Trusted by 10,000+ creators and businesses worldwide.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[var(--secondary)] transition-colors"
                    aria-label={social.name}
                  >
                    <Icon size={18} className="text-white/70" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="text-white/40 text-sm">
              2026 MetaCast Inc. All rights reserved.
            </p>
            <span className="text-white/20 text-sm">|</span>
            <span className="text-white/40 text-xs font-mono">v1.2.0</span>
          </div>
          <div className="flex gap-6">
            <Link href="/terms" className="text-white/40 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-white/40 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-white/40 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
