'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

export function LiveStats() {
  const [timeRange, setTimeRange] = useState(5)

  // 샘플 통계 데이터
  const stats = {
    totalViewers: 9732,
    realtimeViewers: 3892,
    cartCount: 792,
    purchaseCount: 352,
    viewCount: 15643,
    cumulativeViewers: 9732,
    realtimeCount: 3892,
    changePercent: 12.1,
  }

  return (
    <div className="h-full flex">
      {/* 그래프 영역 */}
      <div className="flex-1 p-4">
        {/* 상단 통계 */}
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="text-xs text-[var(--muted)]">누적 시청자</span>
            <span className="text-sm font-semibold">{stats.totalViewers.toLocaleString()} 명</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="text-xs text-[var(--muted)]">실시간 시청자</span>
            <span className="text-sm font-semibold">{stats.realtimeViewers.toLocaleString()} 명</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-400" />
            <span className="text-xs text-[var(--muted)]">장바구니 수</span>
            <span className="text-sm font-semibold">{stats.cartCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-400" />
            <span className="text-xs text-[var(--muted)]">구매 수</span>
            <span className="text-sm font-semibold">{stats.purchaseCount}</span>
          </div>
        </div>

        {/* 그래프 */}
        <div className="relative h-[160px] border border-[var(--border-color)] rounded-lg p-4">
          {/* Y축 레이블 */}
          <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-[10px] text-[var(--muted)] py-2">
            <span>10,000</span>
            <span>8,000</span>
            <span>6,000</span>
            <span>4,000</span>
          </div>

          {/* 그래프 영역 */}
          <div className="ml-12 h-full relative">
            {/* 그리드 라인 */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="border-b border-[var(--border-color)] border-dashed" />
              ))}
            </div>

            {/* 라인 차트 (SVG) */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              {/* 누적 시청자 라인 (노란색) */}
              <polyline
                fill="none"
                stroke="#facc15"
                strokeWidth="2"
                points="0,120 50,110 100,90 150,85 200,70 250,60 300,55 350,50 400,45 450,40"
              />
              {/* 실시간 시청자 라인 (녹색) */}
              <polyline
                fill="none"
                stroke="#4ade80"
                strokeWidth="2"
                points="0,140 50,135 100,130 150,120 200,115 250,105 300,95 350,85 400,80 450,75"
              />
              {/* 장바구니 라인 (파란색) - 우측 Y축 기준 */}
              <polyline
                fill="none"
                stroke="#60a5fa"
                strokeWidth="2"
                strokeDasharray="4,4"
                points="0,130 50,125 100,120 150,115 200,110 250,100 300,95 350,90 400,85 450,80"
              />
            </svg>
          </div>

          {/* 우측 Y축 레이블 */}
          <div className="absolute right-0 top-0 bottom-0 w-12 flex flex-col justify-between text-[10px] text-[var(--muted)] py-2 text-right pr-2">
            <span>1,000</span>
            <span>800</span>
            <span>600</span>
            <span>400</span>
          </div>
        </div>

        {/* 범례 및 시간 조절 */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-4 text-[10px]">
            <label className="flex items-center gap-1.5">
              <input type="checkbox" defaultChecked className="w-3 h-3 rounded" />
              <span className="text-[var(--muted)]">누적 시청자</span>
            </label>
            <label className="flex items-center gap-1.5">
              <input type="checkbox" defaultChecked className="w-3 h-3 rounded" />
              <span className="text-[var(--muted)]">실시간 시청자</span>
            </label>
            <label className="flex items-center gap-1.5">
              <input type="checkbox" defaultChecked className="w-3 h-3 rounded" />
              <span className="text-[var(--muted)]">장바구니 수</span>
            </label>
            <label className="flex items-center gap-1.5">
              <input type="checkbox" defaultChecked className="w-3 h-3 rounded" />
              <span className="text-[var(--muted)]">구매 수</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTimeRange(Math.max(1, timeRange - 1))}
              className="p-1 border border-[var(--border-color)] rounded hover:bg-[var(--background)]"
            >
              <Minus size={12} />
            </button>
            <span className="text-xs font-medium w-8 text-center">{timeRange}분</span>
            <button
              onClick={() => setTimeRange(Math.min(60, timeRange + 1))}
              className="p-1 border border-[var(--border-color)] rounded hover:bg-[var(--background)]"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* 우측 요약 패널 */}
      <div className="w-[200px] border-l border-[var(--border-color)] p-4">
        <h4 className="text-sm font-semibold mb-4">라이브 시청자</h4>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--muted)]">누적 조회수</span>
            <span className="text-sm font-medium">{stats.viewCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--muted)]">누적 시청자 수</span>
            <span className="text-sm font-medium">{stats.cumulativeViewers.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--muted)]">실시간 시청자 수</span>
            <span className="text-sm font-medium">{stats.realtimeCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--muted)]"></span>
            <span className="text-sm font-medium text-green-500">↑ {stats.changePercent}%</span>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-2">라이브 상품</h4>
          {/* 상품 요약 정보 표시 가능 */}
        </div>
      </div>
    </div>
  )
}
