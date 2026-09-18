import { Save, Upload } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Site Settings</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your website configuration and global preferences.</p>
        </div>
        <button className="bg-[#E31E24] text-white px-6 py-2 rounded-md font-medium text-sm flex items-center gap-2 hover:bg-red-700 transition-colors shadow-sm shadow-red-200">
          <Save size={16} />
          Save Changes
        </button>
      </div>

      <div className="flex gap-8">
        {/* Settings Navigation */}
        <div className="w-64 shrink-0">
          <nav className="flex flex-col gap-1">
            <a href="#" className="px-4 py-2 bg-red-50 text-[#E31E24] font-medium rounded-md">General</a>
            <a href="#" className="px-4 py-2 text-gray-600 font-medium rounded-md hover:bg-gray-100">Appearance & Branding</a>
            <a href="#" className="px-4 py-2 text-gray-600 font-medium rounded-md hover:bg-gray-100">SEO & Meta</a>
            <a href="#" className="px-4 py-2 text-gray-600 font-medium rounded-md hover:bg-gray-100">Social Media</a>
            <a href="#" className="px-4 py-2 text-gray-600 font-medium rounded-md hover:bg-gray-100">Advanced</a>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 flex flex-col gap-8">
          
          {/* General Section */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-6">
            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4">General Information</h3>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Site Title</label>
              <input 
                type="text" 
                defaultValue="ThinkBharti"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">The name of your website. Used in the header and SEO.</p>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Tagline</label>
              <input 
                type="text" 
                defaultValue="The Voice of Modern India"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">In a few words, explain what this site is about.</p>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Contact Email</label>
              <input 
                type="email" 
                defaultValue="contact@thinkbharti.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
              />
            </div>
          </div>

          {/* Branding Section */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-6">
            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4">Branding</h3>
            
            <div className="flex gap-8 items-start">
              <div className="w-1/2">
                <label className="block text-sm font-bold text-gray-700 mb-3">Site Logo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors group">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:text-[#E31E24] group-hover:bg-red-50 transition-colors mb-3">
                    <Upload size={24} />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Click to upload logo</p>
                  <p className="text-xs text-gray-500 mt-1">PNG or SVG, max 2MB</p>
                </div>
              </div>
              
              <div className="w-1/2">
                <label className="block text-sm font-bold text-gray-700 mb-3">Favicon</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors group">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:text-[#E31E24] group-hover:bg-red-50 transition-colors mb-3">
                    <Upload size={24} />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Click to upload favicon</p>
                  <p className="text-xs text-gray-500 mt-1">Must be exactly 512x512 PNG</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
            <strong>Note:</strong> This Settings page is currently a UI layout preview. To make these settings functional across the website, a database table will need to be configured.
          </div>

        </div>
      </div>
    </div>
  );
}
