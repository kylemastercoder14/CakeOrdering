/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";
import OptionRadio, { RadioGroup } from "@/components/global/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createOrder } from "@/actions/order";
import { Users } from "@prisma/client";
import { Modal } from "@/components/ui/modal";
import ImageUpload from "@/components/global/image-upload";

const Client = ({ user }: { user: Users | null }) => {
  const { items, removeAll } = useCart();
  const router = useRouter();
  const [name, setName] = React.useState(user?.name || "");
  const [phone, setPhone] = React.useState(user?.phoneNumber || "");
  const [message, setMessage] = React.useState("");
  const [paymentOption, setPaymentOption] = React.useState("Gcash");
  const [showPolicyModal, setShowPolicyModal] = React.useState(false);
  const [showQRModal, setShowQRModal] = React.useState(false);
  const [showHowToModal, setShowHowToModal] = React.useState(false);
  const [acceptedPolicy, setAcceptedPolicy] = React.useState(false);
  const [proofOfPayment, setProofOfPayment] = React.useState("");
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  React.useEffect(() => {
    setShowHowToModal(true);
  }, []);

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!acceptedPolicy) {
      setShowPolicyModal(true);
      return;
    }

    if (!proofOfPayment) {
      toast.error("Please upload proof of payment.");
      return;
    }

    const orderNumber = `MarianHomeBakeShop-${Date.now()}`;
    const userId = user?.id;
    if (!userId) {
      toast.error("You must be logged in to place an order.");
      return;
    }

    const orderData = {
      userId,
      name,
      orderNumber,
      totalAmount: totalPrice,
      message,
      paymentOption,
      proofOfPayment,
      items: items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        image: item.image || "",
      })),
    };

    try {
      const res = await createOrder(orderData);
      if (res.success) {
        toast.success("Order created successfully!");
        removeAll();
        router.push(`/success`);
      } else {
        toast.error(res.error || "An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const getQRCodeImage = () => {
    if (paymentOption === "Gcash") {
      return "/gcash.png"; // Replace with your actual Gcash QR image path
    } else if (paymentOption === "Maya") {
      return "/maya.jpg"; // Replace with your actual Maya QR image path
    }
    return "";
  };

  return (
    <>
      {/* How To Modal */}
      <Modal
        className="max-w-2xl"
        isOpen={showHowToModal}
        onClose={() => setShowHowToModal(false)}
      >
        <div>
          <h2 className="text-2xl font-bold mb-4">
            How To Place & Pay For Your Order
          </h2>
          <div className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-lg mb-3 text-blue-800">
                GCash (Account Number)
              </h3>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  Open GCash and tap{" "}
                  <span className="font-semibold">
                    "Send via Account Number"
                  </span>
                  .
                </li>
                <li>Enter the store's GCash number (provided at checkout).</li>
                <li>
                  Input the <span className="font-semibold">exact amount</span>.
                </li>
                <li>
                  Add your <span className="font-semibold">Order ID/Name</span>{" "}
                  in notes.
                </li>
                <li>Confirm and screenshot the transaction.</li>
              </ol>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="font-semibold text-lg mb-3 text-green-800">
                PayMaya/Maya (QR Code)
              </h3>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  Tap <span className="font-semibold">"Scan QR"</span> in Maya
                  app.
                </li>
                <li>
                  Scan the{" "}
                  <span className="font-semibold">official QR code</span> from
                  checkout.
                </li>
                <li>
                  Enter the <span className="font-semibold">exact amount</span>.
                </li>
                <li>
                  Add your <span className="font-semibold">Order ID/Name</span>.
                </li>
                <li>Screenshot and submit proof.</li>
              </ol>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <h3 className="font-semibold text-lg mb-3 text-red-800">
                Security Reminders
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <span className="font-semibold">Never share</span> OTPs or
                  passwords.
                </li>
                <li>
                  Verify merchant name:{" "}
                  <span className="font-semibold">"MARIAN HOMEBKES"</span>.
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => setShowHowToModal(false)}>
              I Understand
            </Button>
          </div>
        </div>
      </Modal>

      {/* Policy Modal */}
      <Modal
        className="max-w-lg"
        isOpen={showPolicyModal}
        onClose={() => setShowPolicyModal(false)}
      >
        <div>
          <h2 className="text-xl font-bold mb-4">Marian Homebakes Policy</h2>
          <div className="space-y-4 mb-6 h-[40vh] overflow-y-auto">
            <div>
              <h3 className="font-semibold mb-2">1. Pickup Arrangements</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  Customers must first establish an internal agreement with
                  Marian Homebakes regarding the pickup schedule and details.
                </li>
                <li>
                  All orders are pickup only. Marian Homebakes does not offer
                  delivery services.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. Pickup Procedure</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  Customers must collect their order on the agreed date and
                  time.
                </li>
                <li>Delayed pickups may compromise product quality.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Limitation of Liability</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  Marian Homebakes is not liable for any damage after product
                  release.
                </li>
              </ul>
            </div>
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="acceptPolicy"
              checked={acceptedPolicy}
              onChange={(e) => setAcceptedPolicy(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="acceptPolicy" className="text-sm">
              I agree to Marian Homebakes' policies
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowPolicyModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (acceptedPolicy) {
                  setShowPolicyModal(false);
                } else {
                  toast.error("Please accept the policy to proceed");
                }
              }}
            >
              Proceed
            </Button>
          </div>
        </div>
      </Modal>

      {/* QR Code Modal */}
      <Modal isOpen={showQRModal} onClose={() => setShowQRModal(false)}>
        <div className="max-w-lg h-[80vh] overflow-y-auto text-center">
          <h2 className="text-xl font-bold mb-4">
            {paymentOption} Payment Details
          </h2>
          <div className="mb-4">
            <Image
              src={getQRCodeImage()}
              alt={`${paymentOption} QR Code`}
              width={300}
              height={300}
              className="mx-auto"
            />
          </div>
          <p className="mb-4">
            Please scan the QR code above to complete your payment.
          </p>
          <Button onClick={() => setShowQRModal(false)}>Done</Button>
        </div>
      </Modal>

      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Payment Form Section */}
        <form
          className="w-full lg:w-[60%] flex flex-col p-6 lg:pr-10 lg:pt-10 lg:pl-24 border-r bg-white"
          onSubmit={handlePayment}
        >
          <div className="flex justify-center lg:justify-start">
            <Image src="/assets/logo.png" alt="Logo" width={80} height={80} />
          </div>
          <h1 className="font-bold text-xl lg:text-2xl mt-3 mb-5 text-center lg:text-left">
            Payment Form
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Recipient's Phone Number"
              required
            />
          </div>

          <h3 className="mt-4 mb-2">Payment Option</h3>
          <RadioGroup value={paymentOption} onChangeAction={setPaymentOption}>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <OptionRadio
                className="p-4 w-full relative flex flex-col"
                value="Gcash"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 lg:w-10 lg:h-10">
                    <Image
                      src="/gcash-logo.jpeg"
                      alt="GCash Logo"
                      fill
                      className="object-cover w-full rounded-lg h-full"
                    />
                  </div>
                  <span className="font-semibold">GCash</span>
                </div>
                <p className="text-xs lg:text-sm mt-2">
                  Pay via GCash. Send payment to our GCash number or scan the QR
                  code.
                </p>
                <Button
                  type="button"
                  size="sm"
                  className="w-fit mt-2"
                  onClick={() => {
                    setPaymentOption("Gcash");
                    setShowQRModal(true);
                  }}
                >
                  View QR Code
                </Button>
              </OptionRadio>

              <OptionRadio
                className="p-4 w-full relative flex flex-col"
                value="Maya"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 lg:w-10 lg:h-10">
                    <Image
                      src="/maya-logo.png"
                      alt="Maya Logo"
                      fill
                      className="w-full object-contain rounded-lg h-full"
                    />
                  </div>
                  <span className="font-semibold">Maya</span>
                  <span className="bg-green-100 absolute top-2 right-2 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full ml-2">
                    Recommended
                  </span>
                </div>
                <p className="text-xs lg:text-sm mt-2">
                  Pay via Maya. Send payment to our Maya number or scan the QR
                  code.
                </p>
                <Button
                  type="button"
                  size="sm"
                  className="w-fit mt-2"
                  onClick={() => {
                    setPaymentOption("Maya");
                    setShowQRModal(true);
                  }}
                >
                  View QR Code
                </Button>
              </OptionRadio>
            </div>
          </RadioGroup>

          <Textarea
            className="mt-4 mb-4"
            placeholder="Message to the Admin (e.g. Allergies, with candles, etc.)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <ImageUpload
            defaultValue={proofOfPayment}
            onImageUpload={(setImage) => setProofOfPayment(setImage)}
            description="Upload proof of payment (required)"
          />

          <div className="flex flex-col-reverse sm:flex-row items-center justify-end mt-6 gap-3">
            <Button
              type="button"
              onClick={() => router.push("/cart")}
              variant="ghost"
              className="w-full sm:w-auto"
            >
              <ChevronLeft size={16} />
              Return to cart
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              Proceed to payment
            </Button>
          </div>
        </form>

        {/* Order Summary Section */}
        <div className="w-full lg:w-[40%] bg-zinc-200 p-6 lg:pl-10 lg:pt-10 lg:pr-14">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {items.map((item) => (
              <div
                className="flex items-center justify-between gap-4"
                key={item.id}
              >
                <div className="flex items-center gap-3">
                  <div className="relative lg:block hidden w-16 h-16 lg:w-20 lg:h-20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="w-full h-full rounded-md border object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm lg:text-base">
                      {item.name}
                    </p>
                    <p className="text-xs lg:text-sm line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-xs lg:text-sm text-[#251201] font-semibold">
                      Quantity: {item.quantity} pc(s)
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-sm lg:text-base">
                  ₱{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-gray-300 pt-4">
            <div className="flex justify-between items-center">
              <p className="font-bold">Total Price:</p>
              <p className="font-semibold text-lg">₱{totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Client;
