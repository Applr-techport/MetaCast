---
name: metacast-ui
description: MetaCast UI 컴포넌트 작성. 화면, 컴포넌트, UI 요소 생성/수정 시 항상 사용.
---

# MetaCast UI 디자인 규칙

## 절대 금지 사항
- ❌ 이모지 사용 금지 (🎬, 🚀, ✨ 등 절대 사용하지 않음)
- ❌ AI 관련 이모지/장식 금지
- ❌ 과한 그라데이션, 화려한 효과 금지

## 필수 스타일

### 색상 시스템 (CSS 변수 사용)
```css
--secondary: #8b5cf6      /* 메인 보라색 - 버튼, 강조 */
--background: #0a0a0a     /* 배경 */
--card-bg: #141414        /* 카드 배경 */
--border-color: #262626   /* 테두리 */
--foreground: #fafafa     /* 텍스트 */
--muted: #a1a1aa          /* 보조 텍스트 */
--accent: #ef4444         /* 경고/삭제 (빨강) */
```

### 버튼 스타일
```tsx
// Primary 버튼
className="bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white"

// Secondary 버튼
className="bg-[var(--background)] border border-[var(--border-color)] hover:bg-[var(--border-color)]"

// 위험 버튼
className="bg-[var(--accent)] hover:opacity-90 text-white"
```

### 카드/컨테이너
```tsx
className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl"
```

### 입력 필드
```tsx
className="bg-[var(--background)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:border-[var(--secondary)]"
```

## 아이콘

### 사용 라이브러리
```tsx
import { IconName } from 'lucide-react'
```

### 아이콘 스타일
```tsx
// 일반 아이콘
<Icon size={18} className="text-[var(--muted)]" />

// 강조 아이콘
<Icon size={18} className="text-[var(--secondary)]" />

// 활성 상태
<Icon size={18} className="text-white" />
```

### 자주 사용하는 아이콘
- 폴더: `Folder`, `FolderPlus`
- 액션: `Plus`, `X`, `Check`, `Edit3`, `Trash2`
- 미디어: `Video`, `Image`, `Music`, `Play`, `Pause`
- 네비게이션: `ChevronDown`, `ChevronRight`, `ArrowLeft`
- 상태: `Clock`, `Radio`, `Eye`

## 컴포넌트 패턴

### 모달
```tsx
<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
  <div className="bg-[var(--card-bg)] rounded-2xl w-full max-w-md p-6">
    {/* 헤더 */}
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold">제목</h2>
      <button className="p-2 hover:bg-[var(--background)] rounded-lg">
        <X size={20} />
      </button>
    </div>
    {/* 내용 */}
  </div>
</div>
```

### 드롭다운
```tsx
<div className="relative">
  <button className="flex items-center gap-2 px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg">
    <span>선택</span>
    <ChevronDown size={16} />
  </button>
  {open && (
    <>
      <div className="fixed inset-0 z-40" onClick={close} />
      <div className="absolute top-full mt-1 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-xl z-50">
        {/* 옵션들 */}
      </div>
    </>
  )}
</div>
```

## 체크리스트

UI 작성 전 확인:
- [ ] 이모지 없음
- [ ] CSS 변수 사용 (하드코딩 색상 금지)
- [ ] lucide-react 아이콘만 사용
- [ ] 심플하고 깔끔한 디자인
- [ ] 보라색(--secondary)을 포인트로 사용
