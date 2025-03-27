"use client";

import Image from "next/image";
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginStaff } from "@/actions/staff";

const Admin = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginStaff(email, password);

      if (res.success) {
        toast.success(res.success);
        if (res.data.role === "Rider") {
          router.push("/admin/order-management");
        } else {
          router.push("/admin/dashboard");
        }
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative w-full flex items-center justify-center h-screen bg-[#77AD77] p-5">
      <div className="bg-[#CCE3AD] flex flex-col items-center justify-center border border-[#452E19] pb-16 p-5 lg:w-1/2 w-full rounded-[50px] shadow-xl">
        <Image src="/assets/logo.png" alt="Logo" width={200} height={200} />
        <form onSubmit={onSubmit} className="w-full max-w-xl">
          <div className="space-y-1.5 flex flex-col">
            <Label className="text-[#452E19] font-semibold">
              Enter your email address:
            </Label>
            <input
              type="email"
              disabled={loading}
              className="border-t-0 border-b border-[#452E19] outline-none bg-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1.5 mt-10 flex flex-col">
            <Label className="text-[#452E19] font-semibold">
              Enter your password:
            </Label>
            <input
              type="password"
              disabled={loading}
              className="border-t-0 border-b border-[#452E19] outline-none bg-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full mt-10">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
