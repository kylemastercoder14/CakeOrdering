"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const PromotionBanner = () => {
  const router = useRouter();
  return (
    <>
      <div className="lg:px-[200px] px-10 pt-24">
        <h1 className="text-center text-4xl font-sans text-[#251201] font-semibold">
          Discount & Bulk Order
        </h1>
        <div onClick={() => router.push("/products")} className="relative shadow-2xl cursor-pointer mt-10 w-full h-[50vh]">
          <Image
            src={"/assets/promo.png"}
            alt="Promotion"
            fill
            className="w-full h-full rounded-md object-cover shadow-xl"
          />
        </div>
      </div>
      <div className="bg-white w-full h-[40vh] -mt-60"></div>
    </>
  );
};

export default PromotionBanner;
