'use client'

import { useState } from 'react'
import { Plus, Image as ImageIcon, MoreVertical } from 'lucide-react'

interface Product {
  id: string
  name: string
  brand: string
  price: number
  discountPrice?: number
  discountPercent?: number
  stock: number
  image?: string
  isSoldOut?: boolean
}

const sampleProducts: Product[] = [
  { id: '1', name: '[봄 시즌 신상] 코치백', brand: 'Brand', price: 25000, discountPercent: 20, stock: 6372 },
  { id: '2', name: '옐로우 스니커즈', brand: 'Store', price: 75000, discountPercent: 13, stock: 234 },
  { id: '3', name: '라운드 가디건', brand: 'Store', price: 11000, discountPercent: 19, stock: 345 },
  { id: '4', name: '남성 디자인 추천', brand: 'Store', price: 71000, discountPercent: 23, stock: 6372 },
  { id: '5', name: '자켓 라이트 브라운', brand: 'Store', price: 31090, discountPercent: 13, stock: 543, isSoldOut: true },
]

export function LiveProducts() {
  const [products] = useState<Product[]>(sampleProducts)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertContent, setAlertContent] = useState('')

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 - 화면 구성 관리 */}
      <div className="p-3 border-b border-[var(--border-color)]">
        <h3 className="text-sm font-semibold mb-3">화면 구성 관리</h3>

        {/* 썸네일 미리보기 */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <p className="text-[10px] text-[var(--muted)] mb-1">방송 전 대기 썸네일 이미지</p>
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-1">
                    <span className="text-purple-600 font-bold text-sm">47,000원</span>
                  </div>
                  <span className="text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded">25% OFF</span>
                </div>
              </div>
              <span className="absolute top-1 right-1 text-[8px] bg-black/50 text-white px-1 rounded">썸네일 적용</span>
            </div>
          </div>
        </div>

        {/* 이미지 등록 버튼들 */}
        <div className="space-y-2">
          <button className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-[var(--border-color)] rounded-lg text-xs text-[var(--muted)] hover:bg-[var(--background)] transition-colors">
            <Plus size={14} />
            썸네일 이미지 등록
          </button>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-[10px] text-[var(--muted)] mb-1">라이브 L 바 이미지 1</p>
              <div className="aspect-[3/1] bg-gray-100 rounded flex items-center justify-center text-[10px] text-[var(--muted)]">
                로딩 이미지 적용
              </div>
              <button className="w-full mt-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-[var(--primary)] text-white rounded text-[10px]">
                <Plus size={10} />
                로딩 이미지 등록
              </button>
            </div>
            <div>
              <p className="text-[10px] text-[var(--muted)] mb-1">라이브 L 바 이미지 2</p>
              <div className="aspect-[3/1] bg-gray-100 rounded flex items-center justify-center">
                <span className="text-[10px] bg-gray-300 px-2 py-0.5 rounded">SOLD OUT</span>
              </div>
              <button className="w-full mt-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-[var(--primary)] text-white rounded text-[10px]">
                <Plus size={10} />
                로딩 이미지 등록
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 상품 목록 */}
      <div className="p-3 border-b border-[var(--border-color)]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">상품</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--secondary)]">라이브 할인가 적용</span>
            <span className="text-xs font-medium">25,000원</span>
          </div>
        </div>

        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 p-2 bg-[var(--background)] rounded-lg"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0 relative">
                {product.isSoldOut && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                    <span className="text-[8px] text-white font-medium">SOLD OUT</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{product.name}</p>
                <p className="text-[10px] text-[var(--muted)]">{product.brand}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium">{product.price.toLocaleString()}원</p>
                {product.discountPercent && (
                  <p className="text-[10px] text-red-500">-{product.discountPercent}%</p>
                )}
              </div>
              <span className="text-[10px] text-[var(--muted)]">{product.stock.toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-3">
          <button className="flex-1 px-3 py-2 border border-[var(--border-color)] rounded-lg text-xs hover:bg-[var(--background)] transition-colors">
            상품 수정
          </button>
          <button className="flex-1 px-3 py-2 bg-[var(--primary)] text-white rounded-lg text-xs hover:bg-[#1a1a1a] transition-colors">
            상품 추가
          </button>
        </div>
      </div>

      {/* 알림발송 */}
      <div className="p-3 flex-1">
        <h3 className="text-sm font-semibold mb-3">알림발송</h3>

        <div className="space-y-2">
          <div>
            <label className="text-[10px] text-[var(--muted)]">제목 입력</label>
            <input
              type="text"
              value={alertTitle}
              onChange={(e) => setAlertTitle(e.target.value)}
              placeholder="[라이브 할인] 최대 30% 쿠폰 받아가세요!"
              className="w-full mt-1 px-3 py-2 text-xs bg-[var(--background)] border border-[var(--border-color)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--secondary)]"
            />
          </div>

          <div>
            <label className="text-[10px] text-[var(--muted)]">본문 입력</label>
            <textarea
              value={alertContent}
              onChange={(e) => setAlertContent(e.target.value)}
              placeholder="본문은 5줄 이상 입력 시 짤림이 확인됩니다."
              rows={3}
              className="w-full mt-1 px-3 py-2 text-xs bg-[var(--background)] border border-[var(--border-color)] rounded resize-none focus:outline-none focus:ring-1 focus:ring-[var(--secondary)]"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs">
              <span className="text-[var(--muted)]">푸시알림</span>
              <div className="w-8 h-4 bg-green-500 rounded-full relative">
                <span className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
              </div>
            </label>
          </div>

          <div className="flex gap-2 mt-3">
            <button className="flex-1 px-3 py-2 border border-[var(--border-color)] rounded-lg text-xs hover:bg-[var(--background)] transition-colors">
              지우기
            </button>
            <button className="flex-1 px-3 py-2 bg-[var(--primary)] text-white rounded-lg text-xs hover:bg-[#1a1a1a] transition-colors">
              전송하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
