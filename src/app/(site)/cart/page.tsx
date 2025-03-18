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
import { createPayment } from "@/lib/xendit";

const Page = () => {
  const router = useRouter();
  const { items, removeItem, updateQuantity, removeAll } = useCart();
  const [invoiceUrl, setInvoiceUrl] = React.useState("");
  const orderNumber = `MarianHomeBakeShop-${Date.now()}`;
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

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    const paymentData = {
      external_id: orderNumber,
      amount: totalPrice,
      payer_email: "kylemastercoder14@gmail.com",
      description: `Payment for ${items.map((item) => item.name).join(", ")}`,
      currency: "PHP",
      success_redirect_url: `http://localhost:3000/success?order=${orderNumber}`,
      failure_redirect_url: "http://localhost:3000/failure",
    };

    const payment = await createPayment(paymentData);
    setInvoiceUrl(payment.invoice_url);
  };

  return (
    <div className="h-screen">
      <div className="relative h-[50vh] w-full">
        <Image
          src="/assets/cart.jpg"
          fill
          className="w-full h-full object-cover"
          alt="About"
        />
        <div className="absolute bg-[#D0F2B7]/50 inset-0 w-full h-full"></div>
        <div className="absolute inset-0">
          <h3 className="text-center pt-60 uppercase text-[#452E19] font-black font-mono tracking-wider text-6xl mb-10">
            Shopping Cart
          </h3>
        </div>
      </div>
      <div className="lg:px-[200px] pb-24 pt-8 px-10">
        <div className="flex gap-3 text-2xl font-semibold text-[#452E19] items-center justify-center">
          <p>Shopping Cart</p>
          <p>-</p>
          <p>Check Out</p>
          <p>-</p>
          <p>Placed Order</p>
          <p>-</p>
          <p>Orders Complete</p>
        </div>
        <Table className="mt-5">
          <TableHeader className="bg-[#452E19] hover:bg-[#452E19] text-white">
            <TableRow className="bg-[#452E19] hover:bg-[#452E19] text-white">
              <TableHead className="bg-[#452E19] hover:bg-[#452E19] text-white">
                Product
              </TableHead>
              <TableHead className="bg-[#452E19] hover:bg-[#452E19] text-white">
                Price
              </TableHead>
              <TableHead className="bg-[#452E19] hover:bg-[#452E19] text-white">
                Quantity
              </TableHead>
              <TableHead className="bg-[#452E19] hover:bg-[#452E19] text-white">
                Total
              </TableHead>
              <TableHead className="bg-[#452E19] hover:bg-[#452E19] text-white">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-[#E6EBBC] hover:bg-[#E6EBBC] mt-10">
            {items.map((item) => (
              <TableRow
                className="bg-[#E6EBBC] hover:bg-[#E6EBBC] mt-10"
                key={item.id}
              >
                <TableCell>
                  <div className="flex flex-col gap-2">
                    <div className="relative size-40">
                      <Image
                        src={item.image}
                        className="w-full h-full"
                        layout="fill"
                        objectFit="cover"
                        alt={item.name}
                      />
                    </div>
                    <p className="font-semibold w-40">{item.name}</p>
                  </div>
                </TableCell>
                <TableCell>₱ {item.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex bg-[#C3DCAA] px-5 h-10 w-40 mt-5 rounded-md justify-center items-center">
                    <button
                      onClick={() => handleDecrement(item.id, item.quantity)}
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
                      onClick={() => handleIncrement(item.id, item.quantity)}
                    >
                      <Plus />
                    </button>
                  </div>
                </TableCell>
                <TableCell>
                  ₱ {(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" onClick={() => removeItem(item.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-5 p-3 flex items-center justify-between bg-[#E6EBBC]">
          <div className="flex items-center gap-3">
            <p>Total (item):</p>
            <p className="text-xl font-semibold">₱ {totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-2">
            {invoiceUrl ? (
              <a
                href={invoiceUrl}
                rel="noopener noreferrer"
                className="text-red-800 text-sm font-semibold hover:underline"
              >
                Click here if you are not redirected
              </a>
            ) : (
              <Button disabled={invoiceUrl !== ""} onClick={handlePayment}>
                {invoiceUrl
                  ? "Payment successful! Redirecting to payment page..."
                  : "Checkout"}
              </Button>
            )}

            <Button variant="destructive" onClick={removeAll}>
              Delete Cart
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
