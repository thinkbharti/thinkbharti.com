"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import ArticleContent, { type ArticleData } from "./ArticleContent";
import { Loader2 } from "lucide-react";

export default function InfiniteArticleFeed({ initialSlug }: { initialSlug: string }) {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentSlug, setCurrentSlug] = useState(initialSlug);
  const loaderRef = useRef<HTMLDivElement>(null);

  const [hasMore, setHasMore] = useState(true);

  const fetchNextArticle = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      // Use the last fetched article's slug to avoid immediate duplicates
      const targetSlug = articles.length > 0 ? articles[articles.length - 1].slug : initialSlug;
      const res = await fetch(`/api/articles/next?currentSlug=${targetSlug}`);
      if (!res.ok) {
        setHasMore(false);
        return;
      }
      const data = await res.json();
      if (data && data.slug) {
        setArticles((prev) => [...prev, data]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch next article", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, articles, initialSlug]);

  // Observer for loading more articles
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextArticle();
        }
      },
      { rootMargin: "200px" } // Load before they fully reach the bottom
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextArticle]);

  // Observer for URL updating
  useEffect(() => {
    const articleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slug = entry.target.getAttribute("data-slug");
            if (slug && slug !== currentSlug) {
              setCurrentSlug(slug);
              window.history.replaceState(null, "", `/article/${slug}`);
              
              // Optional: You could update document title here too
            }
          }
        });
      },
      {
        // Trigger when an article takes up a majority of the viewport
        rootMargin: "-20% 0px -60% 0px"
      }
    );

    // Re-select all article containers and observe them
    const articleElements = document.querySelectorAll('.article-container');
    articleElements.forEach((el) => articleObserver.observe(el));

    return () => articleObserver.disconnect();
  }, [articles, currentSlug]);

  return (
    <div className="flex flex-col gap-24 mt-24">
      {articles.map((article, idx) => (
        <div key={`${article.slug}-${idx}`} className="relative">
          {/* Visual Divider / Up Next Toast */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
            Up Next
          </div>
          <div className="border-t-4 border-[#E31E24] pt-12 mb-12 max-w-[200px] mx-auto"></div>
          
          <ArticleContent article={article} />
        </div>
      ))}
      
      {/* Loading Trigger */}
      <div ref={loaderRef} className="h-32 flex items-center justify-center py-12">
        {loading && <Loader2 className="animate-spin text-[#E31E24]" size={32} />}
      </div>
    </div>
  );
}
