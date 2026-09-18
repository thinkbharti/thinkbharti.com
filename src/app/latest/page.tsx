import ArticleCard from "@/components/ui/ArticleCard";
import { createClient } from "@/lib/supabase/server";
import PublicLayout from "@/components/layout/PublicLayout";

export const metadata = {
  title: "Latest Stories - ThinkBharti",
  description: "Stay up to date with the latest stories, news, and perspectives from ThinkBharti.",
};

export default async function LatestPage() {
  const supabase = await createClient();

  const { data: articles } = await supabase
    .from('posts')
    .select(`
      *,
      author:author_id (name, avatar_url),
      category:category_id (name, slug)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 md:px-8 py-12 min-h-screen">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-[#101820] mb-3">Latest Stories</h1>
          <div className="w-16 h-1 bg-[#E31E24] mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl">
            Real-time coverage and in-depth articles on India's growth, technology, policy, and culture.
          </p>
        </div>

        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard 
                key={article.id}
                title={article.title}
                excerpt={article.excerpt || ""}
                category={article.category?.name || "General"}
                readTime="5 min"
                imageUrl={article.featured_image_url || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"}
                href={`/article/${article.slug}`}
                author={article.author?.name || "ThinkBharti Editorial"}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-gray-200 rounded-2xl bg-gray-50">
            <h3 className="text-xl font-bold text-gray-800 mb-2">No articles available</h3>
            <p className="text-gray-500">Check back soon for new stories.</p>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
