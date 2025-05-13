'use client'
import React from 'react';
import { TypewriterEffect } from './ui/typewriter-effect';
import locationtag from '/images/location.png';
import { InteractiveHoverButton } from './ui/InteractiveHoverButtons';
import { useRef, useEffect } from "react";
import Image from 'next/image'

const Hero = () => {
    const words = [
        {
            text: "Harishanker",
            className: "text-orange-100 dark:text-blue-500 font-bold",
        },
        {
            text: "S",
            className: "text-orange-100 dark:text-blue-500 font-bold",
        },
        {
            text: "Nair",
            className: "text-orange-100 dark:text-blue-500 font-bold",
        },
    ];
    // Properly type the refs to accept HTMLAudioElement
    const hoverSound = useRef<HTMLAudioElement | null>(null);
    const clickSound = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // This runs only on client side after component mounts
        // Check if we're in the browser environment before creating Audio objects
        if (typeof window !== 'undefined') {
            hoverSound.current = new Audio("/audios/interactitvebutton.mp3");
            clickSound.current = new Audio("/audios/navbarclick.wav");
        }
    }, []);

    const handleHover = () => {
        if (hoverSound.current) {
            hoverSound.current.currentTime = 0;
            hoverSound.current.play().catch(() => {});
        }
    };

    const handleClick = () => {
        if (clickSound.current) {
            clickSound.current.currentTime = 0;
            clickSound.current.play().catch(() => {});
        }
        
        // also play hoverSound once to "unlock" it on mobile
        if (hoverSound.current) {
            hoverSound.current.play().catch(() => {});
        }
    };
    
    return (
        <div className='pb-12 sm:pb-16 lg:pb-20 pt-24 sm:pt-28 lg:pt-36'>
            <div className='flex justify-center relative my-8 sm:my-12 lg:my-20 z-10'>
                <div className='w-[90vw] sm:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center px-4 sm:px-6'>
                    <h1 className='text-center font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:mb-[1px]'>Hi, I&apos;m</h1>
                    {/* Name Animation */}
                    <TypewriterEffect
                        className='text-center text-3xl font-bold mb-6 sm:mb-8 sm:text-4xl md:text-5xl lg:text-8xl font-os'
                        words={words}
                        cursorClassName=''
                    />
                    
                    {/* Student/Location Info - Added mt-0.5 (2px) for mobile */}
                    <div className='flex flex-col items-center w-full lg:mt-7 mb-6 sm:mb-8 sm:mt-2 mt-1'>
                        <div className='flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5 w-full'>
                            <h1 className="uppercase tracking-widest text-xl sm:text-2xl lg:text-[30px] text-center dark:text-purple-100 font-bold text-gray-500 font-oswald">
                                STUDENT | FULLSTACK DEV
                            </h1>
                            <div className="flex items-center justify-center gap-2">
                                <Image
                                    className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                                    src={locationtag.src}
                                    alt="location icon"
                                    width={20}
                                    height={20}
                                />
                                <h1 className="sm:text-base lg:text-[28px] font-mono lg:mt-2">Based in Kerala, India</h1>
                            </div>
                        </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full'>
                        <InteractiveHoverButton 
                            link="#contact"
                            onMouseEnter={handleHover}
                            onClick={handleClick}
                            className="w-full sm:w-auto">
                            Contact Me
                        </InteractiveHoverButton>      
                        <InteractiveHoverButton 
                            link="#projects"
                            onMouseEnter={handleHover}
                            onClick={handleClick}
                            className="w-full sm:w-auto">
                            My Projects
                        </InteractiveHoverButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;