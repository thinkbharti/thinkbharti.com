import Link from "next/link";
import ArticleCard from "../ui/ArticleCard";
import { ArrowRight, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function LatestStories() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      featured_image_url,
      published_at,
      categories (name),
      authors (name)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(3);

  // Fallback to empty array if data fetching fails
  const latestStories = posts || [];

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-[#101820] mb-2">Latest Stories</h2>
            <div className="w-16 h-1 bg-[#E31E24]"></div>
          </div>
          <Link href="/latest" className="hidden md:flex items-center text-sm font-bold text-[#E31E24] hover:text-red-700 transition-colors uppercase tracking-wider group">
            View All <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestStories.map((story) => (
            <ArticleCard 
              key={story.id}
              title={story.title}
              excerpt={story.excerpt || ""}
              category={story.categories?.name || "Uncategorized"}
              author={story.authors?.name || "ThinkBharti Editorial"}
              readTime="5 min" // Since we don't calculate this dynamically yet
              imageUrl={story.featured_image_url || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"}
              href={`/article/${story.slug}`}
            />
          ))}
          {latestStories.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              No published stories found.
            </div>
          )}
        </div>

        <Link href="/latest" className="md:hidden mt-8 flex justify-center items-center text-sm font-bold text-[#E31E24] hover:text-red-700 transition-colors uppercase tracking-wider">
          View All Stories <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </section>
  );
}
