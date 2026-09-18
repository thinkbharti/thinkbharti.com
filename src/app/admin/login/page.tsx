import Link from "next/link";
import { Lock } from "lucide-react";
import { login } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLogin({ searchParams }: { searchParams?: Promise<{ error?: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/admin');
  }

  const params = await searchParams;
  const error = params?.error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-red-50 text-[#E31E24] rounded-full flex items-center justify-center mb-4">
            <Lock size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Access</h1>
          <p className="text-sm text-gray-500 text-center">
            Sign in to manage the ThinkBharti platform.
          </p>
        </div>

        {error && (
          <div className="p-3 mb-5 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form action={login} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
            <input 
              name="email"
              type="email" 
              placeholder="admin@thinkbharti.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent text-sm"
              required
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-bold text-gray-700">Password</label>
            </div>
            <input 
              name="password"
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent text-sm"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-[#101820] text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors shadow-md shadow-gray-900/10 mt-2 text-sm"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <Link href="/" className="hover:text-[#E31E24] transition-colors flex items-center justify-center gap-1">
            ← Back to main website
          </Link>
        </div>
      </div>
    </div>
  );
}
