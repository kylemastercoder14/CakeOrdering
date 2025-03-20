"use client";

import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";
import OptionRadio, { RadioGroup } from "@/components/global/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { createPayment } from "@/lib/xendit";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { createOrder } from "@/actions/order";

const Page = () => {
  const { user } = useUser();
  const { items, removeAll } = useCart();
  const router = useRouter();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [shippingOption, setShippingOption] = React.useState("Delivery");
  const [invoiceUrl, setInvoiceUrl] = React.useState("");
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();

    const orderNumber = `MarianHomeBakeShop-${Date.now()}`;
    const userId = user?.id;
    if (!userId) {
      toast.error("You must be logged in to place an order.");
      return;
    }

    const orderData = {
      userId,
      name: `${firstName} ${lastName}`,
      address,
      orderNumber,
      totalAmount: totalPrice,
      message,
      shippingOption,
      shippingFee: 0,
      items: items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const res = await createOrder(orderData);
      if (res.success) {
        // Proceed with payment after successful order creation
        const paymentData = {
          external_id: orderNumber,
          amount: totalPrice,
          payer_email: user?.emailAddresses[0].emailAddress,
          description: `Payment for ${items
            .map((item) => item.name)
            .join(", ")}`,
          currency: "PHP",
          success_redirect_url: `http://localhost:3000/success?order=${orderNumber}`,
          failure_redirect_url: "http://localhost:3000/failure",
        };

        const payment = await createPayment(paymentData);
        setInvoiceUrl(payment.invoice_url);
        removeAll();
      } else {
        toast.error(res.error || "An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="h-screen flex items-center">
      <form onSubmit={handlePayment} className="w-[60%] flex flex-col pr-10 pt-10 pl-96 border-r h-screen bg-white">
        <Image src="/assets/logo.png" alt="Logo" width={80} height={80} />
        <h1 className="font-bold text-2xl mt-3">Shipping Address</h1>
        <div className="grid mt-4 lg:grid-cols-2 grid-cols-1 gap-4">
          <Input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <Input
          className="mt-4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Home Address, Street, Subdivision"
          required
        />
        <Input className="mt-4" placeholder="Barangay" />
        <div className="grid mt-4 lg:grid-cols-2 grid-cols-1 gap-4">
          <Input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <Input
            placeholder="Province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            required
          />
        </div>
        <Input
          className="mt-4"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Recipient's Phone Number"
          required
        />
        <RadioGroup value={shippingOption} onChangeAction={setShippingOption}>
          <div className="flex items-center gap-4 mt-4">
            <OptionRadio
              className="p-5 w-full flex gap-0 flex-col"
              value="Delivery"
            >
              <span className="font-semibold">Delivery</span>
              <span className="text-sm">
                We have a self-delivery service that will deliver your order to
                your doorstep. Delivery fee is estimated based on your location.
              </span>
            </OptionRadio>
            <OptionRadio
              className="p-5 w-full flex gap-0 flex-col"
              value="Pick-up"
            >
              <span className="font-semibold">Pick-up</span>
              <span className="text-sm">
                You can pick up your order at our store location. We will notify
                you once your order is ready for pick-up.
              </span>
            </OptionRadio>
          </div>
        </RadioGroup>
        <Textarea
          className="mt-4"
          placeholder="Message to the Admin (e.g. Allergies, with candles, etc.)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex items-center justify-end mt-10 gap-3">
          <Button
            type="button"
            onClick={() => router.push("/cart")}
            variant="ghost"
          >
            <ChevronLeft />
            Return to cart
          </Button>
          {invoiceUrl ? (
            <div className="text-center">
              <p className="text-sm text-muted-foreground flex items-center gap-1 justify-center">
                Payment successful! Redirecting to payment page...{" "}
                <Loader2 className="w-4 h-4 animate-spin" />
              </p>
              <a
                href={invoiceUrl}
                rel="noopener noreferrer"
                className="text-[#251201] text-sm font-semibold hover:underline"
              >
                Click here if you are not redirected
              </a>
            </div>
          ) : (
            <Button type='submit'>Proceed to payment</Button>
          )}
        </div>
      </form>
      <div className="w-[40%] bg-zinc-200 h-screen flex flex-col pl-10 pt-10 pr-14">
        {items.map((item) => (
          <div className="flex items-center justify-between mb-6" key={item.id}>
            <div className="flex items-center gap-2">
              <div className="relative w-20 h-20">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="w-full h-full rounded-md border object-cover"
                />
              </div>
              <div className="w-[500px]">
                <p className="font-semibold">{item.name}</p>
                <p className="line-clamp-2 w-[300px] text-sm">
                  {item.description}
                </p>
                <p className="text-sm text-[#251201] font-semibold">
                  Quantity: {item.quantity} pc(s)
                </p>
              </div>
            </div>
            <p className="font-semibold">
              ₱{(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
        <div className="flex justify-between items-center mt-10">
          <p>Subtotal:</p>
          <p>₱{totalPrice.toFixed(2)}</p>
        </div>
        {shippingOption === "Delivery" && (
          <div className="flex justify-between items-center mt-4">
            <p>Delivery Fee:</p>
            <p className="text-sm w-60 text-right">
              The delivery fee will be calculated based on your location.
            </p>
          </div>
        )}
        <div className="flex justify-between items-center mt-8">
          <p className="font-bold">Total:</p>
          <p className="font-semibold">₱{totalPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
