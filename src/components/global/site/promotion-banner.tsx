import React from "react";
import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { Button } from '../../ui/button';
import { ShoppingCartIcon } from 'lucide-react';

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
            <div className="flex items-center justify-center gap-10 px-20 h-full">
              <div className="w-[20%]">
				<ShoppingCartIcon className='text-[#D0F2B7] mb-10 size-40' />
				<Button size="lg" variant="outline">Book your order now</Button>
			  </div>
              <div className="w-[30%] border-[4px] flex flex-col items-center justify-center p-5 border-[#D0F2B7]">
                <p className="text-[#D0F2B7] text-2xl">UP TO</p>
                <p className="text-white text-8xl font-semibold border-b-[5px] border-white">
                  {data?.discount}%
                </p>
                <p className="text-white text-8xl font-semibold border-b-[5px] border-white">
                  OFF
                </p>
                <p className="text-[#D0F2B7] text-2xl">any occasional</p>
              </div>
              <div className="w-[50%]">
                <p className="uppercase font-semibold text-center text-4xl text-[#D0F2B7]">
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
