import { z } from "zod";

export const PersonalInfoValidation = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
});

export const PasswordInfoValidation = z.object({
  newPassword: z.string().min(1, { message: "New password is required" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Confirm password is required" }),
});

export const StoreInfoValidation = z.object({
  logo: z.string().min(1, { message: "Logo is required" }),
  storeName: z.string().min(1, { message: "Store name is required" }),
  mission: z.string().min(1, { message: "Mission is required" }),
  vision: z.string().min(1, { message: "Vision is required" }),
  imageUrl: z.string().min(1, { message: "Image is required" }),
  coreValues: z.string().min(1, { message: "Core values is required" }),
  about: z.string().min(1, { message: "About is required" }),
});
