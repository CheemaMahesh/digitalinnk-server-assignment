import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be positive"),
  currency: z.string().min(1, "Currency is required"),
});

export type ProductInput = z.infer<typeof productSchema>;
