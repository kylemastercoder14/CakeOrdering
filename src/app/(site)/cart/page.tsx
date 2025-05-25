"use client";

import Image from "next/image";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCart from "@/hooks/use-cart";
import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/global/site/footer";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Separator } from "../../../components/ui/separator";

const Page = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const { items, removeItem, updateQuantity, removeAll } = useCart();
  const handleIncrement = (id: string, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1);
  };

  const handleDecrement = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Hero Section */}
      <div className="relative h-[30vh] sm:h-[38vh] bg-[#E3EED4] w-full">
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h3 className="text-center uppercase text-[#0F2A1D] font-black font-mono tracking-wider text-3xl sm:text-5xl lg:text-6xl mb-3 sm:mb-5">
            Shopping Cart
          </h3>
          <div className="flex justify-center items-center gap-3 text-[#689071] font-semibold text-lg sm:text-2xl">
            <Link href="/">Home</Link>
            <p>/</p>
            <p>Shopping Cart</p>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div className="lg:px-[200px] px-4 sm:px-10 pb-24 pt-8">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <h4 className="text-2xl font-semibold mb-4">Your cart is empty</h4>
            <Button onClick={() => router.push("/")}>Continue Shopping</Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-10 grid-cols-1 gap-5">
            {/* Cart Items Table */}
            <div className="lg:col-span-7 overflow-x-auto">
              <Table className="mt-5">
                <TableHeader className="bg-[#375534] hover:bg-[#375534] text-white hidden sm:table-header-group">
                  <TableRow className="bg-[#375534] hover:bg-[#375534] text-white">
                    <TableHead className="bg-[#375534] hover:bg-[#375534] text-white">
                      Product
                    </TableHead>
                    <TableHead className="bg-[#375534] hover:bg-[#375534] text-white">
                      Price
                    </TableHead>
                    <TableHead className="bg-[#375534] hover:bg-[#375534] text-white">
                      Quantity
                    </TableHead>
                    <TableHead className="bg-[#375534] hover:bg-[#375534] text-white">
                      Subtotal
                    </TableHead>
                    <TableHead className="bg-[#375534] hover:bg-[#375534] text-white">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white hover:bg-white">
                  {items.map((item) => (
                    <TableRow
                      className="bg-white hover:bg-white flex flex-col sm:table-row mb-4 sm:mb-0"
                      key={item.id}
                    >
                      <TableCell className="flex items-center gap-2 sm:table-cell">
                        <div className="relative size-20">
                          <Image
                            src={item.image}
                            className="w-full h-full"
                            layout="fill"
                            objectFit="cover"
                            alt={item.name}
                          />
                        </div>
                        <div className="sm:w-40">
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="flex justify-between sm:table-cell">
                        <span className="sm:hidden font-semibold">Price:</span>
                        <span>₱ {item.price.toFixed(2)}</span>
                      </TableCell>
                      <TableCell className="flex justify-between sm:table-cell">
                        <span className="sm:hidden font-semibold">Qty:</span>
                        <div className="flex bg-[#375534] text-white px-3 sm:px-5 h-8 w-32 sm:w-40 rounded-md justify-center items-center">
                          <button
                            onClick={() =>
                              handleDecrement(item.id, item.quantity)
                            }
                          >
                            <Minus size={16} />
                          </button>
                          <input
                            type="number"
                            className="text-center w-16 sm:w-20 border-none outline-none bg-transparent"
                            readOnly
                            value={item.quantity}
                          />
                          <button
                            onClick={() =>
                              handleIncrement(item.id, item.quantity)
                            }
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </TableCell>
                      <TableCell className="flex justify-between sm:table-cell">
                        <span className="sm:hidden font-semibold">
                          Subtotal:
                        </span>
                        <span>₱ {(item.price * item.quantity).toFixed(2)}</span>
                      </TableCell>
                      <TableCell className="flex justify-end sm:table-cell">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash size={18} />
                          <span className="ml-2 sm:hidden">Remove</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-3">
              <div className="mt-5 p-4 sm:p-6 flex flex-col rounded-md bg-[#E3EED4]">
                <h3 className="text-xl font-semibold">Order Summary</h3>
                <Separator className="my-2 bg-[#0F2A1D80]" />
                <div className="flex items-center justify-between gap-3 mt-3">
                  <p>Item/s:</p>
                  <p>{items.length}</p>
                </div>
                <div className="flex items-center justify-between gap-3 mt-3">
                  <p>Subtotal:</p>
                  <p>₱ {totalPrice.toFixed(2)}</p>
                </div>
                <Separator className="mt-2 bg-[#0F2A1D80]" />
                <div className="flex font-semibold items-center justify-between gap-3 mt-3">
                  <p>Total:</p>
                  <p>₱ {totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center mt-5 gap-2">
                  <Button
                    className="w-full"
                    onClick={() => {
                      if (isSignedIn) {
                        router.push("/checkout");
                      } else {
                        router.push("/sign-in");
                      }
                    }}
                  >
                    Checkout
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={removeAll}
                  >
                    <Trash size={18} className="mr-2" />
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
