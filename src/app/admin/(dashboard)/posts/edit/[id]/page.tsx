"use client";

import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon, Loader2 } from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { compressAndConvertToWebP } from "@/lib/image-utils";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const [categoryId, setCategoryId] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  
  // Image State
  const [imageUrl, setImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  // Data State
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [authors, setAuthors] = useState<{ id: string; name: string }[]>([]);
  
  // Loading State
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initial Fetch
  useEffect(() => {
    async function fetchData() {
      try {
        const [catsRes, authsRes, postRes] = await Promise.all([
          supabase.from('categories').select('id, name').order('name'),
          supabase.from('authors').select('id, name').order('name'),
          supabase.from('posts').select('*').eq('id', postId).single()
        ]);
        
        if (catsRes.data) setCategories(catsRes.data);
        if (authsRes.data) setAuthors(authsRes.data);
        
        if (postRes.data) {
          const post = postRes.data;
          setTitle(post.title || "");
          setExcerpt(post.excerpt || "");
          setContent(post.content || "");
          setStatus(post.status || "draft");
          setCategoryId(post.category_id || "");
          setAuthorId(post.author_id || "");
          setSeoTitle(post.seo_title || "");
          setSlug(post.slug || "");
          setImageUrl(post.featured_image_url || "");
          setIsFeatured(post.is_featured || false);
        } else if (postRes.error) {
          throw postRes.error;
        }
      } catch (err: any) {
        console.error("Error fetching post data:", err);
        setError("Failed to load article data.");
      } finally {
        setIsLoading(false);
      }
    }
    
    if (postId) {
      fetchData();
    }
  }, [postId]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingImage(true);
      setError(null);
      
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = e.target.files[0];
      
      // Compress and convert to WebP
      const processedFile = await compressAndConvertToWebP(file);
      
      const fileExt = 'webp';
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('images')
        .upload(filePath, processedFile);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (publishedStatus: string) => {
    try {
      setIsSaving(true);
      setError(null);

      if (!title || !slug || !categoryId || !authorId) {
        throw new Error("Please fill in all required fields (Title, Slug, Category, Author)");
      }

      const postData = {
        title,
        slug,
        excerpt,
        content,
        status: publishedStatus,
        category_id: categoryId,
        author_id: authorId,
        seo_title: seoTitle || title,
        featured_image_url: imageUrl,
        is_featured: isFeatured,
        published_at: publishedStatus === 'published' ? new Date().toISOString() : null,
      };

      const { error: updateError } = await supabase
        .from('posts')
        .update(postData)
        .eq('id', postId);

      if (updateError) {
        throw updateError;
      }

      // Redirect to posts list after successful save
      router.push('/admin/posts');
      router.refresh();
      
    } catch (error: any) {
      setError(error.message);
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 size={32} className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/posts" className="p-2 bg-white border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">Edit Article</h2>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleSave("draft")}
            disabled={isSaving}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {isSaving && status === 'draft' ? "Saving..." : "Save as Draft"}
          </button>
          <button 
            onClick={() => handleSave("published")}
            disabled={isSaving}
            className="bg-[#E31E24] text-white px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 hover:bg-red-700 transition-colors shadow-sm shadow-red-200 disabled:opacity-50"
          >
            {isSaving && status !== 'draft' ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Publish
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-md">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Editor Area */}
        <div className="lg:w-2/3 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Title *</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter article title here..." 
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent text-lg font-medium"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Excerpt</label>
              <textarea 
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary of the article (appears in article cards and SEO)..." 
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent text-sm resize-none"
              />
            </div>
            
            <div className="flex-1 flex flex-col h-full">
              <label className="block text-sm font-bold text-gray-700 mb-1">Content</label>
              <div className="min-h-[400px]">
                <RichTextEditor content={content} onChange={setContent} />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4 uppercase tracking-wider">Publishing</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Author *</label>
                <select 
                  value={authorId}
                  onChange={(e) => setAuthorId(e.target.value)}
                  className="w-full border border-gray-300 rounded-md text-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#E31E24]"
                >
                  <option value="">Select an author</option>
                  {authors.map((author) => (
                    <option key={author.id} value={author.id}>{author.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Category *</label>
                <select 
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full border border-gray-300 rounded-md text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E31E24] bg-white"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                    />
                    <div className={`block w-10 h-6 rounded-full transition-colors ${isFeatured ? 'bg-[#E31E24]' : 'bg-gray-300'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isFeatured ? 'translate-x-4' : ''}`}></div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">Feature this post</div>
                    <div className="text-xs text-gray-500">Show on homepage hero section</div>
                  </div>
                </label>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4 uppercase tracking-wider">Featured Image</h3>
            
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />

            {imageUrl ? (
              <div className="relative group cursor-pointer h-40 w-full rounded-lg overflow-hidden border border-gray-200" onClick={() => fileInputRef.current?.click()}>
                <img src={imageUrl} alt="Featured" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-sm font-medium">Change Image</span>
                </div>
              </div>
            ) : (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors group h-40"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:text-[#E31E24] group-hover:bg-red-50 transition-colors mb-3">
                  {uploadingImage ? <Loader2 size={24} className="animate-spin text-[#E31E24]" /> : <ImageIcon size={24} />}
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {uploadingImage ? "Uploading..." : "Click to upload image"}
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
              </div>
            )}
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4 uppercase tracking-wider">SEO Metadata</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">SEO Title</label>
                <input 
                  type="text" 
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Optional custom title for search engines" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Slug *</label>
                <input 
                  type="text" 
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="custom-url-slug" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
