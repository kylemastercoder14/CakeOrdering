import React from "react";
import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";

const PromotionBanner = async () => {
  const data = await db.promotions.findFirst();
  return (
    <>
      <div className="lg:px-[200px] px-10 pt-24">
        <h1 className="text-center text-4xl font-sans text-[#251201] font-bold">
          Discount & Bulk Order
        </h1>
        <div className="relative mt-10 w-full h-[40vh]">
          <Image
            src={data?.imageUrl as string}
            alt="Promotion"
            fill
            className="w-full h-full rounded-md object-cover"
          />
          <div className="absolute inset-0">
            <div className="flex lg:flex-row flex-col items-center justify-center lg:gap-10 gap-5 lg:px-20 px-10 h-full">
              <div className="lg:w-[20%]">
                <ShoppingCartIcon className="text-[#D0F2B7] text-center lg:mx-0 mx-auto lg:mb-10 mb-5 lg:size-40 size-10" />
                <Button size="lg" variant="outline">
                  <Link href="/products">Book your order now</Link>
                </Button>
              </div>
              <div className="lg:w-[30%] lg:border-[4px] border-2 flex flex-col items-center justify-center lg:p-5 p-2 border-[#D0F2B7]">
                <p className="text-[#D0F2B7] lg:text-2xl text-sm">UP TO</p>
                <p className="text-white lg:text-8xl text-base font-semibold lg:border-b-[5px] border-b-2 border-white">
                  {data?.discount}%
                </p>
                <p className="text-white lg:text-8xl text-base font-semibold lg:border-b-[5px] border-b-2 border-white">
                  OFF
                </p>
                <p className="text-[#D0F2B7] lg:text-2xl text-sm">any occasional</p>
              </div>
              <div className="lg:w-[50%]">
                <p className="uppercase font-semibold text-center lg:text-4xl text-base text-[#D0F2B7]">
                  {data?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#194917D4] w-full h-[40vh] -mt-60"></div>
    </>
  );
};

export default PromotionBanner;
