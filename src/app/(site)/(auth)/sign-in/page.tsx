
"use client";

import React from "react";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import SigninForm from '@/components/forms/sign-in-form';
// import { useSignIn } from "@clerk/nextjs";
// import { OAuthStrategy } from "@clerk/types";

const Page = () => {
//   const { signIn } = useSignIn();
//   if (!signIn) return null;

//   const signInWith = async (strategy: OAuthStrategy) => {
// 	try {
// 	  const res = await signIn.authenticateWithRedirect({
// 		strategy,
// 		redirectUrl: "/sign-up/sso-callback",
// 		redirectUrlComplete: "/",
// 	  });
// 	  console.log(res);
// 	} catch (err) {
// 	  // See https://clerk.com/docs/custom-flows/error-handling
// 	  // for more info on error handling
// 	  if (err instanceof Error) {
// 		console.log((err as any).errors);
// 	  }
// 	  console.error(err, null, 2);
// 	}
//   };
  return (
	<div className="flex p-5 flex-col items-center w-full bg-[#D0F2B7] h-screen justify-center">
	  <Button
		// onClick={() => signInWith("oauth_google")}
		size="lg"
		className="lg:px-40"
	  >
		<Image
		  src="/assets/google.svg"
		  alt="Google"
		  className="mr-10"
		  width={25}
		  height={25}
		/>
		Continue with Google
	  </Button>
	  <p className="mt-5 mb-5">OR</p>
	  <div className="bg-white shadow lg:w-1/2 w-full p-5 rounded-md">
		<h2 className="text-xl font-semibold">Welcome back</h2>
		<SigninForm />
	  </div>
	</div>
  );
};

export default Page;
