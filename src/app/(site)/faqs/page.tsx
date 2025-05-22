import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import db from "@/lib/db";
import Link from "next/link";
import Footer from "@/components/global/site/footer";

const Faqs = async () => {
  const faqs = await db.faqs.findMany({
    orderBy: {
      question: "asc",
    },
  });

  // Split FAQs into two arrays for two columns
  const halfLength = Math.ceil(faqs.length / 2);
  const firstColumnFaqs = faqs.slice(0, halfLength);
  const secondColumnFaqs = faqs.slice(halfLength);

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
            Frequently Asked Questions
          </h1>
          <div className="w-24 h-1 bg-[#8BC34A] mt-6 rounded-full"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-center text-lg font-medium text-[#452E19] mb-12 max-w-2xl mx-auto">
          Here are some of the most common questions we receive from our
          customers. If you have any other questions, feel free to reach out to
          us!
        </p>

        {/* 2-Column FAQ Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* First Column */}
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {firstColumnFaqs.map((faq) => (
                <AccordionItem
                  value={faq.id}
                  key={faq.id}
                  className="border-none shadow-md bg-white rounded-lg overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 text-[#452E19] font-medium hover:bg-[#D0F2B7]/20 transition-all duration-200">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-[#452E19]/80 bg-white">
                    <div className="border-l-4 border-[#8BC34A] pl-4">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Second Column */}
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {secondColumnFaqs.map((faq) => (
                <AccordionItem
                  value={faq.id}
                  key={faq.id}
                  className="border-none shadow-md bg-white rounded-lg overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 text-[#452E19] font-medium hover:bg-[#D0F2B7]/20 transition-all duration-200">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-[#452E19]/80 bg-white">
                    <div className="border-l-4 border-[#8BC34A] pl-4">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-[#452E19] mb-4">
            Still have questions?
          </h3>
          <p className="text-[#452E19]/80 mb-6">
            Our team is here to help you with any inquiries you might have.
          </p>
          <Link
            href="/contact-us"
            className="bg-[#8BC34A] text-white px-8 py-3 rounded-full font-medium hover:bg-[#7CB342] transition-colors duration-200 shadow-md"
          >
            Contact Support
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="hidden md:block absolute right-8 top-1/3 w-24 h-24 rounded-full bg-[#D0F2B7]/40 -z-10"></div>
      <div className="hidden md:block absolute left-12 bottom-1/4 w-32 h-32 rounded-full bg-[#D0F2B7]/30 -z-10"></div>

      <Footer />
    </div>
  );
};

export default Faqs;
