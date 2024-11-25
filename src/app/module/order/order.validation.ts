import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  product: z.string().nonempty('Product ID is required'),
  quantity: z
    .number()
    .int('Quantity must be an integer')
    .min(1, 'Quantity must be at least 1'),
  totalPrice: z.number().optional(),
});

export type TOrderValidation = z.infer<typeof orderValidationSchema>;
