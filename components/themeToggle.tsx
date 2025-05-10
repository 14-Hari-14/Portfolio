"use client"

import * as React from "react"
import { LuMoon, LuSun } from "react-icons/lu"
import { useTheme } from "next-themes"
import { useRef, useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const clickSoundRef = useRef<HTMLAudioElement>(null)

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0
      clickSoundRef.current.play().catch(e => console.log("Playback failed:", e))
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="h-[2.75rem] w-[2.75rem] p-2 rounded-md">
        <div className="h-[2.75rem] w-[2.75rem]" />
      </button>
    )
  }

  const handleClick = () => {
    playClickSound()
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="relative p-2 rounded-md hover:bg-white-200 hover:text-blue-100 dark:hover:text-orange-100 dark:hover:bg-gray-800"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <LuMoon className="h-[2.75rem] w-[2.75rem]" />
        ) : (
          <LuSun className="h-[2.75rem] w-[2.75rem]" />
        )}
      </button>

      {/* Hidden audio element */}
      <audio ref={clickSoundRef} src="/audios/themetoggle.mp3" preload="auto" />
    </>
  )
}
