"use client";

import { Products, Categories } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

interface ProductDetailsProps extends Products {
  category: Categories | null;
}

const ProductDetails = ({
  product,
}: {
  product: ProductDetailsProps | null;
}) => {
  const router = useRouter();
  const addToCart = useCart((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleAddToCart = () => {
    addToCart({
      id: product?.id as string,
      name: product?.name as string,
      price: product?.price as number,
      quantity,
      image: product?.imageUrl as string,
      description: product?.description as string,
      category: product?.category?.name as string,
    });
  };
  return (
    <div className="grid mt-10 lg:grid-cols-4 grid-cols-1 gap-20">
      <div className="lg:col-span-2">
        <div className="relative w-full h-[500px]">
          <Image
            src={product?.imageUrl as string}
            alt={product?.name as string}
            fill
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
      <div className="lg:col-span-2">
        <h3 className="text-3xl font-bold text-[#452E19] mb-2">
          {product?.name}
        </h3>
        <Badge>{product?.category?.name}</Badge>
        <p className="font-semibold text-xl mt-2">
          ₱ {product?.price.toFixed(2)}
        </p>
        <p className="mt-2 text-lg">
          Flavor: {product?.flavors.join(", ") || "Not specified"}
        </p>
        <p className="mt-2 text-lg">
          Sizes Available:
          {product?.sizes.join(", ") || " Not specified"}
        </p>
        <p className="mt-2 text-lg">
          Allergens: {product?.allergens.join(", ") || " Not specified"}
        </p>
        <p className="mt-2 text-lg">{product?.description}</p>
        <div className="flex bg-[#0F2A1D] text-white px-5 h-10 w-60 mt-5 rounded-md justify-center items-center">
          <button onClick={handleDecrement}>
            <Minus />
          </button>
          <input
            type="number"
            className="text-center border-none outline-none bg-transparent"
            readOnly
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <button onClick={handleIncrement}>
            <Plus />
          </button>
        </div>
        <Button
          size="lg"
          onClick={handleAddToCart}
          className="mt-5 flex items-center justify-center w-60"
        >
          Add to cart
        </Button>
        <Button
          onClick={() => router.push("/products")}
          size="lg"
          variant="ghost"
          className="mt-3 hover:bg-transparent hover:underline w-60"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
