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
    <div className="flex flex-col items-center w-full p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24 lg:pt-28">
      <div className="bg-[#375534] shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 sm:p-8 rounded-lg">
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
          New Registration
        </h2>
        <SignupForm
          termsOfService={termsOfService}
          privacyPolicy={privacyPolicy}
        />
      </div>
    </div>
  );
};

export default Page;