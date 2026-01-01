'use client'

import { useEffect } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const updateTheme = () => {
      const hour = new Date().getHours()
      // 6시~18시: 라이트 모드, 18시~6시: 다크 모드
      const isDark = hour < 6 || hour >= 18

      if (isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    // 초기 테마 설정
    updateTheme()

    // 1분마다 체크 (시간 변경 감지)
    const interval = setInterval(updateTheme, 60000)

    return () => clearInterval(interval)
  }, [])

  return <>{children}</>
}
