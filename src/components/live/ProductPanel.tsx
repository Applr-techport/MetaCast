'use client'

import { useState } from 'react'
import { Package, Plus, Trash2, X, Search } from 'lucide-react'

interface Product {
  id: string
  name: string
  price: number
  imageUrl?: string
  isActive: boolean
}

interface AvailableProduct {
  id: string
  name: string
  price: number
  imageUrl?: string
}

interface ProductPanelProps {
  products: Product[]
  availableProducts?: AvailableProduct[]
  onAddExistingProduct?: (product: AvailableProduct) => void
  onDeleteProduct?: (id: string) => void
  onToggleActive?: (id: string) => void
}

export function ProductPanel({
  products,
  availableProducts = [],
  onAddExistingProduct,
  onDeleteProduct,
  onToggleActive,
}: ProductPanelProps) {
  const [showSearchPanel, setShowSearchPanel] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = availableProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !products.some((existing) => existing.id === p.id)
  )

  const cancelSearch = () => {
    setShowSearchPanel(false)
    setSearchQuery('')
  }

  const handleAddExisting = (product: AvailableProduct) => {
    onAddExistingProduct?.(product)
    setSearchQuery('')
  }

  return (
    <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package size={18} className="text-[var(--secondary)]" />
          <h3 className="font-semibold text-[var(--foreground)]">Products</h3>
        </div>
        {!showSearchPanel && (
          <button
            onClick={() => setShowSearchPanel(true)}
            className="p-1.5 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg transition-colors"
            title="Add product"
          >
            <Plus size={16} />
          </button>
        )}
      </div>

      {/* Search Panel */}
      {showSearchPanel && (
        <div className="p-4 border-b border-[var(--border-color)] bg-[var(--background)]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                  autoFocus
                />
              </div>
              <button
                onClick={cancelSearch}
                className="p-2 text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)] rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="max-h-40 overflow-y-auto space-y-1">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--card-bg)] cursor-pointer transition-colors"
                    onClick={() => handleAddExisting(product)}
                  >
                    <div className="w-8 h-8 bg-[var(--border-color)] rounded flex items-center justify-center flex-shrink-0">
                      <Package size={14} className="text-[var(--muted)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[var(--foreground)] truncate">{product.name}</p>
                      <p className="text-xs text-[var(--secondary)]">${(product.price / 100).toFixed(2)}</p>
                    </div>
                    <Plus size={14} className="text-[var(--secondary)]" />
                  </div>
                ))
              ) : (
                <p className="text-xs text-[var(--muted)] text-center py-4">
                  {searchQuery ? 'No products found' : 'Type to search products'}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {products.map((product) => (
          <div
            key={product.id}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
              product.isActive
                ? 'border-[var(--secondary)] bg-[var(--secondary)]/5'
                : 'border-[var(--border-color)] bg-[var(--background)]'
            }`}
          >
            {/* Product image placeholder */}
            <div className="w-12 h-12 bg-[var(--border-color)] rounded-lg flex items-center justify-center flex-shrink-0">
              <Package size={20} className="text-[var(--muted)]" />
            </div>

            {/* Product info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--foreground)] truncate">{product.name}</p>
              <p className="text-sm text-[var(--secondary)] font-semibold">
                ${(product.price / 100).toFixed(2)}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => onToggleActive?.(product.id)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  product.isActive
                    ? 'bg-[var(--secondary)] text-white'
                    : 'bg-[var(--border-color)] text-[var(--muted)]'
                }`}
              >
                {product.isActive ? 'ON' : 'OFF'}
              </button>
              <button
                onClick={() => onDeleteProduct?.(product.id)}
                className="p-1.5 text-[var(--muted)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 rounded transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
