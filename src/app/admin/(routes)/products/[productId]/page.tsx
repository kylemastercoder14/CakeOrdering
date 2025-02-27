import React from "react";
import db from "@/lib/db";
import ProductForm from "@/components/forms/product-form";

const Page = async (props: {
  params: Promise<{
    productId: string;
  }>;
}) => {
  const params = await props.params;
  const data = await db.products.findUnique({
    where: {
      id: params.productId,
    },
  });

  const categories = await db.categories.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return <ProductForm initialData={data} categories={categories} />;
};

export default Page;
