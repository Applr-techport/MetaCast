# XCaster

> AI 기반 멀티채널 비디오 자동화 SaaS 플랫폼

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)

---

## 🎯 빠른 시작

### 개발자를 위한 가이드

**처음 시작하시나요?** → **[START_HERE.md](./START_HERE.md) 먼저 읽어주세요!**

이 파일은 프로젝트를 이해하고 개발을 시작하기 위한 완벽한 로드맵입니다.

---

## 📚 문서 구조

### 필수 문서 (꼭 읽어야 함)

| 문서 | 목적 | 소요 시간 | 우선순위 |
|------|------|-----------|----------|
| **[START_HERE.md](./START_HERE.md)** | 📍 개발 시작 가이드 및 로드맵 | 5분 | ⭐⭐⭐⭐⭐ |
| **[README.md](./README.md)** | 프로젝트 개요 (현재 문서) | 5분 | ⭐⭐⭐⭐⭐ |
| **[SAAS_IMPLEMENTATION_GUIDE.md](./SAAS_IMPLEMENTATION_GUIDE.md)** | 🔧 실제 구현 청사진 | 30분 | ⭐⭐⭐⭐⭐ |
| **[PRD.md](./PRD.md)** | 제품 요구사항 정의 | 15분 | ⭐⭐⭐⭐ |

### 참고 문서

| 문서 | 목적 | 읽어야 할 때 |
|------|------|-------------|
| **[claude.md](./claude.md)** | 개발 가이드 (기본) | 코딩 규칙 확인 시 |
| **[LANDING_PAGE.md](./LANDING_PAGE.md)** | 랜딩페이지 기획 (기본) | 랜딩페이지 개발 시 |
| **[LANDING_PAGE_IMPROVEMENTS.md](./LANDING_PAGE_IMPROVEMENTS.md)** | 🎨 랜딩페이지 차별화 전략 | 랜딩페이지 개발 시 |

---

## 🎯 프로젝트 개요

XCaster는 **AI 기술**을 활용하여 비디오 콘텐츠 제작부터 멀티 플랫폼 배포까지 **완전 자동화**하는 SaaS 플랫폼입니다.

### 핵심 가치

- **10분 제작**: 키워드만 입력하면 AI가 시나리오, 영상, 음성까지 자동 생성
- **멀티채널 최적화**: YouTube, Facebook, Instagram 등 각 플랫폼에 맞게 자동 변환
- **AI 기반 성과 예측**: 최적 업로드 시간, 콘텐츠 개선 제안
- **브랜드 학습**: 사용할수록 당신의 스타일을 학습하는 AI

### 타겟 사용자

- 🎨 **개인 크리에이터**: 빠른 콘텐츠 제작과 멀티 플랫폼 운영
- 📢 **마케팅 대행사**: 클라이언트별 다채널 콘텐츠 자동화
- 🏢 **기업 마케팅팀**: 브랜드 콘텐츠의 효율적 배포 관리
- 🛍️ **이커머스**: 상품 홍보 영상 자동 생성 및 라이브 커머스

---

## ✨ 주요 기능

### 1. 숏폼 자동 생성
- **AI 시나리오 생성**: Claude API로 키워드 기반 스크립트 작성
- **이미지 생성**: PiAPI (Flux) 활용 고품질 이미지
- **비디오 생성**: PiAPI (Kling) 활용 AI 영상 제작
- **음성 합성**: ElevenLabs 자연스러운 내레이션
- **비디오 편집**: Creatomate 자동 합성 및 효과

### 2. 멀티채널 배포
- YouTube, Facebook, Instagram, Naver TV 등 동시 배포
- **채널별 맞춤 최적화**: 16:9 → 9:16 자동 변환, 해시태그 전략
- 예약 발행 및 AI 기반 최적 시간 추천
- OAuth 2.0 기반 안전한 채널 연동

### 3. 브랜드 프로필 시스템 (차별화 포인트 🌟)
- 사용자의 톤앤매너, 비주얼 스타일 학습
- 수정 패턴 분석으로 점점 정확해지는 AI
- 100가지 이상의 고유 스타일 조합

### 4. AI 인사이트 & 최적화 (차별화 포인트 🌟)
- "화요일 저녁 8시 업로드 시 조회수 2.3배"
- "튜토리얼 콘텐츠가 리뷰보다 참여율 40% 높음"
- 실시간 성과 예측 및 개선 제안

### 5. 라이브 스트리밍
- Mux 기반 실시간 방송
- Pre-recorded 영상의 가상 라이브 방송
- VFX 효과 실시간 적용
- 멀티 플랫폼 동시 송출

### 6. 팀 협업 기능
- 프로젝트 기반 콘텐츠 조직화
- 역할별 권한 관리
- 승인 워크플로우
- 버전 히스토리

---

## 🏗️ 기술 스택

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
- **Queue**: BullMQ + Redis
- **Monitoring**: Sentry + Pino
- **Cache**: Redis (Upstash)
- **CDN**: Cloudflare Stream (옵션)

---

## 🚀 로컬 개발 시작

### 사전 요구사항

- Node.js 18.17 이상
- npm 또는 yarn
- Supabase 계정
- 필요한 API 키 (Claude, PiAPI, ElevenLabs, Mux 등)

### 설치

```bash
# 1. 저장소 클론
git clone https://github.com/your-org/xcaster.git
cd xcaster

# 2. 의존성 설치
npm install

# 3. 환경변수 설정
cp .env.example .env.local
# .env.local 파일을 열어 필요한 API 키 입력

# 4. Supabase 데이터베이스 설정
# SAAS_IMPLEMENTATION_GUIDE.md 섹션 1의 SQL 실행

# 5. 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 환경변수 설정

`.env.local` 파일에 다음 항목을 설정하세요:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI
ANTHROPIC_API_KEY=your_claude_api_key

# Video & Image Generation
PIAPI_API_KEY=your_piapi_key

# Voice
ELEVENLABS_API_KEY=your_elevenlabs_key

# Video Compositing
CREATOMATE_API_KEY=your_creatomate_key

# Live Streaming
MUX_TOKEN_ID=your_mux_token_id
MUX_TOKEN_SECRET=your_mux_token_secret

# Redis
REDIS_URL=your_redis_url

# OAuth (각 플랫폼별)
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
```

---

## 📁 프로젝트 구조

```
xcaster/
├── README.md                            # 👈 현재 문서
├── START_HERE.md                        # ⭐ 개발 시작 가이드
├── PRD.md                              # 제품 요구사항
├── claude.md                           # 개발 가이드 (기본)
├── SAAS_IMPLEMENTATION_GUIDE.md        # ⭐ 구현 청사진 (상세)
├── LANDING_PAGE.md                     # 랜딩페이지 기획
├── LANDING_PAGE_IMPROVEMENTS.md        # ⭐ 랜딩페이지 차별화
│
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── (auth)/                    # 인증 페이지
│   │   ├── (dashboard)/               # 대시보드
│   │   └── api/                       # API Routes
│   ├── components/                    # React 컴포넌트
│   └── lib/                           # 라이브러리 & 유틸리티
│
├── supabase/                          # Supabase 설정
│   ├── migrations/                    # DB 마이그레이션
│   └── seed.sql                       # 시드 데이터
│
└── public/                            # 정적 파일
```

**자세한 구조는 [SAAS_IMPLEMENTATION_GUIDE.md](./SAAS_IMPLEMENTATION_GUIDE.md)를 참고하세요.**

---

## 📖 개발 가이드

### 코딩 컨벤션

- **TypeScript 필수** - 모든 파일에 타입 정의
- **함수형 컴포넌트** - React Hooks 활용
- **App Router** - Pages Router 사용 금지
- **파일 크기 제한** - 200라인 이하, 함수 40라인 이하

자세한 내용은 [claude.md](./claude.md) 참고

### 브랜치 전략

- `main` - 프로덕션 배포 브랜치
- `develop` - 개발 통합 브랜치
- `feature/*` - 기능 개발 브랜치
- `hotfix/*` - 긴급 수정 브랜치

### 커밋 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 리팩토링
test: 테스트 코드
chore: 빌드 설정 등
```

---

## 📋 개발 로드맵

### Phase 1: MVP (3개월)
- [x] 프로젝트 구조 설계
- [x] 문서화 완료
- [ ] Supabase 설정 및 스키마 구축
- [ ] 인증 시스템 (회원가입, 로그인)
- [ ] 숏폼 자동 생성 (AI 파이프라인)
- [ ] YouTube OAuth 연동
- [ ] 기본 배포 기능
- [ ] 베타 테스트 시작

### Phase 2: Growth (3개월)
- [ ] 예약 발행 스케줄러
- [ ] 미디어 라이브러리
- [ ] 템플릿 시스템
- [ ] Facebook/Instagram 연동
- [ ] 분석 대시보드

### Phase 3: Scale (6개월)
- [ ] 라이브 스튜디오
- [ ] VFX 효과
- [ ] 팀 협업 기능
- [ ] AI 최적화 추천
- [ ] TikTok/Twitch 지원

### Phase 4: Enterprise (이후)
- [ ] API 생태계
- [ ] 모바일 앱
- [ ] 다국어 지원
- [ ] Enterprise 플랜

**상세 로드맵은 [START_HERE.md](./START_HERE.md) 참고**

---

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 라이선스

This project is licensed under the MIT License - see the LICENSE file for details

---

## 💬 문의

프로젝트 관련 문의:
- 이메일: team@xcaster.io
- 이슈: [GitHub Issues](https://github.com/your-org/xcaster/issues)

---

## 🔗 유용한 링크

- [Supabase 문서](https://supabase.com/docs)
- [Next.js 문서](https://nextjs.org/docs)
- [Anthropic Claude API](https://docs.anthropic.com)
- [PiAPI 문서](https://piapi.ai/docs)
- [ElevenLabs 문서](https://elevenlabs.io/docs)
- [Creatomate 문서](https://creatomate.com/docs)

---

**⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!**
