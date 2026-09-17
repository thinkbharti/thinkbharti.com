import { Metadata } from "next";
import Link from "next/link";
import PublicLayout from "@/components/layout/PublicLayout";

export const metadata: Metadata = {
  title: "Terms of Service | ThinkBharti",
  description: "Read the ThinkBharti Terms of Service.",
};

export default function TermsOfServicePage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-4xl font-bold text-[#101820] mb-2">Terms of Service</h1>
          <p className="text-gray-500 mb-6 text-sm">Last updated: September 17, 2026</p>
          <div className="w-20 h-1 bg-[#E31E24] mb-8"></div>
          
          <div className="prose prose-lg text-gray-700 max-w-none">
            <p>
              Welcome to ThinkBharti. By accessing this website, we assume you accept these terms and conditions. Do not continue to use ThinkBharti if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Intellectual Property Rights</h2>
            <p>
              Other than the content you own, under these Terms, ThinkBharti and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.
            </p>
            <p>You must not:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Republish material from ThinkBharti without proper attribution</li>
              <li>Sell, rent or sub-license material from ThinkBharti</li>
              <li>Reproduce, duplicate or copy material from ThinkBharti for commercial purposes</li>
              <li>Redistribute content from ThinkBharti</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. User Content</h2>
            <p>
              In these Website Standard Terms and Conditions, "User Content" shall mean any audio, video text, images or other material you choose to display on this Website (such as comments). By displaying Your Content, you grant ThinkBharti a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
            </p>
            <p>
              Your Content must be your own and must not be invading any third-party's rights. ThinkBharti reserves the right to remove any of Your Content from this Website at any time without notice.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. No warranties</h2>
            <p>
              This Website is provided "as is," with all faults, and ThinkBharti express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Limitation of liability</h2>
            <p>
              In no event shall ThinkBharti, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. ThinkBharti, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Governing Law & Jurisdiction</h2>
            <p>
              These Terms will be governed by and interpreted in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
