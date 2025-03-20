import Image from "next/image";
import React from "react";
import Footer from "@/components/global/site/footer";
import BlogCard from "@/components/global/blog-card";
import db from "@/lib/db";
import { format } from "date-fns";

const Page = async () => {
  const data = await db.blogs.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="h-screen">
      <div className="relative h-[50vh] w-full">
        <Image
          src="/assets/blog.png"
          fill
          className="w-full h-full object-cover"
          alt="About"
        />
        <div className="absolute bg-[#D0F2B7]/50 inset-0 w-full h-full"></div>
        <div className="absolute inset-0">
          <h3 className="text-center pt-60 uppercase text-[#452E19] font-black font-mono tracking-wider text-6xl mb-10">
            Blogs
          </h3>
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
