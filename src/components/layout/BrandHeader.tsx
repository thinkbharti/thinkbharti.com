"use client";

import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BrandHeader() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="bg-white py-6 px-4 md:px-8 border-b border-gray-100">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center shrink-0">
          <Link href="/" className="relative block w-64 h-20 mb-1">
            <Image 
              src="/logo.webp" 
              alt="ThinkBharti Logo" 
              fill 
              className="object-contain object-center" 
              priority 
            />
          </Link>
          <div className="text-gray-500 text-xs font-medium tracking-wide text-center">
            News | Ideas | People | Progress
          </div>
        </div>

        {/* Search Bar Form */}
        <form 
          onSubmit={handleSearch}
          className="w-full max-w-xl mx-auto flex items-center bg-gray-50 rounded-full border border-gray-200 px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#E31E24]/20 focus-within:border-[#E31E24] focus-within:bg-white transition-all shadow-sm"
        >
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, topics, or authors..." 
            className="bg-transparent flex-1 outline-none text-sm text-gray-800 placeholder-gray-400 px-2"
          />
          <button 
            type="submit"
            aria-label="Search"
            className="text-gray-400 hover:text-[#E31E24] hover:bg-red-50 p-2 rounded-full transition-all ml-1"
          >
            <Search size={18} />
          </button>
        </form>

        {/* Brand Graphic */}
        <div className="hidden lg:block shrink-0 relative w-64 h-16">
          <Image 
            src="/brighter-india.webp" 
            alt="A Brighter India Together" 
            fill 
            className="object-contain object-right" 
            priority
          />
        </div>
        
      </div>
    </div>
  );
}
