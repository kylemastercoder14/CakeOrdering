/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createAccount } from "@/actions/user";
import { Policies } from "@prisma/client";
import { Modal } from "@/components/ui/modal";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";

// Define the base schema
const RegistrationBaseSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().optional(),
});

// Add password matching refinement
const RegistrationValidation = RegistrationBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);

const SignupForm = ({
  privacyPolicy,
  termsOfService,
}: {
  privacyPolicy: Policies | null;
  termsOfService: Policies | null;
}) => {
  const { signUp, isLoaded } = useSignUp();
  const [privacyModal, setPrivacyModal] = React.useState(false);
  const [termsModal, setTermsModal] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const passwordToastShown = React.useRef(false);

  const form = useForm<z.infer<typeof RegistrationValidation>>({
    resolver: zodResolver(RegistrationValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const { isSubmitting } = form.formState;
  const password = form.watch("password");

  const passwordRequirements = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One lowercase letter", valid: /[a-z]/.test(password) },
    { label: "One number", valid: /[0-9]/.test(password) },
    { label: "One special character", valid: /[^A-Za-z0-9]/.test(password) },
  ];

  const showPasswordRequirementsToast = () => {
    if (!passwordToastShown.current) {
      toast.info(
        <div className="space-y-2">
          <p className="font-bold">Password Requirements:</p>
          <ul className="list-disc pl-5 space-y-1">
            {passwordRequirements.map((req, idx) => (
              <li key={idx}>{req.label}</li>
            ))}
          </ul>
        </div>,
        {
          duration: 20000,
          id: "password-requirements",
          position: "bottom-right",
        }
      );
      passwordToastShown.current = true;
    }
  };

  const onSubmit = async (values: z.infer<typeof RegistrationValidation>) => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      });

      const res = await createAccount(values, signUp.createdUserId as string);
      if (res.success) {
        toast.success(res.success);
        setTimeout(() => {
          router.push("/");
          window.location.href = "/";
        }, 2000);
      } else {
        toast.error(res.error);
      }
    } catch (error: any) {
      console.error(error);

      // Handle specific Clerk errors
      if (error.errors) {
        const clerkError = error.errors[0];
        if (clerkError.code === "form_identifier_exists") {
          toast.error(
            "This email is already registered. Please use a different email or sign in."
          );
        } else {
          toast.error(
            clerkError.message || "An error occurred during sign up."
          );
        }
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      {/* Privacy Policy Modal */}
      <Modal
        isOpen={privacyModal}
        onClose={() => setPrivacyModal(false)}
        title="Privacy Policy"
        className="max-w-2xl"
      >
        <div className="prose max-h-[70vh] overflow-y-auto p-4">
          {privacyPolicy?.content ? (
            <div dangerouslySetInnerHTML={{ __html: privacyPolicy.content }} />
          ) : (
            <p>No privacy policy available.</p>
          )}
        </div>
      </Modal>

      {/* Terms of Service Modal */}
      <Modal
        isOpen={termsModal}
        onClose={() => setTermsModal(false)}
        title="Terms & Conditions"
        className="max-w-2xl"
      >
        <div className="prose max-h-[70vh] overflow-y-auto p-4">
          {termsOfService?.content ? (
            <div dangerouslySetInnerHTML={{ __html: termsOfService.content }} />
          ) : (
            <p>No terms of service available.</p>
          )}
        </div>
      </Modal>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-5">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">First Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter your first name"
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
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter your last name"
                      className="text-white border-white placeholder:text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Active Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Enter your active phone number"
                    className="text-white border-white placeholder:text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        disabled={isSubmitting}
                        placeholder="Enter your password"
                        className="text-white border-white placeholder:text-white pr-10"
                        {...field}
                        onFocus={showPasswordRequirementsToast}
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Confirm Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        disabled={isSubmitting}
                        placeholder="Confirm your password"
                        className="text-white border-white placeholder:text-white pr-10"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
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
          </div>

          {/* Terms Acceptance Checkbox */}
          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 text-white leading-none">
                  <FormLabel>
                    I agree to the{" "}
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 text-white h-auto underline"
                      onClick={() => setTermsModal(true)}
                    >
                      Terms & Conditions
                    </Button>{" "}
                    and{" "}
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 text-white h-auto underline"
                      onClick={() => setPrivacyModal(true)}
                    >
                      Privacy Policy
                    </Button>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button className="w-full" disabled={isSubmitting} type="submit">
            Sign Up
          </Button>
          <div className="flex gap-1 text-white justify-center items-center">
            <p>Already have an account?</p>
            <Link href="/sign-in" className="hover:underline text-white">
              Sign in
            </Link>
          </div>
        </form>
        <div
          className="flex items-center justify-center mx-auto text-center mt-3"
          id="clerk-captcha"
        ></div>
      </Form>
    </>
  );
};

export default SignupForm;
