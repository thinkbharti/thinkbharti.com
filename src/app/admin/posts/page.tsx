import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import PostActions from "@/components/admin/PostActions";

export default async function AdminPostsPage() {
  const supabase = await createClient();
  
  // Fetch posts with their authors and categories
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      status,
      published_at,
      categories (name),
      authors (name)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Articles</h2>
        <Link 
          href="/admin/posts/new" 
          className="bg-[#E31E24] text-white px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 hover:bg-red-700 transition-colors"
        >
          <Plus size={16} />
          New Article
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select className="border border-gray-300 rounded-md text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E31E24]">
              <option value="">All Categories</option>
              <option value="india">India</option>
              <option value="world">World</option>
            </select>
            <select className="border border-gray-300 rounded-md text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E31E24]">
              <option value="">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold bg-white">
              <th className="p-4 w-1/2">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Author</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-gray-900 mb-1">
                      {post.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      /article/{post.slug}
                    </div>
                  </td>
                  <td className="p-4 text-gray-500">{post.categories?.name || 'Uncategorized'}</td>
                  <td className="p-4 text-gray-500">{post.authors?.name || 'Unknown'}</td>
                  <td className="p-4">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500">
                    {post.published_at 
                      ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : 'Not published'}
                  </td>
                  <td className="p-4 text-right">
                    <PostActions postId={post.id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No articles found. Create your first article to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
          <div>Showing {posts ? posts.length : 0} articles</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
