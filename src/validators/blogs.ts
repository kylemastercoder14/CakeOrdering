import { z } from "zod";

export const BlogValidation = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  imageUrl: z.string().min(1, { message: "Image is required" }),
});
