"use client";

import { Categories, OrderItems, Products } from "@prisma/client";
import React, { useState } from "react";
import SearchBox from "./search-box";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProductListProps extends Products {
  category: Categories;
  OrderItems: OrderItems[];
}

const ProductList = ({
  products,
  categories,
}: {
  products: ProductListProps[];
  categories: Categories[];
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "best" | "featured">(
    "all"
  );

  // Handle category selection
  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  // Filter products based on category, search, and filter type
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        !selectedCategory || product.category.id === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Filter based on type (All, Best Choice, Featured)
      if (filterType === "best")
        return (
          matchesCategory && matchesSearch && product.OrderItems.length > 0
        );
      if (filterType === "featured")
        return matchesCategory && matchesSearch && product.isFeatured;

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) =>
      filterType === "best" ? b.OrderItems.length - a.OrderItems.length : 0
    ); // Sort by order count if Best Choice is selected
  return (
    <div className="lg:px-[200px] pb-24 pt-24 px-10">
      <SearchBox onSearch={setSearchTerm} />
      <h3 className="text-center text-2xl font-bold mt-10">Product List</h3>
      <p className="text-center mt-2">
        Where Creativity Meets Flavor – Discover Cakes Beyond Imagination.
      </p>
      <div className="grid mt-8 lg:grid-cols-10 grid-cols-1 gap-20">
        <div className="lg:col-span-3 border bg-[#0F2A1D] text-white rounded-md shadow-md flex flex-col text-center p-10 w-full">
          <p className="font-semibold text-2xl mb-5">Filter Products</p>

          {/* Best Choice & Featured Filters */}
          <button
            onClick={() => setFilterType("all")}
            className={`py-2 px-4 text-sm cursor-pointer mt-2 ${
              filterType === "all"
                ? "bg-[#C3DCAA] text-black font-bold"
                : "hover:bg-[#C3DCAA]/20"
            } rounded-md transition`}
          >
            All Products
          </button>
          <button
            onClick={() => setFilterType("best")}
            className={`py-2 px-4 text-sm cursor-pointer mt-2 ${
              filterType === "best"
                ? "bg-[#C3DCAA] text-white font-bold"
                : "hover:bg-[#C3DCAA]/20"
            } rounded-md transition`}
          >
            Best Choice (Top Sellers)
          </button>
          <button
            onClick={() => setFilterType("featured")}
            className={`py-2 px-4 text-sm cursor-pointer mt-2 ${
              filterType === "featured"
                ? "bg-[#C3DCAA] text-black font-bold"
                : "hover:bg-[#C3DCAA]/20"
            } rounded-md transition`}
          >
            Featured Products
          </button>

          {/* Category Filters */}
          <p className="font-semibold text-2xl mt-10 mb-5">Categories</p>
          <button
            onClick={() => handleCategorySelect(null)}
            className={`py-2 px-4 text-sm cursor-pointer ${
              !selectedCategory
                ? "bg-[#C3DCAA] text-black font-bold"
                : "hover:bg-[#C3DCAA]/20"
            } rounded-md transition`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`py-2 px-4 text-sm cursor-pointer mt-2 ${
                selectedCategory === category.id
                  ? "bg-[#C3DCAA] text-black font-bold"
                  : "hover:bg-[#C3DCAA]/20"
              } rounded-md transition`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="lg:col-span-7 w-full">
          {filteredProducts.length > 0 ? (
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
              {filteredProducts.map((product) => (
                <div key={product.id}>
                  <div className="relative w-full h-60">
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
                  <p
                    title={product.name}
                    className="font-normal line-clamp-1 text-center mt-2"
                  >
                    {product.name}
                  </p>
                  <p className="text-sm font-semibold mt-2 text-center">
                    ₱{product.price.toFixed(2)}
                  </p>
                  <Button className="mt-2 w-36 flex items-center justify-center mx-auto" size="sm">
                    <Link href={`/products/${product.id}`}>
                      View Details &nbsp; &rarr;
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-[#C3DCAA] text-2xl flex flex-col items-center justify-center h-full mt-10">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
