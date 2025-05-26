import React from "react";
import Footer from "@/components/global/site/footer";
import BlogCard from "@/components/global/blog-card";
import db from "@/lib/db";
import { format } from "date-fns";
import Image from "next/image";

const Page = async () => {
  const data = await db.blogs.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="h-screen bg-white">
      <div className="relative h-[50vh] w-full">
        <Image
          src="/banner.png"
          fill
          className="w-full h-full object-cover"
          alt="faq"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <h1 className="text-center uppercase text-[#0F2A1D] font-black font-mono tracking-wider text-5xl md:text-6xl px-4 drop-shadow-md">
            Blogs
          </h1>
          <div className="w-24 h-1 bg-[#8BC34A] mt-6 rounded-full"></div>
        </div>
      </div>
      <div className="lg:px-[200px] px-10 pt-10 pb-24">
        <h1 className="font-semibold text-2xl">Blogs</h1>
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-10 mt-5">
          {data.map((blog) => (
            <BlogCard
              key={blog.id}
              image={blog.imageUrl}
              title={blog.title}
              description={blog.content}
              datePosted={format(new Date(blog.createdAt), "MMMM dd, yyyy")}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
