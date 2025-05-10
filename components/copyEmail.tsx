'use client';

import { useState } from 'react';

const EmailCopy = () => {
  const [copied, setCopied] = useState(false);
  const email = "nhari142004@gmail.com"; 

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="text-[18px] font-mono px-4 py-2 rounded-md bg-gray-200 dark:bg-blue-200 dark:text-purple-100 text-orange-100 border border-orange-100 dark:border-purple-100 hover:bg-orange-100 hover:text-white-100 transition duration-300"
    >
      {copied ? 'Copied!' : email}
    </button>
  );
};

export default EmailCopy;
