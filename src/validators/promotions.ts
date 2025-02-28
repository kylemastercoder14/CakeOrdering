import { z } from "zod";

export const PromotionValidation = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  imageUrl: z.string().min(1, { message: "Image is required" }),
  discount: z.coerce.number().min(1, { message: "Discount is required" }),
  startDate: z.date().min(new Date(), { message: "Start date is required" }),
  endDate: z.date().min(new Date(), { message: "End date is required" }),
  products: z.array(z.string()).min(1, { message: "Products are required" }),
});
