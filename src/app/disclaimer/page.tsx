import { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";

export const metadata: Metadata = {
  title: "Disclaimer | ThinkBharti",
  description: "Legal disclaimer for ThinkBharti website and its contents.",
};

export default function DisclaimerPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-4xl font-bold text-[#101820] mb-2">Disclaimer</h1>
          <p className="text-gray-500 mb-6 text-sm">Last updated: September 17, 2026</p>
          <div className="w-20 h-1 bg-[#E31E24] mb-8"></div>
          
          <div className="prose prose-lg text-gray-700 max-w-none">
            <p>
              The information contained on the ThinkBharti website (the "Service") is for general information purposes only.
            </p>

            <p>
              ThinkBharti assumes no responsibility for errors or omissions in the contents on the Service.
            </p>

            <p>
              In no event shall ThinkBharti be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service. ThinkBharti reserves the right to make additions, deletions, or modification to the contents on the Service at any time without prior notice.
            </p>

            <p>
              ThinkBharti does not warrant that the website is free of viruses or other harmful components.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">External Links Disclaimer</h2>
            <p>
              The ThinkBharti website may contain links to external websites that are not provided or maintained by or in any way affiliated with ThinkBharti.
            </p>
            <p>
              Please note that ThinkBharti does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Editorial Disclaimer</h2>
            <p>
              The opinions and views expressed in the articles, op-eds, and columns published on ThinkBharti are those of the respective authors and do not necessarily reflect the official policy or position of ThinkBharti, its editors, or its management.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Financial & Legal Disclaimer</h2>
            <p>
              The content on ThinkBharti is provided for informational purposes only, and should not be construed as legal, financial, or investment advice on any subject matter. You should not act or refrain from acting on the basis of any content included in this site without seeking legal or other professional advice.
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
