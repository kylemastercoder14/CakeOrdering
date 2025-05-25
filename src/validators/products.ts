import { z } from "zod";

export const ProductValidation = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  imageUrl: z.string().min(1, { message: "Image is required" }),
  price: z.coerce.number().min(1, { message: "Price is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  flavors: z
    .array(z.string())
    .min(1, { message: "At least one flavor is required" }),
  allergens: z.array(z.string()).min(1, {
    message: "At least one allergen is required",
  }),
  sizes: z
    .array(z.string())
    .min(1, { message: "At least one size is required" }),
  isFeatured: z.boolean().optional(),
});
