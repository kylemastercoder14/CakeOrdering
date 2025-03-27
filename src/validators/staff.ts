import { z } from "zod";

export const StaffValidation = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
