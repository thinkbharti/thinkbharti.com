import Link from "next/link";
import { User } from "lucide-react";
import { format } from "date-fns";
import { FaFacebookF, FaXTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa6";

export default function TopBar() {
  return (
    <div className="bg-[#101820] text-gray-300 py-1.5 px-4 md:px-8 text-xs border-b border-gray-800 hidden sm:block">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Left: Date & Trending */}
        <div className="flex items-center gap-4">
          <span className="font-medium text-gray-400">
            {format(new Date(), "EEEE, MMMM d, yyyy")}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-[#E31E24] transition-colors"><FaFacebookF size={12} /></Link>
            <Link href="#" className="hover:text-[#E31E24] transition-colors"><FaXTwitter size={12} /></Link>
            <Link href="#" className="hover:text-[#E31E24] transition-colors"><FaInstagram size={12} /></Link>
            <Link href="#" className="hover:text-[#E31E24] transition-colors"><FaYoutube size={12} /></Link>
            <Link href="#" className="hover:text-[#E31E24] transition-colors"><FaLinkedinIn size={12} /></Link>
          </div>
          
          <div className="h-3 w-px bg-gray-600 hidden md:block"></div>
          
          <div className="flex items-center gap-3 font-medium">
            <Link href="/admin/login" className="hover:text-[#E31E24] transition-colors flex items-center gap-1">
              Login
            </Link>
            <Link href="#subscribe" className="bg-[#E31E24] text-white px-3 py-1 rounded hover:bg-red-700 transition-colors">
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
