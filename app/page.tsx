"use client"
import { FloatingNav } from "@/components/ui/floating-navbar";
import Hero from "@/components/Hero";
import About from "@/components/Skills";
import Projects from "@/components/Projects";
import { FloatingDockVertical } from "@/components/ui/floating-dock";
import { FaHome, FaQuestionCircle, FaFileAlt, FaPhone } from 'react-icons/fa';
import { TracingBeam } from "@/components/ui/tracing-beam";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useRef } from 'react';


export default function Home() {
  // Create audio refs
  const clickSoundRef = useRef<HTMLAudioElement>(null);

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0; // Rewind to start
      clickSoundRef.current.play().catch(e => console.log("Playback failed:", e));
    }
  };

  // Enhanced nav item click handler
  const handleNavClick = (link: string, target?: string) => {
    playClickSound();
    if (target === '_blank') {
      window.open(link, '_blank');
    } else {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
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
    {/* <main className="relative bg-blue-100 flex justify-center items-center flex-col overflow-clip mx-auto sm:px-10 px-5 bg-grid-white/[0.09] dark:bg-grid-black/[0.2]" id="home"> */}
       {/* Hidden audio element */}
      <audio ref={clickSoundRef} src="/audios/navbarclick.wav" preload="auto" />
      <div className="max-w-7xl w-full">
        <FloatingNav 
          navItems={[
            { name: "01.Home", link: "#home", icons: <FaHome />, onClick: () => handleNavClick("#home") },
            { name: "02.Skills", link: "#skills", icons: <FaQuestionCircle/>, onClick: () => handleNavClick("#skills") },
            { name: "03.Contact Me", link: "#contact", icons: <FaPhone />, onClick: () => handleNavClick("#contact") },
            { name: "04.CV", link: "https://docs.google.com/document/d/1Uh7ZdHak6Wt6kexexRzhm2BAujpcs7INM92t0pYonZ8/edit?usp=sharing", target: "_blank", icons: <FaFileAlt />, onClick: () => handleNavClick("https://docs.google.com/document/d/1Uh7ZdHak6Wt6kexexRzhm2BAujpcs7INM92t0pYonZ8/edit?usp=sharing") },
          ]}
        />
        <TracingBeam>
        <Hero />
        <About />
        <Projects />
        </TracingBeam>
      </div>
    </main>
    <div className="relative dark:bg-blue-100 bg-white-300  flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 dark:bg-grid-white/[0.09] bg-grid-black/[0.09] ">
      <Contact />
      <Footer />
      <FloatingDockVertical />
    </div>
    </>
  );
}
