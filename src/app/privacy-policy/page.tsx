import { Metadata } from "next";
import Link from "next/link";
import PublicLayout from "@/components/layout/PublicLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | ThinkBharti",
  description: "Read the ThinkBharti Privacy Policy to understand how we handle your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-4xl font-bold text-[#101820] mb-2">Privacy Policy</h1>
          <p className="text-gray-500 mb-6 text-sm">Last updated: September 17, 2026</p>
          <div className="w-20 h-1 bg-[#E31E24] mb-8"></div>
          
          <div className="prose prose-lg text-gray-700 max-w-none">
            <p>
              At <strong>ThinkBharti</strong>, accessible from <Link href="/">thinkbharti.com</Link>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ThinkBharti and how we use it.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
            <p>
              The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Account Information:</strong> When you register for a newsletter or an account, we may ask for your contact information, including items such as name and email address.</li>
              <li><strong>Usage Data:</strong> We may collect information on how the Service is accessed and used. This Usage Data may include information such as your device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect in various ways, including to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website</li>
              <li>Send you emails</li>
              <li>Find and prevent fraud</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Log Files</h2>
            <p>
              ThinkBharti follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Cookies and Web Beacons</h2>
            <p>
              Like any other website, ThinkBharti uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Contact Us</h2>
            <p>
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to <Link href="/contact" className="text-[#E31E24] hover:underline">contact us</Link>.
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
