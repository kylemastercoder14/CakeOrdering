import React from "react";
import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

const ProductCreation = async () => {
  const data = await db.products.findMany({
    where: {
      isCustomized: true,
    },
    take: 8,
  });
  return (
    <div className="lg:px-[200px] px-10">
      <h1 className="text-center text-4xl font-sans text-[#251201] font-bold">
        Product Creation
      </h1>
      <div className='mt-3 flex items-center text-[#251201] justify-center gap-2'>
        <p>Customize your cake?</p>
        <Link className='hover:underline font-semibold' href="/customization/theme">Get started &rarr;</Link>
      </div>
      <div className="mt-10 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5">
        {data.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="relative w-full h-80"
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
