import { FileText, FolderTree, Users, CheckCircle, Clock, Plus } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch real counts concurrently
  const [
    { count: totalPostsCount },
    { count: publishedPostsCount },
    { count: draftPostsCount },
    { count: categoriesCount },
    { count: authorsCount },
    { data: recentPosts }
  ] = await Promise.all([
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("authors").select("*", { count: "exact", head: true }),
    supabase.from("posts")
      .select(`
        id,
        title,
        status,
        published_at,
        created_at,
        category:category_id (name)
      `)
      .order("created_at", { ascending: false })
      .limit(6)
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header with Action Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          <p className="text-sm text-gray-500 mt-0.5">Real-time metrics and publishing control center.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 bg-[#E31E24] hover:bg-red-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm shadow-red-900/20"
          >
            <Plus size={16} />
            <span>New Article</span>
          </Link>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Total Articles</p>
              <h3 className="text-3xl font-extrabold text-gray-900">{totalPostsCount || 0}</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <FileText size={22} />
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-4 flex items-center gap-2">
            <span className="font-semibold text-emerald-600 flex items-center">
              <CheckCircle size={13} className="mr-1" /> {publishedPostsCount || 0} Published
            </span>
            <span>•</span>
            <span className="text-amber-600">{draftPostsCount || 0} Drafts</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Published</p>
              <h3 className="text-3xl font-extrabold text-emerald-600">{publishedPostsCount || 0}</h3>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle size={22} />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">Live on website</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Categories</p>
              <h3 className="text-3xl font-extrabold text-gray-900">{categoriesCount || 0}</h3>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <FolderTree size={22} />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">Active topic sections</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Authors</p>
              <h3 className="text-3xl font-extrabold text-gray-900">{authorsCount || 0}</h3>
            </div>
            <div className="p-3 bg-red-50 text-[#E31E24] rounded-xl">
              <Users size={22} />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">Active journalists & editors</p>
        </div>
      </div>

      {/* Recent Articles Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Recent Articles</h3>
          <Link href="/admin/posts" className="text-xs font-bold text-[#E31E24] hover:underline uppercase tracking-wider">
            View all articles →
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {recentPosts && recentPosts.length > 0 ? (
                recentPosts.map((post: any) => (
                  <tr key={post.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="p-4 font-semibold text-gray-900 max-w-md truncate">
                      {post.title}
                    </td>
                    <td className="p-4 text-gray-500 text-xs font-medium">
                      {post.category?.name || "General"}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-full ${
                        post.status === "published" 
                          ? "bg-emerald-50 text-emerald-700" 
                          : "bg-amber-50 text-amber-700"
                      }`}>
                        {post.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400 text-xs">
                      {post.created_at ? format(new Date(post.created_at), "MMM dd, yyyy") : "N/A"}
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/admin/posts/edit/${post.id}`}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400 text-sm">
                    No articles created yet. Click &ldquo;New Article&rdquo; to publish your first story.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
