"use client";

import Link from "next/link";
import { Edit2, Trash2, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthorActions({ authorId }: { authorId: string }) {
  const router = useRouter();
  const supabase = createClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this author? This action cannot be undone.")) {
      return;
    }

    try {
      setIsDeleting(true);
      const { error } = await supabase.from('authors').delete().eq('id', authorId);
      if (error) throw error;
      
      // Refresh the page data
      router.refresh();
    } catch (error) {
      console.error("Error deleting author:", error);
      alert("Failed to delete author. Check console for details.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Link 
        href={`/admin/users/edit/${authorId}`} 
        className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded hover:bg-blue-50"
      >
        <Edit2 size={16} />
      </Link>
      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded hover:bg-red-50 disabled:opacity-50"
      >
        {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
      </button>
    </div>
  );
}
