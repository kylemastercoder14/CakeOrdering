import React from "react";
import SignupForm from "@/components/forms/sign-up-form";

const Page = () => {
  return (
    <div className="flex flex-col items-center w-full bg-[#D0F2B7] h-screen justify-center">
      <div className="bg-white shadow w-1/2 p-5 rounded-md">
        <h2 className="text-xl font-semibold">New Registration</h2>
        <SignupForm />
      </div>
    </div>
  );
};

export default Page;
