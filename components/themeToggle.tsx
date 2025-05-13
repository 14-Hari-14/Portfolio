"use client"

import * as React from "react"
import { LuMoon, LuSun } from "react-icons/lu"
import { useTheme } from "next-themes"
import { useRef, useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Only run on client-side
    setMounted(true)
    
    // Initialize audio only after component is mounted
    if (typeof window !== 'undefined') {
      clickSoundRef.current = new Audio("/audios/themetoggle.mp3")
    }

    // Cleanup function
    return () => {
      if (clickSoundRef.current) {
        clickSoundRef.current.pause()
        clickSoundRef.current = null
      }
    }
  }, [])

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0
      clickSoundRef.current.play().catch((e: Error) => console.log("Playback failed:", e))
    }
  }

  // Return a placeholder during SSR
  if (!mounted) {
    return (
      <button className="h-[2.75rem] w-[2.75rem] p-2 rounded-md">
        <div className="h-5 w-5" />
      </button>
    )
  }

  const handleClick = () => {
    playClickSound()
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <button
      onClick={handleClick}
      className="relative p-2 rounded-md hover:bg-white-200 hover:text-blue-100 dark:hover:text-orange-100 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <LuMoon className="h-10 w-10" />
      ) : (
        <LuSun className="h-10 w-10" />
      )}
    </button>
  )
}