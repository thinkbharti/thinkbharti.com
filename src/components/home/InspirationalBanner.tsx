import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function InspirationalBanner() {
  return (
    <section className="my-16">
      <div className="relative rounded-2xl overflow-hidden min-h-[300px] flex items-center group shadow-xl">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gray-900">
          <div 
            className="w-full h-full bg-cover bg-center opacity-50 transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80")' }}
          ></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#101820]/95 via-[#101820]/80 to-[#101820]/40"></div>
        
        <div className="relative z-10 w-full container mx-auto px-8 md:px-14 py-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="max-w-2xl text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF5722] bg-orange-950/50 border border-orange-900/40 px-3 py-1 rounded-full mb-3">
              <Sparkles size={12} className="text-amber-400" />
              ThinkBharti Mission
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight tracking-tight">
              Shaping the Narrative of a Rising Nation.
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              We bring you thoughtful journalism, rigorous policy breakdowns, and bold ideas—grounded in facts, fueled by progress, and crafted for modern India.
            </p>
          </div>
          
          <div className="shrink-0">
            <Link 
              href="/latest" 
              className="inline-flex items-center bg-[#E31E24] hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-red-900/40 hover:shadow-red-900/60 active:scale-95 text-sm"
            >
              Explore More Articles
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
