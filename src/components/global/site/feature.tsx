import React from "react";
import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

const Feature = async () => {
  const data = await db.products.findMany({
    where: {
      isFeatured: true,
    },
    take: 6,
  });
  return (
    <div className="lg:px-[200px] px-10 pt-24">
      <h1 className="text-center text-4xl font-sans text-[#251201] font-bold">
        Featured Products
      </h1>
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

export default Feature;
