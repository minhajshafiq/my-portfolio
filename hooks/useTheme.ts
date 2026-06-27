'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const THEME_KEY = 'theme'

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light'

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null

  const storedTheme = window.localStorage.getItem(THEME_KEY)

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }

  return null
}

function applyTheme(theme: Theme) {
  if (typeof window === 'undefined') return

  const root = window.document.documentElement
  root.classList.toggle('dark', theme === 'dark')
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const initialTheme = getStoredTheme() ?? getSystemTheme()

    setTheme(initialTheme)
    applyTheme(initialTheme)
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light'

    setTheme(newTheme)
    window.localStorage.setItem(THEME_KEY, newTheme)
    applyTheme(newTheme)
  }

  return {
    theme,
    toggleTheme,
    mounted,
  }
}