import React from "react";
import Heading from "@/components/global/heading";
import ProductsClient from "./_components/client";
import db from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = async () => {
  const products = await db.products.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="flex flex-1 flex-col p-4 pt-0">
      <div className="flex lg:flex-row flex-col lg:justify-between gap-3 lg:items-center">
        <Heading
          title="Manage Products"
          description="This page show all the products in your store. You can create, edit, and delete products."
        />
        <Link href="/admin/products/create">
          <Button size="sm">+ Create new product</Button>
        </Link>
      </div>
      <div className="mt-5">
        <ProductsClient products={products} />
      </div>
    </div>
  );
};

export default Page;
