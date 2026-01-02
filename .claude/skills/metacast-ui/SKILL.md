---
name: metacast-ui
description: MetaCast UI 컴포넌트 작성. 화면, 컴포넌트, UI 요소 생성/수정 시 항상 사용.
---

# MetaCast UI 디자인 규칙

## 절대 금지 사항
- 이모지 절대 금지 (텍스트, UI, 코드 어디에도 사용하지 않음)
- AI 관련 이모지/장식 절대 금지 (로봇, 스파클, 마법봉 등 모든 AI 느낌 이모지 금지)
- 과한 그라데이션, 화려한 효과 금지
- 다양한 색상 사용 금지 (보라색 중심으로 통일)

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

### 버튼 크기 시스템
용도에 따라 4가지 크기 사용 (반드시 통일):

```tsx
// XS - 테이블/리스트 내 작은 액션 (More, Edit, Delete 등)
className="px-2.5 py-1 text-xs rounded"

// SM - 일반 인라인 버튼, 보조 액션
className="px-3 py-1.5 text-sm rounded-lg"

// MD - 기본 버튼, 모달 내 버튼, 폼 제출 (Default)
className="px-4 py-2 text-sm rounded-lg font-medium"

// LG - CTA 버튼, 랜딩페이지, 주요 액션
className="px-6 py-3 text-base rounded-xl font-medium"
```

#### 버튼 크기 사용 가이드
| 크기 | 용도 | 예시 |
|------|------|------|
| XS | 테이블 행 내 액션, 태그 옆 삭제 | More, Edit, X |
| SM | 카드 내 보조 버튼, 드롭다운 트리거, 상태 뱃지 옆 액션 | View, Update |
| MD | 모달 버튼, 폼 제출, Header 내 주요 버튼 | Save Changes, New Stream, Invite Member |
| LG | 랜딩페이지 CTA, 히어로 섹션, 풀스크린 액션 | Start Free Trial, Get Started |

#### 아이콘 포함 버튼
```tsx
// XS with icon
<button className="px-2.5 py-1 text-xs rounded flex items-center gap-1">
  <Icon size={12} />
  <span>Label</span>
</button>

// SM with icon
<button className="px-3 py-1.5 text-sm rounded-lg flex items-center gap-1.5">
  <Icon size={14} />
  <span>Label</span>
</button>

// MD with icon (기본)
<button className="px-4 py-2 text-sm rounded-lg font-medium flex items-center gap-2">
  <Icon size={16} />
  <span>Label</span>
</button>

// LG with icon
<button className="px-6 py-3 text-base rounded-xl font-medium flex items-center gap-2">
  <Icon size={18} />
  <span>Label</span>
</button>
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

### 핵심 원칙: 보라색 아이콘 우선
- 아이콘은 가급적 보라색(--secondary) 사용
- 심플하고 단색 아이콘 선호
- 배경이 있는 아이콘 박스는 보라색 배경 + 흰색 아이콘

### 사용 라이브러리
```tsx
import { IconName } from 'lucide-react'
```

### 아이콘 스타일
```tsx
// 기본 아이콘 (보라색 권장)
<Icon size={18} className="text-[var(--secondary)]" />

// 비활성/보조 아이콘
<Icon size={18} className="text-[var(--muted)]" />

// 흰색 배경 위 아이콘
<Icon size={18} className="text-white" />
```

### 아이콘 박스 (배경 있는 아이콘)
```tsx
// 보라색 배경 아이콘 박스 (권장)
<div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center">
  <Icon size={20} className="text-[var(--secondary)]" />
</div>

// 보라색 채움 아이콘 박스
<div className="w-10 h-10 bg-[var(--secondary)] rounded-lg flex items-center justify-center">
  <Icon size={20} className="text-white" />
</div>
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

## 디자인 원칙

### 보라색 중심 디자인
- 메인 컬러는 항상 보라색(--secondary: #8b5cf6)
- 버튼, 아이콘, 강조 요소는 보라색 사용
- 다른 색상(빨강, 파랑, 초록 등)은 최소화
- 상태 표시(success, warning, error)만 예외적으로 다른 색상 허용
- **외부 플랫폼(YouTube, Instagram, Facebook 등)도 보라색으로 통일** - 브랜드 고유 컬러 사용 금지

### 심플함 유지
- 화려한 효과, 그라데이션 금지
- 단색 아이콘, 단색 배경 선호
- 여백을 충분히 사용하여 깔끔하게

### 콘텐츠/아티클 표현
- 섹션 타이틀 옆에 보라색 아이콘 또는 보라색 포인트 사용
- 카드/아이템에 보라색 악센트 요소 추가 (테두리, 아이콘, 배지 등)
- 빈 상태(empty state)에서도 보라색 아이콘 사용

## 페이지 레이아웃 규칙

### 공통 규칙
1. **페이지 제목/부제목 없음** - 왼쪽 사이드바 메뉴로 충분
2. **섹션 아이콘+제목 없음** - 카드/콘텐츠 자체로 구분
3. **`max-w-*xl mx-auto` 금지** - 사이드바에서 멀어 보임
4. **콘텐츠 간 여백으로 구분** - mb-6 또는 mb-8 사용

### 페이지 유형별 구조

#### 1. 콘텐츠 관리형 (Assets, Channels, Team)
```
Header → Overview Stats(4열) → Main List/Grid → Secondary Info
```
- Overview 최상단, 제목 없이 바로 stats 카드
- 메인 콘텐츠는 리스트/그리드 형태

#### 2. 기능 선택형 (AI Studio)
```
Header → Overview Stats(4열) → Feature Cards → Quick Tools → Activity
```
- Overview 최상단에 배치
- 이후 기능 카드들 표시

#### 3. 대시보드형 (Dashboard, Analytics)
```
Header → Overview Stats → Summary Cards → Activity/Charts
```
- Overview로 전체 현황 요약
- 하위 섹션들은 요약 정보

#### 4. 캘린더형 (Schedule)
```
Header → Overview Stats → Calendar View
```
- Overview로 예정된 항목 수 표시
- 캘린더가 메인 콘텐츠

### Overview Stats 카드
```tsx
<div className="grid grid-cols-4 gap-4 mb-6">
  <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
    <div className="flex items-center gap-2 mb-2">
      <Icon size={16} className="text-[var(--secondary)]" />
      <span className="text-xs text-[var(--muted)]">Label</span>
    </div>
    <p className="text-2xl font-bold">Value</p>
    <p className="text-xs text-[var(--muted)]">Sub info</p>
  </div>
</div>
```

### Header Actions
```tsx
<Header actions={<PageHeaderActions />} />

function PageHeaderActions() {
  return (
    <div className="flex items-center gap-3">
      {/* Status badge */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--secondary)]/10 rounded-lg border border-[var(--secondary)]/20">
        <Icon size={14} className="text-[var(--secondary)]" />
        <span className="text-sm font-medium text-[var(--secondary)]">Status</span>
      </div>
      {/* Primary action */}
      <button className="flex items-center gap-2 px-4 py-2 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg text-sm font-medium">
        <Plus size={18} />
        <span>Action</span>
      </button>
    </div>
  )
}
```

### 컨테이너 스타일
```tsx
// 메인 컨테이너 - 중앙 정렬 없이 왼쪽 정렬
<div className="p-6">
  {/* content */}
</div>

// 절대 사용 금지
<div className="max-w-4xl mx-auto"> // X - 사이드바에서 떨어져 보임
```

## 체크리스트

UI 작성 전 확인:
- [ ] 이모지 없음
- [ ] CSS 변수 사용 (하드코딩 색상 금지)
- [ ] lucide-react 아이콘만 사용
- [ ] 아이콘 색상은 보라색(--secondary) 우선
- [ ] 버튼/강조는 보라색 사용
- [ ] 심플하고 깔끔한 디자인
- [ ] 불필요한 색상 다양성 제거
- [ ] 페이지 제목/부제목 없음
- [ ] 섹션 아이콘+제목 없음
- [ ] Overview 최상단 배치

## Git Push 규칙

**푸시 명령어:**
```bash
cd /Users/mrumx/Desktop/My_WRKSPCE/MetaCast && git push
```

- remote URL에 토큰이 이미 설정되어 있음
- 인증 관련 질문 절대 금지
