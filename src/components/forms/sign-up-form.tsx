/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
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

// Define the base schema
const RegistrationBaseSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
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
  const router = useRouter();

  const form = useForm<z.infer<typeof RegistrationValidation>>({
    resolver: zodResolver(RegistrationValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-5">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter your first name"
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
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter your last name"
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
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled={isSubmitting}
                    placeholder="Enter your email address"
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complete Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter your complete address"
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
                  <FormLabel>Active Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter your active phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isSubmitting}
                      placeholder="Enter your password"
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
                      disabled={isSubmitting}
                      placeholder="Confirm your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-2 space-y-1">
            {passwordRequirements.map((req, idx) => (
              <p
                key={idx}
                className={`text-sm ${
                  req.valid ? "text-green-600" : "text-red-500"
                }`}
              >
                • {req.label}
              </p>
            ))}
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
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to the{" "}
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto underline"
                      onClick={() => setTermsModal(true)}
                    >
                      Terms & Conditions
                    </Button>{" "}
                    and{" "}
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto underline"
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
          <div className="flex gap-1 justify-center items-center">
            <p>Already have an account?</p>
            <Link href="/sign-in" className="underline">
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
