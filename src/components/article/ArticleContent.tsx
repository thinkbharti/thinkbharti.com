import { Clock, Share2, User } from "lucide-react";
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

export interface ArticleData {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  content: string; // HTML string from Supabase
}

export default function ArticleContent({ article }: { article: ArticleData }) {
  return (
    <article className="max-w-[800px] mx-auto bg-white article-container" data-slug={article.slug}>
      {/* Breadcrumb / Category */}
      <div className="mb-6">
        <span className="text-[#E31E24] font-bold uppercase tracking-wider text-sm">
          {article.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-bold text-[#101820] leading-tight mb-6">
        {article.title}
      </h1>

      {/* Excerpt */}
      <p className="text-xl text-gray-600 mb-8 leading-relaxed">
        {article.excerpt}
      </p>

      {/* Meta Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between py-6 border-y border-gray-100 mb-10 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 overflow-hidden">
            <User size={24} />
          </div>
          <div>
            <div className="font-bold text-[#101820]">{article.author}</div>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <span>{article.date}</span>
              <span className="mx-2">•</span>
              <Clock size={14} className="mr-1" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
        
        {/* Social Share */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-500 mr-2">Share:</span>
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#E31E24] hover:border-[#E31E24] transition-colors">
            <FaFacebookF size={18} />
          </button>
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#E31E24] hover:border-[#E31E24] transition-colors">
            <FaXTwitter size={18} />
          </button>
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#E31E24] hover:border-[#E31E24] transition-colors">
            <FaLinkedinIn size={18} />
          </button>
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#E31E24] hover:border-[#E31E24] transition-colors">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Featured Image */}
      <div className="w-full aspect-[16/9] bg-gray-100 rounded-xl mb-12 overflow-hidden relative">
        <div 
          className="w-full h-full bg-cover bg-center absolute inset-0"
          style={{ backgroundImage: `url("${article.imageUrl}")` }}
        ></div>
      </div>

      {/* Article Content */}
      <div 
        className="prose prose-lg max-w-none prose-headings:text-[#101820] prose-a:text-[#E31E24]"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
}
