import Image from "next/image";
import React from "react";
import db from "@/lib/db";
import Footer from "@/components/global/site/footer";

const Page = async () => {
  // Fetch privacy policy content from database
  const policy = await db.policies.findFirst({
	where: {
	  title: "Privacy Policy",
	},
  });

  return (
	<div className="min-h-screen">
	  {/* Hero Section */}
	  <div className="relative h-[50vh] w-full">
		<Image
		  src="/assets/contact.jpg"
		  fill
		  className="w-full h-full object-cover"
		  alt="faq"
		  priority
		/>
		<div className="absolute bg-[#D0F2B7]/50 inset-0 w-full h-full"></div>
		<div className="absolute inset-0 flex items-center justify-center flex-col">
		  <h1 className="text-center uppercase text-[#452E19] font-black font-mono tracking-wider text-5xl md:text-6xl px-4 drop-shadow-md">
			Privacy Policy
		  </h1>
		  <div className="w-24 h-1 bg-[#8BC34A] mt-6 rounded-full"></div>
		</div>
	  </div>

	  {/* Content Section */}
	  <div className="max-w-4xl mx-auto px-6 py-16">
		<div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 relative overflow-hidden">
		  {/* Decorative elements */}
		  <div className="absolute top-0 right-0 w-32 h-32 bg-[#D0F2B7]/20 rounded-bl-full -z-10"></div>
		  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D0F2B7]/20 rounded-tr-full -z-10"></div>

		  {/* Last updated info */}
		  <div className="mb-8 text-sm text-[#452E19]/60 border-b border-[#D0F2B7] pb-4">
			<span className="font-medium">Last Updated:</span>{" "}
			{policy?.updatedAt
			  ? new Date(policy.updatedAt).toLocaleDateString("en-US", {
				  year: "numeric",
				  month: "long",
				  day: "numeric",
				})
			  : "N/A"}
		  </div>

		  {/* Policy introduction */}
		  <div className="mb-8">
			<h2 className="text-2xl font-bold text-[#452E19] mb-4">
			  Our Commitment to You
			</h2>
			<p className="text-[#452E19]/80 leading-relaxed">
			  At Marian Homebakes, we take pride in our products and want to
			  ensure your complete satisfaction. Please take a moment to review
			  our privacy policy below.
			</p>
		  </div>

		  {/* Policy content from database */}
		  <div className="policy-content text-[#452E19]/90 leading-relaxed space-y-6">
			{policy?.content ? (
			  <div dangerouslySetInnerHTML={{ __html: policy?.content }} />
			) : (
			  <p className="italic text-[#452E19]/60">
				Privacy policy information is currently unavailable. Please
				contact us for details.
			  </p>
			)}
		  </div>

		  {/* Contact section */}
		  <div className="mt-12 p-6 bg-[#D0F2B7]/30 rounded-xl border border-[#D0F2B7]">
			<h3 className="text-xl font-semibold text-[#452E19] mb-3">
			  Questions About Our Policy?
			</h3>
			<p className="text-[#452E19]/80 mb-4">
			  If you have any questions or need clarification about our privacy
			  policy, our customer service team is here to help.
			</p>
			<div className="flex flex-col sm:flex-row gap-4">
			  <a
				href="/contact-us"
				className="bg-[#8BC34A] text-white px-6 py-3 rounded-full font-medium hover:bg-[#7CB342] transition-colors duration-200 text-center"
			  >
				Contact Us
			  </a>
			  <a
				href="mailto:support@marianhomebakes.com"
				className="bg-white text-[#452E19] px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors duration-200 border border-[#452E19]/20 text-center"
			  >
				Email Support
			  </a>
			</div>
		  </div>
		</div>
	  </div>

	  {/* Decorative Elements */}
	  <div className="hidden md:block absolute right-8 top-1/3 w-24 h-24 rounded-full bg-[#D0F2B7]/40 -z-10"></div>
	  <div className="hidden md:block absolute left-12 bottom-1/4 w-32 h-32 rounded-full bg-[#D0F2B7]/30 -z-10"></div>

	  <Footer />
	</div>
  );
};

export default Page;
