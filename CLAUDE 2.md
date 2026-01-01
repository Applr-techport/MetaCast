# XCaster - AI Development Guide

AI 기반 멀티채널 비디오 자동화 SaaS 플랫폼

## 프로젝트 개요

**XCaster**는 AI 기술을 활용하여 비디오 콘텐츠 제작부터 멀티 플랫폼 배포까지 완전 자동화하는 SaaS 플랫폼입니다.

### 핵심 기능
1. **숏폼 자동 생성**: 키워드 → AI 시나리오 → 이미지/영상 → 음성 → 완성된 영상
2. **멀티채널 배포**: YouTube, Facebook, Naver TV, Twitch 등 동시 발행
3. **스케줄링**: 채널별 최적 시간대 자동 예약 배포
4. **라이브 스트리밍**: 실시간/가상 라이브 방송 + VFX 효과
5. **통합 관리**: 단일 대시보드에서 모든 채널 및 콘텐츠 관리

### 타겟 사용자
- 개인 크리에이터 (빠른 제작 + 멀티 플랫폼)
- 마케팅 대행사 (클라이언트별 자동화)
- 기업 마케팅팀 (브랜드 콘텐츠 효율화)
- 이커머스 (상품 홍보 + 라이브 커머스)

---

## 기술 스택

### Frontend & Backend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (필수)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (OAuth 2.0)
- **Storage**: Supabase Storage
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

### AI & Media Services
- **AI Script**: Anthropic Claude API (시나리오 생성)
- **Image Gen**: PiAPI (Flux model)
- **Video Gen**: PiAPI (Kling model)
- **Voice TTS**: ElevenLabs
- **Video Compositing**: Creatomate API
- **Live Streaming**: Mux

### Infrastructure
- **Hosting**: Vercel
- **Scheduling**: BullMQ or node-cron
- **Media Processing**: FFmpeg (server-side)
- **CDN**: Cloudflare Stream (옵션)

---

## 디렉토리 구조

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # 인증 그룹
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/             # 대시보드 그룹
│   │   ├── dashboard/           # 메인 대시보드
│   │   ├── shortform/           # 숏폼 생성 및 관리
│   │   │   ├── new/            # 새 숏폼 생성
│   │   │   └── [id]/           # 숏폼 상세/편집
│   │   ├── live/                # 라이브 스튜디오
│   │   │   ├── studio/         # 라이브 방송
│   │   │   └── schedule/       # 라이브 예약
│   │   ├── publish/             # 배포 스케줄러
│   │   │   ├── calendar/       # 캘린더 뷰
│   │   │   └── queue/          # 대기열 관리
│   │   ├── channels/            # 채널 연동 관리
│   │   │   ├── connect/        # 채널 연결
│   │   │   └── [platform]/     # 플랫폼별 설정
│   │   ├── assets/              # 미디어 라이브러리
│   │   │   ├── images/
│   │   │   ├── videos/
│   │   │   └── music/
│   │   ├── analytics/           # 분석 대시보드
│   │   │   ├── overview/       # 전체 통계
│   │   │   └── channels/       # 채널별 분석
│   │   ├── team/                # 팀 관리
│   │   └── settings/            # 설정
│   └── api/                     # API Routes
│       ├── ai/                  # AI 관련
│       │   ├── generate-script/
│       │   └── analyze-content/
│       ├── video/               # 비디오 처리
│       │   ├── generate/
│       │   ├── composite/
│       │   └── upload/
│       ├── channels/            # 채널 연동
│       │   ├── oauth/
│       │   └── publish/
│       └── webhooks/            # 외부 웹훅
│
├── components/
│   ├── ui/                      # 기본 UI 컴포넌트
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── dialog.tsx
│   ├── layout/                  # 레이아웃 컴포넌트
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   └── dashboard-layout.tsx
│   ├── shortform/               # 숏폼 관련
│   │   ├── script-editor.tsx
│   │   ├── video-preview.tsx
│   │   └── generation-wizard.tsx
│   └── live/                    # 라이브 관련
│       ├── stream-controls.tsx
│       └── vfx-panel.tsx
│
└── lib/
    ├── supabase/                # Supabase 클라이언트
    │   ├── client.ts
    │   ├── server.ts
    │   └── middleware.ts
    ├── ai/                      # AI 서비스
    │   ├── claude.ts           # Claude API
    │   └── script-generator.ts
    ├── video/                   # 비디오 서비스
    │   ├── piapi.ts            # PiAPI (이미지/비디오)
    │   ├── elevenlabs.ts       # 음성 합성
    │   ├── creatomate.ts       # 비디오 합성
    │   └── mux.ts              # 라이브 스트리밍
    ├── channels/                # 채널 연동
    │   ├── youtube.ts
    │   ├── facebook.ts
    │   ├── naver-tv.ts
    │   └── oauth-handler.ts
    └── utils/                   # 유틸리티
        ├── formatters.ts
        ├── validators.ts
        └── constants.ts
```

---

## 환경변수 (필수 설정)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI
ANTHROPIC_API_KEY=

# Video & Image Generation
PIAPI_API_KEY=

# Voice
ELEVENLABS_API_KEY=

# Video Compositing
CREATOMATE_API_KEY=

# Live Streaming
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=

# OAuth (채널 연동)
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
YOUTUBE_REDIRECT_URI=

FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=

NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=

TWITCH_CLIENT_ID=
TWITCH_CLIENT_SECRET=
```

---

## 코딩 컨벤션

### 필수 규칙
1. **TypeScript 필수** - JavaScript 파일 사용 금지
2. **함수형 컴포넌트** - 클래스 컴포넌트 사용 금지
3. **App Router 사용** - `app/` 디렉토리만 사용 (Pages Router 금지)
4. **Lucide React 아이콘** - 다른 아이콘 라이브러리 사용 금지
5. **이모지 사용 금지** - UI 퀄리티 저하 방지

### 파일 네이밍
- 컴포넌트: PascalCase (예: `VideoEditor.tsx`)
- 유틸리티/함수: camelCase (예: `formatDate.ts`)
- 상수: UPPER_SNAKE_CASE (예: `API_ENDPOINTS.ts`)
- 타입/인터페이스: PascalCase (예: `UserProfile.ts`)

### Import 순서
```typescript
// 1. React/Next.js
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// 2. 외부 라이브러리
import { Video, Play } from 'lucide-react'

// 3. 내부 컴포넌트
import { Button } from '@/components/ui/button'

// 4. 내부 유틸리티
import { formatDate } from '@/lib/utils/formatters'

// 5. 타입
import type { VideoProject } from '@/types'
```

---

## UI 디자인 시스템

### 전체 톤 & 매너
- **비즈니스 SaaS 스타일**: 깔끔하고 프로페셔널
- **미니멀리즘**: 과도한 장식 지양, 기능 중심
- **일관성**: 모든 페이지에서 동일한 패턴 유지

### 색상 체계 (CSS 변수)

```css
/* 라이트 모드 (기본) */
:root {
  --background: #f8f9fa;      /* 메인 배경 */
  --foreground: #1a1a1a;      /* 텍스트 */
  --sidebar-bg: #ffffff;      /* 사이드바 배경 */
  --card-bg: #ffffff;         /* 카드 배경 */
  --border-color: #e8e8e8;    /* 테두리 */
  --primary: #1a1a1a;         /* 주요 버튼/액션 */
  --secondary: #8b5cf6;       /* 보조 색상 (보라) */
  --accent: #ff4d6d;          /* 강조/LIVE 표시 (빨강) */
  --success: #22c55e;         /* 성공/완료 (초록) */
  --warning: #f59e0b;         /* 경고 (주황) */
  --muted: #6b7280;           /* 비활성/보조 텍스트 */
}
```

**중요**: 하드코딩 색상 금지 → 반드시 CSS 변수 사용

### 컴포넌트 스타일 규칙

#### 1. 카드 (Card)
```tsx
<div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6">
  {/* 내용 */}
</div>
```

#### 2. 버튼 (Button)
```tsx
// Primary
<button className="bg-[var(--primary)] text-white rounded-lg px-4 py-2 hover:opacity-90 transition-opacity">
  확인
</button>

// Secondary
<button className="bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--foreground)] rounded-lg px-4 py-2 hover:bg-[var(--background)] transition-colors">
  취소
</button>

// Accent (Live)
<button className="bg-[var(--accent)] text-white rounded-lg px-4 py-2 hover:opacity-90 transition-opacity">
  Go Live
</button>
```

#### 3. 입력 필드 (Input)
```tsx
<input
  className="w-full bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
  placeholder="입력하세요"
/>
```

#### 4. 타이포그래피
```tsx
// 페이지 제목
<h1 className="text-2xl font-bold text-[var(--foreground)]">대시보드</h1>

// 섹션 제목
<h2 className="text-lg font-semibold text-[var(--foreground)]">최근 프로젝트</h2>

// 본문
<p className="text-sm text-[var(--foreground)]">내용</p>

// 보조 텍스트
<span className="text-xs text-[var(--muted)]">2024-01-01</span>
```

#### 5. 배지 (Badge)
```tsx
// LIVE 표시
<span className="inline-flex items-center gap-1 bg-[var(--accent)] text-white rounded-full px-2 py-0.5 text-xs font-semibold">
  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
  LIVE
</span>

// 성공 상태
<span className="bg-[var(--success)] text-white rounded-full px-2 py-0.5 text-xs">
  완료
</span>
```

### 레이아웃 규칙

```tsx
// 사이드바
<aside className="fixed left-0 top-0 h-screen w-60 bg-[var(--sidebar-bg)] border-r border-[var(--border-color)]">
  {/* 사이드바 내용 */}
</aside>

// 메인 콘텐츠
<main className="ml-60 p-6">
  {/* 페이지 내용 */}
</main>

// 헤더
<header className="h-16 flex items-center justify-between px-6 bg-[var(--card-bg)] border-b border-[var(--border-color)]">
  {/* 헤더 내용 */}
</header>
```

### 아이콘 사용 규칙 (Lucide React)

```tsx
import { Video, Play, Package } from 'lucide-react'

// 기본 크기: 18-20px
<Video className="w-5 h-5" />

// 비활성 상태
<Play className="w-5 h-5 text-[var(--muted)]" />

// 활성 상태
<Package className="w-5 h-5 text-[var(--foreground)]" />
```

**아이콘 컨벤션**:
- Live Stream: `<Video />` (카메라 아이콘)
- VOD/Pre-recorded: `<Play />` (재생 아이콘)
- Product Stream: `<Package />` (패키지 아이콘)

### 반응형
- **데스크톱 우선** (모바일 우선 아님)
- 그리드: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- 타블렛(768px), 데스크톱(1024px), 와이드(1280px)

### 애니메이션
```tsx
// 트랜지션
<div className="transition-colors duration-200">

// 로딩 스피너
import { Loader2 } from 'lucide-react'
<Loader2 className="w-5 h-5 animate-spin" />

// 페이드인
<div className="animate-fadeIn">
```

---

## AI Context Optimizer Rules

### 핵심 원칙: "Atomic & Modular Development"
AI의 컨텍스트 한계를 초과하기 전에 **스스로 리팩토링을 제안**하고 실행하는 것을 최우선으로 한다.

### Code Metrics & Limits (엄격한 제약)

#### 파일 길이 제한
- **단일 파일**: 공백 포함 최대 **200라인**
- **함수/컴포넌트**: 최대 **40라인**
- **중첩 깊이**: if문/루프 최대 **2단계**

#### Auto-Refactor Trigger
- 파일이 **180라인**에 도달하면:
  1. 현재 작업 중단
  2. 파일을 논리적으로 분리(Extract)
  3. 리팩토링 완료 후 개발 재개

### Structural Guidance

#### Single Responsibility Principle
- **하나의 파일 = 하나의 책임**
  - Logic OR UI OR Type (혼재 금지)

#### Component Splitting 전략
```
❌ Bad: 모든 것이 한 파일에
VideoEditor.tsx (500 lines)

✅ Good: 책임 분리
VideoEditor/
├── index.tsx          (30 lines - 조합만)
├── VideoEditor.tsx    (50 lines - UI)
├── useVideoEditor.ts  (80 lines - Logic)
├── types.ts           (20 lines - Types)
└── constants.ts       (15 lines - Constants)
```

#### Index Files 활용
```typescript
// components/shortform/index.ts
export { ScriptEditor } from './ScriptEditor'
export { VideoPreview } from './VideoPreview'
export { GenerationWizard } from './GenerationWizard'
```

### Communication Rules

#### Proactive Refactoring
AI는 다음 상황에서 먼저 보고해야 함:
- "이 파일이 200라인을 초과할 것 같습니다. 분리가 필요합니다."
- "이 로직은 별도 Hook으로 추출하는 것이 좋겠습니다."

#### Documentation
```typescript
/**
 * 숏폼 비디오를 생성합니다.
 * @param script - AI가 생성한 스크립트
 * @param style - 비디오 스타일 (preset)
 * @returns 생성된 비디오 URL
 */
export async function generateShortform(
  script: string,
  style: VideoStyle
): Promise<string>
```

---

## Database Schema (Supabase)

### 주요 테이블

```sql
-- 사용자
users (
  id uuid PRIMARY KEY,
  email text UNIQUE,
  name text,
  avatar_url text,
  created_at timestamptz
)

-- 프로젝트 (숏폼/라이브)
projects (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users,
  type text, -- 'shortform' | 'live'
  title text,
  status text, -- 'draft' | 'processing' | 'ready' | 'published'
  metadata jsonb,
  created_at timestamptz
)

-- 채널 연동
channels (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users,
  platform text, -- 'youtube' | 'facebook' | 'naver_tv' | 'twitch'
  channel_id text,
  channel_name text,
  access_token text,
  refresh_token text,
  expires_at timestamptz,
  created_at timestamptz
)

-- 배포 스케줄
schedules (
  id uuid PRIMARY KEY,
  project_id uuid REFERENCES projects,
  channel_id uuid REFERENCES channels,
  scheduled_at timestamptz,
  status text, -- 'pending' | 'published' | 'failed'
  published_url text,
  created_at timestamptz
)

-- 미디어 자산
assets (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users,
  type text, -- 'image' | 'video' | 'audio'
  url text,
  filename text,
  size integer,
  metadata jsonb,
  created_at timestamptz
)
```

---

## API 설계 원칙

### RESTful 규칙
```
GET    /api/projects          - 프로젝트 목록
POST   /api/projects          - 프로젝트 생성
GET    /api/projects/:id      - 프로젝트 상세
PATCH  /api/projects/:id      - 프로젝트 수정
DELETE /api/projects/:id      - 프로젝트 삭제
```

### Response Format
```typescript
// 성공
{
  success: true,
  data: { ... }
}

// 실패
{
  success: false,
  error: {
    code: 'VALIDATION_ERROR',
    message: '입력값이 올바르지 않습니다.'
  }
}
```

---

## 개발 단계별 가이드

### Phase 1: MVP (현재)
1. 프로젝트 구조 설계
2. Supabase 설정
3. **숏폼 자동 생성**
   - AI 시나리오 생성 (Claude)
   - 이미지 생성 (PiAPI Flux)
   - 비디오 생성 (PiAPI Kling)
   - 음성 합성 (ElevenLabs)
   - 최종 합성 (Creatomate)
4. **채널 OAuth 연동**
   - YouTube
   - Facebook
5. **기본 배포**
   - 즉시 발행

### Phase 2
- 이미지/영상 업로드 → 편집
- 예약 발행 스케줄러
- 템플릿 시스템
- 미디어 라이브러리

### Phase 3
- 라이브 스튜디오
- VFX 효과
- 실시간 분석
- 팀 협업

---

## Important Project Rules (엄수 사항)

### 메뉴 구조
- **사용자 허락 없이 임의로 메뉴 추가 금지**
- 메뉴 변경 시 반드시 사전 논의

### 디자인 퀄리티
- **이모지 사용 금지** (퀄리티 저하)
- Lucide React 아이콘만 사용

### 아이콘 컨벤션
- Live Stream: `Video` (캠코더 아이콘)
- VOD/Pre-recorded: `Play` (재생 아이콘)
- Product Stream: `Package` (패키지 아이콘)

### 코드 퀄리티
- 200라인 초과 파일 즉시 분리
- TypeScript strict 모드 유지
- 모든 함수에 JSDoc 작성

---

## 참고 자료

- **Next.js 14 문서**: https://nextjs.org/docs
- **Supabase 문서**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Lucide React**: https://lucide.dev/

---

**이 문서는 AI(Claude)가 XCaster 프로젝트를 개발할 때 참고하는 핵심 가이드입니다.**
