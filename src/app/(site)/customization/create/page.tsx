"use client";

import { Label } from "@/components/ui/label";
import { useCustomizationStore } from "@/hooks/use-customization-store";
import { Radio, RadioGroup } from "@headlessui/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const sizes = [
  { name: "Quarter Sheet", value: "9x13" },
  { name: "Half Sheet", value: "12x18" },
  { name: "Full Sheet", value: "18x24" },
];

const shapes = ["Round", "Rectangle"];
const flavors = [
  "Chocolate",
  "Mocha",
  "Caramel",
  "Vanilla",
  "Strawberry",
  "Ube",
  "Pandan",
  "Red Velvet",
  "Lemon",
  "Matcha",
  "Coffee",
  "Mango",
];
const icingTypes = ["Icing"];
const layersOption = ["Single-Tier", "Two-Tier", "Three-Tier"];

const flavorColors = {
  Chocolate: "#7B3F00",
  Mocha: "#6F4E37",
  Caramel: "#D2691E",
  Vanilla: "#F3E5AB",
  Strawberry: "#FF69B4",
  Ube: "#6A0DAD",
  Pandan: "#A8D5BA",
  "Red Velvet": "#8B0000",
  Lemon: "#FFFACD",
  Matcha: "#A8B400",
  Coffee: "#4B3621",
  Mango: "#FFB300",
};

const Customization = () => {
  const [loading, setLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const router = useRouter();
  const {
    size,
    selectedTheme,
    shape,
    layers,
    type,
    additionalNotes,
    dedication,
    color,
    generatedImage,
    setSize,
    setShape,
    setLayers,
    setType,
    setColor,
    setAdditionalNotes,
    setGeneratedImage,
    setDedication,
  } = useCustomizationStore();

  const generateCake = async () => {
    const customizationData = {
      size,
      selectedTheme,
      shape,
      layers,
      type,
      color,
      additionalNotes,
    };
    setLoading(true);
    const prompt = `Generate a ${size} ${shape} wedding cake with ${layers} layers, ${type}, and ${color} flavor. Theme: ${selectedTheme}. Please include also the following notes: ${additionalNotes}`;
    const options = {
      method: "POST",
      url: "https://ai-text-to-image-generator-api.p.rapidapi.com/realistic",
      headers: {
        "x-rapidapi-key": "557b91e9fcmshdc8451bcbfd8106p18f760jsn1fb6a1656ead",
        "x-rapidapi-host": "ai-text-to-image-generator-api.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        inputs: prompt,
      },
    };

    try {
      const res = await axios.request(options);
      // Use the setter from the store
      setGeneratedImage(res?.data.url);
      toast.success("Cake design generated.");

      // Store data in localStorage
      const finalData = {
        ...customizationData,
        generatedImage: res?.data.url,
      };
      localStorage.setItem("customizationData", JSON.stringify(finalData));
      setIsGenerated(true);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          `API Error: ${error.response?.data?.message || error.message}`
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative mt-10 grid grid-cols-1 lg:grid-cols-3 pb-10">
      {/* Left Side: Cake Preview */}
      <div className="relative h-[34.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-black/30 p-5 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
        <div className="relative bg-opacity-50 pointer-events-none w-full h-full">
          {loading ? (
            <div className="text-center flex items-center justify-center h-full text-black">
              Generating cake preview...
            </div>
          ) : generatedImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={generatedImage}
              alt="Generated Cake Preview"
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />
          ) : (
            <div className="text-center flex items-center justify-center h-full text-black">
              No preview available
            </div>
          )}
        </div>
      </div>

      {/* Right Side: Customization Form */}
      <div className="h-[34.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white">
        <ScrollArea className="relative flex-1 overflow-y-auto">
          <div
            aria-hidden="true"
            className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
          />
          <div className="px-8 pb-12 pt-8">
            <h2 className="tracking-tight font-bold text-2xl">
              Customize your cake
            </h2>
            <div className="w-full h-px bg-zinc-200 my-6" />
            <div className="mt-4 space-y-1">
              <Label>Theme</Label>
              <Input disabled value={selectedTheme || "No Theme Selected"} />
            </div>
            {/* Size Selection */}
            <div className="mt-4 space-y-1">
              <Label>Size: {size}</Label>
              <Select defaultValue={size} onValueChange={setSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.name} ({s.value}&quot;)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Layer Selection */}
            <div className="mt-4 space-y-1">
              <Label>Variant: {layers}</Label>
              <Select defaultValue={layers} onValueChange={setLayers}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
                <SelectContent>
                  {layersOption.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l} ({l}&quot;)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Shape Selection */}
            <RadioGroup value={shape} onChange={setShape}>
              <div className="mt-5 space-y-2">
                <Label>Shape: {shape}</Label>
                <div className="flex flex-col space-y-2.5">
                  {shapes.map((shape) => (
                    <Radio
                      key={shape}
                      value={shape}
                      className={({ checked, focus }) =>
                        cn(
                          "relative flex cursor-pointer items-center rounded-md p-2 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border border-zinc-400",
                          {
                            [`border-green-600 text-green-700`]:
                              focus || checked,
                          }
                        )
                      }
                    >
                      <span className="flex flex-col text-sm">{shape}</span>
                    </Radio>
                  ))}
                </div>
              </div>
            </RadioGroup>

            {/* Flavor Selection */}
            <RadioGroup value={color} onChange={setColor}>
              <div className="mt-5 space-y-4">
                <Label>Flavor: {color}</Label>
                <div className="grid lg:grid-cols-6 grid-cols-1 gap-4">
                  {flavors.map((flavor) => (
                    <Radio
                      key={flavor}
                      value={flavor}
                      className={({ checked, focus }) =>
                        cn(
                          "relative -mt-3 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border border-transparent",
                          {
                            [`border-black/80`]: focus || checked,
                          }
                        )
                      }
                    >
                      <span
                        className={cn(
                          "h-7 w-7 rounded-full border border-black border-opacity-10"
                        )}
                        style={{
                          backgroundColor:
                            flavorColors[flavor as keyof typeof flavorColors],
                        }}
                      />
                    </Radio>
                  ))}
                </div>
              </div>
            </RadioGroup>

            {/* Icing/Fondant Selection */}
            <div className="mt-4 space-y-1">
              <Label>Type: {type}</Label>
              <Select disabled defaultValue={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {icingTypes.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Additional notes */}
            <div className="mt-4 space-y-1">
              <Label>Additional notes: (For AI)</Label>
              <Textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="h-24"
                placeholder='Add any additional notes here. (e.g. "Allergies, dietary restrictions, gender, characters etc.")'
              />
            </div>
            <div className="mt-4 space-y-1">
              <Label>Dedication: (optional)</Label>
              <Textarea
                value={dedication}
                onChange={(e) => setDedication?.(e.target.value)}
                placeholder='Add any dedication here. (e.g. "Happy Birthday, John!")'
              />
            </div>
          </div>
        </ScrollArea>
        <div className="w-full px-8 h-16 bg-white">
          <div className="h-px w-full bg-zinc-200" />

          <div className="w-full h-full flex justify-end items-center">
            <div className="w-full flex gap-2 items-center">
              <Button
                onClick={() => router.push("/customization/theme")}
                size="sm"
                variant="secondary"
                className="w-full"
              >
                <ArrowLeft className="h-4 w-4 ml-1.5 inline" />
                Previous
              </Button>
              {isGenerated ? (
                <Button
                  onClick={() => router.push("/customization/review")}
                  size="sm"
                  className="w-full"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-1.5 inline" />
                </Button>
              ) : (
                <Button
                  disabled={loading}
                  onClick={generateCake}
                  size="sm"
                  className="w-full"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-1.5 inline" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customization;
