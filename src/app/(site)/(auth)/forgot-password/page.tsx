import React from "react";
import ForgotPasswordForm from "@/components/forms/forgot-password-form";

const Page = () => {
  return (
    <div className="flex flex-col p-5 items-center w-full h-screen justify-center">
      <div className="bg-[#375534] shadow lg:w-1/2 w-full p-5 rounded-md">
        <h2 className="text-xl text-white font-semibold">Forgot Password</h2>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default Page;
