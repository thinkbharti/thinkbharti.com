import ArticleCard from "@/components/ui/ArticleCard";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { format } from "date-fns";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  
  // Fetch category info
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();
    
  if (!category) {
    notFound();
  }

  // Fetch published articles in this category
  const { data: articles } = await supabase
    .from('posts')
    .select(`
      *,
      author:author_id (name, avatar_url),
      category:category_id (name, slug)
    `)
    .eq('category_id', category.id)
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  
  return (
    <div className="container mx-auto px-4 md:px-8 py-12 min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-[#101820] mb-4">{category.name}</h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          {category.description || `Explore the latest news, insights, and stories in ${category.name}. Stay updated with ThinkBharti's comprehensive coverage.`}
        </p>
      </div>

      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard 
              key={article.id}
              title={article.title}
              excerpt={article.excerpt || ""}
              category={category.name}
              date={article.published_at ? format(new Date(article.published_at), 'MMM dd, yyyy') : ""}
              readTime="4 min"
              imageUrl={article.featured_image_url || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"}
              href={`/article/${article.slug}`}
              authorName={article.author?.name}
            />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center border border-gray-200 rounded-2xl bg-gray-50">
          <h3 className="text-xl font-bold text-gray-800 mb-2">No articles found</h3>
          <p className="text-gray-500">There are currently no published articles in this category.</p>
        </div>
      )}
    </div>
  );
}
