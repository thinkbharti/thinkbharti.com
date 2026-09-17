import { notFound } from "next/navigation";
import ArticleContent from "@/components/article/ArticleContent";
import ReadingProgressBar from "@/components/article/ReadingProgressBar";
import FloatingShare from "@/components/article/FloatingShare";
import InfiniteArticleFeed from "@/components/article/InfiniteArticleFeed";
import { createClient } from "@/lib/supabase/server";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      content,
      featured_image_url,
      published_at,
      categories (name),
      authors (name)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!post) {
    notFound();
  }

  // Format data for the component
  const articleData = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || "",
    content: post.content || "",
    category: post.categories?.name || "Uncategorized",
    categoryColor: "#E31E24", // Default theme color
    author: post.authors?.name || "ThinkBharti Editorial",
    date: post.published_at 
      ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : "Unknown date",
    readTime: "5 min", // Mocked for now
    imageUrl: post.featured_image_url || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
  };

  return (
    <>
      <ReadingProgressBar />
      
      <main className="min-h-screen bg-gray-50 pb-20 relative">
        <FloatingShare />
        
        {/* The Initial Article */}
        <div id={`article-${articleData.slug}`} data-slug={articleData.slug} data-title={articleData.title} className="article-container pt-8 md:pt-12">
          <ArticleContent article={articleData} />
        </div>

        {/* The Infinite Feed */}
        <InfiniteArticleFeed initialSlug={articleData.slug} />
      </main>
    </>
  );
}
