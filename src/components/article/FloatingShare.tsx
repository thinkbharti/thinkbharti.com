"use client";

import { Share2, MessageCircle } from "lucide-react";
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { useEffect, useState } from "react";

export default function FloatingShare() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the floating share only after scrolling down a bit (e.g. past the main title)
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3 bg-white p-2 rounded-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 animate-in fade-in slide-in-from-left-4 duration-300">
      <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-[#E31E24] hover:bg-red-50 transition-colors" title="Share on Facebook">
        <FaFacebookF size={18} />
      </button>
      <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-[#E31E24] hover:bg-red-50 transition-colors" title="Share on X (Twitter)">
        <FaXTwitter size={18} />
      </button>
      <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-[#E31E24] hover:bg-red-50 transition-colors" title="Share on LinkedIn">
        <FaLinkedinIn size={18} />
      </button>
      <div className="w-6 mx-auto border-t border-gray-200 my-1"></div>
      <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-[#E31E24] hover:bg-red-50 transition-colors" title="Copy Link">
        <Share2 size={18} />
      </button>
      <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-[#E31E24] hover:bg-red-50 transition-colors" title="Comments">
        <MessageCircle size={18} />
      </button>
    </div>
  );
}
