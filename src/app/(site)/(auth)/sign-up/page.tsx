import React from "react";
import SignupForm from "@/components/forms/sign-up-form";
import db from "@/lib/db";

const Page = async () => {
  const privacyPolicy = await db.policies.findFirst({
    where: { title: "Privacy Policy" },
  });

  const termsOfService = await db.policies.findFirst({
    where: { title: "Terms & Conditions" },
  });

  return (
    <div className="flex flex-col p-5 items-center w-full overflow-y-auto h-screen justify-center">
      <div className="bg-[#375534] shadow lg:w-1/2 w-full p-5 rounded-md lg:mt-10 mt-[480px]">
        <h2 className="text-xl font-semibold text-white">New Registration</h2>
        <SignupForm termsOfService={termsOfService} privacyPolicy={privacyPolicy} />
      </div>
    </div>
  );
};

export default Page;
