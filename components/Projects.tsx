'use client';
import { projects } from '@/data';
import React, { useRef, useState, useEffect } from 'react';
import { FollowerPointerCard } from './ui/following-pointer';
import { InteractiveHoverButton } from './ui/InteractiveHoverButtons';

const Projects = () => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  
  // Refs for sound
  const clickSound = useRef<HTMLAudioElement | null>(null);
  const hoverSound = useRef<HTMLAudioElement | null>(null);
  
  // Initialize only once with browser check
  useEffect(() => {
    // Only initialize audio in browser environment
    if (typeof window !== 'undefined') {
      hoverSound.current = new Audio("/audios/interactitvebutton.mp3");
      clickSound.current = new Audio("/audios/navbarclick.wav");
      
      // Preload audio
      hoverSound.current.load();
      clickSound.current.load();
    }
    
    // Cleanup on unmount
    return () => {
      if (hoverSound.current) {
        hoverSound.current.pause();
        hoverSound.current = null;
      }
      if (clickSound.current) {
        clickSound.current.pause();
        clickSound.current = null;
      }
    };
  }, []);
  
  const handleClick = () => {
    if (clickSound.current) {
      clickSound.current.currentTime = 0;
      clickSound.current.play().catch(() => {});
    }
  };
  
  const handleHover = () => {
    if (hoverSound.current) {
      hoverSound.current.currentTime = 0;
      hoverSound.current.play().catch(() => {});
    }
  };
  
  return (
    <div className="py-20" id="projects">
      {/* Section Heading */}
      <h1 className="heading text-[40px] font-bold text-center">
        A small selection of{' '}
        <span className="dark:text-purple-100 text-[40px] text-orange-100 font-bold">my recent projects</span>
      </h1>
      
      {/* Projects List */}
      <div className="flex flex-col items-center justify-center mt-10 gap-6">
        {projects.map(({ id, title, des, techLists, link }, index) => (
          <React.Fragment key={id}>
            {/* Divider */}
            {index >= 0 && <div className="w-full max-w-4xl border-t border-gray-400" />}
            
            {/* Project Card */}
            <FollowerPointerCard
              className="w-full max-w-4xl font-bold text-15px px-4 sm:px-10 py-6"
              title={des}
              disablePointer={isButtonHovered}
            >
              <div className="relative">
                {/* Title */}
                <h2 className="text-2xl font-semibold text-center text-gray-200 dark:text-white-100">
                  <span className="text-orange-100 dark:text-purple-100">0{id}.</span> {title}
                </h2>
                
                {/* Tech stack */}
                <div className="flex items-center justify-center mt-4">
                  <div className="flex gap-4">
                    {techLists.map((tech, index) => (
                      <span
                        key={index}
                        className="text-[17px] px-2 font-mono rounded-lg border border-solid dark:border-purple-100/[0.85] border-orange-100/[0.85] bg-gray-200 dark:bg-blue-200 text-orange-100 dark:text-white-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Link */}
                {link && (
                  <div className="flex justify-center items-center px-2 mt-6 text-[20px] mx-auto">
                    <InteractiveHoverButton
                      link={link}
                      onMouseEnter={() => {
                        setIsButtonHovered(true);
                        handleHover();
                      }}
                      onMouseLeave={() => setIsButtonHovered(false)}
                      onClick={handleClick}
                    >
                      View Project
                    </InteractiveHoverButton>
                  </div>
                )}
              </div>
            </FollowerPointerCard>
          </React.Fragment>
        ))}
        
        {/* Final Divider */}
        <div className="w-full max-w-4xl border-t border-gray-400" />
      </div>
    </div>
  );
};

export default Projects;