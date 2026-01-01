# 🚀 XCaster 개발 시작 가이드

> **Claude Code에게**: 이 문서를 먼저 읽어주세요. 프로젝트 전체를 이해하는 로드맵입니다.

---

## 📚 문서 읽기 순서

개발을 시작하기 전에 다음 순서로 문서를 읽으면 프로젝트를 완벽히 이해할 수 있습니다:

### 1단계: 프로젝트 이해 (필수)
**목적**: 무엇을 만드는지, 왜 만드는지 이해

1. **[README.md](./README.md)** (5분)
   - 프로젝트 개요
   - 핵심 기능
   - 기술 스택

2. **[PRD.md](./PRD.md)** (15분)
   - 제품 비전과 목표
   - 타겟 사용자 페르소나
   - 핵심 기능 상세 스펙
   - 개발 로드맵

### 2단계: 기술 구현 방법 (필수)
**목적**: 어떻게 만들 것인지 구체적으로 이해

3. **[claude.md](./claude.md)** (10분)
   - 코딩 규칙 및 컨벤션
   - 디렉토리 구조
   - 데이터베이스 기본 스키마
   - 개발 단계별 가이드

4. **[SAAS_IMPLEMENTATION_GUIDE.md](./SAAS_IMPLEMENTATION_GUIDE.md)** (30분) ⭐ **가장 중요**
   - 완전한 데이터베이스 스키마 (15개 테이블)
   - 모든 API 엔드포인트 설계
   - AI 파이프라인 전체 구현
   - 큐 시스템, 보안, 성능 최적화
   - 실제 코드 예시 포함

   **이 문서가 실제 구현의 청사진입니다!**

### 3단계: 랜딩페이지 개발 (프론트엔드 우선 시)
**목적**: 사용자에게 보여줄 첫 화면 이해

5. **[LANDING_PAGE.md](./LANDING_PAGE.md)** (10분)
   - 기본 랜딩페이지 구조
   - 섹션별 기획

6. **[LANDING_PAGE_IMPROVEMENTS.md](./LANDING_PAGE_IMPROVEMENTS.md)** (20분) ⭐ **차별화 포인트**
   - 경쟁사 대비 차별점
   - 구체적인 개선사항
   - 섹션별 상세 카피와 디자인
   - 실행 우선순위

   **이 문서의 개선사항을 반드시 반영하세요!**

---

## 🎯 개발 시작 체크리스트

### Phase 1: 환경 설정 (1-2일)
- [ ] Node.js 18+ 설치 확인
- [ ] Supabase 프로젝트 생성
- [ ] 환경변수 설정 (.env.local)
  - [ ] Supabase 키
  - [ ] Anthropic API 키
  - [ ] PiAPI 키
  - [ ] ElevenLabs 키
  - [ ] 기타 필요한 API 키
- [ ] Redis 설정 (로컬 또는 Upstash)
- [ ] 프로젝트 의존성 설치 (`npm install`)

### Phase 2: 데이터베이스 설정 (1일)
- [ ] **[SAAS_IMPLEMENTATION_GUIDE.md](./SAAS_IMPLEMENTATION_GUIDE.md) 섹션 1** 참고
- [ ] Supabase에서 SQL 실행
  - [ ] 15개 테이블 생성
  - [ ] 인덱스 추가
  - [ ] RLS 정책 설정
- [ ] 테스트 데이터 삽입

### Phase 3: 기본 인증 (2-3일)
- [ ] Supabase Auth 설정
- [ ] 회원가입/로그인 페이지
- [ ] 보호된 라우트 설정
- [ ] 사용자 프로필 페이지

### Phase 4: 핵심 기능 구현 (2-3주)
**우선순위에 따라 진행**

#### 우선순위 1: AI 파이프라인 (1주)
- [ ] **[SAAS_IMPLEMENTATION_GUIDE.md](./SAAS_IMPLEMENTATION_GUIDE.md) 섹션 4** 참고
- [ ] Claude API 스크립트 생성
- [ ] PiAPI 이미지 생성
- [ ] ElevenLabs 음성 합성
- [ ] Creatomate 비디오 합성
- [ ] 전체 파이프라인 통합

#### 우선순위 2: 프로젝트 관리 (3-4일)
- [ ] **[SAAS_IMPLEMENTATION_GUIDE.md](./SAAS_IMPLEMENTATION_GUIDE.md) 섹션 2.3** 참고
- [ ] 프로젝트 CRUD API
- [ ] 프로젝트 목록/상세 페이지
- [ ] 브랜드 프로필 시스템

#### 우선순위 3: 큐 시스템 (2-3일)
- [ ] **[SAAS_IMPLEMENTATION_GUIDE.md](./SAAS_IMPLEMENTATION_GUIDE.md) 섹션 5** 참고
- [ ] BullMQ 설정
- [ ] Worker 구현
- [ ] 진행 상황 폴링 API

#### 우선순위 4: 채널 연동 (1주)
- [ ] **[SAAS_IMPLEMENTATION_GUIDE.md](./SAAS_IMPLEMENTATION_GUIDE.md) 섹션 2.4** 참고
- [ ] YouTube OAuth 연동
- [ ] Facebook OAuth 연동
- [ ] 토큰 관리 및 갱신

#### 우선순위 5: 배포 스케줄링 (3-4일)
- [ ] **[SAAS_IMPLEMENTATION_GUIDE.md](./SAAS_IMPLEMENTATION_GUIDE.md) 섹션 2.5** 참고
- [ ] 스케줄 CRUD API
- [ ] 캘린더 UI
- [ ] 자동 발행 시스템

### Phase 5: 랜딩페이지 (1주)
- [ ] **[LANDING_PAGE_IMPROVEMENTS.md](./LANDING_PAGE_IMPROVEMENTS.md) 전체** 참고
- [ ] Hero 섹션 (차별화 헤드라인 적용)
- [ ] Features 섹션
- [ ] 신뢰도 확보 섹션 (새로 추가)
- [ ] Use Cases
- [ ] Pricing
- [ ] FAQ
- [ ] CTA

### Phase 6: 대시보드 & 분석 (1주)
- [ ] 메인 대시보드
- [ ] 통계 위젯
- [ ] AI 인사이트
- [ ] 성과 분석 페이지

---

## 💡 개발 시 중요한 원칙

### 1. 문서 우선, 코드는 나중
새로운 기능을 개발하기 전에 항상:
1. 해당 기능의 문서 읽기
2. API 설계 확인
3. 데이터베이스 스키마 확인
4. 그 다음 코드 작성

### 2. 작게 나누어 개발
- 한 번에 하나의 기능만
- 200라인 이하로 파일 분리
- 함수는 40라인 이하
- 테스트 가능한 단위로 분리

### 3. 차별화 포인트 꼭 구현
**[LANDING_PAGE_IMPROVEMENTS.md](./LANDING_PAGE_IMPROVEMENTS.md)**와
**[SAAS_IMPLEMENTATION_GUIDE.md](./SAAS_IMPLEMENTATION_GUIDE.md)**에서
"⭐ 차별화 포인트"로 표시된 것들은 필수:

- 브랜드 프로필 학습 시스템
- 빠른 모드 vs 커스텀 모드
- AI 인사이트 및 최적화 제안
- 멀티채널 자동 최적화

### 4. 보안과 성능은 처음부터
- RLS 정책 항상 적용
- Rate Limiting 설정
- 에러 핸들링 필수
- 캐싱 전략 구현

---

## 🗂️ 프로젝트 폴더 구조

```
xcaster/
├── README.md                              # 프로젝트 개요
├── START_HERE.md                          # 👈 지금 읽고 있는 파일
├── PRD.md                                 # 제품 요구사항 문서
├── claude.md                              # 개발 가이드 (기본)
├── SAAS_IMPLEMENTATION_GUIDE.md           # ⭐ 구현 청사진 (상세)
├── LANDING_PAGE.md                        # 랜딩페이지 기획 (기본)
├── LANDING_PAGE_IMPROVEMENTS.md           # ⭐ 랜딩페이지 개선 (상세)
│
├── src/
│   ├── app/                              # Next.js App Router
│   │   ├── (auth)/                       # 인증 페이지
│   │   ├── (dashboard)/                  # 대시보드
│   │   └── api/                          # API Routes
│   │
│   ├── components/                       # React 컴포넌트
│   │   ├── ui/                           # 기본 UI
│   │   ├── shortform/                    # 숏폼 관련
│   │   └── live/                         # 라이브 관련
│   │
│   └── lib/                              # 라이브러리
│       ├── supabase/                     # Supabase 클라이언트
│       ├── ai/                           # AI 서비스
│       ├── queue/                        # 큐 시스템
│       └── utils/                        # 유틸리티
│
├── supabase/                             # Supabase 설정
│   ├── migrations/                       # DB 마이그레이션
│   └── seed.sql                          # 시드 데이터
│
└── docs/                                 # 추가 문서
    └── api/                              # API 문서
```

---

## 🎬 빠른 시작

### Option 1: 랜딩페이지부터 (프론트엔드 우선)
```bash
# 1. 문서 읽기
- README.md
- LANDING_PAGE_IMPROVEMENTS.md

# 2. 개발 시작
npm run dev

# 3. 파일 생성
src/app/page.tsx                    # 랜딩페이지 메인
src/components/landing/Hero.tsx    # Hero 섹션
src/components/landing/Features.tsx # Features 섹션
...
```

### Option 2: 백엔드부터 (API 우선)
```bash
# 1. 문서 읽기
- README.md
- SAAS_IMPLEMENTATION_GUIDE.md 섹션 1-2

# 2. 데이터베이스 설정
- Supabase에서 SQL 실행

# 3. API 개발
src/app/api/auth/signup/route.ts
src/app/api/projects/route.ts
...
```

### Option 3: 추천 순서 (균형잡힌 접근)
```bash
Week 1: 환경 설정 + DB + 기본 인증
Week 2: AI 파이프라인 핵심 로직
Week 3: 프로젝트 관리 + 큐 시스템
Week 4: 랜딩페이지 + 대시보드 기본
Week 5-6: 채널 연동 + 배포 기능
```

---

## 📞 막혔을 때

### 1. 문서 다시 확인
대부분의 답은 문서에 있습니다:
- API 설계: **SAAS_IMPLEMENTATION_GUIDE.md 섹션 2**
- 데이터베이스: **SAAS_IMPLEMENTATION_GUIDE.md 섹션 1**
- AI 파이프라인: **SAAS_IMPLEMENTATION_GUIDE.md 섹션 4**
- UI/UX: **LANDING_PAGE_IMPROVEMENTS.md**

### 2. 예제 코드 참고
문서에 실제 TypeScript 코드 예제가 많이 있습니다. 그대로 사용하거나 수정해서 사용하세요.

### 3. 단계적으로 접근
- 너무 큰 기능은 작은 단위로 나누기
- 먼저 동작하게 만들고, 나중에 최적화
- 테스트하면서 진행

---

## 🎯 성공 기준

### MVP 완성 조건
- [ ] 사용자가 회원가입/로그인 가능
- [ ] 키워드 입력 → AI 영상 생성 (10분 이내)
- [ ] YouTube 채널 연동 가능
- [ ] 생성된 영상을 YouTube에 발행 가능
- [ ] 기본 대시보드에서 프로젝트 목록 확인

### 품질 기준
- [ ] 페이지 로드 < 2초
- [ ] API 응답 < 500ms
- [ ] 에러 발생 시 명확한 메시지
- [ ] 모바일 반응형
- [ ] 보안 (RLS, Rate Limiting 적용)

---

## 🚨 주의사항

### 하지 말아야 할 것
❌ 문서 안 읽고 바로 코딩
❌ 파일 200라인 이상
❌ API 키 하드코딩
❌ 에러 핸들링 생략
❌ 보안 정책 무시
❌ 차별화 포인트 건너뛰기

### 꼭 해야 할 것
✅ 문서 먼저 읽기
✅ 작은 단위로 분리
✅ 환경변수 사용
✅ try-catch 추가
✅ RLS 정책 설정
✅ 차별화 포인트 구현

---

## 📈 진행 상황 체크

개발하면서 이 파일로 돌아와서 체크리스트를 확인하세요.

**현재 진행률: 0%**

- [ ] Phase 1: 환경 설정
- [ ] Phase 2: 데이터베이스
- [ ] Phase 3: 기본 인증
- [ ] Phase 4: 핵심 기능
- [ ] Phase 5: 랜딩페이지
- [ ] Phase 6: 대시보드

---

**시작 준비 완료! 🎉**

다음 단계: [README.md](./README.md)를 읽고 프로젝트 개요를 파악하세요.
