"use client";

import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { compressAndConvertToWebP } from "@/lib/image-utils";

export default function EditAuthorPage() {
  const router = useRouter();
  const params = useParams();
  const authorId = params.id as string;
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [designation, setDesignation] = useState("");
  const [bio, setBio] = useState("");
  
  // Image State
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Loading State
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initial Fetch
  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error: fetchError } = await supabase
          .from('authors')
          .select('*')
          .eq('id', authorId)
          .single();
        
        if (fetchError) throw fetchError;
        
        if (data) {
          setName(data.name || "");
          setSlug(data.slug || "");
          setDesignation(data.designation || "");
          setBio(data.bio || "");
          setAvatarUrl(data.avatar_url || "");
        }
      } catch (err: any) {
        console.error("Error fetching author data:", err);
        setError("Failed to load author data.");
      } finally {
        setIsLoading(false);
      }
    }
    
    if (authorId) {
      fetchData();
    }
  }, [authorId]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingImage(true);
      setError(null);
      
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = e.target.files[0];
      
      // Compress and convert to WebP
      const processedFile = await compressAndConvertToWebP(file, 400, 400, 0.9);
      
      const fileExt = 'webp';
      const fileName = `avatars/${uuidv4()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, processedFile);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      setAvatarUrl(publicUrl);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);

      if (!name || !slug) {
        throw new Error("Please fill in all required fields (Name, Slug)");
      }

      const authorData = {
        name,
        slug,
        designation,
        bio,
        avatar_url: avatarUrl,
      };

      const { error: updateError } = await supabase
        .from('authors')
        .update(authorData)
        .eq('id', authorId);

      if (updateError) {
        throw updateError;
      }

      // Redirect to authors list after successful save
      router.push('/admin/users');
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
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/users" className="p-2 bg-white border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">Edit Author</h2>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#E31E24] text-white px-6 py-2 rounded-md font-medium text-sm flex items-center gap-2 hover:bg-red-700 transition-colors shadow-sm shadow-red-200 disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save Changes
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-md">
          {error}
        </div>
      )}

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-6">
        
        {/* Avatar Upload */}
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 border-b border-gray-100 pb-8">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
          
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden relative group shrink-0"
          >
            {avatarUrl ? (
              <>
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-medium">Change</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-[#E31E24] transition-colors">
                {uploadingImage ? <Loader2 size={24} className="animate-spin" /> : <ImageIcon size={28} />}
              </div>
            )}
          </div>
          
          <div className="flex-1 text-center sm:text-left pt-2">
            <h3 className="font-bold text-gray-800 mb-1">Profile Picture</h3>
            <p className="text-sm text-gray-500 mb-3">Upload a high quality headshot for the author. It will be compressed automatically.</p>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="text-sm text-[#E31E24] font-medium border border-[#E31E24] px-4 py-1.5 rounded-full hover:bg-red-50 transition-colors"
            >
              Upload Image
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Full Name *</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">URL Slug *</label>
            <input 
              type="text" 
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="john-doe" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Designation</label>
          <input 
            type="text" 
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            placeholder="e.g. Senior Tech Reporter" 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Biography</label>
          <textarea 
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="A short bio about the author..." 
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent text-sm resize-none"
          />
        </div>

      </div>
    </div>
  );
}
