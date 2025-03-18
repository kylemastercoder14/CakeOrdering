"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { CheckIcon } from 'lucide-react';

const SuccessPage = () => {
  const { removeAll } = useCart();
  const onRemove = () => {
	removeAll();
	window.location.href = '/';
  }
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className='flex items-center justify-center size-40 rounded-full bg-[#B3CD92]'>
		<CheckIcon size={60} />
	  </div>
      <h1 className="font-semibold text-xl mt-4">Your payment is successful</h1>
      <p className="text-muted-foreground mt-1 mb-5">
        Thank you for your payment and trust with Marian&apos;s Homebakeshop.
      </p>
      <Button onClick={onRemove}>Back to homepage &rarr;</Button>
    </div>
  );
};

export default SuccessPage;
