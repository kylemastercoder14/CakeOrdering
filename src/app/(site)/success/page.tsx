"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

const SuccessPage = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="flex items-center justify-center size-40 rounded-full bg-[#B3CD92]">
        <CheckIcon size={60} />
      </div>
      <h1 className="font-semibold text-xl mt-4">Your transaction is successful</h1>
      <p className="text-muted-foreground mt-1 mb-5">
        Thank you for your transaction and trust with Marian&apos;s Homebakeshop. We
        will notify you once your transaction is ready.
      </p>
      <Button onClick={() => (window.location.href = "/")}>
        Back to homepage &rarr;
      </Button>
    </div>
  );
};

export default SuccessPage;
