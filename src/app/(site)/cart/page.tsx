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
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/global/site/footer";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Separator } from '../../../components/ui/separator';

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
    <div className="h-screen bg-[#f5f5f5]">
      <div className="relative h-[38vh] bg-[#E3EED4] w-full">
        <div className="absolute inset-0">
          <h3 className="text-center pt-40 uppercase text-[#0F2A1D] font-black font-mono tracking-wider text-6xl mb-5">
            Shopping Cart
          </h3>
          <div className="flex justify-center items-center gap-3 text-[#689071] font-semibold text-2xl">
            <Link href="/">Home</Link>
            <p>/</p>
            <p>Shopping Cart</p>
          </div>
        </div>
      </div>
      <div className="lg:px-[200px] pb-24 pt-8 px-10">
        <div className="grid lg:grid-cols-10 grid-cols-1 gap-5">
          <div className="lg:col-span-7">
            <Table className="mt-5">
              <TableHeader className="bg-[#375534] hover:bg-[#375534] text-white">
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
              <TableBody className="bg-white hover:bg-white mt-10">
                {items.map((item) => (
                  <TableRow
                    className="bg-white hover:bg-white mt-10"
                    key={item.id}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="relative size-20">
                          <Image
                            src={item.image}
                            className="w-full h-full"
                            layout="fill"
                            objectFit="cover"
                            alt={item.name}
                          />
                        </div>
                       <div className='w-40'>
                         <p className="font-semibold">{item.name}</p>
                         <p className='text-sm mt-1 line-clamp-2'>{item.description}</p>
                       </div>
                      </div>
                    </TableCell>
                    <TableCell>₱ {item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex bg-[#375534] text-white px-5 h-8 w-40 rounded-md justify-center items-center">
                        <button
                          onClick={() =>
                            handleDecrement(item.id, item.quantity)
                          }
                        >
                          <Minus />
                        </button>
                        <input
                          type="number"
                          className="text-center w-20 border-none outline-none bg-transparent"
                          readOnly
                          value={item.quantity}
                        />
                        <button
                          onClick={() =>
                            handleIncrement(item.id, item.quantity)
                          }
                        >
                          <Plus />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>
                      ₱ {(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="lg:col-span-3">
            <div className="mt-5 p-3 flex flex-col rounded-md bg-[#E3EED4]">
              <h3 className='text-xl font-semibold'>Order Summary</h3>
              <Separator className="my-2 bg-[#0F2A1D80]" />
              <div className="flex items-center justify-between gap-3 mt-3">
                <p>Item/s:</p>
                <p>
                  {items.length}
                </p>
              </div>
              <div className="flex items-center justify-between gap-3 mt-3">
                <p>Subtotal:</p>
                <p>
                  ₱ {items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                </p>
              </div>
              <Separator className="mt-2 bg-[#0F2A1D80]" />
              <div className="flex font-semibold items-center justify-between gap-3 mt-3">
                <p>Total:</p>
                <p >
                  ₱ {totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center mt-3 gap-2">
                <Button
                className='w-full'
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
                <Button variant="destructive" className='w-full' onClick={removeAll}>
                  Delete all items
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
