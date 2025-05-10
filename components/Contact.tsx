import React from "react";
import { InteractiveHoverButton } from "./ui/InteractiveHoverButtons";
import { useRef } from "react";
import EmailCopy from "@/components/copyEmail"

const Contact = () => {
  const hoverSound = useRef<HTMLAudioElement | null>(null);
  const clickSound = useRef<HTMLAudioElement | null>(null);

  if (!hoverSound.current) hoverSound.current = new Audio("/audios/interactitvebutton.mp3");
  if (!clickSound.current) clickSound.current = new Audio("/audios/navbarclick.wav");

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
    <div
      className="w-full border-gray-200/[0.5] dark:border-purple-100/[0.5] border dark:text-white text-gray-600 px-4 pt-8 font-bold flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10"
      id="contact"
    >
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl mb-2">Want to build something together?</h1>
        <p className="text-base md:text-lg">
          You can email me at
          <span className="ml-1 dark:text-purple-100 text-orange-100 text-decoration-line: underline">
            <EmailCopy /> 
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
        {/* Navigation buttons - vertical for small/medium, horizontal for large */}
        {/* <nav className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 justify-center">
          <InteractiveHoverButton link="#home">Home</InteractiveHoverButton>
          <InteractiveHoverButtonColor2 link="mailto:nhari142004@gmail.com">
            Contact Me
          </InteractiveHoverButtonColor2>
          <InteractiveHoverButton link="#skills">About Me</InteractiveHoverButton>
        </nav> */}
        {/* Social Media Links - vertical for small/medium, horizontal for large */}
        {/* <nav className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 justify-center mt-4">
          <InteractiveHoverButton link="https://github.com/14-Hari-14">
            Github
          </InteractiveHoverButton>
          <InteractiveHoverButtonColor2 link="https://www.linkedin.com/hari-nair-243811247/">
            Linkedin
          </InteractiveHoverButtonColor2>
          <InteractiveHoverButton link="https://www.instagram.com/ha.rii_14/">
            Instagram
          </InteractiveHoverButton>
        </nav> */}
      </div>
      
      {/* Username display - responsive for all screen widths */}
      <div className="w-full overflow-hidden mt-10 flex items-center justify-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[150px] 2xl:text-[200px] tracking-widest leading-tight md:leading-[0.8] whitespace-nowrap">
          14-Hari-14
        </h1>
      </div>
    </div>
  );
};

export default Contact;