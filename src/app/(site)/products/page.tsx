import React from "react";
import ProductList from "@/components/global/site/product-list";
import db from "@/lib/db";
import Footer from "@/components/global/site/footer";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Page = async () => {
  const products = await db.products.findMany({
    include: {
      category: true,
      OrderItems: true,
    },
  });
  const categories = await db.categories.findMany();
  return (
    <div className='h-screen'>
      <ProductList products={products} categories={categories} />
      <Footer />
    </div>
  );
};

export default Page;
