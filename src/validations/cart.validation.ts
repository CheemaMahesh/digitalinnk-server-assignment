import { z } from "zod";

export const addToCartSchema = z.object({
  productId: z.string(),
  quantity: z.number().optional(),
  cartId: z.string().optional(),
});

export const removeFromCartSchema = z.object({
  productId: z.string(),
});
