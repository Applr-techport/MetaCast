---
name: page
description: Dashboard page creation. Use when creating new pages in the dashboard.
---

# MetaCast Page Rules

## File Structure

```
src/app/
├── (auth)/                # Auth pages (no sidebar)
│   ├── login/
│   └── signup/
├── (dashboard)/           # Dashboard pages (with sidebar)
│   ├── layout.tsx         # Shared layout with Sidebar
│   ├── dashboard/
│   ├── streams/
│   ├── assets/
│   ├── ai-studio/
│   ├── schedule/
│   ├── analytics/
│   ├── channels/
│   ├── team/
│   └── settings/
└── (marketing)/           # Marketing pages
    └── page.tsx           # Landing page
```

## Page Template

```tsx
'use client'

import { useState, useEffect } from 'react'
import { Plus, Filter } from 'lucide-react'

export default function PageName() {
  // State
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  // Data fetching
  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    setIsLoading(true)
    try {
      // Fetch logic
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Page Title</h1>
          <p className="text-[var(--muted)] mt-1">Page description here</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--secondary)] hover:bg-[#7c4fe0] rounded-lg">
          <Plus size={18} />
          <span>Add New</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2 px-3 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg">
          <Filter size={16} className="text-[var(--muted)]" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent outline-none"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : items.length === 0 ? (
        <EmptyState />
      ) : (
        <ItemGrid items={items} />
      )}
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="h-48 bg-[var(--card-bg)] rounded-xl animate-pulse"
        />
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-16 h-16 bg-[var(--card-bg)] rounded-full flex items-center justify-center mb-4">
        <Plus size={24} className="text-[var(--muted)]" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No items yet</h3>
      <p className="text-[var(--muted)] mb-4">Get started by creating your first item</p>
      <button className="px-4 py-2 bg-[var(--secondary)] hover:bg-[#7c4fe0] rounded-lg">
        Create Item
      </button>
    </div>
  )
}
```

## Layout Structure

```tsx
// Dashboard pages automatically get Sidebar from layout.tsx
// Page content should have p-6 padding

<div className="p-6">
  {/* Header section */}
  <div className="flex items-center justify-between mb-6">
    ...
  </div>

  {/* Filters/Actions bar */}
  <div className="flex items-center gap-4 mb-6">
    ...
  </div>

  {/* Main content */}
  <div className="...">
    ...
  </div>
</div>
```

## Card Grid Pattern

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {items.map((item) => (
    <div
      key={item.id}
      className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden hover:border-[var(--secondary)] transition-colors"
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-[var(--background)]">
        ...
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold truncate">{item.title}</h3>
        <p className="text-sm text-[var(--muted)] mt-1">{item.description}</p>
      </div>
    </div>
  ))}
</div>
```

## Pagination Pattern

```tsx
const [currentPage, setCurrentPage] = useState(1)
const itemsPerPage = 12
const totalPages = Math.ceil(items.length / itemsPerPage)

const paginatedItems = items.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
)

// Pagination UI
<div className="flex items-center justify-center gap-2 mt-6">
  <button
    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
    disabled={currentPage === 1}
    className="p-2 rounded-lg hover:bg-[var(--card-bg)] disabled:opacity-50"
  >
    <ChevronLeft size={20} />
  </button>

  <span className="px-4 py-2">
    Page {currentPage} of {totalPages}
  </span>

  <button
    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
    disabled={currentPage === totalPages}
    className="p-2 rounded-lg hover:bg-[var(--card-bg)] disabled:opacity-50"
  >
    <ChevronRight size={20} />
  </button>
</div>
```

## Checklist

Before creating page:
- [ ] 'use client' directive at top
- [ ] Proper loading state
- [ ] Empty state component
- [ ] Error handling
- [ ] Responsive grid layout
- [ ] All text in English
- [ ] No emojis
- [ ] CSS variables only
