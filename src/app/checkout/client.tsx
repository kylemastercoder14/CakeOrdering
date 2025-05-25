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
      return "/gcash.jpg"; // Replace with your actual Gcash QR image path
    } else if (paymentOption === "Maya") {
      return "/maya.jpg"; // Replace with your actual Maya QR image path
    }
    return "";
  };

  return (
    <>
      {/* How To Modal - Add this at the beginning of your return statement */}
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
            {/* Payment Steps Section */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-lg mb-3 text-blue-800">
                How to Pay via QR Code (GCash or Maya)
              </h3>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                <li>Open your GCash or Maya app.</li>
                <li>
                  Tap <span className="font-semibold">"Scan QR"</span> or{" "}
                  <span className="font-semibold">"Upload QR"</span> if you
                  saved the code from the website.
                </li>
                <li>Scan or upload the owner's QR code shown at checkout.</li>
                <li>
                  Enter the{" "}
                  <span className="font-semibold">exact order amount</span>.
                </li>
                <li>
                  In the notes/message, write your{" "}
                  <span className="font-semibold">Order ID or Name</span>.
                </li>
                <li>
                  Tap <span className="font-semibold">"Pay"</span> to confirm.
                </li>
                <li>Take a screenshot of your payment confirmation.</li>
                <li>Send/upload the screenshot as proof of payment.</li>
              </ol>
              <div className="mt-3 p-3 bg-blue-100 rounded text-sm text-blue-800">
                <span className="font-semibold">📌 Important:</span> All orders
                are for pickup only. Payment must be completed within 24 hours.
              </div>
            </div>

            {/* Security Reminders Section */}
            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <h3 className="font-semibold text-lg mb-3 text-red-800 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Security Reminders (For Your Protection)
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  Only use the{" "}
                  <span className="font-semibold">official QR code</span>{" "}
                  provided by Marian Homebakes.
                </li>
                <li>
                  Verify the{" "}
                  <span className="font-semibold">merchant name</span> before
                  sending payment.
                </li>
                <li>
                  <span className="font-semibold">Never share your OTP</span>{" "}
                  (One-Time Password) with anyone — even if they claim to be
                  from GCash, Maya, or Marian Homebakes.
                </li>
                <li>
                  Do not share your{" "}
                  <span className="font-semibold">login credentials</span> or
                  personal details.
                </li>
                <li>
                  Keep a copy of your{" "}
                  <span className="font-semibold">payment confirmation</span>.
                </li>
                <li>
                  Payments must be completed{" "}
                  <span className="font-semibold">within 24 hours</span> to
                  confirm your order.
                </li>
                <li>
                  <span className="font-semibold">
                    All orders are for pickup only
                  </span>{" "}
                  — we don't offer delivery services.
                </li>
              </ul>
            </div>

            {/* Order Process Section */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">
                Order Confirmation Process
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                <div className="bg-white p-3 rounded border text-center">
                  <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-800 font-bold">1</span>
                  </div>
                  <p className="text-sm">
                    Complete payment with screenshot proof
                  </p>
                </div>
                <div className="bg-white p-3 rounded border text-center">
                  <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-800 font-bold">2</span>
                  </div>
                  <p className="text-sm">
                    Wait for payment verification (within 1-2 hours)
                  </p>
                </div>
                <div className="bg-white p-3 rounded border text-center">
                  <div className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-800 font-bold">3</span>
                  </div>
                  <p className="text-sm">Receive order confirmation via SMS</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowHowToModal(false)}>
              I Understand, Let's Continue
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
                  This agreement must be confirmed by Marian Homebakes prior to
                  checkout and payment.
                </li>
                <li>
                  All orders are pickup only. Marian Homebakes does not offer
                  delivery services under any circumstances.
                </li>
                <li>
                  Customers may assign an authorized representative to collect
                  the order on their behalf. This must be cleared and agreed
                  upon with Marian Homebakes during the internal arrangement
                  process.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. Pickup Procedure</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  Customers (or their authorized representatives) must collect
                  their order on the agreed date and time from the designated
                  Marian Homebakes location.
                </li>
                <li>
                  Delayed pickups beyond the scheduled time may compromise
                  product quality (e.g., melting frosting), and Marian Homebakes
                  will not be held responsible for such occurrences.
                </li>
                <li>
                  Upon pickup, the customer or representative is required to
                  inspect the order. Once the cake is accepted and the person
                  leaves the premises, it is deemed that the item has been
                  received in good condition.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Limitation of Liability</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  Marian Homebakes is not liable for any damage or deterioration
                  once the product has been released. This includes damage
                  caused by:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Mishandling during transport</li>
                    <li>Road or traffic conditions</li>
                    <li>Vehicle issues</li>
                    <li>Natural events</li>
                    <li>Improper storage during transit</li>
                  </ul>
                </li>
                <li>
                  Marian Homebakes is also not responsible for orders that are
                  not picked up within the agreed timeframe.
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
              I have read, understood, and agree to Marian Homebakes' policies
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
            Please scan the QR code above to complete your payment. Once payment
            is confirmed, we will process your order.
          </p>
          <Button
            onClick={() => {
              setShowQRModal(false);
            }}
          >
            Done
          </Button>
        </div>
      </Modal>

      <div className="h-screen flex items-center">
        <form
          className="w-[60%] flex flex-col pr-10 pt-10 pl-96 border-r h-screen bg-white"
          onSubmit={handlePayment}
        >
          <Image src="/assets/logo.png" alt="Logo" width={80} height={80} />
          <h1 className="font-bold text-2xl mt-3 mb-5">Payment Form</h1>
          <div className="grid lg:grid-cols-2 gap-4">
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
          <RadioGroup value={paymentOption} onChangeAction={setPaymentOption}>
            <h3 className="mt-4 mb-2">Payment Option</h3>
            <div className="flex items-center gap-4">
              <OptionRadio
                className="p-5 w-full relative flex flex-col"
                value="Gcash"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10">
                    <Image
                      src="/gcash-logo.jpeg"
                      alt="GCash Logo"
                      fill
                      className="object-cover w-full rounded-lg h-full"
                    />
                  </div>
                  <span className="font-semibold">GCash</span>
                  <span className="bg-green-100 absolute top-2 right-2 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full ml-2">
                    Recommended
                  </span>
                </div>
                <p className="text-sm mt-2">
                  Pay via GCash. Send payment to our GCash number or scan the QR
                  code.
                </p>
                <Button
                  type="button"
                  size="sm"
                  className="w-fit"
                  onClick={() => {
                    setPaymentOption("Gcash");
                    setShowQRModal(true);
                  }}
                >
                  View QR Code
                </Button>
              </OptionRadio>
              <OptionRadio
                className="p-5 w-full relative flex flex-col"
                value="Maya"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10">
                    <Image
                      src="/maya-logo.png"
                      alt="Maya Logo"
                      fill
                      className="w-full object-contain rounded-lg h-full"
                    />
                  </div>
                  <span className="font-semibold">Maya</span>
                </div>
                <p className="text-sm mt-2">
                  Pay via Maya. Send payment to our Maya number or scan the QR
                  code.
                </p>
                <Button
                  type="button"
                  size="sm"
                  className="w-fit"
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
            description="Upload proof of payment (required for Gcash and Maya payments)"
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
            <Button type="submit">Proceed to payment</Button>
          </div>
        </form>
        <div className="w-[40%] bg-zinc-200 h-screen flex flex-col pl-10 pt-10 pr-14">
          {items.map((item) => (
            <div
              className="flex items-center justify-between mb-6"
              key={item.id}
            >
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
            </div>
          ))}
          <div className="flex justify-between items-center mt-8">
            <p className="font-bold">Total Price:</p>
            <p className="font-semibold">₱{totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Client;
