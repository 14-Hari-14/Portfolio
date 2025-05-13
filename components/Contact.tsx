'use client'
import React from "react";
import { InteractiveHoverButton } from "./ui/InteractiveHoverButtons";
import { useRef, useEffect } from "react";
import EmailCopy from "@/components/copyEmail";

const Contact = () => {
  const hoverSound = useRef<HTMLAudioElement | null>(null);
  const clickSound = useRef<HTMLAudioElement | null>(null);
  const emailSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Only initialize audio in browser environment
    if (typeof window !== 'undefined') {
      hoverSound.current = new Audio("/audios/interactitvebutton.mp3");
      clickSound.current = new Audio("/audios/navbarclick.wav");
      emailSound.current = new Audio("/audios/emailcopied.wav");
      
      // Optional: preload the audio files
      [hoverSound.current, clickSound.current, emailSound.current].forEach(audio => {
        if (audio) audio.load();
      });
    }
    
    return () => {
      // Cleanup
      [hoverSound.current, clickSound.current, emailSound.current].forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
    };
  }, []);

  const handleHover = () => {
    if (hoverSound.current) {
      hoverSound.current.currentTime = 0;
      hoverSound.current.play().catch(console.warn);
    }
  };

  const handleClick = () => {
    if (clickSound.current) {
      clickSound.current.currentTime = 0;
      clickSound.current.play().catch(console.warn);
    }
    // Mobile unlock
    if (hoverSound.current) hoverSound.current.play().catch(console.warn);
  };

  const handleEmailCopy = () => {
    if (emailSound.current) {
      emailSound.current.currentTime = 0;
      emailSound.current.play().catch(console.warn);
    }
  };

  return (
    <div
      className="w-full border-gray-200/[0.5] dark:border-purple-100/[0.5] border dark:text-white text-gray-600 px-4 pt-8 font-bold flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10"
      id="contact"
    >
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl mb-2">Want to build something together?</h1>
        <p className="text-base md:text-lg">
          You can email me at
          <span className="ml-1 dark:text-purple-100 text-orange-100 text-decoration-line: underline">
            <EmailCopy onClick={handleEmailCopy} />
          </span>
        </p>
        <br />
        <div className="space-y-3">
          <div className="space-y-3">
            <InteractiveHoverButton
              link="mailto:nhari142004@gmail.com"
              onMouseEnter={handleHover}
              onClick={handleClick}
            >
              Shoot me a msg!!
            </InteractiveHoverButton>
            <InteractiveHoverButton
              link="#home"
              onMouseEnter={handleHover}
              onClick={handleClick}
            >
              Back to Home
            </InteractiveHoverButton>
          </div>
        </div>
      </div>
      <div className="w-full overflow-hidden mt-10 flex items-center justify-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[150px] 2xl:text-[200px] tracking-widest leading-tight md:leading-[0.8] whitespace-nowrap ">
          14-Hari-14
        </h1>
      </div>
    </div>
  );
};

export default Contact;