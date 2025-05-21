import { z } from "zod";

export const RegistrationValidation = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email" }).min(1),
    address: z.string().min(1, { message: "Address is required" }),
    phoneNumber: z.string().min(1, { message: "Phone number is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Must contain an uppercase letter" })
      .regex(/[a-z]/, { message: "Must contain a lowercase letter" })
      .regex(/[0-9]/, { message: "Must contain a number" })
      .regex(/[^A-Za-z0-9]/, { message: "Must contain a special character" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const ForgotPasswordValidation = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  code: z.string().optional(),
});

// Enhanced schema for the code verification step
export const CodeVerificationSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  code: z
    .string()
    .min(1, { message: "Verification code is required" })
    .regex(/^\d+$/, { message: "Code must contain only numbers" }),
});

// Password reset schema with strong password requirements
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
