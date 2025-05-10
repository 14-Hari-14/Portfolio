"use client";
import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icons: React.ReactNode;
    target?: string;
    onClick?: () => void; // New prop for click handler
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle click with sound
  const handleClick = (navItem: typeof navItems[0], e: React.MouseEvent) => {
    // Play sound if audio element exists
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    
    // Call custom onClick if provided
    if (navItem.onClick) {
      e.preventDefault();
      navItem.onClick();
    }
    
    // Default behavior continues for regular links
  };

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const previous = scrollYProgress.getPrevious();
    const direction = previous !== undefined ? current - previous : 0;
    if (current < 0.05) {
      setVisible(true);
    } else {
      setVisible(direction < 0);
    }
  });

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} src="/audio/click.wav" preload="auto" />
      
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-solid border-orange-100 dark:border-purple-100 rounded-lg bg-white-200 dark:bg-blue-200 shadow-lg z-[5000] px-4 py-4 items-center justify-center space-x-4 uppercase font-bold",
              className,
            )}
          >
            {navItems.map((navItem, idx) => (
              <Link
                key={`link-${idx}`}
                href={navItem.link}
                target={navItem.target}
                rel={navItem.target === "_blank" ? "noopener noreferrer" : undefined}
                className={cn(
                  "relative dark:text-white-100 items-center flex space-x-1 text-white-100 dark:hover:text-blue-400 hover:text-black tracking-widest font-mono"
                )}
                onClick={(e) => handleClick(navItem, e)}
              >
                <span className="block sm:hidden">{navItem.icons}</span>
                <span className="hidden sm:block text-sm">{navItem.name}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};