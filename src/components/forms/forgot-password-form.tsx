"use client";

import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import type { SignInResource } from "@clerk/types";

// --- Validation Schemas ---
const ForgotPasswordValidation = z.object({
  email: z.string().email("Invalid email address"),
});

const CodeVerificationSchema = z.object({
  code: z.string().min(6, "Code must be 6 digits"),
  email: z.string().email(), // still needed to keep track
});

// --- Types ---
type ForgotPasswordValues = z.infer<typeof ForgotPasswordValidation>;
type CodeVerificationValues = z.infer<typeof CodeVerificationSchema>;
type FormValues = ForgotPasswordValues & Partial<CodeVerificationValues>;

const ForgotPasswordForm = () => {
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();

  const [showCodeInput, setShowCodeInput] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [resetPasswordAttempt, setResetPasswordAttempt] = useState<SignInResource | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(showCodeInput ? CodeVerificationSchema : ForgotPasswordValidation),
    defaultValues: {
      email: "",
      code: "",
    },
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    form.clearErrors();
  }, [showCodeInput, form]);

  const handleSendCode = async (email: string) => {
    if (!isLoaded || !signIn) return;

    try {
      const attempt = await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      setResetPasswordAttempt(attempt);
      setEmail(email);
      setShowCodeInput(true);
      toast.success("Verification code sent to your email");
    } catch (err) {
      console.error("Error sending code:", err);
      toast.error(
        err instanceof Error ? err.message : "Failed to send code. Please try again."
      );
    }
  };

  const handleVerifyCode = async (code: string) => {
    if (!isLoaded || !signIn || !resetPasswordAttempt) return;

    try {
      const emailAddressId = resetPasswordAttempt.supportedFirstFactors?.find(
        (f) => f.strategy === "reset_password_email_code"
      )?.emailAddressId;

      if (!emailAddressId) {
        throw new Error("Email address not found");
      }

      router.push(
        `/reset-password?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`
      );
    } catch (err) {
      console.error("Verification error:", err);
      toast.error("Invalid verification code. Please try again.");
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (showCodeInput) {
      await handleVerifyCode(values.code || "");
    } else {
      await handleSendCode(values.email);
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="space-y-6 mt-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {!showCodeInput ? (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Email Address</FormLabel>
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
          ) : (
            <>
              <p className="text-sm">We sent a code to {email}</p>
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Verification Code</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={isSubmitting}
                        placeholder="Enter 6-digit code"
                        className="text-white border-white placeholder:text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <Button type="submit" className="w-60 mx-auto flex items-center justify-center" disabled={isSubmitting}>
            {isSubmitting
              ? "Processing..."
              : showCodeInput
              ? "Verify Code"
              : "Send Code"}
          </Button>
        </form>
      </Form>

      {showCodeInput && (
        <Button
          variant="link"
          className="w-full text-white"
          onClick={() => {
            setShowCodeInput(false);
            form.reset({ email: email, code: "" });
          }}
        >
          Use different email
        </Button>
      )}

      <div className="text-center text-white text-sm">
        Remember your password?{" "}
        <Link href="/sign-in" className="hover:underline text-white">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
