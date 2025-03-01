import React from "react";
import db from "@/lib/db";
import BlogForm from "@/components/forms/blog-form";

const Page = async (props: {
  params: Promise<{
    blogId: string;
  }>;
}) => {
  const params = await props.params;
  const data = await db.blogs.findUnique({
    where: {
      id: params.blogId,
    },
  });
  return <BlogForm initialData={data} />;
};

export default Page;
