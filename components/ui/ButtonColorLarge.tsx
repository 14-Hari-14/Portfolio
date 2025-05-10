'use client'
import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from '@/lib/utils';

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  link?: string;
}

export const InteractiveHoverButtonColorLarge = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ children, className, link, ...props }, ref) => {
  const handleClick = () => {
    if (link?.startsWith("mailto:")) {
      window.location.href = link;
    }
  };

  return (
    <button
      ref={ref}
      onClick={link ? handleClick : undefined}
      className={cn(
        "group relative w-full lg:h-[51px] cursor-pointer overflow-hidden rounded-sm p-0 text-center font-semibold font-mono border border-solid border-gray-200 dark:border-orange-100",
        className
      )}
      {...props}
    >
      {/* Container to hold both dots */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Left dot that expands */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full dark:bg-orange-100 bg-gray-100 transition-all duration-300 group-hover:scale-[150] z-0"></div>
        
        {/* Right dot that expands */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full dark:bg-orange-100 bg-gray-100 transition-all duration-300 group-hover:scale-[150] z-0"></div>
      </div>
      
      {/* Content container */}
      <div className="relative flex items-center justify-between px-8 py-2 w-full z-10">
        {/* Visual dots (these don't expand, just for visual) */}
        <div className="h-2 w-2 rounded-full dark:bg-orange-100 bg-gray-100 z-20"></div>
        
        <span className="absolute left-1/2 -translate-x-1/2 inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
        
        <div className="h-2 w-2 rounded-full dark:bg-orange-100 bg-gray-100 z-20"></div>
      </div>

      {/* Hover state content */}
      <div className="absolute top-0 z-20 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-0 group-hover:opacity-100">
        <span>{children}</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </button>
  );
});

InteractiveHoverButtonColorLarge.displayName = "InteractiveHoverButton";