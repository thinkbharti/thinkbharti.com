import ArticleCard from "@/components/ui/ArticleCard";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import PublicLayout from "@/components/layout/PublicLayout";
import { User } from "lucide-react";

export default async function AuthorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch author details
  const { data: author } = await supabase
    .from('authors')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!author) {
    notFound();
  }

  // Fetch published articles by this author
  const { data: articles } = await supabase
    .from('posts')
    .select(`
      *,
      author:author_id (name, avatar_url),
      category:category_id (name, slug)
    `)
    .eq('author_id', author.id)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 md:px-8">
          
          {/* Author Header Card */}
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm max-w-4xl mx-auto mb-12 flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-100 shadow-md bg-gray-50 flex items-center justify-center shrink-0">
              {author.avatar_url ? (
                <img 
                  src={author.avatar_url} 
                  alt={author.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={48} className="text-gray-300" />
              )}
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <span className="text-xs font-bold text-[#E31E24] uppercase tracking-wider mb-1 block">
                {author.designation || 'Author & Contributor'}
              </span>
              <h1 className="text-3xl font-extrabold text-[#101820] mb-3">
                {author.name}
              </h1>
              {author.bio && (
                <p className="text-gray-600 text-base leading-relaxed max-w-2xl">
                  {author.bio}
                </p>
              )}
            </div>
          </div>

          {/* Author Articles */}
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-[#101820]">
                Articles by {author.name}
              </h2>
              <span className="text-sm font-medium text-gray-500">
                {articles?.length || 0} {articles?.length === 1 ? 'Article' : 'Articles'}
              </span>
            </div>

            {articles && articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <ArticleCard 
                    key={article.id}
                    title={article.title}
                    excerpt={article.excerpt || ""}
                    category={article.category?.name || "News"}
                    readTime="5 min"
                    imageUrl={article.featured_image_url || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"}
                    href={`/article/${article.slug}`}
                    author={author.name}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border border-gray-200 rounded-2xl bg-white shadow-sm">
                <p className="text-gray-500 font-medium">No published articles yet by this author.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
