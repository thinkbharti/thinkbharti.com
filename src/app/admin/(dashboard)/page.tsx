import { FileText, Eye, FolderTree, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Articles</p>
              <h3 className="text-3xl font-bold text-gray-900">124</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <FileText size={24} />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-4 flex items-center font-medium">
            <TrendingUp size={14} className="mr-1" /> +12 this month
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Views</p>
              <h3 className="text-3xl font-bold text-gray-900">45.2K</h3>
            </div>
            <div className="p-3 bg-red-50 text-red-600 rounded-lg">
              <Eye size={24} />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-4 flex items-center font-medium">
            <TrendingUp size={14} className="mr-1" /> +18% this month
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Categories</p>
              <h3 className="text-3xl font-bold text-gray-900">8</h3>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
              <FolderTree size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 font-medium">
            Active categories
          </p>
        </div>
      </div>

      {/* Recent Articles */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Recent Articles</h2>
          <Link href="/admin/posts" className="text-sm font-medium text-[#E31E24] hover:underline">
            View all
          </Link>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">
                    Example Article Title {i}
                  </td>
                  <td className="p-4 text-gray-500">Technology</td>
                  <td className="p-4">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Published
                    </span>
                  </td>
                  <td className="p-4 text-gray-500">Aug 28, 2025</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
