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
        src="/bg.png"
        alt="Delicious cake background"
        fill
        className="w-full h-full object-cover"
        priority
      />
      <div className="absolute w-full h-full inset-0 bg-gradient-to-t from-black/60 to-black/30"></div>

      <div className="absolute flex flex-col items-start justify-center gap-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-8">
        <h3 className="font-black text-4xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-br from-white to-green-300 py-4 leading-tight">
          Marian Homebakes: <br />
          <span className="text-transparent bg-gradient-to-r from-green-300 to-yellow-200 bg-clip-text">
            Elegance You Can Taste
          </span>
        </h3>

        <p className="text-lg md:text-xl text-white/90 max-w-2xl">
          Handcrafted with love, our cakes blend exquisite flavors with stunning
          designs to make your special moments unforgettable.
        </p>

        <Button
          onClick={() => router.push("/customization/theme")}
          className="mt-8 bg-gradient-to-br from-[#C3DCAA] to-[#8BA872] text-black hover:from-[#A8C58F] hover:to-[#6B8A56] h-20 px-10 rounded-2xl text-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-white/20 relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center gap-3">
            Customize your cake
            <Image
              src="/cursor.png"
              alt="Cursor"
              width={40}
              height={40}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </span>
          <span className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-opacity duration-300"></span>
        </Button>
      </div>
    </div>
  );
};

export default Hero;
