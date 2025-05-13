"use client"
import { FaHome, FaQuestionCircle, FaFileAlt, FaPhone } from 'react-icons/fa'
import { useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Static imports for components
import Hero from "@/components/Hero"
import About from "@/components/Skills"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"

// Dynamic import for Footer to ensure it loads after main content
const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: false,
  loading: () => null // Don't show anything while loading
})

// Type-correct dynamic imports
const FloatingNav = dynamic(() => import('@/components/ui/floating-navbar').then(mod => mod.FloatingNav), { 
  ssr: false,
  loading: () => <div className="h-12" /> // Loading placeholder
})

const FloatingDockVertical = dynamic(() => import('@/components/ui/floating-dock').then(mod => mod.FloatingDockVertical), { 
  ssr: false,
  loading: () => null // Don't show anything while loading
})

const TracingBeam = dynamic(() => import('@/components/ui/tracing-beam').then(mod => mod.TracingBeam), { 
  ssr: false,
  loading: () => <div className="min-h-screen" /> // Show a placeholder with minimum height
})

// Audio handling hook
function useClickSound(audioPath: string) {
  const [isReady, setIsReady] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      audioRef.current = new Audio(audioPath)
      audioRef.current.preload = 'auto'
      
      // iOS audio unlock
      const unlockAudio = () => {
        audioRef.current?.play().then(() => {
          audioRef.current?.pause()
          audioRef.current!.currentTime = 0
          setIsReady(true)
        }).catch(console.error)
        document.removeEventListener('click', unlockAudio)
      }
      
      document.addEventListener('click', unlockAudio)
      setIsReady(true)

      return () => {
        audioRef.current?.pause()
        document.removeEventListener('click', unlockAudio)
      }
    } catch (error) {
      console.error('Audio initialization failed:', error)
    }
  }, [audioPath])

  const play = () => {
    if (!isReady || !audioRef.current) return
    
    try {
      const audioClone = new Audio(audioRef.current.src)
      audioClone.currentTime = 0
      audioClone.play().catch(console.error)
    } catch (error) {
      console.error('Audio playback failed:', error)
    }
  }

  return play
}

interface NavItem {
  name: string
  link: string
  icons: React.ReactNode
  target?: string
  onClick: () => void
}

export default function Home() {
  const [isContentLoaded, setIsContentLoaded] = useState(false)
  const playClickSound = useClickSound("/audios/navbarclick.wav")
  
  useEffect(() => {
    // Set a small timeout to ensure main content is loaded first
    const timer = setTimeout(() => {
      setIsContentLoaded(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  const handleNavClick = (link: string, target?: string) => {
    playClickSound()
    
    if (target === '_blank') {
      setTimeout(() => {
        window.open(link, '_blank', 'noopener,noreferrer')
      }, 150)
      return
    }
    
    document.querySelector(link)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navItems: NavItem[] = [
    { 
      name: "01.Home", 
      link: "#home", 
      icons: <FaHome />, 
      onClick: () => handleNavClick("#home") 
    },
    { 
      name: "02.Skills", 
      link: "#skills", 
      icons: <FaQuestionCircle/>, 
      onClick: () => handleNavClick("#skills") 
    },
    { 
      name: "03.Contact Me", 
      link: "#contact", 
      icons: <FaPhone />, 
      onClick: () => handleNavClick("#contact") 
    },
    { 
      name: "04.CV", 
      link: "https://docs.google.com/document/d/1Uh7ZdHak6Wt6kexexRzhm2BAujpcs7INM92t0pYonZ8/edit?usp=sharing", 
      target: "_blank", 
      icons: <FaFileAlt />, 
      onClick: () => handleNavClick(
        "https://docs.google.com/document/d/1Uh7ZdHak6Wt6kexexRzhm2BAujpcs7INM92t0pYonZ8/edit?usp=sharing", 
        "_blank"
      ) 
    },
  ]

  return (
    <>
      <main
        className={`
          relative flex justify-center items-center flex-col
          overflow-clip mx-auto sm:px-10 px-5 font-oswald
          bg-white-300 bg-grid-gray-200/[0.09]
          dark:bg-blue-100 dark:bg-grid-white-300/[0.1]
        `}
        id="home"
      >
        <div className="max-w-7xl w-full">
          <FloatingNav navItems={navItems} />
          <TracingBeam>
            <Hero />
            <About />
            <Projects />
          </TracingBeam>
        </div>
      </main>
      <div className="relative dark:bg-blue-100 bg-white-300 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 dark:bg-grid-white/[0.09] bg-grid-black/[0.09]">
        <Contact />
        {isContentLoaded && (
          <>
            <Footer />
            <FloatingDockVertical />
          </>
        )}
      </div>
    </>
  )
}