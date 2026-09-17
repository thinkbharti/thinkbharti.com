import CategoryManager from "@/components/admin/CategoryManager";

export const metadata = {
  title: "Categories - ThinkBharti Admin",
};

export default function AdminCategoriesPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
      </div>

      <CategoryManager />
    </div>
  );
}
