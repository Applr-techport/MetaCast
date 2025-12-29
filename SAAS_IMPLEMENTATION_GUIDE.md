# XCaster SaaS 제품 기능 구조 및 구현 가이드

**작성일**: 2024-12-28
**대상**: 개발팀
**목적**: 실제 구현 가능한 기능 설계 및 아키텍처 가이드

---

## 📋 목차

1. [데이터베이스 스키마 상세 설계](#1-데이터베이스-스키마-상세-설계)
2. [API 엔드포인트 설계](#2-api-엔드포인트-설계)
3. [사용자 플로우 및 UX 개선](#3-사용자-플로우-및-ux-개선)
4. [AI 파이프라인 구조](#4-ai-파이프라인-구조)
5. [큐 시스템 설계](#5-큐-시스템-설계)
6. [비용 최적화 전략](#6-비용-최적화-전략)
7. [에러 핸들링 및 재시도 로직](#7-에러-핸들링-및-재시도-로직)
8. [권한 및 보안 관리](#8-권한-및-보안-관리)
9. [성능 최적화](#9-성능-최적화)
10. [모니터링 및 로깅](#10-모니터링-및-로깅)

---

## 1. 데이터베이스 스키마 상세 설계

### 1.1 핵심 테이블

```sql
-- ============================================
-- 사용자 및 인증
-- ============================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'free', -- 'free' | 'basic' | 'standard' | 'professional'
  subscription_status TEXT DEFAULT 'active', -- 'active' | 'cancelled' | 'expired'
  subscription_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 브랜드 프로필 (차별화 포인트)
-- ============================================

CREATE TABLE brand_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  tone TEXT, -- 'professional' | 'casual' | 'humorous' | 'educational'
  visual_style JSONB, -- { colors: [], fonts: [], themes: [] }
  voice_preference TEXT, -- ElevenLabs voice ID
  target_audience TEXT,
  example_content JSONB, -- 참고 콘텐츠 URL 배열
  preferences JSONB, -- 사용자 수정 패턴 학습 데이터
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 프로젝트 (숏폼/라이브)
-- ============================================

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  brand_profile_id UUID REFERENCES brand_profiles(id),
  type TEXT NOT NULL, -- 'shortform' | 'live'
  title TEXT NOT NULL,
  status TEXT DEFAULT 'draft', -- 'draft' | 'processing' | 'ready' | 'published' | 'failed'

  -- 숏폼 관련
  keyword TEXT,
  script TEXT,
  script_edited BOOLEAN DEFAULT FALSE, -- 사용자가 스크립트 수정했는지
  duration INTEGER, -- 초 단위

  -- 생성된 에셋 참조
  images JSONB, -- [{ url, prompt, selected }]
  videos JSONB,
  audio_url TEXT,
  final_video_url TEXT,
  thumbnail_url TEXT,

  -- 메타데이터
  metadata JSONB, -- 플랫폼별 메타데이터, 해시태그 등
  generation_cost DECIMAL(10,2), -- API 호출 비용 추적

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);

-- ============================================
-- 채널 연동
-- ============================================

CREATE TABLE channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- 'youtube' | 'facebook' | 'instagram' | 'tiktok' | 'naver_tv' | 'twitch'
  channel_id TEXT NOT NULL, -- 플랫폼의 채널 ID
  channel_name TEXT,
  channel_image TEXT,

  -- OAuth 토큰
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,

  -- 채널 통계 (캐시)
  subscriber_count INTEGER,
  video_count INTEGER,

  -- 설정
  is_active BOOLEAN DEFAULT TRUE,
  auto_publish BOOLEAN DEFAULT FALSE, -- 자동 발행 여부

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, platform, channel_id)
);

CREATE INDEX idx_channels_user_id ON channels(user_id);

-- ============================================
-- 배포 스케줄
-- ============================================

CREATE TABLE schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,

  scheduled_at TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending' | 'publishing' | 'published' | 'failed'

  -- 플랫폼별 메타데이터
  title TEXT,
  description TEXT,
  tags TEXT[],
  visibility TEXT, -- 'public' | 'private' | 'unlisted'

  -- 결과
  published_url TEXT,
  platform_video_id TEXT,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_schedules_scheduled_at ON schedules(scheduled_at);
CREATE INDEX idx_schedules_status ON schedules(status);

-- ============================================
-- 미디어 라이브러리
-- ============================================

CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'image' | 'video' | 'audio' | 'template'

  url TEXT NOT NULL,
  filename TEXT NOT NULL,
  mime_type TEXT,
  size INTEGER, -- bytes

  -- 분류
  folder TEXT, -- 폴더 경로
  tags TEXT[],

  -- 메타데이터
  metadata JSONB, -- width, height, duration 등

  -- AI 생성 정보
  is_ai_generated BOOLEAN DEFAULT FALSE,
  generation_prompt TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_assets_user_id ON assets(user_id);
CREATE INDEX idx_assets_type ON assets(type);

-- ============================================
-- 템플릿 시스템
-- ============================================

CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id), -- NULL이면 시스템 템플릿
  name TEXT NOT NULL,
  description TEXT,
  category TEXT, -- 'tutorial' | 'review' | 'vlog' | 'product' 등

  -- 템플릿 구조
  structure JSONB NOT NULL, -- 전체 템플릿 정의
  /*
  {
    "intro": { "duration": 3, "style": "fade-in", "text_template": "{{title}}" },
    "body": { "layout": "split-screen", "sections": [...] },
    "outro": { "duration": 2, "call_to_action": "..." }
  }
  */

  preview_url TEXT,

  -- 사용 통계
  use_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_templates_category ON templates(category);
CREATE INDEX idx_templates_is_public ON templates(is_public);

-- ============================================
-- 사용량 추적 (비용 관리)
-- ============================================

CREATE TABLE usage_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  resource_type TEXT NOT NULL, -- 'script_generation' | 'image_generation' | 'video_generation' | 'voice_synthesis'

  quantity INTEGER DEFAULT 1,
  cost DECIMAL(10,4), -- 실제 API 비용

  -- 컨텍스트
  project_id UUID REFERENCES projects(id),
  metadata JSONB,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX idx_usage_logs_created_at ON usage_logs(created_at);

-- ============================================
-- 분석 데이터 (성과 추적)
-- ============================================

CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  channel_id UUID REFERENCES channels(id),

  -- 플랫폼 데이터
  platform_video_id TEXT,

  -- 지표
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  watch_time INTEGER, -- 초 단위

  -- 인구통계
  demographics JSONB, -- { age_groups: {}, genders: {}, locations: {} }

  -- 스냅샷 시간
  snapshot_at TIMESTAMPTZ DEFAULT NOW(),

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_analytics_project_id ON analytics(project_id);
CREATE INDEX idx_analytics_snapshot_at ON analytics(snapshot_at);

-- ============================================
-- 팀 협업 (Phase 3)
-- ============================================

CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan TEXT, -- 팀 전용 플랜

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member', -- 'owner' | 'admin' | 'editor' | 'viewer'

  permissions JSONB, -- { can_create: true, can_publish: false, ... }

  joined_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(team_id, user_id)
);

-- ============================================
-- AI 학습 데이터 (브랜드 프로필 개선)
-- ============================================

CREATE TABLE user_edits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id),

  edit_type TEXT, -- 'script_change' | 'image_selection' | 'voice_change' | 'timing_adjustment'

  before_value JSONB,
  after_value JSONB,

  -- 패턴 학습용
  context JSONB, -- 어떤 상황에서 수정했는지

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_edits_user_id ON user_edits(user_id);
```

### 1.2 View 및 함수

```sql
-- 사용자별 월간 사용량 집계
CREATE VIEW monthly_usage AS
SELECT
  user_id,
  DATE_TRUNC('month', created_at) AS month,
  resource_type,
  SUM(quantity) AS total_quantity,
  SUM(cost) AS total_cost
FROM usage_logs
GROUP BY user_id, DATE_TRUNC('month', created_at), resource_type;

-- 프로젝트 성과 요약
CREATE VIEW project_performance AS
SELECT
  p.id,
  p.user_id,
  p.title,
  COUNT(DISTINCT s.id) AS publish_count,
  COALESCE(SUM(a.views), 0) AS total_views,
  COALESCE(SUM(a.likes), 0) AS total_likes,
  COALESCE(AVG(a.views), 0) AS avg_views
FROM projects p
LEFT JOIN schedules s ON p.id = s.project_id AND s.status = 'published'
LEFT JOIN analytics a ON p.id = a.project_id
GROUP BY p.id, p.user_id, p.title;

-- 토큰 자동 갱신 함수
CREATE OR REPLACE FUNCTION refresh_expired_tokens()
RETURNS void AS $$
BEGIN
  -- 만료 예정 토큰 처리 (실제 구현은 애플리케이션 레벨)
  UPDATE channels
  SET token_expires_at = NOW() + INTERVAL '1 hour'
  WHERE token_expires_at < NOW() + INTERVAL '5 minutes';
END;
$$ LANGUAGE plpgsql;
```

---

## 2. API 엔드포인트 설계

### 2.1 인증 & 사용자

```typescript
// src/app/api/auth/signup/route.ts
POST /api/auth/signup
Body: { email, password, name }
Response: { user, session }

POST /api/auth/login
Body: { email, password }
Response: { user, session }

GET /api/auth/me
Response: { user, profile }

PATCH /api/auth/profile
Body: { name, avatar_url }
Response: { user }
```

### 2.2 브랜드 프로필

```typescript
// src/app/api/brand-profiles/route.ts
GET /api/brand-profiles
Response: { profiles: BrandProfile[] }

POST /api/brand-profiles
Body: {
  name: string
  tone: 'professional' | 'casual' | 'humorous' | 'educational'
  visual_style: { colors: string[], fonts: string[] }
  voice_preference: string
  target_audience: string
}
Response: { profile: BrandProfile }

PATCH /api/brand-profiles/:id
Body: Partial<BrandProfile>
Response: { profile: BrandProfile }

// 기존 콘텐츠 분석
POST /api/brand-profiles/:id/analyze
Body: { content_urls: string[] }
Response: {
  analyzed_style: {
    dominant_colors: string[]
    tone_analysis: string
    common_phrases: string[]
  }
}
```

### 2.3 프로젝트 (숏폼 생성)

```typescript
// src/app/api/projects/route.ts
GET /api/projects
Query: { type?, status?, page, limit }
Response: { projects: Project[], total, page, limit }

POST /api/projects
Body: {
  type: 'shortform' | 'live'
  title: string
  brand_profile_id?: string
  keyword?: string
  template_id?: string
}
Response: { project: Project }

GET /api/projects/:id
Response: { project: Project, schedules: Schedule[] }

PATCH /api/projects/:id
Body: Partial<Project>
Response: { project: Project }

DELETE /api/projects/:id
Response: { success: boolean }

// 숏폼 생성 파이프라인
POST /api/projects/:id/generate-script
Body: { keyword: string, tone?: string }
Response: { script: string, estimated_duration: number }

POST /api/projects/:id/generate-images
Body: { script: string, count: number }
Response: { images: Array<{ url, prompt }> }

POST /api/projects/:id/generate-voice
Body: { script: string, voice_id: string }
Response: { audio_url: string, duration: number }

POST /api/projects/:id/compose-video
Body: {
  script: string
  images: string[]
  audio_url: string
  template_id?: string
}
Response: {
  video_url: string
  thumbnail_url: string
  duration: number
}

// 전체 파이프라인 한 번에 (편의 엔드포인트)
POST /api/projects/:id/generate-all
Body: {
  keyword: string
  brand_profile_id?: string
  template_id?: string
}
Response: {
  status: 'processing' | 'completed'
  job_id: string
}

GET /api/projects/:id/generation-status/:jobId
Response: {
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number // 0-100
  current_step: string
  result?: Project
  error?: string
}
```

### 2.4 채널 연동

```typescript
// src/app/api/channels/route.ts
GET /api/channels
Response: { channels: Channel[] }

// OAuth 시작
GET /api/channels/connect/:platform
Query: { redirect_uri }
Response: Redirect to platform OAuth

// OAuth 콜백
GET /api/channels/callback/:platform
Query: { code, state }
Response: { channel: Channel }

DELETE /api/channels/:id
Response: { success: boolean }

// 채널 정보 갱신
POST /api/channels/:id/refresh
Response: { channel: Channel }

// 토큰 갱신
POST /api/channels/:id/refresh-token
Response: { success: boolean, expires_at: string }
```

### 2.5 배포 & 스케줄링

```typescript
// src/app/api/schedules/route.ts
GET /api/schedules
Query: { start_date?, end_date?, status? }
Response: { schedules: Schedule[] }

POST /api/schedules
Body: {
  project_id: string
  channel_ids: string[]
  scheduled_at: string // ISO datetime
  metadata: {
    title: string
    description: string
    tags: string[]
    visibility: 'public' | 'private' | 'unlisted'
  }
}
Response: { schedules: Schedule[] }

// 즉시 발행
POST /api/schedules/publish-now
Body: {
  project_id: string
  channel_ids: string[]
  metadata: { ... }
}
Response: { schedules: Schedule[] }

PATCH /api/schedules/:id
Body: { scheduled_at?, metadata? }
Response: { schedule: Schedule }

DELETE /api/schedules/:id
Response: { success: boolean }

// AI 최적 시간 추천
GET /api/schedules/optimal-time
Query: { channel_id, project_id }
Response: {
  recommended_times: Array<{
    datetime: string
    score: number // 0-100
    reason: string
  }>
}
```

### 2.6 에셋 관리

```typescript
// src/app/api/assets/route.ts
GET /api/assets
Query: { type?, folder?, tags?, page, limit }
Response: { assets: Asset[], total }

// 업로드
POST /api/assets/upload
Body: FormData { file, folder?, tags? }
Response: { asset: Asset }

// 다중 업로드
POST /api/assets/upload-multiple
Body: FormData { files[], folder?, tags? }
Response: { assets: Asset[] }

PATCH /api/assets/:id
Body: { folder?, tags?, filename? }
Response: { asset: Asset }

DELETE /api/assets/:id
Response: { success: boolean }

// AI 이미지 생성 후 저장
POST /api/assets/generate-image
Body: { prompt: string, count: number, style?: string }
Response: { assets: Asset[] }
```

### 2.7 템플릿

```typescript
// src/app/api/templates/route.ts
GET /api/templates
Query: { category?, is_public? }
Response: { templates: Template[] }

POST /api/templates
Body: {
  name: string
  description: string
  category: string
  structure: object
}
Response: { template: Template }

GET /api/templates/:id
Response: { template: Template }

// 템플릿 사용
POST /api/templates/:id/use
Body: { project_id: string, variables: object }
Response: { success: boolean }

// 템플릿 복사 (커스터마이징)
POST /api/templates/:id/duplicate
Response: { template: Template }
```

### 2.8 분석

```typescript
// src/app/api/analytics/route.ts
GET /api/analytics/overview
Query: { start_date?, end_date? }
Response: {
  total_views: number
  total_likes: number
  total_projects: number
  top_performing: Project[]
}

GET /api/analytics/project/:projectId
Response: {
  timeline: Array<{ date, views, likes, comments }>
  demographics: object
  platforms: Array<{ platform, views, engagement }>
}

GET /api/analytics/channel/:channelId
Query: { start_date?, end_date? }
Response: {
  total_videos: number
  total_views: number
  growth_rate: number
  best_performing_times: string[]
}

// AI 인사이트
GET /api/analytics/insights
Response: {
  insights: Array<{
    type: 'suggestion' | 'warning' | 'achievement'
    title: string
    description: string
    action?: string
  }>
}
```

---

## 3. 사용자 플로우 및 UX 개선

### 3.1 온보딩 플로우 (첫 사용자 경험)

```typescript
// src/app/(dashboard)/onboarding/page.tsx

interface OnboardingStep {
  id: string
  title: string
  description: string
  component: React.ComponentType
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: '환영합니다!',
    description: 'XCaster로 10분 만에 영상을 만들어보세요',
    component: WelcomeStep
  },
  {
    id: 'brand-setup',
    title: '브랜드 프로필 설정',
    description: 'AI가 당신의 스타일을 학습합니다',
    component: BrandSetupStep
  },
  {
    id: 'channel-connect',
    title: '채널 연결',
    description: '발행할 채널을 연결하세요',
    component: ChannelConnectStep
  },
  {
    id: 'first-project',
    title: '첫 영상 만들기',
    description: '간단한 키워드로 시작해보세요',
    component: FirstProjectStep
  }
]

// 각 단계별 컴포넌트 예시

function BrandSetupStep() {
  return (
    <div className="space-y-6">
      <h2>당신의 브랜드를 알려주세요</h2>

      <div className="grid gap-4">
        {/* 톤앤매너 선택 */}
        <div>
          <label>톤앤매너</label>
          <div className="grid grid-cols-2 gap-2">
            <ToneCard tone="professional" label="전문적" />
            <ToneCard tone="casual" label="캐주얼" />
            <ToneCard tone="humorous" label="유머러스" />
            <ToneCard tone="educational" label="교육적" />
          </div>
        </div>

        {/* 기존 콘텐츠 업로드 (선택) */}
        <div>
          <label>기존 영상이 있나요? (선택사항)</label>
          <p className="text-sm text-muted">
            과거 영상 2-3개를 업로드하면 AI가 스타일을 분석합니다
          </p>
          <FileUpload accept="video/*" maxFiles={3} />
        </div>

        {/* 색상 선호도 */}
        <div>
          <label>선호하는 색상</label>
          <ColorPicker multiple max={5} />
        </div>
      </div>

      <Button onClick={handleNext}>다음</Button>
      <Button variant="ghost" onClick={handleSkip}>나중에 설정하기</Button>
    </div>
  )
}
```

### 3.2 숏폼 생성 플로우 (개선된 UX)

```typescript
// src/app/(dashboard)/shortform/new/page.tsx

export default function NewShortformPage() {
  const [mode, setMode] = useState<'quick' | 'custom'>('quick')
  const [step, setStep] = useState(1)

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 모드 선택 */}
      <ModeSelector mode={mode} onChange={setMode} />

      {mode === 'quick' ? (
        <QuickMode />
      ) : (
        <CustomMode step={step} onStepChange={setStep} />
      )}
    </div>
  )
}

// 빠른 모드 (10분)
function QuickMode() {
  const [keyword, setKeyword] = useState('')
  const [generating, setGenerating] = useState(false)

  const handleGenerate = async () => {
    setGenerating(true)

    try {
      // 전체 파이프라인 한 번에
      const response = await fetch('/api/projects/generate-all', {
        method: 'POST',
        body: JSON.stringify({
          keyword,
          brand_profile_id: selectedBrandProfile?.id
        })
      })

      const { job_id } = await response.json()

      // 진행 상황 폴링
      pollGenerationStatus(job_id)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1>빠른 모드</h1>
      <p className="text-muted">키워드만 입력하면 AI가 모든 걸 처리합니다</p>

      <div className="space-y-4">
        <Input
          placeholder="예: 여름 휴가 패킹 팁"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <BrandProfileSelect />

        <Button onClick={handleGenerate} disabled={!keyword || generating}>
          {generating ? (
            <>
              <Loader className="animate-spin mr-2" />
              생성 중...
            </>
          ) : (
            '영상 생성하기'
          )}
        </Button>
      </div>

      {generating && <GenerationProgress jobId={job_id} />}
    </div>
  )
}

// 커스텀 모드 (30분)
function CustomMode({ step, onStepChange }) {
  const steps = [
    { id: 1, title: '키워드 & 톤', component: KeywordStep },
    { id: 2, title: 'AI 스크립트', component: ScriptStep },
    { id: 3, title: '이미지 선택', component: ImageStep },
    { id: 4, title: '음성 설정', component: VoiceStep },
    { id: 5, title: '편집', component: EditStep },
    { id: 6, title: '완성', component: FinalizeStep }
  ]

  const CurrentStep = steps[step - 1].component

  return (
    <div>
      {/* 진행 표시 */}
      <ProgressStepper steps={steps} currentStep={step} />

      {/* 현재 단계 */}
      <CurrentStep
        onNext={() => onStepChange(step + 1)}
        onBack={() => onStepChange(step - 1)}
      />
    </div>
  )
}

// 스크립트 단계 예시
function ScriptStep({ onNext, onBack }) {
  const [script, setScript] = useState('')
  const [aiSuggestions, setAiSuggestions] = useState([])

  const handleRegenerate = async () => {
    // AI 재생성
    const newScript = await generateScript(keyword)
    setScript(newScript)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2>AI가 생성한 스크립트</h2>
        <Button variant="outline" onClick={handleRegenerate}>
          다시 생성
        </Button>
      </div>

      {/* 편집 가능한 스크립트 */}
      <Textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        rows={10}
        className="font-mono"
      />

      {/* AI 개선 제안 */}
      {aiSuggestions.length > 0 && (
        <div className="border rounded p-4 bg-blue-50">
          <h3 className="font-semibold mb-2">💡 AI 제안</h3>
          <ul className="space-y-2">
            {aiSuggestions.map((suggestion, i) => (
              <li key={i} className="flex items-start">
                <Button size="sm" variant="ghost" onClick={() => applySuggestion(suggestion)}>
                  적용
                </Button>
                <span className="ml-2">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>이전</Button>
        <Button onClick={onNext}>다음</Button>
      </div>
    </div>
  )
}

// 생성 진행 상황 컴포넌트
function GenerationProgress({ jobId }) {
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/projects/generation-status/${jobId}`)
      const data = await res.json()
      setStatus(data)

      if (data.status === 'completed' || data.status === 'failed') {
        clearInterval(interval)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [jobId])

  if (!status) return <Loader />

  return (
    <div className="space-y-4">
      <Progress value={status.progress} />

      <div className="space-y-2">
        <div className="flex items-center">
          {status.current_step === 'script' && <Check />}
          <span>AI 스크립트 생성</span>
        </div>
        <div className="flex items-center">
          {status.current_step === 'images' && <Loader className="animate-spin" />}
          <span>이미지 생성 (4장)</span>
        </div>
        <div className="flex items-center">
          <span>음성 합성</span>
        </div>
        <div className="flex items-center">
          <span>영상 합성</span>
        </div>
      </div>

      {status.status === 'completed' && (
        <Alert>
          <CheckCircle className="text-green-500" />
          <AlertTitle>완성!</AlertTitle>
          <AlertDescription>
            영상이 생성되었습니다. 미리보기하시겠어요?
          </AlertDescription>
          <Button onClick={() => router.push(`/shortform/${status.result.id}`)}>
            미리보기
          </Button>
        </Alert>
      )}
    </div>
  )
}
```

### 3.3 대시보드 UX

```typescript
// src/app/(dashboard)/dashboard/page.tsx

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* 빠른 액션 */}
      <QuickActions />

      {/* 통계 요약 */}
      <StatsOverview />

      {/* 최근 프로젝트 */}
      <RecentProjects />

      {/* 예약된 발행 */}
      <UpcomingSchedules />

      {/* AI 인사이트 */}
      <AIInsights />
    </div>
  )
}

function QuickActions() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="cursor-pointer hover:shadow-lg transition">
        <CardContent className="pt-6">
          <Video className="w-8 h-8 mb-2" />
          <h3 className="font-semibold">새 숏폼</h3>
          <p className="text-sm text-muted">10분 만에 생성</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <Broadcast className="w-8 h-8 mb-2" />
          <h3 className="font-semibold">라이브 시작</h3>
          <p className="text-sm text-muted">실시간 방송</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <Calendar className="w-8 h-8 mb-2" />
          <h3 className="font-semibold">스케줄 관리</h3>
          <p className="text-sm text-muted">예약 발행</p>
        </CardContent>
      </Card>
    </div>
  )
}

function AIInsights() {
  const insights = [
    {
      type: 'suggestion',
      title: '최적 업로드 시간',
      description: 'YouTube는 화요일 저녁 8시에 업로드하면 조회수가 평균 2.3배 높습니다'
    },
    {
      type: 'achievement',
      title: '이번 주 성과',
      description: '지난주 대비 조회수 45% 증가!'
    },
    {
      type: 'warning',
      title: '채널 토큰 만료 예정',
      description: 'Facebook 채널 토큰이 3일 후 만료됩니다. 재연결이 필요합니다.'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>💡 AI 인사이트</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {insights.map((insight, i) => (
            <Alert key={i}>
              <AlertTitle>{insight.title}</AlertTitle>
              <AlertDescription>{insight.description}</AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
```

---

## 4. AI 파이프라인 구조

### 4.1 시나리오 생성

```typescript
// src/lib/ai/scriptGenerator.ts

import Anthropic from '@anthropic-ai/sdk'

interface ScriptGenerationOptions {
  keyword: string
  tone: 'professional' | 'casual' | 'humorous' | 'educational'
  duration: number // 초 단위
  brandProfile?: BrandProfile
}

export async function generateScript(options: ScriptGenerationOptions): Promise<string> {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  })

  // 브랜드 프로필 기반 시스템 프롬프트
  const systemPrompt = buildSystemPrompt(options.brandProfile, options.tone)

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1500,
    system: systemPrompt,
    messages: [{
      role: 'user',
      content: `Create a ${options.duration}-second video script about: ${options.keyword}

Format:
[INTRO - 0:00-0:03]
(Engaging hook)

[MAIN - 0:03-0:25]
(Key points, numbered)

[OUTRO - 0:25-0:30]
(Call to action)

Requirements:
- Natural, conversational language
- Clear structure with timestamps
- Engaging from start to finish
- Suitable for ${options.tone} tone`
    }]
  })

  return message.content[0].text
}

function buildSystemPrompt(brandProfile?: BrandProfile, tone?: string): string {
  let prompt = `You are a professional video script writer specializing in short-form content.`

  if (brandProfile) {
    prompt += `\n\nBrand Guidelines:
- Tone: ${brandProfile.tone}
- Target Audience: ${brandProfile.target_audience}
- Avoid phrases: ${brandProfile.preferences?.avoided_phrases?.join(', ')}
- Preferred style: ${brandProfile.preferences?.preferred_style}`
  }

  prompt += `\n\nAlways write in Korean unless specified otherwise.`

  return prompt
}

// 사용량 로깅
async function logUsage(userId: string, cost: number) {
  await supabase
    .from('usage_logs')
    .insert({
      user_id: userId,
      resource_type: 'script_generation',
      cost
    })
}
```

### 4.2 이미지 생성

```typescript
// src/lib/ai/imageGenerator.ts

interface ImageGenerationOptions {
  prompts: string[]
  style?: string
  aspectRatio?: '16:9' | '9:16' | '1:1'
}

export async function generateImages(options: ImageGenerationOptions): Promise<string[]> {
  const piapi = new PiAPI(process.env.PIAPI_API_KEY)

  const images = await Promise.all(
    options.prompts.map(async (prompt) => {
      const result = await piapi.generate({
        model: 'flux-pro',
        prompt: enhancePrompt(prompt, options.style),
        aspect_ratio: options.aspectRatio || '16:9',
        num_outputs: 1
      })

      return result.images[0].url
    })
  )

  return images
}

function enhancePrompt(prompt: string, style?: string): string {
  let enhanced = prompt

  // 스타일 추가
  if (style) {
    enhanced += `, ${style} style`
  }

  // 품질 향상 키워드
  enhanced += ', high quality, professional, detailed'

  return enhanced
}

// 프롬프트 자동 생성 (스크립트에서)
export function extractImagePromptsFromScript(script: string): string[] {
  // 스크립트를 섹션별로 나누고 각 섹션에 맞는 이미지 프롬프트 생성
  const sections = script.split('\n\n')

  return sections.map(section => {
    // Claude에게 이미지 프롬프트 생성 요청
    return generateImagePrompt(section)
  })
}
```

### 4.3 음성 합성

```typescript
// src/lib/ai/voiceGenerator.ts

import { ElevenLabsClient } from 'elevenlabs'

interface VoiceGenerationOptions {
  text: string
  voiceId: string
  speed?: number // 0.5 - 2.0
}

export async function generateVoice(options: VoiceGenerationOptions): Promise<string> {
  const elevenlabs = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY
  })

  const audio = await elevenlabs.generate({
    voice: options.voiceId,
    text: options.text,
    model_id: 'eleven_multilingual_v2',
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.75,
      speed: options.speed || 1.0
    }
  })

  // Supabase Storage에 업로드
  const audioUrl = await uploadToStorage(audio, 'audio')

  return audioUrl
}

// 스크립트 타이밍 분석
export function analyzeScriptTiming(script: string): Array<{ text: string, start: number, end: number }> {
  // 타임스탬프 파싱
  const regex = /\[.*?(\d+:\d+)-(\d+:\d+)\](.*?)(?=\[|$)/gs
  const matches = [...script.matchAll(regex)]

  return matches.map(match => ({
    text: match[3].trim(),
    start: parseTimestamp(match[1]),
    end: parseTimestamp(match[2])
  }))
}
```

### 4.4 비디오 합성

```typescript
// src/lib/ai/videoComposer.ts

import { Creatomate } from 'creatomate'

interface VideoCompositionOptions {
  script: string
  images: string[]
  audioUrl: string
  templateId?: string
  brandProfile?: BrandProfile
}

export async function composeVideo(options: VideoCompositionOptions): Promise<string> {
  const creatomate = new Creatomate(process.env.CREATOMATE_API_KEY)

  // 템플릿 로드 또는 기본 템플릿 사용
  const template = options.templateId
    ? await loadTemplate(options.templateId)
    : getDefaultTemplate()

  // 타이밍 계산
  const timing = analyzeScriptTiming(options.script)

  // 템플릿에 데이터 주입
  const modifications = {
    'Audio': options.audioUrl,
    'Images': timing.map((t, i) => ({
      source: options.images[i % options.images.length],
      time: t.start,
      duration: t.end - t.start
    })),
    'Text': timing.map(t => ({
      text: t.text,
      time: t.start,
      duration: t.end - t.start
    }))
  }

  // 렌더링
  const result = await creatomate.render({
    template_id: template.id,
    modifications
  })

  return result.url
}

// 기본 템플릿 구조
function getDefaultTemplate() {
  return {
    id: 'default',
    elements: [
      {
        type: 'composition',
        duration: 30,
        elements: [
          {
            type: 'audio',
            source: '{{Audio}}',
            volume: 1.0
          },
          {
            type: 'image',
            source: '{{Images}}',
            animations: [
              { type: 'fade-in', duration: 0.5 },
              { type: 'ken-burns' }
            ]
          },
          {
            type: 'text',
            text: '{{Text}}',
            style: {
              font: 'Pretendard',
              size: 48,
              color: '#FFFFFF',
              shadow: true
            },
            position: { y: '75%' }
          }
        ]
      }
    ]
  }
}
```

### 4.5 전체 파이프라인 오케스트레이션

```typescript
// src/lib/ai/pipeline.ts

export class VideoGenerationPipeline {
  private jobId: string
  private userId: string
  private projectId: string
  private progress: number = 0

  constructor(jobId: string, userId: string, projectId: string) {
    this.jobId = jobId
    this.userId = userId
    this.projectId = projectId
  }

  async execute(options: {
    keyword: string
    brandProfileId?: string
    templateId?: string
  }) {
    try {
      // 1. 스크립트 생성
      await this.updateProgress(0, 'script')
      const script = await this.generateScript(options.keyword, options.brandProfileId)
      await this.updateProject({ script })

      // 2. 이미지 프롬프트 추출 및 생성
      await this.updateProgress(25, 'images')
      const imagePrompts = extractImagePromptsFromScript(script)
      const images = await this.generateImages(imagePrompts)
      await this.updateProject({ images })

      // 3. 음성 합성
      await this.updateProgress(50, 'voice')
      const audioUrl = await this.generateVoice(script)
      await this.updateProject({ audio_url: audioUrl })

      // 4. 비디오 합성
      await this.updateProgress(75, 'composition')
      const videoUrl = await this.composeVideo({
        script,
        images,
        audioUrl,
        templateId: options.templateId
      })

      // 5. 썸네일 생성
      const thumbnailUrl = await generateThumbnail(videoUrl)

      // 6. 완료
      await this.updateProgress(100, 'completed')
      await this.updateProject({
        status: 'ready',
        final_video_url: videoUrl,
        thumbnail_url: thumbnailUrl
      })

      return { success: true, projectId: this.projectId }

    } catch (error) {
      await this.updateProgress(this.progress, 'failed')
      await this.updateProject({ status: 'failed' })
      throw error
    }
  }

  private async updateProgress(progress: number, step: string) {
    this.progress = progress

    // Redis나 데이터베이스에 저장
    await redis.set(
      `job:${this.jobId}`,
      JSON.stringify({ progress, step, status: step === 'failed' ? 'failed' : 'processing' }),
      'EX',
      3600 // 1시간 후 만료
    )
  }

  private async updateProject(updates: Partial<Project>) {
    await supabase
      .from('projects')
      .update(updates)
      .eq('id', this.projectId)
  }

  private async generateScript(keyword: string, brandProfileId?: string) {
    const brandProfile = brandProfileId
      ? await getBrandProfile(brandProfileId)
      : undefined

    return await generateScript({
      keyword,
      tone: brandProfile?.tone || 'casual',
      duration: 30,
      brandProfile
    })
  }

  private async generateImages(prompts: string[]) {
    return await generateImages({
      prompts,
      aspectRatio: '16:9'
    })
  }

  private async generateVoice(script: string) {
    // 기본 음성 ID 사용 또는 브랜드 프로필의 선호 음성
    return await generateVoice({
      text: script,
      voiceId: 'default-korean-voice'
    })
  }

  private async composeVideo(options) {
    return await composeVideo(options)
  }
}

// API에서 사용
export async function startVideoGeneration(userId: string, projectId: string, options: any) {
  const jobId = uuidv4()

  // 백그라운드 작업으로 실행
  const pipeline = new VideoGenerationPipeline(jobId, userId, projectId)

  // 큐에 추가 (다음 섹션 참조)
  await addToQueue('video-generation', {
    jobId,
    userId,
    projectId,
    options
  })

  return { jobId }
}
```

---

## 5. 큐 시스템 설계

### 5.1 BullMQ 설정

```typescript
// src/lib/queue/index.ts

import { Queue, Worker } from 'bullmq'
import Redis from 'ioredis'

const connection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null
})

// 비디오 생성 큐
export const videoGenerationQueue = new Queue('video-generation', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    },
    removeOnComplete: {
      count: 100 // 최근 100개만 보관
    },
    removeOnFail: {
      count: 500
    }
  }
})

// 발행 큐
export const publishQueue = new Queue('publish', {
  connection,
  defaultJobOptions: {
    attempts: 5,
    backoff: {
      type: 'exponential',
      delay: 5000
    }
  }
})

// 분석 데이터 수집 큐
export const analyticsQueue = new Queue('analytics', {
  connection,
  defaultJobOptions: {
    repeat: {
      pattern: '0 */6 * * *' // 6시간마다
    }
  }
})
```

### 5.2 Worker 구현

```typescript
// src/lib/queue/workers/videoGenerationWorker.ts

import { Worker, Job } from 'bullmq'
import { VideoGenerationPipeline } from '@/lib/ai/pipeline'

export const videoGenerationWorker = new Worker(
  'video-generation',
  async (job: Job) => {
    const { jobId, userId, projectId, options } = job.data

    const pipeline = new VideoGenerationPipeline(jobId, userId, projectId)

    try {
      const result = await pipeline.execute(options)

      // 성공 로깅
      await logSuccess(jobId, result)

      return result
    } catch (error) {
      // 실패 로깅
      await logFailure(jobId, error)

      throw error
    }
  },
  {
    connection,
    concurrency: 5, // 동시에 5개까지 처리
    limiter: {
      max: 10,
      duration: 60000 // 1분에 최대 10개
    }
  }
)

videoGenerationWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`)
})

videoGenerationWorker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err)
})

// src/lib/queue/workers/publishWorker.ts

export const publishWorker = new Worker(
  'publish',
  async (job: Job) => {
    const { scheduleId } = job.data

    const schedule = await getSchedule(scheduleId)
    const project = await getProject(schedule.project_id)
    const channel = await getChannel(schedule.channel_id)

    // 플랫폼별 발행 로직
    const result = await publishToChannel(channel.platform, {
      videoUrl: project.final_video_url,
      title: schedule.title,
      description: schedule.description,
      tags: schedule.tags,
      visibility: schedule.visibility,
      accessToken: channel.access_token
    })

    // 스케줄 업데이트
    await updateSchedule(scheduleId, {
      status: 'published',
      published_url: result.url,
      platform_video_id: result.id
    })

    return result
  },
  { connection }
)
```

### 5.3 스케줄링 로직

```typescript
// src/lib/queue/scheduler.ts

import { CronJob } from 'cron'

// 매분마다 발행 예정인 스케줄 확인
export const publishScheduler = new CronJob(
  '* * * * *', // 매분
  async () => {
    const now = new Date()
    const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60000)

    // 5분 이내에 발행 예정인 스케줄 조회
    const { data: schedules } = await supabase
      .from('schedules')
      .select('*')
      .eq('status', 'pending')
      .gte('scheduled_at', now.toISOString())
      .lte('scheduled_at', fiveMinutesFromNow.toISOString())

    // 큐에 추가
    for (const schedule of schedules) {
      await publishQueue.add(
        'publish-video',
        { scheduleId: schedule.id },
        {
          delay: new Date(schedule.scheduled_at).getTime() - now.getTime()
        }
      )

      // 상태 업데이트
      await supabase
        .from('schedules')
        .update({ status: 'queued' })
        .eq('id', schedule.id)
    }
  },
  null,
  true,
  'Asia/Seoul'
)

publishScheduler.start()
```

---

## 6. 비용 최적화 전략

### 6.1 캐싱 시스템

```typescript
// src/lib/cache/scriptCache.ts

import { Redis } from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)

export async function getCachedScript(keyword: string, tone: string): Promise<string | null> {
  const cacheKey = `script:${keyword}:${tone}`
  return await redis.get(cacheKey)
}

export async function cacheScript(keyword: string, tone: string, script: string) {
  const cacheKey = `script:${keyword}:${tone}`
  await redis.set(cacheKey, script, 'EX', 7 * 24 * 60 * 60) // 7일
}

// 이미지 캐시 (프롬프트 기반)
export async function getCachedImage(prompt: string): Promise<string | null> {
  const cacheKey = `image:${hashPrompt(prompt)}`
  return await redis.get(cacheKey)
}

function hashPrompt(prompt: string): string {
  return crypto.createHash('sha256').update(prompt).digest('hex')
}
```

### 6.2 비용 모니터링

```typescript
// src/lib/cost/monitor.ts

export async function trackCost(
  userId: string,
  resourceType: string,
  quantity: number,
  cost: number
) {
  // 사용량 로그 저장
  await supabase.from('usage_logs').insert({
    user_id: userId,
    resource_type: resourceType,
    quantity,
    cost
  })

  // 실시간 비용 집계
  const totalCost = await getCurrentMonthCost(userId)

  // 플랜 한도 체크
  const plan = await getUserPlan(userId)
  if (totalCost > plan.cost_limit) {
    throw new Error('Monthly cost limit exceeded')
  }
}

export async function getCurrentMonthCost(userId: string): Promise<number> {
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { data } = await supabase
    .from('usage_logs')
    .select('cost')
    .eq('user_id', userId)
    .gte('created_at', startOfMonth.toISOString())

  return data?.reduce((sum, log) => sum + parseFloat(log.cost), 0) || 0
}
```

### 6.3 플랜별 제한

```typescript
// src/lib/plans/limits.ts

export const PLAN_LIMITS = {
  free: {
    shortforms_per_month: 5,
    channels: 1,
    storage_gb: 1,
    api_cost_limit: 5, // $5
    live_hours_per_month: 0
  },
  basic: {
    shortforms_per_month: 30,
    channels: 3,
    storage_gb: 10,
    api_cost_limit: 20,
    live_hours_per_month: 10
  },
  standard: {
    shortforms_per_month: 100,
    channels: 10,
    storage_gb: 50,
    api_cost_limit: 50,
    live_hours_per_month: 50
  },
  professional: {
    shortforms_per_month: -1, // 무제한
    channels: -1,
    storage_gb: 200,
    api_cost_limit: 200,
    live_hours_per_month: -1
  }
}

export async function checkLimit(
  userId: string,
  limitType: keyof typeof PLAN_LIMITS.free
): Promise<boolean> {
  const user = await getUser(userId)
  const limits = PLAN_LIMITS[user.plan]

  if (limits[limitType] === -1) return true // 무제한

  const currentUsage = await getCurrentUsage(userId, limitType)

  return currentUsage < limits[limitType]
}
```

---

## 7. 에러 핸들링 및 재시도 로직

### 7.1 통합 에러 핸들러

```typescript
// src/lib/errors/handler.ts

export class APIError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export const errorHandler = (error: any) => {
  // 알려진 에러
  if (error instanceof APIError) {
    return {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details
      }
    }
  }

  // AI API 에러
  if (error.name === 'AnthropicError') {
    return {
      success: false,
      error: {
        code: 'AI_API_ERROR',
        message: 'AI 서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
        details: error.message
      }
    }
  }

  // 데이터베이스 에러
  if (error.code?.startsWith('23')) { // PostgreSQL error codes
    return {
      success: false,
      error: {
        code: 'DATABASE_ERROR',
        message: '데이터 처리 중 오류가 발생했습니다.'
      }
    }
  }

  // 기타 에러
  console.error('Unexpected error:', error)
  return {
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
    }
  }
}
```

### 7.2 재시도 로직

```typescript
// src/lib/utils/retry.ts

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number
    initialDelay?: number
    maxDelay?: number
    factor?: number
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 30000,
    factor = 2
  } = options

  let lastError: Error
  let delay = initialDelay

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error

      if (attempt === maxRetries) {
        break
      }

      // 재시도 불가능한 에러는 즉시 throw
      if (!isRetryableError(error)) {
        throw error
      }

      await new Promise(resolve => setTimeout(resolve, delay))
      delay = Math.min(delay * factor, maxDelay)
    }
  }

  throw lastError!
}

function isRetryableError(error: any): boolean {
  // 네트워크 에러
  if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
    return true
  }

  // HTTP 5xx 에러
  if (error.statusCode >= 500 && error.statusCode < 600) {
    return true
  }

  // Rate limit
  if (error.statusCode === 429) {
    return true
  }

  return false
}

// 사용 예시
const script = await retryWithBackoff(
  () => generateScript({ keyword, tone }),
  { maxRetries: 3, initialDelay: 2000 }
)
```

---

## 8. 권한 및 보안 관리

### 8.1 Row Level Security (RLS)

```sql
-- 프로젝트는 소유자만 접근 가능
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own projects"
ON projects
FOR ALL
USING (auth.uid() = user_id);

-- 팀 멤버는 팀 프로젝트 접근 가능
CREATE POLICY "Team members can access team projects"
ON projects
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM team_members tm
    JOIN teams t ON t.id = tm.team_id
    WHERE tm.user_id = auth.uid()
    AND t.id = projects.team_id
  )
);

-- 채널은 소유자만 수정 가능
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only manage their own channels"
ON channels
FOR ALL
USING (auth.uid() = user_id);
```

### 8.2 API 인증 미들웨어

```typescript
// src/middleware/auth.ts

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function authMiddleware(request: NextRequest) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // 사용자 정보를 헤더에 추가
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-user-id', session.user.id)

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
}

// API Route에서 사용
export async function GET(request: NextRequest) {
  const userId = request.headers.get('x-user-id')

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ...
}
```

### 8.3 Rate Limiting

```typescript
// src/lib/rateLimit.ts

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
})

// 사용자별 rate limit
export const userRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'), // 1분에 100 요청
  analytics: true
})

// API 엔드포인트별 rate limit
export const apiRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 비디오 생성: 1분에 10개
  analytics: true
})

// 사용 예시
export async function POST(request: NextRequest) {
  const userId = request.headers.get('x-user-id')!

  const { success, remaining } = await userRateLimit.limit(userId)

  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded', retry_after: 60 },
      { status: 429 }
    )
  }

  // ...
}
```

---

## 9. 성능 최적화

### 9.1 데이터베이스 최적화

```sql
-- 인덱스 추가 (위에서 언급한 것 외 추가)
CREATE INDEX CONCURRENTLY idx_projects_user_id_status ON projects(user_id, status);
CREATE INDEX CONCURRENTLY idx_schedules_scheduled_at_status ON schedules(scheduled_at, status);
CREATE INDEX CONCURRENTLY idx_analytics_project_id_snapshot_at ON analytics(project_id, snapshot_at);

-- 파티셔닝 (대용량 테이블)
CREATE TABLE usage_logs_2024_01 PARTITION OF usage_logs
FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

-- Materialized View (통계)
CREATE MATERIALIZED VIEW user_monthly_stats AS
SELECT
  user_id,
  DATE_TRUNC('month', created_at) AS month,
  COUNT(*) AS total_projects,
  SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) AS published_count,
  AVG(generation_cost) AS avg_cost
FROM projects
GROUP BY user_id, DATE_TRUNC('month', created_at);

CREATE UNIQUE INDEX ON user_monthly_stats (user_id, month);

-- 자동 갱신
CREATE OR REPLACE FUNCTION refresh_user_stats()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY user_monthly_stats;
END;
$$ LANGUAGE plpgsql;

-- Cron (pg_cron 확장 필요)
SELECT cron.schedule('refresh-stats', '0 0 * * *', 'SELECT refresh_user_stats()');
```

### 9.2 프론트엔드 최적화

```typescript
// src/components/ProjectList.tsx

import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'

export function ProjectList() {
  const { ref, inView } = useInView()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: ({ pageParam = 0 }) =>
      fetch(`/api/projects?page=${pageParam}&limit=20`).then(r => r.json()),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length : undefined
    }
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  return (
    <div>
      {data?.pages.map((page) =>
        page.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))
      )}
      <div ref={ref}>{isFetchingNextPage && 'Loading...'}</div>
    </div>
  )
}

// 이미지 최적화
import Image from 'next/image'

function ProjectThumbnail({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={320}
      height={180}
      loading="lazy"
      placeholder="blur"
      blurDataURL={generateBlurDataURL(src)}
    />
  )
}
```

### 9.3 캐싱 전략

```typescript
// src/app/api/projects/route.ts

export const revalidate = 60 // 60초마다 재검증

export async function GET(request: NextRequest) {
  const userId = request.headers.get('x-user-id')!

  // Redis 캐시 확인
  const cacheKey = `projects:${userId}`
  const cached = await redis.get(cacheKey)

  if (cached) {
    return NextResponse.json(JSON.parse(cached), {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
      }
    })
  }

  // DB 조회
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  // 캐시 저장
  await redis.set(cacheKey, JSON.stringify(projects), 'EX', 60)

  return NextResponse.json(projects, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
    }
  })
}
```

---

## 10. 모니터링 및 로깅

### 10.1 Sentry 통합

```typescript
// src/lib/monitoring/sentry.ts

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,

  beforeSend(event, hint) {
    // 민감한 정보 제거
    if (event.request) {
      delete event.request.cookies
      delete event.request.headers
    }

    return event
  }
})

// 사용 예시
try {
  await generateVideo(options)
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      component: 'video-generation',
      user_id: userId
    },
    extra: {
      options
    }
  })

  throw error
}
```

### 10.2 구조화된 로깅

```typescript
// src/lib/logger.ts

import pino from 'pino'

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => {
      return { level: label }
    }
  },
  timestamp: pino.stdTimeFunctions.isoTime
})

// 사용 예시
logger.info({
  msg: 'Video generation started',
  user_id: userId,
  project_id: projectId,
  keyword
})

logger.error({
  msg: 'Video generation failed',
  err: error,
  user_id: userId,
  project_id: projectId
})
```

### 10.3 메트릭 수집

```typescript
// src/lib/metrics/index.ts

import { metrics } from '@opentelemetry/api'

const meter = metrics.getMeter('xcaster')

// 카운터
const videoGenerationCounter = meter.createCounter('video_generation_total', {
  description: 'Total number of video generations'
})

// 히스토그램
const videoGenerationDuration = meter.createHistogram('video_generation_duration', {
  description: 'Video generation duration in seconds',
  unit: 'seconds'
})

// 사용 예시
export async function generateVideo(options) {
  const startTime = Date.now()

  try {
    const result = await pipeline.execute(options)

    videoGenerationCounter.add(1, {
      status: 'success',
      user_plan: user.plan
    })

    return result
  } catch (error) {
    videoGenerationCounter.add(1, {
      status: 'error',
      error_type: error.name
    })

    throw error
  } finally {
    const duration = (Date.now() - startTime) / 1000
    videoGenerationDuration.record(duration)
  }
}
```

---

## 11. 배포 및 DevOps

### 11.1 환경 변수 관리

```bash
# .env.example

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI APIs
ANTHROPIC_API_KEY=
PIAPI_API_KEY=
ELEVENLABS_API_KEY=
CREATOMATE_API_KEY=

# Live Streaming
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=

# OAuth
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=

# Infrastructure
REDIS_URL=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Monitoring
SENTRY_DSN=
SENTRY_AUTH_TOKEN=

# Others
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

### 11.2 Docker 설정

```dockerfile
# Dockerfile

FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### 11.3 CI/CD (GitHub Actions)

```yaml
# .github/workflows/deploy.yml

name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/actions/deploy@v2
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 12. 실행 체크리스트

### MVP 출시 전 필수 구현 사항

#### Phase 1 (1개월)
- [ ] Supabase 설정 및 스키마 생성
- [ ] 기본 인증 (회원가입, 로그인)
- [ ] 브랜드 프로필 기본 버전
- [ ] UI 컴포넌트 라이브러리 구축

#### Phase 2 (2개월)
- [ ] AI 파이프라인 (스크립트, 이미지, 음성, 합성)
- [ ] 큐 시스템 (BullMQ)
- [ ] 프로젝트 관리 (CRUD)
- [ ] 비용 추적 시스템

#### Phase 3 (3개월)
- [ ] YouTube OAuth 연동
- [ ] 기본 배포 기능
- [ ] 대시보드
- [ ] 에러 핸들링 및 모니터링

### 성능 목표
- [ ] 페이지 로드: < 2초
- [ ] API 응답: < 500ms (95 percentile)
- [ ] 비디오 생성: < 5분
- [ ] 동시 사용자: 1,000명 지원

### 보안 체크리스트
- [ ] RLS 정책 설정
- [ ] API Rate Limiting
- [ ] OAuth 토큰 암호화
- [ ] HTTPS 강제
- [ ] CORS 설정

---

이 문서가 실제 구현에 도움이 되기를 바랍니다!
