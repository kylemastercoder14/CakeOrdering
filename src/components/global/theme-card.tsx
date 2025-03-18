"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { useCustomizationStore } from "@/hooks/use-customization-store";
import { useRouter } from "next/navigation";

const ThemeCard = ({
  title,
  description,
  image,
  color,
}: {
  title: string;
  description: string;
  image: string;
  color: string;
}) => {
  const router = useRouter();
  const setTheme = useCustomizationStore((state) => state.setTheme);

  const colorClasses: { [key: string]: string } = {
    pink: "bg-pink-200",
    blue: "bg-blue-200",
    purple: "bg-purple-200",
    green: "bg-green-200",
    yellow: "bg-yellow-200",
    orange: "bg-orange-200",
    gray: "bg-gray-200",
    red: "bg-red-200",
    indigo: "bg-indigo-200",
  };
  return (
    <div
      className={`rounded-md gap-2 ${
        colorClasses[color] || "bg-gray-200"
      }`}
    >
      <div className="relative w-full h-80">
        <Image
          src={image}
          alt={title}
          className="w-full rounded-t-md h-full object-cover"
          fill
        />
      </div>
      <div className="p-4">
        <h1 className="text-3xl font-bold font-serif">{title}</h1>
        <p className="mt-1.5">{description}</p>
        <Button
          className="mt-5"
          onClick={() => {
            setTheme(title);
            setTimeout(() => {
              router.push("/customization/create");
            }, 1200);
          }}
        >
          Continue &rarr;
        </Button>
      </div>
    </div>
  );
};

export default ThemeCard;
