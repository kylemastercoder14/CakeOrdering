"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SigninForm from "@/components/forms/sign-in-form";
import { useSignIn, useUser } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import { toast } from "sonner";
import { createOAuthUser } from "@/actions/user";

const Page = () => {
  const { signIn } = useSignIn();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({
    google: false,
  });

  if (!signIn) return null;

  const signInWith = async (strategy: OAuthStrategy) => {
    setIsLoading((prev) => ({ ...prev, [strategy]: true }));
    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });

      // After successful authentication, create user in database
      if (user) {
        const result = await createOAuthUser({
          clerkId: user.id,
          name:
            user.fullName ||
            `${user.firstName} ${user.lastName}` ||
            "Google User",
          email: user.primaryEmailAddress?.emailAddress || "",
          imageUrl: user.imageUrl,
        });

        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success("Successfully signed in with Google");
        }
      }
    } catch (err) {
      setIsLoading((prev) => ({ ...prev, [strategy]: false }));
      console.error("Authentication error:", err);
      toast.error("Authentication failed. Please try again.");
    }
  };

  return (
    <div className="flex p-5 flex-col items-center max-w-4xl mx-auto w-full h-screen overflow-y-auto justify-center">
      <div
        id="clerk-captcha"
        className="my-4 min-h-[78px] w-full max-w-md"
      ></div>
      <Button
        onClick={() => signInWith("oauth_google")}
        size="lg"
        className=""
        disabled={isLoading.google}
      >
        {isLoading.google ? (
          "Loading..."
        ) : (
          <>
            <Image
              src="/assets/google.svg"
              alt="Google"
              className="lg:mr-5 mr-2"
              width={20}
              height={20}
            />
            Continue with Google
          </>
        )}
      </Button>
      <p className="mt-5 mb-5">OR</p>
      <div className="bg-[#375534] shadow w-full p-5 rounded-lg">
        <h2 className="text-xl text-white font-semibold">Welcome back</h2>
        <SigninForm />
      </div>
    </div>
  );
};

export default Page;
