import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function FeaturedCategories() {
  const supabase = await createClient();
  
  // Fetch categories, ordering by those with images first, then alphabetically
  const { data: categories } = await supabase
    .from('categories')
    .select('name, slug, image_url')
    .order('name', { ascending: true });

  if (!categories || categories.length === 0) {
    return null; // Don't show the section if no categories exist
  }

  // Define a set of fallback gradients for categories without images
  const fallbackGradients = [
    "bg-gradient-to-br from-purple-500 to-indigo-600",
    "bg-gradient-to-br from-emerald-400 to-cyan-500",
    "bg-gradient-to-br from-orange-400 to-rose-500",
    "bg-gradient-to-br from-blue-500 to-blue-700",
    "bg-gradient-to-br from-pink-500 to-rose-500",
    "bg-gradient-to-br from-teal-400 to-emerald-600",
  ];

  return (
    <section className="mt-16 mb-8">
      <h2 className="text-2xl font-bold text-[#101820] mb-6 border-b-2 border-[#101820] pb-2 inline-block">
        Featured Categories
      </h2>
      
      <div className="flex overflow-x-auto pb-4 gap-4 snap-x hide-scrollbar">
        {categories.map((cat, idx) => {
          const hasImage = !!cat.image_url;
          const fallbackClass = fallbackGradients[idx % fallbackGradients.length];

          return (
            <Link 
              key={cat.slug} 
              href={`/category/${cat.slug}`}
              className="relative shrink-0 w-32 md:w-40 h-32 md:h-40 rounded-xl overflow-hidden group snap-start shadow-sm"
            >
              <div className={`absolute inset-0 ${hasImage ? 'bg-gray-200' : fallbackClass}`}>
                {hasImage && (
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url("${cat.image_url}")` }}
                  ></div>
                )}
              </div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
              <div className="absolute inset-0 flex items-end justify-center pb-4">
                <span className="text-white font-bold text-sm md:text-base tracking-wide drop-shadow-md px-2 text-center">
                  {cat.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
