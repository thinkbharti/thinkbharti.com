import TopBar from "./TopBar";
import BrandHeader from "./BrandHeader";
import Navigation from "./Navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Header() {
  const supabase = await createClient();
  
  // Fetch categories for the navigation menu
  const { data: categories } = await supabase
    .from('categories')
    .select('name, slug')
    .order('name', { ascending: true });

  return (
    <header className="w-full flex flex-col">
      <TopBar />
      <BrandHeader />
      <Navigation categories={categories || []} />
    </header>
  );
}
