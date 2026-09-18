"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu, X, ChevronDown, Bookmark, Flame } from "lucide-react";
import { useState } from "react";

type Category = {
  name: string;
  slug: string;
};

export default function Navigation({ categories = [] }: { categories?: Category[] }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path || (path !== "/" && pathname?.startsWith(path));

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          <Link 
            href="/" 
            className={`flex items-center px-4 py-4 text-sm font-semibold transition-colors border-b-2 ${
              pathname === "/" ? "border-[#E31E24] text-[#E31E24]" : "border-transparent text-gray-800 hover:text-[#E31E24]"
            }`}
          >
            <Home size={18} className="mr-2" />
            Home
          </Link>
          
          <Link 
            href="/trending" 
            className={`flex items-center px-4 py-4 text-sm font-semibold transition-colors border-b-2 ${
              isActive("/trending") ? "border-[#E31E24] text-[#E31E24]" : "border-transparent text-gray-800 hover:text-[#E31E24]"
            }`}
          >
            <Flame size={16} className="mr-1.5 text-[#FF5722]" />
            Trending
          </Link>

          {categories.map((category) => {
            const href = `/category/${category.slug}`;
            return (
              <Link 
                key={category.slug} 
                href={href}
                className={`px-4 py-4 text-sm font-semibold transition-colors border-b-2 ${
                  isActive(href) ? "border-[#E31E24] text-[#E31E24]" : "border-transparent text-gray-800 hover:text-[#E31E24]"
                }`}
              >
                {category.name}
              </Link>
            );
          })}

          <div className="group relative px-4 py-4 text-sm font-semibold text-gray-800 hover:text-[#E31E24] cursor-pointer flex items-center">
            More <ChevronDown size={14} className="ml-1" />
            <div className="absolute top-full right-0 w-52 bg-white border border-gray-200 shadow-xl rounded-b-xl py-2 hidden group-hover:block transition-all z-50">
              <Link href="/latest" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-[#E31E24]">Latest Stories</Link>
              <Link href="/authors" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-[#E31E24]">Our Authors</Link>
              <Link href="/about" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-[#E31E24]">About Us</Link>
              <Link href="/advertise" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-[#E31E24]">Advertise with Us</Link>
              <Link href="/contact" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-[#E31E24]">Contact Us</Link>
              <div className="border-t border-gray-100 my-1"></div>
              <Link href="/bookmarks" className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-[#E31E24] font-bold">
                <Bookmark size={15} />
                Saved Reading List
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="lg:hidden flex justify-between items-center py-3">
          <Link href="/" className="font-bold text-[#101820] flex items-center gap-2">
            <span>Menu</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/bookmarks" className="p-1.5 text-gray-700 hover:text-[#E31E24]" aria-label="Saved Bookmarks">
              <Bookmark size={20} />
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-800 hover:text-[#E31E24] p-1"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl z-50">
          <div className="flex flex-col py-3 divide-y divide-gray-100 text-sm">
            <div className="pb-2">
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-6 py-2.5 font-semibold flex items-center ${pathname === "/" ? "text-[#E31E24] bg-red-50/50" : "text-gray-800"}`}
              >
                <Home size={16} className="mr-3" />
                Home
              </Link>
              <Link 
                href="/trending" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-6 py-2.5 font-semibold flex items-center ${isActive("/trending") ? "text-[#E31E24] bg-red-50/50" : "text-gray-800"}`}
              >
                <Flame size={16} className="mr-3 text-[#FF5722]" />
                Trending
              </Link>
              <Link 
                href="/bookmarks" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-6 py-2.5 font-semibold flex items-center ${isActive("/bookmarks") ? "text-[#E31E24] bg-red-50/50" : "text-[#E31E24]"}`}
              >
                <Bookmark size={16} className="mr-3" />
                Saved Reading List
              </Link>
            </div>

            <div className="py-2">
              <div className="px-6 py-1 text-xs font-bold uppercase text-gray-400">Categories</div>
              {categories.map((category) => {
                const href = `/category/${category.slug}`;
                return (
                  <Link 
                    key={category.slug} 
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-6 py-2 block font-medium ${isActive(href) ? "text-[#E31E24] font-bold bg-red-50/50" : "text-gray-700"}`}
                  >
                    {category.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-2">
              <div className="px-6 py-1 text-xs font-bold uppercase text-gray-400">Company</div>
              <Link href="/latest" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-2 block text-gray-700">Latest Stories</Link>
              <Link href="/authors" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-2 block text-gray-700">Our Authors</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-2 block text-gray-700">About Us</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-2 block text-gray-700">Contact Us</Link>
              <Link href="/advertise" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-2 block text-gray-700">Advertise</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
