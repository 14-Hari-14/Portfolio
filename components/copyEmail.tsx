'use client';

import { useState } from 'react';

interface EmailCopyProps {
  onClick?: () => void;
}

const EmailCopy = ({ onClick }: EmailCopyProps) => {
  const [copied, setCopied] = useState(false);
  const email = "nhari142004@gmail.com";

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(email);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      // Call the onClick prop if provided
      if (onClick) onClick();
    } catch (err) {
      console.error("Failed to copy email: ", err);
      alert(`Please copy manually: ${email}`);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="text-[18px] font-mono px-4 py-2 rounded-md bg-gray-200 dark:bg-blue-200 dark:text-purple-100 text-orange-100 border border-orange-100 dark:border-purple-100 hover:bg-orange-100 hover:text-white-100 transition duration-300"
      aria-label="Copy email address"
    >
      {copied ? 'Copied!' : email}
    </button>
  );
};

export default EmailCopy;