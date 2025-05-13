"use client";

import { motion, useMotionValue, useTransform, MotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { IconBrandGithub, IconBrandGmail, IconBrandLinkedin } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import Link from 'next/link';
import React from 'react';

type LinkType = {
  title: string;
  icon: React.ReactElement<{ className?: string }>; // Explicitly type the icon prop
  href: string;
};

export const FloatingDock = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <FloatingDockCore />
    </div>
  );
};

const FloatingDockCore = () => {
  const links: LinkType[] = [
    { title: 'Linkedin', icon: <IconBrandLinkedin />, href: '/' },
    { title: 'Github', icon: <IconBrandGithub />, href: '/' },
    { title: 'Mail', icon: <IconBrandGmail />, href: '/' },
  ];

  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e: React.MouseEvent) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-10 inset-x-0 mx-auto flex items-center gap-4 rounded-2xl bg-blue-200 justify-center h-16 w-fit px-4 py-6 border border-solid border-purple-100" 
    >
      {links.map((el) => (
        <IconContainer mouseX={mouseX} key={el.title} el={el} />
      ))}
    </motion.div>
  );
};

const IconContainer = ({
  el,
  mouseX,
}: {
  el: LinkType;
  mouseX: MotionValue<number>;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthIconTransform = useTransform(distance, [-150, 0, 150], [35, 70, 35]);
  const heightIconTransform = useTransform(distance, [-150, 0, 150], [35, 70, 35]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthIconTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const heightIcon = useSpring(heightIconTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Link href={el.href} passHref onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <motion.div
        ref={ref}
        style={{
          width,
          height,
        }}
        className="flex relative items-center justify-center bg-blue-100 rounded-lg"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
                x: '-50%',
              }}
              animate={{
                opacity: 1,
                y: 0,
                x: '-50%',
              }}
              exit={{
                opacity: 0,
                y: 2,
                x: '-50%',
              }}
              transition={{
                duration: 0.2,
              }}
              className="absolute text-xs text-purple-100 left-1/2 -translate-x-1/2 -top-8 px-2 py-0.5 whitespace-pre w-fit bg-blue-200 rounded-md"
            >
              {el.title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className="flex items-center justify-center"
          style={{
            width: widthIcon,
            height: heightIcon,
          }}
        >
          {React.cloneElement(el.icon, {
            className: `h-full w-full transition-colors duration-300 ${
              hovered ? 'text-purple-100' : 'text-neutral-500'
            }`,
          })}
        </motion.div>
      </motion.div>
    </Link>
  );
};