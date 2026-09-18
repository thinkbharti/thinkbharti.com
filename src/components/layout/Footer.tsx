"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Mail, ArrowUpRight, ShieldCheck } from "lucide-react";
import { FaFacebookF, FaXTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#0c121c] text-gray-300 relative overflow-hidden">
      {/* Top Gradient Highlight Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-[#E31E24] to-red-600"></div>

      {/* Decorative Background Glows */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start">
            <div className="mb-5">
              {/* Premium Logo Card */}
              <Link 
                href="/" 
                className="relative block w-56 h-16 bg-white rounded-2xl p-2.5 shadow-xl shadow-black/40 border border-white/20 hover:scale-[1.02] transition-transform duration-300"
              >
                <Image 
                  src="/logo.webp" 
                  alt="ThinkBharti Logo" 
                  fill 
                  className="object-contain p-1" 
                />
              </Link>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-6 text-center sm:text-left max-w-sm">
              ThinkBharti is dedicated to delivering independent journalism, thoughtful analysis, and progressive ideas shaping modern India.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: FaFacebookF, href: "#", label: "Facebook" },
                { icon: FaXTwitter, href: "#", label: "Twitter" },
                { icon: FaInstagram, href: "#", label: "Instagram" },
                { icon: FaYoutube, href: "#", label: "YouTube" },
                { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#E31E24] hover:border-[#E31E24] hover:shadow-lg hover:shadow-red-900/30 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Icon size={16} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Categories Navigation (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E31E24]"></span>
              Categories
            </h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
              {[
                { name: "India", href: "/category/india" },
                { name: "Finance", href: "/category/finance" },
                { name: "Science", href: "/category/science" },
                { name: "Environment", href: "/category/environment" },
                { name: "Technology", href: "/category/technology" },
                { name: "Sports", href: "/category/sports" },
                { name: "Opinion", href: "/category/opinion" },
                { name: "Lifestyle", href: "/category/lifestyle" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5 group"
                >
                  <span className="text-gray-600 group-hover:text-[#E31E24] transition-colors">›</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links & Legal (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E31E24]"></span>
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Our Authors", href: "/authors" },
                { name: "Latest Stories", href: "/latest" },
                { name: "Trending", href: "/trending" },
                { name: "Advertise with Us", href: "/advertise" },
                { name: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span className="text-gray-600 group-hover:text-[#E31E24] transition-colors">›</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Box (3 cols) */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-2 text-white font-bold text-base mb-2">
                <Mail size={18} className="text-[#E31E24]" />
                <span>Daily Briefing</span>
              </div>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                Get the top stories, deep dives, and expert perspectives directly in your inbox every morning.
              </p>
              
              <form className="flex flex-col gap-2.5" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="name@email.com" 
                    className="w-full bg-black/40 border border-gray-700/80 text-white placeholder-gray-500 px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#E31E24] focus:ring-1 focus:ring-[#E31E24] text-xs transition-all"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#E31E24] hover:bg-red-700 text-white px-4 py-2.5 rounded-xl transition-all font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-red-900/40 hover:shadow-red-900/60 active:scale-[0.99]"
                >
                  <span>Subscribe Now</span>
                  <ArrowUpRight size={14} />
                </button>
              </form>

              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-3 pt-3 border-t border-white/5">
                <ShieldCheck size={13} className="text-emerald-500" />
                <span>Zero spam. Unsubscribe anytime.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} ThinkBharti Media. All rights reserved.</p>

          <div className="flex items-center gap-6 text-xs text-gray-400">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-gray-700">•</span>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <span className="text-gray-700">•</span>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>

          <p className="flex items-center gap-1.5 font-medium text-gray-400">
            Made with <Heart size={14} className="text-[#E31E24] fill-[#E31E24]" /> for a Better India 🇮🇳
          </p>
        </div>

      </div>
    </footer>
  );
}
