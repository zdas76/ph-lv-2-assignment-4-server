import { z } from "zod";

const createPorductValidation = z.object({
  body: z.object({
    name: z.string(),
    price: z.number(),
    description: z.string(),
    images: z.string(),
    category: z.string(),
    stock: z.number(),
  }),
});

export const ProductValidation = {
  createPorductValidation,
};
