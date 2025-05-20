/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCustomizationStore } from "@/hooks/use-customization-store";
import axios from "axios";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    deliveryDate: "",
    deliveryAddress: "",
  });

  const {
    size,
    selectedTheme,
    shape,
    layers,
    type,
    additionalNotes,
    color,
    generatedImage,
  } = useCustomizationStore();

  const handleSubmit = async () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast.error("Please fill in all required customer information");
      return;
    }

    if (!generatedImage) {
      toast.error("Please generate a cake design first");
      return;
    }

    setIsSubmitting(true);
    try {
      const price = calculatePrice();

      const payload = {
        theme: selectedTheme || "",
        size: size || "",
        shape: shape || "Round",
        layers: layers || "Single-Tier",
        flavor: color || "Vanilla",
        icingType: type || "Icing",
        additionalNotes: additionalNotes || "",
        imageUrl: generatedImage,
        price: price.toString(),
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        deliveryDate: customerInfo.deliveryDate || null,
        deliveryAddress: customerInfo.deliveryAddress || "",
      };

      const response = await axios.post("/api/cakes", payload);

      if (response.status === 201) {
        toast.success(
          `Order submitted successfully! Remaining customizations: ${response.data.remainingCustomizations}`
        );
        router.push("/success");
      } else {
        throw new Error(response.data.error || "Failed to submit order");
      }
    } catch (error: any) {
      if (error.response) {
        // Handle specific error cases
        switch (error.response.status) {
          case 403:
            toast.error(
              `No customizations left. You have used all 3 available.`
            );
            break;
          case 401:
            toast.error("Please sign in to submit an order");
            break;
          case 404:
            toast.error("User account not found - please contact support");
            break;
          case 400:
            toast.error(
              `Missing required fields: ${error.response.data.missingFields?.join(
                ", "
              )}`
            );
            break;
          default:
            toast.error(error.response.data.error || "Failed to submit order");
        }
      } else {
        toast.error("Network error - please try again");
      }
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculatePrice = () => {
    // Simple pricing logic - adjust as needed
    let basePrice = 300;
    if (size === "12x18") basePrice += 200;
    if (size === "18x24") basePrice += 400;
    if (layers.includes("Two")) basePrice += 250;
    if (layers.includes("Three")) basePrice += 500;
    if (layers.includes("Multi")) basePrice += 750;
    if (type === "Fondant") basePrice += 300;
    return basePrice;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Review Your Custom Cake
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cake Details Section */}
        <div className="space-y-6">
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="text-xl">Your Cake Design</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedImage ? (
                <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    src={generatedImage}
                    alt="Custom Cake Design"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                  No preview available
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Label>Theme</Label>
                  <Input value={selectedTheme ?? ""} readOnly />
                </div>
                <div>
                  <Label>Size</Label>
                  <Input value={size} readOnly />
                </div>
                <div>
                  <Label>Shape</Label>
                  <Input value={shape} readOnly />
                </div>
                <div>
                  <Label>Layers</Label>
                  <Input value={layers} readOnly />
                </div>
                <div>
                  <Label>Flavor</Label>
                  <Input value={color} readOnly />
                </div>
                <div>
                  <Label>Icing Type</Label>
                  <Input value={type} readOnly />
                </div>
              </div>

              <div className="mt-4">
                <Label>Additional Notes</Label>
                <Textarea
                  value={additionalNotes || "None"}
                  readOnly
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Information Section */}
        <div className="space-y-6">
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="text-xl">Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryDate">Delivery/Pickup Date</Label>
                  <Input
                    id="deliveryDate"
                    name="deliveryDate"
                    type="date"
                    value={customerInfo.deliveryDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryAddress">Delivery Address</Label>
                  <Textarea
                    id="deliveryAddress"
                    name="deliveryAddress"
                    value={customerInfo.deliveryAddress}
                    onChange={handleInputChange}
                    placeholder="123 Main St, City, State ZIP"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Base Cake</span>
                  <span>₱300.00</span>
                </div>
                {size === "12x18" && (
                  <div className="flex justify-between">
                    <span>Size Upgrade (Half Sheet)</span>
                    <span>₱200.00</span>
                  </div>
                )}
                {size === "18x24" && (
                  <div className="flex justify-between">
                    <span>Size Upgrade (Full Sheet)</span>
                    <span>₱400.00</span>
                  </div>
                )}
                {layers.includes("Two") && (
                  <div className="flex justify-between">
                    <span>Two-Tier Upgrade</span>
                    <span>₱250.00</span>
                  </div>
                )}
                {layers.includes("Three") && (
                  <div className="flex justify-between">
                    <span>Three-Tier Upgrade</span>
                    <span>₱500.00</span>
                  </div>
                )}
                {layers.includes("Multi") && (
                  <div className="flex justify-between">
                    <span>Multi-Tier Upgrade</span>
                    <span>₱750.00</span>
                  </div>
                )}
                {type === "Fondant" && (
                  <div className="flex justify-between">
                    <span>Fondant Icing</span>
                    <span>₱300.00</span>
                  </div>
                )}
                <div className="border-t border-gray-200 my-2"></div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₱{calculatePrice().toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full mt-6"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Submit Order
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
