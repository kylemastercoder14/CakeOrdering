import React from "react";
import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ProductCatalog = async () => {
  const data = await db.categories.findMany({});
  return (
    <div className="lg:px-[200px] px-10">
      <h1 className="text-center text-4xl font-sans text-[#251201] font-bold">
        Product Catalog
      </h1>
      <div className="mt-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {data.map((category) => (
          <div key={category.id} className='flex flex-col items-center justify-center gap-3'>
            <div className="relative w-full h-96">
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <Link href={`/products`}>
              <Button>{category.name}</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
