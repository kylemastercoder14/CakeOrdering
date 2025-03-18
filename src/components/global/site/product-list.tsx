"use client";

import { Categories, Products } from "@prisma/client";
import React from "react";
import SearchBox from "./search-box";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProductListProps extends Products {
  category: Categories;
}

const ProductList = ({
  products,
  categories,
}: {
  products: ProductListProps[];
  categories: Categories[];
}) => {
  return (
    <div className="lg:px-[200px] pb-24 pt-24 px-10">
      <SearchBox />
      <h3 className="text-center text-2xl font-bold mt-10">Product List</h3>
      <p className="text-center mt-2">
        Where Creativity Meets Flavor – Discover Cakes Beyond Imagination.
      </p>
      <div className="grid mt-8 lg:grid-cols-10 grid-cols-1 gap-20">
        <div className="lg:col-span-3 border bg-[#DCF6AA] rounded-md shadow-md flex flex-col text-center p-10 w-full">
          <p className="font-semibold text-2xl mb-5">Highlights</p>
          <p>Best Choice</p>
          <p>Features</p>
          <p className="font-semibold text-2xl mt-10 mb-5">Categories</p>
          {categories.map((category) => (
            <p key={category.id}>{category.name}</p>
          ))}
        </div>
        <div className="lg:col-span-7 w-full">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5">
            {products.map((product) => (
              <div key={product.id}>
                <div className="relative w-full h-40">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <Badge className="absolute top-2 right-2">
                    {product.category.name}
                  </Badge>
                </div>
                <p className="font-normal line-clamp-1 text-center mt-2">
                  {product.name}
                </p>
                <p className="text-sm font-semibold mt-2 text-center">
                  ₱{product.price.toFixed(2)}
                </p>
                <Button className="mt-2 w-full" size="sm">
                  <Link href={`/products/${product.id}`}>
                    View Details &nbsp; &rarr;
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
