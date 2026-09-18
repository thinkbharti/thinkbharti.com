import Link from "next/link";
import { format } from "date-fns";
import { Bookmark } from "lucide-react";
import { FaFacebookF, FaXTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa6";

export default function TopBar() {
  return (
    <div className="bg-[#101820] text-gray-300 py-1.5 px-4 md:px-8 text-xs border-b border-gray-800 hidden sm:block">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Left: Date */}
        <div className="flex items-center gap-4">
          <span className="font-medium text-gray-400">
            {format(new Date(), "EEEE, MMMM d, yyyy")}
          </span>
        </div>

        {/* Right: Socials + Bookmarks + Admin */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Link href="#" aria-label="Facebook" className="hover:text-[#E31E24] transition-colors"><FaFacebookF size={12} /></Link>
            <Link href="#" aria-label="Twitter" className="hover:text-[#E31E24] transition-colors"><FaXTwitter size={12} /></Link>
            <Link href="#" aria-label="Instagram" className="hover:text-[#E31E24] transition-colors"><FaInstagram size={12} /></Link>
            <Link href="#" aria-label="YouTube" className="hover:text-[#E31E24] transition-colors"><FaYoutube size={12} /></Link>
            <Link href="#" aria-label="LinkedIn" className="hover:text-[#E31E24] transition-colors"><FaLinkedinIn size={12} /></Link>
          </div>
          
          <div className="h-3 w-px bg-gray-700 hidden md:block"></div>
          
          <div className="flex items-center gap-3 font-medium">
            <Link 
              href="/bookmarks" 
              className="hover:text-white text-gray-400 transition-colors flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-md"
            >
              <Bookmark size={12} className="text-[#E31E24]" />
              <span>Saved</span>
            </Link>
            <Link href="/admin/login" className="hover:text-[#E31E24] transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
