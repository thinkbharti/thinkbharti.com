import PublicLayout from "@/components/layout/PublicLayout";
import { Mail, TrendingUp, Users, Target, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Advertise with Us - ThinkBharti",
  description: "Partner with ThinkBharti to reach an engaged, influential, and forward-thinking audience across India.",
};

export default function AdvertisePage() {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#E31E24] uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full inline-block mb-3">
              Partner With Us
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#101820] mb-4">
              Advertise on <span className="text-[#E31E24]">ThinkBharti</span>
            </h1>
            <p className="text-lg text-gray-600">
              Connect your brand with high-intent decision makers, innovators, and thinkers across modern India.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className="w-12 h-12 bg-red-50 text-[#E31E24] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users size={24} />
              </div>
              <div className="text-3xl font-extrabold text-gray-900 mb-1">500K+</div>
              <div className="text-sm font-medium text-gray-500">Monthly Active Readers</div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className="w-12 h-12 bg-red-50 text-[#E31E24] rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={24} />
              </div>
              <div className="text-3xl font-extrabold text-gray-900 mb-1">85%</div>
              <div className="text-sm font-medium text-gray-500">Tier 1 & Metros Engagement</div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className="w-12 h-12 bg-red-50 text-[#E31E24] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target size={24} />
              </div>
              <div className="text-3xl font-extrabold text-gray-900 mb-1">3.5 min</div>
              <div className="text-sm font-medium text-gray-500">Average Read Duration</div>
            </div>
          </div>

          {/* Options */}
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Advertising Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Sponsored Editorial & Thought Leadership", desc: "Co-created, authoritative content tailored to your target audience." },
                { title: "Native Display & Banner Placements", desc: "High-visibility, non-intrusive placements across homepage and article views." },
                { title: "Newsletter Sponsorships", desc: "Direct outreach to thousands of subscribed business leaders and professionals." },
                { title: "Custom Research & Reports", desc: "Jointly produced industry insights and whitepapers distributed nationally." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <CheckCircle2 size={20} className="text-[#E31E24] shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-base mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Box */}
          <div className="bg-[#101820] text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Start Your Campaign Today</h2>
            <p className="text-gray-300 max-w-xl mx-auto mb-8">
              Reach out to our brand partnerships team to discuss custom media packages, rate cards, and sponsored opportunities.
            </p>
            <a 
              href="mailto:ads@thinkbharti.com" 
              className="inline-flex items-center gap-2 bg-[#E31E24] text-white font-bold px-8 py-3.5 rounded-full hover:bg-red-700 transition-colors shadow-lg"
            >
              <Mail size={18} />
              ads@thinkbharti.com
            </a>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
