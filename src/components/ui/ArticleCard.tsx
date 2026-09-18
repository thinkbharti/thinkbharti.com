"use client";

import Link from "next/link";
import { Clock, Bookmark } from "lucide-react";
import { useBookmarks } from "@/lib/bookmarks";

interface ArticleCardProps {
  id?: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor?: string;
  author: string;
  readTime: string;
  imageUrl: string;
  href: string;
}

export default function ArticleCard({
  id,
  title,
  excerpt,
  category,
  categoryColor = "#E31E24",
  author,
  readTime,
  imageUrl,
  href,
}: ArticleCardProps) {
  const { isBookmarked, toggle } = useBookmarks();
  const slug = href.replace("/article/", "");
  const bookmarked = isBookmarked(slug);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle({
      id: id || slug,
      slug,
      title,
      excerpt,
      category,
      categoryColor,
      author,
      readTime,
      imageUrl,
    });
  };

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-red-100 hover:shadow-xl transition-all duration-300">
      <Link href={href} className="flex flex-col h-full">
        {/* Featured Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 shrink-0">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
            style={{ backgroundImage: `url("${imageUrl}")` }}
          ></div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={handleBookmarkClick}
            aria-label={bookmarked ? "Remove Bookmark" : "Save Article"}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 z-10 shadow-md ${
              bookmarked 
                ? "bg-[#E31E24] text-white" 
                : "bg-black/50 text-white hover:bg-black/80 backdrop-blur-sm"
            }`}
          >
            <Bookmark size={16} className={bookmarked ? "fill-white" : ""} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <span 
            className="text-xs font-bold uppercase tracking-wider mb-2.5 inline-block"
            style={{ color: categoryColor }}
          >
            {category}
          </span>
          <h3 className="text-lg md:text-xl font-bold text-[#1F2933] group-hover:text-[#E31E24] transition-colors leading-snug mb-2.5 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1 leading-relaxed">
            {excerpt}
          </p>
          <div className="flex items-center text-gray-500 text-xs font-medium mt-auto pt-3 border-t border-gray-100">
            <span className="font-semibold text-gray-700 truncate max-w-[130px]">{author}</span>
            <span className="mx-2 text-gray-300">•</span>
            <Clock size={13} className="mr-1 text-gray-400" />
            <span>{readTime} read</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
