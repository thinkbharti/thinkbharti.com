import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleContent from "@/components/article/ArticleContent";
import ReadingProgressBar from "@/components/article/ReadingProgressBar";
import FloatingShare from "@/components/article/FloatingShare";
import InfiniteArticleFeed from "@/components/article/InfiniteArticleFeed";
import { createClient } from "@/lib/supabase/server";
import { calculateReadTime } from "@/lib/reading-time";
import PublicLayout from "@/components/layout/PublicLayout";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select(`
      title,
      seo_title,
      excerpt,
      seo_description,
      featured_image_url,
      published_at,
      authors (name)
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) {
    return {
      title: "Article Not Found | ThinkBharti",
    };
  }

  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt || "Read the latest stories on ThinkBharti.";
  const imageUrl = post.featured_image_url || "https://thinkbharti-com.vercel.app/logo.webp";
  const authorName = (post.authors as any)?.name || "ThinkBharti Editorial";

  return {
    title: `${title} | ThinkBharti`,
    description,
    authors: [{ name: authorName }],
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://thinkbharti-com.vercel.app/article/${slug}`,
      publishedTime: post.published_at || undefined,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

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
  const authorName = (post.authors as any)?.name || "ThinkBharti Editorial";
  const categoryName = (post.categories as any)?.name || "Uncategorized";
  const readTime = calculateReadTime(post.content);

  const articleData = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || "",
    content: post.content || "",
    category: categoryName,
    categoryColor: "#E31E24",
    author: authorName,
    date: post.published_at 
      ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : "Recently",
    readTime,
    imageUrl: post.featured_image_url || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
  };

  // Google News / Schema.org JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "description": post.excerpt,
    "image": [articleData.imageUrl],
    "datePublished": post.published_at,
    "author": [{
      "@type": "Person",
      "name": authorName
    }],
    "publisher": {
      "@type": "Organization",
      "name": "ThinkBharti",
      "logo": {
        "@type": "ImageObject",
        "url": "https://thinkbharti-com.vercel.app/logo.webp"
      }
    }
  };

  return (
    <PublicLayout>
      {/* JSON-LD Structured Data for Google Search & Google News */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
    </PublicLayout>
  );
}
