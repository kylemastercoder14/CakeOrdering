"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="relative w-full mt-20 h-[80vh] md:h-screen overflow-hidden">
      <Image
        src="/bg.png"
        alt="Delicious cake background"
        fill
        className="w-full h-full object-cover"
        priority
      />
      <div className="absolute w-full h-full inset-0 bg-gradient-to-t from-black/60 to-black/30"></div>

      <div className="absolute flex flex-col items-start justify-center gap-4 md:gap-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-4 sm:px-6 md:px-8">
        <h3 className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl bg-clip-text text-transparent bg-gradient-to-br from-white to-green-300 py-2 md:py-4 leading-tight">
          Marian Homebakes: <br />
          <span className="text-transparent bg-gradient-to-r from-green-300 to-yellow-200 bg-clip-text">
            Elegance You Can Taste
          </span>
        </h3>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-md sm:max-w-xl md:max-w-2xl">
          Handcrafted with love, our cakes blend exquisite flavors with stunning
          designs to make your special moments unforgettable.
        </p>

        <Button
          onClick={() => router.push("/customization/theme")}
          className="mt-4 md:mt-8 bg-gradient-to-br from-[#C3DCAA] to-[#8BA872] text-black hover:from-[#A8C58F] hover:to-[#6B8A56] h-12 sm:h-16 md:h-20 px-6 sm:px-8 md:px-10 rounded-xl md:rounded-2xl text-lg sm:text-xl md:text-2xl font-semibold shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-white/20 relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center gap-2 sm:gap-3">
            Customize your cake
            <Image
              src="/cursor.png"
              alt="Cursor"
              width={24}
              height={24}
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:translate-x-2"
            />
          </span>
          <span className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-opacity duration-300"></span>
        </Button>
      </div>
    </div>
  );
};

export default Hero;
