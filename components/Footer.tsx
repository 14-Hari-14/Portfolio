import React from 'react'

const Footer = () => {
  return (
    <footer className="max-w-full w-full mx-auto flex justify-between items-center pt-8 bg-orange-100 border-gray-800 rounded-lg snap-end">
        <div className="flex items-center justify-between space-x-4">
        <span className="text-[18px] text-gray-200">Hari ©2025 - Privacy Policy</span>
        <span className='w-[80vw] hidden sm:block'></span>
        <span className="text-[18px]">Kerala, India</span>
        </div>
    </footer>
  )
}

export default Footer