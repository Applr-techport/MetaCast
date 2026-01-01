---
name: component
description: Reusable component creation. Use when creating shared UI components like modals, dropdowns, selectors.
---

# MetaCast Component Rules

## File Structure

```
src/components/
├── ui/                    # Base UI components
│   ├── Button.tsx
│   ├── Modal.tsx
│   ├── Dropdown.tsx
│   └── Input.tsx
├── layout/                # Layout components
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── Footer.tsx
├── live/                  # Live streaming components
│   ├── LiveChat.tsx
│   └── LiveStats.tsx
└── [feature]/             # Feature-specific components
```

## Component Template

```tsx
'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface ComponentNameProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function ComponentName({ value, onChange, className }: ComponentNameProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`relative ${className || ''}`}>
      {/* Component content */}
    </div>
  )
}
```

## Style Rules (CRITICAL)

### Colors - Use CSS Variables Only
```tsx
// Correct
className="bg-[var(--card-bg)] text-[var(--foreground)]"
className="border-[var(--border-color)]"
className="text-[var(--secondary)]"  // Purple accent

// Wrong - Never hardcode colors
className="bg-gray-800 text-white"
className="border-gray-700"
className="text-purple-500"
```

### Available CSS Variables
```css
--secondary: #8b5cf6      /* Purple - buttons, accents */
--background: #0a0a0a     /* Page background */
--card-bg: #141414        /* Card background */
--border-color: #262626   /* Borders */
--foreground: #fafafa     /* Primary text */
--muted: #a1a1aa          /* Secondary text */
--accent: #ef4444         /* Danger/delete (red) */
```

## Common Component Patterns

### Modal
```tsx
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[var(--card-bg)] rounded-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--background)] rounded-lg"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
```

### Dropdown
```tsx
interface DropdownProps {
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
  placeholder?: string
}

export function Dropdown({ value, options, onChange, placeholder }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg w-full"
      >
        <span>{value || placeholder}</span>
        <ChevronDown size={16} className="ml-auto" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full mt-1 w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-xl z-50">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className="w-full px-3 py-2 text-left hover:bg-[var(--background)]"
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
```

### Button Variants
```tsx
// Primary
<button className="px-4 py-2 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg">
  Primary
</button>

// Secondary
<button className="px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] hover:bg-[var(--border-color)] rounded-lg">
  Secondary
</button>

// Danger
<button className="px-4 py-2 bg-[var(--accent)] hover:opacity-90 text-white rounded-lg">
  Delete
</button>
```

## Icons

```tsx
// Always use lucide-react
import { Plus, X, Check, Edit3, Trash2 } from 'lucide-react'

// Icon sizing
<Icon size={16} />  // Small
<Icon size={18} />  // Default
<Icon size={20} />  // Medium
<Icon size={24} />  // Large

// Icon colors
<Icon className="text-[var(--muted)]" />      // Default
<Icon className="text-[var(--secondary)]" />  // Accent
<Icon className="text-white" />               // Active
```

## Checklist

Before creating component:
- [ ] No emojis in UI
- [ ] CSS variables only (no hardcoded colors)
- [ ] lucide-react icons only
- [ ] TypeScript interface for props
- [ ] 'use client' directive if using hooks
- [ ] Proper accessibility (aria labels, keyboard nav)
- [ ] All text in English
