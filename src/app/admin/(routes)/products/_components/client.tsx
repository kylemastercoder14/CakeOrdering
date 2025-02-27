"use client";

import { Products } from "@prisma/client";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import CellAction from "./cell-action";
import { Badge } from '@/components/ui/badge';

const ProductsClient = ({ products }: { products: Products[] }) => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
      {products.map((product) => (
        <Card key={product.id}>
          <CardContent className="p-0">
            <div className="relative w-full h-[20vh]">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="w-full h-full object-cover rounded-t-md"
              />
			  <Badge variant={product.status === "Out of stock" ? "destructive" : "success"} className='absolute top-2 right-2'>{product.status}</Badge>
            </div>
            <div className="py-3 px-4">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-base line-clamp-1">{product.name}</h2>
                <CellAction initialData={product} />
              </div>
			  <p className='text-sm text-[#4c8018] font-semibold'>₱{product.price.toFixed(2)}</p>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductsClient;
