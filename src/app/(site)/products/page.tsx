import React from "react";
import ProductList from "@/components/global/site/product-list";
import db from "@/lib/db";
import Footer from "@/components/global/site/footer";

const Page = async () => {
  const products = await db.products.findMany({
    include: {
      category: true,
    },
  });
  const categories = await db.categories.findMany();
  return (
    <>
      <ProductList products={products} categories={categories} />
      <Footer />
    </>
  );
};

export default Page;
