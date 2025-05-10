  'use client'
  import React from "react";
  import { ArrowRight } from "lucide-react";
  import { cn } from '../../lib/utils';

  interface InteractiveHoverButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    link?: string; // Keep the link prop optional
  }

  export const InteractiveHoverButtonColor2 = React.forwardRef<
    HTMLButtonElement,
    InteractiveHoverButtonProps
  >(({ children, className, link, ...props }, ref) => {
    const handleClick = () => {
      if (link?.startsWith("mailto:")) {
        // Handle mailto link behavior explicitly
        window.location.href = link;
      }
      // Otherwise, do nothing
    };

    return (
      <button
        ref={ref}
        onClick={link ? handleClick : undefined} // Use the handleClick only if a link is provided
        className={cn(
          "group relative w-full lg:h-[51px] cursor-pointer overflow-hidden rounded-sm bg-white-300 dark:bg-blue-200 p-2 px-6 text-center font-semibold font-mono border border-solid border-gray-200 dark:border-orange-100 ",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full dark:bg-orange-100 bg-gray-100 transition-all duration-300 group-hover:scale-[100.8]"></div>
          <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
            {children}
          </span>
        </div>
        <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
          <span>{children}</span>
          <ArrowRight />
        </div>
      </button>
    );
  });

  InteractiveHoverButtonColor2.displayName = "InteractiveHoverButton";
