"use client"

import { SiHtml5, SiCss3, SiJavascript, SiReact, SiNextdotjs, SiNodedotjs, SiPython, SiC, SiCplusplus, SiOpenjdk, SiGit, SiGithub, SiMysql } from "react-icons/si";
import { SiSupabase, SiFirebase, SiTailwindcss, SiTypescript, SiFigma } from "react-icons/si";
import { InteractiveHoverButtonColor2 } from "./ui/ButtonColor";
import { InteractiveHoverButtonColorLarge } from "./ui/ButtonColorLarge";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import heritageLogo from '/images/heritage_logo.png'
import mecLogo from '/images/mec_logo.jpg'

type Skill = {
  icon: React.ReactNode;
  name: string;
};

type SkillCategories = {
  "Web-Dev": Skill[];
  "Lang": Skill[];
  "DB": Skill[];
  "Tools": Skill[];
};

const About = () => {
    const [activeCategory, setActiveCategory] = useState<keyof SkillCategories>("Web-Dev");
    const [activeSection, setActiveSection] = useState("Skills");

    const skillCategories: SkillCategories = {
        "Web-Dev": [
            { icon: <SiHtml5 className="text-red-500 text-[40px] lg:text-[50px]" />, name: "HTML" },
            { icon: <SiCss3 className="text-blue-500 text-[40px] lg:text-[50px]" />, name: "CSS" },
            { icon: <SiJavascript className="text-yellow-500 text-[40px] lg:text-[50px]" />, name: "JavaScript" },
            { icon: <SiReact className="dark:text-blue-400 text-blue-600 text-[40px] lg:text-[50px]" />, name: "React" },
            { icon: <SiNextdotjs className="text-white-100 text-[40px] lg:text-[50px]" />, name: "Next.js" },
            { icon: <SiTailwindcss className="text-cyan-400 text-[40px] lg:text-[50px]" />, name: "Tailwind" },
            { icon: <SiNodedotjs className="text-green-500 text-[40px] lg:text-[50px]" />, name: "Node.js" }
        ],
        "Lang": [
            { icon: <SiPython className="text-yellow-500 text-[40px] lg:text-[50px]" />, name: "Python" },
            { icon: <SiC className="text-blue-500 text-[40px] lg:text-[50px]" />, name: "C" },
            { icon: <SiCplusplus className="text-blue-300 text-[40px] lg:text-[50px]" />, name: "C++" },
            { icon: <SiTypescript className="text-blue-500 text-[40px] lg:text-[50px]" />, name: "TypeScript" },
            { icon: <SiOpenjdk className="text-red-600 text-[40px] lg:text-[50px]" />, name: "Java" }
        ],
        "DB": [
            { icon: <SiSupabase className="text-green-400 text-[40px] lg:text-[50px]" />, name: "Supabase" },
            { icon: <SiFirebase className="text-orange-400 text-[40px] lg:text-[50px]" />, name: "Firebase" },
            { icon: <SiMysql className="text-blue-300 text-[40px] lg:text-[50px]" />, name: "MySQL" }
        ],
        "Tools": [
            { icon: <SiGit className="text-orange-400 text-[40px] lg:text-[50px]" />, name: "Git" },
            { icon: <SiGithub className="dark:text-white-100 text-gray-200 text-[40px] lg:text-[50px]" />, name: "GitHub" },
            { icon: <SiFigma className="text-purple-400 text-[40px] lg:text-[50px]" />, name: "Figma" }
        ]
    };

    const hoverSound = useRef<HTMLAudioElement | null>(null);
    const clickSound = useRef<HTMLAudioElement | null>(null);

    // Initialize audio in useEffect
    useEffect(() => {

        if (typeof window !== 'undefined') {
        // This runs only on client side after component mounts
        hoverSound.current = new Audio("/audios/interactitvebutton.mp3");
        clickSound.current = new Audio("/audios/navbarclick.wav");
        
        // Optional: Cleanup function to pause audio when component unmounts
        return () => {
            if (hoverSound.current) {
                hoverSound.current.pause();
                hoverSound.current = null;
            }
            if (clickSound.current) {
                clickSound.current.pause();
                clickSound.current = null;
            }
        }};
    }, []);

    const handleHover = () => {
        if (hoverSound.current) {
            hoverSound.current.currentTime = 0;
            hoverSound.current.play().catch((e) => {
                console.warn("Playback prevented by browser:", e);
            });
        }
    };

    const handleClick = () => {
        if (clickSound.current) {
            clickSound.current.currentTime = 0;
            clickSound.current.play().catch((e) => {
                console.warn("Playback prevented by browser:", e);
            });
        }
        
        // Also play hoverSound once to "unlock" it on mobile
        if (hoverSound.current) {
            hoverSound.current.play().catch((e) => {
                console.warn("Playback prevented by browser:", e);
            });
        }
    };


    return (
        <div className="pb-36 px-4 md:px-6 lg:px-8" id="skills">
            
            <div className="w-full mt-12 md:mt-20 lg:mt-24 px-4 md:px-6 lg:px-2">
                <h1 className="dark:text-purple-100 text-orange-100 text-3xl md:text-4xl lg:text-5xl font-bold">
                    About Me
                </h1>
            </div>
            {/* Reduced the top margin here from mt-20 md:mt-40 lg:mt-72 to mt-8 md:mt-12 lg:mt-16 */}
            <div className="flex flex-col lg:flex-row items-stretch justify-start mt-8 md:mt-12 lg:mt-2 w-full gap-6 lg:gap-10">
                {/* Main Section */}
                <div className="border border-solid dark:border-purple-100 border-white-200 rounded-lg hover:bg-opacity-15 w-full p-4 lg:p-6">
                    {/* Navigation Buttons Row */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        <InteractiveHoverButtonColorLarge 
                            onMouseEnter={handleHover}
                            onClick={() => {
                                handleClick();
                                setActiveSection("Skills");
                            }}
                            className={activeSection === "Skills" ? "bg-opacity-30" : ""}
                        >
                            Skills
                        </InteractiveHoverButtonColorLarge>
                        <InteractiveHoverButtonColorLarge 
                            onMouseEnter={handleHover}
                            onClick={() => {
                                handleClick();
                                setActiveSection("Hackathons");
                            }}
                            className={activeSection === "Hackathons" ? "bg-opacity-30" : ""}
                        >
                            Hackathons
                        </InteractiveHoverButtonColorLarge>
                        <InteractiveHoverButtonColorLarge 
                            onMouseEnter={handleHover}
                            onClick={() => {
                                handleClick();
                                setActiveSection("Education");
                            }}
                            className={activeSection === "Education" ? "bg-opacity-30" : ""}
                        >
                            Education
                        </InteractiveHoverButtonColorLarge>
                        <InteractiveHoverButtonColorLarge 
                            onMouseEnter={handleHover}
                            onClick={() => {
                                handleClick();
                                setActiveSection("Work Experience");
                            }}
                            className={activeSection === "Work Experience" ? "bg-opacity-30" : ""}
                        >
                            Work Experience
                        </InteractiveHoverButtonColorLarge>
                    </div>

                    {/* Skills Section (only shown when active) */}
                    {activeSection === "Skills" && (
                        <>
                            {/* Mobile: Horizontal divider above buttons */}
                            <div className="block lg:hidden w-full h-px bg-gray-300 dark:bg-purple-100 bg-opacity-50 my-4"></div>
                            
                            <div className="flex flex-col lg:flex-row h-fit mt-6 lg:mt-10">
                                {/* Buttons Column */}
                                <div className="relative w-full lg:w-1/4">
                                    {/* Mobile: Horizontal scroll for buttons */}
                                    <div className="lg:hidden overflow-x-auto pb-2 scrollbar-hide ">
                                        <div className="flex gap-4 w-max">
                                            {(Object.keys(skillCategories) as Array<keyof SkillCategories>).map((category) => (
                                                <InteractiveHoverButtonColor2 
                                                    key={category}
                                                    onMouseEnter={handleHover}
                                                    onClick={() => {
                                                        handleClick();
                                                        setActiveCategory(category);
                                                    }}
                                                    className={activeCategory === category ? "bg-opacity-30" : ""}
                                                >
                                                    {category}
                                                </InteractiveHoverButtonColor2>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Desktop: Vertical buttons */}
                                    <div className="hidden lg:flex flex-col gap-[33px] pr-6">
                                        {(Object.keys(skillCategories) as Array<keyof SkillCategories>).map((category) => (
                                            <InteractiveHoverButtonColor2 
                                                key={category}
                                                onMouseEnter={handleHover}
                                                onClick={() => {
                                                    handleClick();
                                                    setActiveCategory(category);
                                                }}
                                                className={activeCategory === category ? "bg-opacity-30" : ""}
                                            >
                                                {category}
                                            </InteractiveHoverButtonColor2>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Mobile: Horizontal divider below buttons */}
                                <div className="block lg:hidden w-full h-px bg-gray-300 dark:bg-purple-100 bg-opacity-50 my-4"></div>
                                
                                {/* Cards Grid */}
                                <div className="w-full lg:w-3/4">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {skillCategories[activeCategory].map((skill, index) => (
                                            <div 
                                                key={index}
                                                className="flex flex-col items-center justify-center bg-orange-100 dark:bg-purple-100 bg-opacity-10 dark:bg-opacity-10 rounded-lg p-4 h-32 lg:h-36 border border-orange-100 dark:border-purple-100 border-opacity-30 hover:bg-opacity-20 dark:hover:bg-opacity-20 transition-all"
                                            >
                                                {skill.icon}
                                                <span className="text-gray-200 dark:text-white-100 mt-2 text-sm">{skill.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Other Sections (currently empty) */}
                    {activeSection === "Hackathons" && (
                    <div className="mt-8 px-4">
                        <h1 className="text-[40px] md:text-[50px] lg:text-[60px] dark:text-purple-100 text-orange-100 underline pl-2 md:pl-3">
                        Hackathons
                        </h1>
                        
                        {/* First Hackathon */}
                        <div className="mt-6 p-4 border border-orange-100 dark:border-purple-100 border-opacity-30 dark:border-opacity-30 rounded-lg bg-orange-100 dark:bg-purple-100 bg-opacity-10 dark:bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-20 transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                            <h2 className="text-[24px] md:text-[28px] lg:text-[32px] dark:text-white-100 text-gray-200 font-medium">
                                Hult Prize
                            </h2>
                            <p className="text-[16px] md:text-[18px] lg:text-[20px] dark:text-purple-200 text-gray-200">
                                February 2024 • Organized by HULT
                            </p>
                            </div>
                            <div className="flex items-center">
                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                2nd Place
                            </span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-[16px] dark:text-white-100 text-gray-200">
                            Presented the idea of a carbon credits market place which would help in trading of carbon credits resulting in more awareness about carbon emission while helping smaller businesses
                            </p>
                        </div>
                        </div>
                        
                        {/* Second Hackathon */}
                        <div className="mt-6 p-4 border border-orange-100 dark:border-purple-100 border-opacity-30 dark:border-opacity-30 rounded-lg bg-orange-100 dark:bg-purple-100 bg-opacity-10 dark:bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-20 transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                            <h2 className="text-[24px] md:text-[28px] lg:text-[32px] dark:text-white-100 text-gray-200 font-medium">
                                Chakravyuha
                            </h2>
                            <p className="text-[16px] md:text-[18px] lg:text-[20px] dark:text-purple-200 text-gray-200">
                                October 2023 • Organized by IEEE SB NSSCE in collaboration with IEEE Kerala Section.
                            </p>
                            </div>
                            <div className="flex items-center">
                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Finalists
                            </span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-[16px] dark:text-white-100 text-gray-200">
                            This project uses machine learning to recognize sign language gestures from a camera feed and convert them into readable text. It aims to assist deaf and dumb individuals by enabling real-time communication with others, bridging the gap between sign language users and non-signers for more inclusive conversations.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                            <span className="bg-gray-200 text-orange-100 dark:bg-purple-100 dark:text-white-100 px-3 py-1 rounded-full text-sm">Python</span>
                            <span className="bg-gray-200 text-orange-100 dark:bg-purple-100 dark:text-white-100 px-3 py-1 rounded-full text-sm">TensorFlow</span>
                            <span className="bg-gray-200 text-orange-100 dark:bg-purple-100 dark:text-white-100 px-3 py-1 rounded-full text-sm">Web Sockets</span>
                            <span className="bg-gray-200 text-orange-100 dark:bg-purple-100 dark:text-white-100 px-3 py-1 rounded-full text-sm">Streamlit</span>
                            </div>
                        </div>
                        </div>
                        
                        {/* Third Hackathon */}
                        <div className="mt-6 p-4 border border-orange-100 dark:border-purple-100 border-opacity-30 dark:border-opacity-30 rounded-lg bg-orange-100 dark:bg-purple-100 bg-opacity-10 dark:bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-20 transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                            <h2 className="text-[24px] md:text-[28px] lg:text-[32px] dark:text-white-100 text-gray-200 font-medium">
                                GTA SandyShores
                            </h2>
                            <p className="text-[16px] md:text-[18px] lg:text-[20px] dark:text-purple-200 text-gray-200">
                                April 2024 • Organized by Mulearn
                            </p>
                            </div>
                            <div className="flex items-center">
                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Finalist
                            </span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-[16px] dark:text-white-100 text-gray-200">
                            Built a neural network model to detect fire and smoke from live video feeds in real time, enabling early warnings for improved safety in homes and industrial settings.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                            <span className="bg-gray-200 text-orange-100 dark:bg-purple-100 dark:text-white-100 px-3 py-1 rounded-full text-sm">Python</span>
                            <span className="bg-gray-200 text-orange-100 dark:bg-purple-100 dark:text-white-100 px-3 py-1 rounded-full text-sm">Pytorch</span>
                            <span className="bg-gray-200 text-orange-100 dark:bg-purple-100 dark:text-white-100 px-3 py-1 rounded-full text-sm">Streamlit</span>
                            <span className="bg-gray-200 text-orange-100 dark:bg-purple-100 dark:text-white-100 px-3 py-1 rounded-full text-sm">Bash</span>
                            </div>
                        </div>
                        </div>
                        {/* Fourth Hackathon */}
                        <div className="mt-6 p-4 border border-orange-100 dark:border-purple-100 border-opacity-30 dark:border-opacity-30 rounded-lg bg-orange-100 dark:bg-purple-100 bg-opacity-10 dark:bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-20 transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                            <h2 className="text-[24px] md:text-[28px] lg:text-[32px] dark:text-white-100 text-gray-200 font-medium">
                                Magic 2.0
                            </h2>
                            <p className="text-[16px] md:text-[18px] lg:text-[20px] dark:text-purple-200 text-gray-200">
                                December 2023 • Organized by IEEE MEC SB
                            </p>
                            </div>
                            <div className="flex items-center">
                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Finalist
                            </span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-[16px] dark:text-white-100 text-gray-200">
                            Built a web app which will show baked recipes
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                            <span className="bg-gray-200 text-orange-100 dark:bg-purple-100 dark:text-white-100 px-3 py-1 rounded-full text-sm">HTML</span>
                            <span className="bg-gray-200 text-orange-100 dark:bg-purple-100 dark:text-white-100 px-3 py-1 rounded-full text-sm">CSS</span>
                            <span className="bg-gray-200 text-orange-100 dark:bg-purple-100 dark:text-white-100 px-3 py-1 rounded-full text-sm">JS</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    )}
                    {activeSection === "Education" && (
                    <div className="mt-8 px-4">
                        <h1 className="text-[40px] md:text-[50px] lg:text-[60px] dark:text-purple-100 text-orange-100 underline pl-2 md:pl-3">
                        Education
                        </h1>
                        
                        {/* First Education Item */}
                        <div className="flex flex-wrap items-center pl-2 md:pl-4 pt-5 pb-2 gap-4">
                        <div className="relative h-[60px] w-[60px] md:h-[80px] md:w-[80px] lg:h-[90px] lg:w-[90px]">
                            <Image 
                            src={heritageLogo.src} 
                            alt="school-logo"
                            fill
                            className="object-contain"
                            />
                        </div>
                        <div>
                            <h1 className="text-[20px] md:text-[25px] lg:text-[30px] dark:text-white-100 text-gray-200 pl-2">
                            Heritage Xperential Learning School (HXLS)
                            </h1>
                            <h1 className="text-[16px] md:text-[18px] lg:text-[20px] dark:text-purple-200 text-gray-200 pl-2">
                            April 2015 - July 2022
                            </h1>
                            <h1 className="text-[16px] md:text-[18px] lg:text-[20px] dark:text-purple-200 text-gray-200 pl-2">
                            10th: <span className="dark:text-orange-100 text-gray-900">91.8%</span> | 12th: <span className="dark:text-orange-100 text-gray-900">90.2%</span>
                            </h1>
                        </div>
                        </div>

                        {/* Second Education Item */}
                        <div className="flex flex-wrap items-center pl-2 md:pl-4 pt-8 md:pt-14 pb-1 gap-4">
                        <div className="relative h-[60px] w-[60px] md:h-[80px] md:w-[80px] lg:h-[90px] lg:w-[90px]">
                            <Image 
                            src={mecLogo.src} 
                            alt="school-logo"
                            fill
                            className="object-contain"
                            />
                        </div>
                        <div>
                            <h1 className="text-[20px] md:text-[25px] lg:text-[30px] dark:text-white-100 text-gray-200 pl-2">
                            Model Engineering College (MEC)
                            </h1>
                            <h1 className="text-[16px] md:text-[18px] lg:text-[20px] dark:text-purple-200 text-gray-200 pl-2">
                            November 2022 - July 2026
                            </h1>
                            <h1 className="text-[16px] md:text-[18px] lg:text-[20px] dark:text-purple-200 text-gray-200 pl-2">
                            Current CGPA: <span className="dark:text-orange-100 text-gray-900">8.3</span> | Converted to GPA: <span className="dark:text-orange-100 text-gray-900">3.32</span>
                            </h1>
                        </div>
                        </div>
                    </div>
                    )}
                    {activeSection === "Work Experience" && (
                    <div className="mt-8 flex flex-col items-center gap-4">
                        <p className="text-gray-200 dark:text-white-100">You are a bit early to this section</p>
                        <div className="relative h-[200px] w-[200px]">
                        <Image 
                            src="/work_Exp_meme.jpg" 
                            alt="Work experience meme"
                            fill
                            className="object-contain"
                        />
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default About;