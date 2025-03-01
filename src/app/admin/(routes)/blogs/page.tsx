import React from "react";
import Heading from "@/components/global/heading";
import db from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BlogsClient from "./_components/client";
import Image from "next/image";

const Page = async () => {
  const blogs = await db.blogs.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="flex flex-1 flex-col p-4 pt-0">
      <div className="flex lg:flex-row flex-col lg:justify-between gap-3 lg:items-center">
        <Heading
          title="Manage Blogs"
          description="This page show all the blogs in your store. You can create, edit, and delete blogs."
        />
        <Link href="/admin/blogs/create">
          <Button size="sm">+ Create new blog</Button>
        </Link>
      </div>
      <div className="mt-5">
        {blogs.length > 0 ? (
          <BlogsClient blogs={blogs} />
        ) : (
          <div className="flex items-center justify-center flex-col">
            <Image
              src="/assets/empty.svg"
              width={300}
              height={300}
              alt="Empty"
            />
            <p className="text-black font-semibold mt-5">No blogs created yet.</p>
            <p className="text-sm text-muted-foreground">
              Please create a new blog by clicking the button above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
