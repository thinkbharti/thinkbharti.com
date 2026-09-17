import Link from "next/link";
import { Clock, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";

export default async function HeroSection() {
  const supabase = await createClient();

  // Fetch up to 4 latest featured, published articles
  const { data: featuredArticles } = await supabase
    .from('posts')
    .select(`
      *,
      author:author_id (name),
      category:category_id (name, slug)
    `)
    .eq('status', 'published')
    .eq('is_featured', true)
    .order('published_at', { ascending: false })
    .limit(4);

  // If no featured articles, we render an empty or fallback state
  if (!featuredArticles || featuredArticles.length === 0) {
    return (
      <section className="container mx-auto px-4 md:px-8 py-8">
        <div className="bg-gray-100 rounded-xl h-[500px] flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-300">
          <ImageIcon size={48} className="mb-4 text-gray-400" />
          <h2 className="text-xl font-bold text-gray-700">No Featured Articles Yet</h2>
          <p className="mt-2">Go to the admin panel and turn on "Feature this post" for your top stories.</p>
        </div>
      </section>
    );
  }

  const mainArticle = featuredArticles[0];
  const sideArticles = featuredArticles.slice(1);

  return (
    <section className="container mx-auto px-4 md:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Main Hero (approx 65%) */}
        <div className="lg:w-[65%] relative rounded-xl overflow-hidden group cursor-pointer h-[500px]">
          <div className="absolute inset-0 bg-gray-300">
            {mainArticle.featured_image_url && (
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                style={{ backgroundImage: `url("${mainArticle.featured_image_url}")` }}
              ></div>
            )}
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#101820] via-[#101820]/60 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8 w-full">
            {mainArticle.category && (
              <Link href={`/category/${mainArticle.category.slug}`} className="bg-[#E31E24] hover:bg-red-700 transition-colors text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded mb-4 inline-block relative z-10">
                {mainArticle.category.name}
              </Link>
            )}
            <Link href={`/article/${mainArticle.slug}`} className="block relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight group-hover:underline underline-offset-4 line-clamp-3">
                {mainArticle.title}
              </h2>
            </Link>

            <div className="flex items-center text-gray-300 text-sm font-medium">
              <span className="font-bold text-gray-200">{mainArticle.author?.name || 'Editorial Team'}</span>
              <span className="mx-2">•</span>
              <Clock size={16} className="mr-2" />
              <span>{mainArticle.published_at ? format(new Date(mainArticle.published_at), 'MMM dd, yyyy') : 'Recently'}</span>
            </div>
          </div>
          
          {/* Carousel Arrows (Visual only for now, could wire up if multiple main stories wanted) */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 backdrop-blur-sm z-10">
            <ChevronLeft size={24} />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 backdrop-blur-sm z-10">
            <ChevronRight size={24} />
          </button>
          
          {/* Full overlay link */}
          <Link href={`/article/${mainArticle.slug}`} className="absolute inset-0 z-0"></Link>
        </div>

        {/* Supporting Stories (approx 35%) */}
        {sideArticles.length > 0 && (
          <div className="lg:w-[35%] flex flex-col justify-between gap-6">
            {sideArticles.map((article, index) => (
              <Link key={article.id} href={`/article/${article.slug}`} className="flex gap-4 group flex-1">
                <div className="w-1/3 rounded-lg overflow-hidden shrink-0 relative bg-gray-200">
                  {article.featured_image_url && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105" 
                      style={{ backgroundImage: `url("${article.featured_image_url}")` }}
                    ></div>
                  )}
                </div>
                <div className="w-2/3 flex flex-col justify-center py-1">
                  {article.category && (
                    <span className="text-[#3B82F6] text-xs font-bold uppercase tracking-wider mb-2 line-clamp-1">
                      {article.category.name}
                    </span>
                  )}
                  <h3 className="text-base md:text-lg font-bold text-[#1F2933] group-hover:text-[#E31E24] transition-colors leading-snug mb-2 line-clamp-3">
                    {article.title}
                  </h3>
                  <div className="flex items-center text-gray-500 text-xs font-medium mt-auto">
                    <span className="font-semibold text-gray-700 truncate max-w-[100px]">
                      {article.author?.name || 'Editorial Team'}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{article.published_at ? format(new Date(article.published_at), 'MMM dd') : ''}</span>
                  </div>
                </div>
              </Link>
            ))}
            
            {/* If there are fewer than 3 side articles, fill empty space nicely */}
            {Array.from({ length: 3 - sideArticles.length }).map((_, i) => (
              <div key={`empty-${i}`} className="flex gap-4 flex-1 opacity-40 grayscale">
                <div className="w-1/3 rounded-lg bg-gray-100 shrink-0"></div>
                <div className="w-2/3 flex flex-col justify-center gap-2">
                  <div className="w-16 h-3 bg-gray-200 rounded"></div>
                  <div className="w-full h-4 bg-gray-200 rounded"></div>
                  <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
