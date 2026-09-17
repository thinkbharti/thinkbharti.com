import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import AuthorActions from "@/components/admin/AuthorActions";

export default async function AdminAuthorsPage() {
  const supabase = await createClient();
  
  // Fetch authors
  const { data: authors, error } = await supabase
    .from('authors')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching authors:', error);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Users & Authors</h2>
        <Link 
          href="/admin/users/new" 
          className="bg-[#E31E24] text-white px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 hover:bg-red-700 transition-colors"
        >
          <Plus size={16} />
          New Author
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search authors..." 
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
            />
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold bg-white">
              <th className="p-4">Author</th>
              <th className="p-4">Designation</th>
              <th className="p-4">Bio</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {authors && authors.length > 0 ? (
              authors.map((author) => (
                <tr key={author.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {author.avatar_url ? (
                        <img src={author.avatar_url} alt={author.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
                          {author.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{author.name}</div>
                        <div className="text-xs text-gray-500">/{author.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-700 font-medium">{author.designation || '-'}</td>
                  <td className="p-4 text-gray-500 max-w-xs truncate">{author.bio || '-'}</td>
                  <td className="p-4 text-right">
                    <AuthorActions authorId={author.id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  No authors found. Create your first author to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
          <div>Showing {authors ? authors.length : 0} authors</div>
        </div>
      </div>
    </div>
  );
}
