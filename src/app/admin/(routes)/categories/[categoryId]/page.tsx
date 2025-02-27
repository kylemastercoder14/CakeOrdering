import React from "react";
import db from "@/lib/db";
import CategoryForm from "@/components/forms/category-form";

const Page = async (props: {
  params: Promise<{
    categoryId: string;
  }>;
}) => {
  const params = await props.params;
  const data = await db.categories.findUnique({
    where: {
      id: params.categoryId,
    },
  });
  return <CategoryForm initialData={data} />;
};

export default Page;
