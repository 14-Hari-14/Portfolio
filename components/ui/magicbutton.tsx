import React, { ReactNode } from 'react'
import arrowUp from '../../images/Arrow up-right.png'
import { img } from 'framer-motion/client'
const MagicButton = ({
    title, handleClick, otherClasses, 
}:{
    title: string
    // icon: React.ReactNode
    // position: string
    handleClick?: () => void;
    otherClasses?: string

}
) => {
  return (
    <div>
        <button className="relative inline-flex w-full h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none md:w-60 md:mt-10">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 py-1 text-[20px] font-medium text-white backdrop-blur-3xl font-mono ${otherClasses}`}>
            {title} 
            <img 
            src={arrowUp.src} 
            alt="arrowIcon" 
            height={30}
            width={30}
            /> 
            </span>
        </button>
    </div>
  )
}

export default MagicButton

