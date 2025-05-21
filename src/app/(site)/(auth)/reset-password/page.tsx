import React from "react";
import ResetPasswordForm from "@/components/forms/reset-password-form";

const Page = () => {
  return (
	<div className="flex flex-col p-5 items-center w-full bg-[#D0F2B7] h-screen justify-center">
	  <div className="bg-white shadow lg:w-1/2 w-full p-5 rounded-md">
		<h2 className="text-xl font-semibold">Reset Password</h2>
		<ResetPasswordForm />
	  </div>
	</div>
  );
};

export default Page;
