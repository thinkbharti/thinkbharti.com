import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

export default function BrandHeader() {
  return (
    <div className="bg-white py-6 px-4 md:px-8 border-b border-gray-100">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center lg:items-start shrink-0">
          <Link href="/" className="relative block w-64 h-20 mb-1">
            <Image 
              src="/logo.webp" 
              alt="ThinkBharti Logo" 
              fill 
              className="object-contain object-left" 
              priority 
            />
          </Link>
          <div className="text-gray-500 text-xs font-medium tracking-wide ml-1">
            News | Ideas | People | Progress
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-xl mx-auto flex items-center bg-gray-50 rounded-full border border-gray-200 px-4 py-3 focus-within:ring-1 focus-within:ring-[#E31E24] focus-within:border-[#E31E24] transition-all">
          <input 
            type="text" 
            placeholder="Search articles, topics, or keywords..." 
            className="bg-transparent flex-1 outline-none text-sm text-gray-800 placeholder-gray-400"
          />
          <button className="text-gray-400 hover:text-[#E31E24] transition-colors ml-2">
            <Search size={20} />
          </button>
        </div>

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
