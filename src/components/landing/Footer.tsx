'use client'

import Image from 'next/image'

export function Footer() {
  const footerLinks = {
    'Learn More': [
      { label: 'About us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Press', href: '#' },
    ],
    'Resources': [
      { label: 'Blog', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Privacy Policy', href: '#' },
    ],
    'Contact Us': [
      { label: 'support@metacast.io', href: 'mailto:support@metacast.io' },
      { label: 'Seoul, Korea', href: '#' },
    ],
  }

  const socialLinks = [
    { name: 'YouTube', href: '#' },
    { name: 'Facebook', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'LinkedIn', href: '#' },
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
            <p className="text-white/60 text-sm mb-6">
              AI-powered multi-channel video automation platform
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <span className="sr-only">{social.name}</span>
                  <div className="w-5 h-5 bg-white/60 rounded-full" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
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
              2024 MetaCast Inc. All rights reserved.
            </p>
            <span className="text-white/20 text-sm">|</span>
            <span className="text-white/40 text-xs font-mono">v1.1.0</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
