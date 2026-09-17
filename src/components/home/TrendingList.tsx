import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const TRENDING_STORIES = [
  { 
    title: "Allahabad HC sets man who voluntarily converted to Islam free from his Hindu family's custody", 
    href: "#",
    date: "Yesterday · 09:03 pm"
  },
  { 
    title: "Preity Zinta, Pankaj Tripathi among new members of film certification board", 
    href: "#",
    date: "4 hours ago"
  },
  { 
    title: "Assam: Bulldozing homes of 73 Muslim families in Goalpara was unlawful, says HC", 
    href: "#",
    date: "Yesterday · 12:06 pm"
  },
  { 
    title: "Why parents prefer private schools over government schools – despite similar learning outcomes", 
    href: "#",
    date: "Yesterday · 06:30 am"
  },
  { 
    title: "Arunachal environmental activist booked by CBI for allegedly receiving illegal foreign funds", 
    href: "#",
    date: "Sep 15, 2026 · 01:42 pm"
  },
];

export default function TrendingList() {
  return (
    <div className="border border-gray-100 bg-white shadow-md rounded-xl mt-8 xl:mt-0 overflow-hidden relative flex flex-col">
      {/* Header Area with Faded Image */}
      <div className="relative h-40 w-full shrink-0">
        <Image 
          src="https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800&auto=format&fit=crop" 
          alt="Government Building"
          fill
          className="object-cover object-top opacity-30"
          unoptimized
        />
        {/* Gradient fade to white */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>
        
        {/* Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-[#FF5722] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-sm">
            Trending
          </span>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 flex flex-col -mt-4 relative z-10 bg-white">
        {TRENDING_STORIES.map((story, idx) => (
          <div key={idx} className="border-b border-gray-100 last:border-b-0">
            <Link href={story.href} className="flex gap-4 p-5 hover:bg-gray-50 transition-colors group">
              <span className="text-lg text-gray-500 font-serif min-w-[20px]">
                {idx + 1}.
              </span>
              <div className="flex flex-col gap-2">
                <h4 className="text-[16px] leading-snug font-serif text-gray-800 group-hover:text-[#FF5722] transition-colors">
                  {story.title}
                </h4>
                <span className="text-xs text-gray-500">
                  {story.date}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* See All Link */}
      <div className="border-t border-gray-100 bg-white p-4">
        <Link href="/trending" className="flex items-center justify-between text-[#FF5722] hover:text-orange-700 transition-colors text-sm font-medium">
          See all from Trending
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
