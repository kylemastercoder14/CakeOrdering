"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="relative w-full mt-20 h-screen overflow-hidden">
      <Image
        src="/assets/bg.png"
        alt="Background"
        fill
        className="w-full h-full"
      />
      <div className="absolute w-full h-full inset-0 bg-black/30"></div>
      <div className="absolute flex items-center gap-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <Button
          onClick={() => router.push("/customization/theme")}
          className="mt-5 bg-[#C3DCAA] text-black hover:bg-[#C3DCAA] h-20 rounded-xl text-3xl"
          size="lg"
        >
          Customize your cake
          <Image src="/cursor.png" alt="Cursor" width={80} height={80} />
        </Button>
      </div>
    </div>
  );
};

export default Hero;
