import Link from "next/link";
import { 
  LayoutDashboard, 
  FileText, 
  FolderTree, 
  Users, 
  Settings, 
  LogOut 
} from "lucide-react";
import { signOut } from "@/app/admin/actions";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#101820] text-gray-300 min-h-screen flex flex-col border-r border-gray-800 shrink-0">
      <div className="p-6 border-b border-gray-800">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-white block">
          Think<span className="text-[#E31E24]">Bharti</span>
          <span className="block text-[10px] text-gray-500 uppercase tracking-widest mt-1">Admin Panel</span>
        </Link>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1">
        <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 hover:text-white transition-colors">
          <LayoutDashboard size={18} />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>
        
        <Link href="/admin/posts" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 hover:text-white transition-colors">
          <FileText size={18} />
          <span className="text-sm font-medium">Articles</span>
        </Link>

        <Link href="/admin/categories" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 hover:text-white transition-colors">
          <FolderTree size={18} />
          <span className="text-sm font-medium">Categories</span>
        </Link>

        <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 hover:text-white transition-colors">
          <Users size={18} />
          <span className="text-sm font-medium">Users & Authors</span>
        </Link>

        <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 hover:text-white transition-colors">
          <Settings size={18} />
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <form action={signOut}>
          <button type="submit" className="flex items-center gap-3 px-3 py-2 w-full rounded-md hover:bg-red-900/50 text-gray-400 hover:text-red-400 transition-colors text-sm font-medium">
            <LogOut size={18} />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
