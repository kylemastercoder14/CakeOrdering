"use client";

import Image from "next/image";
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Admin = () => {
  const router = useRouter();
  return (
    <div className="relative w-full flex items-center justify-center h-screen bg-[#77AD77] p-5">
      <div className="bg-[#CCE3AD] flex flex-col items-center justify-center border border-[#452E19] pb-16 p-5 lg:w-1/2 w-full rounded-[50px] shadow-xl">
        <Image src="/assets/logo.png" alt="Logo" width={200} height={200} />
        <form className="w-full max-w-xl">
          <div className="space-y-1.5 flex flex-col">
            <Label className="text-[#452E19] font-semibold">
              Enter your email address:
            </Label>
            <input
              type="email"
              className="border-t-0 border-b border-[#452E19] outline-none bg-transparent"
            />
          </div>
          <div className="space-y-1.5 mt-10 flex flex-col">
            <Label className="text-[#452E19] font-semibold">
              Enter your password:
            </Label>
            <input
              type="password"
              className="border-t-0 border-b border-[#452E19] outline-none bg-transparent"
            />
          </div>
          <Button
            type="button"
            onClick={() => {
              toast.success("Login successful");
              setTimeout(() => {
                router.push("/admin/dashboard");
              }, 1500);
            }}
            className="w-full mt-10"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
