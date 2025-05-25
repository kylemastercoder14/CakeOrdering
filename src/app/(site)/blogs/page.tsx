
import React from "react";
import Footer from "@/components/global/site/footer";
import BlogCard from "@/components/global/blog-card";
import db from "@/lib/db";
import { format } from "date-fns";
import Link from 'next/link';

const Page = async () => {
  const data = await db.blogs.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="h-screen bg-[#f5f5f5]">
      <div className="relative h-[38vh] bg-[#E3EED4] w-full">
        <div className="absolute inset-0">
          <h3 className="text-center pt-40 uppercase text-[#0F2A1D] font-black font-mono tracking-wider text-6xl mb-5">
            Blogs
          </h3>
          <div className="flex justify-center items-center gap-3 text-[#689071] font-semibold text-2xl">
            <Link href="/">Home</Link>
            <p>/</p>
            <p>Blogs</p>
          </div>
        </div>
      </div>
      <div className="lg:px-[200px] px-10 pt-10 pb-24">
        <h1 className="font-semibold text-2xl">Blogs</h1>
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-5 mt-5">
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
