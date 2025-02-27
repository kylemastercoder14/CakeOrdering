"use client";

import { Categories } from "@prisma/client";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import CellAction from "./cell-action";

const CategoriesClient = ({ categories }: { categories: Categories[] }) => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
      {categories.map((category) => (
        <Card key={category.id}>
          <CardContent className="p-0">
            <div className="relative w-full h-[20vh]">
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                className="w-full h-full object-cover rounded-t-md"
              />
            </div>
            <div className="py-3 px-4">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">{category.name}</h2>
                <CellAction initialData={category} />
              </div>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {category.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CategoriesClient;
