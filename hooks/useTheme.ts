'use client'

import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    

    const root = window.document.documentElement
    root.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    )
    

    const currentTheme = localStorage.theme === "dark" || 
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? 'dark' : 'light'
    setTheme(currentTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    

    if (newTheme === 'dark') {
      localStorage.theme = "dark"
    } else {
      localStorage.theme = "light"
    }
    
    const root = window.document.documentElement
    root.classList.toggle("dark", newTheme === 'dark')
  }

  return {
    theme,
    toggleTheme,
    mounted
  }
}
