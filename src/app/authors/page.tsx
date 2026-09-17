import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { User } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";

export const metadata = {
  title: "Authors - ThinkBharti",
  description: "Meet the voices behind ThinkBharti, The Voice of Modern India.",
};

export default async function AuthorsPage() {
  const supabase = await createClient();
  
  // Fetch authors, ordered alphabetically
  const { data: authors, error } = await supabase
    .from('authors')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error("Error fetching authors:", error);
  }

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Meet Our <span className="text-[#E31E24]">Authors</span>
            </h1>
            <p className="text-xl text-gray-600">
              The diverse voices and expert perspectives powering ThinkBharti.
            </p>
          </div>

          {/* Authors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {authors && authors.length > 0 ? (
              authors.map((author) => (
                <div 
                  key={author.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-red-100 transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="p-8 flex flex-col items-center flex-1 text-center">
                    
                    {/* Avatar */}
                    <div className="w-24 h-24 mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                      {author.avatar_url ? (
                        <img 
                          src={author.avatar_url} 
                          alt={author.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={40} className="text-gray-300" />
                      )}
                    </div>
                    
                    {/* Info */}
                    <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#E31E24] transition-colors">
                      {author.name}
                    </h2>
                    <p className="text-sm font-semibold text-[#E31E24] mb-4 uppercase tracking-wider">
                      {author.designation || 'Contributor'}
                    </p>
                    
                    {/* Bio */}
                    {author.bio ? (
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                        {author.bio.length > 120 ? `${author.bio.substring(0, 120)}...` : author.bio}
                      </p>
                    ) : (
                      <div className="flex-1"></div>
                    )}
                    
                    {/* Action Link */}
                    {/* Note: /author/[slug] route doesn't exist yet, but we prepare for it */}
                    <Link 
                      href={`/author/${author.slug}`}
                      className="inline-block mt-auto text-sm font-bold text-gray-900 border-b-2 border-gray-200 group-hover:border-[#E31E24] group-hover:text-[#E31E24] transition-colors pb-1"
                    >
                      View Articles
                    </Link>
                    
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-gray-500 bg-white rounded-xl border border-gray-200">
                <User size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-xl font-medium">No authors found yet.</p>
                <p className="text-gray-400 mt-2">Authors added in the admin panel will appear here.</p>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </PublicLayout>
  );
}
