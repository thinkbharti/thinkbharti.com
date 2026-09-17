"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

type Category = {
  name: string;
  slug: string;
};

export default function Navigation({ categories = [] }: { categories?: Category[] }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path);

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
            <div className="absolute top-full right-0 w-48 bg-white border border-gray-200 shadow-lg rounded-b-md hidden group-hover:block transition-all">
              <Link href="/authors" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-[#E31E24]">Our Authors</Link>
              <Link href="/about" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-[#E31E24]">About Us</Link>
              <Link href="/contact" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-[#E31E24]">Contact</Link>
              <Link href="/advertise" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-[#E31E24]">Advertise</Link>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="lg:hidden flex justify-between items-center py-3">
          <div className="font-bold text-[#101820]">Menu</div>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-800 hover:text-[#E31E24] p-1"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg">
          <div className="flex flex-col py-2">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-6 py-3 font-medium flex items-center ${pathname === "/" ? "text-[#E31E24] bg-gray-50" : "text-gray-800"}`}
            >
              <Home size={18} className="mr-3" />
              Home
            </Link>
            {categories.map((category) => {
              const href = `/category/${category.slug}`;
              return (
                <Link 
                  key={category.slug} 
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-6 py-3 font-medium ${isActive(href) ? "text-[#E31E24] bg-gray-50" : "text-gray-800"}`}
                >
                  {category.name}
                </Link>
              );
            })}
            <Link 
              href="/authors" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-6 py-3 font-medium ${isActive("/authors") ? "text-[#E31E24] bg-gray-50" : "text-gray-800"}`}
            >
              Our Authors
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
