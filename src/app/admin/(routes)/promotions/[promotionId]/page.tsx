import React from "react";
import db from "@/lib/db";
import PromotionForm from "@/components/forms/promotion-form";

const Page = async (props: {
  params: Promise<{
    promotionId: string;
  }>;
}) => {
  const params = await props.params;
  const data = await db.promotions.findUnique({
    where: {
      id: params.promotionId,
    },
    include: {
      products: true,
    }
  });

  const products = await db.products.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const categories = await db.categories.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return <PromotionForm initialData={data} products={products} categories={categories} />;
};

export default Page;
