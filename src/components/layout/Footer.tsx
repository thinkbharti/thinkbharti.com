"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { FaFacebookF, FaXTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#101820] text-gray-300 pt-16 pb-8 border-t-4 border-[#E31E24]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex flex-col items-center sm:items-start mb-4">
              <div className="flex flex-col items-center gap-2.5">
                <Link href="/" className="relative block w-52 h-14 bg-white rounded-xl p-2 shadow-sm hover:shadow-md transition-all">
                  <Image 
                    src="/logo.webp" 
                    alt="ThinkBharti Logo" 
                    fill 
                    className="object-contain p-1.5" 
                  />
                </Link>
                <div className="text-gray-400 text-[11px] font-medium tracking-wider text-center">
                  News | Ideas | People | Progress
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-6 line-clamp-3">
              Your destination for news, ideas and stories that matter.
            </p>
            <div className="flex items-center gap-4 text-gray-400">
              <Link href="#" className="hover:text-white transition-colors"><FaFacebookF size={18} /></Link>
              <Link href="#" className="hover:text-white transition-colors"><FaXTwitter size={18} /></Link>
              <Link href="#" className="hover:text-white transition-colors"><FaInstagram size={18} /></Link>
              <Link href="#" className="hover:text-white transition-colors"><FaYoutube size={18} /></Link>
              <Link href="#" className="hover:text-white transition-colors"><FaLinkedinIn size={18} /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">Categories</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link href="/category/india" className="hover:text-white transition-colors">India</Link>
              <Link href="/category/entertainment" className="hover:text-white transition-colors">Entertainment</Link>
              <Link href="/category/world" className="hover:text-white transition-colors">World</Link>
              <Link href="/category/lifestyle" className="hover:text-white transition-colors">Lifestyle</Link>
              <Link href="/category/business" className="hover:text-white transition-colors">Business</Link>
              <Link href="/category/education" className="hover:text-white transition-colors">Education</Link>
              <Link href="/category/technology" className="hover:text-white transition-colors">Technology</Link>
              <Link href="/category/opinion" className="hover:text-white transition-colors">Opinion</Link>
              <Link href="/category/sports" className="hover:text-white transition-colors">Sports</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">Subscribe to get the latest updates.</p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-[#E31E24] text-sm"
                required
              />
              <button 
                type="submit"
                className="bg-[#E31E24] hover:bg-red-700 text-white px-4 py-2 rounded transition-colors font-medium text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ThinkBharti. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={12} className="text-[#E31E24] fill-[#E31E24]" /> for a better India
          </p>
        </div>
      </div>
    </footer>
  );
}
