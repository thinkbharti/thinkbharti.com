"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Edit2, Trash2, Image as ImageIcon, Loader2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { compressAndConvertToWebP } from "@/lib/image-utils";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
};

export default function CategoryManager() {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-generate slug
  useEffect(() => {
    if (!slug && name && !editingId) {
      setSlug(name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
    }
  }, [name, slug, editingId]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEditClick = (cat: Category) => {
    setEditingId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || "");
    setImageUrl(cat.image_url || "");
    setError(null);
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setSlug("");
    setDescription("");
    setImageUrl("");
    setError(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingImage(true);
      setError(null);
      
      if (!e.target.files || e.target.files.length === 0) return;

      const file = e.target.files[0];
      const processedFile = await compressAndConvertToWebP(file, 800, 800, 0.9); // Categories don't need massive images
      
      const fileName = `categories/${uuidv4()}.webp`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, processedFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName);
      setImageUrl(publicUrl);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setError(null);

      if (!name || !slug) {
        throw new Error("Name and Slug are required");
      }

      const catData = { name, slug, description, image_url: imageUrl };

      if (editingId) {
        const { error } = await supabase.from('categories').update(catData).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('categories').insert([catData]);
        if (error) throw error;
      }

      resetForm();
      fetchCategories();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    
    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) throw error;
      if (editingId === id) resetForm();
      fetchCategories();
    } catch (error: any) {
      alert("Failed to delete. It might be in use by existing articles.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Category List */}
      <div className="lg:w-2/3">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold bg-gray-50">
                <th className="p-4">Name</th>
                <th className="p-4">Slug</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center"><Loader2 className="animate-spin mx-auto text-gray-400" /></td>
                </tr>
              ) : categories.length > 0 ? (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {cat.image_url && (
                          <img src={cat.image_url} alt="" className="w-8 h-8 rounded object-cover shrink-0" />
                        )}
                        <div>
                          <div className="font-bold text-gray-900">{cat.name}</div>
                          <div className="text-xs text-gray-500 mt-1 line-clamp-1">{cat.description || 'No description'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-500">{cat.slug}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEditClick(cat)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded hover:bg-blue-50">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(cat.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded hover:bg-red-50">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-500">No categories found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Form */}
      <div className="lg:w-1/3">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-5">
            <h3 className="text-lg font-bold text-gray-800">
              {editingId ? "Edit Category" : "Add New Category"}
            </h3>
            {editingId && (
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-700">
                <X size={20} />
              </button>
            )}
          </div>
          
          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100">{error}</div>}

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Technology" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24]"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Slug *</label>
              <input 
                type="text" 
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="technology" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] resize-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category Image</label>
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
              
              {imageUrl ? (
                <div className="relative group rounded-md overflow-hidden h-32 border border-gray-200 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <img src={imageUrl} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm font-medium">Change Image</span>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-gray-300 rounded-md p-4 flex items-center gap-3 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <div className="w-10 h-10 bg-white rounded flex items-center justify-center text-gray-400 border border-gray-200">
                    {uploadingImage ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={20} />}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700 block">{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                    <span className="text-xs text-gray-500">For featured category layout</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button 
                type="submit" 
                disabled={isSaving}
                className="w-full bg-[#E31E24] text-white px-4 py-2 rounded-md font-medium text-sm flex items-center justify-center gap-2 hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : (editingId ? <Edit2 size={16} /> : <Plus size={16} />)}
                {editingId ? "Update Category" : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
