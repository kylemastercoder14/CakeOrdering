import React from "react";
import Image from "next/image";
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Image
        src="/assets/bg.png"
        alt="Background"
        fill
        className="w-full object-cover h-full"
      />
      <div className="absolute w-full h-full inset-0 bg-black/50"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="lg:text-6xl lg:w-full w-[700px] text-5xl font-bold text-white">
          Turning your sweetest dreams into beautifully customized cakes for
          every occasion.
        </h1>
        <Button className="mt-5" size="lg">
          Learn More &rarr;
        </Button>
      </div>
    </div>
  );
};

export default Hero;
