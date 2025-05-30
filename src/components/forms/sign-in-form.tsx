"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginValidation } from "@/validators/user";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useSignIn } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const SigninForm = () => {
  const { signIn, isLoaded, setActive } = useSignIn();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof LoginValidation>) => {
    if (!isLoaded) return;
    try {
      const signInAttempt = await signIn.create({
        identifier: values.email,
        password: values.password,
      });
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        toast.success("Sign in successful.");
        router.push("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (!isLoaded) {
    return null;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  disabled={isSubmitting}
                  placeholder="Enter your email address"
                  className="text-white border-white placeholder:text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-white">Password</FormLabel>
                <Link
                  href="/forgot-password"
                  className="text-sm text-white hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    disabled={isSubmitting}
                    placeholder="Enter your password"
                    className="text-white border-white placeholder:text-white pr-10"
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-60 mx-auto flex items-center justify-center"
          disabled={isSubmitting}
          type="submit"
        >
          Sign In
        </Button>
        <div className="flex gap-1 justify-center items-center">
          <p className="text-white">Don&apos;t have an account?</p>
          <Link href="/sign-up" className="hover:underline text-white">
            Sign up
          </Link>
        </div>
      </form>
      <div
        className="flex items-center justify-center mx-auto text-center mt-3"
        id="clerk-captcha"
      ></div>
    </Form>
  );
};

export default SigninForm;
