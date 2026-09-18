import ArticleCard from "@/components/ui/ArticleCard";
import { createClient } from "@/lib/supabase/server";
import PublicLayout from "@/components/layout/PublicLayout";

export const metadata = {
  title: "Trending Stories - ThinkBharti",
  description: "Explore the most read and trending stories on ThinkBharti today.",
};

export default async function TrendingPage() {
  const supabase = await createClient();

  // Fetch featured and top stories
  const { data: articles } = await supabase
    .from('posts')
    .select(`
      *,
      author:author_id (name, avatar_url),
      category:category_id (name, slug)
    `)
    .eq('status', 'published')
    .order('is_featured', { ascending: false })
    .order('published_at', { ascending: false });

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 md:px-8 py-12 min-h-screen">
        <div className="mb-10">
          <div className="inline-block bg-[#FF5722] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            Trending Now
          </div>
          <h1 className="text-4xl font-extrabold text-[#101820] mb-3">Trending Stories</h1>
          <div className="w-16 h-1 bg-[#FF5722] mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl">
            Discover the most discussed, influential, and viral stories making headlines across the country.
          </p>
        </div>

        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard 
                key={article.id}
                title={article.title}
                excerpt={article.excerpt || ""}
                category={article.category?.name || "Trending"}
                categoryColor="#FF5722"
                readTime="4 min"
                imageUrl={article.featured_image_url || "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80"}
                href={`/article/${article.slug}`}
                author={article.author?.name || "ThinkBharti Editorial"}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-gray-200 rounded-2xl bg-gray-50">
            <h3 className="text-xl font-bold text-gray-800 mb-2">No trending articles found</h3>
            <p className="text-gray-500">Check back later for top stories.</p>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
