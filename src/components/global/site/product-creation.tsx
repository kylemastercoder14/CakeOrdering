import React from "react";
import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const ProductCreation = async () => {
  const data = await db.products.findMany({
    where: {
      isCustomized: true,
    },
    take: 6,
  });
  return (
    <div className="lg:px-[200px] px-10">
      <h1 className="text-center text-4xl font-sans text-[#251201] font-semibold">
        Product Creation
      </h1>
      <div className="mt-3 flex items-center text-[#251201] justify-center gap-2">
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/customization/theme"
        >
          Customize your cake
        </Link>
      </div>
      <div className="mt-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {data.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="relative w-full h-96"
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="w-full h-full object-cover rounded-lg"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCreation;
