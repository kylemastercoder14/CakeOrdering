import React from "react";
import ForgotPasswordForm from "@/components/forms/forgot-password-form";

const Page = () => {
  return (
    <div className="flex flex-col p-5 items-center w-full bg-[#D0F2B7] h-screen justify-center">
      <div className="bg-white shadow lg:w-1/2 w-full p-5 rounded-md">
        <h2 className="text-xl font-semibold">Forgot Password</h2>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default Page;
