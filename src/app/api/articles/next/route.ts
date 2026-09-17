import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const currentSlug = searchParams.get('currentSlug');

  const supabase = await createClient();

  // Fetch all published posts except the current one
  let query = supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      content,
      featured_image_url,
      published_at,
      categories (name),
      authors (name)
    `)
    .eq('status', 'published');

  if (currentSlug) {
    query = query.neq('slug', currentSlug);
  }

  const { data: posts, error } = await query;

  if (error || !posts || posts.length === 0) {
    return NextResponse.json({ error: 'No articles found' }, { status: 404 });
  }
  
  // Pick a random article from the remaining ones
  const randomPost = posts[Math.floor(Math.random() * posts.length)];

  const nextArticle = {
    title: randomPost.title,
    slug: randomPost.slug,
    content: randomPost.content || "",
    category: randomPost.categories?.name || "Uncategorized",
    categoryColor: "#E31E24", 
    author: randomPost.authors?.name || "ThinkBharti Editorial",
    date: randomPost.published_at 
      ? new Date(randomPost.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : "Unknown date",
    readTime: "5 min", 
    imageUrl: randomPost.featured_image_url || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
  };

  return NextResponse.json(nextArticle);
}
