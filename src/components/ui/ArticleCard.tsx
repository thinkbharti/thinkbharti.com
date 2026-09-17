import Link from "next/link";
import { Clock } from "lucide-react";

interface ArticleCardProps {
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
  title,
  excerpt,
  category,
  categoryColor = "#E31E24",
  author,
  readTime,
  imageUrl,
  href,
}: ArticleCardProps) {
  return (
    <Link href={href} className="group flex flex-col h-full bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 shrink-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105" 
          style={{ backgroundImage: `url("${imageUrl}")` }}
        ></div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span 
          className="text-xs font-bold uppercase tracking-wider mb-3 inline-block"
          style={{ color: categoryColor }}
        >
          {category}
        </span>
        <h3 className="text-xl font-bold text-[#1F2933] group-hover:text-[#E31E24] transition-colors leading-snug mb-3">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
          {excerpt}
        </p>
        <div className="flex items-center text-gray-500 text-xs font-medium mt-auto">
          <span className="font-semibold text-gray-700">{author}</span>
          <span className="mx-2">•</span>
          <Clock size={14} className="mr-2" />
          <span>{readTime} read</span>
        </div>
      </div>
    </Link>
  );
}
