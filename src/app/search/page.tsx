import PublicLayout from "@/components/layout/PublicLayout";
import ArticleCard from "@/components/ui/ArticleCard";
import { createClient } from "@/lib/supabase/server";
import { Search, User, FolderTree, AlertCircle } from "lucide-react";
import Link from "next/link";
import { calculateReadTime } from "@/lib/reading-time";

export const metadata = {
  title: "Search Results - ThinkBharti",
  description: "Search across stories, authors, and topics on ThinkBharti.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() || "";
  const supabase = await createClient();

  let articles: any[] = [];
  let authors: any[] = [];
  let categories: any[] = [];

  if (query) {
    // Search Posts
    const { data: postsData } = await supabase
      .from("posts")
      .select(`
        *,
        author:author_id (name, avatar_url),
        category:category_id (name, slug)
      `)
      .eq("status", "published")
      .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
      .order("published_at", { ascending: false });

    articles = postsData || [];

    // Search Authors
    const { data: authorsData } = await supabase
      .from("authors")
      .select("*")
      .or(`name.ilike.%${query}%,bio.ilike.%${query}%`);

    authors = authorsData || [];

    // Search Categories
    const { data: categoriesData } = await supabase
      .from("categories")
      .select("*")
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`);

    categories = categoriesData || [];
  }

  const totalResults = articles.length + authors.length + categories.length;

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 md:px-8 py-12 min-h-[70vh]">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-gray-100">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E31E24] bg-red-50 px-3 py-1 rounded-full mb-3">
            <Search size={14} />
            Search Results
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#101820] mb-2">
            {query ? (
              <>Results for &ldquo;<span className="text-[#E31E24]">{query}</span>&rdquo;</>
            ) : (
              "Search ThinkBharti"
            )}
          </h1>
          <p className="text-gray-500 text-sm">
            {query ? `Found ${totalResults} matching ${totalResults === 1 ? 'result' : 'results'}` : "Type a keyword in the search bar above to find articles and topics."}
          </p>
        </div>

        {/* Results */}
        {query ? (
          totalResults > 0 ? (
            <div className="space-y-12">
              {/* Categories Matches */}
              {categories.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FolderTree size={18} className="text-[#E31E24]" />
                    Matching Topics ({categories.length})
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/category/${cat.slug}`}
                        className="bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-800 hover:text-[#E31E24] transition-all"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Authors Matches */}
              {authors.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <User size={18} className="text-[#E31E24]" />
                    Matching Authors ({authors.length})
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {authors.map((author) => (
                      <Link
                        key={author.id}
                        href={`/author/${author.slug}`}
                        className="bg-white border border-gray-100 hover:border-red-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
                      >
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                          {author.avatar_url ? (
                            <img src={author.avatar_url} alt={author.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">
                              {author.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 group-hover:text-[#E31E24] transition-colors">{author.name}</div>
                          <div className="text-xs text-gray-500">{author.designation || "Contributor"}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles Matches */}
              {articles.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-6">
                    Articles ({articles.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                      <ArticleCard
                        key={article.id}
                        id={article.id}
                        title={article.title}
                        excerpt={article.excerpt || ""}
                        category={article.category?.name || "General"}
                        author={article.author?.name || "ThinkBharti Editorial"}
                        readTime={calculateReadTime(article.content)}
                        imageUrl={article.featured_image_url || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"}
                        href={`/article/${article.slug}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-24 text-center max-w-md mx-auto bg-gray-50 rounded-3xl border border-gray-200 p-8">
              <AlertCircle size={36} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500 text-sm mb-6">
                We couldn&apos;t find any articles matching &ldquo;{query}&rdquo;. Try searching with a different keyword.
              </p>
              <Link
                href="/latest"
                className="inline-flex items-center bg-[#E31E24] hover:bg-red-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-red-900/20"
              >
                Browse Latest Stories
              </Link>
            </div>
          )
        ) : (
          <div className="py-20 text-center text-gray-400">
            Please enter a search term above.
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
