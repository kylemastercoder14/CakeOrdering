"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;

const ResetPasswordForm = () => {
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const email = searchParams.get("email");
  const code = searchParams.get("code");

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleResetPassword = async (values: ResetPasswordFormValues) => {
    if (!isLoaded || !signIn || !email || !code) {
      toast.error("Invalid reset request");
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: values.password,
      });

      if (result.status === "complete") {
        toast.success("Password updated successfully");
        router.push("/sign-in");
      } else {
        console.error(result);
        toast.error("Password reset failed");
      }
    } catch (err) {
      console.error("Password reset error:", err);
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to reset password. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) return <div>Loading authentication...</div>;

  if (!email || !code) {
    return (
      <div className='mt-5'>
        <h1 className="text-2xl font-bold text-center mb-4">Invalid Reset Request</h1>
        <p className="text-center mb-6">This password reset link is invalid or has expired.</p>
        <Button
          className="w-full"
          onClick={() => router.push("/forgot-password")}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleResetPassword)} className="space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ResetPasswordForm;
