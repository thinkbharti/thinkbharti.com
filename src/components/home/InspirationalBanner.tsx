import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function InspirationalBanner() {
  return (
    <section className="my-16">
      <div className="relative rounded-2xl overflow-hidden min-h-[300px] flex items-center group">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gray-900">
          <div 
            className="w-full h-full bg-cover bg-center opacity-60"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80")' }}
          ></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#101820]/80 via-[#101820]/40 to-transparent"></div>
        
        <div className="relative z-10 w-full container mx-auto px-8 md:px-16 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-2xl text-left">
            <h2 className="text-3xl md:text-4xl font-serif italic font-bold text-white mb-4 leading-tight">
              “A more informed India today, a brighter tomorrow.”
            </h2>
            <p className="text-gray-300 font-medium">
              — ThinkBharti
            </p>
          </div>
          
          <div className="shrink-0">
            <Link 
              href="/article" 
              className="inline-flex items-center bg-[#E31E24] hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg"
            >
              Explore More Articles
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
