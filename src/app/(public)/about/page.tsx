import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | ThinkBharti",
  description: "Learn more about ThinkBharti and our mission to deliver authentic Indian news and stories.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-4xl font-bold text-[#101820] mb-6">About ThinkBharti</h1>
        <div className="w-20 h-1 bg-[#E31E24] mb-8"></div>
        
        <div className="prose prose-lg text-gray-700">
          <p className="lead text-xl text-gray-800 font-medium mb-6">
            ThinkBharti is India’s premier digital publication, committed to bringing you the stories that shape our nation, unfiltered and uncompromised.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
          <p className="mb-6">
            In an era of information overload, clarity is our greatest asset. Our mission is to cut through the noise and deliver journalism that is factual, insightful, and deeply connected to the Indian ethos. We believe that an informed citizenry is the bedrock of a strong democracy, and we strive to empower our readers with nuanced perspectives on politics, culture, technology, and global affairs.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Story</h2>
          <p className="mb-6">
            Born out of a desire for a truly independent digital media platform, ThinkBharti was founded by a collective of seasoned journalists, writers, and thinkers. We saw a gap in the market for a publication that respects the intelligence of its readers while celebrating the incredible diversity and potential of India.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Core Values</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Integrity:</strong> We hold ourselves to the highest ethical standards of journalism.</li>
            <li><strong>Authenticity:</strong> We tell Indian stories from an authentically Indian perspective.</li>
            <li><strong>Innovation:</strong> We embrace new technologies to deliver content in the most engaging formats.</li>
            <li><strong>Inclusivity:</strong> We amplify voices from all corners of the country, not just the metros.</li>
          </ul>

          <p className="mt-10 p-6 bg-gray-50 rounded-lg border border-gray-100 italic">
            "We are not just reporting the news; we are documenting the rise of a new India. Join us on this incredible journey."
          </p>
        </div>
      </div>
    </div>
  );
}
