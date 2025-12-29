-- XCaster Database Schema
-- Supabase에서 SQL Editor로 실행하세요

-- 사용자 프로필
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 팀
CREATE TABLE teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  owner_id UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 팀 멤버
CREATE TABLE team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member', -- owner, admin, member
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- 연동된 채널 (SNS 계정)
CREATE TABLE channels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- tiktok, youtube, instagram, facebook, linkedin
  platform_user_id TEXT,
  platform_username TEXT,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 숏폼 프로젝트
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  created_by UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft', -- draft, generating, completed, failed
  input_type TEXT NOT NULL, -- keyword, image, video

  -- 입력 데이터
  keywords TEXT[], -- 키워드 입력 시
  input_images TEXT[], -- 이미지 URL 배열
  input_video_url TEXT, -- 영상 URL

  -- AI 생성 데이터
  scenarios JSONB, -- AI가 생성한 시나리오들
  selected_scenario_index INTEGER,
  script TEXT, -- 선택된 스크립트

  -- 생성된 콘텐츠
  generated_images TEXT[],
  generated_video_url TEXT,
  voice_url TEXT,
  final_video_url TEXT,
  thumbnail_url TEXT,

  -- 설정
  voice_settings JSONB, -- 음성 설정
  style_settings JSONB, -- 스타일 설정

  -- 메타데이터
  duration INTEGER, -- 초 단위
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 배포 기록
CREATE TABLE publications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending', -- pending, scheduled, published, failed
  scheduled_at TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  platform_post_id TEXT, -- 플랫폼에서의 게시물 ID
  platform_post_url TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 라이브 세션
CREATE TABLE live_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  created_by UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  status TEXT DEFAULT 'idle', -- idle, preparing, live, ended

  -- Mux 데이터
  mux_stream_key TEXT,
  mux_playback_id TEXT,
  mux_asset_id TEXT,

  -- 통계
  peak_viewers INTEGER DEFAULT 0,
  total_viewers INTEGER DEFAULT 0,
  duration INTEGER, -- 초 단위

  -- VFX 설정
  vfx_settings JSONB,

  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 라이브 채널 연결 (어떤 채널로 송출할지)
CREATE TABLE live_channel_connections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  live_session_id UUID REFERENCES live_sessions(id) ON DELETE CASCADE,
  channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
  rtmp_url TEXT,
  stream_key TEXT,
  is_active BOOLEAN DEFAULT true,
  UNIQUE(live_session_id, channel_id)
);

-- 자산 (이미지, 영상, 오디오)
CREATE TABLE assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES profiles(id),
  type TEXT NOT NULL, -- image, video, audio
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  size INTEGER,
  mime_type TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- VFX 프리셋
CREATE TABLE vfx_presets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  settings JSONB NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) 활성화
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_channel_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE vfx_presets ENABLE ROW LEVEL SECURITY;

-- 기본 RLS 정책 (팀 기반 접근)
-- profiles: 본인 프로필만 수정 가능
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- teams: 팀 멤버만 접근 가능
CREATE POLICY "Team members can view team" ON teams FOR SELECT
  USING (id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid()));

-- 나머지 테이블도 팀 기반 접근 정책 적용
CREATE POLICY "Team members can view channels" ON channels FOR SELECT
  USING (team_id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid()));
CREATE POLICY "Team members can manage channels" ON channels FOR ALL
  USING (team_id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid()));

CREATE POLICY "Team members can view projects" ON projects FOR SELECT
  USING (team_id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid()));
CREATE POLICY "Team members can manage projects" ON projects FOR ALL
  USING (team_id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid()));

-- 프로필 자동 생성 트리거
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
