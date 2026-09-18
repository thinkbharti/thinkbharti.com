"use client";

import ArticleCard from "@/components/ui/ArticleCard";
import { useBookmarks } from "@/lib/bookmarks";
import { Bookmark, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BookmarksList() {
  const { bookmarks, isReady } = useBookmarks();

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 min-h-[70vh]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 pb-6 border-b border-gray-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E31E24] bg-red-50 px-3 py-1 rounded-full mb-2">
            <Bookmark size={14} className="fill-[#E31E24]" />
            Your Reading List
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#101820]">
            Saved Articles
          </h1>
        </div>
        <div className="text-sm font-medium text-gray-500">
          {isReady ? `${bookmarks.length} ${bookmarks.length === 1 ? 'Article' : 'Articles'} Saved` : "Loading..."}
        </div>
      </div>

      {/* Content */}
      {!isReady ? (
        <div className="py-20 text-center text-gray-400">Loading your saved articles...</div>
      ) : bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((article) => (
            <ArticleCard
              key={article.slug}
              id={article.id}
              title={article.title}
              excerpt={article.excerpt}
              category={article.category}
              categoryColor={article.categoryColor}
              author={article.author}
              readTime={article.readTime}
              imageUrl={article.imageUrl}
              href={`/article/${article.slug}`}
            />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center max-w-md mx-auto bg-gray-50 rounded-3xl border border-gray-200 p-8">
          <div className="w-16 h-16 bg-red-50 text-[#E31E24] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Bookmark size={28} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No saved articles yet</h3>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Click the bookmark icon on any article card to save it here for convenient reading later.
          </p>
          <Link
            href="/latest"
            className="inline-flex items-center gap-2 bg-[#E31E24] hover:bg-red-700 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-red-900/20"
          >
            Explore Articles
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}
