"use client";

import { Blogs } from "@prisma/client";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import CellAction from "./cell-action";
import { format } from "date-fns";

const BlogsClient = ({ blogs }: { blogs: Blogs[] }) => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
      {blogs.map((blog) => (
        <Card key={blog.id}>
          <CardContent className="p-0">
            <div className="relative w-full h-[20vh]">
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                fill
                className="w-full h-full object-cover rounded-t-md"
              />
            </div>
            <div className="py-3 px-4">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">{blog.title}</h2>
                <CellAction initialData={blog} />
              </div>
              <p className="text-sm text-[#4c8018] font-semibold">
                {format(new Date(blog.createdAt), "MMMM dd, yyyy")}
              </p>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {blog.content}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BlogsClient;
